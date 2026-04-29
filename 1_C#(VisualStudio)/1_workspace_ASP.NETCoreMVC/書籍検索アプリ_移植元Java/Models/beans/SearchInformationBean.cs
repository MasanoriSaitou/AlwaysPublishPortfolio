namespace 書籍検索アプリ_移植元Java.Models.beans {

    [Serializable]
    public class SearchInformationBean {

        public List<BookDataBean>? SearchResultList { get; set; }
        public int? SelectNo { get; set; }
        public string? KeyWord { get; set; }
        public string? PushedButton { get; set; }
        public string? PushedRadio { get; set; }
        public string[]? PushedChkBox { get; set; }

        // ★ Java と同じく、引数なしコンストラクタで初期化
        public SearchInformationBean() {

            InitializeField();
        }

        // ★ Java と同じく、引数ありコンストラクタ
        public SearchInformationBean(

            List<BookDataBean> searchResultList,
            int? selectNo,
            string keyWord,
            string pushedButton,
            string pushedRadio,
            string[] pushedChkBox) {

            InitializeField(searchResultList, selectNo, keyWord, pushedButton, pushedRadio, pushedChkBox);
        }

        private void InitializeField() {

            SearchResultList = new();
            SelectNo = null;
            KeyWord = "";
            PushedButton = "";
            PushedRadio = "";
            PushedChkBox = Array.Empty<string>();
        }

        private void InitializeField(

            List<BookDataBean> searchResultList,
            int? selectNo,
            string keyWord,
            string pushedButton,
            string pushedRadio,
            string[] pushedChkBox) {

            SearchResultList = searchResultList;
            SelectNo = selectNo;
            KeyWord = keyWord;
            PushedButton = pushedButton;
            PushedRadio = pushedRadio;
            PushedChkBox = pushedChkBox;
        }
    }
}