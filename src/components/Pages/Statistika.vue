<script>
    import { RouterLink } from 'vue-router';
    import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
    const local = JSON.parse(localStorage.getItem('sotuv'))
    const auth = JSON.parse(localStorage.getItem('auth'));
    const kurs = JSON.parse(localStorage.getItem('Kurs'));
    const format = new Intl.NumberFormat();
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
            login:'',
            token:'',
            statustyp: '',
            data1: '',
            data2: '',
            magazin: '',
            mijoz: '',
            mijoztip: '',
            tipv: '',
            clentlarni: []
        }
        },
        methods: {
            ...mapActions([
                'FilterAuthAc',
                'GetMagazin',
            ]),
            Localstor(){
                this.login = auth.login,
                this.token = auth.token,
                this.statustyp = auth.action
            },
            FilterAuth(){
                this.FilterAuthAc();
            },
            getMagazinfn(){
                const auth = JSON.parse(localStorage.getItem('auth'));
                if (auth.method_id) {
                    this.GetMagazin({
                        'method': 'post',
                        'url': 'etagazin_fn',
                        'login': this.login,
                        'token': this.token,
                        'status': this.statustyp,
                        'magazinId': auth.method_id,
                        'magazin': auth.method_name,
                    });
                }else{}
            },
            ochistit(){
                this.data1 = '',
                this.data2 = '',
                this.magazin = '',
                this.mijoz = '',
                this.mijoztip = '',
                this.tipv = '',
                this.clentlarni = []
            },
            mijoztipfn(typ){
                this.mijoztip = typ;
            },
            fncl(arg){
                const cl = this.Itmmag.pradav.filter((items) => { return items.magazinId == arg; });
                if (cl.length > 0) {
                    this.clentlarni = cl;
                } else {
                    this.clentlarni = [];
                }
            },
            tips(typ){
                this.tipv = typ;
            },

        },
        computed: {
            ...mapGetters({
                Itmmag: 'Itmmag',
            }),
        },
        mounted() {
            this.FilterAuth();
            this.Localstor();
            this.getMagazinfn();

        }
    }
</script>

<template>
    <div class="row">
        <div class="col-2">
            <input type="date" class="form-control" v-model="data1">
        </div>
        <div class="col-2">
            <input type="date" class="form-control" v-model="data2">
        </div>
        <div class="col-2">
            <select class="form-control" v-on:change="fncl(magazin)" v-model="magazin">
                <option value="">--Выбирать магазин--</option>
                <option v-for="iteme in Itmmag.dbmag" :value="iteme.id">{{ iteme.name }}</option>
            </select>
        </div>
        <div class="col-2">
            <select class="form-control" v-on:change="mijoztipfn(mijoztip)" v-model="mijoztip">
                <option value="">--Выбирать тип продав--</option>
                <option value="1">Оптвий</option>
                <option value="2">Рознишниь</option>
            </select>
        </div>
        <div class="col-2">
            <select class="form-control" v-on:change="mijozfn(mijoz)" v-model="mijoz">
                <option value="">--Выбирать клент--</option>
                <option v-for="iteme in clentlarni" :value="iteme.id">{{ iteme.name }}</option>
            </select>
        </div>
        <div class="col-2">
            <select class="form-control" v-on:change="tips(tipv)" v-model="tipv">
                <option value="">--Выбирать тип--</option>
                <option value="1">Продаж</option>
                <option value="2">Долги</option>
            </select>
        </div>
        <div class="col-2 mt-3">
            <button class="btn btn-danger btn-sm" v-on:click="" style="width: 100%;">Долги</button>
        </div>
        <div class="col-2 mt-3">
            <button class="btn btn-danger btn-sm" v-on:click="" style="width: 100%;">Расход</button>
        </div>
        <div class="col-2 mt-3">
            <button class="btn btn-primary btn-sm" v-on:click="" style="width: 100%;">продав</button>
        </div>
        <div class="col-2 mt-3">
            <button class="btn btn-success btn-sm" v-on:click="" style="width: 100%;">В2В</button>
        </div>
        <div class="col-2 mt-3">
            <button class="btn btn-success btn-sm" v-on:click="" style="width: 100%;">В2С</button>
        </div>
        <div class="col-2 mt-3">
            <button class="btn btn-warning btn-sm" v-on:click="ochistit" style="width: 100%;">Очистит</button>
        </div>
    </div>
</template>
