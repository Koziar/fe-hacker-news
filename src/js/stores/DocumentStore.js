import Dispatcher from '../Dispatcher';
import BaseStore from '../BaseStore';
import Constants from '../Constants';
import assign from 'object-assign';
import lodash from 'lodash';

let _posts = [];

/* Private Functions */
function setPosts(data) {
    _posts = data;
}

/* Flux Store Creation */
const Store = assign({}, BaseStore, {
    getPosts() {
        return _posts;
    },

    dispatcherIndex: Dispatcher.register(function(payload) {
        let action = payload.action;
        switch (action.type) {
            case 'FETCHED_POSTS':
                if (action.data) {
                    setPosts(action.data);
                }
                break;
            default:
                return;
        }
        // If action was responded to, emit change event
        Store.emitChange();
        return;
    })
});

export default Store;