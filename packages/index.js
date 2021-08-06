import Button from './button'
import Input from './input'
import Icon from './icon'
import Toast from './toast'

const components = [
    Button,
    Input,
    Icon
]

const install = function (Vue) {
    if (install.installed) return
    components.map(component => Vue.component(component.name, component))
    Vue.prototype.$toast = Toast
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    Button,
    Input,
    Icon
}
