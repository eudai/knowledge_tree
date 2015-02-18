var getSmartObject = function(object) {

  var smart_object = document.createElement('div');

  buttons =
  [
    {class: 'glyphicon glyphicon-plus', handler: "add"},
    {class: 'glyphicon glyphicon-pencil', handler:"edit"},
    {class: 'glyphicon glyphicon-trash', handler:"remove"},
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
    smart_object.className = 'smart-object panel panel-default collapsed';
    smart_object.appendChild(getNavBar(object,buttons))
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
    input.addEventListener('blur',function(e){
      console.log('submit recognized!')
      edit(this)
    })
    header.empty()
    header.append(input)
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
  target.append(getSmartObject(''))
}

var remove = function(e){
  var target = $(e).closest('.smart-object')
  target.remove()
}