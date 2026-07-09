import { StageMapObject } from "./GameObject/StageMapObject";
import { CollisionResult } from "./CollisionResult";
import { TileType } from "./TileType";

/**
 * IGroundRef
 * 移植元の `bool& isGround`(参照渡しの出力パラメータ)に相当する。
 * TypeScriptにはプリミティブの参照渡しが無いため、値を保持するラッパー
 * オブジェクトを呼び出し側で生成し、渡す形で同等の挙動を再現する。
 * 呼び出し側は呼び出し後に isGroundRef.value を参照する。
 */
export interface IGroundRef {
    value: boolean;
}

/**
 * StageMap.ts
 * 移植元: include/StageMap.h / src/StageMap.cpp
 *
 * プレイヤーとステージタイルとのX/Y別衝突判定、めり込み補正(Resolve)を担当する。
 * 移植元の GravityProperty(演算子オーバーロードによるプロパティ実装)は、
 * Camera.ts の cameraX と同様に get/set アクセサで再現している。
 */
export class StageMap {
    private readonly TILE_SIZE: number;
    private readonly MAP_W: number;
    private readonly MAP_H: number;
    private stageMapObject: StageMapObject;

    // 地球の重力に乗算 +40.0f; //重力
    private gravity_: number = 9.80665 * 5.00;

    constructor(s: StageMapObject) {
        this.stageMapObject = s;
        this.TILE_SIZE = StageMapObject.TILE_SIZE;
        this.MAP_W = StageMapObject.MAP_W;
        this.MAP_H = StageMapObject.MAP_H;

        this.stageMapObject.initialize();
    }

    /**
     * gravity プロパティ(移植元の GravityProperty gravity{ *this } に相当)
     */
    public get gravity(): number {
        return this.gravity_;
    }
    public set gravity(value: number) {
        this.gravity_ = value;
    }

    public getTilesInRect(x: number, y: number, w: number, h: number): TileType[] {

        const result: TileType[] = [];

        let left = Math.trunc(x / this.TILE_SIZE);
        let right = Math.trunc((x + w - 1) / this.TILE_SIZE);
        let top = Math.trunc(y / this.TILE_SIZE);
        let bottom = Math.trunc((y + h - 1) / this.TILE_SIZE);

        // 範囲チェック
        left = Math.max(0, left);
        right = Math.min(this.MAP_W - 1, right);
        top = Math.max(0, top);
        bottom = Math.min(this.MAP_H - 1, bottom);

        for (let ty = top; ty <= bottom; ty++) {
            for (let tx = left; tx <= right; tx++) {
                result.push(this.stageMapObject.onHit(tx, ty));
            }
        }
        return result;
    }

    public checkCollisionRect(x: number, y: number, w: number, h: number, tileKind: number): CollisionResult {
        const left = x;
        const right = x + w;
        const top = y;
        const bottom = y + h;

        const tileLeft = Math.trunc(left / this.TILE_SIZE);
        const tileRight = Math.trunc(right / this.TILE_SIZE);
        const tileTop = Math.trunc(top / this.TILE_SIZE);
        const tileBottom = Math.trunc(bottom / this.TILE_SIZE);

        for (let ty = tileTop; ty <= tileBottom; ty++) {
            for (let tx = tileLeft; tx <= tileRight; tx++) {

                if (this.stageMapObject.isSolidTile(tx, ty, tileKind)) {
                    return { tx, ty }; // 衝突したタイルの座標
                }
            }
        }
        return { tx: -1, ty: -1 }; // 衝突なし
    }

    public checkCollisionX(x: number, y: number, w: number, h: number, moveX: number, tileKind: number): CollisionResult {
        const newX = x + moveX;

        if (moveX > 0) {
            // 右に移動 → 右側のラインだけチェック
            const right = newX + w - 1;
            const tileX = Math.trunc(right / this.TILE_SIZE);

            const tileTop = Math.trunc(y / this.TILE_SIZE);
            const tileBottom = Math.trunc((y + h - 1) / this.TILE_SIZE);

            for (let ty = tileTop; ty <= tileBottom; ty++) {
                if (this.stageMapObject.isSolidTile(tileX, ty, tileKind)) {
                    return { tx: tileX, ty };
                }
            }
        } else if (moveX < 0) {
            // 左に移動 → 左側のラインだけチェック
            const left = newX;
            const tileX = Math.trunc(left / this.TILE_SIZE);

            const tileTop = Math.trunc(y / this.TILE_SIZE);
            const tileBottom = Math.trunc((y + h - 1) / this.TILE_SIZE);

            for (let ty = tileTop; ty <= tileBottom; ty++) {
                if (this.stageMapObject.isSolidTile(tileX, ty, tileKind)) {
                    return { tx: tileX, ty };
                }
            }
        }

        return { tx: -1, ty: -1 };
    }

    public checkCollisionY(x: number, y: number, w: number, h: number, moveY: number, tileKind: number): CollisionResult {
        const newY = y + moveY;

        if (moveY >= 0) {
            // 落下中 → 足のラインだけチェック
            const bottom = newY + h + 1;
            const tileEndYRaw = Math.trunc(bottom / this.TILE_SIZE);
            const tileEndY = tileEndYRaw >= this.MAP_H ? this.MAP_H : tileEndYRaw;
            const tileStartYRaw = Math.trunc(y / this.TILE_SIZE);
            const tileStartY = tileStartYRaw >= this.MAP_H ? this.MAP_H : tileStartYRaw;

            const tileLeft = Math.trunc(x / this.TILE_SIZE);
            const tileRight = Math.trunc((x + w - 1) / this.TILE_SIZE);

            for (let ty = tileStartY; ty <= tileEndY; ty++) {
                for (let tx = tileLeft; tx <= tileRight; tx++) {
                    if (this.stageMapObject.isSolidTile(tx, ty, tileKind)) {
                        return { tx, ty };
                    }
                }
            }
        } else if (moveY < 0) {
            // 上昇中 → 頭のラインだけチェック
            const top = newY;
            const tileY = Math.trunc(top / this.TILE_SIZE);

            const tileLeft = Math.trunc(x / this.TILE_SIZE);
            const tileRight = Math.trunc((x + w - 1) / this.TILE_SIZE);

            for (let tx = tileLeft; tx <= tileRight; tx++) {
                if (this.stageMapObject.isSolidTile(tx, tileY, tileKind)) {
                    return { tx, ty: tileY };
                }
            }
        }

        return { tx: -1, ty: -1 };
    }

    public resolveCollisionX(x: number, y: number, w: number, h: number, moveX: number): number {
        return this.resolveCollisionX_Tile1(x, y, w, h, moveX);
    }

    public resolveCollisionY(x: number, y: number, w: number, h: number, moveY: number, isGround: IGroundRef): number {
        return this.resolveCollisionY_Tile1(x, y, w, h, moveY, isGround);
    }

    public resolveCollisionX_Tile1(x: number, y: number, w: number, h: number, moveX: number): number {

        // newX の位置で衝突しているか？
        const col = this.checkCollisionX(x, y, w, h, moveX, 1);

        let newX = x + moveX;

        if (col.tx === -1) {
            return newX; // 衝突なし
        }

        ////////////
        // ↓衝突後の調整
        // 衝突したタイルの矩形
        const tileX1 = col.tx * this.TILE_SIZE;
        const tileX2 = tileX1 + this.TILE_SIZE;

        if (moveX > 0) {
            // 右に移動 → 右側がめり込んでいる
            newX = tileX1 - w;
        } else if (moveX < 0) {
            // 左に移動 → 左側がめり込んでいる
            newX = tileX2;
        }

        return newX;
    }

    public resolveCollisionY_Tile1(x: number, y: number, w: number, h: number, moveY: number, isGround: IGroundRef): number {

        // newY の位置で衝突しているか？
        const col = this.checkCollisionY(x, y, w, h, moveY, 1);

        let newY = y + moveY;

        if (col.ty === -1) {
            isGround.value = false; // 上も下も衝突していない　→空中にいる
            return newY; // 衝突なし
        }
        ////////////
        // ↓衝突後の調整
        // 衝突したタイルの矩形
        const tileY1 = col.ty * this.TILE_SIZE;
        const tileY2 = tileY1 + this.TILE_SIZE;

        if (moveY > 0) {
            // 下に移動 → 足がタイルにめり込む
            newY = tileY1 - h;
            isGround.value = true; // 下方向に衝突している　→着地している
        } else if (moveY < 0) {
            // 上に移動 → 頭がタイルにめり込む
            newY = tileY2;
        }

        return newY;
    }

    public limitPosLeftX(x: number, width: number): number {

        if (x <= 0 + width) {
            return 0 + width;
        }
        return x;
    }
}
