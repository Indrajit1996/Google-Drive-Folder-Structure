import React, { Component } from "react";
import { connect } from "react-redux";
import TreeView from "../components/common/TreeView";
import FileView from "../components/common/FileView";
import FolderActions from "../actions/FolderActions";
import { Link } from 'react-router-dom';

class Folder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showModal1: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleClose() {
    this.setState({
      showModal: false,
      showModal1: false
    });
  }
  handleSubmit(data) {
    this.props.addFolder({ data, path: "" });
    this.setState({
      showModal: false,
      showModal1: false
    });
  }
  getDataBasedOnRoute(route) {
    let routers = route.split("/");
    let data = this.props.data;
    let breadcrumbs = [];
    for (let index = 1; index < routers.length; index++) {
      breadcrumbs.push({name:data[routers[index]], path: data[routers[index]]['path']})
      data = data[routers[index]]["children"];
    }
    return {data, breadcrumbs};
  }
  renderBreadCrumbs(breadcrumbs, type){
      return (<Link to={{ pathname: '/'  }}><i className="icon ion-md-home folder" ></i></Link>)
  }
  render() {
    let { data, match:{ params:{ id, type } } } = this.props;
    let route = "";
    let breadcrumbs = [];
    if(id) {
      route = atob(id);
      let result = this.getDataBasedOnRoute(route);
      data = result.data;
      breadcrumbs =  result.breadcrumbs;
    }else if (type){
      data =
      this.props.data[type] && this.props.data[type]["children"]
        ? this.props.data[type]["children"]
        : {};
    }
    let { showModal, showModal1 } = this.state;
    let result = Object.keys(data);
    return (
      <div className="container-fluid">
       {this.renderBreadCrumbs(breadcrumbs, type)}
       <div className="row">
        <div className="col-4">
          <TreeView
            showModal={showModal1}
            result={result}
            data={data}
            onHide={this.handleClose}
            handleSubmit={this.handleSubmit}
            onClick={() => this.setState({ showModal1: true })}
          />
          </div>
          <div className="col-4">
          <FileView
            showModal={showModal}
            result={result}
            data={data}
            onHide={this.handleClose}
            handleSubmit={this.handleSubmit}
            onClick={() => this.setState({ showModal: true })}
          />
          </div>
        </div>

      </div>
    );
  }
}
const mapStateToProps = ({ data }) => ({ data });
const mapDispatchToProps = dispatch => FolderActions(dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Folder);
