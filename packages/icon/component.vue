<template>
    <i class="iconfont pw-icon" :class="iconClass" :style="{ color, fontSize }"></i>
</template>

<script>
import '../themes/icon.scss'
export default {
    name: 'pw-icon',
    props: {
        icon: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: '#272727'
        },
        size: {
            type: [Number, String],
            default: 16
        }
    },
    computed: {
        iconClass () {
            return (this.icon && 'icon-' + this.icon) || ''
        },
        fontSize () {
            return `${this.size}px`
        }
    }
}
</script>
