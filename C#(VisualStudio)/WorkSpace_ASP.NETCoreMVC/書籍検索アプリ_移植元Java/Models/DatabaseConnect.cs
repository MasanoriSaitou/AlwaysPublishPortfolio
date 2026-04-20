using MySql.Data.MySqlClient;

namespace 書籍検索アプリ_移植元Java.Models
{
    public class DatabaseConnect
    {
        //DB接続用定数
        private const string SERVER_NAME = "localhost";
	    private const string DATABASE_NAME = "booksearchsystem";
	    private const string PROPATIES = "Charset=utf8;SslMode=none;AllowPublicKeyRetrieval=true;";
        //DB接続用・ユーザ定数
	    private const string USER = "root";
	    private const string PASS = "12345";

        // "Server=localhost;Database=booksearchsystem;User Id=aaaa;Password=aaaa;Charset=utf8;SslMode=none;AllowPublicKeyRetrieval=true;";
        private const string connectionString = $"Server={SERVER_NAME};Database={DATABASE_NAME};" +
            $"User Id={USER};Password={PASS};{PROPATIES}";

        //----------
	    //コンストラクタ
	    public DatabaseConnect() {
	    }

        public MySqlCommand GetConnection(string sql){
		
            using var conn = new MySqlConnection(connectionString);
            conn.Open();

            using var cmd = new MySqlCommand(sql, conn);

            return cmd;
        }
    }
}
