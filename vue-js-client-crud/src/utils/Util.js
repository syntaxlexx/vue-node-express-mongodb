/**
 * Created by PhpStorm.
 * Author:  Lexx YungCarter
 * Github:  https://github.com/lexxyungcarter
 * Date: 2020-06-26
 * Time: 01:41
 */
var CryptoJS = require("crypto-js");

export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomString (length = 5) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

const randomElement = (arr = []) => {
    return arr[Math.floor(Math.random() * arr.length)];
};

const kebab = (str) => {
    return (str || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

export const scrollToTop = (topOffset = 100) => {
  window.scrollTo({
      top: topOffset,
      behavior: 'smooth'
  });
};

const toggleFullScreen = () => {
  let doc = window.document;
  let docEl = doc.documentElement;

  let requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  let cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
      requestFullScreen.call(docEl);
  }
  else {
      cancelFullScreen.call(doc);
  }
};

export default {
  randomElement,
  toggleFullScreen,
  kebab,
};

export const countWords = (str) => {
  if(! str) return 0;
  return str.split(' ')
      .filter(function(n) { return n != '' })
      .length;
};

export const encode = (str) => {
  const encodedWord = CryptoJS.enc.Utf8.parse(str); // encodedWord Array object
  const encoded = CryptoJS.enc.Base64.stringify(encodedWord); // string: 'NzUzMjI1NDE='
  return encoded;
}

export const decode = (encodedString) => {
  const encodedWord = CryptoJS.enc.Base64.parse(encodedString); // encodedWord via Base64.parse()
  const decoded = CryptoJS.enc.Utf8.stringify(encodedWord); // decode encodedWord via Utf8.stringify() '75322541'
  return decoded;
}


/**
 * night time in 24HRS
 */
export const nightTimes = [7,18];

export const apiEndpoint = '/api/';

export const immigrantKey = 'nomad';

export const userKey = 'walter';

export const cKey = 'gengetones';

export const settingsKey = 'acelords_platforms';
