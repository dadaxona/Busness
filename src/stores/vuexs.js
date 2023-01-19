import axios from 'axios';
import { createStore } from 'vuex'

const store = createStore({
    state: {
        count: 0,
        auth: '',
        objects: [],
        status: ''
    },
    mutations: {
        FilterAuthMut: (state) => {
            const auth = JSON.parse(localStorage.getItem('auth'));
            if (auth) {
                if (auth.auth === true) {
                    axios({
                        method: 'post',
                        url: 'http://localhost:1122/api/virfiy',
                        data: {
                            login: auth.login,
                            token: auth.token,
                        }
                    }).then(data => {
                        if (data.data) {
                            if (data.data.login == auth.login && data.data.token == auth.token) {
                                state.auth = auth.login;
                            } else {
                                localStorage.setItem('auth', JSON.stringify({"auth": false, "username": '', "login": '', "token": ''}));
                                window.location.href = 'login';
                            }
                        } else {
                            localStorage.setItem('auth', JSON.stringify({"auth": false, "username": '', "login": '', "token": ''}));
                            window.location.href = 'login';
                        }
                    })
                } else {
                    window.location.href = 'login';
                }
            } else {
                window.location.href = 'login';
            }
        },

        SignUpMut: (state, datar) => {
            axios({
                method: datar.method,
                url: 'http://localhost:1122/api/' + datar.url,
                data: datar
            }).then(data => {
                localStorage.setItem('auth', JSON.stringify({"auth": true,"username": data.data.username , "login": data.data.login, "biznesty": data.data.biznes, "token": data.data.token}));
                window.location.href = 'dash';
            });
        },

        SessiondMut: () => {
            var auth = JSON.parse(localStorage.getItem('auth'));
            if (auth) {
                if (auth.auth === true) {
                    window.location.href = 'dash';
                } else {
                    
                }                    
            } else {
                
            }
        },

        UpdateTipMut: (state, data2) => {
            axios({
                method: 'put',
                url: 'http://localhost:1122/api/updatetip',
                data: {
                    id: data2.id,
                    name: data2.name,
                }
              }).then(data => {
                console.log(data.data)
            })
        },
        
        OriginalMethodUrlMutGet: (state, request) => {
            axios({
                method: request.method,
                url: 'http://localhost:1122/api/' + request.url,
                data: request
            }).then(data => {
                state.objects = data.data;
            });
        },
    },
    actions: {
        FilterAuthAc (context) {
            context.commit('FilterAuthMut')
        },
        SignUpAc: (context, data) => {
            context.commit('SignUpMut', data)
        },
        SessiondAc: (context) => {
            context.commit('SessiondMut')
        },
        UpdateTipAc: (context, data2) => {
            context.commit('UpdateTipMut', data2)
        },
        OriginalMethodUrlGet: (context, request) => {
            context.commit('OriginalMethodUrlMutGet', request)
        },
        OriginalMethodUrlPost: (context, request) => {
            axios({
                method: request.method,
                url: 'http://localhost:1122/api/' + request.url2,
                data: request
            }).then(data => {
                if (data.data == 200){
                    context.commit('OriginalMethodUrlMutGet', request)                    
                }
            });
        }
    },
    getters: {
        authtenticat (state) {
            return state.auth;
        },
        Itemobjects (state) {
            return state.objects;
        },
        Status(state){
            return state.status;
        }
    },
});

export default store