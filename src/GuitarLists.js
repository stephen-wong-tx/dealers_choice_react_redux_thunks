import React from 'react';
import { updateGuitar, create, spendFunds, addFunds, updateWallet } from './store';
import { connect } from 'react-redux';

const _GuitarLists = ({ guitars, view, toggle, create, addCash, spendCash, updateCash, wallet })=> {
  return (
    <div>
      {/* <button onClick={ create }>Random guitar?</button> */}
      <div id="main-wrapper">
        {
          guitars.filter(guitar => !view || (guitar.purchased && view === 'purchased') || (!guitar.purchased && view === 'needs')).map( guitar => {
            const addMonies = () => {
              let cash = wallet[0].cash * 1;
              wallet[0].cash = cash + 500;
              return wallet[0];
            }
            const addMoneyAndToggle = async (guitar) => {
              await toggle(guitar);
              await addCash(addMonies())
            }
            return(
              <div key={ guitar.id } className={ guitar.purchased ? 'purchased container' : 'container' }>
                <a href={`#${guitar.id}`} className="indivLink">
                  <div className="cardHeading">
                    <h2>{ guitar.name }</h2>
                  </div>
                </a>
                <div 
                  className="cardBody"
                  // style={
                  //   {
                  //     backgroundImage: `url(` + `${guitar.imageURL}` + `)`
                  //   }
                  // }
                >
                  <img 
                    src={ guitar.imageURL }
                    className="cardImage" 
                  />
                  <br />
                  <br />
                  { 
                    guitar.purchased ? 
                      <h3 className="subHeader">
                        <i className="fas fa-check-circle"></i> 
                        IN COLLECTION
                      </h3> 
                    : null 
                  }
                  
                  <div onClick={ () => toggle(guitar) } className='purchaseButton' className={
                      guitar.purchased ? 
                        'sellButton purchaseButton' 
                        : 'buyButton purchaseButton'}>{guitar.purchased ? 'Sell Now' : 'Add to Wishlist'
                    }
                  </div>
                  {
                    guitar.purchased?            
                    // <div onClick={ () =>  addCash(addMonies(), guitar) } className='purchaseButton' >Sell Me</div>
                    <div onClick={ () =>  addMoneyAndToggle(guitar) } className='purchaseButton' >Sell Me</div>
                    : <div onClick={ () => spendCash(1000) } className='purchaseButton'>Buy Me</div>
                  }
                  
                  <br />
                  {  
                    !guitar.purchased ? 
                    <a href={"https://www.amazon.com/s?k=electric+guitars"+" "+guitar.name} className="shopLink" target="_blank">Shop Around (Amazon)</a>
                    : ``
                  }
                </div>

              </div>
            );
          })
        }
      </div>
        <div onClick={ () => updateCash(wallet) } id="updateWallet" className="purchaseButton">Update Wallet</div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggle: (guitar) => dispatch(updateGuitar(guitar)),
    create: ()=> dispatch(create()),
    // addCash: (value)=> dispatch(addFunds({...wallet, cash: value})),
    addCash: (wallet, guitar)=> {
      // this.toggle(guitar)
      return dispatch(addFunds(wallet))
    },
    spendCash: (value)=> dispatch(addFunds(value)),
    updateCash: (wallet) => dispatch(updateWallet(wallet))
  };
};

const GuitarLists = connect(state => state, mapDispatchToProps)(_GuitarLists);
export default GuitarLists;