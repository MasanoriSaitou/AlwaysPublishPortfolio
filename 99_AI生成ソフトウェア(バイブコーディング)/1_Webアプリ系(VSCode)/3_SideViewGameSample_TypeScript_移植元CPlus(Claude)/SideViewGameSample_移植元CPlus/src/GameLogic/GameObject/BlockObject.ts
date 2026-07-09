import { Renderer } from "../Renderer";
import { Camera } from "../Camera";
import { TileType } from "../TileType";
import { ColorF } from "../ColorF";
import { TileMapObject } from "./TileMapObject";
import { GameLibrary } from "../../GameLibrary/GameLibrary";

/**
 * BlockObject.ts
 * 移植元: include/BlockObject.h / src/BlockObject.cpp
 *
 * 地面ブロック(茶色の疑似立方体)。TileMapObjectを継承し、
 * GetTileType/Draw のみをオーバーライドする。
 */
export class BlockObject extends TileMapObject {

    public override getTileType(): TileType {
        return TileType.Ground;
    }

    public override draw(renderer: Renderer, x: number, y: number, offsetY: number, camera: Camera): void {
        GameLibrary.drawBlock(renderer, x, y, offsetY, camera, TileMapObject.TILE_SIZE, ColorF.Brown);
    }
}
