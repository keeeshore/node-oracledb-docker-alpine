
const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

console.log('<<<<<--- ', process.platform, ':', process.arch, ' ---->>>>');

let clientOpts = {};
if (process.platform === 'win32') {                                   // Windows
    clientOpts = { libDir: 'C:\\workspace\\oracle-node-alpine-docker\\instantclient-basic-windows.x64-23.5.0.24.07\\instantclient_23_5' };
} else if (process.platform === 'darwin' && process.arch === 'x64') { // macOS Intel
    clientOpts = { libDir: process.env.HOME + '/Downloads/instantclient_19_8' };
}

const delay = ms => new Promise(res => setTimeout(res, ms));

// docker run -d --name oracle -p 1521:1521 -e ORACLE_PASSWORD=password123 ORACLE_PWD=password123 -v oracle-volume:/opt/oracle/oradata container-registry.oracle.com/database/free:latest


async function run() 
{
    console.log("--------- initOracleClient .......... ", clientOpts);
    oracledb.initOracleClient(clientOpts);
    console.log("run .......... ");
    try {
        const connection = await oracledb.getConnection ({
            user          : "system",
            password      : "password123",
            connectString : "localhost:1521/FREEPDB1"
        });
    
        console.log("connection  .......... SUCCESSFUL!! ");
    } catch (err) {
        console.error('Err :::: ', err);
    }
    console.log("connection  .......... delaying ");
    await delay(100000); // 1 min
    console.log("connection  .......... daly done ");
    await connection.close();
}

run();


