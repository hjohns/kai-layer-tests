<script setup lang="ts">
import { computed } from 'vue';

const { logs, clearLogs } = useLog();

const props = defineProps<{
    show?: boolean
}>()

const logCount = computed(() => logs.value.length);
</script>

<template>
    <div class="log-viewer overflow-y-auto h-full p-2 bg-gray-100 dark:bg-gray-800 text-xs font-mono">
        <div class="flex justify-between items-center mb-2">
            <span class="text-gray-500 dark:text-gray-400">Count: {{ logCount }}</span>
            <button @click="clearLogs" class="bg-red-500 text-white px-2 py-1 rounded">Clear Logs</button>
        </div>
        <div v-for="log in logs" :key="log.id" class="log-entry mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
            <div v-if="log.timestamp" class="text-gray-500 dark:text-gray-400 text-xs mb-1">
                {{ log.timestamp.toLocaleTimeString() }}
            </div>
            <div class="log-message">
                <template v-if="typeof log.message === 'string'">
                    <p class="text-gray-800 dark:text-gray-200">{{ log.message }}</p>
                </template>
                <template v-else>
                    <LogJSON :data="log.message" :depth="0" />
                </template>
            </div>
        </div>
        <div v-if="logs.length === 0" class="text-gray-500 text-center p-4">
            No log entries.
        </div>
    </div>
</template>
