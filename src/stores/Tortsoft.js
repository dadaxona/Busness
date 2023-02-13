import axios from 'axios';
// const http_url = 'https://biznes.5858.uz/api/';
// const http_url = 'https://uz.idsoft.uz/api/';
const http_url = 'http://localhost:1122/api/';
const tortsoft = {
    state: {
        dotator: {
            data: '',
            count: '',
        },
    },
    mutations: {
        // axios({
        //     method: request.method,
        //     url: http_url + request.url2,
        //     data: request
        // }).then(data => {
        //     if (data.data == 200){
        //         localStorage.setItem('auth', JSON.stringify({"auth": true,"username": request.name , "login": request.login2, "biznesty": request.biznes, "token": request.token,"method_id": request.method_id}));
        //         context.commit('OrigiPost_Mut', request)                    
        //     }
        // });
    },
    actions: {
        SqladTor_ac: ({ state, comit }, request) => {
            axios({
                method: request.method,
                url: http_url + request.url,
                data: request
            }).then(data => {
                if (data.data == 404) {
                    
                } else {
                    state.dotator.data = data.data;
                }
            });
        }
    },
    getters: {
        Itmstor(state){
            return state.dotator;
        }
    }
};
export default tortsoft