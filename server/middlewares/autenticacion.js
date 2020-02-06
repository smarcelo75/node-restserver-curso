const jwt = require('jsonwebtoken');

// ===================================
// Verificar Token
// ===================================

let verificaToken = (req, res, next) => {
    // acceso al header del request para obtener el token
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            // status 401: no autorizado
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        // decoded: obtiene el payload con el usuario logueado
        req.usuario = decoded.usuario;
        next();
    });
};

// ===================================
// Verificar Admin_Role
// ===================================

let verificaAdminRole = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.status(412).json({
            ok: false,
            err: {
                message: 'Rol no válido para esta operación'
            }
        });
    }
};

module.exports = {
    verificaToken,
    verificaAdminRole
}