<script>
    import { RouterLink } from 'vue-router'
    import { mapState, mapGetters, mapMutations, mapActions} from 'vuex'
    export default {
        data() {
            return {
                username: '',
                login: '',
                biznesty: '',
                password: '',
                repassword: '',
                token: '',                
                answer: '',
                items: [{ biznes: 'Dokon' }, { biznes: 'Cafe' }, { biznes: 'Ochert' }]
            }
        },

        methods: {
            ...mapActions([
                'SignUpAc',
                'SessiondAc'
            ]),
            onSubmitRegist() {
                if (this.password == this.repassword) {
                    this.token = Math.random().toString(36).substr(2);
                    this.answer = true;
                    this.SignUpAc({
                        'method': 'post',
                        'url': 'register',
                        'name': this.username,
                        'login': this.login,
                        'biznes': this.biznesty,
                        'password': this.password,
                        'token': this.token,
                        'status': 'brend'
                    });
                    this.Cl()
                } else {
                    this.answer = false
                }
            },
            Cl(){
                this.token = '';
                this.username = '';
                this.login = '';
                this.biznesty ='',
                this.password = '';
                this.repassword = '';
                this.answer = '';
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
    <div class="auth-layout-wrap impimag">
        <div class="auth-content">
            <div class="card o-hidden">
                <div class="row">
                    <div class="col-md-6 text-center">
                        <div class="pl-3 auth-right">
                            <div class="auth-logo text-center mt-4"><img src="../../assets/ig.jpg" alt=""></div>
                            <div class="flex-grow-1"></div>
                            <div class="w-100 mb-4"><RouterLink class="btn btn-outline-primary btn-block btn-icon-text btn-rounded" to="/"><i class="i-Mail-with-At-Sign"></i> Sign in with login</RouterLink><a class="btn btn-outline-google btn-block btn-icon-text btn-rounded"><i class="i-Google-Plus"></i> Sign in with Google</a><a class="btn btn-outline-facebook btn-block btn-icon-text btn-rounded"><i class="i-Facebook-2"></i> Sign in with Facebook</a></div>
                            <div class="flex-grow-1"></div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="p-4">
                            <h1 class="mb-3 text-18">Регистрация</h1>
                            <form v-on:submit.prevent="onSubmitRegist">
                                <div class="form-group">
                                    <label for="username">Имя</label>
                                    <input class="form-control form-control-rounded" v-model="username" id="username" type="text">
                                </div>
                                <div class="form-group">
                                    <label for="login">Логин</label>
                                    <input class="form-control form-control-rounded" v-model="login" id="login" type="login">
                                </div>
                                <div class="form-group">
                                    <label for="password">Бизнес тип</label>
                                    <select class="form-control form-control-rounded" v-model="biznesty" name="biznesty" id="biznesty">
                                        <option v-for="item in items">
                                            {{item.biznes}}
                                        </option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="password">Парол</label>
                                    <input class="form-control form-control-rounded" v-model="password" id="password" type="password">
                                </div>
                                <div class="form-group">
                                    <label for="repassword">Повторите Парол</label>
                                    <input class="form-control form-control-rounded" v-model="repassword" id="repassword" type="password">
                                </div>
                                <p v-if="answer === true" style="color: green;"></p>
                                <p v-if="answer === false" style="color: red;">Парол ошибка</p>
                                <button class="btn btn-primary btn-block btn-rounded mt-3">Регистрация</button>
                            </form>
                            <div class="mt-3 text-center"><RouterLink class="text-muted" to="/">
                                <u>Вход</u></RouterLink></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
