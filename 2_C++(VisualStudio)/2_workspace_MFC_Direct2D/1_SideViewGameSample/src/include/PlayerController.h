#include "PlayerObject.h"
#include "TileMap.h"
#include "InputKey.h"

#pragma once
class PlayerController
{
	PlayerObject& player;
	InputKey& inputKey;
	double delta;
	float velocityY = 0.0f;
	bool isGrounded = false; //地面にいるかの判定
	bool isJump = false;
	int direX,direY;
	double speed = 300.0; //800 // 1秒あたり100px の速度

	bool prevH = false;   // 前フレームのHキー状態

public:
	float moveX,moveY;
	PlayerController(PlayerObject& p, InputKey& i);
	void Update(double delta, TileMap& map);
	void ApplyMovement(TileMap& map);
};

