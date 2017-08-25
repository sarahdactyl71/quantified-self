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

Diary.addToBreakfast = function () {
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
}

Diary.getBreakfastFoods = function () {
  $.ajax({
    url: "https://quantify-self-api.herokuapp.com/api/v1/meals/1/foods",
    dataType : 'json',
    success: function(data) {
      $.each(data.foods, function(index,food) {
          // alert(food.name+" "+food.calories)
          $('.breakfast-foods-table .main-foods').append(
          `<tr class="food-row breakfast">
            <td> ${food.name} </td>
            <td> ${food.calories} </td>
            <td class="hidden"><button type="button" name="delete">Delete</button></td>
          </tr>`
        )
      });
    },
    error: function(e) {
      console.log(e.message);
    }
  })
}

Diary.addToLunch = function () {
  $('input:checked').each( function () {
    var $foodTDs = $(this).parent().siblings()
      $('.lunch-foods-table .main-foods').append(
      `<tr class="food-row lunch">
        <td> ${$($foodTDs[0]).text()} </td>
        <td> ${$($foodTDs[1]).text()} </td>
        <td class="hidden"><button type="button" name="delete">Delete</button></td>
      </tr>`
    )
  })
}

Diary.addToDinner = function () {
  $('input:checked').each( function () {
    var $foodTDs = $(this).parent().siblings()
      $('.dinner-foods-table .main-foods').append(
      `<tr class="food-row dinner">
        <td> ${$($foodTDs[0]).text()} </td>
        <td> ${$($foodTDs[1]).text()} </td>
        <td class="hidden"><button type="button" name="delete">Delete</button></td>
      </tr>`
    )
  })
}

Diary.addToSnacks = function () {
  $('input:checked').each( function () {
    var $foodTDs = $(this).parent().siblings()
      $('.snacks-foods-table .main-foods').append(
      `<tr class="food-row dinner">
        <td> ${$($foodTDs[0]).text()} </td>
        <td> ${$($foodTDs[1]).text()} </td>
        <td class="hidden"><button type="button" name="delete">Delete</button></td>
      </tr>`
    )
  })
}

module.exports = Diary
