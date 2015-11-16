//
//  NSTimerDemo.m
//  iOSStudy-OC
//
//  Created by Vetech on 15/11/13.
//  Copyright © 2015年 BFL. All rights reserved.
//

#import "NSTimerDemo.h"

@interface NSTimerDemo()

@property (nonatomic, weak) NSTimer * timer;

@end

@implementation NSTimerDemo

- (void)startTimer {
    _timer = [NSTimer scheduledTimerWithTimeInterval:1.0f target:self selector:@selector(timerFire:) userInfo:nil repeats:YES];
    [_timer fire];
}

- (void)timerFire:(id)userInfo {
    NSLog(@"Firing");
}

@end
