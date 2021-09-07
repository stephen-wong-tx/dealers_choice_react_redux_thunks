import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import Nav from './Nav';
import store, { fetchGroceries, fetchSelectedGuitar } from './store';
import Groceries from './Groceries';
import CreateForm from './CreateForm';
import GuitarLists from './GuitarLists';
import SingleGuitar from './SingleGuitar';

class _App extends Component {
  componentDidMount(){
    this.props.bootstrap();
    window.addEventListener('hashchange', ()=> {
      this.props.setView(window.location.hash.slice(1));
      if (window.location.hash.slice(1).length < 3) this.props.setGuitar(window.location.hash.slice(1))
    })
    this.props.setView(window.location.hash.slice(1));
    if (window.location.hash.slice(1).length < 3) this.props.setGuitar(window.location.hash.slice(1))
  }
  render(){
    const { groceries, view } = this.props;
    return (
      <div>
        <h1>Your Guitar Wishlist</h1>
        <Nav />
        <CreateForm />
        { 
          !view ? 
            <GuitarLists /> 
            : 
            view === 'purchased' || view === 'needs' ?
            <Groceries /> 
            :
            <SingleGuitar />
        }
      </div>
    );
  }
}

const App = connect(
  state => state,
  (dispatch)=> {
    return{
      setView: (newView)=> dispatch({ type: 'SET_VIEW', view: newView }),
      bootstrap: ()=> dispatch(fetchGroceries()),
      setGuitar: (guitar)=> dispatch(fetchSelectedGuitar(guitar))
    }
  }
)(_App);

render(<Provider store={ store }><App /></Provider>, document.querySelector('#root'));