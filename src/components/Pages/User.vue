<script>
  import { RouterLink } from 'vue-router'
  import { mapState, mapGetters, mapActions} from 'vuex'
  export default {
        data() {
            return {
              login:'',
              token:'',
              statustyp: '',
              id: '',
              name: '',
              firma: '',
              tel: '',
              telegram: '',
              summa: 0,
              Searvh: '',
              showModal: false,
              showModalDel: false
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
          deletmij(id, name){
            this.id = id,
            this.name = name,
            this.showModalDel = true
          },
          UserDelet(){
            this.OriginalMethodUrlPost({
              'method': 'post',
              'url2': 'mijozdelete',
              'url': 'mijozget',
              'id': this.id,
              'login': this.login,
              'token': this.token,
              'status': this.statustyp,
            });
            this.Clears();
          },
          SaveUser(){
            const auth = JSON.parse(localStorage.getItem('auth'));
            if (auth.method_id) {
              this.OriginalMethodUrlPost({
                'method': 'post',
                'url2': 'mijozcreate',
                'url': 'mijozget',
                'id': this.id,
                'login': this.login,
                'token': this.token,
                'magazinId': auth.method_id,
                'magazin': auth.method_name,
                'status': this.statustyp,
                'name': this.name,
                'firma': this.firma,
                'tel': this.tel,
                'telegram': this.telegram,
                'summa': this.summa,
              });
              this.Clears();              
            } else {
              
            }
          },
          OriginalGet(){
            const auth = JSON.parse(localStorage.getItem('auth'));
            if (auth.method_id) {
              this.OriginalMethodUrlGet({
                'method': 'post',
                'url': 'mijozget',
                'login': this.login,
                'token': this.token,
                'magazinId': auth.method_id,
                'magazin': auth.method_name,
                'status': this.statustyp,
              });
            }else{}
          },
          editmij(item){
            this.id = item.id,
            this.name = item.name,
            this.firma = item.firma,
            this.tel = item.tel,
            this.telegram = item.telegram
            this.summa = item.summa,
            this.showModal = true
          },
          Clears(){
            this.id = '',
            this.name = '',
            this.firma = '',
            this.tel = '',
            this.telegram = '',
            this.summa = 0,
            this.showModal = false,
            this.showModalDel = false
        }, 
        
      },
      watch: {
        Searvh(row){
          this.OriginalMethodUrlGet({
            'method': 'post',
            'url': 'mijozget',
            'search': row,
            'login': this.login,
            'token': this.token,
            'status': this.statustyp,
          });
        }
      },
      computed: {
          ...mapGetters({
            Itemobjects: "Itemobjects",
          }),
        },
        mounted() {
          this.FilterAuth();
          this.Localstor();
          this.OriginalGet();
        }
    }
</script>

<template>
  <div class="row mb-4">
    <div class="col-md-12 mb-3">
        <div class="card text-left">
            <div class="card-body">
                <button class="btn btn-success mb-2" @click="showModal = true">Mijoz qo'shish</button>
                <input type='text' id="usersearch" class="usersearch" v-model="Searvh"/>
                <div class="table-responsive">
                  <div class="scroltab3">
                    <table class="tabl scroltab">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Firma INN</th>
                                <th>Tel</th>
                                <th>Telegram</th>
                                <th>Balans</th>
                                <th>Karz</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in Itemobjects" :key="item.id" class="tir">
                            <td>{{ item.name }}</td>
                            <td>{{ item.firma }}</td>
                            <td>{{ item.tel }}</td>
                            <td>{{ item.telegram }}</td>
                            <td class="text-success">{{ item.summa }}</td>
                            <td class="text-danger">{{ item.karz }}</td>
                            <td>
                              <a class="text-success mr-2" v-on:click="editmij(item)">
                                <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                              </a>
                              <a class="text-danger mr-2" v-on:click="deletmij(item.id, item.name)">
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
              <h5 class="modal-title">Create User</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="showModal = false">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12 form-group mb-3">
                    <label for="firstName1">First name</label>
                    <input class="form-control" id="firstName1" type="text" v-model="name" placeholder="Enter name">
                </div>
                <div class="col-md-12 form-group mb-3">
                    <label for="lastName1">Enter firma</label>
                    <input class="form-control" id="lastName1" type="text" v-model="firma" placeholder="Enter firma">
                </div>
                <div class="col-md-12 form-group mb-3">
                    <label for="exampleInputEmail1">Enter tel</label>
                    <input class="form-control" id="phone" type="text" v-model="tel" placeholder="Enter tel">
                </div>
                <div class="col-md-12 form-group mb-3">
                    <label for="phone">Enter telegram</label>
                    <input class="form-control" id="telegram" type="text"  v-model="telegram" placeholder="Enter telegram">
                </div>
                <div class="col-md-12 form-group mb-3">
                  <label for="balans">Balans</label>
                  <input class="form-control" id="summa" type="text"  v-model="summa" placeholder="Balans">
                </div>
            </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
              <button type="button" class="btn btn-primary" v-on:click="SaveUser">Save changes</button>
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
              <h5 class="modal-title text-danger">Delete Mijoz</h5>
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
              <button type="button" class="btn btn-primary" v-on:click="UserDelet">Yes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</div>

</template>
