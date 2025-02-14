"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
// const client = new Client({
// 	connectionString:
// 		"postgresql://neondb_owner:npg_NOw1g9slBDva@ep-red-fog-a4snnidu-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require",
// });
function createUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client({
            connectionString: "postgresql://neondb_owner:npg_NOw1g9slBDva@ep-red-fog-a4snnidu-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require",
        });
        yield client.connect();
        const result = yield client.query(`
		CREATE TABLE users(
			id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
		);
	`);
        console.log(result);
    });
}
function insertUserData() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client({
            connectionString: "postgresql://neondb_owner:npg_NOw1g9slBDva@ep-red-fog-a4snnidu-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require",
        });
        try {
            yield client.connect();
            const insertQuery = "INSERT INTO users VALUES($1,$2,$3,$4)";
            const values = [3, 'yashraj', 'yashraj@gmail.com', 'passwordd'];
            const res = yield client.query(insertQuery, values);
            console.log('Insertion sucess:', res);
        }
        catch (err) {
            console.error("error during insertion", err);
        }
        finally {
            yield client.end();
        }
    });
}
function getUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client({
            connectionString: "postgresql://neondb_owner:npg_NOw1g9slBDva@ep-red-fog-a4snnidu-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require",
        });
        yield client.connect();
        try {
            const selectQuery = 'SELECT * FROM users WHERE email = $1';
            const result = yield client.query(selectQuery, [email]);
            // const res = await client.query(selectQuery);
            if (result.rows.length > 0) {
                console.log("Error", result.rows[0]);
                return result.rows[0];
            }
            else {
                console.log("No user found");
                return null;
            }
        }
        catch (err) {
            console.error("Error in query", err);
            throw err;
        }
        finally {
            yield client.end();
        }
    });
}
// createUsersTable();
// insertUserData();
getUser("vinay@gmail.com");
