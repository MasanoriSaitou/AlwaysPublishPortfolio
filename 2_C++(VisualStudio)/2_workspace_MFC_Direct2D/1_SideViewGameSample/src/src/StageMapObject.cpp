#include "pch.h"
#include "include/StageMapObject.h"
#include "include/BlockObject.h"
#include "include/PowerUpBlock1Object.h"
#include "algorithm"
using namespace std;

/// <summary>
/// コンストラクタ
/// </summary>
/// <param name="tileX"></param>
/// <param name="tileY"></param>
/// <param name="tileKind"></param>
/// <returns></returns>
StageMapObject::StageMapObject() {

    for (int y = 0; y < MAP_H; y++) {

        vector<unique_ptr<TileMapObject>> v;
        for (int x = 0; x < MAP_W; x++) {

            switch (map[y][x]) {

                //1:ブロック
                case 1:{
                    v.push_back(make_unique<BlockObject>());
                    break;
                }
                //2:パワーアップブロック1
                case 2: {
                    v.push_back(make_unique<PowerUpBlock1Object>());
                    break;
                }
                //0:空気 ⇒親クラスをそのまま入れる
                default: {
                    v.push_back(make_unique<TileMapObject>());
                    break;
                }
            }
        }
        tileMapObjectArrays.push_back(move(v));//uniqueスマポは所有権が厳格なためコピーができない、move関数で所有権を移す
    }
}

bool StageMapObject::IsSolidTile(int tileX, int tileY, int tileKind) const {

    if (tileX < 0 || tileX >= MAP_W) return false;
    if (tileY < 0 || tileY >= MAP_H) return false;
    //tileKind 1:実体のあるタイル　9:死亡ライン
    return map[tileY][tileX] == tileKind;
}

void StageMapObject::Draw(Renderer& renderer) const {

    /*for (int y = 0; y < MAP_H; y++) {
        for (int x = 0; x < MAP_W; x++) {

            if (map[y][x] == 1) {
    */
    for (int y = 0; y < MAP_H; y++) {
        for (int x = 0; x < MAP_W; x++) {

            tileMapObjectArrays[y][x]->Draw(renderer, x, y);
        }
    }
}