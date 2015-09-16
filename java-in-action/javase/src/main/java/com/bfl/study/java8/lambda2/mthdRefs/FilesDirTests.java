package com.bfl.study.java8.lambda2.mthdRefs;

import java.nio.file.Files;
import java.nio.file.Path;

public class FilesDirTests {

	public static boolean isAccessible(Path p) {
		return Files.isReadable(p) & Files.isReadable(p)
				& Files.isExecutable(p) & Files.isWritable(p);
	}
}
