package com.bfl.study.java8.lambda2.staticMthd;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

import com.bfl.study.java8.lambda2.defltMthd.Car;
import com.bfl.study.java8.lambda2.defltMthd.VehicleInterface;

public class StaticMethod {
	public static void main(String[] args) {

		List<Car> cars = new ArrayList<>(4);

		cars.add(new Car("Mazda 3", "Mazda", 1600, 2008));
		cars.add(new Car("Mazda 6", "Mazda", 2500, 2009));
		cars.add(new Car("Mazda 2", "Mazda", 1400, 2008));
		cars.add(new Car("Mazda X5", "Mazda", 3600, 2014));

		Predicate<Car> pred = (v) -> v.getCC() > 1900 & v.getMakeYear() <= 2009;
		
		cars.forEach((Car c) -> {
			if (pred.test(c)) {
				// String info = c.getName()
				// + ", of Model [" + c.getModel() + "], with "
				// + c.getCC() + " (litter), manufactured at "
				// + c.getMakeYear();
				System.out.println(VehicleInterface.getVehicleInfo(c));
			}
		});
	}
}
