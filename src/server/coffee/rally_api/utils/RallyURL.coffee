class RallyURL
  
  getOidFromRef: (ref) ->
    ref.match(/\d+$/)?[0]
    
module.exports = new RallyURL
  
# url = new RallyURL
# 
# ref = "http://127.0.0.1:7001/slm/webservice/v2.0/revisionhistory/123985"
# 
# console.log url.getOidFromRef ref