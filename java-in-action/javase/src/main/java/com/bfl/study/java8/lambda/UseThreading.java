package com.bfl.study.java8.lambda;

import static java.lang.System.out;

public class UseThreading {

	public static void main(String[] args) {
		// Old version
		Runnable thrd1 = new Runnable() {
			public void run() {
				out.println("Hello Runnable 1.");
			}
		};
		new Thread(thrd1).start();
		
		//=======================================//
		
		// Lambda version
		Runnable thrd2 = () -> out.println("Hello Runnable 2.");
		new Thread(thrd2).start();
		
		// Old version
		new Thread(new Runnable(){
			@Override
			public void run() {
				System.out.println("Hello Thread 1.");
			}
		}).start();
		
		// Lambda version
		new Thread(() -> out.println("Hello Thread 2.")).start();
	}
}
