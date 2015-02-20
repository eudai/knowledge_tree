

var getNavBar = function(title,buttons){
  var navbar = document.createElement('nav')
  navbar.className = "navbar navbar-default container-fluid"
  navbar.appendChild(getNavBarHeader(title))
  var collapser = getCollapsingNav()
  var nav_right = getNavRight()
  for (var index in buttons) {
    var btn = buttons[index]
    var item = getNavItem(btn['class'],btn['handler'])
    nav_right.appendChild(item)
  }
  collapser.appendChild(nav_right)
  navbar.appendChild(collapser)

  navbar.addEventListener('mouseover',function(e) {
    if ( navbar.className.indexOf('active') < 0 ) {
      navbar.className += ' active'
    }
  });

  navbar.addEventListener('mouseout',function(e){
    if ( navbar.className.indexOf('active') > 0 ) {
      navbar.className = navbar.className.replace(' active','')
    }
  });

  navbar.addEventListener('click',function(e){
    if (e['toElement'].tagName !== 'A') {
      $(this).parent('.smart-object').first().toggleClass('collapsed panel')
    }
  });

  return navbar
}

var getNavBarHeader = function(text){
  var navbar_header = document.createElement('span')
  navbar_header.className = "navbar-header navbar-brand"
  navbar_header.innerHTML = text
  return navbar_header
}

var getCollapsingNav = function(){
  var collapsing_nav = document.createElement('div')
  collapsing_nav.className = "collapse navbar-collapse"
  return collapsing_nav
}

var getNavRight = function(){
  var nav_right = document.createElement('ul')
  nav_right.className = "nav navbar-nav navbar-right"
  return nav_right
}

var getNavItem = function(class_name,handler){
  var nav_item = document.createElement('li')
  nav_item.className = 'nav_item'
  var a = document.createElement('a')
  a.className = class_name
  if (handler) { a.addEventListener('click',function(e){
    eval(handler + "(e['toElement'])")
  }) }
  nav_item.appendChild(a)
  return nav_item
}
