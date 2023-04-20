(function(W, D) {
	W.$mobileEvent = W.$mobileEvent || {};
	
	$(document).ready(function(){
		var d = new Date();
		var year = d.getFullYear();
		var month = d.getMonth()+1;
		month = ( month < 10 ? '0'+month : month );
		var date = d.getDate();
		date = ( date < 10 ? '0'+date : date );
		
		var dt = year+''+month+''+date; 
		
		if( Number( dt ) < 20180401 ){
			alert('이벤트 참여기간이 아닙니다.');
			
			$('#wrap').attr('style','display:none;').hide();
			
			location.href = contextPath;
		}
		
		$(".btnOX").click(function( e ){
			var agreement = $("input[name=agreement]:checked").val();
			
			if( ( $mobileEvent.step == 7 && agreement == 'X' ) || ( $mobileEvent.step == 7 && agreement != 'O' ) ){
				alert('개인정보수집 동의 후 참여 완료하실 수 있습니다.');
				return;
			} else if( $mobileEvent.step == 8 ){
				var user_name = $("#user_name").val();
				var user_hp = $("#user_hp").val();
				
				var regex1 = /^[가-힣a-zA-Z]+$/;
				
				if( user_name != '' && typeof user_name != 'undefined' ){
					user_name = user_name.replace(/\s/g,'');
				}
				
				if( user_name == '' || user_name.length < 2 || !regex1.test( user_name ) ){
					alert('성명을 확인해주세요.');
					return;
				}
				
				var regex2 = /^[0-9-+]+$/;
				var regex3 = /^(01[016789])\d{3,4}\d{4}$/;
				
				if( user_hp != '' && typeof user_hp != 'undefined' ){
					user_hp = user_hp.replace(/-/gi,'').replace(/\s/g,'');
				}
				
				if( user_hp == '' || !regex2.test( user_hp ) || !regex3.test( user_hp ) ){
					alert('휴대전화번호를 확인해주세요.');
					return;
				}
				
				$mobileEvent.submit( 'sel' );
			} else {
				if( $mobileEvent.step <= 5 ) {
					var ox_val = $( e.currentTarget ).val();
					$( e.currentTarget ).closest('div').find('input[name=ox_val]').val( ox_val );
				} 
				if( $mobileEvent.step > 4 ){
					$("#titleImg").attr('style','display:none;').hide();
				}
				
				$( e.currentTarget ).closest('.qdiv').attr('style','display:none;').hide();
				$( e.currentTarget ).closest('.qdiv').next('div').attr('style','').show();
				
				apiLogWrite2("R0", "R03", "이벤트", "2018년 OX 퀴즈", "00", "없음");
				
				$mobileEvent.step = ( $mobileEvent.step + 1 );
			}
		});
		
	});
	
	$mobileEvent = {
		step : 1,
		// 게시판 목록 생성,
		data : function( gubun ){
			var rtn = {
		 			"gubun" : gubun,
		 			"ox_1" : $("#ox_val1").val(),
		 			"ox_2" : $("#ox_val2").val(),
		 			"ox_3" : $("#ox_val3").val(),
		 			"ox_4" : $("#ox_val4").val(),
		 			"ox_5" : $("#ox_val5").val(),
		 			"sex" : $("input[name=sex]:checked").val(),
		 			"name" : $("#user_name").val().replace(/\s/g,''),
		 			"tel_no" : $("#user_hp").val().replace(/-/gi,'').replace(/\s/g,'')
	 		};
			
			if( $("#bigo1").val() != '' ){
				rtn.bigo1 = $("#bigo1").val(); 
			}
			
			return rtn;
		},
		submit : function( gubun ) {
			$.ajax({
		 		type:"POST",
		 		url: "/ServiceAPI/quiz/quiz2017.json",
		 		data: $mobileEvent.data( gubun ),
		 		success:function( data ){
		 				//	alert("제출이 완료되었습니다.")
		 					if( data.result.resultCnt > 0 ){
		 						if( confirm("입력된 휴대전화번호로 등록된 데이터가 있습니다. 수정하시겠습니까?") ){
		 							oxSubmit( 'mod' );
		 						}
		 					} else {
		 						oxSubmit( 'reg' );
		 					}
						},
		 		error:function(data){
		 		//	alert("정확하지 않거나 범위를 넘어선 값이 있습니다. 다시 실행해주세요.");
		 		//	closeWindow();
	 			}
	 		});
		}
	};
	
	function oxSubmit( gubun ){
		$.ajax({
	 		type:"POST",
	 		url: "/ServiceAPI/quiz/quiz2017.json",
	 		data: $mobileEvent.data( gubun ),
	 		success:function( data ){
	 			alert("제출이 완료되었습니다. 감사합니다.");
	 			location.href = contextPath;
	 			
	 			apiLogWrite2("R0", "R04", "이벤트", "2018년 OX 퀴즈 등록 및 수정", "00", "없음");
				//window.close();	 				
			},
	 		error:function(data){
	 		//	alert("정확하지 않거나 범위를 넘어선 값이 있습니다. 다시 실행해주세요.");
	 		//	closeWindow();
 			}
 		});
	}

}(window, document));