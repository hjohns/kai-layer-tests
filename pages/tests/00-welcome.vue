
<template>
    <TestPanel heading="Tests" description="Test pages area">
        <p>These test pages are a simple way to test, build and demonstrate functionality in isolation.</p>

        <h2 class="text-lg font-bold mt-4">Helper Test Components</h2>

        <h3 class="text-lg font-bold mt-4">&lt;Test Matrix&gt;</h3>
        
        <TestMatrix
            :data="{
                header: 'Feature 01',
                items: [
                    { item: 'Test 1', status: 'pass', links: [{ title: 'Test 1A', link: '/tests/01-test-a' }, { title: 'Test 1B', link: '/tests/01-test-b' }] },
                    { item: 'Test 2', status: 'fail', links: [{ title: 'Test 2A', link: '/tests/02-test-a' }, { title: 'Test 2B', link: '/tests/02-test-b' }] },
                ]
            }"
        />
        
    </TestPanel>
</template>
