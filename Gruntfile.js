module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    // Lets lint our JS before we concatinate it
    jshint: {
      // This will take all our JS files and lint them
      beforeconcat: ['_dev/js/*.js'],
    },


    // This will compile all scripts in the JS directory into one file
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        // Grab all JS files from the dev directory and store the concatenated files in the tmp directory as one file
        src: ['_dev/js/*.js'],
        dest: '_dev/_tmp/js/site.js'
      }
    },


    // Minify all scripts
    uglify: {
      my_target: {
        files: {
          // Grab the concatenated JS file and minify it; output the final minified file in the libs directory
          '_libs/js/site.min.js': ['_dev/_tmp/js/site.js']
        }
      }
    },


    // This will compile all SCSS and minify it to a single CSS file
    compass: {
      dist: {
        options: {
          // Take all SCSS and compile it, leave it expanded and place it in the dev/css directory
          environment: 'production',
          outputStyle: 'expanded',
          imagesDir: '../images',
          fontsDir: '../fonts',
          sassDir: '_dev/scss',
          cssDir: '_dev/css/',
          raw: 'preferred_syntax = :scss\n' // Use `raw` since it's not directly available
        }
      },
      dev: {
        options: {
          environment: 'production',
          outputStyle: 'compressed',
          imagesDir: '../images',
          fontsDir: '../fonts',
          sassDir: '_dev/scss',
          cssDir: '_libs/css/',
          raw: 'preferred_syntax = :scss\n' // Use `raw` since it's not directly available
        }
      }
    },


    // Let's combine some media queries to cut down on bloat
    cmq: {
      dynamic: {
        // Grab the expanded CSS and combine all Media Queries and place it in the tmp directory
        expand: true,
        cwd: '_libs/css/',
        src: ['*.css'],
        dest: '_libs/css/',
      }
    },


    // Minify the prefixed version of my CSS and put in _assets directory for production
    cssmin: {
      my_target: {
        files: [{
          // Grab the combined CSS from the tmp directory, minify it, and send it to the libs directory for production
          expand: true,
          cwd: '_libs/css/',
          src: ['*.css', '!*.min.css'],
          dest: '_libs/css/',
          ext: '.min.css'
        }]
      }
    },


    // Image Optimization
    imagemin: {
      dynamic: {
        files: [{
          // Grab ALL images in the dev/images directory and run them through imageMin; output the files in the libs directory
          expand: true,
          cwd: '_dev/images',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: '_libs/images'
        }]
      }
    },


    // Watches files and runs appropriate tasks upon changes
    watch: {
      scripts: {
        files: ['_dev/js/*.js'],
        tasks: ['concat', 'uglify'],
      },
      styles: {
        files: ['_dev/scss/*.scss', '_dev/scss/**/*.scss'],
        tasks: ['compass:dev'],
      },
      img: {
        files: ['_dev/images/**/*.{png,jpg,gif,svg}'],
        tasks: ['newer:imagemin'],
      }
    },
  });

  // Load all tasks using load-grunt-tasks
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('mq', ['cmq', 'cssmin']);
};