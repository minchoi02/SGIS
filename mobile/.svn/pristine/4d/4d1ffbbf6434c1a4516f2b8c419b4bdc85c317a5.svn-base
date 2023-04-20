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
			srvLogWrite("M0", "08", "03", "08", "", "");		//등록지도 목록보기
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
						if($communityMapPoi.ui.detailSwiper){
							$communityMapPoi.ui.detailSwiper.destroy(true,true);
							$communityMapPoi.ui.detailSwiper = null;
						}
						$("#regist-info-photo").empty();
						$("#regist-info-photo").removeClass().addClass("swiper-container").append($("<div/>",{"class":"swiper-wrapper"}),$("<div/>",{"class":"swiper-pagination"}),$("<div/>",{"class":"swiper-button-next"}),$("<div/>",{"class":"swiper-button-prev"}));
						$("#regist-info dt").text(res.result.info.title);
						$("#regist-info dd span.date").text("등록일 : "+res.result.info.reg_date);
						$("#regist-info dd span.add").html("<strong>위치</strong>"+res.result.info.reg_lc);
						$("#regist-info dd span.comment").html("<strong>의견</strong>"+htmlToText(res.result.info.opinion_state));
						if(res.result.info.image_list.length>0){
							$.each(res.result.info.image_list,function(cnt,node){
								$("#regist-info-photo .swiper-wrapper").append(
									$("<div/>",{"class":"swiper-slide"}).append(
										$("<img/>",{"src":sgisContextPath+node.pathNm+"thumbnail/thumbnail-L-"+node.saveFileNm})
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
								if(node.isRegister=="Y"||(/M|P|A/.test(communityMapInfo.cmmnty_partcptn_grant_yn)&&communityMapInfo.usr_id!==sop.member_id)){
									list.append($("<button/>",{"class":"modify","type":"button","text":"댓글수정"}).click(function(){modifyReply($(this),node,cmmnty_poi_id);}));
									list.append($("<button/>",{"class":"delete","type":"button","text":"댓글삭제"}).click(function(){deleteReply(node,cmmnty_poi_id);}));
								}
								$("#reply-list").append(list);
							});
						}else{
							$("#reply-list").append($("<li/>").append($("<a/>",{"class":"NoData","text":"등록된 댓글이 존재하지 않습니다."})));
						}
						$("#map-container").hide();
						$("#detail-container").data("cmmnty_poi_id",cmmnty_poi_id).show();
						$communityMapPoi.ui.detailSwiper = new Swiper("#regist-info-photo", {
							pagination: '#regist-info-photo .swiper-pagination',
							nextButton: '#regist-info-photo .swiper-button-next',
							prevButton: '#regist-info-photo .swiper-button-prev',
							slidesPerView: 1,
							paginationClickable: true,
							spaceBetween: 30,
							loop: true
						});
					}else{
						messageAlert.open("알림",res.errMsg);
					}
				},
				error: function(xhr, status, errorThrown) {
					messageAlert.open("알림",errorMessage);
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
			html += '<table class="marker-info">';
			html += '	<tbody>';
			html += '		<tr>';
			html += '			<th><div><strong>' + node.title + '</strong></div></th>';
			html += '		</tr>';
			html += '		<tr>';
			html += '			<td class="text">작성자 : '+node.usr_id+'</td>';
			html += '		</tr>';
			html += '		<tr>';
			html += '			<td class="text">작성일 : '+node.reg_date+'</td>';
			html += '		</tr>';
			if(node.image_list.length>0){
				html += '		<tr>';
				html += '			<td>';
				html += '				<div class="swiper-container">';
				html += '					<div class="swiper-wrapper" style="width:150px;">';
				$.each(node.image_list,function(imageCnt,imageNode){
					html+='<div class="swiper-slide"><img src="'+sgisContextPath+imageNode.pathNm+"thumbnail/thumbnail-M-"+imageNode.saveFileNm+'" style="max-width: 100%;"></div>';
				});
				html += '					</div>';
				html += '					<div class="swiper-pagination"></div>';
				html += '				</div>';
				html += '			</td>';
				html += '		</tr>';
			}
			html += '	</tbody>';
			html += '	<tfoot>';
			html += '		<tr>';
			html += '			<td class="button">';
			html += '				<a href="#" onclick="$communityMapPoi.ui.getDetail(\''+node.cmmnty_poi_id+'\');">상세보기</a>';
			html += '			</td>';
			html += '		</tr>';
			html += '	</tfoot>';
			html += '</table>';
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
				});
				marker.on("infowindowopen",function(e){
					new Swiper(".marker-info .swiper-container", {
						pagination: '.marker-info .swiper-pagination',
						slidesPerView: 1,
						paginationClickable: true,
						spaceBetween: 30,
						loop: true
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
			if(type!="markers"){
				obj.addParam("page", $communityView.ui[type].page);
				if($communityView.ui[type].keywords){
					obj.addParam("keywords", $communityView.ui[type].keywords);
				}
			//	obj.addParam("pageSize", $communityView.ui[type].pageSize);
				obj.addParam("pageSize", "999");
			}
			obj.addParam("id", getParameter("id"));
			obj.addParam("type", type);
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
		var html="댓글을 삭제하시겠습니까?";
		if(communityMapInfo.cmmnty_partcptn_grant_yn=="P"&&communityMapInfo.usr_id!==sop.member_id){
			html+='<div style="text-align: left;font-size:15px;">';
			html+='	<input type="text" id="id-'+stamp+'" class="alertInputBox" placeholder="아이디를 입력하세요">';
			html+='</div>';
		}
		if(/M|P|A/.test(communityMapInfo.cmmnty_partcptn_grant_yn)&&communityMapInfo.usr_id!==sop.member_id){
			html+='<div style="text-align: left;font-size:15px;">';
			html+='	<input type="password" id="pw-'+stamp+'" class="alertInputBox" placeholder="비밀번호를 입력하세요">';
			html+='</div>';
		}
		messageConfirm.open("알림",html,[{
			title:"삭제하기",
			func : function() {
				var data = {
					poi_reply_id:node.poiReplyId
				};
				var deletePassword = $(this).find("#pw-"+stamp).val();
				var deleteId = $(this).find("#id-"+stamp).val();
				if(communityMapInfo.cmmnty_partcptn_grant_yn=="P"&&communityMapInfo.usr_id!==sop.member_id){
					if(deleteId.replace(/ /,"")==""||deleteId==undefined){
						messageAlert.open("알림", "아이디를 입력해주세요",function(){
							deleteReply(node,cmmnty_poi_id);
						});
						return false;
					}else{
						data.id = deleteId;
					}
				}
				if(/M|P|A/.test(communityMapInfo.cmmnty_partcptn_grant_yn)&&communityMapInfo.usr_id!==sop.member_id){
					if(deletePassword.replace(/ /,"")==""||deletePassword==undefined){
						messageAlert.open("알림", "비밀번호를 입력해주세요",function(){
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
							messageAlert.open("알림","삭제되었습니다");
						}else{
							messageAlert.open("알림",res.errMsg);
						}
					},
					error: function(xhr, status, errorThrown) {
						messageAlert.open("알림",errorMessage);
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
					messageAlert.open("알림", "댓글 내용을 입력해주세요",function(){
						element.click();
					});
				}else{
					if(communityMapInfo.cmmnty_partcptn_grant_yn=="P"&&communityMapInfo.usr_id!==sop.member_id){
						if(modifyId.replace(/ /,"")==""||modifyId==undefined){
							messageAlert.open("알림", "아이디를 입력해주세요",function(){
								element.click();
							});
							return false;
						}else{
							data.id = modifyId;
						}
					}
					if(/M|P|A/.test(communityMapInfo.cmmnty_partcptn_grant_yn)&&communityMapInfo.usr_id!==sop.member_id){
						if(modifyPassword.replace(/ /,"")==""||modifyPassword==undefined){
							messageAlert.open("알림", "비밀번호를 입력해주세요",function(){
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
								messageAlert.open("알림","수정되었습니다");
							}else{
								messageAlert.open("알림",res.errMsg);
							}
						},
						error: function(xhr, status, errorThrown) {
							messageAlert.open("알림",errorMessage);
						}
					});
				}
			}
		}
		var html="";
		html+='<div style="text-align: left;font-size:15px;">';
		html+='	<label for="content-'+stamp+'">댓글 내용</label><input type="text" id="content-'+stamp+'" class="alertInputBox" placeholder="댓글 내용을 입력해주세요" value="'+node.replyContent+'">';
		html+='</div>';
		if(communityMapInfo.cmmnty_partcptn_grant_yn=="P"&&communityMapInfo.usr_id!==sop.member_id){
			html+='<div style="text-align: left;font-size:15px;">';
			html+='	<label for="id-'+stamp+'">아이디</label><input type="text" id="id-'+stamp+'" class="alertInputBox" placeholder="아이디를 입력하세요">';
			html+='</div>';
		}
		if(/M|P|A/.test(communityMapInfo.cmmnty_partcptn_grant_yn)&&communityMapInfo.usr_id!==sop.member_id){
			html+='<div style="text-align: left;font-size:15px;">';
			html+='	<label for="pw-'+stamp+'">비밀번호</label><input type="password" id="pw-'+stamp+'" class="alertInputBox" placeholder="비밀번호를 입력하세요">';
			html+='</div>';
		}
		messageConfirm.open("수정",html,[ok,{title:"취소"}],"");
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
						$("#"+options.type+"-poi-count").text(res.result.total);
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
										/*
										 * 
										$("<span/>",{"class":"position","text":node.reg_lc}),	
										$("<span/>",{"class":"comment","text":node.reply_cnt})	
										 */
										$("<span/>",{"class":"date","text":node.reg_date})
									).click(function(){
										srvLogWrite("M0", "08", "03", "07", "", "");		//등록항목 조회
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
					//	createPaging("#"+options.type+"-community .Pasing", res.result.total, $communityView.ui[options.type], "page");
					}
				}else{
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail: function(status) {
				messageAlert.open("알림", errorMessage);
			}
		});
	}());
	/*********** 소통지도 POI 리스트 종료 **********/
}(window, document));