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
<div class="aaaaa1">
    <div class="hed1">
        <div class="row">
            <div class="col-9 pl-4">
                <input type="checkbox" class="chhhhh"><span class="bkapt mx-2"> BK / Apt</span> <input type="text" class="inps1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square sert" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                <span class="bkapt mx-2">№ Деск</span> <input type="text" class="inps1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square sert" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                <span class="bkapt mx-1">Дата Продажи</span><input type="date" class="inps1">
            </div>
            <div class="col-3">
                <button class="otmen">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-danger mx-1 bi bi-slash-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708z"/>
                    </svg>
                    Отмена
                </button>
                <button class="mx-1 otmen">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-danger mx-1 bi bi-slash-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708z"/>
                    </svg>
                    Отмена все
                </button>
                <button class="otmen">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-danger mx-1 bi bi-arrow-down-up" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
                    </svg>
                    Вазврад
                </button>
            </div>
        </div>
    </div>
    <div class="hed2">
        <div class="row">
            <div class="dasd1 pl-4">
                <p class="ptegs">
                    Lorem ipsum dolor sit amet
                </p>
            </div>
            <div class="dasd2">
                <p class="ptegs2">
                    № 10 от 07/02/2023
                </p>
            </div>
        </div>
    </div>

    <div class="hed3">
        <div class="row">
            <div class="loiu">
                <p class="ptgty">
                    Клент
                </p>
                <p class="ptgty">
                    Скидка
                </p>
                <p class="ptgty">
                    Покупки
                </p>
            </div>
            <div class="loiu2">
                <p class="ptgtyasdsd">
                    Dadaxon
                </p>
                <input type="text" class="bonnns">
                <span class="bnos">Бонус</span>
                <input type="text" class="derfd">
                <span class="mx-2 bnos">Пося покупки</span>
                <input type="text" class="derfd">
                <br>
                <input type="text" class="ppaku">
                <span class="bnos3">Вазвраты</span>
                <input type="text" class="derfderer">
            </div>
            <div class="loiu4">
                <p class="ptgty">
                    😊 ДОЛГ
                </p>
                <p class="ptgty">
                    Нач сумма
                </p>
                <p class="ptgty">
                    Сниженние
                </p>
            </div>
            <div>
                <input type="text" class="derfderer" value="Расчитаты"> <br>
                <input type="text" class="derfderer"><br>
                <input type="text" class="derfderer">
            </div>
            <div class="pl-3">
                <span class="ptgty">
                    Сумма для <br>
                    расчита скидка
                </span> 
            </div>
            <input type="text" class="derfderer mt-2">
        </div>
    </div>

    <div class="hed4 pl-1">
        <span class="bnos ">Последная чек:</span> 
        <span class="bnos text-danger">К оплата</span>
        <input type="text" class="derfderer">
        <span class="bnos pl-2">Получено</span>
        <input type="text" class="derfderer">
        <span class="bnos pl-2 text-success">Cдача</span>
        <input type="text" class="derfderer">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-printer-fill mx-2" viewBox="0 0 16 16">
            <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z"/>
            <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
          </svg>
        <span class="bnos pl-2">Товары чека</span>
    </div>
    <div class="hed5">
        <table class="tablets">
            <thead>
                <tr>
                    <td>Tovar</td>
                    <td>Shtrix qod</td>
                    <td>Soni</td>
                    <td>Summa</td>
                    <td>Chegirma</td>
                    <td>Itogo</td>
                    <td class="ggt5">Delete</td>
                </tr>
            </thead>
            <tbody>
             
            </tbody>
        </table>
    </div>



    <div class="fotr">
        <span class="bdfsdf pl-2">Прадано артикуя</span>
        <span class="bdfsdf">в количства на сумма</span>
        <span class="bdfsdf">Начислено бонус</span>
        <span class="bdfsdf">Оплачену бонусам</span>
        <br>
        <button class="diseg">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-back" viewBox="0 0 16 16">
                <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z"/>
              </svg>
              <br>
            Оплаты
        </button>
        <button class="diseg">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
                <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
              </svg>
              <br>
            Приняти заказ
        </button>
        <button class="diseg">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-basket-fill" viewBox="0 0 16 16">
                <path d="M5.071 1.243a.5.5 0 0 1 .858.514L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 6h1.717L5.07 1.243zM3.5 10.5a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3z"/>
              </svg>
              <br>
            Видеь заказ
        </button>
        <button class="diseg">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
              </svg>
              <br>
            Видеь касса
        </button>
        <button class="diseg">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>
                <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
                <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"/>
                <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
              </svg>
              <br>
            Инкассация
        </button>
        <button class="diseg">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>
                <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
                <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"/>
                <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
              </svg>
              <br>
            Товарни отчет
        </button>
        <button class="diseg">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>
                <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
                <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"/>
                <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
              </svg>
              <br>
            Отчет о касса
        </button>
        <div class="row">
            <div class="tuggg pl-4 ">
                <span class="bdfsdf555">Jami Summa</span><br>
                <span class="bdfsdf555">Chegirma</span><br>
                <span class="bdfsdf555">Summa Chegirma</span><br>
                <span class="bdfsdf555">Peredoplata</span><br>
            </div>
            <div class="pl-2 tuggg3">
                <span class="bdfsdf555">00.0</span><br>
                <span class="bdfsdf555">00.0</span><br>
                <span class="bdfsdf555">00.0</span><br>
                <span class="bdfsdf555">00.0</span><br>
            </div>
            <div class="tuggg4">
                <p class="text-center parptf">
                    Сумма оплати
                </p>
                <h3 class="text-center sdfd">00.0</h3>
                <input type="checkbox" class="sadasdgfgh"><span class="pl-2">Запрешате количства товар</span>
            </div>
        </div>
    </div>
</div>

</template>

<style>
.hed5{
    box-shadow: 1px -1px;
}
.tablets{
    width: 100%;
    height: 52vh;
}
.tablets thead tr td {
    background-color: #dbdcdd;
    box-shadow: inset -2px -2px;
}
.ditgk td{
    background-color: #eae9ea;
    height: 19px;
    box-shadow: -1px 1px;
}
.tuggg4{
    width: 482px;
    box-shadow: 1px 0px;
}
.parptf{
    background-color: #a3a1a3;
    color: white;
    font-weight: 800;
    font-size: 15px;
}
.sdfd{
    font-weight: 900;
    font-size: 20px;
}


</style>
