<script>
  import { RouterLink } from 'vue-router'
  import { mapState, mapGetters, mapActions} from 'vuex'
  const auth = JSON.parse(localStorage.getItem('auth'));
  const jami = JSON.parse(localStorage.getItem('Jami'));
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
            showModal: false,
            showModalKarzina: false,
            telsearch: '',
            Item3: [],
            id: '',
            name: '',
            soni: '',
            soni2: '',
            summa: '',
            jami: '',
            jamisumma: 0,
            karz: '',
            plastik: '',
            bank: '',
            naqt: '',
            Kamentariya: '',
            mijozs: '',
            srok: '',
            date:  year + "-" + monh + "-" + day,
            login: '',
            token: '',
            drive: '',
            qaytim: '',
            controlkarz: '',
            clentsumma: '',
            clentkarz: '',
            checke: '',
            statustyp: '',
            showModalEditor: false,
            ModalOplateTel: false,
            showModalkament: false
          }
        },
        methods: {
          ...mapActions([
            'FilterAuthAc',
            'OriginalTelV',
            'EditStoreg',
            'Delete_Sotuv_Ac',
            'Sotuvga_Olish_Action',
            'ClentGets',
            'Oplata_Start_Action'
          ]),
          FilterAuth(){
            this.FilterAuthAc();
          },
          Localstor(){
            this.login = auth.login,
            this.token = auth.token,
            this.statustyp = auth.action
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
            this.funFor();
          },
          editr(data){
            this.id = data.id,
            this.name = data.name,
            this.soni = data.soni,
            this.soni2 = data.soni2,
            this.summa = data.sotilish,
            this.jami = data.jami,
            this.showModalEditor = true
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
          CreateEdit(){
            var pris = 0;
            var natija = 0;
            const local = JSON.parse(localStorage.getItem('sotuv'));
            local.find(e => {
              if (e.id === this.id) {
                e.soni = this.soni;
                pris = e.sotilish_prise * e.soni;
                e.sotilish = this.summa;
                e.chegirma = pris - e.soni * e.sotilish;
                natija = pris / 100;
                var ddd = e.chegirma / natija
                var sss = format.format(ddd)
                e.skidka = sss + ' %';
                e.jami = pris - e.chegirma;
                // e.jami = this.jami;
              }else{} 
            });
            localStorage.setItem('sotuv', JSON.stringify(local));
            this.Item3 = JSON.parse(localStorage.getItem('sotuv'));
            this.funFor();
            this.id = '';
            this.name = '';
            this.soni = '';
            this.soni2 = '';
            this.summa = '';
            this.jami = '';
            this.showModalEditor = false;
          },
          DeletsotuvTel(i){
            const local = JSON.parse(localStorage.getItem('sotuv'));
            local.splice(i, 1);
            localStorage.setItem('sotuv', JSON.stringify(local));
            this.funFor();
          },
          getTelversion(){
            if (auth.method_id) {
              this.OriginalTelV({
                'method': 'post',
                'url': 'telv',
                'login': this.login,
                'token': this.token,
                'magazinId': auth.method_id,
                'magazin': auth.method_name,
                'status': this.statustyp,
              });
            }else{}
            this.funFor();
          },
          telkarzina(typ){
            this.funFor();
            this.showModalKarzina = typ;
          },
          oplata_telv(){
            if (auth.method_id) {
              this.ClentGets({
                'method': 'post',
                'url': 'clentgets',
                'login': this.login,
                'token': this.token,
                'magazinId': auth.method_id,
                'magazin': auth.method_name,
                'status': this.statustyp,
              });
              this.karz = this.jamisumma;
              this.ModalOplateTel = true;
            } else {}
          },
          clentsummafn(row){
            const jami = JSON.parse(localStorage.getItem('Jami'));
            this.karz = jami.summa;
            this.qaytim = '';
            var kur =JSON.parse(localStorage.getItem('Kurs'));
            if (kur.uid === 99999) {
              var clm = this.MijozTel.find(e => { if (e.id === row) return e; });
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
              var clm = this.MijozTel.find(e => { if (e.id === row) return e; });
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
            var q = 0;
            if (valyu) {
              q = valyu;
            } else {
              q = 0;
            }
            const jami = JSON.parse(localStorage.getItem('Jami'));
            this.karz = parseFloat(jami.summa) - parseFloat(q) - this.plastik - this.bank - this.controlkarz;
          },
          plastik1(valyu){
            var q = 0;
            if (valyu) {
              q = valyu;
            } else {
              q = 0;
            }
            const jami = JSON.parse(localStorage.getItem('Jami'));
            this.karz = parseFloat(jami.summa) - parseFloat(q) - this.naqt - this.bank - this.controlkarz;
          },
          bank1(valyu){
            var q = 0;
            if (valyu) {
              q = valyu;
            } else {
              q = 0;
            }
            const jami = JSON.parse(localStorage.getItem('Jami'));
            this.karz = parseFloat(jami.summa) - parseFloat(q) - this.plastik - this.naqt - this.controlkarz;
          },
          naqinp(){
            const jami2 = JSON.parse(localStorage.getItem('Jami'));
            this.plastik = '';
            this.bank = '';
            this.karz = 0;
            this.naqt = jami2.summa - this.controlkarz;
          },
          plasinp(){
            const jami3 = JSON.parse(localStorage.getItem('Jami'));
            this.naqt = '';
            this.bank = '';
            this.karz = 0;
            this.plastik = jami3.summa - this.controlkarz;
          },
          bankinp(){
            const jami4 = JSON.parse(localStorage.getItem('Jami'));
            this.naqt = '';
            this.plastik = '';
            this.karz = 0;
            this.bank = jami4.summa - this.controlkarz;
          },
          JonatishPush(){
              this.showModalkament = true;
          },
          Kamentariya2(row){
            this.Kamentariya = row;
          },
          Pushkament(){
            if (auth.method_id) {
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
              this.Kamentariya = '';
              localStorage.removeItem('Jami');
              localStorage.removeItem('sotuv');
              this.funFor();
              this.showModalkament = false;
              this.showModalKarzina = false;
            } else {}
          },
          funFor(){
            var summat = 0;
            const local = JSON.parse(localStorage.getItem('sotuv'));
            if (local) {
                this.Item3 = local;
                for (let i = 0; i < local.length; i++) {
                  summat = parseFloat(summat) + parseFloat(local[i]['jami']);
                }
                localStorage.setItem('Jami', JSON.stringify({'summa': summat}));
                const jami = JSON.parse(localStorage.getItem('Jami'));
                this.jamisumma = format.format(jami.summa);
            } else {
              this.Item3 = [];
              this.jamisumma = 0;
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
          OplataStartPush(){
            const jami1 = JSON.parse(localStorage.getItem('Jami'));
            const kurs2 = JSON.parse(localStorage.getItem('Kurs'));  
            const auth2 = JSON.parse(localStorage.getItem('auth'));
            this.Oplata_Start_Action({
              'method': 'post',
              'url2': 'oplata',
              'url': 'live_search',
              'driver': this.drive,
              'jamisum': jami1.summa,
              'mijozId': this.mijozs,
              'naqt': this.naqt,
              'plastik': this.plastik,
              'bank': this.bank,
              'karz': this.karz,
              'srok': this.srok,
              'qaytim': this.qaytim,
              'sana': this.date,
              'vid': kurs2.uid,
              'vname': kurs2.un,
              'vsumma': kurs2.u,
              'login': this.login,
              'token': this.token,
              'magazinId': auth2.method_id,
              'magazin': auth2.method_name,
              'status': this.statustyp,
              'local': JSON.parse(localStorage.getItem('sotuv'))
            });
            this.karz = '';
            this.mijozs = '',
            this.qaytim = '',
            this.clentsumma = '';
            this.clentkarz = '';
            localStorage.removeItem('Jami');
            localStorage.removeItem('sotuv');
            this.funFor();
            this.ModalOplateTel = false;
            this.showModalKarzina = false;
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
        },
        watch: {
          telsearch(row){
            if (auth.method_id) {
              this.OriginalTelV({
                'method': 'post',
                'url': 'telv',
                'search': row,
                'login': this.login,
                'token': this.token,
                'magazinId': auth.method_id,
                'magazin': auth.method_name,
                'status': this.statustyp,
              });
            }else{}
          }
        },
        computed: {
          ...mapGetters({
            Item2: 'Item2',
            MijozTel: 'MijozTel'
          }),
        },
        mounted() {
          this.FilterAuth();
          this.Localstor();
          this.getTelversion();
          this.driverpMount();
        }
      }
</script>

<template>
  <div class="row mb-4">
    <div class="col-md-12 mb-3">
        <div class="card text-left">
          <div class="card-body">
              <div class="row">
                <div class="col-10">
                  <input type="text" class="form-control" v-model="telsearch" placeholder="Поиск"/>
                </div>
                <div class="col-2">
                  <div class="dropdown" v-on:click="telkarzina(true)">            
                    <div class="badge-top-container">
                      <span v-if="Item3.length" class="alre2">{{ Item3.length }}</span>
                      <span v-else></span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div class="table-responsive">
                <div class="scroltab3">
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
                      <tr v-for="item in Item2" :key="item.id"  v-on:click="Sotuvga_Olish(item)" class="tir">
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

<div v-if="showModalKarzina" class="teldisegn pt-2">
  <button type="button" class="close mt-2 mr-2" aria-label="Close">
    <span aria-hidden="true" @click="showModalKarzina = false">&times;</span>
  </button>
  <button class="btn btn-primary btn-sm m-1" v-on:click="oplata_telv">
    Оплата
  </button>
  <button class="btn btn-success btn-sm m-1 mx-2" v-on:click="JonatishPush">
    Отправлять
  </button>
  <span class="vidge">{{jamisumma}}</span>
  <br>
  <div class="table-responsive">
    <div class="scrtel">
      <table class="tabl scroltel">
        <thead>
          <tr>
            <td>Товар</td>
            <td>Кол-во</td>
            <td>Цена</td>
            <td>Итого</td>
            <td>Предложение</td>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in Item3" :key="item.id" class="tir">
            <td>{{item.name}}</td>
            <td>{{item.soni}}</td>
            <td>{{item.sotilish}}</td>         
            <td>{{item.jami}}</td>
            <td>
              <a class="text-success mr-3" v-on:click="editr(item)">
                <i class="nav-icon i-Pen-2 font-weight-bold"></i>
              </a>
              <a class="text-danger" v-on:click="DeletsotuvTel(index)">
                <i class="nav-icon i-Close-Window font-weight-bold"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
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
                <div class="col-12 form-group mb-3">
                    <label for="firstName1">Количество</label>
                    <input class="form-control" type="number" v-on:keyup="sonival(soni)" v-model="soni">
                </div>
                <div class="col-12 form-group mb-3">
                  <label for="firstName1">Сумма</label>
                  <input class="form-control" type="text" v-on:keyup="summaval(summa)" v-model="summa">
                </div>
                <div class="col-12 form-group mb-3">
                  <label for="firstName1">Итого</label>
                  <input class="form-control" type="text" v-model="jami" disabled>
                </div>
            </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary btn-sm m-1" v-on:click="showModalEditor = false">Назад</button>
              <button type="button" class="btn btn-primary btn-sm m-1" v-on:click="CreateEdit">Сохранить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</div>

<div v-if="showModalkament">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{name}}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" v-on:click="showModalkament = false">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-12 form-group mb-3">
                    <label for="firstName1">Комментарий</label>
                    <input class="form-control" type="text" v-on:keyup="Kamentariya2(Kamentariya)" v-model="Kamentariya" placeholder="Комментарий">
                </div>           
            </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary btn-sm m-1" v-on:click="showModalkament = false">Назад</button>
              <button v-if="Kamentariya" type="button" class="btn btn-primary btn-sm m-1" v-on:click="Pushkament">Сохранить</button>             
              <button v-else type="button" class="btn btn-dark btn-sm m-1">Сохранить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</div>

<div v-if="ModalOplateTel" class="oplatit">
    <div class="col-12">
      <div class="row mt-0">
        <div class="col-md-6 form-group mt-0">
            <label for="firstName1">Итого Сумма</label>
            <input class="form-control" type="text" v-model="jamisumma" disabled>
        </div>
        <div class="col-md-6 form-group mt-0 mb-3">
          <label for="firstName1">Слент выбирать</label>
          <select class="form-control" v-on:change="clentsummafn(mijozs)" v-model="mijozs">
            <option value="">-- Выбирать --</option>
            <option v-for="itema in MijozTel" :value="itema.id">{{ itema.name }}</option>
          </select>
          <span class="text-primary position-absolute">{{ clentsumma }}</span>
          <span class="text-danger position-absolute" style="right: 5%;">{{ clentkarz }}</span>
        </div>
        <div class="col-md-12 form-group mt-2">
          <!-- <label for="firstName1">Наличные</label> -->
          <div class="row">
            <div class="col-9">
              <input class="form-control" type="text" v-on:keyup="naqt1(naqt)" v-model="naqt" placeholder="Наличные">
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
          <!-- <label for="firstName1">Карта</label> -->
          <div class="row">
            <div class="col-9">
              <input class="form-control" type="text" v-on:keyup="plastik1(plastik)" v-model="plastik" placeholder="Карта">
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
          <!-- <label for="firstName1">Банк</label> -->
          <div class="row">
            <div class="col-9">
              <input class="form-control" type="text" v-on:keyup="bank1(bank)" v-model="bank" placeholder="Банк">
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
        <!-- <div v-if="karz == 0">
        </div>
        <div v-else class="col-md-12 form-group mt-0">
          <label class="text-danger">Срок дата</label>
          <input class="form-control border-danger" type="date" v-model="srok">
        </div> -->
      </div>
    </div>
    <div class="col-md-12">
      <div v-if="karz == 0" class="mt-4 mb-4 text-right">
        <button type="button" class="btn btn-secondary btn-sm m-1" v-on:click="ModalOplateTel = false">Назад</button>
        <button type="button" class="btn btn-success btn-sm m-1" v-on:click="OplataStartPush">Сохранить</button>
      </div>
      <!-- <div v-else-if="chesxbox == 1 && Kamentariya2" class="mt-4 mb-4 text-right">
        <button type="button" class="btn btn-success" v-on:click="OplataStartPush">Сохранить</button>
      </div>
      <div v-else-if="srok && mijozs" class="mt-4 mb-4 text-right">
        <button type="button" class="btn btn-success" v-on:click="OplataStartPush">Сохранить</button>
      </div> -->
      <div v-else class="mt-4 mb-4 text-right">
        <button type="button" class="btn btn-secondary btn-sm m-1" v-on:click="ModalOplateTel = false">Назад</button>
        <button type="button" class="btn btn-light btn-sm m-1">Сохранить</button>
      </div>
    </div>
  </div>
</template>
