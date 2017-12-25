//init
var myapp = {};

//Model
myapp.Model = function (){
	console.log('%c mvc.js Model bulid', 'background: #000; color: #fff');
	var val = "";
	this.plus = function (v){
		console.log('%c mvc.js Model.plus call', 'background: #fff; color: #f00');
		val += v;
	};
	this.setVal = function (v){
		console.log('%c mvc.js Model.setVal call', 'background: #fff; color: #f00');
		val = v;
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
	this.save = function (v){
		console.log('%c mvc.js presenter.save', 'background: #fff; color: #bada55');
		model.setVal(v);
		model.plus('結尾字符');
	};
	this.getModel = function (){
		return model;
	};
};
//View
myapp.view = {
	$saveButtin: null,
	$content: null,
	$contain: null,
	presenter: null,
	init: function (){
		this.presenter = new myapp.Presenter();
		this.$saveButton = $('#save');
		this.$content = $('#content');
		this.$contain = $('#contain');
		this.presenter.init();
		this.bindEvents();
		this.$contain.val(this.presenter.getModel().getVal());
	},
	bindEvents: function (){
		var view = this;
		var presenter = this.presenter;
		this.$saveButton.click(function (){//儲存單一輸入欄位
			console.log('%c mvc.js view.$saveButton.click', 'background: #fff; color: #00f');
			presenter.save(view.$content.val());
			//presenter.save('綜合所有content 之值');
			view.$contain.val(presenter.getModel().getVal());
		});
	/*	this.$decreaseButton.click(function (){
			console.log('%c mvc.js view.$decreaseButton.click', 'background: #fff; color: #00f');
			presenter.decrease();
			view.$num.val(presenter.getModel().getVal());
		});
		this.$resetButton.click(function (){
			console.log('%c mvc.js view.$resetButton.click', 'background: #fff; color: #00f');
			presenter.reset();
			view.$num.val(presenter.getModel().getVal());
		});
		*/
	}
};

//execute
$(function (){
	console.log(' mvc.js execute');
	myapp.view.init();
});