package com.bfl.study.java8.lambda2.defltMthd;

public class Car implements VehicleInterface {

	private String name;
	private String model;
	private int CC;
	private int makeYear;
	public Car(String name, String model, int CC, int makeYear) {
		super();
		this.name = name;
		this.model = model;
		this.CC = CC;
		this.makeYear = makeYear;
	}
	
	@Override
	public String getName() {
		return name;
	}
	@Override
	public void setName(String name) {
		this.name = name;
	}
	@Override
	public String getModel() {
		return model;
	}
	@Override
	public void setModel(String model) {
		this.model = model;
	}
	@Override
	public int getCC() {
		return CC;
	}
	@Override
	public void setCC(int cc) {
		this.CC = cc;
	}
	@Override
	public int getMakeYear() {
		return makeYear;
	}
	@Override
	public void setMakeYear(int makeYear) {
		this.makeYear = makeYear;
	}
	
	
}
