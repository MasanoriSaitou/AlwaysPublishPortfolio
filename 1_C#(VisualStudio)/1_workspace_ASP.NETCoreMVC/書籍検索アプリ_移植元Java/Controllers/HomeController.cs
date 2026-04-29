using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using 書籍検索アプリ_移植元Java.Models;

namespace 書籍検索アプリ_移植元Java.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Start()
        {
            var model = new StartViewModel
            {
                Message = "モデルからのメッセージです",
                Number = 42
            };

            return View(model);
        }


        public IActionResult Index()
        {
            ViewBag.Message = "Hello World!";
            return View();
        }

        public IActionResult BookSearchScreen()
        {
            return View();
        }


        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
