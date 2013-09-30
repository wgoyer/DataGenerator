fs      = require 'fs'
request = require 'request'
http = require 'http'

module.exports = (grunt) ->
  
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-express-server'

  grunt.initConfig
    coffee:
      public:
        expand: true
        cwd: 'src/public/coffee'
        src: ['*.coffee']
        dest: 'public/js'
        ext: '.js'
      server:
        expand: true
        cwd: 'src/server/coffee'
        src: ['*.coffee']
        dest: 'routes'
        ext: '.js'
    express:
      dev:
        options:
          script: 'app.js'
    watch:
      coffee:
        files: 'src/**/*.coffee'
        tasks: 'coffee'
      express:
        files: [ 'Gruntfile.coffee', 'routes/*.js', 'public/js/*.js', 'views/**/*.jade', 'routes/*.js', 'ignore/*.js' ]
        tasks: [ 'express:dev' ]
        options:
          nospawn: true

  grunt.registerTask 'server', [ 'express:dev', 'watch' ]