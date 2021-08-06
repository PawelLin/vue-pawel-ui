<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <pw-button @click="handleToast">勇气徽章</pw-button>
    <pw-button type="primary" loading>勇气徽章</pw-button>
    <pw-button type="primary" disabled>勇气徽章</pw-button>
    <div style="display: flex;">
        <pw-button type="primary" @click="handleToast1">勇气徽章</pw-button>
        <pw-button type="primary" disabled>勇气徽章</pw-button>
    </div>
    <pw-input></pw-input>
    <pw-icon icon="brave" size="90" color="#272727" />
  </div>
</template>

<script>

export default {
    name: 'App',
    mounted () {
        // this.$toast('预留手机号码变更成功')
    },
    methods: {
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
        }
    }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
