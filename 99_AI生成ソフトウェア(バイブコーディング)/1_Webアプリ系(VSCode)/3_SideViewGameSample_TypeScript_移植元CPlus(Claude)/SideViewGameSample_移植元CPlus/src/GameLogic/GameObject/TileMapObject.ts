import { Renderer } from "../Renderer";
import { Camera } from "../Camera";
import { TileType } from "../TileType";

/**
 * TileMapObject.ts
 * 移植元: include/TileMapObject.h / src/TileMapObject.cpp
 *
 * 全タイルオブジェクト(BlockObject, ThornBlockObject, GoalObject等)の基底クラス。
 * 何もオーバーライドしない場合は「空気タイル」として振る舞う
 * (GetTileType→Empty, Draw→何も描画しない, OnHit→何もしない)。
 *
 * 移植元の protected bool isDisappearance と、それを取得する
 * public な IsDisappearance() は、TypeScriptでは同名衝突を避けるため
 * バッキングフィールドに末尾アンダースコアを付与している
 * (Camera.ts の cameraX_ と同様の方針)。
 */
export class TileMapObject {
    protected isDisappearance_: boolean;

    public static readonly TILE_SIZE: number = 32;

    constructor() {
        this.isDisappearance_ = false;
    }

    public isDisappearance(): boolean {
        return this.isDisappearance_;
    }

    public draw(renderer: Renderer, x: number, y: number, offsetY: number, camera: Camera): void {
        // 基底クラスでは何も描画しない(空気タイル)
    }

    public getTileType(): TileType {
        return TileType.Empty;
    }

    public onHit(): void {
        // 基底クラスでは何もしない
    }
}
