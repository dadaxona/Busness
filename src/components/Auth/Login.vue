<script>
    import { RouterLink } from 'vue-router'
    import axios from 'axios'
    import { mapState, mapGetters, mapMutations, mapActions} from 'vuex'
    export default {
        data() {
            return {
                login: '',
                password: '',
                filtor: '',
                typ: 'brend',
            }
        },
        methods: {
            ...mapActions([
                'SignUpAc',
                'SessiondAc'
            ]),

            onSubmit(){
                this.SignUpAc({
                    'method': 'post',
                    'url': 'loginauth',
                    'login': this.login,
                    'password': this.password,
                    'status': this.typ
                });
            },
            ishc(){
                if (this.typ == 'brend') {
                    this.typ = 'ish';
                } else {
                    this.typ = 'brend';
                }
            },
            Sessiond(){
                this.SessiondAc();
            }
        },
        mounted() {
            this.Sessiond()
        }
    }
</script>

<template>
    <div class="auth-layout-wrap impimag2">
        <div style="width: 400px;">
            <div class="card o-hidden">
                <div class="row">
                    <div class="col-md-12">
                        <div class="p-4">
                            <div class="auth-logo text-center mb-4"><img src="../../assets/ig.jpg" alt=""></div>
                            <h1 class="mb-3 text-18">Вход</h1>
                                <form v-on:submit.prevent="onSubmit">
                                    <div class="form-group">
                                        <label for="login">Логин</label>
                                        <input class="form-control form-control-rounded" v-model="login" id="login" type="login">
                                    </div>
                                    <div class="form-group">
                                        <label for="password">Парол</label>
                                        <input class="form-control form-control-rounded" v-model="password" id="password"  type="password">
                                    </div>
                                    <div>
                                        <input class="form-check-input mx-1" type="checkbox" v-on:click="ishc"> <label class="mx-4 pt-1">Ishchimisiz</label>
                                    </div>
                                    <p v-if="filtor === true" style="color: green;"></p>
                                    <p v-if="filtor === false" style="color: red;">Логин или Парол ошибка</p>
                                    <button class="btn btn-rounded btn-primary btn-block mt-2">Вход</button>
                                </form>
                            <div class="mt-3 text-center"><RouterLink class="text-muted" to="/register">
                                    <u>Регистрация</u></RouterLink></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>