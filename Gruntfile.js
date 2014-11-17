module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    // Lets lint our JS before we concatinate it
    jshint: {
      beforeconcat: ['_dev/js/*.js'],
    },


    // This will compile all scripts in the JS directory into one file
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['_dev/js/*.js'],
        dest: '_tmp/js/site.js'
      }
    },


    // Minify all scripts
    uglify: {
      my_target: {
        files: {
          '_libs/js/site.min.js': ['_tmp/js/site.js']
        }
      }
    },


    // This will compile all SCSS and minify it to a single CSS file
    compass: {
      dist: {
        options: {
          environment: 'production',
          outputStyle: 'expanded',
          imagesDir: '../images',
          fontsDir: '../fonts',
          sassDir: '_dev/scss',
          cssDir: '_dev/css/',
          raw: 'preferred_syntax = :scss\n' // Use `raw` since it's not directly available
        }
      }
    },


    // Let's combine some media queries to cut down on bloat
    cmq: {
      dynamic: {
        expand: true,
        cwd: '_dev/css/',
        src: ['*.css'],
        dest: '_tmp/css/'
      }
    },


    // Minify the prefixed version of my CSS and put in _assets directory for production
    cssmin: {
      my_target: {
        files: [{
          expand: true,
          cwd: '_tmp/css/',
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
          expand: true,
          cwd: '_dev/images',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: '_assets/images'
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
        files: ['_dev/scss/*.scss', '_dev/scss/libs/*.scss'],
        tasks: ['compass'],
      },
      cmq: {
        files: ['_dev/tmp/*.css'],
        tasks: ['cmq'],
      },
      img: {
        files: ['_dev/images/**/*.{png,jpg,gif,svg}'],
        tasks: ['newer:imagemin'],
      },
      cssmin: {
        files: ['_dev/css/*.css'],
        tasks: ['cssmin'],
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-combine-media-queries');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint', 'concat', 'compass', 'cmq', 'uglify', 'newer:imagemin', 'cssmin']);
};