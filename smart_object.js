var getSmartObject = function(key,value) {

  var smart_object = document.createElement('div');
  smart_object.className = 'smart-object panel panel-default collapsed';

  buttons =
  [
    {class: 'glyphicon glyphicon-plus'},
    {class: 'glyphicon glyphicon-pencil'},
    {class: 'glyphicon glyphicon-star'},
    {class: 'glyphicon glyphicon-search'},
    {class: 'glyphicon glyphicon-fullscreen'},
  ]

  navbar = getNavBar(key,buttons)
  smart_object.appendChild(navbar)

  var panel_body = document.createElement('div');
  panel_body.className = 'panel-body'

  if (typeof value === 'object'){
    for (var key in value) {


      panel_body.appendChild(getSmartObject(key,value[key]));
    }
  } else {
    var well = document.createElement('div');
    well.className += 'well';
    if (typeof value === 'string') {  }
    well.innerHTML += value
    panel_body.appendChild(well);
  }
  smart_object.appendChild(panel_body)
  return smart_object;
};


var getHeading = function(name){

  var heading = document.createElement('div');
  heading.className = 'panel-heading';

  var title = document.createElement('h3');
  title.className = 'panel-title';
  title.innerHTML = name;
  heading.appendChild(title);

  heading.addEventListener('click',function(e){
    if (e['toElement'].tagName !== 'button') {
      $(this).closest('.smart-object').toggleClass('collapsed');
    }
  });

  return heading
}

var getToolbox = function(buttons) {
  var toolbox = document.createElement('div');
  toolbox.className = 'toolbox'
  toolbox.style.marginRight = '0;'
  for (index in buttons){
    toolbox.appendChild( getButton(buttons[index]) )
  }
  return toolbox
}

var getButton = function(options) {
  var icon = document.createElement('button')
  if (options['text']){ icon.innerHTML = options['text'] }
  if (options['class']){ icon.className = options['class'] }
  if (options['handler']){ icon.addEventListener('click',options['handler']) }
  return icon
}


var getRandomColor = function() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
