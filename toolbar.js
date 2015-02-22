
var edit = function(e){
  var smart_object = $(e).closest('.smart-object')
  var header = smart_object.find('nav span').first()
  var text = header.text()
  var input = document.createElement('input')
  input.className = 'form-control'
  input.value = text
  input.addEventListener('blur',function(e){
    rename(smart_object)
  })
  input.addEventListener('keypress',function(e){
    if (e.keyCode == 13) { rename(smart_object) }
  })
  header.empty()
  header.append(input)
  input.focus()
}

var rename = function(smart_object){
  var header = smart_object.find('nav span').first()
  if ( header.find('input').length > 0 ) {
    var input = header.find('input').first()
    var text = input.val()
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
  var smart_object = $(e).closest('.smart-object')
  var navbar = smart_object.find('nav').first()
  var header = navbar.find('span').first()
  var input = document.createElement('input')
  input.className = 'form-control'
  input.value = ''
  input.addEventListener('blur',function(e){
    load_link(smart_object)
  })
  input.addEventListener('keypress',function(e){
    if (e.keyCode == 13) { load_link(smart_object) }
  })
  header.after(input)
  input.focus()
}

var load_link = function(element) {
  var target = $(element).closest('.smart-object')
  var navbar = target.find('nav').first()
  var title = navbar.find('span').text()
  var input = navbar.find('input')
  var url = input.val()
  input.remove()
  $.getJSON(url,function(json){
    var smart_object = getSmartObject(title,json)
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
  target.toggleClass('maximized')
  target.removeClass('collapsed').addClass('panel')
  var bg_objs = document.querySelectorAll(".smart-object.background")
  if ( target.hasClass('glyphicon-fullscreen') ) {
    target.parentsUntil('.background').addClass('.background')
    var bg_objs = $('.smart-object.background')
    for (var obj in bg_objs) {
      bg_objs[obj].css( "z-index" , bg_objs[obj].css("z-index") + 1 )
    }
  } else {
    var bg_objs = $('.smart-object.background')
    if ( bg_objs.length > 0 ) {
      for (var obj in bg_objs) {
        bg_objs[obj].css( "z-index" , bg_objs[obj].css("z-index") + 1 )
      }
    }
    target.parent('.smart-object.background').first().removeClass('background')
  }
  $(e).toggleClass('glyphicon-fullscreen glyphicon-resize-small')
}
