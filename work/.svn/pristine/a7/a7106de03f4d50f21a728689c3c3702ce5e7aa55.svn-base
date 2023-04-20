
(function(W,D){
	W.$myPageMain = W.$myPageMain || {};
	$(document).ready(function(){
		$myPageMain.event.setUIEvent();	
		$myPageMain.ui.iconSetter();	// 클릭 아이콘 색 설정
	});
	
	//UI 내용작성
	$myPageMain.ui = {
			srtIdx : 0,
			currentPage : 1,
			maxCntPerPage : 6,
			
			isPwdCheck : false,
			isPwd2Check : false,
			isEmailCheck : true, // 수정이기때문에 기본값이 true
			isCellPhoneCheck : true,
			isPhoneCheck : true,
			isDepartCheck : true,
			
			/**
			 * 
			 * @name         : initView
			 * @description  : 화면을 초기화한다.
			 * @date         : 2018. 07. 17. 
			 * @author	     : 민준홍
			 * @history 	 :
			 */
			initView : function() {
				this.srtIdx = 0;
				this.currentPage = 1;
				this.maxCntPerPage = 6;
			},
			
			/**
			 * 
			 * @name         : iconSetter
			 * @description  : 아이콘 색을 변경한다
			 * @date         : 2018. 07. 17. 
			 * @author	     : 민준홍
			 * @history 	 :
			 */
			iconSetter : function(){
				var pageInfo = $("#pageInfo").val();
				if (pageInfo == "main"){
					$("#myPageMain").addClass("on");
					$myPageMain.request.doGetMemberInfo(); // 사용자 정보 가져오기
				}else{
					$("#myPageGroup").addClass("on");
					$myPageMain.request.doReqGroupMemberList(); // 그룹 멤버 가져오기
				}
			},
			
			/**
			 * 
			 * @name         : setParams
			 * @description  : 파라미터를 설정한다.
			 * @date         : 2018. 07. 16. 
			 * @author	     : 민준홍
			 * @history 	 :
			 * @param startIdx : 시작인덱스
			 */
			setParams : function(startIdx) {
				var searchText = $.trim($("#searchText").val());
				var searchType = $("#searchType option:selected").val();
				
				var resultCnt = $("#cntSelectBox").val();
				$myPageMain.ui.maxCntPerPage = resultCnt;
				
				var options = {	
					params : {
						startIdx : startIdx,
						resultCnt : resultCnt
					}
				};
				
				if (searchText.length > 0) {
					options.params["type"] = searchType;
					options.params["searchText"] = searchText;
				}
				
				return options;
			},
			
			/**
			 * 
			 * @name         : groupListViewPaging
			 * @description  : 그룹 멤버 테이블 페이징을 생성한다.
			 * @date         : 2018. 07. 12. 
			 * @author	     : 민준홍
			 * @history 	 :
			 * @param totalCount: 데이터 갯수
			 * @param totalPage : 총페이지 갯수
			 * @param pageSize : 한페이지당 데이터 갯수
			 * @param data :데이터
			 * @papram pageIndex : 페이지 인덱스
			 */
			groupListViewPaging : function(totalCount, totalPage, pageSize, data, pageIndex) {
				$('#groupPage').paging({
					current : pageIndex,
					max : totalPage,
					itemClass : 'number',
					itemCurrent : 'current',
					format : '{0}',
					next :  '>',
					prev : '<',
					first : '<<',
					last : '>>',
					data : data,
					onclick : function(e,page){
						$myPageMain.ui.srtIdx = (page - 1) * pageSize;
						$myPageMain.ui.currentPage = page;
						$myPageMain.request.doReqGroupMemberList($myPageMain.ui.srtIdx);
					}
				});
			},
			
			/**
			 * 
			 * @name         : doUpdate
			 * @description  : 회원정보 수정을 수행한다.
			 * @date         : 2018. 07. 04. 
			 * @author	     : 민준홍
			 * @history 	 :
			 */
			doUpdate : function() {
				if ($("#pw").val() != ""){ // 비밀번호 수정 확인
					if (confirm("비밀번호를 수정 하시겠습니까?") == true){
						if (this.pwValidateCheck()) {
							debugger
							$myPageMain.request.doReqPwUpdate();
						}
					}
				}else {
					if (confirm("회원정보를 수정 하시겠습니까?") == true){ // 임시 확인 메시지 창
						if (this.validateCheck()) {
							$myPageMain.request.doReqUpdate();
							
							// mng_s 2019. 06. 03 j.h.Seok
							$log.srvLogWrite("Z0", "01", "01", "02", "", "");
						}
					}
				}
			},
			
			/**
			 * 
			 * @name         : doDelete
			 * @description  : 회원정보 삭제를 수행한다.
			 * @date         : 2018. 07. 04. 
			 * @author	     : 민준홍
			 * @history 	 :
			 */
			doDelete : function() {
				if (confirm("회원정보를 삭제 및 탈퇴 하시겠습니까?") == true){ // 임시 확인 메시지 창
					if (this.validateCheck()) {
						$myPageMain.request.doReqDelete();
					}
				}
			},

			/**
			 * 
			 * @name         : pwValidateCheck
			 * @description  : 회원정보 수정 입력폼 파라미터를 체크한다.
			 * @date         : 2018. 07. 04. 
			 * @author	     : 민준홍
			 * @history 	 :
			 */
			pwValidateCheck : function() {
				var pw = $("#pw").val();
				var pwChk = $("#pw_chk").val();
				
				//pw 체크
				if (!this.isPwCheck) {
					if (pw != pwChk){
						$message.open("알림", "비밀번호를 확인해주세요.");
						return false;
					}
				}
				
				this.params = {};
				this.params = {
						pw : $aes.encrypt(pw),
				};

				return true;
			},
			
			
			/**
			 * 
			 * @name         : validateCheck
			 * @description  : 회원정보 수정 입력폼 파라미터를 체크한다.
			 * @date         : 2018. 07. 04. 
			 * @author	     : 민준홍
			 * @history 	 :
			 */
			validateCheck : function() {
				var institution = $("#institute option:selected").text();
				var depart = $("#dept").val();
				var email = $("#email").val();
				var cellPhone = $("#tel_no").val();
				var phone = $("#tel_no2").val();
				var instSeq = $("#institute option:selected").val();
				
				//부서 체크
				/*if (!this.isDepartCheck) {
					if (depart == null || depart == ''){
						$message.open("알림", "부서를 입력해 주세요.");
						return false;
					}
				}*/
				if (depart == null || depart == ''){
					$message.open("알림", "부서를 입력해 주세요.");
					return false;
				}else{
					if (!this.isDepartCheck) {
						$message.open("알림", "부서를 입력해 주세요.");
						return false;
					}
				}
				
				//이메일 체크
				if (email == null || email == ''){
					$message.open("알림", "이메일을 입력해 주세요.");
					return false;
				}else{
					if (!this.isEmailCheck) {
						$message.open("알림", "이메일 형식으로 입력해 주세요.");
						return false;
					}
				}
				
				//핸드폰 체크
				if (cellPhone == null || cellPhone == ''){
					$message.open("알림", "핸드폰 번호를 입력해 주세요.");
					return false;
				}else{
					if (!this.isCellPhoneCheck) {
						$message.open("알림", "- 기호를 제외한 핸드폰 번호를 입력해 주세요.");
						return false;
					}
				}
				
				//일반전화 체크  
				//일반전화 체크 무시
				/*if (!this.isPhoneCheck && $("#phoneArea").is(":visible")) {
					$message.open("알림", "일반 전화번호를 입력해 주세요.");
					phone = "";
					return false;
				}*/
				
				this.params = {};
				this.params = {
						institution : $aes.encrypt(institution),
						dept_nm : $aes.encrypt(depart),
						email : $aes.encrypt(email),
						cell_phone : $aes.encrypt(cellPhone),
						phone : $aes.encrypt(phone),
						inst_seq : $aes.encrypt(instSeq)
				};
				console.log(this.params);
				return true;
				
			},
			
			/**
			 * @name         : setDashBoardOptList
			 * @description  : 용량 표시 계산
			 * @date         : 2018. 07. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data	 : 이용정보
			 */
			number_to_human_size : function(x) {
				  var s = [' B', ' KB', ' MB', ' GB', ' TB', ' PB'];
				  var e = Math.floor(Math.log(x) / Math.log(1024));
				  return (x / Math.pow(1024, e)).toFixed(1) + "" + s[e];
			},
			
			/**
			 * @name         : setDashBoardOptList
			 * @description  : 용량 표시 계산 ( 퍼센트 게이지 계산 )
			 * @date         : 2018. 07. 11. 
			 * @author	     : 민준홍
			 * @history 	 :
			 * @param data	 : 이용정보
			 */
			number_cal_size : function(x, y) {
				  if (x == 0){
					 return 9;
				  }else {
					  y = y*1073741824;
					  var result = x / y * 100;
					  result = Math.round(result);
					  if(result < 10){
						  result = 10;
					  }
					  return result;
				  }
			},
			
			/**
			 * @name         : setDashBoardOptList
			 * @description  : 용량 표시 계산 ( 사용 가능한 용량 계산 )
			 * @date         : 2018. 07. 11. 
			 * @author	     : 민준홍
			 * @history 	 :
			 * @param data	 : 이용정보
			 */
			number_cal_usable_size : function(x, y) {
				  if (x == 0 || x == null || x == undefined){
					 y = y +" GB"
					 return y;
				  }else {
					  y = y*1073741824;
					  if(y > x){
						  var result = y - x;
						  result = $myPageMain.ui.number_to_human_size(result);
						  return result;
					  }else{
						  var result = "0 GB";
						  return result;
					  }
					  
				  }
			},
			
			
			/**
			 * 
			 * @name         : setGroupMemberList
			 * @description  : 그룹 멤버 표시를 설정한다.
			 * @date         : 2018. 07. 11. 
			 * @author	     : 민준홍
			 * @history 	 :
			 * @param data	 : 이용정보
			 */
			setGroupMemberList : function(data) {
			var	html  = '<tr>';
					html +=		'<th >직책</th>';
					html +=		'<th >이름</th>';
					html +=		'<th >E-mail</th>';
					html +=		'<th >휴대 전화</th>';
					html +=		'<th >직통 전화</th>';
					html +=	'</tr>';
				
			for(var i=0; i<data.length; i++){
				
				//휴대전화
				var tel = $myPageMain.util.isNullCheck(data[i].tel_no).replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([*]{4})/,"$1-$2-$3");
				
				//직통전화
				var tel2 = $myPageMain.util.isNullCheck(data[i].tel_no2).replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([*]{4})/,"$1-$2-$3");
				
				html +=		'<tr>'
				html +=			'<td >' + $myPageMain.util.isNullCheck(data[i].job_pos) + '</td>';
				html +=			'<td >' + $myPageMain.util.isNullCheck(data[i].user_nm) + '</td>';
				html +=			'<td >' + $myPageMain.util.isNullCheck(data[i].email) + '</td>'
				html +=			'<td >' + tel + '</td>';
				html +=			'<td >' + tel2 + '</td>';
				html +=		'</tr>';
			}		
			$("#groupMember").html(html);	
		},
		
		/**
		 * 
		 * @name         : setMemberInfo
		 * @description  : 사용자 정보를 설정한다.
		 * @date         : 2018. 07. 11. 
		 * @author	     : 민준홍
		 * @history 	 :
		 * @param data	 : 사용자정보
		 */
		setMemberInfo : function(data) {
			var memberInfo = data.memberInfo; // 정보 
			var memberInfoLength = Object.keys(memberInfo).length;
			var memberInfoKeys = Object.keys(memberInfo);
			
			// 사용공간/ 저장공간 수치 표시 start
			var useSz = memberInfo.use_sz; 		// 저장 공간
			var usedSz = memberInfo.used_sz; 	// 사용중인 공간
			var calUseSz ;								// 사용중인 공간 퍼센트 계산
			var calUsableSz;								// 사용 가능한 공간 계산
			
			calUseSz = $myPageMain.ui.number_cal_size(usedSz, useSz) // 사용량 백분율
			if (calUseSz > 100){
				calUseSz = "100%";
			}else{
				calUseSz = calUseSz + "%";
			}
			//calUseSz = $myPageMain.ui.number_cal_size(usedSz, useSz)+"%";  		// 사용량 백분율
			
			calUsableSz = $myPageMain.ui.number_cal_usable_size(usedSz, useSz); // 사용 가능한 공간 		
			
			if(usedSz == 0 || usedSz == null || usedSz == undefined){
				usedSz = '0 GB';
			}else{
				usedSz = $myPageMain.ui.number_to_human_size(usedSz); // 파일 사이즈 단위 변환
			}
			
			useSz = useSz + " GB";
			
			var useSzText = calUsableSz + "의 여유 공간 " + "(총: " + useSz +")";
			var useSzGageText = usedSz + " 사용중 ";
			
			// 조회 결과 표출
			$("#user_id").val(memberInfo.user_id);
			$("#user_nm").val(memberInfo.user_nm);
			$("#institute").val(memberInfo.inst_seq);
			$("#dept").val(memberInfo.dept);
			$("#email").val(memberInfo.email);
			$("#tel_no").val(memberInfo.tel_no);
			$("#tel_no2").val(memberInfo.tel_no2);
			$("#use_sz").text(useSzGageText);
			$("#used_sz").text(useSzText);
			$("#use_gage").css('width', calUseSz);
		}
			
			
	};
	
	$myPageMain.util = {
			
			/**
			 * 
			 * @name         : isNullCheck
			 * @description  : null 체크를 한다.
			 * @date         : 2018. 07. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param str	 : 데이터
			 */
			isNullCheck : function(str) {
				var text = "-";
				if (str != undefined && str != null && str != "") {
					text = str;
				}
				return text;
			}
	};
	
	
	//AJAX 내용작성
	$myPageMain.request = { 
			/**
			 * 사용자 정보 가져오기
			 */
			doGetMemberInfo : function(){
				var options = {
						isBeforSend : true
				};
				$ajax.requestApi(contextPath + "/api/member/getMemberInfo.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							$myPageMain.ui.setMemberInfo(res);
							break;
						default:
							$message.open("알림", res.errMsg);
							break;
					}
				});
			},
			
			
			/**
			 * 
			 * @name         : doUpdate
			 * @description  : 회원정보 수정을 수행한다.
			 * @date         : 2018. 07. 04. 
			 * @author	     : 민준홍
			 * @history 	 :
			 */
			doReqUpdate : function() {
				var options = {
					params : $myPageMain.ui.params
				};
				$ajax.requestApi(contextPath + "/api/member/updateMemberInfo.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							$message.open("알림", "회원정보를 수정하였습니다.", function() {
								$myPageMain.ui.params = {};
								location.reload();
							});
							break;
						default:
							$message.open("알림", "회원정보 수정을 실패하였습니다.");
							break;
					}
				});
			},
			
			
			/**
			 * 
			 * @name         : doReqPwUpdate
			 * @description  : 패스워드 수정을 수행한다.
			 * @date         : 2018. 07. 04. 
			 * @author	     : 민준홍
			 * @history 	 :
			 */
			doReqPwUpdate : function() {
				var options = {
					params : $myPageMain.ui.params
				};
				$ajax.requestApi(contextPath + "/api/member/updateMemberPw.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							alert("수정하였습니다.");
							break;
						default:
							alert("비밀번호 수정을 실패하였습니다.");
							break;
					}
				});
			},
			
			
			/**
			 * 
			 * @name         : doDelete
			 * @description  : 회원정보 삭제 탈퇴를 수행한다.
			 * @date         : 2018. 07. 04. 
			 * @author	     : 민준홍
			 * @history 	 :
			 */
			doReqDelete : function() {
				
				//테스트용 로그아웃 처리
				$message.open("알림", "로그아웃 되었습니다.");
				location.href = contextPath + '/view/auth/logout';
				
				//임시 탈퇴처리 작업중 주석 처리
				/*
 				var options = {
					params : $myPageMain.ui.params
				};
				$ajax.requestApi("/api/member/deleteMemberInfo.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							$message.open("알림", "회원정보를 삭제하였습니다.", function() {
								$myPageMain.ui.params = {};
								location.reload();
								
								$message.open("알림", "로그아웃 되었습니다.");
								location.href = '/auth/logout';
							});
							break;
						default:
							$message.open("알림", "회원정보 삭제 및 탈퇴에 실패하였습니다.");
							break;
					}
				});
				*/
			},
			
			
			/**
			 * 
			 * @name         : doReqGroupMemberList
			 * @description  : 그룹 멤버를 조회한다.
			 * @date         : 2018. 07. 11. 
			 * @author	     : 민준홍
			 * @history 	 :
			 */
			doReqGroupMemberList : function(startIdx) {
				var options = $myPageMain.ui.setParams(startIdx);
				$ajax.requestApi(contextPath + "/api/member/getGroupMemberList.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							if (res.result.length > 0) {
								var totalPage = Math.ceil( result[0].total / $myPageMain.ui.maxCntPerPage);
								$myPageMain.ui.groupListViewPaging(result[0].total, totalPage, $myPageMain.ui.maxCntPerPage, result, $myPageMain.ui.currentPage);
								$myPageMain.ui.setGroupMemberList(result);
							}else{
								$myPageMain.ui.setGroupMemberList(result);
							}
							break;
						default:
							break;
					}
				});
			}
			
		
	
	};
	
	//EVENT 내용작성
	$myPageMain.event = {

			setUIEvent : function(){
			
				//회원정보 수정 버튼
				$("#update").on("click", function() {
					$myPageMain.ui.doUpdate();
				});
				
				//회원정보 삭제 탈퇴 버튼
				$("#delete").on("click", function() {
					$myPageMain.ui.doDelete();
				});
				
				//부서 허용 체크
				$("#dept").keyup(function(e){
					var value = $(e.target).val();
					if (value.length < 2) {
						$myPageMain.ui.isDepartCheck = false;
						
						if (value.length == 0) {
							$("#dept_help").hide();
						}else {
							$("#dept_help").show();
						}
						
					}else {
						$myPageMain.ui.isDepartCheck = true;
						$("#dept_help").hide();
					}
				});
				
				//이메일 허용 체크
				$("#email").focusout(function(e){
					var value = $(e.target).val();
					if (!$commonFunc.emailValidateCheck(value) && value.length > 0) {
						$myPageMain.ui.isEmailCheck = false;
						$("#email_help").show();
						$message.open("알림", "이메일 형식으로 입력해주세요.");
					}else {
						$myPageMain.ui.isEmailCheck = true;
						$("#email_help").hide();
					}
				});
				
				//핸드폰번호 허용 체크
				$("#tel_no").focusout(function(e){
					var value = $(e.target).val();
					if (!$commonFunc.cellPhoneValidateCheck(value, false) && value.length > 0) {
						$myPageMain.ui.isCellPhoneCheck = false;
						$("#tel_no_help").show();
						$message.open("알림", "- 기호를 제외한 핸드폰 번호를 입력해 주세요.");
					}else {
						$myPageMain.ui.isCellPhoneCheck = true;
						$("#tel_no_help").hide();
					}
				});
				
				//전화번호 허용 체크
				$("#tel_no2").focusout(function(e){
					var value = $(e.target).val();
					if (!$commonFunc.phoneValidateCheck(value, false) && value.length > 0) {
						$myPageMain.ui.isPhoneCheck = false;
						$("#tel_no2_help").show();
						$message.open("알림", "- 기호를 제외한 전화 번호를 입력해 주세요.");
					}else {
						$myPageMain.ui.isPhoneCheck = true;
						$("#tel_no2_help").hide();
					}
				});
				
				//비밀번호 허용체크
				$("#pw").keyup(function(e){
					var value = $(e.target).val();
					if (!$commonFunc.pwValidateCheck(value) && value.length > 0) {
						$myPageMain.ui.isPwdCheck = false;
						$("#user_pw_help").show();
					}else {
						$myPageMain.ui.isPwdCheck = true;
						$("#user_pw_help").hide();
					}
				});
				
				//그룹 멤버 표시 수 셀렉트 박스
				$("#cntSelectBox").off().on("change",function(){
					var cnt = $(this).val();
					$("#cntSelectBox-styler>.jq-selectbox__select>.jq-selectbox__select-text").text(cnt + "개 보기");
					$myPageMain.request.doReqGroupMemberList(); // 그룹 멤버 가져오기
				});
				
			}
	};
	
}(window,document));