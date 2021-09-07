import React from 'react';
import { updateGrocery, create, selectedGuitar } from './store';
import { connect } from 'react-redux';

// const _Groceries = ({ groceries, view, toggle, create })=> {
//   return(
//     <div>
//       <button onClick={ create }>Create Random?</button>
//       <ul>
//         {
//           groceries.filter(grocery => !view || (grocery.purchased && view === 'purchased') || (!grocery.purchased && view === 'needs')).map( grocery => {
//             return(
//               <li onClick={ ()=> toggle(grocery) } key={ grocery.id } className={ grocery.purchased ? 'purchased' : "" }>{ grocery.name }</li>
//             );
//           })
//         }
//       </ul>
//     </div>
//   );
// };

const _SingleGuitar = ({ selectedGuitar })=> {
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
    toggle: (grocery) => dispatch(updateGrocery(grocery)),
    create: ()=> dispatch(create())
  };
};

const SingleGuitar = connect(state => state, mapDispatchToProps)(_SingleGuitar);

export default SingleGuitar;