//
//  main.m
//  iOSStudy-OC
//
//  Created by Vetech on 15/7/23.
//  Copyright (c) 2015年 BFL. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "NSString+Utilities.h"

typedef enum {
    kCircle,
    kRectangle,
    kOblateSpheroid
} ShapeType;

typedef enum {
    kRedColor,
    kGreenColor,
    kBlueColor
} ShapeColor;

typedef struct {
    int x, y, width, height;
} ShapeRect;

typedef struct {
    ShapeType type;
    ShapeColor fillColor;
    ShapeRect bounds;
} Shape;

void drawShapes(Shape shapes[], int count)
{
    int i;
    for (i = 0; i < count; i++) {
        switch (shapes[i].type) {
            case kCircle:
                
                break;
                
            default:
                break;
        }
    }
}

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
        
        
        
        NSString* str = @"https://www.baidu.com";
        BOOL isURL = [str isURL];
        NSLog(@"%x", isURL);
        
        Shape shapes[3];
        
        ShapeRect rect0 = {0, 0, 10, 30};
        shapes[0].type = kCircle;
        shapes[0].fillColor = kGreenColor;
        shapes[0].bounds = rect0;
        
        ShapeRect rect1 = {30, 40, 50, 60};
        shapes[1].type = kCircle;
        shapes[1].fillColor = kGreenColor;
        shapes[1].bounds = rect1;
        
        ShapeRect rect2 = {15, 18, 37, 29};
        shapes[2].type = kCircle;
        shapes[2].fillColor = kGreenColor;
        shapes[2].bounds = rect2;
        
        
    }
    return 0;
}
