import { WORLD } from "./data.js";

export function layout(width = WORLD.width, height = WORLD.height) {
  const scale = Math.min(width / WORLD.width, height / WORLD.height);
  const safeX = Math.max(28, width * 0.035);
  const safeY = Math.max(24, height * 0.035);
  return {
    width,
    height,
    scale,
    safeX,
    safeY,
    centerX: width / 2,
    centerY: height / 2,
    hud: { left: safeX + 12, top: safeY + 12, right: width - safeX - 12 },
    objective: { x: width / 2, y: safeY + 66, width: Math.min(500, width * 0.38) },
    hero: { x: width / 2, y: height * 0.38 },
    primaryButton: { x: width / 2, y: height * 0.72, width: Math.min(340, width * 0.52), height: 66 },
    secondaryButton: { x: width / 2, y: height * 0.83, width: Math.min(260, width * 0.4), height: 48 },
    card: { x: width / 2, y: height / 2 + 18, width: Math.min(720, width * 0.78), height: Math.min(420, height * 0.64) },
  };
}
