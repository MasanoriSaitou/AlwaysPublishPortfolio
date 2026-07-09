import { Renderer } from "./GameLogic/Renderer";
import { GameMain } from "./GameLogic/GameMain";
import { InputKey } from "./GameLogic/InputKey";
import { VirtualStickObject } from "./GameLogic/GameObject/VirtualStickObject";
import { VirtualStickController } from "./GameLogic/Controller/VirtualStickController";
import { ScreenOrientationController } from "./GameLogic/Controller/ScreenOrientationController";

/**
 * main.ts
 *
 * アプリケーションのエントリーポイント。
 * 指示書の方針により、本ファイルにはゲームロジックを一切含めない。
 * 行う処理は以下のみ:
 *   1. Canvas要素の取得とRendererの初期化
 *   2. GameMainのインスタンス化
 *   3. キーボード入力(A/D/W/S)をGameMainに配線(移植元のOnKeyDown/OnKeyUpに相当)
 *   4. モバイル用の仮想スティック・画面回転制御の配線(新規機能、別クラスに実装済み)
 *   5. requestAnimationFrameによるゲームループの起動
 *      (移植元のGameLoop: 60FPS間隔でUpdate→Renderを実行する構造を踏襲)
 */

function isMobileDevice(): boolean {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function main(): void {
    const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement | null;
    if (!canvas) {
        console.error(
            "| ログ種別 | 発生箇所 | 内容 |\n" +
            "|---|---|---|\n" +
            "| ERROR | main | #gameCanvas が見つかりませんでした |"
        );
        return;
    }

    const renderer = new Renderer();

    // Canvas をウィンドウいっぱいに広げてから初期化する
    function resizeCanvas(): void {
        canvas!.width = window.innerWidth;
        canvas!.height = window.innerHeight;
        renderer.init(canvas!);
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const gameMain = new GameMain(renderer);

    // --- キーボード入力配線(移植元 OnKeyDown/OnKeyUp 相当) ---
    window.addEventListener("keydown", (e: KeyboardEvent) => {
        switch (e.key.toUpperCase()) {
            case "A": gameMain.onKeyDownA(); break;
            case "D": gameMain.onKeyDownD(); break;
            case "W": gameMain.onKeyDownW(); break;
            case "S": gameMain.onKeyDownS(); break;
            default: break;
        }
    });
    window.addEventListener("keyup", (e: KeyboardEvent) => {
        switch (e.key.toUpperCase()) {
            case "A": gameMain.onKeyUpA(); break;
            case "D": gameMain.onKeyUpD(); break;
            case "W": gameMain.onKeyUpW(); break;
            case "S": gameMain.onKeyUpS(); break;
            default: break;
        }
    });

    // --- モバイル対応(新規機能): 仮想スティック・画面回転 ---
    const isMobile = isMobileDevice();
    const virtualStickInputKey = new InputKey();
    let virtualStickObject: VirtualStickObject | null = null;
    let virtualStickController: VirtualStickController | null = null;

    if (isMobile) {
        // 画面左下あたりに固定配置
        virtualStickObject = new VirtualStickObject(150, window.innerHeight - 150, 90, 40);
        virtualStickController = new VirtualStickController(virtualStickInputKey, virtualStickObject, canvas);

        // 画面回転制御(縦持ち時に横向き固定)
        new ScreenOrientationController(document.body);
    }

    // 仮想スティックの入力をキーボードと同じ経路(GameMainのOnKeyDown/Up)に合流させる
    function syncVirtualStickInput(): void {
        if (!isMobile) return;

        if (virtualStickInputKey.isLeft) gameMain.onKeyDownA(); else gameMain.onKeyUpA();
        if (virtualStickInputKey.isRight) gameMain.onKeyDownD(); else gameMain.onKeyUpD();
        if (virtualStickInputKey.isUp) gameMain.onKeyDownW(); else gameMain.onKeyUpW();
        if (virtualStickInputKey.isDown) gameMain.onKeyDownS(); else gameMain.onKeyUpS();
    }

    // --- ゲームループ(移植元 GameLoop 相当) ---
    // 60FPS(1/60秒)間隔でUpdate→Renderを実行する構造をそのまま踏襲する
    let prevTime = performance.now();

    function gameLoop(now: number): void {
        requestAnimationFrame(gameLoop);

        const delta = (now - prevTime) / 1000.0;

        if (delta >= 1.0 / 60.0) {
            prevTime = now;

            syncVirtualStickInput();

            // --- Update ---
            gameMain.update(delta);

            // --- Render ---
            renderer.clear(0.8, 0.9, 1.0);
            gameMain.draw();

            // モバイル用の仮想スティックUIを最前面に描画
            if (isMobile && virtualStickObject) {
                virtualStickObject.draw(renderer);
            }
        }
    }

    requestAnimationFrame(gameLoop);
}

main();