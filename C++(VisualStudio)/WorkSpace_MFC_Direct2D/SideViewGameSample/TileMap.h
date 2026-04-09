#include "Renderer.h"
#include "TileMapObject.h"
#include "CollisionResult.h"
#pragma once
class TileMap
{
    const int TILE_SIZE;
    const int MAP_W;
    const int MAP_H;
    TileMapObject& tileMapObject;

public:
    TileMap(TileMapObject& t);
    CollisionResult CheckCollisionX(float x, float y, float w, float h, float moveX, int tileKind);
    CollisionResult CheckCollisionY(float x, float y, float w, float h, float moveY, int tileKind);
    CollisionResult CheckCollisionRect(float x, float y, float w, float h,int tileKind);
    float ResolveCollisionX(float x, float y, float w, float h, float moveX);
    float ResolveCollisionY(float x, float y, float w, float h, float moveY);
    float LimitPosLeftX(float x,float width);
};

