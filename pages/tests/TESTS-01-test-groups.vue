<script setup lang="ts">
const { addLog } = useLog();
</script>

<template>
  <TestPanel heading="Test Groups" description="How test organization and grouping works">
    <p>Test files are automatically organized into groups based on their filename prefix. This provides a clean way to categorize and organize your tests.</p>
    
    <h2 class="text-lg font-bold mt-4">How Grouping Works</h2>
    <ul class="list-disc list-inside space-y-2 mt-2">
      <li><strong>Filename Pattern:</strong> Tests are grouped by the first segment before the first hyphen</li>
      <li><strong>Example:</strong> <code class="bg-gray-100 px-1 rounded">SEARCH-01-basic.vue</code> creates a "SEARCH" group</li>
      <li><strong>Display Name:</strong> The remaining segments become the test name (e.g., "01 Basic")</li>
    </ul>

    <h2 class="text-lg font-bold mt-4">Creating Your Own Test Groups</h2>
    <p class="mb-2">To create a new test group, simply create Vue files following this naming pattern:</p>
    <div class="bg-gray-100 p-3 rounded text-sm font-mono space-y-1">
      <div>MYGROUP-01-first-test.vue</div>
      <div>MYGROUP-02-second-test.vue</div>
      <div>API-01-authentication.vue</div>
      <div>API-02-data-fetching.vue</div>
    </div>

    <h2 class="text-lg font-bold mt-4">Special Behavior</h2>
    <p>The TESTS group (this one) is special - it only appears when no other test groups exist. Once you create your own test groups, this instructional group will be automatically hidden.</p>
    
    <h2 class="text-lg font-bold mt-4">Try It Out</h2>
    <Button @click="()=>addLog('Test group functionality working!', {timestamp: new Date().toISOString()})">Log Test Group Info</Button>
  </TestPanel>
</template>