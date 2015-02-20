
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
  target.toggleClass('maximized')
  target.removeClass('collapsed').addClass('panel')
  var bg_objs = document.querySelectorAll(".smart-object.background")
  if ( target.hasClass('glyphicon-fullscreen') ) {
    target.parentsUntil('.background').addClass('.background')
    var bg_objs = $('.smart-object.background')
    if ( bg_objs.length > 0 ) {
      for (var obj in bg_objs) {
        bg_objs[obj].css( "z-index" , bg_objs[obj].css("z-index") + 1 )
      }
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
