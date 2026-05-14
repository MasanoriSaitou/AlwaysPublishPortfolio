#include "pch.h"
#include "include/BlockObject.h"

TileType BlockObject::GetTileType() {

    return TileType::Ground;
}

void BlockObject::Draw(Renderer& renderer, int x, int y,float cameraX){

    //ブロックの輪郭描画
    renderer.DrawRectOutline(
        x * TILE_SIZE - cameraX,
        y * TILE_SIZE,
        (x + 1) * TILE_SIZE - cameraX,
        (y + 1) * TILE_SIZE,
        1.0f, // 線の太さ
        D2D1::ColorF(D2D1::ColorF::Black)
    );

    //ブロックの塗りつぶし描画
    renderer.DrawRect(
        x * TILE_SIZE - cameraX,
        y * TILE_SIZE,
        (x + 1) * TILE_SIZE - cameraX,
        (y + 1) * TILE_SIZE,
        D2D1::ColorF(D2D1::ColorF::Brown)
    );
}