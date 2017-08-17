var $ = require('jquery')

const Food = require('./food')

$(document).ready(function () {
  Food.allFoodtoHTML ()
  .then(function (foodsHTML) {
    $('.foods-table').html (foodsHTML)
  })

})
