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
	W.$reportForm = W.$reportForm || {};
	
	$(document).ready(function() {
		if (window.opener.$pyramid != undefined) {
			window.opener.$pyramid.ui.reportLoad();
		}
		
		setTimeout(function() {
			$("#mask").hide();
			if( window.opener.$pyramid.type == "1" ){
				$(".pntChart").attr("style","height:445px;");
			} else {
				if( window.opener.$pyramid.type == "3" ){
					$(".pyramid1").css("display","none").hide();
					$(".pyramid3").css("display","").show();
					if( !window.opener.$("#disp3").prop("checked") ){
						$(".w250").removeClass("w250").addClass("w387");
						$("#pyramid3Chart1").css("margin-right","22px");
						$("#pyramid3Chart3").css("display","none").hide();
					} else {
						$("#pyramid3Chart2").css("margin","0px 22px");
					}
					$(".pntChart").attr("style","height:300px;");
				} else {
					$(".pyramid2").css("display","").show();
					$(".pntChart").attr("style","height:360px;");
				}
			}
		}, 500);
	});
	
	$reportForm.ui = {
		
		setTitle : function( title, year, item ){
			$("#reportTitle").text( title );
			$("#searchYear").text( year );
			$("#date").text( $reportForm.ui.getToday() );
			$("#origin").text('통계청');
			
			if( window.opener.$pyramid.type == "1" ){
				$("#searchItemTitle").text("인구 추계");
				$("#searchItem").text( ( item == "M" ? "중위" : ( item == "H" ? "고위" : "저위" ) ) );
			} else {
				if( window.opener.$pyramid.type == "2" ){
					$("#searchItemTitle").text("비교지역");
				} else {
					$("#searchItemTitle").text("비교연도");
					$("#searchYear").closest(".pntNewCenter").css("display","none").hide();
				}
				$("#searchItem").text( item );
			}
		},
		
		setChart : function( data, divId, title ){
			var html = "<img src='"+data+"'/>"; // width=655 height=455
			$( divId ).closest(".pntNewCenterTitle").find("h3").html( title );
			$( divId ).append( html );
		},
		
		setTable : function( divId, thead, tbody ){
			$( divId +">table>thead" ).html( thead );
			$( divId +">table>tbody" ).html( tbody );
		},
		
		onOffDiv : function( value ) {
			if( $("#" + value).css("display") == "none" ){
				$("#" + value + "_show").hide();
				$("#" + value).show();
			} else {
				$("#" + value).hide();
				$("#" + value + "_show").show();
			}
		},
		
		//오늘날짜 가져오기
		getToday : function() {
			var today = new Date();
	 			var y = today.getFullYear();
	 			var m = today.getMonth()+1;
	 			var d = today.getDate();
	 			var h = today.getHours();
	 			var mn = today.getMinutes();
	 			
	 			var returnDate = "";
	 			if(m < 10) {
	 				m = "0" + m;
	 			}
	 			if(d < 10) {
	 				d = "0" + d;
	 			}
	 			if(h < 10) {
	 				h = "0" + h;
	 			}
	 			if(mn < 10) {
	 				mn = "0" + mn;
	 			}
	 			returnDate = y + "년 " + m + "월 " + d + "일 " + h + "시 " + mn + "분";
	 			
	 			return returnDate;
		}
		
	}
	
}(window, document));

