module.exports = {
  apps: [
    {
      name: "Fork Server 8081",
      script: "./src/index.js",
      instances: "1",
      exec_mode: "fork",
      watch: "true",
      autorestart: true,
      args: '--puerto=8081'
    },
    {
      name: "Cluster Server 8082",
      script: "./src/index.js",
      instances: "1",
      exec_mode: "cluster",
      watch: "true",
      autorestart: true,
      args: '--puerto=8082'
    },
  ],
};
