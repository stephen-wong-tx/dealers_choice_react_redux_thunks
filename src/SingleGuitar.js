import React from 'react';
import { updateGuitar, create, selectedGuitar } from './store';
import { connect } from 'react-redux';

const _SingleGuitar = ( { selectedGuitar } )=> {
  return(
    <div>
      <h1>Selected Guitar</h1>
      <h2>{selectedGuitar.name}</h2>
      <div>
        <img src={selectedGuitar.imageURL} />
      </div>
    </div>
  )
}


const mapDispatchToProps = (dispatch) => {
  return {
    toggle: (guitar) => dispatch(updateGuitar(guitar)),
    create: ()=> dispatch(create())
  };
};

const SingleGuitar = connect(state => state, mapDispatchToProps)(_SingleGuitar);

export default SingleGuitar;