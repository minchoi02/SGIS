
/**
 * 나의 데이터 관리
 * 2018.08.31
 * 최재영
 */

(function(W,D){
	W.$myDataManagement = W.$myDataManagement || {};
	$(document).ready(function(){
		$myDataManagement.event.init();
		setInterval(function() {
				$myDataManagement.ui.getReqMyDataList($myDataManagement.ui.currentPage);
		},90000);
	});
	
	$myDataManagement.ui = {
			
			currentPage : 1,
			standard : null,
			searchWord : null,
			
			/**
			 * 
			 * @name         : getReqMyDataList
			 * @description  : 나의데이터 페이지 클릭
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			getReqMyDataList : function(pageIdx){
				
				$myDataManagement.ui.currentPage = pageIdx;
				var showListCount = $("#cntSelectBox").val();
				var startIdx =  showListCount * (pageIdx -1);
				var resultCnt = startIdx + Number(showListCount);
				$("#searchIdx").val(startIdx);
				$("#endIdx").val(resultCnt);
				$("#currentPage").val(pageIdx);
				$myDataManagement.request.doReqMyDataList(startIdx,resultCnt,$myDataManagement.ui.gridMyDataList);
			},
			
			/**
			 * 
			 * @name         : gridMyDataList
			 * @description  : 나의 데이터 리스트 그리기
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			gridMyDataList : function(list){
				var target = $("#myDataList");
				var paging = $("#myDataPage");
				var html = "";
				var total = 0;
				if(list.length != 0){
					total = list[0].total;
				}
				
				// 데이터 없음 관련 처리
				$("#myDataList").show();
				$("#myDataPage").show();
				$("#myDataEmpty").hide();
				
				//글 번호 + 데이터명 row data_name
				//데이터 설명 description
				//업로드 날짜 data_create_time
				for(var i = 0; i < list.length; i++){
					console.log(list[i]);
					/*console.log(list[i].action_type);*/
					if(list[i].action_type == "MAPPING" || list[i].action_type == "COORD" || list[i].action_type == "SHP"|| list[i].action_type == "GEOM"){
						//지오코딩 데이터
						html += '<li class="t01" data-id="'+list[i].resource_id+'">';
						html += 	'<div class="rela">';
						html +=	'<div class="triangle">';
						html += 		'<a href="javascript:void(0)" class="btnGps on">위치</a>';
						html += 		'<a href="javascript:void(0)" class="btnSGIS">SGIS</a>';
						if(list[i].fav_yn == "Y"){
							html += 		'<a href="javascript:void(0)" class="btnFav on">즐겨찾기</a>';
						}else{
							html += 		'<a href="javascript:void(0)" class="btnFav">즐겨찾기</a>';
						}
						
						if(list[i].inst_share_yn == "Y"){
							html += 		'<a href="javascript:void(0)" class="btnShare on">공유</a>';
						}else{
							html += 		'<a href="javascript:void(0)" class="btnShare">공유</a>';
						}
						
						html +=	'</div>';
							
						html +=	'<table class="clist01">';
						html +=		'<tr>';
						html +=			'<td><a href="javascript:void(0)" class="btnChk" data-download="txt,xlsx,shp" data-key="'+list[i].resource_id+'" data-schema="'+list[i].user_id+'" data-execute_id="'+list[i].execute_id+'"  data-state="'+list[i].state+'" data-subject="'+list[i].data_name +'" data-title="'+list[i].description +'"></a></td>';
						if(list[i].kor_data_nm != undefined && list[i].kor_data_nm !=''){
							html +=			'<td class="td01 ellipsis"><p>'+list[i].kor_data_nm+'</p></td>';
						}else{
							html +=			'<td class="td01 ellipsis"><p>'+list[i].description+'</p></td>';
						}
						
						html +=		'</tr>';
						html +=		'<tr>';
						html +=			'<td></td>';
						html +=			'<td class="td02">'+list[i].data_create_time+' ('+list[i].data_size+')</td>';
						html ==		'</tr>';
						html +=		'<tr>';
						html +=			'<td></td>';
						html +=			'<td class="td03">[ 데이터파일 유형 ]</td>';
						html ==		'</tr>';
						html +=	'</table>';	
						html +=			'<a href="javascript:void(0)" data-state="'+list[i].state+'" data-type="coord" data-download="txt,xlsx,shp"  class="btnView" data-key="'+list[i].resource_id+'" data-title="'+list[i].description +'">데이터 상세보기</a>'
						html += 	'</div>';
					// mng_s 2019. 06. 07 j.h.Seok
					// BPlace 에서 수급된 소스로 나의 데이터 관리 페이지에서 비정상 동작 하는 문제 발생하여 원복
					// 해당 목록 조회 쿼리(myData.xsql - getMyDataList)에 category4 가 하드코딩 되어 있는데 구조적인 문제로 보임, 확인 필요
//					}else if(list[i].category4 == "SOP2017" || list[i].category4 == "ANALYSIS_2017"){
					}else if(list[i].category4 == "SOP2016" || list[i].category4 == "ANALYSIS_2016"){
						
						//분석 데이터
						if (list[i].state == "END") {
							html += '<li class="t03" data-id="'+list[i].resource_id+'">';
							html += 	'<div class="rela">';
							html +=	'<div class="triangle">';
							html += 		'<a href="javascript:void(0)" class="btnTree on">위치</a>';
							html += 		'<a href="javascript:void(0)" class="btnSGIS">SGIS</a>';
								
							if (list[i].fav_yn == "Y"){
								html += 	'<a href="javascript:void(0)" class="btnFav on">즐겨찾기</a>';
							}else{
								html += 	'<a href="javascript:void(0)" class="btnFav">즐겨찾기</a>';
							}
							if (list[i].inst_share_yn == "Y"){
								html += 	'<a href="javascript:void(0)" class="btnShare on">공유</a>';
							}else{
								html += 	'<a href="javascript:void(0)" class="btnShare">공유</a>';
							}
							
						}else {
							html += '<li class="t04" data-id="'+list[i].execute_id+'">';
							html += 	'<div class="rela">';
							html +=	'<div class="triangle">';
							html += 		'<a href="javascript:void(0)" class="btnTree on">위치</a>';
						}
						
						html +=	'</div>';
						html +=	'<table class="clist01">';
						html +=		'<tr>';
						html +=			'<td><a href="javascript:void(0)" class="btnChk" data-download="txt,xlsx,shp" data-execute_id="'+list[i].execute_id+'" data-key="'+list[i].resource_id+'" data-schema="'+list[i].user_id+'" data-execute_id="'+list[i].execute_id+'" data-state="'+list[i].state+'" data-subject="'+list[i].data_name +'" data-title="'+list[i].description +'"></a></td>';
						if(list[i].kor_data_nm != undefined && list[i].kor_data_nm !=''){
							html +=			'<td class="td01 ellipsis"><p>'+list[i].kor_data_nm+'</p></td>';
						}else{
							html +=			'<td class="td01 ellipsis"><p>'+list[i].description+'</p></td>';
						}
						html +=		'</tr>';
						html +=		'<tr>';
						html +=			'<td></td>';
						html +=			'<td class="td02">'+list[i].start_time+' ('+list[i].data_size+')</td>';
						html ==		'</tr>';
						html +=		'<tr>';
						html +=			'<td></td>';
						html +=			'<td class="td03">[ '+$myDataManagement.util.getAnalysisNm(list[i].analysis_type)+' ]</td>';
						html +=		'</tr>';
						html +=	'</table>';
						
						switch(list[i].state) {
							case "END":	//분석성공
								html +=	'<a href="javascript:void(0)" data-state="'+list[i].state+'" data-type="analysis" data-download="txt,xlsx,shp" class="btnView" data-key="'+list[i].resource_id+'" data-title="'+list[i].description +'">분석된 결과보기</a>';
								break;
							case "RUNNING":	//분석중
								html +=	'<a href="javascript:void(0)" data-state="'+list[i].state+'" data-type="analysis" data-download="txt,xlsx,shp" class="btnView" data-key="'+list[i].resource_id+'" data-title="'+list[i].description +'">분석 진행중</a>';
								break;
							case "FAIL":	//분석실패
								html +=	'<a href="javascript:void(0)" data-state="'+list[i].state+'" data-type="analysis" data-download="txt,xlsx,shp" class="btnView" data-key="'+list[i].resource_id+'" data-title="'+list[i].description +'">분석 실패</a>';
								break;
							default:
								break;
							}
						html += 	'</div>';
						
					}else {
						
						//지오코딩 미 진행 데이터
						html += '<li class="t02" data-id="'+list[i].resource_id+'">';
						html += 	'<div class="rela">';
						html +=	'<div class="triangle">';
						html += 		'<a href="javascript:void(0)" class="btnFolder on">원본</a>';
						if(list[i].fav_yn == "Y"){
							html += 		'<a href="javascript:void(0)" class="btnFav on">즐겨찾기</a>';
						}else{
							html += 		'<a href="javascript:void(0)" class="btnFav">즐겨찾기</a>';
						}
						if(list[i].inst_share_yn == "Y"){
							html += 		'<a href="javascript:void(0)" class="btnShare on">공유</a>';
						}else{
							html += 		'<a href="javascript:void(0)" class="btnShare">공유</a>';
						}
						html +=	'</div>';

							
						html +=	'<table class="clist01">';
						html +=		'<tr>';
						html +=			'<td><a href="javascript:void(0)" class="btnChk" data-download="txt,xlsx" data-key="'+list[i].resource_id+'" data-execute_id="'+list[i].execute_id+'" data-state="'+list[i].state+'" data-subject="'+list[i].data_name +'" data-title="'+list[i].description +'"></a></td>';
						if(list[i].kor_data_nm != undefined && list[i].kor_data_nm !=''){
							html +=			'<td class="td01 ellipsis"><p>'+list[i].kor_data_nm+'</p></td>';
						}else{
							html +=			'<td class="td01 ellipsis"><p>'+list[i].description+'</p></td>';
						}
						html +=		'</tr>';
						html +=		'<tr>';
						html +=			'<td></td>';
						html +=			'<td class="td02">'+list[i].data_create_time+' ('+list[i].data_size+')</td>';
						html ==		'</tr>';
						html +=		'<tr>';
						html +=			'<td></td>';
						html +=			'<td class="td03">[ 지오코딩 유형 ]</td>';
						html ==		'</tr>';
						html +=	'</table>';	
							
						html +=			'<a href="javascript:void(0)" data-state="'+list[i].state+'" data-type="data" data-download="txt,xlsx" class="btnView" data-key="'+list[i].resource_id+'">데이터 상세보기</a>';
						html += 	'</div>';
					}
					html += '</li>';
				}
				
				$("#myDataList").html("");
				$("#myDataList").html(html);
				
				//제목이 한줄이면 중앙정렬 수행
				$(".ellipsis>p").each(function() {
					var height = $(this).height();
					if (height < 54) {
						$(this).css("line-height", "54px");
					}
				});
				
				//분석결과 또는 데이터상세보기 버튼 선택 시
				$(".btnView").off().on("click",function(){
					var resource_id = $(this).data("key");
					var type = $(this).data("type");
					
					switch(type) {
						case "data":	//원본데이터
						case "coord": //위치데이터
							$myDataManagement.ui.dataDetail(resource_id);
							break;
						case "analysis": //분석데이터
							switch ($(this).data("state")) {
								case "END": 
									location.href= contextPath+"/view/analysis/resultMap?id="+resource_id;
									break;
								case "RUNNING":
									$message.open("알림", "현재 분석 진행중에 있습니다.<br/>분석이 완료되면 결과를 볼 수 있습니다.");
									break;
								case "FAIL":
									$message.open("알림", "알 수 없는 이유로 분석에 실패하였습니다.<br/>해당 항목을 삭제하고, 다시 시도해 주세요.");
									break;
								default:
									break;
							}
							break;
						default:
							break;
					}
				});
				
				
				//check
				$(".btnChk").off().on("click", function(){
					if($(this).hasClass("on")){
						$(this).removeClass("on");
					}else{
						$(this).addClass("on");
					}
				});
				
				//막기
				$(".btnFav").off().on("click",function(){
					$myDataManagement.ui.favorite(this);
				});
				
				$(".btnShare").off().on("click",function(){
					$myDataManagement.ui.share(this);
				});
				
				
				$(".btnSGIS").off().on("click",function(){
					/*$myDataManagement.ui.sgisInfo(this);*/
					//수정부분
					//doSendSgis
					//var resource_id
					var scheme = $("#user_id").html();
					var resource_id = $(this).parent().parent().parent().data("id");
					console.log($(this).parent().parent().parent().data("id"));
					
					
					$myDataManagement.ui.doSendSgis(scheme,resource_id);
				})
				
				
				//paging
				var page = $myDataManagement.ui.currentPage;
				var showPageCount = 10;
				var showList = Number($("#cntSelectBox").val());
				
				var totalPageCount = Math.ceil( total / showList);
				var pageSize = Math.ceil(totalPageCount/showPageCount);
				var pageList = Math.ceil(page / showPageCount);
				if(pageList < 1){
					pageList = 1;
				}else if(pageList > pageSize){
					pageList = pageSize;
				}
				
				//시작 페이지
				var startPage = ((pageList -1)*showPageCount)+1;
				if(startPage == 0){
					startPage = 1;
				}
				//엔드페이지
				var endPage = startPage + showPageCount-1;

				if(endPage > totalPageCount ){
					endPage = totalPageCount;
				}
				
			
				html = "<span id='pageNavigation'>";
				if(startPage == 1){
					//비활성화
					//html += "<a class='number' data-type='firstPage'>"
					//html +="《</a>";
					//html += "<a class='number' data-type='prevPage'>"
					//html +="&lt;</a>";
				}else{
					//활성화
					html += "<a class='number' data-type='firstPage' data-id="+1+" href='javascript:$myDataManagement.ui.getReqMyDataList("+1+")'>"
					html +="<<</a>";
					html += "<a class='number' data-type='prevPage' href='javascript:$myDataManagement.ui.getReqMyDataList("+Number(Number(startPage)-1)+")' data-id="+Number(Number(startPage)-1)+">"
					html +="&lt;</a>";
				}
				
				for(var i = startPage ; i <= endPage; i++){
					var active = "";
					if( i == page){
						//현재 페이지
						active = "active";
						html +="<a class='number current' href='javascript:$myDataManagement.ui.getReqMyDataList("+i+")' title='Page "+i+"' >"+i+"</a>";
					}else{
						//이외의 페이지
						html +="<a class='number' href='javascript:$myDataManagement.ui.getReqMyDataList("+i+")' title='Page "+i+"' >"+i+"</a>";
					}
					//html +="<li class='"+active+"' data-id="+i+" data-type='number'>";
					//html +="<a class='number' href='javascript:$myDataManagement.ui.getReqMyDataList("+i+")' title='Page "+i+"' >"+i+"</a>";
					//html +="</li>";
				}
				if(endPage == totalPageCount){
					//비활성화
					//html += "<a class='number' data-type='nextPage'>"
					//html +="&gt;</a>";
					//html += "<a class='number' data-type='lastPage'>"
					//html +="》</a>";
				}else{
					//활성화
					html += "<a class='number' data-type='nextPage' href='javascript:$myDataManagement.ui.getReqMyDataList("+Number(Number(endPage)+1)+")' data-id="+Number(Number(endPage)+1)+">"
					html +="&gt;</a>";
					html += "<a  data-type='lastPage' data-id='"+ totalPageCount + "' href='javascript:$myDataManagement.ui.getReqMyDataList("+totalPageCount+")'>"
					//html += "<a class='number' data-type='lastPage' data-id="+totalPageCount+">"
					html +=">></a>";
				}
				
				
				html +="</span>";
				
				paging.html(html);
				
			},
			
			dataDetail : function(resource_id){
				var prevPageNumber = $myDataManagement.ui.currentPage;
				var prevSearchStandard = $myDataManagement.ui.standard;
				var prevSerarchWord = $myDataManagement.ui.searchWord;
				var prevViewCnt = $("#cntSelectBox").val(); 
				location.href=contextPath+"/view/myData/myDataDetail?prevPageNumber="+prevSerarchWord+"&prevSearchStandard="+prevSearchStandard+"&prevSerarchWord="+prevSerarchWord+"&prevViewCnt="+prevViewCnt+"&resource_id="+resource_id;
			},
			
			
			deleteData : function(){
				
				
				var deleteCheckers = $(".mydataList li .rela .btnChk.on");
				var deleteDatas = new Array();
				
				for(var i = 0 ; i < deleteCheckers.length; i++){
					var dataId = $(deleteCheckers[i]).data("key");
					if(dataId != "0"){
						deleteDatas.push(dataId);
						if($(deleteCheckers[i]).data("execute_id") != undefined){
							deleteDatas.push($(deleteCheckers[i]).data("execute_id"));
						}
					}else{
						console.log($(deleteCheckers[i]).data("execute_id"));
						deleteDatas.push($(deleteCheckers[i]).data("execute_id"));
					}
					
					
					
				}
				
				if(deleteDatas.length < 1){
					$message.open("알림", "삭제할 데이터를 선택 해 주십시오." );
				}else{
					$message.open("알림", deleteCheckers.length + " 개의 데이터를 삭제 하시겠습니까?",
							btns = [
								{
									title : "삭제",
									
									func : function(opt){
										$myDataManagement.request.deleteDatas(deleteDatas);
										opt.close();
									}
								},
								{
									title : "취소",
									func : function(opt){
										opt.close();
									}
									
								}

							]
					
					);
					
					
				}
				
			},
			
			copyData : function(){
				var copys = $(".mydataList li .rela .btnChk.on");
				
				if(copys.length == 0){
					$message.open("알림", "복사할 대상을 하나 선택해주세요" );
				}else if(copys.length > 1){
					$message.open("알림", "복사할 대상을 하나만 선택해주세요" );
				}else{
					var dataId = $(copys).data("key");
					var schema = $(copys).data("schema");
					var data_nm = $(copys).data("subject");
					var execute_id = $(copys).data("execute_id");
					var html = "<div>";
					
					html +="<table>";
					html +=		"<tr>";
					html +=			"<td>";
					html +=			"복사 대상 데이터";
					html +=			"</td>";
					html +=			"<td>";
					html +=			"<input type='text' id='ori_copy_data_nm' class='inp' value='"+data_nm+"' disabled>";
					html +=			"</td>";
					html +=		"</tr>";
					html +=		"<tr>";
					html +=			"<td>";
					html +=			"복사 이름";
					html +=			"</td>";
					html +=			"<td>";
					html +=			"<input type='text' id='copy_data_nm' class='inp'>";
					html +=			"</td>";
					html +=		"</tr>";
					html +="</table>";
					html +="<input type='hidden' id='copy_schema' value='"+schema+"'>";
					html +="<input type='hidden' id='copy_data_id' value='"+dataId+"'>";
					html +="<input type='hidden' id='copy_execute_id' value='"+execute_id+"'>";
					html +="</div>";
					
					
					$message.open("복사",html,btns=[
						{
							title : "복사",
							func : function(opt){
								var copy_data_id = $(".dialog").find("#copy_data_id").val();
								var copy_schema = $(".dialog").find("#copy_schema").val();
								var copyNm = $(".dialog").find("#copy_data_nm").val();
								var oriName = $(".dialog").find("#ori_copy_data_nm").val();
								var execute_id = $(".dialog").find("#copy_execute_id").val();
								if(copyNm == ""){
									$message.open("알림", "데이터 명을 입력해주세요");
								}else{
									$myDataManagement.request.dataCopy(copy_data_id, copyNm, copy_schema, oriName, execute_id);
									opt.close();
								}
								
							}
						},
						{
							title : "취소",
							func : function(opt){
								opt.close();
							}
						}
						
					]);
					
				}
			},
			
			downLoad : function(){
				var downLoad = $(".mydataList li .rela .btnChk.on");
				if(downLoad.length < 1){
					$message.open("알림", "다운로드할 대상을 하나 이상 선택해주세요" );
				}else{
					var downloadDataList = [];
					downLoad.each(function() {
						var resource_id = $(this).data("key");
						var table_nm = $(this).data("subject");
						var format = $(this).data("download");
						var data_nm = $(this).data("title");
						
						downloadDataList.push({
							"resource_id" : resource_id,
							"table_nm" : table_nm,
							"format" : format,
							"data_nm" : data_nm
						});
					});
					
					var scheme = $("#user_id").html();
					$commonDataFunc.ui.doMultiFileDownLoad(downloadDataList, scheme);
				}
			},
			
			favorite : function(obj){
				var data_id = $(obj).parent().parent().parent().data("id");
				if($(obj).hasClass("on")){
					$(obj).removeClass("on");
					
					$myDataManagement.request.favorite("N" , data_id);
				}else{
					$(obj).addClass("on");
					$myDataManagement.request.favorite("Y" , data_id);
				}
			},
			
			share : function(obj){
				var data_id = $(obj).parent().parent().parent().data("id");
				if($(obj).hasClass("on")){
					$(obj).removeClass("on");
					
					$myDataManagement.request.share("N" , data_id);
				}else{
					$(obj).addClass("on");
					$myDataManagement.request.share("Y" , data_id);
				}
			},
			
			/**
			 * 
			 * @name         : doSendSgis
			 * @description  : SGIS 전송신청을 체크를 수행한다.
			 * @date         : 2018. 11. 06. 
			 * @author	     : 최재영
			 * @history 	 :	2018.11.07 권차욱 수정
			 * @param user_id : 사용자아이디
			 * @param resource_id :  데이터 리소스 아이디
			 * @param callback :  콜백함수
			 */
			doSendSgis : function(user_id, resource_id, callback) {
				$commonDataFunc.request.doReqCheckTransfer(user_id, resource_id, function(res) {
					$commonDataFunc.ui.showSgisInfo(res);
				});
			},
			
		/*	sgisInfo : function(obj){
				
				console.log("cli")
				
				var info = $(obj).parent().parent().parent();
				
				if($(info).hasClass("t03")){
					var data_id = $(info).data("id");
					$myDataManagement.request.checkTransfer(data_id);
				}else if($(info).hasClass("t01")){
					$message.open("알림" , "데이터파일 유형은 SGIS 전송기능을 사용할 수 없습니다.");
				}
			},*/
			
			/*showSgisInfo : function(res){
				console.log(res);
				var status = res.status;
				var resource = res.resource;
				var data_nm = res.resource.data_nm;
				//REQ , RET , GRA
				if(res.info.cnt == 0){
					var title = "SGIS 전송 신청";
					var html = "";
					
					html +=			'<div class="pcont sgis">';
					//html +=				'<p class="t01">SGIS 전송 신청</p>';
					html +=				'<div>'
					html +=					'<table class="sgisSendTable">'
					html +=						'<colgroup><col width="100px"/><col width/></colgroup>'
					//html +=						'<colgroup><col width="20%"/><col width="20%"/><col width="60%"/></colgroup>'
					html +=						'<tr><th>신청이름 </th>'
					html +=							'<td><input type="text" name="open_data_nm" class="inp" ></td>'
					html +=						'</tr>'
					html +=						'<tr><th>서비스명 </th>'
					html +=							'<td><select name="info_link_srv_nm" class="inp select10" >'
					html +=								'<option value="살고싶은 우리동네">살고싶은 우리동네</option>'
					html +=							'</select></td>'
					html +=						'</tr>'
					html +=						'<tr><th>분야 </th>'
					html +=							'<td><select name="info_link_srv_realm" class="inp select10" >'
					html +=								'<option value="자연">자연</option>'
					html +=								'<option value="주택">주택</option>'
					html +=								'<option value="지역인구">지역인구</option>'
					html +=								'<option value="안전">안전</option>'
					html +=								'<option value="생활편의교통">생활편의교통</option>'
					html +=								'<option value="교육">교육</option>'
					html +=								'<option value="복지문화">복지문화</option>'
					html +=							'</select></td>'
					html +=						'</tr>'
					html +=					'</ul>'
					html +=				'</div>'
					html +=			'</div>';
					
					

					$message.open(title, html, btns = [
						{
							title : "신청",
							func : function(opt){
								var info_link_srv_nm = $(".dialog").find("select[name='info_link_srv_nm']").val();
								var info_link_srv_realm = $(".dialog").find("select[name='info_link_srv_realm']").val();
								var open_data_nm = $(".dialog").find("input[name='open_data_nm']").val(); 
								if(open_data_nm == ""){
									$message.open("알림","신청이름을 입력해주세요.");
								}else{
									var data = {
											action_name : data_nm,
											kairos_table_name : data_nm,
											save_type : "APPEND",
											open_data_nm : "",
											info_link_srv_nm : info_link_srv_nm,
											info_link_srv_realm : info_link_srv_realm,
											SYS_URL : "",
											SYS_CD : "S"
									}
									
									
									$myDataManagement.request.reqTransfer(resource.resource_id,data);
									
									//resource
									opt.close();
								}
								
								
							}
						},
						{
							title : "취소",
							func : function(opt){	
								opt.close();
							}
							
						}
					]);
					
				}else{
					console.log(res);
					var step = res.info.req.procs_state_cd;
					var title = "SGSIS+ 전송상태";
					var data_nm = res.resource.data_nm;
					var resource_id = res.resource.resource_id;
					
					var html ="";
					switch(step){
						case "REQ" :
							//신청
							html +=		'<div class="popStatus" id="popStatus02">'
							html +=			'<div class="pcont sgis">';
							html +=				'<p class="t01">살고 싶은 우리동네(분야)로 전송 신청이 접수 되었습니다</p>';
							html +=				'<ul class="pstatusList sts02">';
							html +=					'<li class="al">전송신청</li>';
							html +=					'<li class="ac">검토중</li>';
							html +=					'<li class="ar">전송완료</li>';
							html +=				'</ul>';
							html +=			'</div>';
							html +=		'<div class="dialog_btns" style="">'
							html +=			'<button class="def-btn" id="cancelButton">전송취소</button>'
							html +=			'<button class="def-btn" id="closeButton">취소</button>'
							html +=		'</div>'
							
							html +=		'</div>'
							
							break;
						case "GRA" :
							//승인
							html +=		'<div class="popStatus" id="popStatus03">'
								html +=			'<div class="pcont sgis">';
								html +=				'<p class="t01">살고 싶은 우리동네(분야)로 전송 완료</p>';
								html +=				'<ul class="pstatusList sts03">';
								html +=					'<li class="al">전송신청</li>';
								html +=					'<li class="ac">검토중</li>';
								html +=					'<li class="ar">전송완료</li>';
								html +=				'</ul>';
								html +=			'</div>';
								html +=		'<div class="dialog_btns" style="">'
								html +=			'<button class="def-btn" id="cancelButton">전송취소</button>'
								html +=			'<button class="def-btn" id="closeButton">취소</button>'
								html +=		'</div>'
								
								html +=		'</div>'
									
							
							break;
						case "RET" :
							//거절
							html +=		'<div class="popStatus" id="popStatus03">'
							html +=		'<div class="pcont sgis">';
							html +=			'<p class="t01">살고 싶은 우리동네(분야)로 전송 신청이 거절</p>';
							html +=				'<ul class="pstatusList sts01">';
							html +=					'<li class="al">재 전송</li>';
							html +=					'<li class="ac">검토중</li>';
							html +=					'<li class="ar">전송완료</li>';
							html +=				'</ul>';
							html +=		'</div>';
							html +=		'<div class="dialog_btns" style="">'
							html +=			'<button class="def-btn" id="retryButton">재전송</button>'
							html +=			'<button class="def-btn" id="closeButton">취소</button>'
							html +=		'</div>'
							
						
							html +='</div>'
							
							
							
							break;
					}
					$(html).dialog({
						title : title,
						width : "439px",
						height : "303px"
					});
					
					var popup = $(".dialog");

					//전송 취소
					$(popup).find("#cancelButton").off().on("click",function(){
						$myDataManagement.request.cancelReqTransfer(resource_id,data_nm,popup);
					});
					//닫기 
					$(popup).find("#closeButton").off().on("click",function(){
						$(popup).find(".dialog_close").trigger("click");
					});
					//재 요청
					$(popup).find("#retryButton").off().on("click",function(){
						$myDataManagement.request.retryReqTransfer(resource_id,data_nm,popup);
					});
					
				}
			
			}*/
			
			
	};
	
	$myDataManagement.util = {
			/**
			 * 
			 * @name         : getAnalysisNm
			 * @description  : 분석타입명을 가져온다.
			 * @date         : 2019. 01. 03. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type : 분석타입
			 */
			getAnalysisNm : function(type) {
				var name = "";
				switch(type) {
					case "BOUNDARY": //경계분석
						name = "경계분석";
						break;
					case "VORONOI": //보로노이분석
						name = "보로노이 다이어그램";
						break;
					case "BUFFER": //버퍼분석
						name = "버퍼분석";
						break;
					case "LQ":	 //입지계수
						name = "입지계수분석";
						break;
					case "SPATIAL":	 //공간자기상관분석
						name = "공간자기 상관분석";
						break;
					case "OPERATION": //데이터간연산분석
						name = "데이터간 연산분석";
						break;
					default:
						break;
				}
				return name;
			}
	};
	
	$myDataManagement.event = {
			init : function(){
				/*$('.select01, .select').styler({
					select : {
						search : {
							limit : 10
						}
					}
				});*/
				var search_standard = $("#search_standard").val(); // 메인화면 링크용 값
				
				if(search_standard != null && search_standard != ''){
					$myDataManagement.ui.standard = search_standard;
					$myDataManagement.ui.searchWord = '';
					//$myDataManagement.ui.getReqMyDataList(1);
					
					$myDataManagement.event.setUIEvent();
					var resultCnt = $("#cntSelectBox").val();
					$myDataManagement.request.doReqMyDataList(0,resultCnt,$myDataManagement.ui.gridMyDataList);
					
					$("#standard").val(search_standard).prop("selected", true);

					var selectedText = $("#standard option:selected").text();
					$(".jq-selectbox__select-text").text(selectedText);
					
				}else{
					$myDataManagement.event.setUIEvent();
					var resultCnt = $("#cntSelectBox").val();
					//standard
					//이게 빠진듯 싶네
					//초기화 안할경우
					
					$myDataManagement.ui.standard = $("#standard").val();
					$myDataManagement.ui.searchWord = $("#seachWord").val();
					var searchIdx = Number($("#searchIdx").val());
					var endIdx = Number($("#endIdx").val());
					if(endIdx == 0){
						endIdx = resultCnt;
					}
					$myDataManagement.ui.currentPage = Number($("#currentPage").val());
					if($myDataManagement.ui.currentPage == 0){
						$myDataManagement.ui.currentPage = 1;
					}
					$myDataManagement.ui.standard = $("#startStandard").val();
					$myDataManagement.ui.searchWord = $("#startSearchWord").val();
					$("#seachWord").val($myDataManagement.ui.searchWord);
					//초기화
					//$("#seachWord").val("");
					$myDataManagement.request.doReqMyDataList(searchIdx,endIdx,$myDataManagement.ui.gridMyDataList);
					
				}
				
				
				$("#deleteButton").off().on("click", function(){
					$myDataManagement.ui.deleteData();
				});
				
				$("#copyButton").off().on("click", function(){
					$myDataManagement.ui.copyData();
				});
				
				
				$("#downLoadButton").off().on("click", function(){
					$myDataManagement.ui.downLoad();
				});
				
				$(".btnUpload").off().on("click", function(){
					location.href = contextPath+"/view/myData/myDataCreate.do";
				});
				
				
			},
			
			setUIEvent : function(){
				$("#cntSelectBox").off().on("change",function(){
					var cnt = $(this).val();
					$("#cntSelectBox-styler>.jq-selectbox__select>.jq-selectbox__select-text").text(cnt + "개 보기");
					//page변경을 초기화 시켜준다.
					$("#currentPage").val(1);
					$("#searchIdx").val(0);
					$("#endIdx").val(cnt);
					$myDataManagement.ui.currentPage = 1;
					$myDataManagement.ui.getReqMyDataList($myDataManagement.ui.currentPage);
				});
				
				$("#searchButton").off().on("click",function(){
					$myDataManagement.ui.standard = $("#standard").val();
					$myDataManagement.ui.searchWord = $("#seachWord").val();
					$myDataManagement.ui.getReqMyDataList(1);
					
					// mng_s 2019. 06. 03 j.h.Seok
					var log_param = "searchButton";
					log_param += ", Category - " + $("#standard option:checked").text();
					log_param += ", word - " + $myDataManagement.ui.searchWord;
					
					$log.srvLogWrite("Z0", "03", "02", "02", "", log_param);
				});
				
				$("#standard").off().on("change",function(){
					$myDataManagement.ui.standard = $("#standard").val();
					$myDataManagement.ui.searchWord = $("#seachWord").val();
					$myDataManagement.ui.getReqMyDataList(1);
					
					// mng_s 2019. 06. 03 j.h.Seok
					var log_param = "categoryChange";
					log_param += ", Category - " + $("#standard option:checked").text();
					log_param += ", word - " + $myDataManagement.ui.searchWord;
					
					$log.srvLogWrite("Z0", "03", "02", "02", "", log_param);
				});
				
				$("#seachWord").keydown(function(e) {
					if (e.keyCode == 13) {
						$myDataManagement.ui.standard = $("#standard").val();
						$myDataManagement.ui.searchWord = $("#seachWord").val();
						$myDataManagement.ui.getReqMyDataList(1);
						
						// mng_s 2019. 06. 03 j.h.Seok
						var log_param = "searchEnterKey";
						log_param += ", Category - " + $("#standard option:checked").text();
						log_param += ", word - " + $myDataManagement.ui.searchWord;
						
						$log.srvLogWrite("Z0", "03", "02", "02", "", log_param);
					}
				});
				
			},
			
			
	}
	$myDataManagement.request = {
			
			/**
			 * 
			 * @name         : doReqMyDataList
			 * @description  : 나의데이터 정보를 조회한다.
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			doReqMyDataList : function(startIdx,resultCnt,callback){
				var options = {
						isBeforSend : false,
						params : {
							startIdx : startIdx,
							resultCnt : resultCnt,
							standard : $myDataManagement.ui.standard,
							searchWord : $myDataManagement.ui.searchWord
						}
				};
				
				$("#startStandard").val($myDataManagement.ui.standard);
				$("#startSearchWord").val($myDataManagement.ui.searchWord);
				
				$ajax.requestApi(contextPath+"/api/myData/getMyDataList.do",options,function(res){
					switch(parseInt(res.errCd)){
						case 0 : 
							if(res.result.length > 0){
								callback(res.result);
							}else if(res.result.length == 0){
								$("#myDataList").hide();
								$("#myDataPage").hide();
								$("#myDataEmpty").show();
							}
							break;
						case -100 : 
								$message.open("알림",res.errMsg);
							break;
						default : 
							break;
					}
				});
			},
			
			
			/**
			 * 
			 * @name         : deleteDatas
			 * @description  : 데이터 삭제
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			deleteDatas : function(deleteDatas){
				console.log(deleteDatas);
				var options = {
						isBeforSend : true,
						params : {
							datas : deleteDatas
						}
				}
				
				$ajax.requestApi(contextPath+"/api/myData/deleteMyDataList.do",options,function(res){
					//doReqMyDataList
					switch(parseInt(res.errCd)){
					case 0 : 
						
						var log_param = "";
						
						for(var i = 0; i < res.result.data_nm.length; i++) {
							if(i != 0) {
								log_param += ", ";
							}
							log_param += "[Resource_id - " + options.params.datas[i];
							log_param += ", Table_name - " + res.result.data_nm[i];
							log_param += "]";
						}
						
						$log.srvLogWrite("Z0", "03", "02", "05", "", log_param);
						
						$message.open("완료", "데이터 삭제가 완료 되었습니다.");
						$myDataManagement.ui.getReqMyDataList(1);
						
						break;
					case -100 : 
						$message.open("오류", "데이터 삭제가 실패 하였습니다.")
						break;
					default : 
						break;
					}
				});
				
			},
			
			/**
			 * 
			 * @name         : getMyDataInfo
			 * @description  : 나의 데이터 정보 읽기
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			getMyDataInfo : function(resource_id,schema,table_name,view_cnt){
				$.ajax({
					type : "POST",
					url : contextPath+"/api/myData/preViewTable.do",
					contentType : "application/json",
					dataType : "json",
					data : JSON.stringify({
						resource_id : resource_id,
						view_cnt : 5,
						schema : schema,
						table_name : table_name,
						
					}),
					success : function(res){
						console.log(res);
						var info = res.info;
						var dataList = res.dataList;
						var columnList = res.columnList;
						//$dataCreateMain.ui.gridMyDataInfo(info,dataList,columnList);
					},
					error : function(xhr, textStatus , error){
						
					},
					complete : function(data){
						
					}
					
				});
			},
			
			
			/**
			 * 
			 * @name         : dataNameExists
			 * @description  : 데이터명 중복 검사
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			dataNameExists : function(copy_nm,oriName,callback){
				console.log(copy_nm);
				$.ajax({
					type : "POST",
					url : contextPath+"/api/myData/dataNameExists.do",
					/*contentType : "application/json",*/
					dataType : "json",
					data : {
						copy_nm : copy_nm
					},
					beforeSend : function(){
						
					},
					success : function(res){
						console.log(res);
						callback(res.schema,res.data_nm,oriName);
					},
					error : function(xhr, textStatus , error){
						
					},
					complete : function(data){
						
					}
					
				});
			},
			
			
			/**
			 * 
			 * @name         : dataCopy
			 * @description  : 데이터명 중복 검사
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			dataCopy : function(resource_id , description , schema, oriName, execute_id){
				$.ajax({
					type : "POST",
					url : contextPath+"/api/myData/copyData.do",
					dataType : "json",
					beforeSend : function(){
						$mask.show();
					},
					data : {
						resource_id : resource_id,
						description : description,
						schema : schema,
						oriName : oriName,
						execute_id : execute_id
					},
					
					success : function(res){
						$mask.hide();
						console.log(res);
						
						var log_param = "Original_name - " + res.oriName;
						log_param += ", Copy_name - " + res.copy_nm;
						log_param += ", Schema - " + res.schema;
						$log.srvLogWrite("Z0", "03", "02", "03", "", log_param);
						
						$message.open("완료", "데이터 복사가 완료 되었습니다.");
						$myDataManagement.ui.getReqMyDataList(1);
					},
					error : function(xhr, textStatus , error){
						$mask.hide();
						$message.open("오류 발생" , "데이터 복사중 오류가 발생 하였습니다.");
					},
					complete : function(data){
						
					}
					
				})
			},
			
			
			/**
			 * 
			 * @name         : downLoad
			 * @description  : 데이터 다운로드
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			
			downLoad2 : function(downLoadList,schema){
				$.ajax({
					type : "POST",
					url : contextPath+"/api/myData/downLoad.do",
					dataType : "json",
					beforeSend : function(){
						$mask.show();
					},
					data :  {
							list : JSON.stringify(downLoadList),
							schema : schema
						},
					success : function(res){
						$mask.hide();
						var url = contextPath+"/api/myData/getFile.do?fileName="+encodeURI(res.fileName)+"&schema="+res.schema;
						window.open(url,"_self","enabled");
						
						
					},
					error : function(xhr, textStatus , error){
						$mask.hide();
						$message.open("오류 발생" , "다운로드중 오류가 발생 하였습니다.");
					},
					complete : function(data){
						
					}
					
				})
			},
			
			/**
			 * 
			 * @name         : favorite
			 * @description  : 즐겨찾기
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			favorite : function(yn , data_id){
				$.ajax({
					type : "POST",
					url : contextPath+"/api/myData/favorite.do",
					dataType : "json",
					beforeSend : function(){
						$mask.show();
					},
					data :  {
							yn : yn,
							resource_id : data_id
						},
					success : function(res){
						console.log(res);
						$mask.hide();
						
					},
					error : function(xhr, textStatus , error){
						$mask.hide();
						$message.open("오류 발생" , "즐겨찾기 변경 오류가 발생 하였습니다.");
					},
					complete : function(data){
						
					}
					
				})
			},
			/**
			 * 
			 * @name         : share
			 * @description  : 공유
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			share : function(yn , data_id){
				$.ajax({
					type : "POST",
					url : contextPath+"/api/myData/share.do",
					dataType : "json",
					beforeSend : function(){
						$mask.show();
					},
					data :  {
							yn : yn,
							resource_id : data_id,
							user_id : $("#user_id").text()
						},
					success : function(res){
						console.log(res);
						$mask.hide();
						
					},
					error : function(xhr, textStatus , error){
						$mask.hide();
						$message.open("오류 발생" , "즐겨찾기 변경 오류가 발생 하였습니다.");
					},
					complete : function(data){
						
					}
					
				})
			},
			
			
			/**
			 * 
			 * @name         : checkTransfer
			 * @description  : 데이터의 현재 SGIS 전송 상태 점검
			 * @date         : 2018. 10. 24. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			/*checkTransfer : function(resource_id){
				$.ajax({
					type : "POST",
					url : contextPath+"/api/dataTransfer/checkTransfer.do",
					dataType : "json",
					beforeSend : function(){
						$mask.show();
					},
					data :  {
						user_id : $("#user_id").text(),
						resource_id : resource_id
						
					},
					success : function(res){
						console.log(res);
						$mask.hide();
						//showSgisInfo
						if(res.errCd == "0"){
							$myDataManagement.ui.showSgisInfo(res);
						}else{
							$message.open("오류 발생" , "SGIS 전송 정보 조회 오류가 발생 하였습니다.");
						}
						
					},
					error : function(xhr, textStatus , error){
						$mask.hide();
						$message.open("오류 발생" , "SGIS 전송 정보 조회 오류가 발생 하였습니다.");
					},
					complete : function(data){
						
					}
					
				});
			},*/
			
			/**
			 * 
			 * @name         : reqTransfer
			 * @description  : SGIS 전송
			 * @date         : 2018. 10. 24. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			reqTransfer : function(resource_id , data){
				$.ajax({
					type : "POST",
					url : contextPath+"/api/dataTransfer/reqTransfer.do",
					dataType : "json",
					beforeSend : function(){
						$mask.show();
					},
					data :  {
						resource_id : resource_id,
						data : JSON.stringify(data),
					},
					success : function(res){
						console.log(res);
						$mask.hide();
					},
					error : function(xhr, textStatus , error){
						$mask.hide();
						$message.open("오류 발생" , "SGIS 전송신청 오류가 발생 하였습니다.");
					},
					complete : function(data){
						
					}
					
				});
			},
			
			
			/**
			 * 
			 * @name         : cancelReqTransfer
			 * @description  : 전송 취소
			 * @date         : 2018. 10. 24. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			cancelReqTransfer : function(resource_id , data_nm,popup){
				$.ajax({
					type : "POST",
					url : contextPath+"/api/dataTransfer/cancelReqTransfer.do",
					dataType : "json",
					beforeSend : function(){
						$mask.show();
					},
					data :  {
						resource_id : resource_id,
						data_nm : data_nm,
					},
					success : function(res){
						console.log(res);
						$(popup).find(".dialog_close").trigger("click");
						$mask.hide();
					},
					error : function(xhr, textStatus , error){
						$(popup).find(".dialog_close").trigger("click");
						$mask.hide();
						$message.open("오류 발생" , "SGIS 전송 취소 오류가 발생 하였습니다.");
					},
					complete : function(data){
						
					}
					
				});
			},
			
			/**
			 * 
			 * @name         : retryReqTransfer
			 * @description  : 전송 요청
			 * @date         : 2018. 10. 24. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			retryReqTransfer : function(resource_id , data_nm , popup){
				$.ajax({
					type : "POST",
					url : contextPath+"/api/dataTransfer/retryReqTransfer.do",
					dataType : "json",
					beforeSend : function(){
						$mask.show();
					},
					data :  {
						resource_id : resource_id,
						data_nm : data_nm,
					},
					success : function(res){
						console.log(res);
						$(popup).find(".dialog_close").trigger("click");
						$mask.hide();
					},
					error : function(xhr, textStatus , error){
						$(popup).find(".dialog_close").trigger("click");
						$mask.hide();
						$message.open("오류 발생" , "SGIS 전송 취소 오류가 발생 하였습니다.");
					},
					complete : function(data){
						
					}
					
				});
			},
			
	}
}(window, document));