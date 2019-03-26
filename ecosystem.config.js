module.exports = {
  apps : [
  	{
	    name: 'login',
	    script: "./login/server.js",

	    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
	    args: '',
	    instances: 1,
	    autorestart: true,
	    watch: false,
	    max_memory_restart: '1G',
	    env: {
	      NODE_ENV: 'development'
	    },
	    env_production: {
	      NODE_ENV: 'production'
	    }
  	},
  	{
  		name: 'activate',
  		script: './activate/server.js',

  		// Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
  		args: '',
  		instances: 1,
  		autorestart: true,
  		watch: false,
  		max_memory_restart: '1G',
  		env: {
  		  NODE_ENV: 'development'
  		},
  		env_production: {
  		  NODE_ENV: 'production'
  		}
  	},
  	{
  		name: 'general',
  		script: './general/server.js',

  		// Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
  		args: '',
  		instances: 1,
  		autorestart: true,
  		watch: false,
  		max_memory_restart: '1G',
  		env: {
  		  NODE_ENV: 'development'
  		},
  		env_production: {
  		  NODE_ENV: 'production'
  		}
  	},
  	{
  		name: 'general-usertest',
  		script: './general-usertest/server.js',

  		// Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
  		args: '',
  		instances: 1,
  		autorestart: true,
  		watch: false,
  		max_memory_restart: '1G',
  		env: {
  		  NODE_ENV: 'development'
  		},
  		env_production: {
  		  NODE_ENV: 'production'
  		}
  	},
  	{
  		name: 'oles',
  		script: './oles/server.js',

  		// Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
  		args: '',
  		instances: 1,
  		autorestart: true,
  		watch: false,
  		max_memory_restart: '1G',
  		env: {
  		  NODE_ENV: 'development'
  		},
  		env_production: {
  		  NODE_ENV: 'production'
  		}
  	}
  ],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
