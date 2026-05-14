#include "pch.h"
#include "include/PlayerController.h"

PlayerController::PlayerController(PlayerObject& p,InputKey& i)
	: player(p),
	inputKey(i),
	moveX(0),
	moveY(0),
	direX(0),
	direY(0),
	delta(0),
	isDead(false){
}

void PlayerController::Update(double delta, StageMap& map) {

	//前フレームからの経過秒の取得
	this->delta = delta;
	//移動方向を決める
	direX = 0;
	direY = 0;
	if (inputKey.isLeft)  direX = -1;
	if (inputKey.isRight) direX = 1;
	if (inputKey.isUp) direY = -1;
	if (inputKey.isDown) direY = 1;

	// --- ジャンプ処理 ---
	bool pressedW = direY == -1 && inputKey.pressedUpOrDown;
	if (pressedW && isGrounded) {

		velocityY = -1200.0f;   // ジャンプ力（調整可能）
		isGrounded = false; //空中へ
	}
	//// --- 空中移動---
	//if (direY != 0) {

	//	velocityY += (float)(speed * direY)/4;
	//	isGrounded = false; //空中へ
	//}

	//世界の重力を常に受け続ける
	//if (!isGrounded /*&& direY == 0*/) {

		velocityY += map.gravity;
		fallTime += this->delta;
	//}

	// 着地したら落下速度をリセット
	if (isGrounded) {

		velocityY = 0.0f;
		fallTime = 0.0f;
		OutputDebugString(L"着地したよ!\n");
	}
	
	// 落下量（速度 × delta）
	//float fall = velocityY * delta;

	// delta は「前フレームからの経過秒」
	moveX = (float)(speed * direX * delta);
	moveY = (float)(velocityY * delta); /*+ (float)(speed * direY * delta)*/
	//moveY = velocityY * delta;
	//player.x += moveX;
	//player.y += moveY;
	//m_player.x1 += 2.0f;
	//m_player.x2 += 2.0f;
}

void PlayerController::ApplyMovement(StageMap& map) {

	//衝突判定
	player.x = map.ResolveCollisionX(player.x, player.y, player.width, player.hight, moveX);
	player.y = map.ResolveCollisionY(player.x, player.y, player.width, player.hight, moveY, isGrounded);

	//左端判定
	player.x = map.LimitPosLeftX(player.x, player.width);

	vector<TileType> tiles = map.GetTilesInRect(player.x, player.y, player.width, player.hight);

	for (auto& t : tiles) {

		switch (t) {

			//死亡判定
			case TileType::Death:
				KillPlayer();
				return;

			case TileType::PowerUp1:
				//ApplyPowerUp(PowerUpType::Mushroom);
				break;

			case TileType::Goal:
				//ReachGoal();
				return;
		}
	}
}

/// <summary>
/// KillPlayer
/// </summary>
/// プレイヤーが死亡する
void PlayerController::KillPlayer() {

	////死亡判定
	//if (-1 != map.CheckCollisionY(player.x, player.y, player.width, player.hight, moveY, 9).ty) {
	//死亡
	isDead = true;
	OutputDebugString(L"プレイヤー死亡!\n");
}

/// <summary>
/// IsPlayerDead
/// </summary>
/// プレイヤーが死亡したかを判定する
/// <returns></returns>
bool PlayerController::IsPlayerDead() const{
	
	return isDead;
}