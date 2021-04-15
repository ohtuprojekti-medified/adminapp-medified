import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor, fireEvent } from '@testing-library/react'
import TimeFilter from './TimeFilter'

describe('<TimeFilter />', () => {
    let component
    const handleStartDateEnableChange = jest.fn()
    const handleEndDateEnableChange = jest.fn()
    const handleStartDateChange = jest.fn()
    const handleEndDateChange = jest.fn()

    component = render(<TimeFilter startDateEnable={false} endDateEnable={false}
        startDate={''} endDate={''} handleStartDateEnableChange={handleStartDateEnableChange}
        handleEndDateEnableChange={handleEndDateEnableChange} handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange} />)

    test('renders TimeFilter', () => {
        waitFor(() => {
            expect(component.container).toHaveTextContent('Start date')
            expect(component.container).toHaveTextContent('End date')
        })
    })

    test('checking start date checkbox calls eventhandler', () => {
        const checkbox = component.findByTestId('startDate-checkbox')

        waitFor(() => {
            fireEvent.click(checkbox)
            expect(handleStartDateEnableChange.mock.calls).toHaveLength(1)
        })
    })

    test('checking end date checkbox calls eventhandler', () => {
        const checkbox = component.findByTestId('endDate-checkbox')

        waitFor(() => {
            fireEvent.click(checkbox)
            expect(handleEndDateEnableChange.mock.calls).toHaveLength(1)
        })
    })

    test('typeing start date calls eventhandler', () => {
        const dateInput = component.findByTestId('startDate-date')

        waitFor(() => {
            fireEvent.change(dateInput, { target: { value: '2020-06-01' } })
            expect(handleStartDateChange.mock.calls).toHaveLength(1)
        })
    })

    test('typeing end date calls eventhandler', () => {
        const dateInput = component.findByTestId('endDate-date')

        waitFor(() => {
            fireEvent.change(dateInput, { target: { value: '2020-11-01' } })
            expect(handleStartDateChange.mock.calls).toHaveLength(1)
        })
    })
})