<script>
  import { RouterLink } from 'vue-router'
  import { mapState, mapGetters, mapActions} from 'vuex'
  const auth = JSON.parse(localStorage.getItem('auth'));
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
              shtrix: '',
              tovarsqlad: '',
              filtip: '',
              filad: '',
              login:'',
              token:'',
              statustyp: '',
            }
        },
        methods: {
          ...mapActions([
            'FilterAuthAc',
            'SqladMethodUrlPost',
            'SqladDB',
            'Fil_Ac',
            'Update_Ky'
          ]),
          FilterAuth(){
            this.FilterAuthAc();
          },
          Localstor(){
            this.login = auth.login,
            this.token = auth.token,
            this.statustyp = auth.action
          },
          CreateSqlad(){
            if (auth.method_id) {
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
                'kod': this.shtrix,
                'login': this.login,
                'token': this.token,
                'status': this.statustyp,
                'magazinId': auth.method_id,
                'magazin': auth.method_name,
              });
              this.Clears();
            } else {}
          },
          edittip(item){
            this.id=item.id;
            this.tip=item.tip;
            this.adress=item.adress;
            this.name=item.name;
            this.ogoh=item.ogoh;
            this.soni=item.soni;
            this.olinish=item.olinish;
            this.sotilish=item.sotilish;
            this.sotilish2=item.sotilish2;
            this.shtrix=item.kod;
            this.valyuta=item.valyuta;
            this.showModal = true;
          },
          getSqlad(){
            this.SqladDB({
              'method': 'post',
              'url': 'getdb',
              'login': this.login,
              'token': this.token,
              'magazinId': auth.method_id,
              'status': this.statustyp,
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
              'token': this.token,
              'status': this.statustyp,              
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
            this.shtrix='';
            this.showModal = false,
            this.showModalDel = false
          },
          updatekeyup(item){
            this.Update_Ky({
              'method': 'post',
              'url': 'update_key',
              'item': item
            });
          },
          updatechangeTip(item){
            this.Update_Ky({
              'method': 'post',
              'url': 'update_key',
              'item': item
            });
          },
          updatechangeAdr(item){
            this.Update_Ky({
              'method': 'post',
              'url': 'update_key',
              'item': item
            });
          },
          updatechangeVal(valy){
            this.Update_Ky({
              'method': 'post',
              'url': 'update_chang_val',
              'item': valy
            });
          },
          obnovit(){
            this.getSqlad();
          }
        },
        watch: {
          tovarsqlad(row){
            const auth = JSON.parse(localStorage.getItem('auth'));
            if (auth.method_id) {
              this.SqladDB({
                'method': 'post',
                'url': 'getdb',
                'search': row,
                'login': this.login,
                'token': this.token,
                'magazinId': auth.method_id,
                'magazin': auth.method_name,
                'status': this.statustyp,
              });
            }else{}
          },
          filtip(){
            const auth = JSON.parse(localStorage.getItem('auth'));
              if (auth.method_id) {
                this.Fil_Ac({
                  'method': 'post',
                  'url': 'filt',
                  'resul': this.filtip,
                  'typ': 1,
                  'login': this.login,
                  'token': this.token,
                  'magazinId': auth.method_id,
                  'magazin': auth.method_name,
                  'status': this.statustyp,
                });
              } else {}
          },
          filad(){
            const auth = JSON.parse(localStorage.getItem('auth'));
              if (auth.method_id) {
              this.Fil_Ac({
                'method': 'post',
                'url': 'filt',
                'resul': this.filad,
                'typ': 2,
                'login': this.login,
                'token': this.token,
                'magazinId': auth.method_id,
                'magazin': auth.method_name,
                'status': this.statustyp,
              });
            }else{}
          },
        },
        computed: {
          ...mapGetters({
            objects3: 'objects3',
            tipdata: 'tipdata',
            adressdata: 'adressdata',
            valyudata: 'valyudata',
            itoga: 'itoga'
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
                <span class="mx-4">JamiSumma: $ +{{ itoga }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" v-on:click="obnovit" class="bi bi-funnel filtddd" viewBox="0 0 16 16">
                  <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
                </svg>
                <select class="tipse text-center" v-model="filtip" name="tip" id="tip">
                  <option value="">--Filter Tip--</option>
                  <option v-for="item in tipdata">
                      {{ item.name }}
                  </option>
                </select>
                <select class="adrese text-center" v-model="filad" name="adress" id="adress">
                  <option value="">--Filter Adress--</option>
                  <option v-for="item in adressdata">
                      {{ item.name }}
                  </option>
                </select>
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
                                <th>Shtrix kod</th>
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
                            <!-- {{item}}  -->
                            <td>
                              <select class="keyinp2" v-on:change="updatechangeTip(item)" v-model="item.tip">
                                <option  v-for="itema in tipdata" :value="itema.name">{{itema.name}}</option>
                              </select>
                            </td>
                            <td>
                              <select class="keyinp2" v-on:change="updatechangeAdr(item)" v-model="item.adress">
                                <option  v-for="itema in adressdata" :value="itema.name">{{itema.name}}</option>
                              </select>
                            </td>
                            <td>
                              <input type="text" class="keyinp" v-on:keyup="updatekeyup(item)" v-model="item.name">
                            </td>
                            <td>
                              <input type="text" class="keyinp" v-on:keyup="updatekeyup(item)" v-model="item.ogoh">
                            </td>
                            <td>
                              <input type="text" class="keyinp" v-on:keyup="updatekeyup(item)" v-model="item.kod">
                            </td>
                            <td>
                              <input type="text" class="keyinp" v-on:keyup="updatekeyup(item)" v-model="item.soni">
                            </td>
                            <td>
                              <input type="text" class="keyinp" v-on:keyup="updatekeyup(item)" v-model="item.olinish">
                            </td>
                            <td>
                              <input type="text" class="keyinp" v-on:keyup="updatekeyup(item)" v-model="item.sotilish">
                            </td>
                            <td>
                              <input type="text" class="keyinp" v-on:keyup="updatekeyup(item)" v-model="item.sotilish2">
                            </td>
                            <td>
                              <select class="keyinp2" v-on:change="updatechangeVal(item)" v-model="item.valyuta">
                                <option value="">----</option>
                                <option  v-for="itema in valyudata" :value="itema.name">{{itema.name}}</option>
                              </select>
                            </td>
                            <td>
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
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">Valyuta</label>
                  <select class="form-control" v-model="valyuta" name="adress" id="adress">
                    <option v-for="item in valyudata">
                      {{item.name}}
                    </option>
                  </select>
                </div>
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">Shtrix kod</label>
                  <input class="form-control" id="firstName1" type="text" v-model="shtrix">
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
