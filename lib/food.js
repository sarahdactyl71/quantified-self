const $ = require('jquery')
var API =  "https://quantify-self-api.herokuapp.com/"

function Food (food) {
  this.id = food.id
  this.name = food.name
  this.calories = food.calories
}

Food.prototype.toHTML = function () {
  return `<tr class="food-row data-id=${this.id}">
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



module.exports = Food
