import React, { Component } from 'react';
import { updateGuitar, create, selectedGuitar, fetchWallet } from './store';
import { connect } from 'react-redux';

// class _Wallet extends Component {
//   componentDidMount() {
//     this.props.getWallet();
//   }
//   render(){
//     return(
//       <div id="wallet">
//         <h2><i className="fas fa-wallet"></i> <br />
//         Wallet</h2>
//         <h3>Current Cash:</h3>
  
//       </div>
//     )
//   }
// }

const _Wallet = ({ wallet }) => {
  console.log(':) my wallet:', wallet)
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
      

    </div>
  );
};

const Wallet = connect(state => state)(_Wallet);
// const Wallet = connect(
//   state => state,
//   (dispatch) => {
//     return{
//       getWallet: ()=> dispatch(fetchWallet())
//     }
//   }
// )(_Wallet);

export default Wallet;