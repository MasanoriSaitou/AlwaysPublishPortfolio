#pragma once

//キー入力操作のフラグ
class InputKey {

	bool prevUp = false;
public:

	bool isLeft = false;
	bool isRight = false;
	bool isUp = false;
	bool isDown = false;	
	bool pressedUpOrDown = false;

	void EdgeInputUp() {

		//ワンパルス：上下どちらかのキーが押されて、前フレームの入力状態がOFFならば
		pressedUpOrDown = (isUp || isDown) && !prevUp;
		//今フレームの入力状態を取得
		prevUp = isUp || isDown;
	}
};