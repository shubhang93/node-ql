import NodeQl from "./lib/converter";
import * as mySql from "mysql";

var conn = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'nodeql',
    connectionLimit: 10
})

var Nql = new NodeQl({
    filePath: './lib/sample.sql',
    connection: conn,
    sqlExecutorFn: 'query',
    promisifyResult: true
})


Nql.getAllProducts({id: 1, name: "P1"}).then(r => console.log({r}))