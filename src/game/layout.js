import { WORLD } from "./data.js";

export function layout(width = WORLD.width, height = WORLD.height) {
  const scale = Math.min(width / WORLD.width, height / WORLD.height);
  const safeX = Math.max(24, width * 0.035);
  const safeY = Math.max(18, height * 0.03);
  return {
    width,
    height,
    scale,
    centerX: width / 2,
    centerY: height / 2,
    safeX,
    hud: { left: safeX + 12, right: width - safeX - 12, top: safeY + 16 },
    primaryButton: { x: width / 2, y: height * 0.76, width: Math.min(350, width * 0.54), height: 64 },
    secondaryButton: { x: width / 2, y: height * 0.87, width: Math.min(280, width * 0.44), height: 48 },
    card: { x: width / 2, y: height / 2 + 20, width: Math.min(720, width * 0.82), height: Math.min(460, height * 0.7) },
  };
}
