<template>
  <div class="preview-pdf">
    <div style="text-align:center;">
      <a-button
        id="prev"
        @click="onPrePage"
      >&lt;</a-button>
      <span style="margin: 0 10px;">
        <span id="page_num">{{ currentPage }}</span>
        /
        <span id="page_count">{{ totalPages }}</span>
      </span>
      <a-button
        id="next"
        @click="onNextPage"
      > > </a-button>
      <a-button
        style="marginLeft: 20px;"
        type="primary"
        id="download"
        @click="download"
      > 下载 </a-button>
    </div>

    <div :style="`margin:0 auto; width: ${pdfWidth};`">
      <canvas id="pdfCanvas"></canvas>
    </div>
  </div>
</template>

<script>
const PDFJS = require('pdfjs-dist')
PDFJS.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.js'

export default {
  name: 'PdfPreview',
  props: {
    url: String
  },
  data() {
    return {
      totalPages: [], // 总页数
      currentPage: 1, // 当前页
      pageRendering: false, // 是否正在渲染
      pageNumPending: null, // 待处理页码
      pdfWidth: '', // 宽度
      pdfDoc: null, // 文档内容
      pdfScale: 1.0 // 放大倍数
    };
  },
  mounted() {
    this.getPdfUrl()
  },
  methods: {
    getPdfUrl() {
      // todo 请求后台，获取pdf的url，注意这里不能是本地的pdf文件
      this.loadFile(this.url)
    },
    loadFile(url) {
      // 通过 promise 获取页面
      let loadingTask = PDFJS.getDocument(url)
      this.pageRendering = true
      loadingTask.promise.then((pdf) => {
        this.pdfDoc = pdf
        this.totalPages = pdf.numPages
        this.$nextTick(() => {
          this.renderPage(1) // 首页渲染
        })
      })
    },
    renderPage(num) {
      this.currentPage = num // 更新当前页码
      this.pdfDoc.getPage(num).then((page) => {
        let canvas = document.getElementById('pdfCanvas')
        let ctx = canvas.getContext('2d')
        let dpr = window.devicePixelRatio || 1
        let bsr =
          ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio ||
          1
        let ratio = dpr / bsr
        let viewport = page.getViewport({ scale: this.pdfScale })
        canvas.width = viewport.width * ratio
        canvas.height = viewport.height * ratio

        canvas.style.width = viewport.width + 'px'

        this.pdfWidth = viewport.width + 'px'

        canvas.style.height = viewport.height + 'px'

        ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
        // 将 PDF 页面渲染到 canvas 上下文中
        let renderContext = {
          canvasContext: ctx,
          viewport: viewport
        }
        let renderTask = page.render(renderContext)
        renderTask.promise.then(() => {
          this.pageRendering = false
          if (this.pageNumPending === null) return
          this.renderPage(this.pageNumPending)
          this.pageNumPending = null
        });
      });
    },
    onPrePage() {
      // 上一页
      if (this.currentPage <= 1) return;
      this.currentPage--;
      this.queueRender(this.currentPage);
    },
    onNextPage() {
      // 下一页
      if (this.currentPage >= this.totalPages) return;
      this.currentPage++;
      this.queueRender(this.currentPage);
    },
    queueRender(num) {
      // 渲染等待；如果正在进行另一个页面渲染，请等待渲染完成。否则，立即执行渲染
      !this.pageRendering ? this.renderPage(num) : (this.pageNumPending = num);
    },
    download() {

    }
  }
};
</script>

<style>
.preview-pdf h1 {
  margin: 30px auto;
  text-align: center;
  font-family: "宋体";
  letter-spacing: 2px;
}
</style>