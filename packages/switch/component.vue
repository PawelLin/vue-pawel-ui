<template>
    <div @click="handleSwitch" class="pw-switch" :class="classes" :style="style">
        <span class="pw-switch-block"></span>
    </div>
</template>

<script>
import '../themes/switch.scss'

export default {
    name: 'pw-switch',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean
        },
        activeColor: {
            type: String
        },
        inactiveColor: {
            type: String
        }
    },
    computed: {
        classes () {
            const classes = []
            this.value && (!this.activeColor || !this.inactiveColor) && classes.push('pw-switch-on-default')
            this.value && (this.activeColor && this.inactiveColor) && classes.push('pw-switch-on')
            this.disabled && classes.push('pw-switch-disabled')
            return classes
        },
        style () {
            const style = {}
            if (this.activeColor && this.inactiveColor) {
                style.backgroundColor = this.value ? this.activeColor : this.inactiveColor
            }
            return style
        }
    },
    methods: {
        handleSwitch () {
            this.$emit('input', !this.value)
        }
    }
}
</script>
