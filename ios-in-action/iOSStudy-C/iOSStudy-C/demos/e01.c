//
//  e01.c
//  iOSStudy-C
//
//  Created by Vetech on 15/7/23.
//  Copyright (c) 2015年 BFL. All rights reserved.
//

#include <stdio.h>
#include <math.h>

void cosLine() {
    double y;
    int x, m;
    
    for (y = 1; y >= -1; y -= 0.1) {
        m = acos(y) * 10;
        
        for (x = 1; x < m; x++) {
            printf(" ");
        }
        printf("*");
        for (; x < 62 - m; x++) {
            printf(" ");
        }
        printf("*\n");
    }
}