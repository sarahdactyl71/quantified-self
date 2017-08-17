const $ = require('jquery')
var API =  "https://quantify-self-api.herokuapp.com"

function Food (food) {
  this.id = food.id
  this.name = food.name
  this.calories = food.calories
}

Food.prototype.toHTML = function () {
  return `<tr class="food-row" data-id=${this.id}>
            <td>${this.name}</td>
            <td>${this.calories}</td>
            <td class="hidden"><button type="button" name="delete">Delete</button></td>
          </tr>`
}

Food.getAllFoods = function () {
  return $.getJSON(`${API}/api/v1/foods`)
}

Food.allFoodsToHTML = function () {
  return this.getAllFoods ()
  .then(function (foods) {
    return foods.map(function (food) {
      return new Food (food)
    })
  })
  .then(function (foods) {
    return foods.map(function (food) {
      return food.toHTML ()
    })
  })
}

Food.post = function (event) {
  event.preventDefault ()
  const $name = $('.food-name-field')
  const $calories = $('.food-calories-field')
  const data = {
    food: {
      name: $name.val (),
      calories: $calories.val (),
    }
  }
  debugger
  $.post(`${API}/api/v1/foods`, data)
    .then(Food.appendNew)
    .catch(Food.handleError)
}

Food.appendNew = function (food) {
  const newFood = new Food (food)
  $('.foods-table').append (newFood.toHTML ())
}

Food.handleError = function (error) {
  console.error (error)
}

module.exports = Food
