<script>
  import { RouterLink, RouterView } from 'vue-router'
  import { mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  export default {
        data() {
            return {
              showModal: false,
                // none: '',
            }
        },
        methods: {
          ...mapActions([
            'increment',
            'increment2'
        ]),
        increment2sdsad(){
          const data = [
            {"son": 10},
          ];
          this.increment2(data)
        }
        },
        computed: {
          ...mapState({
            name: state => state.name,
            count: state => state.count,
          }),
          ...mapGetters({
            doneCount:'doneTodosCount',
          }),
        },
      }
</script>

<template>
  <div class="row mb-4">
    <div class="col-md-12 mb-3">
        <div class="card text-left">
            <div class="card-body">
                <button class="btn btn-success mb-2" @click="showModal = true">Mijoz qo'shish</button>
                <input type='text' id="usersearch" class="usersearch" />
                <div class="table-responsive">
                  <div class="scroltab3">
                    <table class="table scroltab">
                        <thead>
                            <tr>
                                <th><button @click="increment">incerament</button></th>
                                <th><button @click="increment2sdsad">incerament</button></th>
                                <th>Name</th>
                                <th>Avatar</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                          {{name}}
                          {{count}}
                          {{doneCount}}
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
              <h5 class="modal-title">Modal User</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="showModal = false">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</div>
</template>
