<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted() {
    console.log('testing remove console.log...')
    // testing remove comments
    const res = _.flatten([1, [2, [3, [4]], 5]])
    console.log(res)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
