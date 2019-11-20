const fs = require('fs');
const getPixels = require('get-pixels');
const savePixels = require('save-pixels');
const handle_fsd = require('./fsd.js');

const dither = (imgUrl, algorithm) => {
  getPixels(imgUrl, function(error, pixels) {
    if (error) {
      console.log(error);
      return;
    }

    imgWidth = pixels.shape[0];
    imgHeight = pixels.shape[1];

    let newImg;

    switch (algorithm) {
      case 'fsd':
        newImg = handle_fsd(imgWidth, imgHeight, pixels);
        break;
      default:
        console.log('no algorithm selected');
    }

    let writeStream = fs.createWriteStream('./new.png');
    savePixels(newImg, 'png').pipe(writeStream);
  });
};

dither('ttt.png', 'fsd');
