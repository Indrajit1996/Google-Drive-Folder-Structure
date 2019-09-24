import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class Display extends Component {
  getRouterPath(path) {
    let { type, route } = this.props;
    if (route) {
      return btoa(path);
    }
    if (type) {
      return `${type}/${btoa(path)}`;
    }
    return path;
  }
  
  render() {
    let { data, type, route } = this.props;
    return (
      <div>
        {data.type == "folder" ? (
          <Link
            to={{
              pathname: this.getRouterPath(data.path),
              state: { id: data.name }
            }}
          >
            <i className="icon ion-md-folder-open folder"></i>
            <span style={{ paddingLeft: "12px" }}>{data.name}</span>
          </Link>
        ) : 
          <Link
            to={{
              pathname: `/file_system/file/file_name/${btoa(data.path)}`,
              state: { file_id: data.name }
            }}
          >
          <i className="icon ion-md-document folder"></i>
            <span style={{ paddingLeft: "12px" }}>{data.name}</span>
            </Link>
          }
      </div>
    );
  }
}
export default Display;
