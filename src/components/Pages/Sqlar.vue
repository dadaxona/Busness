<script>
  import { RouterLink, RouterView } from 'vue-router'
  import { mapState, mapGetters, mapActions} from 'vuex'
  export default {
        data() {
            return {
              showModal: false,
              showModalDel: false,
              id:'',
              tip:'',
              adress:'',
              name:'',
              ogoh:'',
              soni:'',
              olinish:'',
              sotilish:'',
              sotilish2:'',
              valyuta:'',
              tovarsqlad: '',
              login:'',
              token:'',
            }
        },
        methods: {
          ...mapActions([
            'FilterAuthAc',
            'SqladMethodUrlPost',
            'SqladDB'
          ]),
          FilterAuth(){
            this.FilterAuthAc();
          },
          Localstor(){
            const auth = JSON.parse(localStorage.getItem('auth'));
            this.login = auth.login,
            this.token = auth.token
          },
          CreateSqlad(){
            this.SqladMethodUrlPost({
              'method': 'post',
              'url2': 'sqlad_post_update',
              'url': 'getdb',
              'id': this.id,
              'tip': this.tip,
              'adress': this.adress,
              'name': this.name,
              'ogoh': this.ogoh,
              'soni': this.soni,
              'olinish': this.olinish,
              'sotilish': this.sotilish,
              'sotilish2': this.sotilish2,
              'valyuta': this.valyuta,
              'login': this.login,
              'token': this.token
            });
            this.Clears();
          },
          edittip(id, tip, adress, name, ogoh, soni, olinish, sotilish, sotilish2, valyuta){
            this.id=id;
            this.tip=tip;
            this.adress=adress;
            this.name=name;
            this.ogoh=ogoh;
            this.soni=soni;
            this.olinish=olinish;
            this.sotilish=sotilish;
            this.sotilish2=sotilish2;
            this.valyuta=valyuta;
            this.showModal = true;
          },
          getSqlad(){
            this.SqladDB({
              'method': 'post',
              'url': 'getdb',
              'login': this.login,
              'token': this.token
            });
          },
          delettip(id, name){
            this.id = id;
            this.name = name,
            this.showModalDel = true;
          },
          SqladDelet(){
            this.SqladMethodUrlPost({
              'method': 'post',
              'url2': 'sqlad_delete',
              'url': 'getdb',
              'id': this.id,
              'login': this.login,
              'token': this.token
            });
            this.Clears();
          },
          Clears(){
            this.id='';
            this.tip='';
            this.adress='';
            this.name='';
            this.ogoh='';
            this.soni='';
            this.olinish='';
            this.sotilish='';
            this.sotilish2='';
            this.valyuta='';
            this.showModal = false,
            this.showModalDel = false
          },
        },
        watch: {
          tovarsqlad(row){
            this.SqladDB({
              'method': 'post',
              'url': 'getdb',
              'search': row,
              'login': this.login,
              'token': this.token
            });
          }
        },
        computed: {
          ...mapGetters({
            objects3: 'objects3',
            tipdata: 'tipdata',
            adressdata: 'adressdata',
            valyudata: 'valyudata'
          }),
        },
        mounted() {
          this.FilterAuth();
          this.Localstor(),
          this.getSqlad()
        }
      }
</script>

<template>
  <div class="row mb-4">
    <div class="col-md-12 mb-3">
        <div class="card text-left">
            <div class="card-body">
                <button class="btn btn-success mb-2" @click="showModal = true">Tovar qo`shish</button>
                <input type='text' id="tovarsq" class="tovarsq" v-model="tovarsqlad" />
                <div class="table-responsive">
                  <div class="scroltab3">
                    <table class="tabl scroltab">
                        <thead>
                            <tr>
                                <th>Tip</th>
                                <th>Adress</th>
                                <th>Tovar</th>
                                <th>N.1</th>
                                <th>Xajmi</th>
                                <th>Olinish</th>
                                <th>Optviy</th>
                                <th>Roznishni</th>
                                <th>Valyuta</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in objects3" :key="item.id" class="tir">
                            <td>{{ item.tip }}</td>
                            <td>{{ item.adress }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.ogoh }}</td>
                            <td>{{ item.soni }}</td>
                            <td>{{ item.olinish }}</td>
                            <td>{{ item.sotilish }}</td>
                            <td>{{ item.sotilish2 }}</td>
                            <td>{{ item.valyuta }}</td>
                            <td>
                              <a class="text-success mr-2" v-on:click="edittip(
                                item.id, 
                                item.tip, 
                                item.adress,
                                item.name,
                                item.ogoh,
                                item.soni,
                                item.olinish,
                                item.sotilish,
                                item.sotilish2,
                                item.valyuta
                                )">
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
              <h5 class="modal-title">Modal Tovar</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" v-on:click="showModal = false">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">Tip</label>
                  <select class="form-control" v-model="tip" name="tip" id="tip">
                    <option v-for="item in tipdata">
                        {{item.name}}
                    </option>
                  </select>
                </div>
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">Adress</label>
                  <select class="form-control" v-model="adress" name="adress" id="adress">
                    <option v-for="item in adressdata">
                        {{item.name}}
                    </option>
                  </select>
                </div>
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">Tovar</label>
                  <input class="form-control" id="firstName1" type="text" v-model="name">
                </div>
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">N.1</label>
                  <input class="form-control" id="firstName1" type="number" v-model="ogoh">
                </div>
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">Soni</label>
                  <input class="form-control" id="firstName1" type="number" v-model="soni">
                </div>
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">Olinish</label>
                  <input class="form-control" id="firstName1" type="text" v-model="olinish">
                </div>
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">Optviy</label>
                  <input class="form-control" id="firstName1" type="text" v-model="sotilish">
                </div>
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">Roznishni</label>
                  <input class="form-control" id="firstName1" type="text" v-model="sotilish2">
                </div>
                <div class="col-md-12 form-group mb-3">
                  <label for="firstName1">Valyuta</label>
                  <select class="form-control" v-model="valyuta" name="adress" id="adress">
                    <option v-for="item in valyudata">
                        {{item.name}}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" v-on:click="showModal = false">Close</button>
              <button type="button" class="btn btn-primary" v-on:click="CreateSqlad">Save changes</button>
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
              <h5 class="modal-title text-danger">Delete User</h5>
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
              <button type="button" class="btn btn-primary" v-on:click="SqladDelet">Yes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</div>
</template>
