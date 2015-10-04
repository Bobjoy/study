//
//  ViewController.m
//  iOSStudy-QQ
//
//  Created by Vetech on 15/10/4.
//  Copyright (c) 2015年 BFL. All rights reserved.
//

#import "ViewController.h"
#import "MainTabBarController.h"
#import "Common.h"
#import "LeftViewController.h"
#import "HomeViewController.h"

@interface ViewController ()
{
    // 该 TabBar Controller 不是传统意义上的容器，在此只负责提供 UITabBar 这个 UI 组件
    MainTabBarController* mainTabBarController;
    
    // 主界面点击手势，用于在菜单划出状态下点击主页后自动关闭菜单
    UITapGestureRecognizer* tapGesture;
    
    // 首页的 Navigation Bar 的提供者，是首页的容器
    UINavigationController* homeNavigationController;
    
    // 首页中间的主要视图的来源
    HomeViewController* homeViewController;
    
    // 侧滑菜单视图的来源
    LeftViewController* leftViewController;
    
    // 构造主视图，实现 UINavigationController.view 和 HomeViewController.view 一起缩放
    UIView* mainView;
    
    // 侧滑所需参数
    float distance;
    float FullDistance;
    float Proportion;
    CGPoint centerOfLeftViewAtBeginning;
    float proportionOfLeftView;
    float distanceOfLeftView;
    
    // 侧滑菜单黑色半透明遮罩层
    UIView* blackCover;
}

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    // 侧滑所需参数
    distance = 0;
    FullDistance = 0.78;
    Proportion = 0.77;
    proportionOfLeftView = 1;
    distanceOfLeftView = 50;
    
    // 给根容器设置背景
    UIImageView* imageView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"back"]];
    imageView.frame = [[UIScreen mainScreen] bounds];
    [self.view addSubview: imageView];
    
    // 通过 StoryBoard 取出左侧侧滑菜单视图
    //leftViewController = [[UIStoryboard storyboardWithName:@"Main" bundle:nil] instantiateViewControllerWithIdentifier:@"LeftViewController"];
    leftViewController = [[LeftViewController alloc] init];
    
    
    // 适配 4.7 和 5.5 寸屏幕的缩放操作，有偶发性小 bug
    if (kScreenWidth > 320) {
        proportionOfLeftView = kScreenWidth / 320;
        distanceOfLeftView += (kScreenWidth - 320) * FullDistance / 2;
    }
    leftViewController.view.center = CGPointMake(leftViewController.view.center.x - 50, leftViewController.view.center.y);
    leftViewController.view.transform = CGAffineTransformScale(CGAffineTransformIdentity, 0.8, 0.8);
    
    // 动画参数初始化
    centerOfLeftViewAtBeginning = leftViewController.view.center;
    // 把侧滑菜单视图加入根容器
    [self.view addSubview: leftViewController.view];
    
    // 在侧滑菜单之上增加黑色遮罩层，目的是实现视差特效
    blackCover = [[UIView alloc] initWithFrame: CGRectOffset(self.view.frame, 0, 0)];
    blackCover.backgroundColor = [UIColor blackColor];
    [self.view addSubview: blackCover];
    
    // 初始化主视图，即包含 TabBar、NavigationBar和首页的总视图
    mainView = [[UIView alloc] initWithFrame: self.view.frame];
    
    
    // 初始化 TabBar
    //NSArray* nibContents = [[NSBundle mainBundle] loadNibNamed:@"MainTabBarController" owner:nil options:nil];
    //MainTabBarController* mainTBController = [nibContents firstObject];
    
    MainTabBarController* mainTBController = [[MainTabBarController alloc] init];
    // 取出 TabBar Controller 的视图加入主视图
    UITabBar* tabBarView = (UITabBar*)mainTBController.view;
    [mainView addSubview: tabBarView];
    
    // 从 StoryBoard 取出首页的 Navigation Controller
    //homeNavigationController = [[UIStoryboard storyboardWithName:@"Main" bundle:nil] instantiateViewControllerWithIdentifier:@"HomeNavigationController"];
    homeNavigationController = [[UINavigationController alloc] init];
    
    // 从 StoryBoard 初始化而来的 Navigation Controller 会自动初始化他的 Root View Controller，即 HomeViewController
    // 我们将其（指针）取出，赋给容器 View Controller 的成员变量 homeViewController
    //homeViewController = homeNavigationController.viewControllers.firstObject;
    homeViewController = [[HomeViewController alloc] init];
    
    // 分别将 Navigation Bar 和 homeViewController 的视图加入 TabBar Controller 的视图
    [tabBarView addSubview: homeViewController.navigationController.view];
    [tabBarView addSubview: homeViewController.view];
    
    // 在 TabBar Controller 的视图中，将 TabBar 视图提到最表层
    [tabBarView bringSubviewToFront: mainTabBarController.tabBar];
     
    // 将主视图加入容器
    [self.view addSubview: mainView];
    
    // 分别指定 Navigation Bar 左右两侧按钮的事件
    homeViewController.navigationItem.leftBarButtonItem.action = @selector(showLeft);
    homeViewController.navigationItem.rightBarButtonItem.action = @selector(showRight);
    
    // 给主视图绑定 UIPanGestureRecognizer
    
    UIPanGestureRecognizer* panGesture = homeViewController.panGesture;
    [panGesture addTarget: self action: @selector(pan:)];
    [mainView addGestureRecognizer: panGesture];
    
    // 生成单击收起菜单手势
    tapGesture = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(showHome)];
    
    
}

// 响应 UIPanGestureRecognizer 事件
- (void)pan:(UIPanGestureRecognizer *)recongnizer
{
    int x = [recongnizer translationInView:self.view].x;
    int trueDistance = distance + x; // 实时距离
    int trueProportion = trueDistance / (kScreenWidth*FullDistance);
    
    // 如果 UIPanGestureRecognizer 结束，则激活自动停靠
    if (recongnizer.state == UIGestureRecognizerStateEnded) {
        
        if (trueDistance > kScreenWidth * (Proportion / 3)) {
            [self showLeft];
        } else if (trueDistance < kScreenWidth * -(Proportion / 3)) {
            [self showRight];
        } else {
            [self showHome];
        }
        
        return;
    }
    
    // 计算缩放比例
    CGFloat proportion = recongnizer.view.frame.origin.x >= 0 ? -1 : 1;
    proportion *= trueDistance / kScreenWidth;
    proportion *= 1 - Proportion;
    proportion /= FullDistance + Proportion/2 - 0.5;
    proportion += 1;
    if (proportion <= Proportion) { // 若比例已经达到最小，则不再继续动画
        return;
    }
    // 执行视差特效
    blackCover.alpha = (proportion - Proportion) / (1 - Proportion);
    // 执行平移和缩放动画
    recongnizer.view.center = CGPointMake(self.view.center.x + trueDistance, self.view.center.y);
    recongnizer.view.transform = CGAffineTransformScale(CGAffineTransformIdentity, proportion, proportion);
    
    // 执行左视图动画
    float pro = 0.8 + (proportionOfLeftView - 0.8) * trueProportion;
    leftViewController.view.center = CGPointMake(centerOfLeftViewAtBeginning.x + distanceOfLeftView * trueProportion, centerOfLeftViewAtBeginning.y - (proportionOfLeftView - 1) * leftViewController.view.frame.size.height * trueProportion / 2 );
    leftViewController.view.transform = CGAffineTransformScale(CGAffineTransformIdentity, pro, pro);
}

// 展示左视图
- (void)showLeft
{
    // 给首页 加入 点击自动关闭侧滑菜单功能
    [mainView addGestureRecognizer: tapGesture];
    // 计算距离，执行菜单自动滑动动画
    distance = self.view.center.x * (FullDistance*2 + Proportion - 1);
    [self doTheAnimate:Proportion showWhat:@"left"];
    //homeNavigationController.popToRootViewControllerAnimated(true);
    
}

// 展示主视图
- (void)showHome
{
    // 从首页 删除 点击自动关闭侧滑菜单功能
    [mainView removeGestureRecognizer: tapGesture];
    // 计算距离，执行菜单自动滑动动画
    distance = 0;
    [self doTheAnimate:1 showWhat:@"home"];
}

// 展示右视图
- (void)showRight
{
    // 给首页 加入 点击自动关闭侧滑菜单功能
    [mainView addGestureRecognizer: tapGesture];
    // 计算距离，执行菜单自动滑动动画
    distance = self.view.center.x * -(FullDistance*2 + Proportion - 1);
    [self doTheAnimate:Proportion showWhat:@"right"];
}

- (void)doTheAnimate:(CGFloat)proportion showWhat:(NSString *)showWhat
{
    [UIView animateWithDuration:.3 delay:0 options:UIViewAnimationOptionCurveEaseInOut animations:^{
        // 移动首页中心
        self->mainView.center = CGPointMake(self.view.center.x + self->distance, self.view.center.y);
        // 缩放首页
        self->mainView.transform = CGAffineTransformScale(CGAffineTransformIdentity, proportion, proportion);
        if ([showWhat  isEqualToString: @"left"]) {
            // 移动左侧菜单的中心
            self->leftViewController.view.center = CGPointMake(self->centerOfLeftViewAtBeginning.x + self->distanceOfLeftView, self->leftViewController.view.center.y);
            // 缩放左侧菜单
            self->leftViewController.view.transform = CGAffineTransformScale(CGAffineTransformIdentity, self->proportionOfLeftView, self->proportionOfLeftView);
        }
        // 改变黑色遮罩层的透明度，实现视差效果
        self->blackCover.alpha = [showWhat  isEqualToString: @"home"] ? 1 : 0;
        
        // 为了演示效果，在右侧菜单划出时隐藏漏出的左侧菜单，并无实际意义
        self->leftViewController.view.alpha = [showWhat  isEqualToString: @"right"] ? 0 : 1;
    } completion:nil];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
