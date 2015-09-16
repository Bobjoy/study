package com.bfl.study.java8.lambda2;

import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class TraverseFileContent {

	private static final Logger logger = Logger
			.getLogger(TraverseFileContent.class.getName());

	public static void main(String[] args) {
		try {
			Path path = Paths.get("src/main", "resources", "data.txt");
			if (Files.exists(path, LinkOption.NOFOLLOW_LINKS)) {
				logger.config(path.toAbsolutePath().toString());

				List<String> lines = Files.readAllLines(path);

				// Traversing with for each
				for (String line : lines) {
					System.out.println(line);
				}

				// Traversing with iterator
				Iterator<String> itr = lines.iterator();
				while (itr.hasNext()) {
					System.out.println(itr.next());
				}

				// ===============================

				// Traversing with lambda new for each
				lines.forEach(line -> System.out.println(line));

				// or with streams
				lines.stream().forEach(line -> System.out.println(line));

			} else {
				logger.log(Level.SEVERE, "{0}, Doesn't exists",  path.toAbsolutePath());
			}
		} catch (Exception e) {
			logger.severe(e.getMessage());
		}
	}

}
