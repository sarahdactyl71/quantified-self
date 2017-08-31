const $ = require('jquery')

const Food = require('./food')
const Diary = require('./diary')

require('./stylesheets/main.css')

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
  Diary.getSnackFoods ()
  Diary.getLunchFoods ()
  Diary.getDinnerFoods ()

  Diary.calculateAllMealsGoalCalories()

  $('.foods-table-calories-heading').on('click', Food.sortTable)

  const addFoodButton = $("input[class='add-food-button']")
  addFoodButton.on("click", Food.post)

  $('.foods-table').on('click', '.delete', Food.delete)

  $('.breakfast-foods-table').on('click', '.delete', Diary.deleteFoodFromMeal)
  $('.snacks-foods-table').on('click', '.delete', Diary.deleteFoodFromMeal)
  $('.lunch-foods-table').on('click', '.delete', Diary.deleteFoodFromMeal)
  $('.dinner-foods-table').on('click', '.delete', Diary.deleteFoodFromMeal)


  $('.food-filter-input').on('keyup', Food.filterByName)
  $('.food-filter-input').on('keyup', Diary.filterByName)

  $('.foods-table').on('click', 'td.food-name', Food.editFoodName)
  $('.foods-table').on('click', 'td.food-calories', Food.editFoodCalories)

  $('button[name="breakfast"]').on('click', Diary.addToBreakfast)
  $('button[name="lunch"]').on('click', Diary.addToLunch)
  $('button[name="dinner"]').on('click', Diary.addToDinner)
  $('button[name="snacks"]').on('click', Diary.addToSnacks)
})
