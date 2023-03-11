<script>
  import { RouterLink } from 'vue-router'
  import { mapState, mapGetters, mapActions} from 'vuex'
  import readXisFile from "read-excel-file"
  import { saveExcel } from '@progress/kendo-vue-excel-export';
  const auth = JSON.parse(localStorage.getItem('auth'));
  export default {
        data() {
            return {
              showModal: false,
              showModalDel: false,
              id: '',
              name: '',
              summa: 0,
              kurs: '',
              valyuta: '',
              yerkazse: '',
              login:'',
              token:'',
              statustyp: '',
              excel: [],
              arx: {
                id: '',
                name: '',
                soni: '',
                summa: '',
              },
              arxivyid: '',
              arxivsana: '',
              arxivModal: false,
              arxivModaledit: false,
            }
        },
        methods: {
          ...mapActions([
            'FilterAuthAc',
            'OriginalMethodUrlGet',
            'OriginalMethodUrlPost',
            'GetyArxive',
            'UpdateArxivAct'
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
              data: this.Itemobjects,
              fileName: "Export",
              columns: [
                {field: 'id'},
                {field: 'name'},
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
            const auth = JSON.parse(localStorage.getItem('auth'));
            readXisFile(input.files[0]).then((rows)=>{
              for (let i = 1; i < rows.length; i++) {
                this.excel.push({
                  'magazinId': auth.method_id,
                  'magazin': auth.method_name,
                  'name': rows[i][1],
                  'summa': rows[i][2],
                  'kurs': rows[i][3],
                  'valyuta': rows[i][4],
                });
              }
              this.OriginalMethodUrlPost({
                  'method': 'post',
                  'url2': 'post_update_yetkaz_exsel',
                  'url': 'getyetkaz',
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
          CreateYetkazuvchi(){
            if (auth.method_id) {
              this.OriginalMethodUrlPost({
                'method': 'post',
                'url2': 'post_update_yetkaz',
                'url': 'getyetkaz',
                'id': this.id,
                'name': this.name,
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
            } else {
              
            }
          },
          edittip(resu){
            this.id = resu.id;
            this.name = resu.name;
            this.summa = resu.summa;
            this.kurs = resu.kurs;
            this.valyuta = resu.valyuta;            
            this.showModal = true;
          },
          getTip(){
            if (auth.method_id) {
              this.OriginalMethodUrlGet({
                'method': 'post',
                'url': 'getyetkaz',
                'login': this.login,
                'token': this.token,
                'magazinId': auth.method_id,
                'magazin': auth.method_name,
                'status': this.statustyp,
              });
            } else {}
          },
          delettip(id, name){
            this.id = id;
            this.name = name,
            this.showModalDel = true;
          },
          YetkazDelet(){
            this.OriginalMethodUrlPost({
              'method': 'post',
              'url2': 'yetkaz_delete',
              'url': 'getyetkaz',
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
            this.id = '',
            this.name = '',
            this.summa = 0,
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
          },
          arxiv(id){
            this.arxivsana = '';
            this.arxivyid = id;
            this.GetyArxive({
              'method': 'post',
              'url': 'getyarxive',
              'yetkazuvchiId': this.arxivyid,
              'login': this.login,
              'token': this.token,
              'magazinId': auth.method_id,
              'magazin': auth.method_name,
              'status': this.statustyp,
            });
            this.arxivModal = true;
          },
          arxivdate(date){
            this.GetyArxive({
              'method': 'post',
              'url': 'getyarxive',
              'yetkazuvchiId': this.arxivyid,
              'sana': date,
              'login': this.login,
              'token': this.token,
              'magazinId': auth.method_id,
              'magazin': auth.method_name,
              'status': this.statustyp,
            });
          },
          editarxiv(item){
            this.arx.id = item.id;
            this.arx.name = item.name;
            this.arx.soni = item.soni;
            this.arx.summa = item.summa;
            this.arxivModaledit = true;
          },
          UpdateArxiv(){
            this.UpdateArxivAct({
              'method': 'post',
              'url': 'update_arxive',
              'id': this.arx.id,
              'soni': this.arx.soni,
              'summa': this.arx.summa,
              'yetkazuvchiId': this.arxivyid,
              'login': this.login,
              'token': this.token,
              'magazinId': auth.method_id,
              'magazin': auth.method_name,
              'status': this.statustyp,
            });
            this.arx.id = '';
            this.arx.name = '';
            this.arx.soni = '';
            this.arx.summa = '';
            this.arxivModaledit = false;
          }
        },
        watch: {
          yerkazse(row){
            const auth = JSON.parse(localStorage.getItem('auth'));
            if (auth.method_id) {
              this.OriginalMethodUrlGet({
                'method': 'post',
                'url': 'getyetkaz',
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
            valyudata: 'valyudata',
            arxive: 'arxive',
          }),
        },
        mounted() {
          this.FilterAuth();
          this.Localstor(),
          this.getTip()
        }
      }
</script>

<template>
  <div class="row mb-4">
    <div class="col-md-12 mb-3">
        <div class="card text-left">
            <div class="card-body">
                <button class="btn btn-success mb-2" @click="showModal = true">Доставщик добавлять</button>
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
                <input type='text' id="yerkaz" class="yerkaz" v-model="yerkazse" />
                <div class="table-responsive">
                  <div class="scroltab3">
                    <table class="tabl scroltab">
                        <thead>
                            <tr>
                                <th>Доставщик</th>
                                <th>Сумма</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in Itemobjects" :key="item.id" class="tir">
                            <td>{{ item.name }}</td>
                            <td>{{ item.summa }} {{ item.valyuta }}</td>
                            <td>
                              <a class="cursor-pointer text-success" v-on:click="edittip(item)">
                                <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                              </a>
                              <a class="cursor-pointer text-danger mx-3" v-on:click="delettip(item.id, item.name)">
                                <i class="nav-icon i-Close-Window font-weight-bold"></i>
                              </a>
                              <a class="text-primary" v-on:click="arxiv(item.id)">
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
<div v-if="showModal">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Доставщик</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" v-on:click="showModal = false">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12 form-group mb-3">
                    <label for="firstName1">Имя Доставщик</label>
                    <input class="form-control" id="firstName1" type="text" v-model="name" placeholder="Имя Доставщик">
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
              <button type="button" class="btn btn-secondary" v-on:click="showModal = false">Назад</button>
              <button type="button" class="btn btn-primary" v-on:click="CreateYetkazuvchi">Сохранить</button>
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
              <button type="button" class="btn btn-primary" v-on:click="YetkazDelet">Да</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</div>

<div v-if="arxivModal" class="div1">
  <div class="div25457">
      <button type="button" class="close mb-3 mt-3 mr-3" v-on:click="arxivModal = false">
          <span aria-hidden="true">&times;</span>
      </button>
      <h4 class="mx-2 mt-3">Jami Summa: $ +{{ arxive.JamisummaSotuv }}</h4>
      <div class="table-responsive">
          <div class="scro">
              <table class="tabl scroltab">
                  <thead>
                      <tr>
                          <th>Доставщик</th>
                          <th>Кол-во</th>
                          <th>Покупка</th>
                          <th>Итого</th>
                          <th><input type="date" v-on:change="arxivdate(arxivsana)" v-model="arxivsana"></th>
                          <th>Обновлять</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr class="tir" v-for="item in arxive.obj" :key="item.id">
                          <td>
                              {{ item.name }}
                          </td>
                          <td>
                              {{ item.soni }}
                          </td>
                          <td>
                              {{ item.summa | formatNumber }}
                          </td>
                          <td>
                              {{ item.jami | formatNumber }} {{ item.valyuta }}
                          </td>
                          <td>
                            {{ item.sana }}
                        </td>
                          <td>
                            <a class="cursor-pointer text-success" v-on:click="editarxiv(item)">
                              <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                            </a>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
  </div>
</div>

<div v-if="arxivModaledit">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ arx.name }}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" v-on:click="arxivModaledit = false">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12 form-group mb-3">
                  <label for="firstName1">Шт</label>
                  <input class="form-control" type="number" v-model="arx.soni" placeholder="Шт">
                </div>
                <div class="col-md-12 form-group mb-3">
                  <label for="firstName1">Сумма</label>
                  <input class="form-control" type="text" v-model="arx.summa" placeholder="Сумма">
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" v-on:click="arxivModaledit = false">Назад</button>
              <button type="button" class="btn btn-primary" v-on:click="UpdateArxiv">Сохранить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</div>

</template>
