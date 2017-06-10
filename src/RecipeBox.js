import React from 'react';
import Button from './Button.js'
import { CSSTransitionGroup } from 'react-transition-group';
import Recipe from './Recipe.js'

const RecipeBox = ({
  recipes,
  activateModal,
  deleteRecipe,
  showRecipe
}) => {

  localStorage.setItem('recipes', JSON.stringify(recipes));

  return (
    <div className = 'card'>
      <div className = 'card-header'>
        <h2 className = 'card-title text-center'>Recipe Box</h2>
      </div>
      <div className = 'card-block'>
        <CSSTransitionGroup
          transitionName = 'item'
          transitionAppear = {true}
          transitionEnterTimeout = {200}
          transitionAppearTimeout = {200}
          transitionLeaveTimeout = {100}
        >
          {recipes.map((item, i) =>
            <Recipe
              id = {i}
              item = {item}
              activateModal = {activateModal}
              deleteRecipe = {deleteRecipe}
              showRecipe = {showRecipe}
              key = {i}
            />
          )}
        </CSSTransitionGroup>
      </div>
      <div className = 'card-footer'>
        <Button
          value = 'ADD'
          onClick = {activateModal}
          cName = 'btn btn-info'
        >
          Add Recipe
        </Button>
      </div>
    </div>
  )
}
export default RecipeBox;
