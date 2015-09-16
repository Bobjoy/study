package com.bfl.study.java8.lambda2.predicate;

import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.FileTime;
import java.util.concurrent.TimeUnit;
import java.util.function.Predicate;
import java.util.logging.Level;
import java.util.logging.Logger;

public class FileDirFilter {

	private static final Path path = Paths.get("src/main", "java",
			"com/bfl/study/java8/lambda2");

	private static final Logger logger = Logger.getLogger(FileDirFilter.class
			.getName());

	private static void predicateInInnerClass() {
		Predicate<Path> dirsFilter = new Predicate<Path>() {
			@Override
			public boolean test(Path t) {
				return Files.isDirectory(t, LinkOption.NOFOLLOW_LINKS);
			}
		};

		try (DirectoryStream<Path> dirStream = Files.newDirectoryStream(path)) {
			for (Path file : dirStream) {
				if (dirsFilter.test(file)) {
					System.out.println(file.getFileName());
				}
			}
		} catch (Exception e) {
			logger.log(Level.SEVERE, null, e);
		}
	}

	private static void predicateWithLambda() {
		Predicate<Path> noFilter = (p) -> true;
		
		logger.info("All Path contents");
		doFilterAndPrintPath(noFilter);
		System.out.println("-------------------------------");
		
		logger.info("Print dirs only");
		
		doFilterAndPrintPath((p) -> Files.isDirectory(p, LinkOption.NOFOLLOW_LINKS));
		
		System.out.println("-------------------------------");
		
		Predicate<Path> hiddenFilter = (p) -> {
			boolean hidden = false;
			try {
				hidden = Files.isHidden(p);
			} catch (Exception e) {
			}
			return hidden;
		};
		
		logger.info("Print hidden files/dirs only");
		doFilterAndPrintPath(hiddenFilter);
		System.out.println("------------------------------");
		
		Predicate<Path> timeFilter = (p) -> {
			long currentTime = 0, modifiedTime = 0;
			try {
				currentTime = FileTime.fromMillis(System.currentTimeMillis()).to(TimeUnit.DAYS);
				modifiedTime = ((FileTime)(Files.getAttribute(p, "basic:lastModifiedTime", LinkOption.NOFOLLOW_LINKS))).to(TimeUnit.DAYS);
			} catch (Exception e) {
			}
			return currentTime == modifiedTime;
		};
		
		logger.info("Print today modified files/dirs only");
		doFilterAndPrintPath(timeFilter);
		logger.info("----------------------------------");
	}

	private static void doFilterAndPrintPath(Predicate<Path> pred) {
		try {
			Files.newDirectoryStream(path).forEach(p -> {
				if (pred.test(p)) {
					System.out.println(p.getFileName());
				}
			});
		} catch (Exception e) {
			logger.log(Level.SEVERE, null, e);
		}
	}
	
	public static void main(String[] args) {
		predicateInInnerClass();
		predicateWithLambda();
	}
}
