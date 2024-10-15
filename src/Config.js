export let Config = {
  db: {
    provider: 'Oracle23ai',
    user: process.env.OCI_ADB_USER,
    password: process.env.OCI_ADB_PASSWORD,
    url: process.env.OCI_ADB_CONNECTION_STRING,
    poolmax: 10,
    poolmin: 10
  }
}
