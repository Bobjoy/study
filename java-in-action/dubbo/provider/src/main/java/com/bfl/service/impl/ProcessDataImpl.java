package com.bfl.service.impl;

import com.bfl.service.IProcessData;

public class ProcessDataImpl implements IProcessData {
	public String hello(String name) {
		System.out.println(name);
		return "hello : " + name;
	}
}
