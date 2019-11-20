const palette = [
  [0, 0, 0],
  [255, 255, 255]
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

module.exports.findClosestPaletteColor = findClosestPaletteColor;
module.exports.clip = clip;
