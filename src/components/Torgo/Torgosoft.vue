<script>
  import { RouterLink } from 'vue-router'
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
  import readXisFile from "read-excel-file"
  import { saveExcel } from '@progress/kendo-vue-excel-export';
  const auth = JSON.parse(localStorage.getItem('auth'));
  const kurs = JSON.parse(localStorage.getItem('Kurs'));
  const format = new Intl.NumberFormat();
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1;
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  var monh = '';
  if (month < 10) {
    monh = '0' + month;
  } else {
    monh = month;
  }
  export default {
    data() {
        return {
            torgosModel: false,
            showModal: false,
            sana_data: '',
            savdotormod: false,
            showModal: false,
            showModalvaly: false,
            showModalDel: false,
            showModalDalTip: false,
            showModalDelValyuta: false,
            showModaltip: false,
            showModalDelclm: false,
            showModalclm: false,
            showModalyedel: false,
            showModalye: false,
            showModalDelchi: false,
            showModalchiq: false,
            search: '',
            id:'',
            tip:'',
            adress:'',
            name:'',
            ogoh:'',
            soni:'',
            olinish:'',
            sotilish:'',
            sotilish2:'',
            valyuta:'',
            shtrix: '',
            tovarsqlad: '',
            filtip: '',
            filad: '',
            login:'',
            token:'',
            Jamisum: '',
            statustyp: '',
            excel: [],
            kurs: '',
            checke: '',
            drive: '',
            mijozs: 'Имя нет',
            mijozs_name: 'Имя нет',
            naqt: '',
            plastik: '',
            bank: '',
            karz: '',
            srok: '',
            dolgi: 0,
            balanse: 0,
            polnisum: 0,
            ohirgis: 0,
            mijozs_savdo: '',
            chesxbox: '',
            Kamentariya: '',
            Kamentariya2: '',
            ModalOplate: false,
            oknamodzaqaz2: false,
            plkassa: false,
            bir_kunki: false,
            torgosvaly: false,
            torgostip: false,
            torgostclm: false,
            torgostye: false,
            torgostchiq: false,
            toxtatish: false,
            qaytim: '',
            controlkarz: '',
            date:  year + "-" + monh + "-" + day,
            databugun: year + "-" + monh + "-" + day,
            polni: {
              savdo: 0,
              rasxod: 0,
              chiqishqarz: 0,
              kirishqarz: 0,
              foyda1: 0,
              sqlad: 0,
            },
            bir: {
              savdo: 0,
              rasxod: 0,
              kirishqarz: 0,
              foyda1: 0,
            },
            valyutator: {
              id: '',
              name: '',
              summa: '',
            },
            valyutatorvaly: '',
            tiptorgo2: {
              idtip: '',
              nametip: '',
            },
            tiptov: '',
            cltorgosoft: {
              id: '',
              name: '',
              firma: '',
              tel: '',
              telegram: '',
              summa: 0,
              kurs: '',
              valyuta: '',
            },
            Searvh: '',
            yet: {
              id: '',
              name: '',
              summa: 0,
              kurs: '',
              valyuta: '',
            },
            yerkazse: '',
            chiq: {
              id: '',
              qayerga: '',
              sabap: '',
              summa: '',
              kurs: '',
              valyuta: '',
            },
            chiqimse: '',
            arx: {
              id: '',
              name: '',
              soni: '',
              summa: '',
            },
            arxivyid: '',
            arxivsana: '',
            arxivModal: false,
            arxivModaledit: false,
            glavniclick: false
        }
    },
    methods: {
      ...mapMutations([
        'Live_Search_Sotuv_Mut'
      ]),
      ...mapActions([
        'FilterAuthAc',
        'SqladMethodUrlPost',
        'Live_Search_Sqlad',
        'Sotuvga_Olish_Action',
        'Fil_Ac',
        'SqladDB',
        'Update_Ky',
        'Valyuta_Kurs',
        'Delete_Sotuv_Ac',
        'Delet_Stor_act',
        'Oplata_Start_Action',
        'Zaqaz_Olish_Ac',
        'Foyda_Act',
        'Foyda_Act_bugun',
        'OriginalMethodUrlGet',
        'OriginalMethodUrlPost',
        'VariantAct',
        'GetyArxive',
        'UpdateArxivAct'
      ]),
      FilterAuth(){
        this.FilterAuthAc();
      },
      Localstor(){
        this.login = auth.login,
        this.token = auth.token
        this.statustyp = auth.action
      },
      vremya(){
        // setInterval(() => {
        //   this.sana_data = new Date();
        //   // new Date().toLocaleDateString('en-CA'),
        // }, 1000);
      },
      exp(){
          saveExcel({
            data: this.objects3,
            fileName: "Export",
            columns: [
              {field: 'id'},
              {field: 'userId'},
              {field: 'magazinId'},
              {field: 'magazin'},
              {field: 'tip'},
              {field: 'adress'},
              {field: 'name'},
              {field: 'ogoh'},
              {field: 'soni'},
              {field: 'olinish'},
              {field: 'sotilish'},
              {field: 'sotilish2'},
              {field: 'valyuta'},
              {field: 'summa'},
              {field: 'kod'},
            ]
          });
        },
        clik(){
          document.getElementById("archiveExcel").click();
        },
        subirExcel(){
          const input = document.getElementById("archiveExcel");
          readXisFile(input.files[0]).then((rows)=>{
            for (let i = 1; i < rows.length; i++) {
              this.excel.push({
                'userId': rows[i][1],
                'magazinId': rows[i][2],
                'magazin': rows[i][3],
                'tip': rows[i][4],
                'adress': rows[i][5],
                'name': rows[i][6],
                'ogoh': rows[i][7],
                'soni': rows[i][8],
                'olinish': rows[i][9],
                'sotilish': rows[i][10],
                'sotilish2': rows[i][11],
                'valyuta': rows[i][12],
                'summa': rows[i][13],
                'kod': rows[i][14],
              });
            }
            this.SqladMethodUrlPost({
                'method': 'post',
                'url2': 'post_update_sqlad_exsel',
                'url': 'getdb',
                'massivname': this.excel,
                'login': this.login,
                'token': this.token,
                'magazinId': auth.method_id,
                'magazin': auth.method_name,
                'status': this.statustyp,
            });
          });
          this.excel = [];
          input.value = '';
        },
        editsq(item){
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
        CreateSqladtor(){
          if (auth.method_id) {
            this.SqladMethodUrlPost({
              'method': 'post',
              'url2': 'sqlad_post_update',
              'url': 'getdb',
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
        delettip(id, name){
          this.id = id;
          this.name = name,
          this.showModalDel = true;
        },
        SqladDelet(){
          this.SqladMethodUrlPost({
            'method': 'post',
            'url2': 'sqlad_delete',
            'url': 'getdb',
            'id': this.id,
            'login': this.login,
            'token': this.token,
            'magazinId': auth.method_id,
            'magazin': auth.method_name,
            'status': this.statustyp,              
          });
          this.Clears();
        },
        Sqlad(){
          if (auth.method_id) {
            this.Live_Search_Sqlad({
              'method': 'post',
              'url': 'live_search',
              'login': this.login,
              'token': this.token,
              'magazinId': auth.method_id,
              'magazin': auth.method_name,
              'status': this.statustyp,
            });
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
          this.shtrix='';
          this.Jamisum = '',
          this.qaytim = '',
          this.mijozs = 'Имя нет',
          this.CreateSqlad = 'Имя нет',
          this.mijozs_savdo = '',
          this.chesxbox = '',
          this.dolgi = 0,
          this.balanse = 0,
          this.polnisum = 0,
          this.ohirgis = 0;
          this.Kamentariya = '',
          this.Kamentariya2 = '',
          this.showModal = false,
          this.showModalDel = false,
          this.ModalOplate = false,
          this.glavniclick = false;
        },
        updatekeyup(item){
          this.Update_Ky({
            'method': 'post',
            'url': 'update_key',
            'item': item
          });
        },
        updatechangeTip(item){
          this.Update_Ky({
            'method': 'post',
            'url': 'update_key',
            'item': item
          });
        },
        updatechangeAdr(item){
          this.Update_Ky({
            'method': 'post',
            'url': 'update_key',
            'item': item
          });
        },
        updatechangeVal(valy){
          this.Update_Ky({
            'method': 'post',
            'url': 'update_chang_val',
            'item': valy
          });
        },
        obnovit(){
          this.SqladDB({
            'method': 'post',
            'url': 'getdb',
            'login': this.login,
            'token': this.token,
            'magazinId': auth.method_id,
            'magazin': auth.method_name,
            'status': this.statustyp,
          });
        },
      cadasd(){
          if (this.codecler == false) {
            this.search = '';
          } else {
            this.search;           
            this.savdotormod = true;
          }
      },
      toogler(u){
        var id = '';
        var name = '';
        var summa = '';
        if (u === 99999) {
          id = 99999;
          name = '';
          summa = '1';
        } else {
          const data = this.valyudata.find(e => { return e.id == u });
          id = data.id;
          name = data.name;
          summa = data.summa;
        }
        this.Valyuta_Kurs({
          'kursid': id,
          'kurs1': summa,
          'kursname': name,
        });
      },
      toogler2(){
          var kur =JSON.parse(localStorage.getItem('Kurs'));
          if (kur) {
            this.kurs = JSON.parse(localStorage.getItem('Kurs')).uid;
          } else {
            localStorage.setItem('Kurs',  JSON.stringify({'u': 1, 'uid': '99999',  'un': ''}));
            this.kurs = 99999;
          }
        },
        checkedTyp(foo){
          localStorage.setItem('Checked',  JSON.stringify({'chesked': foo}));          
          this.checkedTyp3();
        },
        checkedTyp3(){
          var che = JSON.parse(localStorage.getItem('Checked'));
          if (che) {
            this.checke = che.chesked;
          } else {
            localStorage.setItem('Checked',  JSON.stringify({'chesked': 1}));
            var che2 = JSON.parse(localStorage.getItem('Checked'));
            this.checke = che2.chesked;
          }
        },
      driverpMount(){
          var dri =JSON.parse(localStorage.getItem('Driver'));
          if (dri) {
            this.drive = JSON.parse(localStorage.getItem('Driver')).d;
          } else {
            localStorage.setItem('Driver',  JSON.stringify({'d': 1}));
            this.drive = 1;
          }
        },
        drdrive(d){
          localStorage.setItem('Driver',  JSON.stringify({'d': d}));
          this.driverpMount();
        },
        pdef(){
          console.log("Pdef")
      },
      Deletsotuv(id, jami){
          this.Delete_Sotuv_Ac({
            'i': id,
            'jami': jami
          });
        },
        Deletsotuv1(id){
          this.Delete_Sotuv_Ac({
            'i': id,
          });
        },
      UpdateSotilish(item){
        const local1 = JSON.parse(localStorage.getItem('sotuv'));
        var pris = 0;
        var natija = 0;
        local1.find(e => {
          if (e.id === item.id) {
            pris = e.sotilish_prise * e.soni;
            e.sotilish = item.sotilish;
            e.chegirma = pris - e.soni * e.sotilish;
            natija = pris / 100;
            var ddd = e.chegirma / natija
            var sss = format.format(ddd)
            e.skidka = sss + ' %';
            e.jami = pris - e.chegirma;
          }else{}
        });
        localStorage.setItem('sotuv', JSON.stringify(local1));
        this.Live_Search_Sotuv_Mut();
      },
      UpdateSon(item){
        var pris = 0;
        var natija = 0;
        const local2 = JSON.parse(localStorage.getItem('sotuv'));
        local2.find(e => {
          if (e.id === item.id) {
            if (e.soni2 > item.soni) {
              e.soni = item.soni;
            } else {
              e.soni = e.soni2;
            }
            pris = e.sotilish_prise * e.soni;
            e.sotilish = item.sotilish;
            e.chegirma = pris - e.soni * e.sotilish;
            natija = pris / 100;
            var ddd = e.chegirma / natija
            var sss = format.format(ddd)
            e.skidka = sss + ' %';
            e.jami = pris - e.chegirma;
          }else{}
        });
        localStorage.setItem('sotuv', JSON.stringify(local2));
        this.Live_Search_Sotuv_Mut();
      },
      UpdateChgirma(item){
        var pris = 0;
        var natija = 0;
        const local3 = JSON.parse(localStorage.getItem('sotuv'));
          local3.find(e => {
            if (e.id === item.id) {
              pris = e.sotilish_prise * e.soni;
              e.sotilish = item.sotilish;
              e.chegirma = item.chegirma;
              natija = pris / 100;
              var ddd = e.chegirma / natija
              var sss = format.format(ddd)
              e.skidka = sss + ' %';
              e.jami = pris - e.chegirma;
            }else{}
          });
          localStorage.setItem('sotuv', JSON.stringify(local3));
        this.Live_Search_Sotuv_Mut();
      },
      modalsokna3(typ){
        this.SqladDB({
        'method': 'post',
          'url': 'getdb',
          'login': this.login,
          'token': this.token,
          'magazinId': auth.method_id,
          'magazin': auth.method_name,
          'status': this.statustyp,
        });
        this.torgosModel = typ;
      },
      valyutatorgo(typ){
        this.OriginalMethodUrlGet({
          'method': 'post',
          'url': 'getvalyuta',
          'login': this.login,
          'token': this.token,
          'magazinId': auth.method_id,
          'magazin': auth.method_name,
          'status': this.statustyp,
        });
        this.torgosvaly = typ;
      },
      Sotuvga_Olish(obj){
        var sum = '';
        var olsh = '';
        const kurs2 = JSON.parse(localStorage.getItem('Kurs'));
        if (obj.soni > 0) {
          if (kurs2.uid == 99999) {
            if (obj.summa == '') {
              if (this.checke === 1) {
                sum = obj.sotilish2;
              } else {
                sum = obj.sotilish;
              }
              olsh = obj.olinish;
            } else {
              if (this.checke === 1) {
                sum = obj.sotilish2 * obj.summa;
              } else {
                sum = obj.sotilish * obj.summa;
              }
              olsh = obj.olinish * obj.summa;
            }
          } else {
            if (obj.summa == '') {
              if (this.checke === 1) {
                sum = obj.sotilish2 / kurs2.u;
              } else {
                sum = obj.sotilish / kurs2.u;
              }
              olsh = obj.olinish / kurs2.u;
            } else {
              if (this.checke === 1) {
                sum = obj.sotilish2 * obj.summa / kurs2.u;
              } else {
                sum = obj.sotilish * obj.summa / kurs2.u;
              }
              olsh = obj.olinish * obj.summa / kurs2.u;
            }
          }
          this.Sotuvga_Olish_Action({
            'id': obj.id,
            'name': obj.name,
            'shtrix': obj.kod,
            'olinish': olsh,
            'soni': 1,
            'soni2': obj.soni,
            'chegirma': 0,
            'sotilish': sum,
            'sotilish_prise': sum,
            'skidka': 0 + ' %',
            'jami': sum,
            'summa': obj.summa,
            'valyuta': obj.valyuta,
          });
        } else { }
      },
      deletStor(){
        this.Delet_Stor_act();
      },
      chesx(){
        if (this.chesxbox === 1) {
          this.chesxbox = 0;
        } else {
          this.chesxbox = 1;
        }
      },
      oplate(typ){
        this.ModalOplate = typ;
        if (this.glavniclick) {

        } else {
          this.Jamisum = this.JamiSumma2;
          this.karz = this.JamiSumma2;          
        }
      },
      clentsummafn(row){
        this.karz = this.JamiSumma2;
        this.qaytim = '';
        var kur =JSON.parse(localStorage.getItem('Kurs'));
        if (kur.uid === 99999) {
          var clm = this.MijozSelect.find(e => { if (e.id === row) return e; });
          if (clm) {
            if (clm.valyuta) {
              this.controlkarz = clm.summa * clm.kurs;
              if (this.karz <= this.controlkarz) {
                this.qaytim = this.controlkarz - this.karz;
                this.karz = 0;
              } else {
                this.karz = this.karz - this.controlkarz;
              }
              this.clentsumma = '$ + '+ format.format(clm.summa * clm.kurs);
              this.clentkarz = '$ + ' + format.format(clm.karz * clm.kurs);
            } else {
              this.controlkarz = clm.summa;
              if (this.karz <= this.controlkarz) {
                this.qaytim = this.controlkarz - this.karz;
                this.karz = 0;
              } else {
                this.karz = this.karz - this.controlkarz;
              }
              this.clentsumma = '$ + '+ format.format(clm.summa);
              this.clentkarz = '$ + ' + format.format(clm.karz);
            }
          } else {
            this.clentsumma = '';
            this.clentkarz = '';
          }
        } else {
          var clm = this.MijozSelect.find(e => { if (e.id === row) return e; });
          if (clm) {
            if (clm.valyuta) {
              this.controlkarz = clm.summa * clm.kurs / kur.u;
              if (this.karz <= this.controlkarz) {
                this.qaytim = this.controlkarz - this.karz;
                this.karz = 0;
              } else {
                this.karz = this.karz - this.controlkarz;
              }
              this.clentsumma = '$ + '+ format.format(clm.summa * clm.kurs / kur.u);
              this.clentkarz = '$ + ' + format.format(clm.karz * clm.kurs / kur.u);
            } else {
              this.controlkarz = clm.summa / kur.u;
              if (this.karz <= this.controlkarz) {
                this.qaytim = this.controlkarz - this.karz;
                this.karz = 0;
              } else {
                this.karz = this.karz - this.controlkarz;
              }
              this.clentsumma = '$ + '+ format.format(clm.summa / kur.u);
              this.clentkarz = '$ + ' + format.format(clm.karz / kur.u);
            }
          } else {
            this.clentsumma = '';
            this.clentkarz = '';
          }
        }
      },
      naqt1(valyu){
        this.JamiSum = parseFloat(this.JamiSumma2) - parseFloat(valyu) - this.plastik - this.bank;
        this.karz = this.JamiSum - this.controlkarz;
      },
      plastik1(valyu){
        this.JamiSum = parseFloat(this.JamiSumma2) - parseFloat(valyu) - this.naqt - this.bank;
        this.karz = this.JamiSum - this.controlkarz;
      },
      bank1(valyu){
        this.JamiSum = parseFloat(this.JamiSumma2) - parseFloat(valyu) - this.plastik - this.naqt;
        this.karz = this.JamiSum - this.controlkarz;
      },
      naqinp(){
        this.plastik = '';
        this.bank = '';
        this.karz = 0;
        this.naqt = this.JamiSumma2 - this.controlkarz;
      },
      plasinp(){
        this.naqt = '';
        this.bank = '';
        this.karz = 0;
        this.plastik = this.JamiSumma2 - this.controlkarz;
      },
      bankinp(){
        this.naqt = '';
        this.plastik = '';
        this.karz = 0;
        this.bank = this.JamiSumma2 - this.controlkarz;
      },
      OplataStart(){
        if (auth.method_id) {
          var qarz = '';
          if (this.chesxbox == 1 && this.Kamentariya) {
            this.Oplata_Start_Action({
              'method': 'post',
              'url2': 'karzina',
              'url': 'live_search',
              'name': this.Kamentariya,
              'login': this.login,
              'token': this.token,
              'magazinId': auth.method_id,
              'magazin': auth.method_name,
              'status': this.statustyp,
              'local': JSON.parse(localStorage.getItem('sotuv'))
            }); 
          } else {
            this.Oplata_Start_Action({
              'method': 'post',
              'url2': 'oplata',
              'url': 'live_search',
              'driver': this.drive,
              'jamisum': this.JamiSumma2,
              'mijozId': this.mijozs,
              'naqt': this.naqt,
              'plastik': this.plastik,
              'bank': this.bank,
              'karz': this.karz,
              'qaytim': this.qaytim,
              'srok': this.srok,
              'sana': this.date,
              'vid': kurs.uid,
              'vname': kurs.un,
              'vsumma': kurs.u,
              'login': this.login,
              'token': this.token,
              'magazinId': auth.method_id,
              'magazin': auth.method_name,
              'status': this.statustyp,
              'local': JSON.parse(localStorage.getItem('sotuv'))
            });              
          }
          this.Clears();
        } else {}
      },
      otkrit_zaqaz(typ){
          this.oknamodzaqaz2 = typ;
      },
      olish(item){
        this.Zaqaz_Olish_Ac({
          'method': 'post',
          'url': 'zaqaz_delet',
          'id': item.id,
        });
        this.oknamodzaqaz2 = false;
      },
      mijozs_torgso(obj){
        this.glavniclick = true;
        this.dolgi = 0;
        this.balanse = 0;
        this.ohirgis = 0;
        this.mijozs_savdo = 0;
        this.polnisum = 0;
        const result =  this.MijozSelect.find(e => { if (e.id == obj) return e; });
        if (result) {
            var mijozm = this.objectauth2.savdo.filter((item) => { if (item.mijozId == result.id) return item;});
            var so = mijozm.length - 1;
            for (let i = 0; i < mijozm.length; i++) {
              this.polnisum += parseFloat(mijozm[i].jamisumma)            
            }
            for (let i = so; i < mijozm.length; i++) {
              this.ohirgis += parseFloat(mijozm[i].jamisumma)            
            }
            this.mijozs_name = result.name;
            this.dolgi = result.karz;
            this.balanse = result.summa;
            this.mijozs_savdo = mijozm.length;        
        } else {
            this.mijozs_name = 'Имя нет';
            this.dolgi = 0;
            this.balanse = 0;
            this.ohirgis = 0;
            this.mijozs_savdo = 0;  
        }
       this.clentsummafn(obj)
      },
      exportExcel () {
        saveExcel({
          data: JSON.parse(localStorage.getItem('sotuv')),
          fileName: "Export",
          columns: [
            {field: 'id'},
            {field: 'name'},
            {field: 'shtrix'},
            {field: 'olinish'},
            {field: 'soni'},
            {field: 'soni2'},
            {field: 'chegirma'},
            {field: 'sotilish'},
            {field: 'sotilish_prise'},
            {field: 'skidka'},
            {field: 'jami'},
            {field: 'summa'},
            {field: 'valyuta'}
            ]
          });
      },
      polni_ochchot(){
        this.chaqirish();
        this.Foyda_Act({
          'method': 'post',
          'url': 'foyda_post',
          'login': this.login,
          'token': this.token,
          'magazinId': auth.method_id,
          'status': this.statustyp,
        });
        this.plkassa = true;
      },
      chaqirish(){
        setInterval(() => {
          this.polni.savdo = format.format(this.foyda.savdo);
          this.polni.rasxod = format.format(this.foyda.rasxod);
          this.polni.chiqishqarz = format.format(this.foyda.chiqishqarz);
          this.polni.kirishqarz = format.format(this.foyda.kirishqarz);
          this.polni.foyda1 = format.format(this.foyda.foyda);
          this.polni.sqlad = format.format(this.foyda.sqlad);              
        }, 1000);
      },
      birgunlik(){
        this.chaqirish2();
        this.Foyda_Act_bugun({
          'method': 'post',
          'url': 'foyda_post_bugun',
          'login': this.login,
          'token': this.token,
          'date': this.databugun,
          'magazinId': auth.method_id,
          'status': this.statustyp,
        });
        this.bir_kunki = true;
      },
      chaqirish2(){
        setInterval(() => {
          this.bir.savdo = format.format(this.nbir.savdo);
          this.bir.rasxod = format.format(this.nbir.rasxod);
          this.bir.kirishqarz = format.format(this.nbir.kirishqarz);
          this.bir.foyda1 = format.format(this.nbir.foyda);             
        }, 1000);
      },
      CreateValyuta(){
        if (auth.method_id) {
          this.OriginalMethodUrlPost({
            'method': 'post',
            'url2': 'post_update_valyuta',
            'url': 'getvalyuta',
            'id': this.valyutator.id,
            'name': this.valyutator.name,
            'summa': this.valyutator.summa,
            'login': this.login,
            'token': this.token,
            'magazinId': auth.method_id,
            'magazin': auth.method_name,
            'status': this.statustyp,
          });
          this.valyutator.id = '';
          this.valyutator.name = '';
          this.valyutator.summa = '';
          this.showModalvaly = false;
        } else {
          
        }
      },
      expvalyuta(){
        saveExcel({
          data: this.Itemobjects,
          fileName: "Export",
          columns: [
            {field: 'id'},
            {field: 'userId'},
            {field: 'magazinId'},
            {field: 'magazin'},
            {field: 'name'},
            {field: 'summa'},
          ]
        });
      },
      clikvalyuta(){
        document.getElementById("archiveExcel").click();
      },
      subirExcelvalyuta(){
        const input = document.getElementById("archiveExcel");
        readXisFile(input.files[0]).then((rows)=>{
          for (let i = 1; i < rows.length; i++) {
            this.excel.push({
              'userId': rows[i][1],
              'magazinId': rows[i][2],
              'magazin': rows[i][3],
              'name': rows[i][4],
              'summa': rows[i][5]
            });                
          }
          this.OriginalMethodUrlPost({
              'method': 'post',
              'url2': 'post_update_exsel',
              'url': 'getvalyuta',
              'massivname': this.excel,
              'login': this.login,
              'token': this.token,
              'magazinId': auth.method_id,
              'magazin': auth.method_name,
              'status': this.statustyp,
          });
        });
        this.excel = [];
        input.value = '';
      },
      editvalyu(item){
          this.valyutator.id = item.id;
          this.valyutator.name = item.name;
          this.valyutator.summa = item.summa;
          this.showModalvaly = true;
        },
      deletvalyu(id, name){
        this.valyutator.id = id;
        this.valyutator.name = name,
        this.showModalDelValyuta = true;
      },
      ValyutaDeletTorgo(){
        this.OriginalMethodUrlPost({
          'method': 'post',
          'url2': 'valyuta_delete',
          'url': 'getvalyuta',
          'id': this.valyutator.id,
          'login': this.login,
          'token': this.token,
          'magazinId': auth.method_id,
          'magazin': auth.method_name,
          'status': this.statustyp,
        });
        this.valyutator.id = '';
        this.valyutator.name = '';
        this.showModalDelValyuta = false;
      },
      torgotip(){
        this.OriginalMethodUrlGet({
          'method': 'post',
          'url': 'gettip',
          'login': this.login,
          'token': this.token,
          'magazinId': auth.method_id,
          'magazin': auth.method_name,
          'status': this.statustyp,
        });
        this.torgostip = true;
      },
      CreateTip(){
        if (auth.method_id) {
          this.OriginalMethodUrlPost({
            'method': 'post',
            'url2': 'post_update',
            'url': 'gettip',
            'id': this.tiptorgo2.idtip,
            'name': this.tiptorgo2.nametip,
            'login': this.login,
            'token': this.token,
            'status': this.statustyp,
            'magazinId': auth.method_id,
            'magazin': auth.method_name,
          });
          this.tiptorgo2.idtip = '';
          this.tiptorgo2.nametip = '';
          this.showModaltip = false;
        } else {}
      },
      edittip(item){
        this.tiptorgo2.idtip = item.id;
        this.tiptorgo2.nametip = item.name;
        this.showModaltip = true;
      },
      delettiptip(id, name){
        this.tiptorgo2.idtip = id;
        this.tiptorgo2.nametip = name;
        this.showModalDalTip = true;
      },
      TipsDelet(){
        this.OriginalMethodUrlPost({
          'method': 'post',
          'url2': 'tipsdelete',
          'url': 'gettip',
          'id': this.tiptorgo2.idtip,
          'login': this.login,
          'token': this.token,
          'magazinId': auth.method_id,
          'magazin': auth.method_name,
          'status': this.statustyp,
        });
        this.tiptorgo2.idtip = '';
        this.tiptorgo2.nametip = '';
        this.showModalDalTip = false;
      },
      exptip(){
        saveExcel({
          data: this.Itemobjects,
          fileName: "Export",
          columns: [
            {field: 'id'},
            {field: 'userId'},
            {field: 'magazinId'},
            {field: 'magazin'},
            {field: 'name'},
          ]
        });
      },
      cliktip(){
        document.getElementById("archiveExcel").click();
      },
      subirExceltip(){
        const input = document.getElementById("archiveExcel");
        readXisFile(input.files[0]).then((rows)=>{
          for (let i = 1; i < rows.length; i++) {
            this.excel.push({
              'userId': rows[i][1],
              'magazinId': rows[i][2],
              'magazin': rows[i][3],
              'name': rows[i][4],
            });                
          }
          this.OriginalMethodUrlPost({
              'method': 'post',
              'url2': 'post_tip_exsel',
              'url': 'gettip',
              'massivname': this.excel,
              'login': this.login,
              'token': this.token,
              'status': this.statustyp,
              'magazinId': auth.method_id,
              'magazin': auth.method_name,
          });
        });
        this.excel = [];
        input.value = '';
      },
      deletmij(id, name){
        this.cltorgosoft.id = id,
        this.cltorgosoft.name = name,
        this.showModalDelclm = true
      },
      expclm(){
        saveExcel({
          data: this.Itemobjects,
          fileName: "Export",
          columns: [
            {field: 'id'},
            {field: 'userId'},
            {field: 'magazinId'},
            {field: 'magazin'},
            {field: 'name'},
            {field: 'firma'},
            {field: 'tel'},
            {field: 'telegram'},
            {field: 'karz'},
            {field: 'summa'},
            {field: 'kurs'},
            {field: 'valyuta'},
          ]
        });
      },
      clikclm(){
        document.getElementById("archiveExcel").click();
      },
      subirExcelclm(){
        const input = document.getElementById("archiveExcel");
        readXisFile(input.files[0]).then((rows)=>{
          for (let i = 1; i < rows.length; i++) {
            this.excel.push({
              'userId': rows[i][1],
              'magazinId': rows[i][2],
              'magazin': rows[i][3],
              'name': rows[i][4],
              'firma': rows[i][5],
              'tel': rows[i][6],
              'telegram': rows[i][7],
              'karz': rows[i][8],
              'summa': rows[i][9],
              'kurs': rows[i][10],
              'valyuta': rows[i][11],
            });                
          }
          this.OriginalMethodUrlPost({
              'method': 'post',
              'url2': 'post_update_mijoz_exsel',
              'url': 'mijozget',
              'massivname': this.excel,
              'login': this.login,
              'token': this.token,
              'magazinId': auth.method_id,
              'magazin': auth.method_name,
              'status': this.statustyp,
          });
        });
        this.excel = [];
        input.value = '';
      },
      UserDeletclm(){
        this.OriginalMethodUrlPost({
          'method': 'post',
          'url2': 'mijozdelete',
          'url': 'mijozget',
          'id': this.cltorgosoft.id,
          'login': this.login,
          'token': this.token,
          'magazinId': auth.method_id,
          'magazin': auth.method_name,
          'status': this.statustyp,
        });
        this.showModalDelclm = false;
      },
      SaveUserclm(){
        if (auth.method_id) {
          this.OriginalMethodUrlPost({
            'method': 'post',
            'url2': 'mijozcreate',
            'url': 'mijozget',
            'id': this.cltorgosoft.id,
            'login': this.login,
            'token': this.token,
            'magazinId': auth.method_id,
            'magazin': auth.method_name,
            'status': this.statustyp,
            'name': this.cltorgosoft.name,
            'firma': this.cltorgosoft.firma,
            'tel': this.cltorgosoft.tel,
            'telegram': this.cltorgosoft.telegram,
            'summa': this.cltorgosoft.summa,
            'kurs': this.cltorgosoft.kurs,
            'valyuta': this.cltorgosoft.valyuta,
          });
          this.cltorgosoft.id = '',
          this.cltorgosoft.name = '',
          this.cltorgosoft.firma = '',
          this.cltorgosoft.tel = '',
          this.cltorgosoft.telegram = ''
          this.cltorgosoft.summa = '',
          this.cltorgosoft.kurs = '',
          this.cltorgosoft.valyuta = '',
          this.showModalclm = false
        } else {
          
        }
      },
      OriginalGetclm(){
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (auth.method_id) {
          this.OriginalMethodUrlGet({
            'method': 'post',
            'url': 'mijozget',
            'login': this.login,
            'token': this.token,
            'magazinId': auth.method_id,
            'magazin': auth.method_name,
            'status': this.statustyp,
          });
          this.torgostclm = true;
        }else{}
      },
      editmijclm(item){
        this.cltorgosoft.id = item.id,
        this.cltorgosoft.name = item.name,
        this.cltorgosoft.firma = item.firma,
        this.cltorgosoft.tel = item.tel,
        this.cltorgosoft.telegram = item.telegram
        this.cltorgosoft.summa = item.summa,
        this.cltorgosoft.kurs = item.kurs,
        this.cltorgosoft.valyuta = item.valyuta,
        this.showModalclm = true
      },
      valyu_kurs_us(resu){
        if (resu) {
          const val = this.valyudata.find(e => { if (e.name == resu) return e; });
          this.cltorgosoft.kurs = val.summa;
          this.cltorgosoft.valyuta = val.name;          
        } else {
          this.cltorgosoft.kurs = '';
          this.cltorgosoft.valyuta = ''; 
        }
      },
      valyu_kurs_pas(resu){
        if (resu) {
          const val = this.valyudata.find(e => { if (e.name == resu) return e; });
          this.yet.kurs = val.summa;
          this.yet.valyuta = val.name;          
        } else {
          this.yet.kurs = '';
          this.yet.valyuta = ''; 
        }
      },

      expye(){
        saveExcel({
          data: this.Itemobjects,
          fileName: "Export",
          columns: [
            {field: 'id'},
            {field: 'userId'},
            {field: 'magazinId'},
            {field: 'magazin'},
            {field: 'name'},
            {field: 'summa'},
            {field: 'kurs'},
            {field: 'valyuta'},                
          ]
        });
      },
      clikye(){
        document.getElementById("archiveExcel").click();
      },
      subirExcelye(){
        const input = document.getElementById("archiveExcel");
        readXisFile(input.files[0]).then((rows)=>{
          for (let i = 1; i < rows.length; i++) {
            this.excel.push({
              'userId': rows[i][1],
              'magazinId': rows[i][2],
              'magazin': rows[i][3],
              'name': rows[i][4],
              'summa': rows[i][5],
              'kurs': rows[i][6],
              'valyuta': rows[i][7],
            });                
          }
          this.OriginalMethodUrlPost({
              'method': 'post',
              'url2': 'post_update_yetkaz_exsel',
              'url': 'getyetkaz',
              'massivname': this.excel,
              'login': this.login,
              'token': this.token,
              'magazinId': auth.method_id,
              'magazin': auth.method_name,
              'status': this.statustyp,
          });
        });
        this.excel = [];
        input.value = '';
      },
      CreateYetkazuvchi(){
        if (auth.method_id) {
          this.OriginalMethodUrlPost({
            'method': 'post',
            'url2': 'post_update_yetkaz',
            'url': 'getyetkaz',
            'id': this.yet.id,
            'name': this.yet.name,
            'summa': this.yet.summa,
            'kurs': this.yet.kurs,
            'valyuta': this.yet.valyuta,
            'login': this.login,
            'token': this.token,
            'magazinId': auth.method_id,
            'magazin': auth.method_name,
            'status': this.statustyp,
          });
          this.yet.id = '';
          this.yet.name = '';
          this.yet.summa = '';
          this.yet.kurs = '';
          this.yet.valyuta = '';
          this.showModalye = false;
        } else {
          
        }
      },
      editye(resu){
        this.yet.id = resu.id;
        this.yet.name = resu.name;
        this.yet.summa = resu.summa;
        this.yet.kurs = resu.kurs;
        this.yet.valyuta = resu.valyuta;            
        this.showModalye = true;
      },
      getyed(){
        if (auth.method_id) {
          this.OriginalMethodUrlGet({
            'method': 'post',
            'url': 'getyetkaz',
            'login': this.login,
            'token': this.token,
            'magazinId': auth.method_id,
            'magazin': auth.method_name,
            'status': this.statustyp,
          });
          this.torgostye = true;
        } else {}
      },
      deletye(id, name){
        this.yet.id = id;
        this.yet.name = name,
        this.showModalyedel = true;
      },
      YetkazDelet(){
        this.OriginalMethodUrlPost({
          'method': 'post',
          'url2': 'yetkaz_delete',
          'url': 'getyetkaz',
          'id': this.yet.id,
          'login': this.login,
          'token': this.token,
          'magazinId': auth.method_id,
          'magazin': auth.method_name,
          'status': this.statustyp,
        });
        this.yet.id = '';
        this.showModalyedel = false;
      },
      expchiq(){
        saveExcel({
          data: this.Itemobjects,
          fileName: "Export",
          columns: [
            {field: 'id'},
            {field: 'userId'},
            {field: 'magazinId'},
            {field: 'magazin'},
            {field: 'qayerga'},
            {field: 'sabap'},
            {field: 'summa'},
            {field: 'kurs'},
            {field: 'valyuta'},
          ]
        });
      },
      clikchiq(){
        document.getElementById("archiveExcel").click();
      },
      subirExcelchiq(){
        const input = document.getElementById("archiveExcel");
        readXisFile(input.files[0]).then((rows)=>{
          for (let i = 1; i < rows.length; i++) {
            this.excel.push({
              'userId': rows[i][1],
              'magazinId': rows[i][2],
              'magazin': rows[i][3],
              'qayerga': rows[i][4],
              'sabap': rows[i][5],
              'summa': rows[i][6],
              'kurs': rows[i][7],
              'valyuta': rows[i][8],
            });
          }
          this.OriginalMethodUrlPost({
            'method': 'post',
            'url2': 'post_update_chiqim_exsel',
            'url': 'chiqim_get',
            'massivname': this.excel,
            'login': this.login,
            'token': this.token,
            'magazinId': auth.method_id,
            'magazin': auth.method_name,
            'status': this.statustyp,
          });
        });
        this.excel = [];
        input.value = '';
      },
      CreateChiqim(){
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (auth.method_id) {
          this.OriginalMethodUrlPost({
            'method': 'post',
            'url2': 'chiqim_post_update',
            'url': 'chiqim_get',
            'id': this.chiq.id,
            'qayerga': this.chiq.qayerga,
            'sabap': this.chiq.sabap,
            'summa': this.chiq.summa,
            'kurs': this.chiq.kurs,
            'valyuta': this.chiq.valyuta,
            'login': this.login,
            'token': this.token,
            'magazinId': auth.method_id,
            'magazin': auth.method_name,
            'status': this.statustyp,
          });
          this.chiq.id = '';
          this.chiq.qayerga = '';
          this.chiq.sabap = '';
          this.chiq.summa = '';
          this.chiq.kurs = '',
          this.chiq.valyuta = '',
          this.showModalchiq = false;
        }else{}
      },
      ChiqimDelet(){
        this.OriginalMethodUrlPost({
          'method': 'post',
          'url2': 'chiqim_delet',
          'url': 'chiqim_get',
          'id': this.chiq.id,
          'login': this.login,
          'token': this.token,
          'magazinId': auth.method_id,
          'magazin': auth.method_name,
          'status': this.statustyp,
        });
        this.chiq.id = '';
        this.showModalDelchi = false;
      },
      getMethod(){
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (auth.method_id) {
          this.OriginalMethodUrlGet({
            'method': 'post',
            'url': 'chiqim_get',
            'login': this.login,
            'token': this.token,
            'magazinId': auth.method_id,
            'magazin': auth.method_name,
            'status': this.statustyp,
          });
          this.torgostchiq = true;
        }else{}
      },
      editchiqim(resu){
        this.chiq.id = resu.id;
        this.chiq.qayerga = resu.qayerga;
        this.chiq.sabap = resu.sabap;
        this.chiq.summa = resu.summa;
        this.chiq.kurs = resu.kurs,
        this.chiq.valyuta = resu.valyuta,
        this.showModalchiq = true;
      },
      deletchiqim(id){
        this.chiq.id = id;
        this.showModalDelchi = true;
      },
      valyu_kurs_chiq(resu){
        if (resu) {
          const val = this.valyudata.find(e => { if (e.name == resu) return e; });
          this.chiq.kurs = val.summa;
          this.chiq.valyuta = val.name;          
        } else {
          this.chiq.kurs = '';
          this.chiq.valyuta = ''; 
        }
      },
      valpush(item){
        this.tip = item.name;
        this.toxtatish = false;
      },
      tipkey(row){
        const auth = JSON.parse(localStorage.getItem('auth'));
          if (auth.method_id) {
          this.VariantAct({
            'method': 'post',
            'url': 'variant',
            'tip': row,
            'login': this.login,
            'token': this.token,
            'magazinId': auth.method_id,
            'magazin': auth.method_name,
            'status': this.statustyp,
          });
          this.toxtatish = true;
        }else{}
      },
      arxiv(id){
        this.arxivsana = '';
        this.arxivyid = id;
        this.GetyArxive({
          'method': 'post',
          'url': 'getyarxive',
          'yetkazuvchiId': this.arxivyid,
          'login': this.login,
          'token': this.token,
          'magazinId': auth.method_id,
          'magazin': auth.method_name,
          'status': this.statustyp,
        });
        this.arxivModal = true;
      },
      arxivdate(date){
        this.GetyArxive({
          'method': 'post',
          'url': 'getyarxive',
          'yetkazuvchiId': this.arxivyid,
          'sana': date,
          'login': this.login,
          'token': this.token,
          'magazinId': auth.method_id,
          'magazin': auth.method_name,
          'status': this.statustyp,
        });
      },
      editarxiv(item){
        this.arx.id = item.id;
        this.arx.name = item.name;
        this.arx.soni = item.soni;
        this.arx.summa = item.summa;
        this.arxivModaledit = true;
      },
      UpdateArxiv(){
        this.UpdateArxivAct({
          'method': 'post',
          'url': 'update_arxive',
          'id': this.arx.id,
          'soni': this.arx.soni,
          'summa': this.arx.summa,
          'yetkazuvchiId': this.arxivyid,
          'login': this.login,
          'token': this.token,
          'magazinId': auth.method_id,
          'magazin': auth.method_name,
          'status': this.statustyp,
        });
        this.arx.id = '';
        this.arx.name = '';
        this.arx.soni = '';
        this.arx.summa = '';
        this.arxivModaledit = false;
      }
    },
    watch: {
      tovarsqlad(row){
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (auth.method_id) {
          this.SqladDB({
            'method': 'post',
            'url': 'getdb',
            'search': row,
            'login': this.login,
            'token': this.token,
            'magazinId': auth.method_id,
            'magazin': auth.method_name,
            'status': this.statustyp,
          });
        }else{}
      },
      search(row){
        if (auth.method_id) {
          this.Live_Search_Sqlad({
            'method': 'post',
            'url': 'live_search',
            'search': row,
            'login': this.login,
            'token': this.token,
            'status': this.statustyp,
            'magazinId': auth.method_id,
            'magazin': auth.method_name,
          });
          this.cadasd();
        }else {}
      },
      Kamentariya(r){
        if (r) {
          this.Kamentariya2 = 1;
        } else {
          this.Kamentariya2 = 0;
        }
      },
      filtip(){
        const auth = JSON.parse(localStorage.getItem('auth'));
          if (auth.method_id) {
            this.Fil_Ac({
              'method': 'post',
              'url': 'filt',
              'resul': this.filtip,
              'typ': 1,
              'login': this.login,
              'token': this.token,
              'magazinId': auth.method_id,
              'magazin': auth.method_name,
              'status': this.statustyp,
            });
          } else {}
      },
      filad(){
        const auth = JSON.parse(localStorage.getItem('auth'));
          if (auth.method_id) {
          this.Fil_Ac({
            'method': 'post',
            'url': 'filt',
            'resul': this.filad,
            'typ': 2,
            'login': this.login,
            'token': this.token,
            'magazinId': auth.method_id,
            'magazin': auth.method_name,
            'status': this.statustyp,
          });
        }else{}
      },
      valyutatorvaly(row){
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (auth.method_id) {
          this.OriginalMethodUrlGet({
            'method': 'post',
            'url': 'getvalyuta',
            'search': row,
            'login': this.login,
            'token': this.token,
            'magazinId': auth.method_id,
            'magazin': auth.method_name,
            'status': this.statustyp,
          });
        }else{}
      },
      tiptov(row){
        const auth = JSON.parse(localStorage.getItem('auth'));
          if (auth.method_id) {
          this.OriginalMethodUrlGet({
            'method': 'post',
            'url': 'gettip',
            'search': row,
            'login': this.login,
            'token': this.token,
            'magazinId': auth.method_id,
            'magazin': auth.method_name,
            'status': this.statustyp,
          });
        } else {}
      },
      Searvh(row){
        this.OriginalMethodUrlGet({
          'method': 'post',
          'url': 'mijozget',
          'search': row,
          'login': this.login,
          'token': this.token,
          'magazinId': auth.method_id,
          'magazin': auth.method_name,
          'status': this.statustyp,
        });
      },
      yerkazse(row){
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (auth.method_id) {
          this.OriginalMethodUrlGet({
            'method': 'post',
            'url': 'getyetkaz',
            'search': row,
            'login': this.login,
            'token': this.token,
            'magazinId': auth.method_id,
            'magazin': auth.method_name,
            'status': this.statustyp,
          });
        }else{}
      },
      chiqimse(row){
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (auth.method_id) {
          this.OriginalMethodUrlGet({
            'method': 'post',
            'url': 'chiqim_get',
            'search': row,
            'login': this.login,
            'token': this.token,
            'magazinId': auth.method_id,
            'magazin': auth.method_name,
            'status': this.statustyp,
          });
        }else{}
      }
    },
    computed: {
      ...mapGetters({
        objects3: 'objects3',
        tipdata: 'tipdata',
        adressdata: 'adressdata',
        valyudata: 'valyudata',
        itogaTorgo: 'itogaTorgo',
        Items: 'Items',
        tog: 'tog',
        codecler: 'code',
        Sotish: 'Sotish',
        JamiSumma: 'JamiSumma',
        JamiSumma2: 'JamiSumma2',
        JamiSummaTorgo: 'JamiSummaTorgo',
        MijozSelect: 'MijozSelect',
        objectauth2: 'objectauth2',
        savdoobj: 'savdoobj',
        foyda: 'foyda',
        nbir: 'nbir',
        Itemobjects: 'Itemobjects',
        arxive: 'arxive',
      }),
    },
    mounted() {
      this.FilterAuth();
      this.Localstor();
      this.vremya();
      this.Sqlad();
      this.toogler2();
      this.driverpMount();
      this.checkedTyp3();
    }
}
</script>

<template>

<div class="aaaaa1">
    <div class="hed1">
        <div class="row">
            <div class="col-9 pl-4">
                <input type="checkbox" class="chhhhh"><span class="bkapt mx-2"> BK / Apt</span> 
                <input type="text" class="inps1" v-model="search">
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
                <button class="otmen" v-on:click="Deletsotuv1(0)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-danger mx-1 bi bi-slash-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708z"/>
                    </svg>
                    Отмена
                </button>
                <button class="mx-1 otmen" v-on:click="deletStor">
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
                  <select class="klent_to text-center" v-on:change="mijozs_torgso(mijozs)" v-model="mijozs">
                    <option value="Имя нет">--Выберите--</option>
                    <option v-for="itema in MijozSelect" :value="itema.id">{{ itema.name }}</option>
                  </select>
                </p>
            </div>
            <div class="dasd2">
                <p class="ptegs2">
                   {{ sana_data }}
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
                    {{ mijozs_name }}
                </p>
                <input type="text" disabled class="bonnns" v-model="JamiSummaTorgo.skidka">
                <span class="bnos">Бонус</span>
                <input type="text" disabled class="derfd text-center" value="0">
                <span class="mx-2 bnos">Баланс</span>
                <input type="text" disabled class="derfd text-center text-success" v-model="balanse">
                <br>
                <input type="text" disabled class="ppaku text-center" v-model="mijozs_savdo">
                <span class="bnos3">Вазвраты</span>
                <input type="text" disabled class="derfderer text-center" value="0">
            </div>
            <div class="loiu4">
                <p class="ptgty">
                    😊 ДОЛГ
                </p>
                <p class="ptgty">
                  Полни сумма
                </p>
                <p class="ptgty">
                    Сниженние
                </p>
            </div>
            <div>
                <input type="text" disabled class="derfderer text-center text-danger" v-model="dolgi"> <br>
                <input type="text" disabled class="derfderer text-center" v-model="polnisum"><br>
                <input type="text" disabled class="derfderer text-center" v-model="JamiSummaTorgo.coun">
            </div>
            <div class="pl-3">
                <span class="ptgty">
                  Выберите Валюта
                  <select class="text-center derfderer" v-on:change="toogler(kurs)" v-model="kurs">
                    <option :value="99999">--Tanlang--</option>
                    <option v-for="iteme in valyudata" :value="iteme.id">{{ iteme.name }}</option>
                  </select>
                </span>
                <br>
                <span class="ptgty mx-2">
                 Выберите сумму
                  <select class="text-center derfderer" v-on:change="checkedTyp(checke)" v-model="checke">
                    <option :value="1">Отивий</option>
                    <option :value="2">Рознишни</option>
                  </select>
                </span>
                <br>
                <span class="ptgty">
                  Выберите Дривер
                  <select class="text-center derfderer" v-on:change="drdrive(drive)" v-model="drive">
                    <option :value="1">XP-80</option>
                    <option :value="2">XP-58</option>
                  </select>
                </span>
            </div>
        </div>
    </div>

    <div class="hed4 pl-1">
        <span class="bnos ">Последная чек:</span> 
        <span class="bnos text-danger">К оплата</span>
        <input type="text" disabled class="derfderer text-center" v-model="ohirgis">
        <span class="bnos pl-2">Получено</span>
        <input type="text" disabled class="derfderer text-center" v-model="mijozs_savdo">
        <span class="bnos pl-2 text-success">Cдача</span>
        <input type="text" disabled class="derfderer text-center" v-model="JamiSummaTorgo.chegir">
        <button v-if="tog" class="btn btn-success pl-2 pr-2 pt-0 pb-0 mx-2" v-on:click="exportExcel" type="button">Excel</button>
        <button v-else class="btn btn-dark pl-2 pr-2 pt-0 pb-0 mx-2" type="button">Excel</button>
        <span v-if="tog" onclick="createpdf('myDiv')" class="cursor-pointer text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-printer-fill" viewBox="0 0 16 16">
            <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z"/>
            <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
          </svg>
          <span class="bnos pl-1">Товары Принт</span>
        </span>
        <span v-else>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-printer-fill" viewBox="0 0 16 16">
            <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z"/>
            <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
          </svg>
          <span class="bnos pl-1">Товары Принт</span>
        </span>
        
    </div>
    <div class="hed5">
      <div class="table-responsive">
        <div class="scroltab_sotuv">
        <table class="tabl tablets">
            <thead>
                <tr>
                    <td>Товар</td>
                    <td>Штрих код</td>
                    <td>Количество</td>
                    <td>Цена прайсу</td>
                    <td>Цена</td>
                    <td>Вид скидки</td>
                    <td>% Скидки</td>
                    <td>Итого</td>
                    <td class="ggt5">
                      <button class="btn btn-danger pl-2 pr-2 pt-1 pb-1" v-on:click="deletStor">
                        Удалить
                      </button> 
                    </td>
                </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in Sotish" :key="item.id" class="tir">
                <td>
                  <input type="text" class="keyinp_sontor" v-model="item.name" disabled>
                </td>
                <td>
                  <input type="text" class="keyinp_sontor" v-model="item.shtrix" disabled>
                </td>
                <td>
                  <input type="number" class="keyinp_sontor" v-on:keyup="UpdateSon(item)" v-model="item.soni">
                </td>
                <td>
                  <input type="text" class="keyinp_sontor" v-model="item.sotilish_prise" disabled>
                </td>
                <td>
                  <input type="text" class="keyinp_sontor" v-on:keyup="UpdateSotilish(item)" v-model="item.sotilish">
                </td>
                <td>
                  <input type="text" class="keyinp_sontor" v-on:keyup="UpdateChgirma(item)" v-model="item.chegirma">
                </td>
                <td>
                  <input type="text" class="keyinp_sontor" v-model="item.skidka" disabled>
                </td>
                <td>
                  <input type="text" class="keyinp_sontor" v-model="item.jami" disabled>
                </td>
                <td>
                  <a class="text-danger" v-on:click="Deletsotuv(index, item.jami)">
                    <i class="nav-icon i-Close-Window font-weight-bold"></i>
                  </a>
                </td>
              </tr>
            </tbody>
        </table>
      </div>
    </div>
  </div>

    <div class="fotr">
        <span class="bdfsdf pl-2">Прадано артикуя</span>
        <span class="bdfsdf">в количства на сумма</span>
        <span class="bdfsdf">Начислено бонус</span>
        <span class="bdfsdf">Оплачену бонусам</span>
        <br>
        <button v-if="tog" class="diseg2" v-on:click="oplate(true)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-back" viewBox="0 0 16 16">
                <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z"/>
              </svg>
              <br>
            Оплаты
            <div class="suari"></div>
        </button>
        <button v-else class="diseg">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-back" viewBox="0 0 16 16">
              <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z"/>
            </svg>
            <br>
            Оплаты
            <div class="suari"></div>
        </button>
        <button v-if="objectauth2.zaqaz.length >= 1" class="diseg3" v-on:click="otkrit_zaqaz(true)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
                <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
              </svg>
              <br>          
          Приняти заказ
        <div class="suari"></div>
        </button>
        <button v-else class="diseg">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
              <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            <br>
          Приняти заказ
      <div class="suari"></div>
        </button>
      <button class="diseg" v-on:click="valyutatorgo(true)">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-basket-fill" viewBox="0 0 16 16">
            <path d="M5.071 1.243a.5.5 0 0 1 .858.514L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 6h1.717L5.07 1.243zM3.5 10.5a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3z"/>
          </svg>
          <br>
          Валюта
    <div class="suari"></div>
        </button>
        <button class="diseg" v-on:click="modalsokna3(true)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-basket-fill" viewBox="0 0 16 16">
                <path d="M5.071 1.243a.5.5 0 0 1 .858.514L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 6h1.717L5.07 1.243zM3.5 10.5a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3z"/>
              </svg>
              <br>
              Склад
        <div class="suari"></div>
            </button>
        <button class="diseg" v-on:click="OriginalGetclm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
            </svg>
            <br>
            Слент
        <div class="suari"></div>
          </button>
        <button class="diseg" v-on:click="torgotip">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder-symlink-fill" viewBox="0 0 16 16">
            <path d="M13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2l.04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3zM2.19 3c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672a1 1 0 0 1 .707.293L7.586 3H2.19zm9.608 5.271-3.182 1.97c-.27.166-.616-.036-.616-.372V9.1s-2.571-.3-4 2.4c.571-4.8 3.143-4.8 4-4.8v-.769c0-.336.346-.538.616-.371l3.182 1.969c.27.166.27.576 0 .742z"/>
          </svg>
          <br>
          Тип
        <div class="suari"></div>
        </button>
        <button class="diseg" v-on:click="getyed">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder-symlink-fill" viewBox="0 0 16 16">
            <path d="M13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2l.04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3zM2.19 3c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672a1 1 0 0 1 .707.293L7.586 3H2.19zm9.608 5.271-3.182 1.97c-.27.166-.616-.036-.616-.372V9.1s-2.571-.3-4 2.4c.571-4.8 3.143-4.8 4-4.8v-.769c0-.336.346-.538.616-.371l3.182 1.969c.27.166.27.576 0 .742z"/>
          </svg>
          <br>
          Доставщик
        <div class="suari"></div>
        </button>
        <button class="diseg" v-on:click="getMethod">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder-symlink-fill" viewBox="0 0 16 16">
            <path d="M13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2l.04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3zM2.19 3c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672a1 1 0 0 1 .707.293L7.586 3H2.19zm9.608 5.271-3.182 1.97c-.27.166-.616-.036-.616-.372V9.1s-2.571-.3-4 2.4c.571-4.8 3.143-4.8 4-4.8v-.769c0-.336.346-.538.616-.371l3.182 1.969c.27.166.27.576 0 .742z"/>
          </svg>
          <br>
          Расход
        <div class="suari"></div>
        </button>
        <button class="diseg" v-on:click="birgunlik">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
          </svg>
          <br>
          Выдать касса
      <div class="suari"></div>
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
        <div class="suari"></div>
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
        <div class="suari"></div>
          </button>
        <button class="diseg" v-on:click="polni_ochchot">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>
                <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
                <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"/>
                <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
              </svg>
              <br>
            Отчет о касса
        <div class="suari"></div>
          </button>
        <div class="row">
            <div class="tuggg pl-4 ">
                <span class="bdfsdf555">Итого сумма</span><br>
                <span class="bdfsdf555">Скидки %</span><br>
                <span class="bdfsdf555">Сумма скидки</span><br>
                <span class="bdfsdf555">Сумма оплати</span><br>
            </div>
            <div class="pl-2 tuggg3">
                <span class="bdfsdf555"> {{ JamiSummaTorgo.prise }} </span><br>
                <span class="bdfsdf555">{{ JamiSummaTorgo.skidka }}</span><br>
                <span class="bdfsdf555">{{ JamiSummaTorgo.chegir }}</span><br>
                <span class="bdfsdf555">{{ JamiSummaTorgo.jami }}</span><br>
            </div>
            <div class="tuggg4">
                <p class="text-center parptf">
                    Сумма оплати
                </p>
                <h3 class="text-center sdfd">{{ JamiSumma }}</h3>
                <input type="checkbox" class="sadasdgfgh"><span class="pl-2">Запрешате количства товар</span>
            </div>
        </div>
        
    </div>
</div>

<div v-if="torgosModel" class="torgosqlad">
    <button type="button" class="close mb-3 mt-3 mr-3" @click="torgosModel = false">
        <span aria-hidden="true" v-on:click="torgosModel = false">&times;</span>
    </button>
    <div class="mt-3 p-2 border-bottom">
        <button class="btn-success mb-2" @click="showModal = true">Товар добавлять</button>
        <input type="file" id="archiveExcel" v-on:change="subirExcel()">
        <button class="btn-success mb-2 mx-3" v-on:click="clik">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
          </svg>
        </button>
        <button class="btn-primary mb-2" v-on:click="exp">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
          </svg>
        </button>
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" v-on:click="obnovit" class="bi bi-funnel mx-3" viewBox="0 0 16 16">
          <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
        </svg>
        <select class="inps1 text-center" v-model="filtip" name="tip" id="tip">
          <option value="">--Filter Tip--</option>
          <option v-for="item in tipdata">
              {{ item.name }}
          </option>
        </select>
        <select class="inps1 text-center" v-model="filad" name="adress" id="adress">
          <option value="">--Filter Adress--</option>
          <option v-for="item in adressdata">
              {{ item.name }}
          </option>
        </select>
        <input type='text' id="tovarsq" class="inps1" v-model="tovarsqlad" />
        <br>
        <span class="border-bottom mx-4">
          Сумма: $ +{{ itogaTorgo.summa }}
        </span>
        <span class="border-bottom mx-4">
          Количество: {{ itogaTorgo.koli }}
        </span>
        <span class="border-bottom mx-4">
          Шт: {{ itogaTorgo.sht }}
        </span>
    </div>
    <div class="table-responsive">
        <div class="scroltab3">
        <table class="tabl scroltabter">
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
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in objects3" :key="item.id" class="tir">
                <!-- {{item}}  -->
                <td>
                    <select class="inp45454" v-on:change="updatechangeTip(item)" v-model="item.tip">
                    <option  v-for="itema in tipdata" :value="itema.name">{{itema.name}}</option>
                    </select>
                </td>
                <td>
                    <select class="inp45454" v-on:change="updatechangeAdr(item)" v-model="item.adress">
                    <option  v-for="itema in adressdata" :value="itema.name">{{itema.name}}</option>
                    </select>
                </td>
                <td>
                    <input type="text" class="inp45454" v-on:keyup="updatekeyup(item)" v-model="item.name">
                </td>
                <td>
                    <input type="text" class="inp45454" v-on:keyup="updatekeyup(item)" v-model="item.ogoh">
                </td>
                <td>
                    <input type="text" class="inp45454" v-on:keyup="updatekeyup(item)" v-model="item.kod">
                </td>
                <td>
                    <input type="text" class="inp45454" v-on:keyup="updatekeyup(item)" v-model="item.soni">
                </td>
                <td>
                    <input type="text" class="inp45454" v-on:keyup="updatekeyup(item)" v-model="item.olinish">
                </td>
                <td>
                    <input type="text" class="inp45454" v-on:keyup="updatekeyup(item)" v-model="item.sotilish">
                </td>
                <td>
                    <input type="text" class="inp45454" v-on:keyup="updatekeyup(item)" v-model="item.sotilish2">
                </td>
                <td>
                    <select class="inp45454" v-on:change="updatechangeVal(item)" v-model="item.valyuta">
                    <option value="">----</option>
                    <option  v-for="itema in valyudata" :value="itema.name">{{itema.name}}</option>
                    </select>
                </td>
                <td>
                  <a class="text-success mx-3 cursor-pointer" v-on:click="editsq(item)">
                    <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                  </a>
                  <a class="text-danger mr-2" v-on:click="delettip(item.id, item.name)">
                    <i class="nav-icon i-Close-Window font-weight-bold"></i>
                  </a>
                </td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
</div>

    <div v-if="showModal">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content basg">
                <div class="modal-header">
                  <h5 class="modal-title">Товар</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" v-on:click="showModal = false">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <!-- <div class="col-md-6 form-group mb-3">
                      <label for="firstName1">Тип</label>
                      <select class="form-control fc" v-model="tip" name="tip" id="tip">
                        <option v-for="item in tipdata">
                            {{item.name}}
                        </option>
                      </select>
                    </div> -->
                    <div class="col-md-6 form-group mb-3">
                      <label for="firstName1">Тип</label>
                      <input type="text" class="form-control fc" v-on:keyup="tipkey(tip)" v-model="tip">
                       <div v-if="toxtatish" 
                        style="
                          position: absolute;
                          background-color: #000000;
                          width: 100%;
                          width: 87%;
                          z-index: 2;
                          border: 1px solid #c0c0c0;
                        ">
                        <option v-for="item in option" :value="item.name"
                          class="cursor-pointer ho" v-on:click="valpush(item)">
                          {{item.name}}
                        </option>
                      </div>
                      <div v-else></div>
                    </div>
                    <div class="col-md-6 form-group mb-3">
                      <label for="firstName1">Адрес</label>
                      <select class="form-control fc" v-model="adress" name="adress" id="adress">
                        <option v-for="item in adressdata">
                            {{item.name}}
                        </option>
                      </select>
                    </div>
                    <div class="col-md-6 form-group mb-3">
                      <label for="firstName1">Товар</label>
                      <input class="form-control fc" id="firstName1" type="text" v-model="name">
                    </div>
                    <div class="col-md-6 form-group mb-3">
                      <label for="firstName1">N.1</label>
                      <input class="form-control fc" id="firstName1" type="number" v-model="ogoh">
                    </div>
                    <div class="col-md-6 form-group mb-3">
                      <label for="firstName1">Количество</label>
                      <input class="form-control fc" id="firstName1" type="number" v-model="soni">
                    </div>
                    <div class="col-md-6 form-group mb-3">
                      <label for="firstName1">Получающий</label>
                      <input class="form-control fc" id="firstName1" type="text" v-model="olinish">
                    </div>
                    <div class="col-md-6 form-group mb-3">
                      <label for="firstName1">Низкая</label>
                      <input class="form-control fc" id="firstName1" type="text" v-model="sotilish">
                    </div>
                    <div class="col-md-6 form-group mb-3">
                      <label for="firstName1">Стандартная</label>
                      <input class="form-control fc" id="firstName1" type="text" v-model="sotilish2">
                    </div>
                    <div class="col-md-6 form-group mb-3">
                      <label for="firstName1">Валюта</label>
                      <select class="form-control fc" v-model="valyuta" name="adress" id="adress">
                        <option v-for="item in valyudata">
                          {{item.name}}
                        </option>
                      </select>
                    </div>
                    <div class="col-md-6 form-group mb-3">
                      <label for="firstName1">Штрих код</label>
                      <input class="form-control fc" id="firstName1" type="text" v-model="shtrix">
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger mx-3" v-on:click="showModal = false">Отмена</button>
                  <button type="button" class="btn btn-primary" v-on:click="CreateSqladtor">Сохранить</button>
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
                  <button type="button" class="btn btn-primary" v-on:click="SqladDelet">Да</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div v-if="savdotormod" class="torgosqlad2">
      <button type="button" class="close mb-3 mt-3 mr-3" @click="savdotormod = false">
          <span aria-hidden="true"
          >&times;</span>
      </button>
      <div class="serc mb-2">
        <input type='text' id="search" v-model="search" class="searchbar" />
      </div>
      <div class="table-responsive">
        <div class="scroltabtorgo">
          <table class="tabl scroltabter">
            <!-- <thead>
                <tr>
                    <th>Tovar</th>
                    <th>Soni</th>
                    <th>Optviy</th>
                    <th>Roznishni</th>
                </tr>
            </thead> -->
            <tbody>
              <tr v-for="item in Items" :key="item.id" v-on:click="Sotuvga_Olish(item)" class="tir">
                <td>{{ item.name }}</td>
                <td>{{ item.soni }}</td>
                <td>{{ item.sotilish }}</td>
                <td>{{ item.sotilish2 }} {{ item.valyuta }}</td>
              </tr>
            </tbody>
        </table>
        </div>
      </div>
      <div class="mt-4">
        <button type="button" class="btn btn-danger" @click="savdotormod = false">
          Отмена
        </button>
      </div>
    </div>
    
    <div v-if="ModalOplate" class="modal_okn">
      <div class="modal_okna_torgo">
          <h5 class="text-center mt-3">Оплата</h5>
          <div class="row mt-0">
            <div class="col-5 mt-0 mx-2">
              <label for="firstName1">Итого сумма</label>
              <input class="form-control" type="text" v-model="JamiSumma" disabled>
              <label for="firstName1">Клент Выберите</label>
              <select class="form-control" v-on:change="clentsummafn(mijozs)" v-model="mijozs">
                <option value="">--Выберите--</option>
                <option v-for="itema in MijozSelect" :value="itema.id">{{ itema.name }}</option>
              </select>
              <div v-if="karz == 0">
                <label class="text-success">Долг</label>
                <input class="form-control border-success " type="text" v-model="karz" disabled>
                <label>Дата срок</label>
                <input class="form-control " type="date" disabled>
              </div>
              <div v-else class="mt-0">
                <label class="text-danger">Долг</label>
                <input class="form-control  border-danger " type="text" v-model="karz" disabled>
                <label class="text-danger ">Дата срок</label>
                <input class="form-control  border-danger" type="date" v-model="srok">
              </div>
            </div>
            <div class="col-5 mt-0">
              <label for="firstName1" class="mx-4">Налични</label>
              <div class="row">
                <div class="col-10">
                  <input class="form-control mx-4" type="text" v-on:keyup="naqt1(naqt)" v-model="naqt">
                </div>
                <div class="col-1">
                  <button class="btn btn-success" v-on:click="naqinp">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-unindent" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M13 8a.5.5 0 0 0-.5-.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H12.5A.5.5 0 0 0 13 8Z"/>
                      <path fill-rule="evenodd" d="M3.5 4a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 1 0v-7a.5.5 0 0 0-.5-.5Z"/>
                    </svg>
                  </button>
                </div>
              </div>
              <label for="firstName1" class="mx-4">Карта</label>
              <div class="row">
                <div class="col-10">
                  <input class="form-control mx-4" type="text" v-on:keyup="plastik1(plastik)" v-model="plastik">
                </div>
                <div class="col-1">
                  <button class="btn btn-success" v-on:click="plasinp">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-unindent" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M13 8a.5.5 0 0 0-.5-.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H12.5A.5.5 0 0 0 13 8Z"/>
                      <path fill-rule="evenodd" d="M3.5 4a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 1 0v-7a.5.5 0 0 0-.5-.5Z"/>
                    </svg>
                  </button>
                </div>
              </div>
              <label for="firstName1" class="mx-4">Банк</label>
              <div class="row">
                <div class="col-10">
                  <input class="form-control mx-4" type="text" v-on:keyup="bank1(bank)" v-model="bank">
                </div>
                <div class="col-1">
                  <button class="btn btn-success" v-on:click="bankinp">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-unindent" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M13 8a.5.5 0 0 0-.5-.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H12.5A.5.5 0 0 0 13 8Z"/>
                      <path fill-rule="evenodd" d="M3.5 4a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 1 0v-7a.5.5 0 0 0-.5-.5Z"/>
                    </svg>
                  </button>
                </div>
              </div>
              <label class="mx-4">Приняти заказ</label>
              <div class="row">
                <div class="col-10">
                  <input class="form-control mx-4" type="text" v-model="Kamentariya" placeholder="Kamentariya">
                </div>
                <div class="col-1">
                  <input class="form-check-input mx-4" type="checkbox" v-on:click="chesx">
                </div>
              </div>
            </div>
          </div>
          <div class="border-top">
            <div v-if="karz == 0" class="mt-4 mb-4">
              <button class="btn btn-danger" v-on:click="ModalOplate = false">Отмена</button>
              <button type="button" class="btn btn-success mx-2" v-on:click="OplataStart">Оплата</button>
            </div>
            <div v-else-if="chesxbox == 1 && Kamentariya2" class="mt-4 mb-4">
              <button class="btn btn-danger" v-on:click="ModalOplate = false">Отмена</button>
              <button type="button" class="btn btn-success mx-2" v-on:click="OplataStart">Оплата</button>
            </div>
            <div v-else-if="srok && mijozs" class="mt-4 mb-4">
              <button class="btn btn-danger" v-on:click="ModalOplate = false">Отмена</button>
              <button type="button" class="btn btn-success mx-2" v-on:click="OplataStart">Оплата</button>
            </div>
            <div v-else class="mt-4 mb-4">
              <button class="btn btn-danger" v-on:click="ModalOplate = false">Отмена</button>
              <button type="button" class="btn btn-light mx-2">Оплата</button>
            </div>
          </div>
        </div>
    </div>
    <div v-if="oknamodzaqaz2" class="div1">
      <div class="div2torgo">
          <button type="button" class="close mb-3 mt-3 mr-3" v-on:click="otkrit_zaqaz(false)">
              <span aria-hidden="true" v-on:click="showModalEditor = false">&times;</span>
          </button>
          <div class="table-responsive">
              <div class="scro pl-3">
                  <table class="tabl scroltab_torgo">
                      <thead>
                          <tr>
                              <th>Продавец</th>
                              <th>заказ</th>
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

  <div v-if="plkassa" class="div1">
    <div class="div2torgo">
        <button type="button" class="close mb-3 mt-3 mr-3" v-on:click="plkassa = false">
            <span aria-hidden="true" >&times;</span>
        </button>
        <hr>
        <h2 class="mb-3 text-center">Отчет о касса</h2>
        <div class="row mx-5">
          <div class="col-5 mx-3 alert alert-dark text-center">
            <h4>Торговы</h4>
            {{ polni.savdo }}
          </div>
          <div class="col-5 mx-3 alert alert-dark text-center">
            <h4>Расход</h4>
            {{ polni.rasxod }}
          </div>
          <div class="col-5 mx-3 alert alert-dark text-center">
            <h4>Выходная цена</h4>
            {{ polni.chiqishqarz }}
          </div>
          <div class="col-5 mx-3 alert alert-dark text-center">
            <h4>Долг</h4>
            {{ polni.kirishqarz }}
          </div>
          <div class="col-5 mx-3 alert alert-dark text-center">
            <h4>Прибл</h4>
            {{ polni.foyda1 }}
          </div>
          <div class="col-5 mx-3 alert alert-dark text-center">
            <h4>Скидка сумма</h4>
            {{ polni.sqlad }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="bir_kunki" class="div1">
      <div class="div2torgo">
          <button type="button" class="close mb-3 mt-3 mr-3" v-on:click="bir_kunki = false">
              <span aria-hidden="true" >&times;</span>
          </button>
          <hr>
          <h2 class="mb-3 text-center">Выдать касса</h2>
          <div class="row mx-5">
            <div class="col-5 mx-3 alert alert-dark text-center">
              <h4>Торговы</h4>
              {{ bir.savdo }}
            </div>
            <div class="col-5 mx-3 alert alert-dark text-center">
              <h4>Расход</h4>
              {{ bir.rasxod }}
            </div>
            <div class="col-5 mx-3 alert alert-dark text-center">
              <h4>Долг</h4>
              {{ bir.kirishqarz }}
            </div>
            <div class="col-5 mx-3 alert alert-dark text-center">
              <h4>Прибл</h4>
              {{ bir.foyda1 }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="torgosvaly" class="torgosqlad">
        <button type="button" class="close mb-3 mt-3 mr-3" @click="torgosvaly = false">
            <span aria-hidden="true">&times;</span>
        </button>
        <div class="mt-3 p-2 border-bottom">
          <button class="btn-success mb-2" @click="showModalvaly = true">Валюта добавлять</button>
          <input type="file" id="archiveExcel" v-on:change="subirExcelvalyuta()">
          <button class="btn-success mb-2 mx-3" v-on:click="clikvalyuta">                  
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
            </svg>
          </button>
          <button class="btn-primary mb-2" v-on:click="expvalyuta">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
              <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
            </svg>
          </button>
          <input type='text' id="valyuta" class="inps1" v-model="valyutatorvaly"/>
        </div>
        <div class="table-responsive">
            <div class="scroltab3">
            <table class="tabl scroltabter">
                <thead>
                  <tr>
                      <th>Валюта</th>
                      <th>Сумма</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                <tr v-for="item in Itemobjects" :key="item.id" class="tir">
                  <td>{{ item.name }}</td>
                  <td>{{ item.summa }}</td>
                  <td>
                    <a class="text-success mr-2" v-on:click="editvalyu(item)">
                      <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                    </a>
                    <a class="text-danger mr-2" v-on:click="deletvalyu(item.id, item.name)">
                      <i class="nav-icon i-Close-Window font-weight-bold"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
        </div>
    </div>

    <div v-if="showModalvaly">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content basg">
                <div class="modal-header">
                  <h5 class="modal-title">Валюта</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" v-on:click="showModalvaly = false">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-md-12 form-group mb-3">
                        <label for="firstName1">Валюта</label>
                        <input class="form-control" id="firstName1" type="text" v-model="valyutator.name" placeholder="Valyuta name">
                    </div>
                    <div class="col-md-12 form-group mb-3">
                      <label for="firstName1">Сумма</label>
                      <input class="form-control" id="firstName1" type="number" v-model="valyutator.summa" placeholder="Summa">
                  </div>
                </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger mx-3" v-on:click="showModalvaly = false">Отмена</button>
                  <button type="button" class="btn btn-primary" v-on:click="CreateValyuta">Сохранить</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div v-if="showModalDelValyuta">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title text-danger">Удалить</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" @click="showModalDelValyuta = false">&times;</span>
                  </button>
                </div>
                  <input type="hidden" name="" id="" v-model="valyutator.id">
                  <div class="col-md-12 form-group mb-3">
                    <input class="form-control text-center" type="text"  v-model="valyutator.name" disabled>
                </div>
                <div class="modal-body text-center">
                  <button type="button" class="btn btn-danger mx-2" @click="showModalDelValyuta = false">Нет</button>
                  <button type="button" class="btn btn-primary" v-on:click="ValyutaDeletTorgo">Да</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    
    <div v-if="torgostip" class="torgosqlad">
      <button type="button" class="close mb-3 mt-3 mr-3" @click="torgostip = false">
          <span aria-hidden="true">&times;</span>
      </button>
      <div class="mt-3 p-2 border-bottom">
        <button class="btn-success mb-2" v-on:click="showModaltip = true">Тип добавлять</button>
        <input type="file" id="archiveExcel" v-on:change="subirExceltip">
        <button class="btn-success mb-2 mx-3" v-on:click="cliktip">                  
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
          </svg>
        </button>
        <button class="btn-primary mb-2" v-on:click="exptip">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
          </svg>
        </button>
        <input type='text' id="tiptov" class="inps1" v-model="tiptov" />
        </div>
        <div class="table-responsive">
          <div class="scroltab3">
          <table class="tabl scroltabter">
            <thead>
              <tr>
                  <th class="mx-2">Тип</th>
                  <th>Action</th>
              </tr>
          </thead>
          <tbody>
            <tr v-for="item in Itemobjects" :key="item.id" class="tir">
              <td>{{ item.name }}</td>
              <td>
                <a class="text-success mr-2" v-on:click="edittip(item)">
                  <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                </a>
                <a class="text-danger mr-2" v-on:click="delettiptip(item.id, item.name)">
                  <i class="nav-icon i-Close-Window font-weight-bold"></i>
                </a>
              </td>
            </tr>
          </tbody>
          </table>
          </div>
      </div>
  </div>

  <div v-if="showModaltip">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog" role="document">
            <div class="modal-content basg">
              <div class="modal-header">
                <h5 class="modal-title">Тип</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" v-on:click="showModaltip = false">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-12 form-group mb-3">
                    <label for="firstName1">Тип</label>
                    <input class="form-control" id="firstName1" type="text" v-model="tiptorgo2.nametip" placeholder="Tip name">
                </div>
              </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger mx-3" v-on:click="showModaltip = false">Отмена</button>
                <button type="button" class="btn btn-primary" v-on:click="CreateTip">Сохранить</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
  
    <div v-if="showModalDalTip">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content basg">
                <div class="modal-header">
                  <h5 class="modal-title text-danger">Удалить</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" @click="showModalDalTip = false">&times;</span>
                  </button>
                </div>
                  <input type="hidden" name="" id="" v-model="tiptorgo2.id">
                  <div class="col-md-12 form-group mb-3">
                    <input class="form-control text-center" type="text"  v-model="tiptorgo2.nametip" disabled>
                </div>
                <div class="modal-body text-center">
                  <button type="button" class="btn btn-danger mx-2" @click="showModalDalTip = false">Нет</button>
                  <button type="button" class="btn btn-primary" v-on:click="TipsDelet">Да</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div v-if="torgostclm" class="torgosqlad">
      <button type="button" class="close mb-3 mt-3 mr-3" @click="torgostclm = false">
        <span aria-hidden="true">&times;</span>
    </button>
      <div class="mt-3 p-2 border-bottom">
        <button class="btn-success mb-2" v-on:click="showModalclm = true">Слент добавлять</button>
        <input type="file" id="archiveExcel" v-on:change="subirExcelclm()">
        <button class="btn-success mb-2 mx-3" v-on:click="clikclm">                  
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
          </svg>
        </button>
        <button class="btn-primary mb-2" v-on:click="expclm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
          </svg>
        </button>
        <input type='text' id="usersearch" class="inps1" v-model="Searvh"/>
        </div>
        <div class="table-responsive">
          <div class="scroltab3">
          <table class="tabl scroltabter">
            <thead>
              <tr>
                  <th>Имя</th>
                  <th>Офис или ИНН</th>
                  <th>Тел</th>
                  <th>Телеграм</th>
                  <th>Баланс</th>
                  <th>Долг</th>
                  <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in Itemobjects" :key="item.id" class="tir">
                <td>{{ item.name }}</td>
                <td>{{ item.firma }}</td>
                <td>{{ item.tel }}</td>
                <td>{{ item.telegram }}</td>
                <td class="text-success">{{ item.summa }}  {{ item.valyuta }}</td>
                <td class="text-danger">{{ item.karz }}</td>
                <td>
                  <a class="text-success mr-2" v-on:click="editmijclm(item)">
                    <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                  </a>
                  <a class="text-danger mr-2" v-on:click="deletmij(item.id, item.name)">
                    <i class="nav-icon i-Close-Window font-weight-bold"></i>
                  </a>
                </td>
              </tr>    
            </tbody>
          </table>
          </div>
      </div>
    </div>

    <div v-if="showModalclm">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content basg">
                <div class="modal-header">
                  <h5 class="modal-title">Слент</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" @click="showModalclm = false">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-6 form-group mb-3">
                        <label for="firstName1">Имя</label>
                        <input class="form-control" id="firstName1" type="text" v-model="cltorgosoft.name" placeholder="Имя">
                    </div>
                    <div class="col-6 form-group mb-3">
                        <label for="lastName1">Офис или ИНН</label>
                        <input class="form-control" id="lastName1" type="text" v-model="cltorgosoft.firma" placeholder="Офис или ИНН">
                    </div>
                    <div class="col-6 form-group mb-3">
                        <label for="exampleInputEmail1">Тел</label>
                        <input class="form-control" id="phone" type="text" v-model="cltorgosoft.tel" placeholder="Тел">
                    </div>
                    <div class="col-6 form-group mb-3">
                        <label for="phone">Телеграм</label>
                        <input class="form-control" id="telegram" type="text"  v-model="cltorgosoft.telegram" placeholder="Телеграм">
                    </div>
                    <div class="col-6 form-group mb-3">
                      <label for="balans">Баланс</label>
                      <input class="form-control" id="summa" type="text"  v-model="cltorgosoft.summa" placeholder="Баланс">
                    </div>
                    <div class="col-6 form-group mb-3">
                      <label for="firstName1">Валюта</label>
                      <select class="form-control" v-on:change="valyu_kurs_us(cltorgosoft.valyuta)" v-model="cltorgosoft.valyuta">
                        <option value="">----</option>
                        <option  v-for="itema in valyudata" :value="itema.name">{{itema.name}}</option>
                      </select>
                    </div>
                </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" @click="showModalclm = false">Назад</button>
                  <button type="button" class="btn btn-primary" v-on:click="SaveUserclm">Сохранить</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    
    <div v-if="showModalDelclm">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content basg">
                <div class="modal-header">
                  <h5 class="modal-title text-danger">Удалить</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" @click="showModalDelclm = false">&times;</span>
                  </button>
                </div>
                  <input type="hidden" name="" id="" v-model="cltorgosoft.id">
                  <div class="col-md-12 form-group mb-3">
                    <input class="form-control text-center" type="text"  v-model="cltorgosoft.name" disabled>
                </div>
                <div class="modal-body text-center">
                  <button type="button" class="btn btn-danger mx-2" @click="showModalDelclm = false">Нет</button>
                  <button type="button" class="btn btn-primary" v-on:click="UserDeletclm">Да</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div v-if="torgostye" class="torgosqlad">
      <button type="button" class="close mb-3 mt-3 mr-3" @click="torgostye = false">
        <span aria-hidden="true">&times;</span>
    </button>
      <div class="mt-3 p-2 border-bottom">
        <button class="btn-success mb-2" @click="showModalye = true">Доставщик добавлять</button>
        <input type="file" id="archiveExcel" v-on:change="subirExcelye()">
        <button class="btn-success mb-2 mx-3" v-on:click="clikye">                  
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
          </svg>
        </button>
        <button class="btn-primary mb-2" v-on:click="expye">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
          </svg>
        </button>
        <input type='text' id="yerkaz" class="inps1" v-model="yerkazse" />
        </div>
        <div class="table-responsive">
          <div class="scroltab3">
          <table class="tabl scroltabter">
            <thead>
              <tr>
                  <th>Доставщик</th>
                  <th>Сумма</th>
                  <th>Action</th>
              </tr>
          </thead>
          <tbody>
            <tr v-for="item in Itemobjects" :key="item.id" class="tir">
              <td>{{ item.name }}</td>
              <td>{{ item.summa }} {{ item.valyuta }}</td>
              <td>
                <a class="text-success mr-2" v-on:click="editye(item)">
                  <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                </a>
                <a class="text-danger mr-2" v-on:click="deletye(item.id, item.name)">
                  <i class="nav-icon i-Close-Window font-weight-bold"></i>
                </a>
                <a class="text-primary" v-on:click="arxiv(item.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-clipboard2-data-fill mt-0" style="cursor: pointer; margin-top: -5px !important;" viewBox="0 0 16 16">
                    <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5Z"/>
                    <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585c.055.156.085.325.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5c0-.175.03-.344.085-.5ZM10 7a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7Zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1Zm4-3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1Z"/>
                  </svg>
                </a>
              </td>
            </tr>
          </tbody>
          </table>
          </div>
      </div>
    </div>
    <div v-if="arxivModal" class="div1">
      <div class="div25457torgo">
          <button type="button" class="close mb-3 mt-3 mr-3" v-on:click="arxivModal = false">
              <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="mx-2 mt-3">Jami Summa: $ +{{ arxive.JamisummaSotuv }}</h4>
          <div class="table-responsive">
              <div class="scro">
                  <table class="tabl scroltabr4torg">
                      <thead>
                          <tr>
                              <th>Доставщик</th>
                              <th>Кол-во</th>
                              <th>Покупка</th>
                              <th>Итого</th>
                              <th><input type="date" v-on:change="arxivdate(arxivsana)" v-model="arxivsana" style="background: border-box;"></th>
                              <th>Обновлять</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr class="tir" v-for="item in arxive.obj" :key="item.id">
                              <td>
                                  {{ item.name }}
                              </td>
                              <td>
                                  {{ item.soni }}
                              </td>
                              <td>
                                  {{ item.summa | formatNumber }}
                              </td>
                              <td>
                                  {{ item.jami | formatNumber }} {{ item.valyuta }}
                              </td>
                              <td>
                                {{ item.sana }}
                            </td>
                              <td>
                                <a class="cursor-pointer text-success" v-on:click="editarxiv(item)">
                                  <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                                </a>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
    </div>
    
    <div v-if="arxivModaledit">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content basg">
                <div class="modal-header">
                  <h5 class="modal-title">{{ arx.name }}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" v-on:click="arxivModaledit = false">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-md-12 form-group mb-3">
                      <label for="firstName1">Шт</label>
                      <input class="form-control" type="number" v-model="arx.soni" placeholder="Шт">
                    </div>
                    <div class="col-md-12 form-group mb-3">
                      <label for="firstName1">Сумма</label>
                      <input class="form-control" type="text" v-model="arx.summa" placeholder="Сумма">
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" v-on:click="arxivModaledit = false">Назад</button>
                  <button type="button" class="btn btn-primary" v-on:click="UpdateArxiv">Сохранить</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div v-if="showModalye">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content basg">
                <div class="modal-header">
                  <h5 class="modal-title">Доставщик</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" @click="showModalye = false">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-md-12 form-group mb-3">
                        <label for="firstName1">Имя Доставщик</label>
                        <input class="form-control" id="firstName1" type="text" v-model="yet.name" placeholder="Имя Доставщик">
                    </div>
                    <div class="col-md-12 form-group mb-3">
                      <label for="firstName1">Сумма</label>
                      <input class="form-control" id="firstName1" type="number" v-model="yet.summa" placeholder="Сумма">
                    </div>
                    <div class="col-md-12 form-group mb-3">
                      <label for="firstName1">Валюта</label>
                      <select class="form-control" v-on:change="valyu_kurs_pas(yet.valyuta)" v-model="yet.valyuta">
                        <option value="">----</option>
                        <option  v-for="itema in valyudata" :value="itema.name">{{itema.name}}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" @click="showModalye = false">Назад</button>
                  <button type="button" class="btn btn-primary" v-on:click="CreateYetkazuvchi">Сохранить</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div v-if="showModalyedel">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content basg">
                <div class="modal-header">
                  <h5 class="modal-title text-danger">Удалить</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" @click="showModalyedel = false">&times;</span>
                  </button>
                </div>
                  <input type="hidden" name="" id="" v-model="yet.id">
                  <div class="col-md-12 form-group mb-3">
                    <input class="form-control text-center" type="text"  v-model="yet.name" disabled>
                </div>
                <div class="modal-body text-center">
                  <button type="button" class="btn btn-danger mx-2" @click="showModalyedel = false">Нет</button>
                  <button type="button" class="btn btn-primary" v-on:click="YetkazDelet">Да</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div v-if="torgostchiq" class="torgosqlad">
      <button type="button" class="close mb-3 mt-3 mr-3" @click="torgostchiq = false">
        <span aria-hidden="true">&times;</span>
    </button>
      <div class="mt-3 p-2 border-bottom">
        <button class="btn-success mb-2" @click="showModalchiq = true">Расход добавлять</button>
        <input type="file" id="archiveExcel" v-on:change="subirExcelchiq()">
        <button class="btn-success mb-2 mx-3" v-on:click="clikchiq">                  
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
          </svg>
        </button>
        <button class="btn-primary mb-2" v-on:click="expchiq">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
          </svg>
        </button>
        <input type='text' id="chiqim" class="inps1" v-model="chiqimse" />
        </div>
        <div class="table-responsive">
          <div class="scroltab3">
          <table class="tabl scroltabter">
            <thead>
                <tr>
                    <th>Где</th>
                    <th>Проблем</th>
                    <th>Сумма</th>
                    <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in Itemobjects" :key="item.id" class="tir">
                  <td>{{ item.qayerga }}</td>
                  <td>{{ item.sabap }}</td>
                  <td>{{ item.summa }} {{ item.valyuta }}</td>
                  <td>
                    <a class="text-success mr-2" v-on:click="editchiqim(item)">
                      <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                    </a>
                    <a class="text-danger mr-2" v-on:click="deletchiqim(item.id)">
                      <i class="nav-icon i-Close-Window font-weight-bold"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
    </div>
    
    <div v-if="showModalchiq">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content basg">
                <div class="modal-header">
                  <h5 class="modal-title">Расход</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" @click="showModalchiq = false">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-md-12 form-group mb-3">
                        <label for="firstName1">Где</label>
                        <input class="form-control" id="firstName1" type="text" v-model="chiq.qayerga" placeholder="Qayerga">
                    </div>
                    <div class="col-md-12 form-group mb-3">
                      <label for="firstName1">Проблем</label>
                      <input class="form-control" id="firstName1" type="text" v-model="chiq.sabap" placeholder="Sabap">
                  </div>
                  <div class="col-md-12 form-group mb-3">
                    <label for="firstName1">Сумма</label>
                    <input class="form-control" id="firstName1" type="number" v-model="chiq.summa" placeholder="Summa">
                  </div>
                  <div class="col-md-12 form-group mb-3">
                    <label for="firstName1">Валюта</label>
                    <select class="form-control" v-on:change="valyu_kurs_chiq(chiq.valyuta)" v-model="chiq.valyuta">
                      <option value="">----</option>
                      <option  v-for="itema in valyudata" :value="itema.name">{{itema.name}}</option>
                    </select>
                  </div>
                </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" @click="showModalchiq = false">Назад</button>
                  <button type="button" class="btn btn-primary" v-on:click="CreateChiqim">Сохранить</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div v-if="showModalDelchi">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content basg">
                <div class="modal-header">
                  <h5 class="modal-title text-danger">Удалить</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" @click="showModalDelchi = false">&times;</span>
                  </button>
                </div>
                <div class="modal-body text-center">
                  <button type="button" class="btn btn-danger mx-2" @click="showModalDelchi = false">Нет</button>
                  <button type="button" class="btn btn-primary" v-on:click="ChiqimDelet">Да</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>


</template>