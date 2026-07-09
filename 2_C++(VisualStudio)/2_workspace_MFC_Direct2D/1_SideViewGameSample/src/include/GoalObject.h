#pragma once
#include "include/TileMapObject.h"
#include "include/CircleObject.h"

class GoalObject : public TileMapObject{

private:
	float radius;
	D2D1::ColorF color;

public:
	GoalObject();
	GoalObject(float _radius, D2D1::ColorF _color);
	TileType GetTileType() override;
	void OnHit() override;
	void Draw(Renderer& renderer, int x, int y, float offsetY, const Camera& cameraX) override;
};