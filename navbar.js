

var getNavBar = function(title,buttons){
  var navbar = document.createElement('nav');
  navbar.className = "navbar navbar-default container-fluid";
  navbar.appendChild(getNavBarHeader(title));
  var collapser = getCollapsingNav();
  var nav_right = getNavRight();
  for (var index in buttons) {
    var btn = buttons[index];
    var item = getNavItem(btn['class'],btn['handler']);
    nav_right.appendChild(item);
  }
  collapser.appendChild(nav_right);
  navbar.appendChild(collapser);

  navbar.addEventListener('mouseover',function(e) {
    $(navbar).closest('.smart-object').addClass('active');
  });

  navbar.addEventListener('mouseout',function(e){
    $(navbar).closest('.smart-object').removeClass('active');
  });

  navbar.addEventListener('click',function(e){
    if (e['toElement'].tagName !== 'A') {
      var smart_object = $(this).parent('.smart-object').first();
      smart_object.toggleClass('collapsed panel');
      smart_object.find('ul').first().toggleClass('visible');
    }
  });

  return navbar;
};

var getNavBarHeader = function(text){
  var navbar_header = document.createElement('span');
  navbar_header.className = "navbar-header navbar-brand";
  navbar_header.innerHTML = text;
  return navbar_header;
};

var getCollapsingNav = function(){
  var collapsing_nav = document.createElement('div');
  collapsing_nav.className = "collapse navbar-collapse";
  return collapsing_nav;
};

var getNavRight = function(){
  var nav_right = document.createElement('ul');
  nav_right.className = "nav navbar-nav navbar-right";
  return nav_right;
};

var getNavItem = function(class_name,handler){
  var nav_item = document.createElement('li');
  nav_item.className = 'nav_item';
  var a = document.createElement('a');
  a.className = class_name;
  if (handler) { 
    a.addEventListener('click',function(e){
      handler(e.toElement);
    });
  }
  nav_item.appendChild(a);
  return nav_item;
};
