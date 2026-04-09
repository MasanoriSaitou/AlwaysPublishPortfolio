#include "pch.h"
#include "PlayerController.h"

PlayerController::PlayerController(PlayerObject& p,InputKey& i)
: player(p),inputKey(i),moveX(0),moveY(0){
}

void PlayerController::Update(double delta) {

	// 1秒あたり100px の速度
	double speed = 200.0; //800
	//移動方向を決める
	int direX = 0;
	int direY = 0;
	if (inputKey.isLeft)  direX = -1;
	if (inputKey.isRight) direX = 1;
	if (inputKey.isUp) direY = -1;
	if (inputKey.isDown) direY = 1;
	// delta は「前フレームからの経過秒」
	moveX = (float)(speed * delta * direX);
	moveY = (float)(speed * delta * direY) + 0.05f;
	player.x += moveX;
	player.y += moveY;
	//m_player.x1 += 2.0f;
	//m_player.x2 += 2.0f;
}

void PlayerController::ApplyMovement(TileMap& map) {

	//死亡判定
	if (-1 != map.CheckCollisionY(player.x, player.y, player.width, player.hight, moveY, 9).ty) {

		//死亡
		OutputDebugString(L"プレイヤー死亡!\n");
	}

	//衝突判定
	player.x = map.ResolveCollisionX(player.x, player.y, player.width, player.hight, moveX);
	player.y = map.ResolveCollisionY(player.x, player.y, player.width, player.hight, moveY);

	//左端判定
	player.x = map.LimitPosLeftX(player.x,player.width);
}