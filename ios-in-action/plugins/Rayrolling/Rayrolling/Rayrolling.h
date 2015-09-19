//
//  Rayrolling.h
//  Rayrolling
//
//  Created by Vetech on 15/6/11.
//  Copyright (c) 2015年 BFL. All rights reserved.
//

#import <AppKit/AppKit.h>

@class Rayrolling;

static Rayrolling *sharedPlugin;

@interface Rayrolling : NSObject

+ (instancetype)sharedPlugin;
- (id)initWithBundle:(NSBundle *)plugin;

@property (nonatomic, strong, readonly) NSBundle* bundle;
@end