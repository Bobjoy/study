#!/bin/bash
# test2.sh

{
	while read line
	do
		echo $line
	done
} < $0 # 文件I/O重定向
