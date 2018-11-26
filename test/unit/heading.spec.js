import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {Heading} from '../../src/heading'

describe("[Components] Heading", () => {
	it("should render correctly", () => {
		const node = shallow(<Heading text={"Hello World"}/>)
		expect(node.find("h1").text()).to.equal("Hello World")
	})
})
