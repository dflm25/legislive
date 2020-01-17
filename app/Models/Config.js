const Env = use('Env')

const config = {
    connection: 'mongodb',
    mongodb: {
      client: 'mongodb',
      connectionString: 'mongo://username:password@localhost/my_database',
      connection: {
        host: Env.get('MONGO_HOST', 'localhost'),
        port: Env.get('MONGO_PORT', '27017'),
        username: Env.get('MONGO_USER', 'admin'),
        password: Env.get('MONGO_PASS', ''),
        database: Env.get('MONGO_DB', 'adonis'),
        options: {
        
        }
      }
    }
}