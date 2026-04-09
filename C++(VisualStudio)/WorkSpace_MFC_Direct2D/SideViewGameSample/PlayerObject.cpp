#include "pch.h"
#include "PlayerObject.h"

PlayerObject::PlayerObject(float _x, float _y, float _width, float _hight, D2D1::ColorF _color)
    : x(_x), y(_y), width(_width), hight(_hight),color(_color)
{
}

void PlayerObject::Draw(Renderer& renderer) {

    // 頭（半径20）
    renderer.DrawCircle(x, y, 20, color);

    // 胴体（頭の下から80px）
    renderer.DrawLine(x, y + 20, x, y + 80, 5.0f, color);

    // 左手（胴体の中間から左上へ）
    renderer.DrawLine(x, y + 40, x - 40, y + 20, 5.0f, color);

    // 右手（胴体の中間から右上へ）
    renderer.DrawLine(x, y + 40, x + 40, y + 20, 5.0f, color);

    // 左足（胴体の下から左下へ）
    renderer.DrawLine(x, y + 80, x - 30, y + 120, 5.0f, color);

    // 右足（胴体の下から右下へ）
    renderer.DrawLine(x, y + 80, x + 30, y + 120, 5.0f, color);
}