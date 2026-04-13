#include "pch.h"
#include "PlayerController.h"

PlayerController::PlayerController(PlayerObject& p,InputKey& i)
: player(p),inputKey(i),moveX(0),moveY(0){
}

void PlayerController::Update(double delta) {

	//移動方向を決める
	direX = 0;
	direY = 0;
	if (inputKey.isLeft)  direX = -1;
	if (inputKey.isRight) direX = 1;
	if (inputKey.isUp) direY = -1;
	if (inputKey.isDown) direY = 1;
	// delta は「前フレームからの経過秒」
	moveX = (float)(speed * direX * delta);
	moveY = (float)(speed * direY * delta);
	moveY += velocityY * delta;
	//player.x += moveX;
	//player.y += moveY;
	//m_player.x1 += 2.0f;
	//m_player.x2 += 2.0f;
}

void PlayerController::ApplyMovement(TileMap& map) {

	//死亡判定
	if (-1 != map.CheckCollisionY(player.x, player.y, player.width, player.hight, moveY, 9).ty) {

		//死亡
		OutputDebugString(L"プレイヤー死亡!\n");
	}

	//世界の重力を受ける
	if (!isGrounded && direY == 0) {
		velocityY += map.gravity;
	}
	else {
		velocityY = 0;
	}

	//衝突判定
	player.x = map.ResolveCollisionX(player.x, player.y, player.width, player.hight, moveX);
	player.y = map.ResolveCollisionY(player.x, player.y, player.width, player.hight, moveY, isGrounded);

	//左端判定
	player.x = map.LimitPosLeftX(player.x,player.width);
}