<script>
  import { RouterLink } from 'vue-router'
  import { mapState, mapGetters, mapActions} from 'vuex'
  const auth = JSON.parse(localStorage.getItem('auth'));
  export default {
    data() {
        return {
            showModalDel: false,
            id: auth,
    
        }
    },
    methods: {
        ...mapActions([
        'FilterAuthAc',
        'OriginalMethodUrlGet',
        'OriginalMethodUrlPost'
        ]),
        FilterAuth(){
        this.FilterAuthAc();
        },
        Localstor(){
        const auth = JSON.parse(localStorage.getItem('auth'));
        this.login = auth.login,
        this.token = auth.token
        this.statustyp = auth.action
        },
    },
    computed: {
        ...mapGetters({
        Itemobjects: 'Itemobjects'
        }),
    },
    mounted() {
        this.FilterAuth();
        this.Localstor();
    }
}
</script>

<template>
    <h1>{{ id }}</h1>
</template>
