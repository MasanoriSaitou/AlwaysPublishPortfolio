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
    float gravity_ = 9.80665f * 5.00f;//地球の重力に乗算 +40.0f; //重力

    //structを使って代入演算子をオーバーロードする方法で、プロパティを実現する
    struct GravityProperty {
        TileMap& owner;
        void operator=(float value) { owner.gravity_ = value; }
        operator float() const { return owner.gravity_; }
    };

public:
    TileMap(TileMapObject& t);
    CollisionResult CheckCollisionX(float x, float y, float w, float h, float moveX, int tileKind);
    CollisionResult CheckCollisionY(float x, float y, float w, float h, float moveY, int tileKind);
    CollisionResult CheckCollisionRect(float x, float y, float w, float h,int tileKind);
    GravityProperty gravity{ *this }; //gravityプロパティ
    float ResolveCollisionX(float x, float y, float w, float h, float moveX);
    float ResolveCollisionY(float x, float y, float w, float h, float moveY,bool& isGround);
    float LimitPosLeftX(float x,float width);
};

