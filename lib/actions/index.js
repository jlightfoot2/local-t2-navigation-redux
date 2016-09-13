'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CONFIG_T2_NAVIGATION = exports.CONFIG_T2_NAVIGATION = 'CONFIG_T2_NAVIGATION';

var init = exports.init = function init(config) {
  return {
    type: CONFIG_T2_NAVIGATION,
    config: config
  };
};

exports.default = {
  CONFIG_T2_NAVIGATION: CONFIG_T2_NAVIGATION,
  init: init
};