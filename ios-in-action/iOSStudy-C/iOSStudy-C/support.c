//
//  support.c
//  iOSStudy-C
//
//  Created by Vetech on 15/7/21.
//  Copyright (c) 2015年 BFL. All rights reserved.
//

#include <stdio.h>

extern
int count;

void write_extern(void) {
    printf("count is %d\n", count);
}