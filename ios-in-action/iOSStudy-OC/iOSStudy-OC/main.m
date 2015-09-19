//
//  main.m
//  iOSStudy-OC
//
//  Created by Vetech on 15/7/23.
//  Copyright (c) 2015年 BFL. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Person.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
//        char response;
//        NSMutableArray *people = [[NSMutableArray alloc] init];
//        
//        do {
//            Person *newPerson = [[Person alloc] init];
//            [newPerson enterInfo];
//            [newPerson printInfo];
//            
//            [people addObject:newPerson];
//            
//            NSLog(@"Do you want to enter another name? (y/n)");
//            scanf("\n%c", &response);
//        } while (response == 'y');
//        
//        NSLog(@"Number of people in the database: %li", [people count]);
//        for (Person *onePerson in people) {
//            [onePerson printInfo];
//        }
        
        int var[] = {10, 100, 200};
        int i, *ptr;
        
        ptr = var;
        for (i = 0; i < 3; i++) {
            NSLog(@"Address of var[%d] = %p\n", i, ptr);
            NSLog(@"Value of var[%d] = %d\n", i, *ptr);
            ptr++;
        }
        NSLog(@"Address of ptr = %p\n", ptr);
    }
    return 0;
}
