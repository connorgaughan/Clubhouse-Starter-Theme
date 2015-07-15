module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // ==================================================================
    // Build out our JS task
    // ==================================================================

    jshint: {
      beforeconcat: '_dev/js/*.js',
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src:  '_dev/js/*.js',
        dest: '_assets/js/site.min.js'
      }
    },

    uglify: {
      my_target: {
        files: {
          '_assets/js/site.min.js': ['_assets/js/site.min.js']
        }
      }
    },


    // ==================================================================
    // Build out our CSS tasks
    // ==================================================================
    compass: {
      build: {
        options: {
          environment: 'production',
          outputStyle: 'compressed',
          imagesDir: '../images',
          fontsDir: '../../fonts',
          sassDir: '_dev/scss',
          cssDir: '_dev/css/',
          raw: 'preferred_syntax = :scss\n'
        }
      }
    },

    cmq: {
      dynamic: {
        expand: true,
        cwd: '_dev/css/',
        src: ['*.css'],
        dest: '_dev/css/',
      }
    },

    cssmin: {
      build: {
        files: [{
          expand: true,
          cwd: '_dev/css/',
          src: ['*.css', '!*.min.css'],
          dest: '_assets/css/',
          ext: '.min.css'
        }]
      }
    },



    // ==================================================================
    // Build out our image tasks
    // ==================================================================
    imagemin: {
      dynamic: {
        files: [{
          // Grab ALL images in the dev/images directory and run them through imageMin; output the files in the assets directory
          expand: true,
          cwd: '_dev/images',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: '_assets/images'
        }]
      }
    },


    

    // ==================================================================
    // Build out our Watch tasks
    // ==================================================================
    watch: {
      scripts: {
        files: ['_dev/js/*.js'],
        tasks: ['jshint', 'concat', 'uglify'],
      },
      styles: {
        files: ['_dev/scss/*.scss', '_dev/scss/**/*.scss'],
        tasks: ['compass', 'cmq', 'cssmin'],
      },
      img: {
        files: ['_dev/images/**/*.{png,jpg,gif,svg}'],
        tasks: ['newer:imagemin'],
      }
    },
  });

  // Load all tasks using load-grunt-tasks
  require('load-grunt-tasks')(grunt);
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'compass', 'cssmin', 'newer:imagemin']);
};