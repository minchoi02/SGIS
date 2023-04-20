(function(W,D){
	W.$eduMainApi = W.$eduMainApi || {};

	$(document).ready(function() {
		$eduMainApi.eduEleMainContents();
		srvLogWrite('T0','03','01','01','E','');


	});
	
	$eduMainApi = {
		eduEleMainContents : function (){
			var html = "";
			$.ajax({
				url: '/ServiceAPI/edu/eduEleMainContentsList.json',
				type:  'POST',
				data:  {
					'school_grade' : 'E',
					'main_yn' : 'Y'
				},
				dataType: 'json'
					
			}).success(function(res){
				$.each(res.result.contentsList, function(i, val){
					html+= "<li>"
					html+= "<a href=\"javascript:logWriteAndMove('/view/edu/ele/classDetail?contents_id="+val.contents_id+"','T0','03','01','02','E','contents_id="+val.contents_id+"')\">";
					html+= "<span class='cardSub'>"+val.thema_nm+"</span>";
					html+= "<em class='cardTi'>"+val.contents_title+"</em>";
					html+= "</a>";
					if(null != val.icon_file_nm && "" != val.icon_file_nm){
						html+= "<img src='"+val.icon_file_nm+"'/>";
					}
					html+= "</li>";	
					
					$("#mainContents").html(html);
				})
			})
		}
	}
	
}(window, document));
	
