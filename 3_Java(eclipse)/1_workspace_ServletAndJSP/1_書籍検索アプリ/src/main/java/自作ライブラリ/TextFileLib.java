package 自作ライブラリ;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;

public class TextFileLib{
	
	//------------
	//CSV=>Stringの二次元配列に変換
	//isTitleRemoveにtrueが入れば、先頭行を削除する
	public static String[][] readerCsvData(String filePath,String encode,boolean isTitleRemove) {
		
		//ファイル読み込みで使用する３つのクラス
		FileInputStream fi = null;
		InputStreamReader is = null;
		BufferedReader br = null;
		
		String[][] result = {};
		
		try {
		
			//読み込みファイルのインスタンス生成
			//ファイル名を指定する
			fi = new FileInputStream(filePath);
			is = new InputStreamReader(fi,encode);
			br = new BufferedReader(is);
		
			//読み込み行
			String line;
			
			//読み込み行数の管理
			int i = 0;
			
			//二次元のArrayListを用意する
			var list = new ArrayList<ArrayList<String>>();
			
			//1行ずつ読み込みを行う
			while ((line = br.readLine()) != null) {
			
			  //カンマで分割した内容を配列に格納する
			  String[] data = line.split(",");
				
			  //配列の中身を格納する
		      list.add(new ArrayList<String>());
			  for(String str:data) {
				  list.get(i).add(str);
			  }
			  //行数のインクリメント
			  i++;	
			}
			
			//配列に戻す
			if(isTitleRemove) {
				list.remove(0);
			}
			result = new String[list.size()][];
			for(i = 0; i<list.size();i++) {
				result[i] = list.get(i).toArray(new String[list.get(i).size()]);
			}
			//try-catchでreturnする場合、先にfinallyから実行される
			return result;	
		  } catch (Exception e) {
		    e.printStackTrace();
		    return result;
		  } finally {
			    try {
			      br.close();
			    } catch (Exception e) {
			      e.printStackTrace();
			    }
		  }
	}
}
