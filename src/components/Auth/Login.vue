<script>
    import { RouterLink } from 'vue-router'

    export default {
        data() {
            return {
                user: [],
                login: '',
                password: '',
                filtor: '',
            }
        },
        methods: {
            Autend(){
                // Axios
                this.user = JSON.parse(localStorage.getItem("user"));
                var data = this.user.find(logine => logine.login == this.login && logine.password == this.password);

                if (data) {
                    localStorage.setItem('auth', JSON.stringify({"auth": true, "username": data.username, "login": data.login, "token": data.token}));
                    this.Sessiond();                   
                    this.filtor = true;
                    this.login = '';
                    this.password = '';
                } else {
                    this.filtor = false;
                }
            },

            Sessiond(){
                var auth = JSON.parse(localStorage.getItem('auth'));
                if (auth) {
                    if (auth.auth === true) {
                        this.$router.push('dash');
                    } else {
                        
                    }                    
                } else {
                    
                }
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
                            <div class="auth-logo text-center mb-4"><img src="../../dist-assets/images/logo.png" alt=""></div>
                            <h1 class="mb-3 text-18">Sign In</h1>
                                <div class="form-group">
                                    <label for="login">Login</label>
                                    <input class="form-control form-control-rounded" v-model="login" id="login" type="login">
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input class="form-control form-control-rounded" v-model="password" id="password"  type="password">
                                </div>
                                <p v-if="filtor === true" style="color: green;"></p>
                                <p v-if="filtor === false" style="color: red;">Login yoki Parol xato</p>
                                <button class="btn btn-rounded btn-primary btn-block mt-2" v-on:click="Autend">Sign In</button>
                            <div class="mt-3 text-center"><RouterLink class="text-muted" to="/register">
                                    <u>Sign Up</u></RouterLink></div>
                        </div>
                    </div>
                    <div class="col-md-6 text-center">
                        <div class="pr-3 auth-right"><RouterLink class="btn btn-rounded btn-outline-primary btn-outline-email btn-block btn-icon-text" to="/register"><i class="i-Mail-with-At-Sign"></i> Sign up with Email</RouterLink><a class="btn btn-rounded btn-outline-google btn-block btn-icon-text"><i class="i-Google-Plus"></i> Sign up with Google</a><a class="btn btn-rounded btn-block btn-icon-text btn-outline-facebook"><i class="i-Facebook-2"></i> Sign up with Facebook</a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>