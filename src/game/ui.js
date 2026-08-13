export const COLORS = Object.freeze({
  ink: 0x101827,
  inkSoft: 0x182638,
  cream: "#fff6cf",
  muted: "#a9bfd1",
  gold: 0xe1b85a,
  goldText: "#f4d982",
  green: 0x4f8b58,
  coral: 0xd8665d,
});

export function panel(scene, x, y, width, height, alpha = 0.94) {
  return scene.add.rectangle(x, y, width, height, COLORS.ink, alpha)
    .setStrokeStyle(3, COLORS.gold, 0.9)
    .setDepth(20);
}

export function label(scene, x, y, text, size = 18, color = COLORS.cream, origin = 0.5) {
  return scene.add.text(x, y, text, {
    fontFamily: "Pixel Operator, Trebuchet MS, Arial, sans-serif",
    fontSize: `${size}px`,
    color,
    fontStyle: "bold",
    stroke: "#101827",
    strokeThickness: size >= 24 ? 5 : 3,
    shadow: { offsetX: 2, offsetY: 3, color: "#101827", blur: 0, fill: true },
  }).setOrigin(origin).setDepth(25);
}

export function button(scene, x, y, width, height, text, onClick, options = {}) {
  const fill = options.fill ?? COLORS.inkSoft;
  const stroke = options.stroke ?? COLORS.gold;
  const textColor = options.textColor ?? COLORS.cream;
  const box = scene.add.rectangle(x, y, width, height, fill, 0.98)
    .setStrokeStyle(3, stroke, 1)
    .setInteractive({ useHandCursor: true })
    .setDepth(30);
  const caption = label(scene, x, y - 1, text, options.fontSize ?? 22, textColor);
  caption.setDepth(31);
  box.on("pointerover", () => box.setFillStyle(options.hoverFill ?? 0x294558, 1));
  box.on("pointerout", () => box.setFillStyle(fill, 0.98));
  box.on("pointerdown", () => {
    box.setFillStyle(options.pressFill ?? COLORS.gold, 1);
    caption.setColor("#101827");
    onClick();
  });
  box.on("pointerup", () => {
    box.setFillStyle(options.hoverFill ?? 0x294558, 1);
    caption.setColor(textColor);
  });
  return { box, caption };
}

export function progressBar(scene, x, y, width, ratio, options = {}) {
  const height = options.height ?? 12;
  const track = scene.add.rectangle(x, y, width, height, 0x182638, 0.95).setDepth(25);
  track.setStrokeStyle(2, options.stroke ?? COLORS.gold, 0.9);
  const fill = scene.add.rectangle(x - width / 2 + 4, y, Math.max(0, (width - 8) * ratio), height - 6, options.fill ?? COLORS.gold, 1)
    .setOrigin(0, 0.5).setDepth(26);
  return { track, fill, width, setRatio(value) { fill.width = Math.max(0, (width - 8) * Math.min(1, value)); } };
}

export function destroyDisplayList(list) {
  for (const item of list) item?.destroy?.();
  list.length = 0;
}
