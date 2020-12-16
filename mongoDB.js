const { MongoClient } = require("mongodb");
const dbURL = "mongodb://localhost:27017/";
const client = new MongoClient(dbURL, { useUnifiedTopology: true });

mongoDbObject = {
  allValues: [],
  async connect() {
    try {
      // Connect the client to the server
      await client.connect();
      const database = client.db("specifications");
      // Establish and verify connection
      await database.command({ ping: 1 });
      console.log("Connected successfully to server");
      const general = database.collection("general");
      const cursor = await general.find({ specification: /^AMS/ });
      // console.log(general);
      if ((await cursor.count()) === 0) {
        console.log("No documents found!");
      }
      //   let counter = 10;
      this.allValues = await cursor.toArray();
      // await cursor.forEach((spec) => {
      //   console.log(spec);
      //   // saveToDb(spec.specification);

      //   // console.log(spec.specification);
      // });
      // let chunckedArray = chunk(allValues, counter);
      //   for (let i = 0; i < 500; i++) {
      //     if (i % 10 === 0) {
      //       await wait(20000);
      //     }
      //     saveToDb(allValues[i].specification, allValues[i].revision);
      //   }
    } finally {
      // Ensures that the client will close when you finish/error
      //   await csvWriter.writeRecords(records);
      console.log(`succsesfully got ${this.allValues.length} specs`);
      await client.close();
    }
    return this.allValues;
  },
};

module.exports = mongoDbObject;
