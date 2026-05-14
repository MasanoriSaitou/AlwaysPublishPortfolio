#include "Renderer.h"
#include "TileType.h"
#pragma once
class TileMapObject
{
public:
    static const int TILE_SIZE = 32;
    virtual void Draw(Renderer& renderer,int x,int y,float);
    virtual TileType GetTileType();
    virtual void OnHit();
};