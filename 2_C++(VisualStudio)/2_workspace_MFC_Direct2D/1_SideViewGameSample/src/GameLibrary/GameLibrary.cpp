#include "pch.h"
#include "GameLibrary/GameLibrary.h"
using namespace Library;

void GameLibrary::DrawBlock(Renderer& renderer, int x, int y,float offsetY, const Camera& camera, int TILE_SIZE, optional<ColorF> colorFront, optional<ColorF> colorTop, optional<ColorF> colorSide){

    //拡大率(棒人間と合わせること）
    float const bigRate = 1.3f;

    // 論理座標（ゲーム内座標）
    float wx1 = x * TILE_SIZE;
    float wy1 = y * TILE_SIZE + offsetY;
    float wx2 = (x + 1) * TILE_SIZE;
    float wy2 = (y + 1) * TILE_SIZE + offsetY;

    // スケールされた奥行き
    float offset = camera.ScaleSize(10.0f);

    // カメラ変換（世界 → 画面）
    float x1 = camera.WorldToScreenX(wx1)* bigRate;
    float y1 = camera.WorldToScreenY(wy1)* bigRate;
    float x2 = camera.WorldToScreenX(wx2)* bigRate;
    float y2 = camera.WorldToScreenY(wy2)* bigRate;

    //カラー設定
    //上部等未指定の場合は自動設定
    if (colorTop == nullopt) {

        colorTop = colorSide = colorFront;
    }

    //===========================
    // ① 正面（今までの四角）
    //===========================
    renderer.DrawRectOutline(
        x1, y1, x2, y2,
        camera.ScaleSize(1.0f), // 線の太さもスケール
        ColorF(ColorF::Black)
    );

    renderer.DrawRect(
        x1, y1, x2, y2,
        ColorF(colorSide.value())
    );

    //===========================
    // ② 上面（赤の平行四辺形）
    //===========================
    {
        D2D1_POINT_2F p1 = { x1, y1 };
        D2D1_POINT_2F p2 = { x2, y1 };
        D2D1_POINT_2F p3 = { x2 + offset, y1 - offset };
        D2D1_POINT_2F p4 = { x1 + offset, y1 - offset };

        renderer.DrawPolygon({ p1, p2, p3, p4 },
            ColorF(colorTop.value()));
        renderer.DrawPolygonOutline({ p1, p2, p3, p4 }, camera.ScaleSize(0.5f), ColorF(ColorF::Black));
    }

    //===========================
    // ③ 側面（緑の平行四辺形）
    //===========================
    {
        D2D1_POINT_2F s1 = { x2, y1 };
        D2D1_POINT_2F s2 = { x2, y2 };
        D2D1_POINT_2F s3 = { x2 + offset, y2 - offset };
        D2D1_POINT_2F s4 = { x2 + offset, y1 - offset };

        renderer.DrawPolygon({ s1, s2, s3, s4 },
            ColorF(colorSide.value()));
        renderer.DrawPolygonOutline({ s1, s2, s3, s4 }, camera.ScaleSize(0.5f), ColorF(ColorF::Black));
    }
}

void GameLibrary::DrawStickMan(const StickManInfo& info, Renderer& renderer, float x,float y,const Camera& camera) {

    //拡大率(棒人間と合わせること）
    const float bigRate = 1.3f;

    // --- カメラ変換（世界 → 画面） ---
    x = camera.WorldToScreenX(x)* bigRate; //カメラのX座標をスクロールに使用
    y = camera.WorldToScreenY(y)* bigRate;

    //拡大係数
    float coeX = camera.GetScaleX();
    float coeY = camera.GetScaleY();

    // スケールされた寸法
    float headRadius = info.headRadius * coeY * bigRate; //*camera.GetScaleX();
    float bodyLength = info.bodyLength * coeY * bigRate; // *camera.GetScaleX();
    float limbLength = info.limbLength * coeY * bigRate;
    float lineWidth = info.lineWidth * coeY * bigRate;

    // 頭
    renderer.DrawCircle(x, y, headRadius, info.colorHead);

    // 胴体
    renderer.DrawLine(x, y + headRadius, x, y + headRadius + bodyLength, lineWidth, info.colorTorso);

    // 左手
    renderer.DrawLine(x, y + headRadius + bodyLength / 2,
        x - limbLength, y + headRadius + bodyLength / 2 - limbLength / 2,
        lineWidth, info.colorLeftHand);

    // 右手
    renderer.DrawLine(x, y + headRadius + bodyLength / 2,
        x + limbLength, y + headRadius + bodyLength / 2 - limbLength / 2,
        lineWidth, info.colorRightHand);

    // 左足
    renderer.DrawLine(x, y + headRadius + bodyLength,
        x - limbLength * 0.7f, y + headRadius + bodyLength + limbLength,
        lineWidth, info.colorLeftLeg);

    // 右足
    renderer.DrawLine(x, y + headRadius + bodyLength,
        x + limbLength * 0.7f, y + headRadius + bodyLength + limbLength,
        lineWidth, info.colorRightLeg);
}

float GameLibrary::GetStickManWidth(const StickManInfo& info)
{
    // 左右に最も飛び出すのは手
    return info.limbLength;
}

float GameLibrary::GetStickManHeight(const StickManInfo& info)
{
    // 頭中心から足先までの距離
    return info.headRadius + info.bodyLength + info.limbLength;
}

void GameLibrary::DrawTriangleTile(
    Renderer& renderer,
    int tileX, int tileY,
    float offsetX,
    const Camera& camera,
    int TILE_SIZE,
    ColorF color,
    int direction){

    // 拡大率（棒人間と合わせる）
    float const bigRate = 1.3f;

    // --- 世界座標（タイルの四隅） ---
    float wx1 = tileX * TILE_SIZE + offsetX;
    float wy1 = tileY * TILE_SIZE;
    float wx2 = (tileX + 1) * TILE_SIZE + offsetX;
    float wy2 = (tileY + 1) * TILE_SIZE;

    // --- 画面座標へ変換 ---
    float x1 = camera.WorldToScreenX(wx1) * bigRate;
    float y1 = camera.WorldToScreenY(wy1) * bigRate;
    float x2 = camera.WorldToScreenX(wx2) * bigRate;
    float y2 = camera.WorldToScreenY(wy2) * bigRate;

    // --- 三角形の頂点を決める ---
    D2D1_POINT_2F p1, p2, p3;

    switch (direction) {
    case 0: // 上向き
        p1 = { (x1 + x2) / 2, y1 };
        p2 = { x1, y2 };
        p3 = { x2, y2 };
        break;

    case 1: // 右向き
        p1 = { x2, (y1 + y2) / 2 };
        p2 = { x1, y1 };
        p3 = { x1, y2 };
        break;

    case 2: // 下向き
        p1 = { (x1 + x2) / 2, y2 };
        p2 = { x1, y1 };
        p3 = { x2, y1 };
        break;

    case 3: // 左向き
        p1 = { x1, (y1 + y2) / 2 };
        p2 = { x2, y1 };
        p3 = { x2, y2 };
        break;
    }

    // --- 描画 ---
    renderer.DrawPolygon({ p1, p2, p3 }, color);
    renderer.DrawPolygonOutline({ p1, p2, p3 }, camera.ScaleSize(1.0f), ColorF(ColorF::Black));
}