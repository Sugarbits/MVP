function ListPresenter(_view){

	var view;
	var model;

	function init(){
		view = _view;//LV 物件
		//所以這段 view 是在操作一個LV物件
		view.addCreateTaskHandler(function(taskTitle){
			var model 	= new TaskModel(taskTitle);
			var task 	= new TaskPresenter(new TaskView());
			task.setModel(model);
			
			view.addTask(task.getView());
		});
		//LP初始化結束
	}

	var public = {
		getView: function(){
			return view;
		}
	}

	init();
	return public;
}