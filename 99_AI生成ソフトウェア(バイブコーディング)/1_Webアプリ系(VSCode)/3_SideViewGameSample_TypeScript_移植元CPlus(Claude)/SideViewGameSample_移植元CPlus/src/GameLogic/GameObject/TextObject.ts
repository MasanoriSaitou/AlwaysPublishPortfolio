import { Renderer } from "../Renderer";
import { Camera } from "../Camera";
import { IColorF } from "../ColorF";

/**
 * TextObject.ts
 * 移植元: include/TextObject.h / src/TextObject.cpp
 *
 * 文字列描画オブジェクト。camera を渡すとワールド座標→スクリーン座標変換を
 * 行った上で描画し(体力ハート表示等)、camera を省略(null)すると
 * 画面固定座標にそのまま描画する(操作方法テキスト等、GameMain::Draw内での
 * 用途に対応)。
 *
 * 移植元は `const Camera* camera = nullptr` というポインタ+デフォルト引数で
 * 「カメラ変換の有無」を切り替えていたため、TypeScript側では
 * `camera?: Camera | null = null` として同等の挙動を再現している。
 */
export class TextObject {

    public draw(
        text: string,
        x: number,
        y: number,
        size: number,
        color: IColorF,
        renderer: Renderer,
        camera: Camera | null = null
    ): void {

        // 拡大率(棒人間と合わせること)
        const bigRate = 1.3;

        if (camera === null) {

            // スケールされた寸法
            size = size * bigRate;
            // 表示
            renderer.drawTextString(text, x, y, size, color);
            return;
        }

        // --- カメラ変換(世界 → 画面) ---
        const sx = camera.worldToScreenX(x) * bigRate; // カメラのX座標をスクロールに使用
        const sy = camera.worldToScreenY(y) * bigRate;

        // 拡大係数
        const coeY = camera.getScaleY();

        // スケールされた寸法
        size = size * coeY * bigRate;

        renderer.drawTextString(text, sx, sy, size, color);
    }
}
