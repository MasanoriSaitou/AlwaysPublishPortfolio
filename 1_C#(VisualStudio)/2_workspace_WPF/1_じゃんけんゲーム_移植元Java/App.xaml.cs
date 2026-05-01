using System.Windows;

namespace じゃんけんゲーム_移植元Java {

    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application {
        protected override void OnStartup(StartupEventArgs e) {

            Console.WriteLine("Game Start");

            //base.OnStartup(e);

            //var window = new MainWindow();
            //window.Show();

            Console.WriteLine("Game End");
        }
    }
}