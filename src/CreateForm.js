import React, { Component } from 'react';
import { connect } from 'react-redux';
import store, { create, editGuitar, selectedGuitar } from './store';

class CreateForm extends Component{
  constructor(){
    super();
    this.state = {
      name: ''
    };
  }
  render(){
    const { name, imageURL, id } = this.state;
    const { view } = this.props;
    const guitarId = window.location.hash.slice(1);
    const { selectedGuitar } = this.props;
    // const { selectedGuitar } = store.getState()
    return(
      <div>
        <br />
        <form>
          <h2>Add a Guitar</h2>
          <input placeholder="Guitar" value={ name } onChange={ ev => this.setState({ name: ev.target.value , id: guitarId}) }/>
          <br />
          <input placeholder="Image URL" value={ imageURL } onChange={ ev => this.setState({ imageURL: ev.target.value }) }/>
          <br />
          <button onClick={()=> {
            // !selectedGuitar ? 
            // this.props.create(this.state)
            // :
            // this.props.editGuitar(this.state)
            // this.props.create(this.state)
            console.log('this is the selected guitar:----------->', selectedGuitar)
            !selectedGuitar ?
            // this.props.editGuitar(this.state)
            console.log('WE DONT HAVE A SELECTED GUITAR', this.props)
            : 
            console.log('We have a selected guitar!')
            // :
            // this.props.editGuitar(this.state)
            // console.log('i dont have a selected guitar') : console.log('i have a selected guitar')
          }}>Create &nbsp;<i className="fas fa-plus"></i></button>
        </form>
        <br />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    create: (newGuitar) => dispatch(create(newGuitar)),
    editGuitar: (guitar) => dispatch(editGuitar(guitar))
  };
}

export default connect(null, mapDispatchToProps)(CreateForm);