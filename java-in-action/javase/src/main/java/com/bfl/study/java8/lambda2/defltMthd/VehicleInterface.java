package com.bfl.study.java8.lambda2.defltMthd;

public interface VehicleInterface {

	String getName();

	void setName(String name);

	String getModel();

	void setModel(String name);

	int getCC();

	void setCC(int name);

	int getMakeYear();

	void setMakeYear(int name);

	default String getInfo() {
		return getName() + ", of Model [" + getModel() + "], with "
				+ getCC() + " (litter), manufactured at " + getMakeYear();
	}
	
	static String getVehicleInfo(Car c) {
		return c.getName()
				+ ", of Model [" + c.getModel() + "], with "
				+ c.getCC() + " (litter), manufactured at "
				+ c.getMakeYear();
	}
}
