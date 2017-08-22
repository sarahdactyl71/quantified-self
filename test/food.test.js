"use strict"
var assert = require('chai').assert
var expect = require('chai').expect
const Food = require("../lib/food")
const pry = require('pryjs')

describe("Food", () => {
  describe("attributes", () => {
    const food = new Food({id: "1", name: "pizza", calories: "500"})

    it("has a name", () => {
      expect(food.name).to.equal("pizza")
    })

    it("has some calories", () => {
      expect(food.calories).to.equal("500")
    })
  })
})
