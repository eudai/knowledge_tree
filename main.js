
var generate = document.querySelector('.generate')


generate.addEventListener('click',function(e){

  var key = document.querySelector('.key').value
  var url = document.querySelector('.url').value
  var canvas = document.querySelector('.canvas')

  $.getJSON(url,function(json){
    canvas.appendChild(getSmartObject(json));
  });

})



var canvas = document.querySelector('.canvas')
canvas.appendChild(getSmartObject(''))

