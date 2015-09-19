//
//  FirstAppViewController.m
//  iOSStudy-Cocoa
//
//  Created by Vetech on 15/7/23.
//  Copyright (c) 2015年 BFL. All rights reserved.
//

#import "FirstAppViewController.h"

@interface FirstAppViewController ()

@end

@implementation FirstAppViewController

- (AVAudioPlayer*)setupAudioPlayerWithFile:(NSString*)file type:(NSString*)type {
    NSString *path = [[NSBundle mainBundle] pathForResource:file ofType:type];
    NSURL *url = [NSURL fileURLWithPath:path];
    
    NSError *error;
    
    AVAudioPlayer *audioPlayer = [[AVAudioPlayer alloc] initWithContentsOfURL:url error:&error];
    
    if (!audioPlayer) {
        NSLog(@"%@", [error description]);
    }
    
    return audioPlayer;
}


- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    self.view.backgroundColor = [UIColor purpleColor];
    self.view.backgroundColor = [UIColor colorWithPatternImage:[UIImage imageNamed:@"bg_tile"]];
    
    scoreLabel.backgroundColor = [UIColor colorWithPatternImage:[UIImage imageNamed:@"field_score"]];
    timerLabel.backgroundColor = [UIColor colorWithPatternImage:[UIImage imageNamed:@"field_time"]];
    
    buttonBeep = [self setupAudioPlayerWithFile:@"ButtonTap" type:@"wav"];
    secondBeep = [self setupAudioPlayerWithFile:@"SecondBeep" type:@"wav"];
    backgroundMusic = [self setupAudioPlayerWithFile:@"HallOfTheMountainKing" type:@"mp3"];
    
    [self setupGame];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)butonPressed {
    count++;
    scoreLabel.text = [NSString stringWithFormat:@"Score\n%li", count];
    
    [buttonBeep play];
}

- (void)setupGame {
    seconds = 30;
    count = 0;
    
    timerLabel.text = [NSString stringWithFormat:@"Timer : %li", seconds];
    scoreLabel.text = [NSString stringWithFormat:@"Score\n%li", count];
    
    timer = [NSTimer scheduledTimerWithTimeInterval:1.0f
                                             target:self
                                           selector:@selector(subtractTime)
                                           userInfo:nil
                                            repeats:YES];
    
    [backgroundMusic setVolume:0.3];
    [backgroundMusic play];
}

- (void)subtractTime{
    seconds--;
    timerLabel.text = [NSString stringWithFormat:@"Time : %li", seconds];
    
    [secondBeep play];
    
    if (seconds == 0) {
        [timer invalidate];
        
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Time is up!"message:[NSString stringWithFormat:@"You scored %li points", count] delegate:self cancelButtonTitle:@"Play Again" otherButtonTitles:nil];
        [alert show];
    }
}

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex {
    [self setupGame];
}

@end
