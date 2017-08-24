const $ = require('jquery')
const API =  "https://quantify-self-api.herokuapp.com"

function Diary (food) {
  this.id = food.id
  this.name = food.name
  this.calories = food.calories
}

Diary.prototype.toHTML = function () {
  return `<tr class="food-row" data-id=${this.id}>
            <td class="check-box-row hidden"><input type="checkbox" class="check-box"></td>
            <td class="food-name" >${this.name}</td>
            <td class="food-calories" >${this.calories}</td>
          </tr>`
}

Diary.getAllFoods = function () {
  return $.getJSON(`${API}/api/v1/foods`)
}

Diary.allFoodsToHTML = function () {
  return this.getAllFoods ()
  .then(function (foods) {
    return foods.map(function (food) {
      return new Diary (food)
    })
  })
  .then(function (foods) {
    return foods.reverse().map(function (food) {
      return food.toHTML ()
    })
  })
}

Diary.filterByName = function () {
  const rows = $('.add-foods-table tr.food-row')
  const filter = $('.food-filter-input').val ().toLowerCase ()
  rows.hide ()
  rows.each (function () {
    const foodName = $(this).children('.food-name').text ().toLowerCase ()
    if (foodName.indexOf (filter) >= 0 ) {
      $(this).show ()
    }
  })
}

Diary.calculateMealCalories = function () {
  const meals = ['breakfast', 'lunch', 'dinner', 'snacks']
  meals.forEach(function (meal) {
    const calorieCounts = $(`.${meal}-calories-total`).map(function (calorieCount) {
      return parseInt($(this).text())
      }).toArray()
    let summedCalories = 0
    calorieCounts.forEach(function(calorieCount) {
      'use strict'
      let mealType = this
      summedCalories += calorieCount
      Diary.appendMealCaloriesTotal(summedCalories, mealType)
    }, meal)
  })
}

Diary.appendMealCaloriesTotal = function (total, meal) {
  $(`.${meal}-total-calories`).empty ()
  $(`.${meal}-total-calories`).append (total)
}

module.exports = Diary 