<template>
    <div id="app">
        <pw-button @click="handleToast">勇气徽章</pw-button>
        <pw-button type="primary" loading>勇气徽章</pw-button>
        <pw-button type="primary" disabled>勇气徽章</pw-button>
        <div style="display: flex;">
            <pw-button type="primary" @click="handleToast1">勇气徽章</pw-button>
            <pw-button type="primary" disabled>勇气徽章</pw-button>
        </div>
        <!-- <pw-input></pw-input>
        <pw-icon icon="brave" size="90" color="#272727" /> -->
        <pw-form ref="form" :model="form" :rules="rules" under-tip>
            <p class="pw-form-title">设置登录密码</p>
            <pw-form-item prop="a" label="新密码">
                <pw-input v-model="form.a" placeholder="请输入6-12位数字或字母"></pw-input>
            </pw-form-item>
            <pw-form-item prop="b" label="确认密码">
                <input v-model="form.b"></input>
            </pw-form-item>
            <pw-form-item :prop="['c', 'd', 'e']" :label="form.a">
                <pw-input v-model="form.c" placeholder="我的label=新密码"></pw-input>
                <input v-model="form.d" type="text" @input="handleInput">
                <div>
                    <input v-model="form.e" type="text" @input="handleInput">
                </div>
            </pw-form-item>
            <p class="pw-form-title">纯文字</p>
            <pw-form-item label="文字" arrow>
                <div>文字</div>
            </pw-form-item>
            <pw-form-item label="文字">
                <pw-switch v-model="form.switch" />
                <pw-switch v-model="form.switch" disabled />
                <pw-switch v-model="form.switch" active-color="green" inactive-color="red" />
                {{form.switch}}
            </pw-form-item>
            <p class="pw-form-title">列表</p>
            <pw-form-item v-for="(item, index) in form.items" :prop="`items.${index}.a`" :label="`items.${index}.a`" :rules="{ required: true, message: `请输入items.${index}.a` }" :key="index">
                <pw-input v-model="item.a" :placeholder="`请输入items.${index}.a`"></pw-input>
            </pw-form-item>
        </pw-form>
        <pw-button type="primary" @click="handleSubmit">提交</pw-button>
    </div>
</template>

<script>

export default {
    name: 'App',
    data () {
        const aValidator = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入新密码'))
            } else if (value && this.form.b && value !== this.form.b) {
                callback(new Error('您两次输入的密码不同，请检查后重新输入'))
            } else {
                callback()
            }
        }
        const bValidator = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入确认密码'))
            } else if (value && this.form.a && value !== this.form.a) {
                callback(new Error('您两次输入的密码不同，请检查后重新输入'))
            } else {
                callback()
            }
        }
        return {
            form: {
                a: '',
                b: '',
                c: '',
                d: '',
                e: '',
                items: [{ a: '' }, { a: '' }],
                switch: false
            },
            label: {
                c: 'ccc'
            },
            rules: {
                a: { required: true, validator: aValidator },
                c: { required: true, message: '请输入c' },
                d: { required: true, message: '请输入d' },
                e: { required: true, message: '请输入e' },
                b: { required: true, trigger: 'blur', validator: bValidator }
            }
        }
    },
    computed: {
        disabled () {
            return !this.form.a || !this.form.b
        }
    },
    mounted () {
        // this.$toast('预留手机号码变更成功')
    },
    methods: {
        handleSubmit () {
            this.$refs.form.validate()
        },
        handleInput (e) {
            this.$emit('input', e.target.value)
        },
        handleToast () {
            this.$toast({
                icon: 'brave',
                text: '<p>勇气徽章</p><p>代表一往无前勇气</p>'
            })
        },
        handleToast1 () {
            this.$toast({
                duration: 0,
                text: '<p>无勇气徽章</p>'
            })
            // setTimeout(() => { toast.clear() }, 2000)
        }
    }
}
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    background-color: #f7f7f7;
}
</style>
