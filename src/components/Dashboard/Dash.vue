<script>
    import { RouterLink } from 'vue-router'
    import { mapState, mapGetters, mapMutations, mapActions} from 'vuex'
    const auth = JSON.parse(localStorage.getItem('auth'));
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day1 = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var monh = '';
    var day = '';
    if (month < 10) {
        monh = '0' + month;
    } else {
        monh = month;
    }
    if (day1 < 10) {
        day = '0' + day1;
    } else {
        day = day1;
    }
    export default {
        data() {
            return {
                okna: false,
                okna2: false,
                muddat: true,
                qarz: '',
                muddatdate: '',
                tolov: '',
                dinamik: '',
                maga: '',
                filtdate: '',
                id: '',
                tip:'',
                adress:'',
                name: '',
                ogoh:'',
                soni:'',
                olinish:'',
                sotilish:'',
                sotilish2:'',
                valyuta:'',
                shtrix: '',
                toxtatish3: '',
                filtretr: false,
                oknamod: false,
                oknamodzaqaz: false,
                oknaSavdo: false,
                oknaSavdo2: false,
                kabinet1: false,
                vazvratModal: false,
                showModal: false,
                showModalDel: false,
                otprov2: false,
                filclent2: [],
                mijozs: '',
                mijozs2: '',
                ty: '',
                ishname: '',
                date:  year + "-" + monh + "-" + day,
                vaz: {
                    savdoId: '',
                    id: '',
                    name: '',
                    soni: '',
                    soni2: '',
                },
                for1: {
                    format2: '',
                    format3: '',
                }
            }
        },
        methods: {
            ...mapActions([
                'FilterAuthAc',
                'Tolov_Avt',
                'Zaqaz_Olish_Ac',
                'SavdoBut_Ac',
                'Savdo2_ac',
                'suniyIntelAC',
                'suniyIntelACzaqaz',
                'OriginalMethodUrlGet',
                'VazvredClickAct',
                'Olishfn',
                'VariantAct',
                'CreateSqladdbAc',
                'SqladMethoddb',
                'FiltdatefnAc',
                'IshchiGet'
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
            Localstor(){
                this.login = auth.login,
                this.token = auth.token,
                this.statustyp = auth.action
                this.ty = auth.ty
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
                const auth = JSON.parse(localStorage.getItem('auth'));
                if (auth.method_id) {
                    this.Tolov_Avt({
                        'method': 'post',
                        'url': 'tolovpost',
                        'id': this.id,
                        'qarz': this.qarz,
                        'tolov': this.tolov,
                        'srok': this.muddatdate,
                        'magazin': auth.method_name,
                        'telegram': auth.method_chat
                    });
                    this.clr();
                }else{}
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
                const auth = JSON.parse(localStorage.getItem('auth'));
                if (auth.method_id) {
                    this.IshchiGet({
                        'method': 'post',
                        'url': 'ishchiget_get',
                        'magazinId': auth.method_id,
                    });
                    this.oknaSavdo = typ;
                } else {}
            },
            oknaSavdobut2(typ){
                this.oknaSavdo2 = typ;
            },
            SavdoBut(item){
                this.SavdoBut_Ac({
                    'method': 'post',
                    'url': 'sotuv_post_id',
                    'id': item,
                    'savdoId': 1
                });
                this.oknaSavdo2 = true;
            },
            objecta2(typ){
                this.Savdo2_ac({
                    'typ': typ
                });
            },
            autherMethod(){
                this.maga = auth.method_id;
            },
            magarew(maga){
                const auth = JSON.parse(localStorage.getItem('auth'));
                var mid = this.objectauth2.magazin.find(e => { return e.id == maga });
                if (mid) {
                    auth.method_id = mid.id;
                    auth.method_name = mid.name;
                    auth.method_chat = mid.telegram;
                } else {
                    auth.method_id = '';
                    auth.method_name = '';
                    auth.method_chat = '';
                }
                localStorage.setItem('auth', JSON.stringify(auth));
                window.location.reload(true);
            },
            obnovleniya(){
                window.location.reload(true);
            },
            vazwrad(){
                const row = JSON.parse(localStorage.getItem('vaz'));
                this.vaz.savdoId = row.savdoid;
                this.vaz.id = row.id;
                this.vaz.name = row.name;
                this.vaz.soni = row.soni;
                this.vaz.soni2 = '';
                this.vazvratModal = true;
            },
            vazkeyup(row){
                if (parseFloat(row) > parseFloat(this.vaz.soni)) {
                    this.vaz.soni2 = this.vaz.soni;
                } else {
                    this.vaz.soni2 = row;
                }
            },
            vazvredClick(){
                const auth = JSON.parse(localStorage.getItem('auth'));
                if (auth.method_id) {
                    this.VazvredClickAct({
                        'method': 'post',
                        'url2': 'vazvrad_post',
                        'id': this.vaz.savdoId,
                        'id2': this.vaz.id,
                        'soni2': this.vaz.soni2,
                        'savdoId': 1,
                    });
                    this.vaz.savdoId = '';
                    this.vaz.id = '';
                    this.vaz.name = '';
                    this.vaz.soni = '';
                    this.vaz.soni2 = '';
                    this.vazvratModal = false;
                    localStorage.removeItem('vaz')
                }else{}
            },
            intervals2(){
                const auth = JSON.parse(localStorage.getItem('auth'));
                if (auth.method_id) {
                    setInterval(() => {
                        this.suniyIntelACzaqaz({
                            'method': 'post',
                            'url': 'zaqazlar',
                            'login': this.login,
                            'token': this.token,
                            'magazinId': auth.method_id,
                            'magazin': auth.method_name,
                            'status': this.statustyp,
                            'date': this.date,
                        });
                        this.formats();
                    }, 5000);
                }
            },
            formats(){
                const formatter = new Intl.NumberFormat();
                this.for1.format2 = formatter.format(this.objectauth2.jami);
                this.for1.format3 = formatter.format(this.objectauth2.foyda);
            },
            modalsoknadb(typ){
                const auth = JSON.parse(localStorage.getItem('auth'));
                if (auth.method_id) {
                    this.Olishfn({
                        'method': 'post',
                        'url2': 'olishdb',
                        'url': 'getdb',
                        'login': this.login,
                        'token': this.token,
                        'magazinId': auth.method_id,
                        'magazin': auth.method_name,
                        'status': this.statustyp,
                    });
                }
                this.otprov2 = typ;
            },
            editsqdb(item){
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
            delettipdb(id, name){
                this.id = id;
                this.name = name,
                this.showModalDel = true;
            },
            valpush(item){
                this.tip = item.name;
                this.toxtatish = false;
            },
            tipkey(row){
                const auth = JSON.parse(localStorage.getItem('auth'));
                if (auth.method_id) {
                    this.VariantAct({
                        'tip': row,
                    });
                    this.toxtatish = true;
                }else{}
            },
            CreateSqladdb(){
                if (auth.method_id) {
                    this.CreateSqladdbAc({
                        'method': 'post',
                        'url': 'sqlad_dbpost',
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
                        'date': this.date,
                        'login': this.login,
                        'token': this.token,
                        'status': this.statustyp,
                        'magazinId': auth.method_id,
                        'magazin': auth.method_name,
                    });
                    this.Clears();
                } else {}
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
            SqladDeletdb(){
                this.SqladMethoddb({
                    'method': 'post',
                    'url': 'sqlad_deletedb',
                    'id': this.id,
                    'login': this.login,
                    'token': this.token,
                    'magazinId': auth.method_id,
                    'magazin': auth.method_name,
                    'status': this.statustyp,              
                });
                this.Clears();
            },
            saxranit(){
                this.SqladMethoddb({
                    'method': 'post',
                    'url': 'sqldbpost',
                    'login': this.login,
                    'token': this.token,
                    'date': this.date,
                    'magazinId': auth.method_id,
                    'magazin': auth.method_name,
                    'status': this.statustyp,              
                });
            },
            filtdatefn(){
                this.FiltdatefnAc({
                    'method': 'post',
                    'url': 'filtrsotuv',
                    'login': this.login,
                    'token': this.token,
                    'clent': this.mijozs,
                    'date': this.filtdate,
                    'ishchi': this.ishname,
                    'magazinId': auth.method_id,
                    'magazin': auth.method_name,
                    'status': this.statustyp,  
                });
            },
            valpush3(item){
                this.mijozs = item.id;
                this.mijozs2 = item.name;
                this.toxtatish3 = false;
                this.filtdatefn();
            },
            tipkey3(row){
                if (row) {
                const auth = JSON.parse(localStorage.getItem('auth'));
                    if (auth.method_id) {
                        this.filclent2 = this.objectauth2.mijoz.filter((item) => item.name.toLowerCase().includes(row));
                        if (this.filclent2.length > 0) {
                            this.toxtatish3 = true;
                        } else {
                            this.toxtatish3 = false;
                        }
                    }else{}
                } else {
                    this.toxtatish3 = false;
                }
            },
            ishnamefn(){
                this.filtdatefn();
            }
        },
        computed: {
            ...mapGetters({
                authtenticat:'authtenticat',
                objectauth2: 'objectauth2',
                savdoobj: 'savdoobj',
                JamisummaSotuv: 'JamisummaSotuv',
                tablestyil: 'tablestyil',
                dbitms: 'dbitms',
                option1: 'option1',
                valyudata: 'valyudata',
                Ishch: 'Ishch'
            }),
        },
        mounted() {
            this.FilterAuth();
            this.Localstor();
            this.autherMethod();
            this.intervals2();
        }
    }

</script>

<template>
    <span id="clickon" v-on:click="vazwrad"></span>
    <!-- <div class="set" v-on:click="kabinet2(true)">
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
    </div> -->

    <div class="app-admin-wrap layout-horizontal-bar">
        <div class="main-header">
            <div class="logo"><img src="../../assets/ig.jpg" alt="" /></div>         
                <div style="margin: auto"></div>                    
                    <div class="header-part-right">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" v-on:click="obnovleniya" class="bi bi-arrow-clockwise mr-2 cursor-pointer" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                        </svg>
                    <span v-if="authtenticat.status == 'brend'" class="mx-2" style="font-size: 15px; font-weight: 800;">$ +{{ for1.format2 }};  $ +{{ for1.format3 }};</span>
                    <div v-if="authtenticat.status == 'brend'">
                        <select name="" id="" v-on:change="magarew(maga)" v-model="maga" class="ffdd">
                            <option value="">Магазин</option>
                            <option v-for="itema in objectauth2.magazin" :value="itema.id"> ID-( {{ itema.id }} ) {{ itema.name }}</option>
                        </select>
                    </div>
                    <div v-else></div>
                    <i class="i-Full-Screen header-icon d-none d-sm-inline-block" data-fullscreen=""></i>
                    <div class="dropdown" v-on:click="modalsokna(true)">
                        <div v-if="objectauth2.srok.length" class="badge-top-container">
                            <span class="badge badge-primary alre">{{ objectauth2.srok.length }}</span>
                            <i class="i-Bell text-muted header-icon"></i>
                        </div>
                        <div v-else></div>
                    </div>
                    <div class="dropdown" v-on:click="modalsoknadb(true)">
                        <div v-if="objectauth2.jonatma.length" class="badge-top-container alre22 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-database-down ml-3" viewBox="0 0 16 16">
                                <path d="M12.5 9a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Zm.354 5.854 1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V10.5a.5.5 0 0 0-1 0v2.793l-.646-.647a.5.5 0 0 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0Z"/>
                                <path d="M12.096 6.223A4.92 4.92 0 0 0 13 5.698V7c0 .289-.213.654-.753 1.007a4.493 4.493 0 0 1 1.753.25V4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.525 4.525 0 0 1-.813-.927C8.5 14.992 8.252 15 8 15c-1.464 0-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13h.027a4.552 4.552 0 0 1 0-1H8c-1.464 0-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10c.262 0 .52-.008.774-.024a4.525 4.525 0 0 1 1.102-1.132C9.298 8.944 8.666 9 8 9c-1.464 0-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777ZM3 4c0-.374.356-.875 1.318-1.313C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4Z"/>
                            </svg>
                        </div>
                        <div v-else></div>
                    </div>
                    <div class="dropdown">
                        <div class="user col align-self-end"><img id="userDropdown" src="../../assets/1.jpg" alt="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                                <div class="dropdown-header">
                                    <i class="i-Lock-User mr-1"></i> {{ authtenticat.login }}
                                </div>
                                <RouterLink v-if="ty == 'Продавец'" class="dropdown-item" to="/tel">Версия Телефон </RouterLink>
                                <RouterLink v-if="authtenticat.status == 'brend'" class="dropdown-item" to="/setting">Профил Настройки </RouterLink>
                                <a class="dropdown-item" v-on:click="Logaut_user">Выход</a>
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
                                        <div v-on:click="intervals">
                                            <label class="toggle" for="drop-2">Главная страница</label><RouterLink to="dash"><i class="nav-icon mr-2 i-Bar-Chart"></i> Главная страница</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Торговы</label><RouterLink to="treding"><i class="nav-icon mr-2 i-Suitcase"></i>Торговы</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <!-- end ui kits-->
                                <li>
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Валюта</label><RouterLink to="valyuta"><i class="nav-icon i-Library mr-2"></i> Валюта </RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <!-- end extra uikits-->
                                <li>
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Клент</label><RouterLink to="user"><i class="nav-icon mr-2 i-Computer-Secure"></i> Клент</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <!-- end apps-->
                                <li>
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Тип товар</label><RouterLink to="tovartip"><i class="nav-icon i-Library mr-2"></i> Тип товар</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <!-- end Forms-->
                                <li>
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Доставщик</label><RouterLink to="yetkazuvchi"><i class="nav-icon mr-2 i-Administrator"></i> Доставщик</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Склад</label><RouterLink to="sqlad"><i class="nav-icon mr-2 i-Windows-2"></i> Склад</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <!--end-datatables-->
                                <li>
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Расход</label><RouterLink to="chiqim"><i class="nav-icon mr-2 i-Administrator"></i> Расход</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Зарплата</label><RouterLink to="oylik"><i class="nav-icon mr-2 i-Administrator"></i>Зарплата</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Прибл</label><RouterLink to="foyda"><i class="nav-icon mr-2 i-File-Horizontal-Text"></i> Прибл</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Задача</label><RouterLink to="zadacha"><i class="nav-icon mr-2 i-File-Horizontal-Text"></i> Задача</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <!--end-doc  -->
                            </ul>
                            <ul v-if="ty == 'Продавец'" class="menu float-left">
                                <!-- <li>
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Главная страница</label><RouterLink to="dash"><i class="nav-icon mr-2 i-Bar-Chart"></i> Главная страница</RouterLink>
                                        </div>
                                    </div>
                                </li> -->
                                <li>
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Торговы</label><RouterLink to="treding"><i class="nav-icon mr-2 i-Suitcase"></i>Торговы</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <!-- end ui kits-->
                                <li v-if="authtenticat.valyuta == 1">
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Валюта</label><RouterLink to="valyuta"><i class="nav-icon i-Library mr-2"></i> Валюта </RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <!-- end extra uikits-->
                                <li v-if="authtenticat.mijoz == 1">
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Клент</label><RouterLink to="user"><i class="nav-icon mr-2 i-Computer-Secure"></i> Клент</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <!-- end apps-->
                                <li v-if="authtenticat.tip == 1">
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Тип товар</label><RouterLink to="tovartip"><i class="nav-icon i-Library mr-2"></i> Тип товар</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <!-- end Forms-->
                                <li v-if="authtenticat.yetkazu == 1">
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Доставщик</label><RouterLink to="yetkazuvchi"><i class="nav-icon mr-2 i-Administrator"></i> Доставщик</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <li v-if="authtenticat.sqlad == 1">
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Склад</label><RouterLink to="sqlad"><i class="nav-icon mr-2 i-Windows-2"></i> Склад</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <!--end-datatables-->
                                <li v-if="authtenticat.chiqim == 1">
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Расход</label><RouterLink to="chiqim"><i class="nav-icon mr-2 i-Administrator"></i> Расход</RouterLink>
                                        </div>
                                    </div>
                                </li>                  
                                <li v-if="authtenticat.foyda == 1">
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Прибл</label><RouterLink to="foyda"><i class="nav-icon mr-2 i-File-Horizontal-Text"></i> Прибл</RouterLink>
                                        </div>
                                    </div>
                                </li>
                                <li v-else>

                                </li>
                                <li>
                                    <div>
                                        <div>
                                            <label class="toggle" for="drop-2">Задача</label><RouterLink to="zadacha"><i class="nav-icon mr-2 i-File-Horizontal-Text"></i> Задача</RouterLink>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <ul v-else>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!-- =============== Horizontal bar End ================-->
            <div class="main-content-wrap d-flex flex-column">
                <!-- ============ Body content start ============= -->
                <div class="main-content">
                    <div v-if="authtenticat.status == 'brend' || ty == 'Продавец'" class="row">
                        <!-- ICON BG-->
                        <div class="col-lg-3 col-md-6 col-sm-6">
                            <RouterLink to="user">
                                <div class="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
                                    <div class="card-body text-center"><i class="i-Add-User"></i>
                                        <div class="content">
                                            <p class="text-muted mt-2 mb-0">Клент</p>
                                            <p class="text-primary text-24 line-height-1 mb-2">{{ objectauth2.mijoz.length }}</p>
                                        </div>
                                    </div>
                                </div>
                            </RouterLink>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-6" v-on:click="oknaSavdobut(true)">
                            <div class="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
                                <div class="card-body text-center"><i class="i-Financial"></i>
                                    <div class="content">
                                        <p class="text-muted mt-2 mb-0">Продажи</p>
                                        <p class="text-primary text-24 line-height-1 mb-2">$ {{ objectauth2.savdo.length }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-6" v-on:click="modalsoknazaqaz(true)">
                            <div class="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
                                <div class="card-body text-center"><i class="i-Checkout-Basket"></i>
                                    <div class="content">
                                        <p class="text-muted mt-2 mb-0">Заказ</p>
                                        <p class="text-primary text-24 line-height-1 mb-2">{{ objectauth2.zaqaz.length }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-6" v-on:click="modalsokna3(true)">
                            <div class="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
                                <div class="card-body text-center"><i class="i-Money-2"></i>
                                    <div class="content">
                                        <p class="text-muted mt-2 mb-0">Долги</p>
                                        <p class="text-primary text-24 line-height-1 mb-2">$ {{ objectauth2.qarz.length }}</p>
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
            <div class="table-responsive">
                <div class="scro">
                    <table class="tabl scroltab">
                        <thead>
                            <tr>
                                <!-- <th>Клент</th> -->
                                <th>
                                    <input type="text"  v-on:keyup="tipkey3(mijozs2)" v-model="mijozs2" placeholder="Клент имя">
                                    <div v-if="toxtatish3" 
                                        style="
                                        position: absolute;
                                        background-color: white;
                                        width: 20%;
                                        z-index: 2;
                                        border: 1px solid #c0c0c0;
                                        ">
                                        <option v-for="item in filclent2" :value="item.name"
                                        class="cursor-pointer ho" v-on:click="valpush3(item)">
                                        {{item.name}}
                                        </option>
                                    </div>
                                    <div v-else></div>
                                </th>
                                <th>Торговы</th>
                                <th>Налични</th>
                                <th>Карта</th>
                                <th>Банк</th>
                                <th>Karz</th>
                                <th>
                                    <select v-on:change="ishnamefn" v-model="ishname">
                                        <option value="">--Выбирать продавец--</option>
                                        <option v-for="item in Ishch" :value="item.name">{{ item.name }}</option>
                                    </select>
                                </th>
                                <!-- <th>Продавец</th> -->
                                <!-- <th>Дата</th> -->
                                <th><input type="date" v-on:change="filtdatefn" v-model="filtdate"></th>
                            </tr>
                        </thead>
                        <tbody v-html="tablestyil">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div v-if="oknaSavdo2" class="div1">
        <div class="div25457">
            <button type="button" class="close mb-3 mt-3 mr-3" v-on:click="oknaSavdobut2(false)">
                <span aria-hidden="true" v-on:click="oknaSavdo2 = false">&times;</span>
            </button>
            <h4 class="mx-2 mt-3">Jami Summa: $ +{{ JamisummaSotuv }}</h4>
            <div class="table-responsive">
                <div class="scro">
                    <table class="tabl scroltab">
                        <thead>
                            <tr>
                                <th>Товар</th>
                                <th>Количество</th>
                                <th>Продажи</th>
                                <th>Скидка сумма</th>
                                <th>Скидка протсент</th>
                                <th>Итого сумма</th>
                                <th>Продавец</th>
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
                                    {{ item.skidka }}
                                </td>
                                <td>
                                    {{ item.jami | formatNumber }} {{ item.valyuta }}
                                </td>
                                <td>
                                    {{ item.sotivchi }}
                                </td>
                                <td>
                                    <button class="btn-danger" v-on:click="vazwrad(item)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
                                            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
                                        </svg>
                                        Возврат
                                    </button>
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
                                <th>Клент</th>
                                <th>Торговы</th>
                                <th>Срок</th>
                                <th>Долг</th>
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
                                {{ item.jamisumma | formatNumber }} {{ item.valyuta }}
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
                                <th>Клент</th>
                                <th>Торговы</th>
                                <th>Срок</th>
                                <th>Долг</th>
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
                                {{ item.jamisumma | formatNumber }} {{ item.valyuta }}
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
                                    {{ item.karz | formatNumber }} {{ item.valyuta }}
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
                                <th>Продавец</th>
                                <th>Заказ</th>
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
        <label for="" class="mx-3">Долг</label>
        <div class="col-12">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stack-overflow position-fixed mt-2 ml-2" viewBox="0 0 16 16">
                <path d="M12.412 14.572V10.29h1.428V16H1v-5.71h1.428v4.282h9.984z"/>
                <path d="M3.857 13.145h7.137v-1.428H3.857v1.428zM10.254 0 9.108.852l4.26 5.727 1.146-.852L10.254 0zm-3.54 3.377 5.484 4.567.913-1.097L7.627 2.28l-.914 1.097zM4.922 6.55l6.47 3.013.603-1.294-6.47-3.013-.603 1.294zm-.925 3.344 6.985 1.469.294-1.398-6.985-1.468-.294 1.397z"/>
            </svg>
            <input type="text" name="" class="text-right form-control" v-model="qarz" disabled>
        </div>
        <label for="" class="mx-3 mt-2">К оплате</label>
        <div class="col-12">        
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-coin position-fixed mt-2 ml-2 pt-1" viewBox="0 0 16 16">
                <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
              </svg>
            <input type="text" name="" class="text-right form-control" v-model="tolov" v-on:keyup="tolov_key(tolov)" placeholder="To`lov summa">
        </div>
        <div v-if="muddat">
            <label for="" class="mx-3 mt-2">Выберите срок</label>
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
                <button class="btn btn-success" style="width: 100%;" v-on:click="tolov_action">Платить</button>
            </div>
        </div>
        <div v-else-if="muddatdate">
            <div class="col-12 mt-3 mb-4">
                <button class="btn btn-success" style="width: 100%;" v-on:click="tolov_action">Платить</button>
            </div>
        </div>
        <div v-else>
            <div class="col-12 mt-3 mb-4">
                <button class="btn btn-light" style="width: 100%;">Платить</button>                
            </div>
        </div>
    </div>
    
    <div v-if="vazvratModal" class="oknamodal">
        <button type="button" class="close mb-3 mt-3 mr-3" v-on:click="vazvratModal = false">
            <span aria-hidden="true">&times;</span>
        </button>
        <br>
        <h4 class="text-center">{{ vaz.name }}</h4>
        <label for="" class="mx-3">Шт</label>
        <div class="col-12">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stack-overflow position-fixed mt-2 ml-2" viewBox="0 0 16 16">
                <path d="M12.412 14.572V10.29h1.428V16H1v-5.71h1.428v4.282h9.984z"/>
                <path d="M3.857 13.145h7.137v-1.428H3.857v1.428zM10.254 0 9.108.852l4.26 5.727 1.146-.852L10.254 0zm-3.54 3.377 5.484 4.567.913-1.097L7.627 2.28l-.914 1.097zM4.922 6.55l6.47 3.013.603-1.294-6.47-3.013-.603 1.294zm-.925 3.344 6.985 1.469.294-1.398-6.985-1.468-.294 1.397z"/>
            </svg>
            <input type="text" name="" class="text-right form-control" v-model="vaz.soni"  id="vazsoni" disabled>
        </div>
        <label for="" class="mx-3 mt-2">Возврат шт</label>
        <div class="col-12">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-coin position-fixed mt-2 ml-2 pt-1" viewBox="0 0 16 16">
                <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
            </svg>
            <input type="text" name="" class="text-right form-control" v-model="vaz.soni2" v-on:keyup="vazkeyup(vaz.soni2)" placeholder="To`lov summa">
        </div>
        <div v-if="vaz.soni2">
            <div class="col-12 mt-3 mb-4">
                <button class="btn btn-success" style="width: 100%;" v-on:click="vazvredClick">Возврат</button>
            </div>
        </div>
        <div v-else>
            <div class="col-12 mt-3 mb-4">
                <button class="btn btn-light" style="width: 100%;">Возврат</button>                
            </div>
        </div>
    </div>

<div v-if="otprov2" class="otp">           
      <div class="col-md-12 mb-3">
        <div class="card text-left">
          <div class="card-body">
            <div class="serc mb-2">
                <button v-on:click="otprov2 = false" class="btn btn-danger btn-sm m-1">Назад</button>
                <button v-on:click="saxranit" class="mx-3 btn-sm m-1 btn btn-primary">Сохранить</button>
            </div>
              <div class="table-responsive">
                <div class="scroltabbd2">
                  <table class="tabl scroltab">
                    <thead>
                        <tr>
                            <th>Тип</th>
                            <th>Адрес</th>
                            <th>Товар</th>
                            <th>N.1</th>
                            <th>Штрих код</th>
                            <th>Количество</th>
                            <th>Получающий</th>
                            <th>Низкая</th>
                            <th>Стандартная</th>
                            <th>Валюта</th>
                            <th>Управление</th>
                        </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in dbitms" :key="item.id" class="tir">
                        <td>{{ item.tip }}</td>
                        <td>{{ item.adress }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.kod }}</td>
                        <td>{{ item.ogoh }}</td>
                        <td>{{ item.soni }}</td>
                        <td>{{ item.olinish }}</td>
                        <td>{{ item.sotilish }}</td>
                        <td>{{ item.sotilish2 }}</td>
                        <td>{{ item.valyuta }}</td>
                        <td>
                            <a class="text-success mx-3 cursor-pointer" v-on:click="editsqdb(item)">
                                <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                            </a>
                             <a class="text-danger mr-2" v-on:click="delettipdb(item.id, item.name)">
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
              <h5 class="modal-title">Товар</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" v-on:click="showModal = false">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">Тип</label>
                  <input type="text" class="form-control" v-on:keyup="tipkey(tip)" v-model="tip">
                   <div v-if="toxtatish" 
                    style="
                      position: absolute;
                      background-color: white;
                      width: 100%;
                      width: 87%;
                      z-index: 2;
                      border: 1px solid #c0c0c0;
                    ">
                    <option v-for="item in option1" :value="item.name"
                      class="cursor-pointer ho" v-on:click="valpush(item)">
                      {{item.name}}
                    </option>
                  </div>
                  <div v-else></div>
                </div>
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">Адрес</label>
                   <input class="form-control" id="firstName1" type="text" v-model="adress" disabled>
                </div>
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">Товар</label>
                  <input class="form-control" id="firstName1" type="text" v-model="name">
                </div>
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">N.1</label>
                  <input class="form-control" id="firstName1" type="number" v-model="ogoh">
                </div>
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">Количество</label>
                  <input class="form-control" id="firstName1" type="number" v-model="soni">
                </div>
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">Получающий</label>
                  <input class="form-control" id="firstName1" type="text" v-model="olinish">
                </div>
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">Низкая</label>
                  <input class="form-control" id="firstName1" type="text" v-model="sotilish">
                </div>
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">Стандартная</label>
                  <input class="form-control" id="firstName1" type="text" v-model="sotilish2">
                </div>
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">Валюта</label>
                  <select class="form-control" v-model="valyuta" name="adress" id="adress">
                    <option v-for="item in valyudata">
                      {{item.name}}
                    </option>
                  </select>
                </div>
                <div class="col-md-6 form-group mb-3">
                  <label for="firstName1">Штрих код</label>
                  <input class="form-control" id="firstName1" type="text" v-model="shtrix">
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" v-on:click="showModal = false">Назад</button>
              <button type="button" class="btn btn-primary" v-on:click="CreateSqladdb">Сохранить</button>
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
              <h5 class="modal-title text-danger">Удалить</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="showModalDel = false">&times;</span>
              </button>
            </div>
              <input type="hidden" name="" id="" v-model="id">
              <div class="col-md-12 form-group mb-3">
                <input class="form-control text-center" type="text"  v-model="name" disabled>
            </div>
            <div class="modal-body text-center">
              <button type="button" class="btn btn-danger mx-2" @click="showModalDel = false">Нет</button>
              <button type="button" class="btn btn-primary" v-on:click="SqladDeletdb">Да</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</div>

</template>