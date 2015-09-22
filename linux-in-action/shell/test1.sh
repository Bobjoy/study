#!/bin/bash
# test1.sh

var=123
echo "PID is $$"
(var=456;echo "PID is $$")
echo "var=$var"

exit 0
