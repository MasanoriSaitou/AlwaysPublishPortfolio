#include "DXライブラリオメガ.h"

void GameMain() {

	// 関数ポインタを定義
	//int (*絵を読み込み)(const string&) = &ゲームライブラリ::絵を読み込み;

	//画面の大きさを変更する(1920,1080);

	今表示中の絵を全消去();

	int 額縁;     // データハンドル格納用変数
	額縁 = 絵を引き渡す("キャラクタ00.png"); // 画像をロード
	絵を表示する(額縁,500,100); // データハンドルを使って画像を描画

	int ラジカセ;
	ラジカセ = 音楽を引き渡す("BGM_game_00.wav");
	音楽を再生する(ラジカセ);
	
	static int 横の位置 = 200;
	static int 縦の位置 = 200;
	横の位置 += 1;
	
	//キー入力を受け付ける
	if (もし右ボタンが押された場合は()) {
		横の位置 += 16;
	}
	if (もし左ボタンが押された場合は()) {
		横の位置 -= 16;
	}
	if (もし上ボタンが押された場合は()) {
		縦の位置 -= 16;
	}
	if (もし下ボタンが押された場合は()) {
		縦の位置 += 16;
	}
	int new額縁;
	new額縁 = 絵を引き渡す("キャラクタ00.png"); // 画像をロード
	絵を表示する(new額縁, 横の位置, 縦の位置); // データハンドルを使って画像を描画
	文字列を表示する("おはよう", 横の位置,縦の位置 ,"赤");
}