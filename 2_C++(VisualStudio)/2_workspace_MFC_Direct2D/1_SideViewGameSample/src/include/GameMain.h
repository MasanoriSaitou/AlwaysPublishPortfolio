#include "RectObject.h"
#include "CircleObject.h"
#include "LineObject.h"
#include "PlayerObject.h"
#include "TileMap.h"
#include "include/PlayerController.h"
#include "InputKey.h"
#pragma once

class GameMain{

	RectObject m_player;
	RectObject m_player2;
	PlayerObject player;
	PlayerController pController;
	CircleObject m_ball;
	LineObject m_line;
	TileMap stageMap;
	TileMapObject tileMap;
	
	InputKey inputKey;

public:

	GameMain();
	void Initialize();
	void Update(double delta);
	void Draw(Renderer& renderer);

	//ÉLÅ[ì¸óÕ
	void OnKeyDownA() { inputKey.isLeft = true; }
	void OnKeyUpA() { inputKey.isLeft = false; }

	void OnKeyDownD() { inputKey.isRight = true; }
	void OnKeyUpD() { inputKey.isRight = false; }

	void OnKeyDownW() { inputKey.isUp = true; }
	void OnKeyUpW() { inputKey.isUp = false; }

	void OnKeyDownS() { inputKey.isDown = true; }
	void OnKeyUpS() { inputKey.isDown = false; }
};