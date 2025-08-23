

// .lighthouserc.js
module.exports = {
    ci: {
        collect: {
            startServerCommand: 'npm run build && npm run preview',
            url: ['http://localhost:4173'],
        },
        assert: {
            assertions: {
                'categories:performance': ['error', { minScore: 0.90 }],
                'categories:accessibility': ['error', { minScore: 0.90 }],
                'categories:best-practices': ['error', { minScore: 0.90 }],
                'categories:seo': ['error', { minScore: 0.90 }],
            },
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
};
