function TaskView(){

	var html;

	function init(){
		html = $("<li><input type='checkbox'/><label></label></li>");//一條核取方塊
	}

	var public = {
		getHtml: function(){
			return html;
		},
		setModel: function(model){
			html.find("input").attr("id", model.getID());
			html.find("label").attr("for", model.getID());
			html.find("label").html(model.getText());
		},
		addCheckedHandler: function(handler){
			html.find("input").click(handler);
		},
		remove: function(){
			html.remove();
		}
	}

	init();//執行 初始化一條核取方塊
	return public;
}