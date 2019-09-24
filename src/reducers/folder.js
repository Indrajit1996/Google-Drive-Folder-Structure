import { data } from '../store';
const initialState = data;
var objDataAssign = function(obj, keys, v) {
    if (keys.length === 1) {
      obj[keys[0]] = v;
    } else {
      var key = keys.shift();
      obj[key] = objDataAssign( typeof obj[key] === 'undefined' ? {} : obj[key], keys, v);
    }
    return obj;
};
const folder = (state = initialState, action) => {
    let {type, payload} = action
    switch (type) {
        case 'ADD_NEW_FOLDER':
        let {fileData, path} = payload;
        let data = {...state};
        let [arr, ...routers] = path.split('/');
        if(routers && routers.length){
            let finalKey = Object.keys(fileData)[0];
            let keys = [...routers, finalKey].join("/children/").split("/")
            let result = objDataAssign(data, keys, fileData[finalKey]);
            return result;
        }else {
            return {...state, ...fileData};
        }
        case 'ADD_NEW_FILE':
        return state;

        default:
          return state;
      }
    };
export default folder