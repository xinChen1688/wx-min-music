 function goUrlData(dataItem) {
   return encodeURIComponent(JSON.stringify(dataItem))
 }

 function getUrlData(dataItem) {
   return JSON.parse(decodeURIComponent(dataItem))
 }

 module.exports = {
   goUrlData,
   getUrlData
 }