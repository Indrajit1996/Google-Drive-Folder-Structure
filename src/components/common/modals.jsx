import React, { Component } from 'react'

 class Folder extends Component {
  constructor(props){
    super(props);
    this.state = {
        folderName: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = () => {
    let folder_data = this.state;
    this.props.handleSubmit({folder_data, type: this.props.type});
    this.props.onHide();
    this.setState({
        folderName: '',
    })
  }
  
  render() {
    return (
      <div>   
          <div className={`modal fade ${this.props.show ? 'show' : ''}`} aria-hidden="true" role="dialog" tabIndex="-1" style={{ display: (this.props.show) ? 'block': 'none' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add {this.props.type}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.onHide}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
      <div className="modal-body">
        <form>
          <div className="form-group">
            <label htmlFor="weight" className="col-form-label">{this.props.type} Name</label>
            <input type="text" className="form-control" id="folderName" placeholder="Enter here" value={this.state.folderName} onChange={this.handleChange}/>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" close="modal" onClick={this.handleSubmit}>Submit</button>
      </div>
         </div>
        </div>
       </div>
      </div>
    )
  }
}
export default Folder;