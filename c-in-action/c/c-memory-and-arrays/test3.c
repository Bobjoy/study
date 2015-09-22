#include <stdio.h>
#include <time.h>

main()
{
	// seed the random number generator with the 
	// current time, then get a random number
	
	srand( time(NULL) );
	int randomNumber = rand() % 100;

	// create an aray of a random size
	
	int myArray[randomNumber];
	printf("Array size: %i slots\n", randomNumber);
}
