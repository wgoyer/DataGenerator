ObjectCreator = require './ObjectCreator'

# WSAPI Users Class
module.exports = class UserCreator extends ObjectCreator

  fields: ["EmailAddress", "FirstName", "LastName", "DisplayName", "UserName"]
  uri: '/user/create'

  transformData: (i) ->
    data = super()

    if @count > 1
      data.EmailAddress = data.EmailAddress.replace /^([^@]+)/, '$1' + i
      data.UserName = data.UserName.replace /^([^@]+)/, '$1' + i

    data
