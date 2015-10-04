//
//  HomeViewController.m
//  iOSStudy-QQ
//
//  Created by Vetech on 15/10/4.
//  Copyright (c) 2015年 BFL. All rights reserved.
//

#import "HomeViewController.h"

@interface HomeViewController ()
{
    NSString* titleOfOtherPages;
}
@end

@implementation HomeViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    titleOfOtherPages = @"";
    self.panGesture = [[UIPanGestureRecognizer alloc] init];
    
    // 设置中间 segmentView 视图
    UISegmentedControl* segmentView = [[UISegmentedControl alloc] initWithItems: @[@"消息", @"电话"]];
    segmentView.selectedSegmentIndex = 0;
    [segmentView setWidth:60 forSegmentAtIndex: 0];
    [segmentView setWidth:60 forSegmentAtIndex: 1];
    self.navigationItem.titleView = segmentView;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
