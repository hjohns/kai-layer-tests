<template>
  <div :style="{ marginLeft: `${depth * 1}rem` }">
    <div class="flex items-center cursor-pointer group" @click="toggleOpen">
      <!-- Expander Icon -->
      <span v-if="isExpandable" class="w-4 mr-1 text-gray-500 dark:text-gray-400 group-hover:text-gray-700">
        {{ isOpen ? '▼' : '▶' }}
      </span>
      <span v-else class="w-4 mr-1"></span> <!-- Placeholder for alignment -->

      <!-- Key (if applicable) -->
      <span v-if="nodeKey" class="text-red-600 mr-1">"{{ nodeKey }}":</span>
      
      <!-- Value / Type Indicator -->
      <span v-if="isExpandable" class="text-gray-500 dark:text-gray-400">
        {{ getTypeIndicator() }}
        <span v-if="!isOpen" class="ml-1 text-gray-600 dark:text-gray-700">...</span>
      </span>
      <span v-else :class="getValueClass()">
        {{ displayValue }}
      </span>
    </div>

    <!-- Children (if open and expandable) -->
    <div v-if="isOpen && isExpandable" class="mt-1">
      <LogJSON 
        v-for="(childValue, childKey) in filteredData" 
        :key="childKey" 
        :node-key="Array.isArray(filteredData) ? undefined : childKey.toString()" 
        :data="childValue" 
        :depth="depth + 1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = withDefaults(defineProps<{
  nodeKey?: string | number;
  data?: any;
  depth?: number;
}>(), {
  depth: 0
});

const isOpen = ref(props.depth < 1);

const isExpandable = computed(() => {

  if (typeof props.data !== 'object' || props.data === null || props.data === undefined) return false;
  const data = JSON.parse(JSON.stringify(props.data));

  if (Array.isArray(data)) {
    return data.some(item => typeof item !== 'function');
  }
  return Object.values(data).some(value => typeof value !== 'function');
});

const filteredData = computed(() => {
  if (typeof props.data !== 'object' || props.data === null || props.data === undefined) {
    return props.data;
  }

  const data = JSON.parse(JSON.stringify(props.data));

  if (Array.isArray(data)) {
    return data.filter(item => typeof item !== 'function');
  }

  const filtered: Record<string | number, any> = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      if (typeof data[key] !== 'function') {
        filtered[key] = data[key];
      }
    }
  }
  return filtered;
});

const toggleOpen = () => {
  if (isExpandable.value) {
    isOpen.value = !isOpen.value;
  }
};

const getTypeIndicator = () => {
  const dataToCount = filteredData.value;
  if (Array.isArray(dataToCount)) {
    return `Array(${dataToCount.length})`;
  } else if (typeof dataToCount === 'object' && dataToCount !== null) {
    return `Object(${Object.keys(dataToCount).length})`;
  }
  return '';
};

const displayValue = computed(() => {
  if (props.data === null) return 'null';
  if (typeof props.data === 'string') return `"${props.data}"`;
  if (typeof props.data === 'undefined') return 'undefined';
  if (typeof props.data === 'function') return 'Function'; 
  return props.data.toString();
});

const getValueClass = () => {
  const type = typeof props.data;
  if (props.data === null) return 'text-gray-600';
  if (type === 'string') return 'text-green-600';
  if (type === 'number') return 'text-blue-600';
  if (type === 'boolean') return 'text-purple-600';
  if (type === 'undefined') return 'text-gray-600 italic';
  return 'text-black';
};
</script> 