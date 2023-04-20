(function(W,D){
	W.$eduMainApi = W.$eduMainApi || {};

	$(document).ready(function() {
		srvLogWrite('T0','05','01','01','H','');

		
		var relKwrdCnt = 0;
		//연관검색어 선택 시 이벤트
		$(".searchForm ul li").click(function(){
		    $(".search").val($(this).text());
		    $(".searchForm ul").removeClass("on");
		});
		
		$("#searchInput").keyup(function(key){
			if(key.keyCode != 38 && key.keyCode != 40 ){
				if("" != $("#searchInput").val() && null != $("#searchInput").val()){
				    $(".searchForm ul").addClass("on");
				    if(!keyTmp){
				    	$eduMainApi.eduRelationKwrdList();
				    	relKwrdCnt = 0;
				    }
				}else{
					$(".searchForm ul").removeClass("on");
				}
			}
		});
		
		//검색어 입력
		$("#searchInput").keydown(function(key){
			
			keyTmp = false;
			
			if("" != $("#searchInput").val().trim() && null != $("#searchInput").val().trim() ){
				//enter
				if(key.keyCode == 13){
//					if(relKwrdCnt != 0){
//						$("#searchInput").val($("#rel_"+relKwrdCnt).text());
//						relKwrdCnt = 0;
//					}else{
						$eduMainApi.kwrd = $("#searchInput").val();
						srvLogWrite('T0','05','01','02','H','kwrd='+$eduMainApi.kwrd);
						location.href="/view/edu/high/searchAll?kwrd="+$("#searchInput").val();
//					}
				}
				//up
				else if(key.keyCode == 38){
					keyTmp = true;
					if(relKwrdCnt > 1){
						relKwrdCnt--;
						$("#relationKwrdDiv li").removeClass("on");
						$("#rel_"+relKwrdCnt).addClass("on");
						$("#searchInput").val($("#rel_"+relKwrdCnt).text());
						$("#rel_"+relKwrdCnt).get(0).scrollIntoView(false);
					}else if(relKwrdCnt == 1){
						relKwrdCnt = 0;
						$("#relationKwrdDiv li").removeClass("on");
						//$(".searchForm ul").removeClass("on");
					}
				//down
				}else if(key.keyCode == 40){
					keyTmp = true;
					if(relKwrdCnt < $("#relationKwrdDiv a").length){
						relKwrdCnt++; 
						$("#relationKwrdDiv li").removeClass("on");
						$("#rel_"+relKwrdCnt).addClass("on");
						$("#searchInput").val($("#rel_"+relKwrdCnt).text());
					}
					$("#rel_"+relKwrdCnt).get(0).scrollIntoView(false);
				}
			}else {
				relKwrdCnt = 0 ;
			}
			
		});
			

		//주제별 인기검색어 이벤트
		$('.slideBox').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
		    //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
		    var i = (currentSlide ? currentSlide : 0) + 1;
		    $('.slideNum strong').text(Math.ceil(i / 3));
		    $(".slideNum i").text(Math.ceil(slick.slideCount / 3));
		});
		
		//$(".slideBox").slick('unslick');
		$eduMainApi.eduHighMainContents();
		
	});
	
	$eduMainApi = {
		//메인 표출 데이터 바인딩 
		eduHighMainContents : function (){
			
			$.ajax({
				url: '/ServiceAPI/edu/eduHighMainContentsList.json',
				type:  'POST',
				data:  {
					'school_grade' : 'H',
					'main_yn' : 'Y'
				},
				dataType: 'json'
					
			}).success(function(res){
				var html="";
				$.each(res.result.resultThemaList, function(i, val){
					html += "<div class='slideObj'>";
					html += "<em>"+val.thema_nm+"</em>";
					html += "<ol>";
					$.each(val.kwrdList, function(j, wrd){
						html += "<li><a href=\"javascript:logWriteAndMove('/view/edu/high/searchAll?kwrd="+wrd.srchwrd+"','T0','05','01','04','H','kwrd="+wrd.srchwrd+"')\">"+wrd.srchwrd+"</a></li>";
					})
					html += "</ol>";
					html += "</div>";
					
				});
				
				$("#slideBox").html(html);
				
				$('.slideBox').slick({
		            variableWidth:true,
		            infinite: false,
		            slidesToShow: 3,
		            prevArrow : "<a class='btnPage02 prev'>prev</a>",
		            nextArrow : "<a class='btnPage02 next'>next</a>",
		            slidesToScroll: 3,
		            dots:false,
		            speed : 700,
		            customPaging: function (slider, i) {
		                    //FYI just have a look at the object to find available information
		                    //press f12 to access the console in most browsers
		                    //you could also debug or look in the source
		                    console.log(slider);
		                    return  (i + 1) + '/' + slider.slideCount;
		                }
		        });
				
				html = "";
				
				//section2 배우는지도
				$.each(res.result.resultTchpgmList, function(i, val){
					html += "<li class='"+val.new_type+"'>";
					html += "<a href='javascript:logWriteAndMove(\"/view/edu_gallery/resultGallery?param_ss_school_grade=H&data_id="+val.tchpgm_seq+"\", \"T0\", \"05\", \"01\", \"06\", \"H\", \"data_id="+val.tchpgm_seq+"\")'>";
					html += "<em class='cardTi'>"+val.tchpgm_title+"</em>";
					
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
					html += "<a href='javascript:logWriteAndMove(\"/view/edu/high/community/together_view?cmmnty_map_id="+val.cmmnty_map_id+"\", \"T0\", \"05\", \"01\", \"08\", \"H\", \"data_id="+val.cmmnty_map_id+"\")'>";
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
					html+="<a href='javascript:logWriteAndMove(\"/view/edu/high/boardView?board_cd=BOARD_012&post_no="+val.post_no+"\", \"T0\", \"05\", \"01\", \"10\", \"H\", \"post_no="+val.post_no+"\")'>";
					html+="<span>"+val.post_title+"</span>";
					html+="<span class='date'>"+val.reg_ts+"</span>";
					html+="</a>";
					html+="</li>";
				});
				$("#board12List").html(html);
				
				html= "";
				$.each(res.result.resultBoard13List, function(i, val){
					html+="<li>";
					html+="<a href='javascript:logWriteAndMove(\"/view/edu/high/boardView?board_cd=BOARD_013&post_no="+val.post_no+"\", \"T0\", \"05\", \"01\", \"12\", \"H\", \"post_no="+val.post_no+"\")'>";
					html+="<span>"+val.post_title+"</span>";
					html+="<span class='date'>"+val.reg_ts+"</span>";
					html+="</a>";
					html+="</li>";
				});
				$("#board13List").html(html);
				
			})
		},
		eduRelationKwrdList : function(){
			var kwrd = $("#searchInput").val();
			var html = "";
			$.ajax({
				url: '/ServiceAPI/edu/eduRelationKwrdList.json',
				type:  'POST',
				data:  {
					'kwrd' : kwrd
				},
				dataType: 'json'
			}).success(function(res){
				$.each(res.result.resultList, function(i, val){
//					html += "<a href='/view/edu/high/searchAll?kwrd="+val.kwrd+"'><li>"+val.kwrdtag+"</li></a>";
					html += "<a href='/view/edu/high/searchAll?kwrd="+val.kwrd+"'><li id='rel_"+(i+1)+"'>"+val.kwrd+"</li></a>";
				})
				$("#relationKwrdDiv").html(html);
			})
		}
	}
	
}(window, document));
	

