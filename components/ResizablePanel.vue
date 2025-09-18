<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'


const props = defineProps<{
  title?: string
  minWidth?: number
  maxWidth?: number
  defaultWidth?: number
}>()

const panelRef = ref<HTMLDivElement>()
const isResizing = ref(false)
const startX = ref(0)
const startWidth = ref(0)
const currentWidth = ref(props.defaultWidth || 400)
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1200)

const minWidth = props.minWidth || 200
const maxWidth = computed(() => {
  if (props.maxWidth) return props.maxWidth
  // Set max width to about half the screen width
  return Math.floor(windowWidth.value * 0.5)
})

const startResize = (e: MouseEvent) => {
  isResizing.value = true
  startX.value = e.clientX
  startWidth.value = currentWidth.value
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', stopResize)
  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isResizing.value) return
  
  const deltaX = startX.value - e.clientX
  const newWidth = startWidth.value + deltaX
  
  if (newWidth >= minWidth && newWidth <= maxWidth.value) {
    currentWidth.value = newWidth
  }
}

const stopResize = () => {
  isResizing.value = false
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', stopResize)
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
}

const handleWindowResize = () => {
  windowWidth.value = window.innerWidth
  // If current width exceeds new max width, adjust it
  if (currentWidth.value > maxWidth.value) {
    currentWidth.value = maxWidth.value
  }
}

onMounted(() => {
  window.addEventListener('resize', handleWindowResize)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', stopResize)
  window.removeEventListener('resize', handleWindowResize)
})
</script>

<template>
  <div 
    ref="panelRef"
    class="relative bg-white border-l border-gray-200 shadow-sm flex flex-col h-full flex-shrink-0"
    :style="{ width: `${currentWidth}px` }"
  >
    <!-- Resize Handle -->
    <div 
      class="absolute left-0 top-0 w-1 h-full cursor-col-resize hover:bg-blue-500 transition-colors"
      @mousedown="startResize"
    ></div>
    
    <!-- Panel Header -->
    <div class="px-4 py-3 border-b border-gray-200 bg-gray-50">
      <h3 class="text-sm font-medium text-gray-900">{{ props.title || 'Debug' }}</h3>
    </div>
    
    <!-- Panel Content -->
    <div class="flex-1 overflow-hidden">
      <slot />
    </div>
  </div>
</template>