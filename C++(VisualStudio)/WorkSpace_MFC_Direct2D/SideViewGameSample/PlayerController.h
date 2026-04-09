#include "PlayerObject.h"
#include "TileMap.h"
#include "InputKey.h"

#pragma once
class PlayerController
{
	PlayerObject& player;
	InputKey& inputKey;

public:
	float moveX,moveY;
	PlayerController(PlayerObject& p, InputKey& i);
	void Update(double delta);
	void ApplyMovement(TileMap& map);
};

