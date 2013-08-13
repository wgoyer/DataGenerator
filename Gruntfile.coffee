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

  grunt.registerTask 'statics', ->
    get_async = @async

    # downloadUrlToFile = (url, filename) ->
    #   done = get_async()
    #   http.get url, (response) ->
    #     if response.statusCode isnt 200
    #       # console.log response
    #       grunt.log.error "Error downloading #{filename}"
    #       done false
    #     file = fs.createWriteStream filename
    #     response.pipe file
    #     response.on 'end', ->
    #       console.log "Saved #{filename}"
    #       done()
    # 
    # files = [
    #   {
    #     url: 'http://code.jquery.com/jquery-2.0.3.min.js'
    #     filename: 'public/js/jquery-2.0.3.min.js'
    #   }
    #   {
    #     url: 'http://raw.github.com/twbs/bootstrap/3.0.0-wip/dist/css/bootstrap.min.css',
    #     filename: 'public/stylesheets/bootstrap.min.css'
    #   }
    #   {
    #     url: 'http://raw.github.com/twbs/bootstrap/3.0.0-wip/dist/js/bootstrap.min.js',
    #     filename: 'public/js/bootstrap.min.js'
    #   }
    # ]
    #    
    # downloadUrlToFile file.url, file.filename for file in files
    
  grunt.registerTask 'clean', ->
    files = [
      'public/js/bootstrap.min.js'
      'public/stylesheets/bootstrap.min.css'
      'public/js/jquery-2.0.3.min.js'
    ]
    for file in files
      fs.unlink file, (err) -> throw "Error deleting #{file}: #{err}" if err
      console.log "Deleting #{file}"