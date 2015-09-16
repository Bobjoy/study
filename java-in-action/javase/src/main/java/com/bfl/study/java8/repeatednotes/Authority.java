package com.bfl.study.java8.repeatednotes;

import java.lang.annotation.Repeatable;

@Repeatable(Authorities.class)
public @interface Authority{
	String role();
}