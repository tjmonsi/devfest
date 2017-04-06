// See http://brunch.io for documentation.
const stylesheets = {joinTo: {'app.css': 'app/styles.css'}};
const javascripts = {joinTo: {'app.js': [
  /^app\/scripts/
]}};
const config = require('./config/app');

exports.files = {
  javascripts: javascripts,
  stylesheets: stylesheets
};

exports.paths = {
  watched: ['app', 'images', 'config', 'src']
}

exports.conventions = {
  ignored: [/\/_/, /^config/, /vendor\/(node|j?ruby-.+|bundle)\//, /^src\/bower_components/]
};

exports.plugins = {
  copycat: {
    "bower_components": ["src/bower_components"],
    "project_components": ["src/project_components"],
    "page_components": ["src/page_components"],
    "images": ["images"],
    verbose: false,
    onlyChanged: true
  },
  sass: {
    mode: 'native',
    options: {
      // includePaths: ['project_components']
    },
    debug: 'comments',
    precision: 8,
    allowCache: true
  },
  static: {
    processors: [
      require('html-brunch-static')({
        processors: [
          require('./additional_plugins/sass-brunch-static')(),
          require('./additional_plugins/json-brunch-static')(),
          require('./additional_plugins/js-brunch-static')()
        ],
        defaultContext: config[config.builds.dev],
        handlebars: {
          enableProcessor: true,
          helpers: {
            wrapper: function(index, wrap, options) {
              if(!(index%wrap)) {
                return options.fn(this);
              }
              return options.inverse(this);
            }
          }
        }
      })
    ]
  }
}
