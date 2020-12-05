
module.exports = {
    PORT : process.env.PORT || 3000,
    DB : process.env.DB || 'mongodb://localhost:27017/crud-pacientes',
    NODE_ENV : process.env.NODE_ENV || 'development'
}