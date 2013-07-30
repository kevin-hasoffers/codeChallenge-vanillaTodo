(function(){
	var select = new DOM('#create-list');

	select.each(function(v, k) {
		console.log('each iterator', v, k);
		v.html('<div id="yodawg">Yo dawg</div>');
	});


	var clone =  new DOM("#todo-item");
	
	console.log('clone is', clone);
	select.each(function(v,k){
		console.log(v);
		v.append(clone);
	})


	console.log(select);

})();