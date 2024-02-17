module.exports = {
  apps: [{
    name: 'forum-api',
    script: './node_modules/.bin/ts-node',
    args: '-T -r tsconfig-paths/register ./src/app.ts',
    exec_mode: 'cluster',
    env_production: {
      NODE_ENV: "prod",
      ASSETS_URL: 'http://fishcy.top/img',
      PORT: 1024
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
