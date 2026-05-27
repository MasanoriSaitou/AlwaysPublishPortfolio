#pragma once
#include "TileMapObject.h"
class PowerUpBlock1Object :public TileMapObject{

public:
	void Draw(Renderer& renderer, int x, int y,float, const Camera&) override;
	TileType GetTileType() override;
	void OnHit() override;
};