import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

const view = ( state = '', action)=> {
  if (action.type === 'SET_VIEW'){
    return action.view;
  }
  return state;
};
const groceries = (state = [], action)=> {
  if(action.type === 'LOAD'){
    return action.groceries;
  }
  if (action.type === 'UPDATE'){
    return state.map(grocery => grocery.id === action.grocery.id ? action.grocery : grocery );
  }
  if (action.type === 'CREATE'){
    return [...state, action.grocery];
  }
  return state;
}
const selectedGuitar = ( state = '', action)=> {
  if (action.type === 'SELECT_GUITAR'){
    return action.selectedGuitar;
  }
  return state;
};

const store = createStore(
  combineReducers(
    {
      view,
      groceries,
      selectedGuitar
    }
  ),
  applyMiddleware(logger, thunk)
);

export const fetchSelectedGuitar = (id) => {
  return async(dispatch)=> {
    const selectedGuitar = (await axios.get(`/api/groceries/${id}`)).data;
    dispatch({
      type: 'SELECT_GUITAR',
      selectedGuitar
    });
  };
};

export const fetchGroceries = () => {
  return async(dispatch)=> {
    const groceries = (await axios.get('/api/groceries')).data;
    dispatch({
      type: 'LOAD',
      groceries
    });
  };
};

export const updateGrocery = (grocery) => {
  return async(dispatch)=> {
    const updated = (await axios.put(`/api/groceries/${grocery.id}`, { purchased: !grocery.purchased })).data;
    dispatch({ type: 'UPDATE', grocery: updated });
  };
};

export const create = (newGuitar)=> {
  return async(dispatch)=> {
    const grocery = (await axios.post(`/api/groceries/${ newGuitar ? '' : 'random' }`, newGuitar ? { name: newGuitar.name, imageURL: newGuitar.imageURL } : null)).data;
    dispatch({ type: 'CREATE', grocery });
  };
};

export default store;