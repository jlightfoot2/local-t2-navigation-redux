'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navigationActions = exports.navigationCreateMiddleware = exports.navigationTree = exports.navigationReducer = undefined;

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var navigationIds = [];
function addParentProperty(navTree) {
  Object.keys(navTree).map(function (propName) {
    navigationIds.push(propName);
    navTree[propName].childrenIds.forEach(function (cid) {
      navTree[cid]['parentId'] = navTree[propName].id;
    });
  });
  return navTree;
}
var firstLoad = true;
var navigationCreateMiddleware = function navigationCreateMiddleware(treeRaw) {
  var config = {
    tree: addParentProperty(treeRaw),
    treeIds: navigationIds
  };
  return function (store) {
    return function (next) {
      store.dispatch((0, _actions.init)(config));
      return function (action) {
        return next(action);
      };
    };
  };
};

exports.navigationReducer = _reducers2.default;
exports.navigationTree = _reducers.navigationTree;
exports.navigationCreateMiddleware = navigationCreateMiddleware;
exports.navigationActions = _actions2.default;