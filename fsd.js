const palette = require('./palette.js');

module.exports = function(imgWidth, imgHeight, pixels) {
  let w = imgWidth;
  let h = imgHeight;
  for (let y = 0; y < imgHeight; y++) {
    for (let x = 0; x < imgWidth; x++) {
      oldR = pixels.get(x, y, 0);
      oldG = pixels.get(x, y, 1);
      oldB = pixels.get(x, y, 2);

      newRGB = palette.findClosestPaletteColor([oldR, oldG, oldB]);
      newR = newRGB[0];
      newG = newRGB[1];
      newB = newRGB[2];

      errR = oldR - newR;
      errG = oldG - newG;
      errB = oldB - newB;

      pixels.set(x, y, 0, newR);
      pixels.set(x, y, 1, newG);
      pixels.set(x, y, 2, newB);

      if (x + 1 < w) {
        calcR = pixels.get(x + 1, y, 0) + (errR * 7.0) / 16.0;
        pixels.set(x + 1, y, 0, Math.round(palette.clip(calcR)));
        calcG = pixels.get(x + 1, y, 1) + (errG * 7.0) / 16.0;
        pixels.set(x + 1, y, 1, Math.round(palette.clip(calcG)));
        calcB = pixels.get(x + 1, y, 2) + (errB * 7.0) / 16.0;
        pixels.set(x + 1, y, 2, Math.round(palette.clip(calcB)));
      }

      if (x - 1 >= 0 && y + 1 < h) {
        calcR = pixels.get(x - 1, y + 1, 0) + (errR * 3.0) / 16.0;
        pixels.set(x - 1, y + 1, 0, Math.round(palette.clip(calcR)));
        calcG = pixels.get(x - 1, y + 1, 1) + (errG * 3.0) / 16.0;
        pixels.set(x - 1, y + 1, 1, Math.round(palette.clip(calcG)));
        calcB = pixels.get(x - 1, y + 1, 2) + (errB * 3.0) / 16.0;
        pixels.set(x - 1, y + 1, 2, Math.round(palette.clip(calcB)));
      }

      if (y + 1 < h) {
        calcR = pixels.get(x, y + 1, 0) + (errR * 5.0) / 16.0;
        pixels.set(x, y + 1, 0, Math.round(palette.clip(calcR)));
        calcG = pixels.get(x, y + 1, 1) + (errG * 5.0) / 16.0;
        pixels.set(x, y + 1, 1, Math.round(palette.clip(calcG)));
        calcB = pixels.get(x, y + 1, 2) + (errB * 5.0) / 16.0;
        pixels.set(x, y + 1, 2, Math.round(palette.clip(calcB)));
      }

      if (x + 1 < w && y + 1 < h) {
        calcR = pixels.get(x + 1, y + 1, 0) + (errR * 1.0) / 16.0;
        pixels.set(x + 1, y + 1, 0, Math.round(palette.clip(calcR)));
        calcG = pixels.get(x + 1, y + 1, 1) + (errG * 1.0) / 16.0;
        pixels.set(x + 1, y + 1, 1, Math.round(palette.clip(calcG)));
        calcB = pixels.get(x + 1, y + 1, 2) + (errB * 1.0) / 16.0;
        pixels.set(x + 1, y + 1, 2, Math.round(palette.clip(calcB)));
      }
    }
  }

  return pixels;
};
