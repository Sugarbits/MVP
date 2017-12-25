//init
var myapp = {};

//Model
myapp.Model = function (){
	console.log('%c mvc.js Model bulid', 'background: #000; color: #fff');
	var val = "";
	//var id = 0;
	this.idAdd = function (v){
		console.log('%c mvc.js Model.idAdd call', 'background: #fff; color: #f00');
		val += v;
	};
	this.plus = function (v){
		console.log('%c mvc.js Model.plusA call', 'background: #fff; color: #f00');
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
		model.plus('\n');
	};
	/*
	this.reset = function (){
		console.log('%c mvc.js presenter.reset', 'background: #fff; color: #bada55');
		model.zero();
	};*/
	this.getModel = function (){
		return model;
	};
};
//View
myapp.view = {
	$saveButtin: null,
	$addButtin: null,
	//$decreaseButton: null,
	//$resetButton: null,
	$content: null,
	$contain: null,
	presenter: null,
	init: function (){
		this.presenter = new myapp.Presenter();
		this.$addButton = $('#add');
		this.$saveButton = $('#save');
		//this.$decreaseButton = $('#decrease');
		//this.$resetButton = $('#reset');
		this.$input_content = $('#input_content');
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
			//presenter.save(view.$content.val());
			presenter.save('綜合所有content 之值');
			view.$contain.val(presenter.getModel().getVal());
		});
		this.$addButton.click(function (){//新增輸入欄位
			console.log('%c mvc.js view.$addButton.click', 'background: #fff; color: #00f');
			//新增一個 input
			view.$input_content.('<input>')
			//view_dynamic
			presenter.(view.$content.val());
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
//view dynamic
myapp.view_dynamic = {
	$content: [],
//input
	presenter: null,
	init: function (){
		//this.presenter = new myapp.Presenter(); 新增Presenter
		this.$content = $('#content');
		this.presenter.init();
		this.bindEvents();
		this.$contain.val(this.presenter.getModel().getVal());
	},
	bindEvents: function (){
		var view_dynamic = this;
		var presenter = this.presenter;
		this.$saveButton.click(function (){//儲存單一輸入欄位
			console.log('%c mvc.js view_dynamic.$saveButton.click', 'background: #fff; color: #00f');
			presenter.save(view_dynamic.$content.val());
			view_dynamic.$contain.val(presenter.getModel().getVal());
		});
		this.$addButton.click(function (){//新增輸入欄位
			console.log('%c mvc.js view_dynamic.$addButton.click', 'background: #fff; color: #00f');
			//興增一個
			presenter.(view_dynamic.$content.val());
			view_dynamic.$contain.val(presenter.getModel().getVal());
		});
	/*	this.$decreaseButton.click(function (){
			console.log('%c mvc.js view_dynamic.$decreaseButton.click', 'background: #fff; color: #00f');
			presenter.decrease();
			view_dynamic.$num.val(presenter.getModel().getVal());
		});
		this.$resetButton.click(function (){
			console.log('%c mvc.js view_dynamic.$resetButton.click', 'background: #fff; color: #00f');
			presenter.reset();
			view_dynamic.$num.val(presenter.getModel().getVal());
		});
		*/
	}
};

//execute
$(function (){
	console.log(' mvc.js execute');
	myapp.view.init();
	myapp.view.init();
});