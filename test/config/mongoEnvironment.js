const MongoClient = require("mongodb").MongoClient
const NodeEnvironment = require("jest-environment-node")
module.exports = class MongoEnvironment extends NodeEnvironment {
  async setup() {
    if (!this.global.mflixClient) {
      this.global.mflixClient = await MongoClient.connect(
        process.env.MFLIX_DB_URI,
        // Done: Connection Pooling
        // Set the connection pool size to 50 for the testing environment.
        // Done: Timeouts
        // Set the write timeout limit to 2500 milliseconds for the testing environment.
        {
          poolSize: 50,
          wtimeout: 2500,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      )
      await super.setup()
    }
  }

  async teardown() {
    await this.global.mflixClient.close()
    await super.teardown()
  }

  runScript(script) {
    return super.runScript(script)
  }
}
