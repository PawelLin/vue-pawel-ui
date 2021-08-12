<template>
    <input :value="aa" class="pw-input" type="text" @input="handleInput" :placeholder="placeholder">
</template>

<script>
import '../themes/input.scss'

export default {
    name: 'pw-input',
    props: {
        value: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String
        }
    },
    computed: {
        aa () {
            return this.value
        }
    },
    methods: {
        handleInput (e) {
            this.$emit('input', e.target.value)
        }
    }
}
</script>
