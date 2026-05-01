using System.Data;
using 書籍検索アプリ_移植元Java.Models.beans;

namespace 書籍検索アプリ_移植元Java.Models {
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
        public static List<BookDataBean> FindAll() {
            return QueryExecute(FIND_ALL_SQL);
        }

        // 著者で検索
        public static List<BookDataBean> FindByAuthor(string author) {
            return QueryExecute(FIND_BY_AUTHOR_SQL, ("@author", author));
        }

        // 共通クエリ実行
        private static List<BookDataBean> QueryExecute(string sql, params (string name, object value)[] parameters) {

            var list = new List<BookDataBean>();

            //DB接続
            using IDbConnection conn = new DatabaseConnect().CreateConnection();
            conn.Open();
            using IDbCommand cmd = conn.CreateCommand();
            cmd.CommandText = sql;

            // パラメータ設定（DB に依存しない書き方）
            foreach (var (name, value) in parameters) {

                var p = cmd.CreateParameter();
                p.ParameterName = name;
                p.Value = value ?? DBNull.Value;
                cmd.Parameters.Add(p);
            }

            using var reader = cmd.ExecuteReader();

            while (reader.Read()) {

                list.Add(MapRow(reader));
            }

            return list;
        }


        // 1行 → BookDataBean に変換
        private static BookDataBean MapRow(IDataRecord row) => new(

            row["fictitiousISBN"]?.ToString() ?? "",
            row["bookName"]?.ToString() ?? "",
            row["author"]?.ToString() ?? "",
            row["publicationDate"]?.ToString() ?? "",
            row["issuer"]?.ToString() ?? "",
            row["publisher"]?.ToString() ?? "",
            row["printingShop"]?.ToString() ?? ""
        );
    }
}