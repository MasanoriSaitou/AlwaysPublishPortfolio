import { Renderer } from "../Renderer";
import { IColorF } from "../ColorF";

/**
 * RectObject.ts
 * 移植元: include/RectObject.h / src/RectObject.cpp
 *
 * 単純な矩形描画オブジェクト。GameMain内でデバッグ用に使用されている
 * (m_player, m_player2)。指示書11節の方針により、UI仕様書に明記が
 * 無くても移植元のまま漏れなく描画する。
 *
 * 【移植元の挙動をそのまま維持】
 * コンストラクタ引数名は x1,y1,x2,y2 だが、Draw() 内では
 * `DrawRect(x1, y1, x1+x2, y1+y2, color)` という計算になっており、
 * 実質的に x2/y2 は「右下座標」ではなく「幅/高さ」として扱われている。
 * この移植元の実装(フィールド名と実際の意味の不一致)をそのまま踏襲する。
 */
export class RectObject {
    public x1: number;
    public y1: number;
    public x2: number;
    public y2: number;
    public color: IColorF;

    constructor(_x1: number, _y1: number, _x2: number, _y2: number, _color: IColorF) {
        this.x1 = _x1;
        this.y1 = _y1;
        this.x2 = _x2;
        this.y2 = _y2;
        this.color = _color;
    }

    public draw(renderer: Renderer): void {
        renderer.drawRect(this.x1, this.y1, this.x1 + this.x2, this.y1 + this.y2, this.color);
    }
}
