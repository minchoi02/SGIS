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
var id_datagrid = '#searchResultTable';
var pluploader = {};
var radioValue = '';


//데이터ID/년도 팝업
function themaMapAddView(){
	var popUrl = "ThemaMapAddView.html";	//팝업창에 출력될 페이지 URL
	var winWidth = 1000;
	var winHeight = 700;
	var winPosLeft = (screen.width - winWidth) / 2;
	var winPosTop = (screen.height - winHeight) / 2;
	var winOpt = "width="+winWidth+",height="+winHeight+",top="+winPosTop+",left="+winPosLeft+", scrollbars=no, location :no";
	window.open(popUrl,"",winOpt);
}

//데이터ID/년도 팝업
function popupOpen(){
	var popUrl = "IDSearchManage.html";	//팝업창에 출력될 페이지 URL
    // 2018. 01. 10 mng_s
	var winWidth = 470;
    // 2018. 01. 10 mng_e
	var winHeight = 650;
	var winPosLeft = (screen.width - winWidth) / 2;
	var winPosTop = (screen.height - winHeight) / 2;
	var winOpt = "width="+winWidth+",height="+winHeight+",top="+winPosTop+",left="+winPosLeft+", scrollbars=yes, location :no, overflow-y: auto";
	window.open(popUrl,"",winOpt);
}

//POI테마코드 팝업
function popupOpenThema(){
	var popUrl = "themaSearchManage.html";	//팝업창에 출력될 페이지 URL
	var winWidth = 350;
	var winHeight = 550;
	var winPosLeft = (screen.width - winWidth) / 2;
	var winPosTop = (screen.height - winHeight) / 2;
	var winOpt = "width="+winWidth+",height="+winHeight+",top="+winPosTop+",left="+winPosLeft+", scrollbars=yes, location :no";
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

function openAddPopup(){
	for(var as = 8; as <=10; as ++){
		$("#TH"+as+"_SIDO").hide();
		$("#TD"+as+"_SIDO").hide();
		$("#SEP"+as+"_SIDO").hide();
	}
	$('#EXMPL_SIDO').change(function(){
		var exmpl = $('#EXMPL_SIDO').val();
		var exmplInt = parseInt(exmpl);
		for(var i = 1; i<=10; i++){
			$('#TH'+i+"_SIDO").hide();
			$("#TD"+i+"_SIDO").hide();
			$('#SEP'+i+"_SIDO").hide();
		}
		for(var i = 1; i<=exmplInt; i++){
			$('#TH'+i+"_SIDO").show();
			$("#TD"+i+"_SIDO").show();
			$('#SEP'+i+"_SIDO").show();
		}
	});
}

function openAddPopup1(){
	for(var as = 8; as <=10; as ++){
		$("#TH"+as+"_SIGUGUN").hide();
		$("#TD"+as+"_SIGUGUN").hide();
		$("#SEP"+as+"_SIGUGUN").hide();
	}
	$('#EXMPL_SIGUGUN').change(function(){
		var exmpl = $('#EXMPL_SIGUGUN').val();
		var exmplInt = parseInt(exmpl);
		for(var i = 1; i<=10; i++){
			$('#TH'+i+"_SIGUGUN").hide();
			$("#TD"+i+"_SIGUGUN").hide();
			$('#SEP'+i+"_SIGUGUN").hide();
		}
		for(var i = 1; i<=exmplInt; i++){
			$('#TH'+i+"_SIGUGUN").show();
			$("#TD"+i+"_SIGUGUN").show();
			$('#SEP'+i+"_SIGUGUN").show();
		}
	});
}

function openAddPopup2(){
	for(var as = 8; as <=10; as ++){
		$("#TH"+as+"_DONG").hide();
		$("#TD"+as+"_DONG").hide();
		$("#SEP"+as+"_DONG").hide();
	}
	$('#EXMPL_DONG').change(function(){
		var exmpl = $('#EXMPL_DONG').val();
		var exmplInt = parseInt(exmpl);
		for(var i = 1; i<=10; i++){
			$('#TH'+i+"_DONG").hide();
			$("#TD"+i+"_DONG").hide();
			$('#SEP'+i+"_DONG").hide();
		}
		for(var i = 1; i<=exmplInt; i++){
			$('#TH'+i+"_DONG").show();
			$("#TD"+i+"_DONG").show();
			$('#SEP'+i+"_DONG").show();
		}
	});
}

function openAddPopup3(){
	for(var as = 8; as <=10; as ++){
		$("#TH"+as+"_EX").hide();
		$("#TD"+as+"_EX").hide();
		$("#SEP"+as+"_EX").hide();
	}
	$('#EXMPL_EX').change(function(){
		var exmpl = $('#EXMPL_EX').val();
		var exmplInt = parseInt(exmpl);
		for(var i = 1; i<=10; i++){
			$('#TH'+i+"_EX").hide();
			$("#TD"+i+"_EX").hide();
			$('#SEP'+i+"_EX").hide();
		}
		for(var i = 1; i<=exmplInt; i++){
			$('#TH'+i+"_EX").show();
			$("#TD"+i+"_EX").show();
			$('#SEP'+i+"_EX").show();
		}
	});
}

function openAddPopup4(){
	for(var as = 8; as <=10; as ++){
		$("#TH"+as+"_SIDO_RIGHT").hide();
		$("#TD"+as+"_SIDO_RIGHT").hide();
		$("#SEP"+as+"_SIDO_RIGHT").hide();
	}
	$('#EXMPL_SIDO_RIGHT').change(function(){
		var exmpl = $('#EXMPL_SIDO_RIGHT').val();
		var exmplInt = parseInt(exmpl);
		for(var i = 1; i<=10; i++){
			$('#TH'+i+"_SIDO_RIGHT").hide();
			$("#TD"+i+"_SIDO_RIGHT").hide();
			$('#SEP'+i+"_SIDO_RIGHT").hide();
		}
		for(var i = 1; i<=exmplInt; i++){
			$('#TH'+i+"_SIDO_RIGHT").show();
			$("#TD"+i+"_SIDO_RIGHT").show();
			$('#SEP'+i+"_SIDO_RIGHT").show();
		}
	});
}

function openAddPopup5(){
	for(var as = 8; as <=10; as ++){
		$("#TH"+as+"_SIGUGUN_RIGHT").hide();
		$("#TD"+as+"_SIGUGUN_RIGHT").hide();
		$("#SEP"+as+"_SIGUGUN_RIGHT").hide();
	}
	$('#EXMPL_SIGUGUN_RIGHT').change(function(){
		var exmpl = $('#EXMPL_SIGUGUN_RIGHT').val();
		var exmplInt = parseInt(exmpl);
		for(var i = 1; i<=10; i++){
			$('#TH'+i+"_SIGUGUN_RIGHT").hide();
			$("#TD"+i+"_SIGUGUN_RIGHT").hide();
			$('#SEP'+i+"_SIGUGUN_RIGHT").hide();
		}
		for(var i = 1; i<=exmplInt; i++){
			$('#TH'+i+"_SIGUGUN_RIGHT").show();
			$("#TD"+i+"_SIGUGUN_RIGHT").show();
			$('#SEP'+i+"_SIGUGUN_RIGHT").show();
		}
	});
}

function openAddPopup6(){
	for(var as = 8; as <=10; as ++){
		$("#TH"+as+"_DONG_RIGHT").hide();
		$("#TD"+as+"_DONG_RIGHT").hide();
		$("#SEP"+as+"_DONG_RIGHT").hide();
	}
	$('#EXMPL_DONG_RIGHT').change(function(){
		var exmpl = $('#EXMPL_DONG_RIGHT').val();
		var exmplInt = parseInt(exmpl);
		for(var i = 1; i<=10; i++){
			$('#TH'+i+"_DONG_RIGHT").hide();
			$("#TD"+i+"_DONG_RIGHT").hide();
			$('#SEP'+i+"_DONG_RIGHT").hide();
		}
		for(var i = 1; i<=exmplInt; i++){
			$('#TH'+i+"_DONG_RIGHT").show();
			$("#TD"+i+"_DONG_RIGHT").show();
			$('#SEP'+i+"_DONG_RIGHT").show();
		}
	});
}

function openAddPopup7(){
	for(var as = 8; as <=10; as ++){
		$("#TH"+as+"_EX_RIGHT").hide();
		$("#TD"+as+"_EX_RIGHT").hide();
		$("#SEP"+as+"_EX_RIGHT").hide();
	}
	$('#EXMPL_EX_RIGHT').change(function(){
		var exmpl = $('#EXMPL_EX_RIGHT').val();
		var exmplInt = parseInt(exmpl);
		for(var i = 1; i<=10; i++){
			$('#TH'+i+"_EX_RIGHT").hide();
			$("#TD"+i+"_EX_RIGHT").hide();
			$('#SEP'+i+"_EX_RIGHT").hide();
		}
		for(var i = 1; i<=exmplInt; i++){
			$('#TH'+i+"_EX_RIGHT").show();
			$("#TD"+i+"_EX_RIGHT").show();
			$('#SEP'+i+"_EX_RIGHT").show();
		}
	});
}
function getthemaList(){
	var stat_thema_map_id;
	var category;
	var mapType;
	$.ajax({
		url : contextPath + "/ServiceAPI/DT/ThemaMapManage/getThemaMapList.json",
		type: "POST",
		async: false,
		dataType: "json",
		success: function(data){
			$('#stat_thema_map_id').val(data.result[0].STAT_THEMA_MAP_ID);
			$('#theme').val(data.result[0].CATEGORY);
			$('#mapType').val(data.result[0].THEMA_MAP_TYPE);
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
/*function test00(){	

	//callback function
	var onSlide = function(e){
		var columns = $(e.currentTarget).find("td");
		var ranges = [], total = 0;
		var i;
		var s ="Ranges: ";
		var w;
		for(i = 0; i<columns.length; i++){
			w = columns.eq(i).width()-10 - (i==0?1:0);
			ranges.push(w);
			total+=w;
		}		 
		for(i=0; i<columns.length; i++){			
			ranges[i] = 100*ranges[i]/total;
			carriage = ranges[i]-w
			s+=" "+ Math.round(ranges[i]) + "%,";			
		}		
		s=s.slice(0,-1);			
		$("#text").html(s);
	}

	//colResize the table
	$("#range").colResizable({
		liveDrag:true, 
		draggingClass:"dragging", 
		gripInnerHtml:"<div class='grip'></div>", 
		onResize:onSlide,
		minWidth:8
		});

}*/

function popupOpenMap(){
	var popUrl = "MapIDSearchManage.html";	//팝업창에 출력될 페이지 URL
	var winWidth = 350;
	var winHeight = 650;
	var winPosLeft = (screen.width - winWidth) / 2;
	var winPosTop = (screen.height - winHeight) / 2;
	var winOpt = "width="+winWidth+",height="+winHeight+",top="+winPosTop+",left="+winPosLeft+", scrollbars=no, location :no";
	window.open(popUrl,"",winOpt);
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
	var datalength = String(new Date().getFullYear()).substr(2)
	var nowYear = dt.getFullYear();
	var yearList = "";	
	for(var i=0; i<datalength; i++) {
		yearList += "<option value='"+(nowYear-i)+"'>"+(nowYear-i)+"년</option>";
	}
	$("#LEFT_YEAR").append(yearList);
	$("#YEAR_INFO").append(yearList);
}

var stat_thema_map_id;
var category;
var mapType;
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
	$("#my_frame").css("width", "1096px");
	$("#my_frame").css("margin-top", "45px");
	$("#my_frame").css("height", "815px");
	$("#my_frame").attr("src",src);
}
function openWin(){
	$('.Popup_Info').hide();
	 $themaMapAddManage.regthemaList(stat_thema_map_id);
}
function closeWin(){
	$('.Popup_Info').hide();
	$themaMapAddManage.delthemaList(stat_thema_map_id);
}
function loading() {
	$('#my_frame').contents().find('header').hide();
	$('#my_frame').contents().find('.map_dummy').css("height","765px");
	$('#my_frame').contents().find('.tb_right').css("display","none");
	
}
(function(W, D) {
	W.$themaMapAddManage = W.$themaMapAddManage || {};
	$(document).ready(function() {
				CKEDITOR.replace('THEMA_EXP', {
					resize_enabled : false,
					removePlugins : 'toolbar,elementspath',
					readOnly : false					
				});
		
				document.getElementById('resetForm').reset();
				$('#resetFormA').hide();
				$('#resetFormB').hide();
				$('#FIX_YN').attr('disabled','true');
				$('#add_check').hide();
				$('#MOBILE_URL').hide();
				$('#MAP_DATA_YEAR_LAY').hide();
				$('#THEMASEARCHButton').hide();
				
				// mng_s 2017. 08. 04 석진혁
				$('#CORPCLASSSEARCHButton').hide();
				// mng_e 2017. 08. 04 석진혁
				
				$themaMapAddManage.loadLogBCd();
				getYearList();
				$('#DATASEARCHButton').click(function(){
					popupOpen();
				});
				$('#THEMASEARCHButton').click(function(){
					popupOpenThema();
				});
				// mng_s 2017. 08. 04 석진혁
				$('#CORPCLASSSEARCHButton').click(function(){
					popupOpenCorpClass();
				});
				// mng_e 2017. 08. 04 석진혁
				
				$('#MAPDATASEARCHButton').click(function(){
					popupOpenMap();
				});

				$('#searchBT').click(function(){

					popTest();

				});

				$('#cancelButton').click(function(){
					location.href = "./../DT/themaMapMainManage.html";
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
				
				$('#THEMA_SEL').change(function(){
					var value = $('#THEMA_SEL').val();
					if(value=='04') { //증감
						$('#resetFormA').show();

						$('#sido_table').hide();
						$('#sigugun_table').hide();
						$('#dong_table').hide();
						$('#ex_table').hide();
						$('#FIX_YN').attr('disabled','true');
						$("#FIX_YN").val("Y");
						$('#div_sido').hide();
						$('#div_sigugun').hide();
						$('#div_dong').hide();
						$('#div_ex').hide();

						$('#chart_title1').show();
						$('#MAP_TTIP_TITLEA').hide();
						$('#resetFormB').hide();
						$('#add_check').hide();
						$('#THEMA_T').text('증감형 정보A');
						$('#CHECK_DIV').hide();
						$('#MAP_TTIP_TITLEA1').hide();
						$('#MAP_TTIP_TITLEA2').hide();
						$('#MAP_TTIP_TITLEA3').hide();
						$('.POI_area2').show();
						$('#POI_area3').html("통계년도 정보")
						$('#POI_area4').attr("colspan","1");
						$('#POI_area5').attr("colspan","1");
						$('#POI_area').show();
						
						// mng_s 2017. 08. 04 석진혁
						$('#POI_DISP_YN_AREA').hide();
						$('#POI_DISP_YN').hide();
						$('#POI_area').hide();
						// mng_e 2017. 08. 04 석진혁
						
						$("input[name=group1]").change(function() {
							radioValue = $(this).val();
							if (radioValue == "1") {
								$('#sido_table').hide();
								$('#sigugun_table').hide();
								$('#dong_table').hide();
								$('#ex_table').hide();

								$('#div_sido').hide();
								$('#div_sigugun').hide();
								$('#div_dong').hide();
								$('#div_ex').hide();
							} else if (radioValue == "2") {
								$('#sido_table').hide();
								$('#sigugun_table').hide();
								$('#dong_table').hide();
								$('#ex_table').hide();

								$('#div_sido').hide();
								$('#div_sigugun').hide();
								$('#div_dong').hide();
								$('#div_ex').hide();
							} else if (radioValue == "3") {
								$('#div_sido').show();
								$('#add_check_sido').prop("checked");
								$('#div_sigugun').show();
								$('#div_dong').show();
								$('#div_ex').show();
								$('#sido_table').show();
								openAddPopup();
								$('#add_check_sido').click(function(){
									var check_sido = $(this).is(':checked');
									if(check_sido){
										openAddPopup();
										$('#sido_table').show();
									}else{
										$('#sido_table').hide();
									}
								});
								$('#add_check_sigugun').click(function(){
									var check_sigugun = $(this).is(':checked');
									if(check_sigugun){
										openAddPopup1();
										$('#sigugun_table').show();
									}else{
										$('#sigugun_table').hide();
									}
								});
								$('#add_check_dong').click(function(){
									var check_dong = $(this).is(':checked');
									if(check_dong){
										openAddPopup2();
										$('#dong_table').show();
									}else{
										$('#dong_table').hide();
									}
								});
								$('#add_check_ex').click(function(){
									var check_ex = $(this).is(':checked');
									if(check_ex){
										openAddPopup3();
										$('#ex_table').show();
									}else{
										$('#ex_table').hide();
									}
								});

							}
						});

						$('#MOB_YN').change(function(){
							var mob_yn = $('#MOB_YN').val();
							if(mob_yn=='Y'){
								$('#MOBILE_URL').show();
							}else{
								$('#MOBILE_URL').hide();
							}
						});
						$('#MAP_DATA_YEAR_LAY').hide();
						$('#BOR_YN').removeAttr('disabled');
						$("#BOR_YN").val("0");
					} else if(value=='06') { //분할
						$('#resetFormA').show();
						$('#resetFormB').hide();

						$('#sido_table').hide();
						$('#sigugun_table').hide();
						$('#dong_table').hide();
						$('#ex_table').hide();
						$('#FIX_YN').attr('disabled','true');
						$("#FIX_YN").val("Y");
						$('#div_sido').hide();
						$('#div_sigugun').hide();
						$('#div_dong').hide();
						$('#div_ex').hide();

						$('#sido_table_right').hide();
						$('#sigugun_table_right').hide();
						$('#dong_table_right').hide();
						$('#ex_table_right').hide();

						$('#div_sido_right').hide();
						$('#div_sigugun_right').hide();
						$('#div_dong_right').hide();
						$('#div_ex_right').hide();

						$('#chart_title1').hide();
						$('#CHECK_DIV').show();
						$('#MAP_TTIP_TITLEA1').show();
						$('#MAP_TTIP_TITLEA2').show();
						$('#MAP_TTIP_TITLEA3').show();
						$('#add_check').show();
						$('.POI_area2').show();
						$('#POI_area3').html("통계년도 정보")
						$('#POI_area4').attr("colspan","1");
						$('#POI_area5').attr("colspan","1");
						$('#POI_area').hide();
						$("input[name=group1]").change(function() {
							radioValue = $(this).val();
							if (radioValue == "1") {
								$('#sido_table').hide();
								$('#sigugun_table').hide();
								$('#dong_table').hide();
								$('#ex_table').hide();

								$('#div_sido').hide();
								$('#div_sigugun').hide();
								$('#div_dong').hide();
								$('#div_ex').hide();

								$('#sido_table_right').hide();
								$('#sigugun_table_right').hide();
								$('#dong_table_right').hide();
								$('#ex_table_right').hide();

								$('#div_sido_right').hide();
								$('#div_sigugun_right').hide();
								$('#div_dong_right').hide();
								$('#div_ex_right').hide();
							} else if (radioValue == "2") {
								$('#sido_table').hide();
								$('#sigugun_table').hide();
								$('#dong_table').hide();
								$('#ex_table').hide();

								$('#div_sido').hide();
								$('#div_sigugun').hide();
								$('#div_dong').hide();
								$('#div_ex').hide();

								$('#sido_table_right').hide();
								$('#sigugun_table_right').hide();
								$('#dong_table_right').hide();
								$('#ex_table_right').hide();

								$('#div_sido_right').hide();
								$('#div_sigugun_right').hide();
								$('#div_dong_right').hide();
								$('#div_ex_right').hide();
							} else if (radioValue == "3") {
								$('#div_sido').show();
								$('#add_check_sido').prop("checked");
								$('#div_sigugun').show();
								$('#div_dong').show();
								$('#div_ex').show();
								$('#sido_table').show();

								$('#div_sido_right').show();
								$('#add_check_sido_right').prop("checked");
								$('#div_sigugun_right').show();
								$('#div_dong_right').show();
								$('#div_ex_right').show();
								$('#sido_table_right').show();
								openAddPopup();
								openAddPopup4();
								$('#add_check_sido').click(function(){
									var check_sido = $(this).is(':checked');
									if(check_sido){
										openAddPopup();
										$('#sido_table').show();
									}else{
										$('#sido_table').hide();
									}
								});
								$('#add_check_sigugun').click(function(){
									var check_sigugun = $(this).is(':checked');
									if(check_sigugun){
										openAddPopup1();
										$('#sigugun_table').show();
									}else{
										$('#sigugun_table').hide();
									}
								});
								$('#add_check_dong').click(function(){
									var check_dong = $(this).is(':checked');
									if(check_dong){
										openAddPopup2();
										$('#dong_table').show();
									}else{
										$('#dong_table').hide();
									}
								});
								$('#add_check_ex').click(function(){
									var check_ex = $(this).is(':checked');
									if(check_ex){
										openAddPopup3();
										$('#ex_table').show();
									}else{
										$('#ex_table').hide();
									}
								});

								$('#add_check_sido_right').click(function(){
									var check_sido = $(this).is(':checked');
									if(check_sido){
										openAddPopup4();
										$('#sido_table_right').show();
									}else{
										$('#sido_table_right').hide();
									}
								});
								$('#add_check_sigugun_right').click(function(){
									var check_sigugun = $(this).is(':checked');
									if(check_sigugun){
										openAddPopup5();
										$('#sigugun_table_right').show();
									}else{
										$('#sigugun_table_right').hide();
									}
								});
								$('#add_check_dong_right').click(function(){
									var check_dong = $(this).is(':checked');
									if(check_dong){
										openAddPopup6();
										$('#dong_table_right').show();
									}else{
										$('#dong_table_right').hide();
									}
								});
								$('#add_check_ex_right').click(function(){
									var check_ex = $(this).is(':checked');
									if(check_ex){
										openAddPopup7();
										$('#ex_table_right').show();
									}else{
										$('#ex_table_right').hide();
									}
								});

							}
						});
						$('#add_check').on('change', function() { 
							// From the other examples
							if (!this.checked) {
								$('#resetFormB').hide();
							}else{
								$('#resetFormB').show();
								$('#chart_title2').hide();
								$('#MAP_TTIP_TITLEA4').show();
								$('#MAP_TTIP_TITLEA5').show();
								$('#MAP_TTIP_TITLEA6').show();
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
						$('#BOR_YN').removeAttr('disabled');
						$("#BOR_YN").val("0");
						
						// mng_s 2017. 08. 04 석진혁
						$('#POI_DISP_YN_AREA').hide();
						$('#POI_DISP_YN').hide();
						$('#POI_area').hide();
						// mng_e 2017. 08. 04 석진혁
						
					} else if(value=='05') { //시계열
						$('#resetFormA').show();
						$('#resetFormB').hide();
						$('#sido_table').hide();
						$('#sigugun_table').hide();
						$('#dong_table').hide();
						$('#ex_table').hide();

						$('#FIX_YN').removeAttr('disabled');
						$('#div_sido').hide();
						$('#div_sigugun').hide();
						$('#div_dong').hide();
						$('#div_ex').hide();

						$('#sido_table_right').hide();
						$('#sigugun_table_right').hide();
						$('#dong_table_right').hide();
						$('#ex_table_right').hide();

						$('#div_sido_right').hide();
						$('#div_sigugun_right').hide();
						$('#div_dong_right').hide();
						$('#div_ex_right').hide();

						$('#CHECK_DIV').show();
						$('#MAP_TTIP_TITLEA').hide();
						$('#MAP_DATA_YEAR_LAY').hide();
						$('#chart_title1').hide();
						$('#MAP_TTIP_TITLEA1').hide();
						$('#MAP_TTIP_TITLEA2').hide();
						$('#MAP_TTIP_TITLEA3').hide();
						$('#add_check').show();
						$('.POI_area2').show();
						$('#POI_area3').html("통계년도 정보")
						$('#POI_area4').attr("colspan","1");
						$('#POI_area5').attr("colspan","1");
						$('#POI_area').show();
						$("input[name=group1]").change(function() {
							radioValue = $(this).val();
							if (radioValue == "1") {
								$('#sido_table').hide();
								$('#sigugun_table').hide();
								$('#dong_table').hide();
								$('#ex_table').hide();

								$('#div_sido').hide();
								$('#div_sigugun').hide();
								$('#div_dong').hide();
								$('#div_ex').hide();
							} else if (radioValue == "2") {
								$('#sido_table').hide();
								$('#sigugun_table').hide();
								$('#dong_table').hide();
								$('#ex_table').hide();

								$('#div_sido').hide();
								$('#div_sigugun').hide();
								$('#div_dong').hide();
								$('#div_ex').hide();
							} else if (radioValue == "3") {
								$('#div_sido').show();
								$('#add_check_sido').prop("checked");
								$('#div_sigugun').show();
								$('#div_dong').show();
								$('#div_ex').show();
								$('#sido_table').show();

								$('#div_sido_right').show();
								$('#add_check_sido_right').prop("checked");
								$('#div_sigugun_right').show();
								$('#div_dong_right').show();
								$('#div_ex_right').show();
								$('#sido_table_right').show();
								openAddPopup();
								openAddPopup4();
								$('#add_check_sido').click(function(){
									var check_sido = $(this).is(':checked');
									if(check_sido){
										openAddPopup();
										$('#sido_table').show();
									}else{
										$('#sido_table').hide();
									}
								});
								$('#add_check_sigugun').click(function(){
									var check_sigugun = $(this).is(':checked');
									if(check_sigugun){
										openAddPopup1();
										$('#sigugun_table').show();
									}else{
										$('#sigugun_table').hide();
									}
								});
								$('#add_check_dong').click(function(){
									var check_dong = $(this).is(':checked');
									if(check_dong){
										openAddPopup2();
										$('#dong_table').show();
									}else{
										$('#dong_table').hide();
									}
								});
								$('#add_check_ex').click(function(){
									var check_ex = $(this).is(':checked');
									if(check_ex){
										openAddPopup3();
										$('#ex_table').show();
									}else{
										$('#ex_table').hide();
									}
								});

								$('#add_check_sido_right').click(function(){
									var check_sido = $(this).is(':checked');
									if(check_sido){
										openAddPopup4();
										$('#sido_table_right').show();
									}else{
										$('#sido_table_right').hide();
									}
								});
								$('#add_check_sigugun_right').click(function(){
									var check_sigugun = $(this).is(':checked');
									if(check_sigugun){
										openAddPopup5();
										$('#sigugun_table_right').show();
									}else{
										$('#sigugun_table_right').hide();
									}
								});
								$('#add_check_dong_right').click(function(){
									var check_dong = $(this).is(':checked');
									if(check_dong){
										openAddPopup6();
										$('#dong_table_right').show();
									}else{
										$('#dong_table_right').hide();
									}
								});
								$('#add_check_ex_right').click(function(){
									var check_ex = $(this).is(':checked');
									if(check_ex){
										openAddPopup7();
										$('#ex_table_right').show();
									}else{
										$('#ex_table_right').hide();
									}
								});

							}
						});
						$('#add_check').on('change', function() { 
							// From the other examples
							if (!this.checked) {
								$('#resetFormB').hide();
							}else{
								$('#resetFormB').show();
								$('#MAP_TTIP_TITLEB').hide();
								$('#chart_title2').hide();
								$('#MAP_TTIP_TITLEA4').hide();
								$('#MAP_TTIP_TITLEA5').hide();
								$('#MAP_TTIP_TITLEA6').hide();
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
						$('#BOR_YN').removeAttr('disabled');
						$("#BOR_YN").val("0");
						
						// mng_s 2017. 08. 04 석진혁
						$('#POI_DISP_YN_AREA').hide();
						$('#POI_DISP_YN').hide();
						$('#POI_area').hide();
						// mng_e 2017. 08. 04 석진혁
						
					} else if(value=='03') { //색상
						$('#resetFormA').show();
						$('#resetFormB').hide();
						$('#sido_table').hide();
						$('#sigugun_table').hide();
						$('#dong_table').hide();
						$('#ex_table').hide();
						$('#FIX_YN').attr('disabled','true');
						$("#FIX_YN").val("Y");
						$('#div_sido').hide();
						$('#div_sigugun').hide();
						$('#div_dong').hide();
						$('#div_ex').hide();

						$('#sido_table_right').hide();
						$('#sigugun_table_right').hide();
						$('#dong_table_right').hide();
						$('#ex_table_right').hide();

						$('#div_sido_right').hide();
						$('#div_sigugun_right').hide();
						$('#div_dong_right').hide();
						$('#div_ex_right').hide();

						$('#MAP_TTIP_TITLEA').hide();
						$('#MAP_DATA_YEAR_LAY').hide();
						$('#chart_title1').hide();
						$('#MAP_TTIP_TITLEA1').hide();
						$('#CHECK_DIV').show();
						$('#MAP_TTIP_TITLEA2').hide();
						$('#MAP_TTIP_TITLEA3').hide();
						$('#add_check').show();
						$('.POI_area2').show();
						$('#POI_area3').html("통계년도 정보")
						$('#POI_area4').attr("colspan","1");
						$('#POI_area5').attr("colspan","1");
						$('#POI_area').show();
						
						// mng_s 2017. 08. 04 석진혁
						$('#POI_DISP_YN_AREA').show();
						$('#POI_DISP_YN').show();
						$('#POI_area').show();
						// mng_e 2017. 08. 04 석진혁
						
						$("input[name=group1]").change(function() {
							radioValue = $(this).val();
							if (radioValue == "1") {
								$('#sido_table').hide();
								$('#sigugun_table').hide();
								$('#dong_table').hide();
								$('#ex_table').hide();

								$('#div_sido').hide();
								$('#div_sigugun').hide();
								$('#div_dong').hide();
								$('#div_ex').hide();
							} else if (radioValue == "2") {
								$('#sido_table').hide();
								$('#sigugun_table').hide();
								$('#dong_table').hide();
								$('#ex_table').hide();

								$('#div_sido').hide();
								$('#div_sigugun').hide();
								$('#div_dong').hide();
								$('#div_ex').hide();
							} else if (radioValue == "3") {
								$('#div_sido').show();
								$('#add_check_sido').prop("checked");
								$('#div_sigugun').show();
								$('#div_dong').show();
								$('#div_ex').show();
								$('#sido_table').show();

								$('#div_sido_right').show();
								$('#add_check_sido_right').prop("checked");
								$('#div_sigugun_right').show();
								$('#div_dong_right').show();
								$('#div_ex_right').show();
								$('#sido_table_right').show();
								openAddPopup();
								openAddPopup4();
								$('#add_check_sido').click(function(){
									var check_sido = $(this).is(':checked');
									if(check_sido){
										openAddPopup();
										$('#sido_table').show();
									}else{
										$('#sido_table').hide();
									}
								});
								$('#add_check_sigugun').click(function(){
									var check_sigugun = $(this).is(':checked');
									if(check_sigugun){
										openAddPopup1();
										$('#sigugun_table').show();
									}else{
										$('#sigugun_table').hide();
									}
								});
								$('#add_check_dong').click(function(){
									var check_dong = $(this).is(':checked');
									if(check_dong){
										openAddPopup2();
										$('#dong_table').show();
									}else{
										$('#dong_table').hide();
									}
								});
								$('#add_check_ex').click(function(){
									var check_ex = $(this).is(':checked');
									if(check_ex){
										openAddPopup3();
										$('#ex_table').show();
									}else{
										$('#ex_table').hide();
									}
								});

								$('#add_check_sido_right').click(function(){
									var check_sido = $(this).is(':checked');
									if(check_sido){
										openAddPopup4();
										$('#sido_table_right').show();
									}else{
										$('#sido_table_right').hide();
									}
								});
								$('#add_check_sigugun_right').click(function(){
									var check_sigugun = $(this).is(':checked');
									if(check_sigugun){
										openAddPopup5();
										$('#sigugun_table_right').show();
									}else{
										$('#sigugun_table_right').hide();
									}
								});
								$('#add_check_dong_right').click(function(){
									var check_dong = $(this).is(':checked');
									if(check_dong){
										openAddPopup6();
										$('#dong_table_right').show();
									}else{
										$('#dong_table_right').hide();
									}
								});
								$('#add_check_ex_right').click(function(){
									var check_ex = $(this).is(':checked');
									if(check_ex){
										openAddPopup7();
										$('#ex_table_right').show();
									}else{
										$('#ex_table_right').hide();
									}
								});

							}
						});
						$('#add_check').on('change', function() { 
							// From the other examples
							if (!this.checked) {
								$('#resetFormB').hide();
							}else{
								$('#resetFormB').show();
								$('#MAP_TTIP_TITLEB').hide();
								$('#chart_title2').hide();
								$('#guganSettingLayer').show();
								$('#MAP_TTIP_TITLEA4').hide();
								$('#MAP_TTIP_TITLEA5').hide();
								$('#MAP_TTIP_TITLEA6').hide();
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
						$('#BOR_YN').removeAttr('disabled');
						$("#BOR_YN").val("0");
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
						$('#POI_area3').html("POI년도 정보");
						//고정추가
						$("#MIN_MAP").val("04");
						$("#MAX_MAP").val("04");
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
						$("#BOR_YN").val("0");
						$('#MOB_YN').change(function(){
							var mob_yn = $('#MOB_YN').val();
							if(mob_yn=='Y'){
								$('#MOBILE_URL').show();
							}else{
								$('#MOBILE_URL').hide();
							}
						});
					} else if(value=='00') { //전체
						document.getElementById('resetForm').reset();
						$('#resetFormA').hide();
						$('#resetFormB').hide();
						$('#add_check').hide();
						$('#MOBILE_URL').hide();
						$('#FIX_YN').attr('disabled','true');
						$("#FIX_YN").val("Y");
						$('#MAP_DATA_YEAR_LAY').hide();
					}
				});
				
				$('#addButton').click(function(e){
					srvLogWrite("L0", "03", "02", "07", "", "");
					var THEMA_SEL = $('#THEMA_SEL').val();
					if(THEMA_SEL == '00'){ //전체
						getConfirmPopup('알림', '주제도 종류를 선택 해 주세요.', 'alert');
						$('#ok_alertPopup').click(function () {
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function () {
							confirmPopupRemove();
						});
						return;
					} else if(THEMA_SEL=='03') { //색상형
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
						var mob_yn = $('#MOB_YN').val();
						var mob_url = $('#MOB_URL').val();
						if(mob_yn=='Y'){
							if(mob_url.length<1){
								getConfirmPopup('알림', '모바일 URL을 입력해 주세요.', 'alert');
								$('#ok_alertPopup').click(function () {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								$('#MOB_URL').focus();
								return;
							}	
						}
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
						var thema_exp = CKEDITOR.instances.THEMA_EXP.getData(); //$('#THEMA_EXP').val();
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
						var year_info = $('#YEAR_INFO').val();
						if(year_info.length<1){
							getConfirmPopup('알림', '통계년도정보를 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#YEAR_INFO').focus();
							return;
						}
						var flag = $('#add_check').is(":checked");
						if(flag==true){
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
							// mng_e 2017. 08. 04 석진혁
						}
						
						$themaMapAddManage.addThemaMap3();
					} else if(THEMA_SEL=='04') { //증감형
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
						var year_info = $('#YEAR_INFO').val();
						if(year_info.length<1){
							getConfirmPopup('알림', '통계년도정보를 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#YEAR_INFO').focus();
							return;
						}
						var mob_yn = $('#MOB_YN').val();
						var mob_url = $('#MOB_URL').val();
						if(mob_yn=='Y'){
							if(mob_url.length<1){
								getConfirmPopup('알림', '모바일 URL을 입력해 주세요.', 'alert');
								$('#ok_alertPopup').click(function () {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								$('#MOB_URL').focus();
								return;
							}	
						}
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
							// mng_e 2017. 08. 04 석진혁
						}
						
						$themaMapAddManage.addThemaMap4();
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
						
						var year_info = $('#YEAR_INFO').val();
						if(year_info.length<1){
							getConfirmPopup('알림', '통계년도정보를 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#YEAR_INFO').focus();
							return;
						}
						var mob_yn = $('#MOB_YN').val();
						var mob_url = $('#MOB_URL').val();
						if(mob_yn=='Y'){
							if(mob_url.length<1){
								getConfirmPopup('알림', '모바일 URL을 입력해 주세요.', 'alert');
								$('#ok_alertPopup').click(function () {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								$('#MOB_URL').focus();
								return;
							}	
						}
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

						var flag = $('#add_check').is(":checked");
						if(flag==true){
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
							// mng_e 2017. 08. 04 석진혁
						}
						
						$themaMapAddManage.addThemaMap5();
					} else if(THEMA_SEL=='06') {
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
						
						var year_info = $('#YEAR_INFO').val();
						if(year_info.length<1){
							getConfirmPopup('알림', '통계년도정보를 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#YEAR_INFO').focus();
							return;
						}
						var mob_yn = $('#MOB_YN').val();
						var mob_url = $('#MOB_URL').val();
						if(mob_yn=='Y'){
							if(mob_url.length<1){
								getConfirmPopup('알림', '모바일 URL을 입력해 주세요.', 'alert');
								$('#ok_alertPopup').click(function () {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								$('#MOB_URL').focus();
								return;
							}	
						}
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

						var flag = $('#add_check').is(":checked");
						if(flag==true){
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
							var right_map_ttip_title_a = $('#RIGHT_MAP_TITLE').val(); // 분할맵A명
							if(right_map_ttip_title_a.length<1){
								getConfirmPopup('알림', '분할맵 명을 입력해 주세요.', 'alert');
								$('#ok_alertPopup').click(function () {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								$('#RIGHT_MAP_TITLE').focus();
								return;
							}
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
						
						$themaMapAddManage.addThemaMap6();
					} else if(THEMA_SEL=='07') { //POI 추가
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
						var mob_yn = $('#MOB_YN').val();
						var mob_url = $('#MOB_URL').val();
						if(mob_yn=='Y'){
							if(mob_url.length<1){
								getConfirmPopup('알림', '모바일 URL을 입력해 주세요.', 'alert');
								$('#ok_alertPopup').click(function () {
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function () {
									confirmPopupRemove();
								});
								$('#MOB_URL').focus();
								return;
							}	
						}
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
						var year_info = $('#YEAR_INFO').val();
						if(year_info.length<1){
							getConfirmPopup('알림', 'POI년도 정보를 입력해 주세요.', 'alert');
							$('#ok_alertPopup').click(function () {
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function () {
								confirmPopupRemove();
							});
							$('#YEAR_INFO').focus();
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
							// mng_e 2017. 08. 04 석진혁
						}
						
						$themaMapAddManage.addThemaMap7();
					}

				});

			});


	$themaMapAddManage = {
			loadLogBCd:function(){
				var sopOpenApiLoadLogBCdObj = new sop.openApi.loadLogBCd.api();
				sopOpenApiLoadLogBCdObj.addParam('CLASSTYPE', 'T');
				sopOpenApiLoadLogBCdObj.request({
					method : "POST",
					async : false,
					url : contextPath +"/ServiceAPI/COMMON/getAPIClass.json"
				});
			},
			addThemaMap3 : function(){
				//색상형
				var flag = $('#add_check').is(":checked");
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
				
				// mng_s 2017. 08. 04 석진혁
				var CORP_CLASS_CD = $('#CORP_CLASS_CD').val();
				// mng_e 2017. 08. 04 석진혁
				
				//A 형
				var left_title_a = $('#LEFT_TITLE').val();
				var left_ttip_a = $('#LEFT_TTIP').val();
				var left_unit_a = $('#LEFT_UNIT').val();
				var left_source_a = $('#LEFT_SOURCE_URL').val();
				var THEMA_SEL = $('#THEMA_SEL').val();
				var YEAR_INFO = $('#YEAR_INFO').val();
				var FIX_YN = $('#FIX_YN').val();

				var sopOpenApiaddThemaMap3Obj = new sop.openApi.addThemaMap3.api();
				sopOpenApiaddThemaMap3Obj.addParam('CATEGORY', category_nm);
				sopOpenApiaddThemaMap3Obj.addParam('TITLE', title);
				sopOpenApiaddThemaMap3Obj.addParam('THEMA_MAP_TYPE', THEMA_SEL);
				sopOpenApiaddThemaMap3Obj.addParam('SRV_YN', srv_yn);
				sopOpenApiaddThemaMap3Obj.addParam('START_X', start_x);
				sopOpenApiaddThemaMap3Obj.addParam('START_Y', start_y);
				sopOpenApiaddThemaMap3Obj.addParam('MAX_LEVEL', max_map);
				sopOpenApiaddThemaMap3Obj.addParam('MIN_LEVEL', min_map);
				sopOpenApiaddThemaMap3Obj.addParam('MOBILE_YN', mob_yn);
				sopOpenApiaddThemaMap3Obj.addParam('DISP_MTHD', DISP_MTHD);
				sopOpenApiaddThemaMap3Obj.addParam('REL_STAT_INFO', thema_avr);
				sopOpenApiaddThemaMap3Obj.addParam('DATA_YEAR', data_year);
				sopOpenApiaddThemaMap3Obj.addParam('DATA_ID', data_id);
				sopOpenApiaddThemaMap3Obj.addParam('EXP', encodeURIComponent(thema_exp));
				sopOpenApiaddThemaMap3Obj.addParam('LEFT_NM', left_title_a);
				sopOpenApiaddThemaMap3Obj.addParam('PRIORTY_YN', PRIORTY_YN);
				sopOpenApiaddThemaMap3Obj.addParam('FIX_YN',FIX_YN);
				sopOpenApiaddThemaMap3Obj.addParam('YEAR_INFO',YEAR_INFO);
				sopOpenApiaddThemaMap3Obj.addParam('POI_DISP_YN',POI_DISP_YN);
				if(POI_DISP_YN == "Y") {
					// mng_s 2017. 08. 04 석진혁
					if(THEME_CD != null && THEME_CD != undefined && THEME_CD.length > 1) {
						sopOpenApiaddThemaMap3Obj.addParam('THEME_CD', THEME_CD);
					} else if(CORP_CLASS_CD != null && CORP_CLASS_CD != undefined && CORP_CLASS_CD.length > 1) {
						sopOpenApiaddThemaMap3Obj.addParam('CORP_CLASS_CD', CORP_CLASS_CD);
					}
					// mng_e 2017. 08. 04 석진혁
				}
				if(radioValue==''){
					radioValue='1';
				}
				sopOpenApiaddThemaMap3Obj.addParam('EXMPL_TYPE', radioValue);
				if(radioValue=='3'){
					if($('#data_sido').val()!=null && $('#data_sido').val()!=''){
						var EXMPL_DATA='';
						EXMPL_DATA = $('#data_sido').val();
						sopOpenApiaddThemaMap3Obj.addParam('DATA_SIDO',EXMPL_DATA);
					}
					
					if($('#data_gugun').val()!=null && $('#data_gugun').val()!=''){
						var EXMPL_DATA='';
						EXMPL_DATA = $('#data_gugun').val();
						sopOpenApiaddThemaMap3Obj.addParam('DATA_GUGUN',EXMPL_DATA);
					}
					
					if($('#data_dong').val()!=null && $('#data_dong').val()!=''){
						var EXMPL_DATA='';
						EXMPL_DATA = $('#data_dong').val();
						sopOpenApiaddThemaMap3Obj.addParam('DATA_DONG',EXMPL_DATA);
					}
					
					if($('#data_ex').val()!=null && $('#data_ex').val()!=''){
						var EXMPL_DATA='';
						EXMPL_DATA = $('#data_ex').val();
						sopOpenApiaddThemaMap3Obj.addParam('DATA_EX',EXMPL_DATA);
					}
					
					if($('#data_sido_right').val()!=null && $('#data_sido_right').val()!=''){
						var EXMPL_DATA='';
						EXMPL_DATA = $('#data_sido_right').val();
						sopOpenApiaddThemaMap3Obj.addParam('DATA_SIDO_RIGHT',EXMPL_DATA);
					}
					
					if($('#data_gugun_right').val()!=null && $('#data_gugun_right').val()!=''){
						var EXMPL_DATA='';
						EXMPL_DATA = $('#data_gugun_right').val();
						sopOpenApiaddThemaMap3Obj.addParam('DATA_GUGUN_RIGHT',EXMPL_DATA);
					}
					
					if($('#data_dong_right').val()!=null && $('#data_dong_right').val()!=''){
						var EXMPL_DATA='';
						EXMPL_DATA = $('#data_dong_right').val();
						sopOpenApiaddThemaMap3Obj.addParam('DATA_DONG_RIGHT',EXMPL_DATA);
					}
					
					if($('#data_ex_right').val()!=null && $('#data_ex_right').val()!=''){
						var EXMPL_DATA='';
						EXMPL_DATA = $('#data_ex_right').val();
						sopOpenApiaddThemaMap3Obj.addParam('DATA_EX_RIGHT',EXMPL_DATA);
					}
					
				}
				if(mob_url.length >= 1){
					sopOpenApiaddThemaMap3Obj.addParam('MOBILE_URL', mob_url);
				}
				sopOpenApiaddThemaMap3Obj.addParam('LEFT_UNIT', encodeURIComponent(left_unit_a));
				sopOpenApiaddThemaMap3Obj.addParam('LEFT_YEAR', left_year_a);
				sopOpenApiaddThemaMap3Obj.addParam('LEFT_TTIP', left_ttip_a);
				sopOpenApiaddThemaMap3Obj.addParam('LEFT_SOURCE', left_source_a);

				if(flag==true)
				{
					//B 형 
					var left_title_b = $('#RIGHT_TITLE').val();
					var left_ttip_b = $('#RIGHT_TTIP').val();
					var left_unit_b = $('#RIGHT_UNIT').val();
					var left_source_b = $('#RIGHT_SOURCE_URL').val();

					sopOpenApiaddThemaMap3Obj.addParam('RIGHT_NM', left_title_b);
					sopOpenApiaddThemaMap3Obj.addParam('RIGHT_UNIT', encodeURIComponent(left_unit_b));
					sopOpenApiaddThemaMap3Obj.addParam('RIGHT_TTIP', left_ttip_b);
					sopOpenApiaddThemaMap3Obj.addParam('RIGHT_SOURCE', left_source_b);
				}
				sopOpenApiaddThemaMap3Obj.addParam('ATDRC_YN', bor_yn);

				sopOpenApiaddThemaMap3Obj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/DT/ThemaMapManage/addPlusThemaMap.json"
				});
			},
			addThemaMap4:function(){
				// 증감형

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
				
				// mng_s 2017. 08. 04 석진혁
				var CORP_CLASS_CD = $('#CORP_CLASS_CD').val();
				// mng_e 2017. 08. 04 석진혁

				//A 형
				var left_title_a = $('#LEFT_TITLE').val();
				var left_ttip_a = $('#LEFT_TTIP').val();
				var left_unit_a = $('#LEFT_UNIT').val();
				var left_source_a = $('#LEFT_SOURCE_URL').val();
				var left_chart_a = $('#LEFT_CHART').val();

				var THEMA_SEL = $('#THEMA_SEL').val();

				var sopOpenApiaddThemaMap4Obj = new sop.openApi.addThemaMap4.api();
				sopOpenApiaddThemaMap4Obj.addParam('CATEGORY', category_nm);
				sopOpenApiaddThemaMap4Obj.addParam('TITLE', title);
				sopOpenApiaddThemaMap4Obj.addParam('THEMA_MAP_TYPE', THEMA_SEL);
				sopOpenApiaddThemaMap4Obj.addParam('SRV_YN', srv_yn);
				sopOpenApiaddThemaMap4Obj.addParam('START_X', start_x);
				sopOpenApiaddThemaMap4Obj.addParam('START_Y', start_y);
				sopOpenApiaddThemaMap4Obj.addParam('MAX_LEVEL', max_map);
				sopOpenApiaddThemaMap4Obj.addParam('MIN_LEVEL', min_map);
				sopOpenApiaddThemaMap4Obj.addParam('MOBILE_YN', mob_yn);
				sopOpenApiaddThemaMap4Obj.addParam('DISP_MTHD', DISP_MTHD);
				sopOpenApiaddThemaMap4Obj.addParam('REL_STAT_INFO', thema_avr);
				sopOpenApiaddThemaMap4Obj.addParam('DATA_YEAR', data_year);
				sopOpenApiaddThemaMap4Obj.addParam('DATA_ID', data_id);
				sopOpenApiaddThemaMap4Obj.addParam('EXP', encodeURIComponent(thema_exp));
				sopOpenApiaddThemaMap4Obj.addParam('LEFT_NM', left_title_a);
				sopOpenApiaddThemaMap4Obj.addParam('PRIORTY_YN', PRIORTY_YN);
				sopOpenApiaddThemaMap4Obj.addParam('POI_DISP_YN',POI_DISP_YN);
				if(POI_DISP_YN == "Y") {
					// mng_s 2017. 08. 04 석진혁
					if(THEME_CD != null && THEME_CD != undefined && THEME_CD.length > 1) {
						sopOpenApiaddThemaMap4Obj.addParam('THEME_CD', THEME_CD);
					} else if(CORP_CLASS_CD != null && CORP_CLASS_CD != undefined && CORP_CLASS_CD.length > 1) {
						sopOpenApiaddThemaMap4Obj.addParam('CORP_CLASS_CD', CORP_CLASS_CD);
					}
					// mng_e 2017. 08. 04 석진혁
				}
				var YEAR_INFO = $('#YEAR_INFO').val();
				var FIX_YN = $('#FIX_YN').val();
				sopOpenApiaddThemaMap4Obj.addParam('FIX_YN',FIX_YN);
				sopOpenApiaddThemaMap4Obj.addParam('YEAR_INFO',YEAR_INFO);

				if(mob_url.length >= 1){
					sopOpenApiaddThemaMap4Obj.addParam('MOBILE_URL', mob_url);
				}
				sopOpenApiaddThemaMap4Obj.addParam('LEFT_UNIT', encodeURIComponent(left_unit_a));
				sopOpenApiaddThemaMap4Obj.addParam('LEFT_YEAR', left_year_a);
				sopOpenApiaddThemaMap4Obj.addParam('LEFT_TTIP', left_ttip_a);
				sopOpenApiaddThemaMap4Obj.addParam('LEFT_CHART', left_chart_a);
				sopOpenApiaddThemaMap4Obj.addParam('LEFT_SOURCE', left_source_a);
				if(radioValue==''){
					radioValue='1';
				}
				sopOpenApiaddThemaMap4Obj.addParam('EXMPL_TYPE', radioValue);
				if(radioValue=='3'){
					if($('#data_sido').val()!=null && $('#data_sido').val()!=''){
						var EXMPL_DATA='';
						EXMPL_DATA = $('#data_sido').val();
						sopOpenApiaddThemaMap4Obj.addParam('DATA_SIDO',EXMPL_DATA);
					}
					
					if($('#data_gugun').val()!=null && $('#data_gugun').val()!=''){
						var EXMPL_DATA='';
						EXMPL_DATA = $('#data_gugun').val();
						sopOpenApiaddThemaMap4Obj.addParam('DATA_GUGUN',EXMPL_DATA);
					}
					
					if($('#data_dong').val()!=null && $('#data_dong').val()!=''){
						var EXMPL_DATA='';
						EXMPL_DATA = $('#data_dong').val();
						sopOpenApiaddThemaMap4Obj.addParam('DATA_DONG',EXMPL_DATA);
					}
					
					if($('#data_ex').val()!=null && $('#data_ex').val()!=''){
						var EXMPL_DATA='';
						EXMPL_DATA = $('#data_ex').val();
						sopOpenApiaddThemaMap4Obj.addParam('DATA_EX',EXMPL_DATA);
					}			
				}
				sopOpenApiaddThemaMap4Obj.addParam('ATDRC_YN', bor_yn);

				sopOpenApiaddThemaMap4Obj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/DT/ThemaMapManage/addPlusThemaMap.json"
				});

			},
			addThemaMap5:function(){
				//시계열
				var flag = $('#add_check').is(":checked");

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
				
				// mng_s 2017. 08. 04 석진혁
				var CORP_CLASS_CD = $('#CORP_CLASS_CD').val();
				// mng_e 2017. 08. 04 석진혁
				
				//A 형
				var left_title_a = $('#LEFT_TITLE').val();
				var left_ttip_a = $('#LEFT_TTIP').val();
				var left_unit_a = $('#LEFT_UNIT').val();
				var left_source_a = $('#LEFT_SOURCE_URL').val();

				var THEMA_SEL = $('#THEMA_SEL').val();
				
				var sopOpenApiaddThemaMap5Obj = new sop.openApi.addThemaMap5.api();
				sopOpenApiaddThemaMap5Obj.addParam('CATEGORY', category_nm);
				sopOpenApiaddThemaMap5Obj.addParam('TITLE', title);
				sopOpenApiaddThemaMap5Obj.addParam('THEMA_MAP_TYPE', THEMA_SEL);
				sopOpenApiaddThemaMap5Obj.addParam('SRV_YN', srv_yn);
				sopOpenApiaddThemaMap5Obj.addParam('START_X', start_x);
				sopOpenApiaddThemaMap5Obj.addParam('START_Y', start_y);
				sopOpenApiaddThemaMap5Obj.addParam('MAX_LEVEL', max_map);
				sopOpenApiaddThemaMap5Obj.addParam('MIN_LEVEL', min_map);
				sopOpenApiaddThemaMap5Obj.addParam('MOBILE_YN', mob_yn);
				sopOpenApiaddThemaMap5Obj.addParam('DISP_MTHD', DISP_MTHD);
				sopOpenApiaddThemaMap5Obj.addParam('REL_STAT_INFO', thema_avr);
				sopOpenApiaddThemaMap5Obj.addParam('DATA_YEAR', data_year);
				sopOpenApiaddThemaMap5Obj.addParam('DATA_ID', data_id);
				sopOpenApiaddThemaMap5Obj.addParam('EXP', encodeURIComponent(thema_exp));
				sopOpenApiaddThemaMap5Obj.addParam('LEFT_NM', left_title_a);
				sopOpenApiaddThemaMap5Obj.addParam('PRIORTY_YN', PRIORTY_YN);
				sopOpenApiaddThemaMap5Obj.addParam('POI_DISP_YN',POI_DISP_YN);
				if(POI_DISP_YN == "Y") {
					// mng_s 2017. 08. 04 석진혁
					if(THEME_CD != null && THEME_CD != undefined && THEME_CD.length > 1) {
						sopOpenApiaddThemaMap5Obj.addParam('THEME_CD', THEME_CD);
					} else if(CORP_CLASS_CD != null && CORP_CLASS_CD != undefined && CORP_CLASS_CD.length > 1) {
						sopOpenApiaddThemaMap5Obj.addParam('CORP_CLASS_CD', CORP_CLASS_CD);
					}
					// mng_e 2017. 08. 04 석진혁
				}
				var YEAR_INFO = $('#YEAR_INFO').val();
				var FIX_YN = $('#FIX_YN').val();
				sopOpenApiaddThemaMap5Obj.addParam('FIX_YN',FIX_YN);
				sopOpenApiaddThemaMap5Obj.addParam('YEAR_INFO',YEAR_INFO);
				
				if(mob_url.length >= 1){
					sopOpenApiaddThemaMap5Obj.addParam('MOBILE_URL', mob_url);
				}
				if(radioValue==''){
					radioValue='1';
				}
				sopOpenApiaddThemaMap5Obj.addParam('EXMPL_TYPE', radioValue);
				if(radioValue=='3'){
					if($('#data_sido').val()!=null && $('#data_sido').val()!=''){
						var EXMPL_DATA='';
						EXMPL_DATA = $('#data_sido').val();
						sopOpenApiaddThemaMap5Obj.addParam('DATA_SIDO',EXMPL_DATA);
					}
					
					if($('#data_gugun').val()!=null && $('#data_gugun').val()!=''){
						var EXMPL_DATA='';
						EXMPL_DATA = $('#data_gugun').val();
						sopOpenApiaddThemaMap5Obj.addParam('DATA_GUGUN',EXMPL_DATA);
					}
					
					if($('#data_dong').val()!=null && $('#data_dong').val()!=''){
						var EXMPL_DATA='';
						EXMPL_DATA = $('#data_dong').val();
						sopOpenApiaddThemaMap5Obj.addParam('DATA_DONG',EXMPL_DATA);
					}
					
					if($('#data_ex').val()!=null && $('#data_ex').val()!=''){
						var EXMPL_DATA='';
						EXMPL_DATA = $('#data_ex').val();
						sopOpenApiaddThemaMap5Obj.addParam('DATA_EX',EXMPL_DATA);
					}
					
					if($('#data_sido_right').val()!=null && $('#data_sido_right').val()!=''){
						var EXMPL_DATA='';
						EXMPL_DATA = $('#data_sido_right').val();
						sopOpenApiaddThemaMap5Obj.addParam('DATA_SIDO_RIGHT',EXMPL_DATA);
					}
					
					if($('#data_gugun_right').val()!=null && $('#data_gugun_right').val()!=''){
						var EXMPL_DATA='';
						EXMPL_DATA = $('#data_gugun_right').val();
						sopOpenApiaddThemaMap5Obj.addParam('DATA_GUGUN_RIGHT',EXMPL_DATA);
					}
					
					if($('#data_dong_right').val()!=null && $('#data_dong_right').val()!=''){
						var EXMPL_DATA='';
						EXMPL_DATA = $('#data_dong_right').val();
						sopOpenApiaddThemaMap5Obj.addParam('DATA_DONG_RIGHT',EXMPL_DATA);
					}
					
					if($('#data_ex_right').val()!=null && $('#data_ex_right').val()!=''){
						var EXMPL_DATA='';
						EXMPL_DATA = $('#data_ex_right').val();
						sopOpenApiaddThemaMap5Obj.addParam('DATA_EX_RIGHT',EXMPL_DATA);
					}
					
				}
				sopOpenApiaddThemaMap5Obj.addParam('LEFT_UNIT', encodeURIComponent(left_unit_a));
				sopOpenApiaddThemaMap5Obj.addParam('LEFT_YEAR', left_year_a);
				sopOpenApiaddThemaMap5Obj.addParam('LEFT_TTIP', left_ttip_a);
				sopOpenApiaddThemaMap5Obj.addParam('LEFT_SOURCE', left_source_a);

				if(flag==true)
				{
					//B 형 
					var left_year_b = $('#RIGHT_YEAR').val();
					var left_title_b = $('#RIGHT_TITLE').val();
					var left_ttip_b = $('#RIGHT_TTIP').val();
					var left_unit_b = $('#RIGHT_UNIT').val();
					var left_source_b = $('#RIGHT_SOURCE_URL').val();

					sopOpenApiaddThemaMap5Obj.addParam('RIGHT_NM', left_title_b);
					sopOpenApiaddThemaMap5Obj.addParam('RIGHT_UNIT', encodeURIComponent(left_unit_b));
					sopOpenApiaddThemaMap5Obj.addParam('RIGHT_TTIP', left_ttip_b);
					sopOpenApiaddThemaMap5Obj.addParam('RIGHT_SOURCE', left_source_b);
				}
				sopOpenApiaddThemaMap5Obj.addParam('ATDRC_YN', bor_yn);

				sopOpenApiaddThemaMap5Obj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/DT/ThemaMapManage/addPlusThemaMap.json"
				});
			},
			addThemaMap6:function(){
				//분할맵
				var flag = $('#add_check').is(":checked");
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
				var map_id = $('#MAP_DATA_ID').val();
				var exmpl_type = $('#MAP_DATA_YEAR').val();
				var thema_exp = CKEDITOR.instances.THEMA_EXP.getData();//$('#THEMA_EXP').val();
				var left_year_a = $('#LEFT_YEAR').val();
				var PRIORTY_YN = $('#PRIORTY_YN').val();


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

				var sopOpenApiaddThemaMap6Obj = new sop.openApi.addThemaMap6.api();
				sopOpenApiaddThemaMap6Obj.addParam('CATEGORY', category_nm);
				sopOpenApiaddThemaMap6Obj.addParam('TITLE', title);
				sopOpenApiaddThemaMap6Obj.addParam('THEMA_MAP_TYPE', THEMA_SEL);
				sopOpenApiaddThemaMap6Obj.addParam('SRV_YN', srv_yn);
				sopOpenApiaddThemaMap6Obj.addParam('START_X', start_x);
				sopOpenApiaddThemaMap6Obj.addParam('START_Y', start_y);
				sopOpenApiaddThemaMap6Obj.addParam('MAX_LEVEL', max_map);
				sopOpenApiaddThemaMap6Obj.addParam('MIN_LEVEL', min_map);
				sopOpenApiaddThemaMap6Obj.addParam('MOBILE_YN', mob_yn);
				sopOpenApiaddThemaMap6Obj.addParam('DISP_MTHD', DISP_MTHD);
				sopOpenApiaddThemaMap6Obj.addParam('REL_STAT_INFO', thema_avr);
				sopOpenApiaddThemaMap6Obj.addParam('DATA_YEAR', data_year);
				sopOpenApiaddThemaMap6Obj.addParam('DATA_ID', data_id);
				sopOpenApiaddThemaMap6Obj.addParam('MAP_ID',map_id);
				sopOpenApiaddThemaMap6Obj.addParam('MAP_YEAR',map_data_year);
				sopOpenApiaddThemaMap6Obj.addParam('EXP', encodeURIComponent(thema_exp));
				sopOpenApiaddThemaMap6Obj.addParam('LEFT_YEAR', left_year_a);
				sopOpenApiaddThemaMap6Obj.addParam('PRIORTY_YN', PRIORTY_YN);
				
				var YEAR_INFO = $('#YEAR_INFO').val();
				var FIX_YN = $('#FIX_YN').val();
				sopOpenApiaddThemaMap6Obj.addParam('FIX_YN',FIX_YN);
				sopOpenApiaddThemaMap6Obj.addParam('YEAR_INFO',YEAR_INFO);

				if(mob_url.length >= 1){
					sopOpenApiaddThemaMap6Obj.addParam('MOBILE_URL', mob_url);
				}
				if(radioValue==''){
					radioValue='1';
				}
				sopOpenApiaddThemaMap6Obj.addParam('EXMPL_TYPE', radioValue);
				if(radioValue=='3'){
					if($('#data_sido').val()!=null && $('#data_sido').val()!=''){
						var EXMPL_DATA='';
						EXMPL_DATA = $('#data_sido').val();
						sopOpenApiaddThemaMap6Obj.addParam('DATA_SIDO',EXMPL_DATA);
					}
					
					if($('#data_gugun').val()!=null && $('#data_gugun').val()!=''){
						var EXMPL_DATA='';
						EXMPL_DATA = $('#data_gugun').val();
						sopOpenApiaddThemaMap6Obj.addParam('DATA_GUGUN',EXMPL_DATA);
					}
					
					if($('#data_dong').val()!=null && $('#data_dong').val()!=''){
						var EXMPL_DATA='';
						EXMPL_DATA = $('#data_dong').val();
						sopOpenApiaddThemaMap6Obj.addParam('DATA_DONG',EXMPL_DATA);
					}
					
					if($('#data_ex').val()!=null && $('#data_ex').val()!=''){
						var EXMPL_DATA='';
						EXMPL_DATA = $('#data_ex').val();
						sopOpenApiaddThemaMap6Obj.addParam('DATA_EX',EXMPL_DATA);
					}
					
					if($('#data_sido_right').val()!=null && $('#data_sido_right').val()!=''){
						var EXMPL_DATA='';
						EXMPL_DATA = $('#data_sido_right').val();
						sopOpenApiaddThemaMap6Obj.addParam('DATA_SIDO_RIGHT',EXMPL_DATA);
					}
					
					if($('#data_gugun_right').val()!=null && $('#data_gugun_right').val()!=''){
						var EXMPL_DATA='';
						EXMPL_DATA = $('#data_gugun_right').val();
						sopOpenApiaddThemaMap6Obj.addParam('DATA_GUGUN_RIGHT',EXMPL_DATA);
					}
					
					if($('#data_dong_right').val()!=null && $('#data_dong_right').val()!=''){
						var EXMPL_DATA='';
						EXMPL_DATA = $('#data_dong_right').val();
						sopOpenApiaddThemaMap6Obj.addParam('DATA_DONG_RIGHT',EXMPL_DATA);
					}
					
					if($('#data_ex_right').val()!=null && $('#data_ex_right').val()!=''){
						var EXMPL_DATA='';
						EXMPL_DATA = $('#data_ex_right').val();
						sopOpenApiaddThemaMap6Obj.addParam('DATA_EX_RIGHT',EXMPL_DATA);
					}
					
				}
				sopOpenApiaddThemaMap6Obj.addParam('LEFT_NM', left_title_a);
				sopOpenApiaddThemaMap6Obj.addParam('LEFT_UNIT', encodeURIComponent(left_unit_a));
				sopOpenApiaddThemaMap6Obj.addParam('LEFT_TTIP', left_ttip_a);
				sopOpenApiaddThemaMap6Obj.addParam('LEFT_SOURCE', left_source_a);
				sopOpenApiaddThemaMap6Obj.addParam('LEFT_MAP_TITLE', left_map_ttip_title_a);
				sopOpenApiaddThemaMap6Obj.addParam('LEFT_MAP_UNIT', encodeURIComponent(left_map_unit));
				sopOpenApiaddThemaMap6Obj.addParam('LEFT_MAP_INFO', LEFT_MAP_INFO);
				sopOpenApiaddThemaMap6Obj.addParam('LEFT_MAP_TTIP_TITLE', LEFT_MAP_TTIP_TITLE);
				if(flag==true)
				{
					//B 형 
					var right_title_a = $('#RIGHT_TITLE').val(); //표출정보A명
					var right_ttip_a = $('#RIGHT_TTIP').val();  //표출정보툴팁A
					var right_unit_a = $('#RIGHT_UNIT').val();  //표출정보A단위 
					var right_source_a = $('#RIGHT_SOURCE_URL').val(); //표출정보A출처
					var right_map_ttip_title_a = $('#RIGHT_MAP_TITLE').val(); // 분할맵A명
					var right_map_unit = $('#RIGHT_MAP_UNIT').val(); //분할맵A단위
					var right_MAP_TTIP_TITLE = $('#RIGHT_MAP_TTIP_TITLE').val(); //분할맵 툴팁A명
					var right_MAP_INFO = $('RIGHT_MAP_INFO').val(); //분할맵A출처

					sopOpenApiaddThemaMap6Obj.addParam('RIGHT_NM', right_title_a);
					sopOpenApiaddThemaMap6Obj.addParam('RIGHT_UNIT', encodeURIComponent(right_unit_a));
					sopOpenApiaddThemaMap6Obj.addParam('RIGHT_TTIP', right_ttip_a);
					sopOpenApiaddThemaMap6Obj.addParam('RIGHT_SOURCE', right_source_a);
					sopOpenApiaddThemaMap6Obj.addParam('RIGHT_MAP_TITLE', right_map_ttip_title_a);
					sopOpenApiaddThemaMap6Obj.addParam('RIGHT_MAP_UNIT', encodeURIComponent(right_map_unit));
					sopOpenApiaddThemaMap6Obj.addParam('RIGHT_MAP_INFO', right_MAP_TTIP_TITLE);
					sopOpenApiaddThemaMap6Obj.addParam('RIGHT_MAP_TTIP_TITLE', right_MAP_INFO);
				}

				sopOpenApiaddThemaMap6Obj.addParam('ATDRC_YN', bor_yn);

				sopOpenApiaddThemaMap6Obj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/DT/ThemaMapManage/addPlusThemaMap.json"
				});
			}, addThemaMap7 : function(){ //POI추가
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
				var THEME_CD = $('#THEME_CD').val();
				
				// mng_s 2017. 08. 04 석진혁
				var CORP_CLASS_CD = $('#CORP_CLASS_CD').val();
				// mng_e 2017. 08. 04 석진혁
				
				var mob_url = $('#MOB_URL').val();
				var bor_yn = $('#BOR_YN').val();
				
				var sopOpenApiaddThemaMap7Obj = new sop.openApi.addThemaMap7.api();
				sopOpenApiaddThemaMap7Obj.addParam('CATEGORY', category_nm);
				sopOpenApiaddThemaMap7Obj.addParam('TITLE', title);
				sopOpenApiaddThemaMap7Obj.addParam('THEMA_MAP_TYPE', THEMA_SEL);
				sopOpenApiaddThemaMap7Obj.addParam('SRV_YN', srv_yn);
				sopOpenApiaddThemaMap7Obj.addParam('START_X', start_x);
				sopOpenApiaddThemaMap7Obj.addParam('START_Y', start_y);
				sopOpenApiaddThemaMap7Obj.addParam('MAX_LEVEL', max_map);
				sopOpenApiaddThemaMap7Obj.addParam('MIN_LEVEL', min_map);
				sopOpenApiaddThemaMap7Obj.addParam('MOBILE_YN', mob_yn);
				sopOpenApiaddThemaMap7Obj.addParam('DISP_MTHD', DISP_MTHD);
				sopOpenApiaddThemaMap7Obj.addParam('REL_STAT_INFO', thema_avr);
				sopOpenApiaddThemaMap7Obj.addParam('EXP', encodeURIComponent(thema_exp));
				sopOpenApiaddThemaMap7Obj.addParam('PRIORTY_YN', PRIORTY_YN);
				sopOpenApiaddThemaMap7Obj.addParam('YEAR_INFO',YEAR_INFO);

				// mng_s 2017. 08. 04 석진혁
				sopOpenApiaddThemaMap7Obj.addParam('POI_DISP_YN', "Y");
				
				if(THEME_CD != null && THEME_CD != undefined && THEME_CD.length > 1) {
					sopOpenApiaddThemaMap7Obj.addParam('THEME_CD', THEME_CD);
				} else if(CORP_CLASS_CD != null && CORP_CLASS_CD != undefined && CORP_CLASS_CD.length > 1) {
					sopOpenApiaddThemaMap7Obj.addParam('CORP_CLASS_CD', CORP_CLASS_CD);
				}
				// mng_e 2017. 08. 04 석진혁
				
				sopOpenApiaddThemaMap7Obj.addParam('DATA_YEAR', YEAR_INFO);
				sopOpenApiaddThemaMap7Obj.addParam('DATA_ID', "temp");
				sopOpenApiaddThemaMap7Obj.addParam('LEFT_YEAR', YEAR_INFO);
				sopOpenApiaddThemaMap7Obj.addParam('LEFT_NM', "temp");
				sopOpenApiaddThemaMap7Obj.addParam('LEFT_UNIT', "temp");
				sopOpenApiaddThemaMap7Obj.addParam('LEFT_TTIP', "temp");
				
				if(mob_url.length >= 1){
					sopOpenApiaddThemaMap7Obj.addParam('MOBILE_URL', mob_url);
				}
				sopOpenApiaddThemaMap7Obj.addParam('ATDRC_YN', bor_yn);

				sopOpenApiaddThemaMap7Obj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/DT/ThemaMapManage/addPlusThemaMap.json"
				});
			},
			
			delthemaList : function(id){
				var sopOpenApidelThemaMapListobj = new sop.openApi.delThemaMapListobj.api();
				sopOpenApidelThemaMapListobj.addParam('STAT_THEMA_MAP_ID_List', id);
				sopOpenApidelThemaMapListobj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/DT/ThemaMapManage/deleteThemaMapList.json"
				});
			},
			
			regthemaList : function(id){
				var sopOpenApiregThemaMapListobj = new sop.openApi.regThemaMapListobj.api();
				sopOpenApiregThemaMapListobj.addParam('STAT_THEMA_MAP_ID', id);
				sopOpenApiregThemaMapListobj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/DT/ThemaMapManage/registerThemaMapList.json"
				});
			},
			
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
		$class("sop.openApi.addThemaMap3.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				getthemaList();
				/*var result = res.result;
				if (res.errCd == "0") {
					if (result != null) {
						getConfirmPopup('알림', result.msg, 'alert');
						$('#ok_alertPopup').click(
								function() {
									if (result.success == true) {
										location.href = "./../DT/themaMapMainManage.html";
									}
									confirmPopupRemove();
								});
						$('#close_confirmPopup').click(
								function() {
									if (result.success == true) {
										location.href = "./../DT/themaMapMainManage.html";
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
		$class("sop.openApi.addThemaMap4.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				var result = res.result;
				getthemaList();
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
		$class("sop.openApi.addThemaMap5.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				getthemaList();
				/*var result = res.result;
				if (res.errCd == "0") {
					if (result != null) {
						getConfirmPopup('알림', result.msg, 'alert');
						$('#ok_alertPopup').click(
								function() {
									if (result.success == true) {
										location.href = "./../DT/themaMapMainManage.html";
									}
									confirmPopupRemove();
								});
						$('#close_confirmPopup').click(
								function() {
									if (result.success == true) {
										location.href = "./../DT/themaMapMainManage.html";
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
		$class("sop.openApi.addThemaMap6.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				getthemaList();
				/*var result = res.result;
				if (res.errCd == "0") {
					if (result != null) {
						getConfirmPopup('알림', result.msg, 'alert');
						$('#ok_alertPopup').click(
								function() {
									if (result.success == true) {
										location.href = "./../DT/themaMapMainManage.html";
									}
									confirmPopupRemove();
								});
						$('#close_confirmPopup').click(
								function() {
									if (result.success == true) {
										location.href = "./../DT/themaMapMainManage.html";
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
		$class("sop.openApi.addThemaMap7.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				getthemaList();
				/*var result = res.result;
				if (res.errCd == "0") {
					if (result != null) {
						getConfirmPopup('알림', result.msg, 'alert');
						$('#ok_alertPopup').click(
								function() {
									if (result.success == true) {
										location.href = "./../DT/themaMapMainManage.html";
									}
									confirmPopupRemove();
								});
						$('#close_confirmPopup').click(
								function() {
									if (result.success == true) {
										location.href = "./../DT/themaMapMainManage.html";
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
	(function() {
		$class("sop.openApi.delThemaMapListobj.api").extend(sop.cnm.absAPI).define({
			onSuccess : function(status, res) {
				//location.href = './../DT/themaMapAdd.html';
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
	(function() {
		$class("sop.openApi.regThemaMapListobj.api").extend(sop.cnm.absAPI).define({
			onSuccess : function(status, res) {
				location.href = './../DT/themaMapMainManage.html';
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
}(window, document));


