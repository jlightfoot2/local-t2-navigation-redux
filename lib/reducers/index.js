'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navigation = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactRouterRedux = require('react-router-redux');

var _actions = require('../actions');

/**
 * Eventually this data will come from api
 * @type {[type]}
 */
var navigationIds = [];
var navigationTree = {};
var defaultNav = {
  id: '-1',
  name: 'Default',
  routes: [],
  level: 1,
  pathname: '',
  childrenIds: []
};

var navigatinDefaults = {
  tree: {},
  treeIds: [],
  menus: {
    primary: ''
  },
  paths: {
    current: defaultNav,
    last: null,
    parent: null
  }
};

function findRoute(path, cb) {

  for (var id in navigationIds) {
    var navItem = navigationTree[navigationIds[id]];
    var foundRoute = navHasPath(navItem, path);
    if (foundRoute) {
      return foundRoute;
    }
  }
  return false;
}

function navHasPath(navItem, path) {
  var routes = navItem.routes;
  if (routes.indexOf(path) > -1) {
    return navItem;
  } else {
    for (var j = 0; j < routes.length; j++) {
      var route = routes[j];
      if (route instanceof RegExp) {
        if (route.test(path)) {
          return navItem;
        }
      }
    }
  }
}

function getParent(route) {
  return typeof navigationTree[route.parentId] !== 'undefined' ? _extends({}, navigationTree[route.parentId]) : null;
}

function paths(state, action) {
  switch (action.type) {
    case _reactRouterRedux.LOCATION_CHANGE:
      var newRoute = findRoute(action.payload.pathname);
      if (state.current && newRoute && newRoute.id !== state.current.id) {
        return _extends({}, state, {
          current: _extends({}, newRoute, { pathname: action.payload.pathname }),
          last: state.current,
          parent: getParent(newRoute)
        });
      }

  }
  return state;
}

var navigation = exports.navigation = function navigation() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? navigatinDefaults : arguments[0];
  var action = arguments[1];


  switch (action.type) {
    case _actions.CONFIG_T2_NAVIGATION:
      navigationTree = action.config.tree;
      navigationIds = action.config.treeIds;
      return _extends({}, state, {
        tree: action.config.tree || state.tree,
        treeIds: action.config.treeIds || state.treeIds,
        paths: paths(state.paths, action)
      });
    case _reactRouterRedux.LOCATION_CHANGE:
      if (action.payload.pathname !== state.paths.current) {
        return _extends({}, state, { paths: paths(state.paths, action) });
      }
  }
  return state;
};

exports.default = navigation;