export default {
    state: {
        lastSearch: {
            from: null,
            to: null,
        },
        basket: {
            items: [],
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
        },
        addToBasket ({commit, state}, payload) {
            commit('addToBasket', payload);
            localStorage.setItem('basket', JSON.stringify(state.basket));
        },
        removeFromBasket ({commit, state}, payload) {
            commit('removeFromBasket', payload);
            localStorage.setItem('basket', JSON.stringify(state.basket));
        },
        setBasket () {},
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