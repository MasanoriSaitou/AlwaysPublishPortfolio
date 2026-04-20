using MySql.Data.MySqlClient;
using Mysqlx.Crud;
using 書籍検索アプリ_移植元Java.Models.beans;

namespace 書籍検索アプリ_移植元Java.Models
{
   public class BookDataListDAO {
	
		//DAO
		private const string FIND_ALL_SQL =
			"SELECT * FROM bookdatalistdb";

		private const string FIND_BY_AUTHOR_SQL =
			"SELECT * FROM bookdatalistdb WHERE author = @author";


		//----------
		//コンストラクタ
		public BookDataListDAO() {
		}
	
		// 全件取得
        public static List<BookDataBean> FindAll()
        {
            return QueryExecute(FIND_ALL_SQL);
        }

		// 著者で検索
        public static List<BookDataBean> FindByAuthor(string author)
        {
            return QueryExecute(FIND_BY_AUTHOR_SQL, ("@author", author));
        }
	
		// 共通クエリ実行
        private static List<BookDataBean> QueryExecute(string sql, params (string name, object value)[] parameters)
        {
            var list = new List<BookDataBean>();

            try
            {
                //DB接続
			    using MySqlCommand cmd = new DatabaseConnect().GetConnection(sql);

                // パラメータ設定
                foreach (var (name, value) in parameters)
                {
                    cmd.Parameters.AddWithValue(name, value ?? DBNull.Value);
                }

                using var reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    list.Add(MapRow(reader));
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

            return list;
        }


        // 1行 → BookDataBean に変換
        private static BookDataBean MapRow(MySqlDataReader rs) => new(

            rs["fictitiousISBN"]?.ToString() ?? "",
            rs["bookName"]?.ToString() ?? "",
            rs["author"]?.ToString() ?? "",
            rs["publicationDate"]?.ToString() ?? "",
            rs["issuer"]?.ToString() ?? "",
            rs["publisher"]?.ToString() ?? "",
            rs["printingShop"]?.ToString() ?? ""
        );
    }
}