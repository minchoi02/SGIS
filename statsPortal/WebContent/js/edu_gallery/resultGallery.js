/**
 * 갤러리 조회
 */

function getImagekBookMarkPath(paramType){
	
	//alert(paramType);
	
	if(paramType == "interactiveMap"){
		return("/view/map/interactiveMap/bookmark");
	}else if(paramType == "technicalBizMap"){
		return("/view/technicalBiz/technicalBizMap/bookmark");
	}else if(paramType == "bizStatsMap"){
		return("/view/bizStats/bizStatsMap/bookmark");
	}else if(paramType == "houseAnalysisMap"){
		return("/view/house/houseAnalysisMap/bookmark");
	}else {
		if (paramType.indexOf("thematicMap") != -1) {
			return("/view/thematicMap/thematicMapMain");
		}
	}
}

function goImage(){
	//srvLogWrite('J0','04','02','00','','');
	var bg = $("#mapArea").css('background-image');
	//error 처리를 위한 내용
	bg = bg.split(",");
	bg = bg[0];
	bg = bg.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');
	bg = bg.split("/");
	bg = bg[bg.length-1];
	bg = bg.split(".")[0];
	
	var imgObject = $resultGallery.galleryImgList[$resultGallery.selectImgIdx];
	//api_call_url
	//param_info.type
	
	var paramInfo = JSON.parse(imgObject.param_info);
	var imagePath =""
		
	//alert("paramInfo.type [" + paramInfo.type);
	//alert("paramInfo.hist_id [" + paramInfo.hist_id);
	//alert("imgObject.api_call_url [" + imgObject.api_call_url);
	//alert(bg);
		
		
	if(paramInfo.type =="bookMark"){
		var histId = paramInfo.hist_id;	
		$resultGallery.selectBookMarkData(histId);
		
		
	} else if (paramInfo.type.indexOf("thematicMap") != -1) {
		imagePath = getImagekBookMarkPath(paramInfo.type);
		if(bg != "pic_testmap02" ){
			location.href = imagePath+"?id=" + bg;
		}
	} else{
		imagePath = getImagekBookMarkPath(imgObject.api_call_url);
		if(bg != "pic_testmap02" ){
			location.href = imagePath+"?id=" + bg;
		}
	}
					
}


function getSession(auth){
	if(AuthInfo.authStatus == true){
		$resultGallery.selectGalleryAllCountList();
	}
	
	/*$("#insertButton").show();*/
}

function getChildrenHeight(element) {
    var height = 0;
    element.children().each(function() {height+= $(this).height();});
    return height;
}


(function(W, D) {
	
	W.$resultGallery = W.$resultGallery || {};
	
	$(document).ready(function(){
		Kakao.init('167fc6abf0eb4717e1f3de7895a0152a');
		//Kakao.init('8e948243dde3004186d166fcb43ff5ea');
		$resultGallery.selectGalleryList();
		
		//shareData로 들어왓을경우
    	var params = {};

    	if (location.search) {
    	    var parts = location.search.substring(1).split('&');

    	    for (var i = 0; i < parts.length; i++) {
    	        var nv = parts[i].split('=');
    	        if (!nv[0]) continue;
    	        params[nv[0]] = nv[1] || true;
    	    }
    	}
    	if(params.data_id != null){
    		$resultGallery.selectDataId = params.data_id;
    		$resultGallery.selectDirect();
    	}
    	
    	
    	if(params.shareDataId != null ){
    		//params.srvType
    		$resultGallery.selectDataId = params.shareDataId;
    		
    			if(params.srvType =="statsGalleryDialog"){
    				$('#dialogDiv').attr("class", "statsGalleryDialog");
    				$('#dialogDiv').load("/view/edu_gallery/viewStatsGalleryDialog.jsp");
    				//이미지 슬라이드 재정의...
    				//아이콘 재정의....
    			}else if($(this).hasClass("useGalleryDialog")){
    				$('#dialogDiv').attr("class", "useGalleryDialog");
    				$('#dialogDiv').load("/view/edu_gallery/viewUseGalleryDialog.jsp");
    			}
    			
	    		$("#mCSB_1_container").css("width", "689px");
	    		$("#mCSB_2_container").css("width", "270px");
	    			    		
				$('body, html').animate({scrollTop: 0}, 450);
	    		$(".dialogGtype").fadeIn("slow");
    		
    		
    	}
    	
    	//searchTagName으로 들어왔을때
    	if(params.searchTagName != null ){
    		$resultGallery.serarchTagName(params.searchTagName);
    	}

    	
    	
    	
    	
    	var id = getParameter('id');
    	var srv_type = getParameter('srv_type');
    	if(id != null){
    		//mng_s 20170720_김대보(오류수정)
    		fromMainPage(id, srv_type);	
    		//mng_e 20170720_김대보(오류수정)
    	}
    	
	});
	
	
	
	function fromMainPage(fromMainID, type){
		// mng_s 2019.04.08 j.h.Seok
		//swtBtn = true;
		$("#dialogDiv").css("display","").show();
		// mng_e 2019.04.08 j.h.Seok
		
		var dataId = fromMainID;
		$resultGallery.selectDataId = dataId;
			//mng_s 20170720_김대보(오류수정)
			if(type == "2"){
				$('#dialogDiv').attr("class", "useGalleryDialog");
				//$('#dialogDiv').load("/view/edu_gallery/viewUseGalleryDialog.jsp");
			}else{
				$('#dialogDiv').attr("class", "statsGalleryDialog");
				//$('#dialogDiv').load("/view/edu_gallery/viewStatsGalleryDialog.jsp");
			}
			//mng_e 20170720_김대보(오류수정)
				
    		$("#mCSB_1_container").css("width", "689px");
    		$("#mCSB_2_container").css("width", "270px");
    		
			$('body, html').animate({scrollTop: 0}, 450);
    		$(".dialogGtype").fadeIn("slow");
		}
		
	$resultGallery.ui = {
	};
	
	$resultGallery = {
			selectDataId : null,
			currentPageIndex : 1,
			/*searchType : null,*/
			searchType : null,			// 검색 항목 ( 해시태그, 제목, 작성자 )
			searchWord : null,			// 검색어
			orderType : 'dt',			// 조회 정렬
			survey_type : null,			//설문조사 타입
			srvType : null,
			selectImgIdx : 0,
			galleryImgList : new Array(),
			intervalContent : null,
			my_teach_list : 1,          //1:체크안된 상태, 2:체크된상태
			current_pg_writer : null, //로그인한 세션 아이임.해당 페이지의 작성자 아이디 세팅(삭제하기 편집하기 보여줄지 말지 결정)
			
			// 갤러리 목록 페이징 처리
			collectionGalleryPaging : function (totalCount, currentIndex) {
				var pageSize = 6;										// 페이지 당
				
				// 항목 개수
				$("#nowCount").html("전체 " + totalCount +"개");
				var totalPage = Math.ceil( totalCount / pageSize);		// 전체
																		// 페이지 수
				
				
				$('.pagenation .edu_paging').paging({
					current : currentIndex,
					max : totalPage,
					itemClass : 'num',
					itemCurrent : 'on',
					format : '{0}',
					/*
					next : '<a class="next">다음</a>',
					prev : '<a class="prev">이전</a>',
					first : '<a class="first">처음</a>',
					last : '<a class="last">마지막</a>',
					*/
					/*
					itemClass : 'page',
					itemCurrent : 'current',
					format : '{0}',
					*/
					/*
					next : '<img src="/img/ico/ico_next01.png" alt="다음" />',
					prev : '<img src="/img/ico/ico_prev01.png" alt="이전" />',
					first : '<img src="/img/ico/ico_first01.png" alt="처음" />',
					last : '<img src="/img/ico/ico_last01.png" alt="마지막" />',
					*/
					showPrevious : true,
					showNext : true,
					next  : '<img src="/sgis_edu/resource/images/icon_btnPage03_1.png"  alt="다음"/>',
					prev  : '<img src="/sgis_edu/resource/images/icon_btnPage03_1.png"  alt="이전"/>',
					first : '<img src="/sgis_edu/resource/images/icon_btnPage03_2.png"  alt="처음"/>',
					last  : '<img src="/sgis_edu/resource/images/icon_btnPage03_2.png"  alt="마지막"/>',
					
					onclick : function(e,page){							// 페이지
																		// 선택 시
						$resultGallery.currentPageIndex = page;
						$resultGallery.selectGalleryList();
					}
				});
			},
			selectDirect : function(){
				$("body").off("click",".galleryListItem li");
				$("body").off("click",".rightClose");
				$('body').off("keyup keypress");
				$("body").off("mouseenter",".galleryListItem li");
				$("body").off("mouseleave",".galleryListItem li");
				$("body").off("click","#galleryInsertButton");
				
				if(null != $("#hidden_ss_page_info").val() && '' != $("#hidden_ss_page_info").val()){
					if($("#hidden_ss_page_info").val()=='S'){srvLogWrite('T0','02','07','09',$('#hidden_ss_school_grade').val(),'');}
					if($("#hidden_ss_page_info").val()=='T'){srvLogWrite('T0','02','07','02',$('#hidden_ss_school_grade').val(),'');}
				}
				
				var dialog689 = "689px";
				var dialog270 = "270px";
				//if(swtBtn){
					$("#dialogDiv").css("display","").show();
				//}else{
				//	dialog450 = 1;
				//	$("#dialogDiv").css("display","hidden");
				//	swtBtn = true;
				//	setTimeout(function(){
				//		dialog689 = 0;
				//		dialog270 = 0;
				//		$('#dialogDiv').attr("class","");
			    //		$('#dialogDiv').empty();
			    //		$("#dialogDiv").css("display","block");
			    //		$resultGallery.selectGalleryList();
				//	},500);
				//}
				apiLogWrite2('M0', 'M01', '외부에서 페이지 유입', document.location.href, '00', '없음');
				
	    		
	    		if(!$(this).parents("ul").hasClass("openSelect")){
	    			
	    			/*
	    			if($(this).hasClass("statsGalleryDialog")){
	    				$('#dialogDiv').attr("class", "statsGalleryDialog");
	    				$('#dialogDiv').load("/view/edu_gallery/viewStatsGalleryDialog.jsp");
	    			}else if($(this).hasClass("useGalleryDialog")){
	    				$('#dialogDiv').attr("class", "useGalleryDialog");
	    				$('#dialogDiv').load("/view/edu_gallery/viewUseGalleryDialog.jsp");
	    			}
	    			*/
	    			$('#resultGalleryList').hide();
	    			
	    			$('#dialogDiv').attr("class", "statsGalleryDialog");
	    			$('#dialogDiv').load("/view/edu_gallery/viewStatsGalleryDialog.jsp?param_ss_school_grade=" + $('#hidden_ss_school_grade').val() );
	    			
		    		//$("#mCSB_1_container").css("width", dialog689);
		    		//$("#mCSB_2_container").css("width", dialog270);
		    					    		

		    		$(".dialogGtype").fadeIn("slow");
	    		}
		    	
	    		/*
				$("body").on("click",".rightClose", function(){
		    		$('#dialogDiv').attr("class","");
		    		$('#dialogDiv').empty();
		    	});
				
				$('body').on("keyup keypress", function(e){ 
		    		if("none" != $(".dialogGtype").css("display") && "27" == e.keyCode){
		    			$('#dialogDiv').attr("class","");
		    			$('#dialogDiv').html("");
		    			$(".dialogGtype").fadeOut("fast");
		    		}
		    	});

		    	$("body").on("mouseenter",".galleryListItem li", function(){
		    		$(this).addClass("on");
		    		var imgObj = $(this).find(".rela > .map > img");
		    		var imgObjSrc = $(imgObj).attr("src");
		    		var cont = $(this).find(".rela > .maskbox > .cont > .contEtc");
		    		$(cont).find("img").css("opacity",0.3);
		    		$(cont).find(".malText").mCustomScrollbar({axis:"y"});
		    		$(cont).find(".t01").css("color","#000000");
		    		$(cont).find(".t02").css("color","#000000");
		    		var contBar = $(this).find(".rela > .maskbox > .tailTxt");
		    		contBar.css("border-top","1px solid #d6d6cb");
		    		//.galleryListItem li .rela .tailTxt
		    		//border-top : 1px solid #d6d6cb

		    	});
		    	$("body").on("mouseleave",".galleryListItem li", function(){
		    		$(this).removeClass("on");	
		    		var cont = $(this).find(".rela > .maskbox > .cont > .contEtc");
		    		$(cont).find(".malText").mCustomScrollbar("destroy");
		    		var contBar = $(this).find(".rela > .maskbox > .tailTxt");
		    		contBar.css("border-top","");
		    	});
		    	*/
		    	
		    	$("body").on("click","#galleryInsertButton",function(){
		    		$resultGallery.insertGallery();
		    	});
		    	
		    	etcGalleryEvent();
		    	
		    	
			},
			selectListInitClick : function(){
				
				$("body").off("click",".galleryListItem li");
				$("body").off("click",".rightClose");
				$('body').off("keyup keypress");
				$("body").off("mouseenter",".galleryListItem li");
				$("body").off("mouseleave",".galleryListItem li");
				$("body").off("click","#galleryInsertButton");
				$("body").on("click",".galleryListItem li", function(){
					if(null != $("#hidden_ss_page_info").val() && '' != $("#hidden_ss_page_info").val()){
						if($("#hidden_ss_page_info").val()=='S'){srvLogWrite('T0','02','07','09',$('#hidden_ss_school_grade').val(),'data_id='+$(this).attr("id"));}
						if($("#hidden_ss_page_info").val()=='T'){srvLogWrite('T0','02','07','02',$('#hidden_ss_school_grade').val(),'data_id='+$(this).attr("id"));}
					}

					var dialog689 = "689px";
					var dialog270 = "270px";
					//if(swtBtn){
						$("#dialogDiv").css("display","").show();
					//}else{
					//	dialog450 = 1;
					//	$("#dialogDiv").css("display","hidden");
					//	swtBtn = true;
					//	setTimeout(function(){
					//		dialog689 = 0;
					//		dialog270 = 0;
					//		$('#dialogDiv').attr("class","");
				    //		$('#dialogDiv').empty();
				    //		$("#dialogDiv").css("display","block");
				    //		$resultGallery.selectGalleryList();
					//	},500);
					//}
					
					//apiLogWrite2('M0', 'M01', '외부에서 페이지 유입', document.location.href, '00', '없음');
		    		var dataId = $(this).attr("id");
		    		$resultGallery.selectDataId = dataId;
		    		if(!$(this).parents("ul").hasClass("openSelect")){
		    			
		    			/*
		    			if($(this).hasClass("statsGalleryDialog")){
		    				$('#dialogDiv').attr("class", "statsGalleryDialog");
		    				$('#dialogDiv').load("/view/edu_gallery/viewStatsGalleryDialog.jsp");
		    			}else if($(this).hasClass("useGalleryDialog")){
		    				$('#dialogDiv').attr("class", "useGalleryDialog");
		    				$('#dialogDiv').load("/view/edu_gallery/viewUseGalleryDialog.jsp");
		    			}
		    			*/
		    			
		    			$('#resultGalleryList').hide();
		    			
		    			$('#dialogDiv').attr("class", "statsGalleryDialog");
		    			$('#dialogDiv').load("/view/edu_gallery/viewStatsGalleryDialog.jsp?param_ss_school_grade=" + $('#hidden_ss_school_grade').val() );
		    			
			    		//$("#mCSB_1_container").css("width", dialog689);
			    		//$("#mCSB_2_container").css("width", dialog270);
			    					    		

			    		$(".dialogGtype").fadeIn("slow");
		    		}
		    	});
				
				/*
				$("body").on("click",".rightClose", function(){
		    		$('#dialogDiv').attr("class","");
		    		$('#dialogDiv').empty();
		    		
		    	});
				
				$('body').on("keyup keypress", function(e){ 
		    		if("none" != $(".dialogGtype").css("display") && "27" == e.keyCode){
		    			$('#dialogDiv').attr("class","");
		    			$('#dialogDiv').html("");
		    			$(".dialogGtype").fadeOut("fast");
		    		}
		    	});

		    	$("body").on("mouseenter",".galleryListItem li", function(){
		    		$(this).addClass("on");
		    		var imgObj = $(this).find(".rela > .map > img");
		    		var imgObjSrc = $(imgObj).attr("src");
		    		var cont = $(this).find(".rela > .maskbox > .cont > .contEtc");
		    		$(cont).find("img").css("opacity",0.3);
		    		$(cont).find(".malText").mCustomScrollbar({axis:"y"});
		    		$(cont).find(".t01").css("color","#000000");
		    		$(cont).find(".t02").css("color","#000000");
		    		var contBar = $(this).find(".rela > .maskbox > .tailTxt");
		    		contBar.css("border-top","1px solid #d6d6cb");
		    		//.galleryListItem li .rela .tailTxt
		    		//border-top : 1px solid #d6d6cb

		    	});
		    	$("body").on("mouseleave",".galleryListItem li", function(){
		    		$(this).removeClass("on");	
		    		var cont = $(this).find(".rela > .maskbox > .cont > .contEtc");
		    		$(cont).find(".malText").mCustomScrollbar("destroy");
		    		var contBar = $(this).find(".rela > .maskbox > .tailTxt");
		    		contBar.css("border-top","");
		    	});
		    	*/
		    	
		    	
		    	$("body").on("click","#galleryInsertButton",function(){
		    		$resultGallery.insertGallery();
		    	});
		    	
		    	etcGalleryEvent();
		    	
		    	
			},
			
			//즐겨찾기 데이터 가져오기 
			selectBookMarkData : function(hist_id){
				
				//alert(hist_id);
				
				var bookMarkData = new sop.portal.selectBookMarkData.api();
				bookMarkData.addParam("hist_id",hist_id);
				bookMarkData.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/edu_gallery/selectBookMarkData.json"
				});
			},
			//갤러리 검색
			gallerySearch : function (){
				$resultGallery.searchWord = $("#searchWord").val();
				var searchType = $("#selectTypeItem").text();
				if(searchType =="전체"){
					$resultGallery.searchType = "1";
				} else if(searchType =="제목"){
					$resultGallery.searchType = "2";
				} else if(searchType =="내용"){
					$resultGallery.searchType = "3";
				}
				
				var my_teach_list = $("input:checkbox[id='my_teach_list']").is(":checked");
				if(my_teach_list == true){
					$resultGallery.my_teach_list = "2";
				} else {
					$resultGallery.my_teach_list = "1";
				}
				
				$resultGallery.currentPageIndex = 1;
				
				$resultGallery.selectGalleryList();

			},
			
			//정렬순서
			galleryOrderList : function(o,type){
				//hits
				//like
				//type
				if(type !="type"){
					var orderSelectListArray = $("a[name='orderSelectList']");
					for(var i =0; i < orderSelectListArray.length; i++){
						orderSelectListArray.removeClass("on");
					}
					$(o).addClass("on");
					$resultGallery.orderType = type;
				}else{
					
				}
				
				var type = $("#type option:selected").val();
				
				if(type == "ALL"){
					$resultGallery.srvType = null;
				}else{
					$resultGallery.srvType = type;
					typeText=$("#type").find("option[value='"+$('#type option:selected').val()+"']").text();
					//srvLogWrite('J0','01','04','00',typeText,'');
				}
				//검색시 문제가 있어서 페이지를 1로 초기화
				//해시태그 클릭 해서 들어갈때는 srvType에 대해 처리를 변경을 할경우 srvType을 All로 변경을
				$resultGallery.currentPageIndex = 1;
				
				$resultGallery.selectGalleryList();
				
			},
			
			// 갤러리 목록 조회
			selectGalleryList : function () {
				if(null != $("#hidden_ss_page_info").val() && '' != $("#hidden_ss_page_info").val()){
					if($("#hidden_ss_page_info").val()=='S'){srvLogWrite('T0','02','07','08',$('#hidden_ss_school_grade').val(),'');}
					if($("#hidden_ss_page_info").val()=='T'){srvLogWrite('T0','02','07','01',$('#hidden_ss_school_grade').val(),'');}
				}
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
				if($resultGallery.my_teach_list != null && $resultGallery.my_teach_list.length > 0) {
					sopPortalGalleryObj.addParam("my_teach_list", $resultGallery.my_teach_list);
				}
				sopPortalGalleryObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/edu_gallery/resultGalleryAllCountList.json"
				});
				
				$('body, html').animate({scrollTop: 0}, 450);
			},
				
			// 갤러리 댓글 등록
			insertGalleryReply : function () {
				//srvLogWrite('J0','04','06','00','','');
				
				var dataId = $(".hidden_class_data_id").attr("id");
				var replyContent = $("#replyContent").val();
				if("" == replyContent || null == replyContent){
					messageAlert.open("알림", "내용을 입력하여 주세요.");
					return;
				}
				
				var replyNickname = $("#replyNickname").val();
				if("" == replyNickname || null == replyNickname){
					messageAlert.open("알림", "닉네임을 입력하여 주세요.");
					return;
				}
				if("" != replyNickname && null != replyNickname && replyNickname.length < 3){
					messageAlert.open("알림", "닉네임을 3글자 이상 입력하여 주세요.");
					return;
				}
				
				var replyPwd = $("#replyPwd").val();
				if("" == replyPwd || null == replyPwd){
					messageAlert.open("알림", "비밀번호를 입력하여 주세요.");
					return;
				}
				
				
				var sopPortalInsertGalleryReplyObj = new sop.portal.insertGalleryReply.api();
				sopPortalInsertGalleryReplyObj.addParam("data_id", dataId);
				sopPortalInsertGalleryReplyObj.addParam("reply_content", replyContent);
				sopPortalInsertGalleryReplyObj.addParam("reply_writer", replyNickname);
				sopPortalInsertGalleryReplyObj.addParam("replyPwd", replyPwd);
				
				sopPortalInsertGalleryReplyObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/edu_gallery/insertGalleryReply.json"
				});
				
				if(null != $("#hidden_ss_page_info").val() && '' != $("#hidden_ss_page_info").val()){
					if($("#hidden_ss_page_info").val()=='S'){srvLogWrite('T0','02','07','10',$('#hidden_ss_school_grade').val(),'data_id='+dataId);}
					if($("#hidden_ss_page_info").val()=='T'){srvLogWrite('T0','02','07','06',$('#hidden_ss_school_grade').val(),'data_id='+dataId);}
				}
				
			},
			
			// 작성자의 댓글 등록
			insertGalleryReply2 : function () {
				//srvLogWrite('J0','04','06','00','','');
				var dataId = $(".hidden_class_data_id").attr("id");
				var replyContent = $("#replyContent2").val();
				if("" == replyContent || null == replyContent){
					messageAlert.open("알림", "내용을 입력하여 주세요.");
					return;
				}
				
				/*
				var replyNickname = $("#replyNickname").val();
				if("" == replyNickname || null == replyNickname){
					messageAlert.open("알림", "닉네임을 입력하여 주세요.");
					return;
				}
				
				var replyPwd = $("#replyPwd").val();
				if("" == replyPwd || null == replyPwd){
					messageAlert.open("알림", "비밀번호를 입력하여 주세요.");
					return;
				}
				*/
				
				
				var sopPortalInsertGalleryReplyObj = new sop.portal.insertGalleryReply.api();
				sopPortalInsertGalleryReplyObj.addParam("data_id", dataId);
				sopPortalInsertGalleryReplyObj.addParam("reply_content", replyContent);
				sopPortalInsertGalleryReplyObj.addParam("reply_writer", "dummy_writer");
				sopPortalInsertGalleryReplyObj.addParam("replyPwd", "dummy_pwd");
				
				sopPortalInsertGalleryReplyObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/edu_gallery/insertGalleryReply.json"
				});
				
				if(null != $("#hidden_ss_page_info").val() && '' != $("#hidden_ss_page_info").val()){
					if($("#hidden_ss_page_info").val()=='S'){srvLogWrite('T0','02','07','10',$('#hidden_ss_school_grade').val(),'data_id='+dataId);}
					if($("#hidden_ss_page_info").val()=='T'){srvLogWrite('T0','02','07','06',$('#hidden_ss_school_grade').val(),'data_id='+dataId);}
				}
			},
			
			// 추천 클릭
			clickGalleryLikeInfo : function (){
				//srvLogWrite('J0','04','07','00','','');
				var type = "Y";
				var ck = $("#likeInfo").hasClass("on");
				if(!ck){
					/*$(this).addClass("on");*/
					type = "N";
				}else{
					/*$(this).removeClass("on");*/
					
				}
				
				
				//likeInfo
				/*if($(".like").hasClass("on")){
					type = "N";
				}*/
				/*if($("#likeInfo").hasClass("on")){
					type = "N";
				}*/
				
				var dataId = $(".dialogGtype").attr("id");
				
				if("N" == type){
					var sopPortalInsertGalleryLikeInfoObj = new sop.portal.insertGalleryLikeInfo.api();
					sopPortalInsertGalleryLikeInfoObj.addParam("data_id", dataId);
					
					sopPortalInsertGalleryLikeInfoObj.request({
						method : "POST",
						async : false,
						url : contextPath + "/ServiceAPI/edu_gallery/insertGalleryLikeInfo.json"
					});
				}else if("Y" == type){
					var sopPortalDeleteGalleryLikeInfoObj = new sop.portal.deleteGalleryLikeInfo.api();
					sopPortalDeleteGalleryLikeInfoObj.addParam("data_id", dataId);
					
					sopPortalDeleteGalleryLikeInfoObj.request({
						method : "POST",
						async : false,
						url : contextPath + "/ServiceAPI/edu_gallery/deleteGalleryLikeInfo.json"
					});
				}
			},
			
			//설문조사 투표
			clickVoteInfo : function(type){
				var surveySurvId = $(".gvVoteSubj").attr("id");
				var dataId = $(".dialogGtype").attr("id");
				var ansSerial = new Array();
				if($( "div" ).hasClass( "gvVoteBox01" )){
					$("div[name='vote']").each(function(){
						if($(this).attr("class") == "gvVoteBox01"){
							ansSerial.push($(this).attr("id"));
						}
					})
				}else{
						messageAlert.open("알림", "설문항목을 선택하여 주세요.");
						return;
				}
				if("R" == type){
					//설문조사 재투표
					var sopPortalUpdateGalleryPollVoteInfoObj = new sop.portal.updateGalleryPollVoteInfo.api();
					sopPortalUpdateGalleryPollVoteInfoObj.addParam("survey_surv_id", surveySurvId);
					sopPortalUpdateGalleryPollVoteInfoObj.addParam("data_id", dataId);
					sopPortalUpdateGalleryPollVoteInfoObj.addParam("ans_serial", ansSerial);
					
					sopPortalUpdateGalleryPollVoteInfoObj.request({
						method : "POST",
						async : false,
						url : contextPath + "/ServiceAPI/edu_gallery/updateGalleryPollVoteInfo.json"
					});
				}else if("" == type){
					//설문조사 투표
					var sopPortalInsertGalleryPollVoteInfoObj = new sop.portal.insertGalleryPollVoteInfo.api();
					sopPortalInsertGalleryPollVoteInfoObj.addParam("data_id", dataId);
					sopPortalInsertGalleryPollVoteInfoObj.addParam("survey_surv_id", surveySurvId);
					sopPortalInsertGalleryPollVoteInfoObj.addParam("ans_serial", ansSerial);
					
					sopPortalInsertGalleryPollVoteInfoObj.request({
						method : "POST",
						async : false,
						url : contextPath + "/ServiceAPI/edu_gallery/insertGalleryPollVoteInfo.json"
					});
				}
				
			},
			
			//리플 제거 전처리
			delReply : function(data_id,replyOrder){
				
				$(".pswd").addClass("on")
		        
				$("#del_reply_confirm").off("click").on("click", function() { //이벤트 버블링때문에 삭제 할때마다 한번씩 더 늘어나서 이렇게 처리함
		        	$resultGallery.delReplyConfirm(data_id,replyOrder);
				});
				$("#del_reply_confirm2").off("click").on("click", function() { //교안 작성자가 삭제할 경우 이 이벤트를 탄다.
		        	$resultGallery.delReplyConfirm2(data_id,replyOrder);
				});
			},
			
			//리플 제거
			delReplyConfirm : function(data_id, replyOrder) {
				var del_reply_nick = $("#del_reply_nick").val();
				if(del_reply_nick == "") {
					messageAlert.open("알림", "닉네임을 입력하여 주세요.");
					return;
				}
				
				var del_reply_pwd = $("#del_reply_pwd").val();
				if(del_reply_pwd == "") {
					messageAlert.open("알림", "교안 비밀번호를 입력하여 주세요.");
					return;
				}
		        
				var sopGalleryDelReply = new sop.portal.DelReply();
				sopGalleryDelReply.addParam("data_id",data_id);
				sopGalleryDelReply.addParam("replyOrder",replyOrder);
				sopGalleryDelReply.addParam("del_reply_nick",del_reply_nick);
				sopGalleryDelReply.addParam("del_reply_pwd",del_reply_pwd);
				sopGalleryDelReply.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/edu_gallery/deleteReply.json"
				});
				
				if(null != $("#hidden_ss_page_info").val() && '' != $("#hidden_ss_page_info").val()){
					if($("#hidden_ss_page_info").val()=='S'){srvLogWrite('T0','02','07','11',$('#hidden_ss_school_grade').val(),'data_id='+data_id);}
					if($("#hidden_ss_page_info").val()=='T'){srvLogWrite('T0','02','07','07',$('#hidden_ss_school_grade').val(),'data_id='+data_id);}
				}
			},
			
			//리플 제거 (교안 작성자의)
			delReplyConfirm2 : function(data_id, replyOrder) {
				/*
				var del_reply_nick = $("#del_reply_nick").val();
				if(del_reply_nick == "") {
					messageAlert.open("알림", "닉네임을 입력하여 주세요.");
					return;
				}
				
				var del_reply_pwd = $("#del_reply_pwd").val();
				if(del_reply_pwd == "") {
					messageAlert.open("알림", "교안 비밀번호를 입력하여 주세요.");
					return;
				}
		        */
				var sopGalleryDelReply = new sop.portal.DelReply();
				sopGalleryDelReply.addParam("data_id",data_id);
				sopGalleryDelReply.addParam("replyOrder",replyOrder);
				sopGalleryDelReply.addParam("del_reply_nick","dummy_nick");
				sopGalleryDelReply.addParam("del_reply_pwd","dummy_pwd");
				sopGalleryDelReply.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/edu_gallery/deleteReply.json"
				});
			},
			
			
			delPostCnt : function() {
				var dataId = $(".hidden_class_data_id").attr("id");
				var sopDelPostCnt = new sop.portal.delPostCnt();
				sopDelPostCnt.addParam("data_id",dataId);
				sopDelPostCnt.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/edu_gallery/deleteGallery.json"
				});
			},
			
			
			//imgIcon 조회
			selectImgIconList : function(data_id, img_id){
				$(".mapIconBox").remove();
				var sopPortalImgIconListObj = new sop.portal.imgIconList.api();
				sopPortalImgIconListObj.addParam("data_id", data_id);
				sopPortalImgIconListObj.addParam("img_id", img_id);
				
				sopPortalImgIconListObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/edu_gallery/galleryImgIconList.json"
				});
			},
			
			//선택된 이미지 조회
			selectShowImage : function(idx){
				var selectImg = $resultGallery.galleryImgList[idx];
				$resultGallery.selectImgIdx = idx;
				var paramInfo = JSON.parse(selectImg.param_info);
				/*$("#mapArea").css("background-image",'url('+paramInfo.fileName+')');*/
				//$("#mapArea").css("background-image",'url('+'/upload/gallery/galleryView/'+paramInfo.fileName+') , url("/img/pic/pic_testmap02.jpg") ');
				
				//2017.04.03 이미지 찌그러짐 보정
				var image = new Image();
				image.src = "/upload/gallery/galleryView/"+paramInfo.fileName;
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
					$("#mapArea").css("background-image",'url("/img/pic/pic_testmap02.jpg")');
					$("#mapArea").css({"width" : "710px", "margin-left" : "0px"});
				};
				
				$resultGallery.selectImgIconList(selectImg.data_id, selectImg.img_id);
			},
			
			//활용사례 수정 페이지 이동  
			getModifyUseCasePage : function(){
				var selectUseCaseId = $(".dialogGtype").attr("id");
				location.href="/view/edu_gallery/getUseCaseModifyPage?id="+selectUseCaseId;
			},
			
			//설문조사 클릭 이벤트
			setSurvClickEvent : function(o){
				if("1" == $resultGallery.survey_type){
			    		if("gvVoteBox02" == $(o).attr("class")){
			    			
			    			$("div[name='vote']").each(function(){
			    				$(this).attr("class", "gvVoteBox02");
			    			});
			    			
			    			$(o).attr("class", "gvVoteBox01");
			    			
			    		}else{				
							$("div[class^=gvVoteBox]").each(function(){
			    				$(o).attr("class", "gvVoteBox02");
			    			});
			    		}
						
				}else{
			    		if("gvVoteBox02" == $(o).attr("class")){
			    			$(o).attr("class", "gvVoteBox01");
			    		}else{				
							$("div[class^=gvVoteBox]").each(function(){
			    				$(o).attr("class", "gvVoteBox02");
			    			});
			    		}
				}
		    	
			},
			
			fileDownLoad : function(fileRealName,fileName){
				var url = "/view/edu_gallery/refFileDownLoad?fileRealName="+fileRealName+"&fileName="+fileName;
				window.open(url,"_blank","enabled");
			},
			
			preViewDownLoad : function(){
				//srvLogWrite('J0','04','03','00','','');
				var shareMessage = "해당 이미지를 저장 하시겠습니까?";
				messageConfirm.open(
		    			 "알림", 
		    			 shareMessage,
		    			 btns = [
							{
							    title : "저장",
							    fAgm : null,
							    disable : false,
							    func : function(opt) {
							    	 html2canvas($("#mapArea"),{
							    		 onrendered : function(canvas){
							    			 var myImage = canvas.toDataURL("image/png");
							    			 var target = $('body');
							    			 var url = "/ServiceAPI/edu_gallery/preViewDownLoad.download";
							    			 target.prepend("<form id='preViewDowForm'><input type='hidden' id='preViewDownLoad' name='preViewDownLoad' value='"+myImage+"'/></form>");
							    			 target = $("#preViewDowForm");
							    			 target.attr("method", "post");
							 		         target.attr("style", "top:-3333333333px;");
							 		         target.attr("action", url);
							 		         $("#preViewDowForm").submit();
							 		         $("#preViewDowForm").remove();
							    		 }
							    	 });
							    }
							 },
							 
		    			     {
							   title : "취소",
							   fAgm : null,
							   disable : false,
							   func : function(opt) {}
		    			     }   
		    			     
		    			 ]
		    	);
			},
			
			addMyGallery : function(){
				//srvLogWrite('J0','04','09','00','','');
				var addMyGallery = new sop.portal.addMyGallery.api();
				addMyGallery.addParam("data_id",$(".dialogGtype").attr("id"));
				addMyGallery.addParam("collect_id",makeRandomThirtySevenDigitString());
				addMyGallery.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/edu_gallery/addMyGallery.json"
				});
				
				if(null != $("#hidden_ss_page_info").val() && '' != $("#hidden_ss_page_info").val()){
					if($("#hidden_ss_page_info").val()=='T'){srvLogWrite('T0','02','07','03',$('#hidden_ss_school_grade').val(),'');}
				}
			},
			
			selectGalleryAllCountList : function(){
				var allCountList = new sop.portal.galleryAllCountList.api();
				allCountList.request({
					method : "POST",
					async : true, //2017.03.22
					url : contextPath + "/ServiceAPI/edu_gallery/galleryAllCountList.json"
				});
			},
			
			goCollection : function(){
				location.href="/view/edu_gallery/collectionGallery";
			},
			
			insertGallery : function(){
				
				$('#resultGalleryList').hide();
				$('#dialogDiv').load("/view/edu_gallery/insertGallaryDialog.jsp?param_ss_school_grade=" + $('#hidden_ss_school_grade').val());
				$('#dialogDiv').show();
				
				
			},
			
			playGallery : function(){
				//srvLogWrite('J0','04','04','00','','');
				$(".gvDownloadPreView").hide(); //2017.03.31 플레이시, 이미지 다운로드 숨김
				$resultGallery.selectImgIdx = 0;
				$resultGallery.selectShowImage($resultGallery.selectImgIdx);
				$resultGallery.intervalContent = setInterval(function(){
					$resultGallery.intervalPlayGallery();
				},3000);
			},
			
			stopPlay : function(){
				$(".gvDownloadPreView").show(); //2017.03.31 플레이시, 이미지 다운로드 숨김
				clearInterval($resultGallery.intervalContent);
			},
			
			intervalPlayGallery : function(){
				$resultGallery.selectImgIdx = Number($resultGallery.selectImgIdx +1);
				
				//2017.03.22 갤러리 상세화면에서 시계열 플레이 한번만 되는 현상 제거
				if($resultGallery.selectImgIdx >  $resultGallery.galleryImgList.length-1){
					$resultGallery.selectImgIdx = 0;
				}
				$resultGallery.selectShowImage($resultGallery.selectImgIdx);
			},
			
			//태그네임 클릭시 이동
			serarchTagName : function(searchStr){
				
				$("#searchWord").val(decodeURIComponent(searchStr));
				$resultGallery.searchWord = decodeURIComponent(searchStr);
				$("#selectTypeItem").text("해시태그");
				$resultGallery.searchType = "1";
				$resultGallery.selectGalleryList();
				$(".rightClose").trigger("click");
			},
			
			
			//SNS팝업창
			shareInfoOpen : function(){
				
				var srvType = "";
				if($("#dialogDiv").hasClass("statsGalleryDialog")){
					srvType = "statsGalleryDialog";
				}else{
					srvType = "useGalleryDialog";
				}
					
					
				var domain = window.location.protocol+"//"+window.location.host;
				var linkUrl = domain + "/view/edu_gallery/resultGallery?shareDataId="+$resultGallery.selectDataId+"&srvType="+srvType;
				var urlbox = $("#sharedlg").find($("input"));
				urlbox.val(linkUrl);
				
				var elemDiv = document.getElementById("facebookDiv");
				var markup = '<div class="fb-share-button" data-href="'+urlbox.val()+'" data-layout="button"></div>';
				elemDiv.innerHTML = markup;
				FB.XFBML.parse(elemDiv);
				
				//트위터위젯
				$("#twitterDiv").html('<a class="twitter-share-button" href="//twitter.com/share" data-url="'+urlbox.val()+'" data-count="none"></a>');
				twttr.widgets.load();
				//$(".deem").show();
				$("#sharedlg").show();
			},
			
			//공유주소 복사
			doDone : function(type){
				copyToClipboard($("#sharedlg").find($("input")).val());
			},
			
			doCancel : function(type){
				//mng_s 20170720_김대보(오류수정)
				$("#"+type).hide();
				//mng_e 20170720_김대보(오류수정)
			},
			
			//kakao공유
			shareToKakaoStory : function(){
				//srvLogWrite('J0','04','08','01','카카오스토리','');
				var srvType = "";
				if($("#dialogDiv").hasClass("statsGalleryDialog")){
					srvType = "statsGalleryDialog";
				}else{
					srvType = "useGalleryDialog";
				}
				var domain = window.location.protocol+"//"+window.location.host;
				var linkUrl = domain + "/view/edu_gallery/resultGallery?shareDataId="+$resultGallery.selectDataId+"&srvType="+srvType;
				/*$bookmarkAndShareInfo.share.shareInfo.doShareToKakaoStory();*/
				
				Kakao.Auth.login({
					success : function(authObj) {
						var linkURL = linkUrl;
						Kakao.API.request({
							url : '/v1/api/story/linkinfo',
							data : {
								url : linkURL
							},
						}).then(function(res) {
							res.description = that.shareUrlInfo[0].title;
							return Kakao.API.request( {
								url : '/v1/api/story/post/link',
								data : {
									link_info : res
								}
							});
						}).then(function(res) {
							return Kakao.API.request( {
								url : '/v1/api/story/mystory',
								data : { id : res.id },
								success: function(res) {
									messageAlert.open("알림", "카카오스토리에 정상적으로 공유하였습니다.");
								},
								fail : function(error) {
									messageAlert.open("알림", "카카오스토리에 공유를 실패하였습니다.<br>("+error.error_description+")");
								}
							});
						});
					},
					fail : function(error) {
						messageAlert.open("알림", "카카오스토리에 공유를 실패하였습니다.<br>("+error.error_description+")");
					}
				})
				
			},
			
			//댓글수정 준비
			modifyReply : function(data_id,replyOrder,obj){
				var tValue = $(obj).parent().parent().find("span[name=replyContent]").text();
				$("#replyContent").val(tValue);
				//btnGesi
				$(".btnGesi").prop('href', 'javascript:$resultGallery.updateReply(\''+data_id+'\',\''+replyOrder+'\')');
				$(".btnGesi").text("댓글수정");
			},
			//댓글수정
			updateReply : function(data_id,replyOrder){
				var tValue = $("#replyContent").val();
				
				var updateReply = new sop.portal.updateReply.api();
				updateReply.addParam("data_id",data_id);
				updateReply.addParam("reply_order",replyOrder);
				updateReply.addParam("reply_content",tValue);
				updateReply.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/edu_gallery/updateReply.json"
				});
			}
	};
	
	
	
	(function(){
		//갤러리 목록 조회
		$class("sop.portal.resultGallery.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					var result = res.result;
					$resultGallery.collectionGalleryPaging(result.totalCount, $resultGallery.currentPageIndex);
					
					$("#memberNmTxt").html(result.memberNm);
					var html = "";
					for(var i = 0; i < result.list.length; i ++) {
						var listItem = result.list[i];
						
						//if(listItem.param_info == undefined){
							//console.log(listItem);
						//}
						
						//if(listItem.param_info != undefined){
							//var paramInfoObj = $.parseJSON(listItem.param_info);
							var tchpgm_title = listItem.tchpgm_title.replace(/\n/gim, "</br>");
							var tchpgm_cn = listItem.tchpgm_cn.replace(/\n/gim, "</br>");
							var srvType = listItem.srv_type;
							var tempStr = tchpgm_cn.split("</br>");
							///////////////////////////////////////////////////////////
							
							var dtStr = listItem.reg_ts.replace(".","").replace(".","");
							var date = new Date();
							date.setDate(date.getDate() - 7); //7일 전으로 세팅
							var to_day_before_ow = date.getFullYear() + leadingZeros((date.getMonth()+1),2) + leadingZeros(date.getDate(),2);
							//console.log("dtStr[" + dtStr);
							//console.log("to_day_before_ow[" + to_day_before_ow);
							
							
							if(listItem.open_yn == "N") {
								html += '<li class="private" id="' +  listItem.tchpgm_seq + '">';
							} else if(dtStr >= to_day_before_ow && listItem.open_yn == "Y") {
								html += '<li class="new" id="' +  listItem.tchpgm_seq + '">';
							} else {
								html += '<li class="" id="' +  listItem.tchpgm_seq + '">';
							}
							
							html += '<a>';
							
							html += 	'<em class="cardTi">' + tchpgm_title + '</em>';
							
							var tagHtml = "";
							
							if(listItem.kwrd == null){
								listItem.kwrd = "";
							}
							var tagArr = listItem.kwrd.split(",");
							//2개까지만 보여주기고 더 늘려달라면 여기서 처리하면됨
							var tagLength = tagArr.length;
							if(tagLength > 5){
								tagLength = 5;
							}
							for(var j = 0; j < tagLength; j++) {
								
								if($.trim(tagArr[j]).length == 0) {
									break;
								}
								
																tagHtml += '<i class="hashTag" >' + $.trim(tagArr[j]) + ' ' + '</i>';
									
							}
							
							//html += 		'<i class="hashTag">' + tagHtml + '</i>';
							html += 		tagHtml;
								
							html += 		'<span class="cardInfo">';
							html += 		    '<i class="userId">' + listItem.member_id + '</i>';
							html += 		    '<i class="date">' + listItem.reg_ts + '</i>';
							html += 		    '<i class="viewer">' + listItem.hits + '</i>';
							html += 		'<span class="cardInfo">';
							
							html += '</a>';
							html += '</li>';
							
							/*
							if('1' == srvType || '3' == srvType){
								html += 		'<img src="/img/ico/ico_ygallery.png" alt="통계갤러리" class="etcTp" />';
							}else if('2' == srvType || '4' == srvType){
								html += 		'<img src="/img/ico/ico_bgallery.png" alt="활용갤러리" class="etcTp" />';
							}
							
							if(listItem.excellent =="Y"){
								html +=			'<img src="/img/ico/hotIcon.png" alt="우수사례" class="etcExcellent"/>';
							}
							html += 		'<div class="map">';

							//2017.03.22 갤러리 이미지 찌그러짐 보정
							if (dialogType == "useGalleryDialog"){
								html +=	'<img id="img_' +  listItem.data_id + '" src="/img/common/testimg01.png" onerror="this.src=\'/img/common/testimg01.png\'" width="100%" height="100%" />';
							}else {
								html +=	'<img id="img_' +  listItem.data_id + '" src="/img/common/testimg01.png" onerror="this.src=\'/img/common/testimg01.png\'" width="100%" height="100%" />';
							}
							html += '</div>';
							
							//maskbox
							html += 	"<div class='maskbox'>";
							html += 		'<div class="cont">';
			
							var supportType = supportImgValue(listItem.support_type);
							//console.log("listItem.support_type ="+listItem.support_type+" ::supportType = " + supportType);
							html += 			'<div class="conBar '+supportType+'">';
							html += 				'<p class="t01">' + title + '</p>';
							html += 				'<p class="t02">작성일 : ' + listItem.reg_dt;
							
							var menuNm = supportImgText( listItem.support_type );//대화형통계지도;
							
							html += '<span class="namespan" >출처 : '+ menuNm +'</span>';
							html += '</p>';
							html += 				'<a href="javascript:void(0)" class="num">' + listItem.img_cnt + '</a>';
							html += 			'</div>';
							//contEtc
							html +=				'<div class="contEtc">'
								
							//2017.03.22 갤러리 이미지 찌그러짐 보정	
							if (dialogType == "useGalleryDialog"){
								html +=			'<img id="imgOver_' +  listItem.data_id + '"  src="' + '/upload/gallery/preView/'+paramInfoObj.preViewImg.saveFileName + '" onerror="this.src=\'/img/common/testimg01.png\'" width="100%" height="100%" />';
							}else {
								html +=			'<img id="imgOver_' +  listItem.data_id + '"  src="' + '/upload/gallery/galleryView/'+paramInfoObj.fileName + '" onerror="this.src=\'/img/common/testimg01.png\'" width="100%" height="100%" />';
							}
							
							html +=					'<div class="malText" style="position:absolute;width:100%;height:219px;margin-top:-220px;">'
							html +=					'<p class="t01">작성자:'+listItem.writer+'</p>';
							//엔터키 처리
							//수정 : 최재영2017.02.26
							html +=					'<p class="t02">'+replaceAll(listItem.content, '\n', '<br/>')+'</p>';
							html +=					'</div>';
							html +=				'</div>';
							
							html += 		'</div>';
							
							//2017.02.28
							if (listItem.survey_title == undefined) {
								listItem.survey_title = "";
							}
							
							html += 		'<div class="tailTxt">' + listItem.survey_title + '</div>';
							html += 		'<div class="tailIcon">';
							html += 			'<span class="t01">' + listItem.hits + '</span>';
							html += 			'<span class="t02">' + listItem.like_cnt + '</span>';
							html += 			'<span class="t03">' + listItem.reply_cnt + '</span>';
							
							var tagHtml = "";
							
							if(listItem.tag == null){
								listItem.tag = "";
							}
							var tagArr = listItem.tag.split(",");
							//요구사항은 2개까지만 보여주기로
							var tagLength = tagArr.length;
							if(tagLength > 2){
								tagLength = 2;
							}
							
							for(var j = 0; j < tagLength; j++) {
								tagHtml += '#'+$.trim(tagArr[j])+' ';
							}
							
							html += 		'<span class="t04">' + tagHtml + '</span>';
							html += 		'</div>';
							html += 	'</div>';
							
							//임시저장 구분(1:통계갤러리, 2:활용갤러리, 3:통계갤러리 임시저장, 4:활용갤러리 임시저장)
							if('3' == srvType || '4' == srvType){
								html += 		'<div class="tempSave">' + '임시 저장 중' + '</div>';
							}
							
							html += 	'</div>';
							html += '</li>';
							*/
						//////////////////////////////////////////////////////////////////////
						//}
						
					}

					$(".galleryListItem").empty();
					$(".galleryListItem").html(html);
					
					
					//아래 부분은 필요없을 듯... 나중에 주석처리 요망
					//2017.03.22 갤러리 이미지 찌그러짐 보정
					/*
					for(var i = 0; i < result.list.length; i ++) {
						var listItem = result.list[i];
						//if (listItem.param_info != undefined){
							
							var dialogType = "statsGalleryDialog";
							switch(parseInt(listItem.srv_type)) {
								case 2:
								case 4:
									dialogType = "useGalleryDialog";
									break;
								default:
									dialogType = "statsGalleryDialog";
									break;
							}

							
							url = "/upload/gallery/galleryView/"+listItem.img_file_nm;
							
							var image = new Image();
							image.src = url;
							image.id = "img2_"+listItem.tchpgm_seq;
							image.onload = function() {
								var pWidth = 308;
								var pHeight = 200;
								this.width = (this.width*pHeight)/this.height;
								var margin = -(this.width - pWidth)/2;
								var id = this.id.split("_")[1];
								$("#img_"+id).attr("src", this.src);
								$("#imgOver_"+id).attr("src", this.src);
								$("#img_"+id).css({
									"width" : this.width + "px",
									"margin-left" : margin + "px"
								});
								$("#imgOver_"+id).css({
									"width" : this.width + "px",
									"margin-left" : margin + "px"
								});
							};
						//}
					}
					*/
					
					$resultGallery.selectListInitClick(); //리스트의 아이템을 클릭했을 때 상세화면으로 넘어가는 부분 
				} else {
					//mng_s 20180726_김건민 
					$resultGallery.collectionGalleryPaging(0, $resultGallery.currentPageIndex);
					//mng_e 20180726_김건민
					messageAlert.open("알림", res.errMsg);
					//최재영 수정 2017.02.26
					$(".galleryListItem").empty();
					$('.pagenation .paging').empty();
					$resultGallery.selectListInitClick();
				}	
				//if(!swtBtn){
				//$(".galleryListItem li:first").click();
					//swtBtn = true;
					//$resultGallery.selectGalleryList();
				//}
			},
			onFail : function(status) {
			}
		});
	}());
	
	
	//갤러리 상세조회 가르치는 지도 상세조회
	(function(){
	$class("sop.portal.galleryView.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res) {
			if(res.errCd == "0") {
				/*$("div[name='slickImage']").remove();*/
				
				var result = res.result;
			    
				$resultGallery.galleryImgList = result.galleryImgList;
				var galleryImgListItem = result.galleryImgList;
				var galleryItem = result.gallery;
				//var galleryPollDetailListItem = result.galleryPollDetailList;
				
				if( galleryItem != null ) {
					$(".hidden_class_data_id").attr("id", galleryItem.tchpgm_seq ); //댓글 달기에서 사용할 data_id 값 세팅
					if( null != $resultGallery.current_pg_writer &&  "" != $resultGallery.current_pg_writer ) {
						if ($resultGallery.current_pg_writer != galleryItem.member_id ) { //세션값 아이디와 현재 글의 아이디 비교
							$("#view_stats_area").hide();
						} else if($resultGallery.current_pg_writer == galleryItem.member_id) {
							$("#view_stats_area").show();
						}
					} else {
						$("#view_stats_area").hide();
					}
					
				}
				
				for(var i = 0; i < galleryImgListItem.length;i++){							
					var paramInfo = galleryImgListItem[i].img_file_nm;
					
					if(i == 0){
						
						
						var image = new Image();
						image.src = '/upload/gallery/galleryView/'+paramInfo;
						image.onload = function() {
							
							
							$("#mapImage").attr("src", this.src);
							
							var iHeight = $("#div_mapImage > img").height();
						};
						//===============================END===================================//
					}
					//$("#gvSlideArea").slick('slickAdd',item);
				}
				
				//mapArea 설정
				if(galleryImgListItem[0]){
					$resultGallery.selectImgIconList(galleryImgListItem[0].tchpgm_seq, galleryImgListItem[0].tchpgm_seq); //여기서 두번째 파라미터는 의미없다.
				}
				
				//편집하기에서 보여줄 해쉬태그 만들기
				var modify_hash_tag = "";
				if(galleryItem.kwrd == null || galleryItem.kwrd == undefined || galleryItem.kwrd =="" ){
					galleryItem.kwrd = "";
				}
				var tagArr = galleryItem.kwrd.split(",");
				var tagLength = tagArr.length;
				for(var j = 0; j < tagLength; j++) {
					if($.trim(tagArr[j]).length == 0) {
						break;
					}
					modify_hash_tag += $.trim(tagArr[j]) + ' ';
				}
				
				//result.gallery 편집하기 데이터 세팅
				$collectionModify.srv_type = $('#dialogDiv').attr("class");
				$collectionModify.selectId =result.gallery.tchpgm_seq;
				$collectionModify.selectImgList = result.galleryImgList;
				$collectionModify.selectTitle = result.gallery.tchpgm_title;
				$collectionModify.selectContent = result.gallery.tchpgm_cn;
				$collectionModify.selectTag = modify_hash_tag;
				$collectionModify.publicType = result.gallery.srv_type;
				$collectionModify.modify_open_yn = result.gallery.open_yn;
				$collectionModify.that = $resultGallery;
				
					
				
				//$(".dialogGtype").attr("id", galleryItem.tchpgm_seq);
				$(".hidden_class_data_id").attr("id", galleryItem.tchpgm_seq);
				
				//2017.04.03 상세팝업창 서비스 심볼 수정
				//var supportType = supportDetailImgValue(galleryItem.support_type);
				//$("#titleTxt").addClass(supportType);
				
				if(galleryItem.open_yn == "N"){ //비공개시
					$("#open_yn_class").attr("class", "sub view private");
				}
				
				$("#titleTxt").html(galleryItem.tchpgm_title);
				$("#titleTxt").attr("title",galleryItem.tchpgm_title);
				$("#regDtTxt").html(galleryItem.reg_ts);
				$("#writerTxt").html(galleryItem.member_nm);
				
				$("#div_title_sticker").show();
				$("#div_title_sticker_cnt").html("<p style='position: relative; margin-top: -15px; text-align: center;font-size: 20px;color: rgb(0 0 0 / 75%);'>" + galleryItem.tchpgm_title + "</p>");
				
				galleryItem.content = replaceAll(galleryItem.tchpgm_cn, '\n', '<br/>');
				/*$("#postContentTxt").html(galleryItem.content);*/
				//var postContent = "<div id='contentField' style='height:70px;overflow:hidden;'>"
				var postContent = "<div id='contentField' >"
					postContent += "<div style='font-family: notoSansKR, sans-serif; color:rgba(256,256,256,0.9); white-space: break-spaces; margin-top: 20px; line-height: 1.7em;'>";
					postContent += galleryItem.tchpgm_cn;
					postContent += "</div>"
					postContent += "</div>"
				$("#postContentTxt").html(postContent);
				
				/*
				//이미지의 높이가 작을 경우 중간으로 옮기기 iHeight의 크기가 0으로 잡혀서 실패함. 추후 봐야겠음
				
				var tHeight = $("#div_mapImage").height();
				var iHeight = $("#mapImage").height();
				var dHeight = tHeight - iHeight;
				var pHeight = dHeight/2/tHeight*100;
				
				$(".map2").css({
					"position" : "absolute",
					"top" : pHeight + "%", 
					"left" : "0",
					"bottom" : "0",
					"right" : "0"
				});
				*/
				
				//mng_s 20211027 개발서버 테스트결과 이미지가 클 경우 timeout 시간을 2000 정도 줘야 된다.
				//일단 주석 처리하고 웹디자이너가 처리해도 해결되지 않되면 이 코드를 사용한다.
				/*
				setTimeout(function() {
					var tHeight = $("#div_mapImage").height();
					var iHeight = $("#mapImage").height();
					var dHeight = tHeight - iHeight;
					var pHeight = dHeight/2/tHeight*100;
					
					$(".map2").css({
						"position" : "absolute",
						"top" : pHeight + "%", 
						"left" : "0",
						"bottom" : "0",
						"right" : "0"
					});
				}, 2000);
				*/

				var tagHtml = "";
				if(galleryItem.kwrd =="" ||galleryItem.kwrd == null ||galleryItem.kwrd == undefined ){
					galleryItem.kwrd = "";
				}
				var tagArr = galleryItem.kwrd.split(",");
				
				var tagLength = tagArr.length;
				
				for(var j = 0; j < tagLength; j++) {
					
					if($.trim(tagArr[j]).length == 0) {
						break;
					}
					
					tagHtml += '<i class="hashTag">' + $.trim(tagArr[j]) + ' ' + '</i>';
						
				}
				
				$(".hashTagWrap").html(tagHtml);

				var galleryHtml = "";					
				galleryHtml += '<span class="s01">' + galleryItem.hits + '</span>';
				//galleryHtml += '<span class="s02">' + galleryItem.like_cnt  + '</span>';
				galleryHtml += '<span class="s03">' + galleryItem.reply_cnt + '</span>';

				$(".gvIconEventBox .t01").html(galleryHtml);
				
				//댓글조회
				var galleryReplyHtml = "";
				
				for(var i = 0; i < result.galleryReplyList.length; i ++) {
					var galleryReplyListItem = result.galleryReplyList[i];
					var content = galleryReplyListItem.reply_content.replace(/\n/gim, "</br>");
					var writer = galleryReplyListItem.reply_writer.replace(/\n/gim, "</br>");
					
					
					
					var pg_writer_id = galleryReplyListItem.pg_writer_id.replace(/\n/gim, "</br>");
					var memberNm = galleryReplyListItem.member_nm.replace(/\n/gim, "</br>");
					var reply_reg_dt = galleryReplyListItem.reply_reg_dt.replace(/\n/gim, "</br>");
					
					if( writer == pg_writer_id) {
						galleryReplyHtml +=     '<li class="writer">';
						if( (writer.length-2) > 0) {
							writer = "**" + writer.substring( 2,writer.length);
						} else {
							writer = "*" + writer.substring( 1,writer.length);
						}
					} else {
						galleryReplyHtml +=     '<li>';
						if( (writer.length-2) > 0) {
							writer = "**" + writer.substring(2,writer.length);
						} else {
							writer = "*" + writer.substring(1,writer.length);
						}
					}
					
					galleryReplyHtml +=     '<div class="info">';
					
					galleryReplyHtml += 		'<em class="nickname">' + writer + '</em> <time>'+ reply_reg_dt + '</time>';
					galleryReplyHtml += 	'</div>';
					
					
					galleryReplyHtml += 		'<p class="txt" style="overflow:auto;">' + content + '</p>';
					galleryReplyHtml +=			'<button type="button" class="btn btnDel" onclick="javascript:$resultGallery.delReply(\''+result.galleryReplyList[i].data_id+'\',\''+result.galleryReplyList[i].reply_order+'\');" >삭제</button>';
					
					galleryReplyHtml += '</li>';
					
					
				}
				var reply_cnt_html = "";
				if(result.galleryReplyList[0] == null || result.galleryReplyList[0] == undefined || result.galleryReplyList[0] == "" ){
					reply_cnt_html = "0";
				} else {
					reply_cnt_html = result.galleryReplyList[0].reply_cnt;
				}
				$("#reply_cnt").html(reply_cnt_html);

				$("#jsp_reply_list").empty();
				$("#jsp_reply_list").html(galleryReplyHtml);
				$("#jsp_reply_list").scrollTop($("#jsp_reply_list")[0].scrollHeight);
				
				if(result.gallery.member_id == result.viewMember) { //result.gallery.member_id : 교안작성자, result.viewMember:로그인한자
					$("#reply_workbook_same").show();
					$("#reply_workbook_no").hide();
					$("#reply_del_same").show();
					$("#reply_del_no").hide();
				} else {
					$("#reply_workbook_same").hide();
					$("#reply_workbook_no").show();
					$("#reply_del_same").hide();
					$("#reply_del_no").show();
				}
				
				
				//$("#jsp_reply_list").mCustomScrollbar({axis:"y"});
				
				//modify 이미지
				//console.log(result.viewMember);
				//console.log(result.gallery.writer);
				
				//if(result.viewMember == result.gallery.writer){
				//	$(".gvInfo").append('<a href="javascript:$collectionModify.modifyData();$resultGallery.stopPlay();"><img src="/img/ico/ico_edit01.png" alt="수정" /></a>');
				//}
				
				
			} else {
				messageAlert.open("알림", res.errMsg);
			}				
		},
		onFail : function(status) {
		}
	});
	}());
	
	//댓글 등록
	(function(){
	$class("sop.portal.insertGalleryReply.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res) {
			if(res.errCd == "0") {
				var result = res.result;
				$("#replyContent").val("");
				$("#replyContent2").val("");
				$("#replyNickname").val("");
				$("#replyPwd").val("");
				
				var dataId = $(".hidden_class_data_id").attr("id");
				var sopPortalGalleryViewObj = new sop.portal.galleryView.api();
	    		sopPortalGalleryViewObj.addParam("data_id", dataId);
	    		sopPortalGalleryViewObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/edu_gallery/galleryView.json"
				});
				
				$('body, html').animate({scrollTop: 0}, 450);
				
			} else {
				messageAlert.open("알림", res.errMsg);
			}				
		},
		onFail : function(status) {
		}
	});
	}());
	
	//추천 등록
	(function(){
	$class("sop.portal.insertGalleryLikeInfo.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res) {
			if(res.errCd == "0") {
				var result = res.result;				
				var dataId = $(".dialogGtype").attr("id");
				var sopPortalGalleryViewObj = new sop.portal.galleryView.api();
	    		sopPortalGalleryViewObj.addParam("data_id", dataId);
	    		sopPortalGalleryViewObj.request({
					method : "POST",
					async : true, //2017.03.28
					url : contextPath + "/ServiceAPI/edu_gallery/galleryView.json"
				});
				$('body, html').animate({scrollTop: 0}, 450);
				$resultGallery.selectGalleryAllCountList(); //2017.03.28 추천했을 때, 카운트 설정
				
			} else {
				messageAlert.open("알림", res.errMsg);
			}				
		},
		onFail : function(status) {
		}
	});
	}());
	
	//추천 삭제
	(function(){
	$class("sop.portal.deleteGalleryLikeInfo.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res) {
			if(res.errCd == "0") {
				var result = res.result;				
				var dataId = $(".dialogGtype").attr("id");
				var sopPortalGalleryViewObj = new sop.portal.galleryView.api();
	    		sopPortalGalleryViewObj.addParam("data_id", dataId);
	    		sopPortalGalleryViewObj.request({
					method : "POST",
					async : true, //2017.03.28
					url : contextPath + "/ServiceAPI/edu_gallery/galleryView.json"
				});
				$('body, html').animate({scrollTop: 0}, 450);
				$resultGallery.selectGalleryAllCountList(); //2017.03.28 추천했을 때, 카운트 설정
				
			} else {
				messageAlert.open("알림", res.errMsg);
			}				
		},
		onFail : function(status) {
		}
	});
	}());
	
	//설문조사 재투표
	(function(){
	$class("sop.portal.updateGalleryPollVoteInfo.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res) {
			if(res.errCd == "0") {
				var result = res.result;					
				var dataId = $(".dialogGtype").attr("id");
				var sopPortalGalleryViewObj = new sop.portal.galleryView.api();
	    		sopPortalGalleryViewObj.addParam("data_id", dataId);
	    		sopPortalGalleryViewObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/edu_gallery/galleryView.json"
				});
				
				$('body, html').animate({scrollTop: 0}, 450);
				
			} else {
				messageAlert.open("알림", res.errMsg);
			}				
		},
		onFail : function(status) {
		}
	});
	}());
	
	//설문조사 투표
	(function(){
	$class("sop.portal.insertGalleryPollVoteInfo.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res) {
			if(res.errCd == "0") {
				var result = res.result;				
				var dataId = $(".dialogGtype").attr("id");
				var sopPortalGalleryViewObj = new sop.portal.galleryView.api();
	    		sopPortalGalleryViewObj.addParam("data_id", dataId);
	    		sopPortalGalleryViewObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/edu_gallery/galleryView.json"
				});
				
				$('body, html').animate({scrollTop: 0}, 450);
				
			} else {
				messageAlert.open("알림", res.errMsg);
			}				
		},
		onFail : function(status) {
		}
	});
	}());
	
	//댓글 삭제
	(function(){
	$class("sop.portal.DelReply").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res) {
			if(res.errCd == "0") {
				
				$(".popup").removeClass("on");
				$("#del_reply_nick").val("");
				$("#del_reply_pwd").val("");
				
				var result = res.result;				
				var dataId = $(".hidden_class_data_id").attr("id");
				var sopPortalGalleryViewObj = new sop.portal.galleryView.api();
	    		sopPortalGalleryViewObj.addParam("data_id", dataId);
	    		sopPortalGalleryViewObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/edu_gallery/galleryView.json"
				});
				
				$('body, html').animate({scrollTop: 0}, 450);
				
			} else {
				messageAlert.open("알림", res.errMsg);
			}				
		},
		onFail : function(status) {
		}
	});
	}());
	
	
	
	//댓글 삭제
	(function(){
	$class("sop.portal.delPostCnt").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res) {
			if(res.errCd == "0") {
				
				location.href="/view/edu_gallery/resultGallery?param_ss_page_info=T&param_ss_school_grade=" + $('#hidden_ss_school_grade').val();
				
			} else {
				messageAlert.open("알림", res.errMsg);
			}				
		},
		onFail : function(status) {
		}
	});
	}());
	
	//imgIcon 조회
	(function(){
	$class("sop.portal.imgIconList.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res) {
			if(res.errCd == "0") {
				var result = res.result;
				var galleryImgIconListItem = result.galleryImgIconList;

				if(galleryImgIconListItem){
						/*
						$("#mapArea").find(".imgIcon").each(function(){
							$(this).remove();
						})
						*/
					
						for(var i = 0; i < galleryImgIconListItem.length; i++) {
							var imgIconSrc = "/sgis_edu/resource/images/"+galleryImgIconListItem[i].icon_nm;
							var html ="";
							if("icon_stk01.png" == galleryImgIconListItem[i].icon_nm){
								html = '<div class="mapIconBox" name="ico"  style="z-index:20000;position:absolute;top:'+Number(Number(galleryImgIconListItem[i].x_coor)) +'%;left:'+Number(Number(galleryImgIconListItem[i].y_coor))+'%">';
								html +='<img src="';
								html +="/sgis_edu/resource/images/img_stk01.png";
								html +='" style="width:28px;height:34px;" />';
								html +="</div>";
							} else if("icon_stk02.png" == galleryImgIconListItem[i].icon_nm){
									
								html = '<div class="mapIconBox" name="ico"  style="z-index:20000;position:absolute;top:'+Number(Number(galleryImgIconListItem[i].x_coor)) +'%;left:'+Number(Number(galleryImgIconListItem[i].y_coor))+'%">';
								html +='<img src="';
								html +="/sgis_edu/resource/images/img_stk02.png";
								html +='" style="width:184px;height:153px;" />';
								html +="</div>";
							}else if("icon_stk03.png" == galleryImgIconListItem[i].icon_nm){
								html = '<div class="mapIconBox" name="ico" id="ico_'+i+'" style="z-index:20000;position:absolute;top:'+(galleryImgIconListItem[i].x_coor+5)+'%;left:'+(galleryImgIconListItem[i].y_coor+1 )+'%">' //텍스트박스가 조회시 위로올라가서 5%를 더해주었다.
								html +='<div class="mal01" style="background-image: url(/sgis_edu/resource/images/img_stk03.png); width:215px; height:130px; padding:15px 15px 30px 15px;" >';
								
								if(galleryImgIconListItem[i].exp != undefined){
									html +='<textarea  style="background: none; border:none; width:100%; height:100%;" row=4 ">'+galleryImgIconListItem[i].exp+'</textarea></div>';
								}else{
									html +='<textarea  style="background: none; border:none; width:100%; height:100%;" row=4 ">'+''+'</textarea></div>';
								}
								html +='</div>';
							}
							/*
							if("1" ==galleryImgIconListItem[i].icon_type){
								html = '<div class="mapIconBox" name="ico"  style="z-index:20000;position:absolute;margin-top:'+Number(Number(galleryImgIconListItem[i].x_coor)) +'px;margin-left:'+Number(Number(galleryImgIconListItem[i].y_coor))+'px">';
								html +='<img src="';
								html +=imgIconSrc;
								html +='" class="mapIconCont"/>';
								html +="</div>";
								
							}else if("2" ==galleryImgIconListItem[i].icon_type){
								html = '<div class="mapIconBox" name="ico"  style="z-index:20000;position:absolute;margin-top:'+galleryImgIconListItem[i].x_coor+'px;margin-left:'+galleryImgIconListItem[i].y_coor+'px">'
								if(galleryImgIconListItem[i].icon_nm =="mal01" ){
									html +='<div class="mal01">';
								}else{
									html +='<div class="mal02">';
								}
								html +='<div class="malType">'+galleryImgIconListItem[i].exp+'</div></div>';
								html +='</div>';
								
							}
							*/
						
							//$("#viewAtIconList").append(html);
							//$("#mapArea").append(html);
							$("#div_mapImage").append(html);
							
						}
						//$(".malType").mCustomScrollbar({axis:"y"});
				}
				
			} else {
				messageAlert.open("알림", res.errMsg);
			}				
		},
		onFail : function(status) {
		}
	});
	}());
	
	(function(){
	$class("sop.portal.addMyGallery.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status,res){
			messageAlert.open("알림","해당 갤러리를 수집갤러리로 저장 하였습니다.");
		},
		onFail : function(status){
			
		}
	
	});
	}());
	
	//갤러리 즐겨찾기 개수, 작성 갤러리 개수, 수집 갤러리 개수
	(function(){
	$class("sop.portal.galleryAllCountList.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res) {
			if(res.errCd == "0") {
				var result = res.result;
				/*//console.log(result);*/
				/*$("#bookMarkCount").html("즐겨찾기 " +result.bookmarkcount+"개");
				$("#writeGalleryCount").html("작성 갤러리 " +result.writecount+"개");
				$("#nowCount").html("작성 갤러리 " +result.writecount+"개");
				$("#collectGalleryCount").html("수집 갤러리" + result.collectcount+"개");
				$("#likeCount").html("추천 수" + result.likecount+"개");*/
				
				var html = "";
				html += "<div class='cycle' onclick='$resultGallery.goCollection();'>My</div>";
				html += "<div class='info' onclick='$resultGallery.goCollection();'>";
				html += "<p class='p01'>"+result.memberNm+"</p>";
				html += "<p class='p02'>";
				html += "<span class='t01'>갤러리 "+result.writecount+"개</span>";
				html += "<span class='t02'>좋아요 "+result.likecount+"개</span>";
				html += "</p>";
				html += "</div>";
				
				$("#myStatus").html(html);
				
				
			} else {
				messageAlert.open("알림", res.errMsg);
			}				
		},
		onFail : function(status) {
		}
	});
	}());
	
	//댓글 수정
	(function(){
	$class("sop.portal.updateReply.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res) {
			if(res.errCd == "0") {
				$("#replyContent").val("");
				$(".btnGesi").prop('href', 'javascript:$resultGallery.insertGalleryReply()');
				$(".btnGesi").text("댓글등록");
				
				var dataId = $(".dialogGtype").attr("id");
				var sopPortalGalleryViewObj = new sop.portal.galleryView.api();
	    		sopPortalGalleryViewObj.addParam("data_id", dataId);
	    		sopPortalGalleryViewObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/edu_gallery/galleryView.json"
				});
				
				$('body, html').animate({scrollTop: 0}, 450);
				
			} else {
				messageAlert.open("알림", res.errMsg);
			}				
		},
		onFail : function(status) {
		}
	});
	}());
	
	//즐겨찾기 데이터 가져오기
	(function(){
	$class("sop.portal.selectBookMarkData.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res) {
			
			//alert("res.errCd [" + res.errCd);
			
			if(res.errCd == "0") {
				var result = res.result;
				
				var linkUrl = "";
				var domain = window.location.protocol+"//"+window.location.host;
				
				switch (result.bookMarkData.map_type) {
					case "IMAP":
						linkUrl = domain + "/view/map/interactiveMap/bookmark?"
						break;
					case "BMAP":
						linkUrl = domain + "/view/bizStats/bizStatsMap/bookmark?"
						break;
					case "TECH":
						linkUrl = domain + "/view/technicalBiz/technicalBizMap/bookmark?"
						break;
					case "HMAP":
						linkUrl = domain + "/view/house/houseAnalysisMap/bookmark?"
						break;
					case "THEME":
						linkUrl = domain + "/view/thematicMap/thematicMapMain?"
						break;
				}
				
				
				var url = linkUrl+"id=" + result.bookMarkData.hist_id;
				
				//alert(url);
				
				location.href = url;
				
				
			} else {
				messageAlert.open("알림", res.errMsg);
			}				
		},
		onFail : function(status) {
		}
	});
	}());


	
	
	
	
	
	
	
}(window, document));