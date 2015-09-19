//
//  TableViewController.m
//  iOSStudy-Cocoa
//
//  Created by Vetech on 15/7/28.
//  Copyright (c) 2015年 BFL. All rights reserved.
//

#import "TableViewController.h"
#import "CustomTableViewCell.h"

@interface TableViewController ()
{
    UITableView *_tbView;
    NSArray *_items;
    NSArray *_data;
}

@end

@implementation TableViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    _items = @[@"Cell1", @"Cell2"];
    _data = @[@"Data1", @"Data2"];
    _tbView = [[UITableView alloc] initWithFrame:CGRectMake(0, 16, self.view.frame.size.width, self.view.frame.size.height-16)];
    _tbView.backgroundColor = [UIColor colorWithRed: 0.2339 green: 0.6858 blue: 0.6329 alpha: 1.0];
    _tbView.delegate = self;
    _tbView.dataSource = self;
    [self.view addSubview:_tbView];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (id)itemAtIndexPath:(NSIndexPath*)indexPath {
    return _items[(NSUInteger)indexPath.row];
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView*)tableView numberOfRowsInSection:(NSInteger)section {
    return [_items count];
}

- (UITableViewCell*)tableView:(UITableView*)tableView cellForRowAtIndexPath:(NSIndexPath*)indexPath {
    CustomTableViewCell *cell = [[CustomTableViewCell alloc] init];
    cell.textLabel.text = _items[indexPath.row];
    return cell;
}

@end
