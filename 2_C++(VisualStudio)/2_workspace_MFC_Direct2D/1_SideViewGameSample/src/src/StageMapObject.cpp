#include "pch.h"
#include "include/StageMapObject.h"
#include "include/BlockObject.h"
#include "include/PowerUpBlock1Object.h"
#include "include/KillBlockObject.h"
#include "include/ThornBlockObject.h"
#include "include/GoalObject.h"
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

    Initialize();
}

void StageMapObject::Initialize() {

    tileMapObjectArrays.clear();
    for (int y = 0; y < MAP_H; y++) {

        vector<unique_ptr<TileMapObject>> v;
        for (int x = 0; x < MAP_W; x++) {

            map[y][x] = STAGE_MAP[y][x];
            //一番下のブロック(map)は死亡タイルにする
            if (y >= MAP_H - 1) {

                map[y][x] = 9;
            }

            //タイルマップデータ作成
            switch (map[y][x]) {

                //1:ブロック
                case 1: {
                    v.push_back(make_unique<BlockObject>());
                    break;
                }
                //2:パワーアップブロック1
                case 2: {
                    v.push_back(make_unique<PowerUpBlock1Object>());
                    break;
                }
                //3:トゲブロック
                case 3: {
                    v.push_back(make_unique<ThornBlockObject>());
                    break;
                }
                //8:ゴールタイル
                case 8: {

                    v.push_back(make_unique<GoalObject>());
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
    TileType result = tileMapObjectArrays[y][x]->GetTileType();
    ChkDisappearanceTileMapObjects(x,y);  //タイルマップが消滅したかをチェックする
    return result;
}

void StageMapObject::ChkDisappearanceTileMapObjects(int x, int y) {

    if (IsDisappearanceTileMapObject(x, y)) {

        DisappearanceTileMapObject(x, y); //消滅しているのならば、オブジェクト自体を消滅させる
    }
}

bool StageMapObject::IsDisappearanceTileMapObject(int x, int y) const {

    //タイルマップが消滅するかどうかを確認する
    return tileMapObjectArrays[y][x]->IsDisappearance();
}

void StageMapObject::DisappearanceTileMapObject(int x, int y){

    //タイルマップの消滅
    //0:空気 ⇒親クラスをそのまま入れる
    map[y][x] = 0;
    tileMapObjectArrays[y][x] = make_unique<TileMapObject>();
}

bool StageMapObject::IsSolidTile(int tileX, int tileY, int tileKind) const {

    if (tileX < 0 || tileX >= MAP_W) return false;
    if (tileY < 0 || tileY >= MAP_H) return false;
    //tileKind 1:実体のあるタイル　9:死亡ライン
    return map[tileY][tileX] == tileKind;
}

void StageMapObject::Draw(Renderer& renderer,const Camera& camera,float screenWidth) const {

    // 画面に映る論理幅（ゲーム内座標）
    float logicalScreenWidth = screenWidth / camera.GetScaleX();

    // カメラの左端（世界座標）
    float camX = camera.GetCameraX();

    // タイル範囲を計算
    int startX = static_cast<int>(camX / TILE_SIZE);
    int endX = static_cast<int>((camX + logicalScreenWidth) / TILE_SIZE);

    //ワールドの読み込み範囲を決める
    if (startX < 0) startX = 0;
    if (startX >= MAP_W) startX = MAP_W-1;
    if (endX < 0) endX = 0;
    if (endX >= MAP_W)endX = MAP_W;


    /*for (int y = 0; y < MAP_H; y++) {
        for (int x = 0; x < MAP_W; x++) {

            if (map[y][x] == 1) {
    */
    //読み込んだ範囲で画面に表示する
    for (int y = MAP_H-1; y >= 0; y--) {
        for (int x = startX; x < endX; x++) {

            tileMapObjectArrays[y][x]->Draw(renderer, x, y, +5, camera);
        }
    }
}