import React from 'react'
import { expect } from '../../utils/chai'
import { shallow, mount, render } from 'enzyme'
import sinon from 'sinon'
import Button from './button.jsx'

describe('rendering components', () => {
    it('renders button', () => {
        const spy = sinon.spy()
        const wrapper = shallow(<Button text='text' color='blue' onResetZoom={spy}/>)
        expect(wrapper).to.exist
    })
    it('renders button according to color', () => {
        const spy = sinon.spy()
        const wrapper = shallow(<Button text='text' color='#ffffff' onResetZoom={spy}/>)
        expect(wrapper).to.have.className('custom-button--#ffffff')
    })
    it('renders text-container according to color', () => {
        const spy = sinon.spy()
        const wrapper = shallow(<Button text='text' color='#ffffff' onResetZoom={spy}/>)
        expect(wrapper.find('.custom-button__text')).to.have.className('custom-button__text--#ffffff')
    })
    it('renders text', () => {
        const spy = sinon.spy()
        const wrapper = shallow(<Button text='text' color='#ffffff' onResetZoom={spy}/>)
        expect(wrapper.find('span').text()).to.be.equal('text')
    })
    it('onClick function is called', () => {
        const spy = sinon.spy()
        const wrapper = shallow(<Button text='text' color='#ffffff' onResetZoom={spy}/>)
        wrapper.find('div').first().simulate('click')
        expect(spy.calledOnce).to.be.true
    })
})