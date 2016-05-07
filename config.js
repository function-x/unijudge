var configure = {
    Name: 'UniJudge',
    Session: {
        Secret: 'UNIJUDGE_SECRET_KEY',
        Key: 'UniJudgeID',
    },
    // The database URL
    MongoDBURL: 'mongodb://localhost/unijudge',
    // The first administrator in the system
    Root: {
        Username: 'admin',
        Password: 'password'
    },
    // Advanced Configure
    PasswordAlgorithm: 'sha1',
}

module.exports = configure;
