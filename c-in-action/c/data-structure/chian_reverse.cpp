//============================================
// Name: chian_reverse.cpp
// Author: bobjoy
//============================================

#include <stdio.h>
#include <stdlib.h>

struct node
{
  int data;
  struct node* next;
};

static void reverse(struct node** head_ref)
{
  struct node* prev = NULL;
  struct node* curr = *head_ref;
  struct node* next;

  while (curr != NULL) 
  {
    next = curr->next;
    curr->next = prev;
    prev = curr;
    curr = next;
  }
  *head_ref = prev;
}

void push(struct node** head_ref, int new_data)
{
  struct node* new_node = (struct node*)malloc(sizeof(struct node));
  new_node->data = new_data;
  new_node->next = (*head_ref);
  (*head_ref) = new_node;
}

void printList(struct node* head)
{
  struct node* temp = head;
  while (temp != NULL)
  {
    printf("%d ", temp->data);
    temp = temp->next;
  }
}

int main()
{
  struct node* head = NULL;
  push(&head, 20);
  push(&head, 4);
  push(&head, 15);
  push(&head, 85);
  push(&head, 60);
  push(&head, 100);

  printList(head);
  reverse(&head);
  printf("\n Reversed Linked list \n");
  printList(head);
}
