#include "pch.h"
#include "GameLibrary/GameLibrary.h"
using namespace Library;

void GameLibrary::DrawBlock(Renderer& renderer, int x, int y,float offsetY, float cameraX, int TILE_SIZE, optional<ColorF> colorFront, optional<ColorF> colorTop, optional<ColorF> colorSide){

    float x1 = x * TILE_SIZE - cameraX;
    float y1 = y * TILE_SIZE + offsetY;  //Y座標は少しずらして描画できる
    float x2 = (x + 1) * TILE_SIZE - cameraX;
    float y2 = (y + 1) * TILE_SIZE + offsetY;

    float offset = 10.0f; // 奥行きの量（調整可能）

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
        1.0f,
        ColorF(ColorF::Black)
    );

    renderer.DrawRect(
        x1, y1, x2, y2,
        ColorF(colorTop.value())
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
        renderer.DrawPolygonOutline({ p1, p2, p3, p4 }, 0.5f, ColorF(ColorF::Black));
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
        renderer.DrawPolygonOutline({ s1, s2, s3, s4 }, 0.5f, ColorF(ColorF::Black));
    }
}

void GameLibrary::DrawStickMan(const StickManInfo& info, Renderer& renderer, float x,float y) {

    float headRadius = info.headRadius;
    float bodyLength = info.bodyLength;
    float limbLength = info.limbLength;
    float lineWidth = info.lineWidth;

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