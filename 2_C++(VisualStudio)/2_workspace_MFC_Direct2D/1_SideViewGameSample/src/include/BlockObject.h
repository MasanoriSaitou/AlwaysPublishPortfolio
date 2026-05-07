#pragma once
#include "TileMapObject.h"
class BlockObject : public TileMapObject
{
public:
	 void Draw(Renderer& renderer, int x, int y) override;
};