const config = {
  client: 'sqlite3',
  connection: {
    // filename: './src/database/sqlite.db',
    filename: '/mnt/c/dev/db/database.db', // caminho absoluto para o banco de dados, necessário para o WSL acessar o arquivo do Windows
  },
  pool: {
    afterCreate: (connection: any, done: any) => {
      connection.run('PRAGMA foreign_keys = ON'); // Habilitando o suporte a chaves estrangeiras no SQLite, garantindo que as relações entre as tabelas sejam respeitadas.
      done();
    },
  },
  useNullAsDefault: true,
  migrations: {
    extensions: 'ts',
    directory: './src/database/migrations',
  },
  seeds: {
    extensions: 'ts',
    directory: './src/database/seeds',
  },
};

export default config;
