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
            const addMonies = (strValue) => {
              let cash = wallet[0].cash * 1;
              let value = strValue *1 / 2;
              wallet[0].cash = cash + value;
              return wallet[0];
            }
            const addMoneyAndToggle = async (guitar) => {
              await toggle(guitar);
              await addCash(addMonies(guitar.msrp))
            }
            const spendMonies = (strValue) => {
              let cash = wallet[0].cash *1;
              let value = strValue * 1;
              wallet[0].cash = cash - value;
              return wallet[0];
            }
            const spendMoneyAndToggle = async (guitar)=> {
              await toggle(guitar);
              await spendCash(spendMonies(guitar.msrp));
            }
            return(
              <div key={ guitar.id } className={ guitar.purchased ? 'purchased container' : 'container' }>
                {/* <a href={`#${guitar.id}`} className="indivLink">
                  <div className="cardHeading">
                    <h2 className="heading"> { guitar.purchased ? <i class="fas fa-award">&nbsp;</i> : "" }{ guitar.name }</h2>
                  </div>
                </a> */}
                <div 
                  className="cardBody"
                  // style={
                  //   {
                  //     backgroundImage: `url(` + `${guitar.imageURL}` + `)`
                  //   }
                  // }
                >
                  <div className="imageBackground"
                    style={
                      {
                        backgroundImage: `url(` + `${guitar.imageURL}` + `)`
                      }
                    }
                  >
                    {/* <h2 className="heading"> { guitar.purchased ? <i class="fas fa-award">&nbsp;</i> : "" }{ guitar.name }</h2> */}
                      <a href={`#${guitar.id}`} className="indivLink">
                        <div className="cardHeading">
                          <h2 className="heading"> { guitar.purchased ? <i class="fas fa-award">&nbsp;</i> : "" }{ guitar.name }</h2>
                        </div>
                      </a>
                  </div>
                  {/* <img 
                    src={ guitar.imageURL }
                    className="cardImage" 
                  /> */}
                  <br />
                  <br />
                  <div className="cardControls">
                    <p className="priceTag"><i class="fas fa-tag"></i> ${guitar.msrp}</p>
                    { 
                      guitar.purchased ? 
                        <h3 className="subHeader">
                          IN COLLECTION &nbsp;
                          <i className="fas fa-check-circle"></i> 
                        </h3> 
                      : <div>
                        <a href={"https://www.amazon.com/s?k=electric+guitars"+" "+guitar.name} 
                           className="shopLink" 
                           target="_blank">
                          Shop Around Amazon &nbsp;
                          <i class="fas fa-long-arrow-alt-right"></i>
                        </a>
                        <br />
                        </div>
                    }
                    
                    {/* {  
                      !guitar.purchased ? 
                      <a href={"https://www.amazon.com/s?k=electric+guitars"+" "+guitar.name} className="shopLink" target="_blank">Shop Around (Amazon)</a>
                      : ``
                    } */}

                    <br />

                    {
                      guitar.purchased?            
                      // <div onClick={ () =>  addCash(addMonies(), guitar) } className='purchaseButton' >Sell Me</div>
                      <div onClick={ () =>  addMoneyAndToggle(guitar) } className='purchaseButton sellButton' >Sell Now</div>
                      : <div onClick={ () => spendMoneyAndToggle(guitar) } className='purchaseButton buyButton'>Add to Collection (Buy Now)</div>
                    }
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggle: (guitar) => dispatch(updateGuitar(guitar)),
    create: ()=> dispatch(create()),
    addCash: (wallet, guitar)=> {
      return dispatch(addFunds(wallet))
    },
    spendCash: (wallet, guitar)=> {
      return dispatch(spendFunds(wallet))
    },
    updateCash: (wallet) => dispatch(updateWallet(wallet))
  };
};

const mapStateToProps = (state) => {
  return {
    state
  }
}

const GuitarLists = connect(state => state, mapDispatchToProps)(_GuitarLists);
export default GuitarLists;