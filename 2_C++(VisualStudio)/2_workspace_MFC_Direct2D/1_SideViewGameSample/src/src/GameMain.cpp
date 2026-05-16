#include "pch.h"
#include "include/GameMain.h"

GameMain::GameMain(Renderer& r)

	: renderer(r)
	, inputKey()
	, m_player(0, 50, 100, 100, D2D1::ColorF(D2D1::ColorF::Red))
	, m_player2(100, 150, 150, 150, D2D1::ColorF(D2D1::ColorF::Aqua))
	, m_ball(200, 200, 30, D2D1::ColorF(D2D1::ColorF::Yellow))
	, m_line(10, 10, 100, 10, 5.0f, D2D1::ColorF(D2D1::ColorF::Green))
	, player(60, 300, D2D1::ColorF(D2D1::ColorF::Blue))
	, pController(player, inputKey)
	, stageMapObject()
	, stageMap(stageMapObject)
	, camera(){
}

void GameMain::Initialize() {

}

void GameMain::Update(double delta) {

	//ワンパルス入力チェック
	inputKey.EdgeInputUp();

	pController.Update(delta, stageMap);

	//衝突判定
	pController.ApplyMovement(stageMap);

	//カメラ更新
	camera.Update(player.x, renderer.GetScreenWidth(), stageMapObject.MAP_W* stageMapObject.TILE_SIZE);
}

void GameMain::Draw() {

	stageMapObject.Draw(renderer, camera.cameraX, renderer.GetScreenWidth());
	m_player.Draw(renderer);
	m_player2.Draw(renderer);
	m_ball.Draw(renderer);
	m_line.Draw(renderer);
	// プレイヤーを描画
	player.Draw(renderer,camera.cameraX);
}