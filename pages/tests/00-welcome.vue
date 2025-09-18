<script setup lang="ts">

const { addLog } = useLog();
const exampleCode = 
`<template>
  <TestPanel heading="My Test" description="A new test case">
    <p>These test pages are a simple way to test, build and demonstrate functionality in isolation.</p>
    <h2 class="text-lg font-bold mt-4">Helper Test Components</h2>
    <Button @click="()=>addLog('I was clicked', {obj: 123})">Click me</Button>
  </TestPanel>
</template>`

</script>


<template>
    <TestPanel heading="Tests" description="Test pages area">
        <p>These test pages are a simple way to test, build and demonstrate functionality in isolation.</p>

        <h3 class="text-lg font-bold mt-4">Createing a new test case</h3>

        <TestCode :code="`md pages/tests/FEAT-0n-testname.vue\n(your new test will appear under /tests path automatically)`" />

        <h3 class="text-lg font-bold mt-4">Example Code</h3>

        <TestCode :code="exampleCode" />
    

        <h3 class="text-lg font-bold mt-4">Using the log panel</h3>

        <TestCode :code="`const { addLog } = useLog();\naddLog('I was clicked', {obj: 123});`" />

        <Button @click="()=>addLog('I was clicked', {obj: 123})">Click me</Button>

    </TestPanel>
</template>

