function doGet(e) {

  try{
    if(e.queryString === "getMethods"){
      return createTextOutput(getMethods())
    }
    else if(e.queryString === "getAvailableItems"){
      return createTextOutput(getAvailableItems())
    }
    else{
      return createTextOutput({status: "ok"})
    }
  }
  catch(e){
    return createTextOutput({status: `false, error message: ${e}`})
  }
  
}

function createTextOutput(object){
  return ContentService.createTextOutput(JSON.stringify(object))
  .setMimeType(ContentService.MimeType.JSON)
}


function createObj(dataArr) {
  let obj = []

  obj = dataArr.map(el => ({
    Id: el[0],
    Name: el[1],	
    Desc: el[2],	
    Quantity: el[3]
  }))

  return obj
}

function getAvailableItems() {

  let result = {}
  let data = SpreadsheetApp
              .getActiveSpreadsheet()
              .getSheetByName("Items")
              .getDataRange()
              .getValues()

  data.shift()

  result.status = "ok"
  result.items = createObj(data)

  return result
}

function getMethods() {

  let objMethods = {
    status: "ok",
    methods: {
      method1: 'getMethods()',
      method2: 'getAvailableItems()'
        }
  }
  return objMethods
}
