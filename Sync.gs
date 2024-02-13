function getQuantity(data) {
  const response = UrlFetchApp.fetch("https://script.google.com/macros/s/AKfycbzOVeeEmV_h5tjD55mXbDtQ9CXba2DdHMmaZBVJ0eykKHI_3H_juh9xgp7XEKwjHcOx/exec?getAvailableItems")

  if(data){
    for(const el of JSON.parse(response).items){
      if(el.Id === data){
        return el.Quantity
      }
    }
    return "Не найдено"
  }
  else{
    return ""
  }
}

function findValues(){
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = ss.getSheetByName("Ассортимент")
  const findRange = sheet.getRange("A:A").getValues()

  for(let i = 0; i < findRange.length; i++){
    if(typeof(findRange[i][0]) === "number"){
      sheet.getRange(i+1,4).setValue(getQuantity(findRange[i][0]))
    }
    else if(findRange[i][0] == ""){
      sheet.getRange(i+1,4).setValue("")
    }
  }
}

function onOpen(){
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("📊Синхронизация остатков")
  .addItem("Синхронизировать", "findValues")
   .addToUi();
}
