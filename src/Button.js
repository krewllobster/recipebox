import React from 'react';
import classNames from 'classnames';

const Button = ({type, selected, onClick, value, children, cName}) => {

  const buttonClass = classNames(
    cName,
    {'button-active': selected === value}
  )
  return (
    <button
      className = {buttonClass}
      onClick = {onClick}
      value = {value}
    >{children}</button>
  )
}

export default Button;
