#include "Renderer.h"
#include "TileType.h"
#include "Camera.h"
#pragma once
class TileMapObject
{
protected:
    bool isDisappearance;  //オブジェクト自体が消滅したか
public:
    static const int TILE_SIZE = 32;
    TileMapObject();
    bool IsDisappearance() const;
    virtual void Draw(Renderer& renderer,int x,int y,float, const Camera&);
    virtual TileType GetTileType();
    virtual void OnHit();
    virtual ~TileMapObject() = default; //デストラクタ
};