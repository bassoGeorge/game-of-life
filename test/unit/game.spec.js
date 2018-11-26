import {expect} from './helpers/chai-plugged-in'
import {countAlive, findNeighbors, getNeighborsInCol} from '../../src/game'

describe("Game: the game core", () => {

	describe("getNeighborsInCol", () => {

		it("should get the neighbors of the given cell for a column when item at start", () => {
			const col = ['T', 'b', 'c']
			expect(getNeighborsInCol(true)(col, 0)).to.eql(['b'])
		})

		it("should get the neighbors of the given cell for a column when the item is at the end", () => {
			const col = ['a', 'b', 'c', 'T']
			expect(getNeighborsInCol(true)(col, 3)).to.eql(['c']);
		})

		it("should get the neighbors of the given cell for a column when the item is in the middle", () => {
			const col = ['a', 'b', 'T', 'd']
			expect(getNeighborsInCol(true)(col, 2)).to.eql(['b', 'd']);
		})

		it("should get the neighbors of the given cell for a column when item is parallel to start", () => {
			const col = ['a', 'b', 'c']
			expect(getNeighborsInCol(false)(col, 0)).to.eql(['a', 'b'])
		})

		it("should get the neighbors of the given cell for a column when the item is parallel to the end", () => {
			const col = ['a', 'b', 'c', 'd']
			expect(getNeighborsInCol(false)(col, 3)).to.eql(['c', 'd']);
		})

		it("should get the neighbors of the given cell for a column when the item is parallel to the middle", () => {
			const col = ['a', 'b', 'c', 'd']
			expect(getNeighborsInCol(false)(col, 2)).to.eql(['b', 'c', 'd']);
		})


	})

	describe("findNeighbors", () => {

		it("should get the neighbors of the given cell for grid when the item is on top left corner", () => {
			const grid = [
				['T', 'b', 'c'],
				['e', 'f', 'g']
			]
			expect(findNeighbors(grid, 0, 0)).to.eql(['b', 'e', 'f']);
		})

		it("should get the neighbors of the given cell for grid when the item is on top right corner", () => {
			const grid = [
				['a', 'b', 'c', 'T'],
				['e', 'f', 'g', 'h']
			]
			expect(findNeighbors(grid, 0, 3)).to.eql(['c', 'g', 'h']);
		})

		it("should get the neighbors of the given cell for grid when the item is on top edge", () => {
			const grid = [
				['a', 'T', 'c', 'd'],
				['e', 'f', 'g', 'h']
			]
			expect(findNeighbors(grid, 0, 1)).to.eql(['a', 'c', 'e', 'f', 'g']);
		})

		it("should get the neighbors of the given cell for grid when the item is on bottom left corner", () => {
			const grid = [
				['a', 'b', 'c'],
				['T', 'f', 'g']
			]
			expect(findNeighbors(grid, 1, 0)).to.eql(['a', 'b', 'f']);
		})

		it("should get the neighbors of the given cell for grid when the item is on bottom right corner", () => {
			const grid = [
				['a', 'b', 'c', 'd'],
				['e', 'f', 'g', 'T']
			]
			expect(findNeighbors(grid, 1, 3)).to.eql(['c', 'd', 'g']);
		})

		it("should get the neighbors of the given cell for grid when the item is on bottom edge", () => {
			const grid = [
				['a', 'b', 'c', 'd'],
				['e', 'T', 'g', 'h']
			]
			expect(findNeighbors(grid, 1, 1)).to.eql(['a', 'b', 'c', 'e', 'g']);
		})

		it("should get the neighbors of the given cell for grid when the item is on left edge", () => {
			const grid = [
				['a', 'b', 'c', 'd'],
				['T', 'f', 'g', 'h'],
				['i', 'j', 'k', 'l']
			]
			expect(findNeighbors(grid, 1, 0)).to.eql(['a', 'b', 'f', 'i', 'j']);
		})

		it("should get the neighbors of the given cell for grid when the item is on right edge", () => {
			const grid = [
				['a', 'b', 'c', 'd'],
				['e', 'f', 'g', 'T'],
				['i', 'j', 'k', 'l'],
				['m', 'n', 'o', 'p']
			]
			expect(findNeighbors(grid, 1, 3)).to.eql(['c', 'd', 'g', 'k', 'l']);
		})

		it("should get the neighbors of the given cell for grid when the item is in the middle", () => {
			const grid = [
				['a', 'b', 'c', 'd'],
				['e', 'T', 'g', 'h'],
				['i', 'j', 'k', 'l'],
				['m', 'n', 'o', 'p']
			]
			expect(findNeighbors(grid, 1, 1)).to.eql(['a', 'b', 'c', 'e', 'g', 'i', 'j', 'k']);
		})

	})

})
