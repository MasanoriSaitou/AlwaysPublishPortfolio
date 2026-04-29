namespace 書籍検索アプリ_移植元Java.Models {
    public class BookDataLoader(IWebHostEnvironment env, BookDataManager manager) : IHostedService {

        private readonly IWebHostEnvironment env = env;
        private readonly BookDataManager manager = manager;

        public Task StartAsync(CancellationToken cancellationToken) {

            var filePath = Path.Combine(env.WebRootPath, "Resources", "bookDataList.csv");
            manager.LoadBookDatas(filePath); // ← 起動時に1回だけ
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
    }
}