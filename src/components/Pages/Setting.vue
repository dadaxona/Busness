<script>
  import { RouterLink } from 'vue-router'
  import { mapState, mapGetters, mapActions} from 'vuex'
  export default {
        data() {
            return {
              showModal: false,
              showModalDel5: false,
              pasw: '',
              id: '',
              name: '',
              login2: '',
              biznes: '',
              password: '',
              login: '', 
              token: '',
              statustyp: '',
            }
        },
        methods: {
          ...mapActions([
            'FilterAuthAc',
            'Origi_Ac',
            'OrigiPost_Ac',
            'UserProfilDel_Ac'
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
          Origin(){
            this.Origi_Ac({
              'method': 'post',
              'url': 'userget',
              'login': this.login,
              'token': this.token,
              'status': this.statustyp,
            });
          },
          edirer(result){
            this.id = result.id,
            this.name = result.name,
            this.login2 = result.login,
            this.biznes = result.biznes,
            this.password = result.password,
            this.showModal = true
          },
          SubmiteForm(){
            this.OrigiPost_Ac({
              'method': 'post',
              'url2': 'user_update_any',
              'url': 'userget',
              'id': this.id,
              'name': this.name,
              'login2': this.login2,
              'biznes': this.biznes,
              'password': this.password,
              'login': this.login,
              'token': this.token,
              'status': this.statustyp,
            });
            this.cleare();
          },
          deleter(item){
            this.id = item.id,
            this.name = item.name,
            this.password = item.password,
            this.showModalDel5 = true
          },
          UserProfilDel(){
            if (this.pasw == this.password) {
              this.UserProfilDel_Ac({
                'method': 'post',
                'url': 'user_del_clear',
                'id': this.id,
              })
            } else {
              
            }
          },
          cleare(){
            this.id = '',
            this.name = '',
            this.login2 = '',
            this.biznes = '',
            this.password = '',
            this.showModal = false,
            this.showModalDel5 = false
          },
        },
        computed: {
          ...mapGetters({
            userdata: "userdata",
          }),
        },
        mounted() {
          this.FilterAuth();
          this.Localstor();
          this.Origin();
        }
      }
</script>

<template>
  <div class="row mb-4">
    <div class="col-md-12 mb-3">
        <div class="card text-left">
            <div class="card-body">
              <h4>User Profil</h4>
                <div class="table-responsive">
                  <div class="scroltab3">
                    <table class="tabl scroltab">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Login</th>
                                <th>Biznes type</th>
                                <th>Password</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in userdata" :key="item.id" class="tir">
                            <td>{{ item.name }}</td>
                            <td>{{ item.login }}</td>
                            <td>{{ item.biznes }}</td>
                            <td>{{ item.password }}</td>
                            <td>
                              <a class="text-success mr-2" v-on:click="edirer(item)">
                                <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                              </a>
                              <a class="text-danger mr-2" v-on:click="deleter(item)">
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
                    <label for="firstName1">First name</label>
                    <input class="form-control" id="firstName1" type="text" v-model="name" placeholder="Enter name">
                </div>
                <div class="col-md-12 form-group mb-3">
                    <label for="lastName1">Enter login</label>
                    <input class="form-control" id="lastName1" type="text" v-model="login" placeholder="Enter login">
                </div>
                <div class="col-md-12 form-group mb-3">
                    <label for="exampleInputEmail1">Enter bizness</label>
                    <input class="form-control" id="exampleInputEmail1" type="email" v-model="biznes" placeholder="Enter bizness">
                </div>
                <div class="col-md-12 form-group mb-3">
                    <label for="phone">Enter password</label>
                    <input class="form-control" id="phone" type="text"  v-model="password" placeholder="Enter password">
                </div>
            </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
              <button class="btn btn-primary" v-on:click="SubmiteForm">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</div>

<div v-if="showModalDel5">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-danger">Delete Profil</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="showModalDel5 = false">&times;</span>
              </button>
            </div>
              <div class="col-md-12 form-group mb-3">
                <input class="form-control text-center" type="text"  v-model="name" disabled>
            </div>
            <div class="col-md-12 form-group mb-3">
              <input type="text" class="form-control" name="" v-model="pasw" placeholder="Password">
            </div>
            <div class="modal-body text-center">
              <button type="button" class="btn btn-danger mx-2" @click="showModalDel5 = false">No</button>
              <button type="button" class="btn btn-primary" v-on:click="UserProfilDel">Yes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</div>

</template>
