const $ = require('jquery')
var API =  "https://quantify-self-api.herokuapp.com"

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
  var rows = $('.add-foods-table tr.food-row')
  var filter = $('.food-filter-input').val ().toLowerCase ()
  rows.hide ()
  rows.each (function () {
    var foodName = $(this).children('.food-name').text ().toLowerCase ()
    if (foodName.indexOf (filter) >= 0 ) {
      $(this).show ()
    }
  })
}

module.exports = Diary 