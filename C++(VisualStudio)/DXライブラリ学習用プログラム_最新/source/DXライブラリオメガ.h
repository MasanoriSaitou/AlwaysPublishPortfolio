#pragma once
#include "DXLibraryOmega.h"

static DXLibraryOmega gameLib;
int 絵を引き渡す(const string& 絵の名前);
int 絵を表示する(int 対象の絵, int 横の位置, int 縦の位置,float 大きさ = 3.0f);
int 音楽を引き渡す(const string& 音楽の名前);
int 音楽を再生する(int 対象の音楽);
void 今表示中の絵を全消去();
bool もし右ボタンが押された場合は();
bool もし左ボタンが押された場合は();
bool もし上ボタンが押された場合は();
bool もし下ボタンが押された場合は();
void 文字列を表示する(const string& 表示させたい文字列,
	int 表示させたい横の位置, int 表示させたい縦の位置, 
	string 赤または緑または青 = "赤");
void 画面の大きさを変更する(int 横の大きさ = 1280,int 縦の大きさ = 720);