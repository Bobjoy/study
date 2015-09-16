package com.bfl.study.java8.lambda2.defltMthd;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

public class DefultMethod {

	public static void main(String[] args) {
		List<VehicleInterface> cars = new ArrayList<VehicleInterface>(4);
		cars.add(new Car("Mazda 3", "Mazda", 1600, 2008));
		cars.add(new Car("Mazda 6", "Mazda", 2500, 2009));
		cars.add(new Car("Mazda 2", "Mazda", 1400, 2008));
		cars.add(new Car("Mazda X5", "Mazda", 3600, 2014));
		
		Predicate<VehicleInterface> pred = (v) -> v.getCC() > 1990 & v.getMakeYear() <= 2009;
		
		cars.forEach(c -> {
			if (pred.test(c)) {
				System.out.println(c.getInfo());
			}
		});
	}
}
