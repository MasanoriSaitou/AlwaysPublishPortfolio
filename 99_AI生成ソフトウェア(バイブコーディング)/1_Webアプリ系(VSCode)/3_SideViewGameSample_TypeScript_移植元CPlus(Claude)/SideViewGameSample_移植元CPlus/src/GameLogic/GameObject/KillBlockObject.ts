import { TileType } from "../TileType";
import { TileMapObject } from "./TileMapObject";

/**
 * KillBlockObject.ts
 * 移植元: include/KillBlockObject.h / src/KillBlockObject.cpp
 *
 * 死亡ライン(画面下部に敷かれる不可視の即死判定タイル)。
 * Draw() はオーバーライドしないため、基底クラス(TileMapObject)の
 * 「何も描画しない」実装がそのまま使われる。
 */
export class KillBlockObject extends TileMapObject {

    public override getTileType(): TileType {
        return TileType.Death;
    }
}
