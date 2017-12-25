//init
var myapp = {};

//Model，共用項
//原理(基本元素及反應)
myapp.Model = function (){
	console.log('%c mvc.js Model bulid', 'background: #000; color: #f00');
	var id = 0;//預設 id(對應input數量) 是零
	this.plus = function (v){//id+v
		console.log('%c mvc.js Model.plus call', 'background: #fff; color: #f00');
		id += v;
	};
	this.getVal = function (){//id 返回
		console.log('%c mvc.js Model.getVal call', 'background: #fff; color: #f00');
		return id;
	};
	
};
//Dynamic1_Model
//動態生成的input 原理
myapp.Dy1_Model = function (){
	console.log('%c mvc.js Dy1_Model bulid', 'background: #000; color: #f00');
	var val = "";
	this.plus = function (v){//val 再加上 v，句尾加 \n ..等 用
	console.log('%c mvc.js Dy1_Model.plus call', 'background: #fff; color: #f00');
		val += v;
	};
	this.setVal = function (v){//設定 val 為 v
		console.log('%c mvc.js Dy1_Model.setVal call', 'background: #fff; color: #f00');
		val = v;
	};
	this.getVal = function (){//返回 val 
		console.log('%c mvc.js Dy1_Model.getVal call', 'background: #fff; color: #f00');
		return val;
	};
	
};

//Presenter
//共用項的 規則
myapp.Presenter = function(){
	console.log('%c mvc.js presenter bulid','background: #000; color: #bada55');
	var model = null;
	this.init = function (){//初始 Presenter (新增 Model 並賦予本處)
		console.log('%c mvc.js presenter init','background: #999; color: #bada55');
		model = new myapp.Model();		
	};
	this.add = function (v){//id 加一
		console.log('%c mvc.js presenter.add', 'background: #fff; color: #bada55');
		model.plus(1);
	};
	this.getModel = function (){//返回 model 物件，回吐到view層用
		return model;
	};
};
//Dynaeic1_Presenter
//動態生成的input 規則
myapp.Dy1_Presenter = function(){
	console.log('%c mvc.js Dy1_Presenter bulid','background: #000; color: #bada55');
	var model = null;
	this.init = function (){
		console.log('%c mvc.js Dy1_Presenter.init','background: #999; color: #bada55');
		model = new myapp.Dy1_Model();		
	};
	this.save = function (v){
		console.log('%c mvc.js Dy1_Presenter.save', 'background: #fff; color: #bada55');
		model.setVal(v);
		model.plus('結尾字符');
	};
	this.getModel = function (){
		return model;
	};
};
//View
myapp.view = {
	$addButton: null,//新增按鈕 現實對應
	$saveButton: null,//儲存按鈕 現實對應
	$result:null,//輸出結果 現實對應
	$input_content: null,//新增輸入區 現實對應
	$dy1_content: [],//動態生成的input 現實對應
	dy1_presenter: [],//動態生成的input 規則 現實對應(儲存區)
	//解釋：MVP模式藉由View來互動
	//因此「新增的input表單元素」監聽 應該是要藉由
	//[0]現實由$addButton觸發，透過 presenter 「id+1」動作改變 model 中的id 並取得 id 值
	//[1]將[0]的結果代入 view 操作(新增)DOC元素，賦予正確的id attr
	//[2]建立 新物件dy1_presenter ，並初始化(「新物件 dy1_model」生成) ，賦予給presenterX，藉此綁定(新增)DOC元素。
	//[3.1]麻煩的是要如何在現實中綁上 新物件presenterX
	//[3.2]首先考慮功能，有多個input 將被動態生成，然後input可以被 儲存按鈕 採集資訊、加工後 送到 「輸出結果」的現實對應
	//[4]倘若不想生成多個 View 物件 可用遍尋抓取 $dy1_content所有內容，透過presenter加工處理，再返回最後結果
	presenter: null,//
	init: function (){
		this.presenter = new myapp.Presenter();
		this.$addButton = $('#add');
		this.$saveButton = $('#save');
		this.$result = $('#result');
		this.$input_content = $('#input_content');
		this.presenter.init();
		this.bindEvents();
	},
	bindEvents: function (){
		var view = this;
		var presenter = this.presenter;
		this.$addButton.click(function (){//新增單一輸入欄位
			console.log('%c mvc.js view.$addButton.click', 'background: #fff; color: #00f');
			presenter.add();//計數器+1
			var cnt = presenter.getModel().getVal();
			view.$input_content.append("<label for='content_"+cnt+"'>"+cnt+"</label><input id='content_"+cnt+"' name='content_"+cnt+"'/><br><br>")
			var presenterX = new myapp.Dy1_Presenter();
			presenterX.init(cnt);
			(view.dy1_presenter).push(presenterX);
			(view.$dy1_content).push($("#"+"content_"+cnt));
			console.log(view.dy1_presenter);
			//alert("現在的值="+presenter.getModel().getVal());
		});
		this.$saveButton.click(function (){//儲存單一輸入欄位
			console.log('%c mvc.js view.$saveButton.click', 'background: #fff; color: #00f');
			var _content = '';
			for(key in view.$dy1_content){//得到所有內容
				//console.log(view.$dy1_content[key].val());
				_content += view.$dy1_content[key].val()+'\n';
				//console.log(view.$dy1_content[key].val());
			}
			console.log(_content);
			view.$result.val(_content);
			//alert("現在的值="+presenter.getModel().getVal());
		});
	}
};
//execute
$(function (){
	console.log(' mvc.js execute');
	myapp.view.init();
});