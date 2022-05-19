const dhStore = {
    namespaced: true,
    state: {
        sq: 0,
        surveyData: [],
        check: Boolean,
        token: '',

    },
    mutations: {
        setSQNumber(state, payload) {
            return state.sq++;
        },
        setToken(state, payload) {
            state.token = payload;
        },
        resetState(state) {
            state.token = '';
            state.sq = 0;
            state.surveyData = [];
        }
    },
    getters:{
        getSQNumber(state) {
            return state.sq;
        },
        getSurveyData(state) {
            return state.surveyData;
        },
        getToken(state) {
            return state.token;
        }
    },
    actions: {

    },

}

export default dhStore;