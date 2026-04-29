using System.Data;

namespace 書籍検索アプリ_移植元Java.Models.interfaces {
    public interface IDatabaseConnector {
        IDbConnection CreateConnection();
    }
}
