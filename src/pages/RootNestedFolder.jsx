import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import FileView from "../components/common/FileView";
import TreeView from "../components/common/TreeView";
import FolderActions from "../actions/FolderActions";
import { Link } from 'react-router-dom';

class folder2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal1: false,
      showModal: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose() {
    this.setState({
      showModal1: false,
      showModal: false
    });
  }

  getDataBasedOnRoute(route) {
    let routers = route.split("/");
    let data = this.props.data;
    let breadcrumbs = [];
    for (let index = 1; index < routers.length; index++) {
      breadcrumbs.push({name:data[routers[index]]['name'], path: data[routers[index]]['path']})
      data = data[routers[index]]["children"];
    }
    return {data, breadcrumbs};
  }

  handleSubmit(data) {
    let { id } = this.props.match.params;
    let route = atob(id);
    this.props.addFolder({ data, path: route });
    this.setState({
      showModal1: false,
      showModal: false
    });
  }
  renderBreadCrumbs(breadcrumbs, type){
    if(breadcrumbs.length) {
     let result = breadcrumbs.map((val, key)=>{
      let style = ((breadcrumbs.length - 1) == key) ? {pointerEvents:'none',color:'black'}: {}
        return(
          <Fragment key={key}>
            <span className="folder" style={{paddingLeft: "16px"}}>> </span>
            <Link style={style} to={{ pathname: key ? `/${type}/${btoa(val.path)}` : `/${type}`}}><span className="breadcrumbs folder">{val.name}</span></Link>
          </Fragment>
        )
      })
      return (<><Link to={{ pathname: '/'  }}><i className="icon ion-md-home folder" ></i></Link>{result}</>)
    } else {
      return (<Link to={{ pathname: '/'  }}><i className="icon ion-md-home folder" ></i></Link>)
    }
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
      breadcrumbs = [{name: this.props.data[type]['name'], path: this.props.data[type]['path']}]
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
          showModal={showModal}
          result={result}
          data={data}
          type={type}
          route={route}
          onHide={this.handleClose}
          handleSubmit={this.handleSubmit}
          onClick={() => this.setState({ showModal: true })}
        />
        </div>
        <div className="col-4">
        <FileView
          showModal={showModal1}
          result={result}
          data={data}
          type={type}
          route={route}
          onHide={this.handleClose}
          handleSubmit={this.handleSubmit}
          onClick={() => this.setState({ showModal1: true })}
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
)(folder2);
