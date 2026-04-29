package 自作ライブラリ;

import java.util.Arrays;

public class ArrayContLib {

	public static <T> T[] arrayConcat(T[] a, T[] b) {
			
		T[] result = Arrays.copyOf(a, a.length + b.length);
	    System.arraycopy(b, 0, result, a.length, b.length);
	    return result;
	}
}