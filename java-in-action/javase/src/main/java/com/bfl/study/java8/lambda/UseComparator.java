package com.bfl.study.java8.lambda;

import static java.lang.System.out;
import static java.util.Collections.sort;

import java.util.ArrayList;
import java.util.List;

public class UseComparator {

	public static void main(String[] args) {
		List<String> values = new ArrayList<String>();
		values.add("AAA");
		values.add("bbb");
		values.add("CCC");
		values.add("ddd");
		values.add("EEE");
		
		// Old version
		sort(values);
		out.println("Simple sort:");
		print(values);
		
		// Lambda version
		sort(values, (o1, o2) -> o1.compareToIgnoreCase(o2));
		out.println("Sort with Comparator:");
		print(values);
	}

	private static void print(List<String> values) {
		for (String value : values) {
			out.println(value);
		}
	}
	
}
