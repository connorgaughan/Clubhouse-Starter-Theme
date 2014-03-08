module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // This will compile all scripts in the JS directory into one file
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['_dev/js/*.js'],
        dest: '_assets/js/site.min.js'
      }
    },
    // Minify all scripts
    uglify: {
      my_target: {
        files: {
          '_assets/js/site.min.js': ['_assets/js/site.min.js']
        }
      }
    },
    // Baked into the Watch command to compress all new images
    smushit: {
      mygroup: {
        src: ['_dev/images/**/*.png','_dev/images/**/*.jpg'],
        dest: '_assets/images/'
      }
    },
    // This will compile all SCSS and minify it to a single CSS file
    compass: {
      dist: {
        options: {
          environment: 'production',
          outputStyle: 'compressed',
          imagesDir: '../images',
          fontsDir: '../fonts',
          sassDir: '_dev/scss',
          cssDir: '_assets/css',
          raw: 'preferred_syntax = :scss\n' // Use `raw` since it's not directly available
        }
      }
    },
    // Watches files and runs appropriate tasks upon changes
    watch: {
      scripts: {
          files: ['_dev/js/*.js'],
          tasks: ['concat', 'uglify'],
          options: {
            livereload: 1388,
          }
      },
      styles: {
        files: ['_dev/scss/*.scss', '_dev/scss/libs/*.scss'],
        tasks: ['compass'],
        options: {
          livereload: 1388,
        }
      },
      imgs: {
        files: ['_dev/images/**/*.png','_dev/images/**/*.jpg'],
        task: ['smushit'],
        options: {
          livereload: 1388,
        }
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-smushit');

  grunt.registerTask('default', ['concat', 'compass', 'uglify']);
  grunt.registerTask('min', ['uglify']);

};