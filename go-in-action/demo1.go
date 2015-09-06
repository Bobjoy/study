package main

import "fmt"

func main() {
	var nums = []int{2, 4, 2, 6, 3423, 6, 78, 2, 7, 446}
	fmt.Println(nums)
	bubbleSort(nums)
	fmt.Print(nums)
}

func bubbleSort(nums []int) {
	for i := 0; i < len(nums); i++ {
		for j := 1; j < len(nums)-i; j++ {
			if nums[j] < nums[j-1] {
				nums[j], nums[j-1] = nums[j-1], nums[j]
			}
		}
	}
}
