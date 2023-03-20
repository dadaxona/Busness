<script>
import { Fragment } from 'vue';
  import { RouterLink } from 'vue-router'
  import { mapState, mapGetters, mapActions} from 'vuex'
  const auth = JSON.parse(localStorage.getItem('auth'));
  export default {
        data() {
            return {
                showModal: false,
                login:'',
                token:'',
                statustyp: '',
                ty: '',
                id: '',
                ishchilarId: '',
                name: '',
                zadacha: '',
                sana: '',
                stasus: '',
            }
        },
        methods: {
          ...mapActions([
            'FilterAuthAc',
            'Zadacha_Ac',
            'Zadacha_Create_Ac',
            'Zadacha_Update_Ac',
            'Delete_zada_Ac'
          ]),
          FilterAuth(){
            this.FilterAuthAc();
          },
          Localstor(){
            this.login = auth.login,
            this.token = auth.token,
            this.statustyp = auth.action
            this.ty = auth.ty
          },
         getZadachi(){
            if (auth.method_id) {
                this.Zadacha_Ac({
                    'method': 'post',
                    'url': 'getzadacha',
                    'login': this.login,
                    'token': this.token,
                    'status': this.statustyp,
                    'magazinId': auth.method_id,
                    'magazin': auth.method_name,
                });                
            } else {}
         },
         create_zadacha(){
            if (auth.method_id) {
                var st = '';
                if (this.ishchilarId) {
                    st = 1;
                } else {
                    st = 0;
                }
                this.Zadacha_Create_Ac({
                    'method': 'post',
                    'url': 'getzadacha',
                    'url2': 'create_zad',
                    'id': this.id,
                    'ishchilarId': this.ishchilarId,
                    'name': this.name,
                    'zadacha': this.zadacha,
                    'sana': this.sana,
                    'stasus': st,
                    'login': this.login,
                    'token': this.token,
                    'status': this.statustyp,
                    'magazinId': auth.method_id,
                    'magazin': auth.method_name,
                });
                this.id = '';
                this.ishchilarId = '';
                this.name = '';
                this.zadacha = '';
                this.sana = '';
                this.stasus = '';
                this.showModal = false;
                this.getZadachi();
            } else {}
        },
        editzadachi(item){
            this.id = item.id;
            this.ishchilarId = item.ishchilarId;
            this.name = item.name;
            this.zadacha = item.zadacha;
            this.sana = item.sana;
            this.stasus = item.stasus;
            this.showModal = true;
        },
        updatech(item){
            var st = '';
            if (item.ishchilarId) {
                st = 1;
            } else {
                st = 0;
            }
            if (auth.method_id) {
                this.Zadacha_Create_Ac({
                    'method': 'post',
                    'url': 'getzadacha',
                    'url2': 'create_zad',
                    'id': item.id,
                    'ishchilarId': item.ishchilarId,
                    'name': item.name,
                    'zadacha': item.zadacha,
                    'sana': item.sana,
                    'stasus': st,
                    'login': this.login,
                    'token': this.token,
                    'status': this.statustyp,
                    'magazinId': auth.method_id,
                    'magazin': auth.method_name,
                });
                this.getZadachi();
            } else {}
        },
        bajarildi(item){
            if (auth.method_id) {
                this.Zadacha_Create_Ac({
                    'method': 'post',
                    'url': 'getzadacha',
                    'url2': 'create_zad',
                    'id': item.id,
                    'ishchilarId': item.ishchilarId,
                    'name': item.name,
                    'zadacha': item.zadacha,
                    'sana': item.sana,
                    'stasus': 2,
                    'login': this.login,
                    'token': this.token,
                    'status': this.statustyp,
                    'magazinId': auth.method_id,
                    'magazin': auth.method_name,
                });
                this.getZadachi();
            } else {}
        },
        delete_zada(item){
            if (auth.method_id) {
                this.Delete_zada_Ac({
                    'method': 'post',
                    'url': 'getzadacha',
                    'url2': 'delete_zad',
                    'id': item,
                    'login': this.login,
                    'token': this.token,
                    'status': this.statustyp,
                    'magazinId': auth.method_id,
                    'magazin': auth.method_name,
                });
            } else {}
        }
        },
        computed: {
          ...mapGetters({
            IshchiZad: 'IshchiZad',
          }),
        },
        mounted() {
          this.FilterAuth();
          this.Localstor();
          this.getZadachi();
        }
    }
</script>

<template>
  <div class="row mb-4">
    <div class="col-md-12 mb-3">
        <div class="card text-left">
            <div class="card-body">
                <button v-if="ty == 'brend'" class="btn btn-success mb-2" v-on:click="showModal = true">Задачи добавлять</button>
                <button v-if="ty == 'Продавец' || ty == 'Простой'" class="btn btn-dark mb-2">Задачи добавлять</button>
                <div class="table-responsive">
                  <div class="scrtel">
                    <table class="tabl scroltel2">
                        <thead>
                            <tr>
                                <th>Дата</th>
                                <th>Задачи</th>
                                <th>Роботи</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in IshchiZad.zad" :key="item.id" class="tir">
                            <td>
                                {{item.sana}}
                            </td>
                            <td>
                                {{item.zadacha}}
                            </td>
                            <td>
                                <select type="text" style="width: 60%;" v-on:change="updatech(item)" v-model="item.ishchilarId">
                                    <option value="">----</option>
                                    <option v-for="itema in IshchiZad.ish" :value="itema.id">{{itema.name}}</option>
                                </select>
                            </td>
                            <td>
                                <span v-if="item.stasus == '0'" style="display: block;"></span>
                                <span v-if="item.stasus == '1'" style="background-color: yellow; display: block;">Отправил</span>
                                <span v-if="item.stasus == '2'" style="background-color: green; color: white; display: block;">Готово</span>
                            </td>
                            <td>
                                <a v-if="ty == 'brend'" class="text-primary" v-on:click="editzadachi(item)">
                                    <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                                </a>
                                <a class="text-success mx-3" v-on:click="bajarildi(item)">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-check" viewBox="0 0 16 16">
                                        <path d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                        <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                                    </svg>
                                </a>
                                <a v-if="ty == 'brend'" class="text-danger" v-on:click="delete_zada(item.id)">
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
              <h5 class="modal-title">Задача Окна</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" v-on:click="showModal = false">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12 form-group mb-3">
                        <label for="firstName1">Дата</label>
                        <input class="form-control" id="firstName1" type="date" v-model="sana">
                    </div>
                    <div class="col-md-12 form-group mb-3">
                        <label for="firstName1">Задача</label>
                        <input class="form-control" id="firstName1" type="text" v-model="zadacha" placeholder="Задача">
                    </div>
                    <div class="col-md-12 form-group mb-3">
                        <label for="firstName1">Выбирать Рабочий</label>
                        <select class="form-control" v-model="ishchilarId">
                            <option value="">--Выбирать--</option>
                            <option v-for="itema in IshchiZad.ish" :value="itema.id">{{itema.name}}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" v-on:click="showModal = false">Назад</button>
              <button type="button" class="btn btn-primary" v-on:click="create_zadacha">Сохранить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</div>

</template>