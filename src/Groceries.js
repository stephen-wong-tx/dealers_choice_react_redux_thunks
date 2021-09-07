import React from 'react';
import { updateGuitar, create } from './store';
import { connect } from 'react-redux';

const _Groceries = ({ guitars, view, toggle, create })=> {
  return(
    <div>
      <button onClick={ create }>create grocery?</button>
      <ul>
        {
          guitars.filter(grocery => !view || (grocery.purchased && view === 'purchased') || (!grocery.purchased && view === 'needs')).map( grocery => {
            return(
              <div key={ grocery.id }>
                <li className={ grocery.purchased ? 'purchased' : "" }>{ grocery.name }</li>
                <div onClick={ ()=> toggle(grocery) } className='purchaseButton' className={grocery.purchased ? 'sellButton purchaseButton' : 'buyButton purchaseButton'}>{grocery.purchased ? 'Sell Now' : 'Buy Now'}</div>
                <br />
              </div>
            );
          })
        }
      </ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggle: (grocery) => dispatch(updateGrocery(grocery)),
    create: ()=> dispatch(create())
  };
};

const Groceries = connect(state => state, mapDispatchToProps)(_Groceries);

export default Groceries;