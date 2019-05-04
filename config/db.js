/* eslint camelcase: off */

const HOST = 'localhost'
const PORT = '5433'
const USERNAME = 'admin'
const PASSWORD = 'password'

module.exports = {
  development: {
    database: 'discogs-dev',
    username: USERNAME,
    password: PASSWORD,
    host: HOST,
    port: PORT,
    dialect: 'postgres',
    options: {
      host: HOST,
      port: PORT,
      dialect: 'postgres',
      protocol: 'postgres',
      logging: (msg, query_execution_time) => {
        console.log(msg, `query execution time:${query_execution_time}`)
      },
      benchmark: true,
    },
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
    logging: (msg, query_execution_time) => {
      console.log(msg, `query execution time:${query_execution_time}`)
    },
    options: {
      use_env_variable: 'DATABASE_URL',
      dialect: 'postgres',
      ssl: true,
      protocol: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
        },
      },
      logging: (msg, query_execution_time) => {
        console.log(msg, `query execution time:${query_execution_time}`)
      },
    },
  },
}
