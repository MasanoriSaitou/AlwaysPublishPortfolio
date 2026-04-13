#include "pch.h"
#include "TileMapObject.h"

bool TileMapObject::IsSolidTile(int tileX, int tileY, int tileKind) {

    if (tileX < 0 || tileX >= MAP_W) return false;
    if (tileY < 0 || tileY >= MAP_H) return false;
    //tileKind 1:実体のあるタイル　9:死亡ライン
    return map[tileY][tileX] == tileKind;
}

void TileMapObject::Draw(Renderer& renderer) {

    for (int y = 0; y < MAP_H; y++) {
        for (int x = 0; x < MAP_W; x++) {

            if (map[y][x] == 1) {

                //ブロックの輪郭描画
                renderer.DrawRectOutline(
                    x * TILE_SIZE,
                    y * TILE_SIZE,
                    (x + 1) * TILE_SIZE,
                    (y + 1) * TILE_SIZE,
                    1.0f, // 線の太さ
                    D2D1::ColorF(D2D1::ColorF::Black)
                );

                //ブロックの塗りつぶし描画
                renderer.DrawRect(
                    x * TILE_SIZE,
                    y * TILE_SIZE,
                    (x + 1) * TILE_SIZE,
                    (y + 1) * TILE_SIZE,
                    D2D1::ColorF(D2D1::ColorF::Brown)
                );
            }
        }
    }
}