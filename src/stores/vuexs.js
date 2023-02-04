import axios from 'axios';
import { createStore } from 'vuex'
import idgroup from './Idgroup'
import tortsoft from './Tortsoft'
const store = createStore({
    modules: {
        a: idgroup,
        b: tortsoft
    }
});
export default store