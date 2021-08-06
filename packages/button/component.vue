<template>
    <button
        class="pw-button"
        :class="[`pw-button-${type}`, loading && 'pw-button-loading']"
        :disabled="disabled"
        @click="handleClick"
    >
        <pw-icon v-show="loading" icon="brave" size="20" color="inherit" />
        <slot></slot>
    </button>
</template>

<script>
import PwIcon from '../icon'
import '../themes/button.scss'

export default {
    name: 'pw-button',
    components: {
        PwIcon
    },
    props: {
        type: {
            type: String,
            default: 'default'
        },
        loading: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleClick () {
            if (!this.loading) {
                this.$emit('click')
            }
        }
    }
}
</script>
