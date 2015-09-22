#include <stdio.h>
#include <stdlib.h> // for calloc and free
#include <time.h>   // for random seeding

main()
{
	const int count = 10;
	int * memoryBlock = calloc( count, sizeof(int) );

	if ( memoryBlock == NULL ) {
		// we can't assume the memoryBlock pointer is valid.
		// if it's NULL, something's wrong and we just exit
		return 1;
	}

	// currentSlot will hold the current 'slot' in the
	// array allowing us to move forward without losing
	// track of the beginning. Yes, C arrays are primitive
	//
	// Note we don't have to do '&memoryBlock' because
	// we don't want a pointer to a pointer. All we
	// want is a _copy_of the same memory address
	
	int * currentSlot = memoryBlock;

	// seed random number so we can generate values
	srand( time(NULL) );

	int i;
	for ( i = 0; i < count; i++ ) {
		// use the star to set the value at the slot,
		// then advance the pointer to the next slot
		*currentSlot = rand();
		currentSlot++;
	}

	// reset the pointer back to the beginning of the
	// memory block (slot 0)
	currentSlot = memoryBlock;

	for ( i = 0; i < count; i++ ) {
		// use the star to get the value at this slot
		// then advance the pointer
		printf("Value at slot %i: %i\n", i, *currentSlot);
		currentSlot++;
	}

	// we're all done with this memory block so we can free it
	free( memoryBlock );
}
