//init
var myapp = {};

//Model
myapp.Model = function (){
	console.log('%c mvc.js Model bulid', 'background: #000; color: #fff');
	var val = 0;
	this.add = function (v){
		console.log('%c mvc.js Model.add call', 'background: #fff; color: #f00');
		val += v;
	};
	this.sub= function (v){
		console.log('%c mvc.js Model.sub call', 'background: #fff; color: #f00');
		val -= v;
	};
	this.getVal = function (){
		console.log('%c mvc.js Model.getVal call', 'background: #fff; color: #f00');
		return val;
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
	this.increase = function (){
		console.log('%c mvc.js presenter.increase', 'background: #fff; color: #bada55');
		model.add(1);
	};
	this.decrease = function (){
		console.log('%c mvc.js presenter.decrease', 'background: #fff; color: #bada55');
		model.sub(1);
	};
	this.getModel = function (){
		return model;
	};
};
//View
myapp.view = {
	$increaseButton: null,
	$decreaseButton: null,
	$num: null,
	presenter: null,
	init: function (){
		this.presenter = new myapp.Presenter();
		this.$increaseButton = $('#increase');
		this.$decreaseButton = $('#decrease');
		this.$num = $('#num');
		this.presenter.init();
		this.bindEvents();
		this.$num.val(this.presenter.getModel().getVal());
	},
	bindEvents: function (){
		var view = this;
		var presenter = this.presenter;
		this.$increaseButton.click(function (){
			console.log('%c mvc.js view.$increaseButton.click', 'background: #fff; color: #00f');
			presenter.increase();
			view.$num.val(presenter.getModel().getVal());
		});
		this.$decreaseButton.click(function (){
			console.log('%c mvc.js view.$decreaseButton.click', 'background: #fff; color: #00f');
			presenter.decrease();
			view.$num.val(presenter.getModel().getVal());
		});
	}
};

//execute
$(function (){
	console.log(' mvc.js execute');
	myapp.view.init();
});