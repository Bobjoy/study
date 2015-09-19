//
//  Person.m
//  iOSStudy-Cocoa
//
//  Created by Vetech on 15/7/23.
//  Copyright (c) 2015年 BFL. All rights reserved.
//

#import "Person.h"

@implementation Person


- (void)enterInfo {
    NSLog(@"What is the frist name?");
    char csstring[40];
    scanf("%s", csstring);
    firstName = [NSString stringWithCString:csstring encoding:1];
    
    NSLog(@"What is %@'s last name?", firstName);
    scanf("%s", csstring);
    lastName = [NSString stringWithCString:csstring encoding:1];
    
    NSLog(@"How old is %@ %@?", firstName, lastName);
    scanf("%i", &age);
}

- (void)printInfo {
    NSLog(@"%@ %@ is %i years old", firstName, lastName, age);
}

@end
