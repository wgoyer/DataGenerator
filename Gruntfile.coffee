fs      = require 'fs'
request = require 'request'
http = require 'http'

module.exports = (grunt) ->
  
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-express-server'

  grunt.initConfig
    coffee:
      src:
        expand: true
        cwd: 'src/coffee'
        src: ['*.coffee']
        dest: 'public/js'
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
        files: [ 'routes/*.js', 'public/js/*.js', 'views/**/*.jade', 'routes/*.js' ]
        tasks: [ 'express:dev' ]
        options:
          nospawn: true

  grunt.registerTask 'server', [ 'express:dev', 'watch' ]