const jwt = require("jsonwebtoken");

module.exports = (rolesArr) => {
    return (req, res, next) => {
        try {
            const { roles } = req.user;

            let hasRole = false;
            roles.forEach((role) => {
                if (rolesArr.includes(role)) {
                    hasRole = true;
                }
            });

            console.log(hasRole);

            if (!hasRole) {
                res.status(403);
                throw new Error("Forbidden");
            }

            next();
        } catch (error) {
            res.status(403).json({ code: 403, error: error.message });
        }
    };
};

// {
//     friends: [ 'maria', 'kocty', 'vetal' ],
//     id: '64ea01eb1e2851587dadb181',
//     roles: [ 'ADMIN' ],
//     iat: 1693057744,
//     exp: 1693086544
//   }
