<script>
  import { RouterLink } from 'vue-router'
  import { mapState, mapGetters, mapActions} from 'vuex'
  import readXisFile from "read-excel-file"
  import { saveExcel } from '@progress/kendo-vue-excel-export'
  const auth = JSON.parse(localStorage.getItem('auth'));
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
                oknaSavdo2: false,
                showModal: false,
                showModalDel: false,
                id: '',
                id2: '',
                name: '',
                koment: '',
                summa: '',
                sana: '',
                sana2: '',
                kurs: '',
                valyuta: '',
                login:'',
                token:'',
                statustyp: '',
                filtre: '',
                date:  year + "-" + monh + "-" + day,
                date2:  year + "-" + monh,
                excel: []
            }
        },
        methods: {
            ...mapActions([
                'FilterAuthAc',
                'OriginalMethodUrlGet',
                'OriginalMethodUrlGetCiqim',
                'Saqlas_Kassa_Get',
                'OriginalMethodOylik',
                'Oyliklar'
            ]),
            FilterAuth(){
                this.FilterAuthAc();
            },
            Localstor(){
                this.login = auth.login,
                this.token = auth.token
                this.statustyp = auth.action
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
            exp(){
                saveExcel({
                data: this.Itemobjects,
                fileName: "Export",
                columns: [
                    {field: 'id'},
                    {field: 'userId'},
                    {field: 'magazinId'},
                    {field: 'magazin'},
                    {field: 'qayerga'},
                    {field: 'sabap'},
                    {field: 'summa'},
                    {field: 'kurs'},
                    {field: 'valyuta'},
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
                        'qayerga': rows[i][4],
                        'sabap': rows[i][5],
                        'summa': rows[i][6],
                        'kurs': rows[i][7],
                        'valyuta': rows[i][8],
                        });
                    }
                    this.OriginalMethodOylik({
                        'method': 'post',
                        'url2': 'post_update_chiqim_exsel',
                        'url': 'chiqim_get',
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
            Createoylik(){
                var sanav = '';
                const auth = JSON.parse(localStorage.getItem('auth'));
                if (auth.method_id) {
                    if (this.sana2) {
                        sanav = this.sana2;
                    } else {
                        sanav = this.date2;
                    }
                    this.OriginalMethodOylik({
                        'method': 'post',
                        'url2': 'oylik_create',
                        'url': 'oylikget',
                        'id': this.id,
                        'ishchilarId': this.id2,
                        'name': this.name,
                        'sana': this.sana,
                        'koment': this.koment,
                        'summa': this.summa,
                        'kurs': this.kurs,
                        'valyuta': this.valyuta,
                        'date2': sanav,
                        'login': this.login,
                        'token': this.token,
                        'magazinId': auth.method_id,
                        'magazin': auth.method_name,
                        'status': this.statustyp,
                    });
                    this.id2 = '';
                    this.sana2 = '',
                    this.sana = '';
                    this.koment = '';
                    this.summa = '';
                    this.kurs = '';
                    this.valyuta = '';
                    this.showModal = false;
                    localStorage.removeItem('oy');
                    }else{}
                },
                OyDelet(){
                    this.OriginalMethodOylik({
                        'method': 'post',
                        'url2': 'oy_delet',
                        'url': 'oylikget',
                        'id': this.id,
                        'ishchilarId': this.id2,
                        'login': this.login,
                        'token': this.token,
                        'magazinId': auth.method_id,
                        'magazin': auth.method_name,
                        'status': this.statustyp,
                    });
                    this.showModalDel = false;
                    localStorage.removeItem('oy');
                },
                getMethod(){
                    const auth = JSON.parse(localStorage.getItem('auth'));
                    if (auth.method_id) {
                        this.OriginalMethodUrlGet({
                            'method': 'post',
                            'url': 'getvalyuta',
                            'login': this.login,
                            'token': this.token,
                            'magazinId': auth.method_id,
                            'magazin': auth.method_name,
                            'status': this.statustyp,
                        });
                    } else {}
                },
                modeloy(item){
                    const auth = JSON.parse(localStorage.getItem('auth'));
                    if (item && auth.method_id) {
                        this.Saqlas_Kassa_Get({
                            'method': 'post',
                            'url2': 'kassa_post_oy',
                            'url': 'kassa_get',
                            'item': item,
                            'login': this.login,
                            'token': this.token,
                            'status': this.statustyp
                        });
                    }else{}
                },
                malumotish(item){
                    this.id = item.id;
                    this.name = item.name;
                    this.Oyliklar({
                        'method': 'post',
                        'url': 'oylikget',
                        'id': item.id,
                        'login': this.login,
                        'token': this.token,
                        'magazinId': auth.method_id,
                        'magazin': auth.method_name,
                        'status': this.statustyp
                    });
                    this.oknaSavdo2 = true;
                },
                valyu_kurs(resu){
                    if (resu) {
                        const val = this.valyudata.find(e => { if (e.name == resu) return e; });
                        this.kurs = val.summa;
                        this.valyuta = val.name;          
                    } else {
                        this.kurs = '';
                        this.valyuta = ''; 
                    }
                },
                onSubmit(){
                    this.Oyliklar({
                        'method': 'post',
                        'url': 'oylikget',
                        'id': this.id,
                        'filtre': this.filtre,
                        'login': this.login,
                        'token': this.token,
                        'magazinId': auth.method_id,
                        'magazin': auth.method_name,
                        'status': this.statustyp
                    });
                },
                oys(){
                    const row = JSON.parse(localStorage.getItem('oy'));
                    this.id2 = row.id;
                    this.sana = row.sana;
                    this.koment = row.koment;
                    this.summa = row.summa;
                    this.kurs = row.kurs;
                    this.valyuta = row.valyuta;
                    this.showModal = true;
                },
                oysdel(){
                    const row = JSON.parse(localStorage.getItem('oy'));
                    this.id2 = row.id;
                    this.showModalDel = true;
                }
            },
            computed: {
                ...mapGetters({
                    Itemobjoy: 'Itemobjoy',
                    valyudata: 'valyudata',
                    ishchila: 'ishchila'
                }),
            },
            mounted() {
                this.FilterAuth();
                this.Localstor(),
                this.Ishchi_get();
            }
        }
</script>

<template>
    <span id="clickon2" v-on:click="oys"></span>
    <span id="clickon3" v-on:click="oysdel"></span>
  <div class="row mb-4">
    <div class="col-md-12 mb-3">
        <div class="card text-left">
            <div class="card-body">
                <div class="table-responsive">
                    <div class="scroltab3">
                        <table class="tabl scroltab">
                            <thead>
                                <tr>
                                    <th>Имя</th>
                                    <th>Телефон</th>
                                    <th>Логин</th>
                                    <th>Зарплата</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in ishchila" :key="item.id" class="tir">
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.tel }}</td>
                                    <td>{{ item.login }}</td>
                                    <td><input type="text" v-on:keyup="modeloy(item)" v-model="item.oylik" style="border: none;"></td>
                                    <td>
                                        <a class="text-primary mr-2" v-on:click="malumotish(item)">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-clipboard2-data-fill mt-0" style="cursor: pointer; margin-top: -5px !important;" viewBox="0 0 16 16">
                                                <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5Z"/>
                                                <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585c.055.156.085.325.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5c0-.175.03-.344.085-.5ZM10 7a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7Zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1Zm4-3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1Z"/>
                                            </svg>
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

<div v-if="oknaSavdo2" class="div1">
    <div class="div25457">
        <button class="btn btn-success mt-2" v-on:click="showModal = true">Зарплата</button>
        <!-- <input type="file" id="archiveExcel" v-on:change="subirExcel()">
        <button class="btn btn-success mt-2 mx-3" v-on:click="clik">                  
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
          </svg>
        </button>
        <button class="btn btn-primary mt-2" v-on:click="exp">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
          </svg>
        </button> -->
        <button type="button" class="close mb-3 mt-3 mr-3" v-on:click="oknaSavdo2 = false">
            <span aria-hidden="true">&times;</span>
        </button>
        <!-- <h4 class="mx-2 mt-3">Jami Summa: $ +{{ JamisummaSotuv }}</h4> -->
        <div class="table-responsive">
            <div class="scro">
                <table class="tabl scroltab">
                    <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Дата 
                                <form @submit.prevent="onSubmit" style="width: 10px;">
                                    <input type="text" class="p-0" v-model="filtre" placeholder="2020-01">
                                </form>
                            </th>
                            <th>Комент</th>
                            <th>Итог</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody v-html="Itemobjoy">
                    </tbody>
                </table>
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
                <h5 class="modal-title">{{ name }}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" @click="showModal = false">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                    <div class="col-md-6 form-group mb-3">
                        <label for="firstName1">Дата 1</label>
                        <input class="form-control" id="firstName1" type="text" v-model="sana2" placeholder="2023-01">
                    </div>
                  <div class="col-md-6 form-group mb-3">
                      <label for="firstName1">Дата 2</label>
                      <input class="form-control" id="firstName1" type="date" v-model="sana">
                  </div>
                  <div class="col-md-12 form-group mb-3">
                    <label for="firstName1">Коментария</label>
                    <input class="form-control" id="firstName1" type="text" v-model="koment" placeholder="Коментария">
                </div>
                <div class="col-md-12 form-group mb-3">
                  <label for="firstName1">Сумма</label>
                  <input class="form-control" id="firstName1" type="number" v-model="summa" placeholder="Сумма">
                </div>
                <div class="col-md-12 form-group mb-3">
                  <label for="firstName1">Валюта</label>
                  <select class="form-control" v-on:change="valyu_kurs(valyuta)" v-model="valyuta">
                    <option value="">----</option>
                    <option  v-for="itema in valyudata" :value="itema.name">{{itema.name}}</option>
                  </select>
                </div>
              </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="showModal = false">Назад</button>
                <button type="button" class="btn btn-primary" v-on:click="Createoylik">Сохранить</button>
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
                <h5 class="modal-title text-danger">Удалить</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" @click="showModalDel = false">&times;</span>
                </button>
              </div>
              <div class="modal-body text-center">
                <button type="button" class="btn btn-danger mx-2" @click="showModalDel = false">Нет</button>
                <button type="button" class="btn btn-primary" v-on:click="OyDelet">Да</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
