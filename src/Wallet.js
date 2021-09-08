import React, { Component } from 'react';
import { updateGuitar, create, selectedGuitar, fetchWallet, addFunds, spendFunds, updateWallet } from './store';
import { connect } from 'react-redux';


const _Wallet = ({ addCash, spendCash, updateCash, wallet }) => {
  console.log(':) my wallet:', wallet)
  const addMonies = () => {
    let cash = wallet[0].cash * 1;
    wallet[0].cash = cash + 500;
    return wallet[0];
  }
  const addMoneyAndToggle = async (guitar) => {
    await toggle(guitar);
    await addCash(addMonies())
  }
  const spendMonies = () => {
    let cash = wallet[0].cash *1;
    wallet[0].cash = cash - 1000;
    return wallet[0];
  }
  const spendMoneyAndToggle = async (guitar)=> {
    await toggle(guitar);
    await spendCash(spendMonies());
  }
  return(
    <div id="wallet">
      <h2><i className="fas fa-wallet"></i> <br />
        Wallet
      </h2>
      {
        wallet.map( fund => {
          return(
            <div key={fund.id}>
              <p>${fund.cash}</p>
            </div>
          )
        })
        // <p>${wallet.cash}</p>
      }
      
      <div 
        onClick={ () => updateCash(wallet[0]) } 
        id="updateWallet" 
        className="purchaseButton">
        Update Wallet
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return{
    addCash: (wallet, guitar)=>{
      return dispatch(addFunds(wallet))
    },
    spendCash: (wallet, guitar)=> {
      return dispatch(spendFunds(wallet))
    },
    updateCash: (wallet) => dispatch(updateWallet(wallet))
  }
}

const Wallet = connect(state => state, mapDispatchToProps)(_Wallet);

// const Wallet = connect(
//   state => state,
//   (dispatch) => {
//     return{
//       getWallet: ()=> dispatch(fetchWallet())
//     }
//   }
// )(_Wallet);

export default Wallet;