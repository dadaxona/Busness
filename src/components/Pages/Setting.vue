<script>
  import { RouterLink } from 'vue-router'
  import axios from 'axios'
  export default {
        data() {
            return {
              showModal: false,
              userdata: [],

              id: '',
              name: '',
              login: '',
              biznes: '',
              password: '',
            }
        },
        methods: {
          getItem(){
            const auth = JSON.parse(localStorage.getItem('auth'));
            if (auth) {
              if (auth.auth === true) {
                axios({
                  method: 'post',
                  url: 'http://localhost:1122/api/userget',
                  data: {
                    login: auth.login,
                    token: auth.token,
                  }
                }).then(data => {
                  if (data.data) {
                    this.userdata = data.data;
                  } else {
                    this.userdata = [];
                  }
                })
              } else {
                this.$router.push('login');
              }
            } else {
              this.$router.push('login');
            }
          },
          edirer(id, name, login, biznes, password){
            this.id = id,
            this.name = name,
            this.login = login,
            this.biznes = biznes,
            this.password = password,
            this.showModal = true
          },
          SubmiteForm(){
            axios({
              method: 'put',
              url: 'http://localhost:1122/api/updateuser',
              data: {
                id: this.id,
                name: this.name,
                login: this.login,
                biznes: this.biznes,
                password: this.password
              }
            }).then(data => {
              if (data.data.code == 200) {
                this.cleare()
              } else {
  
              }
            })
          },
          cleare(){
            this.id = '',
            this.name = '',
            this.login = '',
            this.biznes = '',
            this.password = '',
            this.showModal = false,
            this.getItem()
          },
        },
        mounted() {
            this.getItem()
        }
      }
</script>

<template>
  <div class="row mb-4">
    <div class="col-md-12 mb-3">
        <div class="card text-left">
            <div class="card-body">
                <button class="btn btn-success mb-2" @click="showModal = true">Admin Setting</button>
                <input type='text' id="chiqim" class="chiqim" />
                <div class="table-responsive">
                  <div class="scroltab3">
                    <table class="table scroltab">
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
                          <tr v-for="item in userdata" :key="item.id">
                            <td>{{ item.name }}</td>
                            <td>{{ item.login }}</td>
                            <td>{{ item.biznes }}</td>
                            <td>{{ item.password }}</td>
                            <td>
                              <a class="text-success mr-2" v-on:click="edirer(item.id, item.name, item.login, item.biznes, item.password)">
                                <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                              </a>
                              <a class="text-danger mr-2" v-on:click="deleter(item.id)">
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
</template>
