import axios from 'axios';
// const http_url = 'https://njs.5155.uz/api/';
// const http_url = 'https://uz.idsoft.uz/api/';
// const http_url = 'https://njs.5858.uz/api/';
const http_url = 'http://localhost:1122/api/';
// const http_url = 'http://beckendm/api/';

import { Chart } from 'chart.js';
const tortsoft = {
    state: {
        foydaobjtorgo: {
            savdo: 0,
            rasxod: 0,
            kirishqarz: 0,
            foyda: 0,

        },
        Itmmag: {
            dbmag: [],
            pradav: [],
            ishch: [],
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
        },
        GetMagazin: ({state, commit}, request) => {
            axios({
                method: request.method,
                url: http_url + request.url,
                data: request
            }).then(data => {
                state.Itmmag.dbmag = data.data.mag;
                state.Itmmag.pradav = data.data.prad;
                state.Itmmag.ishch = data.data.ish;
            });
        }
    },
    getters: {
        nbir(state){
            return state.foydaobjtorgo;
        },
        Itmmag(state){
            return state.Itmmag;
        }
    }
};
export default tortsoft