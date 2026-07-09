import { IColorF, ColorF } from "./ColorF";

/**
 * IPoint2F
 * 移植元の D2D1_POINT_2F に相当する座標構造体(DrawPolygon等で使用)。
 */
export interface IPoint2F {
    x: number;
    y: number;
}

/**
 * Renderer.ts
 * 移植元: include/Renderer.h / src/Renderer.cpp
 *
 * 移植元はDirect2Dの即時モードAPIを直接ラップしたクラスであり、
 * 本クラスはHTML5 Canvas 2D APIを用いて同等の描画メソッド群を提供する。
 * 指示書6節により、Rendererクラスは各GameObjectのDrawメソッド構造を
 * 移植元と一致させるために新規追加している(不要なら省略可だが、対応関係を
 * 明確にするため維持する方針とした)。
 *
 * メソッド名は移植元と同一(先頭を小文字にする命名慣習のみ変更)。
 * Direct2Dの Begin/End(BeginDraw/EndDraw)構造は Canvas2D には不要だが、
 * 呼び出し側(GameMain等)との対応関係を保つため空実装として維持する。
 */
export class Renderer {
    // 画面サイズ
    private m_screenWidth: number = 0;
    private m_screenHeight: number = 0;

    // Canvas2D用
    //private m_canvas: HTMLCanvasElement | null = null;
    private m_ctx: CanvasRenderingContext2D | null = null;

    constructor() {}

    /**
     * Init
     * 移植元は HWND を受け取り Direct2D ファクトリ/レンダーターゲットを生成していたが、
     * TS版では Canvas 要素を受け取り 2D コンテキストを取得する。
     */
    public init(canvas: HTMLCanvasElement): void {
        //this.m_canvas = canvas;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            // 初期化エラーのみログ出力(9.1節: 起動時初期化/エラー発生時のみ)
            console.error(
                "| ログ種別 | 発生箇所 | 内容 |\n" +
                "|---|---|---|\n" +
                "| ERROR | Renderer.init | 2D描画コンテキストの取得に失敗しました |"
            );
            return;
        }

        this.m_ctx = ctx;
        this.m_screenWidth = canvas.width;
        this.m_screenHeight = canvas.height;
    }

    public begin(): boolean {
        if (!this.m_ctx) {
            return false;
        }
        return true;
    }

    public end(): void {
        // Canvas2Dは即時描画のため明示的なEnd処理は不要。
        // 移植元(Renderer::End)との対応関係維持のため空実装として残す。
    }

    public clear(r: number, g: number, b: number): void {
        if (!this.m_ctx) return;

        this.m_ctx.fillStyle = ColorF.toCssString({ r, g, b, a: 1.0 });
        this.m_ctx.fillRect(0, 0, this.m_screenWidth, this.m_screenHeight);
    }

    public drawRect(x1: number, y1: number, x2: number, y2: number, color: IColorF): void {
        if (!this.m_ctx) return;

        this.m_ctx.fillStyle = ColorF.toCssString(color);
        this.m_ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
    }

    public drawCircle(cx: number, cy: number, radius: number, color: IColorF): void {
        if (!this.m_ctx) return;

        this.m_ctx.beginPath();
        this.m_ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        this.m_ctx.fillStyle = ColorF.toCssString(color);
        this.m_ctx.fill();
    }

    public drawLine(x1: number, y1: number, x2: number, y2: number, strokeWidth: number, color: IColorF): void {
        if (!this.m_ctx) return;

        this.m_ctx.beginPath();
        this.m_ctx.moveTo(x1, y1);
        this.m_ctx.lineTo(x2, y2);
        this.m_ctx.lineWidth = strokeWidth;
        this.m_ctx.strokeStyle = ColorF.toCssString(color);
        this.m_ctx.stroke();
    }

    /**
     * 枠線のみを描画する四角形
     */
    public drawRectOutline(x1: number, y1: number, x2: number, y2: number, strokeWidth: number, color: IColorF): void {
        if (!this.m_ctx) return;

        this.m_ctx.lineWidth = strokeWidth;
        this.m_ctx.strokeStyle = ColorF.toCssString(color);
        this.m_ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
    }

    public drawPolygon(points: IPoint2F[], color: IColorF): void {
        if (!this.m_ctx || points.length === 0) return;

        this.m_ctx.beginPath();
        this.m_ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            this.m_ctx.lineTo(points[i].x, points[i].y);
        }
        this.m_ctx.closePath();
        this.m_ctx.fillStyle = ColorF.toCssString(color);
        this.m_ctx.fill();
    }

    public drawPolygonOutline(points: IPoint2F[], strokeWidth: number, color: IColorF): void {
        if (!this.m_ctx || points.length === 0) return;

        this.m_ctx.beginPath();
        this.m_ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            this.m_ctx.lineTo(points[i].x, points[i].y);
        }
        this.m_ctx.closePath();
        this.m_ctx.lineWidth = strokeWidth;
        this.m_ctx.strokeStyle = ColorF.toCssString(color);
        this.m_ctx.stroke();
    }

    public drawTextString(text: string, x: number, y: number, size: number, color: IColorF): void {
        if (!this.m_ctx) return;

        // 移植元は "Segoe UI Symbol" / ja-jp を指定していたため、フォールバックとして維持
        this.m_ctx.font = `${size}px "Segoe UI Symbol", sans-serif`;
        this.m_ctx.fillStyle = ColorF.toCssString(color);
        this.m_ctx.textBaseline = "top";
        this.m_ctx.fillText(text, x, y);
    }

    public getScreenWidth(): number {
        return this.m_screenWidth;
    }

    public getScreenHeight(): number {
        return this.m_screenHeight;
    }
}
