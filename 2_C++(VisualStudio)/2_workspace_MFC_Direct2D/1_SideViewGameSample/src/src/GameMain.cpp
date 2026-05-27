#include "pch.h"
#include "include/GameMain.h"

GameMain::GameMain(Renderer& r)

	: renderer(r)
	, inputKey()
    , player(60, 300, D2D1::ColorF(D2D1::ColorF::Blue))
	, stageMapObject(){

	Initialize();
}

void GameMain::Initialize() {

	deathTimer = 0.0f;
	isWaitingRespawn = false;
	m_player = make_unique<RectObject>(0, 50, 100, 100, D2D1::ColorF(D2D1::ColorF::Red));
	m_player2 = make_unique<RectObject>(100, 150, 150, 150, D2D1::ColorF(D2D1::ColorF::Aqua));
	m_ball = make_unique<CircleObject>(200, 200, 30, D2D1::ColorF(D2D1::ColorF::Yellow));
	m_line = make_unique<LineObject>(10, 10, 100, 10, 5.0f, D2D1::ColorF(D2D1::ColorF::Green));
	pController = make_unique<PlayerController>(player, inputKey);
	stageMap = make_unique<StageMap>(stageMapObject);
	camera = make_unique<Camera>(1920.0f, 1080.0f);
}

void GameMain::Update(double delta) {

	//ワンパルス入力チェック
	inputKey.EdgeInputUp();

	//プレイヤーコントローラ―
	pController->Update(delta, *stageMap);

	//衝突判定
	pController->ApplyMovement(*stageMap);

	//カメラ更新
	camera->Update(player.x, renderer.GetScreenWidth(), renderer.GetScreenHeight(), stageMapObject.MAP_W * stageMapObject.TILE_SIZE);

	//プレイヤーの死亡確認
	if (pController->IsPlayerDead()) {

		isWaitingRespawn = true;
		deathTimer += delta;

		if (deathTimer >= 5.0) {

			// 5秒経過 → ゲーム初期化
			Initialize();
		}
	}
}

void GameMain::Draw() {

	//地形描画
	stageMapObject.Draw(renderer, *camera, renderer.GetScreenWidth());
	m_player->Draw(renderer);
	m_player2->Draw(renderer);
	m_ball->Draw(renderer);
	m_line->Draw(renderer);
	// プレイヤーを描画
	player.Draw(renderer,*camera);
}