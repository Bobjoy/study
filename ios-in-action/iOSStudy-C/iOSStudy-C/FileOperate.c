//
//  FileOperate.c
//  iOSStudy-C
//
//  Created by Vetech on 15/7/24.
//  Copyright (c) 2015年 BFL. All rights reserved.
//

#include <stdio.h>
#include <stdlib.h>

void openFile() {
    FILE *fp;
    if ((fp = fopen("message.c", "r")) == NULL) {
        printf("The file can not be opend.\n");
        exit(1);
    }
    fclose(fp);
}