#include "TileMapObject.h"
#pragma once
class BlockObject : public TileMapObject
{
public:
	 void Draw(Renderer& renderer, int x, int y,float,float) override ;
	 TileType GetTileType() override;
};