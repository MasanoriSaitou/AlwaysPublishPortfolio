using System.Text;

namespace 書籍検索アプリ_移植元Java.自作ライブラリ
{
    public static class TextFileLib
    {
        // CSV → string[][] に変換
        public static string[][] ReaderCsvData(string filePath, string encode, bool isTitleRemove)
        {
            var result = new List<string[]>();

            try
            {
                Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
                using var reader = new StreamReader(
                    filePath,
                    Encoding.GetEncoding(encode),
                    detectEncodingFromByteOrderMarks: true
                );

                string? line;
                while ((line = reader.ReadLine()) != null)
                {
                    var data = line.Split(',');
                    result.Add(data);
                }

                if (isTitleRemove && result.Count > 0)
                {
                    result.RemoveAt(0);
                }

                return result.ToArray();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Array.Empty<string[]>();
            }
        }
    }
}