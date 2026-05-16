#include "PlayerObject.h"
#include "StageMap.h"
#include "InputKey.h"

#pragma once
class PlayerController
{
	PlayerObject& player;
	InputKey& inputKey;
	double delta;
	float velocityY = 0.0f;
	bool isGrounded = false; //地面にいるかの判定
	char isJump;
	int direX,direY;
	double speed = 300.0; //800 // 1秒あたり100px の速度
	double fallTime = 0.0f;  //落下時間計測
	bool isDead; //死亡フラグ

	//パワーアップ
	bool canJump;
	bool canDoubleJump;
	bool canAttack;
	bool canAirWalk;
	bool canAirWalkFree;

	bool prevH = false;   // 前フレームのHキー状態

	PowerUpLevel powerUpLevel; //これがそのまま体力にもなっている
	void ApplyPowerUp(PowerUpLevel level);

public:
	float moveX,moveY;
	PlayerController(PlayerObject& p, InputKey& i);
	void Update(double delta, StageMap& map);
	void ApplyMovement(StageMap& map);
	void KillPlayer();
	bool IsPlayerDead() const;
	void Jump();
	void AirWalk();
	void AirWalkFree();
	void Damage();
};

