import {navigationReducer, navigationTree, navigationCreateMiddleware,navigationActions} from '../lib';

import expect from 'expect'; // You can use any testing library

import {createStore, applyMiddleware, compose} from 'redux';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();

describe('actions', () => {
  it('should create an init action', () => {
    var navConfig = {test: 'test'}
    const expectedAction = {
      type: navigationActions.CONFIG_T2_NAVIGATION,
      config: navConfig
    };
    expect(navigationActions.init(navConfig)).toEqual(expectedAction);
  });
});
