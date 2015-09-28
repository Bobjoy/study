//
//  NSString+Utilities.m
//  iOSStudy-OC
//
//  Created by Vetech on 15/9/28.
//  Copyright (c) 2015年 BFL. All rights reserved.
//

#import "NSString+Utilities.h"

@implementation NSString (Utilities)

- (BOOL)isURL
{
    if ( [self hasPrefix:@"http://"] ) {
        return YES;
    } else {
        return NO;
    }
}

@end
