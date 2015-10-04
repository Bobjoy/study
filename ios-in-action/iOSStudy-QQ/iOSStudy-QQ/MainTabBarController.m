//
//  MainTabBarController.m
//  AugsVetechB2G
//
//  Created by Vetech on 15/10/4.
//  Copyright (c) 2015年 doniel. All rights reserved.
//

#import "MainTabBarController.h"

@interface MainTabBarController ()

@end

@implementation MainTabBarController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    UIViewController *c1=[[UIViewController alloc]init];
    c1.view.backgroundColor=[UIColor whiteColor];
    //c1.view.backgroundColor=[UIColor greenColor];
    c1.tabBarItem.title=@"首页";
    //c1.tabBarItem.image=[UIImage imageNamed:@"tab_recent_nor"];
    //c1.tabBarItem.badgeValue=@"123";
    
    UIViewController *c2=[[UIViewController alloc]init];
    c2.view.backgroundColor=[UIColor whiteColor];
    c2.tabBarItem.title=@"个人中心";
    //c2.tabBarItem.image=[UIImage imageNamed:@"tab_buddy_nor"];
    
    UIViewController *c3=[[UIViewController alloc]init];
    c3.view.backgroundColor=[UIColor whiteColor];
    c3.tabBarItem.title=@"在线客服";
    //c3.tabBarItem.image=[UIImage imageNamed:@"tab_qworld_nor"];
    
    self.viewControllers = @[c1, c2, c3];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)tabBar:(UITabBar *)tabBar didSelectItem:(UITabBarItem *)item
{
    switch (item.tag) {
        case 0:
            break;
        case 1:
            break;
        case 2:
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
