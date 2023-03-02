<script>
  import { RouterLink } from 'vue-router'
  import { mapState, mapGetters, mapActions} from 'vuex'
  import readXisFile from "read-excel-file"
  import { saveExcel } from '@progress/kendo-vue-excel-export'
  const auth = JSON.parse(localStorage.getItem('auth'));
  export default {
        data() {
            return {
              showModal: false,
              showModalDel: false,
              id: '',
              qayerga: '',
              sabap: '',
              summa: '',
              chiqimse: '',
              kurs: '',
              valyuta: '',
              login:'',
              token:'',
              statustyp: '',
              excel: []
            }
        },
        methods: {
          ...mapActions([
            'FilterAuthAc',
            'OriginalMethodUrlGet',
            'OriginalMethodUrlGetCiqim',
            'OriginalMethodUrlPost'
          ]),
          FilterAuth(){
            this.FilterAuthAc();
          },
          Localstor(){
            this.login = auth.login,
            this.token = auth.token
            this.statustyp = auth.action
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
              this.OriginalMethodUrlPost({
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
          CreateChiqim(){
            const auth = JSON.parse(localStorage.getItem('auth'));
            if (auth.method_id) {
              this.OriginalMethodUrlPost({
                'method': 'post',
                'url2': 'chiqim_post_update',
                'url': 'chiqim_get',
                'id': this.id,
                'qayerga': this.qayerga,
                'sabap': this.sabap,
                'summa': this.summa,
                'kurs': this.kurs,
                'valyuta': this.valyuta,
                'login': this.login,
                'token': this.token,
                'magazinId': auth.method_id,
                'magazin': auth.method_name,
                'status': this.statustyp,
              });
              this.Clears();
            }else{}
          },
          ChiqimDelet(){
            this.OriginalMethodUrlPost({
              'method': 'post',
              'url2': 'chiqim_delet',
              'url': 'chiqim_get',
              'id': this.id,
              'login': this.login,
              'token': this.token,
              'magazinId': auth.method_id,
              'magazin': auth.method_name,
              'status': this.statustyp,
            });
            this.Clears();
          },
          getMethod(){
            const auth = JSON.parse(localStorage.getItem('auth'));
            if (auth.method_id) {
              this.OriginalMethodUrlGet({
                'method': 'post',
                'url': 'chiqim_get',
                'login': this.login,
                'token': this.token,
                'magazinId': auth.method_id,
                'magazin': auth.method_name,
                'status': this.statustyp,
              });
            }else{}
          },
          editchiqim(resu){
            this.id = resu.id;
            this.qayerga = resu.qayerga;
            this.sabap = resu.sabap;
            this.summa = resu.summa;
            this.kurs = resu.kurs,
            this.valyuta = resu.valyuta,
            this.showModal = true;
          },
          deletchiqim(id){
            this.id = id;
            this.showModalDel = true;
          },
          Clears(){
            this.id = '',
            this.qayerga = '',
            this.sabap = '',
            this.summa = '',
            this.kurs = '',
            this.valyuta = '',
            this.showModal = false,
            this.showModalDel = false
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
          }
        },
        watch: {
          chiqimse(row){
            const auth = JSON.parse(localStorage.getItem('auth'));
            if (auth.method_id) {
              this.OriginalMethodUrlGetCiqim({
                'method': 'post',
                'url': 'chiqim_get',
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
            Itemobjects: 'Itemobjects',
            valyudata: 'valyudata'
          }),
        },
        mounted() {
          this.FilterAuth();
          this.Localstor(),
          this.getMethod()
        }
      }
</script>

<template>
  <div class="row mb-4">
    <div class="col-md-12 mb-3">
        <div class="card text-left">
            <div class="card-body">
                <button class="btn btn-success mb-2" @click="showModal = true">Расход добавлять</button>
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
                <input type='text' id="chiqim" class="chiqim" v-model="chiqimse" />
                <div class="table-responsive">
                  <div class="scroltab3">
                    <table class="tabl scroltab">
                      <thead>
                          <tr>
                              <th>Где</th>
                              <th>Проблем</th>
                              <th>Сумма</th>
                              <th>Action</th>
                          </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in Itemobjects" :key="item.id" class="tir">
                          <td>{{ item.qayerga }}</td>
                          <td>{{ item.sabap }}</td>
                          <td>{{ item.summa }} {{ item.valyuta }}</td>
                          <td>
                            <a class="text-success mr-2" v-on:click="editchiqim(item)">
                              <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                            </a>
                            <a class="text-danger mr-2" v-on:click="deletchiqim(item.id)">
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
              <h5 class="modal-title">Расход</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="showModal = false">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12 form-group mb-3">
                    <label for="firstName1">Где</label>
                    <input class="form-control" id="firstName1" type="text" v-model="qayerga" placeholder="Qayerga">
                </div>
                <div class="col-md-12 form-group mb-3">
                  <label for="firstName1">Проблем</label>
                  <input class="form-control" id="firstName1" type="text" v-model="sabap" placeholder="Sabap">
              </div>
              <div class="col-md-12 form-group mb-3">
                <label for="firstName1">Сумма</label>
                <input class="form-control" id="firstName1" type="number" v-model="summa" placeholder="Summa">
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
              <button type="button" class="btn btn-primary" v-on:click="CreateChiqim">Сохранить</button>
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
              <button type="button" class="btn btn-primary" v-on:click="ChiqimDelet">Да</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</div>
</template>
