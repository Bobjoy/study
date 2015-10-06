//
//  LeftViewController.m
//  AugsVetechB2G
//
//  Created by Vetech on 15/10/4.
//  Copyright (c) 2015年 doniel. All rights reserved.
//

#import "LeftViewController.h"
#import "Common.h"

@interface LeftViewController ()
{
    NSArray* menus;
    UIImageView* avatarImageView;
    UITableView* settingTableView;
    NSLayoutConstraint* heightLayoutConstraintOfSettingTableView;
}
@end

@implementation LeftViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    menus = @[@"会员注册", @"退票改签", @"机场信息", @"行李信息", @"特服信息", @"停车信息", @"天气信息"];
    self.title = @"航班列表";
    
    avatarImageView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"avatar"]];
    [self.view addSubview:avatarImageView];
    
    
    settingTableView = [[UITableView alloc] initWithFrame:CGRectMake(0, 20, self.view.frame.size.width, self.view.frame.size.height-64) style:UITableViewStyleGrouped];
    
    settingTableView.backgroundView = nil;
    settingTableView.backgroundView = [[UIView alloc] init];
    settingTableView.backgroundView.backgroundColor = [UIColor clearColor];
    settingTableView.backgroundColor = [UIColor clearColor];
    
    settingTableView.separatorStyle = NO;
    
    settingTableView.delegate = self;
    settingTableView.dataSource = self;
    settingTableView.tableFooterView = [[UIView alloc] init];
    
    heightLayoutConstraintOfSettingTableView.constant = kScreenHeight < 500 ? kScreenHeight * (568 - 221) / 568 : 347;
    
    self.view.frame = CGRectMake(0, 0, 320 * 0.78, kScreenHeight);
    
    [self.view addSubview:settingTableView];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    
}

- (CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section
{
    return 100;
}

- (UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section
{
    
    UIView* avatarView = [[UIView alloc] initWithFrame:CGRectMake(0, 16, kScreenWidth, 100)];
    avatarImageView.center = avatarView.center;
    [avatarView addSubview:avatarImageView];
    return avatarView;

}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return menus.count;
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 1;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    UITableViewCell* cell = [tableView dequeueReusableCellWithIdentifier:@"leftVC"];
    if (cell == nil) {
        cell = [[UITableViewCell alloc] init];
    }
    cell.backgroundColor = [UIColor clearColor];
    [cell.textLabel setText: menus[indexPath.row]];
    return cell;
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
