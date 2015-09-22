#include <stdio.h>
#include <stdlib.h>

int main()
{
	// number of strings
	const int count = 5;

	// declare an array of strings
	char ** stringArray = calloc( count, sizeof(char*) );
	printf("stringArray address: %p\n", stringArray);

	// if the memory we asked for isn't available, return
	if ( stringArray == NULL ) {
		return 1;
	}

	// this is what we'll use to move throuth the
	// memory block
	char ** currentString = stringArray;
	int i;

	printf("Initial currentString address: %p\n", currentString);

	// now we have to loop through the memory block and
	// allocate memory for a string at each "array" slot.
	//
	// note that the asprintf() function doesn't return
	// the string. Instead, it writes directly to the
	// slot in the memory block
	for ( i = 0; i < count; i++ ) {
		asprintf( currentString, "String %i", i );
		currentString++;
		printf("currentString address: %p\n", currentString);
	}

	// reset memory block to the original address.
	// In other words, go the beginning of the 'array'
	currentString = stringArray;
	printf("currentString address after reset: %p\n", currentString);

	// display the string at this particular slot.
	// we have to use the star to de-refrence
	for ( i = 0; i < count; i++ ) {
		printf("%s\n", *currentString);
		currentString++;
	}

	// reset
	currentString = stringArray;

	// loop through and free the memory for the
	// string at each slot
	for ( i = 0; i < count; i++ ) {
		free(*currentString);
		currentString++;
	}

	// now free the memory block itself
	free(stringArray);
}
