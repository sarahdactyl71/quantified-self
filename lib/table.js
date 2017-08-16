class Table{
  var API = "https://quantify-self-api.herokuapp.com"

  $(document).ready(function(){
    var getFoods = function() {
      return $.ajax({
        url: API + '/api/v1/foods',
        method: "GET",
      }).done(function(data){
        for (var i = 0; i < data.length; i++) {
          $('#foods-table').append('<tr class="food-row">' + '<td>' data[i].name + '</td><td>' + data[i].calories + '</td></tr>')
        }
      }
    )).fail(function(error){
      console.error(error)
    })
  }
  getFoods()
})}

module.exports = Table
