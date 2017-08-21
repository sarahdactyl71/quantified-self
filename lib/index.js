var $ = require('jquery')

const Food = require('./food')

$(document).ready(function () {
  Food.allFoodsToHTML ()
  .then(function (foodsHTML) {
    $('.foods-table').append (foodsHTML)
  })

  const addFoodButton = $("input[class='add-food-button']")
  addFoodButton.on("click", Food.post)

  $('.foods-table').on('click', '.delete', Food.delete)

  $('.food-filter-input').on('keyup', Food.filterByName)

  $('.foods-table').on('click', 'td.food-name', Food.editFoodName)
  $('.foods-table').on('click', 'td.food-calories', Food.editFoodCalories)

})

