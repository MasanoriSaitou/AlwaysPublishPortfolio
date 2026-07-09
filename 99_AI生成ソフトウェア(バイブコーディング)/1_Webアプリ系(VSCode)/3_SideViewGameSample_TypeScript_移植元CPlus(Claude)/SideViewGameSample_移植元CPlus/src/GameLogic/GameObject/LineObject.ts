import { Renderer } from "../Renderer";
import { IColorF } from "../ColorF";

/**
 * LineObject.ts
 * 移植元: include/LineObject.h / src/LineObject.cpp
 *
 * 単純な線描画オブジェクト。GameMain内でデバッグ用(m_line)として使用される。
 */
export class LineObject {
    public x1: number;
    public y1: number;
    public x2: number;
    public y2: number;
    public strokeWidth: number;
    public color: IColorF;

    constructor(_x1: number, _y1: number, _x2: number, _y2: number, _stroke: number, _color: IColorF) {
        this.x1 = _x1;
        this.y1 = _y1;
        this.x2 = _x2;
        this.y2 = _y2;
        this.strokeWidth = _stroke;
        this.color = _color;
    }

    public draw(renderer: Renderer): void {
        renderer.drawLine(this.x1, this.y1, this.x2, this.y2, this.strokeWidth, this.color);
    }
}
