import { Client } from "pg";

// const client = new Client({
// 	connectionString:
// 		"postgresql://neondb_owner:npg_NOw1g9slBDva@ep-red-fog-a4snnidu-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require",
// });

async function createUsersTable() {
	const client = new Client({
	connectionString:
		"postgresql://neondb_owner:npg_NOw1g9slBDva@ep-red-fog-a4snnidu-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require",
	});

	await client.connect()
	const result = await client.query(`
		CREATE TABLE users(
			id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
		);
	`);
	console.log(result);
}

async function insertUserData(){
		const client = new Client({
		connectionString:
			"postgresql://neondb_owner:npg_NOw1g9slBDva@ep-red-fog-a4snnidu-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require",
	});

	try{
			await client.connect();

			const insertQuery = "INSERT INTO users VALUES($1,$2,$3,$4)";
			const values = [3,'yashraj','yashraj@gmail.com','passwordd'];

			const res = await client.query(insertQuery, values);
			console.log('Insertion sucess:',res);
	}catch(err){
		console.error("error during insertion",err);
	}finally{
		await client.end();
	}
}

async function getUser(email:string){
	const client = new Client({
		connectionString : "postgresql://neondb_owner:npg_NOw1g9slBDva@ep-red-fog-a4snnidu-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require",
	});
	
	await client.connect();

	try{
		const selectQuery = 'SELECT * FROM users WHERE email = $1';
		const result = await client.query(selectQuery, [email]);

		// const res = await client.query(selectQuery);
		if(result.rows.length > 0){
			console.log("Error",result.rows[0]);
			return result.rows[0];
		}else{
			console.log("No user found");
			return null;
		}
	}catch(err){
		console.error("Error in query",err);
		throw err;
	}finally{
		await client.end();
	}
}

// createUsersTable();
// insertUserData();
getUser("vinay@gmail.com");


  