# appconfig

Load topic-specific json files from the `config` folder. Default settings are put in the root object, and environment-specific settings overwrite them based on `NODE_ENV`.

```json
// config/redis.json

{
  "url": "redis://localhost:6379",

  "staging": {
    "url": "redis://user:password@some.really.long.thing:8273/2"
  },

  "production": {
    "url": "redis://user:password@some.other.long.url:2983/1"
  }
}
```

Depending on the environment (default to "development"), the correct url will be fetched. Default values are put in the root config object like above.

```javascript
// lib/redis.js

var config = require('appconfig').redis
var client = createClient(config.url)
```

That's it. As long as the config folder is in the root of your project, it will load properly.

### caveats

* You need to put the json in the config folder.

* You can't use environment variables in the json.

There are hundreds of configuration packages for node. This is just one approach.

### install

```
$ npm install aj0strow/appconfig --save
```

Put json in the config folder. Here's an example app structure, where config is available in every js file.

```
config/
  redis.json
  mongo.json
server/
  middleware/
    auth.js
  app.js
index.js
```

### notes

This package searches for the main module (your app) and then finds the config folder. If you use `appconfig` in dependent packages, it will load configuration for the main application package.

You can provide `appconfig` as an option in dependent packages, in an effort to bring more convention over configuration to the node ecosystem.

```javascript
var config = {}
try {
  config = require('appconfig')
} catch (error) {
  console.warn('no config folder')
}
```

License: **MIT**
