/* eslint-disable */
declare module '*.vue' {
    import type {DefineComponent} from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

import {ComponentCustomProperties} from 'vue'
import {Store} from 'vuex'

declare module '@vue/runtime-core' {
    // declare your own store states
    interface State {
        cities: any[],
        centerMap: number[],
        iconSize: number[],
        zoom: number
    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>
    }
}