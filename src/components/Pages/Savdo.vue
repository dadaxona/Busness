<script>
  import { RouterLink } from 'vue-router'
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
  const local = JSON.parse(localStorage.getItem('sotuv'))
  const auth = JSON.parse(localStorage.getItem('auth'));
  const kurs = JSON.parse(localStorage.getItem('Kurs'));
  import { saveExcel } from '@progress/kendo-vue-excel-export';
  import printJS from 'print-js'
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
        search: '',
        id: '',
        name: '',
        soni: '',
        soni2: '',
        summa: '',
        jami: '',
        skidka: '',
        kurs: '',
        checke: '',
        Jamisum: '',
        mijozs: '',
        naqt: '',
        plastik: '',
        bank: '',
        karz: '',
        qaytim: '',
        controlkarz: '',
        srok: '',
        drive: '',
        mijozsumma: '',
        clentsumma: '',
        clentkarz: '',
        date:  year + "-" + monh + "-" + day,
        chesxbox: '',
        Kamentariya: '',
        Kamentariya2: '',
        showModalEditor: false,
        ModalOplate: false,
        someJSONdata: []
      }
    },
    methods: {
      ...mapMutations([
        'Live_Search_Sotuv_Mut'
      ]),
      ...mapActions([
        'FilterAuthAc',
        'Live_Search_Sqlad',
        'Live_Search_Sotuv',
        'Sotuvga_Olish_Action',
        'Delete_Sotuv_Ac',
        'Plus_Minus_Ac',
        'EditStoreg',
        'Valyuta_Kurs',
        'Oplata_Start_Action',
        'Driver_Act',
        'Delet_Stor_act',
        'OriginalM'
      ]),
      Localstor(){
        this.login = auth.login,
        this.token = auth.token,
        this.statustyp = auth.action
      },
      FilterAuth(){
        this.FilterAuthAc();
      },
      Sqlad(){
        if (auth.method_id) {
          this.Live_Search_Sqlad({
            'method': 'post',
            'url': 'live_search',
            'login': this.login,
            'token': this.token,
            'magazinId': auth.method_id,
            'magazin': auth.method_name,
            'status': this.statustyp,
          });
        } else {}
      },
      Deletsotuv(id, jami){
        this.Delete_Sotuv_Ac({
          'i': id,
          'jami': jami
        });
      },
      Sotuvga_Olish(obj){
        var sum = '';
        var olsh = '';
        const kurs = JSON.parse(localStorage.getItem('Kurs'));
        if (obj.soni > 0) {
          if (kurs.uid == 99999) {
            if (obj.summa == '') {
              if (this.checke === 1) {
                sum = obj.sotilish2;
              } else {
                sum = obj.sotilish;
              }
              olsh = obj.olinish;
            } else {
              if (this.checke === 1) {
                sum = obj.sotilish2 * obj.summa;
              } else {
                sum = obj.sotilish * obj.summa;
              }
              olsh = obj.olinish * obj.summa;
            }
          } else {
            if (obj.summa == '') {
              if (this.checke === 1) {
                sum = obj.sotilish2 / kurs.u;
              } else {
                sum = obj.sotilish / kurs.u;
              }
              olsh = obj.olinish / kurs.u;
            } else {
              if (this.checke === 1) {
                sum = obj.sotilish2 * obj.summa / kurs.u;
              } else {
                sum = obj.sotilish * obj.summa / kurs.u;
              }
              olsh = obj.olinish * obj.summa / kurs.u;
            }
          }
          this.Sotuvga_Olish_Action({
            // 'id': obj.id,
            // 'name': obj.name,
            // 'olinish': olsh,
            // 'soni': 1,
            // 'soni2': obj.soni,
            // 'chegirma': 0,
            // 'sotilish': sum,
            // 'jami': sum,
            // 'summa': obj.summa,
            // 'valyuta': obj.valyuta,

            'id': obj.id,
            'name': obj.name,
            'shtrix': obj.kod,
            'olinish': olsh,
            'soni': 1,
            'soni2': obj.soni,
            'chegirma': 0,
            'sotilish': sum,
            'sotilish_prise': sum,
            'skidka': 0 + ' %',
            'jami': sum,
            'summa': obj.summa,
            'valyuta': obj.valyuta,
          });
        } else {
          
        }
      },
      Minus(id, i, typ){
        this.Plus_Minus_Ac({
          'id': id,
          'i': i,
          'type': typ
        });
      },
      Plus(id, i, typ){
        this.Plus_Minus_Ac({
          'id': id,
          'i': i,
          'type': typ
        });
      },
      editr(data){
        this.id = data.id,
        this.name = data.name,
        this.soni = data.soni,
        this.soni2 = data.soni2,
        this.summa = data.sotilish,
        this.jami = data.jami,
        this.skidka = data.chegirma,
        this.showModalEditor = true
      },
      CreateEdit(){
        this.EditStoreg({
          'id': this.id,
          'sotilish': this.summa,
          'soni': this.soni,
          'chegirma': this.skidka,
          'jami': this.jami,
        });
        this.Clears();
      },
      Clears(){
        this.id = '',
        this.name = '',
        this.soni = '',
        this.soni2 = '',
        this.summa = '',
        this.jami = '',
        this.skidka = '',
        this.Jamisum = '',
        this.mijozs = '',
        this.qaytim = '',
        this.naqt = '',
        this.plastik = '',
        this.bank = '',
        this.karz = '',
        this.srok = '',
        this.drive = '',
        this.chesxbox = '',
        this.Kamentariya = '',
        this.Kamentariya2 = '',
        this.clentsumma = '';
        this.clentkarz = '';
        this.showModalEditor = false,
        this.ModalOplate = false
      },
      chesx(){
        if (this.chesxbox === 1) {
          this.chesxbox = 0;
        } else {
          this.chesxbox = 1;
        }
      },
      sonival(val){
        if (val > this.soni2) {
          this.jami = this.summa * this.soni2;
          this.soni = this.soni2;
        } else {
          this.jami = this.summa * val;
        }
      },
      summaval(val){
        this.jami = this.soni * val;
      },
      jamival(val){
        this.summa = val / this.soni;
      },
      skidkaval(val){
        if (val > 0) {
          this.jami = this.jami - val * this.jami / 100;
        } else {
          this.jami = this.summa * this.soni;
        }
      },
      toogler(u){
        var id = '';
        var name = '';
        var summa = '';
        if (u === 99999) {
          id = 99999;
          name = '';
          summa = '1';
        } else {
          const data = this.valyudata.find(e => { return e.id == u });
          id = data.id;
          name = data.name;
          summa = data.summa;
        }
        this.Valyuta_Kurs({
          'kursid': id,
          'kurs1': summa,
          'kursname': name,
        });
      },
      toogler2(){
        var kur =JSON.parse(localStorage.getItem('Kurs'));
        if (kur) {
          this.kurs = JSON.parse(localStorage.getItem('Kurs')).uid;
        } else {
          localStorage.setItem('Kurs',  JSON.stringify({'u': '1', 'uid': '99999',  'un': ''}));
          this.kurs = 99999;
        }
      },
      checkedTyp(foo){
        localStorage.setItem('Checked',  JSON.stringify({'chesked': foo}));
        this.checkedTyp3();
      },     
      checkedTyp3(){
        var che = JSON.parse(localStorage.getItem('Checked'));
        if (che) {
          this.checke = che.chesked;
        } else {
          localStorage.setItem('Checked',  JSON.stringify({'chesked': 1}));
          var che2 = JSON.parse(localStorage.getItem('Checked'));
          this.checke = che2.chesked;
        }
      },
      oplate(typ){
        this.ModalOplate = typ;
        this.Jamisum = this.JamiSumma2;
        this.karz = this.JamiSumma2;
      },
      clentsummafn(row){
        this.karz = this.JamiSumma2;
        this.qaytim = '';
        var kur =JSON.parse(localStorage.getItem('Kurs'));
        if (kur.uid === 99999) {
          var clm = this.MijozSelect.find(e => { if (e.id === row) return e; });
          if (clm) {
            if (clm.valyuta) {
              this.controlkarz = clm.summa * clm.kurs;
              if (this.karz <= this.controlkarz) {
                this.qaytim = this.controlkarz - this.karz;
                this.karz = 0;
              } else {
                this.karz = this.karz - this.controlkarz;
              }
              this.clentsumma = '$ + '+ format.format(clm.summa * clm.kurs);
              this.clentkarz = '$ + ' + format.format(clm.karz * clm.kurs);
            } else {
              this.controlkarz = clm.summa;
              if (this.karz <= this.controlkarz) {
                this.qaytim = this.controlkarz - this.karz;
                this.karz = 0;
              } else {
                this.karz = this.karz - this.controlkarz;
              }
              this.clentsumma = '$ + '+ format.format(clm.summa);
              this.clentkarz = '$ + ' + format.format(clm.karz);
            }
          } else {
            this.clentsumma = '';
            this.clentkarz = '';
          }
        } else {
          var clm = this.MijozSelect.find(e => { if (e.id === row) return e; });
          if (clm) {
            if (clm.valyuta) {
              this.controlkarz = clm.summa * clm.kurs / kur.u;
              if (this.karz <= this.controlkarz) {
                this.qaytim = this.controlkarz - this.karz;
                this.karz = 0;
              } else {
                this.karz = this.karz - this.controlkarz;
              }
              this.clentsumma = '$ + '+ format.format(clm.summa * clm.kurs / kur.u);
              this.clentkarz = '$ + ' + format.format(clm.karz * clm.kurs / kur.u);
            } else {
              this.controlkarz = clm.summa / kur.u;
              if (this.karz <= this.controlkarz) {
                this.qaytim = this.controlkarz - this.karz;
                this.karz = 0;
              } else {
                this.karz = this.karz - this.controlkarz;
              }
              this.clentsumma = '$ + '+ format.format(clm.summa / kur.u);
              this.clentkarz = '$ + ' + format.format(clm.karz / kur.u);
            }
          } else {
            this.clentsumma = '';
            this.clentkarz = '';
          }
        }
      },
      naqt1(valyu){
        this.JamiSum = parseFloat(this.JamiSumma2) - parseFloat(valyu) - this.plastik - this.bank;
        this.karz = this.JamiSum - this.controlkarz;
      },
      plastik1(valyu){
        this.JamiSum = parseFloat(this.JamiSumma2) - parseFloat(valyu) - this.naqt - this.bank;
        this.karz = this.JamiSum - this.controlkarz;
      },
      bank1(valyu){
        this.JamiSum = parseFloat(this.JamiSumma2) - parseFloat(valyu) - this.plastik - this.naqt;
        this.karz = this.JamiSum - this.controlkarz;
      },
      naqinp(){
        this.plastik = '';
        this.bank = '';
        this.karz = 0;
        this.naqt = this.JamiSumma2 - this.controlkarz;
      },
      plasinp(){
        this.naqt = '';
        this.bank = '';
        this.karz = 0;
        this.plastik = this.JamiSumma2 - this.controlkarz;
      },
      bankinp(){
        this.naqt = '';
        this.plastik = '';
        this.karz = 0;
        this.bank = this.JamiSumma2 - this.controlkarz;
      },
      OplataStart(){
        if (auth.method_id) {
          if (this.chesxbox == 1 && this.Kamentariya) {
            this.Oplata_Start_Action({
              'method': 'post',
              'url2': 'karzina',
              'url': 'live_search',
              'name': this.Kamentariya,
              'login': this.login,
              'token': this.token,
              'magazinId': auth.method_id,
              'magazin': auth.method_name,
              'status': this.statustyp,
              'local': JSON.parse(localStorage.getItem('sotuv'))
            }); 
          } else {
            const kurs2 = JSON.parse(localStorage.getItem('Kurs'));  
            this.Oplata_Start_Action({
              'method': 'post',
              'url2': 'oplata',
              'url': 'live_search',
              'driver': this.drive,
              'jamisum': this.JamiSumma2,
              'mijozId': this.mijozs,
              'naqt': this.naqt,
              'plastik': this.plastik,
              'bank': this.bank,
              'karz': this.karz,
              'qaytim': this.qaytim,
              'srok': this.srok,
              'sana': this.date,
              'vid': kurs2.uid,
              'vname': kurs2.un,
              'vsumma': kurs2.u,
              'login': this.login,
              'token': this.token,
              'magazinId': auth.method_id,
              'magazin': auth.method_name,
              'status': this.statustyp,
              'local': JSON.parse(localStorage.getItem('sotuv'))
            });
          }
          this.Clears();
        } else {}
      },
      driverpMount(){
        var dri =JSON.parse(localStorage.getItem('Driver'));
        if (dri) {
          this.drive = JSON.parse(localStorage.getItem('Driver')).d;
        } else {
          localStorage.setItem('Driver',  JSON.stringify({'d': 1}));
          this.drive = 1;
        }
      },
      dr(d){
        localStorage.setItem('Driver',  JSON.stringify({'d': d}));
        this.driverpMount();
      },
      deletStor(){
        this.Delet_Stor_act();
      },
      cadasd(){
        if (this.codecler == false) {
          this.search = '';
        } else {
          this.search;
        }
      },
      UpdateSotilish(item){
        const local1 = JSON.parse(localStorage.getItem('sotuv'));
        var pris = 0;
        var natija = 0;
        local1.find(e => {
          if (e.id === item.id) {
            pris = e.sotilish_prise * e.soni;
            e.sotilish = item.sotilish;
            e.chegirma = pris - e.soni * e.sotilish;
            natija = pris / 100;
            var ddd = e.chegirma / natija
            var sss = format.format(ddd)
            e.skidka = sss + ' %';
            e.jami = pris - e.chegirma;
          }else{}
        });
        localStorage.setItem('sotuv', JSON.stringify(local1));
        this.Live_Search_Sotuv_Mut();
      },
      UpdateSon(item){
        var pris = 0;
        var natija = 0;
        const local2 = JSON.parse(localStorage.getItem('sotuv'));
        local2.find(e => {
          if (e.id === item.id) {
            if (e.soni2 > item.soni) {
              e.soni = item.soni;
            } else {
              e.soni = e.soni2;
            }
            pris = e.sotilish_prise * e.soni;
            e.sotilish = item.sotilish;
            e.chegirma = pris - e.soni * e.sotilish;
            natija = pris / 100;
            var ddd = e.chegirma / natija
            var sss = format.format(ddd)
            e.skidka = sss + ' %';
            e.jami = pris - e.chegirma;
          }else{}
        });
        localStorage.setItem('sotuv', JSON.stringify(local2));
        this.Live_Search_Sotuv_Mut();
      },
      UpdateChgirma(item){
        var pris = 0;
        var natija = 0;
        const local3 = JSON.parse(localStorage.getItem('sotuv'));
          local3.find(e => {
            if (e.id === item.id) {
              pris = e.sotilish_prise * e.soni;
              e.sotilish = item.sotilish;
              e.chegirma = item.chegirma;
              natija = pris / 100;
              var ddd = e.chegirma / natija
              var sss = format.format(ddd)
              e.skidka = sss + ' %';
              e.jami = pris - e.chegirma;
            }else{}
          });
          localStorage.setItem('sotuv', JSON.stringify(local3));
        this.Live_Search_Sotuv_Mut();
      },
      exportExcel () {
        saveExcel({
          data: JSON.parse(localStorage.getItem('sotuv')),
          fileName: "Export",
          columns: [
            {field: 'id'},
            {field: 'name'},
            {field: 'shtrix'},
            {field: 'olinish'},
            {field: 'soni'},
            {field: 'soni2'},
            {field: 'chegirma'},
            {field: 'sotilish'},
            {field: 'sotilish_prise'},
            {field: 'skidka'},
            {field: 'jami'},
            {field: 'summa'},
            {field: 'valyuta'}
            ]
          });
      },

      suniyIntel(){
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (auth.method_id) {
          this.OriginalM({
              'method': 'post',
              'url': 'mijozget',
              'login': this.login,
              'token': this.token,
              'magazinId': auth.method_id,
              'magazin': auth.method_name,
              'status': this.statustyp,
          });
        }else{}
      },
      dadadadad(){
        console.log(this.date)
      }
    },
    watch: {
      search(row){
        if (auth.method_id) {
          this.Live_Search_Sqlad({
            'method': 'post',
            'url': 'live_search',
            'search': row,
            'login': this.login,
            'token': this.token,
            'status': this.statustyp,
            'magazinId': auth.method_id,
            'magazin': auth.method_name,
          });
          this.cadasd();
        }else {}
      },
      Kamentariya(r){
        if (r) {
          this.Kamentariya2 = 1;
        } else {
          this.Kamentariya2 = 0;
        }
      },
    },
    computed: {
      ...mapGetters({
        Items: 'Items',
        Sotish: 'Sotish',
        JamiSumma: 'JamiSumma',
        JamiSumma2: 'JamiSumma2',
        valyudata: 'valyudata',
        MijozSelect: 'MijozSelect',
        tog: 'tog',
        drive: 'drive',
        objectauth2: 'objectauth2',
        codecler: 'code',
      }),
    },
    mounted() {
      this.FilterAuth();
      this.Localstor();
      this.Sqlad();
      this.toogler2();
      this.driverpMount();
      this.checkedTyp3();
      this.suniyIntel();
    }
  }
</script>
<template>
  <div class="row mb-1">
    <div class="col-md-10 mb-3">
      <div class="card text-left">
          <div class="card-body">
            <div v-if="tog">
              <button class="btn btn-success btn-sm m-1" v-on:click="exportExcel" type="button">Ехсел</button>
              <button class="btn btn-primary btn-sm m-1" onclick="createpdf('myDiv')" type="button">Пдф</button>
              <button class="btn btn-danger btn-sm m-1" type="button" v-on:click="deletStor">Удалить</button>
            </div>
            <div v-else>
              <button class="btn btn-light btn-sm m-1" type="button" v-on:click="dadadadad">Ехсел</button>
              <button class="btn btn-light btn-sm m-1" type="button">Пдф</button>
              <button class="btn btn-light btn-sm m-1" type="button">Удалить</button>
            </div>
              <div class="table-responsive">
                <div class="scroltab2">
                  <table class="tabl scroltab">
                    <thead>
                      <tr>
                        <td>Товар</td>
                        <td>Штрих код</td>
                        <td>Количество</td>
                        <td>Цена прайсу</td>
                        <td>Цена</td>
                        <td>Вид скидки</td>
                        <td>% Скидки</td>
                        <td>Итого</td>
                        <td>Удалить</td>
                    </tr>
                    </thead>
                    <tbody>
                      <!-- <tr v-for="(item, index) in Sotish" :key="item.id" class="tir">
                        <td>
                          <input type="text" class="keyinp_son" v-model="item.name" disabled>
                        </td>
                        <td>
                          <input type="text" class="keyinp_son" v-on:keyup="UpdateSotilish(item)" v-model="item.sotilish">
                        </td>
                        <td>
                          <input type="number" class="keyinp_son" v-on:keyup="UpdateSon(item)" v-model="item.soni">
                        </td>
                        <td>
                          <input type="text" class="keyinp_son" v-on:keyup="UpdateChgirma(item)" v-model="item.chegirma">
                        </td>
                        <td>
                          <input type="text" class="keyinp_son" v-on:keyup="UpdateJami(item)" v-model="item.jami">
                        </td>
                        <td>
                          <a class="text-danger" v-on:click="Deletsotuv(index, item.jami)">
                            <i class="nav-icon i-Close-Window font-weight-bold"></i>
                          </a>
                        </td>
                      </tr> -->

                      <tr v-for="(item, index) in Sotish" :key="item.id" class="tir">
                        <td>
                          <input type="text" class="keyinp_son" v-model="item.name" disabled>
                        </td>
                        <td>
                          <input type="text" class="keyinp_son" v-model="item.shtrix" disabled>
                        </td>
                        <td>
                          <input type="number" class="keyinp_son" v-on:keyup="UpdateSon(item)" v-model="item.soni">
                        </td>
                        <td>
                          <input type="text" class="keyinp_son" v-model="item.sotilish_prise" disabled>
                        </td>
                        <td>
                          <input type="text" class="keyinp_son" v-on:keyup="UpdateSotilish(item)" v-model="item.sotilish">
                        </td>
                        <td>
                          <input type="text" class="keyinp_son" v-on:keyup="UpdateChgirma(item)" v-model="item.chegirma">
                        </td>
                        <td>
                          <input type="text" class="keyinp_son" v-model="item.skidka" disabled>
                        </td>
                        <td>
                          <input type="text" class="keyinp_son" v-model="item.jami" disabled>
                        </td>
                        <td>
                          <a class="text-danger" v-on:click="Deletsotuv(index, item.jami)">
                            <i class="nav-icon i-Close-Window font-weight-bold"></i>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
          </div>
      </div>
    </div>
    <div class="col-md-2 mb-3">
      <div class="card bg-body rounded p-3 higgg">
        <div class="row mt-2 border-bottom">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-dollar position-absolute mx-2" viewBox="0 0 16 16">
            <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
          </svg>
          <div class="col-12">
           <h4 class="text-right">{{ JamiSumma }}</h4>
          </div>
        </div>
        <div class="row border-bottom mt-3 pb-3">
          <select class="form-control text-center" v-on:change="toogler(kurs)" v-model="kurs">
            <option :value="99999">--Выбирать--</option>
            <option v-for="iteme in valyudata" :value="iteme.id">{{ iteme.name }}</option>
          </select>
        </div>
        <div v-if="checke == 1">
          <div class="row mt-3">
            <div class="col-4">
              <input class="form-check-input mx-1" type="checkbox" checked>
            </div>
            <div class="col-8 text-right">
              Стандартная
            </div>
          </div>
          <div class="row mt-2 border-bottom">
            <div class="col-4">
              <input class="form-check-input mx-1" type="checkbox" v-on:click="checkedTyp(0)">
            </div>
            <div class="col-8 text-right">
              Низкая
            </div>
          </div>
        </div>
        <div v-if="checke == 0">
          <div class="row mt-3">
            <div class="col-4">
              <input class="form-check-input mx-1" type="checkbox" v-on:click="checkedTyp(1)">
            </div>
            <div class="col-8 text-right">
              Стандартная
            </div>
          </div>
          <div class="row mt-2 border-bottom">
            <div class="col-4">
              <input class="form-check-input mx-1" type="checkbox" checked>
            </div>
            <div class="col-8 text-right">
              Низкая
            </div>
          </div>
        </div>
        <div v-if="drive == 1">
          <div class="row">
            <div class="col-12 text-center border-bottom">
              Printer Driver
            </div>
            <div class="col-6">
              <span>XP-80</span><input class="form-check-input ml-2" type="checkbox" checked>
            </div>
            <div class="col-6">
              <span>XP-58</span><input class="form-check-input ml-2" type="checkbox" v-on:click="dr(2)">
            </div>
          </div>
        </div>
        <div v-else>
          <div class="row">
            <div class="col-12 text-center">
              Printer Driver
            </div>
            <div class="col-6">
              <span>XP-80</span><input class="form-check-input ml-2" type="checkbox" v-on:click="dr(1)">
            </div>
            <div class="col-6">
              <span>XP-58</span><input class="form-check-input ml-2" type="checkbox" checked>
            </div>
          </div>
        </div>
        <div v-if="tog">
          <div class="row">
            <button class="btn btn-success mt-2 widt" v-on:click="oplate(true)">
              Оплата
            </button>
          </div>
        </div>
        <div v-else>
          <div class="row">
            <button class="btn btn-light mt-2 widt">
              Оплата
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mb-1">
    <div class="col-md-12 mb-3">
        <div class="card text-left">
            <div class="card-body">            
              <div class="serc mb-2">
                <input type='text' id="search" v-model="search" class="searchbar" />
              </div>
                <div class="table-responsive">
                  <div class="scroltab2">
                    <table class="tabl scroltab">
                      <thead>
                          <tr>
                              <th>Товар</th>
                              <th>Шт</th>
                              <th>Низкая</th>
                              <th>Стандартная</th>
                          </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in Items" :key="item.id" v-on:click="Sotuvga_Olish(item)" class="tir">
                          <td>{{ item.name }}</td>
                          <td>{{ item.soni }}</td>
                          <td>{{ item.sotilish }}</td>
                          <td>{{ item.sotilish2 }} {{ item.valyuta }}</td>
                        </tr>
                      </tbody>
                  </table>
                  </div>
                </div>
            </div>
        </div>
    </div>   
  </div>
  <div v-if="showModalEditor">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">{{name}}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" v-on:click="showModalEditor = false">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-6 form-group mb-3">
                      <label for="firstName1">Количество</label>
                      <input class="form-control" type="number" v-on:keyup="sonival(soni)" v-model="soni">
                  </div>
                  <div class="col-md-6 form-group mb-3">
                    <label for="firstName1">Сумма</label>
                    <input class="form-control" type="text" v-on:keyup="summaval(summa)" v-model="summa">
                  </div>
                  <div class="col-md-12 form-group mb-3">
                    <label for="firstName1">Итого</label>
                    <input class="form-control" type="text" v-on:keyup="jamival(jami)" v-model="jami">
                  </div>
                  <div class="col-md-12 form-group mb-3">
                    <label for="firstName1">Скидки</label>
                    <input class="form-control" type="text" v-on:keyup="skidkaval(skidka)" v-model="skidka">
                  </div>
              </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="showModalEditor = false">Назад</button>
                <button type="button" class="btn btn-primary" v-on:click="CreateEdit">Сохранить</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>

  <div v-if="ModalOplate" class="modal_okn">
    <div class="modal_okna">
      <div class="modal-header">
        <h5 class="modal-title mt-0">Окно продаж</h5>
        <button type="button" class="close text-danger" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" v-on:click="ModalOplate = false">&times;</span>
        </button>
      </div>
      <div class="modal-body mt-0">
        <div class="row mt-0">
          <div class="col-md-6 form-group mt-0">
              <label for="firstName1">Итого Сумма</label>
              <input class="form-control" type="text" v-model="JamiSumma" disabled>
          </div>
          <div class="col-md-6 form-group mt-0">
            <label for="firstName1">Слент выбирать</label>
            <select class="form-control" v-on:change="clentsummafn(mijozs)" v-model="mijozs">
              <option value="">-- Выбирать --</option>
              <option v-for="itema in MijozSelect" :value="itema.id">{{ itema.name }}</option>
            </select>
            <span class="text-primary position-absolute">{{ clentsumma }}</span>
            <span class="text-danger mt-3 position-absolute">{{ clentkarz }}</span>
          </div>
          <div class="col-md-12 form-group mt-0">
            <label for="firstName1">Наличные</label>
            <div class="row">
              <div class="col-10">
                <input class="form-control" type="text" v-on:keyup="naqt1(naqt)" v-model="naqt">
              </div>
              <div class="col-1">
                <button class="btn btn-success" v-on:click="naqinp">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-unindent" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M13 8a.5.5 0 0 0-.5-.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H12.5A.5.5 0 0 0 13 8Z"/>
                    <path fill-rule="evenodd" d="M3.5 4a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 1 0v-7a.5.5 0 0 0-.5-.5Z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-12 form-group mt-0">
            <label for="firstName1">Карта</label>
            <div class="row">
              <div class="col-10">
                <input class="form-control" type="text" v-on:keyup="plastik1(plastik)" v-model="plastik">
              </div>
              <div class="col-1">
                <button class="btn btn-success" v-on:click="plasinp">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-unindent" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M13 8a.5.5 0 0 0-.5-.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H12.5A.5.5 0 0 0 13 8Z"/>
                    <path fill-rule="evenodd" d="M3.5 4a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 1 0v-7a.5.5 0 0 0-.5-.5Z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-12 form-group mt-0">
            <label for="firstName1">Банк</label>
            <div class="row">
              <div class="col-10">
                <input class="form-control" type="text" v-on:keyup="bank1(bank)" v-model="bank">
              </div>
              <div class="col-1">
                <button class="btn btn-success" v-on:click="bankinp">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-unindent" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M13 8a.5.5 0 0 0-.5-.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H12.5A.5.5 0 0 0 13 8Z"/>
                    <path fill-rule="evenodd" d="M3.5 4a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 1 0v-7a.5.5 0 0 0-.5-.5Z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-12 form-group mt-0">
            <label>Долг</label>
            <input class="form-control" type="text" v-model="karz" disabled>
          </div>
          <div class="col-md-12 form-group mt-0">
            <label>Cохранить заказ</label>
            <div class="row text-right">
              <div class="col-1">
                <input class="form-check-input" type="checkbox" v-on:click="chesx">
              </div>
              <div class="col-11">
                <input class="form-control" type="text" v-model="Kamentariya" placeholder="Kamentariya">
              </div>
            </div>
          </div>
          <div v-if="karz == 0">
          </div>
          <div v-else class="col-md-12 form-group mt-0">
            <label class="text-danger">Срок дата</label>
            <input class="form-control border-danger" type="date" v-model="srok">
          </div>
        </div>
      </div>
      <div class="col-md-12 border-top">
        <div v-if="karz == 0" class="mt-4 mb-4 text-right">
          <button type="button" class="btn btn-success" v-on:click="OplataStart">Сохранить</button>
        </div>
        <div v-else-if="chesxbox == 1 && Kamentariya2" class="mt-4 mb-4 text-right">
          <button type="button" class="btn btn-success" v-on:click="OplataStart">Сохранить</button>
        </div>
        <div v-else-if="srok && mijozs" class="mt-4 mb-4 text-right">
          <button type="button" class="btn btn-success" v-on:click="OplataStart">Сохранить</button>
        </div>
        <div v-else class="mt-4 mb-4 text-right">
          <button type="button" class="btn btn-light">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>
