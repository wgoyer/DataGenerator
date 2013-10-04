ObjectCreator = require './ObjectCreator'

# WSAPI Users Class
module.exports = class DefectCreator extends ObjectCreator

  fields: ["Name", "Priority", "Severity", "Environment", "Release", "Iteration"]
  uri: '/defect/create'

  transformData: (i) ->
    data = super()

    if @count > 1
      data.Name += i

    data
