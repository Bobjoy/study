# coding=utf-8
# Name: 三门问题概率实验
# Author: X_AirDu
# Python Version: 2.7.9
# Describe: 实验前提为售货员说实话

import random

# 种子为0, 0, 1,其中1为正确答案（即冰汽水）
seed = [0, 0, 1]
# 存放问题的容器，目的为统计概率，基本结构为[[0, 0, 1], [1, 0, 0]...]
holder = []
# 容器总量
total = 0

def init():
    '''以seed为种子随机生成1000个问题并存于容器中'''
    for i in range(1000):
        holder.append(random.sample(seed, 3))
    global total
    total = float(len(holder))
    
def change():
    correct = 0.    # 选择正确的次数
    choose_num = 0    # 本回合选择的序号
    choose = 0    # 本回合的选择
    # 遍历容器，得到每个问题[0或1, 0或1, 0或1]列表
    for each in holder:
        # 随机生成0, 1, 2作为本回合选择想，分别对应第0瓶汽水，第1瓶汽水，第2瓶汽水
        choose_num = random.randint(0, 2)
        # 遍历问题，j为门（汽水）的下标，gate为具体门的值0或1（0非冰，1冰汽水）
        for gate,j in each:
            # 已选择的忽略
            if j == choose_num:
                continue
            '''
            下面解释一下：
            如果 gate == 0，非冰，相当于售货员告诉你“非冰”
            然后 continue，选择剩下的最后一瓶
            
            如果 gate != 0，冰，相当于售货员告诉你剩下的最后一瓶是“非冰”
            直接选择当前 gate
            '''
            if not gate:
                continue
            choose = gate
            if choose:
                correct += 1
    print '换之后正确的概率为：{0}%.'.format(correct/total * 100)

def not_change():
    correct = 0.
    choose_num = 0
    for each in holder:
        choose_num = random.randint(0, 2)
        for j, gate in enumerate(each):
            '''
            无论如何都不换
            '''
            if j == choose_num:
                if gate:
                    correct += 1
                    break
    print '不换时正确的概率为：{0}%.'.format(correct/total * 100)
    
if __name__ == '__main__':
    init()
    change()
    not_change()