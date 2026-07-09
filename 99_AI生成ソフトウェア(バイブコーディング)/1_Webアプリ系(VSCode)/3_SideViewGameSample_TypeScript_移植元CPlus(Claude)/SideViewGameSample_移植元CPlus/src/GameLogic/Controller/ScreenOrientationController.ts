/**
 * ScreenOrientationController.ts
 * 【新規追加】モバイル端末の判定と、縦向き時の画面回転(横向き固定)を担当する。
 *
 * 移植元には対応コードが存在しない、指示書の追加仕様(モバイル横向き固定)に
 * 基づく新規実装。PC(デスクトップ)ブラウザでは何もしない(非動作)。
 * CSSの transform: rotate(90deg) を用いて、縦持ちのモバイル端末でも
 * ゲーム画面を横向き表示に固定する。
 */
export class ScreenOrientationController {
    private targetElement: HTMLElement;
    private readonly isMobileDevice: boolean;

    constructor(targetElement: HTMLElement) {
        this.targetElement = targetElement;
        this.isMobileDevice = ScreenOrientationController.detectMobile();

        if (this.isMobileDevice) {
            this.applyRotationIfNeeded();
            window.addEventListener("resize", this.applyRotationIfNeeded);
            window.addEventListener("orientationchange", this.applyRotationIfNeeded);
        }
    }

    private static detectMobile(): boolean {
        return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    /**
     * 現在の画面の向きを確認し、縦向きであれば90度回転、横向きであれば
     * 回転を解除する。PC(非モバイル)の場合は何もしない。
     */
    private applyRotationIfNeeded = (): void => {
        if (!this.isMobileDevice) return;

        const isPortrait = window.innerHeight > window.innerWidth;

        if (isPortrait) {
            this.rotate();
        } else {
            this.unrotate();
        }
    };

    private rotate(): void {
        const rotatedWidth = window.innerHeight;
        const rotatedHeight = window.innerWidth;

        this.targetElement.style.transformOrigin = "top left";
        this.targetElement.style.transform = `rotate(90deg) translateY(-${rotatedHeight}px)`;
        this.targetElement.style.width = `${rotatedWidth}px`;
        this.targetElement.style.height = `${rotatedHeight}px`;
    }

    private unrotate(): void {
        this.targetElement.style.transform = "";
        this.targetElement.style.width = "";
        this.targetElement.style.height = "";
    }

    public dispose(): void {
        window.removeEventListener("resize", this.applyRotationIfNeeded);
        window.removeEventListener("orientationchange", this.applyRotationIfNeeded);
    }
}
