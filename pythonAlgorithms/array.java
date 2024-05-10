import java.util.ArrayList;
import java.util.Scanner;

public class array {
    public static void main(String[] args) {
        ArrayList<Integer> newList = new ArrayList<>();
        Scanner input = new Scanner(System.in);
        int val = input.nextInt();
        while (val != 0) {
            newList.add(val);
            val = input.nextInt();
        }
        String printval = newList.get(newList.size() - 2);
        for (int i = newList.size() - 2; i <= 0; i--) {
            printval += " - " + newList.get(i);
        }
        System.out.println(printval);
    }
}