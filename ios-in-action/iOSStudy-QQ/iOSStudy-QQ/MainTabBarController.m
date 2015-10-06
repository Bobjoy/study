//
//  MainTabBarController.m
//  AugsVetechB2G
//
//  Created by Vetech on 15/10/4.
//  Copyright (c) 2015年 doniel. All rights reserved.
//

#import "MainTabBarController.h"
#import "HomeViewController.h"
#import "PersonalViewController.h"
#import "ServiceViewController.h"

@interface MainTabBarController ()

@end

@implementation MainTabBarController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    HomeViewController* home=[[HomeViewController alloc]init];
    home.view.backgroundColor=[UIColor whiteColor];
    home.tabBarItem.title=@"首页";
    home.tabBarItem.image=[UIImage imageNamed:@"home"];
    
    PersonalViewController *personal=[[PersonalViewController alloc]init];
    personal.view.backgroundColor=[UIColor whiteColor];
    personal.tabBarItem.title=@"个人中心";
    personal.tabBarItem.badgeValue=@"3";
    personal.tabBarItem.image=[UIImage imageNamed:@"personal"];
    
    ServiceViewController *service=[[ServiceViewController alloc]init];
    service.view.backgroundColor=[UIColor whiteColor];
    service.tabBarItem.title=@"在线客服";
    service.tabBarItem.image=[UIImage imageNamed:@"phone"];
    
    self.viewControllers = @[home, personal, service];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)tabBar:(UITabBar *)tabBar didSelectItem:(UITabBarItem *)item
{
    NSLog(@"didSelectItem");
    switch (item.tag) {
        case 0:
            NSLog(@"0");
            break;
        case 1:
            NSLog(@"1");
            break;
        case 2:
            NSLog(@"2");
            break;
        default:
            break;
    }
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
