<script>
    import { RouterLink } from 'vue-router'
    import { mapState, mapGetters, mapMutations, mapActions} from 'vuex'
    const auth = JSON.parse(localStorage.getItem('auth'));
    export default {
        data() {
            return {
                okna: false,
                okna2: false,
                muddat: true,
                id: '',
                name: '',
                qarz: '',
                muddatdate: '',
                tolov: '',
                dinamik: '',
                maga: '',
                filtretr: false,
                oknamod: false,
                oknamodzaqaz: false,
                oknaSavdo: false,
                oknaSavdo2: false,

                kabinet1: false
            }
        },

        methods: {
            ...mapActions([
                'FilterAuthAc',
                'Tolov_Avt',
                'Zaqaz_Olish_Ac',
                'SavdoBut_Ac',
                'Savdo2_ac'
            ]),
            kabinet2(typ){
                this.kabinet1 = typ;
            },
            FilterAuth(){
                this.FilterAuthAc();
            },
            Logaut_user(){
                localStorage.setItem('auth', JSON.stringify({"auth": false, "username": '', "login": '', "token": '','method_id': '', 'action': ''}));
                this.FilterAuth();
            },
            modalsokna(typ){
                this.okna = typ;
            },
            modalsokna3(typ){
                this.oknamod = typ;
            },
            modalsoknazaqaz(typ){
                this.oknamodzaqaz = typ;
            },
            tolash(item){
                this.id = item.id;
                this.name = item.mijoz;
                this.qarz = item.karz;
                this.okna2 = true
            },
            modalsokna2(typ){
                this.okna2 = typ;
            },
            tolov_key(sum){
                if (sum) {
                    if (parseFloat(this.qarz) > parseFloat(this.tolov)) {
                        this.tolov = sum;
                        if (parseFloat(this.qarz) <= parseFloat(this.tolov)) {
                            this.filtretr = true;
                            this.muddat = false;
                        } else {
                            this.filtretr = false;
                            this.muddat = true;
                        }
                    } else {
                        this.tolov = this.qarz;
                        this.filtretr = true;
                        this.muddat = false;
                    }
                } else {
                    this.filtretr = false;
                    this.muddat = true;
                }
            },
            tolov_action(){
                this.Tolov_Avt({
                    'method': 'post',
                    'url': 'tolovpost',
                    'id': this.id,
                    'qarz': this.qarz,
                    'tolov': this.tolov,
                    'srok': this.muddatdate
                });
                this.clr();
            },
            clr(){
                this.id = '';
                this.name = '';
                this.qarz = '';
                this.tolov = '';
                this.muddatdate = '';
                this.okna2 = false;
                this.muddat = true;
            },
            olish(item){
                this.Zaqaz_Olish_Ac({
                    'method': 'post',
                    'url': 'zaqaz_delet',
                    'id': item.id,
                });
               this.oknamodzaqaz = false;
            },
            oknaSavdobut(typ){
               this.oknaSavdo = typ;
            },
            oknaSavdobut2(typ){
                this.oknaSavdo2 = typ;
            },
            SavdoBut(item){
                this.SavdoBut_Ac({
                    'method': 'post',
                    'url': 'sotuv_post_id',
                    'id': item.id,
                    'savdoId': 1
                });
                this.oknaSavdo2 = true;
            },
            objecta2(typ){
                this.Savdo2_ac({
                    'typ': typ
                });
            },
            SavdoBut222(item){
                this.SavdoBut_Ac({
                    'method': 'post',
                    'url': 'sotuv_post_id',
                    'id': item.id,
                    'savdoId': 2
                });
                this.oknaSavdo2 = true;
            },
            autherMethod(){
                this.maga = auth.method_id;
            },
            magarew(maga){
                var mid = this.objectauth2.magazin.find(e => { return e.id == maga });
                if (mid) {
                    auth.method_id = mid.id;
                    auth.method_name = mid.name;                  
                } else {
                    auth.method_id = '';
                    auth.method_name = '';  
                }
                localStorage.setItem('auth', JSON.stringify(auth));
                // this.FilterAuth();
                window.location.reload(true)
            },
            kabinet2(typ){
                this.kabinet1 = typ;
            }
        },
        computed: {
          ...mapGetters({
            authtenticat:'authtenticat',
            objectauth: 'objectauth',
            objectauth2: 'objectauth2',
            savdoobj: 'savdoobj',
            JamisummaSotuv: 'JamisummaSotuv'
          }),
        },
        mounted() {
            this.FilterAuth();
            this.autherMethod();
        }
    }
</script>

<template>
    <div class="set" v-on:click="kabinet2(true)">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-gear set2" viewBox="0 0 16 16">
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
        </svg>
    </div>
     <div v-if="kabinet1" class="div145">
        <div class="divdf2">
            <button type="button" class="close mb-3 mt-3 mr-3" v-on:click="kabinet2(false)">
                <span aria-hidden="true" v-on:click="showModalEditor = false">&times;</span>
            </button>
            <div class="table-responsive">
                <div class="scro">
                    <a href="/treding">
                        <div class="mt-2 mb-4 border">
                            <h5 class="text-center">ID Group</h5>
                            <img src="../../assets/id.png" alt="">
                        </div>
                    </a>
                    <a href="/ensy">
                        <div class="mt-2 mb-4 border">
                            <h5 class="text-center">Ensy Trade</h5>
                            <img src="../../assets/ensy.jpg" alt="">
                        </div>
                    </a>
                    <a href="/torgo">
                        <div class="mt-2 mb-4 border">
                            <h5 class="text-center">Torgo Soft</h5>
                            <img src="../../assets/torgo.png" alt="">
                        </div>
                    </a>
                    <a href="/gbc">
                        <div class="mt-2 mb-4 border">
                            <h5 class="text-center">GBC</h5>
                            <img src="../../assets/gbc.jpg" alt="">
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="app-admin-wrap layout-horizontal-bar">
        <div class="main-header">
            <div class="logo"><img src="../../assets/logo.png" alt="" /></div>         
                <div style="margin: auto"></div>                    
                    <div class="header-part-right">
                    <div v-if="authtenticat.status == 'brend'">
                        <select name="" id="" v-on:change="magarew(maga)" v-model="maga" class="ffdd">
                            <option value="">Magazin</option>
                            <option v-for="itema in objectauth2.magazin" :value="itema.id">{{ itema.name }}</option>
                        </select>
                    </div>
                    <div v-else>

                    </div>
                    <i class="i-Full-Screen header-icon d-none d-sm-inline-block" data-fullscreen=""></i>
                    <div class="dropdown" v-on:click="modalsokna(true)">
                        <div class="badge-top-container">
                            <span v-if="objectauth.srok" class="badge badge-primary alre">{{ objectauth.srok }}</span>
                            <span v-else></span>
                            <i class="i-Bell text-muted header-icon"></i>
                        </div>
                    </div>
                    <div class="dropdown">
                        <div class="user col align-self-end"><img id="userDropdown" src="../../assets/1.jpg" alt="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                                <div class="dropdown-header">
                                    <i class="i-Lock-User mr-1"></i> {{ authtenticat.login }}
                                </div>
                                <RouterLink v-if="authtenticat.status == 'brend'" class="dropdown-item" to="/setting">Account settings</RouterLink>
                                <a class="dropdown-item" v-on:click="Logaut_user">Sign out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- header top menu end-->
            <div class="horizontal-bar-wrap">
                <div class="header-topnav">
                    <div class="container-fluid">
                        <div class="topnav rtl-ps-none" id="" data-perfect-scrollbar="" data-suppress-scroll-x="true">
                            <ul v-if="authtenticat.status == 'brend'" class="menu float-left">
                                <li>
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Bosh sahifa</label><RouterLink to="dash"><i class="nav-icon mr-2 i-Bar-Chart"></i> Bosh sahifa</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Savdo</label><RouterLink to="treding"><i class="nav-icon mr-2 i-Suitcase"></i>Savdo</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <!-- end ui kits-->
                                <li>
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Valyuta</label><RouterLink to="valyuta"><i class="nav-icon i-Library mr-2"></i> Valyuta </RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <!-- end extra uikits-->
                                <li>
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Mijoz</label><RouterLink to="user"><i class="nav-icon mr-2 i-Computer-Secure"></i> Mijoz</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <!-- end apps-->
                                <li>
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Tovar tip</label><RouterLink to="tovartip"><i class="nav-icon mr-2 i-File-Clipboard-File--Text"></i> Tovar tip</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <!-- end Forms-->
                                <li>
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Yetkazuvchi</label><RouterLink to="yetkazuvchi"><i class="nav-icon mr-2 i-Bar-Chart-5"></i> Yetkazuvchi</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Sqlad</label><RouterLink to="sqlad"><i class="nav-icon mr-2 i-Windows-2"></i> Sqlad</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <!--end-datatables-->
                                <li>
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Chiqim</label><RouterLink to="chiqim"><i class="nav-icon mr-2 i-Administrator"></i> Chiqim</RouterLink>
                                        </div>
                                    </div>
                                </li>                  
                                <li>
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Foyda</label><RouterLink to="foyda"><i class="nav-icon mr-2 i-File-Horizontal-Text"></i> Foyda</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <!--end-doc  -->
                            </ul>
                            <ul v-else class="menu float-left">
                                <li>
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Bosh sahifa</label><RouterLink to="dash"><i class="nav-icon mr-2 i-Bar-Chart"></i> Bosh sahifa</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Savdo</label><RouterLink to="treding"><i class="nav-icon mr-2 i-Suitcase"></i>Savdo</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <!-- end ui kits-->
                                <li v-if="authtenticat.valyuta == 1">
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Valyuta</label><RouterLink to="valyuta"><i class="nav-icon i-Library mr-2"></i> Valyuta </RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <!-- end extra uikits-->
                                <li v-if="authtenticat.mijoz == 1">
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Mijoz</label><RouterLink to="user"><i class="nav-icon mr-2 i-Computer-Secure"></i> Mijoz</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <!-- end apps-->
                                <li v-if="authtenticat.tip == 1">
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Tovar tip</label><RouterLink to="tovartip"><i class="nav-icon mr-2 i-File-Clipboard-File--Text"></i> Tovar tip</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <!-- end Forms-->
                                <li v-if="authtenticat.yetkazu == 1">
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Yetkazuvchi</label><RouterLink to="yetkazuvchi"><i class="nav-icon mr-2 i-Bar-Chart-5"></i> Yetkazuvchi</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <li v-if="authtenticat.sqlad == 1">
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Sqlad</label><RouterLink to="sqlad"><i class="nav-icon mr-2 i-Windows-2"></i> Sqlad</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <!--end-datatables-->
                                <li v-if="authtenticat.chiqim == 1">
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Chiqim</label><RouterLink to="chiqim"><i class="nav-icon mr-2 i-Administrator"></i> Chiqim</RouterLink>
                                        </div>
                                    </div>
                                </li>                  
                                <li v-if="authtenticat.foyda == 1">
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Foyda</label><RouterLink to="foyda"><i class="nav-icon mr-2 i-File-Horizontal-Text"></i> Foyda</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <li v-else>

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!-- =============== Horizontal bar End ================-->
            <div class="main-content-wrap d-flex flex-column">
                <!-- ============ Body content start ============= -->
                <div class="main-content">
                    <div class="row">
                        <!-- ICON BG-->
                        <div class="col-lg-3 col-md-6 col-sm-6">
                            <RouterLink to="user">
                                <div class="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
                                    <div class="card-body text-center"><i class="i-Add-User"></i>
                                        <div class="content">
                                            <p class="text-muted mt-2 mb-0">Clent</p>
                                            <p class="text-primary text-24 line-height-1 mb-2">{{ objectauth.mijoz }}</p>
                                        </div>
                                    </div>
                                </div>
                            </RouterLink>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-6" v-on:click="oknaSavdobut(true)">
                            <div class="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
                                <div class="card-body text-center"><i class="i-Financial"></i>
                                    <div class="content">
                                        <p class="text-muted mt-2 mb-0">Savdo</p>
                                        <p class="text-primary text-24 line-height-1 mb-2">$ {{ objectauth.savdo + objectauth.savdo2 }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-6" v-on:click="modalsoknazaqaz(true)">
                            <div class="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
                                <div class="card-body text-center"><i class="i-Checkout-Basket"></i>
                                    <div class="content">
                                        <p class="text-muted mt-2 mb-0">Zaqaz</p>
                                        <p class="text-primary text-24 line-height-1 mb-2">{{ objectauth.zaqaz }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-6" v-on:click="modalsokna3(true)">
                            <div class="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
                                <div class="card-body text-center"><i class="i-Money-2"></i>
                                    <div class="content">
                                        <p class="text-muted mt-2 mb-0">Qardorlar</p>
                                        <p class="text-primary text-24 line-height-1 mb-2">$ {{ objectauth.qarz }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <RouterView />
            </div>
        </div>
    </div>

    <div v-if="oknaSavdo" class="div1">
        <div class="div2">
            <button type="button" class="close mb-3 mt-3 mr-3" v-on:click="oknaSavdobut(false)">
                <span aria-hidden="true" v-on:click="showModalEditor = false">&times;</span>
            </button>
            <br>
            <div class="row">
                <a class="col-6 text-center bor_but" v-on:click="objecta2(1)">
                    Doyimiy
                </a>
                <a class="col-6 text-center bor_but2" v-on:click="objecta2(2)">
                    Burlamchi
                </a>
            </div>
            <div class="table-responsive">
                <div class="scro">
                    <table class="tabl scroltab">
                        <thead v-if="objectauth2.tug">
                            <tr>
                                <th>Mijoz</th>
                                <th>Savdo</th>
                                <th>Karz</th>
                                <th>Sotuvchi</th>
                                <th>Sana</th>
                            </tr>
                        </thead>
                        <thead v-else>
                            <tr>
                                <th>Sotuvchi</th>
                                <th>Sana</th>
                                <th>Savdo</th>
                            </tr>
                        </thead>
                        <tbody v-if="objectauth2.tug">
                            <tr class="tir" v-for="item in objectauth2.tugl" :key="item.id" v-on:click="SavdoBut(item)">
                                <td> 
                                    <span style="color: #2b64e2;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                        </svg>
                                    </span>
                                    {{ item.mijoz }}
                                </td>
                                <td>
                                    <span style="color: #6363ff;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-coin" viewBox="0 0 16 16">
                                            <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
                                        </svg>
                                    </span>
                                    {{ item.jamisumma | formatNumber }}
                                </td>
                                <td>
                                    <span style="color: #d34e15;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-currency-dollar" viewBox="0 0 16 16">
                                            <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
                                        </svg>-
                                    </span>
                                    <span class="text-danger">
                                        {{ item.karz | formatNumber }}
                                    </span>
                                </td>
                                <td>
                                    <span style="color: #1538d3;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
                                            <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
                                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                          </svg>
                                    </span>
                                    <span class="mx-2">
                                        {{ item.sotivchi }}
                                    </span>
                                </td>
                                <td>
                                    <span style="color:green">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-calendar-date-fill" viewBox="0 0 16 16">
                                            <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zm5.402 9.746c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z"/>
                                            <path d="M16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-6.664-1.21c-1.11 0-1.656-.767-1.703-1.407h.683c.043.37.387.82 1.051.82.844 0 1.301-.848 1.305-2.164h-.027c-.153.414-.637.79-1.383.79-.852 0-1.676-.61-1.676-1.77 0-1.137.871-1.809 1.797-1.809 1.172 0 1.953.734 1.953 2.668 0 1.805-.742 2.871-2 2.871zm-2.89-5.435v5.332H5.77V8.079h-.012c-.29.156-.883.52-1.258.777V8.16a12.6 12.6 0 0 1 1.313-.805h.632z"/>
                                        </svg>
                                    </span>
                                    {{ item.createdAt }}
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr class="tir" v-for="item in objectauth2.tugl" :key="item.id" v-on:click="SavdoBut222(item)">
                                <td>
                                    {{ item.sotivchi }}
                                </td>
                                <td> 
                                    <span style="color:green">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-calendar-date-fill" viewBox="0 0 16 16">
                                            <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zm5.402 9.746c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z"/>
                                            <path d="M16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-6.664-1.21c-1.11 0-1.656-.767-1.703-1.407h.683c.043.37.387.82 1.051.82.844 0 1.301-.848 1.305-2.164h-.027c-.153.414-.637.79-1.383.79-.852 0-1.676-.61-1.676-1.77 0-1.137.871-1.809 1.797-1.809 1.172 0 1.953.734 1.953 2.668 0 1.805-.742 2.871-2 2.871zm-2.89-5.435v5.332H5.77V8.079h-.012c-.29.156-.883.52-1.258.777V8.16a12.6 12.6 0 0 1 1.313-.805h.632z"/>
                                        </svg>
                                    </span>
                                    {{ item.sana }}
                                </td>
                                <td>
                                    <span style="color: #6363ff;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-coin" viewBox="0 0 16 16">
                                            <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
                                        </svg>
                                    </span>
                                    {{ item.jamisumma | formatNumber }} {{ item.valy }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div v-if="oknaSavdo2" class="div1">
        <div class="div25457">
            <button type="button" class="close mb-3 mt-3 mr-3" v-on:click="oknaSavdobut2(false)">
                <span aria-hidden="true" v-on:click="showModalEditor = false">&times;</span>
            </button>
            <h4 class="mx-2 mt-3">Jami Summa: $ +{{ JamisummaSotuv }}</h4>
            <div class="table-responsive">
                <div class="scro">
                    <table class="tabl scroltab">
                        <thead>
                            <tr>
                                <th>Tovar</th>
                                <th>Soni</th>
                                <th>Sotilishi</th>
                                <th>Chegirma</th>
                                <th>Jami Summa</th>
                                <th>Sotuvchi</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr class="tir" v-for="item in savdoobj" :key="item.id">
                            <td>
                                {{ item.name }}
                            </td>
                            <td>
                                {{ item.soni }}
                            </td>
                            <td>
                                {{ item.sotilish | formatNumber }}
                            </td>
                            <td>
                                {{ item.chegrma }}
                            </td>
                            <td>
                                {{ item.jami | formatNumber }} {{ item.valy }}
                            </td>
                            <td>
                                {{ item.sotivchi }}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div v-if="okna" class="div1">
        <div class="div2">
            <button type="button" class="close mb-3 mt-3 mr-3" v-on:click="modalsokna(false)">
                <span aria-hidden="true" v-on:click="showModalEditor = false">&times;</span>
            </button>
            <div class="table-responsive">
                <div class="scro">
                    <table class="tabl scroltab">
                        <thead>
                            <tr>
                                <th>Mijoz</th>
                                <th>Savdo</th>
                                <th>Muddat</th>
                                <th>Karz</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr class="tir" v-for="item in objectauth2.srok" :key="item.id">
                            <td> 
                                <span style="color: #2b64e2;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                    </svg>
                                </span>
                                {{ item.mijoz }}
                            </td>
                            <td>
                                <span style="color: #6363ff;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-coin" viewBox="0 0 16 16">
                                        <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
                                    </svg>
                                </span>
                                {{ item.jamisumma | formatNumber }}
                            </td>
                            <td>
                                <span style="color:green">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-calendar-date-fill" viewBox="0 0 16 16">
                                        <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zm5.402 9.746c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z"/>
                                        <path d="M16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-6.664-1.21c-1.11 0-1.656-.767-1.703-1.407h.683c.043.37.387.82 1.051.82.844 0 1.301-.848 1.305-2.164h-.027c-.153.414-.637.79-1.383.79-.852 0-1.676-.61-1.676-1.77 0-1.137.871-1.809 1.797-1.809 1.172 0 1.953.734 1.953 2.668 0 1.805-.742 2.871-2 2.871zm-2.89-5.435v5.332H5.77V8.079h-.012c-.29.156-.883.52-1.258.777V8.16a12.6 12.6 0 0 1 1.313-.805h.632z"/>
                                    </svg>
                                </span>
                                {{ item.srok }}
                            </td>
                            <td>
                                <span style="color: #d34e15;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-currency-dollar" viewBox="0 0 16 16">
                                        <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
                                    </svg>-
                                </span>
                                <span class="text-danger">
                                    {{ item.karz | formatNumber }}
                                </span>
                            </td>
                            <td>
                                <button class="btn btn-success pt-0 pb-0" v-on:click="tolash(item)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-stack-overflow" viewBox="0 0 16 16">
                                        <path d="M12.412 14.572V10.29h1.428V16H1v-5.71h1.428v4.282h9.984z"/>
                                        <path d="M3.857 13.145h7.137v-1.428H3.857v1.428zM10.254 0 9.108.852l4.26 5.727 1.146-.852L10.254 0zm-3.54 3.377 5.484 4.567.913-1.097L7.627 2.28l-.914 1.097zM4.922 6.55l6.47 3.013.603-1.294-6.47-3.013-.603 1.294zm-.925 3.344 6.985 1.469.294-1.398-6.985-1.468-.294 1.397z"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div v-if="oknamod" class="div1">
        <div class="div2">
            <button type="button" class="close mb-3 mt-3 mr-3" v-on:click="modalsokna3(false)">
                <span aria-hidden="true" v-on:click="showModalEditor = false">&times;</span>
            </button>
            <div class="table-responsive">
                <div class="scro">
                    <table class="tabl scroltab">
                        <thead>
                            <tr>
                                <th>Mijoz</th>
                                <th>Savdo</th>
                                <th>Muddat</th>
                                <th>Karz</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr class="tir" v-for="item in objectauth2.qarz" :key="item.id">
                            <td> 
                                <span style="color: #2b64e2;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                    </svg>
                                </span>
                                {{ item.mijoz }}
                            </td>
                            <td>
                                <span style="color: #6363ff;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-coin" viewBox="0 0 16 16">
                                        <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
                                    </svg>
                                </span>
                                {{ item.jamisumma | formatNumber }}
                            </td>
                            <td>
                                <span style="color:green">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-calendar-date-fill" viewBox="0 0 16 16">
                                        <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zm5.402 9.746c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z"/>
                                        <path d="M16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-6.664-1.21c-1.11 0-1.656-.767-1.703-1.407h.683c.043.37.387.82 1.051.82.844 0 1.301-.848 1.305-2.164h-.027c-.153.414-.637.79-1.383.79-.852 0-1.676-.61-1.676-1.77 0-1.137.871-1.809 1.797-1.809 1.172 0 1.953.734 1.953 2.668 0 1.805-.742 2.871-2 2.871zm-2.89-5.435v5.332H5.77V8.079h-.012c-.29.156-.883.52-1.258.777V8.16a12.6 12.6 0 0 1 1.313-.805h.632z"/>
                                    </svg>
                                </span>
                                {{ item.srok }}
                            </td>
                            <td>
                                <span style="color: #d34e15;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-currency-dollar" viewBox="0 0 16 16">
                                        <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
                                    </svg>-
                                </span>
                                <span class="text-danger">
                                    {{ item.karz | formatNumber }}
                                </span>
                            </td>
                            <td>
                                <button class="btn btn-success pt-0 pb-0" v-on:click="tolash(item)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-stack-overflow" viewBox="0 0 16 16">
                                        <path d="M12.412 14.572V10.29h1.428V16H1v-5.71h1.428v4.282h9.984z"/>
                                        <path d="M3.857 13.145h7.137v-1.428H3.857v1.428zM10.254 0 9.108.852l4.26 5.727 1.146-.852L10.254 0zm-3.54 3.377 5.484 4.567.913-1.097L7.627 2.28l-.914 1.097zM4.922 6.55l6.47 3.013.603-1.294-6.47-3.013-.603 1.294zm-.925 3.344 6.985 1.469.294-1.398-6.985-1.468-.294 1.397z"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div v-if="oknamodzaqaz" class="div1">
        <div class="div2">
            <button type="button" class="close mb-3 mt-3 mr-3" v-on:click="modalsoknazaqaz(false)">
                <span aria-hidden="true" v-on:click="showModalEditor = false">&times;</span>
            </button>
            <div class="table-responsive">
                <div class="scro">
                    <table class="tabl scroltab">
                        <thead>
                            <tr>
                                <th>Sotuvchi</th>
                                <th>Zaqaz nomi</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr class="tir" v-for="item in objectauth2.zaqaz" :key="item.id">
                            <td>
                                {{ item.sotivchi }}
                            </td>                  
                            <td> 
                                <span style="color: #2b64e2;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                    </svg>
                                </span>
                                {{ item.name }}
                            </td>
                            <td>
                                <button class="btn btn-success pt-0 pb-0" v-on:click="olish(item)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                      </svg>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div v-if="okna2" class="oknamodal">
        <button type="button" class="close mb-3 mt-3 mr-3" v-on:click="modalsokna2(false)">
            <span aria-hidden="true" v-on:click="showModalEditor = false">&times;</span>
        </button>
        <br>
        <h4 class="text-center">{{ name }}</h4>
        <label for="" class="mx-3">Qarz</label>
        <div class="col-12">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stack-overflow position-fixed mt-2 ml-2" viewBox="0 0 16 16">
                <path d="M12.412 14.572V10.29h1.428V16H1v-5.71h1.428v4.282h9.984z"/>
                <path d="M3.857 13.145h7.137v-1.428H3.857v1.428zM10.254 0 9.108.852l4.26 5.727 1.146-.852L10.254 0zm-3.54 3.377 5.484 4.567.913-1.097L7.627 2.28l-.914 1.097zM4.922 6.55l6.47 3.013.603-1.294-6.47-3.013-.603 1.294zm-.925 3.344 6.985 1.469.294-1.398-6.985-1.468-.294 1.397z"/>
            </svg>
            <input type="text" name="" class="text-right form-control" v-model="qarz" disabled>
        </div>
        <label for="" class="mx-3 mt-2">Tolov summa</label>
        <div class="col-12">        
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-coin position-fixed mt-2 ml-2 pt-1" viewBox="0 0 16 16">
                <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
              </svg>
            <input type="text" name="" class="text-right form-control" v-model="tolov" v-on:keyup="tolov_key(tolov)" placeholder="To`lov summa">
        </div>
        <div v-if="muddat">
            <label for="" class="mx-3 mt-2">Muddatni belgilang</label>
            <div class="col-12">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-alarm position-fixed mt-2 ml-2 pt-1" viewBox="0 0 16 16">
                    <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"/>
                    <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z"/>
                  </svg>
                <input type="date" name="" class="text-right form-control border-danger" v-model="muddatdate">
            </div>
        </div>
        <div v-else>

        </div>
        <div v-if="filtretr === true">
            <div class="col-12 mt-3 mb-4">
                <button class="btn btn-success" style="width: 100%;" v-on:click="tolov_action">To`lash</button>
            </div>
        </div>
        <div v-else-if="muddatdate">
            <div class="col-12 mt-3 mb-4">
                <button class="btn btn-success" style="width: 100%;" v-on:click="tolov_action">To`lash</button>
            </div>
        </div>
        <div v-else>
            <div class="col-12 mt-3 mb-4">
                <button class="btn btn-light" style="width: 100%;">To`lash</button>                
            </div>
        </div>
    </div>

</template>