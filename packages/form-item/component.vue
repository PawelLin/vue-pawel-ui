<template>
    <div class="pw-form-item" :class="arrow && 'pw-form-item-padding'">
        <label ref="label" class="pw-form-item-label" :style="{ minWidth }">
            <slot name="label"><pw-icon v-if="icon" :icon="icon" />{{label}}</slot>
        </label>
        <div class="pw-form-item-content">
            <slot></slot>
            <pw-icon v-if="arrow" class="pw-form-item-arrow" icon="brave" size="10" />
            <p v-if="showTip" v-show="tip" class="pw-form-item-tip">{{tip}}</p>
        </div>
    </div>
</template>

<script>
import PwIcon from '../icon'
import Schema from 'async-validator'
import '../themes/form-item.scss'

export default {
    name: 'pw-form-item',
    components: {
        PwIcon
    },
    props: {
        prop: {
            type: [String, Array]
        },
        label: {
            type: String
        },
        icon: {
            type: String
        },
        rules: {
            type: Object
        },
        arrow: {
            type: Boolean
        }
    },
    inject: ['Form'],
    data () {
        return {
            autoMinWidth: false,
            tip: ''
        }
    },
    computed: {
        minWidth () {
            return this.autoMinWidth ? 'auto' : `${this.Form.minLabeWidth}px`
        },
        showTip () {
            return !this.Form.underTip
        }
    },
    watch: {
        label () {
            this.autoMinWidth = true
            this.$nextTick(() => {
                this.Form.$emit('form-item-label-minWidth', this, this.$refs.label.offsetWidth)
                this.autoMinWidth = false
            })
        }
    },
    created () {
        this.validates = []
        this.Form.$emit('form-item-add', this)
        // this.prop && this.$watch(`Form.model.${this.prop}`, value => {
        //     this.validate(value)
        // })
    },
    mounted () {
        this.Form.$emit('form-item-label-minWidth', this, this.$refs.label.offsetWidth)
        this.initTrigger()
    },
    destroyed () {
        this.Form.$emit('form-item-remove', this)
    },
    methods: {
        initTrigger () {
            const props = [].concat(this.prop).map(prop => ({ prop, key: this.getLastKey(prop) }))
            this.getTrigger(this.$slots.default, props)
        },
        getTrigger (vnodes, props) {
            vnodes.forEach(vnode => {
                const componentInstance = vnode.componentInstance
                if (componentInstance) {
                    const { model: { expression = '' } = {} } = vnode.data || {}
                    if (expression) {
                        const { prop } = props.filter(prop => prop.key === this.getLastKey(expression))[0] || {}
                        if (prop) {
                            const rule = this.rules || this.Form.rules[prop]
                            const trigger = (rule && rule.trigger) ? [rule.trigger] : Object.keys(componentInstance.$listeners)
                            if (rule && trigger.length) {
                                const validate = this.getValidate(prop, rule)
                                this.validates.push(validate)
                                trigger.forEach(eventName => {
                                    componentInstance.$on(eventName, validate)
                                    componentInstance.$once('hook:beforeDestroy', () => {
                                        componentInstance.$off((eventName), validate)
                                    })
                                })
                            }
                        }
                    }
                } else {
                    if (vnode.data) {
                        const { directives = [], on = {} } = vnode.data || {}
                        const { expression = '' } = directives.filter(directive => directive.name === 'model')[0] || {}
                        if (expression) {
                            const { prop } = props.filter(prop => prop.key === this.getLastKey(expression))[0] || {}
                            if (prop) {
                                const rule = this.rules || this.Form.rules[prop]
                                const trigger = (rule && rule.trigger) ? [rule.trigger] : Object.keys(on)
                                if (rule && trigger.length) {
                                    const validate = this.getValidate(prop, rule)
                                    this.validates.push(validate)
                                    trigger.forEach(eventName => {
                                        vnode.elm.addEventListener(eventName, validate, false)
                                        this.$once('hook:beforeDestroy', () => {
                                            vnode.elm.removeEventListener(eventName, validate, false)
                                        })
                                    })
                                }
                            }
                        }
                    }
                    if (vnode.children) {
                        this.getTrigger(vnode.children, props)
                    }
                }
            })
        },
        validate (callback) {
            return new Promise(resolve => {
                Promise.all(this.validates.map(validate => validate())).then(res => {
                    const result = res.reduce((result, boolean) => result && boolean, true)
                    callback && callback(result)
                    resolve(result)
                })
            })
        },
        getValidate (prop, rule) {
            return () => {
                const value = this.getPropValue(prop, this.Form.model)
                return new Promise(resolve => {
                    const validator = new Schema({ [prop]: rule })
                    validator.validate({ [prop]: value }, (errors, field) => {
                        const tip = errors ? errors[0].message : ''
                        if (this.showTip) {
                            this.tip = tip
                        } else {
                            this.Form.$emit('form-item-tip', tip)
                        }
                        resolve(!errors)
                    })
                })
            }
        },
        getLastKey (str = '') {
            return str.replace(/.*\.(.*)/, '$1')
        },
        getPropValue (prop, item) {
            const props = typeof prop === 'string' ? prop.split('.') : prop
            return props.reduce((item, key) => {
                item = item[key]
                return item
            }, item[props.shift()])
        }
    }
}
</script>
