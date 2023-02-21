import axios from 'axios';
// const http_url = 'http://biznes.5858.uz/api/';
// const http_url = 'https://biznes.5858.uz/api/';
// const http_url = 'https://uz.idsoft.uz/api/';
const http_url = 'http://localhost:1122/api/';
const tortsoft = {
    state: {
        foydaobjtorgo: {
            savdo: 0,
            rasxod: 0,
            kirishqarz: 0,
            foyda: 0,
        },
    },
    mutations: {
        Foyda_Act_bugun_Mut: (state, request) => {
            axios({
                method: request.method,
                url: http_url + request.url,
                data: request
            }).then(data => {
                if (data.data.code == 200) {                    
                    state.foydaobjtorgo.savdo = data.data.sav;
                    state.foydaobjtorgo.rasxod = data.data.chiq;
                    state.foydaobjtorgo.kirishqarz = data.data.qarz;
                    state.foydaobjtorgo.foyda = data.data.foyda;
                } else {
                }
            });
        }
    },
    actions: {
        Foyda_Act_bugun: (context, request) => {
            context.commit('Foyda_Act_bugun_Mut', request);
        }
    },
    getters: {
        nbir(state){
            return state.foydaobjtorgo;
        }
    }
};
export default tortsoft