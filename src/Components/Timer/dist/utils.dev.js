"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function _default() {
  var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var msec = appendZero(Number.parseInt(t % 100)),
      sec = appendZero(Number.parseInt(t / 100 % 60)),
      min = appendZero(Number.parseInt(t / 6000 % 60)),
      hour = appendZero(Number.parseInt(t / 360000));
  return "".concat(hour, ":").concat(min, ":").concat(sec, ".").concat(msec);
}

var appendZero = function appendZero(n) {
  return n.toLocaleString({}, {
    minimumIntegerDigits: 2
  });
};