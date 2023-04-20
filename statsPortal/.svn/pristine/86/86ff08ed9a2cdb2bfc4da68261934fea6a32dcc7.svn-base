$(document).ready(function(){
});

function setDetailSetting(){
	
	var value = $("#searchTheme").val();
	
	resetSettingMenu();
	var menuList  = [];
	
	if(value == 1){
		$("#gadgeText").text("기업이 많은");
		menuList = [1,2,3,4,5,6];
	}else if(value == 2){
		$("#gadgeText").text("개업이많은");
		menuList = [1,2,3,4];
	}else if(value == 3){
		$("#gadgeText").text("폐업이많은");
		menuList = [1,2,3,4];
	}else if(value == 4){
		$("#gadgeText").text("활동기업이 많은");
		menuList = [1,2,3,4];
	}else if(value == 5){
		$("#gadgeText").text("비활동기업이 많은");
		menuList = [1,2];
	}else if(value == 6){
		$("#gadgeText").text("생존율이 높은");
		menuList = [1,2,3,4,7];
	}else if(value == 7){
		$("#gadgeText").text("영업기간이 높은");
		menuList = [1,2,3,4,8];
	}else if(value == 8){
		$("#gadgeText").text("성장기업이 많은");
		menuList = [1,2,3,4,9];
	}else{
		$("#gadgeText").text("기업이 많은");
		menuList = [1,2,3,4,5,6];
	}
	
	setSettingMenu(menuList);
}

function resetSettingMenu(){
	for(var i=1; i< 10; i++){
		$('#settingMenu'+i).hide();	
	}
}

function setSettingMenu(list){
	list.forEach(function(data){
		$('#settingMenu'+data).show();
	});
}