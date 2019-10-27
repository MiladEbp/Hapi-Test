exports.plugin = {
    pkg: require('../../package.json'),
    name : 'loginRouter',
    register: (server:any, options:any)=>{
        const Controllers = {
            auth:{
                login: require("../controllers/api/auth/login"),
                // confirm: require("../controllers/api/auth/confirm")
            }
        };// controllers.

        server.route([
            {
                method: 'POST',
                path : '/api/login',
                config: Controllers.auth.login.beginAuth
            },
            // {
            //     method: 'POST',
            //     path: '/api/confirm',
            //     config: Controllers.auth.confirm.confirmAuth
            // }
        ])
    }
};