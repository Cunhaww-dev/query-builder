export default {
  client: 'sqlite3',
  connection: {
    // filename: './src/database/db.sqlite',
    filename: '/mnt/c/dev/db/db.sqlite', // caminho absoluto para o banco de dados, necessário para o WSL acessar o arquivo do Windows
  },
  useNullAsDefault: true,
  migrations: {
    extensions: 'ts',
    directory: './src/database/migrations',
  },
};
