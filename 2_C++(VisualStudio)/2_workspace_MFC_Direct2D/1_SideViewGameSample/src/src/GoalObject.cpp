#include "pch.h"
#include "include/GoalObject.h"

GoalObject::GoalObject():
    radius(16.0f)
    , color(D2D1::ColorF::GreenYellow) {

}

GoalObject::GoalObject(float _radius, D2D1::ColorF _color):
    radius(_radius)
    ,color(_color){

}

TileType GoalObject::GetTileType() {

    return TileType::Goal;
}

void GoalObject::OnHit() {

    isDisappearance = true;
}

void GoalObject::Draw(Renderer& renderer, int x, int y, float offsetY, const Camera& cameraX){

    //拡大率(棒人間と合わせること）
    const float bigRate = 1.3f;

    // --- カメラ変換（世界 → 画面） ---
    x = cameraX.WorldToScreenX(x * TILE_SIZE) * bigRate; //カメラのX座標をスクロールに使用
    y = y * TILE_SIZE * bigRate + offsetY;

    //拡大係数
    float coeX = cameraX.GetScaleX();

    // スケールされた寸法
    float r = radius * coeX * bigRate;

    renderer.DrawCircle(x, y, r, color);
}