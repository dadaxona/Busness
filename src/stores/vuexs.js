import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state: {
        name: "dadaxon",
        count: 0,
        todo: [
            { id: 1, text: 'Dadaxon'},
            { id: 2, text: 'Aziz' },
            { id: 3, text: 'Sarvar' },
            { id: 4, text: 'Sarvar' },
            { id: 5, text: 'Sarvar' },
            { id: 6, text: 'sdasd' },
            { id: 7, text: 'dsfds' },
        ]
    },
    mutations: {
        increment: (state) => {
          state.count+=5
        },
        increment2: (state, data) => {
            for (let i = 0; i < data.length; i++) {
                state.count += data[i]["son"];                
            }
          }
    },
    actions: {
        increment (context) {
            context.commit('increment')
        },
        increment2: (context, data) => {
            context.commit('increment2', data)
        }
    },
    getters: {
        doneTodosCount (state) {
            return state.todo.length
          }
    },
})

export default store