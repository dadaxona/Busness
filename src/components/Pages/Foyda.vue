<script>
  import { RouterLink } from 'vue-router'
  import { mapState, mapGetters, mapActions} from 'vuex'
  const auth = JSON.parse(localStorage.getItem('auth'));
  const format = new Intl.NumberFormat();
  export default {
        data() {
            return {
              login: '',
              token: '',
              statustyp: '',
              savdo: 0,
              rasxod: 0,
              chiqishqarz: 0,
              kirishqarz: 0,
              foyda1: 0,
              sqlad: 0,
            }
        },
        methods: {
          ...mapActions([
            'FilterAuthAc',
            'SqladMethodUrlPost',
            'SqladDB',
            'Foyda_Act'
          ]),
          FilterAuth(){
            this.FilterAuthAc();
          },
          Localstor(){
            this.login = auth.login,
            this.token = auth.token,
            this.statustyp = auth.action
          },
          OriginalGet(){
            this.Foyda_Act({
              'method': 'post',
              'url': 'foyda_post',
              'login': this.login,
              'token': this.token,
              'magazinId': auth.method_id,
              'status': this.statustyp,
            });
          },
          chaqirish(){
            setInterval(() => {
              this.savdo = format.format(this.foyda.savdo);
              this.rasxod = format.format(this.foyda.rasxod);
              this.chiqishqarz = format.format(this.foyda.chiqishqarz);
              this.kirishqarz = format.format(this.foyda.kirishqarz);
              this.foyda1 = format.format(this.foyda.foyda);
              this.sqlad = format.format(this.foyda.sqlad);              
            }, 5000);
          },
        },
        computed: {
          ...mapGetters({
            foyda: 'foyda'
          }),
        },
        mounted() {
          this.FilterAuth();
          this.Localstor();
          this.OriginalGet();
          this.chaqirish();
        }
      }
</script>

<template>
  <div class="row mb-4">
    <div class="col-md-12 mb-3">
        <div class="card text-left">
          <div class="card-body">
            <div class="row">
              <div class="col-4 alert alert-primary text-center">
                <h4>Торговы</h4>
                {{ savdo }}
              </div>
              <div class="col-4 alert alert-danger text-center">
                <h4>Расход</h4>
                {{ rasxod }}
              </div>
              <div class="col-4 alert alert-danger text-center">
                <h4>Выходная цена</h4>
                {{ chiqishqarz }}
              </div>
              <div class="col-4 alert alert-danger text-center">
                <h4>Долг</h4>
                {{ kirishqarz }}
              </div>
              <div class="col-4 alert alert-success text-center">
                <h4>Прибл</h4>
                {{ foyda1 }}
              </div>
              <div class="col-4 alert alert-success text-center">
                <h4>Склад сумма</h4>
                {{ sqlad }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
