import React from 'react';
import { updateGrocery, create } from './store';
import { connect } from 'react-redux';

const _GuitarLists = ({ groceries, view, toggle, create })=> {
  return (
    <div>
      <button onClick={ create }>Random guitar?</button>
      <ul>
        {
          groceries.filter(guitar => !view || (guitar.purchased && view === 'purchased') || (!guitar.purchased && view === 'needs')).map( guitar => {
            return(
              <div key={ guitar.id }>
                <li className={ guitar.purchased ? 'purchased' : "" }><a href={`#${guitar.id}`}>{ guitar.name }</a></li>
                <div onClick={ ()=> toggle(guitar) } className='purchaseButton' className={guitar.purchased ? 'sellButton purchaseButton' : 'buyButton purchaseButton'}>{guitar.purchased ? 'Sell Now' : 'Buy Now'}</div>
                <br />
              </div>
            );
          })
        }
      </ul>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggle: (guitar) => dispatch(updateGrocery(guitar)),
    create: ()=> dispatch(create())
  };
};

const GuitarLists = connect(state => state, mapDispatchToProps)(_GuitarLists);
export default GuitarLists;