const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  mongodb: {
    url: process.env.MONGO_STRING,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: "changelog",

  // The file extension to create migrations and search for in migration dir
  migrationFileExtension: ".js",

  // Enable the algorithm to create a checksum of the file contents and use that in the comparison to determin
  // if the file should be run.  Requires that scripts are coded to be run multiple times.
  useFileHash: false
};