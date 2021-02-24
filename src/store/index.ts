import {createStore} from 'vuex'
import axios from "axios";

let iconWidth = 50;
let iconHeight = 50;

function loadCities(list: any) {
    const cities = [];
    for (const {
        name,
        coord: {lat, lon},
        weather: [{description: weather, icon: icon}],
        main: {temp: temperature},
        dt: updatedAt
    } of list) {
        cities.push({name, lat, lon, weather, icon, temperature, updatedAt: new Date(updatedAt * 1000)});
    }
    return cities;
}


export default createStore({
    state: {
        cities: [],
        centerMap: [process.env.VUE_APP_DEFAULT_LATITUDE, process.env.VUE_APP_DEFAULT_LONGITUDE],
        iconSize: [iconWidth, iconHeight],
        zoom: 12,
        selectedCities: [],
        lastUpdate: new Date()
    },
    mutations: {
        getCitiesList: (state, cities) => (state.cities = cities),
        getSelectedCities: (state, selectedCities) => (state.selectedCities = selectedCities),
        getDataFromLocalStorage(state, object) {
            console.log('fill store with localStorage');
            this.replaceState(object);

        },
        setUpdate: (state, lastUpdate) => (state.lastUpdate = lastUpdate),
    },
    actions: {
        async getCities({commit, dispatch, state}) {
            let localData = JSON.parse(localStorage.getItem('store') as string);
            // @ts-ignore
            console.log("Time from last update: " + (Date.now() - state.lastUpdate) / 1000 + " seconds");

            if (!localData || localData.cities.length == 0 || Date.now() - Date.parse(localData.lastUpdate).valueOf() > 15000) {
                if(state.selectedCities.length == 0) {
                    console.log('Updating weather data from api');
                    await axios.get(`https://api.openweathermap.org/data/2.5/find?lat=${process.env.VUE_APP_DEFAULT_LATITUDE}&lon=${process.env.VUE_APP_DEFAULT_LONGITUDE}&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${process.env.VUE_APP_OW_APP_ID}`)
                        .then((resp) => {
                            commit('getCitiesList', loadCities(resp.data.list));
                            dispatch('storeUpdateTime');

                        });
                } else {
                    dispatch("loadSelectedCities", state.selectedCities);
                }

            } else {
                console.log('No need to update data...')
            }
            setTimeout(() => dispatch('getCities'), 5000);


        },
        storeUpdateTime({commit}) {
            commit("setUpdate", new Date());

        },
        async loadSelectedCities({commit, dispatch, state}, list) {
           let selectionNames : string[] = [];
            let selectedObjects: any[] = [];
            for(const city of list) {
                let lower = city.toLowerCase();
                console.log('Updating weather of ' + city + ' city from api');
                await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${lower}&lang=fr&units=metric&APPID=${process.env.VUE_APP_OW_APP_ID}`)
                    .then((resp) => {
                        selectedObjects.push(resp.data);
                    });
            }
            for(const test of selectedObjects) {
                selectionNames.push(test.name);
            }

            dispatch('storeUpdateTime');
            commit('getSelectedCities', selectionNames);
            commit('getCitiesList', loadCities(selectedObjects));
        },

        deleteSelected({commit, dispatch, state}, index) {
            let selection = state.selectedCities;
            selection.splice(index, 1);
            commit('getSelectedCities', selection);
            dispatch('loadSelectedCities', selection);

            if(selection.length === 0) {
                dispatch('getCities');
            }
        },

        initialiseStore({commit}) {
            if (localStorage.getItem('store')) {
                let local = JSON.parse(localStorage.getItem('store') as string);

                local.lastUpdate = new Date(local.lastUpdate)
                for(const city of local.cities) {
                    city.updatedAt = new Date(city.updatedAt);
                }
                commit('getDataFromLocalStorage', Object.assign(local));
            }
        }

    },
    modules: {},

})
