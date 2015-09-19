//
//  syntax.c
//  iOSStudy-C
//
//  Created by Vetech on 15/7/23.
//  Copyright (c) 2015年 BFL. All rights reserved.
//

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "message.h"

#define PI 3.14
#define R 10
#define S 2*PI*R

#define COUNT 1

int count;
extern void write_extern();

void changeValue(int a[]) {
    a[0] = 10;
}

char *toUpper(char *a) {
    char *b = a;
    int len = 'a' - 'A';
    while (*a!='\0') {
        if (*a>'a' && *a < 'z') {
            *(a++) -= len;
        }
    }
    return b;
}

int sum(int a, int b) {
    return a + b;
}

int sub(int a, int b) {
    return a - b;
}

int operate(int a, int b, int (*p)(int, int)) {
    return p(a, b);
}

struct {
    unsigned int widthValidated;
    unsigned int heightValidated;
} status1;

struct {
    unsigned int widthValidated : 1;
    unsigned int heightValidated : 1;
} status2;

void studySyntax(void) {
    //    showMessage();
    //
    //    // Array
    //    //int len = 2;
    //    //int a[len] = {1, 2};
    //    int a[2];
    //    a[0] = 1;
    //    a[1] = 2;
    //
    //    int b['a'] = {1, 3, 4};
    //    for (int i = 0; i < 99; ++i) {
    //        printf("b[%d] = %d\n", i, b[i]);
    //    }
    //    int c[2*3];
    //    int d[] = {1,2,3};
    //
    //    // Array Extension
    //    int const l = 3;
    //    int e[l] = {1,2,3};
    //    for (int i = 0; i < l; i++) {
    //        printf("a[%d] = %d, address = %x\n", i, e[i], &e[i]);
    //    }
    //
    //    changeValue(a);
    //    for (int i = 0; i < 2; ++i) {
    //        printf("a[%d] = %d\n", i, a[i]);
    //    }
    //
    //    // String OP
    //    putchar('a');
    //    printf("\n");
    //    putchar(97);
    //    printf("\n");
    //
    //    char ca;
    //    ca = getchar();
    //    printf("a = %c", ca);
    //    printf("\n");
    //
    //    char cb[] = "Kenshin";
    //    printf("b = %s", cb);
    //    printf("\n");
    //    puts(cb);
    //    printf("\n");
    //
    //    // Pointer
    //    int pa = 1;
    //    int *p;
    //    p = &pa;
    //    printf("address(pa) = %x, address(p) = %x\n", &pa, p);
    //    printf("pa = %d, p = %d\n", pa, *p);
    //    *p = 2;
    //    printf("pa = %d, *p = %d\n", pa, *p);
    
    printf("\n====>>> 函数指针\n");
    char aa[] = "hello";
    char *pp = toUpper(aa);
    printf("%s\n", pp);
    
    printf("\n====>>> 返回多个参数\n");
    int a = 1, b = 2;
    int (*p)(int, int) = sum;
    int c = p(a, b);
    printf("a+b = %d\n", c);
    
    printf("%d\n", operate(a, b, sum));
    printf("%d\n", operate(a, b, sub));
    
    printf("\n====>>> 宏定义\n");
    float r = 10.5;
    double area = PI*r*r;
    printf("area = %.2f\n", area);
    
    double sa = S;
    printf("sa = %.2f\n", sa);
#undef PI
    int PI = 3.1415926;
    double area2 = PI*r*r;
    printf("area2 = %.2f\n", area2);
    
    printf("\n====>>> 条件编译\n");
#if defined(COUNT)
    printf("COUNT defined\n");
#endif
    
#if COUNT == 1
    showMessage("Hello, world");
#else
    showMessage("hehehe");
#endif
    
    printf("\n====>>> 存储方式\n");
    int a2 = 1;
    auto int b2 = 2;
    printf("a2 = %d, b2 = %d\n", a2, b2);
    
    char c2[] = "hello world";
    printf("c2.length = %lu\n", strlen(c2));
    long len = strlen(c2)*sizeof(int)+1;
    printf("len = %lu\n", len);
    char *p2 = NULL;
    p2 = (char *)malloc(len);
    memset(p2, 0, len);
    strcpy(p2, c2);
    printf("p2 = %s, p2.length = %lu\n", p2, strlen(p2));
    free(p2);
    p = NULL;
    
    printf("\n====>>> Extern\n");
    count = 5;
    write_extern();
    
    printf("Memory size occupied by status1: %lu\n", sizeof(status1));
    printf("Memory size occupied by status2: %lu\n", sizeof(status2));
}