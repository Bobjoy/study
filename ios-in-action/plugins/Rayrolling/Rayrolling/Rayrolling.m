//
//  Rayrolling.m
//  Rayrolling
//
//  Created by Vetech on 15/6/11.
//  Copyright (c) 2015年 BFL. All rights reserved.
//

#import "Rayrolling.h"

@interface Rayrolling()

@property (nonatomic, strong, readwrite) NSBundle *bundle;
@property (nonatomic, strong) NSMutableSet *notificationSet;
@end

@implementation Rayrolling

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
        
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(handleNotification:) name:nil object:nil];
        self.notificationSet = [NSMutableSet new];
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
        NSMenuItem *actionMenuItem = [[NSMenuItem alloc] initWithTitle:@"Reset Logger" action:@selector(doMenuAction) keyEquivalent:@""];
        //[actionMenuItem setKeyEquivalentModifierMask:NSAlphaShiftKeyMask | NSControlKeyMask];
        [actionMenuItem setTarget:self];
        [[menuItem submenu] addItem:actionMenuItem];
    }
}

// Sample Action, for menu item:
- (void)doMenuAction
{
    //NSAlert *alert = [[NSAlert alloc] init];
    //[alert setMessageText:@"Hello, World"];
    //[alert runModal];
    [self.notificationSet removeAllObjects];
}

//
- (void)handleNotification:(NSNotification *)notifiaction {
    if (![self.notificationSet containsObject:notifiaction.name]) {
        NSLog(@"%@, %@", notifiaction.name, [notifiaction.object class]);
        [self.notificationSet addObject:notifiaction.name];
    }
}

- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

@end
