import Vue from 'vue'
import Component from './component.vue'

let comp = null
const initData = {
    text: '',
    icon: '',
    duration: 2000
}

function Toast (propsData) {
    const VM = Vue.extend(Component)
    if (comp) {
        Object.assign(comp.$props, initData, propsData)
        comp.show = true
    } else {
        comp = new VM({ propsData }).$mount()
        document.body.appendChild(comp.$el)
        this.clear = () => comp.destroy(() => { comp = null })
    }
    comp.countDownHidden(() => {
        comp = null
    })
    return this
}

export default Toast
