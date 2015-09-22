#include <stdio.h>

main()
{
	// declare an int variable and an int pointer variable
	int number;
	int* pointer;

	// set a value for 'number'
	number = 5;

	// now link 'pointer' to 'number' by putting the 'addressof'
	// operator (&) in front of the number variable
	pointer = &number;

	// print values of number and pointer
	printf("value of number: %i\n", number);
	printf("value of &number: %p\n", &number);
	printf("value of pointer: %p\n", pointer);

	// print value of pointer's target (number) using
	// the asterisk (*) operator
	printf("value of pointer's _target_: %i\n", *pointer);
}
