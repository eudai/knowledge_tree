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


var edit = function(e){
  var target = $(e).closest('.smart-object')
  if ( !target.hasClass('editing') ){
    target.addClass('editing')
    var header = target.find('.navbar-header').first()
    var text = header.text()
    var input = document.createElement('input')
    input.className = 'form-control'
    input.value = text
    input.addEventListener('keypress',function(e){
      if (e.keyCode == 13){edit(this)}
    })
    header.empty()
    header.append(input)
    input.focus()
  } else {
    var header = target.find('.navbar-header').first()
    var input = header.find('input').first()
    var text = input.val()
    target.removeClass('editing')
    input.remove()
    header.text(text)
  }
}

var add = function(e){
  var target = $(e).closest('.smart-object')
  target.removeClass('collapsed')
  target.addClass('panel')
  target.append(getSmartObject(''))
}

var remove = function(e){
  var target = $(e).closest('.smart-object')
  target.remove()
}

var link = function(e){
  var target = $(e).closest('.smart-object')
  var header = target.find('.navbar-header').first()
  var url = header.text()
  $.getJSON(url,function(json){
    var smart_object = getSmartObject(url,json)
    target.replaceWith(smart_object)
  });
}

var favorite = function(e){
  $(e).toggleClass('glyphicon-star glyphicon-star-empty')
}

var pin = function(e){
  var target = $(e).closest('.smart-object')
  target.toggleClass('pinned')
}

var maximize = function(e){
  var target = $(e).closest('.smart-object')
  $(e).toggleClass('glyphicon-fullscreen glyphicon-minus')
  target.parent('.smart-object').toggleClass('too-big')
  target.toggleClass('maximized')
  target.removeClass('collapsed').addClass('panel')
}

