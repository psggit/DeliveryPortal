import React from 'react'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'
import { unMountModal } from '@components/ModalBox/utils'
import Moment from 'moment'
import DayPicker from 'react-day-picker'
import '@sass/components/_date-picker.scss'

export default function DatePicker (data) {
  return class DatePicker extends React.Component {
    constructor () {
      super()
      this.setFromDate = this.setFromDate.bind(this)
      this.setToDate = this.setToDate.bind(this)
      this.applyDateFilter = this.applyDateFilter.bind(this)
      this.state = {
        startDate: Moment(),
        error: false
      }
    }
    applyDateFilter() {
      const { fromDate, toDate } = this.state
      if (fromDate && toDate) {
        // this.props.setQueryString()
        // console.log(fromDate.toISOString(), toDate)
        data.setDate(fromDate.toISOString(), toDate.toISOString())
        unMountModal()
      } else {
        this.setState({error: true})
      }
    }
    setFromDate(day) {
      const { toDate } = this.state
      if (toDate) {
        this.setState({error: false})
      }
      this.setState({
        fromDate: day
      })
    }
    setToDate(day) {
      const { fromDate } = this.state
      if (fromDate) {
        this.setState({error: false})
      }
      this.setState({
        toDate: day
      })
    }
    render () {
      return (
        <ModalBox>
          <ModalHeader>Choose date</ModalHeader>
            <ModalBody>
              <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <div>
                  <h4 style={{textAlign: 'center', textDecoration: 'underline'}}>From date</h4>
                  <DayPicker
                    onDayClick={this.setFromDate}
                    selectedDays={this.state.fromDate}
                  />
                </div>
                <div>
                  <h4 style={{textAlign: 'center', textDecoration: 'underline'}}>To date</h4>
                  <DayPicker
                    onDayClick={this.setToDate}
                    selectedDays={this.state.toDate}
                  />
                </div>
              </div>
              {
                this.state.fromDate && this.state.toDate
                ? <p style={{textAlign: 'center', marginTop: '20px', fontWeight: '600'}}>
                  From: {Moment(this.state.fromDate).format('MMM Do YY')}&nbsp;&nbsp;
                  To: {Moment(this.state.toDate).format('MMM Do YY')}
                  </p>
                : ''
              }
              {
                this.state.error
                ? <p style={{color: '#ff3b34', textAlign: 'center', marginTop: '20px'}}>Please select both the dates</p>
                : ''
              }
            </ModalBody>
          <ModalFooter>
            <button className='btn btn-primary' onClick={this.applyDateFilter}>Apply</button>
          </ModalFooter>
        </ModalBox>
      )
    }
  }
}
