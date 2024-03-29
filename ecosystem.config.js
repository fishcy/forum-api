module.exports = {
  apps: [{
    name: 'forum-api',
    script: './src/app.ts',
    interpreter: "./node_modules/.bin/ts-node",
    interpreter_args: '-r ts-node/register -r tsconfig-paths/register',
    exec_mode: 'cluster',
    env_production: {
      NODE_ENV: "prod",
    }
  }],

  deploy: {
    production: {
      user: 'root',
      host: '8.138.84.175',
      ref: 'origin/main',
      repo: 'https://github.com/fishcy/forum-api.git',
      path: '/home',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js --env production',
    }
  }
};
