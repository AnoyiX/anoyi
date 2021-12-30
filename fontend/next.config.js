module.exports = {
    async rewrites() {
        return {
            // After checking all Next.js pages (including dynamic routes)
            // and static files we proxy any other requests
            fallback: [
                {
                    source: '/:api*',
                    destination: `https://anoyi.com/:api*`,
                },
            ],
        }

    },
}