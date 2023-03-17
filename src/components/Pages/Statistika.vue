<script>
    import { RouterLink } from 'vue-router';
    import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
    const local = JSON.parse(localStorage.getItem('sotuv'));
    const auth = JSON.parse(localStorage.getItem('auth'));
    const kurs = JSON.parse(localStorage.getItem('Kurs'));
    const format = new Intl.NumberFormat();
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
    export default {
        data() {
            return {
                login:'',
                token:'',
                statustyp: '',
                data1: '',
                data2: '',
                magazin: '',
                mijoz: '',
                mijoztip: '',
                tipv: '',
                pradave: '',
                magazinish: [],
                clentlarni: [],
                clentarray: [],                
                chartData: [],
            }
        },
        methods: {
            ...mapActions([
                'FilterAuthAc',
                'GetMagazin',
            ]),
            Localstor(){
                this.login = auth.login,
                this.token = auth.token,
                this.statustyp = auth.action
            },
            FilterAuth(){
                this.FilterAuthAc();
            },
            getMagazinfn(){
                const auth = JSON.parse(localStorage.getItem('auth'));
                if (auth.method_id) {
                    this.GetMagazin({
                        'method': 'post',
                        'url': 'etagazin_fn',
                        'login': this.login,
                        'token': this.token,
                        'status': this.statustyp,
                        'magazinId': auth.method_id,
                        'magazin': auth.method_name,
                    });
                }else{}
            },
            ochistit(){
                this.data1 = '';
                this.data2 = '';
                this.magazin = '';
                this.mijoz = '';
                this.mijoztip = '';
                this.tipv = '';
                this.pradave = '';
                this.magazinish = [];
                this.clentlarni = [];
                this.chartData = [];
                this.stchart();
            },
            fncl(arg){
                this.data1 = '';
                this.data2 = '';
                this.mijoz = '';
                this.mijoztip = '';
                this.tipv = '';
                this.pradave = '';
                this.chartData = [];
                const cl = this.Itmmag.pradav.filter((items) => { return items.magazinId == arg; });
                if (cl.length > 0) {
                    this.clentlarni = cl;
                } else {
                    this.clentlarni = [];
                }
                const cl2 = this.Itmmag.ishch.filter((items) => { return items.magazinId == arg; });
                if (cl2.length > 0) {
                    this.magazinish = cl2;
                } else {
                    this.magazinish = [];
                }
                this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == arg) return item; });
                if (this.clentarray.length > 0) {
                    for (let i = 0; i < this.clentarray.length; i++) {
                        var sum = '';
                        var san = this.chartData.find(e => { if(e.sana == this.clentarray[i].sana) return e;});
                        if (san) {
                            if (this.clentarray[i].valyuta) {
                                san.summa = parseFloat(this.clentarray[i].jamisumma) * parseFloat(this.clentarray[i].kurs);
                            } else {
                                san.summa = parseFloat(this.clentarray[i].jamisumma);
                            }
                        } else {
                            if (this.clentarray[i].valyuta) {
                                sum = parseFloat(this.clentarray[i].jamisumma) * parseFloat(this.clentarray[i].kurs);
                            } else {
                                sum = parseFloat(this.clentarray[i].jamisumma);
                            }
                            this.chartData.push({'sana': this.clentarray[i].sana, 'summa': sum });
                        }
                    }
                } else {
                    this.chartData = [];
                }
                this.stchart();
            },
            data1ch(){
                this.data2 = '';
                this.mijoz = '';
                this.tipv = '';
                this.mijoztip = '';
                this.pradave = '';
                this.chartData = [];
                if (this.magazin) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sana == this.data1) return item; });
                } else {
                    this.clentarray = [];
                }
                if (this.clentarray.length > 0) {
                    for (let i = 0; i < this.clentarray.length; i++) {
                        var sum = '';
                        var san = this.chartData.find(e => { if(e.sana == this.clentarray[i].sana) return e;});
                        if (san) {
                            if (this.clentarray[i].valyuta) {
                                san.summa = parseFloat(this.clentarray[i].jamisumma) * parseFloat(this.clentarray[i].kurs);
                            } else {
                                san.summa = parseFloat(this.clentarray[i].jamisumma);
                            }
                        } else {
                            if (this.clentarray[i].valyuta) {
                                sum = parseFloat(this.clentarray[i].jamisumma) * parseFloat(this.clentarray[i].kurs);
                            } else {
                                sum = parseFloat(this.clentarray[i].jamisumma);
                            }
                            this.chartData.push({'sana': this.clentarray[i].sana, 'summa': sum });
                        }
                    }
                } else {
                    this.chartData = [];
                }
                this.stchart();
            },
            data1ch2(){
                this.mijoz = '';
                this.tipv = '';
                this.mijoztip = '';
                this.pradave = '';
                this.chartData = [];
                if (this.magazin) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sana >= this.data1 && item.sana <= this.data2) return item; });
                } else {
                    this.clentarray = [];
                }
                if (this.clentarray.length > 0) {
                    for (let i = 0; i < this.clentarray.length; i++) {
                        var sum = '';
                        var san = this.chartData.find(e => { if(e.sana == this.clentarray[i].sana) return e;});
                        if (san) {
                            if (this.clentarray[i].valyuta) {
                                san.summa = parseFloat(this.clentarray[i].jamisumma) * parseFloat(this.clentarray[i].kurs);
                            } else {
                                san.summa = parseFloat(this.clentarray[i].jamisumma);
                            }
                        } else {
                            if (this.clentarray[i].valyuta) {
                                sum = parseFloat(this.clentarray[i].jamisumma) * parseFloat(this.clentarray[i].kurs);
                            } else {
                                sum = parseFloat(this.clentarray[i].jamisumma);
                            }
                            this.chartData.push({'sana': this.clentarray[i].sana, 'summa': sum });
                        }
                    }
                } else {
                    this.chartData = [];
                }
                this.stchart();
            },
            mijoztipfn(typ){
                this.mijoz = '';
                this.tipv = '';
                this.mijoztip = typ;
                this.pradave = '';
                this.chartData = [];
                if (typ == 1 && this.data1 && this.data2) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.mijozId > 0 && item.sana >= this.data1 && item.sana <= this.data2) return item; });
                } else if(typ == 1 && this.data1) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.mijozId > 0 && item.sana == this.data1) return item; });
                } else if (this.data1 && this.data2) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.mijozId == 0 && item.sana >= this.data1 && item.sana <= this.data2) return item; });
                } else if (this.data1) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.mijozId == 0 && item.sana == this.data1) return item; });
                } else {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.mijozId == 0) return item; });
                }
                if (this.clentarray.length > 0) {
                    for (let i = 0; i < this.clentarray.length; i++) {
                        var sum = '';
                        var san = this.chartData.find(e => { if(e.sana == this.clentarray[i].sana) return e;});
                        if (san) {
                            if (this.clentarray[i].valyuta) {
                                san.summa = parseFloat(this.clentarray[i].jamisumma) * parseFloat(this.clentarray[i].kurs);
                            } else {
                                san.summa = parseFloat(this.clentarray[i].jamisumma);
                            }
                        } else {
                            if (this.clentarray[i].valyuta) {
                                sum = parseFloat(this.clentarray[i].jamisumma) * parseFloat(this.clentarray[i].kurs);
                            } else {
                                sum = parseFloat(this.clentarray[i].jamisumma);
                            }
                            this.chartData.push({'sana': this.clentarray[i].sana, 'summa': sum });
                        }
                    }
                } else {
                    this.chartData = [];
                }
                this.stchart();
            },
            mijozfn(items){
                this.tipv = '';
                this.pradave = '';
                this.chartData = [];
                if (this.magazin && this.mijoztip == 1 && this.data1 && this.data2) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sana >= this.data1 && item.sana <= this.data2 && item.mijoz == items) return item; });
                } else if (this.magazin && this.mijoztip == 1 && this.data1) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sana == this.data1 && item.mijoz == items) return item; });
                } else if (this.magazin && this.mijoztip == 1) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.mijoz == items) return item; });
                } else {
                    this.clentarray = [];
                }
                if (this.clentarray.length > 0) {
                    for (let i = 0; i < this.clentarray.length; i++) {
                        var sum = '';
                        var san = this.chartData.find(e => { if(e.sana == this.clentarray[i].sana) return e;});
                        if (san) {
                            if (this.clentarray[i].valyuta) {
                                san.summa = parseFloat(this.clentarray[i].jamisumma) * parseFloat(this.clentarray[i].kurs);
                            } else {
                                san.summa = parseFloat(this.clentarray[i].jamisumma);
                            }
                        } else {
                            if (this.clentarray[i].valyuta) {
                                sum = parseFloat(this.clentarray[i].jamisumma) * parseFloat(this.clentarray[i].kurs);
                            } else {
                                sum = parseFloat(this.clentarray[i].jamisumma);
                            }
                            this.chartData.push({'sana': this.clentarray[i].sana, 'summa': sum });
                        }
                    }
                } else {
                    this.chartData = [];
                }
                this.stchart();
            },
            tips(typ){
                this.pradave = '';
                this.chartData = [];
                if (this.magazin && typ == 1 && this.data1 && this.data2) {
                    if (this.magazin && this.mijoztip == 1 && this.mijoz) {
                        this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sana >= this.data1 && item.sana <= this.data2 && item.mijoz == this.mijoz && item.jamisumma > 0) return item; });
                    } else if (this.magazin && this.mijoztip == 1) {
                        this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sana >= this.data1 && item.sana <= this.data2 && item.jamisumma > 0) return item; });
                    } else {
                        this.clentarray = [];
                    }
                } else if (this.magazin && typ == 1 && this.data1) {
                    if (this.magazin && this.mijoztip == 1 && this.mijoz) {
                        this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sana == this.data1 && item.mijoz == this.mijoz && item.jamisumma > 0) return item; });
                    } else if (this.magazin && this.mijoztip == 1) {
                        this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sana == this.data1 && item.jamisumma > 0) return item; });
                    } else {
                        this.clentarray = [];
                    }
                } else if (this.magazin && typ == 1) {
                    if (this.magazin && this.mijoztip == 1 && this.mijoz) {
                        this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.mijoz == this.mijoz && item.jamisumma > 0) return item; });
                    } else if (this.magazin && this.mijoztip == 1) {
                        this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.jamisumma > 0) return item; });
                    } else {
                        this.clentarray = [];
                    }
                } else {
                    if (this.magazin && this.mijoztip == 1 && this.mijoz && this.data1 && this.data2) {
                        this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.mijoz == this.mijoz && item.sana >= this.data1 && item.sana <= this.data2 && item.karz > 0) return item; });
                    } else if (this.magazin && this.mijoztip == 1 && this.mijoz && this.data1) {
                        this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.mijoz == this.mijoz && item.sana == this.data1 && item.karz > 0) return item; });
                    } else if (this.magazin && this.mijoztip == 1 && this.data1 && this.data2) {
                        this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sana >= this.data1 && item.sana <= this.data2  && item.karz > 0) return item; });
                    } else if (this.magazin && this.mijoztip == 1 && this.data1) {
                        this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sana == this.data1 && item.karz > 0) return item; });
                    } else if (this.magazin && this.mijoztip == 1) {
                        this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.karz > 0) return item; });
                    } else {
                        this.clentarray = [];
                    }
                }
                if (this.clentarray.length > 0) {
                    for (let i = 0; i < this.clentarray.length; i++) {
                        var sum = '';
                        var san = this.chartData.find(e => { if(e.sana == this.clentarray[i].sana) return e;});
                        if (san) {
                            if (this.clentarray[i].valyuta) {
                                san.summa = parseFloat(this.clentarray[i].jamisumma) * parseFloat(this.clentarray[i].kurs);
                            } else {
                                san.summa = parseFloat(this.clentarray[i].jamisumma);
                            }
                        } else {
                            if (this.clentarray[i].valyuta) {
                                sum = parseFloat(this.clentarray[i].jamisumma) * parseFloat(this.clentarray[i].kurs);
                            } else {
                                sum = parseFloat(this.clentarray[i].jamisumma);
                            }
                            this.chartData.push({'sana': this.clentarray[i].sana, 'summa': sum });
                        }
                    }
                } else {
                    this.chartData = [];
                }
                this.stchart();
            },
            prodaverts(items){
                this.chartData = [];
                if (this.magazin && this.mijoztip == 1 && this.mijoz && this.tipv == 1 && this.data1 && this.data2) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sotivchi == items && item.mijoz == this.mijoz && item.sana >= this.data1 && item.sana <= this.data2 && item.jamisumma > 0) return item; });
                } else if (this.magazin && this.mijoztip == 1 && this.mijoz && this.tipv == 1 && this.data1) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sotivchi == items && item.mijoz == this.mijoz && item.sana == this.data1 && item.jamisumma > 0) return item; });            
                } else if (this.magazin && this.mijoztip == 1 && this.mijoz && this.tipv == 1) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sotivchi == items && item.mijoz == this.mijoz && item.jamisumma > 0) return item; });            
                } else if (this.magazin && this.mijoztip == 1 && this.mijoz && this.tipv == 2 && this.data1 && this.data2) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sotivchi == items && item.mijoz == this.mijoz && item.sana >= this.data1 && item.sana <= this.data2 && item.karz > 0) return item; });            
                } else if (this.magazin && this.mijoztip == 1 && this.mijoz && this.tipv == 2 && this.data1) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sotivchi == items && item.mijoz == this.mijoz && item.sana == this.data1 && item.karz > 0) return item; });            
                } else if (this.magazin && this.mijoztip == 1 && this.mijoz && this.tipv == 2) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sotivchi == items && item.mijoz == this.mijoz && item.karz > 0) return item; });            
                } else if (this.magazin && this.mijoztip == 1 && this.tipv == 2) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sotivchi == items && item.karz > 0) return item; });               
                } else if (this.magazin && this.mijoztip == 1 && this.mijoz && this.data1 && this.data2) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sotivchi == items && item.mijoz == this.mijoz && item.sana >= this.data1 && item.sana <= this.data2) return item; });            
                } else if (this.magazin && this.mijoztip == 1 && this.mijoz && this.data1) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sotivchi == items && item.mijoz == this.mijoz && item.sana == this.data1) return item; });            
                } else if (this.magazin && this.mijoztip == 1 && this.mijoz) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sotivchi == items && item.mijoz == this.mijoz) return item; });            
                } else if (this.magazin && this.mijoztip == 1 && this.data1 && this.data2) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sotivchi == items && item.mijozId > 0 && item.sana >= this.data1 && item.sana <= this.data2) return item; });            
                } else if (this.magazin && this.mijoztip == 1 && this.data1) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sotivchi == items && item.mijozId > 0 && item.sana == this.data1) return item; });            
                } else if (this.magazin && this.mijoztip == 1) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sotivchi == items && item.mijozId > 0) return item; });            
                } else if (this.magazin && this.mijoztip == 2 && this.data1 && this.data2) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sotivchi == items && item.mijozId == 0 && item.sana >= this.data1 && item.sana <= this.data2) return item; });            
                } else if (this.magazin && this.mijoztip == 2 && this.data1) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sotivchi == items && item.mijozId == 0 && item.sana == this.data1) return item; });            
                } else if (this.magazin && this.mijoztip == 2) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sotivchi == items && item.mijozId == 0) return item; });            
                } else if (this.magazin && this.data1 && this.data2) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sotivchi == items && item.sana >= this.data1 && item.sana <= this.data2) return item; });            
                } else if (this.magazin && this.data1) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sotivchi == items && item.sana == this.data1) return item; });            
                } else if (this.magazin) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sotivchi == items) return item; });
                } else {
                    this.clentarray = [];
                }

                if (this.clentarray.length > 0) {
                    for (let i = 0; i < this.clentarray.length; i++) {
                        var sum = '';
                        var san = this.chartData.find(e => { if(e.sana == this.clentarray[i].sana) return e;});
                        if (san) {
                            if (this.clentarray[i].valyuta) {
                                san.summa = parseFloat(this.clentarray[i].jamisumma) * parseFloat(this.clentarray[i].kurs);
                            } else {
                                san.summa = parseFloat(this.clentarray[i].jamisumma);
                            }
                        } else {
                            if (this.clentarray[i].valyuta) {
                                sum = parseFloat(this.clentarray[i].jamisumma) * parseFloat(this.clentarray[i].kurs);
                            } else {
                                sum = parseFloat(this.clentarray[i].jamisumma);
                            }
                            this.chartData.push({'sana': this.clentarray[i].sana, 'summa': sum });
                        }
                    }
                } else {
                    this.chartData = [];
                }
                this.stchart();
            },
            dolgisum(){
                this.mijoz = '';
                this.tipv = '';
                this.mijoztip = '';
                this.pradave = '';
                if (this.magazin && this.data1 && this.data2) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sana >= this.data1 && item.sana <= this.data2 && item.karz > 0) return item; });  
                } else if (this.magazin && this.data1) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.sana == this.data1 && item.karz > 0) return item; });  
                } else if (this.magazin) {
                    this.clentarray = this.Itmmag.savdos.filter((item) => { if(item.magazinId == this.magazin && item.karz > 0) return item; });  
                } else {
                    this.clentarray = [];
                }

                if (this.clentarray.length > 0) {
                    for (let i = 0; i < this.clentarray.length; i++) {
                        var sum = '';
                        var san = this.chartData.find(e => { if(e.sana == this.clentarray[i].sana) return e;});
                        if (san) {
                            if (this.clentarray[i].valyuta) {
                                san.summa = parseFloat(this.clentarray[i].jamisumma) * parseFloat(this.clentarray[i].kurs);
                            } else {
                                san.summa = parseFloat(this.clentarray[i].jamisumma);
                            }
                        } else {
                            if (this.clentarray[i].valyuta) {
                                sum = parseFloat(this.clentarray[i].jamisumma) * parseFloat(this.clentarray[i].kurs);
                            } else {
                                sum = parseFloat(this.clentarray[i].jamisumma);
                            }
                            this.chartData.push({'sana': this.clentarray[i].sana, 'summa': sum });
                        }
                    }
                } else {
                    this.chartData = [];
                }
                this.stchart();
            },
            rasxodsum(){
                this.mijoz = '';
                this.tipv = '';
                this.mijoztip = '';
                this.pradave = '';
                this.chartData = [];
                this.clentarray = [];
                if (this.magazin && this.data1 && this.data2) {
                    this.clentarray = this.Itmmag.rasxd2.filter((item) => { if(item.magazinId == this.magazin && item.sana >= this.data1 && item.sana <= this.data2) return item; });  
                } else if (this.magazin && this.data1) {
                    this.clentarray = this.Itmmag.rasxd2.filter((item) => { if(item.magazinId == this.magazin && item.sana == this.data1) return item; });  
                } else if (this.magazin) {
                    this.clentarray = this.Itmmag.rasxd2.filter((item) => { if(item.magazinId == this.magazin) return item; });  
                } else {
                    this.clentarray = [];
                }
                if (this.clentarray.length > 0) {
                    for (let i = 0; i < this.clentarray.length; i++) {
                        var sum = '';
                        var san = this.chartData.find(e => { if(e.sana == this.clentarray[i].sana) return e;});
                        if (san) {
                            if (this.clentarray[i].valyuta) {
                                san.summa = parseFloat(this.clentarray[i].summa) * parseFloat(this.clentarray[i].kurs);
                            } else {
                                san.summa = parseFloat(this.clentarray[i].summa);
                            }
                        } else {
                            if (this.clentarray[i].valyuta) {
                                sum = parseFloat(this.clentarray[i].summa) * parseFloat(this.clentarray[i].kurs);
                            } else {
                                sum = parseFloat(this.clentarray[i].summa);
                            }
                            this.chartData.push({'sana': this.clentarray[i].sana, 'summa': sum });
                        }
                    }
                } else {
                    this.chartData = [];
                }
                this.stchart();
            },
            stchart(){
                var dataPoints = [];
                for (var i = 0; i < this.chartData.length; i++) {
                    dataPoints.push({
                        label: this.chartData[i].sana,
                        y: this.chartData[i].summa
                    });
                }
                var chart = new CanvasJS.Chart("chartContainer", {
                    animationEnabled: true,
                    theme: "light2",
                    title: {
                        text: "Отдел Статистика"
                    },
                    axisY: {
                        title: "Сумма",
                        titleFontSize: 24,
                        includeZero: true
                    },
                    data: [{
                        type: "column",
                        yValueFormatString: "#,### Units",
                        dataPoints: dataPoints
                        
                    }]
                });
                chart.render();
            },
        },
        computed: {
            ...mapGetters({
                Itmmag: 'Itmmag',
                objectauth2: 'objectauth2',
                savdoobj: 'savdoobj'
            }),
        },

        mounted() {
            this.FilterAuth();
            this.Localstor();
            this.getMagazinfn();
            this.stchart();
        }
    }
</script>

<template>
    <div class="row">
        <div class="col-2">
            <select class="form-control" v-on:change="fncl(magazin)" v-model="magazin">
                <option value="">--Выбирать магазин--</option>
                <option v-for="iteme in Itmmag.dbmag" :value="iteme.id">{{ iteme.name }}</option>
            </select>
        </div>
        <div class="col-2">
            <input type="date" class="form-control" v-on:change="data1ch" v-model="data1">
        </div>
        <div class="col-2">
            <input type="date" class="form-control" v-on:change="data1ch2" v-model="data2">
        </div>
        <div class="col-2">
            <select class="form-control" v-on:change="mijoztipfn(mijoztip)" v-model="mijoztip">
                <option value="">--Выбирать тип клент--</option>
                <option value="1">Оптвий</option>
                <option value="2">Рознишниь</option>
            </select>
        </div>
        <div class="col-2">
            <select class="form-control" v-on:change="mijozfn(mijoz)" v-model="mijoz">
                <option value="">--Выбирать клент--</option>
                <option v-for="iteme in clentlarni" :value="iteme.name">{{ iteme.name }}</option>
            </select>
        </div>
        <div class="col-2">
            <select class="form-control" v-on:change="tips(tipv)" v-model="tipv">
                <option value="">--Выбирать тип--</option>
                <option value="1">Продаж</option>
                <option value="2">Долги</option>
            </select>
        </div>
        <div class="col-2 mt-3">
            <select class="form-control" v-on:change="prodaverts(pradave)" v-model="pradave">
                <option value="">--Выбирать продавец--</option>
                <option v-for="iteme in magazinish" :value="iteme.name">{{ iteme.name }}</option>
            </select>
        </div>
        <div class="col-2 mt-3">
            <button class="btn btn-danger btn-sm" v-on:click="dolgisum" style="width: 100%;">Долги</button>
        </div>
        <div class="col-2 mt-3">
            <button class="btn btn-danger btn-sm" v-on:click="rasxodsum" style="width: 100%;">Расход</button>
        </div>
        <div class="col-2 mt-3">
            <button class="btn btn-warning btn-sm" v-on:click="ochistit" style="width: 100%;">Очистит</button>
        </div>
    </div>
    <div id="chartContainer" style="height: 400px; width: 100%; margin-top: 10px;"></div>
</template>
