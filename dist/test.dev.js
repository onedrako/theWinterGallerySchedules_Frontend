"use strict";

var array = [{
  id: 1
}, {
  id: 2
}, {
  id: 3
}]; // find max id in array

var maxId = array.forEach(function (item) {
  console.log(item.id);
  var max = 0;

  if (item.id) {
    max = item.id;
  }

  return max;
});
console.log(maxId);