<template>
  <div class="pdf-preview">
    <div class="pdf-preview-header">
      <template v-if="isLoading">
        Loading...
      </template>

      <template v-else>
        <span v-if="showAllPages">
          {{ pageCount }} page(s)
        </span>

        <span v-else>
          <button
            :disabled="page <= 1"
            @click="page--"
          >❮</button>

          {{ page }} / {{ pageCount }}

          <button
            :disabled="page >= pageCount"
            @click="page++"
          >❯</button>
        </span>

        <label class="right">
          <input
            v-model="showAllPages"
            type="checkbox"
          >

          Show all pages
        </label>
      </template>
    </div>

    <div class="pdf-preview-content">
      <vue-pdf-embed
        class="pdf-preview-widget"
        ref="pdfRef"
        :source="url"
        :page="page"
        @password-requested="handlePasswordRequest"
        @rendered="handleDocumentRender"
      />
    </div>
  </div>
</template>

<script>
import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed'

export default {
  name: 'PdfViewer',
  props: {
    url: String
  },
  components: {
    VuePdfEmbed,
  },
  data() {
    return {
      isLoading: true,
      page: null,
      pageCount: 1,
      showAllPages: true
    }
  },
  methods: {
    handleDocumentRender() {
      this.isLoading = false
      this.pageCount = this.$refs.pdfRef.pageCount
    },
    handlePasswordRequest(callback, retry) {
      callback(prompt(retry
        ? 'Enter password again'
        : 'Enter password'
      ))
    },
  },
  watch: {
    showAllPages() {
      this.page = this.showAllPages ? null : 1
    },
  },
}
</script>

<style scoped>
.pdf-preview-widget > div {
  margin-bottom: 8px;
  box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.1);
}

.pdf-preview-header {
  height: 50px;
  padding: 16px;
  box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.1);
  background-color: #555;
  color: #ddd;
  box-sizing: border-box;
}

.pdf-preview-content {
  padding: 24px 16px;
}

.right {
  float: right;
}
</style>