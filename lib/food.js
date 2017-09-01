const $ = require('jquery')
const API =  "https://quantify-self-express-api.herokuapp.com"

function Food (food) {
  this.id = food.id
  this.name = food.name
  this.calories = food.calories
}

Food.prototype.toHTML = function () {
  return `<tr class="food-row id-${this.id}" data-id=${this.id}>
            <td class="food-name id-${this.id}" >${this.name}</td>
            <td class="food-calories id-${this.id}" >${this.calories}</td>
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

  $('.manage-foods-form').trigger('reset')
  const data = {
    food: {
      name: $name,
      calories: $calories,
    }
  }

  $.ajax({
    type: 'POST',
    url: `${API}/api/v1/foods`, 
    data,
    headers: {'Content-Type' : 'application/x-www-form-urlencoded' },
  })
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
    // headers: {'Access-Control-Allow-Origin': '*',
    //           'Content-Type': 'application/json',},
    headers: {'Content-Type' : 'application/x-www-form-urlencoded' },
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
  const rows = $('.foods-table tr.food-row')
  const filter = $('.food-filter-input').val ().toLowerCase ()
  rows.hide ()
  rows.each (function () {
    const foodName = $(this).children('.food-name').text ().toLowerCase ()
    if (foodName.indexOf (filter) >= 0 ) {
      $(this).show ()
    }
  })
}

Food.editFood = function (data) {
  const $originalValue = $(data.tableData)
  const foodID = data.tableData.parentElement.attributes[1].value
  // $(`tr[data-id='${data.tableData.attributes["data-id"].value}']`)
  const foodUnchanged = data.tableData.parentElement.children[data.dataIndex].innerText
  const $input = $('<input/>').val( $originalValue.text () )
  $originalValue.replaceWith ( $input )

  const save = function () {
    const foodChanged = $input.val ()
    const updateAttrs = {
      foodID,
      [data.changed]: foodChanged,
      [data.unchanged]: foodUnchanged,
    }
    Food.updateFood (updateAttrs)
    const $editedValue = $(`<td class="food-${data.changed} id-${foodID}" >${$input.val ()}</td>`)
    $input.replaceWith ( $editedValue )
  }
  $input.one ('blur', save).focus ()

}

Food.editFoodName = function () {
  const data = {
    dataIndex: 1,
    changed: 'name',
    unchanged: 'calories',
    tableData: this,
  }
  Food.editFood(data)
}

Food.editFoodCalories = function () {
  const data = {
    dataIndex: 0,
    changed: 'calories',
    unchanged: 'name',
    tableData: this,
  }
  Food.editFood(data)
}

Food.updateFood = function (foodData) {

  const data = {
    food: {
      name: foodData.name,
      calories: foodData.calories,
    }
  }

  $.ajax ({
    type: 'PUT',
    url: `${API}/api/v1/foods/${foodData.foodID}`,
    data: data,
    headers: {'Content-Type' : 'application/x-www-form-urlencoded' }
  })
    .catch (Food.handleError)
}

Food.sortTable = function () {
  let i = 0
  let shouldSwitch = 0
  let switchcount = 0
  const table = document.getElementsByClassName('foods-table')
  let switching = true
  let dir = "asc"
  const rows = document.getElementsByTagName("TR")

  let resetOrder = 0
  for (i = 1; i < (rows.length -1); i++) {
    let x = rows[i].getElementsByTagName("TD")[1]
    let y = rows[i + 1].getElementsByTagName("TD")[1]
    if (parseInt(x.innerHTML) >= parseInt(y.innerHTML)) {
      resetOrder += 1
      if (resetOrder === rows.length - 2) {
        $(".foods-table .food-row").remove()
        Food.allFoodsToHTML ()
        .then(function (foodsHTML) {
          $('.foods-table').append (foodsHTML)
        })        
      }
    }
  }  
 
  while (switching) {
    switching = false
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false
      let x = rows[i].getElementsByTagName("TD")[1]
      let y = rows[i + 1].getElementsByTagName("TD")[1]
      if (dir == "asc") {
        if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
          shouldSwitch= true
          break
        }
      } else if (dir == "desc") {
        if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
          shouldSwitch= true
          break
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
      switching = true
      switchcount ++
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc"
        switching = true
      }
    }
  }
}

module.exports = Food
