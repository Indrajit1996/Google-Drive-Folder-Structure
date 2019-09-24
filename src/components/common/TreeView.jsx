import React, { Component } from 'react'
import ModalEquity from '../../components/common/modals'
import DisplayData from './Display';
import '../../changes.css'

export default class TreeView extends Component {
  render() {
    let {showModal, result, data, type, route} = this.props;
    return (
      <div >
        <div className="col-12 p-0">
          <span style={{paddingRight: "40px"}}><i className="icon ion-md-add-circle-outline folder" onClick={this.props.onClick}> New Folder </i></span>
        </div>
        <ModalEquity 
            show={showModal} 
            onHide={this.props.onHide} 
            handleSubmit={this.props.handleSubmit} 
            type="folder"
             />
         {
            result.map((item, key) =>
             {
               let tr;
              if(data[item]["type"] == "folder")
              {
                tr = (
                <DisplayData data={data[item]} type={type} route={route} />
                )
                return ( <div key={key}> {tr} </div> )
              }
            }) 
        } 
      </div>
    )
  }
}
