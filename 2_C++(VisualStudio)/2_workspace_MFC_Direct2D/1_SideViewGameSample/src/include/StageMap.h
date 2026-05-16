#include "Renderer.h"
#include "StageMapObject.h"
#include "CollisionResult.h"
#include "TileType.h"

#pragma once
class StageMap
{
    const int TILE_SIZE;
    const int MAP_W;
    const int MAP_H;
    StageMapObject& stageMapObject;
    float gravity_ = 9.80665f * 5.00f;//地球の重力に乗算 +40.0f; //重力

    //structを使って代入演算子をオーバーロードする方法で、プロパティを実現する
    struct GravityProperty {

        StageMap& owner;
        //セッター
        void operator=(float value) { owner.gravity_ = value; }
        //ゲッター
        operator float() const { return owner.gravity_; }
    };

    public:
        StageMap(StageMapObject& s);
        CollisionResult CheckCollisionX(float x, float y, float w, float h, float moveX, int tileKind);
        CollisionResult CheckCollisionY(float x, float y, float w, float h, float moveY, int tileKind);
        CollisionResult CheckCollisionRect(float x, float y, float w, float h, int tileKind);
        GravityProperty gravity{ *this }; //gravityプロパティ
        float ResolveCollisionX(float x, float y, float w, float h, float moveX);
        float ResolveCollisionY(float x, float y, float w, float h, float moveY, bool& isGround);
        float ResolveCollisionX_Tile1(float x, float y, float w, float h, float moveX);
        float ResolveCollisionY_Tile1(float x, float y, float w, float h, float moveY, bool& isGround);
        float LimitPosLeftX(float x, float width);
        vector<TileType> GetTilesInRect(float x, float y, float w, float h) const;
};