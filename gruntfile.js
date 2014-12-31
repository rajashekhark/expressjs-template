module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    mochaTest: {
        test: {
            options: {
                reporter: 'spec',
                colors: true
            },
            src: ['tests/unit/*.js']
        }
    },

    mocha_istanbul: {
      target: {
        src: 'tests/unit',
        options: {
          coverage: true,
          colors: true,
          print: 'detail',
          dryRun: false
        },
        mochaOptions: ['--bail', '--debug-brk'],
        istanbulOptions: ['--default-excludes'],
        reporter: 'spec',
        reportFormats: ['lcovonly']
      }
    }

  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-mocha-istanbul');

  grunt.registerTask('default', ['mochaTest', 'mocha_istanbul']);
  grunt.registerTask('runTests', ['mochaTest']);
  grunt.registerTask('runCoverage', ['mocha_istanbul']);
};
