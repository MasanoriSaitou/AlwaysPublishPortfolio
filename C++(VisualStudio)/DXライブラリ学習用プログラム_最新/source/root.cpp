#include "DxLib.h"
#include "Fps.h"

extern void GameMain();

int WINAPI WinMain(HINSTANCE,HINSTANCE,LPSTR,int){

    ChangeWindowMode(TRUE); // ウィンドウモードに設定
    // 画面サイズは最大の 1920x1080 にしておく
    SetGraphMode(1920, 1080, 32);
    // 最初は 1280x720 にしておく
    SetWindowSize(1280, 720);
    //フォントサイズ設定
    SetFontSize(80);
    DxLib_Init();   // DXライブラリ初期化処理
    SetDrawScreen(DX_SCREEN_BACK); //描画先を裏画面に設定
    Fps fps;
    //WaitKey();      // キー入力待ち
    while (ProcessMessage() == 0) { //裏画面を表画面に反映

        //エスケープキーが押されたらゲーム終了
        if (CheckHitKey(KEY_INPUT_ESCAPE) == 1) {
            break;
        }
        fps.Update();	//更新
        GameMain();//これを僕たちが編集する
        fps.Draw();		//描画
        ScreenFlip();
        fps.Wait();		//待機
    }
    DxLib_End();    // DXライブラリ終了処理
    return 0;
}