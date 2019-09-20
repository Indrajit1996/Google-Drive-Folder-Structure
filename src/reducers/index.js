import { combineReducers } from 'redux';
import folder from './folder';

const folderStructureApp = combineReducers({
    data : folder
});
export default folderStructureApp;