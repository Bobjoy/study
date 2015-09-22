#include <stdio.h>
#include <time.h>

#define COUNT 5

main()
{
	// seed the random number generator with the
	// current time to get the ball rolling
	
	srand( time(NULL) );

	// this array uses stack memory because it's
	// declared inside of a function, The array
	// size is set by the COUNT constant
	
	int stackArray[COUNT];
	int i;

	// loop through and insert a random value
	// returned form the rand() function
	
	for( i = 0; i < COUNT; i++ ) {
		stackArray[i] = rand();
	}

	// loop through and print out the values at
	// each slot in the array
	
	for ( i = 0; i < COUNT; i++ ) {
		printf("Value %i: %i\n", i, stackArray[i]);
	}
}
