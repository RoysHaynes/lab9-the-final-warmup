import { defineConfig } from 'vitest/config';

export default defineConfig({
    root:'./src',
    base: '/',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true,
    },
    test: {
        globals:true,
        environment: 'jsdom',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html'],
            exclude: ['node_modules/', 'tests/e2e/']
        },
        exclude: [
            'node_modules',
            'dist',
            'e2e',
            '**/*.e2e.*',
            '**/playwright.config.*',
            '**/tests/e2e/**'
        ]
    }
});