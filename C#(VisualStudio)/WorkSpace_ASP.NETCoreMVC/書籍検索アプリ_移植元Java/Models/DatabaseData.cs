using 書籍検索アプリ_移植元Java.Models.beans;

namespace 書籍検索アプリ_移植元Java.Models
{
    public class DatabaseData : ILoadData{
	
		public BookDataBean[] BookDataBeanGet() {
		
			try {
			
				return BookDataListDAO.FindAll().ToArray();
			}catch(Exception e) {
			
				Console.WriteLine("例外が発生しましたが、問題なく継続できました。");
				return Array.Empty<BookDataBean>();
			}
		}
	}
}
