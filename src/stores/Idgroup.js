import axios from 'axios';
// const http_url = 'http://biznes.5858.uz/api/';
// const http_url = 'https://biznes.5858.uz/api/';
// const http_url = 'https://uz.idsoft.uz/api/';
const http_url = 'http://localhost:1122/api/';
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1;
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
var monh = '';
if (month < 10) {
  monh = '0' + month;
} else {
  monh = month;
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
        userdata: [],
        objects1: [],
        objects2: [],
        objects3: [],
        objects4: [],
        objects5: [],
        objects6: [],
        objecfiltr: [],
        MijozTel: [],
        status: '',
        jami: '',
        togl: '',
        option: '',
        arxive: [],
        date: year + "-" + monh + "-" + day,
        savdoobj: [],
        ishchila: [],
        Item2: [],
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
                                state.objectauth2.zaqaz = data.data.zaqaz;
                                state.objectauth2.qarz = data.data.karz;
                                state.objectauth2.srok = data.data.srok;
                                state.objectauth2.karzina = data.data.karzina;
                                state.objectauth2.magazin = data.data.magazin;
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
        OriginalMethodUrlGet: (context, request) => {
            context.commit('OriginalMethodUrlMutGet', request)
        },
        OriginalMethodUrlPost: (context, request) => {
            axios({
                method: request.method,
                url: http_url + request.url2,
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
                    var sq = state.Items.find(e => { if (e.id === state.objectauth2.karzina[i].tovar) return e; });
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
            context.commit('Saqlas_Kassa_Mut', request)
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
            axios({
                method: request.method,
                url: http_url + request.url,
                data: request,
            }).then(data => {
                state.Item2 = data.data;
            });
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
            axios({
                method: request.method,
                url: http_url + request.url,
                data: request,
            }).then(data => {
                state.option = data.data;
            });
        },
        VazvredClickAct: (context, request) => {
            axios({
                method: request.method,
                url: http_url + request.url2,
                data: request
            }).then(data => {
                context.commit('SavdoBut_Mut', request);
                // state.savdoobj = data.data;
            });  
        },
        suniyIntelAC: (context, request) => {
            axios({
                method: request.method,
                url: http_url + request.url,
                data: request,
            }).then(data => {
                if (data.data == 200) {
                    context('FilterAuthMut');
                } else { }
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
        option(state){
            return state.option;
        }
    },
};
export default idgroup