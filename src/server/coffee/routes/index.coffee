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
    
    results = for result in results
      for value in result.QueryResult.Results
        value.StringValue

    dropdowns =
      indexState: results[0]
      indexPriority: results[1]
      indexSeverity: results[2]
      indexEnvironments: results[3]
    
    res.render 'index', dropdowns
