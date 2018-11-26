import Enzyme from 'enzyme'
import React16EnymeAdapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new React16EnymeAdapter()})
