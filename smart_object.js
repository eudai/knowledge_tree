var getSmartObject = function(object) {

  var smart_object = document.createElement('div');

  buttons =
  [
    {class: 'glyphicon glyphicon-plus'},
    {class: 'glyphicon glyphicon-pencil'},
    {class: 'glyphicon glyphicon-star'},
    {class: 'glyphicon glyphicon-search'},
    {class: 'glyphicon glyphicon-fullscreen'},
  ]
  if (typeof object === 'object'){
    smart_object.className = 'smart-object panel panel-default collapsed';
    for (var key in object) {
      smart_object.appendChild(getNavBar(key,buttons))
      smart_object.appendChild(getSmartObject(object[key]));
    }
  } else {
    smart_object.className = 'smart-object panel-default collapsed';
    smart_object.appendChild(getNavBar(object,buttons))
  }
  return smart_object;
};


var getRandomColor = function() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
