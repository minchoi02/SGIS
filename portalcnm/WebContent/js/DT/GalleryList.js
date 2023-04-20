//운영
var galleryImgPath =  location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '')+"/upload/gallery/galleryView/"; //통계갤러리
var preViewImgPath =  location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '')+"/upload/gallery/preView/"; //활용사례
//테스트
//var imgPath = "/s-portalcnm/upload/gallery/";

//운영
var imgIconPath = "";
//테스트
//var imgIconPath = "./../include";

(function(W, D){
	var EXCELLENT_CASE_SLCTN_YN = getParameter('EXCELLENT_CASE_SLCTN_YN');
	var SUPPORT_TYPE = getParameter('SUPPORT_TYPE');
	var SEARCH  = getParameter('SEARCH');
	var SEARCH_WORD = getParameter('SEARCH_WORD');
	var total = getParameter("total");
	var SRV_TYPE = getParameter('SRV_TYPE');
	W.$GalleryManage = W.$GalleryManage || {};
	var id_datagrid = '#searchResultTable';
	
	$(document).ready(function() {
		srvLogWrite("L0", "03", "08", "01", "", "");
		document.getElementById('resetForm').reset();
		
		//if($(".gvSlideArea").length) popSlide02(); //2017.04.03 썸네일 이상표출 이슈
		if($(".gdContScrollBox").length) {
			$(".gdContScrollBox").mCustomScrollbar({axis:"xy"});
		}
		if($(".gvText").length) {
			$(".gvText").mCustomScrollbar({axis:"xy"}); 
		}
		if($(".gvReplyListBox").length) {
			$(".gvReplyListBox").mCustomScrollbar({axis:"xy"});
		}
		
		$("body").on("click",".rightClose", function(){
			$("#gvSlideArea").html("");
			$('.dialogGtype').hide();
    	});
		
		$('#searchWord').validatebox({
			validType: 'cnmInput'
		});
		
		if ($.fn.validatebox){
			$.fn.validatebox.defaults.missingMessage = '이 입력 항목은 필수 입력 항목 입니다.';
			$.fn.validatebox.defaults.rules.length.message = '입력 길이는 필수{0}와{1} 사이.';
		}
		
		$('#searchButton').click(function(){	
			srvLogWrite("L0", "03", "08", "01", "", "");
			var SEARCH_WORD = $('#SEARCH_WORD').val().replace(/(^\s*)|(\s*$)/g, '');	
			$(id_datagrid).datagrid('load',getQueryParamsObj(SEARCH_WORD));
		});
		
		$('#exclncButton').click(function(){
			srvLogWrite("L0", "03", "08", "02", "", "");
			var row = $(id_datagrid).datagrid('getChecked');
			if (row == null || row.length == 0) {
				getConfirmPopup('알림', '선택된 데이터가 없습니다. 다시 선택해 주세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
			} else if (row.length == 1) {
				var dataId = row[0].DATA_ID;
				var exclncCaseYn = row[0].EXCELLENT_CASE_SLCTN_YN;
		    	var tempText = "우수사례로 선정하시겠습니까?";
				
				if(exclncCaseYn == "Y" && dataId != null){
					tempText = "우수사례 선정을 취소하시겠습니까?";
				} 
				
				getConfirmPopup('확인', tempText, 'confirm');
				$('#ok_confirmPopup').click(function(){
			    	$galleryManage.exclnc(dataId, exclncCaseYn);
					confirmPopupRemove();
				});
				$('#cancel_confirmPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});

			} else if (row.length > 1) {
				getConfirmPopup('알림', '다중선택을 할 수 없습니다. 한 항목만 선택해주세요', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
			}
		});		
		
		$('#dispYnButton').click(function(){
			srvLogWrite("L0", "03", "08", "03", "", "");
			var row = $(id_datagrid).datagrid('getChecked');
			if (row == null || row.length == 0) {
				getConfirmPopup('알림', '선택된 데이터가 없습니다. 다시 선택해 주세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
			} else if (row.length == 1) {
				var dataId = row[0].DATA_ID;
				var dispYn = row[0].DISP_YN;
				var srv_type = row[0].SRV_TYPE;
		    	var tempText = "공개로 설정하시겠습니까?";
		    	var tmpSrvType = "1";
				
		    	if (dataId != null) {
		    		if(dispYn == "Y"){
						tempText = "비공개로 설정하시겠습니까?";
						switch(parseInt(srv_type)) {
							case 1:	//일반갤러리 공개
								tmpSrvType = "3";
								break;
							case 2:	//활용갤러리 공개
								tmpSrvType = "4";
								break;
							default:
								tmpSrvType = "1";
								break;
						}
					}else {
						switch(parseInt(srv_type)) {
							case 3:	//일반갤러리 공개
								tmpSrvType = "1";
								break;
							case 4:	//활용갤러리 공개
								tmpSrvType = "2";
								break;
							default:
								tmpSrvType = "3";
								break;
						}
					}
		    	}
				
						
				getConfirmPopup('확인', tempText, 'confirm');
				$('#ok_confirmPopup').click(function(){
			    	$galleryManage.reqDispYn(dataId, tmpSrvType);
					confirmPopupRemove();
				});
				$('#cancel_confirmPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});

			} else if (row.length > 1) {
				getConfirmPopup('알림', '다중선택을 할 수 없습니다. 한 항목만 선택해주세요', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
			}
		});	
		
		$(id_datagrid).datagrid({
			loadMsg: '처리중 입니다, 기다리 십시요...',
			pagination: true,
		   	nowrap: false,
		   	checkOnSelect: false,
		    columns:[[ 
		        {field:'DATA_ID',hidden: true},
		        {field:'SRV_TYPE',hidden: true},
		        {field:'checkbox',checkbox: true},
		        {field:'R',title:'번호',align:'center',width:50},
				{field:'SUPPORT_TYPE',title:'분류',align:'center',width:130,
		        	formatter:function(value, row, index){
		        		if(value != null && value == "B0"){
		        			value="우리동네 생활업종";
		        		} else if(value != null && value == "J0"){
		        			value="살고싶은 우리동네";
		        		} else if(value != null && value == "A0"){
		        			value="대화형 통계지도";
		        		} else if(value != null && value == "C0"){
		        			value="통계주제도";
		        		} else if(value != null && value == "T0"){
		        			value="기술업종 통계지도";
		        		} else if(value != null && value == "E0"){
		        			value="활용사례";
		        		} else { //2017.04.03 기타항목 추가
		        			value="기타";
		        		}
		        		 
		        		return value;
		        	}
				},
				{field:'TITLE',title:'제목',align:'center',width:220,
					formatter: function(value, row, index){
		        		if(value != null && value != ''){
		        			value =  "<a onclick='popupOpen(\""+ row.DATA_ID+"\",\""+row.SRV_TYPE+"\")' style='color:#4a4a4a; cursor:pointer;' onmouseover='$(this).css(\"text-decoration\", \"underline\")' onmouseout='$(this).css(\"text-decoration\", \"none\")'>" + value;
		        		}
		        		return value;
					}
				},
				{field:'EXCELLENT_CASE_SLCTN_YN',title:'우수사례 여부',align:'center',width:100,
					formatter:function(value, row, index){
						if(value != null && value == 'Y'){
							value="예";
						}
					   else if(value!= null && value == 'N'){
							value="아니오";
						}
						return value;
					}
				},
				{field:'DISP_YN',title:'공개여부',align:'center',width:80,
					formatter:function(value, row, index){
						if(value != null && value == 'Y'){
							value="공개";
						}
					   else if(value!= null && value == 'N'){
							value="비공개";
						}
						return value;
					}
				},
				{field:'HITS',title:'조회수',align:'center',width:50},
				{field:'WRITER',title:'작성자',align:'center',width:70},
				{field:'REG_DT',title:'등록일',align:'center',width:90},
				]],
			onLoadError: function(){
				getConfirmPopup('알림', '일시적인 오류로 검색에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
			},
			onClickRow: function(rowIndex, rowData){
				$(id_datagrid).datagrid('unselectAll');
				$(id_datagrid).datagrid('selectRow', rowIndex);
			},
			onCheck: function(rowIndex, rowData){
				$(id_datagrid).datagrid('unselectAll');
				var checkedRows = $(id_datagrid).datagrid('getChecked');
				for(var i = 0; i < checkedRows.length; i++){
					var rowIndex = $(id_datagrid).datagrid('getRowIndex', checkedRows[i]);
					$(id_datagrid).datagrid('selectRow', rowIndex);
				}
			},
			onLoadSuccess: function(data){
				var total = data.total;
				$("#totalQueryCount").html(total);
				var pageSize = $(page).pagination('options').pageSize;
				if(total < 1){
					$('#noSearchResult').show();
					$(page).pagination({ 
				        pageSize: 10,
				        displayMsg: '',
				        showPageList: false,
				        showRefresh: false,
				        layout: [],
				        links: 5
					});
				} else{
					$('#noSearchResult').hide();
					if(Math.ceil(total / pageSize) > 5){
						$(page).pagination({ 
					        pageSize: 10,
					        displayMsg: '',
					        showPageList: false,
					        showRefresh: false,
					        layout: ['first','prev','links','next','last'],
					        links: 5
						 });
					} else if(Math.ceil(total / pageSize) <= 5){
						$(page).pagination({ 
					        pageSize: 10,
					        displayMsg: '',
					        showPageList: false,
					        showRefresh: false,
					        layout: ['links'],
					        links: 5
						 });
					}
				}
			},
			onBeforeLoad: function(param){
				$('#noSearchResult').hide();
				
				if(param.ACTIVE_YN){
					ACTIVE_YN_SEND = param.ACTIVE_YN;
				} else{
					ACTIVE_YN_SEND = 'ALL';
				}
			},
			loadFilter: function(data){	
				if(data.rows == null){
					if(data.errCd == -1){
						getConfirmPopup('알림', data.errMsg, 'alert');
						$('#ok_alertPopup').click(function(){
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function(){
							confirmPopupRemove();
						});
					}
					data.rows = new Array();
				}else {
					var tmpDispYn = "Y";
					for (var i=0; i<data.rows.length; i++) {
						switch(parseInt(data.rows[i].SRV_TYPE)) {
							case 1:
							case 2:
								tmpDispYn = "Y";
								break;
							case 3:
							case 4:
								tmpDispYn = "N";
								break;
							default:
								tmpDispYn = "Y";
								break;
						}		
						data.rows[i]["DISP_YN"] = tmpDispYn;		
					}
				} 
				return data;
			},
			url:contextPath +"/ServiceAPI/DT/GalleryManage/searchGallery.json"
		});
		
		var page = $(id_datagrid).datagrid('getPager');  
		$(page).pagination({ 
	        pageSize: 20,
	        displayMsg: '',
	        showPageList: false,
	        showRefresh: false,
	        layout: [],
	        links: 5
		});
		
		$galleryManage = {
				selectImgIdx : 0,
				galleryImgList : new Array(),
				galleryData : null,
				collectionGalleryPaging : function (totalCount, currentIndex) {
					var pageSize = 4;										// 페이지 당
																			// 항목 개수
					var totalPage = Math.ceil( totalCount / pageSize);		// 전체
																			// 페이지 수
					$('.pagenation .paging').paging({
						current : currentIndex,
						max : totalPage,
						itemClass : 'page',
						itemCurrent : 'current',
						format : '{0}',
						next : '<img src="./../include/img/ico/ico_next01.png" alt="다음" />',
						prev : '<img src="./..//img/ico/ico_prev01.png" alt="이전" />',
						first : '<img src="./..//img/ico/ico_first01.png" alt="처음" />',
						last : '<img src="./..//img/ico/ico_last01.png" alt="마지막" />',
						onclick : function(e,page){							// 페이지
																			// 선택 시
							$galleryManage.currentPageIndex = page;
							$galleryManage.selectGalleryList();
						}
					});
				},
				// 갤러리 목록 조회
				selectGalleryList : function () {
					var sopPortalGalleryObj = new sop.portal.resultGallery.api();
					sopPortalGalleryObj.addParam("page_num", $resultGallery.currentPageIndex);
					
					if($resultGallery.searchType != null && $resultGallery.searchType.length >0){
						sopPortalGalleryObj.addParam("searchType", $resultGallery.searchType);
					}	
					if($resultGallery.srvType != null && $resultGallery.srvType.length >0){
						sopPortalGalleryObj.addParam("srv_type", $resultGallery.srvType);
					}			
					if($resultGallery.orderType != null && $resultGallery.orderType.length >0){
						sopPortalGalleryObj.addParam("orderType", $resultGallery.orderType);
					}
					if($resultGallery.searchWord != null && $resultGallery.searchWord.length > 0) {
						sopPortalGalleryObj.addParam("searchWord", $resultGallery.searchWord);
					}
					sopPortalGalleryObj.request({
						method : "POST",
						async : false,
						url : contextPath + "/ServiceAPI/DT/GalleryManage/resultGalleryAllCountList.json"
					});
					
					$('body, html').animate({scrollTop: 0}, 450);
				},
				exclnc : function(dataId, exclncCaseYn){
					var sopOpenApiExclncObj = new sop.openApi.exclnc.api();
					sopOpenApiExclncObj.addParam('DATA_ID', dataId);
					sopOpenApiExclncObj.addParam('EXCELLENT_CASE_SLCTN_YN', exclncCaseYn);
					sopOpenApiExclncObj.request({
				        method : "POST",
				        async : false,
				        url : contextPath +"/ServiceAPI/DT/GalleryManage/exclncGallery.json"
				    });
				},
				
				reqDispYn : function(dataId, srvType){
					var sopOpenApiExclncObj = new sop.openApi.exclnc.api();
					sopOpenApiExclncObj.addParam('DATA_ID', dataId);
					sopOpenApiExclncObj.addParam('SRV_TYPE', srvType);
					sopOpenApiExclncObj.request({
				        method : "POST",
				        async : false,
				        url : contextPath +"/ServiceAPI/DT/GalleryManage/updateDispYnGallery.json"
				    });
				},
				
				//imgIcon 조회
				selectImgIconList : function(data_id, img_id){
					$(".mapIconBox").remove();
					var sopOpenApiImgIconListObj = new sop.openApi.imgIconList.api();
					sopOpenApiImgIconListObj.addParam("DATA_ID", data_id);
					sopOpenApiImgIconListObj.addParam("IMG_ID", img_id);
					
					sopOpenApiImgIconListObj.request({
						method : "POST",
						async : true, //2017.04.03
						url : contextPath + "/ServiceAPI/DT/GalleryManage/getGalleryImgIconList.json"
					});
				},
				
				//선택된 이미지 조회
				selectShowImage : function(idx){
					var selectImg = $galleryManage.galleryImgList[idx];
					$galleryManage.selectImgIdx = idx;
					if(selectImg != null){
						var paramInfo = JSON.parse(selectImg.PARAM_INFO);

					//2017.04.03 갤러리 팝업창 이미지 찌그러짐 보정
					//$("#mapArea").css("background-image",'url('+ galleryImgPath +paramInfo.fileName+'),url("../../img/ico/pic_testmap02.jpg")');
					var image = new Image();
					image.src = galleryImgPath +paramInfo.fileName;
					image.onload = function() {
						var pWidth = $(".gcMap").width();
						var pHeight = $(".gcMap").height();
						this.width = (this.width * pHeight)/this.height;
						var margin = -(this.width - pWidth)/2;
						$("#mapArea").css("background-image", "url("+this.src+")");
						$("#mapArea").css({
							"width" : this.width + "px",
							"margin-left" : margin + "px"
						});
					};
					image.onerror = function() {
						$("#mapArea").css("background-image",'url("../../img/ico/pic_testmap02.jpg")');
						$("#mapArea").css({"width" : "710px", "margin-left" : "0px"});
					};
					
						var tempMap = '<a href="' + galleryImgPath + paramInfo.fileName + '" style="z-index:20002" class="gvDownload" download><img src="./../include/img/ico/ico_down05.png" alt="다운로드" /></a>';
						$("#mapArea").html(tempMap);
						$galleryManage.selectImgIconList(selectImg.DATA_ID, selectImg.IMG_ID);
					}
				},
				
				playGallery : function(){
					//setInterval
					/*$resultGallery.selectImgIdx = Number($resultGallery.selectImgIdx +1);*/
					$(".gvDownloadPreView").hide(); //2017.04.30 플레이시, 이미지 다운로드 숨김
					$galleryManage.selectImgIdx = 0;
					$galleryManage.selectShowImage($galleryManage.selectImgIdx);
					$galleryManage.intervalContent = setInterval(function(){$galleryManage.intervalPlayGallery();},3000);
				},
				stopPlay : function(){
					$(".gvDownloadPreView").show(); //2017.04.03 플레이시, 이미지 다운로드 숨김
					clearInterval($galleryManage.intervalContent);
				},
				
				intervalPlayGallery : function(){
					/*if($galleryManage.selectImgIdx >= $galleryManage.galleryImgList.length-1){
						clearInterval($galleryManage.intervalContent);
						return;
					}
					$galleryManage.selectImgIdx = Number($galleryManage.selectImgIdx +1);
					$galleryManage.selectShowImage($galleryManage.selectImgIdx);*/
					
					//2017.04.03 플레이 수정
					$galleryManage.selectImgIdx = Number($galleryManage.selectImgIdx +1);
					
					if ($galleryManage.selectImgIdx >  $galleryManage.galleryImgList.length-1){
						$galleryManage.selectImgIdx = 0;
					}
					$galleryManage.selectShowImage($galleryManage.selectImgIdx);
					
				},
				
				linkTooltip : function(cls){
					$(cls).tooltip({ 
						open: function( event, ui ) {
							 ui.tooltip.css("z-index", "50000");
						},
						position: {
						      my: "left+10 top", at: "left bottom", 
						      collision : "flip",
						      using: function( position, feedback ) {
						    	  if ($(feedback.target)[0].element[0].outerHTML.indexOf("data-subj") != -1) {
						    		  $( this ).css( position ).prepend("<span class='subj'></span>");
						    	  }else {
						    		  $( this ).css( position ); 
						    	  }
						    	  
						          $( "<div>" )
						            .addClass( "arrow" )
						            .addClass( feedback.vertical )
						            .addClass( feedback.horizontal )
						            .appendTo( this );
						      }
						},
						content: function () {
							var title = $(this).attr("title");
							title = title.replace(/&lt;p&gt;/gi, '');
							title = title.replace(/&lt;p&gt;/gi, '');
							title = title.replace(/&lt;/gi, '<');
							title = title.replace(/&gt;/gi, '>');
							title = title.replace(/&quot;/gi, '');
							$(this).attr("title", title); 
							return $(this).prop('title');
				        }
					});
				}
		};
		
		(function() {
		    $class("sop.openApi.exclnc.api").extend(sop.cnm.absAPI).define({
		    	onSuccess : function(status, res) {
		        	var result = res.result;
		            if(res.errCd == "0") { 
		            	if(result != null){
		            		getConfirmPopup('알림', result.msg, 'alert');
		    				$('#ok_alertPopup').click(function(){
		    					confirmPopupRemove();
		    				});
		    				$('#close_confirmPopup').click(function(){
		    					confirmPopupRemove();
		    				});
		            	}
		            	$(id_datagrid).datagrid('reload');
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
		            getConfirmPopup('알림', '일시적인 오류로 검색에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
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
			$class("sop.openApi.requestDetail.api").extend(sop.cnm.absAPI).define({
				onSuccess : function(status, res) {
					var result = res.result.galleryMap;
					var imgResult = res.result.galleyImgMap;
					var galleyPollList = res.result.galleyPollList;
					var galleyReplyList = res.result.galleyReplyList;
					$galleryManage.galleryImgList = imgResult;
					$galleryManage.galleryData = result;
					
					if(result.SRV_TYPE == "2"){ //활용사례갤러리
						if(imgResult.length > 0){
							$("#titleTxt2").html(result.TITLE);
							$("#regDtTxt2").html("작성일:"+result.REG_DT);
							$("#writerTxt2").html(result.MEMBER_NM);
							$("#titleTxt2").attr("title", result.TITLE);
							
							var galleryImgItem = imgResult[0];
							var galleryImgHtml = "";
							
							var apiCallUrl = galleryImgItem.API_CALL_URL;
							var paramInfo = JSON.parse(galleryImgItem.PARAM_INFO);
							if(paramInfo.userName){$("#userName").html(paramInfo.userName);}
							if(paramInfo.section){ $("#sectionTxt").html(paramInfo.section); }
							if(paramInfo.usePurpose){ $("#usePurposeTxt").html(paramInfo.usePurpose); }
							if(paramInfo.applicationField){ $("#applicationFieldTxt").html(paramInfo.applicationField); }
							if(paramInfo.dataUse1){ $("#dataUse1Txt").html(paramInfo.dataUse1); }
							if(paramInfo.dataUse2){ $("#dataUse2Txt").html(paramInfo.dataUse2); }
							if(paramInfo.content){ $("#contentTxt").html(paramInfo.content); }
							if(paramInfo.siteUrl){ $("#siteUrlTxt").html(paramInfo.siteUrl); }
							
							if(paramInfo.refFileList){
								var fileListHtml = '<span class="t01">참고자료</span>';
								for(var i = 0; i < paramInfo.refFileList.length; i ++) {
									fileListHtml += '<a href="' + preViewImgPath + paramInfo.refFileList[i].saveName +'" class="t02" download>'+paramInfo.refFileList[i].fileName+'</a>';
								}
								$("#fileList").html(fileListHtml);
							}
							
							if(paramInfo.preViewImg){
								var preViewImgHtml = "";	
								var tmpImgName = "";
								if (paramInfo.preViewImg.saveFileName.indexOf(".png") != -1) {
									tmpImgName = preViewImgPath + paramInfo.preViewImg.saveFileName;
								}else {
									tmpImgName = "../../img/ico/pic_testmap01.jpg";
								}
 								preViewImgHtml += '<img src="' + tmpImgName + '" width="100%" height="100%" />';
								preViewImgHtml +='<a href="' + tmpImgName + '" class="gdDownload" download><img src="./../include/img/ico/ico_down05.png" alt="다운로드" /></a>';
								$(".gdMapArea").html(preViewImgHtml);
							}
							
							if ($(".gdContScrollBox").length) {
								$(".gdContScrollBox").mCustomScrollbar({axis:"xy"});
								$(".gdContScrollBox").mCustomScrollbar("update");
							}
						}
					} else { //통계갤러리
						$("#titleTxt").html(result.TITLE);
						$("#regDtTxt").html("작성일:"+result.REG_DT);
						$("#writerTxt").html(result.MEMBER_NM);
						$("#titleTxt").attr("title", result.TITLE);
						
						var SUPPORT_TYPE = result.SUPPORT_TYPE;
						if(SUPPORT_TYPE == "B0"){
							$('#titleTxt').addClass("gwon01");
						}
						else if(SUPPORT_TYPE == "j0"){
							$('#titleTxt').addClass("gwon02");
						}
						else if(SUPPORT_TYPE == "A0"){
							$('#titleTxt').addClass("gwon03");
						}
						else if(SUPPORT_TYPE == "C0"){
							$('#titleTxt').addClass("gwon04");
						}
						else if(SUPPORT_TYPE == "T0"){
							$('#titleTxt').addClass("gwon05");
						}
						//2017.04.03 심볼추가
						else if(SUPPORT_TYPE == "E0"){
							$('#titleTxt').addClass("gwon06");
						}
						else {
							$('#titleTxt').addClass("gwon06");
						}

						$galleryManage.selectShowImage(0);
						
						//2017.04.03 썸네일 이상 표출
						//======================START=========================//
						$("#gvSlideArea").attr("class", "gvSlideArea");
						if ($("#gvSlideArea").length) {
							$("#gvSlideArea").slick({  
								slidesToShow: 5,
								infinite:false,
								arrows:false,
								dots: false
							}); 
							$("body").on("click",".gvPrev",function(e){	 
								$('#gvSlideArea').slick("slickPrev");	
							});		
							$("body").on("click",".gvNext",function(e){		
								$('#gvSlideArea').slick("slickNext");	
							});	 
						}
						//======================END=========================//
						
						for(var i = 0; i < imgResult.length; i++){				
							var paramInfo = JSON.parse(imgResult[i].PARAM_INFO);
							var item = '<div class="item" name="slickImage">';
							item += 		'<div class="rela">';
							item += 			'<a href="javascript:void(0)" class="showImg" onclick="$galleryManage.selectShowImage('+i+');"><img src="' + galleryImgPath +paramInfo.fileName+'" onError="this.src=\'../../img/ico/testimg01.png\'" width="100px" height="62px;" /></a>';
							item += 		'</div>';
							item += 	'</div>';
							//$("#gvSlideArea").append(item);
							$("#gvSlideArea").slick('slickAdd',item); //2017.04.03 썸네일 이상 표출
						}
						
						
						
						//mapArea 설정
						if(imgResult.length > 0){
							$galleryManage.selectImgIconList(imgResult[0].DATA_ID, imgResult[0].IMG_ID);
						}
						
						var surveyObject = new Object();
						var surveyList = new Array();
						for(var i = 0; i < galleyPollList.length; i ++){
							var poll = galleyPollList[i];
							if(i == 0){
								surveyObject.surveyId = poll.SURVEY_SURV_ID;
								surveyObject.survey_title = poll.SURVEY_TITLE;
								surveyObject.end_dt = poll.SURVEY_SURV_END_DT;
								surveyObject.surv_type = poll.SURVEY_TYPE;
							}
							
							var pollDetail = new Object();
							pollDetail.ans_serial = poll.ANS_SERIAL;
							pollDetail.ans_content = poll.ANS_CONTENT;
							surveyList.push(pollDetail);
						}
						
						surveyObject.surveyList = surveyList;
					}

					//TODO #titleTxt의 클래스 값(gwon01 ~ gwon05) 변경, gvTitle는 남기고
					//$("#postContentTxt").html(result.CONTENT);
					result.CONTENT = replaceAll(result.CONTENT, '\n', '<br/>');
					var postContent = "<div id='contentField' style='height:70px;overflow:hidden;'>"
						postContent += "<div style='width:250px;'>"
						postContent += result.CONTENT;
						postContent += "</div>"
						postContent += "</div>"
					$("#postContentTxt").html(postContent);
					$("#contentField").mCustomScrollbar({axis:"y", scrollButton: {enable:true}});
					$("#contentField").mCustomScrollbar("update");
					
					
					if("Y" == result.LIKE_YN){
						$(".like").addClass("on")
					}else{
						$(".like").removeClass("on")
					}

					var tagHtml = "";
					var tagArr = null;
					if (result.TAG != undefined) {
						tagArr = result.TAG.split(",");
						for(var i = 0; i < tagArr.length; i++) {
							tagHtml += '<span>#'+$.trim(tagArr[i])+'</span>'
						}
						$(".gvTag").html(tagHtml);
					}
					
					var galleryHtml = "";					
					galleryHtml += '<span class="s01">' + result.HITS + '</span>';
					galleryHtml += '<span class="s02">' + result.LIKE_CNT  + '</span>';
					galleryHtml += '<span class="s03">' + result.REPLY_CNT + '</span>';

					$(".gvIconEventBox .t01").html(galleryHtml)
					
					//설문조사//////////////////////////
					if(galleyPollList.length > 0){
						var surveyTitle = galleyPollList[0].SURVEY_TITLE;
						var surveySurvId = galleyPollList[0].SURVEY_SURV_ID;
						var surveySurvEndDt = galleyPollList[0].SURVEY_SURV_END_DT.replace(/"/gim, "");
					
						var totalVoteCnt = 0;
						var totalVoteYn = false;
						for(var i = 0; i < galleyPollList.length; i++) {
							var galleryPollDetailItem = galleyPollList[i];
							totalVoteCnt += galleryPollDetailItem.VOTE_CNT;
							if(totalVoteYn == false && "Y" == galleryPollDetailItem.VOTE_YN){
								totalVoteYn = true;
							}
						}
						
						var galleryPollDetailHtml = "";
							
						galleryPollDetailHtml += '<div class="gvVoteSubj" id="' + surveySurvId + '">';
						galleryPollDetailHtml += 	'<span class="t01">' + surveyTitle + '</span>';
						galleryPollDetailHtml += 	'<span class="t02">' + surveySurvEndDt + '까지 설문완료</span>';
						galleryPollDetailHtml += '</div>';
						for(var i = 0; i < galleyPollList.length; i ++) {
							var galleryPollDetailItem = galleyPollList[i];
							
							var voteYn = "01";							
							if("Y" != galleryPollDetailItem.VOTE_YN){
								voteYn = "02";
							}
							
							var votePer = 0;
							if(0 != totalVoteCnt){
								votePer = Math.round(galleryPollDetailItem.VOTE_CNT / totalVoteCnt);
								votePer = votePer * 100;
							}
							galleryPollDetailHtml += '<div class="gvVoteBox' + voteYn + '" id="' + galleryPollDetailItem.ANS_SERIAL + '" style="background-size:'+votePer+'%">';
							galleryPollDetailHtml += 	'<span class="t01">' + galleryPollDetailItem.ANS_CONTENT + '</span>';
							galleryPollDetailHtml += 	'<span class="t02">' + galleryPollDetailItem.VOTE_CNT+ ' 명(' + votePer + '%)</span>';
							galleryPollDetailHtml += '</div>';
						}
						if(totalVoteYn){
							galleryPollDetailHtml += '<a href="#" class="btnVote">다시 투표하기</a>';
						}else{
							galleryPollDetailHtml += '<a href="#" class="btnVote">투표하기</a>';
						}
						$(".gvVote").empty();
						$(".gvVote").html(galleryPollDetailHtml);
						$("#voteBox").mCustomScrollbar({axis:"y"});
						$("#voteBox").mCustomScrollbar("update");
						
						if(galleryPollDetailItem.ANS_SERIAL == undefined){
							$(".gvVote").hide();
						}else{
							$(".gvVote").show();
						}
					}
					
					var galleryReplyHtml = "";
					for(var i = 0; i < galleyReplyList.length; i ++) {
						var galleryReplyListItem = galleyReplyList[i];
						var content = galleryReplyListItem.REPLY_CONTENT.replace(/\n/gim, "</br>");
						var writer = galleryReplyListItem.REPLY_WRITER.replace(/\n/gim, "</br>");
						var memberNm = galleryReplyListItem.MEMBER_NM.replace(/\n/gim, "</br>");

						galleryReplyHtml += '<li>';
						galleryReplyHtml += 		'<span class="t01">' + memberNm  + '</span>';
						galleryReplyHtml += 		'<span class="t02">' + content + '</span>';
						galleryReplyHtml += '</li>';
					}

					$(".gvReplyList").empty();
					$(".gvReplyList").html(galleryReplyHtml);
					
					$galleryManage.linkTooltip(".ttp_title");
				},
				onFail : function(status) {
					getConfirmPopup('알림',
							'일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.',
							'alert');
					$('#ok_alertPopup').click(function() {
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function() {
						confirmPopupRemove();
					});
				}
			});
		}());
		
		//imgIcon 조회
		(function() {
			$class("sop.openApi.imgIconList.api").extend(sop.cnm.absAPI).define({
				onSuccess : function(status, res) {
					if(res.errCd == "0") {
						var result = res.result;
						var galleryImgIconListItem = result.galleyImgIconList;
						if(galleryImgIconListItem){
								$(".gviewMap").find(".imgIcon").each(function(){
									$(this).remove();
								})
								for(var i = 0; i < galleryImgIconListItem.length; i++) {
									var imgIconSrc = imgIconPath + "/img/ico/"+galleryImgIconListItem[i].ICON_NM;
									var html ="";
									if("1" ==galleryImgIconListItem[i].ICON_TYPE){
										html = '<div class="mapIconBox" name="ico"  style="z-index:20000;position:absolute;margin-top:'+Number(Number(galleryImgIconListItem[i].X_COOR)) +'px;margin-left:'+Number(Number(galleryImgIconListItem[i].Y_COOR))+'px">';
										html +='<img src="';
										html +=imgIconSrc;
										html +='" class="mapIconCont"/>';
										html +="</div>";
										
									}else if("2" ==galleryImgIconListItem[i].ICON_TYPE){
										html = '<div class="mapIconBox" name="ico"  style="z-index:20000;position:absolute;margin-top:'+galleryImgIconListItem[i].X_COOR+'px;margin-left:'+galleryImgIconListItem[i].Y_COOR+'px">'
										if(galleryImgIconListItem[i].ICON_NM =="mal01" ){
											html +='<div class="mal01">';
										}else{
											html +='<div class="mal02">';
										}
										/*html +='<textarea class="malType"></textarea></div>';*/
										html +='<span class="malType">'+galleryImgIconListItem[i].EXP+'</span></div>';
										html +='</div>';
										
									}
									$(".gviewMap").append(html);
									/*$(".gviewMap").append('<img class="imgIcon" src="' + imgIconSrc + '" style="position:absolute; left:' + galleryImgIconListItem[i].x_coor + 'px; top:' + galleryImgIconListItem[i].y_coor + 'px;">');*/
								}
						}
						
					} else {
						messageAlert.open("알림", res.errMsg);
					}				
				},
				onFail : function(status) {
					getConfirmPopup('알림',
							'일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.',
							'alert');
					$('#ok_alertPopup').click(function() {
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function() {
						confirmPopupRemove();
					});
				}
			});
		}());
	
	})
}(window, document));


function getQueryParamsObj(SEARCH_WORD){	
	var queryParamsObj = new Object();
	if(SEARCH_WORD.length > 0){
		queryParamsObj['SEARCH_WORD'] = SEARCH_WORD;
	}
	queryParamsObj['EXCELLENT_CASE_SLCTN_YN'] = $('#EXCELLENT_CASE_SLCTN_YN').val();
	queryParamsObj['SUPPORT_TYPE'] = $('#SUPPORT_TYPE').val();
	queryParamsObj['SEARCH'] = $('#SEARCH').val();
	queryParamsObj['SRV_TYPE'] = $('#SRV_TYPE').val();
	queryParamsObj['DISP_YN'] = $('#DISP_YN').val();

	return queryParamsObj;
}

function popupOpen(data_id, srv_type){
	if(srv_type == "1") { //통계갤러리 팝업
		$('#area1').show();
	} else if(srv_type == "2") { //활용사례갤러리 팝업
		$('#area2').show();
	}
	
	var sopOpenApiRequestDetailObj = new sop.openApi.requestDetail.api();
	sopOpenApiRequestDetailObj.addParam('DATA_ID', data_id);
	sopOpenApiRequestDetailObj.request({
		method : "POST",
		async : false,
		url : contextPath + "/ServiceAPI/DT/GalleryManage/getGallery.json"
	});
	
	$('body, html').animate({scrollTop: 0}, 450);
}

function popSlide02(){ 	 
	$(".gvSlideArea").slick({  
		slidesToShow: 8,
		infinite:false,
		arrows:false,
		dots: false,
		autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover : false
	}); 
	$("body").on("click",".gvPlay",function(e){	 
		$('.gvSlideArea').slick("slickPlay");	
	});		
	$("body").on("click",".gvStop",function(e){		
		$('.gvSlideArea').slick("slickPause");	
	});	
	$("body").on("click",".gvPrev",function(e){	 
		$('.gvSlideArea').slick("slickPrev");	
	});		
	$("body").on("click",".gvNext",function(e){		
		$('.gvSlideArea').slick("slickNext");	
	});	 
}

function replaceAll(str, target, replacement){
	 return str.split(target).join(replacement);
};

function goImage(){
	var bg = $("#mapArea").css('background-image');
	//error 처리를 위한 내용
	bg = bg.split(",");
	bg = bg[0];
	bg = bg.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');
	bg = bg.split("/");
	bg = bg[bg.length-1];
	bg = bg.split(".")[0];
	
	var imgObject = $galleryManage.galleryImgList[$galleryManage.selectImgIdx];
	var paramInfo = JSON.parse(imgObject.PARAM_INFO);
	var histId = paramInfo.fileName.split(".")[0];	
	var supportType = $galleryManage.galleryData.SUPPORT_TYPE;
	var linkUrl = "";
	
	
	switch (supportType) {
		case "A0":
			linkUrl =  location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '') + "/view/map/interactiveMap/bookmark?id="+histId;
			break;
		case "B0":
			linkUrl = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '') + "/view/bizStats/bizStatsMap/bookmark?id="+histId;
			break;
		case "T0":
			linkUrl = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '') + "/view/technicalBiz/technicalBizMap/bookmark?id="+histId;
			break;
		case "C0":
			linkUrl = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '') + "/view/thematicMap/thematicMapMain?id="+histId;
			break;
		case "J0":
			linkUrl = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '') + "/view/house/houseAnalysisMap?id="+histId;
			break;
	}
	
	window.open(linkUrl);
					
}
