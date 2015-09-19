//
//  BFLPlugin.h
//  BFLPlugin
//
//  Created by Vetech on 15/7/20.
//  Copyright (c) 2015年 BFL. All rights reserved.
//

#import <AppKit/AppKit.h>

@class BFLPlugin;

static BFLPlugin *sharedPlugin;

@interface BFLPlugin : NSObject

+ (instancetype)sharedPlugin;
- (id)initWithBundle:(NSBundle *)plugin;

@property (nonatomic, strong, readonly) NSBundle* bundle;
@end