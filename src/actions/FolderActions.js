const FolderActions = dispatch => ({
  addFolder: ({data, path}) => {
    data.id = Date.now() % 1000;
    let fileData = { [data.folder_data.folderName]: { 
      id: data.id,
      name: data.folder_data.folderName,
      type: data.type,
      path: (path) ? `${path}/${data.folder_data.folderName}` :`/${data.folder_data.folderName}`,
      children: {}
    } }

      dispatch({
        type: 'ADD_NEW_FOLDER',
        payload: {fileData, path}
    })
  },
});

export default FolderActions;