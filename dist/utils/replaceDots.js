"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceDots = void 0;

const replaceDots = string => string.replace(/•/g, '/').trim();

exports.replaceDots = replaceDots;