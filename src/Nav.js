import React from 'react';
import { connect } from 'react-redux';

const Nav = ({ guitars, view })=> {
  const needs = guitars.filter(guitar => !guitar.purchased);
  const purchased = guitars.filter(guitar => guitar.purchased);
  return (
    <nav>
      <a href='#' className={ !view ? 'selected' : '' }>All ({ guitars.length })</a> 
      <a href='#needs' className={ view === 'needs' ? 'selected' : '' }> Needs({ needs.length })</a>
      <a href='#purchased' className={ view === 'purchased' ? 'selected': '' }>Purchased({ purchased.length })</a>
    </nav>
  );
};

export default connect(state => state )(Nav);