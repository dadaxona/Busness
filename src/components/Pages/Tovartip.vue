<script>
  import { RouterLink } from 'vue-router'
  import { mapState, mapGetters, mapActions} from 'vuex'
  export default {
        data() {
            return {
              login:'',
              token:'',
              statustyp: '',
              userdatatip: '',
              idtip: '',
              nametip: '',
              tiptov: '',
              showModal: false,
              showModalDal: false
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
          getTip(){
            const auth = JSON.parse(localStorage.getItem('auth')).method_id;
            if (auth) {
              this.OriginalMethodUrlGet({
                'method': 'post',
                'url': 'gettip',
                'login': this.login,
                'token': this.token,
                'magazinId': auth,
                'status': this.statustyp,
              });
            } else {}
          },
          edittip(id, name){
            this.idtip = id,
            this.nametip = name,
            this.showModal = true
          },
          CreateTip(){
            const auth = JSON.parse(localStorage.getItem('auth')).method_id;
            if (auth) {
              this.OriginalMethodUrlPost({
                'method': 'post',
                'url2': 'post_update',
                'url': 'gettip',
                'id': this.idtip,
                'name': this.nametip,
                'login': this.login,
                'token': this.token,
                'status': this.statustyp,
                'magazinId': auth,
              });
              this.Clears();
            } else {}
          },
          delettip(id, name){
            this.idtip = id,
            this.nametip = name,
            this.showModalDal = true
          },
          TipsDelet(){
            this.OriginalMethodUrlPost({
              'method': 'post',
              'url2': 'tipsdelete',
              'url': 'gettip',
              'id': this.idtip,
              'login': this.login,
              'token': this.token,
              'status': this.statustyp,
            });
            this.Clears();
          },
          Clears(){
            this.idtip = '',
            this.nametip = '',
            this.showModal = false,
            this.showModalDal = false
          },
        },
        watch: {
          tiptov(row){
            const auth = JSON.parse(localStorage.getItem('auth')).method_id;
              if (auth) {
              this.OriginalMethodUrlGet({
                'method': 'post',
                'url': 'gettip',
                'search': row,
                'login': this.login,
                'token': this.token,
                'magazinId': auth,
                'status': this.statustyp,
              });
            } else {}
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
                <button class="btn btn-success mb-2" v-on:click="showModal = true">Tip qo`shish</button>
                <input type='text' id="tiptov" class="tiptov" v-model="tiptov" />
                <div class="table-responsive">
                  <div class="scroltab3">
                    <table class="tabl scroltab">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in Itemobjects" :key="item.id" class="tir">
                            <td>{{ item.name }}</td>
                            <td>
                              <a class="text-success mr-2" v-on:click="edittip(item.id, item.name)">
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
              <h5 class="modal-title">Modal Tip</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" v-on:click="showModal = false">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12 form-group mb-3">
                    <label for="firstName1">Tip Name</label>
                    <input class="form-control" id="firstName1" type="text" v-model="nametip" placeholder="Tip name">
                </div>
            </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" v-on:click="showModal = false">Close</button>
              <button type="button" class="btn btn-primary" v-on:click="CreateTip">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</div>


<div v-if="showModalDal">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-danger">Delete Tip</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="showModalDal = false">&times;</span>
              </button>
            </div>
              <input type="hidden" name="" id="" v-model="id">
              <div class="col-md-12 form-group mb-3">
                <input class="form-control text-center" type="text"  v-model="nametip" disabled>
            </div>
            <div class="modal-body text-center">
              <button type="button" class="btn btn-danger mx-2" @click="showModalDal = false">No</button>
              <button type="button" class="btn btn-primary" v-on:click="TipsDelet">Yes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</div>
</template>
