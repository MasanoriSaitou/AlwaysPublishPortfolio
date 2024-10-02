#include <iostream>
using namespace std;

int main() {
	cout << 9 / 2 << endl; //9/2はその商の結果の４となってしまう
	cout << 9.0 / 2 << endl; //9.0 / 2のようにどちらかのオペランドを小数にすると4.5になる

	int a = 10;
	int b = 10;
	cout << (++a) + 50 << endl; //インクリメントやデクリメントは演算子の位置で計算タイミングが変わってしまう！
	cout << (b++) + 50 << endl; //バグを減らすため、なるべくインクリメントデクリメントはそれ単体で実行するようにする
								//インクリメントとかに()をつけようとつけまいと同じ
	float c = 3.0; //double型リテラルをfloat型変数に代入OK!(キャスト不要)

	int j = 9;
	for (j; j < 10; j++) {
		a = 100;
		if (j > 3)continue;
	}


	return 0;
}//main end