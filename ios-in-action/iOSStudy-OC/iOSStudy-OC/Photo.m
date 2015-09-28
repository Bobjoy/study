//
//  StringDemo.m
//  iOSStudy-OC
//
//  Created by Vetech on 15/9/28.
//  Copyright (c) 2015年 BFL. All rights reserved.
//

#import "Photo.h"
#import "NSString+Utilities.h"

@implementation Photo

- (id)init
{
    if ( self = [super init] ) {
        [self setCaption:@"Default Caption"];
        [self setPhotographer:@"Default Photographer"];
    }
    return self;
}

- (NSString *)caption
{
    NSString* str = [NSString string];
    BOOL isURL = [str isURL];
    NSLog(@"%x", isURL);
    
    return caption;
}

- (NSString *)photographer
{
    
    return photographer;
}

- (void)setCaption:(NSString *)input
{
    
    
    
    caption = input;
}

- (void)setPhotographer:(NSString *)input
{
    photographer = input;
}

// 用属性改写后，实现
@synthesize caption;
@synthesize photographer;

@end
