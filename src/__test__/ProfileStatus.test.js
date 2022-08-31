import React from 'react'
import { create } from 'react-test-renderer'
import ProfileStatus from './../components/Profile/ProfileInfo/ProfileStatus'

describe('Button component', () => {
  test('status from props doljen bit` in the state', () => {
    const component = create(<ProfileStatus status="testing status" />)
    const instance = component.getInstance()
    expect(instance.state.status).toBe('testing status')
  })

  test('posle creation span doljen otobrajat`sya', () => {
    const component = create(<ProfileStatus status="testing status" />)
    const root = component.root
    const span = root.findByType('span')
    expect(span).not.toBeNull()
  })

  test('posle creation input ne doljen otobrajat`sya', () => {
    const component = create(<ProfileStatus status="testing status" />)
    const root = component.root
    expect(() => {
      root.findByType('input')
    }).toThrow()
  })

  test('po default editMode doljet bit` false', () => {
    const component = create(<ProfileStatus />)
    const instance = component.getInstance()
    expect(instance.state.editMode).toBeFalsy()
  })

  test('callback doljen vizivat`sya', () => {
    const mockCallback = jest.fn()
    const component = create(<ProfileStatus updateStatus={mockCallback} />)
    const instance = component.getInstance()
    instance.deactivateEditMode()
    expect(mockCallback.mock.calls.length).toBe(1)
  })
})
