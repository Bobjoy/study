public class Test {
  public static void main(String[] args) {
    String name1 = "ɽ��С��";
    String name2 = new String("ɽ��С��");
    // Groovy��дΪ name1 == name2
    if (name1.equals(name2)) {
      System.out.println("equal");
    } else {
      System.out.println("not equal"); 
    }
    // Groovy��дΪ name1.is(name2)
    if (name1 == name2) {
      System.out.println("identical");
    } else {
      System.out.println("not identical"); 
    } 
}