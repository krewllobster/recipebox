import React from 'react';
import PropTypes from 'prop-types';
import './ModalWrapper.css';


const ModalWrapper = props => {

  const handleBackgroundClick = e => {
    if (e.target === e.currentTarget) props.hideModal();
  };

  const onOk = () => {
    props.onOk();
    props.hideModal();
  }

  const okButton = props.showOk
    ? (
      <button
        className = 'btn btn-primary'
        onClick={onOk}
        disabled={props.okDisabled}
      >
        {props.okText}
      </button>
    ) : null;

  return (
    <div className = 'backdrop' onClick = {handleBackgroundClick}>
      <div className = 'card myModal' style = {{'width': props.width}}>
        {props.children}
        <div className = 'card-footer'>
          {okButton}
        </div>
      </div>
    </div>
  );
};

ModalWrapper.PropTypes = {
  //props
  showOk: PropTypes.bool,
  okText: PropTypes.string,
  okDisabled: PropTypes.bool,
  width: PropTypes.number,
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string
  ]).isRequired,

  //methods
  hideModal: PropTypes.func,
  onOk: PropTypes.func,
}

ModalWrapper.defaultProps = {
  title: 'default modal',
  showOk: true,
  okText: 'OK',
  okDisabled: false,
  width: 500,
  onOk: () => {},
}

export default ModalWrapper;
