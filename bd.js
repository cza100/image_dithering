//Burkes Dithering
const palette = require('./palette.js');

module.exports = function(pixels) {
  let w = pixels.shape[0];
  let h = pixels.shape[1];

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      oldRGB = palette.getRGB(x, y, pixels);

      newRGB = palette.findClosestPaletteColor(oldRGB);

      errRGB = palette.calcError(oldRGB, newRGB);

      palette.setRGB(x, y, pixels, newRGB);

      if (x + 1 < w) {
        calcRGB = palette.getRGB(x + 1, y, pixels);
        effectRGB = palette.diffusion(calcRGB, errRGB, 8.0 / 32);
        palette.setRGB(x + 1, y, pixels, effectRGB);
      }

      if (x + 2 < w) {
        calcRGB = palette.getRGB(x + 2, y, pixels);
        effectRGB = palette.diffusion(calcRGB, errRGB, 4.0 / 32);
        palette.setRGB(x + 2, y, pixels, effectRGB);
      }

      if (x - 2 >= 0 && y + 1 < h) {
        calcRGB = palette.getRGB(x - 2, y + 1, pixels);
        effectRGB = palette.diffusion(calcRGB, errRGB, 2.0 / 32);
        palette.setRGB(x - 2, y + 1, pixels, effectRGB);
      }

      if (x - 1 >= 0 && y + 1 < h) {
        calcRGB = palette.getRGB(x - 1, y + 1, pixels);
        effectRGB = palette.diffusion(calcRGB, errRGB, 4.0 / 32);
        palette.setRGB(x - 1, y + 1, pixels, effectRGB);
      }

      if (y + 1 < h) {
        calcRGB = palette.getRGB(x, y + 1, pixels);
        effectRGB = palette.diffusion(calcRGB, errRGB, 8.0 / 32);
        palette.setRGB(x, y + 1, pixels, effectRGB);
      }

      if (x + 1 < w && y + 1 < h) {
        calcRGB = palette.getRGB(x + 1, y + 1, pixels);
        effectRGB = palette.diffusion(calcRGB, errRGB, 4.0 / 32);
        palette.setRGB(x + 1, y + 1, pixels, effectRGB);
      }

      if (x + 2 < w && y + 1 < h) {
        calcRGB = palette.getRGB(x + 2, y + 1, pixels);
        effectRGB = palette.diffusion(calcRGB, errRGB, 2.0 / 32);
        palette.setRGB(x + 2, y + 1, pixels, effectRGB);
      }
    }
  }

  return pixels;
};
