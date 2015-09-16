package com.bfl.study.java8.lambda;

import static java.lang.System.out;
import com.bfl.study.java8.functional_interface.HelloInterface;

public class UseHelloInterface {

	public static void main(String[] args) {
		HelloInterface hello = () -> out.println("Hello from Lambda expression");
		hello.doGreeting();
	}
}
