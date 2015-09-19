//
//  BFLPlugin.m
//  BFLPlugin
//
//  Created by Vetech on 15/7/20.
//  Copyright (c) 2015年 BFL. All rights reserved.
//

#import "BFLPlugin.h"

@interface BFLPlugin()

@property (nonatomic, strong) NSString *url;

@property (nonatomic, strong, readwrite) NSBundle *bundle;
@end

@implementation BFLPlugin

+ (instancetype)sharedPlugin
{
    return sharedPlugin;
}

- (id)initWithBundle:(NSBundle *)plugin
{
    if (self = [super init]) {
        // reference to plugin's bundle, for resource access
        self.bundle = plugin;
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(didApplicationFinishLaunchingNotification:)
                                                     name:NSApplicationDidFinishLaunchingNotification
                                                   object:nil];
        
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(notificationLog:)
                                                     name:nil
                                                   object:nil];
    }
    return self;
}

- (void)didApplicationFinishLaunchingNotification:(NSNotification*)noti
{
    //removeObserver
    [[NSNotificationCenter defaultCenter] removeObserver:self name:NSApplicationDidFinishLaunchingNotification object:nil];
    
    // Create menu items, initialize UI, etc.
    // Sample Menu Item:
    NSMenuItem *menuItem = [[NSApp mainMenu] itemWithTitle:@"Edit"];
    if (menuItem) {
        [[menuItem submenu] addItem:[NSMenuItem separatorItem]];
        NSMenuItem *actionMenuItem = [[NSMenuItem alloc] initWithTitle:@"Do Action" action:@selector(doMenuAction) keyEquivalent:@"E"];
        [actionMenuItem setKeyEquivalentModifierMask:NSControlKeyMask | NSAlternateKeyMask];
        [actionMenuItem setTarget:self];
        [[menuItem submenu] addItem:actionMenuItem];
    }
}

- (void)notificationLog:(NSNotification*)notify {
    NSLog(@"<><> %@ , flag %hhd", notify.name, [notify.name isEqualToString:@"transition from one file to another"]);
    if ([notify.name isEqualToString:@"transition from one file to another"] && [notify.object count] > 0) {
        
        NSURL *originURL = [[notify.object valueForKey:@"next"] objectForKey:@"documentURL"];
        
        if (originURL != nil && [originURL absoluteString].length >=7) {
            self.url = [originURL.absoluteString substringFromIndex:7];
            
            NSLog(@"<><><> %@", self.url);
        }
    }
}

// Sample Action, for menu item:
- (void)doMenuAction
{
    NSAlert *alert = [[NSAlert alloc] init];
    [alert setMessageText:@"message"];
    [alert runModal];
    //self.url = [self.url stringByURLDecodingStringParameter];
}

- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

@end
