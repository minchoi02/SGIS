/**
 * @description : show, hide 감지
 * @date : 2020.07.17
 * @author : 박은식
 * @history :
 */
(function ($) {
  $.each(['show', 'hide'], function (i, ev) {
    var el = $.fn[ev];
    $.fn[ev] = function () {
    this.trigger(ev);
    return el.apply(this, arguments);
    };
  });
})(jQuery);

(function(W, D) {
	W.$communityView = W.$communityView || {};
	$(document).ready(function(){
		//$('#lifeEnvironmentToggle').css('margin-top', ($('.Maintit').height()+$('.Subtit').height()+($('.sub_header').height()+10)+"px"));
		$communityView.event.setUIEvent();
	});
	$communityView.ui = {
		all:{//전체
			page : 1,
			pageSize : 3,
			keywords : null,
			makeLists : function(){
				$communityPoi.ui.getList("all");
			}
		}
	};
	$communityView.event = {
		
		// UI에서 사용하는 이벤트 및 초기설정을 수행한다.
		setUIEvent: function() {
			//20200902 박은식 로그인 로그아웃 버튼 로직 추가 start
			if(sop.isLogin == true || sop.member_id != undefined){
				/** 2020.09.10[한광희] 로그아웃 버튼 수정 START */
				$(".btn_register").attr("style", "margin-left:10px;");
				$("#log_in_out").show();
				/** 2020.09.10[한광희] 로그아웃 버튼 수정 END */
				$("#log_in_out").text("로그아웃")
				$("#log_in_out").attr("href", "javascript:$communityView.event.logout()");
			}else{
				/** 2020.09.10[한광희] 로그아웃 버튼 수정 START */
				$(".btn_register").attr("style", "margin-left:auto;");
				$("#log_in_out").hide();
				/*$("#log_in_out").text("로그인")
				$("#log_in_out").attr("href", "/mobile/m2020/login/login.sgis");*/
				/** 2020.09.10[한광희] 로그아웃 버튼 수정 END */
			}
			//20200902 박은식 로그인 로그아웃 버튼 로직 추가 start
			$communityMapPoi.ui.getList("markers");
			$communityMapPoi.ui.getList("all");
			//POI 버튼 클릭 이벤트
			$(".dataPoiBtn").click(function(){
				common_poiPopupCall();
			});
			$("a[data-tab=true]").click(function(){

				$(this).toggleClass("M_on");
				$("#"+$(this).data('type')+"-community").children(".OpenArea").toggleClass('Open');
				$("#community-keyword").val($communityView.ui[$(this).data("type")].keywords);
				return false;
			});
			$("#community-search").submit(function(){
				var obj = $communityView.ui[$("a[data-tab=true]").data("type")];
				obj.page = 1;
				obj.keywords = $("#community-keyword").val();
				obj.makeLists();
				return false;
			}); 
			$("#poi-login-button").click(function(){
				//20200901 박은식 로그인이 필요한 소통지도 로그인 유도 팝업 추가 start
				//loginConform(contextPath+"/m2020/map/community/form.sgis?id="+getParameter("id"));  //20200901 박은식 로그인 이전 로그인 페이지 유도 팝업 삭제 (지역현안 소통지도 등록에 사용하기 위함)
				common_confirm('로그인이 필요합니다.<br/>이동하시겠습니까?', 
								function(){
									location.href=contextPath+"/m2020/login/login.sgis"
								}, 
								function(){
									return false;
								})
				//20200901 박은식 로그인이 필요한 소통지도 로그인 유도 팝업 추가 end
			});
			$("#poi-register-end-button").click(function(){
				common_alert("기간이 종료된 소통지도입니다.","");
			});
			$("#poi-register-wait-button").click(function(){
				common_alert("승인대기중입니다","");
			});
			$("#poi-register-join-button").click(function(){
				common_alert("참여승인 요청하시겠습니까?",[{
					title:"승인요청",
					func : function() {
						$.ajax({
							type: "POST",
							url: contextPath+"/community/join.json",
							data:{
								id : getParameter("id")
							},
							dataType: "json",
							async : false,
							success: function(res) {
								if(res.errCd=="0"){
									common_alert("가입 승인요청 되었습니다.",function(){
										location.reload(true);
									});
								}else{
									common_alert(res.errMsg,"");
								}
							},
							error: function(xhr, status, errorThrown) {
								common_alert(errorMessage, "");
							}
						});
					}
				},{title:"취소"}]);
			});
			$("#poi-register-button").on('click',function(){
				srvLogWrite('O0', '20', '02', '02', '', '');
				
				$communityMapPoi.ui.markerInit();
				$("#map,.Community_map,.Community_cont").hide();
				
				//초기화
				$communityForm.ui.cmmnty_poi_id = '';
				$("#cmmnty_title,#file_input_textLocation,#deleteFileList").val("");
				$("#file-list ul li").remove();
				$("#cmmnty_opinion_state").html("");
				
				$("#community-form").show();
				
				var grant_yn = communityMapInfo.cmmnty_partcptn_grant_yn;
				
				if( $communityMapPoi.ui.mode != 'M' ){
					$(".idPwDiv1").hide();
					
					if( sop.member_id && /N|Y/.test( grant_yn ) ){
						$(".idPwDiv2").hide();
					} else {
						$(".idPwDiv2").show();
					}
					
					$("#insert-form").show();
					$(".modify").text("등록");
				} else {
					var checkVisible = false;
					
					if( sop.member_id ){//로그인
						if( /A|P|M/.test( grant_yn ) && communityMapInfo.usr_id != sop.member_id ){ //권한:(모든사용자||지정비밀번호||등록회원)&&소통지도작성자id!=로그인id
							checkVisible = true;
						}
					} else {			//비로그인
						if( !/N|Y/.test( grant_yn ) ){	//권한:!(로그인사용자||개설자승인)
							checkVisible = true;
						} else {
							checkVisible = false;
						}
					}
					
					if( checkVisible ){
						$(".idPwDiv1").show();
						$("#insert-form").hide();
					} else {
						$(".idPwDiv1").hide();
						$(".idPwDiv2").hide();
						$("#insert-form").show();
						$communityMapPoi.ui.getPoiInfo();
					}
					
					$(".modify").text("수정");
				}
			});
			//댓글 등록
			$("#reply-write").submit(function(){
				//srvLogWrite('O0', '20', '03', '03', '', '');
				var idName = (communityMapInfo.cmmnty_partcptn_grant_yn=="A"?"별명":"아이디");
				if(sop.isLogin||/M|P|A/.test(communityMapInfo.cmmnty_partcptn_grant_yn)){
					var stamp = uuid();
					if($("#reply_content").val()){
						function submit(id,pw){
							var cmmnty_poi_id = $("#detail-container").data("cmmnty_poi_id");
							var data = {
								cmmnty_map_id : getParameter("id"),
								cmmnty_poi_id : cmmnty_poi_id,
								content : $("#reply_content").val()
							};
							if(/M|P|A/.test(communityMapInfo.cmmnty_partcptn_grant_yn)){
								if(id==undefined||id==null||id.replace(/ /gi,"")==""){
									common_alert(getComleteWordByJongsung(idName,"을","를")+" 입력해주세요",function(){
										$("#reply-write").submit();
									});
									return false;
								}else if(pw==undefined||id==null||pw.replace(/ /gi,"")==""){

									common_alert("비밀번호를 입력해주세요",function(){
										$(".DetailInfo").show();
										$("#reply-write").submit();
									});
									return false;
								}
								if(id){
									data.id = id;
								}
								if(pw){
									data.pw = pw;
								}
							}

							$.ajax({
								type: "POST",
								url: contextPath+"/community/reply/regist.json",
								data:data,
								dataType: "json",
								async : false,
								success: function(res) {
									if(res.errCd=="0"){
										common_alert("등록되었습니다", function(){
											$('html, body').css({'overflow': 'auto', 'height': '100%'}).on("scroll", function(){
												event.preventDefault();     
												event.stopPropagation();
											});
										});
										$communityMapPoi.ui.getDetail(cmmnty_poi_id);
									}else{
										common_alert(res.errMsg,function(){
											if(res.errCd===-403){
												$("#reply-write").submit();
											}
										});
									}
								},
								error: function(xhr, status, errorThrown) {
									common_alert(errorMessage,"");
								}
							});
						}
						if(/M|P|A/.test(communityMapInfo.cmmnty_partcptn_grant_yn)&&communityMapInfo.usr_id!==sop.member_id){
							var ok = {
								title:"등록",
								func : function(opt) {
									var id=$(this).find("#id-"+stamp).val();
									var pw=$(this).find("#pw-"+stamp).val();
									submit(id,pw);
								}
							};
							var cancel = {
								title:"취소",
								func : function(opt) {}
							};
							var html ="";
							html+='<p for="content-'+stamp+' id="modify_popup_confirm_message" class="sfbLabel00" style="margin-left:7%">'+idName+'</p>';
							html+='<input type="text" id="id-'+stamp+'" class="communityInput"placeholder="'+getComleteWordByJongsung(idName,"을","를")+' 입력하세요" style="width:80%; margin-left:7%">';
							html+='<p for="content-'+stamp+' id="modify_popup_confirm_message" class="sfbLabel00" style="margin-left:7%">비밀번호</p>';
							html+='<input type="password" id="pw-'+stamp+'" class="communityInput" placeholder="비밀번호를 입력하세요" style="width:80%; margin-left:7%">';
							replyEdit("알림",html,[ok,cancel]);
						}else{
							submit();
						}
					}else{
						common_alert("댓글 내용을 입력해주세요",function(){
							$("#reply_content").focus();

						});
					}
				}else{
					loginConform();
				}
				return false;
			});
			// poi list 조회
			$("#community-poiList").submit(function(){
				srvLogWrite('O0', '20', '02', '04', $("#community-keyword").val(), '');
				$("#map").trigger("click");//검색시 마커 인포윈도우 제거를 위해 추가 20200720 박은식
				$(".sop-infowindow  .sop-zoom-animated").hide();
				$communityMapPoi.ui.markerInit();
				$communityMapPoi.ui.getList();
				$communityMapPoi.ui.getList('markers');
				return false;
			})

			//맵 append 시에 위치 이동(임시)
			$("#map").css("height", "calc(100vh - 150px)");
			// 스와이프기능추가
			$(".swiperBtn2").swipe({ // 의견등록 버튼클릭 시 스와이프 작동 하여 태그 수정 (20200720 박은식)
	            threshold : 10,
	            //펼치기
	            swipeUp:function(event, direction) {
	               $("#all-community").animate({height: 260},260);
	            },
	            //접기
	            swipeDown:function(event, direction) {
	               $("#all-community").animate({height: 0},260);	// 2020.09.09[신예리] 이전 버튼 추가로 인한 수정
	            },
	            //클릭
	            tap:function(event, target) {
	               if($("#all-community").height() > 0){	// 2020.09.09[신예리] 이전 버튼 추가로 인한 수정
	                  $("#all-community").animate({height: 0},260);	// 2020.09.09[신예리] 이전 버튼 추가로 인한 수정
	                  $(".swiperBtn2").removeClass("close"); // 버튼 화살표 변경되도록 class 추가
	                  $(".community-tab").hide();
	               } else {
	                  $("#all-community").animate({height: 260},260);
	                  $(".swiperBtn2").addClass("close"); // 버튼 화살표 변경되도록 class 추가
	                  $(".community-tab").show();
	               }
	            }
			});
			$("#all-community").css("height", "0px");	// 2020.09.09[신예리] 이전 버튼 추가로 인한 수정
			$(".community-tab").hide();
			$("#removeButton").on("show", function(){//poi remove 버튼 위치 이동
				$("#removeButton").css({"margin-top": "90px", "margin-left":"7px"});
			});

		},
		//20200902 박은식 로그아웃 이벤트
		logout : function(){
			common_remove_cookie("loginSaveAutoLogin");
			common_remove_cookie("loginSaveAutoLoginId");
			common_remove_cookie("loginSaveAutoLoginPassEncryption");
			var $form = $('<form></form>');
			$form.attr('method','post');
			$form.attr('action',contextPath+'/logout.sgis');
			$form.appendTo('body');
			
			$form.append($("<input name='"+csrf_name+"' value='"+csrf_token+"'>"))
			$form.submit();
			return false;
		}
	};
	 // 로그인 하라고 메시지창 띄움 //20200902 박은식 이전 로그인 로직 삭제
//	function loginConform(url){
//		messageConfirm.open("알림","로그인이 필요합니다.<br>이동하시겠습니까?",[{
//			title:"확인",
//			func : function() {
//				login(url);
//			}
//		},{title:"취소"}]);
//	}
}(window, document));
/**
 * @name : replyEdit
 * @description : 댓글 수정 삭제 입력 팝업
 * @date : 2020.07.15
 * @author : 박은식
 * @history :
 * @param title : 제목
 * @param message : html 
 * @param btnOptions : button 종류(배열)
 * @param addMessageHtml :
 * @param callback : 콜백
 */
function replyEdit(title, message, btnOptions, addMessageHtml,callback) {
	$(".sgis.popupWrapper").remove();
	var po
	$('html, body').css({'overflow': 'hidden', 'height': '100%'}).on("scoll",function(){// 스크롤 막기
		event.preventDefault();     
		event.stopPropagation();
	});
	var popupWrapper = $("<div/>",{"class":"sgis popupWrapper","style":"height:"+$(document).height()+"px;"});
	var alertPopupWrapper = $("<div/>",{"class":"popWrapCommunity", "id":"modify_popup_confirm","style":"position:fixed;  background-color:#fff;" +
										" padding-top: 30px; border-radius:10px; left:15%; top:15%"});
	var buttonBox = $("<div/>",{"class":"btnBox", "style":"border-radius:10px;"});
	$.each(btnOptions,function(cnt,node){
		var button = $("<a/>",{"class":"btn_popType"+(cnt+1)+"_00","text":node.title, "style":"display:inline-flex; height:40px; margin-top:10px;"}).click(function(){
			popupWrapper.remove();
			if(typeof node.func === "function"){
				node.func.call(popupWrapper);
			}
			if(!$(this).hasClass("btn_popType1_00")){
				$('html, body').css({'overflow': 'auto', 'height': '100%'}).on("scroll", function(){
					event.preventDefault();     
					event.stopPropagation();
				});
			}
			
		});
		buttonBox.append(button);
	})
	var content = $("<div/>",{"class":"popContentBox", "style":"border-radius:10px; padding:0; display:block"}).append(
		addMessageHtml,
		buttonBox
	);
	console.log(content)
	alertPopupWrapper.append(/*header,*/message,content);
	popupWrapper.append(alertPopupWrapper);
	$("body").append(popupWrapper);
	if(typeof callback === "function"){
		callback.call(popupWrapper);
	}
	return popupWrapper;
}

