import { Renderer } from "../Renderer";
import { Camera } from "../Camera";
import { TileType } from "../TileType";
import { ColorF } from "../ColorF";
import { TileMapObject } from "./TileMapObject";
import { GameLibrary } from "../../GameLibrary/GameLibrary";

/**
 * ThornBlockObject.ts
 * 移植元: include/ThornBlockObject.h / src/ThornBlockObject.cpp
 *
 * トゲ(灰色の三角形、上向き固定=direction 0)。
 * 【移植元の挙動をそのまま維持】
 * Draw() の第4引数(offsetY)は使用されず、代わりに DrawTriangleTile への
 * offsetX には常に定数 2 が渡されている(移植元コードのこの実装をそのまま踏襲)。
 */
export class ThornBlockObject extends TileMapObject {

    public override getTileType(): TileType {
        return TileType.Thorn;
    }

    public override draw(renderer: Renderer, x: number, y: number, offsetY: number, camera: Camera): void {
        GameLibrary.drawTriangleTile(renderer, x, y, 2, camera, TileMapObject.TILE_SIZE, ColorF.Gray, 0);
    }
}
