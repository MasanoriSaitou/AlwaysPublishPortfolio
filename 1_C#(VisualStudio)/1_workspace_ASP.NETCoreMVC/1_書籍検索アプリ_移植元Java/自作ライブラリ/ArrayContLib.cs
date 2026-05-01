namespace 書籍検索アプリ_移植元Java.自作ライブラリ
{
    public static class ArrayContLib
    {
        public static T[] ArrayConcat<T>(T[] a, T[] b)
        {
            var result = new T[a.Length + b.Length];

            // a をコピー
            Array.Copy(a, 0, result, 0, a.Length);

            // b をコピー
            Array.Copy(b, 0, result, a.Length, b.Length);

            return result;
        }
    }
}