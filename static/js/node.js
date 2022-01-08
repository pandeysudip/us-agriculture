const { MongoClient } = require('mongodb')

async function main() {
    const uri = "mongodb://localhost:27017";

    const client = new MongoClient(uri);
    try {
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        console.error(e);

    } finally {
        await client.close()
    }
}

main().catch(console.error)


async function listDatabases(client) {
    const databasesList = client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(`-${db.name}`);
    })
}