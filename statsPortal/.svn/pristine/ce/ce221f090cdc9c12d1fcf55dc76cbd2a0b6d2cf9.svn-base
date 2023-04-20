(function(W, D) {

	W.index = W.index || {};
	
	$(document).ready(function() {
		srvLogWrite('T0','01','01','00','','');
		sessionInfo();
	});

	index = {
			selectSidoList: function(){
				$.ajax({
					method: "POST",
					async: true,
					url: "/ServiceAPI/map/sidoAddressList.json",
					data: {
						//base_year: $ssaJobQuality.ui.mapList[0].bnd_year
						base_year: "2020"
					},
					dataType: "json",
					success: function(res) {
						if(res.errCd=="0"){
							var html = "";
							$.each(res.result.sidoList,function(i, node){
								//console.log(node);
								html += "<li id='"+node.sido_cd+"'>"+node.sido_nm+"</li>"
							});
							$("#sidoList").html(html);
						}
					},
					error: function(e) {
						//
					}
				});
			},
			
			//교사 등록 신청
			insertTeacher: function(){
				//validation
				if($("#member_id").val()== null || $("#member_id").val == ""){
					$("#inputAlert").css("display","block");
					$("#inputAlert").text("로그인이 필요한 서비스입니다.");
					return; 
				}
				if($("#subject").val()==null || $("#subject").val() == ""){
					$("#inputAlert").css("display","block");
					$("#subject").focus();
					return ;
				}
				if($("#sel_sido_cd").val()== null || $("#sel_sido_cd").val() =="" ){
					$("#inputAlert").css("display","block");
					return;
					
				}
				if($("#sel_school_grade").val()== null || $("#sel_school_grade").val() =="" ){
					$("#inputAlert").css("display","block");
					return;
				
				/* 회원 및 교사정보 validation 확인 후 로그 */
				srvLogWrite('T0','01','03','00','','');
				}
				
				$.ajax({
					method: "POST",
					async: true,
					url: "/ServiceAPI/edu/eduTeacherApply.json",
					data: {
						member_id : $("#member_id").val(),
						subject : $("#subject").val(),
						sido_cd : $("#sel_sido_cd").val(),
						school_grade : $("#sel_school_grade").val()
					},
					dataType: "json",
					success: function(res) {
						if(res.errCd=="0"){
							alert("등록되었습니다.");
							$(".popup").removeClass("on");
							$("#applyPopupBtn").css('display','none');
						}
						sessionInfo();
					},
					error: function(e) {
						//
					}
				});
			}
	};
	
}(window, document));


