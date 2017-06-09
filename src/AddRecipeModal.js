import React, { Component } from 'react';
import ModalWrapper from './ModalWrapper.js';
import classNames from 'classnames';


class AddRecipeModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      parts: [],
      description: '',
    }

    this.onOk = this.props.onOk;
    this.hideModal = this.props.hideModal;
    this.nameChange = this.nameChange.bind(this);
    this.partChange = this.partChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.save = this.save.bind(this);
  }

  nameChange(e) {
    this.setState({name: e.target.value})
  }

  descriptionChange(e) {
    this.setState({description: e.target.value})
  }

  partChange(e) {
    this.setState({
      parts: e.target.value.split(','),
    })
  }

  save() {
    const {name, parts, description} = this.state;
    let newRecipe = {
      'name': name,
      'parts': parts,
      'description': description,
      'open': false,
    }
    this.onOk(newRecipe);
  }

  render() {

    return (
      <ModalWrapper
        title='Add a new Recipe'
        name='ADD'
        hideModal = {this.hideModal}
        onOk = {this.save}
        okText = 'Save'
      >
        <input type='text' onChange = {this.nameChange}/>
        <input type='text' onChange = {this.descriptionChange}/>
        <input type='text' onChange = {this.partChange}/>
      </ModalWrapper>
    )
  }
}

export default AddRecipeModal;
