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
  <div class="p-4">
    <h1 class="text-2xl flex items-center  space-x-2 font-bold mb-4">
      <NuxtLink to="/"><House /></NuxtLink>&nbsp;   » Test Cases
    </h1>
    <ul>
      <li v-for="test in testRoutes" :key="test.path">
        <NuxtLink :to="test.path" class="text-blue-500 hover:underline">
          {{ test.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template> 