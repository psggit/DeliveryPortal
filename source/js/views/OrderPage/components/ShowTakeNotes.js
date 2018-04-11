import React, { Fragment } from 'react'
import { unMountModal } from '@components/ModalBox/utils'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'
import { GET, POST } from '@utils/fetch'
import Search from '@components/SearchInput'
import '@sass/OrdersPage/ShowNotified.scss'
import '@sass/components/_spinner.scss'
import { getIcon } from './../utils'

export default function showTakeNotes(data) {
  return class ShowTakeNotes extends React.Component {
    constructor() {
      super()
      this.issues = []
      this.state = {
        notesData: '',
        issueName: '',
        loadingIssues: true
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleAddNote = this.handleAddNote.bind(this)
      this.getNoteIssues = this.getNoteIssues.bind(this)
      this.handleChangeIssueName = this.handleChangeIssueName.bind(this)
    }

    componentDidMount() {
      this.getNoteIssues()
    }

    getNoteIssues() {
      GET({
        api: `/deliveryStatus/orderIssue`,
        handleError: true,
        apiBase: 'gremlinUrl'
      })
      .then(json => {
        this.issues = json.issues
        this.setState({ loadingIssues: false, issueName: json.issues[0].issue_name })
      })
    }

    handleChangeIssueName(e) {
      this.setState({ issueName: e.target.value })
    }

    handleChange(e) {
      this.setState({ notesData: e.target.value })
    }

    handleAddNote() {
      const { notesData, issueName } = this.state
      if (notesData.length) {
        data.createNote({
          issueName,
          note: notesData
        })
      }
    }


    render() {
      return (
        <ModalBox>
          <ModalHeader>Take note</ModalHeader>
          <select
            value={this.state.issueName}
            onChange={this.handleChangeIssueName}
            style={{ marginTop: '15px' }}
            disabled={this.state.loadingIssues }
          >
            {
              this.issues.map((item, i) => {
                return (
                  <option value={item.issue_name}>{ item.issue_name }</option>
                )
              })
            }
          </select>
          <ModalBody>
            <textarea
              disabled={this.state.loadingIssues}
              cols="60"
              rows="5"
              style={{
                width: '100%',
                borderRadius: '2px',
                borderColor: '#dfdfdf'
              }}
              onChange={this.handleChange}
            >
            </textarea>
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-primary' onClick={unMountModal}>Close</button>
            <button className='btn btn-primary' onClick={this.handleAddNote}>Add</button>
          </ModalFooter>
        </ModalBox>
      )
    }
  }
}
