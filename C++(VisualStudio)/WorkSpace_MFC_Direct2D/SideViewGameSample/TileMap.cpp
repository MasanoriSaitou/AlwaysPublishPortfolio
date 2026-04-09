#include "pch.h"
#include "TileMap.h"


TileMap::TileMap(TileMapObject& t)
:tileMapObject(t),TILE_SIZE(t.TILE_SIZE), MAP_W(t.MAP_W), MAP_H(t.MAP_H){
}

CollisionResult TileMap::CheckCollisionRect(float x, float y, float w, float h, int tileKind)
{
    float left = x;
    float right = x + w;
    float top = y;
    float bottom = y + h;

    int tileLeft = (int)(left / TILE_SIZE);
    int tileRight = (int)(right / TILE_SIZE);
    int tileTop = (int)(top / TILE_SIZE);
    int tileBottom = (int)(bottom / TILE_SIZE);

    for (int ty = tileTop; ty <= tileBottom; ty++) {
        for (int tx = tileLeft; tx <= tileRight; tx++) {

            if (tileMapObject.IsSolidTile(tx, ty, tileKind)) {
                return { tx, ty }; // 衝突したタイルの座標
            }
        }
    }

    return { -1, -1 }; // 衝突なし
}

CollisionResult TileMap::CheckCollisionX(float x, float y, float w, float h, float moveX,int tileKind)
{
    float newX = x + moveX;

    if (moveX > 0) {
        // 右に移動 → 右側のラインだけチェック
        float right = newX + w - 1;
        int tileX = (int)(right / TILE_SIZE);

        int tileTop = (int)(y / TILE_SIZE);
        int tileBottom = (int)((y + h -1) / TILE_SIZE);

        for (int ty = tileTop; ty <= tileBottom; ty++) {
            if (tileMapObject.IsSolidTile(tileX, ty, tileKind)) {
                return { tileX, ty };
            }
        }
    }
    else if (moveX < 0) {
        // 左に移動 → 左側のラインだけチェック
        float left = newX;
        int tileX = (int)(left / TILE_SIZE);

        int tileTop = (int)(y / TILE_SIZE);
        int tileBottom = (int)((y + h -1) / TILE_SIZE);

        for (int ty = tileTop; ty <= tileBottom; ty++) {
            if (tileMapObject.IsSolidTile(tileX, ty,tileKind)) {
                return { tileX, ty };
            }
        }
    }

    return { -1, -1 };
}

CollisionResult TileMap::CheckCollisionY(float x, float y, float w, float h, float moveY,int tileKind)
{
    float newY = y + moveY;

    if (moveY > 0) {
        // 落下中 → 足のラインだけチェック
        float bottom = newY + h;// -1;
        int tileY = (int)(bottom / TILE_SIZE);

        int tileLeft = (int)(x / TILE_SIZE);
        int tileRight = (int)((x + w -1) / TILE_SIZE);

        for (int tx = tileLeft; tx <= tileRight; tx++) {
            if (tileMapObject.IsSolidTile(tx, tileY, tileKind)) {
                return { tx, tileY };
            }
        }
    }
    else if (moveY < 0) {
        // 上昇中 → 頭のラインだけチェック
        float top = newY;
        int tileY = (int)(top / TILE_SIZE);

        int tileLeft = (int)(x / TILE_SIZE);
        int tileRight = (int)((x + w -1) / TILE_SIZE);

        for (int tx = tileLeft; tx <= tileRight; tx++) {
            if (tileMapObject.IsSolidTile(tx, tileY, tileKind)) {
                return { tx, tileY };
            }
        }
    }

    return { -1, -1 };
}

float TileMap::ResolveCollisionX(float x, float y, float w, float h, float moveX)
{
    float newX = x + moveX;

    // newX の位置で衝突しているか？
    CollisionResult col = CheckCollisionX(x, y, w, h, moveX,1);

    if (col.tx == -1) {
        return newX; // 衝突なし
    }

    // 衝突したタイルの矩形
    float tileX1 = col.tx * TILE_SIZE;
    float tileX2 = tileX1 + TILE_SIZE;

    if (moveX > 0) {
        // 右に移動 → 右側がめり込んでいる
        newX = tileX1 - w;
    }
    else if (moveX < 0) {
        // 左に移動 → 左側がめり込んでいる
        newX = tileX2;
    }

    return newX;
}

float TileMap::ResolveCollisionY(float x, float y, float w, float h, float moveY)
{
    float newY = y + moveY;

    // newY の位置で衝突しているか？
    CollisionResult col = CheckCollisionY(x,y,w,h,moveY,1);

    if (col.ty == -1) {
        return newY; // 衝突なし
    }

    // 衝突したタイルの矩形
    float tileY1 = col.ty * TILE_SIZE;
    float tileY2 = tileY1 + TILE_SIZE;

    if (moveY > 0) {
        // 下に移動 → 足がタイルにめり込む
        newY = tileY1 - h;
    }
    else if (moveY < 0) {
        // 上に移動 → 頭がタイルにめり込む
        newY = tileY2;
    }

    return newY;
}

float TileMap::LimitPosLeftX(float x,float width) {

    if (x <= 0+width) {

        return 0+width;
    }
    return x;
}