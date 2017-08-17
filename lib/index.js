var $ = require('jquery')

const Food = require('./food')

$(document).ready(function () {
  Food.allFoodsToHTML ()
  .then(function (foodsHTML) {
    $('.foods-table').append (foodsHTML)
  })

  const addFoodButton = $("input[class='add-food-button']")
  addFoodButton.on("click", Food.post)
})
