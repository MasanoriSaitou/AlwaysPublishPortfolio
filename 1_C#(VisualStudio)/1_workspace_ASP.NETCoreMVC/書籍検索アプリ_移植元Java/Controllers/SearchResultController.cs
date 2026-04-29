using Microsoft.AspNetCore.Mvc;
using 書籍検索アプリ_移植元Java.Extensions;
using 書籍検索アプリ_移植元Java.Models;
using 書籍検索アプリ_移植元Java.Models.beans;

namespace 書籍検索アプリ_移植元Java.Controllers {
    public class SearchResultController(BookSearchManager bookSearchManager) : Controller {

        private readonly BookSearchManager bookSearchManager = bookSearchManager;

        // URL：/SearchResult/SearchResultScreen?selectNo=3
        public IActionResult SearchResultScreen(int selectNo) {

            // Java の request.getAttribute("resultRecord") に相当
            //BookDataBean? resultRecord = bookSearchManager.GetRecord(selectNo);
            // Session から検索結果のリストを取得
            List<BookDataBean>? resultList =
                HttpContext.Session.GetObject<SearchInformationBean>("SearchInfo")?.SearchResultList;

            if (resultList == null) {
                // データが無いときのフォールバック
                return RedirectToAction("BookSearchScreen", "BookSearch");
            }

            // Java の resultList.get(selectNo) に相当
            int index = selectNo;

            if (index < 0 || index >= resultList.Count) {
                return RedirectToAction("BookSearchScreen", "BookSearch");
            }
            BookDataBean resultRecord = resultList[index];

            return View(resultRecord); // ← Razor に Model として渡す
        }
    }
}