exports.plugin = {
    pkg: require('../../package.json'),
    name: 'loginRouter',
    register: (server, options) => {
        const Controllers = {
            auth: {
                login: require("../controllers/api/auth/login"),
            }
        };
        server.route([
            {
                method: 'POST',
                path: '/api/login',
                config: Controllers.auth.login.beginAuth
            },
        ]);
    }
};
//# sourceMappingURL=auth.js.map