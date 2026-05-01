using Microsoft.AspNetCore.Mvc;
using 書籍検索アプリ_移植元Java.Extensions;
using 書籍検索アプリ_移植元Java.Models;
using 書籍検索アプリ_移植元Java.Models.beans;

namespace 書籍検索アプリ_移植元Java.Controllers {

    ///////////////////////////////////////////////////
    /// BookSearchControllerクラス
    /// →URL「/BookSearch/BookSearchScreen」が呼ばれると、
    ///   自動的に「BookSearch」+「Controller」という名称の付いた、
    ///   このクラスのインスタンスが生成され、Viewメソッドで、
    /// 　View/BookSearch/BookSearchScreenが呼ばれる

    public class BookSearchController(BookSearchManager bookSearchManager) : Controller {

        /// →Program.csでBookSearchManagerインスタンスの管理をASP.NET Coreに任せたため、
        /// プライマリコンストラクタで「BookSearchManager bookSearchManager = bookSearchManager」で
        /// DIコンテナが自動的にインスタンスを注入する
        private readonly BookSearchManager bookSearchManager = bookSearchManager;

        [HttpGet]
        public IActionResult BookSearchScreen() {

            // Session に SearchInfo があれば復元
            var info = HttpContext.Session.GetObject<SearchInformationBean>("SearchInfo");

            return View(info); // 初期表示 or 復元表示
        }

        [HttpPost]
        public IActionResult BookSearchScreen(string keyWord, string pushedButton, string pushedRadio, string[] pushedChkBox) {

            var searchInfo = new SearchInformationBean() {

                KeyWord = keyWord,
                PushedButton = pushedButton,
                PushedRadio = pushedRadio,
                PushedChkBox = pushedChkBox
            };

            // ここに検索ロジックを入れていく
            // Java の doPost と同じ役割
            return pushedButton switch {

                //-----------------
                //検索
                "検索" => SearchBookData(searchInfo),
                //-----------------
                //全件表示
                _ => AllBookDataDisplay(searchInfo),
            };
        }

        //-----------
        //検索
        public IActionResult SearchBookData(SearchInformationBean searchInfo) {

            searchInfo.SearchResultList = bookSearchManager.SearchBookData(searchInfo.KeyWord, searchInfo.PushedRadio, searchInfo.PushedChkBox);
            HttpContext.Session.SetObject("SearchInfo", searchInfo);
            return View(searchInfo);
        }

        //----------
        //全件表示
        public IActionResult AllBookDataDisplay(SearchInformationBean searchInfo) {

            searchInfo.SearchResultList = bookSearchManager.AllBookDataDisplay(searchInfo.PushedChkBox!);
            HttpContext.Session.SetObject("SearchInfo", searchInfo);
            return View(searchInfo);
        }
    }
}