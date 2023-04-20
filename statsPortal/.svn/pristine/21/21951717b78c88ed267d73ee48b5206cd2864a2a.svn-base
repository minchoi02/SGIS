/**
 * 월간통계 데이터보드에 관한 클래스
 * 
 * history : 2018.09.07  초기 작성
 * author : jrj
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$pyramidDataBoard = W.$pyramidDataBoard || {};
	
	$(document).ready(function() {
		$("#boardType"+$pyramid.type).css("display","").show();
		
		sideEvent();
	});
	
	$pyramidDataBoard = {
		
		//표 엑셀 다운로드
		excelDown : function(){
			var myForm = document.excelDownForm;
			$("#excelDownForm").html("");
			
			var titleData = [];
			
			if( $pyramid.type == 1 ){
				$("#boardType"+$pyramid.type).find("thead>tr>th").each(function(){
					titleData.push($(this).html());
				});
				
				var excelDataElement = document.createElement("input");
				excelDataElement.type = "hidden";
				excelDataElement.name = "excelData";
				excelDataElement.value = titleData;
				myForm.appendChild(excelDataElement)
			} else if( $pyramid.type == 2 ) {
				myForm.appendChild($('<input type="hidden" name="excelData" value="'+[" ",$("#boardType2 .areanm1").text()," ",$("#boardType2 .areanm2").text()," ",$("#boardType2 .areanm3").text()," "]+'">')[0]);
				myForm.appendChild($('<input type="hidden" name="excelData" value="'+["연령","남자","여자","남자","여자","남자","여자"]+'">')[0]);
			} else {
				var arr1 = [" ",$("#boardType3 .yearnm1").text()," ",$("#boardType3 .yearnm2").text()," ",$("#boardType3 .yearnm3").text()," "]
				var arr2 = ["연령","남자","여자","남자","여자","남자","여자"];
				
				if( !$("#disp3").prop("checked") ){
					arr1.splice(5,2);
					arr2.splice(5,2);
				}
				myForm.appendChild($('<input type="hidden" name="excelData" value="'+arr1+'">')[0]);
				myForm.appendChild($('<input type="hidden" name="excelData" value="'+arr2+'">')[0]);
			}
			
			$("#boardType"+$pyramid.type).find("tbody>tr:visible").each(function(){
				var contentData = [];
				
				$(this).find("td:visible").each(function(i){
					var tmpContentData = $(this).html();
					if (i!=0) {
						tmpContentData = parseFloat(tmpContentData.replace(/,/gi, ""));
						tmpContentData = ( isNaN( tmpContentData ) ? '-' : tmpContentData );
					}
					contentData.push(tmpContentData);
				});
				var excelDataElement = document.createElement("input");
				excelDataElement.type = "hidden";
				excelDataElement.name = "excelData";
				excelDataElement.value = contentData;
				myForm.appendChild(excelDataElement)
			});
			
			 var url = "/view/map/interactiveExcelDown";
			 window.open("" , "_self", "enabled"); 
			 myForm.action = url; 
			 myForm.method="post";
			 myForm.target="_self";
			 myForm.submit();
		}
	}
	
	$pyramidDataBoard.ui = {
		//데이터보드 열기
		dataBoardOn : function( e, adm_cd ){
			var self = $(".interactiveDataBoard");
			var ck = $( self ).hasClass("on");
			
			if (!ck) {
				var full = $(".dataSideBox").hasClass("full");
				
				$(".dataSideBox").stop().animate({ "right": "50" }, 200);
				$(".colorMapLegend").stop().animate({ "right": "610px" }, 200);
				
				if (!full) {
					$( self ).addClass("on").stop().animate({ "right": "475px" }, 200);
				} else {
					$( self ).addClass("on").stop().animate({ "right": "670px" }, 200);
				}
				
				var apiCode1 = "";
				var apiCode2 = "";
				
				if( $pyramid.type == 1 ){
					apiCode1 = "02"; apiCode2 = "08";
				} else {
					apiCode1 = "03"; apiCode2 = "06";
				}
				
				var areaNms = "지역:"+$("#areaSel1 option:selected").text()+"/"+$("#areaSel2 option:selected").text()+"/"+$("#areaSel3 option:selected").text();
				
				srvLogWrite( "K0", "02", apiCode1, apiCode2, ( $pyramid.type == "1" ? "전국인구추계피라미드" : "시도인구추계피라미드" ),
						($pyramid.type == "1" ? "인구추계:"+$pyramid.strNm : areaNms )+",연도:"+$pyramid.selYear ); //jrj 로그 > 데이터 보기
			}
			
			if( adm_cd && ( $("#sidoList").val() != adm_cd ) ){
				$("#sidoList").val( adm_cd ).trigger("change", true);
			}
		}
	}
}(window, document));

//데이터보드 event
function sideEvent() {
	//스크롤
	$(".scrollBox, .dataSideScroll, .scrolls, .mapResultList").mCustomScrollbar({ axis: "xy" });
	
	$("body").on("click", ".dataSideBox .bar>a", function() {
		$(".dataSideBox").stop().animate({ "right": "-1500px" }, 200);
		$(".colorMapLegend").stop().animate({ "right": "130px" }, 200);
		$(".interactiveDataBoard").removeClass("on").stop().animate({ "right": "0" }, 200);
	});
	
	//데이터보드 열기,닫기
	$("body").on("click", ".interactiveDataBoard", function( e ) {
		var ck = $( self ).hasClass("on");
		
		if (!ck) {
			$pyramidDataBoard.ui.dataBoardOn( e );
		} else {
			$(".dataSideBox").stop().animate({ "right": "-1500px" }, 200);
			$(".colorMapLegend").stop().animate({ "right": "130px" }, 200);
			$( self ).removeClass("on").stop().animate({ "right": "0" }, 200);
		}
	});
	
	$("body").on("click",".btn_excelDownload",function(){
		$pyramidDataBoard.excelDown();
	});
	
	//데이터보드 투명바
	$("#dataSlider").slider({
		range: "min",
		min: 5,
		max: 10,
		value: 10,
		slide: function(event, ui) {
			$(".dataSideBox, .interactiveDataBoard").css("opacity", ui.value * 0.1);
		}
	});
	
	$(".dataSideBox, .interactiveDataBoard").css("opacity", $("#dataSlider").slider("value"));
}

