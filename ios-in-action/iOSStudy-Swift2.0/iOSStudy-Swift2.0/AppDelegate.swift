//
//  AppDelegate.swift
//  iOSStudy-Swift2.0
//
//  Created by Vetech on 15/10/9.
//  Copyright © 2015年 BFL. All rights reserved.
//

import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?


    func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
        return true
    }
    
    func application(application: UIApplication, continueUserActivity userActivity: NSUserActivity, restorationHandler: ([AnyObject]?) -> Void) -> Bool {
        let friendID = userActivity.userInfo?["kCSSearchableItemActivityIdentifier"] as! String
    
        let navigationController = (window?.rootViewController as! UINavigationController)
        navigationController.popToRootViewControllerAnimated(false)
        let friendTableViewController = navigationController.viewControllers.first as! 
    }

}

