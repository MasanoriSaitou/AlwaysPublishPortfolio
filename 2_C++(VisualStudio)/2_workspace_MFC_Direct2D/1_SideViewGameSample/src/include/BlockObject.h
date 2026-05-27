#include "TileMapObject.h"
#pragma once
class BlockObject : public TileMapObject
{
public:
	 void Draw(Renderer& renderer, int x, int y,float, const Camera&) override ;
	 TileType GetTileType() override;
};