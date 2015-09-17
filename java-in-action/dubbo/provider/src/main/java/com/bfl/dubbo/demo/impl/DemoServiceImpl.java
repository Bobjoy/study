package com.bfl.dubbo.demo.impl;

import com.bfl.dubbo.demo.DemoService;

public class DemoServiceImpl implements DemoService {
	public String sayHello(String name) {
        return "Hello " + name;
    }
}
