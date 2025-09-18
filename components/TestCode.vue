<template>
  <pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto"><code ref="codeBlock" :class="`language-${language}`">{{ code }}</code></pre>
</template>

<script setup>
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

onMounted(async () => {
  if (codeBlock.value) {
    try {
      // Dynamic import to ensure PrismJS loads properly in extended layers
      const Prism = await import('prismjs')
      Prism.highlightElement(codeBlock.value)
    } catch (error) {
      console.error('Failed to load PrismJS:', error)
    }
  }
})
</script>
