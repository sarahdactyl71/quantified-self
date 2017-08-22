"use strict"
var assert = require('chai').assert
var expect = require('chai').expect
const Food = require("../lib/food")
const pry = require('pryjs')

describe("Food", () => {
  describe("attributes", () => {
    const food = new Food({id: "1", name: "pizza", calories: "500"})

    it("is a food", () => {
      assert.instanceOf(food, Food)
    })

    it("has a name", () => {
      expect(food.name).to.equal("pizza")
    })

    it("has some calories", () => {
      expect(food.calories).to.equal("500")
    })
  })

  describe("functions", () => {
    describe("getAllFoods", () => {
      it("returns Food object as HTML", () => {
        const attrs = {id: 1, name: "pizza", calories: 500}
        const food = new Food(attrs)
        const expectedHTML =
          `<tr class="food-row" data-id=${attrs.id}>
            <td class="food-name" >${attrs.name}</td>
            <td class="food-calories" >${attrs.calories}</td>
            <td class="hidden"><button type="button" class="delete" name="delete">Delete</button></td>
          </tr>`
        const resultsHTML = food.toHTML()
        assert.equal(resultsHTML, expectedHTML)
      })
    })
  })
})
