// env-variable-manager.js

const fs = require('fs');

class EnvVariableManager {
  constructor(path = './.env') {
    this.path = path;
  }

  get(key) {
    const env = this._parseEnv();
    return env[key];
  }

  set(key, value) {
    const env = this._parseEnv();
    env[key] = value;
    this._writeEnv(env);
  }

  _parseEnv() {
    const env = {};

    const data = fs.readFileSync(this.path, { encoding: 'utf-8' });
    const lines = data.split('\n');

    for (let line of lines) {
      line = line.trim();
      if (line && !line.startsWith('#')) {
        const [key, value] = line.split('=');
        env[key] = value;
      }
    }

    return env;
  }

  _writeEnv(env) {
    const lines = [];

    for (let [key, value] of Object.entries(env)) {
      lines.push(`${key}=${value}`);
    }

    const data = lines.join('\n');
    fs.writeFileSync(this.path, data);
  }
}

module.exports = {
  EnvVariableManager
};
