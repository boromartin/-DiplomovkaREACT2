const express = require('express')
const app = express()
const cors = require('cors')
const mqtt = require('mqtt')
const util = require('util');

app.use(cors());
app.use(express.json());


async function getOnlineDevices (conn) {
    let [rows, fields] = await conn.query('SELECT DeviceID, DataTableName FROM `ONLINE_DEVICE_LIST`');
    return rows;
}

async function getOnlineDevicesData (conn, device, ageLimit) {
    let [rows, fields] = await conn.query('SELECT * FROM ' + device["DataTableName"] + ' WHERE Time > now() - INTERVAL ' + ageLimit + ' minute AND DeviceID="' + device["DeviceID"] + '";');
    return rows;
}


async function example1 (ageLimit, res) {
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({user: "root", host: "192.168.1.10", port: 3306, password: "123456", database: "SmartRoomData"});

    const compiledData = {}
    const onlineDevices = await getOnlineDevices(conn)

    for (const element of onlineDevices) {
        compiledData[element["DeviceID"]] = await getOnlineDevicesData(conn, element, ageLimit)
    };

    res.send(compiledData)
    conn.end()
}


app.listen(6969, () => {
    console.log("server running at 3001");

});

app.get("/getChartData", (req, res) => {
    //get online device types 
    example1(req.query.age, res)
    
    //res.send(onlineDevices)
})
    



