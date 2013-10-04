ObjectCreator = require './ObjectCreator'
moment = require 'moment'

# WSAPI Users Class
module.exports = class ReleaseCreator extends ObjectCreator
  
  constructor: ->
    super
    
    releaseStartDate = new moment @data.ReleaseStartDate
    releaseDate = new moment @data.ReleaseDate
    
    @data.ReleaseStartDate = releaseStartDate
    @data.ReleaseDate = releaseDate
    
    # @startDate = new moment @data.iterationStartDate
    @difference = releaseDate.diff releaseStartDate, 'days'

  fields: ["Name", "ReleaseStartDate", "ReleaseDate", "State"]
  uri: '/release/create'

  transformData: (i) ->

    if @count > 1      
      @data.ReleaseStartDate = @data.ReleaseStartDate.add('days', @difference).format()
      @data.ReleaseDate = @data.ReleaseDate.add('days', @difference).format()

    data = super()
