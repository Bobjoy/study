//
//  main.m
//  iOSStudy-OC
//
//  Created by Vetech on 15/7/23.
//  Copyright (c) 2015年 BFL. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "NSString+Utilities.h"
#import "NSTimerDemo.h"

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

typedef NS_ENUM(NSInteger, FlightDynamicStatus) {
    kFlightDynamicStatusNotFly = 0,     // 未起飞
    kFlightDynamicStatusWillFly = 1,    // 待起飞
    kFlightDynamicStatusFlying = 2,     // 飞行中
    kFlightDynamicStatusArrived = 3,    // 已降落
    kFlightDynamicStatusCanceled = 4    // 取消
};


void parserChinese(NSString * chinese) {
    
    NSString * dateReg = @"(\\d{4}-\\d{2}-\\d{2}\\s+\\d{2}.?\\d{2})";
    NSRange dateRange = [chinese rangeOfString:dateReg options:NSRegularExpressionSearch];
    if (dateRange.location != NSNotFound) {
        NSLog(@"date location: %ld, length: %ld, content:%@", dateRange.location, dateRange.length, [chinese substringWithRange:dateRange]);
    }
    
    NSString * travelReg = @"([\u4E00-\u9FA5]+[\\--——\\s]+[\u4E00-\u9FA5]+)";
    NSRange travelRange = [chinese rangeOfString:travelReg options:NSRegularExpressionSearch];
    if (travelRange.location != NSNotFound) {
        NSLog(@"travel location: %ld, length: %ld, content:%@", travelRange.location, travelRange.length, [chinese substringWithRange:travelRange]);
    }
    
    NSString * seatReg = @"(\\d+[A-Z])";
    NSRange seatRange = [chinese rangeOfString:seatReg options:NSRegularExpressionSearch];
    if (seatRange.location != NSNotFound) {
        NSLog(@"seat location: %ld, length: %ld, content:%@", seatRange.location, seatRange.length, [chinese substringWithRange:seatRange]);
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
        
        
        
//        NSString* str = @"https://www.baidu.com";
//        BOOL isURL = [str isURL];
//        NSLog(@"%x", isURL);
//        
//        Shape shapes[3];
//        
//        ShapeRect rect0 = {0, 0, 10, 30};
//        shapes[0].type = kCircle;
//        shapes[0].fillColor = kGreenColor;
//        shapes[0].bounds = rect0;
//        
//        ShapeRect rect1 = {30, 40, 50, 60};
//        shapes[1].type = kCircle;
//        shapes[1].fillColor = kGreenColor;
//        shapes[1].bounds = rect1;
//        
//        ShapeRect rect2 = {15, 18, 37, 29};
//        shapes[2].type = kCircle;
//        shapes[2].fillColor = kGreenColor;
//        shapes[2].bounds = rect2;
//        
//        FlightDynamicStatus s = 1;
//        switch (s) {
//            case kFlightDynamicStatusNotFly:
//                NSLog(@"not fly");
//                break;
//                
//            default:
//                break;
//        }
//        
//        NSString * chinese = @"您的航程信息如下：2015-09-30  09：30  南京禄口国际机场-北京首都机场!您的航班号为：MU2811您的座位号为:32A";
//        
//        parserChinese(chinese);
        
        
//        NSArray * arr = @[
//                          @{@"text":@"2015-09-30  09：30", @"color":@"red", @"font":@"Arial"},
//                          @{@"text":@"南京禄口国际机场-北京首都机场", @"color":@"blue", @"font":@"Arial"}
//                         ];
        //formatStringsFromArrayWithAttributes(8, arr);
        
        
        NSTimerDemo * timer = [[NSTimerDemo alloc] init];
        [timer startTimer];
        
    }
    return 0;
}
