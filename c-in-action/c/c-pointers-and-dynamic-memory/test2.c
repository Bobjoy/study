#include <stdio.h>

main()
{
	float myNumber;
	float myNumberCopy;
	float * myNumberPointer;

	// first, set an initial value
	myNumber = 1.618;

	// copy the value
	myNumberCopy = myNumber;

	// make a pointer to the value using the
	// ampersand, known as the "addressof" operator
	myNumberPointer = &myNumber;

	// change the original
	myNumber = 2.0;

	// now check the values.
	// by sure to use the star (*) to fetch the value
	// of myNumberPointer's target
	
	printf("myNumer: %f\n", myNumber);
	printf("myNumerCopy: %f\n", myNumberCopy);
	printf("myNumerPointer: %f\n", *myNumberPointer);
}
