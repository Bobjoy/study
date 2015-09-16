package com.bfl.study.java8.lambda2.mthdRefs;

import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.function.Predicate;
import java.util.logging.Level;
import java.util.logging.Logger;

public class MethodReference {

	private static final Path path = Paths.get("src/main", "java",
			"com/bfl/study/java8/lambda2");

	private static final Logger logger = Logger.getLogger(MethodReference.class
			.getName());

	private void doFilterAndPrintPath(Predicate<Path> pred) {
		try {
			Files.newDirectoryStream(path).forEach(p -> {
				if (pred.test(p)) {
					System.out.println(p.getFileName());
				}
			});
		} catch (Exception e) {
			logger.log(Level.SEVERE, null, e.getMessage());
		}
	}
	
	private void doPrint() {
		// Static method reference
		doFilterAndPrintPath(FilesDirTests::isAccessible);
		
		// Instance method reference
		doFilterAndPrintPath(this::isNotExists);
	}
	
	private boolean isNotExists(Path p) {
		return Files.notExists(p, new LinkOption[]{LinkOption.NOFOLLOW_LINKS});
	}
	
	private boolean isExists(Path p) {
		return Files.exists(p, new LinkOption[]{LinkOption.NOFOLLOW_LINKS});
	}
	
	public static void main(String[] args) {
		MethodReference mr = new MethodReference();
		mr.doFilterAndPrintPath(mr::isExists);
		mr.doPrint();
	}
}
