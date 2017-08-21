const $ = require('jquery')
var API =  "https://quantify-self-api.herokuapp.com"

function Food (food) {
  this.id = food.id
  this.name = food.name
  this.calories = food.calories
}

Food.prototype.toHTML = function () {
  return `<tr class="food-row" data-id=${this.id}>
            <td class="food-name" >${this.name}</td>
            <td class="food-calories" >${this.calories}</td>
            <td class="hidden"><button type="button" class="delete" name="delete">Delete</button></td>
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
    return foods.reverse().map(function (food) {
      return food.toHTML ()
    })
  })
}

Food.post = function (event) {
  event.preventDefault ()
  const $name = $('.food-name-field').val ()
  const $calories = $('.food-calories-field').val ()
  if ($name == "") {
    alert("Please enter a food name")
    return false
  }
  if ($calories == "") {
    alert("Please enter a calories amount")
    return false    
  }
  const data = {
    food: {
      name: $name,
      calories: $calories,
    }
  }
  $.post(`${API}/api/v1/foods`, data)
    .then(Food.appendNew)
    .catch(Food.handleError)
}

Food.appendNew = function (food) {
  const newFood = new Food (food)
  $('.foods-table tr:first').after(newFood.toHTML ())
}

Food.handleError = function (error) {
  console.error (error)
}

Food.delete = function (event) {
  const parentID = event.target.parentElement.parentElement.attributes[1].value
  event.preventDefault ()
  $.ajax ({
    type: 'DELETE',
    url: `${API}/api/v1/foods/${parentID}`,
    headers: {'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',},
    id: parentID,
  })
    .then (Food.removeFood)
    .catch (Food.handleError)
}

Food.removeFood = function (response) {
  const id = this.id
  $(`tr[data-id='${id}'`).remove ()
}

Food.filterByName = function () {
  var rows = $('.foods-table tr.food-row')
  var filter = $('.food-filter-input').val ().toLowerCase ()
  rows.hide ()
  rows.each (function () {
    var foodName = $(this).children('.food-name').text ().toLowerCase ()
    if (foodName.indexOf (filter) >= 0 ) {
      $(this).show ()
    }
  })

}

module.exports = Food
