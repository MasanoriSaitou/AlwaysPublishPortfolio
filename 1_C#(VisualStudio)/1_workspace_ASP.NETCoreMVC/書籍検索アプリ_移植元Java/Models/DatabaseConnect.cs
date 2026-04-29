using MySql.Data.MySqlClient;
using System.Data;
using 書籍検索アプリ_移植元Java.Models.interfaces;

namespace 書籍検索アプリ_移植元Java.Models {
    public class DatabaseConnect : IDatabaseConnector {

        //DB接続用定数
        private const string SERVER_NAME = "localhost";
        private const string DATABASE_NAME = "booksearchsystem";
        private const string PROPATIES = "Charset=utf8mb4;AllowPublicKeyRetrieval=true";
        //DB接続用・ユーザ定数
        private const string USER = "root";
        private const string PASS = "12345";

        // "Server=localhost;Database=booksearchsystem;User Id=aaaa;Password=aaaa;Charset=utf8;SslMode=none;AllowPublicKeyRetrieval=true;";
        private readonly string connectionString = $"Server={SERVER_NAME};Database={DATABASE_NAME};" +
            $"User ID={USER};Password={PASS};{PROPATIES};";

        //----------
        //コンストラクタ
        public DatabaseConnect() {
        }

        public IDbConnection CreateConnection() {

            return new MySqlConnection(connectionString);
        }
    }
}