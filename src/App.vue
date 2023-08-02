<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="hello world"/>
    <AntdComponent />
    <CustomChart />
    <PdfPreview />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import AntdComponent from './components/AntdComponent.vue'
import CustomChart from './components/CustomChart'
import PdfPreview from './components/PdfPreview'

export default {
  name: 'App',
  components: {
    HelloWorld,
    AntdComponent,
    CustomChart,
    PdfPreview
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
