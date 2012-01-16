/**
 * imageCache.js - image caching framework.
 * Zoltan Hawryluk - http://www.useragentman.com/
 * MIT License.
 */

var imageCache = new function () {
	var me = this;
	
	var cache = [];
	var root = document.location.href.split('/');
	
	root.pop();
	root = root.join('/') + '/';
	
	me.push = function (src, loadEvent) {
		
		if (!src.match(/^http/)) {
			src = root + src;
		} 
		
		var item = new Image();
		
		
		if (cache[src] && loadEvent) {
			loadEvent(src);
		} else {
			if (loadEvent) {
				item.onload = loadEvent;
				item.onerror = loadEvent;
			}
			cache[src]=item;
		}
		
		item.src =  src;
	}
	
	me.pushArray = function (array, imageLoadEvent, imagesLoadEvent) {
		var numLoaded = 0;
		var arrayLength = array.length;
		for (var i=0; i<arrayLength; i++) {
			me.push(array[i], function (e) {
				if (imageLoadEvent) {
					imageLoadEvent(e);
				}
				numLoaded++;
				if (numLoaded == arrayLength) {
					setTimeout(function () {
						imagesLoadEvent(e);
					}, 1)
					
				}
			})
		}
	}
	
}
