/** 
 *  Override proxy methods to $
 *  this will be the context itself
 */

o_O.bindings = {}

/*
 * Proxy all $.fn
 */

if(typeof $ != 'undefined')
	for(var name in $.fn) {
		(function(name) { 
			o_O.bindings[name] = function(x, $el) {
				$el[name](x)
			}
		})(name)
	}

/*              _                    _     _           _ _                 
  ___ _   _ ___| |_ ___  _ __ ___   | |__ (_)_ __   __| (_)_ __   __ _ ___ 
 / __| | | / __| __/ _ \| '_ ` _ \  | '_ \| | '_ \ / _` | | '_ \ / _` / __|
| (__| |_| \__ \ || (_) | | | | | | | |_) | | | | | (_| | | | | | (_| \__ \
 \___|\__,_|___/\__\___/|_| |_| |_| |_.__/|_|_| |_|\__,_|_|_| |_|\__, |___/
                                                                 |___/       */

/* class
 * usage: bind='class: myClass' 
 */

o_O.bindings['class'] = function(klass, $el) {
 	$el.attr('class', klass)
}

/* Two-way binding to a form element
 * usage: bind='value: myProperty'
 * special cases for checkbox
 */
o_O.bindings.value = function(property, $el) {
  var self = this

  property.on('set', function(val) {
		var checkbox = $el.attr('type') == 'checkbox'
	
    checkbox
		? $el.val(val)
		: $el.attr('checked', val) 
  })
  
  $el.change(function(e) {
		var checkbox = $(e.srcElement).attr('type') == 'checkbox'
    var val = checkbox ? $(e.srcElement).attr('checked') : $(e.srcElement).val()
		property(val, e)
  })

  property.change() // force a change
}

/*
 * set visibility depenent on val
 */

o_O.bindings.visible = function(val, $el) {
	val ? $el.show() : $el.hide()
}


o_O.bindings['if' ]= function(val, $el) {
	if(!val) $el.remove()
}

o_O.bindings['ifnot']= function(val, $el) {
	if(val) $el.remove()
}

/* wrap each of $ ? */