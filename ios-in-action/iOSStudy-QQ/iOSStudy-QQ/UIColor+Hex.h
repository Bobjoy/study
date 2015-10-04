//
//  UIColor+Hex.h
//  AugsVetechB2G
//
//  Created by Vetech on 15/10/4.
//  Copyright (c) 2015年 doniel. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UIColor (Hex)

+ (UIColor*)colorWithHex:(long)hexColor;
+ (UIColor*)colorWithHex:(long)hexColor alpha:(float)opacity;

@end
