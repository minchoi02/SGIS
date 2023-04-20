
(function(W,D){
	W.$shareBoardMain = W.$shareBoardMain || {};
	$(document).ready(function(){
		$shareBoardMain.event.init();
		$shareBoardMain.event.setUIEvent();	
	});
	
	//UI 내용작성
	$shareBoardMain.ui = {
			currentPage : Number($("#currentPage").val()),
			standard : null,
			searchWord : null,
			sortType : Number($("#sortType").val()),
			
			/**
			 * 
			 * @name         : getReqMyDataList
			 * @description  : 공유데이터 페이지 클릭
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			getReqShareBoadDataList : function(pageIdx, type){
				this.currentPage = pageIdx;
				this.sortType = type;
				var showListCount = $("#cntSelectBox").val();
				var startIdx =  showListCount * (pageIdx -1);
				$shareBoardMain.request.doReqShareBoardList(startIdx, showListCount, type);
			},
			
			/**
			 * 
			 * @name         : setShareBoardDataListViewPaging
			 * @description  : 공유게시판 페이징을 생성한다.
			 * @date         : 2018. 11. 09. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param totalCount: 데이터 갯수
			 * @param totalPage : 총페이지 갯수
			 * @param pageSize : 한페이지당 데이터 갯수
			 * @param data :데이터
			 * @papram pageIndex : 페이지 인덱스
			 */
			setShareBoardDataListViewPaging : function(totalCount, totalPage, pageSize, data, pageIndex) {
				$('#shareBoardPage').paging({
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
						var showListCount = $("#cntSelectBox").val();
						$shareBoardMain.ui.srtIdx = (page - 1) * pageSize;
						$shareBoardMain.ui.currentPage = page;
						$shareBoardMain.request.doReqShareBoardList($shareBoardMain.ui.srtIdx, showListCount);
					}
				});
			},
			
			/**
			 * 
			 * @name         : setShareBoardDataList
			 * @description  : 공유 데이터 리스트 그리기
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 : 2018.11.09. 권차욱 수정
			 */
			setShareBoardDataList : function(list){
				var html = "";
				var total = 0;
				if (list.length != 0){
					total = list[0].total;
				}
				
				//글 번호 + 데이터명 row data_name
				//데이터 설명 description
				//업로드 날짜 data_create_time
				for(var i = 0; i < list.length; i++){
					var styleInfo = $shareBoardMain.util.getSharBoardCls(list[i]);
					html += '<li class="'+styleInfo.cls+'" data-id="'+list[i].resource_id+'">';
					html += 		'<div class="rela">';
					html +=			'<div class="triangle">';
					html += 				'<a href="javascript:void(0)" class="'+styleInfo.iconCls+' on">'+styleInfo.iconNm+'</a>';
					html +=			'<a href="javascript:void(0)"  data-type="'+styleInfo.dataType+'" data-download="txt,xlsx,shp"  class="btnView" data-key="'+list[i].resource_id+'" data-no="'+list[i].share_board_no+'">데이터 상세보기</a>'
					html +=			'</div>';
					
					html +=			'<table class="clist01">';
					html +=				'<tr>';
					html +=					'<td><a href="javascript:void(0)" class="btnChk" data-download="txt,xlsx,shp" data-key="'+list[i].resource_id+'" data-schema="'+list[i].user_id+' data-state="'+list[i].state+'" data-subject="'+list[i].data_nm +'" data-title="'+list[i].description+'"></a></td>';
					
					
					if(list[i].kor_data_nm != undefined && list[i].kor_data_nm !=''){
						html +=			'<td class="td01 ellipsis"><p>'+list[i].kor_data_nm+'</p></td>';
					}else{
						html +=			'<td class="td01 ellipsis"><p>'+list[i].description+'</p></td>';
					}
					
					//html +=					'<td class="td01 ellipsis"><p>'+list[i].description+'</p></td>';
					html +=				'</tr>';
					html +=				'<tr>';
					html +=					'<td></td>';
					html +=					'<td class="td02">'+list[i].data_create_time+' ('+list[i].data_size+')</td>';
					html ==				'</tr>';
					html +=				'<tr>';
					html +=					'<td></td>';
					html +=					'<td class="td03">[ '+styleInfo.dataTypeNm+' ]</td>';
					html ==				'</tr>';
					html +=			'</table>';	
					html +=			'<div class="btnList">';
					html +=				'<a href="javascript:void(0)" data-key="'+list[i].resource_id+'" class="ico01">'+list[i].hits+'</a>';
					html +=				'<a href="javascript:void(0)" data-key="'+list[i].resource_id+'" class="ico02">'+list[i].reply_cnt+'</a>';
					html +=				'<a href="javascript:void(0)" data-key="'+list[i].resource_id+'" class="ico03 on">'+list[i].recmd_cnt+'</a>';
					html +=			'</div>'; 
					html += 		'</div>';
					html += '</li>';
				}
				$("#shareBoardList").html(html);
				
				//제목이 한줄이면 중앙정렬 수행
				$(".ellipsis>p").each(function() {
					var height = $(this).height();
					if (height < 54) {
						$(this).css("line-height", "54px");
					}
				});
				
				//이벤트 생성
				$shareBoardMain.event.setShareBoardEvent();
	
			},
			
			/**
			 * 
			 * @name         : dataDetail
			 * @description  : 공유 데이터 상세보기
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			doShareBoardDetailView : function(shareBoardNo, resourceId, type){
				window.location.href = contextPath + "/view/shareBoard/shareDataDetail?no="+shareBoardNo+"&resource_id="+resourceId + "&type=" + type; 
			},
			
			/**
			 * 
			 * @name         : doDownLoad
			 * @description  : 공유데이터 다운로드
			 * @date         : 2018. 11. 08. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			doDownLoad : function(){
				var downLoad = $(".shareboList li .rela .btnChk.on");
				
				if (downLoad.length < 1){
					$message.open("알림", "다운로드할 대상을 하나 이상 선택해주세요" );
					return;
				}else {
					var downloadDataList = [];
					
					//log generate by cis
					var log_param = "shareMainDownloads";
						
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
						
						//log generate by cis
						log_param += ", ResourceID - " + resource_id;
						log_param += ", DataNM - " + data_nm;
					});
					
					//log generate by cis
					$log.srvLogWrite("Z0", "05", "03", "00", "", log_param);
					
					var user_id = $("#user_id").html();
					$commonDataFunc.ui.doMultiFileDownLoad(downloadDataList, user_id);
				}
			},
			
			/**
			 * 
			 * @name         : doSortShareBoardList
			 * @description  : 공유게시판 목록을 정렬한다.
			 * @date         : 2018. 11. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doSortShareBoardList : function(type) {
				$("#sortType").val(type);
				this.getReqShareBoadDataList(1, type);
			}
	};
	
	$shareBoardMain.util = {
			getSharBoardCls : function(data) {
				var params = {}
				var cls, iconCls, iconNm, dataTypeNm, dataType;
				
				//위치변환데이터
				if (data.action_type == "MAPPING" ||data.action_type == "COORD" || data.action_type == "SHP") {
					cls = "t01";
					iconCls = "btnGps";
					iconNm = "위치";
					dataTypeNm = "지오코딩 유형";
					dataType = "coord";
				}
				//분석데이터
				else if (data.category4 == "SOP2016" || data.category4 == "ANALYSIS_2016") {
					cls = "t03";
					iconCls = "btnTree";
					iconNm = "분석";
					dataTypeNm = this.getAnalysisNm(data.analysis_type);
					dataType = "analysis";
				}
				//원본데이터
				else {
					cls = "t02";
					iconCls = "btnFolder";
					iconNm = "원본";
					dataTypeNm = "데이터파일 유형";
					dataType = "data";
				}
				
				return params = {
						cls : cls,
						iconCls : iconCls,
						iconNm : iconNm,
						dataTypeNm : dataTypeNm,
						dataType : dataType
				};
			},
			
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
	
	//AJAX 내용작성
	$shareBoardMain.request = { 
			
			
			/**
			 * 
			 * @name         : doReqShareDataList
			 * @description  : 공유 정보를 조회한다.
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			doReqShareBoardList : function(startIdx, resultCnt, sortType){
				var options = {
						isBeforSend : false,
						params : {
							startIdx : startIdx,
							resultCnt : resultCnt,
							standard : $("#standard").val(),//$shareBoardMain.ui.standard,
							searchWord : $("#seachWord").val()//$shareBoardMain.ui.searchWord
						}
				};
				if(sortType == undefined){
					sortType = Number($("#sortType").val());
					$(".shareboardSort").removeClass("on");
					$(".shareboardSort").eq(sortType).addClass("on");
				}
				if (sortType != undefined) {
					switch(sortType) {
						case 0:	//최신순
							options.params["sort"] = "share_board_no";							
							break;
						case 1:	//조회순
							options.params["sort"] = "hits";							
							break;
						case 2:	//추천순
							options.params["sort"] = "recmd_cnt";							
							break;
						default:
							break;
					}
				}
				
				$ajax.requestApi(contextPath+"/api/shareboard/getShareBoardList.do",options,function(res){
					switch(parseInt(res.errCd)){
						case 0 : 
							$("#shareBoardList").empty();
							var result = res.result;
							if (result.length > 0) {
								var maxCntPerPage = Number($("#cntSelectBox").val());
								var totalPage = Math.ceil( result[0].total / maxCntPerPage);
								$shareBoardMain.ui.setShareBoardDataListViewPaging(result[0].total, totalPage, maxCntPerPage, result, $shareBoardMain.ui.currentPage);
								$shareBoardMain.ui.setShareBoardDataList(result);
							}else {
								$("#shareBoardPage").hide();
								$("#shareBoardEmpty").show();
							}
							break;
						default :
							$message.open("알림",res.errMsg);
							break;
					}
				});
			},
			
			
			/**
			 * 
			 * @name         : downLoad
			 * @description  : 데이터 다운로드
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			
			downLoad : function(downLoadList,schema){
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
						var url = contextPath+"/api/myData/getFile.do";
						window.open(url,"_self","enabled");
					},
					error : function(xhr, textStatus , error){
						$mask.hide();
						$message.open("오류 발생" , "다운로드중 오류가 발생 하였습니다.");
					},
					complete : function(data){
						/*$mask.hide();*/
					}
					
				})
			},
	};
	
	//EVENT 내용작성
	$shareBoardMain.event = {
			init : function(){
				var resultCnt = $("#cntSelectBox").val();
				/*$shareBoardMain.request.doReqShareBoardList(0, resultCnt);*/
				$shareBoardMain.ui.doSortShareBoardList(0, resultCnt);
				
				//$shareBoardMain.request.doReqShareBoardList(Number($("#currentPage").val()), resultCnt);
			},
			
			setUIEvent : function(){
				
				//조회갯수 콤보박스 이벤트
				$("#cntSelectBox").on("change",function(){
					var cnt = $(this).val();
					$(this).setData(cnt);
					$("#searchIdx").val(0);
					$("#endIdx").val(cnt);
					$shareBoardMain.ui.getReqShareBoadDataList($shareBoardMain.ui.currentPage, $shareBoardMain.ui.sortType);
				});
				
				//검색버튼 이벤트
				$("#searchButton").on("click",function(){
					$("#currentPage").val(1);
					$shareBoardMain.ui.currentPage = 1;
					$shareBoardMain.ui.standard = $("#standard").val();
					$shareBoardMain.ui.searchWord = $("#seachWord").val();
					$shareBoardMain.ui.getReqShareBoadDataList(1, $shareBoardMain.ui.sortType);
					
					//log generate by cis
					var log_param = "searchButton"
					log_param += ", Category - " + $("#standard option:checked").text();
					log_param += ", word - " + $shareBoardMain.ui.searchWord;
					
					$log.srvLogWrite("Z0", "05", "02", "00", "", log_param);
				});
				
				//구분셀렉트박스 이벤트
				$("#standard").on("change",function(){
					$("#currentPage").val(1);
					$shareBoardMain.ui.currentPage = 1;
					$shareBoardMain.ui.standard = $("#standard").val();
					$shareBoardMain.ui.searchWord = $("#seachWord").val();
					$shareBoardMain.ui.getReqShareBoadDataList(1, $shareBoardMain.ui.sortType);
					
					//log generate by cis
					var log_param = "categoryChange"
					log_param += ", Category - " + $("#standard option:checked").text();
					log_param += ", word - " + $shareBoardMain.ui.searchWord;
					
					$log.srvLogWrite("Z0", "05", "02", "00", "", log_param);
				});
				
				//다운로드버튼 이벤트
				$("#downLoadButton").on("click", function(){
					$shareBoardMain.ui.doDownLoad();
				});
				
				//정렬버튼 이벤트
				$(".shareboardSort").on("click", function() {
					$(".shareboardSort").removeClass("on");
					$(this).addClass("on");
				});
				
				//검색버튼 이벤트-키보드
				$("#seachWord").keydown(function(e) {
					if (e.keyCode == 13) {
						$shareBoardMain.ui.currentPage = 1;
						$shareBoardMain.ui.standard = $("#standard").val();
						$shareBoardMain.ui.searchWord = $("#seachWord").val();
						$shareBoardMain.ui.getReqShareBoadDataList(1, $shareBoardMain.ui.sortType);
						
						//log generate by cis
						var log_param = "searchEnterKey"
						log_param += ", Category - " + $("#standard option:checked").text();
						log_param += ", word - " + $shareBoardMain.ui.searchWord;
						
						$log.srvLogWrite("Z0", "05", "02", "00", "", log_param);
					}
				});
				
			},
			
			setShareBoardEvent : function() {
				
				//체크박스 이벤트
				$(".btnChk").off().on("click", function(){
					if($(this).hasClass("on")){
						$(this).removeClass("on");
					}else{
						$(this).addClass("on");
					}
				});
				
				//공유게시판 상세페이지 이동 이벤트
				$(".btnView").off().on("click",function(){
					var resourceId = $(this).data("key");
					var shareBoardNo = $(this).data("no");
					var type = $(this).data("type");
					
					//상세페이지이동
					$shareBoardMain.ui.doShareBoardDetailView(shareBoardNo, resourceId, type);
				});
			}
	};
	
}(window,document));
