#include "pch.h"
#include "include/StageMapObject.h"
#include "include/BlockObject.h"
#include "include/PowerUpBlock1Object.h"
#include "include/KillBlockObject.h"
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

            //一番下のブロック(map)は死亡タイルにする
            if (y >= MAP_H - 1) {

                map[y][x] = 9;
            }

            //タイルマップデータ作成
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
                //9:死亡タイル　⇒見かけ上1のブロックを配置
                case 9: {
                    v.push_back(make_unique<KillBlockObject>());
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

TileType StageMapObject::OnHit(int x, int y) {

    tileMapObjectArrays[y][x]->OnHit();
    return tileMapObjectArrays[y][x]->GetTileType();
}

bool StageMapObject::IsSolidTile(int tileX, int tileY, int tileKind) const {

    if (tileX < 0 || tileX >= MAP_W) return false;
    if (tileY < 0 || tileY >= MAP_H) return false;
    //tileKind 1:実体のあるタイル　9:死亡ライン
    return map[tileY][tileX] == tileKind;
}

void StageMapObject::Draw(Renderer& renderer,float cameraX,float screenWidth) const {

    //ワールドの読み込み範囲を決める
    int startX = cameraX / TILE_SIZE;
    int endX = (cameraX + screenWidth) / TILE_SIZE;
    if (startX < 0) startX = 0;
    if (startX >= MAP_W) startX = MAP_W-1;
    if (endX < 0) endX = 0;
    if (endX >= MAP_W)endX = MAP_W;
    /*for (int y = 0; y < MAP_H; y++) {
        for (int x = 0; x < MAP_W; x++) {

            if (map[y][x] == 1) {
    */
    //読み込んだ範囲で画面に表示する
    for (int y = 0; y < MAP_H; y++) {
        for (int x = startX; x < endX; x++) {

            tileMapObjectArrays[y][x]->Draw(renderer, x, y,cameraX);
        }
    }
}