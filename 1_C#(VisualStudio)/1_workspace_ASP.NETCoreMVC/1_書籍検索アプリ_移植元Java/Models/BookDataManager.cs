using System.Text.RegularExpressions;
using 書籍検索アプリ_移植元Java.Models.beans;

namespace 書籍検索アプリ_移植元Java.Models
{
    public class BookDataManager {
	
		public delegate string FunctionPointer(BookDataBean bookData);
		public readonly FunctionPointer[] SEARCH_TARGET_ARRAY;
		private readonly CsvData csvData;
		private readonly DatabaseData databaseData;
	
		//----------
		//コンストラクタ
		public BookDataManager() {
		
			SEARCH_TARGET_ARRAY = [

				//検索は上のものから順に探す
				//本のタイトルで検索
				//GetBookName,
				//著者で検索
				//GetAuthor,
				//架空ISBNコードで検索
				//GetFictitiousISBN,
			];
			csvData = new();
			databaseData = new();
		}

		public BookDataBean[] LoadBookDatas(string filePath) {
		
			return csvData.LoadBookDatas(filePath);
		}
	
		public bool StringRegexCheck(string target, string keyword)
		{
			var regex = ".*" + Regex.Escape(keyword) + ".*";
			return Regex.IsMatch(target, regex);
		}


		//public string GetBookName(BookDataBean bookData) {
		
		//	//本のタイトルで検索
		//	return bookData.BookName;
		//}
	
		//public string GetAuthor(BookDataBean bookData) {
			
		//	//著者で検索
		//	return bookData.getAuthor();
		//}
	
		//public string GetFictitiousISBN(BookDataBean bookData) {
		
		//	//架空ISBNコードで検索
		//	return bookData.getFictitiousISBN();
		//}
	
		public BookDataBean[] MergedBookDataBeanGet(string[] chkBoxDataArray)
		{
			var list = new List<ILoadData>();

			// ファイルから検索
			if (chkBoxDataArray.Contains("fromFileSearch"))
			{
				list.Add(csvData);
			}

			// データベースから検索
			if (chkBoxDataArray.Contains("fromDataBaseSearch"))
			{
				list.Add(databaseData);
			}

			// 両方 or 片方でも CompositeLoadData にまとめる
			ILoadData loadData = new CompositeLoadData(list);

			return loadData.BookDataBeanGet();
		}
	}
}