//
//  Person.h
//  iOSStudy-Cocoa
//
//  Created by Vetech on 15/7/23.
//  Copyright (c) 2015年 BFL. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface Person : NSObject {
    @public NSString *firstName;
    NSString *lastName;
    int age;
    
    @public NSString *hands[2];
}

@property (nonatomic, strong) NSArray *foots;

- (void)enterInfo;
- (void)printInfo;

@end
