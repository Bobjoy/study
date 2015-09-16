/**
 * http://my.oschina.net/benhaile/blog/177148
 */

package com.bfl.study.java8.lambda2.staticMthd;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

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

		System.out.println("=============================================");
		/*
		 * 在数据流中实现过滤功能是首先我们可以想到的最自然的操作了。
		 * Stream接口暴露了一个filter方法，它可以接受表示操作的Predicate实现来使用定义了过滤条件的lambda表达式。
		 */
		Stream<Car> carStream = cars.stream().filter(
				c -> c.getMakeYear() > 2009);

		/*
		 * 假使我们现在过滤了一些数据，比如转换对象的时候。
		 * Map操作允许我们执行一个Function的实现（Function<T,R>的泛型T,R分别表示执行输入和执行结果），
		 * 它接受入参并返回。首先，让我们来看看怎样以匿名内部类的方式来描述它
		 */
		carStream = cars.stream().filter(c -> c.getMakeYear() > 2009)
				.map(new Function<Object, Car>() {
					@Override
					public Car apply(Object o) {
						Car c = (Car) o;
						c.setMakeYear(2010);
						return c;
					}
				});
		/*
		 * 现在，把上述例子转换成使用lambda表达式的写法
		 */
		carStream = cars.stream().filter(c -> c.getMakeYear() > 2009)
				.map(c -> new Car(c.getName(), c.getModel(), c.getCC(), 2010));

		/*
		 * count方法是一个流的终点方法，可使流的结果最终统计，返回int，比如我们计算一下满足18岁的总人数
		 */
		long count = carStream.count();
		System.out.println(count);

		System.out.println("=============================================");
		/*
		 * collect方法也是一个流的终点方法，可收集最终的结果
		 */
		cars = cars.stream().filter(c -> c.getMakeYear() < 2009)
				.map(c -> new Car(c.getName(), c.getModel(), c.getCC(), 2010))
				.collect(Collectors.toList());
		System.out.println(cars);

		System.out.println("=============================================");
		/*
		 * 或者，如果我们想使用特定的实现类来收集结果：
		 */
		cars = cars.stream().filter(c -> c.getMakeYear() > 2009)
				.map(c -> new Car(c.getName(), c.getModel(), c.getCC(), 2008))
				.collect(Collectors.toCollection(ArrayList::new));
		System.out.println(cars);

		System.out.println("=============================================");
		/*
		 * 顺序流与并行流 每个Stream都有两种模式：顺序执行和并行执行。
		 * 顾名思义，当使用顺序方式去遍历时，每个item读完后再读下一个item。
		 * 而使用并行去遍历时，数组会被分成多个段，其中每一个都在不同的线程中处理，然后将结果一起输出。
		 */
		// 顺序流：
		cars = cars.stream().collect(Collectors.toList());
		System.out.println(cars);
		// 并行流：
		cars = cars.parallelStream().collect(Collectors.toList());
		System.out.println(cars);

		System.out.println("=============================================");
		/*
		 * 顺序与并行性能测试对比
		 */
		long t0 = System.nanoTime();
		// 初始化一个范围100万整数流,求能被2整除的数字，toArray（）是终点方法
		int a[] = IntStream.range(0, 1_000_000).filter(p -> p % 2 == 0)
				.toArray();
		long t1 = System.nanoTime();
		
		// 和上面功能一样，这里是用并行流来计算
		int b[] = IntStream.range(0, 1_000_000).parallel()
				.filter(p -> p % 2 == 0).toArray();
		long t2 = System.nanoTime();
		
		// 我本机的结果是serial: 0.06s, parallel 0.02s，证明并行流确实比顺序流快
		System.out.printf("serial: %.2fs, parallel %.2fs%n", (t1 - t0) * 1e-9,
				(t2 - t1) * 1e-9);
	}
}
