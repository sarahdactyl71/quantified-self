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

  const addFoodButton = $("input[class='add-food-button']")
  addFoodButton.on("click", Food.post)

  $('.foods-table').on('click', '.delete', Food.delete)

  $('.food-filter-input').on('keyup', Food.filterByName)
  $('.food-filter-input').on('keyup', Diary.filterByName)

  $('.foods-table').on('click', 'td.food-name', Food.editFoodName)
  $('.foods-table').on('click', 'td.food-calories', Food.editFoodCalories)

  $('button[name="breakfast"]').on('click', function () {
    $('input:checked').each( function () {
      var $foodTDs = $(this).parent().siblings()
        $('.breakfast-foods-table .main-foods').append(
        `<tr class="food-row breakfast">
          <td> ${$($foodTDs[0]).text()} </td>
          <td> ${$($foodTDs[1]).text()} </td>
          <td class="hidden"><button type="button" name="delete">Delete</button></td>
        </tr>`
      )
    })
  });
})
