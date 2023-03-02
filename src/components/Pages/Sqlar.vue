<script>
  import { RouterLink } from 'vue-router'
  import { mapState, mapGetters, mapActions} from 'vuex'
  import readXisFile from "read-excel-file"
  import { saveExcel } from '@progress/kendo-vue-excel-export';
  const auth = JSON.parse(localStorage.getItem('auth'));
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
  export default {
        data() {
            return {
              showModal: false,
              showModalDel: false,
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
              date:  year + "-" + monh + "-" + day,
              excel: [],
              toxtatish: false
            }
        },
        methods: {
          ...mapActions([
            'FilterAuthAc',
            'SqladMethodUrlPost',
            'SqladDB',
            'Fil_Ac',
            'Update_Ky',
            'VariantAct'
          ]),
          FilterAuth(){
            this.FilterAuthAc();
          },
          Localstor(){
            this.login = auth.login,
            this.token = auth.token,
            this.statustyp = auth.action
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
                'date': this.date,
                'login': this.login,
                'token': this.token,
                'status': this.statustyp,
                'magazinId': auth.method_id,
                'magazin': auth.method_name,
              });
              this.Clears();
            } else {}
          },
          editsq(item){
            this.id=item.id;
            this.tip=item.tip;
            this.adress=item.adress;
            this.name=item.name;
            this.ogoh=item.ogoh;
            this.soni=item.soni;
            this.olinish=item.olinish;
            this.sotilish=item.sotilish;
            this.sotilish2=item.sotilish2;
            this.shtrix=item.kod;
            this.valyuta=item.valyuta;
            this.showModal = true;
          },
          getSqlad(){
            this.SqladDB({
              'method': 'post',
              'url': 'getdb',
              'login': this.login,
              'token': this.token,
              'magazinId': auth.method_id,
              'status': this.statustyp,
            });
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
          valpush(item){
            this.tip = item.name;
            this.toxtatish = false;
          },
          tipkey(row){
            const auth = JSON.parse(localStorage.getItem('auth'));
              if (auth.method_id) {
              this.VariantAct({
                'tip': row,
              });
              this.toxtatish = true;
            }else{}
          }
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
            option1: 'option1'
          }),
        },
        mounted() {
          this.FilterAuth();
          this.Localstor(),
          this.getSqlad()
        }
      }
</script>

<template>
  <div class="row mb-4">
    <div class="col-md-12 mb-3">
        <div class="card text-left">
            <div class="card-body">
                <button class="btn btn-success mb-2" @click="showModal = true">Товар добавлять</button>
                <input type="file" id="archiveExcel" v-on:change="subirExcel()">
                <button class="btn btn-success mb-2 mx-3" v-on:click="clik">                  
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                  </svg>
                </button>
                <button class="btn btn-primary mb-2" v-on:click="exp">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                  </svg>
                </button>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" v-on:click="obnovit" class="bi bi-funnel filtddd" viewBox="0 0 16 16">
                  <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
                </svg>
                <select class="tipse text-center" v-model="filtip" name="tip" id="tip">
                  <option value="">--Filter Tip--</option>
                  <option v-for="item in tipdata">
                      {{ item.name }}
                  </option>
                </select>
                <select class="adrese text-center" v-model="filad" name="adress" id="adress">
                  <option value="">--Filter Adress--</option>
                  <option v-for="item in adressdata">
                      {{ item.name }}
                  </option>
                </select>
                <input type='text' id="tovarsq" class="tovarsq" v-model="tovarsqlad" />
                <br>
                <span class="border-bottom mx-4">
                  Сумма: $ +{{ itogaTorgo.summa }}
                </span>
                <span class="border-bottom mx-4">
                  Тип: {{ itogaTorgo.koli }}
                </span>
                <span class="border-bottom mx-4">
                  Шт: {{ itogaTorgo.sht }}
                </span>
                <div class="table-responsive">
                  <div class="scroltab3">
                    <table class="tabl scroltab">
                        <thead>
                            <tr>
                                <th>Тип</th>
                                <th>Адрес</th>
                                <th>Товар</th>
                                <th>N.1</th>
                                <th>Штрих код</th>
                                <th>Количество</th>
                                <th>Получающий</th>
                                <th>Низкая</th>
                                <th>Стандартная</th>
                                <th>Валюта</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in objects3" :key="item.id" class="tir" >
                            <!-- {{item}}  -->
                            <td>
                              <select class="keyinp2" v-on:change="updatechangeTip(item)" v-model="item.tip">
                                <option  v-for="itema in tipdata" :value="itema.name">{{itema.name}}</option>
                              </select>
                            </td>
                            <td>
                              <select class="keyinp2" v-on:change="updatechangeAdr(item)" v-model="item.adress">
                                <option  v-for="itema in adressdata" :value="itema.name">{{itema.name}}</option>
                              </select>
                            </td>
                            <td>
                              <input type="text" class="keyinp" v-on:keyup="updatekeyup(item)" v-model="item.name">
                            </td>
                            <td>
                              <input type="text" class="keyinp" v-on:keyup="updatekeyup(item)" v-model="item.ogoh"  v-if="item.ogoh > item.soni" style="background: red;">
                              <input type="text" class="keyinp" v-on:keyup="updatekeyup(item)" v-model="item.ogoh"  v-else>
                            </td>
                            <td>
                              <input type="text" class="keyinp" v-on:keyup="updatekeyup(item)" v-model="item.kod">
                            </td>
                            <td>
                              <input type="text" class="keyinp" v-on:keyup="updatekeyup(item)" v-model="item.soni">
                            </td>
                            <td>
                              <input type="text" class="keyinp" v-on:keyup="updatekeyup(item)" v-model="item.olinish">
                            </td>
                            <td>
                              <input type="text" class="keyinp" v-on:keyup="updatekeyup(item)" v-model="item.sotilish">
                            </td>
                            <td>
                              <input type="text" class="keyinp" v-on:keyup="updatekeyup(item)" v-model="item.sotilish2">
                            </td>
                            <td>
                              <select class="keyinp2" v-on:change="updatechangeVal(item)" v-model="item.valyuta">
                                <option value="">----</option>
                                <option  v-for="itema in valyudata" :value="itema.name">{{itema.name}}</option>
                              </select>
                            </td>
                            <td>                              
                              <a class="text-success mx-3 cursor-pointer" v-on:click="editsq(item)">
                                <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                              </a>
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
              <h5 class="modal-title">Товар</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" v-on:click="showModal = false">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">Тип</label>
                  <input type="text" class="form-control" v-on:keyup="tipkey(tip)" v-model="tip">
                   <div v-if="toxtatish" 
                    style="
                      position: absolute;
                      background-color: white;
                      width: 100%;
                      width: 87%;
                      z-index: 2;
                      border: 1px solid #c0c0c0;
                    ">
                    <option v-for="item in option1" :value="item.name"
                      class="cursor-pointer ho" v-on:click="valpush(item)">
                      {{item.name}}
                    </option>
                  </div>
                  <div v-else></div>
                </div>
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">Адрес</label>
                  <select class="form-control" v-model="adress" name="adress" id="adress">
                    <option v-for="item in adressdata">
                        {{item.name}}
                    </option>
                  </select>
                </div>
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">Товар</label>
                  <input class="form-control" id="firstName1" type="text" v-model="name">
                </div>
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">N.1</label>
                  <input class="form-control" id="firstName1" type="number" v-model="ogoh">
                </div>
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">Количество</label>
                  <input class="form-control" id="firstName1" type="number" v-model="soni">
                </div>
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">Получающий</label>
                  <input class="form-control" id="firstName1" type="text" v-model="olinish">
                </div>
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">Низкая</label>
                  <input class="form-control" id="firstName1" type="text" v-model="sotilish">
                </div>
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">Стандартная</label>
                  <input class="form-control" id="firstName1" type="text" v-model="sotilish2">
                </div>
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">Валюта</label>
                  <select class="form-control" v-model="valyuta" name="adress" id="adress">
                    <option v-for="item in valyudata">
                      {{item.name}}
                    </option>
                  </select>
                </div>
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">Штрих код</label>
                  <input class="form-control" id="firstName1" type="text" v-model="shtrix">
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" v-on:click="showModal = false">Назад</button>
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
              <h5 class="modal-title text-danger">Удалить</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="showModalDel = false">&times;</span>
              </button>
            </div>
              <input type="hidden" name="" id="" v-model="id">
              <div class="col-md-12 form-group mb-3">
                <input class="form-control text-center" type="text"  v-model="name" disabled>
            </div>
            <div class="modal-body text-center">
              <button type="button" class="btn btn-danger mx-2" @click="showModalDel = false">Нет</button>
              <button type="button" class="btn btn-primary" v-on:click="SqladDelet">Да</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</div>
</template>
