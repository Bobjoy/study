/**
 * 1、折纸问题 
 * 请把纸条竖着放在桌面上，然后从纸条的下边向上边对折，压出折痕后再展 开。
 * 此时有1条折痕，突起的方向指向纸条的背面，这条折痕叫做“下”折痕 ；突起的方向指向纸条正面的折痕叫做“上”折痕。
 * 如果每次都从下边向上边 对折，对折N次。请从上到下打印所有折痕的方向。
 */

package com.bfl.study.algorithm;

public class Problem_06_PaperFolding {

	public static void printAllFolds(int N) {
		printProcess(1, N, true);
	}

	public static void printProcess(int i, int N, boolean down) {
		if (i > N) {
			return;
		}
		printProcess(i + 1, N, true);
		System.out.println(down ? "down " : "up ");
		printProcess(i + 1, N, false);
	}

	public static void main(String[] args) {
		int N = 3;
		printAllFolds(N);
	}
}