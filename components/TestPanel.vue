<script setup lang="ts">

const props = defineProps<{
    heading?: string
    description?: string
    actions?: Array<{
        name: string
        click: () => void
    }>
}>()

const showLogs = ref(true)

</script>

<template>
  <NuxtLayout name="tests">
  <div class="flex gap-4 w-full">
    <div :class="showLogs ? 'flex-1' : 'w-full'">
      <div class="bg-blue-200 rounded border border-t-0 rounded-t-none border-t-blue-500 p-4 ml-4 mr-4">
          <div class="flex items-center justify-between">
            <div>
              <slot name="heading"><div v-if="heading" class="font-semibold text-black"><NuxtLink :to="'../tests'"><LucideArrowLeft class="text-decoration-none no-underline w-4 h-4 inline-block mr-2" /> </NuxtLink> {{ heading }}</div></slot>
              <slot name="description"><div v-if="description" class="text-sm text-black">{{ description }}</div></slot>
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
                <LucideFileText class="w-4 h-4" />
              </button>
            </div>
          </div>
      </div>
      
      <div class="bg-white p-4">
        <div class="ml-10 mr-10 mb-4">
          <slot />
        </div>
        
        <div v-if="actions && actions.length > 0" class="flex gap-2">
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

    <!-- Logs Panel - show when showLogs is true -->
    <div v-if="showLogs" class="w-80 bg-white border">
      <div class="p-2 border-b">
        <h4 class="font-medium text-sm">Logs</h4>
      </div>
      <div class="h-96">
        <Log />
      </div>
    </div>
  </div>
  </NuxtLayout>
</template>
