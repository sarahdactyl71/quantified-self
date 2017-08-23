var $ = require('jquery')

const Food = require('./food')
const FoodSelection = require('./food-selection')

$(document).ready(function () {
  Food.allFoodsToHTML ()
  .then(function (foodsHTML) {
    $('.foods-table').append (foodsHTML)
  })

  FoodSelection.allFoodsToHTML ()
  .then(function (foodsSelectionHTML) {
    $('.add-foods-table').append (foodsSelectionHTML)
  })

  const addFoodButton = $("input[class='add-food-button']")
  addFoodButton.on("click", Food.post)

  $('.foods-table').on('click', '.delete', Food.delete)

  $('.food-filter-input').on('keyup', Food.filterByName)

  $('.foods-table').on('click', 'td.food-name', Food.editFoodName)
  $('.foods-table').on('click', 'td.food-calories', Food.editFoodCalories)

})

