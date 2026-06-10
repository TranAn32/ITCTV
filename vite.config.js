import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/public.css',
                'resources/css/portal.css',
                'resources/js/public.js',
                'resources/js/portal.js',
            ],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
            '~admin-lte': path.resolve(__dirname, 'node_modules/admin-lte'),
            '~bootstrap-icons': path.resolve(__dirname, 'node_modules/bootstrap-icons'),
        },
    },
});
