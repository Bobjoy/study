//
//  ViewController.m
//  iOSStudy-Cocoa
//
//  Created by Vetech on 15/7/22.
//  Copyright (c) 2015年 BFL. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()
{
    NSString *_name;
    NSArray *song;
}


@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // Do any additional setup after loading the view, typically from a nib.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}



#pragma mark - ABPeoplePickerNavigationControllerDelegate
-(void)peoplePickerNavigationControllerDidCancel:(ABPeoplePickerNavigationController *)peoplePicker {
    [self dismissViewControllerAnimated:YES completion:nil];
}

-(void)peoplePickerNavigationController:(ABPeoplePickerNavigationController *)peoplePicker didSelectPerson:(ABRecordRef)person {
    [self displayPerson:person];
    [self dismissViewControllerAnimated:YES completion:nil];
}

- (IBAction)showPicker:(id)sender {
    
    ABPeoplePickerNavigationController *picker = [[ABPeoplePickerNavigationController alloc] init];
    picker.peoplePickerDelegate = self;
    
    [self presentViewController:picker animated:YES completion:nil];
    
}

-(void)displayPerson:(ABRecordRef)person {
    NSString *name = (__bridge NSString *)(ABRecordCopyValue(person, kABPersonFirstNameProperty));
    self.firstName.text = name;
    
    NSString *phone = nil;
    ABMultiValueRef phoneNumber = ABRecordCopyValue(person, kABPersonPhoneProperty);
    if (ABMultiValueGetCount(phoneNumber) > 0) {
        phone = (__bridge NSString *)(ABMultiValueCopyValueAtIndex(phoneNumber, 0));
    } else {
        phone = @"[None]";
    }
    
    self.phoneNumber.text = phone;
    CFRelease(phoneNumber);
}

@end
