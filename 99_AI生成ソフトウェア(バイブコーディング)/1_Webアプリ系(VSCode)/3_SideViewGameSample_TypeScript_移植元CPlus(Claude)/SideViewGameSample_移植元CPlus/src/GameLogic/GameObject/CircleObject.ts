import { Renderer } from "../Renderer";
import { IColorF } from "../ColorF";

/**
 * CircleObject.ts
 * 移植元: include/CircleObject.h / src/CircleObject.cpp
 *
 * 単純な円描画オブジェクト。GameMain内でデバッグ用(m_ball)、
 * および GoalObject の内部実装として使用される。
 */
export class CircleObject {
    public cx: number;
    public cy: number;
    public radius: number;
    public color: IColorF;

    constructor(_cx: number, _cy: number, _radius: number, _color: IColorF) {
        this.cx = _cx;
        this.cy = _cy;
        this.radius = _radius;
        this.color = _color;
    }

    public draw(renderer: Renderer): void {
        renderer.drawCircle(this.cx, this.cy, this.radius, this.color);
    }
}
