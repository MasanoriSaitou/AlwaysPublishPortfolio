#include "DXLibraryOmega.h"

int DXLibraryOmega::絵を引き渡す(const string& 絵の名前) {

    string filePath = "./画像/" + 絵の名前;
    return LoadGraph(filePath.c_str()); //画像をロード
}

int DXLibraryOmega::絵を表示する(int 対象の絵, int 横の位置, int 縦の位置,float 大きさ) {

    return DrawRotaGraph(横の位置, 縦の位置, 大きさ,0,対象の絵, TRUE); // データハンドルを使って画像を描画
}

int DXLibraryOmega::音楽を引き渡す(const string& 音楽の名前) {

	string filePath = "./サウンド/" + 音楽の名前;
	return LoadSoundMem(filePath.c_str()); //画像をロード
}

int DXLibraryOmega::音楽を再生する(int 対象の音楽) {

	static bool isPlay = false;
	int play = 0;
	if (!isPlay) {
		play = PlaySoundMem(対象の音楽, DX_PLAYTYPE_BACK);
		isPlay = true;
	}
	return play; // 効果音を再生する
}

void DXLibraryOmega::今表示中の絵を全消去() {

	ClearDrawScreen();
}

int DXLibraryOmega::絵を少しずつ右にずらす(int& x) {

	Sleep(28); // 7[ms]待機
	return x = x + 2; // xを2増やす
}

string DXLibraryOmega::もし右ボタンが押された場合は() {

	gpUpdateKey();//キー情報更新
	string result = "";
	if (Key[KEY_INPUT_RIGHT] >= 1) {
		//押された
		result = "押された";
	}
	return result;
}

string DXLibraryOmega::もし左ボタンが押された場合は() {

	gpUpdateKey();//キー情報更新
	string result = "";
	if (Key[KEY_INPUT_LEFT] >= 1) {
		//押された
		result = "押された";
	}
	return result;
}

string DXLibraryOmega::もし上ボタンが押された場合は() {

	gpUpdateKey();//キー情報更新
	string result = "";
	if (Key[KEY_INPUT_UP] >= 1) {
		//押された
		result = "押された";
	}
	return result;
}

string DXLibraryOmega::もし下ボタンが押された場合は() {

	gpUpdateKey();//キー情報更新
	string result = "";
	if (Key[KEY_INPUT_DOWN] >= 1) {
		//押された
		result = "押された";
	}
	return result;
}

// キーの入力状態を更新する
int DXLibraryOmega::gpUpdateKey() {

	char tmpKey[256]; // 現在のキーの入力状態を格納する
	GetHitKeyStateAll(tmpKey); // 全てのキーの入力状態を得る
	for (int i = 0; i < 256; i++) {
		if (tmpKey[i] != 0) { // i番のキーコードに対応するキーが押されていたら
			Key[i]++;     // 加算
		}
		else {              // 押されていなければ
			Key[i] = 0;   // 0にする
		}
	}
	return 0;
}

void DXLibraryOmega::文字列を表示する(const string& 表示させたい文字列, int 表示させたい横の位置, int 表示させたい縦の位置, string 赤または緑または青) {

	static bool isPlay = false;
	static map<string, int> color;
	if (!isPlay) {

		//色の定義
		int Green = GetColor(0, 255, 0);      // 緑の色コードを取得
		int Red = GetColor(255, 0, 0);// 赤の色コードを取得
		int Blue = GetColor(0, 0, 255);// 青の色コードを取得

		//連想配列
		color["赤"] = Red;
		color["青"] = Blue;
		color["緑"] = Green;

		isPlay = true;
	}

	auto iter = color.find(赤または緑または青);
	if (iter == end(color)) {
		//見つからないならば赤にする
		赤または緑または青 = "赤";
	}

	DrawFormatString(表示させたい横の位置, 表示させたい縦の位置, color[赤または緑または青],
		表示させたい文字列.c_str()); // 文字を描画する
}

void DXLibraryOmega::画面の大きさを変更する(int 横の大きさ, int 縦の大きさ) {

	static bool isPlay = false;
	if (!isPlay) {
		SetWindowSize(横の大きさ, 縦の大きさ);
		isPlay = true;
	}
}