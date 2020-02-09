"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.str2int = void 0;

const str2int = string => parseInt(string.replace(/\s/g, '')) || '';

exports.str2int = str2int;