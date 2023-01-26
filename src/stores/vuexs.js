import axios from 'axios';
import { createStore } from 'vuex'

const store = createStore({
    state: {
        objectauth: {
            mijoz: '',
            savdo: '',
            zaqaz: '',
            qarz: '',
        },
        auth: '',
        Items: [],
        objects: [],
        objects1: [],
        objects2: [],
        objects3: [],
        objects4: [],
        objects5: [],
        objects6: [],
        status: '',
        jami: '',
        togl: ''
        
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
                            if (data.data.user.login == auth.login && data.data.user.token == auth.token) {
                                state.auth = auth.login;
                                state.objectauth.mijoz = data.data.mijoz;
                                state.objectauth.savdo = data.data.savdo;
                                state.objectauth.qarz = data.data.karz;
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
                } else {}                    
            } else {}
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
        SqladDBMut: (state, request) => {
            axios({
                method: request.method,
                url: 'http://localhost:1122/api/' + request.url,
                data: request
            }).then(data => {
                state.objects1 = data.data.data;
                state.objects2 = data.data.data2;
                state.objects3 = data.data.data3;
                state.objects4 = data.data.data4;
            });
        },
        Live_Search_Sqlad_Mut: (state, request) => {
            axios({
                method: request.method,
                url: 'http://localhost:1122/api/' + request.url,
                data: request
            }).then(data => {
                state.Items = data.data.data2;
                state.objects4 = data.data.data4;
                state.objects6 = data.data.data5;
            });
        },
        Delete_Sotuv_Mut: (state, request) => {
            const local = JSON.parse(localStorage.getItem('sotuv'));
            local.splice(request.i, 1);
            localStorage.setItem('sotuv', JSON.stringify(local));
            const local2 = JSON.parse(localStorage.getItem('sotuv'));
            if (local2) {
                if (local2.length > 0) {
                    state.togl = 1;
                } else {
                    state.togl = '';
                }
            } else {
                state.togl = '';
            }
        },
        Live_Search_Sotuv_Mut: (state) => {
            var summa = 0;
            var foiz = 0;
            var jav = 0;
            const local = JSON.parse(localStorage.getItem('sotuv'));
            if (local) {
                state.objects5 = local;
                for (let i = 0; i < local.length; i++) {
                   summa = parseFloat(summa) + parseFloat(local[i]['jami']);
                   foiz = parseFloat(foiz) + parseFloat(local[i]['chegirma'])
                }
                jav = summa - foiz;
                localStorage.setItem('Jami', JSON.stringify({'summa': jav}));
                const jami = JSON.parse(localStorage.getItem('Jami'));
                state.jami = jami.summa;
                if (local.length > 0) state.togl = 1;
            } else {
                state.objects5 = local;
                state.jami = 0;
                state.togl = '';
            }
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
        },
        SqladDB: (context, request) => {
            context.commit('SqladDBMut', request)
        },
        SqladMethodUrlPost: (context, request) => {
            axios({
                method: request.method,
                url: 'http://localhost:1122/api/' + request.url2,
                data: request
            }).then(data => {
                if (data.data == 200){
                    context.commit('SqladDBMut', request)
                }
            });
        },
        Live_Search_Sqlad: (context, request) => {
            context.commit('Live_Search_Sqlad_Mut', request)
        },
        Live_Search_Sotuv: (context) => {
            context.commit('Live_Search_Sotuv_Mut')
        },
        Sotuvga_Olish_Action: (context, request) => {
            const praduct = [];
            const local = JSON.parse(localStorage.getItem('sotuv'));
            var kurs = JSON.parse(localStorage.getItem('Kurs')).u;
            if (local) {
                var fin = local.find(e => { if (e.id === request.id) return e; })
                if (fin) {

                } else {         
                    local.push(request);
                    localStorage.setItem('sotuv', JSON.stringify(local));                  
                }
            } else {
                praduct.push(request)
                localStorage.setItem('sotuv', JSON.stringify(praduct));
            }
            context.commit('Live_Search_Sotuv_Mut');
        },
        Delete_Sotuv_Ac: (context, request) => {    
            context.commit('Delete_Sotuv_Mut', request);
            context.commit('Live_Search_Sotuv_Mut');
        },
        Plus_Minus_Ac: (context, request) => {
            const local = JSON.parse(localStorage.getItem('sotuv'));
            if (request.type === 'plus') {
                local.find(e => {
                    if (e.id === request.id) {
                        e.jami = parseFloat(e.jami) + parseFloat(e.sotilish);
                        e.soni++
                        if (e.soni > e.soni2) {
                            
                        } else {
                            localStorage.setItem('sotuv', JSON.stringify(local));                            
                        }
                    }else{} 
                });
            } else {
                local.find(p => {
                    if (p.id === request.id) {
                        p.jami = parseFloat(p.jami) - parseFloat(p.sotilish);
                        p.soni--
                        if (p.soni == 0) {
                            context.commit('Delete_Sotuv_Mut', request);
                        } else {
                            localStorage.setItem('sotuv', JSON.stringify(local));
                        }
                    } else {}  
                });
            }
            context.commit('Live_Search_Sotuv_Mut');
        },
        EditStoreg: (context, request) => {
            const local = JSON.parse(localStorage.getItem('sotuv'));
            local.find(e => {
                if (e.id === request.id) {
                    e.sotilish = request.sotilish;
                    e.soni = request.soni;
                    e.chegirma = request.chegirma;
                    e.jami = request.jami;
                    localStorage.setItem('sotuv', JSON.stringify(local));
                }else{} 
            });
            context.commit('Live_Search_Sotuv_Mut');
        },
        Valyuta_Kurs: (context, request) => {
            var kurs = JSON.parse(localStorage.getItem('Kurs')).u;
            const local = JSON.parse(localStorage.getItem('sotuv'));
            if (kurs == 1) {
                if (local) {
                    if (local.length > 0) {
                        for (let i = 0; i < local.length; i++) {
                            local[i].sotilish = local[i].sotilish / request.kurs1;
                            local[i].jami = local[i].jami / request.kurs1;
                            localStorage.setItem('sotuv', JSON.stringify(local));
                        }
                    } else {
                        
                    }                    
                } else {
                    
                }
            } else {
                if (local) {
                    if (local.length > 0) {
                        for (let i = 0; i < local.length; i++) {
                            local[i].sotilish = local[i].sotilish * kurs / request.kurs1;
                            local[i].jami = local[i].jami * kurs / request.kurs1;
                            localStorage.setItem('sotuv', JSON.stringify(local));
                        }
                    } else {
                        
                    }
                } else {
                    
                }
            }
            localStorage.setItem('Kurs',  JSON.stringify({'u': request.kurs1}));
            context.commit('Live_Search_Sotuv_Mut');
        },
        Oplata_Start_Action: (context, request) => {
            axios({
                method: request.method,
                url: 'http://localhost:1122/api/' + request.url2,
                data: request
            }).then(data => {
                if (data.data == 200) {
                    localStorage.removeItem('Jami');
                    localStorage.removeItem('sotuv');
                    context.commit('Live_Search_Sotuv_Mut');
                    context.commit('Live_Search_Sqlad_Mut', request)
                    context.commit('FilterAuthMut')
                } else {
                    
                }
            });
        }
    },
    getters: {
        authtenticat (state) {
            return state.auth;
        },
        objectauth(state){
            return state.objectauth;
        },
        Items (state) {
            return state.Items;
        },
        Sotish (state) {
            return state.objects5;
        },
        JamiSumma(state){
            return new Intl.NumberFormat().format(state.jami);
        },
        JamiSumma2(state){
            return state.jami;
        },
        Itemobjects (state) {
            return state.objects;
        },
        Status(state){
            return state.status;
        },
        tipdata(state){
            return state.objects1;
        },
        adressdata(state){
            return state.objects2;
        },
        objects3(state){
            return state.objects3;
        },
        valyudata(state){
            return state.objects4;
        },
        tog(state){
            return state.togl;
        },
        MijozSelect(state){
            return state.objects6;
        }
    },
});
export default store