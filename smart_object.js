var getSmartObject = function(key,value) {

  buttons =
  [
    {class: 'glyphicon glyphicon-search'},
    {class: 'glyphicon glyphicon-plus', handler: "add"},
    {class: 'glyphicon glyphicon-pencil', handler:"edit"},
    {class: 'glyphicon glyphicon-trash', handler:"remove"},
    {class: 'glyphicon glyphicon-link', handler:"link"},
    {class: 'glyphicon glyphicon-star-empty', handler:"favorite"},
    {class: 'glyphicon glyphicon-pushpin', handler: "pin"},
    {class: 'glyphicon glyphicon-fullscreen', handler: "maximize"},
  ]

  var smart_object = document.createElement('div')
  smart_object.className = 'smart-object panel-default collapsed'
  // smart_object.setAttribute('draggable', true);
  var navbar = getNavBar(key,buttons)
  smart_object.appendChild(navbar)

  if (typeof value === 'object'){
    for (var index in value) {
      var child = getSmartObject(index,value[index])
      smart_object.appendChild(child)
    }
  } else if (value) {
    var child = getSmartObject(value)
    smart_object.appendChild(child)
  }
  return smart_object
};


