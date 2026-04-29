using System.Text.Json;
namespace 書籍検索アプリ_移植元Java.Extensions {

    //////////////////////////////////
    /// SessionExtensionクラス
    /// 　→セッションに取り込む用の、クラスや配列等、複雑なオブジェクトをJSONにシリアライズ化するクラス
    /// </summary>
    public static class SessionExtension {

        public static void SetObject<T>(this ISession session, string key, T value) {
            session.SetString(key, JsonSerializer.Serialize(value));
        }

        public static T? GetObject<T>(this ISession session, string key) {
            var value = session.GetString(key);
            return value == null ? default : JsonSerializer.Deserialize<T>(value);
        }
    }
}