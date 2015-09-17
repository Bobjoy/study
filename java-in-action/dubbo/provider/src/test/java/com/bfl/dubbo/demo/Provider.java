package com.bfl.dubbo.demo;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Provider {
	
	public static void main(String[] args) throws Exception {
		ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(
				new String[] { "applicationProvider.xml" });
		context.start();
		System.out.println("按任意键退出");
		System.in.read();
	}
}