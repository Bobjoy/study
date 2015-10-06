public class Test {
  public static void main(String[] args) {
    String name1 = "山风小子";
    String name2 = new String("山风小子");
    // Groovy中写为 name1 == name2
    if (name1.equals(name2)) {
      System.out.println("equal");
    } else {
      System.out.println("not equal"); 
    }
    // Groovy中写为 name1.is(name2)
    if (name1 == name2) {
      System.out.println("identical");
    } else {
      System.out.println("not identical"); 
    } 
}