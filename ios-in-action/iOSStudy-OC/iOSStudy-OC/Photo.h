//
//  StringDemo.h
//  iOSStudy-OC
//
//  Created by Vetech on 15/9/28.
//  Copyright (c) 2015年 BFL. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface Photo : NSObject
{
    NSString* caption;
    NSString* photographer;
}

// 用属性改写前
- (NSString*)caption;
- (NSString*)photographer;

- (void)setCaption: (NSString*)input;
- (void)setPhotographer: (NSString*)input;

// 用属性改写后
@property (retain) NSString* caption;
@property (retain) NSString* photographer;

@end
