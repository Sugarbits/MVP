//init
var myapp = {};

//Model
myapp.Model = function (){
	console.log('%c mvc.js Model bulid', 'background: #000; color: #fff');
	var id = 0;
	this.plus = function (v){
		console.log('%c mvc.js Model.plus call', 'background: #fff; color: #f00');
		id += v;
	};
	this.getVal = function (){
		console.log('%c mvc.js Model.getVal call', 'background: #fff; color: #f00');
		return id;
	};
	
};
//Presenter
myapp.Presenter = function(){
	console.log('%c mvc.js presenter bulid','background: #000; color: #fff');
	var model = null;
	this.init = function (){
		console.log('mvc.js presenter init');
		model = new myapp.Model();		
	};
	this.add = function (v){
		console.log('%c mvc.js presenter.save', 'background: #fff; color: #bada55');
		model.plus(1);
	};
	this.getModel = function (){
		return model;
	};
};
//View
myapp.view = {
	$addButtin: null,
	presenter: null,
	init: function (){
		this.presenter = new myapp.Presenter();
		this.$addButton = $('#add');
		this.presenter.init();
		this.bindEvents();
	},
	bindEvents: function (){
		var view = this;
		var presenter = this.presenter;
		this.$addButton.click(function (){//儲存單一輸入欄位
			console.log('%c mvc.js view.$addButton.click', 'background: #fff; color: #00f');
			presenter.add();
			alert("現在的值="+presenter.getModel().getVal());
		});
	}
};

//execute
$(function (){
	console.log(' mvc.js execute');
	myapp.view.init();
});