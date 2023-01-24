<script>
  import { RouterLink } from 'vue-router'
  import { mapState, mapGetters, mapActions} from 'vuex'
  export default {
        data() {
            return {
              showModal: false,
              showModalDel: false,
              id: '',
              qayerga: '',
              sabap: '',
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
          CreateChiqim(){
            this.OriginalMethodUrlPost({
              'method': 'post',
              'url2': 'chiqim_post_update',
              'url': 'chiqim_get',
              'id': this.id,
              'qayerga': this.qayerga,
              'sabap': this.sabap,
              'summa': this.summa,
              'login': this.login,
              'token': this.token,
            });
            this.Clears();
          },
          ChiqimDelet(){
            this.OriginalMethodUrlPost({
              'method': 'post',
              'url2': 'chiqim_delet',
              'url': 'chiqim_get',
              'id': this.id,
              'login': this.login,
              'token': this.token,
            });
            this.Clears();
          },
          getMethod(){
            this.OriginalMethodUrlGet({
              'method': 'post',
              'url': 'chiqim_get',
              'login': this.login,
              'token': this.token
            });
          },
          editchiqim(id, qayerga, sabap, summa){
            this.id = id;
            this.qayerga = qayerga;
            this.sabap = sabap;
            this.summa = summa;
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
            this.showModal = false,
            this.showModalDel = false
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
          this.getMethod()
        }
      }
</script>

<template>
  <div class="row mb-4">
    <div class="col-md-12 mb-3">
        <div class="card text-left">
            <div class="card-body">
                <button class="btn btn-success mb-2" @click="showModal = true">Chiqim qo`shish</button>
                <input type='text' id="chiqim" class="chiqim" />
                <div class="table-responsive">
                  <div class="scroltab3">
                    <table class="table scroltab">
                        <thead>
                            <tr>
                                <th>Qayerga</th>
                                <th>Sabap</th>
                                <th>Summa</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in Itemobjects" :key="item.id">
                            <td>{{ item.qayerga }}</td>
                            <td>{{ item.sabap }}</td>
                            <td>{{ item.summa }}</td>
                            <td>
                              <a class="text-success mr-2" v-on:click="editchiqim(item.id, item.qayerga, item.sabap, item.summa)">
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
              <h5 class="modal-title">Modal Chiqim</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="showModal = false">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12 form-group mb-3">
                    <label for="firstName1">Qayerga</label>
                    <input class="form-control" id="firstName1" type="text" v-model="qayerga" placeholder="Qayerga">
                </div>
                <div class="col-md-12 form-group mb-3">
                  <label for="firstName1">Sabap</label>
                  <input class="form-control" id="firstName1" type="text" v-model="sabap" placeholder="Sabap">
              </div>
              <div class="col-md-12 form-group mb-3">
                <label for="firstName1">Summa</label>
                <input class="form-control" id="firstName1" type="number" v-model="summa" placeholder="Summa">
            </div>
            </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
              <button type="button" class="btn btn-primary" v-on:click="CreateChiqim">Save changes</button>
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
              <h5 class="modal-title text-danger">Delete Chiqim</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="showModalDel = false">&times;</span>
              </button>
            </div>
            <div class="modal-body text-center">
              <button type="button" class="btn btn-danger mx-2" @click="showModalDel = false">No</button>
              <button type="button" class="btn btn-primary" v-on:click="ChiqimDelet">Yes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</div>
</template>
