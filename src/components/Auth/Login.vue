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
                'password': this.password
            });
            
                // const url = "http://26.20.205.206/api/test";
                // const data = {
                //     name: "KFC", 
                //     address: "Bagat", 
                //     phoneNumber: "+9998995909555",
                // };
                // const headers = new Headers();
                // headers.append('Content-Type', 'application/json');
                // headers.append('Accept', 'application/json');
                // headers.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyZXN0YXVyYW50Iiwicm9sZXMiOlt7Im5hbWUiOiJST0xFX1JFU1RBVVJBTlQifV0sImlhdCI6MTY3MzYyNzg1NCwiZXhwIjoxNjczNjQ5NDU0fQ.Uppc9cdgaHnWXQDkl5CHyhJ5WxWw_1t8P1jdYhAJtJc")
                // axios.post(url, data, headers).then(data => {
                //     console.log(data.data)
                // })
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