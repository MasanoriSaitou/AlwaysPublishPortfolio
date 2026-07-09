import { Renderer } from "../Renderer";
import { Camera } from "../Camera";
import { TileType } from "../TileType";
import { IColorF, ColorF } from "../ColorF";
import { TileMapObject } from "./TileMapObject";

/**
 * GoalObject.ts
 * 移植元: include/GoalObject.h / src/GoalObject.cpp
 *
 * ゴール地点(黄緑の円)。接触(OnHit)すると isDisappearance_ が true になる。
 *
 * 【移植元の挙動をそのまま維持(バグ含む)】
 * 1) Draw() のオーバーライド元シグネチャは x, y が int 型のため、
 *    ワールド→スクリーン座標変換後の浮動小数値を代入する際に
 *    暗黙の int 切り捨てが発生していた。TypeScriptには int 型が無いため、
 *    Math.trunc() でこの切り捨て挙動を明示的に再現している。
 * 2) スケール済み半径 r (= radius * coeX * bigRate) が計算されているが、
 *    実際の DrawCircle 呼び出しでは使われておらず、スケールされていない
 *    素の radius が使われている(移植元の未使用計算値バグをそのまま維持)。
 */
export class GoalObject extends TileMapObject {
    private radius: number;
    private color: IColorF;

    public constructor(radius?: number, color?: IColorF) {
        super();
        this.radius = radius !== undefined ? radius : 16.0;
        this.color = color !== undefined ? color : ColorF.GreenYellow;
    }

    public override getTileType(): TileType {
        return TileType.Goal;
    }

    public override onHit(): void {
        this.isDisappearance_ = true;
    }

    public override draw(renderer: Renderer, x: number, y: number, offsetY: number, cameraX: Camera): void {
        const bigRate:number = 1.3;

        // 移植元は x, y が int 型のパラメータのため、以下の代入で暗黙の切り捨てが発生する
        x = Math.trunc(cameraX.worldToScreenX(x * TileMapObject.TILE_SIZE) * bigRate);
        y = Math.trunc(y * TileMapObject.TILE_SIZE * bigRate + offsetY);

        // 拡大係数
        const coeX:number = cameraX.getScaleX();

        // スケールされた半径
        const r:number = this.radius * coeX * bigRate;

        renderer.drawCircle(x, y, r, this.color);
    }
}
