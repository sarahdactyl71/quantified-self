const $ = require('jquery')
var API =  "https://quantify-self-api.herokuapp.com"

function FoodSelection (food) {
  this.id = food.id
  this.name = food.name
  this.calories = food.calories
}

FoodSelection.prototype.toHTML = function () {
  return `<tr class="food-row" data-id=${this.id}>
            <td class="check-box"></td>
            <td class="food-name" >${this.name}</td>
            <td class="food-calories" >${this.calories}</td>
          </tr>`
}

FoodSelection.getAllFoods = function () {
  return $.getJSON(`${API}/api/v1/foods`)
}

FoodSelection.allFoodsToHTML = function () {
  return this.getAllFoods ()
  .then(function (foods) {
    return foods.map(function (food) {
      return new FoodSelection (food)
    })
  })
  .then(function (foods) {
    return foods.reverse().map(function (food) {
      return food.toHTML ()
    })
  })
}

module.exports = FoodSelection 