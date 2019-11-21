const palette = [
  [0, 0, 0],
  [255, 255, 255],
  [255, 0, 0]
];

function findClosestPaletteColor(color) {
  let closest = palette[0];
  for (let i = 0; i < palette.length; i++) {
    if (diff(color, palette[i]) < diff(color, closest)) {
      closest = palette[i];
    }
  }

  return closest;
}

function diff(color, paletteColor) {
  let Rdiff = color[0] - paletteColor[0];
  let Gdiff = color[1] - paletteColor[1];
  let Bdiff = color[2] - paletteColor[2];
  let distanceSquared = Rdiff * Rdiff + Gdiff * Gdiff + Bdiff * Bdiff;
  return distanceSquared;
}

function clip(x) {
  return x < 0 ? 0 : x > 255 ? 255 : x;
}

function getRGB(x, y, pixels) {
  R = pixels.get(x, y, 0);
  G = pixels.get(x, y, 1);
  B = pixels.get(x, y, 2);
  return [R, G, B];
}

function setRGB(x, y, pixels, RGB) {
  pixels.set(x, y, 0, RGB[0]);
  pixels.set(x, y, 1, RGB[1]);
  pixels.set(x, y, 2, RGB[2]);
}

function calcError(oldRGB, newRGB) {
  return [oldRGB[0] - newRGB[0], oldRGB[1] - newRGB[1], oldRGB[2] - newRGB[2]];
}

function diffusion(calcRGB, errRGB, quant) {
  return [
    Math.round(clip(calcRGB[0] + errRGB[0] * quant)),
    Math.round(clip(calcRGB[1] + errRGB[1] * quant)),
    Math.round(clip(calcRGB[2] + errRGB[2] * quant))
  ];
}

module.exports.findClosestPaletteColor = findClosestPaletteColor;
module.exports.clip = clip;
module.exports.getRGB = getRGB;
module.exports.setRGB = setRGB;
module.exports.calcError = calcError;
module.exports.diffusion = diffusion;
