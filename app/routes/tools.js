module.exports = {

makeCurrancyValue: function (x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
},

getKeyByValue : function (object, value) {
  return Object.keys(object).find(key => object[key] === value);
},

hasNumber : function (myString) {
  return /\d/.test(myString);
},
removeFromList : function (array, value) {
  for (var i = 0; i < array.length; i++) {

    if (array[i].ID == value) {
      array.splice(i, i + 1);
      return true;
    }
  }
  return false;
},
addProduct :function(arr,page,post){
  // get all fields from the page
  var f = page.content.fields
  var p = {"id":page.page }

  for (var i = 0; i < f.length; i++) {
    // for each field create an obj with the Key being the field name
    // and the value being the posted data from that field
    var v = post[f[i].name]
    console.log("addding:"+v)
    p[f[i].name]=v
  }
  arr.push(p)
},
 updateProduct: function(id,arr,page,post){
  var f = page.content.fields
  var p = {"id":arr.length }
  for (var i = 0; i < f.length; i++) {
    // for each field create an obj with the Key being the field name
    // and the value being the posted data from that field

    var v = post[f[i].name]
    p[f[i].name]=v
  }
  arr[id]=p
},
 isDupucate: function(arr,name){
  for (var i = 0; i < arr.length; i++) {

    if (arr[i].name == name) {
      return true;
    }
  }
  return false;
},
findPage: function(arr,id){
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].page == id) {
      return arr[i];
    }
  }
  return false;
},
getDB: function(id,db){
  for (var i = 0; i < db.length; i++) {
    if (db[i].id == id) {
      return db[i];
    }
  }
  return false;
},
countProperties: function (obj) {
  var count = 0;
  for (var property in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, property)) {
      count++;
    }
  }
  return count;
},

getBlankFields: function(obj) {
  var arr = []
  for (var property in obj) {
    if (obj[property] == "" && property != "saveAndContinue" && property != "skip_answers") {
      arr.push(property)
    }
  }
  return arr
}
}
