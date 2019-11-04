import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        album:[],
        recommend:[],
        isloading: false
    },
    mutations: {
        GETMUSIC(state, payload) {
            state[payload.type] = payload.data;
        }
    },
    actions: {
        async GETMUSIC({ commit }, payload) {
            // console.log("payload:",payload);
            var data = await fetch('/getmusic',{
                method:"POST",
                headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payload)
            }).then(res => res.json());
            // console.log("data:",data);
            commit("GETMUSIC", {
                type: payload.type,
                data
            })
        }
    }
})
