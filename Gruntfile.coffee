fs      = require 'fs'
request = require 'request'
http = require 'http'

module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks 'grunt-express-server'

  grunt.initConfig
    clean:
      coffee:
        src: ['routes', 'rally_api']
    coffee:
      client:
        expand: true
        cwd: 'src/client/coffee'
        src: ['*.coffee']
        dest: 'public/js'
        ext: '.js'
      server:
        expand: true
        cwd: 'src/server/coffee'
        src: ['**/*.coffee']
        ext: '.js'
      # options:
      #   sourceMap: true
    express:
      dev:
        options:
          script: 'app.js'
    watch:
      coffee:
        files: 'src/**/*.coffee'
        tasks: 'coffee'
      # express:
      #   files: [
      #     'Gruntfile.coffee'
      #     'app.js'
      #     'credentials.js'
      #     'routes/*.js'
      #     'rally_api/*.js'
      #     'public/js/*.js'
      #     'views/**/*.jade'
      #   ]
      #   tasks: [ 'express:dev' ]
      #   options:
      #     spawn: false

  grunt.registerTask 'dev', [ 'express:dev', 'watch:express' ]
