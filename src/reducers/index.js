import {LOCATION_CHANGE} from 'react-router-redux';
import {CONFIG_T2_NAVIGATION} from '../actions';

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

const navigatinDefaults = {
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

function findRoute (path, cb) {

  for (var id in navigationIds) {
    var navItem = navigationTree[navigationIds[id]];
    var foundRoute = navHasPath(navItem, path);
    if (foundRoute) {
      return foundRoute;
    }
  }
  return false;
}

function navHasPath (navItem, path) {
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

function getParent (route) {
  return typeof navigationTree[route.parentId] !== 'undefined' ? {...navigationTree[route.parentId]} : null;
}

function paths (state, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      var newRoute = findRoute(action.payload.pathname);
      if (state.current && newRoute && newRoute.id !== state.current.id) {
        return {
          ...state,
          current: {...newRoute, pathname: action.payload.pathname},
          last: state.current,
          parent: getParent(newRoute)
        };
      }

  }
  return state;
}

export const navigation = (state = navigatinDefaults, action) => {

  switch (action.type) {
    case CONFIG_T2_NAVIGATION:
      navigationTree = action.config.tree;
      navigationIds = action.config.treeIds;
      return {
        ...state,
        tree: action.config.tree || state.tree,
        treeIds: action.config.treeIds || state.treeIds,
        paths: paths(state.paths, action)
      };
    case LOCATION_CHANGE:
      if (action.payload.pathname !== state.paths.current) {
        return {...state, paths: paths(state.paths, action)};
      }
  }
  return state;
};

export default navigation;





