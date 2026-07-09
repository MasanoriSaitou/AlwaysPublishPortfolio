#pragma once
#include "RectObject.h"
#include "include/CircleObject.h"
#include "include/LineObject.h"
#include "include/PlayerObject.h"
#include "include/StageMapObject.h"
#include "include/PlayerController.h"
#include "include/InputKey.h"
#include "include/Camera.h"
#include "include/TextObject.h"
using namespace std;

class GameMain{

	float deathTimer;
	bool isWaitingRespawn;
	Renderer& renderer;
	InputKey inputKey;
	PlayerObject player;
	StageMapObject stageMapObject;
	TextObject textObject;
	TextObject goalTextObject;
	unique_ptr<RectObject> m_player;
	unique_ptr<RectObject> m_player2;
	unique_ptr<PlayerController> pController;
	unique_ptr<CircleObject> m_ball;
	unique_ptr<LineObject> m_line;
	unique_ptr<StageMap> stageMap;
	unique_ptr<Camera> camera;

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