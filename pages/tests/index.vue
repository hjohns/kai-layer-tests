<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

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
  <div class="container mx-auto pt-12">
    <h1 class="text-3xl font-bold mb-4">
      Test Cases
    </h1>
    <hr class="my-4" />
    <ul>
      <li class="mb-2" v-for="test in testRoutes" :key="test.path">
        <NuxtLink :to="test.path" class="text-blue-500 hover:underline">
          {{ test.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template> 