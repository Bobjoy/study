/**
 * <code>
 * http://www.javacodegeeks.com/2015/07/java-se-8-new-features-tour-processing-collections-with-streams-api.html
 * </code>
 */

package com.bfl.study.java8.stream.traversing;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

import com.bfl.study.java8.bean.Person;

public class SequentialStream {

	private static void displayPeople(List<Person> people,
			Predicate<Person> pred) {

		System.out.println("Selected:");

		// for each with lambda expression
		people.forEach(p -> {
			if (pred.test(p)) {
				System.out.println(p.getName());
			}
		});

		System.out.println("--------------------");

		// Stream API
		people.stream().forEach(p -> System.out.println(p.getName()));

		System.out.println("--------------------");

		// Stream API with filter
		people.stream().filter(pred)
				.forEach(p -> System.out.println(p.getName()));
	}

	public static void main(String[] args) {
		List<Person> people = new ArrayList<>();

		people.add(new Person("Mohamed", 69));
		people.add(new Person("Doaa", 25));
		people.add(new Person("Malik", 6));

		Predicate<Person> pred = (p) -> p.getAge() > 65;

		displayPeople(people, pred);

	}
}
