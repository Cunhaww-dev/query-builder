import knexConfig from 'knex';
import { config } from '../../knexfile'; // importação do arquivo de configuração do knex

export const knex = knexConfig(config); // Carregando em knex o arquivo de configuração de conexão com o nosso banco.
