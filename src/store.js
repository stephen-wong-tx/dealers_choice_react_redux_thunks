import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';
import { composeWithDevTools } from 'redux-devtools-extension';

const view = ( state = '', action)=> {
  if (action.type === 'SET_VIEW'){
    return action.view;
  }
  return state;
};
const guitars = (state = [], action)=> {
  if(action.type === 'LOAD'){
    return action.guitars;
  }
  if (action.type === 'UPDATE'){
    return state.map(guitar => guitar.id === action.guitar.id ? action.guitar : guitar );
  }
  if (action.type === 'CREATE'){
    return [...state, action.guitar];
  }
  return state;
}
const selectedGuitar = ( state = '', action)=> {
  if (action.type === 'SELECT_GUITAR'){
    return action.selectedGuitar;
  }
  return state;
};

const wallet = ( state = [], action) => {
  if (action.type === 'LOAD_WALLET') {
    return action.wallet;
  }
  if (action.type === 'ADD_FUNDS'){
    // let funds = fund.cash *1
    // state.map(fund => fund.cash += action.value)
    console.log('(: ADD FUNDS ACTION :) ', action)
    return [action.value];
  }
  if (action.type === 'SPEND_FUNDS'){
    return [action.value];
  }
  if (action.type === 'UPDATE_FUNDS'){
    return state.map(wallet => wallet.id === action.wallet.id? action.wallet : wallet);
  }
  return state;
}


const store = createStore(
  combineReducers(
    {
      view,
      guitars,
      selectedGuitar,
      wallet
    }
  ),
  composeWithDevTools(
    applyMiddleware(logger, thunk)
));

export const fetchWallet = () => {
  return async(dispatch)=> {
    const wallet = (await axios.get(`/api/wallet`)).data; 
    dispatch({
      type: 'LOAD_WALLET',
      wallet
    });
  };
};

export const updateWallet = (wallet) => {
  return async(dispatch)=> {
    const updated = (await axios.put(`/api/wallet/${wallet.id}`, { cash: wallet.cash })).data;
    dispatch({ type: 'UPDATE_FUNDS', wallet: updated })
  };
};

export const addFunds = (value) => {
  return async(dispatch)=> {
    dispatch({ type: 'ADD_FUNDS', value })
  }
}

export const spendFunds = (value) => {
  return async(dispatch)=>{
    dispatch({ type: 'SPEND_FUNDS', value })
  }
}

export const fetchSelectedGuitar = (id) => {
  return async(dispatch)=> {
    const selectedGuitar = (await axios.get(`/api/guitars/${id}`)).data;
    dispatch({
      type: 'SELECT_GUITAR',
      selectedGuitar
    });
  };
};

export const fetchGuitars = () => {
  return async(dispatch)=> {
    const guitars = (await axios.get('/api/guitars')).data;
    dispatch({
      type: 'LOAD',
      guitars
    });
  };
};

export const updateGuitar = (guitar) => {
  return async(dispatch)=> {
    const updated = (await axios.put(`/api/guitars/${guitar.id}`, { purchased: !guitar.purchased })).data;
    dispatch({ type: 'UPDATE', guitar: updated });
  };
};

export const create = (newGuitar)=> {
  return async(dispatch)=> {
    // const guitar = (await axios.post(`/api/guitars/${ newGuitar ? '' : 'random' }`, newGuitar ? { name: newGuitar.name, imageURL: newGuitar.imageURL } : null)).data;
    const guitar = (await axios.post(`/api/guitars/`, newGuitar ? { name: newGuitar.name, imageURL: newGuitar.imageURL } : null)).data;
    dispatch({ type: 'CREATE', guitar });
  };
};

export const editGuitar = (guitar) => {
  return async(dispatch)=> {
    console.log('CONSOLE LOGGING GUITAR PARAMS:', guitar)
    const edited = (await axios.put(`/api/guitars/${guitar.id}`, { name: guitar.name, imageURL: guitar.imageURL })).data;
    dispatch({ type: 'UPDATE', guitar: edited });
  };
};

export default store;