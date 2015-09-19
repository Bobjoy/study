//
//  main.swift
//  iOSStudy-Swift
//
//  Created by Vetech on 15/9/19.
//  Copyright (c) 2015年 BFL. All rights reserved.
//

import Foundation

class MyClass {
    @objc func callMe() {
        print("Hi")
    }
}

let object = MyClass()
NSTimer.scheduledTimerWithTimeInterval(1, target: object, selector: "callMe", userInfo: nil, repeats: true)

class Parent {
    final func method() {
        print("开始配置")
        
        methodImpl()
        
        print("结束配置")
    }
    
    func methodImpl() {
        fatalError("子类必须实现这个方法")
    }
}

class Child: Parent {
    
}

