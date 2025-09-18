<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { House } from 'lucide-vue-next'

const router = useRouter()

const testRoutes = computed(() =>
  router
    .getRoutes()
    .filter(
      (route) => route.path.startsWith('/tests/') && route.path !== '/tests',
    )
    .map((route) => {
      const name = route.path.split('/').pop() || ''
      const title = name
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      return {
        path: route.path,
        name: title,
      }
    })
    .sort((a, b) => a.path.localeCompare(b.path)),
)
</script>

<template>
  <NuxtLayout name="tests">
    <div class="flex h-screen">
      <!-- Main Content Area -->
      <div class="flex-1 bg-white border-r border-gray-200 shadow-sm flex flex-col min-w-0">
        <!-- Header matching TestPanel style -->
        <div class="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h1 class="text-sm font-medium text-gray-900 flex items-center">
            <NuxtLink to="/" class="inline-flex items-center hover:text-blue-600 transition-colors">
              <House class="w-4 h-4 mr-1 text-gray-900 hover:text-blue-600" />
            </NuxtLink>
            Test Cases
          </h1>
          <div class="text-sm text-gray-600 mt-1">Select a test case to run and debug</div>
        </div>
        
        <!-- Content Area -->
        <div class="flex-1 p-4">
          <div class="space-y-2">
            <div v-for="test in testRoutes" :key="test.path" class="group">
              <NuxtLink 
                :to="test.path" 
                class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded transition-colors"
              >
                {{ test.name }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template> 