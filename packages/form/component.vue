<template>
    <div class="pw-form" :class="classes">
        <slot></slot>
        <p v-show="underTip" class="pw-form-tip">{{tip}}&nbsp;</p>
    </div>
</template>

<script>
import '../themes/form.scss'

export default {
    name: 'pw-form',
    props: {
        model: {
            type: [Object, Array]
        },
        rules: {
            type: Object
        },
        underTip: {
            type: Boolean
        },
        textRight: {
            type: Boolean
        },
        contentRight: {
            type: Boolean
        }
    },
    provide () {
        return {
            Form: this
        }
    },
    data () {
        return {
            minLabeWidth: 0,
            tip: ''
        }
    },
    computed: {
        classes () {
            const classes = []
            this.textRight && classes.push('pw-form-label-right')
            this.contentRight && classes.push('pw-form-content-right')
            return classes
        }
    },
    beforeCreate () {
        this.formItems = []
        this.labelWidths = []
    },
    created () {
        this.$on('form-item-add', formItem => {
            this.formItems.push(formItem)
        })
        this.$on('form-item-remove', formItem => {
            const index = this.formItems.indexOf(formItem)
            this.formItems.splice(index, 1)
        })
        this.$on('form-item-label-minWidth', (formItem, width) => {
            const index = this.formItems.indexOf(formItem)
            let minLabeWidth = 0
            this.labelWidths[index] = width
            this.labelWidths.forEach(width => {
                minLabeWidth = Math.max(width, minLabeWidth)
            })
            this.minLabeWidth = minLabeWidth
        })
        this.$on('form-item-tip', tip => {
            this.tip = tip
        })
    },
    methods: {
        async validate (callback) {
            if (this.underTip) {
                for (const formItem of this.formItems) {
                    const result = await formItem.validate()
                    if (!result) {
                        callback && callback(result)
                        break
                    }
                }
            } else {
                Promise.all(this.formItems.map(item => item.validate())).then(res => {
                    const result = res.reduce((result, boolean) => result && boolean, true)
                    callback && callback(result)
                })
            }
        },
        validateField (prop, callback) {
            const formItem = this.formItems.filter(item => item.prop === prop)[0]
            if (!formItem) { throw new Error('[vue-pawel-ui warn]: must call validateField with valid prop!') }
            formItem.validate(callback)
        },
        resetFields () {
            console.log(this.model)
        }
    }
}
</script>
