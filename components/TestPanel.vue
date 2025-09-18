<script setup lang="ts">
import { ChevronLeft, FileText } from 'lucide-vue-next'

const props = defineProps<{
    heading?: string
    description?: string
    slot?: string
    actions?: Array<{
        name: string
        click: () => void
    }>
}>()

const showLogs = ref(true)
</script>

<template>
  <NuxtLayout name="tests">
  <div class="flex h-screen">
    <!-- Left Panel (TestPanel content) -->
    <div 
      class="flex-1 bg-white border-r border-gray-200 shadow-sm flex flex-col min-w-0"
      :class="props.slot === 'panel-end' ? 'border-l border-r-0' : ''"
    >
      <div 
        v-if="props.heading !== ''" 
        class="px-4 py-3 border-b border-gray-200 bg-gray-50"
      >
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-medium text-gray-900">
              <NuxtLink to="/tests" class="inline-flex items-center hover:text-blue-600 transition-colors">
                <ChevronLeft class="w-4 h-4 mr-1 text-gray-900 hover:text-blue-600" style="transform: translateY(3px);" />
              </NuxtLink> {{ props.heading || 'Panel' }}
            </h3>
            <div v-if="description" class="text-sm text-gray-600 mt-1">{{ description }}</div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-600 font-medium">Logs</span>
            <button
              @click="showLogs = !showLogs"
              :class="[
                'p-2 rounded text-sm transition-colors',
                showLogs ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              ]"
              :title="showLogs ? 'Hide Logs' : 'Show Logs'"
            >
              <FileText class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div class="flex-1 p-4">
        <slot />
        
        <div v-if="actions && actions.length > 0" class="flex gap-2 mt-4">
          <button
            v-for="action in actions"
            :key="action.name"
            @click="action.click"
            class="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            {{ action.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- Right Panel (Resizable Log Panel) - only show when showLogs is true -->
    <ResizablePanel v-if="showLogs" :default-width="400" :min-width="300" title="Debug">
      <slot v-if="$slots.inputs" name="panel">
        <div class="flex-1 space-y-2 p-4 overflow-auto">
            <div class="pb-0 mb-2 text-md font-bold text-gray-900">Inputs</div>
            <slot name="inputs" />
        </div>
        <div class="flex-1 border-t overflow-auto">
          <slot name="log">
            <Log />
          </slot>
        </div>
      </slot>
      <template v-else>
        <div class="h-full">
          <Log />
        </div>
      </template>
    </ResizablePanel>
  </div>
  </NuxtLayout>
</template>
