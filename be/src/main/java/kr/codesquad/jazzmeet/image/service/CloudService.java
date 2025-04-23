package kr.codesquad.jazzmeet.image.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import kr.codesquad.jazzmeet.image.repository.GcsImageHandler;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CloudService {

	private final GcsImageHandler gcsImageHandler;

	public List<String> uploadImages(List<MultipartFile> multipartFiles) {
		return gcsImageHandler.uploadImages(multipartFiles);
	}

	public List<String> deleteImages(List<String> imageUrls) {
		return gcsImageHandler.deleteImages(imageUrls);
	}
}
