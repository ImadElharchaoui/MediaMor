import {HOSTNAME, HOSTUSER, HOSTPASS, HOSTDB } from "./config.js"
import mysql from "mysql"

export const connection = mysql.createConnection({
    host : HOSTNAME,
    user : HOSTUSER,
    password : HOSTPASS,
    database : HOSTDB
})

