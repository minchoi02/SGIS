(function(W, D) {
	W.$communityMapPoi = W.$communityMapPoi || {};
	$(document).ready(function() {
		$communityMapPoi.event.setUIEvent();
	});
	$communityMapPoi.ui = {
		markers:[],//마커 object
		markersObject:null,//poi id로 key 된 마커 object
		detailSwiper:null,//상세보기의 이미지 swiper
		
		/**
		 * @name             : markerInit
		 * @description      : 마커 초기화
		 * @date             : 2020. 07. 09. 
		 * @author           : 박은식
		 * @history          :
		 * */
		markerInit : function(){
			$(".sop-pane .sop-marker-pane img").remove();
		},
		
		/**
		 * @name             : createMarker
		 * @description      : 마커 생성
		 * @date             : 2016. 03. 21. 
		 * @author           : 나광흠
		 * @history          :
		 * @param symbol     : 심볼 url
		 * @param iconSize   : 아이콘 사이즈
		 * @param center     : 중심점
		 * @param infoWindow : infoWindow
		 * @param callback   : callback
		 */
		createMarker : function(symbol,iconSize,center,infoWindow,callback){
			var img = new Image();
			img.onload = function() {
				if(!iconSize){
					iconSize = [this.width,this.height];
				}
				var myIcon = sop.icon({
					iconUrl: symbol,
					iconSize: iconSize
				});
				var marker = sop.marker(center, {icon: myIcon}); //마커 생성시 myIcon 옵션값이용 마커 생성
				marker.addTo($communityMap.ui.map.gMap);
				if(infoWindow){
					marker.bindInfoWindow(infoWindow);
				}
				if(typeof callback === "function"){
					callback(marker);
				}
			}
			img.src = symbol;
			
			
			
			//지도도영역 지우고 의견등록창으로 되돌아옴 
		//	$(".map_size_control").trigger("click");
			$(".InsertForm").css("display", "block");
		},
		/**
		 * @name                : getDetail
		 * @description         : poi 상세 화면
		 * @date                : 2016. 03. 21. 
		 * @author              : 나광흠
		 * @history             :
		 * @param cmmnty_poi_id : poi 아이디
		 */
		getDetail : function(cmmnty_poi_id){
			$communityMap.ui.map.gMap.closeInfoWindow();
			$.ajax({
				type: "POST",
				url: contextPath+"/community/poi.json",
				data:{
					id:cmmnty_poi_id
				},
				dataType: "json",
				async : false,
				success: function(res) {
					if(res.errCd=="0"){
						/*if($communityMapPoi.ui.detailSwiper){
							$communityMapPoi.ui.detailSwiper.destroy(true,true);
							$communityMapPoi.ui.detailSwiper = null;
						}*/
						
						var info = res.result.info;
						
						$(".deleteol").hide();
						
						if( /A|P|M/.test( communityMapInfo.cmmnty_partcptn_grant_yn ) ){
							if( info.is_master == 'Y' && info.is_register == 'Y' ){
								$(".deletebtn").show();
							} else {
								if( info.is_master == 'Y' && info.is_register != 'Y' ){
									$(".deleteol").hide();
								} else {
									$(".deleteol").show();
								}
							}
						} else {
							if( info.is_register == 'Y' ){
								$(".deletebtn").show();
							}
						}
						
						$("#regist-info-photo").empty();
						if(info.image_list.length > 1){
							$("#regist-info-photo").removeClass().addClass("swiper-container").append(
								$("<ul/>",{"class":"SubInfoImgslideBox", "style":"display: flex; flex-direction: row;"}),
								$("<div/>", {"class":"swiper-button-next", "tabindex":"0", "role":"button", "aria-label":"Next slide", "aria-disabled":"false"}),
								$("<div/>", {"class":"swiper-button-prev swiper-button-disabled", "tabindex":"-1", "role":"button", "aria-label":"Previous slide", "aria-disabled":"true"})
							);
						} else {
							$("#regist-info-photo").removeClass().addClass("swiper-container").append(
								$("<ul/>",{"class":"SubInfoImgslideBox", "style":"display: flex; flex-direction: row;"})
							);
						}
						
						$("#regist-info dt").text(info.title);
						$("#regist-info span.date").text("등록일 : "+info.reg_date);
						$("#regist-info dd span.add").html(""+info.reg_lc);
						$("#regist-info dd span.comment").html(""+htmlToText(info.opinion_state));
						if(info.image_list.length>0){
							$.each(info.image_list,function(cnt,node){
								$("#regist-info-photo .SubInfoImgslideBox").append(
									$("<li/>",{"class":"SubInfoImgslide", "style":"box-shadow: 0px 0px 0px rgba(0,0,0,0);"}).append(
										$("<img/>",{"src":sgisContextPath+node.pathNm+"thumbnail/thumbnail-L-"+node.saveFileNm, "style":"width: 300px;"})
									)
								);
							});
							$("#regist-info-photo").show();
						}else{
							$("#regist-info-photo").hide();
						}
						$("#reply_content").val(null);
						$("#reply-list").empty();
						$("#reply-count").text(res.result.reply.length);
						
						if(res.result.reply.length>0){
							$.each(res.result.reply,function(cnt,node){
								var list = $("<li/>");
								list.append($("<span/>",{"class":"comment_cont","text":node.replyContent}));
								list.append($("<span/>",{"class":"name","text":node.usrId}));
								list.append($("<span/>",{"class":"date","text":" "+node.regDate}));
								
								if( node.isRegister=="Y" || ( /M|P|A/.test( communityMapInfo.cmmnty_partcptn_grant_yn ) && 
										communityMapInfo.usr_id !== sop.member_id ) ){
									
									list.append($("<button/>",{"class":"modify","type":"button","text":"댓글수정"}).click(function(){
										srvLogWrite('O0', '10', '03', '04', '', '');
										
										$('html, body').css({'overflow': 'hidden', 'height': '100%'}).on("scoll",function(){
											event.preventDefault();     
											event.stopPropagation();
										});
										
										modifyReply($(this),node,cmmnty_poi_id);
									}));
									list.append($("<button/>",{"class":"delete","type":"button","text":"댓글삭제"}).click(function(){
										srvLogWrite('O0', '10', '03', '05', '', '');
										
										$('html, body').css({'overflow': 'hidden', 'height': '100%'}).on("scoll",function(){
											event.preventDefault();     
											event.stopPropagation();
										});
										
										deleteReply(node,cmmnty_poi_id);
									}));
								}
								
								$("#reply-list").append(list);
							});
						}else{
							$("#reply-list").append($("<li/>").append($("<a/>",{"class":"NoData","text":"등록된 댓글이 존재하지 않습니다."})));
						}
						
						$("#map-container").hide();
						$("#detail-container").data("cmmnty_poi_id",cmmnty_poi_id).show();
						
						$("#regist-info-photo").find("ul").addClass("swiper-wrapper");
						$("#regist-info-photo").find("ul>li").addClass("swiper-slide");
						var detailSwiper = new Swiper("#regist-info-photo", {
							slidesPerView: 1,
							navigation: {
								nextEl: '.swiper-button-next',
								prevEl: '.swiper-button-prev',
							},
							spaceBetween: 20
						});
					}else{
						common_alert(res.errMsg, ""); // alert 팝업 변경
					}
				},
				error: function(xhr, status, errorThrown) {
					common_alert(errorMessage, ""); // alert 팝업 변경
				}
			});
		},
		
		idPwCheck : function(){
			$.ajax({
				type: "POST",
				url: contextPath+"/m2020/community/idPwCheck.json",
				data:{
					id : $communityMapPoi.ui.cmmnty_poi_id,
					check_id : $("#check_id").val(),
					check_pw : $("#check_pw").val()
				},
				dataType: "json",
				async : false,
				success: function(res) {
					if(res.errCd=="0"){
						$("#insert-form").show();
						$(".modifyDiv,.idPwDiv2").hide();
						$("#id").val( $("#check_id").val() );
						$("#pw").val( $("#check_pw").val() );
						$("#check_id, #check_pw").prop("disabled", "disabled");
						
						$communityMapPoi.ui.getPoiInfo();
					} else {
						if( res.errMsg ){
							common_alert( res.errMsg );
						}
					}
				}
			});
		},
		
		btnModify : function( id ){
			var poi_reg_btn_value = $("#poi_reg_btn_value").val();
			
			if( poi_reg_btn_value == 'poi-register-end-button' ){
				common_alert("기간이 종료된 소통지도입니다.");
				return false;
			} else {
				$communityMapPoi.ui.cmmnty_poi_id = id;
				$communityMapPoi.ui.mode = 'M';
				
				$("#" + poi_reg_btn_value ).trigger("click");
			}
		},
		
		btnCancel : function(){
			$(".btn_search00").trigger("click");
		},
		
		getPoiInfo : function(){
			$.ajax({
				type: "POST",
				url: contextPath+"/community/poi.json",
				data:{
					id: $communityMapPoi.ui.cmmnty_poi_id
				},
				dataType: "json",
				async : false,
				success: function(res) {
					if(res.errCd=="0"){
						var info = res.result.info;
						
						$("#cmmnty_title").val( info.title );
						
						$("#loc_x").val( info.x_loc );
						$("#loc_y").val( info.y_loc );
						
						$("#file_input_textLocation").val( info.reg_lc );
						
						$('input.symbol[value='+ info.symbol_id +']').closest('li').click();
						$("#cmmnty_opinion_state").val( info.opinion_state );
						
//						$("#community-file").prepend($("<input/>",{"id":"community-insert-file-"+uuid(),"name":"file","type":"file","accept":"image/*","style":"display:none;"}));
						$("#file-list").show();
						
						for( var i=0; i<info.image_list.length; i++ ){
							var img = info.image_list[i];
							var imgId = img.poiAtchImageId;
							
							$("#file-list ul").append($("<li/>",{"data-id":imgId}).append($("<div/>",{"text":img.oriFileNm}),$("<a/>",{"href":"javascript:void(0);","data-id":imgId}).click(function(e){
								var dataId = $(this).data("id");
								
								$communityForm.ui.deleteFileList.push( dataId );
								$("#file-list ul li[data-id="+dataId+"],#"+dataId).remove();
								
								// 첨부파일 없을 경우 첨부파일 목록 영역 숨김 처리
								if($("#file-list li").length == 0){
									$("#file-list").hide();
								}
							})));
						}
					}
				}
			});
		},
		
		/**
		 * @name        : addMarker
		 * @description : 마커 등록
		 * @date        : 2016. 03. 21. 
		 * @author      : 나광흠
		 * @history     :
		 * @param cnt   : each cnt
		 * @param node  : each node
		 */
		addMarker : function(cnt,node){
			var html = '';
			if(node.image_list.length>0){
				html += '		<div class="swiper-container ContainerSub">';
				html += '		<div class="tooltipImage swiper-wrapper">';
				$.each(node.image_list,function(imageCnt,imageNode){
					html += '		<div class="swiper-slide marker-infoImg">';
					html += '			<img style="min-width: 130px;" src="'+sgisContextPath+imageNode.pathNm+"thumbnail/thumbnail-M-"+imageNode.saveFileNm+'">';
					html += '		</div>';
				});
				html += '	</div>';
				html += '	</div>';
			}
			html += '		<table class="marker-info">';
			html += '			<tr>';
			html += '				<th class="markerInfo-tit">'+ node.title +'</th>';
			html += '			</tr>';
			html += '			<tr>';
			html += '				<td class="text">작성자 : '+node.usr_id+'</td>';
			html += '			</tr>';
			html += '			<tr>';
			html += '				<td class="text">작성일 : '+node.reg_date+'</td>';
			html += '			</tr>';
			html += '			<tr>';
			
			var btnVisible = false;
			var grant_yn = communityMapInfo.cmmnty_partcptn_grant_yn;
			
			if( sop.member_id ){ //로그인
				if( ( node.is_master == 'Y' && node.is_register == 'Y' ) || ( node.is_register == 'Y' ) ||
						( node.is_master == 'N' && /A|P|M/.test( grant_yn ) ) ){
					btnVisible = true;
				}
			} else { //비로그인
				if( !/N|Y/.test( grant_yn ) ){ //권한:로그인사용자, 개설자 승인 이 아닌 경우 
					btnVisible = true;
				}
			}
			
			if( btnVisible ){
				html += '			<td class="button"><a href="#" style="padding:8px 20px!important;" onclick="javascript:srvLogWrite(\'O0\', \'10\', \'03\', \'01\', \'\', \'\'); $communityMapPoi.ui.getDetail(\''+node.cmmnty_poi_id+'\');">상세보기</a></td>';
				html += '			<td class="button"><a style="margin-left:3px;padding:8px 20px!important;" href="#" onclick="javascript:srvLogWrite(\'O0\', \'10\', \'03\', \'01\', \'\', \'\'); $communityMapPoi.ui.btnModify(\''+node.cmmnty_poi_id+'\');">수정</a></td>';
			} else {
				html += '				<td class="button"><a href="#" style="padding:8px 50px!important;" onclick="javascript:srvLogWrite(\'O0\', \'10\', \'03\', \'01\', \'\', \'\'); $communityMapPoi.ui.getDetail(\''+node.cmmnty_poi_id+'\');">상세보기</a></td>';
			}
			
			html += '			</tr>';
			html += '		</table>';

			var symbolImage,symbolSize=null;
			if(node.reg_symbol){
				symbolImage = sgisContextPath+'/img/community/iconset_'+node.reg_symbol+node.symbol_id+'.png';
			}else{
				var path = node.symbol.substring(0,node.symbol.lastIndexOf("/")+1);
				var name = node.symbol.substring(node.symbol.lastIndexOf("/")+1);
				symbolImage = sgisContextPath+path+"thumbnail/thumbnail-L-"+name;
				symbolSize = [23,28];
			}
			$communityMapPoi.ui.createMarker(symbolImage,symbolSize,[node.x_loc, node.y_loc],html,function(marker){
				$communityMapPoi.ui.markers.push(marker);
				$communityMapPoi.ui.markersObject[node.cmmnty_poi_id] = marker;
				marker.on("click",function(e){
					$communityMap.ui.map.infoWindow.update("");
					console.log(marker._utmk)
					$communityMap.ui.centerMove(marker._utmk.x, marker._utmk.y);// 마커클릭시 해당마커 중앙에 위치
				});
				marker.on("infowindowopen",function(e){
					new Swiper(".swiper-container", {
						pagination: '.swiper-pagination',
						slidesPerView: 1,
						paginationClickable: true,
						spaceBetween: 0
					});
				});
			});
		},
		/**
		 * @name           : getList
		 * @description    : 의견 리스트
		 * @date           : 2016. 03. 21. 
		 * @author         : 나광흠
		 * @history        :
		 * @param type     : type
		 * @param callback : callback
		 */
		getList : function(type,callback){
			if(!type){
				type = "all";
			}
			var obj = new sop.openApi.communityPoiList.api();
			var title = $("#community-keyword").val();
			if(type!="markers"){
				obj.addParam("page", $communityView.ui[type].page);
				if($communityView.ui[type].keywords){
					obj.addParam("keywords", $communityView.ui[type].keywords);
				}
				obj.addParam("pageSize", "999");
			}
			obj.addParam("id", getParameter("id"));
			obj.addParam("type", type);
			obj.addParam("title", title);
			obj.request({
				method: "POST",
				async: false,
				url: contextPath + "/community/poiList.json",
				options:{
					type : type,
					callback : callback
				}
			});
		}
	};
	$communityMapPoi.event = {
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2016. 06. 28. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		setUIEvent: function() {
			$("body").on("click",".marker-info .navigator>button",function(){
				$(this).parent().children("button").removeClass("M_on");
				$(this).addClass("M_on");
				$(this).parents(".marker-info").find(".image>img").hide();
				$(this).parents(".marker-info").find(".image>img:eq("+$(this).index()+")").show();
			});
		}
	};
	/**
	 * @name                : deleteReply
	 * @description         : 댓글 삭제 
	 * @date                : 2016. 03. 21. 
	 * @author              : 나광흠
	 * @history             :
	 * @param node          : each node
	 * @param cmmnty_poi_id : POI 아이디
	 */
	function deleteReply(node,cmmnty_poi_id){
		var stamp = uuid();
		var html="";
		html+='<span class="popTitle" style="padding-left:100px;">댓글삭제</span>' 	
		if(communityMapInfo.cmmnty_partcptn_grant_yn=="P"&&communityMapInfo.usr_id!==sop.member_id){
			html+='<p for="content-'+stamp+' id="modify_popup_confirm_message" class="sfbLabel00" style="margin-left:7%">아이디</p>';
			html+='<input type="text" id="id-'+stamp+'" class="communityInput" placeholder="아이디를 입력하세요" style="width:80%; margin-left:7%">';
		}
		if(/M|P|A/.test(communityMapInfo.cmmnty_partcptn_grant_yn)&&communityMapInfo.usr_id!==sop.member_id){
			html+='<p for="content-'+stamp+' id="modify_popup_confirm_message" class="sfbLabel00" style="margin-left:7%">비밀번호</p>';
			html+='<input type="password" id="pw-'+stamp+'" class="communityInput" placeholder="비밀번호를 입력하세요" style="width:80%; margin-left:7%">';
		}
		replyEdit("알림",html,[{ // alert 팝업 변경
			title:"삭제하기",
			func : function() {
				var data = {
					poi_reply_id:node.poiReplyId
				};
				var deletePassword = $(this).find("#pw-"+stamp).val();
				var deleteId = $(this).find("#id-"+stamp).val();

				if(communityMapInfo.cmmnty_partcptn_grant_yn=="P"&&communityMapInfo.usr_id!==sop.member_id){
					if(deleteId.replace(/ /,"")==""||deleteId==undefined){
						common_alert("아이디를 입력해주세요",function(){ // alert 팝업 변경
							deleteReply(node,cmmnty_poi_id);
						});
						return false;
					}else{
						data.id = deleteId;
					}
				}
				if(/M|P|A/.test(communityMapInfo.cmmnty_partcptn_grant_yn)&&communityMapInfo.usr_id!==sop.member_id){
					if(deletePassword.replace(/ /,"")==""||deletePassword==undefined){
						common_alert("비밀번호를 입력해주세요",function(){ // alert 팝업 변경
							deleteReply(node,cmmnty_poi_id);
						});
						return false;
					}else{
						data.pw = deletePassword;
					}
				}
				$.ajax({
					type: "POST",
					url: contextPath+"/community/reply/delete.json",
					data:data,
					dataType: "json",
					async : false,
					success: function(res) {
						if(res.errCd=="0"){
							$communityMapPoi.ui.getDetail(cmmnty_poi_id);
							common_alert("삭제되었습니다", function(){
								$('html, body').css({'overflow': 'auto', 'height': '100%'}).on("scroll", function(){
									event.preventDefault();     
									event.stopPropagation();
								});
							}); // alert 팝업 변경
							
						}else{
							common_alert(res.errMsg, ""); // alert 팝업 변경
						}
					},
					error: function(xhr, status, errorThrown) {
						common_alert(errorMessage, ""); // alert 팝업 변경
					}
				});
			}
		},{title:"취소하기"}]);
	}
	/**
	 * @name                : modifyReply
	 * @description         : 댓글 수정 
	 * @date                : 2016. 03. 21. 
	 * @author              : 나광흠
	 * @history             :
	 * @param element       : element
	 * @param node          : each node
	 * @param cmmnty_poi_id : POI 아이디
	 */
	function modifyReply(element,node,cmmnty_poi_id){
		var stamp = uuid();
		var ok = {
			title:"수정",
			func : function() {
				var modifyText = $(this).find("#content-"+stamp).val();
				var modifyId = $(this).find("#id-"+stamp).val();
				var modifyPassword = $(this).find("#pw-"+stamp).val();
				var data = {
					poi_reply_id:node.poiReplyId,
					content:modifyText
				};
				if(modifyText.replace(/ /,"")==""||modifyText==undefined){
					common_alert("댓글 내용을 입력해주세요",function(){ // alert 팝업 변경
						element.click();
					});
				}else{
					if(communityMapInfo.cmmnty_partcptn_grant_yn=="P"&&communityMapInfo.usr_id!==sop.member_id){
						if(modifyId.replace(/ /,"")==""||modifyId==undefined){
							common_alert("아이디를 입력해주세요",function(){ // alert 팝업 변경
								element.click();
							});
							return false;
						}else{
							data.id = modifyId;
						}
					}
					if(/M|P|A/.test(communityMapInfo.cmmnty_partcptn_grant_yn)&&communityMapInfo.usr_id!==sop.member_id){
						if(modifyPassword.replace(/ /,"")==""||modifyPassword==undefined){
							common_alert("비밀번호를 입력해주세요",function(){ // alert 팝업 변경
								element.click();
							});
							return false;
						}else{
							data.pw = modifyPassword;
						}
					}
					$.ajax({
						type: "POST",
						url: contextPath+"/community/reply/modify.json",
						data:data,
						dataType: "json",
						async : false,
						success: function(res) {
							if(res.errCd=="0"){
								$communityMapPoi.ui.getDetail(cmmnty_poi_id);
								common_alert("수정되었습니다", function(){
									$('html, body').css({'overflow': 'auto', 'height': '100%'}).on("scroll", function(){
										event.preventDefault();     
										event.stopPropagation();
									});
								}); // alert 팝업 변경
								
							}else{
								common_alert(res.errMsg, ""); // alert 팝업 변경
							}
						},
						error: function(xhr, status, errorThrown) {
							common_alert(errorMessage, "");
						}
					});
				}
			}
		}
		//html 수정 start
		var html="";
		html+='<span class="popTitle" style="padding-left: 100px;">댓글수정</span>'
		html+='<p for="content-'+stamp+' id="modify_popup_confirm_message" class="sfbLabel00" style="margin-left:7%">댓글내용</p>';
		html+='<input type="text" id="content-'+stamp+'" class="communityInput" placeholder="댓글 내용을 입력해주세요" value="'+node.replyContent+'" style="width:80%; margin-left:7%">';
		html+='</div>';
		if(communityMapInfo.cmmnty_partcptn_grant_yn=="P"&&communityMapInfo.usr_id!==sop.member_id){
			html+='<p for="content-'+stamp+' id="modify_popup_confirm_message" class="sfbLabel00" style="margin-left:7%">아이디</p>';
			html+='<input type="text" id="id-'+stamp+'" class="communityInput" placeholder="아이디를 입력하세요" style="width:80%; margin-left:7%">';
		}
		if(/M|P|A/.test(communityMapInfo.cmmnty_partcptn_grant_yn)&&communityMapInfo.usr_id!==sop.member_id){
			html+='<p for="content-'+stamp+' id="modify_popup_confirm_message" class="sfbLabel00" style="margin-left:7%">비밀번호</p>';
			html+='<input type="password" id="pw-'+stamp+'" class="communityInput" placeholder="비밀번호를 입력하세요" style="width:80%; margin-left:7%">';
		}
		replyEdit("수정",html,[ok,{title:"취소"}],""); //팝업 변경
		//html 수정 start
	}	
	
	/**
	 * @name        : makeLists
	 * @description : 리스트 생성
	 * @date        : 2016. 03. 21. 
	 * @author      : 나광흠
	 * @history     :
	 * @param res   : response
	 */
	function makeLists(res){
		$.each(res.result.list,function(cnt,node){
			if(node.image_list){
				var image="";
				$communityMapPoi.ui.addMarker(cnt,node);
			}else{
				$communityMapPoi.ui.addMarker(cnt,node);
			}
		});
	}
	/*********** 소통지도 POI 리스트 시작 **********/
	(function() {
		$class("sop.openApi.communityPoiList.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if(options.type=="markers"){
					$communityMapPoi.ui.markers = [];
					$communityMapPoi.ui.markersObject = {};
				}
				if(res.errCd == "0") {
					if(options.type=="markers"){
						makeLists(res);
					}else{
						var list = $("#"+options.type+"-community .List>ul"); 
						list.empty();
						$("#"+options.type+"-poi-count").text((res.result.list).length); // 소통지도 리스트 검색개수 적용 
						if(res.result.list.length>0){
							$.each(res.result.list,function(cnt,node){
								var symbolImage,symbolSize="";
								if(node.reg_symbol){
									symbolImage = sgisContextPath+'/img/community/iconset_'+node.reg_symbol+node.symbol_id+'.png';
								}else{
									var path = node.symbol.substring(0,node.symbol.lastIndexOf("/")+1);
									var name = node.symbol.substring(node.symbol.lastIndexOf("/")+1);
									symbolImage = sgisContextPath+path+"thumbnail/thumbnail-L-"+name;
									symbolSize = "background-size: 23px 28px;"
								}
								list.append($("<li/>").append(
									$("<a/>").append(
										$("<span/>",{"class":"title","text":node.title}),
										$("<span/>",{"class":"date","text":node.reg_date})
									).click(function(){
										$("body").scrollTop(0);
										var marker = $communityMapPoi.ui.markersObject[node.cmmnty_poi_id];
										marker._map.setView([marker._utmk.x,marker._utmk.y]);
										setTimeout(function(){
											marker.openInfoWindow();
										},100);
									})
								));
							});
						}else{
							list.append($("<a/>",{"class":"NoData","text":"등록된 자료가 존재하지 않습니다."}));
						}
					}
				}else{
					common_alert(res.errMsg);
				}
			},
			onFail: function(status) {
				common_alert(errorMessage);
			}
		});
	}());
	/*********** 소통지도 POI 리스트 종료 **********/
}(window, document));

function jusoCallBack(
		roadFullAddr,roadAddrPart1,addrDetail,roadAddrPart2,engAddr, jibunAddr, zipNo, admCd, rnMgtSn, 
		bdMgtSn,detBdNmList,bdNm,bdKdcd,siNm,sggNm,emdNm,liNm,rn,udrtYn,buldMnnm,buldSlno,mtYn,lnbrMnnm,lnbrSlno,emdNo){
	
	//팝업 콜백함수 호출
	popupCallback( jibunAddr, roadFullAddr );
}