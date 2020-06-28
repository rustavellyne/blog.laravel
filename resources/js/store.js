import { isLoggedIn, logOut } from "./components/shared/utils/auth";

export default {
    state: {
        lastSearch: {
            from: null,
            to: null,
        },
        basket: {
            items: [],
        },
        isLoggedIn: false,
        user: {

        },
    },
    mutations: {
        setLastSearch (state, payload) {
            state.lastSearch = payload;
        },
        addToBasket (state, payload) {
            state.basket.items.push(payload);
        },
        removeFromBasket (state, payload) {
            state.basket.items = state.basket.items.filter(item => item.bookable.id !== payload)
        },
        setBasket (state, payload) {
            state.basket = payload
        },
        setUser (state, payload) {
            state.user = payload
        },
        setLoggedIn (state, payload) {
            state.isLoggedIn = payload
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
            const storedBasket = localStorage.getItem('basket');
            if (storedBasket) {
                context.commit('setBasket', JSON.parse(storedBasket))
            }
            context.commit('setLoggedIn', isLoggedIn())
        },
        addToBasket ({commit, state}, payload) {
            commit('addToBasket', payload);
            localStorage.setItem('basket', JSON.stringify(state.basket));
        },
        removeFromBasket ({commit, state}, payload) {
            commit('removeFromBasket', payload);
            localStorage.setItem('basket', JSON.stringify(state.basket));
        },
        clearBasket ({commit, state}) {
            commit('setBasket', {items: []})
            localStorage.setItem('basket', JSON.stringify(state.basket));
        },
        async loadUser ({commit, dispatch}) {
            if(isLoggedIn()) {
                try {
                    const user = (await axios.get('/user')).data;
                    commit('setUser', user);
                    commit('setLoggedIn', true);
                } catch (error) {
                    dispatch('logout');
                }
            }
        },
        logout({ commit }) {
            commit('setUser', {});
            commit('setLoggedIn', false);
            logOut();
        },
    },
    getters: {
        itemsInBasket: (state) => state.basket.items.length,
        inBasketAlready (state) {
            return function (id) {
                return state.basket.items.reduce(
                    (result, item) => result || item.bookable.id === id, false
                )
            }
        },
    },
}