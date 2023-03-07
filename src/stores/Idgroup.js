import axios from 'axios';
// const http_url = 'https://node.5858.uz/api/';
// const http_url = 'https://uz.idsoft.uz/api/';
// const http_url = 'https://control.idsoft.uz/api/';
const http_url = 'http://localhost:1122/api/';
// const http_url = 'http://beckendm/api/';

var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1;
var day1 = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
var monh = '';
var day = '';
if (month < 10) {
    monh = '0' + month;
} else {
    monh = month;
}
if (day1 < 10) {
    day = '0' + day1;
} else {
    day = day1;
}
const idgroup = {
    state: {
        objectauth2: {
            mijoz: [],
            savdo: [],
            zaqaz: [],
            qarz: [],
            srok: [],
            karzina: [],
            tugl: [],
            magazin: [],
            jonatma: [],
            tug: true
        },
        foydaobj: {
            savdo: 0,
            rasxod: 0,
            chiqishqarz: 0,
            kirishqarz: 0,
            foyda: 0,
            sqlad: 0,
        },
        auth: '',
        Items: [],
        Itemsfiltr: [],
        objects: [],
        objectsearch: [],
        userdata: [],
        objects1: [],
        objects2: [],
        objects3: [],
        objects3search:[],
        objects4: [],
        objects5: [],
        objects6: [],
        objecfiltr: [],
        MijozTel: [],
        status: '',
        jami: '',
        togl: '',
        option: [],
        arxive: [],
        date: year + "-" + monh + "-" + day,
        savdoobj: [],
        ishchila: [],
        Item2: [],
        Item2search: [],
        dbitmsm: [],
        mbal: [],
        oyloks: {
            date: [],
            oylik: [],
        },
        code: true,
        
    },
    mutations: {
        FilterAuthMut: (state) => {
            const auth = JSON.parse(localStorage.getItem('auth'));
            if (auth) {
                if (auth.auth === true) {
                    axios({
                        method: 'post',
                        url: http_url + 'virfiy',
                        data: {
                            login: auth.login,
                            token: auth.token,
                            status: auth.action,
                            magazinId: auth.method_id,
                            date: state.date
                        }
                    }).then(data => {
                        if (data.data.code == 200) {
                            if (data.data.user.login == auth.login && data.data.user.token == auth.token) {
                                state.auth = data.data.user;                    
                                state.objectauth2.mijoz = data.data.mijoz;
                                state.objectauth2.savdo = data.data.savdo;
                                state.objectauth2.tugl = data.data.savdo;
                                state.savdoobj = data.data.sotuv;
                                state.objectauth2.zaqaz = data.data.zaqaz;
                                state.objectauth2.qarz = data.data.karz;
                                state.objectauth2.srok = data.data.srok || [];
                                state.objectauth2.karzina = data.data.karzina;
                                state.objectauth2.magazin = data.data.magazin;
                                state.objectauth2.jonatma = data.data.jonatma || [];
                                if (data.data.user.status == 'brend') {
                                    const auth = JSON.parse(localStorage.getItem('auth'));
                                    if (auth.method_id) {
                                        localStorage.setItem('auth', JSON.stringify({
                                            'auth': true,
                                            'username': data.data.user.username ,
                                            'login': data.data.user.login, 
                                            'biznesty': data.data.user.biznes,
                                            'token': data.data.user.token,
                                            'method_id': auth.method_id,
                                            'method_name': auth.method_name,
                                            'method_chat': auth.method_chat,
                                            'action': data.data.user.status
                                        }));  
                                    } else {
                                        localStorage.setItem('auth', JSON.stringify({
                                            'auth': true,
                                            'username': data.data.user.username ,
                                            'login': data.data.user.login, 
                                            'biznesty': data.data.user.biznes, 
                                            'token': data.data.user.token,
                                            'action': data.data.user.status
                                        }));                                            
                                    }
                                } else {
                                    localStorage.setItem('auth', JSON.stringify({
                                        'auth': true,
                                        'username': data.data.user.username,
                                        'login': data.data.user.login, 
                                        'biznesty': data.data.user.biznes, 
                                        'token': data.data.user.token,
                                        'method_id': data.data.user.magazinId,
                                        'method_name': data.data.user.magazin,
                                        'method_chat': data.data.user.telegram,
                                        'action': data.data.user.status
                                    }));  
                                }
                            } else {
                                localStorage.setItem('auth', JSON.stringify({"auth": false, "username": '', "login": '', "token": '', 'method_id': '', 'method_name': '', 'action': ''}));
                                // window.location.href="/";
                                window.location.href="/";
                            }
                        } else {
                            localStorage.setItem('auth', JSON.stringify({"auth": false, "username": '', "login": '', "token": '', 'method_id': '', 'method_name': '', 'action': ''}));
                            window.location.href="/";
                        }
                    })
                } else {
                    window.location.href="/";
                }
            } else {
                window.location.href="/";
            }
        },

        SignUpMut: (state, datar) => {
            axios({
                method: datar.method,
                url: http_url + datar.url,
                data: datar
            }).then(data => {
                if (data.data.code == 200) {
                    if (data.data.typ == 'brend') {
                        localStorage.setItem('auth', JSON.stringify({
                            "auth": true,
                            "username": data.data.data.username ,
                            "login": data.data.data.login, 
                            "biznesty": data.data.data.biznes, 
                            "token": data.data.data.token,
                            'action': data.data.data.status
                        }));
                        window.location.href="/treding";
                    } else {
                        localStorage.setItem('auth', JSON.stringify({
                            "auth": true,
                            "username": data.data.data.username ,
                            "login": data.data.data.login, 
                            "biznesty": data.data.data.biznes, 
                            "token": data.data.data.token,
                            'method_id': data.data.data.magazinId,
                            'method_name': data.data.data.magazin,
                            'method_chat': data.data.data.telegram,
                            'action': data.data.data.status
                        }));
                        window.location.href="/treding";
                    }
                } else {
                    alert(data.data.msg)
                }
            });
        },

        SessiondMut: () => {
            var auth = JSON.parse(localStorage.getItem('auth'));
            if (auth) {
                if (auth.auth === true) {
                    window.location.href="/treding";
                } else {}                    
            } else {}
        },
        OriginalMethodUrlMutGet: (state, request) => {
            axios({
                method: request.method,
                url: http_url + request.url,
                data: request
            }).then(data => {
                state.objects = data.data.obj;
                state.objectsearch = data.data.obj;
                state.objects4 = data.data.valyuta;
            });
        },
        SqladDBMut: (state, request) => {
            axios({
                method: request.method,
                url: http_url + request.url,
                data: request
            }).then(data => {
                state.objects1 = data.data.data;
                state.objects2 = data.data.data2;
                state.objects3 = data.data.data3;
                state.objects3search = data.data.data3;
                state.objecfiltr = data.data.data3;
                state.objects4 = data.data.data4;
            });
        },
        Zaqaz_Olish_Mut: (state, request) => {
            axios({
                method: request.method,
                url: http_url + request.url,
                data: request
            });
        },
        Live_Telegram_Chet: (state ,request) => {
            const auth = JSON.parse(localStorage.getItem('auth'));
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
                k3+= `Хурмат билан << ${auth.method_name} >>`;
                if (mijoz.telegram) {
                    const auth = JSON.parse(localStorage.getItem('auth'));
                    if (auth.method_chat) {
                        axios({
                            method: 'post',
                            url: "https://api.telegram.org/bot" + auth.method_chat + "/sendMessage",
                            data: {
                                chat_id: mijoz.telegram,
                                text: k3
                            },
                        });
                    } else {
                        
                    }
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
            const local = JSON.parse(localStorage.getItem('sotuv'));
            if (local) {
                state.objects5 = local;
                for (let i = 0; i < local.length; i++) {
                   summa = parseFloat(summa) + parseFloat(local[i]['jami']);
                }
                localStorage.setItem('Jami', JSON.stringify({'summa': summa}));
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
                url: http_url + request.url,
                data: request
            }).then(data => {
                state.savdoobj = data.data;
            });  
        },
        Foyda_Mut: (state, request) => {
            axios({
                method: request.method,
                url: http_url + request.url,
                data: request
            }).then(data => {
                state.foydaobj.savdo = data.data.sav;
                state.foydaobj.rasxod = data.data.chiq;
                state.foydaobj.chiqishqarz = data.data.yet;
                state.foydaobj.kirishqarz = data.data.qarz;
                state.foydaobj.foyda = data.data.foyda;
                state.foydaobj.sqlad = data.data.sql;
            });  
        },
        OrigiPost_Mut: (state, request) => {
            axios({
                method: request.method,
                url: http_url + request.url,
                data: request
            }).then(data => {
                state.userdata = data.data;
            });
        },
        UserProfilDel_Mut: (state, request) => {
            axios({
                method: request.method,
                url: http_url + request.url,
                data: request
            }).then(data => {
                if (data.data == 200) {
                    localStorage.setItem('auth', JSON.stringify({"auth": false, "username": '', "login": '', "token": '', 'method_id': '', 'method_name': '', 'action': ''}));
                    window.location.href="/";
                } else {
                    
                }
            });
        },
        Savdo2_Mut: (state, request) => {
            state.objectauth2.tugl = state.objectauth2.savdo;
            state.objectauth2.tug = true;
        },
        Fil_Mut: (state, request) => {
            if (request.resul) {
                if (request.typ == 1) {            
                    state.objects3 = state.objecfiltr.filter((e) => { if (e.tip == request.resul) return e; });
                } else {
                    state.objects3 = state.objecfiltr.filter((e) => { if (e.adress == request.resul) return e; });
                }                
            } else {
                state.objects3 = state.objecfiltr;
            }
        },
        Saqlas_Kassa_Mut: (state, request) => {
            axios({
                method: request.method,
                url: http_url + request.url,
                data: request
            }).then(data => {
                state.ishchila = data.data;
            });  
        },
        OyliklarMut: (state, request) => {
            axios({
                method: request.method,
                url: http_url + request.url,
                data: request,
            }).then(data => {
                state.oyloks.date = data.data.oylikdata;
                state.oyloks.oylik = data.data.oyliklar;
                state.objects4 = data.data.valyuta;
            });
        },
        OriginalBalansMut: (state, request) => {
            axios({
                method: request.method,
                url: http_url + request.url3,
                data: request,
            }).then(data => { 
                state.mbal = data.data;
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
        Origi_Ac: (context, request) => {
            context.commit('OrigiPost_Mut', request) 
        },
        UserProfilDel_Ac: (context, request) => {
            context.commit('UserProfilDel_Mut', request) 
        },
        OrigiPost_Ac: (context, request) => {
            axios({
                method: request.method,
                url: http_url + request.url2,
                data: request
            }).then(data => {
                if (data.data == 200){
                    localStorage.setItem('auth', JSON.stringify({"auth": true,"username": request.name , "login": request.login2, "biznesty": request.biznes, "token": request.token,"method_id": request.method_id}));
                    context.commit('OrigiPost_Mut', request)                    
                }
            });
        },
        SessiondAc: (context) => {
            context.commit('SessiondMut')
        },
        OriginalMethodUrlGetCiqim: ({commit, state}, request) => {
            if (request.search) {
                state.objects = state.objectsearch.filter((item) => item.qayerga.toLowerCase().includes(request.search));
            } else {
                commit('OriginalMethodUrlMutGet', request)                
            }
        },
        OriginalMethodUrlGet: ({commit, state}, request) => {
            if (request.search) {
                state.objects = state.objectsearch.filter((item) => item.name.toLowerCase().includes(request.search));
            } else {
                commit('OriginalMethodUrlMutGet', request)                
            }
        },
        OriginalMethodUrlPost: (context, request) => {
            axios({
                method: request.method,
                url: http_url + request.url2,
                data: request
            }).then(data => {
                if (data.data == 200){
                    context.commit('OriginalMethodUrlMutGet', request);
                }
            });
        },
        OrigiDate: (context, request) => {
            if (request.id2) {
                axios({
                    method: request.method,
                    url: http_url + request.url2,
                    data: request
                }).then(data => {
                    if (data.data == 200){
                        context.commit('OriginalBalansMut', request)
                    }
                });
            } else {
                axios({
                    method: request.method,
                    url: http_url + request.url2,
                    data: request
                }).then(data => {
                    if (data.data == 200){
                        context.commit('OriginalMethodUrlMutGet', request)
                    }
                });
            }
        },
        SqladDB: ({commit, state}, request) => {
            if (request.search) {
                state.objects3 = state.objects3search.filter((item) => item.name.toLowerCase().includes(request.search));
            } else {
                commit('SqladDBMut', request)
            }
        },
        SqladMethodUrlPost: (context, request) => {
            axios({
                method: request.method,
                url: http_url + request.url2,
                data: request
            }).then(data => {
                if (data.data == 200){
                    context.commit('SqladDBMut', request)
                }
            });
        },
        Live_Search_Sqlad: ({state, commit}, request) => {
            var fild = [];
            var pryamoy = [];
            if (request.search) {
                fild = state.Itemsfiltr.filter((item) => item.name.toLowerCase().includes(request.search));
                if (fild.length > 0) {
                    state.Items = fild;
                    state.code = true;
                } else {
                    const praduct = [];
                    var che = JSON.parse(localStorage.getItem('Checked'));
                    pryamoy = state.Itemsfiltr.find(iteme => { if (iteme.kod == request.search) return iteme; });
                    if (pryamoy) {
                        var sum = '';
                        var olsh = '';
                        var kurs = JSON.parse(localStorage.getItem('Kurs'));
                        if (pryamoy.soni > 0) {
                          if (kurs.uid == 99999) {
                            if (pryamoy.summa == '') {
                              if (che.checke === 1) {
                                sum = pryamoy.sotilish2;
                              } else {
                                sum = pryamoy.sotilish;
                              }
                              olsh = pryamoy.olinish;
                            } else {
                              if (che.checke === 1) {
                                sum = pryamoy.sotilish2 * pryamoy.summa;
                              } else {
                                sum = pryamoy.sotilish * pryamoy.summa;
                              }
                              olsh = pryamoy.olinish * pryamoy.summa;
                            }
                          } else {
                            if (pryamoy.summa == '') {
                              if (che.checke === 1) {
                                sum = pryamoy.sotilish2 / kurs.u;
                              } else {
                                sum = pryamoy.sotilish / kurs.u;
                              }
                              olsh = pryamoy.olinish / kurs.u;
                            } else {
                              if (che.checke === 1) {
                                sum = pryamoy.sotilish2 * pryamoy.summa / kurs.u;
                              } else {
                                sum = pryamoy.sotilish * pryamoy.summa / kurs.u;
                              }
                              olsh = pryamoy.olinish * pryamoy.summa / kurs.u;
                            }
                          }
                        } else {
                          
                        }
                        const local = JSON.parse(localStorage.getItem('sotuv'));
                        if (local) {
                            var fin = local.find(e => { if (e.id === pryamoy.id) return e; })
                            if (fin) {
            
                            } else {
                                local.push({
                                    'id': pryamoy.id,
                                    'name': pryamoy.name,
                                    'shtrix': pryamoy.kod,
                                    'olinish': olsh,
                                    'soni': 1,
                                    'soni2': pryamoy.soni,
                                    'chegirma': 0,
                                    'sotilish': sum,
                                    'sotilish_prise': sum,
                                    'skidka': 0 + ' %',
                                    'jami': sum,
                                    'summa': pryamoy.summa,
                                    'valyuta': pryamoy.valyuta,
                                });
                                localStorage.setItem('sotuv', JSON.stringify(local));                  
                            }
                        } else {
                            praduct.push({
                                'id': pryamoy.id,
                                'name': pryamoy.name,
                                'shtrix': pryamoy.kod,
                                'olinish': olsh,
                                'soni': 1,
                                'soni2': pryamoy.soni,
                                'chegirma': 0,
                                'sotilish': sum,
                                'sotilish_prise': sum,
                                'skidka': 0 + ' %',
                                'jami': sum,
                                'summa': pryamoy.summa,
                                'valyuta': pryamoy.valyuta,
                            })
                            localStorage.setItem('sotuv', JSON.stringify(praduct));
                        }
                        state.code = false;
                    } else { 
                        state.code = false;
                    }
                    state.Items = [];
                }
            } else {
                axios({
                    method: request.method,
                    url: http_url + request.url,
                    data: request
                }).then(data => {
                    state.Items = data.data.data2;
                    state.Itemsfiltr = data.data.data2;
                    state.objects4 = data.data.data4;
                    state.objects6 = data.data.data5;
                });                
            }
            commit('Live_Search_Sotuv_Mut');
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
                    var sq = state.Itemsfiltr.find(e => { if (e.id === parseInt(state.objectauth2.karzina[i].tovar)) return e; });
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
                        "id": sq.id,
                        "name": state.objectauth2.karzina[i].name,
                        "shtrix": state.objectauth2.karzina[i].shtrix,
                        "olinish": state.objectauth2.karzina[i].olinish,
                        "soni": son,
                        "soni2": sq.soni,
                        "chegirma": cheg,
                        "sotilish": state.objectauth2.karzina[i].sotilish,
                        "sotilish_prise": state.objectauth2.karzina[i].sotilish,
                        "skidka": state.objectauth2.karzina[i].skidka,
                        "jami": state.objectauth2.karzina[i].jami,
                        "summa": state.objectauth2.karzina[i].kurs,
                        "valyuta": state.objectauth2.karzina[i].valyuta,
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
            if (kurs == 99999) {
                if (local) {
                    if (local.length > 0) {
                        for (let i = 0; i < local.length; i++) {
                            local[i].olinish = local[i].olinish / request.kurs1;
                            local[i].sotilish = local[i].sotilish / request.kurs1;
                            local[i].sotilish_prise = local[i].sotilish_prise / request.kurs1;
                            local[i].chegirma = local[i].chegirma / request.kurs1;
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
                            local[i].olinish = local[i].olinish * kurs / request.kurs1;
                            local[i].sotilish = local[i].sotilish * kurs / request.kurs1;
                            local[i].sotilish_prise = local[i].sotilish_prise * kurs / request.kurs1;
                            local[i].chegirma = local[i].chegirma * kurs / request.kurs1;
                            local[i].jami = local[i].jami * kurs / request.kurs1;
                            localStorage.setItem('sotuv', JSON.stringify(local));
                        }
                    } else {

                    }
                } else {
                    
                }
            }
            localStorage.setItem('Kurs',  JSON.stringify({'u': request.kurs1, 'uid': request.kursid,  'un': request.kursname}));
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
                url: http_url + request.url2,
                data: request
            }).then(data => {
                if (data.data == 200) {
                    const auth = JSON.parse(localStorage.getItem('auth'));
                    if (request.driver == 1) {
                        var s = request.plastik + request.naqt + request.bank;
                        var k= "";
                        k+= "             " + ` << ${auth.method_name} >> `;
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
                        k+= `          Хурмат билан << ${auth.method_name} >>`;
                        axios({
                            method: 'post',
                            url: "http://printer/api/printer",
                            data: {
                                driver: 'XP-80',
                                text: k
                            }
                        });
                    } else if (request.driver == 2) {
                        var s2 = request.plastik + request.naqt + request.bank;
                        var k2= "";
                        k2+= "      " + ` << ${auth.method_name} >> `;
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
                        k2+= `Хурмат билан << ${auth.method_name} >>`;
                        axios({
                            method: 'post',
                            url: "http://printer/api/printer",
                            data: {
                                driver: 'XP-8',
                                text: k2
                            }
                        });
                    } else {}
                    if (request.mijozId) {
                        context.commit('Live_Telegram_Chet', request);              
                    } else { }
                    localStorage.removeItem('Jami');
                    localStorage.removeItem('sotuv');
                    context.commit('Live_Search_Sotuv_Mut');
                    context.commit('FilterAuthMut');
                } else {
                    
                }
            });
        },
        Tolov_Avt: (context, request) => {
            axios({
                method: request.method,
                url: http_url + request.url,
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
        },
        Foyda_Act: (context, request) => {
            context.commit('Foyda_Mut', request);
        },
        Savdo2_ac: (context, request) => {
            context.commit('Savdo2_Mut', request)
        },
        Fil_Ac: (context, request) => {
            context.commit('Fil_Mut', request);
        },
        Saqlas_Mag: (context, request) => {
            axios({
                method: request.method,
                url: http_url + request.url,
                data: request,
            }).then(data => {
                if (data.data.code == 200) {
                    context.commit('FilterAuthMut')
                } else {
                    alert(data.data.msg)
                }
            });
        },
        Saqlas_Kassa_Get: (context, request) => {
            if (request.item) {
                axios({
                    method: request.method,
                    url: http_url + request.url2,
                    data: request,
                }).then(data => {
                    context.commit('Saqlas_Kassa_Mut', request)        
                });                
            } else {
                context.commit('Saqlas_Kassa_Mut', request) 
            }
        },
        Saqlas_Kassa_Ac: (context, request) => {
            axios({
                method: request.method,
                url: http_url + request.url2,
                data: request,
            }).then(data => {
                if (data.data.code == 200) {
                    context.commit('Saqlas_Kassa_Mut', request)
                } else {
                    alert(data.data.msg)
                }
            });
        },
        Role_Ac: (context, request) => {
            axios({
                method: request.method,
                url: http_url + request.url2,
                data: request,
            }).then(data => {
                if (data.data == 200) {
                    context.commit('Saqlas_Kassa_Mut', request)
                } else { }
            });
        },
        Update_Ky: (context, request) => {
            axios({
                method: request.method,
                url: http_url + request.url,
                data: request.item,
            });
        },
        OriginalTelV: ({state}, request) => {
            if (request.search) {
                state.Item2 = state.Item2search.filter((item) => item.name.toLowerCase().includes(request.search));
            } else {
                axios({
                    method: request.method,
                    url: http_url + request.url,
                    data: request,
                }).then(data => {
                    state.Item2search = data.data;
                    state.Item2 = data.data;
                });                
            }
        },
        ClentGets: ({state}, request) => {
            axios({
                method: request.method,
                url: http_url + request.url,
                data: request,
            }).then(data => {
                state.MijozTel = data.data;
            });
        },
        OriginalM: ({state}, request) => {
            axios({
                method: request.method,
                url: http_url + request.url,
                data: request,
            }).then(data => {
                state.objects6 = data.data.obj;
            });
        },
        GetyArxive: ({state}, request) => {
            axios({
                method: request.method,
                url: http_url + request.url,
                data: request,
            }).then(data => {
                state.arxive = data.data;
            });
        },
        UpdateArxivAct: ({state}, request) => {
            axios({
                method: request.method,
                url: http_url + request.url,
                data: request,
            }).then(data => {
                state.arxive = data.data;
            });
        },
        VariantAct: ({state}, request) => {
            if (request.tip) {
                state.option =  state.objects1.filter((item) => item.name.toLowerCase().includes(request.tip));
            } else {
                state.option = []
            }
        },
        VazvredClickAct: (context, request) => {
            axios({
                method: request.method,
                url: http_url + request.url2,
                data: request
            }).then(data => {
                context.commit('FilterAuthMut');
            });  
        },
        suniyIntelAC: (context, request) => {
            axios({
                method: request.method,
                url: http_url + request.url,
                data: request,
            }).then(data => {
                if (data.data == 200) {
                    context.commit('FilterAuthMut');
                } else { }
            });
        },
        suniyIntelACzaqaz: ({state}, request) => {
            axios({
                method: request.method,
                url: http_url + request.url,
                data: request,
            }).then(data => {
                if (data.data.code == 200) {
                    state.objectauth2.zaqaz = data.data.zaqaz;
                    state.objectauth2.karzina = data.data.karzina;
                    state.objectauth2.jonatma = data.data.jonatma;
                } else {
                    state.objectauth2.zaqaz = [];
                    state.objectauth2.karzina = [];
                    state.objectauth2.jonatma = [];
                }
            });
        },
        JonatishDBSQL: ({commit, state}, request) => {
            axios({
                method: request.method,
                url: http_url + request.url,
                data: request,
            }).then(data => {
                if (data.data.code == 200) {
                    localStorage.removeItem('dbsql');                  
                } else {}
            });
        },
        Olishfn: ({commit, state}, request) => {
            axios({
                method: request.method,
                url: http_url + request.url2,
                data: request,
            }).then(data => {
                state.dbitmsm = data.data;
            });
            commit('SqladDBMut', request)
        },
        CreateSqladdbAc: ({commit, state}, request) => {
            axios({
                method: request.method,
                url: http_url + request.url,
                data: request,
            }).then(data => {
                state.dbitmsm = data.data;
            });
        },
        SqladMethoddb: ({commit, state}, request) => {
            axios({
                method: request.method,
                url: http_url + request.url,
                data: request,
            }).then(data => {
                state.dbitmsm = data.data;
            });
        },
        Oyliklar: ({commit, state}, request) => {
            axios({
                method: request.method,
                url: http_url + request.url,
                data: request,
            }).then(data => { 
                state.oyloks.date = data.data.oylikdata;
                state.oyloks.oylik = data.data.oyliklar;
                state.objects4 = data.data.valyuta;
            });
        },
        OriginalMethodOylik: ({commit, state}, request) => {
            axios({
                method: request.method,
                url: http_url + request.url2,
                data: request,
            }).then(data => {
                commit('OyliklarMut', request)
            });  
        },
        OriginalBalans: ({state}, request) => {
            axios({
                method: request.method,
                url: http_url + request.url,
                data: request,
            }).then(data => { 
                state.mbal = data.data;
            });
        }
    },
    getters: {
        authtenticat (state) {
            return state.auth;
        },
        userdata(state){
            return state.userdata;
        },
        objectauth2(state){
            return state.objectauth2;
        },
        Mdat(state){
            return state.mbal;
        },
        Itemobjoy(state){
            const formatter = new Intl.NumberFormat();
            let rows =  '';
            let rows2 =  [];
            var summ  = '';
            for (let i = 0; i < state.oyloks.date.length; i++) {
                for (let i2 = 0; i2 < state.oyloks.oylik.filter((item) => { if(item.oylikdataId == state.oyloks.date[i].id) return item}).length; i2++) {
                    rows2 += `
                    <tr class="tir">
                        <td>
                            ${state.oyloks.oylik.filter((item) => { if(item.oylikdataId == state.oyloks.date[i].id) return item})[i2].name}
                        </td>
                        <td>
                            ${state.oyloks.oylik.filter((item) => { if(item.oylikdataId == state.oyloks.date[i].id) return item})[i2].sana}
                        </td>
                        <td>
                            ${state.oyloks.oylik.filter((item) => { if(item.oylikdataId == state.oyloks.date[i].id) return item})[i2].koment}
                        </td>
                        <td>
                            ${formatter.format(state.oyloks.oylik.filter((item) => { if(item.oylikdataId == state.oyloks.date[i].id) return item})[i2].summa)} ${state.oyloks.oylik.filter((item) => { if(item.oylikdataId == state.oyloks.date[i].id) return item})[i2].valyuta}
                        </td>
                        <td>
                            <button class="btn-success" id="editoy"
                                data-id="${state.oyloks.oylik.filter((item) => { if(item.oylikdataId == state.oyloks.date[i].id) return item})[i2].id}"
                                data-sana="${state.oyloks.oylik.filter((item) => { if(item.oylikdataId == state.oyloks.date[i].id) return item})[i2].sana}"
                                data-koment="${state.oyloks.oylik.filter((item) => { if(item.oylikdataId == state.oyloks.date[i].id) return item})[i2].koment}"
                                data-summa="${state.oyloks.oylik.filter((item) => { if(item.oylikdataId == state.oyloks.date[i].id) return item})[i2].summa}"
                                data-kurs="${state.oyloks.oylik.filter((item) => { if(item.oylikdataId == state.oyloks.date[i].id) return item})[i2].kurs}"
                                data-valyuta="${state.oyloks.oylik.filter((item) => { if(item.oylikdataId == state.oyloks.date[i].id) return item})[i2].valyuta}"
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                </svg>
                            </button>
                            <button class="btn-danger" id="deloy" data-id="${state.oyloks.oylik.filter((item) => { if(item.oylikdataId == state.oyloks.date[i].id) return item})[i2].id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                </svg>
                            </button>
                        </td>
                    </tr>
                    `;
                }
                summ = parseFloat(state.oyloks.date[i].oylik) - parseFloat(state.oyloks.date[i].jami); 
                rows += `<tr class="tir2">
                            <td>
                                ${state.oyloks.oylik.find(e => { if (e.ishchilarId === state.oyloks.date[i].ishchilarId ) return e; }).name }
                            </td>
                            <td>
                                ${state.oyloks.date[i].sana}
                            </td>
                            <td>
                                ${state.oyloks.oylik.filter((item) => { if(item.oylikdataId == state.oyloks.date[i].id) return item}).length}
                            </td>
                            <td>
                                ${formatter.format(state.oyloks.date[i].oylik)} - ${formatter.format(state.oyloks.date[i].jami)} = ${formatter.format(summ)}
                            </td>
                        </tr>
                    ${rows2}
                `;
                rows2 = '';
                summ = '';
            }
            return rows;
        },
        tablestyil(state){
            const formatter = new Intl.NumberFormat();
            let rows =  '';
            let rows2 =  [];;
            for (let i = 0; i < state.objectauth2.tugl.length; i++) {
                rows2 += `<table class="tabl scroltab">
                    <thead>
                        <tr>
                            <th>Товар</th>
                            <th>Количество</th>
                            <th>Продажи</th>
                            <th>Скидка</th>
                            <th>Протсент</th>
                            <th>Итого</th>
                            <th>Продавец</th>
                        </tr>
                    </thead>
                <tbody>`;
                for (let i2 = 0; i2 < state.savdoobj.filter((item) => { if(item.savdoId == state.objectauth2.tugl[i].id) return item}).length; i2++) {
                    rows2 += `
                        <tr class="tir">
                            <td>
                            ${state.savdoobj.filter((item) => { if(item.savdoId == state.objectauth2.tugl[i].id) return item})[i2].name}
                            </td>
                            <td>
                            ${state.savdoobj.filter((item) => { if(item.savdoId == state.objectauth2.tugl[i].id) return item})[i2].soni}
                            </td>
                            <td>
                            ${formatter.format(state.savdoobj.filter((item) => { if(item.savdoId == state.objectauth2.tugl[i].id) return item})[i2].sotilish)}
                            </td>
                            <td>
                            ${formatter.format(state.savdoobj.filter((item) => { if(item.savdoId == state.objectauth2.tugl[i].id) return item})[i2].chegrma)}
                            </td>
                            <td>
                            ${state.savdoobj.filter((item) => { if(item.savdoId == state.objectauth2.tugl[i].id) return item})[i2].skidka}
                            </td>
                            <td>
                            ${formatter.format(state.savdoobj.filter((item) => { if(item.savdoId == state.objectauth2.tugl[i].id) return item})[i2].jami)} ${state.savdoobj.filter((item) => { if(item.savdoId == state.objectauth2.tugl[i].id) return item})[i2].valyuta}
                            </td>
                            <td>
                            ${state.savdoobj.filter((item) => { if(item.savdoId == state.objectauth2.tugl[i].id) return item})[i2].sotivchi}
                            </td>
                            <td>
                                <button class="btn-danger" id="vazwrad"
                                    data-id="${state.savdoobj.filter((item) => { if(item.savdoId == state.objectauth2.tugl[i].id) return item})[i2].id}"
                                    data-savdoid="${state.savdoobj.filter((item) => { if(item.savdoId == state.objectauth2.tugl[i].id) return item})[i2].savdoId}"
                                    data-name="${state.savdoobj.filter((item) => { if(item.savdoId == state.objectauth2.tugl[i].id) return item})[i2].name}"
                                    data-soni="${state.savdoobj.filter((item) => { if(item.savdoId == state.objectauth2.tugl[i].id) return item})[i2].soni}"
                                    data-vazvratmo="true"
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
                                        <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
                                    </svg>
                                    Возврат
                                </button>
                            </td>
                        </tr>
                    `;
                }
                rows2 += `</tbody></table>`;
                rows += `<tr class="tir2" @click="SavdoBut(${ state.objectauth2.tugl[i].id})">
                <td> 
                    <span style="color: #2b64e2;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                        </svg>
                    </span>
                    ${ state.objectauth2.tugl[i].mijoz}
                </td>
                <td>
                    <span style="color: #6363ff;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-coin" viewBox="0 0 16 16">
                            <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
                        </svg>
                    </span>
                    ${formatter.format( state.objectauth2.tugl[i].jamisumma)} ${ state.objectauth2.tugl[i].valyuta}
                </td>

                <td>
                    <span style="color: #6363ff;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-coin" viewBox="0 0 16 16">
                            <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
                        </svg>
                    </span>
                    ${formatter.format( state.objectauth2.tugl[i].naqt)}
                </td>

                <td>
                    <span style="color: #6363ff;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-coin" viewBox="0 0 16 16">
                            <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
                        </svg>
                    </span>
                    ${formatter.format( state.objectauth2.tugl[i].plastik)}
                </td>

                       <td>
                    <span style="color: #6363ff;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-coin" viewBox="0 0 16 16">
                            <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
                        </svg>
                    </span>
                    ${formatter.format( state.objectauth2.tugl[i].bank)}
                </td>
                <td>
                    <span style="color: #d34e15;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-currency-dollar" viewBox="0 0 16 16">
                            <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
                        </svg>-
                    </span>
                    <span class="text-danger">
                        ${formatter.format( state.objectauth2.tugl[i].karz)}
                    </span>
                </td>
                <td>
                    <span style="color: #1538d3;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
                            <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                          </svg>
                    </span>
                    <span class="mx-2">
                        ${ state.objectauth2.tugl[i].sotivchi}
                    </span>
                </td>
                <td>
                    <span style="color:green">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-calendar-date-fill" viewBox="0 0 16 16">
                            <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zm5.402 9.746c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z"/>
                            <path d="M16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-6.664-1.21c-1.11 0-1.656-.767-1.703-1.407h.683c.043.37.387.82 1.051.82.844 0 1.301-.848 1.305-2.164h-.027c-.153.414-.637.79-1.383.79-.852 0-1.676-.61-1.676-1.77 0-1.137.871-1.809 1.797-1.809 1.172 0 1.953.734 1.953 2.668 0 1.805-.742 2.871-2 2.871zm-2.89-5.435v5.332H5.77V8.079h-.012c-.29.156-.883.52-1.258.777V8.16a12.6 12.6 0 0 1 1.313-.805h.632z"/>
                        </svg>
                    </span>
                    ${ state.objectauth2.tugl[i].sana}
                </td>
                ${rows2}
            </tr>`;
            rows2 = '';
            }
           return rows;
        },
        ishchila(state){
            return state.ishchila;
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
        JamiSummaTorgo(state){
            state.jami;
            var sotilish_prise2 = 0;
            var jami2 = 0;
            var chegirma2 = 0;
            var ddd = 0;
            var jamisdd = 0;
            var natija = 0;
            var coun = 0;
            const local = JSON.parse(localStorage.getItem('sotuv'));
            if (local) {
                for (let i = 0; i < local.length; i++) {
                    sotilish_prise2 +=  parseFloat(local[i].soni) * parseFloat(local[i].sotilish_prise);
                    jami2 += parseFloat(local[i].jami);
                    chegirma2 += parseFloat(local[i].chegirma);
                }
                jamisdd = sotilish_prise2 - jami2;
                natija = sotilish_prise2 / 100;
                ddd = jamisdd / natija;
                coun = local.length;
            } else {
                
            }
            return {
                prise: new Intl.NumberFormat().format(sotilish_prise2),
                jami: new Intl.NumberFormat().format(jami2),
                skidka: new Intl.NumberFormat().format(ddd) + ' %',
                chegir: new Intl.NumberFormat().format(chegirma2),
                coun: coun,
            }
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
        itogaTorgo(state){
            var summa = 0;
            var sht = 0;
            var koli = state.objects3.length;
            for (let i = 0; i <  state.objects3.length; i++) {
                if (state.objects3[i].summa > 0) {
                    summa += parseFloat(state.objects3[i].olinish) * parseFloat(state.objects3[i].summa) * parseFloat(state.objects3[i].soni);
                } else {
                    summa += parseFloat(state.objects3[i].olinish) * parseFloat(state.objects3[i].soni);
                }
            }
            for (let i = 0; i <  state.objects3.length; i++) {
                sht += parseFloat(state.objects3[i].soni);
            }
            return {
                summa,
                sht,
                koli,
            };
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
        },
        foyda(state){
            return state.foydaobj;
        },
        code(state){
            return state.code;
        },
        Item2(state){
            return state.Item2;
        },
        MijozTel(state){
            return state.MijozTel;
        },
        arxive(state){
            var summa = 0;
            for (let i = 0; i < state.arxive.length; i++) {
                if (state.arxive[i].valyuta) {
                    summa += parseFloat(state.arxive[i].soni) * parseFloat(state.arxive[i].summa) * parseFloat(state.arxive[i].kurs);
                } else {
                    summa += state.arxive[i].soni * state.arxive[i].summa;
                }
            }
            return {
                obj: state.arxive,
                JamisummaSotuv: new Intl.NumberFormat().format(summa)

            };
        },
        option1(state){
            return state.option;
        },
        dbitms(state){
            return state.dbitmsm;
        }
    },
};
export default idgroup