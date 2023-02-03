import axios from 'axios';
import { createStore } from 'vuex'

const store = createStore({
    state: {
        objectauth: {
            mijoz: 0,
            savdo: 0,
            savdo2: 0,
            zaqaz: 0,
            qarz: 0,
            srok: 0,
        },
        objectauth2: {
            mijoz: [],
            savdo: [],
            savdo2: [],
            zaqaz: [],
            qarz: [],
            srok: [],
            karzina: []
        },
        auth: '',
        Items: [],
        Itemsfiltr: [],
        objects: [],
        objects1: [],
        objects2: [],
        objects3: [],
        objects4: [],
        objects5: [],
        objects6: [],
        status: '',
        jami: '',
        togl: '',
        date: new Date().toLocaleDateString('en-CA'),
        savdoobj: []
        
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
                            date: state.date
                        }
                    }).then(data => {
                        if (data.data.code == 200) {
                            if (data.data) {
                                if (data.data.user.login == auth.login && data.data.user.token == auth.token) {
                                    state.auth = auth.login;
                                    state.objectauth.mijoz = data.data.mijoz.length;
                                    state.objectauth.savdo = data.data.savdo.length;
                                    state.objectauth.savdo2 = data.data.savdo2.length;
                                    state.objectauth.zaqaz = data.data.zaqaz.length;
                                    state.objectauth.qarz = data.data.karz.length;
                                    state.objectauth.srok = data.data.srok.length;
                        
                                    state.objectauth2.mijoz = data.data.mijoz;
                                    state.objectauth2.savdo = data.data.savdo;
                                    state.objectauth2.savdo2 = data.data.savdo2;
                                    state.objectauth2.zaqaz = data.data.zaqaz;
                                    state.objectauth2.qarz = data.data.karz;
                                    state.objectauth2.srok = data.data.srok;
                                    state.objectauth2.karzina = data.data.karzina;
                                    
                                } else {
                                    localStorage.setItem('auth', JSON.stringify({"auth": false, "username": '', "login": '', "token": ''}));
                                    window.location.href = 'login';
                                }
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
        Zaqaz_Olish_Mut: (state, request) => {
            axios({
                method: request.method,
                url: 'http://localhost:1122/api/' + request.url,
                data: request
            });
        },
        Live_Search_Sqlad_Mut: (state, request) => {
            if (request.search) {
                state.Items = state.Itemsfiltr.filter((item) => item.name.toLowerCase().includes(request.search));
            } else {
                axios({
                    method: request.method,
                    url: 'http://localhost:1122/api/' + request.url,
                    data: request
                }).then(data => {
                    state.Items = data.data.data2;
                    state.Itemsfiltr = data.data.data2;
                    state.objects4 = data.data.data4;
                    state.objects6 = data.data.data5;
                });                
            }
        },
        Live_Telegram_Chet: (state ,request) => {
            var formatter = new Intl.NumberFormat();
            var s = request.plastik + request.naqt + request.bank;
            var mijoz = state.objects6.find(e => { if (e.id === request.mijozId) return e; });
            if (mijoz) {
                var k3= "";
                k3+= "Ассалому алайкум хурматли mijoz сизнинг харидларинггиз ройхати.";
                k3+= " \n";
                k3+= " \n";
                for(let i = 0;i < request.local.length; i++){
                    k3+= ""
                    k3+= request.local[i]["name"];
                    k3+= "--" + request.local[i]["soni"];
                    k3+= "*" + formatter.format(request.local[i]["jami"]);
                    k3+= ";\n";
                    k3+= "Chegirma: " + formatter.format(request.local[i]["chegirma"]);
                    k3+= ";\n";
                }
                k3+= "\n";
                k3+= "Жами суммаси" + " ,    " + formatter.format(request.jamisum);
                k3+= ";\n";
                k3+= "Туланди" + " ,         " + formatter.format(s);
                k3+= ";\n";
                k3+= "Карзинггиз" + " ,      " + formatter.format(request.karz);
                k3+= ";\n";
                k3+= "Тулаш муддати" + " ,   " + request.srok;
                k3+= ";\n";
                k3+= "Жами карзинггиз" + " , " + formatter.format(mijoz.karz);
                k3+= "\n";
                k3+= "\n";
                k3+= "Хурмат билан << ID Group >>";
                if (mijoz.telegram) {
                    axios({
                        method: 'post',
                        url: "https://api.telegram.org/bot5654991728:AAFmwykYzSKGqTdZL5HT-JwyRHTJUGN7Cac/sendMessage",
                        data: {
                            chat_id: mijoz.telegram,
                            text: k3
                        },
                    });
                } else {
                    
                }
            } else {
                
            }
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
        SavdoBut_Mut: (state, request) => {
            axios({
                method: request.method,
                url: 'http://localhost:1122/api/' + request.url,
                data: request
            }).then(data => {
                state.savdoobj = data.data;
            });  
        }
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
        Zaqaz_Olish_Ac: ({ commit, state }, request) => {
            localStorage.setItem('sotuv', JSON.stringify([]));
            const local = JSON.parse(localStorage.getItem('sotuv'));
            for (let i = 0; i < state.objectauth2.karzina.length; i++) {
                if (state.objectauth2.karzina[i].zaqazId == request.id) {
                    var sq = state.Items.find(e => { if (e.id === state.objectauth2.karzina[i].tovar) return e; })
                    var cheg = '';
                    var son = '';
                    if (state.objectauth2.karzina[i].chegrma) {
                        cheg = state.objectauth2.karzina[i].chegrma;
                    } else {
                        cheg = 0;
                    }
                    if (state.objectauth2.karzina[i].soni > sq.soni) {
                        son = sq.soni;
                    } else {
                        son = state.objectauth2.karzina[i].soni;
                    }
                    var sql = {
                        'id': sq.id,
                        'name': state.objectauth2.karzina[i].name,
                        'sotilish': state.objectauth2.karzina[i].sotilish,
                        'soni': son,
                        'soni2': sq.soni,
                        'chegirma': cheg,
                        'jami': state.objectauth2.karzina[i].jami
                    };
                    if (local) {
                        var fin = local.find(e => { if (e.id === sql.id) return e; })
                        if (fin) {
        
                        } else {
                            local.push(sql);
                            localStorage.setItem('sotuv', JSON.stringify(local));
                        }
                    } else {
                        localStorage.setItem('sotuv', JSON.stringify([sql]));
                    }
                } else {
                    
                }
            }
            commit('Live_Search_Sotuv_Mut');
            commit('Zaqaz_Olish_Mut', request);
            commit('FilterAuthMut');
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
        Delet_Stor_act: (context) => {
            localStorage.removeItem('Jami');
            localStorage.removeItem('sotuv');
            context.commit('Live_Search_Sotuv_Mut');
        },
        Oplata_Start_Action: (context, request) => {
            var formatter = new Intl.NumberFormat();
            axios({
                method: request.method,
                url: 'http://localhost:1122/api/' + request.url2,
                data: request
            }).then(data => {
                if (data.data == 200) {
                    if (request.driver == 1) {
                        var s = request.plastik + request.naqt + request.bank;
                        var k= "";
                        k+= "             " + " << ID Group >> ";
                        k+= " \n";
                        k+= "________________________________________________";
                        k+= " \n";
                        for(let i = 0;i < request.local.length; i++){
                            k+= ""
                            k+= request.local[i]["name"];
                            k+= ";\n";
                            k+= request.local[i]["soni"];
                            k+= "*" + formatter.format(request.local[i]["jami"]);
                            k+= ";\n";
                            k+= "Chegirma: " + formatter.format(request.local[i]["chegirma"]);
                            k+= ";\n";
                            k+= "------------------------------------------------";
                            k+= "\n";
                        }
                        k+= "________________________________________________";
                        k+= "\n";
                        k+= "Жами суммаси: " + "    " + formatter.format(request.jamisum);
                        k+= ";\n";
                        k+= "Туланди: " + "         " + formatter.format(s);
                        k+= ";\n";
                        k+= "Карзинггиз: " + "      " + formatter.format(request.karz);
                        k+= ";\n";
                        k+= "Тулаш муддати: " + "   " + request.srok;
                        k+= ";\n";
                        k+= "------------------------------------------------";
                        k+= ";\n";
                        k+= "          Хурмат билан << ID Group >>";
                        axios({
                            method: 'post',
                            url: "http://printer/api/printer",
                            data: {
                                driver: 'XP-80',
                                text: k
                            }
                        });
                    } else {
                        var s2 = request.plastik + request.naqt + request.bank;
                        var k2= "";
                        k2+= "      " + " << ID Group >> ";
                        k2+= " \n";
                        k2+= "________________________________";
                        k2+= " \n";
                        for(let i = 0;i < request.local.length; i++){
                            k2+= ""
                            k2+= request.local[i]["name"];
                            k2+= ";\n";
                            k2+= request.local[i]["soni"];
                            k2+= "*" + formatter.format(request.local[i]["jami"]);
                            k2+= ";\n";
                            k2+= "Chegirma: " + formatter.format(request.local[i]["chegirma"]);
                            k2+= ";\n";
                            k2+= "--------------------------------";
                            k2+= "\n";
                        }
                        k2+= "________________________________";
                        k2+= "\n";
                        k2+= "Жами суммаси" + " ,    " + formatter.format(request.jamisum);
                        k2+= ";\n";
                        k2+= "Туланди" + " ,         " + formatter.format(s2);
                        k2+= ";\n";
                        k2+= "Карзинггиз" + " ,      " + formatter.format(request.karz);
                        k2+= ";\n";
                        k2+= "Тулаш муддати" + " ,   " + request.srok;
                        k2+= ";\n";
                        k2+= "--------------------------------";
                        k+= ";\n";
                        k2+= "Хурмат билан << ID Group >>";
                        axios({
                            method: 'post',
                            url: "http://printer/api/printer",
                            data: {
                                driver: 'XP-8',
                                text: k2
                            }
                        });
                    }
                    if (request.mijozId) {
                        context.commit('Live_Telegram_Chet', request);              
                    } else { }
                    localStorage.removeItem('Jami');
                    localStorage.removeItem('sotuv');
                    context.commit('Live_Search_Sqlad_Mut', request)
                    context.commit('Live_Search_Sotuv_Mut');
                    context.commit('FilterAuthMut');
                } else {
                    
                }
            });
        },
        Tolov_Avt: (context, request) => {
            axios({
                method: request.method,
                url: 'http://localhost:1122/api/' + request.url,
                data: request,
            }).then(data => {
                if (data.data == 200) {
                    context.commit('FilterAuthMut')
                } else {
                    
                }
            });
        },
        SavdoBut_Ac: (context, request) => {
            context.commit('SavdoBut_Mut', request);
        }
    },
    getters: {
        authtenticat (state) {
            return state.auth;
        },
        objectauth(state){
            return state.objectauth;
        },
        objectauth2(state){
            return state.objectauth2;
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
        },
        savdoobj(state){
            return state.savdoobj;
        },
        JamisummaSotuv(state){
            var s = 0;
            for (let i = 0; i < state.savdoobj.length; i++) {
                s += parseFloat(state.savdoobj[i].jami);
            }
            return s;

        }
    },
});
export default store