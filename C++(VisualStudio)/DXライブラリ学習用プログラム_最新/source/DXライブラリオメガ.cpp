#include "DXライブラリオメガ.h"

int 絵を引き渡す(const string& 絵の名前) {

    return gameLib.絵を引き渡す(絵の名前);
}

int 絵を表示する(int 対象の絵, int 横の位置, int 縦の位置,float 大きさ) {

    return gameLib.絵を表示する(対象の絵, 横の位置, 縦の位置,大きさ);
}

int 音楽を引き渡す(const string& 音楽の名前) {

    return gameLib.音楽を引き渡す(音楽の名前);
}

int 音楽を再生する(int 対象の音楽) {

    return gameLib.音楽を再生する(対象の音楽);
}

void 今表示中の絵を全消去() {

    gameLib.今表示中の絵を全消去();
}

bool もし右ボタンが押された場合は() {

    return gameLib.もし右ボタンが押された場合は() == "押された";
}

bool もし左ボタンが押された場合は() {

    return gameLib.もし左ボタンが押された場合は() == "押された";
}

bool もし上ボタンが押された場合は() {

    return gameLib.もし上ボタンが押された場合は() == "押された";
}

bool もし下ボタンが押された場合は() {

    return gameLib.もし下ボタンが押された場合は() == "押された";
}

void 文字列を表示する(const string& 表示させたい文字列,int 表示させたい横の位置,int 表示させたい縦の位置,string 赤または緑または青) {

    gameLib.文字列を表示する(表示させたい文字列, 表示させたい横の位置, 表示させたい縦の位置, 赤または緑または青);
}

void 画面の大きさを変更する(int 横の大きさ, int 縦の大きさ) {

    gameLib.画面の大きさを変更する(横の大きさ,縦の大きさ);
}