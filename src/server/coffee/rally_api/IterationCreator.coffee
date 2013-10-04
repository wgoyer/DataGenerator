ObjectCreator = require './ObjectCreator'
moment = require 'moment'

# WSAPI Users Class
module.exports = class IterationCreator extends ObjectCreator
  
  constructor: ->
    super
    
    startDate = new moment @data.StartDate
    endDate = new moment @data.EndDate
    
    @data.StartDate = startDate
    @data.EndDate = endDate
    
    @startDate = new moment @data.iterationStartDate
    @difference = endDate.diff startDate, 'days'

  fields: ["Name", "StartDate", "EndDate", "State"]
  uri: '/iteration/create'

  transformData: (i) ->

    if @count > 1      
      @data.StartDate = @data.StartDate.add('days', @difference).format()
      @data.EndDate = @data.EndDate.add('days', @difference).format()

    data = super()
