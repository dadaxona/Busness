<script>
  import { RouterLink, RouterView } from 'vue-router'
  import { mapState, mapGetters, mapActions} from 'vuex'
  export default {
        data() {
            return {
              showModal: false,
              id: '',
              name: '',
              summa: '',
              login:'',
              token:'',
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
            this.token = auth.token
          },
          CreateYetkazuvchi(){
            this.OriginalMethodUrlPost({
              'method': 'post',
              'url2': 'post_update_yetkaz',
              'url': 'getyetkaz',
              'id': this.id,
              'name': this.name,
              'summa': this.summa,
              'login': this.login,
              'token': this.token,
            });
            this.Clears();
          },
          edittip(id, name, summa){
            this.id = id;
            this.name = name;
            this.summa = summa;
            this.showModal = true;
          },
          getTip(){
            this.OriginalMethodUrlGet({
              'method': 'post',
              'url': 'getyetkaz',
              'login': this.login,
              'token': this.token
            });
          },
          Clears(){
            this.id = '',
            this.name = '',
            this.summa = '',
            this.showModal = false
          },
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
                <button class="btn btn-success mb-2" @click="showModal = true">Yetkazuvchi qo`shish</button>
                <input type='text' id="yerkaz" class="yerkaz" />
                <div class="table-responsive">
                  <div class="scroltab3">
                    <table class="table scroltab">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Summa</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in Itemobjects" :key="item.id">
                            <td>{{ item.name }}</td>
                            <td>{{ item.summa }}</td>
                            <td>
                              <a class="text-success mr-2" v-on:click="edittip(item.id, item.name, item.summa)">
                                <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                              </a>
                              <a class="text-danger mr-2" v-on:click="delettip(item.id)">
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
              <h5 class="modal-title">Modal Yetkazuvchi</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" v-on:click="showModal = false">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12 form-group mb-3">
                    <label for="firstName1">Name Yetkazuvchi</label>
                    <input class="form-control" id="firstName1" type="text" v-model="name" placeholder="Yetkazuvchi name">
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
</template>
