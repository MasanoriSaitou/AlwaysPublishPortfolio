using Microsoft.AspNetCore.Mvc;
using 書籍検索アプリ_移植元Java.Models;

namespace 書籍検索アプリ_移植元Java.Controllers
{
    public class BookSearchController : Controller
    {
        private readonly BookSearchManager bookSearchManager;

        public BookSearchController(IWebHostEnvironment env)
        {
            bookSearchManager = new();

            // wwwroot/Resources/bookDataList.csv の絶対パスを取得
            var filePath = Path.Combine(env.WebRootPath, "Resources", "bookDataList.csv");

            // CSV を読み込む（Java の init() 相当）
            bookSearchManager.LoadBookDatas(filePath);
        }

        [HttpGet]
        public IActionResult BookSearchScreen()
        {
            return View();
        }

        [HttpPost]
        public IActionResult BookSearchScreen(string keyWord, string pushedButton, string pushedRadio, string[] pushedChkBox)
        {
            // ここに検索ロジックを入れていく
            // Java の doPost と同じ役割

            // とりあえず動作確認用
            ViewBag.Message = $"keyWord={keyWord}, button={pushedButton}";
            return View();
        }
    }
}