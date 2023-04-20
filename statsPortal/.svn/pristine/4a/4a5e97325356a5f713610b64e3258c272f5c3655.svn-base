(function(W,D){
	W.$eduMainApi = W.$eduMainApi || {};

	$(document).ready(function() {
		$(".slideBox").slick('unslick');
		$eduMainApi.eduMidMainContents();
		srvLogWrite('T0','04','01','01','M','');

		
	});
	
	$eduMainApi = {
		eduMidMainContents : function (){
			
			$.ajax({
				url: '/ServiceAPI/edu/eduMidMainContentsList.json',
				type:  'POST',
				data:  {
					'school_grade' : 'M',
					'main_yn' : 'Y'
				},
				dataType: 'json'
					
			}).success(function(res){
				var html="";
				$.each(res.result.resultList, function(i, val){
					html+= "<div class='slideObj "+val.img_file_nm+"'>";
					html+= "<div class='inner'>";
					html+= "<div class='slideNum'>";
					html+= "<strong>"+(i+1)+"</strong><i>"+res.result.resultList.length+"</i>";
					html+= "</div>";
					html+= "<p>"+val.thema_nm+"</p>";
					html+= "<span>"+val.thema_exp+"</span>";
					html+= "<button type='button' onclick=\"javascript:logWriteAndMove('/view/edu/mid/classList?thema_id="+val.thema_id+"','T0','04','01','02','M','thema_id="+val.thema_id+"')\" class='btn btnN02 btnArr'>지금 콘텐츠 알아보기</button>";
					//html+= "<img src='"+val.img_file_nm+"' class='idximg0"+(i+1)+"'/>";
					html+= "</div>";
					html+= "<article class='sect sect02'>";
					html+= "<div class='inner'>";
					html+= "<ul class='card card01'>";
					$.each(val.contentsList, function(j, con){
						html+= "<li>";
						html+= "<a href=\"javascript:logWriteAndMove('/view/edu/mid/classDetail?contents_id="+con.contents_id+"','T0','04','01','03','M','contents_id="+con.contents_id+"')\">";
						html+= "<em class='cardTi'>"+con.contents_title+"</em>";
						$.each(con.tagList, function(h, tag){
								//tag 최대 5개까지 조회
								if(h < 5){
									html+= "<i class='hashTag'>"+tag.kwrd+"</i>";
								}
						})
						html+= "</a>";
						html+= "</li>";
					});
					html+= "</ul>";
					html+= "</div>";
					html+= "</article>";
					html+= "</div>";
					
				});
				$("#slideBox").html(html);
				$(".slideBox").slick({
						prevArrow : "<a class='btnPage01 prev'><em>PREV</em><i>이전<br/>주제보기</i></a>",
						nextArrow : "<a class='btnPage01 next'><em>NEXT</em><i>다음<br/>주제보기</i></a>"
				});
				
				html = "";
				
				//section2 배우는지도
				$.each(res.result.resultTchpgmList, function(i, val){
					html += "<li class='"+val.new_type+"'>";
					html+= "<a href=\"javascript:logWriteAndMove('/view/edu_gallery/resultGallery?param_ss_school_grade=M&data_id="+val.tchpgm_seq+"','T0','04','01','05','M','tchpgm_seq="+val.tchpgm_seq+"')\">";
					html+= "<em class='cardTi'>"+val.tchpgm_title+"</em>";
					$.each(val.tagList, function(j, tag){
						html+= "<i class='hashTag'>"+tag.kwrd+"</i>";
					});
					html+= "<span class='cardInfo'>";
					html+= "<i class='userId'>"+val.member_id+"</i>";
					html+= "<i class='date'>"+val.reg_dt+"</i>";
					html+= "<i class='viewer'>"+val.hits+"</i>";
					html+= "</span>";
					html+= "</a>";
					html+= "</li>";
				});
				
				$("#tchpgmDiv").html(html);
				
				html = "";
				//section3 함께하는지도
				$.each(res.result.resultWithMapList, function(i, val){
					html += "<li class='"+val.new_type+"'>";
					html += "<a href=\"javascript:logWriteAndMove('/view/edu/mid/community/together_view?cmmnty_map_id="+val.cmmnty_map_id+"','T0','04','01','07','M','cmmnty_map_id="+val.cmmnty_map_id+"')\">";
					html += "<span class='cardHead'>";
					if(val.cmmnty_partcptn_grant_yn =='A'){
						html += "<i class='level level01'></i>";
					}else if(val.cmmnty_partcptn_grant_yn =='P'){
						html += "<i class='level level02'></i>";
					}else if(val.cmmnty_partcptn_grant_yn =='L'){
						html += "<i class='level level03'></i>";
					}else {
						html += "<i class='level level04'></i>";
					}
					html += "</span>";
					html += "<em class='cardTi'>"+val.cmmnty_map_nm+"</em>";
					$.each(val.tagList, function(j, tag){
						html+= "<i class='hashTag'>"+tag.kwrd+"</i>";
					});
					html += "<span class='cardInfo'>";
					html += "<i class='userId'>"+val.usr_id+"</i>";
					html += "<i class='date'>"+val.reg_date+"</i>";
					html += "<i class='viewer'>"+val.join_cnt+"</i>";
					html += "</span>";
					html += "<span class='people'>"+val.poi_cnt+"</span>";
					html += "</a>";
					html += "</li>";
				});
				$("#withMapDiv").html(html);
				
				html= "";
				$.each(res.result.resultBoard12List, function(i, val){
					html+="<li>";
					html+="<a href=\"javascript:logWriteAndMove('/view/edu/mid/boardView?board_cd=BOARD_012&post_no="+val.post_no+"','T0','04','01','09','M','post_no="+val.post_no+"')\">";
					html+="<span>"+val.post_title+"</span>";
					html+="<span class='date'>"+val.reg_ts+"</span>";
					html+="</a>";
					html+="</li>";
				});
				$("#board12List").html(html);
				
				html= "";
				$.each(res.result.resultBoard13List, function(i, val){
					html+="<li>";
					html+="<a href=\"javascript:logWriteAndMove('/view/edu/mid/boardView?board_cd=BOARD_013&post_no="+val.post_no+"','T0','04','01','11','M','post_no="+val.post_no+"')\">";
					html+="<span>"+val.post_title+"</span>";
					html+="<span class='date'>"+val.reg_ts+"</span>";
					html+="</a>";
					html+="</li>";
				});
				$("#board13List").html(html);
			})
		},
		
		selectListInitClick : function(){
			
			$("body").off("click",".galleryListItem li");
			$("body").off("click",".rightClose");
			$('body').off("keyup keypress");
			$("body").off("mouseenter",".galleryListItem li");
			$("body").off("mouseleave",".galleryListItem li");
			$("body").off("click","#galleryInsertButton");
			$("body").on("click",".galleryListItem li", function(){
				srvLogWrite('J0','04','01','00','','');
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
	    			$('#dialogDiv').load("/view/edu_gallery/viewStatsGalleryDialog.jsp");
	    			
		    		//$("#mCSB_1_container").css("width", dialog689);
		    		//$("#mCSB_2_container").css("width", dialog270);
		    					    		

		    		$(".dialogGtype").fadeIn("slow");
	    		}
	    	});
			$("body").on("click",".rightClose", function(){
	    		$('#dialogDiv').attr("class","");
	    		/*$('#dialogDiv').html("");*/
	    		$('#dialogDiv').empty();
	    		/*$(".dialogGtype").fadeOut("fast");*/
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
	    	
	    	$("body").on("click","#galleryInsertButton",function(){
	    		$resultGallery.insertGallery();
	    	});
	    	
	    	etcGalleryEvent();
	    	
	    	
		},
	}
	
}(window, document));
	
