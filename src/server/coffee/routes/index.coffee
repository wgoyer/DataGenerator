Q = require 'q'
rally = require('../rally_api/utils')

exports.index = (req, res) ->
  values = [
    rally.getStoryState()
    rally.getPriority()
    rally.getSeverity()
    rally.getDefectEnvironments()
  ]
    
  Q.all(values).then (results) ->
    console.log results
    
    res.render('index')
  