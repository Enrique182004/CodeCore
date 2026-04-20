import java.util.Scanner;

public class SinglyLinkedList {
    // -------- Node --------
    static class Node {
        int data;
        Node next;

        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }

    // Returns the Head Node of a LinkedList.
    public Node getHead() {
        return head;
    }

    private Node head;

    // Display LinkedList:
    public void printList() {
        Node curr = head; // Node that will iterate through the LinkedList.

        while (curr != null) {
            System.out.print(curr.data + " -> "); // Print Node's data.
            curr = curr.next; // Point to the next Node.
        }
        System.out.println("null"); // Default final value.
    }

    // Helper method to create a LinkedList according to a size input.
    public SinglyLinkedList create(int size) {
        SinglyLinkedList ll = new SinglyLinkedList();
        ll.head = new Node(1);
            
        for (int i = 2; i <= size; i++) {
            ll.append(i);
        }
            
        return ll;
    }

    // Helper: Use prepend method.
    public SinglyLinkedList createprepend(int size) {
        SinglyLinkedList ll = new SinglyLinkedList();
        
        for (int i = 1; i <= size; i++) {
            ll.prepend(i);
        }
            
        return ll;
    }

    // Inserts a new Node at the end of the LinkedList.
    public void append(int value) {
        Node newNode = new Node(value);

        // If LinkedList empty, new newNode is the head.
        if (head == null) {
            head = newNode;
            return;
        }

        Node curr = head; // Node to iterate through the LinkedList.
        while (curr.next != null) {
            curr = curr.next; // Point to the next Node.
        }
        curr.next = newNode; // Make newNode be pointed by the last Node in the LinkedList.
    }

    // TODO: Make a method that inserts a new Node at the beggining of the LinkedList.
    public void prepend(int value) {
        Node newNode = new Node(value);
        // Write your code here
    }


    // Public method, gives the parameter to the helper.
    public int findMax() {
        return findMaxHelper(head, head.data);
    }

    // TODO: Complete the helper method that finds the max value in the LinkedList.
    private int findMaxHelper(Node curr, int max) {
        // Write your code here
        return -1;
    }

    public static void main(String [] args) {
        Scanner scan = new Scanner(System.in);
        int num = 1;

        System.out.println("CODE RUNS!");

        while (!(num < 1)) {
            System.out.print("Enter a positive integer: ");
            num = scan.nextInt();

            if (num < 1) System.out.println("Enter a positive number\n");
        }

        SinglyLinkedList LList = new SinglyLinkedList();
        LList = LList.create(num);

        System.out.println("===== YOUR LINKED LIST: =====");
        LList.printList();

        LList = LList.createprepend(num);
        System.out.println("=== LINKED LIST (PREPEND): ===");
        LList.printList();

        int max = LList.findMax();
        System.out.print("Max value in your Linked List: " + max);
    }
}