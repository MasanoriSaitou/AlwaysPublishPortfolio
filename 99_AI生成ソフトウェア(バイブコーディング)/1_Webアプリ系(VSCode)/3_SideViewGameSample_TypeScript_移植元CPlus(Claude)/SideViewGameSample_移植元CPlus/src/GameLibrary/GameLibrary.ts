import { Renderer, IPoint2F } from "../GameLogic/Renderer";
import { Camera } from "../GameLogic/Camera";
import { IColorF } from "../GameLogic/ColorF";

/**
 * IStickManInfo
 * 移植元: GameLibrary.h 内 struct StickManInfo
 *
 * 棒人間の見た目(頭半径・胴体長・手足長・線幅・各部位の色)を表す構造体。
 * C++版はデフォルト値を持つメンバ変数だったが、TypeScriptのinterfaceは
 * デフォルト値を持てないため、生成側(PlayerObject.ts)でデフォルト値を
 * 明示的に指定して生成する。
 */
export interface IStickManInfo {
    headRadius: number;
    bodyLength: number;
    limbLength: number;
    lineWidth: number;
    colorHead: IColorF;
    colorTorso: IColorF;
    colorLeftHand: IColorF;
    colorRightHand: IColorF;
    colorLeftLeg: IColorF;
    colorRightLeg: IColorF;
}

/**
 * GameLibrary.ts
 * 移植元: GameLibrary/GameLibrary.h, GameLibrary/GameLibrary.cpp
 *
 * C++版は `namespace Library { class GameLibrary { ... } }` という
 * 名前空間+クラスの構造だったが、TypeScriptではファイル自体がモジュール
 * (名前空間相当)として機能するため、GameLibraryクラスをそのままexportする
 * 形に単純化している(指示書11節で許容される「TypeScriptのコーディングに
 * 適した最適化」の範囲。ロジック・計算式は一切変更していない)。
 * すべてのメソッドは移植元同様 static メソッドとして実装している。
 */
export class GameLibrary {

    /**
     * DrawBlock
     * 疑似立体(正面+上面+側面の3面)のブロックを描画する。
     *
     * 【移植元の挙動をそのまま維持】
     * colorTop が未指定(nullopt相当)の場合、colorTop = colorSide = colorFront として
     * 上書きされる。その結果、実際の「正面」の矩形描画には colorFront ではなく
     * colorSide の値が使われる(移植元コードのこの挙動をそのまま踏襲している)。
     */
    static drawBlock(
        renderer: Renderer,
        x: number,
        y: number,
        offsetY: number,
        camera: Camera,
        TILE_SIZE: number,
        colorFront: IColorF,
        colorTop?: IColorF,
        colorSide?: IColorF
    ): void {

        // 拡大率(棒人間と合わせること)
        const bigRate :number = 1.3;

        // 論理座標(ゲーム内座標)
        const wx1 :number = x * TILE_SIZE;
        const wy1 :number = y * TILE_SIZE + offsetY;
        const wx2 :number= (x + 1) * TILE_SIZE;
        const wy2 :number = (y + 1) * TILE_SIZE + offsetY;

        // スケールされた奥行き
        const offset :number = camera.scaleSize(10.0);

        // カメラ変換(世界 → 画面)
        const x1 :number = camera.worldToScreenX(wx1) * bigRate;
        const y1 :number = camera.worldToScreenY(wy1) * bigRate;
        const x2 :number = camera.worldToScreenX(wx2) * bigRate;
        const y2 :number= camera.worldToScreenY(wy2) * bigRate;

        // カラー設定
        // 上部等未指定の場合は自動設定
        if (colorTop === undefined) {
            colorTop = colorFront;
            colorSide = colorFront;
        }

        // ===========================
        // ① 正面(今までの四角)
        // ===========================
        renderer.drawRectOutline(
            x1, y1, x2, y2,
            camera.scaleSize(1.0), // 線の太さもスケール
            { r: 0, g: 0, b: 0, a: 1 } // ColorF::Black
        );

        renderer.drawRect(
            x1, y1, x2, y2,
            colorSide as IColorF
        );

        // ===========================
        // ② 上面(赤の平行四辺形)
        // ===========================
        {
            const p1: IPoint2F = { x: x1, y: y1 };
            const p2: IPoint2F = { x: x2, y: y1 };
            const p3: IPoint2F = { x: x2 + offset, y: y1 - offset };
            const p4: IPoint2F = { x: x1 + offset, y: y1 - offset };

            renderer.drawPolygon([p1, p2, p3, p4], colorTop as IColorF);
            renderer.drawPolygonOutline([p1, p2, p3, p4], camera.scaleSize(0.5), { r: 0, g: 0, b: 0, a: 1 });
        }

        // ===========================
        // ③ 側面(緑の平行四辺形)
        // ===========================
        {
            const s1: IPoint2F = { x: x2, y: y1 };
            const s2: IPoint2F = { x: x2, y: y2 };
            const s3: IPoint2F = { x: x2 + offset, y: y2 - offset };
            const s4: IPoint2F = { x: x2 + offset, y: y1 - offset };

            renderer.drawPolygon([s1, s2, s3, s4], colorSide as IColorF);
            renderer.drawPolygonOutline([s1, s2, s3, s4], camera.scaleSize(0.5), { r: 0, g: 0, b: 0, a: 1 });
        }
    }

    static drawStickMan(info: IStickManInfo, renderer: Renderer, x: number, y: number, camera: Camera): void {

        // 拡大率(棒人間と合わせること)
        const bigRate:number = 1.3;

        // --- カメラ変換(世界 → 画面) ---
        const sx:number = camera.worldToScreenX(x) * bigRate; // カメラのX座標をスクロールに使用
        const sy:number = camera.worldToScreenY(y) * bigRate;

        // 拡大係数
        const coeY:number = camera.getScaleY();

        // スケールされた寸法
        const headRadius:number = info.headRadius * coeY * bigRate;
        const bodyLength:number = info.bodyLength * coeY * bigRate;
        const limbLength:number = info.limbLength * coeY * bigRate;
        const lineWidth:number = info.lineWidth * coeY * bigRate;

        // 頭
        renderer.drawCircle(sx, sy, headRadius, info.colorHead);

        // 胴体
        renderer.drawLine(sx, sy + headRadius, sx, sy + headRadius + bodyLength, lineWidth, info.colorTorso);

        // 左手
        renderer.drawLine(
            sx, sy + headRadius + bodyLength / 2,
            sx - limbLength, sy + headRadius + bodyLength / 2 - limbLength / 2,
            lineWidth, info.colorLeftHand
        );

        // 右手
        renderer.drawLine(
            sx, sy + headRadius + bodyLength / 2,
            sx + limbLength, sy + headRadius + bodyLength / 2 - limbLength / 2,
            lineWidth, info.colorRightHand
        );

        // 左足
        renderer.drawLine(
            sx, sy + headRadius + bodyLength,
            sx - limbLength * 0.7, sy + headRadius + bodyLength + limbLength,
            lineWidth, info.colorLeftLeg
        );

        // 右足
        renderer.drawLine(
            sx, sy + headRadius + bodyLength,
            sx + limbLength * 0.7, sy + headRadius + bodyLength + limbLength,
            lineWidth, info.colorRightLeg
        );
    }

    static getStickManWidth(info: IStickManInfo): number {
        // 左右に最も飛び出すのは手
        return info.limbLength;
    }

    static getStickManHeight(info: IStickManInfo): number {
        // 頭中心から足先までの距離
        return info.headRadius + info.bodyLength + info.limbLength;
    }

    static drawTriangleTile(
        renderer: Renderer,
        tileX: number,
        tileY: number,
        offsetX: number,
        camera: Camera,
        TILE_SIZE: number,
        color: IColorF,
        direction: number
    ): void {

        // 拡大率(棒人間と合わせる)
        const bigRate:number = 1.3;

        // --- 世界座標(タイルの四隅) ---
        const wx1:number = tileX * TILE_SIZE + offsetX;
        const wy1:number = tileY * TILE_SIZE;
        const wx2:number = (tileX + 1) * TILE_SIZE + offsetX;
        const wy2:number = (tileY + 1) * TILE_SIZE;

        // --- 画面座標へ変換 ---
        const x1:number = camera.worldToScreenX(wx1) * bigRate;
        const y1:number = camera.worldToScreenY(wy1) * bigRate;
        const x2:number = camera.worldToScreenX(wx2) * bigRate;
        const y2:number = camera.worldToScreenY(wy2) * bigRate;

        // --- 三角形の頂点を決める ---
        let p1: IPoint2F, p2: IPoint2F, p3: IPoint2F;

        switch (direction) {
            case 0: // 上向き
                p1 = { x: (x1 + x2) / 2, y: y1 };
                p2 = { x: x1, y: y2 };
                p3 = { x: x2, y: y2 };
                break;

            case 1: // 右向き
                p1 = { x: x2, y: (y1 + y2) / 2 };
                p2 = { x: x1, y: y1 };
                p3 = { x: x1, y: y2 };
                break;

            case 2: // 下向き
                p1 = { x: (x1 + x2) / 2, y: y2 };
                p2 = { x: x1, y: y1 };
                p3 = { x: x2, y: y1 };
                break;

            case 3: // 左向き
                p1 = { x: x1, y: (y1 + y2) / 2 };
                p2 = { x: x2, y: y1 };
                p3 = { x: x2, y: y2 };
                break;

            default:
                // 移植元は switch に default が無く direction が0-3以外の場合
                // p1/p2/p3 が未初期化のまま使用される(未定義動作)。
                // TypeScriptでは未初期化のローカル変数を許容しないため、
                // 呼び出し側が必ず0-3を渡す前提のもと、型を満たすための
                // フォールバックとして原点を設定する。
                p1 = { x: x1, y: y1 };
                p2 = { x: x1, y: y1 };
                p3 = { x: x1, y: y1 };
                break;
        }

        // --- 描画 ---
        renderer.drawPolygon([p1, p2, p3], color);
        renderer.drawPolygonOutline([p1, p2, p3], camera.scaleSize(1.0), { r: 0, g: 0, b: 0, a: 1 });
    }
}
