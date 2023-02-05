<script>
  import { RouterLink, RouterView } from 'vue-router'
  import { mapState, mapGetters, mapActions} from 'vuex'
  export default {
        data() {
            return {
              showModal: false,
              showModalDel: false,
              id: '',
              name: '',
              summa: '',
              valy: '',
              login:'',
              token:'',
              statustyp: '',
            }
        },
        methods: {
          ...mapActions([
            'FilterAuthAc',
            'OriginalMethodUrlGet',
            'OriginalMethodUrlPost'
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
          CreateYetkazuvchi(){
            const auth = JSON.parse(localStorage.getItem('auth'));
            if (auth.method_id) {
              this.OriginalMethodUrlPost({
                'method': 'post',
                'url2': 'post_update_valyuta',
                'url': 'getvalyuta',
                'id': this.id,
                'name': this.name,
                'summa': this.summa,
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
          edittip(id, name, summa){
            this.id = id;
            this.name = name;
            this.summa = summa;
            this.showModal = true;
          },
          getTip(){
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
          delettip(id, name){
            this.id = id;
            this.name = name,
            this.showModalDel = true;
          },
          YetkazDelet(){
            this.OriginalMethodUrlPost({
              'method': 'post',
              'url2': 'valyuta_delete',
              'url': 'getvalyuta',
              'id': this.id,
              'login': this.login,
              'token': this.token,
              'status': this.statustyp,
            });
            this.Clears();
          },
          Clears(){
            this.id = '',
            this.name = '',
            this.summa = '',
            this.showModal = false,
            this.showModalDel = false
          },
        },
        watch: {
          valy(row){
            const auth = JSON.parse(localStorage.getItem('auth'));
            if (auth.method_id) {
              this.OriginalMethodUrlGet({
                'method': 'post',
                'url': 'getvalyuta',
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
            Itemobjects: 'Itemobjects'
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
                <button class="btn btn-success mb-2" @click="showModal = true">Valyuta qo`shish</button>
                <input type='text' id="valyuta" class="valyuta" v-model="valy"/>
                <div class="table-responsive">
                  <div class="scroltab3">
                    <table class="tabl scroltab">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Summa</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in Itemobjects" :key="item.id" class="tir">
                            <td>{{ item.name }}</td>
                            <td>{{ item.summa }}</td>
                            <td>
                              <a class="text-success mr-2" v-on:click="edittip(item.id, item.name, item.summa)">
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
              <h5 class="modal-title">Modal Valyuta</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" v-on:click="showModal = false">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12 form-group mb-3">
                    <label for="firstName1">Name Valyuta</label>
                    <input class="form-control" id="firstName1" type="text" v-model="name" placeholder="Valyuta name">
                </div>
                <div class="col-md-12 form-group mb-3">
                  <label for="firstName1">Summa</label>
                  <input class="form-control" id="firstName1" type="number" v-model="summa" placeholder="Summa">
              </div>
            </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" v-on:click="showModal = false">Close</button>
              <button type="button" class="btn btn-primary" v-on:click="CreateYetkazuvchi">Save changes</button>
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
              <h5 class="modal-title text-danger">Delete Valyuta</h5>
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
              <button type="button" class="btn btn-primary" v-on:click="YetkazDelet">Yes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</div>
</template>
