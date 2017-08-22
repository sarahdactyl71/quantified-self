"use strict"
var assert = require('chai').assert
var expect = require('chai').expect
var webdriver = require('selenium-webdriver')
var until     = webdriver.until
var test      = require('selenium-webdriver/testing')
var frontEndLocation = "http://localhost:8080/foods.html"
var includes = require('array-includes')

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
          `<tr class="food-row id-${attrs.id}" data-id=${attrs.id}>
            <td class="food-name id-${attrs.id}" >${attrs.name}</td>
            <td class="food-calories id-${attrs.id}" >${attrs.calories}</td>
            <td class="hidden"><button type="button" class="delete" name="delete">Delete</button></td>
          </tr>`
        const resultsHTML = food.toHTML()
        assert.equal(resultsHTML, expectedHTML)
      })
    })

    describe("foods.html", function() {
      var driver;
      this.timeout(10000);

      test.beforeEach(function() {
        driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();
      });

      test.afterEach(function() {
        driver.quit();
      });

      // test.it("displays a list of foods", function() {
      //   driver.get(`${frontEndLocation}`);
      //   driver.wait(until.elementLocated({css: ".foods-table .food-row"}));
      //   driver.findElements({css: ".foods-table .food-row"})
      //   .then(function(foods) {
      //     assert.lengthOf(foods, 21)
      //   })
      // })
      //
      // test.it("can add a food", function() {
      //   driver.get(`${frontEndLocation}`)
      //   driver.wait(until.elementLocated({css: ".add-food-button"}))
      //   driver.findElement({css: '.food-name-field'}).sendKeys('Panini')
      //   driver.findElement({css: '.food-calories-field'}).sendKeys('770')
      //   driver.findElement({css: '.add-food-button'}).click()
      //   driver.sleep(1000)
      //   driver.findElements({css: ".foods-table .food-row"})
      //   .then(function(foods) {
      //     assert.lengthOf(foods, 22)
      //   })
      // })
      //
      // test.it("can delete a food", function() {
      //   driver.get(`${frontEndLocation}`)
      //   driver.wait(until.elementLocated({css: ".hidden"}))
      //   driver.findElement({css: '.hidden'}).click()
      //   driver.sleep(1000)
      //   driver.findElements({css: ".foods-table .food-row"})
      //   .then(function(foods) {
      //     assert.lengthOf(foods, 21)
      //   })
      // })

      test.it("can edit a food name", function() {
        driver.get(`${frontEndLocation}`)
        driver.wait(until.elementLocated({css: ".food-name"}))
        driver.findElement({css: '.food-name.id-11'}).click()
        driver.sleep(5000)
        driver.findElement({css: 'table input'}).clear()
        driver.findElement({css: 'table input'}).sendKeys('Everything Burrito')
        driver.findElement({css: '.container'}).click()
        driver.sleep(1000)
        driver.findElements({css: ".foods-table .food-name"})
        .then(function(foods) {
          assert.lengthOf(foods, 20)
          assert.include(foods, 'Everything Burrito', 'There is a new Everything Burrito')
        })
      })
    })
  })
})
