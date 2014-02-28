fs      = require 'fs'
request = require 'request'
http = require 'http'

module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks 'grunt-nodemon'

  grunt.initConfig
    clean:
      coffee:
        src: ['routes', 'rally_api', 'public/js/*.js', 'public/js/rally_api']
    coffee:
      client:
        expand: true
        cwd: 'src/client/coffee'
        src: ['**/*.coffee']
        dest: 'public/js'
        ext: '.js'
      server:
        expand: true
        cwd: 'src/server/coffee'
        src: ['**/*.coffee']
        ext: '.js'
#      options:
#        sourceMap: true
    nodemon:
      dev:
        options:
          file: 'app.js'
    watch:
      coffee:
        files: 'src/**/*.coffee'
        tasks: 'coffee'

  grunt.registerTask 'dev', [ 'nodemon' ]
