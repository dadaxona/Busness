<script>
  import { RouterLink } from 'vue-router'
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
  import readXisFile from "read-excel-file"
  import { saveExcel } from '@progress/kendo-vue-excel-export';
  const auth = JSON.parse(localStorage.getItem('auth'));
  const kurs = JSON.parse(localStorage.getItem('Kurs'));
  const format = new Intl.NumberFormat();
  export default {
    data() {
        return {
            torgosModel: false,
            showModal: false,
            sana_data: '',
            savdotormod: false,
            showModal: false,
            showModalDel: false,
            search: '',
            id:'',
            tip:'',
            adress:'',
            name:'',
            ogoh:'',
            soni:'',
            olinish:'',
            sotilish:'',
            sotilish2:'',
            valyuta:'',
            shtrix: '',
            tovarsqlad: '',
            filtip: '',
            filad: '',
            login:'',
            token:'',
            statustyp: '',
            excel: [],
            kurs: '',
            checke: '',
            drive: '',
        }
    },
    methods: {
      ...mapMutations([
            'Live_Search_Sotuv_Mut'
          ]),
      ...mapActions([
          'FilterAuthAc',
          'SqladMethodUrlPost',
          'Live_Search_Sqlad',
          'Sotuvga_Olish_Action',
          'Fil_Ac',
          'SqladDB',
          'Update_Ky',
          'Valyuta_Kurs',
          'Delete_Sotuv_Ac',
          'Delet_Stor_act'
      ]),
      FilterAuth(){
          this.FilterAuthAc();
      },
      Localstor(){
          this.login = auth.login,
          this.token = auth.token
          this.statustyp = auth.action
      },
      vremya(){
          setInterval(() => {
              this.sana_data = new Date();
          }, 1000);
      },
      exp(){
          saveExcel({
            data: this.objects3,
            fileName: "Export",
            columns: [
              {field: 'id'},
              {field: 'userId'},
              {field: 'magazinId'},
              {field: 'magazin'},
              {field: 'tip'},
              {field: 'adress'},
              {field: 'name'},
              {field: 'ogoh'},
              {field: 'soni'},
              {field: 'olinish'},
              {field: 'sotilish'},
              {field: 'sotilish2'},
              {field: 'valyuta'},
              {field: 'summa'},
              {field: 'kod'},
            ]
          });
        },
        clik(){
          document.getElementById("archiveExcel").click();
        },
        subirExcel(){
          const input = document.getElementById("archiveExcel");
          readXisFile(input.files[0]).then((rows)=>{
            for (let i = 1; i < rows.length; i++) {
              this.excel.push({
                'userId': rows[i][1],
                'magazinId': rows[i][2],
                'magazin': rows[i][3],
                'tip': rows[i][4],
                'adress': rows[i][5],
                'name': rows[i][6],
                'ogoh': rows[i][7],
                'soni': rows[i][8],
                'olinish': rows[i][9],
                'sotilish': rows[i][10],
                'sotilish2': rows[i][11],
                'valyuta': rows[i][12],
                'summa': rows[i][13],
                'kod': rows[i][14],
              });
            }
            this.SqladMethodUrlPost({
                'method': 'post',
                'url2': 'post_update_sqlad_exsel',
                'url': 'getdb',
                'massivname': this.excel,
                'login': this.login,
                'token': this.token,
                'magazinId': auth.method_id,
                'magazin': auth.method_name,
                'status': this.statustyp,
            });
          });
          this.excel = [];
          input.value = '';
        },
        CreateSqlad(){
          if (auth.method_id) {
            this.SqladMethodUrlPost({
              'method': 'post',
              'url2': 'sqlad_post_update',
              'url': 'getdb',
              'id': this.id,
              'tip': this.tip,
              'adress': this.adress,
              'name': this.name,
              'ogoh': this.ogoh,
              'soni': this.soni,
              'olinish': this.olinish,
              'sotilish': this.sotilish,
              'sotilish2': this.sotilish2,
              'valyuta': this.valyuta,
              'kod': this.shtrix,
              'login': this.login,
              'token': this.token,
              'status': this.statustyp,
              'magazinId': auth.method_id,
              'magazin': auth.method_name,
            });
            this.Clears();
          } else {}
        },
        delettip(id, name){
          this.id = id;
          this.name = name,
          this.showModalDel = true;
        },
        SqladDelet(){
          this.SqladMethodUrlPost({
            'method': 'post',
            'url2': 'sqlad_delete',
            'url': 'getdb',
            'id': this.id,
            'login': this.login,
            'token': this.token,
            'magazinId': auth.method_id,
            'magazin': auth.method_name,
            'status': this.statustyp,              
          });
          this.Clears();
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
        Clears(){
          this.id='';
          this.tip='';
          this.adress='';
          this.name='';
          this.ogoh='';
          this.soni='';
          this.olinish='';
          this.sotilish='';
          this.sotilish2='';
          this.valyuta='';
          this.shtrix='';
          this.showModal = false,
          this.showModalDel = false
        },
        updatekeyup(item){
          this.Update_Ky({
            'method': 'post',
            'url': 'update_key',
            'item': item
          });
        },
        updatechangeTip(item){
          this.Update_Ky({
            'method': 'post',
            'url': 'update_key',
            'item': item
          });
        },
        updatechangeAdr(item){
          this.Update_Ky({
            'method': 'post',
            'url': 'update_key',
            'item': item
          });
        },
        updatechangeVal(valy){
          this.Update_Ky({
            'method': 'post',
            'url': 'update_chang_val',
            'item': valy
          });
        },
        obnovit(){
          this.getSqlad();
        },
      cadasd(){
          if (this.codecler == false) {
            this.search = '';
          } else {
            this.search;           
            this.savdotormod = true;
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
            localStorage.setItem('Kurs',  JSON.stringify({'u': 1, 'uid': '99999',  'un': ''}));
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
      driverpMount(){
          var dri =JSON.parse(localStorage.getItem('Driver'));
          if (dri) {
            this.drive = JSON.parse(localStorage.getItem('Driver')).d;
          } else {
            localStorage.setItem('Driver',  JSON.stringify({'d': 1}));
            this.drive = 1;
          }
        },
        drdrive(d){
          localStorage.setItem('Driver',  JSON.stringify({'d': d}));
          this.driverpMount();
        },
        pdef(){
          console.log("Pdef")
      },
      Deletsotuv(id, jami){
          this.Delete_Sotuv_Ac({
            'i': id,
            'jami': jami
          });
        },
        Deletsotuv1(id){
          this.Delete_Sotuv_Ac({
            'i': id,
          });
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
      modalsokna3(typ){
        this.SqladDB({
        'method': 'post',
          'url': 'getdb',
          'login': this.login,
          'token': this.token,
          'magazinId': auth.method_id,
          'magazin': auth.method_name,
          'status': this.statustyp,
        });
        this.torgosModel = typ;
      },
      Sotuvga_Olish(obj){
        const kurs2 = JSON.parse(localStorage.getItem('Kurs'));
        var sum = '';
        var olsh = '';
        if (obj.soni > 0) {
          if (kurs2.uid == 99999) {
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
                sum = obj.sotilish2 / kurs2.u;
              } else {
                sum = obj.sotilish / kurs2.u;
              }
              olsh = obj.olinish / kurs2.u;
            } else {
              if (this.checke === 1) {
                sum = obj.sotilish2 * obj.summa / kurs2.u;
              } else {
                sum = obj.sotilish * obj.summa / kurs2.u;
              }
              olsh = obj.olinish * obj.summa / kurs2.u;
            }
          }
          this.Sotuvga_Olish_Action({
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
        } else { }
      },
      deletStor(){
        this.Delet_Stor_act();
      },
    },
    watch: {
      tovarsqlad(row){
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (auth.method_id) {
          this.SqladDB({
            'method': 'post',
            'url': 'getdb',
            'search': row,
            'login': this.login,
            'token': this.token,
            'magazinId': auth.method_id,
            'magazin': auth.method_name,
            'status': this.statustyp,
          });
        }else{}
      },
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
      filtip(){
        const auth = JSON.parse(localStorage.getItem('auth'));
          if (auth.method_id) {
            this.Fil_Ac({
              'method': 'post',
              'url': 'filt',
              'resul': this.filtip,
              'typ': 1,
              'login': this.login,
              'token': this.token,
              'magazinId': auth.method_id,
              'magazin': auth.method_name,
              'status': this.statustyp,
            });
          } else {}
      },
      filad(){
        const auth = JSON.parse(localStorage.getItem('auth'));
          if (auth.method_id) {
          this.Fil_Ac({
            'method': 'post',
            'url': 'filt',
            'resul': this.filad,
            'typ': 2,
            'login': this.login,
            'token': this.token,
            'magazinId': auth.method_id,
            'magazin': auth.method_name,
            'status': this.statustyp,
          });
        }else{}
      },
    },
    computed: {
      ...mapGetters({
        objects3: 'objects3',
        tipdata: 'tipdata',
        adressdata: 'adressdata',
        valyudata: 'valyudata',
        itogaTorgo: 'itogaTorgo',
        Items: 'Items',
        tog: 'tog',
        codecler: 'code',
        Sotish: 'Sotish',
        JamiSumma: 'JamiSumma',
        JamiSummaTorgo: 'JamiSummaTorgo'
      }),
    },
    mounted() {
        this.FilterAuth();
        this.Localstor();
        this.vremya();
        this.Sqlad();
        this.toogler2();
        this.driverpMount();
        this.checkedTyp3();
    }
}
</script>

<template>

<div class="aaaaa1">
    <div class="hed1">
        <div class="row">
            <div class="col-9 pl-4">
                <input type="checkbox" class="chhhhh"><span class="bkapt mx-2"> BK / Apt</span> 
                <input type="text" class="inps1" v-model="search">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square sert" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                <span class="bkapt mx-2">№ Деск</span> <input type="text" class="inps1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square sert" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                <span class="bkapt mx-1">Дата Продажи</span><input type="date" class="inps1">
            </div>
            <div class="col-3">
                <button class="otmen" v-on:click="Deletsotuv1(0)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-danger mx-1 bi bi-slash-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708z"/>
                    </svg>
                    Отмена
                </button>
                <button class="mx-1 otmen" v-on:click="deletStor">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-danger mx-1 bi bi-slash-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708z"/>
                    </svg>
                    Отмена все
                </button>
                <button class="otmen">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-danger mx-1 bi bi-arrow-down-up" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
                    </svg>
                    Вазврад
                </button>
            </div>
        </div>
    </div>
    <div class="hed2">
        <div class="row">
            <div class="dasd1 pl-4">
                <p class="ptegs">
                    Lorem ipsum dolor sit amet
                </p>
            </div>
            <div class="dasd2">
                <p class="ptegs2">
                   {{ sana_data }}
                </p>
            </div>
        </div>
    </div>

    <div class="hed3">
        <div class="row">
            <div class="loiu">
                <p class="ptgty">
                    Клент
                </p>
                <p class="ptgty">
                    Скидка
                </p>
                <p class="ptgty">
                    Покупки
                </p>
            </div>
            <div class="loiu2">
                <p class="ptgtyasdsd">
                    Dadaxon
                </p>
                <input type="text" disabled class="bonnns">
                <span class="bnos">Бонус</span>
                <input type="text" disabled class="derfd">
                <span class="mx-2 bnos">Пося покупки</span>
                <input type="text" disabled class="derfd">
                <br>
                <input type="text" disabled class="ppaku">
                <span class="bnos3">Вазвраты</span>
                <input type="text" disabled class="derfderer">
            </div>
            <div class="loiu4">
                <p class="ptgty">
                    😊 ДОЛГ
                </p>
                <p class="ptgty">
                    Нач сумма
                </p>
                <p class="ptgty">
                    Сниженние
                </p>
            </div>
            <div>
                <input type="text" disabled class="derfderer" value="Расчитаты"> <br>
                <input type="text" disabled class="derfderer"><br>
                <input type="text" disabled class="derfderer">
            </div>
            <div class="pl-3">
                <span class="ptgty">
                  Выберите Валюта
                  <select class="text-center derfderer" v-on:change="toogler(kurs)" v-model="kurs">
                    <option :value="99999">--Tanlang--</option>
                    <option v-for="iteme in valyudata" :value="iteme.id">{{ iteme.name }}</option>
                  </select>
                </span>
                <br>
                <span class="ptgty mx-2">
                 Выберите сумму
                  <select class="text-center derfderer" v-on:change="checkedTyp(checke)" v-model="checke">
                    <option :value="1">Отивий</option>
                    <option :value="2">Рознишни</option>
                  </select>
                </span>
                <br>
                <span class="ptgty">
                  Выберите Дривер
                  <select class="text-center derfderer" v-on:change="drdrive(drive)" v-model="drive">
                    <option :value="1">XP-80</option>
                    <option :value="2">XP-58</option>
                  </select>
                </span>
            </div>
        </div>
    </div>

    <div class="hed4 pl-1">
        <span class="bnos ">Последная чек:</span> 
        <span class="bnos text-danger">К оплата</span>
        <input type="text" disabled class="derfderer">
        <span class="bnos pl-2">Получено</span>
        <input type="text" disabled class="derfderer">
        <span class="bnos pl-2 text-success">Cдача</span>
        <input type="text" disabled class="derfderer">
        <svg xmlns="http://www.w3.org/2000/svg" v-on:click="pdef" width="18" height="18" fill="currentColor" class="bi bi-printer-fill ml-3" viewBox="0 0 16 16">
            <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z"/>
            <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
          </svg>
        <span class="bnos pl-1">Товары Принт</span>
    </div>
    <div class="hed5">
      <div class="table-responsive">
        <div class="scroltab_sotuv">
        <table class="tabl tablets">
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
                    <td class="ggt5">
                      <button class="btn btn-danger pl-2 pr-2 pt-1 pb-1" v-on:click="deletStor">
                        Удалить
                      </button> 
                    </td>
                </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in Sotish" :key="item.id" class="tir">
                <td>
                  <input type="text" class="keyinp_sontor" v-model="item.name" disabled>
                </td>
                <td>
                  <input type="text" class="keyinp_sontor" v-model="item.shtrix" disabled>
                </td>
                <td>
                  <input type="number" class="keyinp_sontor" v-on:keyup="UpdateSon(item)" v-model="item.soni">
                </td>
                <td>
                  <input type="text" class="keyinp_sontor" v-model="item.sotilish_prise" disabled>
                </td>
                <td>
                  <input type="text" class="keyinp_sontor" v-on:keyup="UpdateSotilish(item)" v-model="item.sotilish">
                </td>
                <td>
                  <input type="text" class="keyinp_sontor" v-on:keyup="UpdateChgirma(item)" v-model="item.chegirma">
                </td>
                <td>
                  <input type="text" class="keyinp_sontor" v-model="item.skidka" disabled>
                </td>
                <td>
                  <input type="text" class="keyinp_sontor" v-model="item.jami" disabled>
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

    <div class="fotr">
        <span class="bdfsdf pl-2">Прадано артикуя</span>
        <span class="bdfsdf">в количства на сумма</span>
        <span class="bdfsdf">Начислено бонус</span>
        <span class="bdfsdf">Оплачену бонусам</span>
        <br>
        <button v-if="tog" class="diseg2" v-on:click="oplate(true)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-back" viewBox="0 0 16 16">
                <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z"/>
              </svg>
              <br>
            Оплаты
        </button>
        <button v-else class="diseg">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-back" viewBox="0 0 16 16">
              <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z"/>
            </svg>
            <br>
            Оплаты
        </button>
        <button class="diseg">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
                <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
              </svg>
              <br>
            Приняти заказ
        </button>
        <button class="diseg" v-on:click="modalsokna3(true)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-basket-fill" viewBox="0 0 16 16">
                <path d="M5.071 1.243a.5.5 0 0 1 .858.514L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 6h1.717L5.07 1.243zM3.5 10.5a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3z"/>
              </svg>
              <br>
              Склад
        </button>
        <button class="diseg">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
              </svg>
              <br>
              Выдать касса
        </button>
        <button class="diseg">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>
                <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
                <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"/>
                <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
              </svg>
              <br>
            Инкассация
        </button>
        <button class="diseg">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>
                <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
                <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"/>
                <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
              </svg>
              <br>
            Товарни отчет
        </button>
        <button class="diseg">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>
                <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
                <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"/>
                <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
              </svg>
              <br>
            Отчет о касса
        </button>
        <div class="row">
            <div class="tuggg pl-4 ">
                <span class="bdfsdf555">Итого сумма</span><br>
                <span class="bdfsdf555">Скидки %</span><br>
                <span class="bdfsdf555">Сумма скидки</span><br>
                <span class="bdfsdf555">Сумма оплати</span><br>
            </div>
            <div class="pl-2 tuggg3">
                <span class="bdfsdf555"> {{ JamiSummaTorgo.prise }} </span><br>
                <span class="bdfsdf555">{{ JamiSummaTorgo.skidka }}</span><br>
                <span class="bdfsdf555">{{ JamiSummaTorgo.chegir }}</span><br>
                <span class="bdfsdf555">{{ JamiSummaTorgo.jami }}</span><br>
            </div>
            <div class="tuggg4">
                <p class="text-center parptf">
                    Сумма оплати
                </p>
                <h3 class="text-center sdfd">{{ JamiSumma }}</h3>
                <input type="checkbox" class="sadasdgfgh"><span class="pl-2">Запрешате количства товар</span>
            </div>
        </div>
        
    </div>
</div>

<div v-if="torgosModel" class="torgosqlad">
    <button type="button" class="close mb-3 mt-3 mr-3" @click="torgosModel = false">
        <span aria-hidden="true" v-on:click="torgosModel = false">&times;</span>
    </button>
    <div class="mt-3 p-2 border-bottom">
        <button class="mb-2" @click="showModal = true">Tovar qo`shish</button>
        <input type="file" id="archiveExcel" v-on:change="subirExcel()">
        <button class="mb-2 mx-3" v-on:click="clik">                  
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
          </svg>
        </button>
        <button class="mb-2" v-on:click="exp">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
          </svg>
        </button>
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" v-on:click="obnovit" class="bi bi-funnel mx-3" viewBox="0 0 16 16">
          <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
        </svg>
        <select class="inps1 text-center" v-model="filtip" name="tip" id="tip">
          <option value="">--Filter Tip--</option>
          <option v-for="item in tipdata">
              {{ item.name }}
          </option>
        </select>
        <select class="inps1 text-center" v-model="filad" name="adress" id="adress">
          <option value="">--Filter Adress--</option>
          <option v-for="item in adressdata">
              {{ item.name }}
          </option>
        </select>
        <input type='text' id="tovarsq" class="inps1" v-model="tovarsqlad" />
        <br>
        <span class="border-bottom mx-4">
          Сумма: $ +{{ itogaTorgo.summa }}
        </span>
        <span class="border-bottom mx-4">
          Количество: {{ itogaTorgo.koli }}
        </span>
        <span class="border-bottom mx-4">
          Шт: {{ itogaTorgo.sht }}
        </span>
    </div>
    <div class="table-responsive">
        <div class="scroltab3">
        <table class="tabl scroltabter">
            <thead>
                <tr>
                    <th>Tip</th>
                    <th>Adress</th>
                    <th>Tovar</th>
                    <th>N.1</th>
                    <th>Shtrix kod</th>
                    <th>Xajmi</th>
                    <th>Olinish</th>
                    <th>Optviy</th>
                    <th>Roznishni</th>
                    <th>Valyuta</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in objects3" :key="item.id" class="tir">
                <!-- {{item}}  -->
                <td>
                    <select class="inp45454" v-on:change="updatechangeTip(item)" v-model="item.tip">
                    <option  v-for="itema in tipdata" :value="itema.name">{{itema.name}}</option>
                    </select>
                </td>
                <td>
                    <select class="inp45454" v-on:change="updatechangeAdr(item)" v-model="item.adress">
                    <option  v-for="itema in adressdata" :value="itema.name">{{itema.name}}</option>
                    </select>
                </td>
                <td>
                    <input type="text" class="inp45454" v-on:keyup="updatekeyup(item)" v-model="item.name">
                </td>
                <td>
                    <input type="text" class="inp45454" v-on:keyup="updatekeyup(item)" v-model="item.ogoh">
                </td>
                <td>
                    <input type="text" class="inp45454" v-on:keyup="updatekeyup(item)" v-model="item.kod">
                </td>
                <td>
                    <input type="text" class="inp45454" v-on:keyup="updatekeyup(item)" v-model="item.soni">
                </td>
                <td>
                    <input type="text" class="inp45454" v-on:keyup="updatekeyup(item)" v-model="item.olinish">
                </td>
                <td>
                    <input type="text" class="inp45454" v-on:keyup="updatekeyup(item)" v-model="item.sotilish">
                </td>
                <td>
                    <input type="text" class="inp45454" v-on:keyup="updatekeyup(item)" v-model="item.sotilish2">
                </td>
                <td>
                    <select class="inp45454" v-on:change="updatechangeVal(item)" v-model="item.valyuta">
                    <option value="">----</option>
                    <option  v-for="itema in valyudata" :value="itema.name">{{itema.name}}</option>
                    </select>
                </td>
                <td>
                    <a class="text-danger mr-2" v-on:click="delettip(item.id, item.name)">
                    <i class="nav-icon i-Close-Window font-weight-bold"></i>
                    </a>
                </td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
</div>
    <div v-if="showModal">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content basg">
                <div class="modal-header">
                  <h5 class="modal-title">Modal Tovar</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" v-on:click="showModal = false">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-md-6 form-group mb-3">
                      <label for="firstName1">Tip</label>
                      <select class="form-control fc" v-model="tip" name="tip" id="tip">
                        <option v-for="item in tipdata">
                            {{item.name}}
                        </option>
                      </select>
                    </div>
                    <div class="col-md-6 form-group mb-3">
                      <label for="firstName1">Adress</label>
                      <select class="form-control fc" v-model="adress" name="adress" id="adress">
                        <option v-for="item in adressdata">
                            {{item.name}}
                        </option>
                      </select>
                    </div>
                    <div class="col-md-6 form-group mb-3">
                      <label for="firstName1">Tovar</label>
                      <input class="form-control fc" id="firstName1" type="text" v-model="name">
                    </div>
                    <div class="col-md-6 form-group mb-3">
                      <label for="firstName1">N.1</label>
                      <input class="form-control fc" id="firstName1" type="number" v-model="ogoh">
                    </div>
                    <div class="col-md-6 form-group mb-3">
                      <label for="firstName1">Soni</label>
                      <input class="form-control fc" id="firstName1" type="number" v-model="soni">
                    </div>
                    <div class="col-md-6 form-group mb-3">
                      <label for="firstName1">Olinish</label>
                      <input class="form-control fc" id="firstName1" type="text" v-model="olinish">
                    </div>
                    <div class="col-md-6 form-group mb-3">
                      <label for="firstName1">Optviy</label>
                      <input class="form-control fc" id="firstName1" type="text" v-model="sotilish">
                    </div>
                    <div class="col-md-6 form-group mb-3">
                      <label for="firstName1">Roznishni</label>
                      <input class="form-control fc" id="firstName1" type="text" v-model="sotilish2">
                    </div>
                    <div class="col-md-6 form-group mb-3">
                      <label for="firstName1">Valyuta</label>
                      <select class="form-control fc" v-model="valyuta" name="adress" id="adress">
                        <option v-for="item in valyudata">
                          {{item.name}}
                        </option>
                      </select>
                    </div>
                    <div class="col-md-6 form-group mb-3">
                      <label for="firstName1">Shtrix kod</label>
                      <input class="form-control fc" id="firstName1" type="text" v-model="shtrix">
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger mx-3" v-on:click="showModal = false">Отмена</button>
                  <button type="button" class="btn btn-primary" v-on:click="CreateSqlad">Сохранить</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    
    <div v-if="showModalDel">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title text-danger">Delete User</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" @click="showModalDel = false">&times;</span>
                  </button>
                </div>
                  <input type="hidden" name="" id="" v-model="id">
                  <div class="col-md-12 form-group mb-3">
                    <input class="form-control text-center" type="text"  v-model="name" disabled>
                </div>
                <div class="modal-body text-center">
                  <button type="button" class="btn btn-danger mx-2" @click="showModalDel = false">No</button>
                  <button type="button" class="btn btn-primary" v-on:click="SqladDelet">Yes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div v-if="savdotormod" class="torgosqlad2">
      <button type="button" class="close mb-3 mt-3 mr-3" @click="savdotormod = false">
          <span aria-hidden="true"
          >&times;</span>
      </button>
      <div class="serc mb-2">
        <input type='text' id="search" v-model="search" class="searchbar" />
      </div>
      <div class="table-responsive">
        <div class="scroltabtorgo">
          <table class="tabl scroltabter">
            <!-- <thead>
                <tr>
                    <th>Tovar</th>
                    <th>Soni</th>
                    <th>Optviy</th>
                    <th>Roznishni</th>
                </tr>
            </thead> -->
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
      <div class="mt-4">
        <button type="button" class="btn btn-danger" @click="savdotormod = false">
          Отмена
        </button>
      </div>
    </div>
    
</template>

<style>


</style>
