import React, { Component } from 'react'
import ModalEquity from '../../components/common/modals'
import DisplayData from './Display';

export default class TreeView extends Component {
  render() {
    let {showModal, result, data, type, route} = this.props;
    return (
      <div>
        <div>
        <i className="icon ion-md-add-circle-outline folder" onClick={this.props.onClick}> New Folder </i>
        </div>
        <ModalEquity show={showModal} onHide={this.props.onHide} handleSubmit={this.props.handleSubmit} />
         {
            result.map((item, key) =>
             {
             let tr = (
                <DisplayData data={data[item]} type={type} route={route} />
              )
              return ( <div key={key}> {tr} </div> )
            }) 
        } 
      </div>
    )
  }
}
