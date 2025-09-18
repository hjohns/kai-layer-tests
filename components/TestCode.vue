<template>
  <pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto"><code ref="codeBlock" :class="`language-${language}`">{{ code }}</code></pre>
</template>

<script setup>
import * as Prism from 'prismjs'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-markup'

const props = defineProps({
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: 'markup'
  }
})

const codeBlock = ref(null)

onMounted(() => {
  if (codeBlock.value) {
    Prism.highlightElement(codeBlock.value)
  }
})
</script>
