#include "pch.h"
#include "include/StageMap.h"

StageMap::StageMap(StageMapObject& s)
    :stageMapObject(s)
    ,TILE_SIZE(s.TILE_SIZE)
    , MAP_W(s.MAP_W)
    , MAP_H(s.MAP_H) {
}

vector<TileType> StageMap::GetTilesInRect(float x, float y, float w, float h) const
{
    vector<TileType> result;

    int left = x / TILE_SIZE;
    int right = (x + w - 1) / TILE_SIZE;
    int top = y / TILE_SIZE;
    int bottom = (y + h - 1) / TILE_SIZE;
    // 範囲チェック
    left = max(0, left);
    right = min(MAP_W - 1, right);
    top = max(0, top);
    bottom = min(MAP_H - 1, bottom);

    for (int ty = top; ty <= bottom; ty++) {
        for (int tx = left; tx <= right; tx++) {
            //int tile = stageMapObject.GetTile(tx, ty);
            result.push_back(stageMapObject.OnHit(tx,ty));
        }
    }
    return result;
}

CollisionResult StageMap::CheckCollisionRect(float x, float y, float w, float h, int tileKind)
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

            if (stageMapObject.IsSolidTile(tx, ty, tileKind)) {
                return { tx, ty }; // 衝突したタイルの座標
            }
        }
    }

    return { -1, -1 }; // 衝突なし
}

CollisionResult StageMap::CheckCollisionX(float x, float y, float w, float h, float moveX, int tileKind)
{
    float newX = x + moveX;

    if (moveX > 0) {
        // 右に移動 → 右側のラインだけチェック
        float right = newX + w - 1;
        int tileX = (int)(right / TILE_SIZE);

        int tileTop = (int)(y / TILE_SIZE);
        int tileBottom = (int)((y + h - 1) / TILE_SIZE);

        for (int ty = tileTop; ty <= tileBottom; ty++) {
            if (stageMapObject.IsSolidTile(tileX, ty, tileKind)) {
                return { tileX, ty };
            }
        }
    }
    else if (moveX < 0) {
        // 左に移動 → 左側のラインだけチェック
        float left = newX;
        int tileX = (int)(left / TILE_SIZE);

        int tileTop = (int)(y / TILE_SIZE);
        int tileBottom = (int)((y + h - 1) / TILE_SIZE);

        for (int ty = tileTop; ty <= tileBottom; ty++) {
            if (stageMapObject.IsSolidTile(tileX, ty, tileKind)) {
                return { tileX, ty };
            }
        }
    }

    return { -1, -1 };
}

CollisionResult StageMap::CheckCollisionY(float x, float y, float w, float h, float moveY, int tileKind)
{
    float newY = y + moveY;

    if (moveY >= 0) {
        // 落下中 → 足のラインだけチェック
        float bottom = newY + h + 1;
        int tileEndY = (int)(bottom / TILE_SIZE) >= MAP_H ? MAP_H : (int)(bottom / TILE_SIZE);
        int tileStartY = (int)(y / TILE_SIZE) >= MAP_H ? MAP_H : (int)(y / TILE_SIZE);

        int tileLeft = (int)(x / TILE_SIZE);
        int tileRight = (int)((x + w - 1) / TILE_SIZE);

        for (int ty = tileStartY; ty <= tileEndY; ty++) {
            for (int tx = tileLeft; tx <= tileRight; tx++) {
                if (stageMapObject.IsSolidTile(tx, ty, tileKind)) {
                    return { tx, ty };
                }
            }
        }
    }
    else if (moveY < 0) {
        // 上昇中 → 頭のラインだけチェック
        float top = newY;
        int tileY = (int)(top / TILE_SIZE);

        int tileLeft = (int)(x / TILE_SIZE);
        int tileRight = (int)((x + w - 1) / TILE_SIZE);

        for (int tx = tileLeft; tx <= tileRight; tx++) {
            if (stageMapObject.IsSolidTile(tx, tileY, tileKind)) {
                return { tx, tileY };
            }
        }
    }

    return { -1, -1 };
}

float StageMap::ResolveCollisionX(float x, float y, float w, float h, float moveX)
{

    return ResolveCollisionX_Tile1(x,y,w,h,moveX);
}

float StageMap::ResolveCollisionY(float x, float y, float w, float h, float moveY, bool& isGround)
{
    return ResolveCollisionY_Tile1(x,y,w,h,moveY,isGround);
}

float StageMap::ResolveCollisionX_Tile1(float x, float y, float w, float h, float moveX)
{
    // newX の位置で衝突しているか？
    CollisionResult col = CheckCollisionX(x, y, w, h, moveX, 1);

    float newX = x + moveX;

    if (col.tx == -1) {
        return newX; // 衝突なし
    }

    ////////////
    // ↓衝突後の調整
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

float StageMap::ResolveCollisionY_Tile1(float x, float y, float w, float h, float moveY, bool& isGround)
{

    // newY の位置で衝突しているか？
    CollisionResult col = CheckCollisionY(x, y, w, h, moveY, 1);

    float newY = y + moveY;

    if (col.ty == -1) {

        isGround = false;//上も下も衝突していない　→空中にいる
        return newY; // 衝突なし
    }
    ////////////
    // ↓衝突後の調整
    // 衝突したタイルの矩形
    float tileY1 = col.ty * TILE_SIZE;
    float tileY2 = tileY1 + TILE_SIZE;

    if (moveY > 0) {
        // 下に移動 → 足がタイルにめり込む
        newY = tileY1 - h;
        isGround = true; //下方向に衝突している　→着地している
    }
    else if (moveY < 0) {
        // 上に移動 → 頭がタイルにめり込む
        newY = tileY2;
    }

    return newY;
}

float StageMap::LimitPosLeftX(float x, float width) {

    if (x <= 0 + width) {

        return 0 + width;
    }
    return x;
}