export const config = {
  client: 'sqlite3',
  connection: {
    // filename: './src/database/sqlite.db',
    filename: '/mnt/c/dev/db/database.db', // caminho absoluto para o banco de dados, necessário para o WSL acessar o arquivo do Windows
  },
  useNullAsDefault: true,
  migrations: {
    extensions: 'ts',
    directory: './src/database/migrations',
  },
};
