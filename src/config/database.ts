import { ConnectionOptions } from "typeorm";
import { db } from './env'
import { Store} from '../models'
const config: ConnectionOptions = {
  type: "mysql",
  host: db.host,
  port: db.port,
  username: db.username,
  password: db.password,
  database: db.database,
  entities: [ Store],
  synchronize: true,
};

export default config;