import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import FolderActions from "../actions/FolderActions";
import "../changes.css";

 class File extends Component {


  getDataBasedOnRoute(route, data) {
    let routers = route.split("/");
    // let data = this.props.data;
    let breadcrumbs = [];
    for (let index = 1; index < routers.length; index++) {
      breadcrumbs.push({name: data[routers[index]]["name"], path: data[routers[index]]["path"]})
      data = data[routers[index]]["children"];
    }
    return {data, breadcrumbs};
  }

  renderBreadCrumbs(breadcrumbs, type){
    if(breadcrumbs.length) {
     let result = breadcrumbs.map((val, key)=>{
      let style = ((breadcrumbs.length - 1) == key) ? {pointerEvents:'none',color:'black'}: {}
        return(
          <Fragment key={key}>
            <span className="folder" style={{paddingLeft: "16px"}}>> </span>
            <Link to={{ pathname: key != 0 ? `/${val.name}/${btoa(val.path)}` : `/${val.name}`}}><span className="breadcrumbs folder" style={style}>{val.name}</span></Link>
          </Fragment>
        )
      })
      return (<><Link to={{ pathname: '/'  }}><i className="icon ion-md-home folder" ></i></Link>{result}</>)
    } else {
      return (<Link to={{ pathname: '/'  }}><i className="icon ion-md-home folder" ></i></Link>)
    }
  }

  render() {
    let path_name = this.props.match.url.split("/");
    let {state} = this.props.location;
    let { data, match:{ params:{ id, type } } } = this.props;
    let route = "";
    let breadcrumbs = [];
    if(type) {
      route = atob(path_name[4]);

      let result = this.getDataBasedOnRoute(route, data);
      data = result.data;
      breadcrumbs =  result.breadcrumbs;

    }
    return (
      <div className="container-fluid">
        {this.renderBreadCrumbs(breadcrumbs, type)}
        <p> You are currently in a file and the name of the file is <span style={{color: "#1d7dd7", fontWeight: "700"}}>{state.file_id}</span>. Click on the Breadcrumbs to go Back.</p>
      </div>
    )
  }
}

const mapStateToProps = ({ data }) => ({ data });
const mapDispatchToProps = dispatch => FolderActions(dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(File);