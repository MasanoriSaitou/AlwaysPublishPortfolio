#include "pch.h"
#include "include/TextObject.h"

void TextObject::Draw(const wstring& text, float x, float y, float size, D2D1::ColorF color,Renderer& renderer, const Camera* camera) {

    //拡大率(棒人間と合わせること）
    const float bigRate = 1.3f;

    if (camera == nullptr) {

        // スケールされた寸法
        size = size * bigRate;
        //表示
        renderer.DrawTextString(text, x, y, size, color);
        return;
    }

    // --- カメラ変換（世界 → 画面） ---
    x = camera->WorldToScreenX(x) * bigRate; //カメラのX座標をスクロールに使用
    y = camera->WorldToScreenY(y) * bigRate;

    //拡大係数
    float coeX = camera->GetScaleX();
    float coeY = camera->GetScaleY();

    // スケールされた寸法
    size = size * coeY * bigRate;

	renderer.DrawTextString(text, x, y, size, color);
}