//
//  FirstAppViewController.h
//  iOSStudy-Cocoa
//
//  Created by Vetech on 15/7/23.
//  Copyright (c) 2015年 BFL. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>

@interface FirstAppViewController : UIViewController<UIAlertViewDelegate> {
    
    IBOutlet UILabel *scoreLabel;
    IBOutlet UILabel *timerLabel;
    
    NSInteger count;
    NSInteger seconds;
    NSTimer *timer;
    
    AVAudioPlayer *buttonBeep;
    AVAudioPlayer *secondBeep;
    AVAudioPlayer *backgroundMusic;
    
}

- (IBAction)butonPressed;
- (AVAudioPlayer*)setupAudioPlayerWithFile:(NSString*)file type:(NSString*)type;
- (void)setupGame;

@end
