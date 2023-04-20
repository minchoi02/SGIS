/**
 * 월간통계 Left 메뉴에 관한 클래스
 * 
 * history : 2018.08.23  초기 작성
 * author : jrj
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$pyramidLeftMenu = W.$pyramidLeftMenu || {};
	
	$(document).ready(function() {
		var html = '';
		for(var i=$pyramid.firstYear; i<=$pyramid.lastYear; i++){
			var selected = ( i == $pyramid.selYear ? 'selected="selected"' : '');
			html += '<option value="'+ i +'" '+selected+'>'+ i +'연도</option>';
		}
		
		$(".mainIndex_year").html( html );
		
		$(".stepClose").addClass("on");//20년수정반영
		$('div.quickBox.step01 > div.bottom > .stepClose').addClass('step01_stepClose');//목록 닫기버튼은 class 를 추가, 메뉴 여/닫기 버튼과 구별 //200423수정 (7번. LeftMenu 닫기 버튼 안됨 , 소스추가 - 분석지도(인구 피라미드))
		quickEvent();
		openMenu( $pyramid.type );
		
		console.log('type>>>>',$pyramid.type);
		
		if( $pyramid.type == '3' ){
			$pyramid.setYears();
		}
	});
	
	$pyramidLeftMenu = {
		doMaxSize : function(){
			var ck = $(".tb_sizing").hasClass("on");
			if(!ck){
				$(".tb_sizing").addClass("on");
				$(".tb_sizing").children().attr("src","/img/ico/ico_toolbars12.png");
//				$("header").css({"height":"10px", "width":"100%"}); 
				$(".global_nav, .searchArea, .headerEtc, .gnb, .headerContents form").hide(); // 2020.10.22 '.global_nav, .searchArea,' 추가
				$(".headerContents h1").css({"height":"10px"});
				$(".headerContents h1 img").hide();
				$(".containerBox").css({"height":"calc(100% - 10px)", "top":"10px"});
			}else{
				$(".tb_sizing").removeClass("on");
				$(".tb_sizing").children().attr("src","/img/ico/ico_toolbars01.png");
//				$("header").css({"height":"104px", "width":"970px"}); 
				$(".global_nav, .searchArea, .headerEtc, .gnb, .headerContents form").show(); // 2020.10.22 '.global_nav, .searchArea,' 추가
				$(".headerContents h1").css({"height":"78px"});
				$(".headerContents h1 img").show();
				$(".containerBox").css({"height":"calc(100% - 104px)", "top":"104px"});
			}
	    },
	    
	    reportDataSet : function(){
	    	var url = "/jsp/pyramid/include/report/reportForm.html";
	    	$pyramid.ui.reportPopup = 
	    		window.open(url, "reportPrint","width=850, height=700, scrollbars=yes");
	    }
	}
}(window, document));

function quickEvent(){
	var body = $("body");
	
	//200423수정 시작 (7번. LeftMenu 닫기 버튼 안됨 , 소스추가 - 분석지도(인구 피라미드))
	//목록 열기+닫기 , 일반 닫기 버튼 (.stepClose)와 별개로 콜백 메서드 작성
	body.on("click", ".stepClose.step01_stepClose ", function(){
        var $this = $(this);					// 목록 닫기 버튼
        var checkClose = $this.hasClass('on');	// 해당 닫기 버튼에 "on" 클래스 여부 확인 - 있다면 닫기 버튼, 없다면 열기 버튼
        if(checkClose) {						//목록 닫기					
        	$this.removeClass('on');
        	$(".quickBox.step01").stop().animate({"left":"-220px"},200);
        } else {    							//목록 열기	
        	$this.addClass("on");
        	$(".quickBox.step01").stop().animate({"left":"0"},200);
        	$(".shadow").hide(); 
        }
    });
	//200423수정 끝 (7번. LeftMenu 닫기 버튼 안됨 , 소스추가 - 분석지도(인구 피라미드))
	
	//메뉴 열기
	body.on("click", ".sideQuick.sq02, .stepClose", function(){ //20년수정반영
		if($(this).hasClass('step01_stepClose')) return; //200423수정 (7번. LeftMenu 닫기 버튼 안됨 , 소스추가 - 분석지도(인구 피라미드))
		
		var on = $(this).hasClass("on");
		if(!on){
			$(".quickBox .bottom > a.stepClose").addClass("on");//20년수정반영
			openMenu( $pyramid.type );
//			$(".sideQuick.sq02").stop().animate({"left":"0"},200);
//			$(".quickBox.step01").stop().animate({"left":"0"},200);
//			$(".interactiveBar h3").stop().animate({"left":"220px"},200);
//			$(".shadow").hide(); 
//			$(this).find("span").show();
//			$(this).addClass("on");//20년수정반영
			$(".sideQuick.sq02").addClass("on");//20년수정반영
		}else{
			$(".quickBox .bottom > a.stepClose").removeClass("on");//20년수정반영
			stepCloseAnimate(1,true,$pyramid.type); //20년수정반영
			$(this).find("span").show();
			//$(this).removeClass("on");//20년수정반영
			$(".sideQuick.sq02").removeClass("on");//20년수정반영
		} 
	}); 
	
	//대메뉴 선택
	body.on("click", "#prntMenuList>li", function(){ 
		var type = $( this ).data('type');
		
		if( !$(this).hasClass("on") ){
			location.href = contextPath + "/jsp/pyramid/pyramid"+type+".jsp"; 
		} else {
			openMenu( $pyramid.type );
		}
	}); 
	
	//중메뉴 선택
	body.on("click", ".nav-list>li", function(){
		var type = $( this ).data('type');
		
		if( !$(this).hasClass("on") ){
			location.href = contextPath + "/jsp/pyramid/pyramid"+type+".jsp";
		}
	}); 
	
	//메뉴 열기
	body.on("click", ".stepPrevBtn", function(){ 
		$(".quickBox .bottom > a.stepClose").addClass("on");//20년수정반영
		stepCloseAnimate( parseInt( $(this).data("closeidx") ), true );
		$("div[id^=labellist_]").each(function(a,b){
		    $(b).stop().animate({"left":"-300"},200);
		});
		$(".nav-sidebar").stop().animate({"left":"-80px"},200);
		$(".quickBox.step01").stop().animate({"left":"0"},200);
		$(".shadow").hide(); 
		$(this).find("span").show();
	}); 
	
	//20년수정반영 시작(주석처리)
	/*//닫기버튼
	body.on("click",".stepClose",function(){ 
        stepCloseAnimate( parseInt( $(this).data("closeidx") ) );
    }); */
	//20년수정반영 끝(주석처리)

	//피라미드1 라디오버튼
	body.on("click",".stepBox label",function(){
		$(".stepBox label").removeClass("on");
		$(this).addClass("on");
		
		var $radio = $(this).closest('li').find('input:radio');
		$pyramid.selEleNm = $radio.data('elenm');
		
		$(".compareBox>.typeBox>a").eq(0).click();
		
		$pyramid.strType = $radio.val();
		$pyramid.strNm = ( $pyramid.strType == "M" ? "중위" : ( $pyramid.strType == "H" ? "고위" : "저위" ) );
		
		var apiCode = ( $pyramid.strType == "M" ? "01" : ( $pyramid.strType == "H" ? "02" : "03" ) );
		srvLogWrite( "K0", "02", "02", apiCode, "전국인구추계피라미드", "인구추계:"+$pyramid.strNm+",연도:"+$pyramid.selYear ); //jrj 로그 > 인구성장 가정 - 중위,고위,저위
		
		if( $pyramid.type == '3' ){
			$pyramid.reloadPyramid( '0' );
		} else {
			$pyramid.changeData( $pyramid.selYear );
		}
		
		if( $(".menuAutoClose>label").hasClass("on") ){
			stepCloseAnimate(1);
		}
    });
	
	//피라미드2 비교지역
	body.on("change",".area_select",function(){
		var classnm = '.'+$(this).data("classnm");
		var areaNm = $(this).find('option:selected').text();
		
		$(classnm).text( areaNm );
		$pyramid.changeData( $pyramid.selYear );
		
		srvLogWrite( "K0", "02", "03", "02", "시도인구추계피라미드", "지역:"+areaNm+",연도:"+$pyramid.selYear ); //jrj 로그 > 기준연도 선택 보기
		
		if( $(".menuAutoClose>label").hasClass("on") ){
			stepCloseAnimate(1);
		}
    });
	
	body.on("click",".menuAutoClose_radio",function(){
		if( $(".menuAutoClose>label").hasClass("on") ){
			$(".menuAutoClose>label").removeClass("on");
		} else {
			$(".menuAutoClose>label").addClass("on");
		}
	});
	
	body.on("change", ".mainIndex_year", function( e ){
		$pyramid.selYear = $(e.currentTarget).val();
		
		var apiCode1 = "";
		var apiCode2 = "";
		var strNm = "";
		
		if( $pyramid.type == 1 ){
			apiCode1 = "02"; apiCode2 = "04";
		} else {
			apiCode1 = "03"; apiCode2 = "01";
		}
		
		var areaNms = "지역:"+$("#areaSel1 option:selected").text()+"/"+$("#areaSel2 option:selected").text()+"/"+$("#areaSel3 option:selected").text();
		
		srvLogWrite( "K0", "02", apiCode1, apiCode2, ( $pyramid.type == "1" ? "전국인구추계피라미드" : "시도인구추계피라미드" ), 
				($pyramid.type == "1" ? "인구추계:"+$pyramid.strNm : areaNms )+",연도:"+$pyramid.selYear ); //jrj 로그 > 기준연도 선택 보기
		
		if( $pyramid.type == '3' ){
			$pyramid["selYear" + $(this).data("yearid")] = $(e.currentTarget).val();
			$pyramid.reloadPyramid( $(this).data("yearid")+"" );
		} else {
			$pyramid.changeData( $pyramid.selYear );
		}
	});
	
}

function openMenu( type ){
//	$( this ).addClass("on");
	$("#prntMenuList li[data-type='"+ type +"']").addClass("on");
	$(".quickBox.step01").stop().animate({"left":"-244px"},200);
	
	console.log( 'type', type );
	
	$("#labellist_"+type).css("display","").show().stop().animate({"left":"80"},200);
	
//	$(".interactiveBar h3").stop().animate({"left":"348px"},200);
	$(".nav-sidebar").stop().animate({"left":"0px"},200);
	$(".shadow").hide();
	
	$(".nav-sidebar").stop().animate({"left":"0px"},200);
	$( '#submenu_'+type ).addClass("on");
}

//왼쪽메뉴 닫기
function stepCloseAnimate( inx, on, target ){//20년수정반영
	var time = 300;
    var fx = '.quickBox'; 
    var btn = '.sideQuick.sq02';
    
    if( inx == 1 ){
    	 $(fx+'#labellist_'+target).animate({"left":"-279px"}, time);//20년수정반영
    	 //$(fx+'.step02').css({"left":"-280px"}); //20년수정반영
         //$(fx+'.step02').animate({"left":"-1120px"}, time);//20년수정반영
         $(fx+'.step01').animate({"left":"-280px"}, time);   
         $(btn).find("span").show();
         $(btn).css("width","95px");
         $(".shadow").hide();
    } else {
    	$(fx+'#labellist_'+target).animate({"left":"-279px"}, time);//20년수정반영
    	$(fx+'.step01').stop().animate({"left":"-220px"},200);
        $(fx+'.step02').animate({"left":"-1120px"}, time);
        $(fx+'.step01').animate({"left":"-280px"}, time);   
        $(btn).find("span").show();
        $(btn).css("width","95px");
        $(".shadow").hide();
    }
    
    if( !on ){
    	$(btn).stop().animate({"left":"0"},time).removeClass("on");
    }
    
    $(fx).dequeue("step0"+inx); 
//    $(".interactiveBar h3").stop().animate({"left":"0"},200);
	$(".nav-sidebar").stop().animate({"left":"-80px"},200);
}
