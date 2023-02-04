<script>
  import { RouterLink } from 'vue-router'
  import { mapState, mapGetters, mapActions} from 'vuex'
  export default {
        data() {
            return {
              login: '',
              token: '',
              statustyp: '',
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
            const auth = JSON.parse(localStorage.getItem('auth'));
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
              'status': this.statustyp,
            });
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
                <h4>Savdo</h4>
                {{ foyda.savdo }}
              </div>
              <div class="col-4 alert alert-danger text-center">
                <h4>Rasxod</h4>
                {{ foyda.rasxod }}
              </div>
              <div class="col-4 alert alert-danger text-center">
                <h4>Chiqim qarz</h4>
                {{ foyda.chiqishqarz }}
              </div>
              <div class="col-4 alert alert-danger text-center">
                <h4>Qarz</h4>
                {{ foyda.kirishqarz }}
              </div>
              <div class="col-4 alert alert-success text-center">
                <h4>Foyda</h4>
                {{ foyda.foyda }}
              </div>
              <div class="col-4 alert alert-success text-center">
                <h4>Sqlad Summa</h4>
                {{ foyda.sqlad }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
