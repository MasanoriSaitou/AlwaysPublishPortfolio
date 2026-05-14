#include "RectObject.h"
#include "include/CircleObject.h"
#include "include/LineObject.h"
#include "include/PlayerObject.h"
#include "include/StageMapObject.h"
#include "include/PlayerController.h"
#include "include/InputKey.h"
#include "include/Camera.h"
#pragma once

class GameMain{

	Renderer& renderer;
	RectObject m_player;
	RectObject m_player2;
	PlayerObject player;
	PlayerController pController;
	CircleObject m_ball;
	LineObject m_line;
	StageMap stageMap;
	StageMapObject stageMapObject;
	InputKey inputKey;
	Camera camera;

public:

	GameMain(Renderer& renderer);
	void Initialize();
	void Update(double delta);
	void Draw();

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