var $ = require('jquery')

const Food = require('./food')
const Diary = require('./diary')

$(document).ready(function () {
  Food.allFoodsToHTML ()
  .then(function (foodsHTML) {
    $('.foods-table').append (foodsHTML)
  })

  Diary.allFoodsToHTML ()
  .then(function (foodsSelectionHTML) {
    $('.add-foods-table').append (foodsSelectionHTML)
  })

  Diary.getBreakfastFoods ()

  const addFoodButton = $("input[class='add-food-button']")
  addFoodButton.on("click", Food.post)

  $('.foods-table').on('click', '.delete', Food.delete)

  $('.food-filter-input').on('keyup', Food.filterByName)
  $('.food-filter-input').on('keyup', Diary.filterByName)

  $('.foods-table').on('click', 'td.food-name', Food.editFoodName)
  $('.foods-table').on('click', 'td.food-calories', Food.editFoodCalories)

  $('button[name="breakfast"]').on('click', Diary.addToBreakfast)
  $('button[name="lunch"]').on('click', Diary.addToLunch)
  $('button[name="dinner"]').on('click', Diary.addToDinner)
  $('button[name="snacks"]').on('click', Diary.addToSnacks)
})
