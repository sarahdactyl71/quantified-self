const $ = require('jquery')
const API =  "https://quantify-self-express-api.herokuapp.com"
const meals = ['breakfast', 'lunch', 'dinner', 'snacks']
const goalCalories = {breakfast: 400, lunch: 600, dinner: 800, snacks: 200}
let totalCaloriesGoal = 0

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
  let allMealsTotalCalories = 0
  meals.forEach(function (meal) {
    const calorieCounts = $(`.${meal}-calories-total`).map(function (calorieCount) {
      return parseInt($(this).text())
      }).toArray()
    let summedCalories = 0
    calorieCounts.forEach(function(calorieCount) {
      'use strict'
      let mealType = this
      summedCalories += calorieCount
      allMealsTotalCalories += calorieCount
      Diary.appendMealCaloriesTotal(summedCalories, mealType)
      Diary.appendAllMealsCaloriesTotal(allMealsTotalCalories)
    }, meal)
  })
}

Diary.appendMealCaloriesTotal = function (total, meal) {
  $(`.${meal}-total-calories`).empty ()
  $(`.${meal}-total-calories`).append (total)
  Diary.calculateRemainingMealCalories (total, meal)
}

Diary.appendAllMealsCaloriesTotal = function (total) {
  $('.all-meals-total-calories').empty ()
  $('.all-meals-total-calories').append (total)
  Diary.calculateAllMealsRemainingCalories (total)
}

Diary.calculateRemainingMealCalories = function (totalConsumed, mealType) {
  let mealGoalCalories = eval(`goalCalories.${mealType}`)
  let totalRemaining = mealGoalCalories - totalConsumed
  $(`.${mealType}-remaining-calories`).empty ()
  $(`.${mealType}-remaining-calories`).append (totalRemaining)
  Diary.colorRemainingCalories (totalRemaining, mealType)
}

Diary.calculateAllMealsGoalCalories = function () {

  Object.values(goalCalories).forEach (function (goalCalorie) {
    totalCaloriesGoal += goalCalorie
  })
  $('.all-meals-total-goal-calories').empty ()
  $('.all-meals-total-goal-calories').append (totalCaloriesGoal)
}

Diary.calculateAllMealsRemainingCalories = function (totalConsumed) {
  let totalRemaining = totalCaloriesGoal - totalConsumed
  $('.all-meals-remaining-calories').empty ()
  $('.all-meals-remaining-calories').append (totalRemaining)
  Diary.colorAllRemainingCalories(totalRemaining)
}

Diary.colorRemainingCalories = function (totalRemaining, mealType) {
  if (totalRemaining >= 0) {
    let $replacementTableDetail = `<td class="${mealType}-remaining-calories meal-remaining-calories" style="color: green">${totalRemaining}</td>`
    $(`.${mealType}-remaining-calories`).replaceWith ( $replacementTableDetail )
  } else if (totalRemaining < 0) {
    let $replacementTableDetail = `<td class="${mealType}-remaining-calories meal-remaining-calories" style="color: red">${totalRemaining}</td>`
    $(`.${mealType}-remaining-calories`).replaceWith ( $replacementTableDetail )
  }
}

Diary.colorAllRemainingCalories = function (total) {
  if (total >= 0) {
    let $replacementTableDetail = `<td class="all-meals-remaining-calories" style="color: green">${total}</td>`
    $('.all-meals-remaining-calories').replaceWith ( $replacementTableDetail )
  } else if (total < 0) {
    let $replacementTableDetail = `<td class="all-meals-remaining-calories" style="color: red">${total}</td>`
    $('.all-meals-remaining-calories').replaceWith ( $replacementTableDetail )
  }
}

Diary.getBreakfastFoods = function () {
  $.ajax({
    url: "https://quantify-self-express-api.herokuapp.com/api/v1/meals/1/foods",
    dataType : 'json',
    success: function(data) {
      $.each(data.foods, function(index,food) {
          $('.breakfast-foods-table .main-foods').append(
          `<tr class="food-row breakfast" id="${food.id}">
            <td> ${food.name} </td>
            <td class="breakfast-calories-total"> ${food.calories} </td>
            <td class="hidden"><button type="button" class="delete" name="delete" id="2">Delete</button></td>
            <td class="foodid">${food.id}</td>
          </tr>`
        )
      });
    },
    error: function(e) {
      console.log(e.message);
    }
  })
  .then(Diary.calculateMealCalories)
}

Diary.getSnackFoods = function () {
  $.ajax({
    url: "https://quantify-self-express-api.herokuapp.com/api/v1/meals/4/foods",
    dataType : 'json',
    success: function(data) {
      $.each(data.foods, function(index,food) {
          $('.snacks-foods-table .main-foods').append(
          `<tr class="food-row snacks" id="${food.id}">
            <td> ${food.name} </td>
            <td class="snacks-calories-total" > ${food.calories} </td>
            <td class="hidden"><button type="button" class="delete" name="delete" id="4">Delete</button></td>
            <td class="foodid">${food.id}</td>
          </tr>`
        )
      });
    },
    error: function(e) {
      console.log(e.message);
    }
  })
  .then(Diary.calculateMealCalories)
}

Diary.getLunchFoods = function () {
  $.ajax({
    url: "https://quantify-self-express-api.herokuapp.com/api/v1/meals/1/foods",
    dataType : 'json',
    success: function(data) {
      $.each(data.foods, function(index,food) {
          $('.lunch-foods-table .main-foods').append(
          `<tr class="food-row lunch" id="${food.id}">
            <td> ${food.name} </td>
            <td class="lunch-calories-total"> ${food.calories} </td>
            <td class="hidden"><button type="button" class="delete" name="delete" id="1">Delete</button></td>
            <td class="foodid">${food.id}</td>
          </tr>`
        )
      });
    },
    error: function(e) {
      console.log(e.message);
    }
  })
  .then(Diary.calculateMealCalories)
}

Diary.getDinnerFoods = function () {
  $.ajax({
    url: "https://quantify-self-express-api.herokuapp.com/api/v1/meals/3/foods",
    dataType : 'json',
    success: function(data) {
      $.each(data.foods, function(index,food) {
          $('.dinner-foods-table .main-foods').append(
          `<tr class="food-row dinner" id="${food.id}">
            <td> ${food.name} </td>
            <td class="dinner-calories-total"> ${food.calories} </td>
            <td class="hidden"><button type="button" class="delete" name="delete" id="3">Delete</button></td>
            <td class="foodid">${food.id}</td>
          </tr>`
        )
      });
    },
    error: function(e) {
      console.log(e.message);
    }
  })
  .then(Diary.calculateMealCalories)
}

Diary.addToBreakfast = function () {
  $('input:checked').each( function () {
    const $foodTDs = $(this).parent().siblings()
    event.preventDefault ()
    Diary.addFoodToMeal (this)
      $('.breakfast-foods-table .main-foods').append(
      `<tr class="food-row breakfast">
        <td> ${$($foodTDs[0]).text()} </td>
        <td class="breakfast-calories-total"> ${$($foodTDs[1]).text()} </td>
        <td class="hidden"><button type="button" class="delete" name="delete" id="2">Delete</button></td>
      </tr>`
    )
  })
  Diary.removeChecks()
  Diary.calculateMealCalories()
}

Diary.addToLunch = function () {
  $('input:checked').each( function () {
    const $foodTDs = $(this).parent().siblings()
    event.preventDefault ()
    Diary.addFoodToMeal (this)
      $('.lunch-foods-table .main-foods').append(
      `<tr class="food-row lunch">
        <td> ${$($foodTDs[0]).text()} </td>
        <td class="lunch-calories-total"> ${$($foodTDs[1]).text()} </td>
        <td class="hidden"><button type="button" class="delete" name="delete" id="1">Delete</button></td>
      </tr>`
    )
  })
  Diary.removeChecks()
  Diary.calculateMealCalories()
}

Diary.addToDinner = function () {
  $('input:checked').each( function () {
    const $foodTDs = $(this).parent().siblings()
    event.preventDefault ()
    Diary.addFoodToMeal (this)
      $('.dinner-foods-table .main-foods').append(
      `<tr class="food-row dinner">
        <td> ${$($foodTDs[0]).text()} </td>
        <td class="dinner-calories-total"> ${$($foodTDs[1]).text()} </td>
        <td class="hidden"><button type="button" class="delete" name="delete" id="3">Delete</button></td>
      </tr>`
    )
  })
  Diary.removeChecks()
  Diary.calculateMealCalories()
}

Diary.addToSnacks = function () {
  $('input:checked').each( function () {
    const $foodTDs = $(this).parent().siblings()
    event.preventDefault ()
    Diary.addFoodToMeal (this)
      $('.snacks-foods-table .main-foods').append(
      `<tr class="food-row dinner">
        <td> ${$($foodTDs[0]).text()} </td>
        <td class="snacks-calories-total"> ${$($foodTDs[1]).text()} </td>
        <td class="hidden"><button type="button" class="delete" name="delete" id="4">Delete</button></td>
      </tr>`
    )
  })
  Diary.removeChecks()
  Diary.calculateMealCalories()
}

Diary.addFoodToMeal = function (mealData) {
  const foodName = $(mealData).parent().siblings()[0].textContent
  const foodCalories = $(mealData).parent().siblings()[1].textContent
  const data = { name: foodName, calories: foodCalories}
  const $foodID = $(mealData).parent().parent()[0].dataset.id
  const $mealID = event.target.id
  $.ajax ({
    type: 'POST',
    url: `${API}/api/v1/meals/${$mealID}/foods/${$foodID}`,
    headers: {'Content-Type' : 'application/x-www-form-urlencoded',
              'Access-Control-Allow-Origin': '*' },
    data: {food: data},
  })
}

Diary.deleteFoodFromMeal = function () {
  const $foodID = event.target.parentElement.parentElement.children[3].textContent
  const $mealID = event.target.id

  event.preventDefault ()
  $.ajax ({
    type: 'DELETE',
    url: `${API}/api/v1/meals/${$mealID}/foods/${$foodID}`,
    headers: {'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json'},
  })
  .then(Diary.removeFoodFromMeal (this, $mealID))
}

Diary.removeFoodFromMeal = function (thing, mealID) {
  const id = event.target.parentElement.parentElement.id
  $(`#meal-${mealID} tr[id='${id}'`).remove ()
  Diary.calculateMealCalories()
}

Diary.removeChecks = function () {
  $('.check-box').prop('checked', false);
}

module.exports = Diary
