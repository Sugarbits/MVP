function ListView(){

	var html;

	function init(){
		html = $("<div>"+
				"<h1>Awesome MVP task list</h1>"+
					"<fieldset><legend>Don't forget!</legend>"+
						"<ul id='tasklist'></ul>"+
					"</fieldset>"+
				"<h2>Add a new task:</h2>"+
				"What do you need to do? <input id='taskinput' placeholder='I need to do…'/> <input id='submittask' type='submit' value='Add'/>"+
				"</div>");
	}

	var public = {
		getHtml: function(){
			return html;
		},
		addCreateTaskHandler: function(handler){//「新增任務項目」的觸發
			html.find("#submittask").click(function(){
				console.log(handler);
				var newTaskTitle = html.find("#taskinput").val();//得到「新增任務」內容
				html.find("#taskinput").val("");//令「新增任務」內容 清空
				handler(newTaskTitle);//將 得到「新增任務」內容 傳給 handler function
			});
		},
		addTask: function(taskView){
			html.find("#tasklist").append(taskView.getHtml());
		}
	}

	init();
	return public;
}