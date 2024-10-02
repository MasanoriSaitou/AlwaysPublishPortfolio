#pragma once
#include "DxLib.h"
#include <string>
#include <map>
using namespace std;

class DXLibraryOmega {

	private:
		int Key[256]; // キーが押されているフレーム数を格納する
		int gpUpdateKey();

	public:
		int 絵を引き渡す(const string& 絵の名前);
		int 絵を表示する(int 対象の絵,int 横の位置,int 縦の位置,float 大きさ);
		int 音楽を引き渡す(const string& 音楽の名前);
		int 音楽を再生する(int 対象の音楽);
		void 今表示中の絵を全消去();
		int 絵を少しずつ右にずらす(int& x);
		string もし右ボタンが押された場合は();
		string もし左ボタンが押された場合は();
		string もし上ボタンが押された場合は();
		string もし下ボタンが押された場合は();
		void 文字列を表示する(const string& 表示させたい文字列,
			int 表示させたい横の位置, int 表示させたい縦の位置,
			string 赤または緑または青);
		void 画面の大きさを変更する(int 横の大きさ, int 縦の大きさ);
};