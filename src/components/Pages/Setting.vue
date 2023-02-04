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

              magname: '',
              magid: '',

              kid: '',
              magazinname: '',
              kaname: '',
              kfam: '',
              klogin: '',
              kpassword: '',

              magazintr: false,
              magazink: false,
              okna2: false,
              oknakass: false
            }
        },
        methods: {
          ...mapActions([
            'FilterAuthAc',
            'Origi_Ac',
            'OrigiPost_Ac',
            'UserProfilDel_Ac',
            'Saqlas_Mag',
            'Saqlas_Kassa_Ac',
            'Saqlas_Kassa_Get'
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
          magazinfal(typ){
            this.magazintr = typ;
          },
          magazinkassa(typ){
            this.magazink = typ;
          },
          modalso(typ){
            this.okna2 = typ;
          },
          modalsokass(typ){
            this.oknakass = typ;
          },

          Ishchi_get(){
            this.Saqlas_Kassa_Get({
              'method': 'post',
              'url': 'kassa_get',
              'login': this.login,
              'token': this.token,
              'status': this.statustyp
            });
          },

          Saqlas_kassa(){
            var rend = Math.random().toString(36).substr(2);
            this.Saqlas_Kassa_Ac({
              'method': 'post',
              'url2': 'kassa_creat',
              'url': 'kassa_get',
              'id': this.kid,
              'magazinId': this.magazinname,
              'aname': this.kaname,
              'fam': this.kfam,
              'login2': this.klogin,
              'password': this.kpassword,
              'token2': rend,
              'status2': 'ish',
              'login': this.login,
              'token': this.token,
              'status': this.statustyp,
            });
          },

          toogler(typ){
            this.magazinname = typ;
          },

          magedit(item){
            this.magid = item.id;
            this.magname = item.name;
          },

          Saqlas_action(){
            if (this.magname) {
              this.Saqlas_Mag({
                'method': 'post',
                'url': 'magazin_creat',
                'id': this.magid,
                'name': this.magname,
                'login': this.login,
                'token': this.token,
                'status': this.statustyp,
              });
            } else {
              
            }
          }
        },
        computed: {
          ...mapGetters({
            userdata: 'userdata',
            objectauth2: 'objectauth2',
            ishchila: 'ishchila'
          }),
        },
        mounted() {
          this.FilterAuth();
          this.Localstor();
          this.Origin();
          this.Ishchi_get();
        }
      }
</script>

<template>
  <div class="row mb-4">
    <div class="col-md-12 mb-3">
        <div class="card text-left">
            <div class="card-body">
              <h4>User Profil</h4>
               <button class="btn btn-success" v-on:click="magazinfal(true)">Magazin Create</button>
               <button class="btn btn-success" v-on:click="magazinkassa(true)">Kassa Create</button>
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

<div v-if="magazintr" class="div1">
  <div class="div2">
      <button type="button" class="close mb-3 mt-3 mr-3" v-on:click="magazinfal(false)">
          <span aria-hidden="true" v-on:click="showModalEditor = false">&times;</span>
      </button>
      <button class="btn btn-success" v-on:click="modalso(true)">
        Qo`shish
      </button>
      <div class="table-responsive">
          <div class="scro">
              <table class="tabl scroltab">
                  <thead>
                      <tr>
                          <th>Magazin nomi</th>
                          <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                    <tr class="tir" v-for="item in objectauth2.magazin" :key="item.id">                        
                        <td> 
                            <span style="color: #2b64e2;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                </svg>
                            </span>
                            {{ item.name }}
                        </td>
                        <td>
                          <button class="btn btn-success pt-0 pb-0" v-on:click="magedit(item)">
                            <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                          </button>
                            <!-- <button class="btn btn-danger pt-0 pb-0" v-on:click="magdelet(item)">
                              <i class="nav-icon i-Close-Window font-weight-bold"></i>
                            </button> -->
                        </td>
                    </tr>
                </tbody>
            </table>
          </div>
      </div>
  </div>
</div>

<div v-if="magazink" class="div1">
  <div class="div25457">
      <button type="button" class="close mb-3 mt-3 mr-3" v-on:click="magazinkassa(false)">
          <span aria-hidden="true" v-on:click="showModalEditor = false">&times;</span>
      </button>
      <button class="btn btn-success" v-on:click="modalsokass(true)">
        Qo`shish
      </button>
      <h4 class="mx-2 mt-3">Kassir</h4>
      <div class="table-responsive">
          <div class="scro">
              <table class="tabl scroltab">
                  <thead>
                      <tr>
                          <th>Ismi</th>
                          <th>Familiya</th>
                          <th>Tel</th>
                          <th>Login</th>
                          <th>Parol</th>
                          <th>Magazin</th>
                      </tr>
                  </thead>
                  <tbody>
                  <tr class="tir" v-for="item in ishchila" :key="item.id">
                      <td>
                          {{ item.name }}
                      </td>
                      <td>
                          {{ item.fam }}
                      </td>
                      <td>
                          {{ item.tel }}
                      </td>
                      <td>
                          {{ item.login }}
                      </td>
                      <td>
                          {{ item.password }}
                      </td>
                      <td>
                        {{ item.magazin }}
                    </td>
                  </tr>
                  </tbody>
              </table>
          </div>
      </div>
  </div>
</div>

<div v-if="okna2" class="oknamodal">
  <button type="button" class="close mb-3 mt-3 mr-3" v-on:click="modalso(false)">
      <span aria-hidden="true" v-on:click="showModalEditor = false">&times;</span>
  </button>
  <br>
  <h4 class="text-center">Magazin qo`shish</h4>
  <label for="" class="mx-3">Magazin</label>
  <div class="col-12">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stack-overflow position-fixed mt-2 ml-2" viewBox="0 0 16 16">
        <path d="M12.412 14.572V10.29h1.428V16H1v-5.71h1.428v4.282h9.984z"/>
        <path d="M3.857 13.145h7.137v-1.428H3.857v1.428zM10.254 0 9.108.852l4.26 5.727 1.146-.852L10.254 0zm-3.54 3.377 5.484 4.567.913-1.097L7.627 2.28l-.914 1.097zM4.922 6.55l6.47 3.013.603-1.294-6.47-3.013-.603 1.294zm-.925 3.344 6.985 1.469.294-1.398-6.985-1.468-.294 1.397z"/>
      </svg>
      <input type="text" name="" class="text-right form-control" v-model="magname">
  </div>
  <div class="col-12 mt-3 mb-4">
    <button class="btn btn-success" style="width: 100%;" v-on:click="Saqlas_action">Saqlash</button>
  </div>
</div>

<div v-if="oknakass" class="oknamodal">
  <button type="button" class="close mb-3 mt-3 mr-3" v-on:click="modalsokass(false)">
      <span aria-hidden="true" v-on:click="showModalEditor = false">&times;</span>
  </button>
  <br>
  <h4 class="text-center">Ishchi qo`shosh</h4>
  <label for="" class="mx-3">Ishchi Nomi</label>
  <div class="col-12">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stack-overflow position-fixed mt-2 ml-2" viewBox="0 0 16 16">
        <path d="M12.412 14.572V10.29h1.428V16H1v-5.71h1.428v4.282h9.984z"/>
        <path d="M3.857 13.145h7.137v-1.428H3.857v1.428zM10.254 0 9.108.852l4.26 5.727 1.146-.852L10.254 0zm-3.54 3.377 5.484 4.567.913-1.097L7.627 2.28l-.914 1.097zM4.922 6.55l6.47 3.013.603-1.294-6.47-3.013-.603 1.294zm-.925 3.344 6.985 1.469.294-1.398-6.985-1.468-.294 1.397z"/>
      </svg>
      <input type="text" name="" class="text-right form-control" v-model="kaname">
  </div>
  <label for="" class="mx-3">Ishchi Familiya</label>
  <div class="col-12">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stack-overflow position-fixed mt-2 ml-2" viewBox="0 0 16 16">
        <path d="M12.412 14.572V10.29h1.428V16H1v-5.71h1.428v4.282h9.984z"/>
        <path d="M3.857 13.145h7.137v-1.428H3.857v1.428zM10.254 0 9.108.852l4.26 5.727 1.146-.852L10.254 0zm-3.54 3.377 5.484 4.567.913-1.097L7.627 2.28l-.914 1.097zM4.922 6.55l6.47 3.013.603-1.294-6.47-3.013-.603 1.294zm-.925 3.344 6.985 1.469.294-1.398-6.985-1.468-.294 1.397z"/>
      </svg>
      <input type="text" name="" class="text-right form-control" v-model="kfam">
  </div>
  <label for="" class="mx-3">Telfon</label>
  <div class="col-12">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stack-overflow position-fixed mt-2 ml-2" viewBox="0 0 16 16">
        <path d="M12.412 14.572V10.29h1.428V16H1v-5.71h1.428v4.282h9.984z"/>
        <path d="M3.857 13.145h7.137v-1.428H3.857v1.428zM10.254 0 9.108.852l4.26 5.727 1.146-.852L10.254 0zm-3.54 3.377 5.484 4.567.913-1.097L7.627 2.28l-.914 1.097zM4.922 6.55l6.47 3.013.603-1.294-6.47-3.013-.603 1.294zm-.925 3.344 6.985 1.469.294-1.398-6.985-1.468-.294 1.397z"/>
      </svg>
      <input type="text" name="" class="text-right form-control" v-model="kfam">
  </div>
  <label for="" class="mx-3">Login</label>
  <div class="col-12">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stack-overflow position-fixed mt-2 ml-2" viewBox="0 0 16 16">
        <path d="M12.412 14.572V10.29h1.428V16H1v-5.71h1.428v4.282h9.984z"/>
        <path d="M3.857 13.145h7.137v-1.428H3.857v1.428zM10.254 0 9.108.852l4.26 5.727 1.146-.852L10.254 0zm-3.54 3.377 5.484 4.567.913-1.097L7.627 2.28l-.914 1.097zM4.922 6.55l6.47 3.013.603-1.294-6.47-3.013-.603 1.294zm-.925 3.344 6.985 1.469.294-1.398-6.985-1.468-.294 1.397z"/>
      </svg>
      <input type="text" name="" class="text-right form-control" v-model="klogin">
  </div>
  <label for="" class="mx-3">Parol</label>
  <div class="col-12">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stack-overflow position-fixed mt-2 ml-2" viewBox="0 0 16 16">
        <path d="M12.412 14.572V10.29h1.428V16H1v-5.71h1.428v4.282h9.984z"/>
        <path d="M3.857 13.145h7.137v-1.428H3.857v1.428zM10.254 0 9.108.852l4.26 5.727 1.146-.852L10.254 0zm-3.54 3.377 5.484 4.567.913-1.097L7.627 2.28l-.914 1.097zM4.922 6.55l6.47 3.013.603-1.294-6.47-3.013-.603 1.294zm-.925 3.344 6.985 1.469.294-1.398-6.985-1.468-.294 1.397z"/>
      </svg>
      <input type="text" name="" class="text-right form-control" v-model="kpassword">
  </div>
  <label for="" class="mx-3">Parol</label>
  <div class="col-12">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stack-overflow position-fixed mt-2 ml-2" viewBox="0 0 16 16">
        <path d="M12.412 14.572V10.29h1.428V16H1v-5.71h1.428v4.282h9.984z"/>
        <path d="M3.857 13.145h7.137v-1.428H3.857v1.428zM10.254 0 9.108.852l4.26 5.727 1.146-.852L10.254 0zm-3.54 3.377 5.484 4.567.913-1.097L7.627 2.28l-.914 1.097zM4.922 6.55l6.47 3.013.603-1.294-6.47-3.013-.603 1.294zm-.925 3.344 6.985 1.469.294-1.398-6.985-1.468-.294 1.397z"/>
      </svg>
      <select name="" id="" class="form-control" v-on:change="toogler(magazinname)" v-model="magazinname">
        <option value="">--Magazin Tanlang--</option>
        <option v-for="iteme in objectauth2.magazin" :value="iteme.id">{{ iteme.name }}</option>
      </select>
  </div>

  <div v-if="magazinname" class="col-12 mt-3 mb-4">
    <button class="btn btn-success" style="width: 100%;" v-on:click="Saqlas_kassa">Saqlash</button>
  </div>
  <div v-else class="col-12 mt-3 mb-4">
    <button class="btn btn-light" style="width: 100%;">Saqlash</button>
  </div>
</div>
</div>

</template>
