//
//  NSObject_Extension.m
//  Rayrolling
//
//  Created by Vetech on 15/6/11.
//  Copyright (c) 2015年 BFL. All rights reserved.
//


#import "NSObject_Extension.h"
#import "Rayrolling.h"

@implementation NSObject (Xcode_Plugin_Template_Extension)

+ (void)pluginDidLoad:(NSBundle *)plugin
{
    static dispatch_once_t onceToken;
    NSString *currentApplicationName = [[NSBundle mainBundle] infoDictionary][@"CFBundleName"];
    if ([currentApplicationName isEqual:@"Xcode"]) {
        dispatch_once(&onceToken, ^{
            sharedPlugin = [[Rayrolling alloc] initWithBundle:plugin];
        });
    }
}
@end
