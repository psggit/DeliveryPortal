import React from 'react'
import { getIcon } from '../utils'
import './tableview.scss'


class TableView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showBar : false
        }
        //this.toggleProgressBar = this.toggleProgressBar.bind(this)
    }

    render() {

        var self = this;

        function toggleProgressBar(e) {
   
            e.stopPropagation()
            const { showBar } = self.state
            self.setState({ showBar : !showBar})
            
        }

        const { tableHeaderItems, tableBodyItems, handleClick, handleOrderAssign, handleShowNotes } = this.props
        const { showBar } = this.state

        return (
        
            <div class="table">
                <div class="table__header">
                    {
                        tableHeaderItems.map((item, index) => {
                            return <div class={`table__header__title column${index}`} key={index}>{item}</div>
                        })
                    }     
                </div>
                <div class="table__body">
                    {
                        Object.keys(tableBodyItems).map(function(key) { 
                            return  <div>
                                        <div key={key} class="table__body__row" onClick={ (e) => {handleClick(key, e)} }>
                                            <div class="column0"> <span className="back-icon" onClick={(e) => {toggleProgressBar(e)} }> { getIcon('menu') } </span> </div>
                                            {
                                                tableBodyItems[key].map(function(item, index) { 
                                                    return <div className={`column column${index+1}`}> {item} </div>
                                                })
                                            }
                                            <button className="column9" onClick={(e) => { handleOrderAssign(key, e) }} style={{ fontSize: '12px', padding: '5px 10px', borderRadius: '4px' }}>Assign</button>
                                            <button className="column10" onClick={(e) => { handleShowNotes(e, key) }} style={{ fontSize: '12px', padding: '5px 10px', borderRadius: '4px' }}>Notes</button>
                                        
                                        </div>
                                        {/* <div>
                                            {
                                                <ProgressBar key={item.order_id} data={item} ></ProgressBar>
                                            }
                                        </div> */}
                                        {   
                      
                                            <div className={"table__body__row progress-bar " + (showBar ? 'active' : '')}> hello </div>
                                            //<ProgressBar key={item.order_id} data={item} ></ProgressBar>
                                        }


                                    </div>
                        })

                        
                    }
                    {/* {   
                      
                      <div className={"table__body__row progress-bar " + (showBar ? 'active' : '')}> hello </div>
                      //<ProgressBar key={item.order_id} data={item} ></ProgressBar>
                    } */}
                </div>
            </div>
        )
    }

}

export default TableView
