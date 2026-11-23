import { palette } from "./palette.ts";

/** The tile uses surface's dark value in both themes, so the mark looks the same everywhere. */
export const LOGO = {
  viewBox: "0 0 32 32",
  tile: { width: 32, height: 32, rx: 7, fill: palette.Neutrals.surface.dark },
  lines: [
    { x: 7, y: 8.5, width: 11, fill: palette.Brand.secondary.light },
    { x: 11, y: 14.25, width: 14, fill: palette.Brand.accent.light },
    { x: 7, y: 20, width: 8, fill: palette.Brand.primary.light },
  ],
  lineHeight: 3.5,
} as const;

/** The mark as a standalone SVG document, e.g. for an app's /icon.svg route. */
export function logoSvg(): string {
  const { tile, lines, lineHeight } = LOGO;
  const r = lineHeight / 2;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${LOGO.viewBox}">` +
    `<rect width="${tile.width}" height="${tile.height}" rx="${tile.rx}" fill="${tile.fill}"/>` +
    lines
      .map(
        (l) =>
          `<rect x="${l.x}" y="${l.y}" width="${l.width}" height="${lineHeight}" rx="${r}" fill="${l.fill}"/>`,
      )
      .join("") +
    `</svg>`
  );
}
