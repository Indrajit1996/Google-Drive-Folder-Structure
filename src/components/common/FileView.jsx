import React, { Component } from 'react'
import Modal from '../../components/common/modals'
import DisplayData from './Display';
import '../../changes.css'

export default class FileView extends Component {
  render() {
    let {showModal, result, data, type, route} = this.props;
    return (
      <div >
        <div className="col-12 p-0">
          <span style={{paddingRight: "40px"}}><i className="icon ion-md-add-circle-outline folder" onClick={this.props.onClick}> New File </i></span>
        </div>
        <Modal show={showModal} onHide={this.props.onHide} handleSubmit={this.props.handleSubmit} type="file" />
         {
            result.map((item, key) =>
             {
               let tr;
               if(data[item]["type"] == "file")
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