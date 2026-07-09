import { InputKey } from "../InputKey";
import { VirtualStickObject } from "../GameObject/VirtualStickObject";

/**
 * VirtualStickController.ts
 * 【新規追加】タッチ操作による仮想スティックの入力制御クラス。
 *
 * 既存のキーボード入力(GameMainのOnKeyDown/OnKeyUp相当)と同じ InputKey
 * インスタンスを更新することで、PlayerController には一切触れずに
 * モバイル対応を実現する。描画は VirtualStickObject が別途担当する
 * (描画とロジックの分離という指示書の方針に準拠)。
 */
export class VirtualStickController {
    private inputKey: InputKey;
    private stickObject: VirtualStickObject;
    private canvas: HTMLCanvasElement;

    private activePointerId: number | null = null;

    // 不感帯(スティック半径に対する割合)。この範囲内の入力は無視する
    private readonly deadZoneRatio: number = 0.15;

    constructor(inputKey: InputKey, stickObject: VirtualStickObject, canvas: HTMLCanvasElement) {
        this.inputKey = inputKey;
        this.stickObject = stickObject;
        this.canvas = canvas;

        this.attach();
    }

    private attach(): void {
        this.canvas.addEventListener("pointerdown", this.onPointerDown);
        this.canvas.addEventListener("pointermove", this.onPointerMove);
        this.canvas.addEventListener("pointerup", this.onPointerUp);
        this.canvas.addEventListener("pointercancel", this.onPointerUp);
    }

    public detach(): void {
        this.canvas.removeEventListener("pointerdown", this.onPointerDown);
        this.canvas.removeEventListener("pointermove", this.onPointerMove);
        this.canvas.removeEventListener("pointerup", this.onPointerUp);
        this.canvas.removeEventListener("pointercancel", this.onPointerUp);
    }

    private getCanvasPos(e: PointerEvent): { x: number; y: number } {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: (e.clientX - rect.left) * (this.canvas.width / rect.width),
            y: (e.clientY - rect.top) * (this.canvas.height / rect.height),
        };
    }

    private onPointerDown = (e: PointerEvent): void => {
        if (this.activePointerId !== null) return;

        const pos = this.getCanvasPos(e);
        const dx = pos.x - this.stickObject.baseX;
        const dy = pos.y - this.stickObject.baseY;

        // スティック台座から少し広めの範囲内でタッチを開始した場合のみ操作対象にする
        const catchRadius = this.stickObject.baseRadius * 1.5;
        if (Math.sqrt(dx * dx + dy * dy) > catchRadius) return;

        this.activePointerId = e.pointerId;
        this.updateStick(pos.x, pos.y);
    };

    private onPointerMove = (e: PointerEvent): void => {
        if (this.activePointerId !== e.pointerId) return;

        const pos = this.getCanvasPos(e);
        this.updateStick(pos.x, pos.y);
    };

    private onPointerUp = (e: PointerEvent): void => {
        if (this.activePointerId !== e.pointerId) return;

        this.activePointerId = null;
        this.resetStick();
    };

    private updateStick(x: number, y: number): void {
        let dx = x - this.stickObject.baseX;
        let dy = y - this.stickObject.baseY;

        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = this.stickObject.baseRadius;

        // スティック台座の範囲内にノブの動きを制限する
        if (distance > maxDistance) {
            const ratio = maxDistance / distance;
            dx *= ratio;
            dy *= ratio;
        }

        this.stickObject.knobOffsetX = dx;
        this.stickObject.knobOffsetY = dy;

        this.applyDirection(dx, dy, Math.min(distance, maxDistance), maxDistance);
    }

    private resetStick(): void {
        this.stickObject.knobOffsetX = 0;
        this.stickObject.knobOffsetY = 0;

        this.inputKey.isLeft = false;
        this.inputKey.isRight = false;
        this.inputKey.isUp = false;
        this.inputKey.isDown = false;
    }

    /**
     * ノブの変位から8方向の角度セクター判定を行い、InputKeyのフラグを更新する。
     * 斜め方向では2つのフラグが同時に立つ(例:右上なら isRight と isUp が両方true)。
     */
    private applyDirection(dx: number, dy: number, distance: number, maxDistance: number): void {

        this.inputKey.isLeft = false;
        this.inputKey.isRight = false;
        this.inputKey.isUp = false;
        this.inputKey.isDown = false;

        // 不感帯以下の場合は入力なしとする
        if (distance < maxDistance * this.deadZoneRatio) return;

        // atan2で角度(度)を求める(-180〜180、0度が右方向、下方向がプラス)
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        if (angle > -22.5 && angle <= 22.5) {
            this.inputKey.isRight = true;
        } else if (angle > 22.5 && angle <= 67.5) {
            this.inputKey.isRight = true;
            this.inputKey.isDown = true;
        } else if (angle > 67.5 && angle <= 112.5) {
            this.inputKey.isDown = true;
        } else if (angle > 112.5 && angle <= 157.5) {
            this.inputKey.isLeft = true;
            this.inputKey.isDown = true;
        } else if (angle > 157.5 || angle <= -157.5) {
            this.inputKey.isLeft = true;
        } else if (angle > -157.5 && angle <= -112.5) {
            this.inputKey.isLeft = true;
            this.inputKey.isUp = true;
        } else if (angle > -112.5 && angle <= -67.5) {
            this.inputKey.isUp = true;
        } else {
            // angle > -67.5 && angle <= -22.5
            this.inputKey.isRight = true;
            this.inputKey.isUp = true;
        }
    }
}
