/**
 * http://my.oschina.net/benhaile/blog/179642
 */

package com.bfl.study.java8.typeannotations;

import java.util.Collections;

public class TypeAnnotationsDemo {
	public static void main(String[] args) {
		// UnsupportedOperationException
		Collections.emptyList().add("One");
		
		// NumberFormatException
		int i = Integer.parseInt("hello");
		
		// NullPointerException
		System.console().readLine();
	}
}
