//
//  ViewController.h
//  iOSStudy-Cocoa
//
//  Created by Vetech on 15/7/22.
//  Copyright (c) 2015年 BFL. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <AddressBookUI/AddressBookUI.h>

@interface ViewController : UIViewController<ABPeoplePickerNavigationControllerDelegate>

@property (weak, nonatomic) IBOutlet UILabel *firstName;
@property (weak, nonatomic) IBOutlet UILabel *phoneNumber;

- (IBAction)showPicker:(id)sender;

@end

