//
//  ViewController.h
//  iOSStudy-QQ
//
//  Created by Vetech on 15/10/4.
//  Copyright (c) 2015年 BFL. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ViewController : UIViewController

- (void)pan:(UIPanGestureRecognizer*)recongnizer;

- (void)showLeft;
- (void)showRight;
- (void)showHome;

- (void)doTheAnimate:(CGFloat)proportion showWhat:(NSString*)showWhat;

@end

