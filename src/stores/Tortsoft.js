import axios from 'axios';
// const http_url = 'https://njs.5155.uz/api/';
// const http_url = 'https://uz.idsoft.uz/api/';
const http_url = 'https://njs.5858.uz/api/';
// const http_url = 'http://localhost:1122/api/';
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
            savdos: [],
            dbmag: [],
            pradav: [],
            ishch: [],
            rasxd2: [],
        },
        Zada: {
            ish: [],
            zad: []
        }
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
                } else {}
            });
        },
        Zadacha_Create_Mut: (state, request) => {
            axios({
                method: request.method,
                url: http_url + request.url,
                data: request
            }).then(data => {
                state.Zada.ish = data.data.ish;
                state.Zada.zad = data.data.zad;
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
                state.Itmmag.savdos = data.data.savdo;
                state.Itmmag.dbmag = data.data.mag;
                state.Itmmag.pradav = data.data.prad;
                state.Itmmag.ishch = data.data.ish;
                state.Itmmag.rasxd2 = data.data.rasxod;
            });
        },
        Zadacha_Ac: ({state, commit}, request) => {
            axios({
                method: request.method,
                url: http_url + request.url,
                data: request
            }).then(data => {
                state.Zada.ish = data.data.ish;
                state.Zada.zad = data.data.zad;
            });
        },
        Zadacha_Create_Ac: (context, request) => {
            axios({
                method: request.method,
                url: http_url + request.url2,
                data: request
            }).then(data => {
                // if (data.data.code == 200) {
                    context.commit('Zadacha_Create_Mut', request);
                // } else {}
            });
        },
        Zadacha_Update_Ac: ({state, commit}, request) => {
            axios({
                method: request.method,
                url: http_url + request.url2,
                data: request
            });
        },
        Delete_zada_Ac: (context, request) => {
            axios({
                method: request.method,
                url: http_url + request.url2,
                data: request
            }).then(data => {
                // if (data.data.code == 200) {
                    context.commit('Zadacha_Create_Mut', request);
                // } else {}
            });
        }
    },
    getters: {
        nbir(state){
            return state.foydaobjtorgo;
        },
        Itmmag(state){
            return state.Itmmag;
        },
        IshchiZad(state){
            return state.Zada;
        }
    }
};
export default tortsoft