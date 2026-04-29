namespace 書籍検索アプリ_移植元Java.Models.beans {
    public class BookDataBean : ICloneable {
        // メンバ変数（Java の private と同じ）
        public string? FictitiousISBN { get; set; }
        public string? BookName { get; set; }
        public string? Author { get; set; }
        public DateTime? PublicationDate { get; set; }
        public string? Issuer { get; set; }
        public string? Publisher { get; set; }
        public string? PrintingShop { get; set; }

        // 引数なしコンストラクタ
        public BookDataBean() {

            InitializeField();
        }

        // 可変長引数コンストラクタ（Java の String... と同じ）
        public BookDataBean(params string[] strs) {

            InitializeField(strs);
        }

        private void InitializeField() {

            FictitiousISBN = "";
            BookName = "";
            Author = "";
            PublicationDate = new DateTime(1, 1, 1);
            Issuer = "";
            Publisher = "";
            PrintingShop = "";
        }

        private void InitializeField(string[] strs) {

            FictitiousISBN = strs[0];
            BookName = strs[1];
            Author = strs[2];
            PublicationDate = DateTime.ParseExact(strs[3], "yyyy/MM/dd", null);
            Issuer = strs[4];
            Publisher = strs[5];
            PrintingShop = strs[6];
        }

        public object Clone() {

            return new BookDataBean {
                FictitiousISBN = this.FictitiousISBN,
                BookName = this.BookName,
                Author = this.Author,
                PublicationDate = this.PublicationDate,
                Issuer = this.Issuer,
                Publisher = this.Publisher,
                PrintingShop = this.PrintingShop
            };
        }
    }
}