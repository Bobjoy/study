//
//  NSObject_Extension.m
//  BFLPlugin
//
//  Created by Vetech on 15/7/20.
//  Copyright (c) 2015年 BFL. All rights reserved.
//


#import "NSObject_Extension.h"
#import "BFLPlugin.h"

@implementation NSObject (Xcode_Plugin_Template_Extension)

+ (void)pluginDidLoad:(NSBundle *)plugin
{
    static dispatch_once_t onceToken;
    NSString *currentApplicationName = [[NSBundle mainBundle] infoDictionary][@"CFBundleName"];
    if ([currentApplicationName isEqual:@"Xcode"]) {
        dispatch_once(&onceToken, ^{
            sharedPlugin = [[BFLPlugin alloc] initWithBundle:plugin];
        });
    }
}
@end
