#include <stdio.h>

// this global variable resides in the data segment
int globalMonsters = 2;

void addFourMonsters()
{
	// this variable uses memory in the stack
	int stackMonsters = 4;

	// we add the value of the stack variable to the
	// global variable
	globalMonsters += stackMonsters;
}

main()
{
	printf("Global monsters: %i\n", globalMonsters);
	addFourMonsters();
	printf("Global monsters: %i\n", globalMonsters);
	addFourMonsters();
	printf("Global monsters: %i\n", globalMonsters);
}
