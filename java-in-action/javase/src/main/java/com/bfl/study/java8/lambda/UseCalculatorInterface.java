package com.bfl.study.java8.lambda;

import com.bfl.study.java8.functional_interface.CalculatorInterface;
import static java.lang.System.out;

public class UseCalculatorInterface {

	public static void main(String[] args) {
		CalculatorInterface calc = (v1, v2) -> {
			int result = v1 * v2;
			out.println("The calculation result is: " + result);
		};
		
		calc.doCalculate(10, 5);
	}
}
