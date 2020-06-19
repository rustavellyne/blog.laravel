export default {
    state: {
        lastSearch: {
            from: null,
            to: null,
        }
    },
    mutations: {
        setLastSearch (state, payload) {
            state.lastSearch = payload;
        },
    },
    actions: {
        setLastSearch (context, payload) {
            context.commit('setLastSearch', payload);
            localStorage.setItem('lastSearch', JSON.stringify(payload));
        },
        loadStoreState (context) {
            const lastStored = localStorage.getItem('lastSearch');
            if(lastStored) {
                context.commit('setLastSearch', JSON.parse(lastStored))
            }
        },
    },
}