/**
 * 
 * @JSName: boardAdd
 * @Description: modify by liudandan 2014/11/17/ 17:00:00
 * 
 * @author: chenzhanchao
 * @date:2014/11/03/ 08:30:00
 * @version V1.0
 * 
 */
//for return
var STAT_THEMA_MAP_ID = getParameter('STAT_THEMA_MAP_ID');
var id_datagrid = '#searchResultTable';
var pluploader = {};
var radioValue = '';

// 2016. 04. 25 j.h.Seok
var category = getParameter("CATEGORY_NM");
var srv_yn = getParameter("SRV_YN");
var title = getParameter("TITLE");

function popupOpen(){
	var popUrl = "IDSearchManage.html";	//팝업창에 출력될 페이지 URL
    // 2018. 01. 10 mng_s
	var winWidth = 470;
    // 2018. 01. 10 mng_e
	var winHeight = 650;
	var winPosLeft = (screen.width - winWidth) / 2;
	var winPosTop = (screen.height - winHeight) / 2;
	var winOpt = "width="+winWidth+",height="+winHeight+",top="+winPosTop+",left="+winPosLeft+", scrollbars=no, location :no";
	window.open(popUrl,"",winOpt);
}

//POI테마코드 팝업
function popupOpenThema(){
	var popUrl = "themaSearchManage.html";	//팝업창에 출력될 페이지 URL
	var winWidth = 350;
	var winHeight = 550;
	var winPosLeft = (screen.width - winWidth) / 2;
	var winPosTop = (screen.height - winHeight) / 2;
	var winOpt = "width="+winWidth+",height="+winHeight+",top="+winPosTop+",left="+winPosLeft+", scrollbars=no, location :no";
	window.open(popUrl,"",winOpt);
}

//mng_s 2017. 08. 04 석진혁
//POI 산업분류코드 팝업
function popupOpenCorpClass(){
	var popUrl = "corpClassSearchManage.html";	//팝업창에 출력될 페이지 URL
	var winWidth = 500;
	var winHeight = 550;
	var winPosLeft = (screen.width - winWidth) / 2;
	var winPosTop = (screen.height - winHeight) / 2;
	var winOpt = "width="+winWidth+",height="+winHeight+",top="+winPosTop+",left="+winPosLeft+", scrollbars=yes, location :no";
	window.open(popUrl,"",winOpt);
}
//mng_e 2017. 08. 04 석진혁

function popupOpenMap(){
	var popUrl = "MapIDSearchManage.html";	//팝업창에 출력될 페이지 URL
	var popOption = "width=370, height=360, resizable=no, scrollbars=no, status=no;";    //팝업창 옵션(optoin)
	window.open(popUrl,"",popOption);
}

function popupOpenMapSibal(){
	var popUrl = "testlegen.html";	//팝업창에 출력될 페이지 URL
	var popOption = "width=370, height=360, resizable=no, scrollbars=no, status=no;";    //팝업창 옵션(optoin)
	window.open(popUrl,"",popOption);
}
function popTest(){
	var popUrl = "testlegen.html";
	var popOption = "width=370, height=360, resizable=no, scrollbars=no, status=no;";    //팝업창 옵션(optoin)
	window.open(popUrl,"",popOption);
}

function getYearList() {
	var dt = new Date();
	var nowYear = dt.getFullYear();
	var yearList = "";	
	for(var i=0; i<50; i++) {
		yearList += "<option value='"+(nowYear-i)+"'>"+(nowYear-i)+"년</option>";
	}
	$("#LEFT_YEAR").append(yearList);
	//$("#YEAR_INFO_START").append(yearList);
	//$("#YEAR_INFO_END").append(yearList);
}
function getdialog(obj){
	$("#Popup_Info").css("display", "block");
	stat_thema_map_id = obj.result[0].STAT_THEMA_MAP_ID;
	category = obj.result[0].CATEGORY;
	mapType = obj.result[0].THEMA_MAP_TYPE;
	//var path = "http://localhost:8080";
	var path = window.location.protocol+"//"+window.location.host; //2018.01.10 [개발팀]
	//var path = "https://sgis.kostat.go.kr";
	var src = path + "/view/thematicMap/thematicMapMain?stat_thema_map_id="+stat_thema_map_id+"&theme="+category+"&mapType="+mapType;
	$(".Popup_Info").css("display", "block");
	$("#my_frame2").css("width", "1096px");
	$("#my_frame2").css("margin-top", "45px");
	$("#my_frame2").css("height", "815px");
	$("#my_frame2").attr("src",src);
}
function openWin(){
	srvLogWrite("L0", "03", "02", "09", "", "");
	$('.Popup_Info').hide();
	location.href = "./../DT/themaMapMainManage.html";
}
function closeWin(){
	$('.Popup_Info').hide();
}
function loading2() {
	$('#my_frame2').contents().find('header').hide();
	$('#my_frame2').contents().find('.map_dummy').css("height","765px");
	$('#my_frame2').contents().find('.tb_right').css("display","none");
}
function getthemaList(id){
	var stat_thema_map_id;
	var category;
	var mapType;
	$.ajax({
		url : contextPath + "/ServiceAPI/DT/ThemaMapManage/getThemaMapModyList.json",
		type: "POST",
		async: false,
		dataType: "json",
		data: {
			STAT_THEMA_MAP_ID: id
		},
		success: function(data){
			getdialog(data);
		},
		error: function(data){
			getConfirmPopup('알림', '일시적인 오류로 검색에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
			$('#ok_alertPopup').click(function () {
				confirmPopupRemove();
			});
			$('#close_confirmPopup').click(function () {
				confirmPopupRemove();
				$('.ui-widget-overlay').removeClass('custom-overlay');
			});
		}
	});
	
	
}
(function(W, D) {
	W.$themaMapUpdateManage = W.$themaMapUpdateManage || {};
	$(document).ready(function() {
		srvLogWrite("L0", "03", "02", "06", "", "");
				CKEDITOR.replace('THEMA_EXP', {
					resize_enabled : false,
					removePlugins : 'toolbar,elementspath',
					readOnly : false,	
					extraPlugins : 'nbsp',
					basicEntities : false
				});
				
				CKEDITOR.on("instanceReady",function() {
					$themaMapUpdateManage.loadLogBCd();
				});
				

				document.getElementById('resetForm').reset();
				$('#resetFormA').hide();
				$('#resetFormB').hide();
				$('#add_check').hide();
				$('#MOBILE_URL').hide();
				$('#MAP_DATA_YEAR_LAY').hide();
				getYearList();
				$('#DATASEARCHButton').click(function(){
					popupOpen();
				});

				$('#MAPDATASEARCHButton').click(function(){
					popupOpenMap();
				});
				
				$('#THEMASEARCHButton').click(function(){
					popupOpenThema();
				});
				
				// mng_s 2017. 08. 04 석진혁
				$('#CORPCLASSSEARCHButton').click(function(){
					popupOpenCorpClass();
				});
				// mng_e 2017. 08. 04 석진혁
				
				$('#searchBT').click(function(){
					popTest();
				});
				
				$('#POI_DISP_YN').change(function(){
					if($('#POI_DISP_YN').val() == "Y") {
						$('#THEMASEARCHButton').show();
						
						// mng_s 2017. 08. 04 석진혁
						$('#CORPCLASSSEARCHButton').show();
						// mng_e 2017. 08. 04 석진혁
						
					} else {
						$('#THEME_CD').val("");
						$('#THEMASEARCHButton').hide();
						
						// mng_s 2017. 08. 04 석진혁
						$('#CORP_CLASS_CD').val("");
						$('#CORPCLASSSEARCHButton').hide();
						// mng_e 2017. 08. 04 석진혁
					}
				});
				$('#addViewButton').click(function(){
					getdialog();
				});
				
				$('#modifyButton').click(function(){
					srvLogWrite("L0", "03", "02", "08", "", "");
					var THEMA_SEL = $('#THEMA_SEL').val();
					if(THEMA_SEL == '00') { //전체

						getConfirmPopup('알림', '주제도 종류를 선택 해 주세요.', 'alert');
						$('#ok_alertPopup').click(function () {
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function () {
							confirmPopupRemove();
						});
						return;
					} else if(THEMA_SEL=='03') { //색상
						//색상형
						var title = $('#THEMA_TITLE').val();
						if(title.length<1){
							getConfirmPopup('알림', '제목명을 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#THEMA_TITLE').focus();
							return;
						}
//						var mob_yn = $('#MOB_YN').val();
//						var mob_url = $('#MOB_URL').val();
//						if(mob_yn=='Y'){
//							if(mob_url.length<1){
//								getConfirmPopup('알림', '모바일 URL을 입력해 주세요.', 'alert');
//								$('#ok_alertPopup').click(function () {
//									confirmPopupRemove();
//								});
//								$('#close_confirmPopup').click(function () {
//									confirmPopupRemove();
//								});
//								$('#MOB_URL').focus();
//								return;
//							}	
//						}
						var thema_avr = $('#THEMA_AVR').val();
						if(thema_avr.length<1){
							getConfirmPopup('알림', '관련 통계를 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#THEMA_AVR').focus();
							return;
						}
						var DISP_MTHD = $('#DISP_MTHD').val();
						if(DISP_MTHD.length<1){
							getConfirmPopup('알림', '표현 방법을 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#DISP_MTHD').focus();
							return;
						}
						var data_id = $('#DATA_ID').val();
						if(data_id.length<1){
							getConfirmPopup('알림', '데이터 ID를 선택해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#DATA_ID').focus();
							return;
						}
						var data_year = $('#DATA_YEAR').val();
						var thema_exp = CKEDITOR.instances.THEMA_EXP.getData();//$('#THEMA_EXP').val();
						if(thema_exp.length<1){
							getConfirmPopup('알림', '설명을 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#THEMA_EXP').focus();
							return;
						}
						var left_year_a = $('#LEFT_YEAR').val();
						var PRIORTY_YN = $('#PRIORTY_YN').val();
						//A 형


						var left_title_a = $('#LEFT_TITLE').val();
						if(left_title_a.length<1){
							getConfirmPopup('알림', '표출정보명을 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#LEFT_TITLE').focus();
							return;
						}
						var left_ttip_a = $('#LEFT_TTIP').val();
						if(left_ttip_a.length<1){
							getConfirmPopup('알림', '표출정보 툴팁명을 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#LEFT_TTIP').focus();
							return;
						}
						var left_unit_a = $('#LEFT_UNIT').val();
						if(left_unit_a.length<1){
							getConfirmPopup('알림', '표출정보 단위를 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#LEFT_UNIT').focus();
							return;
						}
						var left_source_a = $('#LEFT_SOURCE_URL').val();
						if(left_source_a.length<1){
							getConfirmPopup('알림', '표출정보 출처를 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#LEFT_SOURCE_URL').focus();
							return;
						}
						var left_title_b = $('#RIGHT_TITLE').val();
						if(left_title_b!=null && left_title_b!=''){
							
							if(left_title_b.length<1){
								getConfirmPopup('알림', '표출정보 명을 입력해 주세요.', 'alert');
								$('#ok_alertPopup').click(function () {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								$('#RIGHT_TITLE').focus();
								return;
							}
							var left_ttip_b = $('#RIGHT_TTIP').val();
							if(left_ttip_b.length<1){
								getConfirmPopup('알림', '표출정보 툴팁명을 입력해 주세요.', 'alert');
								$('#ok_alertPopup').click(function () {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								$('#RIGHT_TTIP').focus();
								return;
							}
							var left_unit_b = $('#RIGHT_UNIT').val();
							if(left_unit_b.length<1){
								getConfirmPopup('알림', '표출정보 단위를 입력해 주세요.', 'alert');
								$('#ok_alertPopup').click(function () {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								$('#RIGHT_UNIT').focus();
								return;
							}
							var left_source_b = $('#RIGHT_SOURCE_URL').val();
							if(left_source_b.length<1){
								getConfirmPopup('알림', '표출정보 출처를 입력해 주세요.', 'alert');
								$('#ok_alertPopup').click(function () {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								$('#RIGHT_SOURCE_URL').focus();
								return;
							}
						}

						if(radioValue=='3'){
							var sidoFlag = $('#add_check_sido').is(":checked");
							var gugunFlag = $('#add_check_sigugun').is(":checked");
							var dongFlag = $('#add_check_dong').is(":checked");
							var exFlag = $('#add_check_ex').is(":checked");

							var sidoFlagRight = $('#add_check_sido_right').is(":checked");
							var gugunFlagRight = $('#add_check_sigugun_right').is(":checked");
							var dongFlagRight = $('#add_check_dong_right').is(":checked");
							var exFlagRight = $('#add_check_ex_right').is(":checked");

							if(sidoFlag){
								var strTag ='';
								var exmpl = $('#EXMPL_SIDO').val();
								var aCount = 0;
								strTag+=exmpl+",";
								for(var i = 1; i<=exmpl; i++){
									if($('#SEP'+i+'_SIDO').val()!=null && $('#SEP'+i+'_SIDO').val() !=''){
										if(i==exmpl){
											strTag +=$('#SEP'+i+'_SIDO').val();
										}else{
											strTag +=$('#SEP'+i+'_SIDO').val()+",";	
										}
										aCount++;
									}
								}
								
								if(aCount==exmpl){
									$('#data_sido').val(strTag);	
								}else{
									getConfirmPopup('알림', '범례를 입력해 주세요.', 'alert');
									$('#ok_alertPopup').click(function () {
										confirmPopupRemove();
									});
									$('#close_confirmPopup').click(function () {
										confirmPopupRemove();
									});
									return;
								}
							}

							if(gugunFlag){
								var strTag ='';
								var exmpl = $('#EXMPL_SIGUGUN').val();
								var aCount = 0;
								strTag+=exmpl+",";
								for(var i = 1; i<=exmpl; i++){
									if($('#SEP'+i+'_SIGUGUN').val()!=null && $('#SEP'+i+'_SIGUGUN').val() !=''){
										
										if(i==exmpl){
											strTag +=$('#SEP'+i+'_SIGUGUN').val();
										}else{
											strTag +=$('#SEP'+i+'_SIGUGUN').val()+",";	
										}
										aCount++;
									}
								}
								if(aCount==exmpl){
									$('#data_gugun').val(strTag);
								}else{
									getConfirmPopup('알림', '범례를 입력해 주세요.', 'alert');
									$('#ok_alertPopup').click(function () {
										confirmPopupRemove();
									});
									$('#close_confirmPopup').click(function () {
										confirmPopupRemove();
									});
									return;
								}
							}

							if(dongFlag){
								var strTag ='';
								var exmpl = $('#EXMPL_DONG').val();
								var aCount = 0;
								strTag+=exmpl+",";
								for(var i = 1; i<=exmpl; i++){
									if($('#SEP'+i+'_DONG').val()!=null && $('#SEP'+i+'_DONG').val() !=''){
										
										if(i==exmpl){
											strTag +=$('#SEP'+i+'_DONG').val();
										}else{
											strTag +=$('#SEP'+i+'_DONG').val()+",";	
										}
										aCount++;
									}
								}
								if(aCount==exmpl){
									$('#data_dong').val(strTag);	
								}else{
									getConfirmPopup('알림', '범례를 입력해 주세요.', 'alert');
									$('#ok_alertPopup').click(function () {
										confirmPopupRemove();
									});
									$('#close_confirmPopup').click(function () {
										confirmPopupRemove();
									});
									return;
								}
							}

							if(exFlag){
								var strTag ='';
								var exmpl = $('#EXMPL_EX').val();
								var aCount = 0;
								strTag+=exmpl+",";
								for(var i = 1; i<=exmpl; i++){
									if($('#SEP'+i+'_EX').val()!=null && $('#SEP'+i+'_EX').val() !=''){
										if(i==exmpl){
											strTag +=$('#SEP'+i+'_EX').val();
										}else{
											strTag +=$('#SEP'+i+'_EX').val()+",";											
										}
										aCount++;
									}
								}
								if(aCount==exmpl){
									$('#data_ex').val(strTag);	
								}else{
									getConfirmPopup('알림', '범례를 입력해 주세요.', 'alert');
									$('#ok_alertPopup').click(function () {
										confirmPopupRemove();
									});
									$('#close_confirmPopup').click(function () {
										confirmPopupRemove();
									});
									return;
								}
							}

							if(sidoFlagRight){
								var strTag ='';
								var exmpl = $('#EXMPL_SIDO_RIGHT').val();
								var aCount = 0;
								strTag+=exmpl+",";
								for(var i = 1; i<=exmpl; i++){
									if($('#SEP'+i+'_SIDO_RIGHT').val()!=null && $('#SEP'+i+'_SIDO_RIGHT').val() !=''){
										if(i==exmpl){
											strTag +=$('#SEP'+i+'_SIDO_RIGHT').val();
										}else{
											strTag +=$('#SEP'+i+'_SIDO_RIGHT').val()+",";											
										}
										aCount++;
									}
								}
								if(aCount==exmpl){
									$('#data_sido_right').val(strTag);	
								}else{
									getConfirmPopup('알림', '범례를 입력해 주세요.', 'alert');
									$('#ok_alertPopup').click(function () {
										confirmPopupRemove();
									});
									$('#close_confirmPopup').click(function () {
										confirmPopupRemove();
									});
									return;
								}
							}

							if(gugunFlagRight){
								var strTag ='';
								var exmpl = $('#EXMPL_SIGUGUN_RIGHT').val();
								var aCount = 0;
								strTag+=exmpl+",";
								for(var i = 1; i<=exmpl; i++){
									if($('#SEP'+i+'_SIGUGUN_RIGHT').val()!=null && $('#SEP'+i+'_SIGUGUN_RIGHT').val() !=''){
										if(i==exmpl){
											strTag +=$('#SEP'+i+'_SIGUGUN_RIGHT').val();
										}else{
											strTag +=$('#SEP'+i+'_SIGUGUN_RIGHT').val()+",";	
										}
										aCount++;
									}
								}
								if(aCount==exmpl){
									$('#data_gugun_right').val(strTag);	
								}else{
									getConfirmPopup('알림', '범례를 입력해 주세요.', 'alert');
									$('#ok_alertPopup').click(function () {
										confirmPopupRemove();
									});
									$('#close_confirmPopup').click(function () {
										confirmPopupRemove();
									});
									return;
								}
							}

							if(dongFlagRight){
								var strTag ='';
								var exmpl = $('#EXMPL_DONG_RIGHT').val();
								var aCount = 0;
								strTag+=exmpl+",";
								for(var i = 1; i<=exmpl; i++){
									if($('#SEP'+i+'_DONG_RIGHT').val()!=null && $('#SEP'+i+'_DONG_RIGHT').val() !=''){
										if(i==exmpl){
											strTag +=$('#SEP'+i+'_DONG_RIGHT').val();
										}else{
											strTag +=$('#SEP'+i+'_DONG_RIGHT').val()+",";											
										}
										aCount++;
									}
								}
								if(aCount==exmpl){
									$('#data_dong_right').val(strTag);	
								}else{
									getConfirmPopup('알림', '범례를 입력해 주세요.', 'alert');
									$('#ok_alertPopup').click(function () {
										confirmPopupRemove();
									});
									$('#close_confirmPopup').click(function () {
										confirmPopupRemove();
									});
									return;
								}

							}

							if(exFlagRight){
								var strTag ='';
								var exmpl = $('#EXMPL_EX_RIGHT').val();
								var aCount = 0;
								strTag+=exmpl+",";
								for(var i = 1; i<=exmpl; i++){
									if($('#SEP'+i+'_EX_RIGHT').val()!=null && $('#SEP'+i+'_EX_RIGHT').val() !=''){
										if(i==exmpl){
											strTag +=$('#SEP'+i+'_EX_RIGHT').val();
										}else{
											strTag +=$('#SEP'+i+'_EX_RIGHT').val()+",";											
										}
										aCount++;
									}
								}
								if(aCount==exmpl){
									$('#data_ex_right').val(strTag);	
								}else{
									getConfirmPopup('알림', '범례를 입력해 주세요.', 'alert');
									$('#ok_alertPopup').click(function () {
										confirmPopupRemove();
									});
									$('#close_confirmPopup').click(function () {
										confirmPopupRemove();
									});
									return;
								}

							}

						}
						
						// mng_s 2017. 08. 04 석진혁
						if($("#POI_DISP_YN").val() == "Y") {
							if($("#THEME_CD").val().length < 2 && $("#CORP_CLASS_CD").val().length < 2) {
								getConfirmPopup('알림', 'POI 테마코드 혹은 산업분류코드를 선택해 주세요.', 'alert');
								$('#ok_alertPopup').click(function () {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								$('#THEMASEARCHButton').focus();
								return;
							} else if($("#THEME_CD").val().length > 1 && $("#CORP_CLASS_CD").val().length > 1) {
								getConfirmPopup('알림', 'POI 테마코드와 산업분류코드는 동시에 선택할 수 없습니다.</br>확인 선택 : 테마코드 초기화</br>취소 선택 : 산업분류코드 초기화', 'confirm');
								$('#ok_confirmPopup').click(function () {
									$("#THEME_CD").val("");
									confirmPopupRemove();
								});
								$('#cancel_confirmPopup').click(function () {
									$("#CORP_CLASS_CD").val("");
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								return;
							}
						}
						// mng_s 2017. 08. 04 석진혁
						if($("#POI_DISP_YN").val() == "Y") {
							if($("#THEME_CD").val().length < 2 && $("#CORP_CLASS_CD").val().length < 2) {
								getConfirmPopup('알림', 'POI 테마코드 혹은 산업분류코드를 선택해 주세요.', 'alert');
								$('#ok_alertPopup').click(function () {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								$('#THEMASEARCHButton').focus();
								return;
							} else if($("#THEME_CD").val().length > 1 && $("#CORP_CLASS_CD").val().length > 1) {
								getConfirmPopup('알림', 'POI 테마코드와 산업분류코드는 동시에 선택할 수 없습니다.</br>확인 선택 : 테마코드 초기화</br>취소 선택 : 산업분류코드 초기화', 'confirm');
								$('#ok_confirmPopup').click(function () {
									$("#THEME_CD").val("");
									confirmPopupRemove();
								});
								$('#cancel_confirmPopup').click(function () {
									$("#CORP_CLASS_CD").val("");
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
							}
							// mng_e 2017. 08. 04 석진혁
						}
						if($("#DISP_RANK").val().length < 1) {
							getConfirmPopup('알림', '표출순위 값을 입력하여 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#DISP_RANK').focus();
							return;
						}
						// mng_e 2017. 08. 04 석진혁
						
						$themaMapUpdateManage.updateThemaMap3();
					} else if(THEMA_SEL == '04') { //증감형
						var title = $('#THEMA_TITLE').val();
						if(title.length<1){
							getConfirmPopup('알림', '제목명을 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#THEMA_TITLE').focus();
							return;
						}
//						var mob_yn = $('#MOB_YN').val();
//						var mob_url = $('#MOB_URL').val();
//						if(mob_yn=='Y'){
//							if(mob_url.length<1){
//								getConfirmPopup('알림', '모바일 URL을 입력해 주세요.', 'alert');
//								$('#ok_alertPopup').click(function () {
//									confirmPopupRemove();
//								});
//								$('#close_confirmPopup').click(function () {
//									confirmPopupRemove();
//								});
//								$('#MOB_URL').focus();
//								return;
//							}	
//						}
						var thema_avr = $('#THEMA_AVR').val();
						if(thema_avr.length<1){
							getConfirmPopup('알림', '관련 통계를 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#THEMA_AVR').focus();
							return;
						}
						var DISP_MTHD = $('#DISP_MTHD').val();
						if(DISP_MTHD.length<1){
							getConfirmPopup('알림', '표현 방법을 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#DISP_MTHD').focus();
							return;
						}
						var data_id = $('#DATA_ID').val();
						if(data_id.length<1){
							getConfirmPopup('알림', '데이터 ID를 선택해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#DATA_ID').focus();
							return;
						}
						var thema_exp = CKEDITOR.instances.THEMA_EXP.getData();//$('#THEMA_EXP').val();
						if(thema_exp.length<1){
							getConfirmPopup('알림', '설명을 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#THEMA_EXP').focus();
							return;
						}
						//A 형


						var left_title_a = $('#LEFT_TITLE').val();
						if(left_title_a.length<1){
							getConfirmPopup('알림', '표출정보명을 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#LEFT_TITLE').focus();
							return;
						}
						var left_ttip_a = $('#LEFT_TTIP').val();
						if(left_ttip_a.length<1){
							getConfirmPopup('알림', '표출정보 툴팁명을 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#LEFT_TTIP').focus();
							return;
						}
						var left_unit_a = $('#LEFT_UNIT').val();
						if(left_unit_a.length<1){
							getConfirmPopup('알림', '표출정보 단위를 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#LEFT_UNIT').focus();
							return;
						}
						var left_source_a = $('#LEFT_SOURCE_URL').val();
						if(left_source_a.length<1){
							getConfirmPopup('알림', '표출정보 출처를 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#LEFT_SOURCE_URL').focus();
							return;
						}
						var left_chart_a = $('#LEFT_CHART').val();
						if(left_chart_a.length<1){
							getConfirmPopup('알림', '표출정보 차트를 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#LEFT_CHART').focus();
							return;
						}
						if(radioValue=='3'){
							var sidoFlag = $('#add_check_sido').is(":checked");
							var gugunFlag = $('#add_check_sigugun').is(":checked");
							var dongFlag = $('#add_check_dong').is(":checked");
							var exFlag = $('#add_check_ex').is(":checked");


							if(sidoFlag){
								var strTag ='';
								var exmpl = $('#EXMPL_SIDO').val();
								var aCount = 0;
								strTag+=exmpl+",";
								for(var i = 1; i<=exmpl; i++){
									if($('#SEP'+i+'_SIDO').val()!=null && $('#SEP'+i+'_SIDO').val() !=''){
										if(i==exmpl){
											strTag +=$('#SEP'+i+'_SIDO').val();
										}else{
											strTag +=$('#SEP'+i+'_SIDO').val()+",";											
										}
										aCount++;
									}
								}
								if(aCount==exmpl){
									$('#data_sido').val(strTag);	
								}else{
									getConfirmPopup('알림', '범례를 입력해 주세요.', 'alert');
									$('#ok_alertPopup').click(function () {
										confirmPopupRemove();
									});
									$('#close_confirmPopup').click(function () {
										confirmPopupRemove();
									});
									return;
								}
							}

							if(gugunFlag){
								var strTag ='';
								var exmpl = $('#EXMPL_SIGUGUN').val();
								var aCount = 0;
								strTag+=exmpl+",";
								for(var i = 1; i<=exmpl; i++){
									if($('#SEP'+i+'_SIGUGUN').val()!=null && $('#SEP'+i+'_SIGUGUN').val() !=''){
										if(i==exmpl){
											strTag +=$('#SEP'+i+'_SIGUGUN').val();
										}else{
											strTag +=$('#SEP'+i+'_SIGUGUN').val()+",";											
										}
										aCount++;
									}
								}
								if(aCount==exmpl){
									$('#data_gugun').val(strTag);
								}else{
									getConfirmPopup('알림', '범례를 입력해 주세요.', 'alert');
									$('#ok_alertPopup').click(function () {
										confirmPopupRemove();
									});
									$('#close_confirmPopup').click(function () {
										confirmPopupRemove();
									});
									return;
								}
							}

							if(dongFlag){
								var strTag ='';
								var exmpl = $('#EXMPL_DONG').val();
								var aCount = 0;
								strTag+=exmpl+",";
								for(var i = 1; i<=exmpl; i++){
									if($('#SEP'+i+'_DONG').val()!=null && $('#SEP'+i+'_DONG').val() !=''){
										if(i==exmpl){
											strTag +=$('#SEP'+i+'_DONG').val();
										}else{
											strTag +=$('#SEP'+i+'_DONG').val()+",";											
										}
										aCount++;
									}
								}
								if(aCount==exmpl){
									$('#data_dong').val(strTag);	
								}else{
									getConfirmPopup('알림', '범례를 입력해 주세요.', 'alert');
									$('#ok_alertPopup').click(function () {
										confirmPopupRemove();
									});
									$('#close_confirmPopup').click(function () {
										confirmPopupRemove();
									});
									return;
								}
							}

							if(exFlag){
								var strTag ='';
								var exmpl = $('#EXMPL_EX').val();
								var aCount = 0;
								strTag+=exmpl+",";
								for(var i = 1; i<=exmpl; i++){
									if($('#SEP'+i+'_EX').val()!=null && $('#SEP'+i+'_EX').val() !=''){
										if(i==exmpl){
											strTag +=$('#SEP'+i+'_EX').val();
										}else{
											strTag +=$('#SEP'+i+'_EX').val()+",";											
										}
										aCount++;
									}
								}
								if(aCount==exmpl){
									$('#data_ex').val(strTag);	
								}else{
									getConfirmPopup('알림', '범례를 입력해 주세요.', 'alert');
									$('#ok_alertPopup').click(function () {
										confirmPopupRemove();
									});
									$('#close_confirmPopup').click(function () {
										confirmPopupRemove();
									});
									return;
								}
							}
						}
						
						// mng_s 2017. 08. 04 석진혁
						if($("#POI_DISP_YN").val() == "Y") {
							if($("#THEME_CD").val().length < 2 && $("#CORP_CLASS_CD").val().length < 2) {
								getConfirmPopup('알림', 'POI 테마코드 혹은 산업분류코드를 선택해 주세요.', 'alert');
								$('#ok_alertPopup').click(function () {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								$('#THEMASEARCHButton').focus();
								return;
							} else if($("#THEME_CD").val().length > 1 && $("#CORP_CLASS_CD").val().length > 1) {
								getConfirmPopup('알림', 'POI 테마코드와 산업분류코드는 동시에 선택할 수 없습니다.</br>확인 선택 : 테마코드 초기화</br>취소 선택 : 산업분류코드 초기화', 'confirm');
								$('#ok_confirmPopup').click(function () {
									$("#THEME_CD").val("");
									confirmPopupRemove();
								});
								$('#cancel_confirmPopup').click(function () {
									$("#CORP_CLASS_CD").val("");
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								return;
							}
						}
						
						if($("#DISP_RANK").val().length < 1) {
							getConfirmPopup('알림', '표출순위 값을 입력하여 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#DISP_RANK').focus();
							return;
						}
						// mng_e 2017. 08. 04 석진혁
						
						$themaMapUpdateManage.updateThemaMap4();
					
					} else if(THEMA_SEL=='05') { //시계열형
						var title = $('#THEMA_TITLE').val();
						if(title.length<1){
							getConfirmPopup('알림', '제목명을 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#THEMA_TITLE').focus();
							return;
						}
//						var mob_yn = $('#MOB_YN').val();
//						var mob_url = $('#MOB_URL').val();
//						if(mob_yn=='Y'){
//							if(mob_url.length<1){
//								getConfirmPopup('알림', '모바일 URL을 입력해 주세요.', 'alert');
//								$('#ok_alertPopup').click(function () {
//									confirmPopupRemove();
//								});
//								$('#close_confirmPopup').click(function () {
//									confirmPopupRemove();
//								});
//								$('#MOB_URL').focus();
//								return;
//							}	
//						}
						var thema_avr = $('#THEMA_AVR').val();
						if(thema_avr.length<1){
							getConfirmPopup('알림', '관련 통계를 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#THEMA_AVR').focus();
							return;
						}
						var DISP_MTHD = $('#DISP_MTHD').val();
						if(DISP_MTHD.length<1){
							getConfirmPopup('알림', '표현 방법을 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#DISP_MTHD').focus();
							return;
						}
						var data_id = $('#DATA_ID').val();
						if(data_id.length<1){
							getConfirmPopup('알림', '데이터 ID를 선택해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#DATA_ID').focus();
							return;
						}
						var data_year = $('#DATA_YEAR').val();
						var thema_exp = CKEDITOR.instances.THEMA_EXP.getData();//$('#THEMA_EXP').val();
						if(thema_exp.length<1){
							getConfirmPopup('알림', '설명을 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#THEMA_EXP').focus();
							return;
						}
						var left_year_a = $('#LEFT_YEAR').val();
						var PRIORTY_YN = $('#PRIORTY_YN').val();
						//A 형


						var left_title_a = $('#LEFT_TITLE').val();
						if(left_title_a.length<1){
							getConfirmPopup('알림', '표출정보명을 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#LEFT_TITLE').focus();
							return;
						}
						var left_ttip_a = $('#LEFT_TTIP').val();
						if(left_ttip_a.length<1){
							getConfirmPopup('알림', '표출정보 툴팁명을 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#LEFT_TTIP').focus();
							return;
						}
						var left_unit_a = $('#LEFT_UNIT').val();
						if(left_unit_a.length<1){
							getConfirmPopup('알림', '표출정보 단위를 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#LEFT_UNIT').focus();
							return;
						}
						var left_source_a = $('#LEFT_SOURCE_URL').val();
						if(left_source_a.length<1){
							getConfirmPopup('알림', '표출정보 출처를 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#LEFT_SOURCE_URL').focus();
							return;
						}

						var left_title_b = $('#RIGHT_TITLE').val();
						if(left_title_b!=null && left_title_b!=''){
							if(left_title_b.length<1){
								getConfirmPopup('알림', '표출정보 명을 입력해 주세요.', 'alert');
								$('#ok_alertPopup').click(function () {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								$('#RIGHT_TITLE').focus();
								return;
							}
							var left_ttip_b = $('#RIGHT_TTIP').val();
							if(left_ttip_b.length<1){
								getConfirmPopup('알림', '표출정보 툴팁명을 입력해 주세요.', 'alert');
								$('#ok_alertPopup').click(function () {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								$('#RIGHT_TTIP').focus();
								return;
							}
							var left_unit_b = $('#RIGHT_UNIT').val();
							if(left_unit_b.length<1){
								getConfirmPopup('알림', '표출정보 단위를 입력해 주세요.', 'alert');
								$('#ok_alertPopup').click(function () {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								$('#RIGHT_UNIT').focus();
								return;
							}
							var left_source_b = $('#RIGHT_SOURCE_URL').val();
							if(left_source_b.length<1){
								getConfirmPopup('알림', '표출정보 출처를 입력해 주세요.', 'alert');
								$('#ok_alertPopup').click(function () {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								$('#RIGHT_SOURCE_URL').focus();
								return;
							}
						}

						if(radioValue=='3'){
							var sidoFlag = $('#add_check_sido').is(":checked");
							var gugunFlag = $('#add_check_sigugun').is(":checked");
							var dongFlag = $('#add_check_dong').is(":checked");
							var exFlag = $('#add_check_ex').is(":checked");

							var sidoFlagRight = $('#add_check_sido_right').is(":checked");
							var gugunFlagRight = $('#add_check_sigugun_right').is(":checked");
							var dongFlagRight = $('#add_check_dong_right').is(":checked");
							var exFlagRight = $('#add_check_ex_right').is(":checked");

							if(sidoFlag){
								var strTag ='';
								var exmpl = $('#EXMPL_SIDO').val();
								var aCount = 0;
								strTag+=exmpl+",";
								for(var i = 1; i<=exmpl; i++){
									if($('#SEP'+i+'_SIDO').val()!=null && $('#SEP'+i+'_SIDO').val() !=''){
										if(i==exmpl){
											strTag +=$('#SEP'+i+'_SIDO').val();
										}else{
											strTag +=$('#SEP'+i+'_SIDO').val()+",";	
										}
										aCount++;
									}
								}
								
								if(aCount==exmpl){
									$('#data_sido').val(strTag);	
								}else{
									getConfirmPopup('알림', '범례를 입력해 주세요.', 'alert');
									$('#ok_alertPopup').click(function () {
										confirmPopupRemove();
									});
									$('#close_confirmPopup').click(function () {
										confirmPopupRemove();
									});
									return;
								}
							}

							if(gugunFlag){
								var strTag ='';
								var exmpl = $('#EXMPL_SIGUGUN').val();
								var aCount = 0;
								strTag+=exmpl+",";
								for(var i = 1; i<=exmpl; i++){
									if($('#SEP'+i+'_SIGUGUN').val()!=null && $('#SEP'+i+'_SIGUGUN').val() !=''){
										
										if(i==exmpl){
											strTag +=$('#SEP'+i+'_SIGUGUN').val();
										}else{
											strTag +=$('#SEP'+i+'_SIGUGUN').val()+",";	
										}
										aCount++;
									}
								}
								if(aCount==exmpl){
									$('#data_gugun').val(strTag);
								}else{
									getConfirmPopup('알림', '범례를 입력해 주세요.', 'alert');
									$('#ok_alertPopup').click(function () {
										confirmPopupRemove();
									});
									$('#close_confirmPopup').click(function () {
										confirmPopupRemove();
									});
									return;
								}
							}

							if(dongFlag){
								var strTag ='';
								var exmpl = $('#EXMPL_DONG').val();
								var aCount = 0;
								strTag+=exmpl+",";
								for(var i = 1; i<=exmpl; i++){
									if($('#SEP'+i+'_DONG').val()!=null && $('#SEP'+i+'_DONG').val() !=''){
										
										if(i==exmpl){
											strTag +=$('#SEP'+i+'_DONG').val();
										}else{
											strTag +=$('#SEP'+i+'_DONG').val()+",";	
										}
										aCount++;
									}
								}
								if(aCount==exmpl){
									$('#data_dong').val(strTag);	
								}else{
									getConfirmPopup('알림', '범례를 입력해 주세요.', 'alert');
									$('#ok_alertPopup').click(function () {
										confirmPopupRemove();
									});
									$('#close_confirmPopup').click(function () {
										confirmPopupRemove();
									});
									return;
								}
							}

							if(exFlag){
								var strTag ='';
								var exmpl = $('#EXMPL_EX').val();
								var aCount = 0;
								strTag+=exmpl+",";
								for(var i = 1; i<=exmpl; i++){
									if($('#SEP'+i+'_EX').val()!=null && $('#SEP'+i+'_EX').val() !=''){
										if(i==exmpl){
											strTag +=$('#SEP'+i+'_EX').val();
										}else{
											strTag +=$('#SEP'+i+'_EX').val()+",";											
										}
										aCount++;
									}
								}
								if(aCount==exmpl){
									$('#data_ex').val(strTag);	
								}else{
									getConfirmPopup('알림', '범례를 입력해 주세요.', 'alert');
									$('#ok_alertPopup').click(function () {
										confirmPopupRemove();
									});
									$('#close_confirmPopup').click(function () {
										confirmPopupRemove();
									});
									return;
								}
							}

							if(sidoFlagRight){
								var strTag ='';
								var exmpl = $('#EXMPL_SIDO_RIGHT').val();
								var aCount = 0;
								strTag+=exmpl+",";
								for(var i = 1; i<=exmpl; i++){
									if($('#SEP'+i+'_SIDO_RIGHT').val()!=null && $('#SEP'+i+'_SIDO_RIGHT').val() !=''){
										if(i==exmpl){
											strTag +=$('#SEP'+i+'_SIDO_RIGHT').val();
										}else{
											strTag +=$('#SEP'+i+'_SIDO_RIGHT').val()+",";											
										}
										aCount++;
									}
								}
								if(aCount==exmpl){
									$('#data_sido_right').val(strTag);	
								}else{
									getConfirmPopup('알림', '범례를 입력해 주세요.', 'alert');
									$('#ok_alertPopup').click(function () {
										confirmPopupRemove();
									});
									$('#close_confirmPopup').click(function () {
										confirmPopupRemove();
									});
									return;
								}
							}

							if(gugunFlagRight){
								var strTag ='';
								var exmpl = $('#EXMPL_SIGUGUN_RIGHT').val();
								var aCount = 0;
								strTag+=exmpl+",";
								for(var i = 1; i<=exmpl; i++){
									if($('#SEP'+i+'_SIGUGUN_RIGHT').val()!=null && $('#SEP'+i+'_SIGUGUN_RIGHT').val() !=''){
										if(i==exmpl){
											strTag +=$('#SEP'+i+'_SIGUGUN_RIGHT').val();
										}else{
											strTag +=$('#SEP'+i+'_SIGUGUN_RIGHT').val()+",";	
										}
										aCount++;
									}
								}
								if(aCount==exmpl){
									$('#data_gugun_right').val(strTag);	
								}else{
									getConfirmPopup('알림', '범례를 입력해 주세요.', 'alert');
									$('#ok_alertPopup').click(function () {
										confirmPopupRemove();
									});
									$('#close_confirmPopup').click(function () {
										confirmPopupRemove();
									});
									return;
								}
							}

							if(dongFlagRight){
								var strTag ='';
								var exmpl = $('#EXMPL_DONG_RIGHT').val();
								var aCount = 0;
								strTag+=exmpl+",";
								for(var i = 1; i<=exmpl; i++){
									if($('#SEP'+i+'_DONG_RIGHT').val()!=null && $('#SEP'+i+'_DONG_RIGHT').val() !=''){
										if(i==exmpl){
											strTag +=$('#SEP'+i+'_DONG_RIGHT').val();
										}else{
											strTag +=$('#SEP'+i+'_DONG_RIGHT').val()+",";											
										}
										aCount++;
									}
								}
								if(aCount==exmpl){
									$('#data_dong_right').val(strTag);	
								}else{
									getConfirmPopup('알림', '범례를 입력해 주세요.', 'alert');
									$('#ok_alertPopup').click(function () {
										confirmPopupRemove();
									});
									$('#close_confirmPopup').click(function () {
										confirmPopupRemove();
									});
									return;
								}

							}

							if(exFlagRight){
								var strTag ='';
								var exmpl = $('#EXMPL_EX_RIGHT').val();
								var aCount = 0;
								strTag+=exmpl+",";
								for(var i = 1; i<=exmpl; i++){
									if($('#SEP'+i+'_EX_RIGHT').val()!=null && $('#SEP'+i+'_EX_RIGHT').val() !=''){
										if(i==exmpl){
											strTag +=$('#SEP'+i+'_EX_RIGHT').val();
										}else{
											strTag +=$('#SEP'+i+'_EX_RIGHT').val()+",";											
										}
										aCount++;
									}
								}
								if(aCount==exmpl){
									$('#data_ex_right').val(strTag);	
								}else{
									getConfirmPopup('알림', '범례를 입력해 주세요.', 'alert');
									$('#ok_alertPopup').click(function () {
										confirmPopupRemove();
									});
									$('#close_confirmPopup').click(function () {
										confirmPopupRemove();
									});
									return;
								}

							}

						}
						
						// mng_s 2017. 08. 04 석진혁
						if($("#POI_DISP_YN").val() == "Y") {
							if($("#THEME_CD").val().length < 2 && $("#CORP_CLASS_CD").val().length < 2) {
								getConfirmPopup('알림', 'POI 테마코드 혹은 산업분류코드를 선택해 주세요.', 'alert');
								$('#ok_alertPopup').click(function () {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								$('#THEMASEARCHButton').focus();
								return;
							} else if($("#THEME_CD").val().length > 1 && $("#CORP_CLASS_CD").val().length > 1) {
								getConfirmPopup('알림', 'POI 테마코드와 산업분류코드는 동시에 선택할 수 없습니다.</br>확인 선택 : 테마코드 초기화</br>취소 선택 : 산업분류코드 초기화', 'confirm');
								$('#ok_confirmPopup').click(function () {
									$("#THEME_CD").val("");
									confirmPopupRemove();
								});
								$('#cancel_confirmPopup').click(function () {
									$("#CORP_CLASS_CD").val("");
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								return;
							}
						}
						
						if($("#DISP_RANK").val().length < 1) {
							getConfirmPopup('알림', '표출순위 값을 입력하여 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#DISP_RANK').focus();
							return;
						}
						// mng_e 2017. 08. 04 석진혁
						
						$themaMapUpdateManage.updateThemaMap5();
					}else if(THEMA_SEL=='06'){

						//분할맵
						var title = $('#THEMA_TITLE').val();
						if(title.length<1){
							getConfirmPopup('알림', '제목명을 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#THEMA_TITLE').focus();
							return;
						}
//						var mob_yn = $('#MOB_YN').val();
//						var mob_url = $('#MOB_URL').val();
//						if(mob_yn=='Y'){
//							if(mob_url.length<1){
//								getConfirmPopup('알림', '모바일 URL을 입력해 주세요.', 'alert');
//								$('#ok_alertPopup').click(function () {
//									confirmPopupRemove();
//								});
//								$('#close_confirmPopup').click(function () {
//									confirmPopupRemove();
//								});
//								$('#MOB_URL').focus();
//								return;
//							}	
//						}
						var thema_avr = $('#THEMA_AVR').val();
						if(thema_avr.length<1){
							getConfirmPopup('알림', '관련 통계를 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#THEMA_AVR').focus();
							return;
						}
						var DISP_MTHD = $('#DISP_MTHD').val();
						if(DISP_MTHD.length<1){
							getConfirmPopup('알림', '표현 방법을 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#DISP_MTHD').focus();
							return;
						}
						var data_id = $('#DATA_ID').val();
						if(data_id.length<1){
							getConfirmPopup('알림', '데이터 ID를 선택해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#DATA_ID').focus();
							return;
						}
						var data_year = $('#DATA_YEAR').val();
						var thema_exp = CKEDITOR.instances.THEMA_EXP.getData();//$('#THEMA_EXP').val();
						if(thema_exp.length<1){
							getConfirmPopup('알림', '설명을 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#THEMA_EXP').focus();
							return;
						}
						var left_year_a = $('#LEFT_YEAR').val();
						var PRIORTY_YN = $('#PRIORTY_YN').val();
						//A 형


						var left_title_a = $('#LEFT_TITLE').val();
						if(left_title_a.length<1){
							getConfirmPopup('알림', '표출정보명을 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#LEFT_TITLE').focus();
							return;
						}
						var left_ttip_a = $('#LEFT_TTIP').val();
						if(left_ttip_a.length<1){
							getConfirmPopup('알림', '표출정보 툴팁명을 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#LEFT_TTIP').focus();
							return;
						}
						var left_unit_a = $('#LEFT_UNIT').val();
						if(left_unit_a.length<1){
							getConfirmPopup('알림', '표출정보 단위를 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#LEFT_UNIT').focus();
							return;
						}
						var left_source_a = $('#LEFT_SOURCE_URL').val();
						if(left_source_a.length<1){
							getConfirmPopup('알림', '표출정보 출처를 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#LEFT_SOURCE_URL').focus();
							return;
						}
						var left_map_ttip_title_a = $('#LEFT_MAP_TITLE').val(); // 분할맵A명
						if(left_map_ttip_title_a.length<1){
							getConfirmPopup('알림', '분할맵 명을 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#LEFT_MAP_TITLE').focus();
							return;
						}
						var left_map_unit = $('#LEFT_MAP_UNIT').val(); //분할맵A단위
						if(left_map_unit.length<1){
							getConfirmPopup('알림', '분할맵 단위를 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#LEFT_MAP_UNIT').focus();
							return;
						}
						var LEFT_MAP_TTIP_TITLE = $('#LEFT_MAP_TTIP_TITLE').val(); //분할맵 툴팁A명
						if(LEFT_MAP_TTIP_TITLE.length<1){
							getConfirmPopup('알림', '분할맵 툴팁명을 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#LEFT_MAP_TTIP_TITLE').focus();
							return;
						}
						var LEFT_MAP_INFO = $('#LEFT_MAP_INFO').val(); //분할맵A출처
						if(LEFT_MAP_INFO.length<1){
							getConfirmPopup('알림', '분할맵 출처를 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#LEFT_MAP_INFO').focus();
							return;
						}

						var left_title_b = $('#RIGHT_TITLE').val();
						if(left_title_b!=null && left_title_b!=''){
							var left_title_b = $('#RIGHT_TITLE').val();
							if(left_title_b.length<1){
								getConfirmPopup('알림', '표출정보 명을 입력해 주세요.', 'alert');
								$('#ok_alertPopup').click(function () {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								$('#RIGHT_TITLE').focus();
								return;
							}
							var left_ttip_b = $('#RIGHT_TTIP').val();
							if(left_ttip_b.length<1){
								getConfirmPopup('알림', '표출정보 툴팁명을 입력해 주세요.', 'alert');
								$('#ok_alertPopup').click(function () {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								$('#RIGHT_TTIP').focus();
								return;
							}
							var left_unit_b = $('#RIGHT_UNIT').val();
							if(left_unit_b.length<1){
								getConfirmPopup('알림', '표출정보 단위를 입력해 주세요.', 'alert');
								$('#ok_alertPopup').click(function () {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								$('#RIGHT_UNIT').focus();
								return;
							}
							var left_source_b = $('#RIGHT_SOURCE_URL').val();
							if(left_source_b.length<1){
								getConfirmPopup('알림', '표출정보 출처를 입력해 주세요.', 'alert');
								$('#ok_alertPopup').click(function () {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								$('#RIGHT_SOURCE_URL').focus();
								return;
							}
//							var right_map_ttip_title_a = $('#RIGHT_MAP_TITLE').val(); // 분할맵A명
//							if(right_map_ttip_title_a.length<1){
//								getConfirmPopup('알림', '분할맵 명을 입력해 주세요.', 'alert');
//								$('#ok_alertPopup').click(function () {
//									confirmPopupRemove();
//								});
//								$('#close_confirmPopup').click(function () {
//									confirmPopupRemove();
//								});
//								$('#RIGHT_MAP_TITLE').focus();
//								return;
//							}
							var right_map_unit = $('#RIGHT_MAP_UNIT').val(); //분할맵A단위
							if(right_map_unit.length<1){
								getConfirmPopup('알림', '분할맵 단위를 입력해 주세요.', 'alert');
								$('#ok_alertPopup').click(function () {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								$('#RIGHT_MAP_UNIT').focus();
								return;
							}
							var right_MAP_TTIP_TITLE = $('#RIGHT_MAP_TTIP_TITLE').val(); //분할맵 툴팁A명
							if(right_MAP_TTIP_TITLE.length<1){
								getConfirmPopup('알림', '분할맵 툴팁명을 입력해 주세요.', 'alert');
								$('#ok_alertPopup').click(function () {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								$('#RIGHT_MAP_TTIP_TITLE').focus();
								return;
							}
							var right_MAP_INFO = $('#RIGHT_MAP_INFO').val(); //분할맵A출처
							if(right_MAP_INFO.length<1){
								getConfirmPopup('알림', '분할맵 출처를 입력해 주세요.', 'alert');
								$('#ok_alertPopup').click(function () {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								$('#RIGHT_MAP_INFO').focus();
								return;
							}
						}

						if(radioValue=='3'){
							var sidoFlag = $('#add_check_sido').is(":checked");
							var gugunFlag = $('#add_check_sigugun').is(":checked");
							var dongFlag = $('#add_check_dong').is(":checked");
							var exFlag = $('#add_check_ex').is(":checked");

							var sidoFlagRight = $('#add_check_sido_right').is(":checked");
							var gugunFlagRight = $('#add_check_sigugun_right').is(":checked");
							var dongFlagRight = $('#add_check_dong_right').is(":checked");
							var exFlagRight = $('#add_check_ex_right').is(":checked");

							if(sidoFlag){
								var strTag ='';
								var exmpl = $('#EXMPL_SIDO').val();
								var aCount = 0;
								strTag+=exmpl+",";
								for(var i = 1; i<=exmpl; i++){
									if($('#SEP'+i+'_SIDO').val()!=null && $('#SEP'+i+'_SIDO').val() !=''){
										if(i==exmpl){
											strTag +=$('#SEP'+i+'_SIDO').val();
										}else{
											strTag +=$('#SEP'+i+'_SIDO').val()+",";	
										}
										aCount++;
									}
								}
								
								if(aCount==exmpl){
									$('#data_sido').val(strTag);	
								}else{
									getConfirmPopup('알림', '범례를 입력해 주세요.', 'alert');
									$('#ok_alertPopup').click(function () {
										confirmPopupRemove();
									});
									$('#close_confirmPopup').click(function () {
										confirmPopupRemove();
									});
									return;
								}
							}

							if(gugunFlag){
								var strTag ='';
								var exmpl = $('#EXMPL_SIGUGUN').val();
								var aCount = 0;
								strTag+=exmpl+",";
								for(var i = 1; i<=exmpl; i++){
									if($('#SEP'+i+'_SIGUGUN').val()!=null && $('#SEP'+i+'_SIGUGUN').val() !=''){
										
										if(i==exmpl){
											strTag +=$('#SEP'+i+'_SIGUGUN').val();
										}else{
											strTag +=$('#SEP'+i+'_SIGUGUN').val()+",";	
										}
										aCount++;
									}
								}
								if(aCount==exmpl){
									$('#data_gugun').val(strTag);
								}else{
									getConfirmPopup('알림', '범례를 입력해 주세요.', 'alert');
									$('#ok_alertPopup').click(function () {
										confirmPopupRemove();
									});
									$('#close_confirmPopup').click(function () {
										confirmPopupRemove();
									});
									return;
								}
							}

							if(dongFlag){
								var strTag ='';
								var exmpl = $('#EXMPL_DONG').val();
								var aCount = 0;
								strTag+=exmpl+",";
								for(var i = 1; i<=exmpl; i++){
									if($('#SEP'+i+'_DONG').val()!=null && $('#SEP'+i+'_DONG').val() !=''){
										
										if(i==exmpl){
											strTag +=$('#SEP'+i+'_DONG').val();
										}else{
											strTag +=$('#SEP'+i+'_DONG').val()+",";	
										}
										aCount++;
									}
								}
								if(aCount==exmpl){
									$('#data_dong').val(strTag);	
								}else{
									getConfirmPopup('알림', '범례를 입력해 주세요.', 'alert');
									$('#ok_alertPopup').click(function () {
										confirmPopupRemove();
									});
									$('#close_confirmPopup').click(function () {
										confirmPopupRemove();
									});
									return;
								}
							}

							if(exFlag){
								var strTag ='';
								var exmpl = $('#EXMPL_EX').val();
								var aCount = 0;
								strTag+=exmpl+",";
								for(var i = 1; i<=exmpl; i++){
									if($('#SEP'+i+'_EX').val()!=null && $('#SEP'+i+'_EX').val() !=''){
										if(i==exmpl){
											strTag +=$('#SEP'+i+'_EX').val();
										}else{
											strTag +=$('#SEP'+i+'_EX').val()+",";											
										}
										aCount++;
									}
								}
								if(aCount==exmpl){
									$('#data_ex').val(strTag);	
								}else{
									getConfirmPopup('알림', '범례를 입력해 주세요.', 'alert');
									$('#ok_alertPopup').click(function () {
										confirmPopupRemove();
									});
									$('#close_confirmPopup').click(function () {
										confirmPopupRemove();
									});
									return;
								}
							}

							if(sidoFlagRight){
								var strTag ='';
								var exmpl = $('#EXMPL_SIDO_RIGHT').val();
								var aCount = 0;
								strTag+=exmpl+",";
								for(var i = 1; i<=exmpl; i++){
									if($('#SEP'+i+'_SIDO_RIGHT').val()!=null && $('#SEP'+i+'_SIDO_RIGHT').val() !=''){
										if(i==exmpl){
											strTag +=$('#SEP'+i+'_SIDO_RIGHT').val();
										}else{
											strTag +=$('#SEP'+i+'_SIDO_RIGHT').val()+",";											
										}
										aCount++;
									}
								}
								if(aCount==exmpl){
									$('#data_sido_right').val(strTag);	
								}else{
									getConfirmPopup('알림', '범례를 입력해 주세요.', 'alert');
									$('#ok_alertPopup').click(function () {
										confirmPopupRemove();
									});
									$('#close_confirmPopup').click(function () {
										confirmPopupRemove();
									});
									return;
								}
							}

							if(gugunFlagRight){
								var strTag ='';
								var exmpl = $('#EXMPL_SIGUGUN_RIGHT').val();
								var aCount = 0;
								strTag+=exmpl+",";
								for(var i = 1; i<=exmpl; i++){
									if($('#SEP'+i+'_SIGUGUN_RIGHT').val()!=null && $('#SEP'+i+'_SIGUGUN_RIGHT').val() !=''){
										if(i==exmpl){
											strTag +=$('#SEP'+i+'_SIGUGUN_RIGHT').val();
										}else{
											strTag +=$('#SEP'+i+'_SIGUGUN_RIGHT').val()+",";	
										}
										aCount++;
									}
								}
								if(aCount==exmpl){
									$('#data_gugun_right').val(strTag);	
								}else{
									getConfirmPopup('알림', '범례를 입력해 주세요.', 'alert');
									$('#ok_alertPopup').click(function () {
										confirmPopupRemove();
									});
									$('#close_confirmPopup').click(function () {
										confirmPopupRemove();
									});
									return;
								}
							}

							if(dongFlagRight){
								var strTag ='';
								var exmpl = $('#EXMPL_DONG_RIGHT').val();
								var aCount = 0;
								strTag+=exmpl+",";
								for(var i = 1; i<=exmpl; i++){
									if($('#SEP'+i+'_DONG_RIGHT').val()!=null && $('#SEP'+i+'_DONG_RIGHT').val() !=''){
										if(i==exmpl){
											strTag +=$('#SEP'+i+'_DONG_RIGHT').val();
										}else{
											strTag +=$('#SEP'+i+'_DONG_RIGHT').val()+",";											
										}
										aCount++;
									}
								}
								if(aCount==exmpl){
									$('#data_dong_right').val(strTag);	
								}else{
									getConfirmPopup('알림', '범례를 입력해 주세요.', 'alert');
									$('#ok_alertPopup').click(function () {
										confirmPopupRemove();
									});
									$('#close_confirmPopup').click(function () {
										confirmPopupRemove();
									});
									return;
								}

							}

							if(exFlagRight){
								var strTag ='';
								var exmpl = $('#EXMPL_EX_RIGHT').val();
								var aCount = 0;
								strTag+=exmpl+",";
								for(var i = 1; i<=exmpl; i++){
									if($('#SEP'+i+'_EX_RIGHT').val()!=null && $('#SEP'+i+'_EX_RIGHT').val() !=''){
										if(i==exmpl){
											strTag +=$('#SEP'+i+'_EX_RIGHT').val();
										}else{
											strTag +=$('#SEP'+i+'_EX_RIGHT').val()+",";											
										}
										aCount++;
									}
								}
								if(aCount==exmpl){
									$('#data_ex_right').val(strTag);	
								}else{
									getConfirmPopup('알림', '범례를 입력해 주세요.', 'alert');
									$('#ok_alertPopup').click(function () {
										confirmPopupRemove();
									});
									$('#close_confirmPopup').click(function () {
										confirmPopupRemove();
									});
									return;
								}

							}

						}
						
					
						// mng_s 2017. 08. 04 석진혁
						if($("#DISP_RANK").val().length < 1) {
							getConfirmPopup('알림', '표출순위 값을 입력하여 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#DISP_RANK').focus();
							return;
						}
						// mng_e 2017. 08. 04 석진혁
					
						$themaMapUpdateManage.updateThemaMap6();
					} else if(THEMA_SEL=='07') { //POI
						var title = $('#THEMA_TITLE').val();
						if(title.length<1){
							getConfirmPopup('알림', '제목명을 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#THEMA_TITLE').focus();
							return;
						}
//						var mob_yn = $('#MOB_YN').val();
//						var mob_url = $('#MOB_URL').val();
//						if(mob_yn=='Y'){
//							if(mob_url.length<1){
//								getConfirmPopup('알림', '모바일 URL을 입력해 주세요.', 'alert');
//								$('#ok_alertPopup').click(function () {
//									confirmPopupRemove();
//								});
//								$('#close_confirmPopup').click(function () {
//									confirmPopupRemove();
//								});
//								$('#MOB_URL').focus();
//								return;
//							}	
//						}
						var thema_avr = $('#THEMA_AVR').val();
						if(thema_avr.length<1){
							getConfirmPopup('알림', '관련 통계를 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#THEMA_AVR').focus();
							return;
						}
						var DISP_MTHD = $('#DISP_MTHD').val();
						if(DISP_MTHD.length<1){
							getConfirmPopup('알림', '표현 방법을 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#DISP_MTHD').focus();
							return;
						}
						var thema_exp = CKEDITOR.instances.THEMA_EXP.getData();//$('#THEMA_EXP').val();
						if(thema_exp.length<1){
							getConfirmPopup('알림', '설명을 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#THEMA_EXP').focus();
							return;
						}
						var PRIORTY_YN = $('#PRIORTY_YN').val();
						
						// mng_s 2017. 08. 07 석진혁
						var year_info = $('#YEAR_INFO').val();						
						// mng_e 2017. 08. 07 석진혁
						if(year_info.length<1){
							getConfirmPopup('알림', 'POI년도 정보를 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#YEAR_INFO_START').focus();
							return;
						}
						
						// mng_s 2017. 08. 04 석진혁
						if($("#POI_DISP_YN").val() == "Y") {
							if($("#THEME_CD").val().length < 2 && $("#CORP_CLASS_CD").val().length < 2) {
								getConfirmPopup('알림', 'POI 테마코드 혹은 산업분류코드를 선택해 주세요.', 'alert');
								$('#ok_alertPopup').click(function () {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								$('#THEMASEARCHButton').focus();
								return;
							} else if($("#THEME_CD").val().length > 1 && $("#CORP_CLASS_CD").val().length > 1) {
								getConfirmPopup('알림', 'POI 테마코드와 산업분류코드는 동시에 선택할 수 없습니다.</br>확인 선택 : 테마코드 초기화</br>취소 선택 : 산업분류코드 초기화', 'confirm');
								$('#ok_confirmPopup').click(function () {
									$("#THEME_CD").val("");
									confirmPopupRemove();
								});
								$('#cancel_confirmPopup').click(function () {
									$("#CORP_CLASS_CD").val("");
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								return;
							}
						}
						
						if($("#DISP_RANK").val().length < 1) {
							getConfirmPopup('알림', '표출순위 값을 입력하여 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#DISP_RANK').focus();
							return;
						}
						// mng_e 2017. 08. 04 석진혁
						
						$themaMapUpdateManage.updateThemaMap7();
					}
				});

				$('#cancelButton').click(function(){
					// 2016. 04. 25 j.h.Seok
					$themaMapUpdateManage.goBackPage();
//					location.href = "./../DT/themaMapMainManage.html";
				});

				$('#THEMA_SEL').change(function(){
					var value = $('#THEMA_SEL').val();
					if(value=='04') { //증감
						$('#resetFormA').show();
						$('#chart_title1').show();
						$('#MAP_TTIP_TITLEA').hide();
						$('#resetFormB').hide();
						$('#add_check').hide();
						$('#THEMA_T').text('증감형 정보A');
						$('#MOB_YN').change(function(){
							var mob_yn = $('#MOB_YN').val();
							if(mob_yn=='Y'){
								$('#MOBILE_URL').show();
							}else{
								$('#MOBILE_URL').hide();
							}
						});

						$('#MAP_DATA_YEAR_LAY').hide();
						
						// mng_s 2017. 08. 04 석진혁
						$('#POI_DISP_YN_AREA').hide();
						$('#POI_DISP_YN').hide();
						$('#POI_area').hide();
						// mng_e 2017. 08. 04 석진혁
						
					} else if(value=='06') { //분할
						$('#resetFormA').show();
						$('#resetFormB').hide();
						$('#chart_title1').hide();
						$('#MAP_TTIP_TITLEA').show()
						$('#add_check').show();
						$('#add_check').on('change', function() { 
							// From the other examples
							if (!this.checked) {
								$('#resetFormB').hide();
							}else{
								$('#resetFormB').show();
								$('#chart_title2').hide();
								$('#MAP_TTIP_TITLEB').show();

							}
						});
						$('#THEMA_T').text('분할맵형 정보A');
						$('#THEMA_TT').text('분할맵형 정보B');
						$('#MOB_YN').change(function(){
							var mob_yn = $('#MOB_YN').val();
							if(mob_yn=='Y'){
								$('#MOBILE_URL').show();
							}else{
								$('#MOBILE_URL').hide();
							}
						});
						$('#MAP_DATA_YEAR_LAY').show();
						
						// mng_s 2017. 08. 04 석진혁
						$('#POI_DISP_YN_AREA').hide();
						$('#POI_DISP_YN').hide();
						$('#POI_area').hide();
						// mng_e 2017. 08. 04 석진혁
						
					} else if(value=='05') { //시계열
						$('#resetFormA').show();
						$('#resetFormB').hide();
						$('#MAP_TTIP_TITLEA').hide();
						$('#MAP_DATA_YEAR_LAY').hide();
						$('#chart_title1').hide();
						$('#add_check').show();
						$('#add_check').on('change', function() { 
							// From the other examples
							if (!this.checked) {
								$('#resetFormB').hide();
							}else{
								$('#resetFormB').show();
								$('#MAP_TTIP_TITLEB').hide();
								$('#chart_title2').hide();

							}
						});
						$('#THEMA_T').text('시계열형 정보A');
						$('#THEMA_TT').text('시계열형 정보B');
						$('#MOB_YN').change(function(){
							var mob_yn = $('#MOB_YN').val();
							if(mob_yn=='Y'){
								$('#MOBILE_URL').show();
							}else{
								$('#MOBILE_URL').hide();
							}
						});

						// mng_s 2017. 08. 04 석진혁
						$('#POI_DISP_YN_AREA').hide();
						$('#POI_DISP_YN').hide();
						$('#POI_area').hide();
						// mng_e 2017. 08. 04 석진혁
						
					} else if(value=='03') { //색상
						$('#resetFormA').show();
						$('#resetFormB').hide();
						$('#MAP_TTIP_TITLEA').hide();
						$('#MAP_DATA_YEAR_LAY').hide();
						$('#chart_title1').hide();
						$('#add_check').show();
						$('#add_check').on('change', function() { 
							// From the other examples
							if (!this.checked) {
								$('#resetFormB').hide();
							}else{
								$('#resetFormB').show();
								$('#MAP_TTIP_TITLEB').hide();
								$('#chart_title2').hide();

							}
						});
						$('#THEMA_T').text('색상형 정보A');
						$('#THEMA_TT').text('색상형 정보B');
						$('#MOB_YN').change(function(){
							var mob_yn = $('#MOB_YN').val();
							if(mob_yn=='Y'){
								$('#MOBILE_URL').show();
							}else{
								$('#MOBILE_URL').hide();
							}
						});
						
						// mng_s 2017. 08. 04 석진혁
						$('#POI_DISP_YN_AREA').show();
						$('#POI_DISP_YN').show();
						$('#POI_area').show();
						// mng_e 2017. 08. 04 석진혁
						
					} else if(value=='07') { //POI 추가
						$('#resetFormA').hide();
						$('#resetFormB').hide();
						$('#add_check').hide();
						$('#MOBILE_URL').hide();
						$('#FIX_YN').attr('disabled','true');
						$("#FIX_YN").val("Y");
						$('#MAP_DATA_YEAR_LAY').hide();
						$('#CHECK_DIV').hide();
						$('.POI_area2').hide();
						$('#POI_area3').html("POI년도 정보")
						
						// mng_s 2017. 08. 04 석진혁
//						$('#POI_area4').attr("colspan","3");
//						$('#POI_area5').attr("colspan","3");
						// mng_e 2017. 08. 04 석진혁
						
						$('#POI_area').show();
						$('#THEMASEARCHButton').show();
						
						// mng_s 2017. 08. 04 석진혁
						$('#CORPCLASSSEARCHButton').show();
						// mng_e 2017. 08. 04 석진혁
						
						$('#BOR_YN').attr('disabled','true');
						$("#BOR_YN").val("N");
						$('#MOB_YN').change(function(){
							var mob_yn = $('#MOB_YN').val();
							if(mob_yn=='Y'){
								$('#MOBILE_URL').show();
							}else{
								$('#MOBILE_URL').hide();
							}
						});
					}
				});
				// 2016. 04. 25 j.h.Seok				
//				$themaMapUpdateManage.requestDetail(STAT_THEMA_MAP_ID);

			});


	$themaMapUpdateManage = {
			// 2016. 04. 25 j.h.Seok
			goBackPage : function() {
				var htmlParams = "";
				if(category != null && category != undefined) {
					htmlParams += "&CATEGORY_NM=" + category; 
				 }
				 
				 if(srv_yn != null && srv_yn != undefined) {
					 htmlParams += "&SRV_YN=" + srv_yn; 
				 }
				 
				 if(title != null && title != undefined) {
					 htmlParams += "&TITLE=" + title; 
				 }
				 
				location.href = "./../DT/themaMapMainManage.html?" + htmlParams;
			}, 
			
			updateThemaMap3 : function(){
				//색상타입
				var category_nm = $('#CATEGORY_NM').val();
				var title = $('#THEMA_TITLE').val();
				var srv_yn = $('#SRV_YN').val();
				var mob_yn = $('#MOB_YN').val();
				var mob_url = $('#MOB_URL').val();
				var thema_avr = $('#THEMA_AVR').val();
				var bor_yn = $('#BOR_YN').val();
				var start_x = $('#START_X').val();
				var start_y = $('#START_Y').val();
				var min_map = $('#MIN_MAP').val();
				var max_map = $('#MAX_MAP').val();
				var DISP_MTHD = $('#DISP_MTHD').val();
				var data_id = $('#DATA_ID').val();
				var data_year = $('#DATA_YEAR').val();
				var map_data_year = $('#MAP_DATA_YEAR').val();
				var thema_exp = CKEDITOR.instances.THEMA_EXP.getData();//$('#THEMA_EXP').val();
				var left_year_a = $('#LEFT_YEAR').val();
				var PRIORTY_YN =$('#PRIORTY_YN').val();
				var disp_rank = $("#DISP_RANK").val();
				
				//2016.03.21 수정, enter시 <br/>추가
				//thema_exp = thema_exp.replace(/\n/g, "<br>");
				
				var POI_DISP_YN = $('#POI_DISP_YN').val();
				var THEME_CD = $('#THEME_CD').val();
				
				// mng_s 2017. 08. 04 석진혁
				var CORP_CLASS_CD = $('#CORP_CLASS_CD').val();
				// mng_e 2017. 08. 04 석진혁
				
				//A 형
				var left_title_a = $('#LEFT_TITLE').val();
				var left_ttip_a = $('#LEFT_TTIP').val();
				var left_unit_a = $('#LEFT_UNIT').val();
				var left_source_a = $('#LEFT_SOURCE_URL').val();

				var THEMA_SEL = $('#THEMA_SEL').val();
				
				var FIX_YN = $('#FIX_YN').val();
				var YEAR_INFO = $('#YEAR_INFO').val();
				
				if (POI_DISP_YN == null) {
					POI_DISP_YN = "N";
				}

				var sopOpenApiupdateThemaMap3Obj = new sop.openApi.updateThemaMap3.api();
				sopOpenApiupdateThemaMap3Obj.addParam('STAT_THEMA_MAP_ID',STAT_THEMA_MAP_ID);
				sopOpenApiupdateThemaMap3Obj.addParam('CATEGORY', category_nm);
				sopOpenApiupdateThemaMap3Obj.addParam('TITLE', title);
				sopOpenApiupdateThemaMap3Obj.addParam('THEMA_MAP_TYPE', THEMA_SEL);
				sopOpenApiupdateThemaMap3Obj.addParam('SRV_YN', srv_yn);
				sopOpenApiupdateThemaMap3Obj.addParam('START_X', start_x);
				sopOpenApiupdateThemaMap3Obj.addParam('START_Y', start_y);
				sopOpenApiupdateThemaMap3Obj.addParam('MAX_LEVEL', max_map);
				sopOpenApiupdateThemaMap3Obj.addParam('MIN_LEVEL', min_map);
				sopOpenApiupdateThemaMap3Obj.addParam('MOBILE_YN', mob_yn);
				sopOpenApiupdateThemaMap3Obj.addParam('DISP_MTHD', DISP_MTHD);
				sopOpenApiupdateThemaMap3Obj.addParam('REL_STAT_INFO', thema_avr);
				sopOpenApiupdateThemaMap3Obj.addParam('DATA_YEAR', data_year);
				sopOpenApiupdateThemaMap3Obj.addParam('DATA_ID', data_id);
				sopOpenApiupdateThemaMap3Obj.addParam('EXP', encodeURIComponent(thema_exp));
				sopOpenApiupdateThemaMap3Obj.addParam('LEFT_NM', left_title_a);
				sopOpenApiupdateThemaMap3Obj.addParam('PRIORTY_YN', PRIORTY_YN);
				sopOpenApiupdateThemaMap3Obj.addParam('POI_DISP_YN',POI_DISP_YN);
				
				// mng_s 2017. 08. 04 석진혁
				if(POI_DISP_YN == "Y") {
					if(THEME_CD != null && THEME_CD != undefined && THEME_CD.length > 1) {
						sopOpenApiupdateThemaMap3Obj.addParam('THEME_CD', THEME_CD);
					} else if(CORP_CLASS_CD != null && CORP_CLASS_CD != undefined && CORP_CLASS_CD.length > 1) {
						sopOpenApiupdateThemaMap3Obj.addParam('CORP_CLASS_CD', CORP_CLASS_CD);
					}
				}
				// mng_e 2017. 08. 04 석진혁
				
				sopOpenApiupdateThemaMap3Obj.addParam('FIX_YN', FIX_YN);
				sopOpenApiupdateThemaMap3Obj.addParam('YEAR_INFO', YEAR_INFO);
				sopOpenApiupdateThemaMap3Obj.addParam('DISP_RANK', disp_rank);

				if(mob_url.length >= 1){
					sopOpenApiupdateThemaMap3Obj.addParam('MOBILE_URL', mob_url);
				}
				// 2016. 03. 25 j.h.Seok
				sopOpenApiupdateThemaMap3Obj.addParam('LEFT_UNIT', encodeURIComponent(left_unit_a));
				sopOpenApiupdateThemaMap3Obj.addParam('LEFT_YEAR', left_year_a);
				sopOpenApiupdateThemaMap3Obj.addParam('LEFT_TTIP', left_ttip_a);
				sopOpenApiupdateThemaMap3Obj.addParam('LEFT_SOURCE', left_source_a);

				if($('#RIGHT_TITLE').val()!=null && $('#RIGHT_TITLE').val()!='')
				{
					//B 형 
					var left_year_b = $('#RIGHT_YEAR').val();
					var left_title_b = $('#RIGHT_TITLE').val();
					var left_ttip_b = $('#RIGHT_TTIP').val();
					var left_unit_b = $('#RIGHT_UNIT').val();
					var left_source_b = $('#RIGHT_SOURCE_URL').val();

					sopOpenApiupdateThemaMap3Obj.addParam('RIGHT_NM', left_title_b);
					// 2016. 03. 25 j.h.Seok
					sopOpenApiupdateThemaMap3Obj.addParam('RIGHT_UNIT', encodeURIComponent(left_unit_b));
					sopOpenApiupdateThemaMap3Obj.addParam('RIGHT_TTIP', left_ttip_b);
					sopOpenApiupdateThemaMap3Obj.addParam('RIGHT_SOURCE', left_source_b);
				}
				if(radioValue==''){
					radioValue='1';
				}
				sopOpenApiupdateThemaMap3Obj.addParam('EXMPL_TYPE', radioValue);
				sopOpenApiupdateThemaMap3Obj.addParam('ATDRC_YN', bor_yn);
				
				//var hotIssueYn= $("#HOT_ISSUE_YN").val();
				//sopOpenApiupdateThemaMap3Obj.addParam('HOT_ISSUE_YN', hotIssueYn);

				sopOpenApiupdateThemaMap3Obj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/DT/ThemaMapManage/updateNewThemaMap.json"
				});
			},
			updateThemaMap4:function(){
				//증감형
				var category_nm = $('#CATEGORY_NM').val();
				var title = $('#THEMA_TITLE').val();
				var srv_yn = $('#SRV_YN').val();
				var mob_yn = $('#MOB_YN').val();
				var mob_url = $('#MOB_URL').val();
				var thema_avr = $('#THEMA_AVR').val();
				var bor_yn = $('#BOR_YN').val();
				var start_x = $('#START_X').val();
				var start_y = $('#START_Y').val();
				var min_map = $('#MIN_MAP').val();
				var max_map = $('#MAX_MAP').val();
				var DISP_MTHD = $('#DISP_MTHD').val();
				var data_id = $('#DATA_ID').val();
				var data_year = $('#DATA_YEAR').val();
				var map_data_year = $('#MAP_DATA_YEAR').val();
				var thema_exp = CKEDITOR.instances.THEMA_EXP.getData();//$('#THEMA_EXP').val();
				var left_year_a = $('#LEFT_YEAR').val();
				var PRIORTY_YN = $('#PRIORTY_YN').val();
				var POI_DISP_YN = $('#POI_DISP_YN').val();
				var THEME_CD = $('#THEME_CD').val();
				var disp_rank = $("#DISP_RANK").val();
				
				// mng_s 2017. 08. 04 석진혁
				var CORP_CLASS_CD = $('#CORP_CLASS_CD').val();
				// mng_e 2017. 08. 04 석진혁
				
				//2016.03.21 수정, enter시 <br/>추가
				//thema_exp = thema_exp.replace(/\n/g, "<br>");
				
				var FIX_YN = $('#FIX_YN').val();
				var YEAR_INFO = $('#YEAR_INFO').val();
				//A 형
				
				if (POI_DISP_YN == null) {
					POI_DISP_YN = "N";
				}
				

				var left_title_a = $('#LEFT_TITLE').val();
				var left_ttip_a = $('#LEFT_TTIP').val();
				var left_unit_a = $('#LEFT_UNIT').val();
				var left_source_a = $('#LEFT_SOURCE_URL').val();
				var left_chart_a = $('#LEFT_CHART').val();

				var THEMA_SEL = $('#THEMA_SEL').val();
				
				var sopOpenApiupdateThemaMap4Obj = new sop.openApi.updateThemaMap4.api();
				sopOpenApiupdateThemaMap4Obj.addParam('STAT_THEMA_MAP_ID',STAT_THEMA_MAP_ID);
				sopOpenApiupdateThemaMap4Obj.addParam('CATEGORY', category_nm);
				sopOpenApiupdateThemaMap4Obj.addParam('TITLE', title);
				sopOpenApiupdateThemaMap4Obj.addParam('THEMA_MAP_TYPE', THEMA_SEL);
				sopOpenApiupdateThemaMap4Obj.addParam('SRV_YN', srv_yn);
				sopOpenApiupdateThemaMap4Obj.addParam('START_X', start_x);
				sopOpenApiupdateThemaMap4Obj.addParam('START_Y', start_y);
				sopOpenApiupdateThemaMap4Obj.addParam('MAX_LEVEL', max_map);
				sopOpenApiupdateThemaMap4Obj.addParam('MIN_LEVEL', min_map);
				sopOpenApiupdateThemaMap4Obj.addParam('MOBILE_YN', mob_yn);
				sopOpenApiupdateThemaMap4Obj.addParam('DISP_MTHD', DISP_MTHD);
				sopOpenApiupdateThemaMap4Obj.addParam('REL_STAT_INFO', thema_avr);
				sopOpenApiupdateThemaMap4Obj.addParam('DATA_YEAR', data_year);
				sopOpenApiupdateThemaMap4Obj.addParam('DATA_ID', data_id);
				sopOpenApiupdateThemaMap4Obj.addParam('EXP', encodeURIComponent(thema_exp));
				sopOpenApiupdateThemaMap4Obj.addParam('LEFT_NM', left_title_a);
				sopOpenApiupdateThemaMap4Obj.addParam('PRIORTY_YN', PRIORTY_YN);
				sopOpenApiupdateThemaMap4Obj.addParam('POI_DISP_YN',POI_DISP_YN);

				// mng_s 2017. 08. 04 석진혁
				if(POI_DISP_YN == "Y") {
					if(THEME_CD != null && THEME_CD != undefined && THEME_CD.length > 1) {
						sopOpenApiupdateThemaMap4Obj.addParam('THEME_CD', THEME_CD);
					} else if(CORP_CLASS_CD != null && CORP_CLASS_CD != undefined && CORP_CLASS_CD.length > 1) {
						sopOpenApiupdateThemaMap4Obj.addParam('CORP_CLASS_CD', CORP_CLASS_CD);
					}
				}
				// mng_e 2017. 08. 04 석진혁

				sopOpenApiupdateThemaMap4Obj.addParam('FIX_YN', FIX_YN);
				sopOpenApiupdateThemaMap4Obj.addParam('YEAR_INFO', YEAR_INFO);
				sopOpenApiupdateThemaMap4Obj.addParam('DISP_RANK', disp_rank);
				if(mob_url.length >= 1){
					sopOpenApiupdateThemaMap4Obj.addParam('MOBILE_URL', mob_url);
				}
				// 2016. 03. 25 j.h.Seok
				sopOpenApiupdateThemaMap4Obj.addParam('LEFT_UNIT', encodeURIComponent(left_unit_a));
				sopOpenApiupdateThemaMap4Obj.addParam('LEFT_YEAR', left_year_a);
				sopOpenApiupdateThemaMap4Obj.addParam('LEFT_TTIP', left_ttip_a);
				sopOpenApiupdateThemaMap4Obj.addParam('LEFT_CHART', left_chart_a);
				sopOpenApiupdateThemaMap4Obj.addParam('LEFT_SOURCE', left_source_a);
				if(radioValue==''){
					radioValue='1';
				}

				sopOpenApiupdateThemaMap4Obj.addParam('EXMPL_TYPE', radioValue);
				sopOpenApiupdateThemaMap4Obj.addParam('ATDRC_YN', bor_yn);
				
				//var hotIssueYn= $("#HOT_ISSUE_YN").val();
				//sopOpenApiupdateThemaMap4Obj.addParam('HOT_ISSUE_YN', hotIssueYn);

				sopOpenApiupdateThemaMap4Obj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/DT/ThemaMapManage/updateNewThemaMap.json"
				});

			},
			updateThemaMap5:function(){

				var category_nm = $('#CATEGORY_NM').val();
				var title = $('#THEMA_TITLE').val();
				var srv_yn = $('#SRV_YN').val();
				var mob_yn = $('#MOB_YN').val();
				var mob_url = $('#MOB_URL').val();
				var thema_avr = $('#THEMA_AVR').val();
				var bor_yn = $('#BOR_YN').val();
				var start_x = $('#START_X').val();
				var start_y = $('#START_Y').val();
				var min_map = $('#MIN_MAP').val();
				var max_map = $('#MAX_MAP').val();
				var DISP_MTHD = $('#DISP_MTHD').val();
				var data_id = $('#DATA_ID').val();
				var data_year = $('#DATA_YEAR').val();
				var map_data_year = $('#MAP_DATA_YEAR').val();
				var thema_exp = CKEDITOR.instances.THEMA_EXP.getData();//$('#THEMA_EXP').val();
				var left_year_a = $('#LEFT_YEAR').val();
				var PRIORTY_YN = $('#PRIORTY_YN').val();
				var POI_DISP_YN = $('#POI_DISP_YN').val();
				var disp_rank = $("#DISP_RANK").val();
				var THEME_CD = $('#THEME_CD').val();
				
				// mng_s 2017. 08. 04 석진혁
				var CORP_CLASS_CD = $('#CORP_CLASS_CD').val();
				// mng_e 2017. 08. 04 석진혁
				
				//2016.03.21 수정, enter시 <br/>추가
				//thema_exp = thema_exp.replace(/\n/g, "<br>");
				
				var FIX_YN = $('#FIX_YN').val();
				var YEAR_INFO = $('#YEAR_INFO').val();
				//A 형

				if (POI_DISP_YN == null) {
					POI_DISP_YN = "N";
				}

				var left_title_a = $('#LEFT_TITLE').val();
				var left_ttip_a = $('#LEFT_TTIP').val();
				var left_unit_a = $('#LEFT_UNIT').val();
				var left_source_a = $('#LEFT_SOURCE_URL').val();

				var THEMA_SEL = $('#THEMA_SEL').val();


				var THEMA_SEL = $('#THEMA_SEL').val();

				var sopOpenApiupdateThemaMap5Obj = new sop.openApi.updateThemaMap5.api();
				sopOpenApiupdateThemaMap5Obj.addParam('STAT_THEMA_MAP_ID',STAT_THEMA_MAP_ID);
				sopOpenApiupdateThemaMap5Obj.addParam('CATEGORY', category_nm);
				sopOpenApiupdateThemaMap5Obj.addParam('TITLE', title);
				sopOpenApiupdateThemaMap5Obj.addParam('THEMA_MAP_TYPE', THEMA_SEL);
				sopOpenApiupdateThemaMap5Obj.addParam('SRV_YN', srv_yn);
				sopOpenApiupdateThemaMap5Obj.addParam('START_X', start_x);
				sopOpenApiupdateThemaMap5Obj.addParam('START_Y', start_y);
				sopOpenApiupdateThemaMap5Obj.addParam('MAX_LEVEL', max_map);
				sopOpenApiupdateThemaMap5Obj.addParam('MIN_LEVEL', min_map);
				sopOpenApiupdateThemaMap5Obj.addParam('MOBILE_YN', mob_yn);
				sopOpenApiupdateThemaMap5Obj.addParam('DISP_MTHD', DISP_MTHD);
				sopOpenApiupdateThemaMap5Obj.addParam('REL_STAT_INFO', thema_avr);
				sopOpenApiupdateThemaMap5Obj.addParam('DATA_YEAR', data_year);
				sopOpenApiupdateThemaMap5Obj.addParam('DATA_ID', data_id);
				sopOpenApiupdateThemaMap5Obj.addParam('EXP', encodeURIComponent(thema_exp));
				sopOpenApiupdateThemaMap5Obj.addParam('LEFT_NM', left_title_a);
				sopOpenApiupdateThemaMap5Obj.addParam('PRIORTY_YN', PRIORTY_YN);
				sopOpenApiupdateThemaMap5Obj.addParam('POI_DISP_YN',POI_DISP_YN);

				// mng_s 2017. 08. 04 석진혁
				if(POI_DISP_YN == "Y") {
					if(THEME_CD != null && THEME_CD != undefined && THEME_CD.length > 1) {
						sopOpenApiupdateThemaMap5Obj.addParam('THEME_CD', THEME_CD);
					} else if(CORP_CLASS_CD != null && CORP_CLASS_CD != undefined && CORP_CLASS_CD.length > 1) {
						sopOpenApiupdateThemaMap5Obj.addParam('CORP_CLASS_CD', CORP_CLASS_CD);
					}
				}
				// mng_e 2017. 08. 04 석진혁

				sopOpenApiupdateThemaMap5Obj.addParam('FIX_YN', FIX_YN);
				sopOpenApiupdateThemaMap5Obj.addParam('YEAR_INFO', YEAR_INFO);
				sopOpenApiupdateThemaMap5Obj.addParam('DISP_RANK', disp_rank);
				
				if(mob_url.length >= 1){
					sopOpenApiupdateThemaMap5Obj.addParam('MOBILE_URL', mob_url);
				}
				// 2016. 03. 25 j.h.Seok
				sopOpenApiupdateThemaMap5Obj.addParam('LEFT_UNIT', encodeURIComponent(left_unit_a));
				sopOpenApiupdateThemaMap5Obj.addParam('LEFT_YEAR', left_year_a);
				sopOpenApiupdateThemaMap5Obj.addParam('LEFT_TTIP', left_ttip_a);
				sopOpenApiupdateThemaMap5Obj.addParam('LEFT_SOURCE', left_source_a);

				if($('#RIGHT_TITLE').val()!=null && $('#RIGHT_TITLE').val()!='')
				{
					//B 형 
					var left_year_b = $('#RIGHT_YEAR').val();
					var left_title_b = $('#RIGHT_TITLE').val();
					var left_ttip_b = $('#RIGHT_TTIP').val();
					var left_unit_b = $('#RIGHT_UNIT').val();
					var left_source_b = $('#RIGHT_SOURCE_URL').val();

					sopOpenApiupdateThemaMap5Obj.addParam('RIGHT_NM', left_title_b);
					// 2016. 03. 25 j.h.Seok
					sopOpenApiupdateThemaMap5Obj.addParam('RIGHT_UNIT', encodeURIComponent(left_unit_b));
					sopOpenApiupdateThemaMap5Obj.addParam('RIGHT_TTIP', left_ttip_b);
					sopOpenApiupdateThemaMap5Obj.addParam('RIGHT_SOURCE', left_source_b);
				}
				if(radioValue==''){
					radioValue='1';
				}
				sopOpenApiupdateThemaMap5Obj.addParam('EXMPL_TYPE', radioValue);
				sopOpenApiupdateThemaMap5Obj.addParam('ATDRC_YN', bor_yn);

				//var hotIssueYn= $("#HOT_ISSUE_YN").val();
				//sopOpenApiupdateThemaMap5Obj.addParam('HOT_ISSUE_YN', hotIssueYn);

				sopOpenApiupdateThemaMap5Obj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/DT/ThemaMapManage/updateNewThemaMap.json"
				});
			},
			updateThemaMap6:function(){

				var category_nm = $('#CATEGORY_NM').val();
				var title = $('#THEMA_TITLE').val();
				var srv_yn = $('#SRV_YN').val();
				var mob_yn = $('#MOB_YN').val();
				var mob_url = $('#MOB_URL').val();
				var thema_avr = $('#THEMA_AVR').val();
				var bor_yn = $('#BOR_YN').val();
				var start_x = $('#START_X').val();
				var start_y = $('#START_Y').val();
				var min_map = $('#MIN_MAP').val();
				var max_map = $('#MAX_MAP').val();
				var DISP_MTHD = $('#DISP_MTHD').val();
				//lkh 수정 trim 추가
				var data_id = $('#DATA_ID').val().trim();
				//lkh 수정 trim 추가
				var data_year = $('#DATA_YEAR').val().trim();
				var map_data_year = $('#MAP_DATA_YEAR').val();
				//lkh 수정 trim 추가
				var map_id = $('#MAP_DATA_ID').val().trim();
				var exmpl_type = $('#MAP_DATA_YEAR').val();
				var thema_exp = CKEDITOR.instances.THEMA_EXP.getData();//$('#THEMA_EXP').val();
				var left_year_a = $('#LEFT_YEAR').val();
				var PRIORTY_YN = $('#PRIORTY_YN').val();
				var POI_DISP_YN = $('#POI_DISP_YN').val();
				var disp_rank = $("#DISP_RANK").val();

				//2016.03.21 수정, enter시 <br/>추가
				//thema_exp = thema_exp.replace(/\n/g, "<br>");
				
				if (POI_DISP_YN == null) {
					POI_DISP_YN = "N";
				}

				//A 형
				var left_title_a = $('#LEFT_TITLE').val(); //표출정보A명
				var left_ttip_a = $('#LEFT_TTIP').val();  //표출정보툴팁A
				var left_unit_a = $('#LEFT_UNIT').val();  //표출정보A단위 
				var left_source_a = $('#LEFT_SOURCE_URL').val(); //표출정보A출처
				var left_map_ttip_title_a = $('#LEFT_MAP_TITLE').val(); // 분할맵A명
				var left_map_unit = $('#LEFT_MAP_UNIT').val(); //분할맵A단위
				var LEFT_MAP_TTIP_TITLE = $('#LEFT_MAP_TTIP_TITLE').val(); //분할맵 툴팁A명
				var LEFT_MAP_INFO = $('#LEFT_MAP_INFO').val(); //분할맵A출처


				var THEMA_SEL = $('#THEMA_SEL').val();
				//A 형

				
				

				var sopOpenApiupdateThemaMap6Obj = new sop.openApi.updateThemaMap6.api();
				sopOpenApiupdateThemaMap6Obj.addParam('STAT_THEMA_MAP_ID',STAT_THEMA_MAP_ID);
				sopOpenApiupdateThemaMap6Obj.addParam('CATEGORY', category_nm);
				sopOpenApiupdateThemaMap6Obj.addParam('TITLE', title);
				sopOpenApiupdateThemaMap6Obj.addParam('THEMA_MAP_TYPE', THEMA_SEL);
				sopOpenApiupdateThemaMap6Obj.addParam('SRV_YN', srv_yn);
				sopOpenApiupdateThemaMap6Obj.addParam('START_X', start_x);
				sopOpenApiupdateThemaMap6Obj.addParam('START_Y', start_y);
				sopOpenApiupdateThemaMap6Obj.addParam('MAX_LEVEL', max_map);
				sopOpenApiupdateThemaMap6Obj.addParam('MIN_LEVEL', min_map);
				sopOpenApiupdateThemaMap6Obj.addParam('MOBILE_YN', mob_yn);
				sopOpenApiupdateThemaMap6Obj.addParam('DISP_MTHD', DISP_MTHD);
				sopOpenApiupdateThemaMap6Obj.addParam('REL_STAT_INFO', thema_avr);
				sopOpenApiupdateThemaMap6Obj.addParam('DATA_YEAR', data_year);
				sopOpenApiupdateThemaMap6Obj.addParam('DATA_ID', data_id);
				sopOpenApiupdateThemaMap6Obj.addParam('MAP_ID',map_id);
				sopOpenApiupdateThemaMap6Obj.addParam('MAP_YEAR',map_data_year);
				sopOpenApiupdateThemaMap6Obj.addParam('EXP', encodeURIComponent(thema_exp));
				sopOpenApiupdateThemaMap6Obj.addParam('LEFT_YEAR', left_year_a);
				sopOpenApiupdateThemaMap6Obj.addParam('PRIORTY_YN', PRIORTY_YN);
				sopOpenApiupdateThemaMap6Obj.addParam('POI_DISP_YN',POI_DISP_YN);
				sopOpenApiupdateThemaMap6Obj.addParam('DISP_RANK', disp_rank);
				
				//lkh 2016.05.26 hot Issue 추가
				//var hotIssueYn= $("#HOT_ISSUE_YN").val();
				//sopOpenApiupdateThemaMap6Obj.addParam('HOT_ISSUE_YN', hotIssueYn);
				
				
				var YEAR_INFO = $('#YEAR_INFO').val();
				var FIX_YN = $('#FIX_YN').val();
				sopOpenApiupdateThemaMap6Obj.addParam('FIX_YN',FIX_YN);
				sopOpenApiupdateThemaMap6Obj.addParam('YEAR_INFO',YEAR_INFO);

				if(mob_url.length >= 1){
					sopOpenApiupdateThemaMap6Obj.addParam('MOBILE_URL', mob_url);
				}
				if(radioValue==''){
					radioValue='1';
				}
				sopOpenApiupdateThemaMap6Obj.addParam('EXMPL_TYPE', radioValue);
				
				sopOpenApiupdateThemaMap6Obj.addParam('LEFT_NM', left_title_a);
				// 2016. 03. 25 j.h.Seok
				sopOpenApiupdateThemaMap6Obj.addParam('LEFT_UNIT', encodeURIComponent(left_unit_a));
				sopOpenApiupdateThemaMap6Obj.addParam('LEFT_TTIP', left_ttip_a);
				sopOpenApiupdateThemaMap6Obj.addParam('LEFT_SOURCE', left_source_a);
				sopOpenApiupdateThemaMap6Obj.addParam('LEFT_MAP_TITLE', left_map_ttip_title_a);
				// 2016. 04. 22 j.h.Seok
				sopOpenApiupdateThemaMap6Obj.addParam('LEFT_MAP_UNIT', encodeURIComponent(left_map_unit));
				sopOpenApiupdateThemaMap6Obj.addParam('LEFT_MAP_INFO', LEFT_MAP_INFO);
				sopOpenApiupdateThemaMap6Obj.addParam('LEFT_MAP_TTIP_TITLE', LEFT_MAP_TTIP_TITLE);
				
				if($('#RIGHT_TITLE').val()!=null && $('#RIGHT_TITLE').val()!='')
				{
					
					var right_title_a = $('#RIGHT_TITLE').val(); //표출정보A명
					var right_ttip_a = $('#RIGHT_TTIP').val();  //표출정보툴팁A
					var right_unit_a = $('#RIGHT_UNIT').val();  //표출정보A단위 
					var right_source_a = $('#RIGHT_SOURCE_URL').val(); //표출정보A출처
					var right_map_ttip_title_a = $('#RIGHT_MAP_TITLE').val(); // 분할맵A명
					var right_map_unit = $('#RIGHT_MAP_UNIT').val(); //분할맵A단위
					var right_MAP_TTIP_TITLE = $('#RIGHT_MAP_TTIP_TITLE').val(); //분할맵 툴팁A명
					var right_MAP_INFO = $('RIGHT_MAP_INFO').val(); //분할맵A출처

					sopOpenApiupdateThemaMap6Obj.addParam('RIGHT_NM', right_title_a);
					// 2016. 03. 25 j.h.Seok
					sopOpenApiupdateThemaMap6Obj.addParam('RIGHT_UNIT', encodeURIComponent(right_unit_a));
					sopOpenApiupdateThemaMap6Obj.addParam('RIGHT_TTIP', right_ttip_a);
					sopOpenApiupdateThemaMap6Obj.addParam('RIGHT_SOURCE', right_source_a);
					sopOpenApiupdateThemaMap6Obj.addParam('RIGHT_MAP_TITLE', right_map_ttip_title_a);
					// 2016. 04. 22 j.h.Seok
					sopOpenApiupdateThemaMap6Obj.addParam('RIGHT_MAP_UNIT', encodeURIComponent(right_map_unit));
					
					//2016.04.04. lkh 수정
					//sopOpenApiupdateThemaMap6Obj.addParam('RIGHT_MAP_INFO', right_MAP_TTIP_TITLE);
					sopOpenApiupdateThemaMap6Obj.addParam('RIGHT_MAP_INFO', right_MAP_INFO);
					//sopOpenApiupdateThemaMap6Obj.addParam('RIGHT_MAP_TTIP_TITLE', right_MAP_INFO);
					sopOpenApiupdateThemaMap6Obj.addParam('RIGHT_MAP_TTIP_TITLE', right_MAP_TTIP_TITLE);
				}

				sopOpenApiupdateThemaMap6Obj.addParam('LEFT_SOURCE', left_source_a);
				if(radioValue==''){
					radioValue='1';
				}
				sopOpenApiupdateThemaMap6Obj.addParam('EXMPL_TYPE', radioValue);
				sopOpenApiupdateThemaMap6Obj.addParam('ATDRC_YN', bor_yn);
				
				
				//var hotIssueYn= $("#HOT_ISSUE_YN").val();
				//sopOpenApiupdateThemaMap6Obj.addParam('HOT_ISSUE_YN', hotIssueYn);

				sopOpenApiupdateThemaMap6Obj.request({
					method : "POST",	
					async : true,
					url : contextPath + "/ServiceAPI/DT/ThemaMapManage/updateNewThemaMap.json"
				});
			},
			updateThemaMap7:function(){
				var category_nm = $('#CATEGORY_NM').val();
				var title = $('#THEMA_TITLE').val();
				var THEMA_SEL = $('#THEMA_SEL').val();
				var srv_yn = $('#SRV_YN').val();
				var start_x = $('#START_X').val();
				var start_y = $('#START_Y').val();
				var min_map = $('#MIN_MAP').val();
				var max_map = $('#MAX_MAP').val();
				var mob_yn = $('#MOB_YN').val();
				var DISP_MTHD = $('#DISP_MTHD').val();
				var thema_avr = $('#THEMA_AVR').val();
				var thema_exp = CKEDITOR.instances.THEMA_EXP.getData();//$('#THEMA_EXP').val();
				var PRIORTY_YN = $('#PRIORTY_YN').val();
				var YEAR_INFO = $('#YEAR_INFO').val();
				var POI_DISP_YN = $('#POI_DISP_YN').val();
				var disp_rank = $("#DISP_RANK").val();
				var THEME_CD = $('#THEME_CD').val();
				
				// mng_s 2017. 08. 04 석진혁
				var CORP_CLASS_CD = $('#CORP_CLASS_CD').val();
				// mng_e 2017. 08. 04 석진혁

				var mob_url = $('#MOB_URL').val();
				var bor_yn = $('#BOR_YN').val();
				
				if (POI_DISP_YN == null) {
					POI_DISP_YN = "N";
				}
				
				var sopOpenApiupdateThemaMap7Obj = new sop.openApi.updateThemaMap7.api();
				sopOpenApiupdateThemaMap7Obj.addParam('STAT_THEMA_MAP_ID',STAT_THEMA_MAP_ID);
				sopOpenApiupdateThemaMap7Obj.addParam('CATEGORY', category_nm);
				sopOpenApiupdateThemaMap7Obj.addParam('TITLE', title);
				sopOpenApiupdateThemaMap7Obj.addParam('THEMA_MAP_TYPE', THEMA_SEL);
				sopOpenApiupdateThemaMap7Obj.addParam('SRV_YN', srv_yn);
				sopOpenApiupdateThemaMap7Obj.addParam('START_X', start_x);
				sopOpenApiupdateThemaMap7Obj.addParam('START_Y', start_y);
				sopOpenApiupdateThemaMap7Obj.addParam('MAX_LEVEL', max_map);
				sopOpenApiupdateThemaMap7Obj.addParam('MIN_LEVEL', min_map);
				sopOpenApiupdateThemaMap7Obj.addParam('MOBILE_YN', mob_yn);
				sopOpenApiupdateThemaMap7Obj.addParam('DISP_MTHD', DISP_MTHD);
				sopOpenApiupdateThemaMap7Obj.addParam('REL_STAT_INFO', thema_avr);
				sopOpenApiupdateThemaMap7Obj.addParam('EXP', encodeURIComponent(thema_exp));
				sopOpenApiupdateThemaMap7Obj.addParam('PRIORTY_YN', PRIORTY_YN);
				sopOpenApiupdateThemaMap7Obj.addParam('YEAR_INFO',YEAR_INFO);

				// mng_s 2017. 08. 04 석진혁
				sopOpenApiupdateThemaMap7Obj.addParam('POI_DISP_YN', "Y");
				
				if(THEME_CD != null && THEME_CD != undefined && THEME_CD.length > 1) {
					sopOpenApiupdateThemaMap7Obj.addParam('THEME_CD', THEME_CD);
				} else if(CORP_CLASS_CD != null && CORP_CLASS_CD != undefined && CORP_CLASS_CD.length > 1) {
					sopOpenApiupdateThemaMap7Obj.addParam('CORP_CLASS_CD', CORP_CLASS_CD);
				}
				// mng_e 2017. 08. 04 석진혁
				
				
				sopOpenApiupdateThemaMap7Obj.addParam('DATA_YEAR', YEAR_INFO);
				sopOpenApiupdateThemaMap7Obj.addParam('DATA_ID', "temp");
				sopOpenApiupdateThemaMap7Obj.addParam('LEFT_YEAR', YEAR_INFO);
				sopOpenApiupdateThemaMap7Obj.addParam('LEFT_NM', "temp");
				sopOpenApiupdateThemaMap7Obj.addParam('LEFT_UNIT', "temp");
				sopOpenApiupdateThemaMap7Obj.addParam('LEFT_TTIP', "temp");
				sopOpenApiupdateThemaMap7Obj.addParam('POI_DISP_YN',POI_DISP_YN);
				sopOpenApiupdateThemaMap7Obj.addParam('DISP_RANK',disp_rank);
				
				if(mob_url.length >= 1){
					sopOpenApiupdateThemaMap7Obj.addParam('MOBILE_URL', mob_url);
				}
				sopOpenApiupdateThemaMap7Obj.addParam('ATDRC_YN', bor_yn);

				sopOpenApiupdateThemaMap7Obj.request({
					method : "POST",	
					async : true,
					url : contextPath + "/ServiceAPI/DT/ThemaMapManage/updateNewThemaMap.json"
				});
			},
			requestDetail : function(STAT_THEMA_MAP_ID) {
				var sopOpenApiRequestDetailObj = new sop.openApi.requestDetail.api();
				sopOpenApiRequestDetailObj.addParam('STAT_THEMA_MAP_ID', STAT_THEMA_MAP_ID);
				sopOpenApiRequestDetailObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/DT/ThemaMapManage/searchThemaMapOne.json"
				});
			},
			loadLogBCd:function(){
				var sopOpenApiLoadLogBCdObj = new sop.openApi.loadLogBCd.api();
				sopOpenApiLoadLogBCdObj.addParam('CLASSTYPE', 'T');
				sopOpenApiLoadLogBCdObj.request({
					method : "POST",
					async : false,
					url : contextPath +"/ServiceAPI/COMMON/getAPIClass.json"
				});
			}

	};
	(function() {
		$class("sop.openApi.loadLogBCd.api").extend(sop.cnm.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") { 
					var result = res.result;
					console.log(result);
					if(result != null){
						for(var i = 1; i < $('#CATEGORY_NM').children().length; i++){
							$('#CATEGORY_NM').children().eq(i).remove();
						}
						for(var i=0;i<result.length;i++){
							$('#CATEGORY_NM').append("<option value='"+result[i].THEMA_MAP_CATEGORY+"'>"+result[i].CATEGORY_NM+"</option>");
						}
						
						// 2016. 04. 25 j.h.Seok
						$themaMapUpdateManage.requestDetail(STAT_THEMA_MAP_ID);
					}
				} else {
					getConfirmPopup('알림', res.errMsg, 'alert');
					$('#ok_alertPopup').click(function(){
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function(){
						confirmPopupRemove();
					});
				}
			},
			onFail : function(status) {
				getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
			}
		});
	}());
	(function () {
		$class("sop.openApi.requestDetail.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				var result = res.result;
				if (res.errCd == "0") {
					var result = res.result;
					if (result != null) {
						console.log(result.rows[0]);
						
						//2016.03.21 수정
						var EXP = result.rows[0].EXP;
						EXP = EXP.replace(/&lt;p&gt;/gi, '');
						EXP = EXP.replace(/&lt;p&gt;/gi, '');
						EXP = EXP.replace(/&lt;/gi, '<');
						EXP = EXP.replace(/&gt;/gi, '>');
						EXP = EXP.replace(/&quot;/gi, '');
						EXP = EXP.replace(/<br>/g, '\n');
						EXP = EXP.replace(/<br\/>/g, '\n');
						
						$('#BOR_YN').val(result.rows[0].ATDRC_YN);
						$('#THEMA_SEL').val(result.rows[0].THEMA_MAP_TYPE);
						$('#DISP_MTHD').val(result.rows[0].DISP_MTHD);
						//$('#THEMA_EXP').html(EXP);
						
						CKEDITOR.instances.THEMA_EXP.setData(EXP);
						$('#CATEGORY_NM').val(result.rows[0].THEMA_MAP_CATEGORY);
						$('#THEMA_TITLE').val(result.rows[0].TITLE);
						$('#MOB_YN').val(result.rows[0].MOBILE_SRV_YN);
						var mob_yns = result.rows[0].MOBILE_SRV_YN;
						if(mob_yns=='Y'){
							$('#MOBILE_URL').show();
							$('#MOB_URL').val(result.rows[0].MOBILE_SRV_URL);
						}
						$('#THEMA_AVR').val(result.rows[0].REL_STAT_INFO);
						$('#DATA_ID').val(result.rows[0].THEMA_MAP_DATA_ID);
						$('#DATA_YEAR').val(result.rows[0].STAT_DATA_BASE_YEAR);
						$('#SRV_YN').val(result.rows[0].SRV_YN);
						$('#MIN_MAP').val(result.rows[0].MIN_REDCTN_LEVEL);
						$('#MAX_MAP').val(result.rows[0].MAX_EXPNSN_LEVEL);
						$('#LEFT_YEAR').val(result.rows[0].LEFT_BASE_YEAR);
						$('#FIX_YN').val(result.rows[0].BOUNDARY_FIX_YN);
						$('#FIX_YN').attr('disabled','true');
						$('#YEAR_INFO').val(result.rows[0].YEAR_INFO);
						$('#PRIORTY_YN').val(result.rows[0].PRIORITY_DISP_YN);
						$('#POI_DISP_YN').val(result.rows[0].POI_DISP_YN);
						$('#THEME_CD').val(result.rows[0].THEME_CD);
						
						// mng_s 2017. 08. 04 석진혁
						$('#CORP_CLASS_CD').val(result.rows[0].CORP_CLASS_CD);
						// mng_s 2017. 08. 04 석진혁
						
						$('#DISP_RANK').val(result.rows[0].DISP_RANK);
						if($('#POI_DISP_YN').val() == "N") {
							$('#THEMASEARCHButton').hide();
						}
						$("input:radio[name='group1'][value='"+result.rows[0].EXMPL_TYPE+"']").prop('checked', true);
						
						//$('#HOT_ISSUE_YN').val(result.rows[0].HOT_ISSUE_YN);
						$("input[name=group1]").change(function() {
							radioValue = $(this).val();
						});
						if(result.rows[0].LEFT_SEP_NM!=null){
							if(result.rows[0].THEMA_MAP_TYPE=='04') { //증감
								$('#resetFormA').show();
								$('#chart_title1').show();
								$('#MAP_TTIP_TITLEA').hide();
								$('#resetFormB').hide();
								$('#CHECK_DIV').hide();
								$('#add_check').hide();
								$('#MAP_TTIP_TITLEA1').hide();
								$('#MAP_TTIP_TITLEA2').hide();
								$('#MAP_TTIP_TITLEA3').hide();
								$('#THEMA_T').text('증감형 정보A');
								$('#MOB_YN').change(function(){
									var mob_yn = $('#MOB_YN').val();
									if(mob_yn=='Y'){
										$('#MOBILE_URL').show();
									}else{
										$('#MOBILE_URL').hide();
									}
								});
								$('#MAP_DATA_YEAR_LAY').hide();
								$('#LEFT_CHART').val(result.rows[0].LEFT_SEP_CHART_TITLE);
								$('#LEFT_TITLE').val(result.rows[0].LEFT_SEP_NM);
								$('#LEFT_TTIP').val(result.rows[0].LEFT_SEP_TTIP_TITLE);
								$('#LEFT_UNIT').val(result.rows[0].LEFT_SEP_UNIT);
								$('#LEFT_SOURCE_URL').val(result.rows[0].LEFT_SEP_SOURCE);

								// mng_s 2017. 08. 04 석진혁
								$('#POI_DISP_YN_AREA').hide();
								$('#POI_DISP_YN').hide();
								$('#POI_area').hide();
								// mng_e 2017. 08. 04 석진혁
								
							} else if(result.rows[0].THEMA_MAP_TYPE=='06') { //분할
								var check_data = result.rows[0].RIGHT_SEP_NM;
								$('#resetFormA').show();
								$('#MAP_DATA_YEAR_LAY').show();
								$('#MAP_TTIP_TITLEA1').show();
								$('#MAP_TTIP_TITLEA2').show();
								$('#MAP_TTIP_TITLEA3').show();
								$('#chart_title1').hide();
								$('#CHECK_DIV').show();
								$('#THEMA_T').text('분할맵형 정보A');
								$('#LEFT_TITLE').val(result.rows[0].LEFT_SEP_NM);
								$('#LEFT_TTIP').val(result.rows[0].LEFT_SEP_TTIP_TITLE);
								$('#LEFT_UNIT').val(result.rows[0].LEFT_SEP_UNIT);
								$('#LEFT_SOURCE_URL').val(result.rows[0].LEFT_SEP_SOURCE);
								$('#LEFT_MAP_TITLE').val(result.rows[0].SEP_MAP_LEFT_SEP_NM);
								$('#LEFT_MAP_UNIT').val(result.rows[0].SEP_MAP_LEFT_SEP_UNIT);
								$('#LEFT_MAP_TTIP_TITLE').val(result.rows[0].SEP_MAP_LEFT_SEP_TTIP_TITLE);
								$('#LEFT_MAP_INFO').val(result.rows[0].SEP_MAP_LEFT_SEP_SOURCE);
								$('#MAP_DATA_ID').val(result.rows[0].SEP_MAP_DATA_ID);
								$('#MAP_DATA_YEAR').val(result.rows[0].SEP_MAP_DATA_YEAR);
								$('#MOB_YN').change(function(){
									var mob_yn = $('#MOB_YN').val();
									if(mob_yn=='Y'){
										$('#MOBILE_URL').show();
									}else{
										$('#MOBILE_URL').hide();
									}
								});

								if(check_data!=null){
									/*$('#add_check').show();
									$('#add_check').attr('checked', true);*/
									$('#resetFormB').show()
									$('#THEMA_TT').text('분할맵형 정보B');
									$('#MAP_TTIP_TITLEA4').show();
									$('#MAP_TTIP_TITLEA5').show();
									$('#MAP_TTIP_TITLEA6').show();
									$('#chart_title2').hide();
									$('#RIGHT_TITLE').val(result.rows[0].RIGHT_SEP_NM);
									$('#RIGHT_TTIP').val(result.rows[0].RIGHT_SEP_TTIP_TITLE);
									$('#RIGHT_UNIT').val(result.rows[0].RIGHT_SEP_UNIT);
									$('#RIGHT_SOURCE_URL').val(result.rows[0].RIGHT_SEP_SOURCE);
									$('#RIGHT_MAP_TITLE').val(result.rows[0].SEP_MAP_RIGHT_SEP_NM);
									// 2016. 04. 11 j.h.Seok
									$('#RIGHT_MAP_UNIT').val(result.rows[0].SEP_MAP_RIGHT_SEP_UNIT);
									$('#RIGHT_MAP_TTIP_TITLE').val(result.rows[0].SEP_MAP_RIGHT_SEP_TTIP_TITLE);
									$('#RIGHT_MAP_INFO').val(result.rows[0].SEP_MAP_RIGHT_SEP_SOURCE);
								}else{
									$('#add_check').show();
									$('#resetFormB').hide();
								}

								$('#add_check').on('change', function() { 
									// From the other examples
									if (!this.checked) {
										$('#resetFormB').hide();
									}else{
										$('#resetFormB').show();
										$('#THEMA_TT').text('분할맵형 정보B');
										$('#MAP_TTIP_TITLEA4').hide();
										$('#MAP_TTIP_TITLEA5').hide();
										$('#MAP_TTIP_TITLEA6').hide();
										$('#chart_title2').hide();;
									}
								});
								$('#POI_area').hide();
								
								// mng_s 2017. 08. 04 석진혁
								$('#POI_DISP_YN_AREA').hide();
								$('#POI_DISP_YN').hide();
								$('#POI_area').hide();
								// mng_e 2017. 08. 04 석진혁

							} else if(result.rows[0].THEMA_MAP_TYPE=='05') { //시계열
								var check_data = result.rows[0].RIGHT_SEP_NM;
								$('#resetFormA').show();
								$('#MAP_TTIP_TITLEA1').hide();
								$('#MAP_TTIP_TITLEA2').hide();
								$('#MAP_TTIP_TITLEA3').hide();
								$('#chart_title1').hide();
								$('#THEMA_T').text('시계열형 정보A');
								$('#FIX_YN').removeAttr('disabled');
								$('#CHECK_DIV').show();
								$('#LEFT_TITLE').val(result.rows[0].LEFT_SEP_NM);
								$('#LEFT_TTIP').val(result.rows[0].LEFT_SEP_TTIP_TITLE);
								$('#LEFT_UNIT').val(result.rows[0].LEFT_SEP_UNIT);
								$('#LEFT_SOURCE_URL').val(result.rows[0].LEFT_SEP_SOURCE);
								$('#MOB_YN').change(function(){
									var mob_yn = $('#MOB_YN').val();
									if(mob_yn=='Y'){
										$('#MOBILE_URL').show();
									}else{
										$('#MOBILE_URL').hide();
									}
								});

								if(check_data!=null){
									/*$('#add_check').show();
									$('#add_check').attr('checked', true);*/
									$('#resetFormB').show()
									$('#THEMA_TT').text('시계열형 정보B');
									$('#MAP_TTIP_TITLEA4').hide();
									$('#MAP_TTIP_TITLEA5').hide();
									$('#MAP_TTIP_TITLEA6').hide();
									$('#chart_title2').hide();
									$('#RIGHT_TITLE').val(result.rows[0].RIGHT_SEP_NM);
									$('#RIGHT_TTIP').val(result.rows[0].RIGHT_SEP_TTIP_TITLE);
									$('#RIGHT_UNIT').val(result.rows[0].RIGHT_SEP_UNIT);
									$('#RIGHT_SOURCE_URL').val(result.rows[0].RIGHT_SEP_SOURCE);
								}else{
									$('#add_check').show();
									$('#resetFormB').hide();
								}

								$('#add_check').on('change', function() { 
									// From the other examples
									if (!this.checked) {
										$('#resetFormB').hide();
									}else{
										$('#resetFormB').show();
										$('#THEMA_TT').text('시계열형 정보B');
										$('#MAP_TTIP_TITLEA4').hide();
										$('#MAP_TTIP_TITLEA5').hide();
										$('#MAP_TTIP_TITLEA6').hide();
										$('#chart_title2').hide();;
									}
								});
								
								// mng_s 2017. 08. 04 석진혁
								$('#POI_DISP_YN_AREA').hide();
								$('#POI_DISP_YN').hide();
								$('#POI_area').hide();
								// mng_e 2017. 08. 04 석진혁

							} else if(result.rows[0].THEMA_MAP_TYPE=='03') { //색상
								var check_data = result.rows[0].RIGHT_SEP_NM;
								$('#resetFormA').show();
								$('#MAP_TTIP_TITLEA1').hide();
								$('#MAP_TTIP_TITLEA2').hide();
								$('#MAP_TTIP_TITLEA3').hide();
								$('#chart_title1').hide();
								$('#THEMA_T').text('색상형 정보A');
								$('#CHECK_DIV').show();
								$('#LEFT_TITLE').val(result.rows[0].LEFT_SEP_NM);
								$('#LEFT_TTIP').val(result.rows[0].LEFT_SEP_TTIP_TITLE);
								$('#LEFT_UNIT').val(result.rows[0].LEFT_SEP_UNIT);
								$('#LEFT_SOURCE_URL').val(result.rows[0].LEFT_SEP_SOURCE);
								$('#MOB_YN').change(function(){
									var mob_yn = $('#MOB_YN').val();
									if(mob_yn=='Y'){
										$('#MOBILE_URL').show();
									}else{
										$('#MOBILE_URL').hide();
									}
								});

								if(check_data!=null){
									/*$('#add_check').show();
									$('#add_check').attr('checked', true);*/
									$('#resetFormB').show()
									$('#THEMA_TT').text('색상형 정보B');
									$('#MAP_TTIP_TITLEA4').hide();
									$('#MAP_TTIP_TITLEA5').hide();
									$('#MAP_TTIP_TITLEA6').hide();
									$('#chart_title2').hide();
									$('#RIGHT_TITLE').val(result.rows[0].RIGHT_SEP_NM);
									$('#RIGHT_TTIP').val(result.rows[0].RIGHT_SEP_TTIP_TITLE);
									$('#RIGHT_UNIT').val(result.rows[0].RIGHT_SEP_UNIT);
									$('#RIGHT_SOURCE_URL').val(result.rows[0].RIGHT_SEP_SOURCE);
								}else{
									$('#add_check').show();
									$('#resetFormB').hide();
								}

								$('#add_check').on('change', function() { 
									// From the other examples
									if (!this.checked) {
										$('#resetFormB').hide();
									}else{
										$('#resetFormB').show();
										$('#THEMA_TT').text('색상형 정보B');
										$('#MAP_TTIP_TITLEA4').hide();
										$('#MAP_TTIP_TITLEA5').hide();
										$('#MAP_TTIP_TITLEA6').hide();
										$('#chart_title2').hide();;
									}
								});
								
								// mng_s 2017. 08. 04 석진혁
								$('#POI_DISP_YN_AREA').show();
								$('#POI_DISP_YN').show();
								$('#POI_area').show();
								// mng_e 2017. 08. 04 석진혁
								
							} else if(result.rows[0].THEMA_MAP_TYPE=='07') { //POI
								$('#resetFormA').hide();
								$('#resetFormB').hide();
								$('#add_check').hide();
								$('#MOB_YN').change(function(){
									var mob_yn = $('#MOB_YN').val();
									if(mob_yn=='Y'){
										$('#MOBILE_URL').show();
									}else{
										$('#MOBILE_URL').hide();
									}
								});
								
								$('#FIX_YN').attr('disabled','true');
								$("#FIX_YN").val("Y");
								$('#MAP_DATA_YEAR_LAY').hide();
								$('#CHECK_DIV').hide();
								$('.POI_area2').hide();
								$('#POI_area3').html("POI년도 정보")
								
								// mng_s 2017. 08. 04 석진혁
//								$('#POI_area4').attr("colspan","3");
//								$('#POI_area5').attr("colspan","3");
								// mng_s 2017. 08. 04 석진혁
								
								$('#POI_area').show();
								$('#THEMASEARCHButton').show();
								
								// mng_s 2017. 08. 04 석진혁
								$('#CORPCLASSSEARCHButton').show();
								// mng_e 2017. 08. 04 석진혁
								
								$('#BOR_YN').attr('disabled','true');
								$("#BOR_YN").val("0");
							}
						}


					}
				} else {
					getConfirmPopup('알림', res.errMsg, 'alert');
					$('#ok_alertPopup').click(function() {
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function() {
						confirmPopupRemove();
					});
				}
				$('.maskbg').fadeOut(800);
				$('.maskcontent').fadeOut(800);
			},
			onFail : function (status) {
				getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
				$('.maskbg').fadeOut(800);
				$('.maskcontent').fadeOut(800);
			}
		});
	}());
	(function () {
		$class("sop.openApi.updateThemaMap3.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				var result = res.result;
				getthemaList(STAT_THEMA_MAP_ID);
				/*if (res.errCd == "0") {
					if (result != null) {
						getConfirmPopup('알림', result.msg, 'alert');
						$('#ok_alertPopup').click(
								function() {
									if (result.success == true) {
										// 2016. 04. 25 j.h.Seok
										$themaMapUpdateManage.goBackPage();
//										location.href = "./../DT/themaMapMainManage.html";
									}
									confirmPopupRemove();
								});
						$('#close_confirmPopup').click(
								function() {
									if (result.success == true) {
										// 2016. 04. 25 j.h.Seok
										$themaMapUpdateManage.goBackPage();
//										location.href = "./../DT/themaMapMainManage.html";
									}
									confirmPopupRemove();
								});
					}
				} else {
					getConfirmPopup('알림', res.errMsg, 'alert');
					$('#ok_alertPopup').click(function() {
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function() {
						confirmPopupRemove();
					});
				}
				$('.maskbg').fadeOut(800);
				$('.maskcontent').fadeOut(800);*/
			},
			onFail : function (status) {
				getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
				$('.maskbg').fadeOut(800);
				$('.maskcontent').fadeOut(800);
			}
		});
	}());
	(function () {
		$class("sop.openApi.updateThemaMap4.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				var result = res.result;

				getthemaList(STAT_THEMA_MAP_ID);
				/*if (res.errCd == "0") {
					if (result != null) {
						getConfirmPopup('알림', result.msg, 'alert');
						$('#ok_alertPopup').click(
								function() {
									if (result.success == true) {
										// 2016. 04. 25 j.h.Seok
										$themaMapUpdateManage.goBackPage();
//										location.href = "./../DT/themaMapMainManage.html";
									}
									confirmPopupRemove();
								});
						$('#close_confirmPopup').click(
								function() {
									if (result.success == true) {
										// 2016. 04. 25 j.h.Seok
										$themaMapUpdateManage.goBackPage();
//										location.href = "./../DT/themaMapMainManage.html";
									}
									confirmPopupRemove();
								});
					}
				} else {
					getConfirmPopup('알림', res.errMsg, 'alert');
					$('#ok_alertPopup').click(function() {
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function() {
						confirmPopupRemove();
					});
				}
				$('.maskbg').fadeOut(800);
				$('.maskcontent').fadeOut(800);*/
			},
			onFail : function (status) {
				getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
				$('.maskbg').fadeOut(800);
				$('.maskcontent').fadeOut(800);
			}
		});
	}());
	(function () {
		$class("sop.openApi.updateThemaMap5.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				var result = res.result;
				getthemaList(STAT_THEMA_MAP_ID);
				/*if (res.errCd == "0") {
					if (result != null) {
						getConfirmPopup('알림', result.msg, 'alert');
						$('#ok_alertPopup').click(
								function() {
									if (result.success == true) {
										// 2016. 04. 25 j.h.Seok
										$themaMapUpdateManage.goBackPage();
//										location.href = "./../DT/themaMapMainManage.html";
									}
									confirmPopupRemove();
								});
						$('#close_confirmPopup').click(
								function() {
									if (result.success == true) {
										// 2016. 04. 25 j.h.Seok
										$themaMapUpdateManage.goBackPage();
//										location.href = "./../DT/themaMapMainManage.html";
									}
									confirmPopupRemove();
								});
					}
				} else {
					getConfirmPopup('알림', res.errMsg, 'alert');
					$('#ok_alertPopup').click(function() {
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function() {
						confirmPopupRemove();
					});
				}
				$('.maskbg').fadeOut(800);
				$('.maskcontent').fadeOut(800);*/
			},
			onFail : function (status) {
				getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
				$('.maskbg').fadeOut(800);
				$('.maskcontent').fadeOut(800);
			}
		});
	}());
	(function () {
		$class("sop.openApi.updateThemaMap6.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				var result = res.result;
				getthemaList(STAT_THEMA_MAP_ID);
				/*if (res.errCd == "0") {
					if (result != null) {
						getConfirmPopup('알림', result.msg, 'alert');
						$('#ok_alertPopup').click(
								function() {
									if (result.success == true) {
										// 2016. 04. 25 j.h.Seok
										$themaMapUpdateManage.goBackPage();
//										location.href = "./../DT/themaMapMainManage.html";
									}
									confirmPopupRemove();
								});
						$('#close_confirmPopup').click(
								function() {
									if (result.success == true) {
										// 2016. 04. 25 j.h.Seok
										$themaMapUpdateManage.goBackPage();
//										location.href = "./../DT/themaMapMainManage.html";
									}
									confirmPopupRemove();
								});
					}
				} else {
					getConfirmPopup('알림', res.errMsg, 'alert');
					$('#ok_alertPopup').click(function() {
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function() {
						confirmPopupRemove();
					});
				}
				$('.maskbg').fadeOut(800);
				$('.maskcontent').fadeOut(800);*/
			},
			onFail : function (status) {
				getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
				$('.maskbg').fadeOut(800);
				$('.maskcontent').fadeOut(800);
			}
		});
	}());
	(function () {
		$class("sop.openApi.updateThemaMap7.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				var result = res.result;
				getthemaList(STAT_THEMA_MAP_ID);
				/*if (res.errCd == "0") {
					if (result != null) {
						getConfirmPopup('알림', result.msg, 'alert');
						$('#ok_alertPopup').click(
								function() {
									if (result.success == true) {
										// 2016. 04. 25 j.h.Seok
										$themaMapUpdateManage.goBackPage();
									}
									confirmPopupRemove();
								});
						$('#close_confirmPopup').click(
								function() {
									if (result.success == true) {
										// 2016. 04. 25 j.h.Seok
										$themaMapUpdateManage.goBackPage();
									}
									confirmPopupRemove();
								});
					}
				} else {
					getConfirmPopup('알림', res.errMsg, 'alert');
					$('#ok_alertPopup').click(function() {
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function() {
						confirmPopupRemove();
					});
				}
				$('.maskbg').fadeOut(800);
				$('.maskcontent').fadeOut(800);*/
			},
			onFail : function (status) {
				getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
				$('.maskbg').fadeOut(800);
				$('.maskcontent').fadeOut(800);
			}
		});
	}());
}(window, document));

function abs(row){
	alert(row);
};
