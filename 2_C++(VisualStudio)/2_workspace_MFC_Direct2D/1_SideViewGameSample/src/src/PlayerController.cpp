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
	isDead(false),
	isGoal(false),
	isJump(0),
	canJump(false),
	canDoubleJump(false),
    canAttack(false),
    canAirWalk(false),
    canAirWalkFree(false),
	powerUpLevel(PowerUpLevel::Small),
	isInvincible(false),
	invincibleTimer(0.0f),
    velocityX(0.0f),
	velocityY(0.0f){

	//プレイヤーの初期状態を設定
	player.x = 60.0f;
	player.y = 300.0f;
	ApplyPowerUp(powerUpLevel);
}

void PlayerController::Update(double delta, StageMap& map) {

	//前フレームからの経過秒の取得
	this->delta = delta;

	//プレイヤー死亡判定
	if (!isDead && !isGoal) {

		// --- ダメージ直後の無敵状態 ---
		if (isInvincible) {
			invincibleTimer -= delta;

			// ノックバック中は操作無効
			direX = 0;

			// ノックバックの減衰
			velocityX *= 0.96f;

			if (invincibleTimer <= 0.0f) {

				isInvincible = false;
				velocityX = 0.0f; // ノックバック終了
			}
		}
		else {

			// 通常時の入力処理
			//移動方向を決める
			direX = 0;
			direY = 0;
			if (inputKey.isLeft)  direX = -1;
			if (inputKey.isRight) direX = 1;
			if (inputKey.isUp) direY = -1;
			if (inputKey.isDown) direY = 1;
			velocityX = direX * speed; // 通常移動
		}

		//プレイヤーアクション
		if (canJump || canDoubleJump) Jump(); //ジャンプ
		//if (canAttack) Attack();
		if (canAirWalk) AirWalk();
		if (canAirWalkFree) AirWalkFree();
	}else {

		//死亡またはゴール
		// 入力無効にする
		direX = 0;
		direY = 0;
		velocityX = 0.0f; // 横移動は止める
	}

	//3段階目のパワーアップの時以外は、世界の重力を常に受け続ける
	if (powerUpLevel != PowerUpLevel::Power3) {

		velocityY += map.gravity;
		fallTime += this->delta;
	}

	// 着地したら落下速度をリセット
	if (isGrounded) {

		velocityY = 0.0f;
		fallTime = 0.0f;
		isJump = 0;
	}
	
	// 落下量（速度 × delta）
	//float fall = velocityY * delta;

	// delta は「前フレームからの経過秒」
	moveX = (float)(velocityX * delta);
	moveY = (float)(velocityY * delta); /*+ (float)(speed * direY * delta)*/
	//moveY = velocityY * delta;
	//player.x += moveX;
	//player.y += moveY;
	//m_player.x1 += 2.0f;
	//m_player.x2 += 2.0f;
}

void PlayerController::Damage() {

	// 無敵中は何もしない
	if (isInvincible) {

		return;
	}

	if (powerUpLevel > PowerUpLevel::Small) {

		//パワーダウン
		ApplyPowerUp((PowerUpLevel)((int)powerUpLevel - 1));
		//無敵時間(2秒間点滅)
		isInvincible = true;
		invincibleTimer = 1.0f;

		//左にノックバック移動
		velocityX = -200.0f;
	}
	else{

		//プレイヤー死亡
		KillPlayer();
	}
}

void PlayerController::ApplyPowerUp(PowerUpLevel level) {

	int next = static_cast<int>(level);

	// 上下限チェック（Max の 1 つ前が実質の最大、Minが最小）
	int maxValue = static_cast<int>(PowerUpLevel::Max) - 1;
	int minValue = static_cast<int>(PowerUpLevel::Small);
	next = max(minValue, next);
	next = min(maxValue, next);
	level = static_cast<PowerUpLevel>(next);
	//更新
	powerUpLevel = level;
	player.currentLevel = level;
	switch (level) {

		//Normal段階：2段ジャンプができる
		case PowerUpLevel::Normal:
			canJump = true;
			canDoubleJump = true;
			canAttack = false;
			canAirWalk = false;
			canAirWalkFree = false;
			break;

		//パワーアップ1段階目：空中浮遊ができる(ジャンプはできない)
		case PowerUpLevel::Power1:
			canJump = false;
			canDoubleJump = false;
			canAttack = false;
			canAirWalk = true;
			canAirWalkFree = false;
			break;

		//パワーアップ2段階目：飛び道具で攻撃でき、かつ空中浮遊もできる(ジャンプはできない)
		case PowerUpLevel::Power2:
			canJump = false;
			canDoubleJump = false;
			canAttack = true;
			canAirWalk = true;
			canAirWalkFree = false;
			break;

		//パワーアップ3段階目：飛び道具で攻撃でき、かつ空中を自由に移動もできる(ジャンプ、踏みつけはできない)
		case PowerUpLevel::Power3:
			canJump = false;
			canDoubleJump = false;
			canAttack = true;
			canAirWalk = false;
			canAirWalkFree = true;
			break;

		//Small状態
		default:
			canJump = true;
			canDoubleJump = false;
			canAttack = false;
			canAirWalk = false;
			canAirWalkFree = false;
			break;
	}
}

void PlayerController::Jump(){

	// --- ジャンプ処理 ---
	bool pressedW = direY == -1 && inputKey.pressedUpOrDown;
	//地上ジャンプ：パワーアップがSmall状態の時
	bool groundJump = pressedW && isGrounded;
	//空中ジャンプ：パワーアップがNormal状態以上の時
	bool doubleJump = pressedW && canDoubleJump && (int)isJump == 1;
	if (groundJump || doubleJump) {

		velocityY = -1200.0f;   // ジャンプ力（調整可能）
		isGrounded = false; //空中へ
		isJump++;//ジャンプフラグ
	}
}

void PlayerController::AirWalk() {

	// --- 空中移動---
	if (player.y < -80) {
		player.y = -80.0f;
		velocityY = 0.0f;
		fallTime = 0.0f;
		moveY = 0.0f;
	}
	if (direY != 0) {

		velocityY = 0.0f;
		fallTime = 0.0f;
		moveY = 0.0f;
		isGrounded = false; //空中へ
	}
	velocityY += (float)(speed * direY)*3.0f;
}

void PlayerController::AirWalkFree() {

	// --- 空中移動---
	if (player.y <= -80) {
		player.y = -80.0f;
		velocityY = 0.0f;
		fallTime = 0.0f;
		moveY = 0.0f;
	}
	if (direY != 0) {

		isGrounded = false; //空中へ
	}
	velocityY = (float)(speed * direY)*3.0f;
}

void PlayerController::ApplyMovement(StageMap& map) {

	//衝突判定X
	player.x = map.ResolveCollisionX(player.x, player.y, player.width, player.hight, moveX);
	//左端判定
	player.x = map.LimitPosLeftX(player.x, player.width);

	//プレイヤー死亡時には無視される
	if (isDead) {

		player.y += moveY;
		return;
	}

	//衝突判定Y
	player.y = map.ResolveCollisionY(player.x, player.y, player.width, player.hight, moveY, isGrounded);

	vector<TileType> tiles = map.GetTilesInRect(player.x, player.y, player.width, player.hight);

	for (auto& t : tiles) {

		switch (t) {

			//死亡判定
			case TileType::Death: {

				KillPlayer(false);
				return;
			}
			//ゴールに触れた
			case TileType::Goal: {

				isGoal = true;
				return;
			}
			//パワーアップブロックに触れた
			case TileType::PowerUp1: {

				int next = static_cast<int>(powerUpLevel) + 1;
				ApplyPowerUp(static_cast<PowerUpLevel>(next));
				break;
			}
			//トゲに触れた
			case TileType::Thorn:{

				Damage();
				break;
			}
			default: {

				break;
			}
		}
	}
}

/// <summary>
/// KillPlayer
/// </summary>
/// プレイヤーが死亡する
void PlayerController::KillPlayer(bool isBounce) {

	////死亡判定
	//if (-1 != map.CheckCollisionY(player.x, player.y, player.width, player.hight, moveY, 9).ty) {
	if (isDead) return; // 二重死防止
	//死亡
	isDead = true;
	// 死亡ジャンプ（上に跳ねる）
	if (isBounce) {

		velocityY = -1000.0f;   // 好きな値に調整
		isGrounded = false; //空中へ
	}
}

/// <summary>
/// IsPlayerDead
/// </summary>
/// プレイヤーが死亡したかを判定する
/// <returns></returns>
bool PlayerController::IsPlayerDead() const{
	
	return isDead;
}

/// <summary>
/// IsPlayerGoal
/// </summary>
/// プレイヤーがゴールしたかを判定する
/// <returns></returns>
bool PlayerController::IsPlayerGoal() const {

	return isGoal;
}

int PlayerController::GetPowerUpLevel() const {

	if (isDead) {

		return 0;
	}
	return (int)powerUpLevel;
}