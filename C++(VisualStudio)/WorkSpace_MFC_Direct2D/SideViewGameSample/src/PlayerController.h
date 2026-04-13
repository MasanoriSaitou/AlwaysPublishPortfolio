#include "PlayerObject.h"
#include "TileMap.h"
#include "InputKey.h"

#pragma once
class PlayerController
{
	PlayerObject& player;
	InputKey& inputKey;
	float velocityY = 0.0f;
	bool isGrounded = false;
	int direX,direY;
	double speed = 400.0; //800 // 1•b‚ ‚½‚è100px ‚Ì‘¬“x

public:
	float moveX,moveY;
	PlayerController(PlayerObject& p, InputKey& i);
	void Update(double delta);
	void ApplyMovement(TileMap& map);
};

