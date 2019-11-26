const fs = require('fs');
const getPixels = require('get-pixels');
const savePixels = require('save-pixels');
const handle_fsd = require('./fsd.js');
const handle_jjand = require('./jjand.js');
const handle_sd = require('./sd.js');
const handle_ad = require('./ad.js');
const handle_bd = require('./bd.js');
const handle_sid = require('./sid.js');

const dither = (imgUrl, algorithm) => {
  getPixels(imgUrl, function(error, pixels) {
    if (error) {
      console.log(error);
      return;
    }

    let newImg;

    switch (algorithm) {
      //Floyd-Steinberg Dithering
      case 'fsd':
        newImg = handle_fsd(pixels);
        break;
      //Jarvis, Judice, and Ninke Dithering
      case 'jjand':
        newImg = handle_jjand(pixels);
        break;
      //Stucki Dithering
      case 'sd':
        newImg = handle_sd(pixels);
        break;
      //Atkinson Dithering
      case 'ad':
        newImg = handle_ad(pixels);
        break;
      //Burkes Dithering
      case 'bd':
        newImg = handle_bd(pixels);
        break;
      //Sierra Dithering
      case 'sid':
        newImg = handle_sid(pixels);
        break;
      default:
        console.log('no algorithm selected');
    }

    let writeStream = fs.createWriteStream('./new.png');
    savePixels(newImg, 'png').pipe(writeStream);
  });
};

dither('lena.png', 'fsd');
