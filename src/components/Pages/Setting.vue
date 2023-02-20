<script>
  import { RouterLink } from 'vue-router'
  import { mapState, mapGetters, mapActions} from 'vuex'
  export default {
        data() {
            return {
              showModal: false,
              showModalDel5: false,
              pasw: '',
              id: '',
              name: '',
              login2: '',
              biznes: '',
              password: '',
              login: '', 
              token: '',
              statustyp: '',

              magname: '',
              mtelegram: '',
              magid: '',

              kid: '',
              magazinname: '',
              kname: '',
              kfam: '',
              ktel: '',
              klogin: '',
              kpassword: '',

              pagas: {
                id: '',
                ism: '',
                val: '',
                tip: '',
                mij: '',
                yet: '',
                sql: '',
                chiq: '',
                foy: '',
              },

              magazintr: false,
              magazink: false,
              okna2: false,
              oknakass: false,
              setnastr: false
            }
        },
        methods: {
          ...mapActions([
            'FilterAuthAc',
            'Origi_Ac',
            'OrigiPost_Ac',
            'UserProfilDel_Ac',
            'Saqlas_Mag',
            'Saqlas_Kassa_Ac',
            'Saqlas_Kassa_Get',
            'Role_Ac'
          ]),
          FilterAuth(){
            this.FilterAuthAc();
          },
          Localstor(){
            const auth = JSON.parse(localStorage.getItem('auth'));
            this.login = auth.login,
            this.token = auth.token,
            this.statustyp = auth.action
          },
          Origin(){
            this.Origi_Ac({
              'method': 'post',
              'url': 'userget',
              'login': this.login,
              'token': this.token,
              'status': this.statustyp,
            });
          },
          edirer(result){
            this.id = result.id,
            this.name = result.name,
            this.login2 = result.login,
            this.biznes = result.biznes,
            this.tel = result.tel,
            this.telegram = result.telegram,
            this.password = result.password,
            this.showModal = true
          },
          SubmiteForm(){
            this.OrigiPost_Ac({
              'method': 'post',
              'url2': 'user_update_any',
              'url': 'userget',
              'id': this.id,
              'name': this.name,
              'login2': this.login2,
              'biznes': this.biznes,
              'password': this.password,
              'tel': this.tel,
              'telegram': this.telegram,
              'login': this.login,
              'token': this.token,
              'status': this.statustyp,
            });
            this.cleare();
          },
          deleter(item){
            this.id = item.id,
            this.name = item.name,
            this.password = item.password,
            this.showModalDel5 = true
          },
          UserProfilDel(){
            if (this.pasw == this.password) {
              this.UserProfilDel_Ac({
                'method': 'post',
                'url': 'user_del_clear',
                'id': this.id,
              })
            } else {
              
            }
          },
          cleare(){
            this.id = '',
            this.name = '',
            this.login2 = '',
            this.biznes = '',
            this.tel = '',
            this.telegram = '',
            this.password = '',
            this.showModal = false,
            this.showModalDel5 = false
          },
          magazinfal(typ){
            this.magazintr = typ;
          },
          magazinkassa(typ){
            this.magazink = typ;
          },
          modalso(typ){
            this.okna2 = typ;
          },
          modalsokass(typ){
            this.oknakass = typ;
          },

          Ishchi_get(){
            this.Saqlas_Kassa_Get({
              'method': 'post',
              'url': 'kassa_get',
              'login': this.login,
              'token': this.token,
              'status': this.statustyp
            });
          },

          editkassir(item){
            this.kid = item.id,
            this.magazinname = item.magazinId,
            this.kname = item.name,
            this.kfam = item.fam,
            this.ktel = item.tel,
            this.klogin = item.login,
            this.kpassword = item.password,
            this.oknakass = true
          },

          Saqlas_kassa(){
            var rend = Math.random().toString(36).substr(2);
            this.Saqlas_Kassa_Ac({
              'method': 'post',
              'url2': 'kassa_creat',
              'url': 'kassa_get',
              'id': this.kid,
              'magazinId': this.magazinname,
              'name': this.kname,
              'fam': this.kfam,
              'tel': this.ktel,
              'login2': this.klogin,
              'password': this.kpassword,
              'token2': rend,
              'status2': 'ish',
              'login': this.login,
              'token': this.token,
              'status': this.statustyp,
            });
            this.kid = '',
            this.magazinname = '',
            this.kname = '',
            this.kfam = '',
            this.ktel = '',
            this.klogin = '',
            this.kpassword = '',
            this.oknakass = false
          },

          toogler(typ){
            this.magazinname = typ;
          },

          magedit(item){
            this.magid = item.id;
            this.magname = item.name;
            this.mtelegram = item.telegram;
            this.okna2 = true;
          },

          Saqlas_action(){
            if (this.magname) {
              this.Saqlas_Mag({
                'method': 'post',
                'url': 'magazin_creat',
                'id': this.magid,
                'name': this.magname,
                'telegram': this.mtelegram,
                'login': this.login,
                'token': this.token,
                'status': this.statustyp,
              });
              this.magid = '';
              this.magname = '';
              this.mtelegram = '',
              this.okna2 = false;
            } else {
              
            }
          },
          settings(item){
            this.pagas.id = item.id;
            this.pagas.ism = item.name;
            this.pagas.mij = item.mijoz;
            this.pagas.sql = item.sqlad;
            this.pagas.chiq = item.chiqim;
            this.pagas.tip = item.tip;
            this.pagas.foy = item.foyda;
            this.pagas.yet = item.yetkazu;
            this.pagas.val = item.valyuta;
            this.setnastr = true;
          },
          settings22(typ){
            this.setnastr = typ;
          },
          jonatish(typ, typ2){
            this.Role_Ac({
              'method': 'post',
              'url2': 'role_peremes',
              'url': 'kassa_get',
              'login': this.login,
              'token': this.token,
              'status': this.statustyp,
              'id': this.pagas.id,
              'typ': typ,
              'typ2': typ2
            });
          }
        },
        computed: {
          ...mapGetters({
            userdata: 'userdata',
            objectauth2: 'objectauth2',
            ishchila: 'ishchila'
          }),
        },
        mounted() {
          this.FilterAuth();
          this.Localstor();
          this.Origin();
          this.Ishchi_get();
        }
      }
</script>

<template>

  <div v-if="setnastr" class="div145">
    <div class="divdf2">
        <button type="button" class="close mb-3 mt-3 mr-3" v-on:click="settings22(false)">
            <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="text-center">{{ pagas.ism }}</h4>
        <div class="table-responsive">
            <div class="scro mx-2">
                <table class="tabl scroltab">
                    <thead>
                        <tr>
                            <th>Возможности</th>
                            <th>Настройки</th>
                        </tr>
                    </thead>
                    <tbody>
                      <tr class="tir">                        
                          <td>
                            Валюта
                          </td>
                          <td v-if="pagas.val == null" class="mt-0">
                            <input type="checkbox" class="form-check-input tdp" v-on:click="jonatish('val', 1)">
                          </td>
                          <td v-else class="mt-0">
                            <input type="checkbox" class="form-check-input tdp" v-on:click="jonatish('val', null)" checked>
                           
                          </td>
                      </tr>
                      <tr class="tir">
                        <td>
                          Тип
                        </td>
                        <td v-if="pagas.tip == null" class="mt-0">
                          <input type="checkbox" class="form-check-input tdp" v-on:click="jonatish('tip', 1)">
                        </td>
                        <td v-else class="mt-0">
                          <input type="checkbox" class="form-check-input tdp" v-on:click="jonatish('tip', null)" checked>
                     
                        </td>
                    </tr>
                    <tr class="tir">                        
                      <td>
                        Доставщик
                      </td>
                      <td v-if="pagas.yet == null" class="mt-0">
                        <input type="checkbox" class="form-check-input tdp" v-on:click="jonatish('yet', 1)">
                      </td>
                      <td v-else class="mt-0">
                        <input type="checkbox" class="form-check-input tdp" v-on:click="jonatish('yet', null)" checked>
                     
                      </td>
                    </tr>

                    <tr class="tir">                        
                      <td>
                        Слент
                      </td>
                      <td v-if="pagas.mij == null" class="mt-0">
                        <input type="checkbox" class="form-check-input tdp" v-on:click="jonatish('mij', 1)">
                      </td>
                      <td v-else class="mt-0">
                        <input type="checkbox" class="form-check-input tdp" v-on:click="jonatish('mij', null)" checked>
                       
                      </td>
                    </tr>

                    <tr class="tir">                        
                      <td>
                        Склад
                      </td>
                      <td v-if="pagas.sql == null" class="mt-0">
                        <input type="checkbox" class="form-check-input tdp" v-on:click="jonatish('sql', 1)">
                      </td>
                      <td v-else class="mt-0">
                        <input type="checkbox" class="form-check-input tdp" v-on:click="jonatish('sql', null)" checked>
                 
                      </td>
                    </tr>

                    <tr class="tir">                        
                      <td>
                        Расход
                      </td>
                      <td v-if="pagas.chiq == null" class="mt-0">
                        <input type="checkbox" class="form-check-input tdp" v-on:click="jonatish('chiq', 1)">
                      </td>
                      <td v-else class="mt-0">
                        <input type="checkbox" class="form-check-input tdp" v-on:click="jonatish('chiq', null)" checked>
                
                      </td>
                    </tr>

                    <tr class="tir">                        
                      <td>
                        Прибл
                      </td>
                      <td v-if="pagas.foy == null" class="mt-0">
                        <input type="checkbox" class="form-check-input tdp" v-on:click="jonatish('foy', 1)">
                      </td>
                      <td v-else class="mt-0">
                        <input type="checkbox" class="form-check-input tdp" v-on:click="jonatish('foy', null)" checked>
                      </td>
                    </tr>
                  </tbody>
              </table>
            </div>
        </div>
    </div>
  </div>
  

  <div class="row mb-4">
    <div class="col-md-12 mb-3">
        <div class="card text-left">
            <div class="card-body">
              <h4>Слент</h4>
               <button class="btn btn-primary" v-on:click="magazinfal(true)">Магазин: +{{ objectauth2.magazin.length }}</button>
               <button class="btn btn-primary mx-1" v-on:click="magazinkassa(true)">Касса: +{{ ishchila.length }}</button>
                <div class="table-responsive">
                  <div class="scroltab3">
                    <table class="tabl scroltab">
                        <thead>
                            <tr>
                                <th>Имя или Фамилия</th>
                                <th>Логин</th>
                                <th>Бизнес тип</th>
                                <th>Тел</th>
                                <th>Телеграм</th>
                                <th>Парол</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in userdata" :key="item.id" class="tir">
                            <td>{{ item.name }}</td>
                            <td>{{ item.login }}</td>
                            <td>{{ item.biznes }}</td>
                            <td>{{ item.tel }}</td>
                            <td>{{ item.telegram }}</td>
                            <td>{{ item.password }}</td>
                            <td>
                              <a class="text-success mr-2" v-on:click="edirer(item)">
                                <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                              </a>
                              <a class="text-danger mr-2" v-on:click="deleter(item)">
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
</div>
<div v-if="showModal">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Слент</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="showModal = false">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12 form-group mb-3">
                    <label for="firstName1">Имя</label>
                    <input class="form-control" id="firstName1" type="text" v-model="name" placeholder="Имя">
                </div>
                <div class="col-md-12 form-group mb-3">
                    <label for="lastName1">Логин</label>
                    <input class="form-control" id="lastName1" type="text" v-model="login" placeholder="Логин">
                </div>
                <div class="col-md-12 form-group mb-3">
                    <label for="exampleInputEmail1">Бизнес тип</label>
                    <input class="form-control" id="exampleInputEmail1" type="email" v-model="biznes" placeholder="Бизнес тип" disabled>
                </div>
                <div class="col-md-12 form-group mb-3">
                  <label for="lastName1">Тел</label>
                  <input class="form-control" id="lastName1" type="text" v-model="tel" placeholder="Тел">
                </div>
                <div class="col-md-12 form-group mb-3">
                  <label for="lastName1">Телеграм</label>
                  <input class="form-control" id="lastName1" type="text" v-model="telegram" placeholder="Телеграм">
                </div>
                <div class="col-md-12 form-group mb-3">
                    <label for="phone">Парол</label>
                    <input class="form-control" id="phone" type="text"  v-model="password" placeholder="Парол">
                </div>
            </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="showModal = false">Назад</button>
              <button class="btn btn-primary" v-on:click="SubmiteForm">Сохранить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</div>

<div v-if="showModalDel5">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-danger">Удалить</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="showModalDel5 = false">&times;</span>
              </button>
            </div>
              <div class="col-md-12 form-group mb-3">
                <input class="form-control text-center" type="text"  v-model="name" disabled>
            </div>
            <div class="col-md-12 form-group mb-3">
              <input type="text" class="form-control" name="" v-model="pasw" placeholder="Password">
            </div>
            <div class="modal-body text-center">
              <button type="button" class="btn btn-danger mx-2" @click="showModalDel5 = false">Нет</button>
              <button type="button" class="btn btn-primary" v-on:click="UserProfilDel">Да</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</div>

<div v-if="magazintr" class="div1">
  <div class="div2">
      <button type="button" class="close mb-3 mt-3 mr-3" v-on:click="magazinfal(false)">
          <span aria-hidden="true" v-on:click="showModalEditor = false">&times;</span>
      </button>
      <button class="btn btn-primary mx-2 mt-3" v-on:click="modalso(true)">
        Добавлять: +{{ objectauth2.magazin.length }}
      </button>
      <div class="table-responsive">
          <div class="scro mx-2">
              <table class="tabl scroltab">
                  <thead>
                      <tr>
                          <th>Ваш ID</th>
                          <th>Магазин</th>
                          <th>Магазин Чат</th>
                          <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                    <tr class="tir" v-for="item in objectauth2.magazin" :key="item.id">
                      <td>
                        {{ item.id }}
                      </td>
                      <td>
                          {{ item.name }}
                      </td>
                      <td>
                        {{ item.telegram }}
                      </td>
                        <td>
                          <button class="btn btn-success pt-0 pb-0" v-on:click="magedit(item)">
                            <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                          </button>
                            <!-- <button class="btn btn-danger pt-0 pb-0" v-on:click="magdelet(item)">
                              <i class="nav-icon i-Close-Window font-weight-bold"></i>
                            </button> -->
                        </td>
                    </tr>
                </tbody>
            </table>
          </div>
      </div>
  </div>
</div>

<div v-if="magazink" class="div1">
  <div class="div25457">
      <button type="button" class="close mb-3 mt-3 mr-3" v-on:click="magazinkassa(false)">
          <span aria-hidden="true" v-on:click="showModalEditor = false">&times;</span>
      </button>
      <button class="btn btn-primary mx-2 mt-3" v-on:click="modalsokass(true)">
        Добавлять: +{{ ishchila.length }}
      </button>
      <h4 class="mx-2 mt-3">Kassir</h4>
      <div class="table-responsive">
          <div class="scro">
              <table class="tabl scroltab mx-2">
                  <thead>
                      <tr>
                          <th>Имя</th>
                          <th>Фамилия</th>
                          <th>Тел</th>
                          <th>Логин</th>
                          <th>Парол</th>
                          <th>Магазин</th>
                          <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                  <tr class="tir" v-for="item in ishchila" :key="item.id">
                      <td>
                          {{ item.name }}
                      </td>
                      <td>
                          {{ item.fam }}
                      </td>
                      <td>
                          {{ item.tel }}
                      </td>
                      <td>
                          {{ item.login }}
                      </td>
                      <td>
                          {{ item.password }}
                      </td>
                      <td>
                        {{ item.magazin }}
                      </td>
                      <td>
                        <button class="btn btn-success pt-0 pb-0" v-on:click="editkassir(item)">
                          <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                        </button>
                        <button class="btn btn-primary mx-1 pt-0 pb-0" v-on:click="settings(item)">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                          </svg>
                        </button>
                      </td>
                  </tr>
                  </tbody>
              </table>
          </div>
      </div>
  </div>
</div>

<div v-if="okna2" class="oknamodal">
  <button type="button" class="close mb-3 mt-3 mr-3" v-on:click="modalso(false)">
      <span aria-hidden="true" v-on:click="showModalEditor = false">&times;</span>
  </button>
  <br>
  <h4 class="text-center">Магазин добавлять</h4>
  <label for="" class="mx-3">Магазин</label>
  <div class="col-12">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-database-fill-add position-fixed mt-2 ml-2" viewBox="0 0 16 16">
      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0ZM8 1c-1.573 0-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4s.875 1.755 1.904 2.223C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777C13.125 5.755 14 5.007 14 4s-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1Z"/>
      <path d="M2 7v-.839c.457.432 1.004.751 1.49.972C4.722 7.693 6.318 8 8 8s3.278-.307 4.51-.867c.486-.22 1.033-.54 1.49-.972V7c0 .424-.155.802-.411 1.133a4.51 4.51 0 0 0-4.815 1.843A12.31 12.31 0 0 1 8 10c-1.573 0-3.022-.289-4.096-.777C2.875 8.755 2 8.007 2 7Zm6.257 3.998L8 11c-1.682 0-3.278-.307-4.51-.867-.486-.22-1.033-.54-1.49-.972V10c0 1.007.875 1.755 1.904 2.223C4.978 12.711 6.427 13 8 13h.027a4.552 4.552 0 0 1 .23-2.002Zm-.002 3L8 14c-1.682 0-3.278-.307-4.51-.867-.486-.22-1.033-.54-1.49-.972V13c0 1.007.875 1.755 1.904 2.223C4.978 15.711 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.507 4.507 0 0 1-1.3-1.905Z"/>
    </svg>
      <input type="text" name="" class="text-right form-control" v-model="magname">
  </div>
  <label for="" class="mx-3">Телеграм Бот</label>
  <div class="col-12">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telegram position-fixed mt-2 ml-2" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
    </svg>
      <input type="text" name="" class="text-right form-control" v-model="mtelegram">
  </div>
  <div class="col-12 mt-3 mb-4">
    <button class="btn btn-success" style="width: 100%;" v-on:click="Saqlas_action">Saqlash</button>
  </div>
</div>

<div v-if="oknakass" class="oknamodal">
  <button type="button" class="close mb-3 mt-3 mr-3" v-on:click="modalsokass(false)">
      <span aria-hidden="true" v-on:click="showModalEditor = false">&times;</span>
  </button>
  <br>
  <h4 class="text-center">Рабочий добавлять</h4>
  <label for="" class="mx-3">Рабочий Имя</label>
  <div class="col-12">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-person-fill position-fixed mt-2 ml-2" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
      </svg>
      <input type="text" name="" class="text-right form-control" v-model="kname">
  </div>
  <label for="" class="mx-3">Рабочий Фамилия</label>
  <div class="col-12">
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-person-fill position-fixed mt-2 ml-2" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
  </svg>
      <input type="text" name="" class="text-right form-control" v-model="kfam">
  </div>
  <label for="" class="mx-3">Тел</label>
  <div class="col-12">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill position-fixed mt-2 ml-2" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
      </svg>
      <input type="text" name="" class="text-right form-control" v-model="ktel">
  </div>
  <label for="" class="mx-3">Логин</label>
  <div class="col-12">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right position-fixed mt-2 ml-2" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
        <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
      </svg>
      <input type="text" name="" class="text-right form-control" v-model="klogin">
  </div>
  <label for="" class="mx-3">Парол</label>
  <div class="col-12">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-unlock-fill position-fixed mt-2 ml-2" viewBox="0 0 16 16">
        <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z"/>
      </svg>
      <input type="text" name="" class="text-right form-control" v-model="kpassword">
  </div>
  <label for="" class="mx-3">Парол</label>
  <div class="col-12">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-database-fill-add position-fixed mt-2 ml-2" viewBox="0 0 16 16">
        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0ZM8 1c-1.573 0-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4s.875 1.755 1.904 2.223C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777C13.125 5.755 14 5.007 14 4s-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1Z"/>
        <path d="M2 7v-.839c.457.432 1.004.751 1.49.972C4.722 7.693 6.318 8 8 8s3.278-.307 4.51-.867c.486-.22 1.033-.54 1.49-.972V7c0 .424-.155.802-.411 1.133a4.51 4.51 0 0 0-4.815 1.843A12.31 12.31 0 0 1 8 10c-1.573 0-3.022-.289-4.096-.777C2.875 8.755 2 8.007 2 7Zm6.257 3.998L8 11c-1.682 0-3.278-.307-4.51-.867-.486-.22-1.033-.54-1.49-.972V10c0 1.007.875 1.755 1.904 2.223C4.978 12.711 6.427 13 8 13h.027a4.552 4.552 0 0 1 .23-2.002Zm-.002 3L8 14c-1.682 0-3.278-.307-4.51-.867-.486-.22-1.033-.54-1.49-.972V13c0 1.007.875 1.755 1.904 2.223C4.978 15.711 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.507 4.507 0 0 1-1.3-1.905Z"/>
      </svg>
      <select name="" id="" class="form-control text-center" v-on:change="toogler(magazinname)" v-model="magazinname">
        <option value="">--Магазин Выберите--</option>
        <option v-for="iteme in objectauth2.magazin" :value="iteme.id">{{ iteme.name }}</option>
      </select>
  </div>

  <div v-if="magazinname" class="col-12 mt-3 mb-4">
    <button class="btn btn-success" style="width: 100%;" v-on:click="Saqlas_kassa">Сохранить</button>
  </div>
  <div v-else class="col-12 mt-3 mb-4">
    <button class="btn btn-light" style="width: 100%;">Сохранить</button>
  </div>
</div>

</template>
