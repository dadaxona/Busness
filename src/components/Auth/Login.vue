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

            Autend(){
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
        <div class="auth-content">
            <div class="card o-hidden">
                <div class="row">
                    <div class="col-md-6">
                        <div class="p-4">
                            <div class="auth-logo text-center mb-4"><img src="../../assets/ig.jpg" alt=""></div>
                            <h1 class="mb-3 text-18">Вход</h1>
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
                                <button class="btn btn-rounded btn-primary btn-block mt-2" v-on:click="Autend">Сохранить</button>
                            <div class="mt-3 text-center"><RouterLink class="text-muted" to="/register">
                                    <u>Регистрация</u></RouterLink></div>
                        </div>
                    </div>
                    <div class="col-md-6 text-center">
                        <div class="pr-3 auth-right"><RouterLink class="btn btn-rounded btn-outline-primary btn-outline-email btn-block btn-icon-text" to="/register"><i class="i-Mail-with-At-Sign"></i>Регистрация Емаил</RouterLink><a class="btn btn-rounded btn-outline-google btn-block btn-icon-text"><i class="i-Google-Plus"></i> Регистрация Google</a><a class="btn btn-rounded btn-block btn-icon-text btn-outline-facebook"><i class="i-Facebook-2"></i> Регистрация Facebook</a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>