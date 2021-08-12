<template>
    <div v-show="show" class="pw-toast" :class="[icon && 'pw-toast-pic']">
        <pw-icon v-show="icon" class="pw-toast-icon" :icon="icon" size="60" color="inherit" />
        <div class="pw-toast-content" v-html="text"></div>
    </div>
</template>

<script>
import PwIcon from '../icon'
import '../themes/toast.scss'
export default {
    name: 'pw-toast',
    components: {
        PwIcon
    },
    props: {
        icon: {
            type: String,
            default: ''
        },
        text: {
            type: String,
            default: ''
        },
        duration: {
            type: Number,
            default: 2000
        }
    },
    data () {
        return {
            show: true
        }
    },
    methods: {
        countDownHidden (callback) {
            if (this.duration) {
                setTimeout(() => {
                    this.show = false
                    this.destroy(callback)
                }, this.duration)
            }
        },
        destroy (callback) {
            document.body.removeChild(this.$el)
            this.$destroy()
            callback && callback()
        }
    }
}
</script>
