import React, { Component } from "react";
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
        {data.name ? (
          <Link
            to={{
              pathname: this.getRouterPath(data.path),
              state: { id: data.name }
            }}
          >
            <i className="icon ion-md-folder-open folder"></i>
            <span style={{ paddingLeft: "12px" }}>{data.name}</span>
          </Link>
        ) : null}
      </div>
    );
  }
}
export default Display;
