<script setup lang="ts">
import { cn } from '@/lib/utils'

type TestStatus = 'pass' | 'fail' | 'pending' | 'skip' | 'disabled'

interface TestLink {
  title?: string
  link: string
}

interface TestItem {
  item: string
  status: TestStatus
  links?: TestLink[]
}

interface TestMatrixData {
  header: string
  items: TestItem[]
}

const props = defineProps<{
  data: TestMatrixData
  title?: string
  class?: string
}>()

// Helper function to get title from link if title is undefined
const getTitle = (link: TestLink): string => {
  if (link.title) {
    return link.title
  }
  // Extract the last part of the link as title
  const parts = link.link.split('/').filter(part => part.length > 0)
  return parts[parts.length - 1] || link.link
}

// Helper function to get status variant for styling
const getStatusVariant = (status: TestStatus): string => {
  if (status === 'pass') {
    return 'bg-green-100 text-green-800 border-green-200'
  }
  if (status === 'fail') {
    return 'bg-red-100 text-red-800 border-red-200'
  }
  if (status === 'pending') {
    return 'bg-yellow-100 text-yellow-800 border-yellow-200'
  }
  if (status === 'skip') {
    return 'bg-gray-100 text-gray-600 border-gray-200'
  }
  return 'bg-blue-100 text-blue-800 border-blue-200'
}
</script>

<template>
  <div :class="cn('w-full', props.class)">
    <!-- Optional Title -->
    <h3 v-if="props.title" class="text-lg font-bold mt-4 mb-2">
      &lt;{{ props.title }}&gt;
    </h3>
    
    <!-- Table -->
    <div class="overflow-hidden rounded-lg border border-gray-200">
      <table class="w-full border-collapse">
      <!-- Header -->
      <thead>
        <tr class="bg-blue-50">
          <th 
            colspan="3" 
            class="px-6 py-4 text-left text-sm font-semibold text-blue-900 border-b border-blue-200"
          >
            {{ data.header }}
          </th>
        </tr>
      </thead>
      
      <!-- Table Body -->
      <tbody class="divide-y divide-gray-200">
        <tr 
          v-for="(item, index) in data.items" 
          :key="index"
          class="hover:bg-gray-50 transition-colors"
        >
          <!-- Item Column -->
          <td class="px-6 py-4 text-sm font-medium text-gray-900">
            {{ item.item }}
          </td>
          
          <!-- Status Column -->
          <td class="px-6 py-4 text-sm">
            <span 
              :class="cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
                getStatusVariant(item.status)
              )"
            >
              {{ item.status.charAt(0).toUpperCase() + item.status.slice(1) || 'Pending' }}
            </span>
          </td>
          
          <!-- Links Column -->
          <td class="px-6 py-4 text-sm">
            <div v-if="item.links && item.links.length > 0" class="flex flex-wrap items-center gap-2">
              <template v-for="(link, linkIndex) in item.links" :key="linkIndex">
                <NuxtLink 
                  :to="link.link"
                  class="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                  {{ getTitle(link) }}
                </NuxtLink>
                <span v-if="linkIndex < item.links!.length - 1" class="text-gray-400">|</span>
              </template>
            </div>
            <span v-else class="text-gray-500">
              No links available
            </span>
          </td>
        </tr>
      </tbody>
      </table>
    </div>
  </div>
</template>
