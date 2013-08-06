module.exports = function(grunt) {

  var payloadFiles = [
    'assets/ajax.js',
    'assets/app.js',
    'assets/dom.js'
  ];

  grunt.initConfig({
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          DOM: true,
          console: true,
          DOMElement: true
        }
      },
      with_overrides: {
        options: {
          curly: false,
          undef: true
        },
        files: {
          src: payloadFiles
        }
      }
    },

    watch: {
      scripts: {
        files: payloadFiles.concat(['assets/normalize.css', 'index.html']),
        tasks: ['jshint'],
        options: {
          dateFormat: function(time) {
            grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
            grunt.log.writeln('Waiting for more changes...');
          },
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint']);

};
