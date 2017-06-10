import React, {Component} from 'react';
import Button from './Button.js';
import { CSSTransitionGroup } from 'react-transition-group';
import './Recipe.css';

class Recipe extends Component {

  render() {

    const {
      id,
      item,
      showRecipe
    } = this.props;

    return (
        <div className = 'card recipe'>
          <div
            className = 'card-header recipeHeader'
            onClick = {() => showRecipe(id)}
          >
            <a className="recipeName">{item.name}</a>
          </div>
          <CSSTransitionGroup
            transitionName = 'details'
            transitionEnterTimeout = {200}
            transitionLeaveTimeout = {200}
          >
            {item.open
              ? <Details key = {id} props = {this.props}/>
              : null
            }
          </CSSTransitionGroup>
        </div>
    )
  }
}

const Details = ({props}) => {
  const {id, item, deleteRecipe, activateModal} = props;

  return (
    <div>
      <div className = 'card-block'>
        <p className = 'card-text description'>
          {item.description}
        </p>
      </div>
      <ul className = "list-group list-group-flush">
        {item.parts.map((part, i) => (
          <li key = {i} className = 'list-group-item'>{part}</li>
        ))}
      </ul>
      <div className = 'card-footer'>
        <div className = 'row'>
          <div className = 'col-sm-3 col-6'>
            <Button
              type = 'button'
              value = 'delete'
              onClick = {() => {deleteRecipe(id)}}
              cName = 'btn btn-danger'
            >
              Delete
            </Button>
          </div>
          <div className = 'col-sm-3 col-6'>
            <Button
              type = 'button'
              value = 'EDIT'
              onClick = {(event) => activateModal(event, id)}
              cName = 'btn btn-secondary'
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recipe;
