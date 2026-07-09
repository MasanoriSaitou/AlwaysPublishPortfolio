import { Renderer } from "../Renderer";
import { Camera } from "../Camera";
import { TileType } from "../TileType";
import { ColorF } from "../ColorF";
import { TileMapObject } from "./TileMapObject";
import { GameLibrary } from "../../GameLibrary/GameLibrary";

/**
 * PowerUpBlock1Object.ts
 * 移植元: include/PowerUpBlock1Object.h / src/PowerUpBlock1Object.cpp
 *
 * パワーアップブロック(赤の疑似立方体)。接触(OnHit)すると
 * isDisappearance_ が true になり、以降マップから消滅する。
 */
export class PowerUpBlock1Object extends TileMapObject {

    public override getTileType(): TileType {
        return TileType.PowerUp1;
    }

    public override onHit(): void {
        this.isDisappearance_ = true;
    }

    public override draw(renderer: Renderer, x: number, y: number, offsetY: number, camera: Camera): void {
        GameLibrary.drawBlock(renderer, x, y, offsetY, camera, TileMapObject.TILE_SIZE, ColorF.Red);
    }
}
