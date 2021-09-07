import React, { Component } from 'react';
import { connect } from 'react-redux';
import { create } from './store';

class CreateForm extends Component{
  constructor(){
    super();
    this.state = {
      name: ''
    };
  }
  render(){
    const { name, imageURL } = this.state;
    return(
      <div>
        <br />
        <form>
          <input placeholder="Guitar" value={ name } onChange={ ev => this.setState({ name: ev.target.value }) }/>
          <br />
          <input placeholder="Image URL" value={ imageURL } onChange={ ev => this.setState({ imageURL: ev.target.value }) }/>
          <br />
          <button onClick={()=> {
            this.props.create(this.state)}}>Create</button>
        </form>
        <br />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    create: (newGuitar) => dispatch(create(newGuitar))
  };
}

export default connect(null, mapDispatchToProps)(CreateForm);