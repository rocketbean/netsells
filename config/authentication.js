module.exports = {
    default  : 'jwt',
    gateway  : {
        api: {
            driver: 'jwt',
            enabled: false,
            sessions: true,
            key: 'Chasi',
            model: 'users',
            AuthRouteExceptions: [
                /**
                 * when enabled, all routes will
                 * Be protected by [JWT]
                 * to excempt some routes,
                 * it should be registered here..
                 */
                {"m": "POST", "url": "/api/login"},
                {"m": "GET", "url": "/api/post"},
            ]
        }
    }
}