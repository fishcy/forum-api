module.exports = {
  apps: [{
    name: 'forum-api',
    script: 'src/app.ts',
    env_production: {
      "NODE_ENV": "production"
    }
  }],

  deploy: {
    production: {
      user: 'root',
      host: '8.138.84.175',
      ref: 'origin/main',
      repo: 'https://github.com/fishcy/forum-api.git',
      path: '/home',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
