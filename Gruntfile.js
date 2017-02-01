module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
    },

    // concat: {
    //   options: {separator: ';'},
    //   dist: {
    //     src: ['public/client/**/*.js'],
    //     dest: 'public/dist/built.js'
    //   }
    // },

    // mochaTest: {
    //   test: {
    //     options: {
    //       reporter: 'spec'
    //     },
    //     src: ['test/**/*.js']
    //   }
    // },

    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    },

    // uglify: {
    //   dist: {
    //     files: {
    //       'public/dist/built.min.js' : ['public/dist/built.js']
    //     }
    //   }
    // },

    // eslint: {
    //   target: [
    //     // Add list of files to lint here
    //     ['public/dist/built.min.js']

    //   ]
    // },

    // cssmin: {
    // },

    // watch: {
    //   scripts: {
    //     files: [
    //       'public/client/**/*.js',
    //       'public/lib/**/*.js',
    //     ],
    //     tasks: [
    //       'concat',
    //       'uglify'
    //     ]
    //   },
    //   css: {
    //     files: 'public/*.css',
    //     tasks: ['cssmin']
    //   }
    // },

    shell: {
      prodServer: {
        command: 'git push upstream master'
      },
      babel: {
        command: 'babel . --out-dir compiled --presets=es2015,react --ignore=node_modules,compiled,Gruntfile --source-maps inline --watch'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  // grunt.registerTask('test', [
  //   'mochaTest'
  // ]);

  grunt.registerTask('start', ['nodemon'
  ]);

  grunt.registerTask('babel', function(n) {
    grunt.task.run(['shell:babel']);
    // add your production server task here

  });


  // grunt.registerTask('deploy', function(n) {
  //   if (grunt.option('prod')) {
  //     grunt.task.run(['test', 'eslint:target', 'concat:dist', 'uglify:dist', 'shell:prodServer']);
  //   } else {
  //     grunt.task.run(['test', 'eslint:target', 'concat:dist', 'uglify:dist']);
  //   }
  // });



};
