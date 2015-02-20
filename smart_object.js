var getSmartObject = function(object) {

  var smart_object = document.createElement('div');
  smart_object.className = 'smart-object panel-default collapsed';

  buttons =
  [
    {class: 'glyphicon glyphicon-search'},
    {class: 'glyphicon glyphicon-plus', handler: "add"},
    {class: 'glyphicon glyphicon-pencil', handler:"edit"},
    {class: 'glyphicon glyphicon-trash', handler:"remove"},
    {class: 'glyphicon glyphicon-link', handler:"link"},
    {class: 'glyphicon glyphicon-star'},
    {class: 'glyphicon glyphicon-fullscreen'},
  ]
  if (typeof object === 'object'){
    for (var key in object) {
      var child = getSmartObject(object[key])
      var navbar = getNavBar(key,buttons)
      smart_object.appendChild(navbar)
      smart_object.appendChild(child)
    }
  } else {
    var navbar = getNavBar(object,buttons)
    navbar.id = object
    smart_object.appendChild(navbar)
  }
  return smart_object;
};


var edit = function(e){
  var target = $(e).closest('.smart-object')
  if ( !target.hasClass('editing') ){
    target.addClass('editing')
    var header = target.find('.navbar-header').first()
    var text = header.text()
    var input = document.createElement('input')
    input.className = ''
    input.value = text
    // input.addEventListener('blur',function(e){
    //   edit(this)
    // })
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
    var smart_object = getSmartObject(json)
    target.replaceWith(smart_object)
  });
}