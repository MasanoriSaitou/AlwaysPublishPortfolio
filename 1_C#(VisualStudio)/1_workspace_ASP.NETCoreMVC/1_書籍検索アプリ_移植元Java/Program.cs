using 書籍検索アプリ_移植元Java.Models;

var builder = WebApplication.CreateBuilder(args);

//-----------
//シングルトン設定→コンストラクタも初回1回だけ実行
//builder.Services.AddSingleton<BookSearchManager>(sp =>
//{
//    var env = sp.GetRequiredService<IWebHostEnvironment>();
//    return new BookSearchManager(env);
//});
//----------------------
// DI 設定
builder.Services.AddSingleton<BookDataManager>();    //シングルトン化→複数ユーザーで共有するため
builder.Services.AddHostedService<BookDataLoader>(); //初回1回実行を実現するため
builder.Services.AddScoped<BookSearchManager>();     //インスタンスの管理をASP.NET Coreに任せる→コントローラ―でnewするのは管理が地獄になるため

//-------------------------
// セッション（検索条件・検索結果の保持に必要）
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options => {
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment()) {
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

//------------------------
//セッションの使用
app.UseSession();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Start}/{id?}");

app.Run();