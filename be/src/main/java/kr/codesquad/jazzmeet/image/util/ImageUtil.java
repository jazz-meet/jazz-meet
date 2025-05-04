package kr.codesquad.jazzmeet.image.util;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

import org.springframework.web.multipart.MultipartFile;

import kr.codesquad.jazzmeet.global.util.CustomMultipartFile;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ImageUtil {

	public static List<MultipartFile> convertImageUrlToMultipartFile(List<String> imageUrls) {
		List<MultipartFile> multipartFiles = new ArrayList<>();
		for (int i = 0; i < imageUrls.size(); i++) {
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			try {
				BufferedImage image = ImageIO.read(new URL(imageUrls.get(i)));
				ImageIO.write(image, "jpeg", out);
			} catch (IOException e) {
				log.error("IO Error", e);
				return null;
			}
			byte[] bytes = out.toByteArray();
			CustomMultipartFile customMultipartFile = new CustomMultipartFile(bytes, "image" + i,
				"posterImage" + i + ".jpeg",
				"jpeg", bytes.length);
			multipartFiles.add(customMultipartFile);
		}
		return multipartFiles;
	}
}
