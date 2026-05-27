#pragma once
#include "TileMapObject.h"

class ThornBlockObject : public TileMapObject{

public:
	void Draw(Renderer& renderer, int x, int y, float, const Camera&) override;
	TileType GetTileType() override;
};