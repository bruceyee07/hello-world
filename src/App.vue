<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <HelloWorld msg="hello world" />
    <AntdComponent />
    <CustomChart />
    <PdfPreview url='https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf' />

    <a-button @click="viewPdf">点击预览</a-button>
    <a-modal
      v-model="showPdfPreviewDialog"
      title="Pdf 文件预览"
      @ok="handleOk"
      centered
      :footer="null"
      width="800px"
      :bodyStyle="{ maxHeight: '750px', overflow: 'auto' }"
    >
      <PdfViewer url='https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf' />
    </a-modal>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import AntdComponent from './components/AntdComponent.vue'
import CustomChart from './components/CustomChart'
import PdfPreview from './components/PdfPreview'
import PdfViewer from '@/components/PdfViewer.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    AntdComponent,
    CustomChart,
    PdfPreview,
    PdfViewer
  },
  data() {
    return {
      showPdfPreviewDialog: false
    }
  },
  methods: {
    viewPdf() {
      this.showPdfPreviewDialog = true
    },
    handleOk() {
      this.showPdfPreviewDialog = false
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
