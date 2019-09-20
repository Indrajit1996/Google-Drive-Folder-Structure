import { combineReducers } from 'redux';
import folder from './folder';

const PortfolioApp = combineReducers({
    data : folder
});
export default PortfolioApp;