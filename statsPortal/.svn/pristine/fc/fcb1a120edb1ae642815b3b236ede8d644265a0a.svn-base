$(document).ready(function() {
	
//	alert('이벤트 기간이 아닙니다.');
//	window.close();
//	return;
 
	if(!navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad|)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
		 location.href = '/html/survey/2021_1/surveyWeb.jsp';
	}

	srvLogWrite( "A0", "15", "03", "00", "이벤트", "2021년 SGIS 이용자 설문조사 View-모바일" );
	apiLogWrite2('R0', 'R07', "이벤트", "2021년 SGIS 이용자 설문조사 View-모바일",  '00', '없음');

	var getProductHeight = $('.product.active').height();
	
	$('.m_cont').css({
		height: getProductHeight
	});
	
	if($('.product').data('productid') == '1'){
		$("#prev").hide();
	} else {
		$("#prev").show();
	}
	
	var productItem = $('.product'),
	productCurrentItem = productItem.filter('.active');
	
	$.ajax({
		method : "POST",
		async : true,
		url : "/ServiceAPI/map/allAddressList.json",
		data : {
			sido_cd : 11,
			base_year : 2019
		},
		success : function(res){
			if (res.errCd == "0") { 
				var result = res.result;
				if( result && result.sidoList ){
					var html = '<option value="">시도</option>';
					for( var i=0; i<result.sidoList.length; i++ ){
						html += '<option value="'+ result.sidoList[i].sido_cd+'">'+result.sidoList[i].sido_nm+'</option>';
					}
					$("#sidoSel").html( html );
				}
			}
		}
	});
	
	/*************** event ***************/ 
	
	$("#sidoSel").on("change",function(){
		$.ajax({
			method : "POST",
			async : true,
			url : "/ServiceAPI/map/sggAddressList.json",
			data : {
				sido_cd : $(this).val(),
				base_year : 2019
			},
			success : function(res){
				if (res.errCd == "0") {
					var result = res.result;
					if( result && result.sggList ){
						var html = '<option value="">시군구</option>';
						for( var i=0; i<result.sggList.length; i++ ){
							html += '<option value="'+ result.sggList[i].sgg_cd+'">'+result.sggList[i].sgg_nm+'</option>';
						}
						$("#sggSel").html( html );
						$("#admSel option").not("[value='']").remove()
					}
				}
			}
		});
	});
	
	$(".btn_cancel").click(function(){
		window.open('','_self','');
		window.close();
	});

	$(".btn_submit").click(function(){
		if( $("#tel_no").val() == "" ){ alert("핸드폰번호를 입력해주세요."); return false; }
		if( $("#sname").val() == "" ){ alert("성명을 입력해주세요."); return false; }
		if( $(".select[name='sex']").text() == "" ){ alert("성별을 선택해주세요."); return false; }
		if( $("[data-no='sex']").find(".select").text() == "" ){ alert("성별을 선택해주세요."); return false; }
		if( $("[data-no='survay15']").find(".select").text() == "" ){ alert("연령을 선택해주세요."); return false; }
		if( $("[data-no='survay16']").find(".select").text() == "" ){ alert("직업을 선택해주세요."); return false; }
		if( $("#sidoSel").val() == "" ){ alert("시도를 선택해주세요."); return false; }
		if( $("#sggSel").val() == "" ){ alert("시군구를 선택해주세요."); return false; }
		
		var jsonData = {};
		$.each( $(".answer_wrap"), function( idx, item ){
			var val = '';
			$.each( $( item ).find(".select"), function( idx2, item2 ){
				if( $( item2 ).closest(".answer_wrap").hasClass("dupok") ){
					val += ( idx2 == 0 ? "" : "," ) + "|" + $( item2 ).text() + "|";
				} else {
					val += ( idx2 == 0 ? '' : ',' ) + $( item2 ).text();
				}
				
				if( $( item2 ).hasClass("etc") && $( item2 ).closest(".answer").find("input").val() != "" ){
					jsonData[ $( item2 ).closest(".answer").find("input").prop("name") ] = $( item2 ).closest(".answer").find("input").val();
				}
			});
			if( val ){
				jsonData[ $( item ).data("no") ] = val;
			}
		});
		
		jsonData.tel_no = $("#tel_no").val();
		jsonData.name = $("#sname").val();
		if( $("#etc11").val() ){ jsonData.etc11 = $("#etc11").val(); }
		jsonData.survay17 = $("#sidoSel option:selected").text() + " " + $("#sggSel option:selected").text();
		jsonData.survay18 = $("#sidoSel").val() + " " + $("#sggSel").val();
		jsonData.sex = ( jsonData.sex == '1' ? "M" : "F" );
		jsonData.etc10 = "Mobile";
		
		$.ajax({
			 type:"POST",
			url: "/ServiceAPI/quiz/survey.json",
			data: jsonData,
			success:function(data){   
				if(data.result.resultCnt > 0){
					alert("수정되었습니다.");
					location.href = "/mobile";
				} else { 
					srvLogWrite( "A0", "15", "04", "00", "이벤트", "2021년 SGIS 이용자 설문조사 등록-모바일" ); 
					apiLogWrite2('R0', 'R08', "이벤트", "2021년 SGIS 이용자 설문조사 등록-모바일",  '00', '없음' );
					
					alert("등록되었습니다.");
					location.href = "/mobile";
				}
			},
			error:function(data){
				console.log(data);
			}
		});

		console.log( jsonData );
	});
	
	$(".num").parent().click(function(){
		var $span = $(this).find("span");
		if( $(this).closest(".answer_wrap").hasClass("dupok") ){
			if( $span.hasClass("select") ){
				if( $(this).closest(".answer_wrap").find(".select").length > 1 ){
					$span.removeClass("select");
					
					if( $(this).find(".etc").length > 0 ){
						$(this).find(".ainput").val("").attr("readonly", true);
					}
				}
			} else {
				if( $(this).find(".etc").length > 0 ){
					$(this).find(".ainput").attr("readonly", false).focus();
				}
				$span.addClass("select");
			}
		} else {
			if( $(this).find(".etc").length > 0 ){
				$(this).closest(".answer_wrap").find(".ainput").attr("readonly", false).focus();
			} else {
				$(this).closest(".answer_wrap").find(".ainput").val("").attr("readonly", true);
			}
			
			$(this).closest(".answer_wrap").find("span").removeClass("select");
			$span.addClass("select");
			
			if( ( productCurrentItem.data('productid') == '1' && $(this).find(".num").text() == '5' ) ||
					productCurrentItem.data('productid') == '16' ){
				$("#next").hide();
			} else {
				$("#next").show();
			}
		}
	});

	$("#next").on('click', function(e) {
		e.preventDefault();
		
		if( productCurrentItem.data('productid') != '14' && productCurrentItem.data('productid') != '15'
				&& !productCurrentItem.find(".select").text() ){
			alert("문항을 선택해주세요.");
			return false;
		}
		
		if( productCurrentItem.data('productid') == '15' && !$("#agree").is(':checked') ){
			alert('개인정보 수집에 동의하지 않으시면 설문에 참여하실 수 없습니다.');
			return false;
		}
		
		var nextItem = productCurrentItem.next();
		
		//6번 선택에 따라 6-1,6-2,7번으로 이동
		if( productCurrentItem.data('productid') == '11' ){
			var num = productCurrentItem.find(".select").text();
			if( num == '1' || num == '2' ){
				$("[data-productid='13']").find(".num").removeClass("select");
				$("[data-productid='13']").find(".ainput").val("").attr("readonly", true);
			} else if( num == '3' || num == '4' ){
				$("[data-productid='12']").find(".num").removeClass("select");
				$("[data-productid='12']").find(".ainput").val("").attr("readonly", true);
				nextItem = nextItem.next();
			} else if( num == '5' ){
				$("[data-productid='12'],[data-productid='13']").find(".num").removeClass("select");
				$("[data-productid='12'],[data-productid='13']").find(".ainput").val("").attr("readonly", true);
				nextItem = nextItem.next().next();
			}
		} else if( productCurrentItem.data('productid') == '12'){
			nextItem = nextItem.next();
		}
		
		productCurrentItem.removeClass('active');
		
		if (nextItem.length) {
			productCurrentItem = nextItem.addClass('active');
		} else {
			productCurrentItem = productItem.first().addClass('active');
		}
		
		if( productCurrentItem.data('productid') == '1' ){
			$("#prev").hide();
		} else {
			$("#prev").show();
		}
    
		if( productCurrentItem.data('productid') == '16' ){
			$("#next").hide();
		} else {
			$("#next").show();
		}

		calcProductHeight();
		//animateContentColor();
	});

	$("#prev").on('click', function(e) {
		e.preventDefault();

		var prevItem = productCurrentItem.prev();
	    
		//6번항목으로 이동
		if( productCurrentItem.data('productid') == '14' ){
			var val6 = $("[data-no='survay11']").find(".select").text();
			
			if( val6 == "1" || val6 == "2" ){
				prevItem = $("[data-productid='12']");
			} else if( val6 == "3" || val6 == "4" ){
				prevItem = $("[data-productid='13']");
			} else {
				prevItem = $("[data-productid='11']");
			}
		} else if( productCurrentItem.data('productid') == '13' ){
			prevItem = $("[data-productid='11']");
		}

		productCurrentItem.removeClass('active');

		if( prevItem.length ) {
			productCurrentItem = prevItem.addClass('active');
		} else {
			productCurrentItem = productItem.last().addClass('active');
		}
		if(productCurrentItem.data('productid') == '1'){
			$("#prev").hide();
		} else {
			$("#prev").show();
		}
		if(productCurrentItem.data('productid') == '16'){
			$("#next").hide();
		} else {
			$("#next").show();
		}

		calcProductHeight();

	});
	
});

function calcProductHeight() {
	getProductHeight = $('.product.active').height();
	
	$('.m_cont').css({
		height: getProductHeight
	});
}

function onlyNumber(obj){
	$(obj).keyup(function(){
		$(this).val($(this).val().replace(/[^0-9]/g,""));
	});   
}

function srvLogWrite(fClass1Cd, fClass2Cd, fClass3Cd, fClass4Cd, detCd, param) {
	var srvParam = { fClass1Cd: fClass1Cd, fClass2Cd: fClass2Cd, fClass3Cd: fClass3Cd, fClass4Cd: fClass4Cd};
	
	if((detCd != null && detCd != '') && (param != null && param != '')){
		srvParam = { fClass1Cd: fClass1Cd, fClass2Cd: fClass2Cd, fClass3Cd: fClass3Cd, fClass4Cd: fClass4Cd, detCd: detCd, param: param };
	} else if (detCd != null && detCd != ''){
		srvParam = { fClass1Cd: fClass1Cd, fClass2Cd: fClass2Cd, fClass3Cd: fClass3Cd, fClass4Cd: fClass4Cd, detCd: detCd };
	} else if (param != null && param != ''){
		srvParam = { fClass1Cd: fClass1Cd, fClass2Cd: fClass2Cd, fClass3Cd: fClass3Cd, fClass4Cd: fClass4Cd, param: param };
	}
	
	jQuery.ajax({
		type:"POST", 
		url: "/ServiceAPI/common/SRVLogWrite.json",
		data: srvParam,
		dataType:"json",
		async: true,
		success:function(data){ 
		},
		error:function(data) {
		}
	});
}

function apiLogWrite2(type, api_id, title, parameter, zoomLevel, adm_nm) {
	var srvParam = { type: type, api_id: api_id, title: title, parameter: parameter, zoomLevel: zoomLevel, adm_nm: adm_nm};
	
	jQuery.ajax({
		type:"POST",
		url: "/ServiceAPI/common/APILogWrite.json",
		data: srvParam,
		dataType:"json",
		async: true,
		success:function(data){ 
		},
		error:function(data) {
		}
	});
}