(function(W, D){
	W.$collectKosisNew = W.$collectKosisNew || {};
	
	$(document).ready(function(){
		$(function(){
			$(".dialog").dialog({
				autoOpen: false,
				width: 'auto',
				height: 'auto',
				modal: true,
				resizable: false,
				minimizable: false,
				minimizeIcon: 'ui-icon-minus'
			});
		});
		$collectKosisNew.event.setUIEvent();
		$log.srvLogWrite("Z3", "04", "01", "01", "", "");
	});
	
	$collectKosisNew.ui = {
			setDateBox : function(){
				var dt = new Date();
				var com_year = dt.getFullYear();
				
				years = "";
				for(var i = 2000; i <= (com_year + 1); i++){
					years += $("#year").append("<option value='" + i +"'>" + i + " 년" + "</option>");
			
				}
			}
	}
	
	//event 내용 작성
	$collectKosisNew.event = {
			setUIEvent : function(){
				$("#divs").on("change", function(){
					var s1 =  $(this).val();
					
					var options = "";
					if(s1 == "인구") options = "전체연령|남성연령|여성연령|교육정도|혼인상태";
					else if(s1 == "가구") options = "점유형태|세대구성";
					else if(s1 == "주택") options = "연건평|주택유형|건축년도";
					else if(s1 == "사업체") options = "종사자수|사업체수";
					else if(s1 == "농가") options = "전체연령|여자연령|남자연령|가구원수";
					else if(s1 == "해수면") options = "전체연령|여자연령|남자연령|가구원수";
					else if(s1 == "내수면") options = "전체연령|여자연령|남자연령|가구원수";
					else if(s1 == "임가") options = "전체연령|여자연령|남자연령|가구원수";
					
					$('#items').empty();
					
					var optionArr =  options.split("|");
					for(var i=0;i<optionArr.length;i++){
						$('<option value="'+ optionArr[i] +'">' + optionArr[i] + '</option>').appendTo('#items');
					}
				});
				$("#btnSave").on("click", function(){
					var KosisObj = new Object();
					KosisObj.base_year = $("#year").val();
					KosisObj.div = $("#divs").val();
					KosisObj.item = $("#items").val();
					KosisObj.sido_11 = parseInt($("#sido_11").val());
					KosisObj.sido_21 = parseInt($("#sido_21").val());
					KosisObj.sido_22 = parseInt($("#sido_22").val());
					KosisObj.sido_23 = parseInt($("#sido_23").val());
					KosisObj.sido_24 = parseInt($("#sido_24").val());
					KosisObj.sido_25 = parseInt($("#sido_25").val());
					KosisObj.sido_26 = parseInt($("#sido_26").val());
					KosisObj.sido_29 = parseInt($("#sido_29").val());
					KosisObj.sido_31 = parseInt($("#sido_31").val());
					KosisObj.sido_32 = parseInt($("#sido_32").val());
					KosisObj.sido_33 = parseInt($("#sido_33").val());
					KosisObj.sido_34 = parseInt($("#sido_34").val());
					KosisObj.sido_35 = parseInt($("#sido_35").val());
					KosisObj.sido_36 = parseInt($("#sido_36").val());
					KosisObj.sido_37 = parseInt($("#sido_37").val());
					KosisObj.sido_38 = parseInt($("#sido_38").val());
					KosisObj.sido_39 = parseInt($("#sido_39").val());
					KosisObj.reg_user_id = $("#reg_user_id").val();
					
					var param = new Object();
					param.jsonStr = JSON.stringify(KosisObj);
					
					var options = {
							isBeForSend : true,
							method : "POST",
							params : param
					};
					
					$ajax.requestApi(contextPath + "/api/collect/collectKosisNew.do", options,  function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								$log.srvLogWrite("Z2", "01", "01", "03", "", "");
								$messageNew.open("알림", "등록되었습니다.");
								location.href='collectKosis';
								break;
							default:  
								$messageNew.open("알림", res.errMsg);
								break;
						}
					});				
				});
			}
	};
}(window, document));