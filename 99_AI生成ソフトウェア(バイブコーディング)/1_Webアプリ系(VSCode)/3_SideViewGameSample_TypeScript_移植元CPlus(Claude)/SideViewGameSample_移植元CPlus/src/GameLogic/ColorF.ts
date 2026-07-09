/**
 * ColorF.ts
 * 【新規追加】移植元の D2D1::ColorF (Direct2D の名前付きカラー定数) に相当するヘルパー。
 *
 * 移植元コードは `D2D1::ColorF(D2D1::ColorF::Brown)` のように、
 * Direct2D が提供する名前付き色定数(D3DCOLORVALUE準拠のWeb標準色名)を使用している。
 * TypeScript/Canvas2D側には存在しないため、本ファイルで最小限の互換定義を用意する。
 *
 * 各定数値は Direct2D の D2D1::ColorF::Enum が採用する標準Web色名の
 * RGB値(0-1正規化)と完全に一致させている。
 * 移植元コード中で実際に使用されている色のみを定義している
 * (Black, White, Red, Blue, Green, Yellow, Aqua, Gray, Brown, Gold, GreenYellow, DeepPink)。
 */
export interface IColorF {
    r: number; // 0.0 - 1.0
    g: number; // 0.0 - 1.0
    b: number; // 0.0 - 1.0
    a: number; // 0.0 - 1.0 (不透明度)
}

function rgb(r: number, g: number, b: number, a: number = 1.0): IColorF {
    return { r: r / 255, g: g / 255, b: b / 255, a };
}

export class ColorF {
    static readonly Black: IColorF = rgb(0, 0, 0);
    static readonly White: IColorF = rgb(255, 255, 255);
    static readonly Red: IColorF = rgb(255, 0, 0);
    static readonly Blue: IColorF = rgb(0, 0, 255);
    static readonly Green: IColorF = rgb(0, 128, 0);
    static readonly Yellow: IColorF = rgb(255, 255, 0);
    static readonly Aqua: IColorF = rgb(0, 255, 255);
    static readonly Gray: IColorF = rgb(128, 128, 128);
    static readonly Brown: IColorF = rgb(165, 42, 42);
    static readonly Gold: IColorF = rgb(255, 215, 0);
    static readonly GreenYellow: IColorF = rgb(173, 255, 47);
    static readonly DeepPink: IColorF = rgb(255, 20, 147);

    /**
     * IColorF を Canvas2D の fillStyle/strokeStyle に渡せる CSS カラー文字列に変換する。
     */
    static toCssString(color: IColorF): string {
        const r = Math.round(color.r * 255);
        const g = Math.round(color.g * 255);
        const b = Math.round(color.b * 255);
        return `rgba(${r}, ${g}, ${b}, ${color.a})`;
    }
}
