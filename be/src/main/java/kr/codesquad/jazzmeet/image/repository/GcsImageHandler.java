package kr.codesquad.jazzmeet.image.repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;

import kr.codesquad.jazzmeet.global.error.CustomException;
import kr.codesquad.jazzmeet.global.error.statuscode.ImageErrorCode;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class GcsImageHandler {

	@Value("${spring.cloud.gcp.storage.bucket}")
	private String bucketName;

	private static final String GCS_FILE_PREFIX = "https://storage.googleapis.com/";

	private final Storage storage;

	public List<String> uploadImages(List<MultipartFile> multipartFiles) {
		List<String> imageUrls = new ArrayList<>();
		for (MultipartFile file : multipartFiles) {
			String fileName = createFileName(file.getOriginalFilename());
			String contentType = file.getContentType();
			try {
				BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, fileName)
					.setContentType(contentType)
					.build();
				storage.create(blobInfo, file.getBytes());
			} catch (IOException e) {
				throw new CustomException(ImageErrorCode.IMAGE_UPLOAD_ERROR);
			}

			String url = GCS_FILE_PREFIX + bucketName + "/" + fileName;
			imageUrls.add(url);
		}
		return imageUrls;
	}

	// 파일명 중복 방지
	private String createFileName(String fileName) {
		validateFileName(fileName);
		return UUID.randomUUID() + fileName;
	}

	// 파일 확장자 유효성 검사
	private void validateFileName(String fileName) {
		if (isExistFileName(fileName)) {
			throw new CustomException(ImageErrorCode.NOT_FOUND_IMAGE);
		}

		String extension = getFileExtension(fileName);
		List<String> allowedExtension = List.of("png", "jpg", "jpeg");
		if (!allowedExtension.contains(extension)) {
			throw new CustomException(ImageErrorCode.WRONG_IMAGE_FORMAT);
		}
	}

	private boolean isExistFileName(String fileName) {
		return fileName == null || fileName.equals("");
	}

	private String getFileExtension(String fileName) {
		int lastDotIndex = fileName.lastIndexOf('.');
		if (lastDotIndex == -1) {
			throw new CustomException(ImageErrorCode.WRONG_IMAGE_FORMAT);
		}
		return fileName.substring(lastDotIndex + 1).toLowerCase();
	}

	public List<String> deleteImages(List<String> imageUrls) {
		try {
			for (String url : imageUrls) {
				Blob blob = storage.get(bucketName, url);
				if (blob == null) {
					System.out.println("The object " + url + " wasn't found in " + bucketName);
				}
				BlobId blobId = blob.getBlobId();
				storage.delete(blobId);
			}
		} catch (Exception e) {
			throw new CustomException(ImageErrorCode.IMAGE_DELETE_ERROR);
		}
		return imageUrls;
	}
}
