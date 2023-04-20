(function(W, D) {
	
	W.$communityForm = W.$communityForm || {};
	/**
	 * @name        : popupCallback
	 * @description : 도로명 주소 팝업창의 callback
	 * @date        : 2016. 03. 21. 
	 * @author      : 나광흠
	 * @history     :
	 * @param jibun : 지번주소
	 * @param road  : 도로명주소
	 */
	W.popupCallback = function(jibun,road){
		var addMarker = function(res,address){
			var result = res.result.resultdata[0];
			var center = [result.x,result.y];
			$communityForm.ui.checkCoor(center,function(address){
				$communityForm.ui.createMarker(center,address);
			});
		}
		$communityMap.ui.map.geocode(road,0,0,function(res){
			if(res.errCd=="0"&&res.result.resultdata.length>0){
				addMarker(res,road);
			}else{
				$communityMap.ui.map.geocode(jibun,0,0,function(res){
					if(res.errCd=="0"){
						addMarker(res,road);
					}else{
						messageAlert.open("알림","검색된 좌표가 존재하지 않습니다");
					}
				});
			}
		});
	}
	$(document).ready(function(){
		$communityForm.event.setUIEvent();
		
		//$("#_csrf_id").val(csrf_token );
		var token = $("meta[name='_csrf'").attr("content");
		var header = $("meta[name='_csrf_header'").attr("content");
		$(document).ajaxSend(function(e, xhr, options){
			xhr.setRequestHeader(header, token);
		});
		
		
		
		if( /iPhone|iPad|iPot/i.test(navigator.userAgent)){	//iphone에선 파일 ajax 업로드가 되지 않음
	//		$("#addFileArea").remove();
		}
		
		
	});
	$communityForm.ui = {
		marker : null,//마커
		/**
		 * @name            : createMarker
		 * @description     : 마커 생성
		 * @date            : 2016. 03. 21. 
		 * @author          : 나광흠
		 * @history         :
		 * @param center    : 중심점
		 * @param full_addr : 주소
		 */
		createMarker : function(center,full_addr){
			if( full_addr ){
				full_addr = full_addr.replace(/\s+$/,"");
			}
			$("#file_input_textLocation").val(full_addr).focus();
			$communityMap.ui.map.gMap.setView(center);
			var symbol = $("input[name=symbol]:radio:checked").data("value");
			var symbolImage,symbolSize=null;
			if(symbol){
				symbolImage = sgisContextPath+"/img/community/iconset_"+symbol+$("input[name=symbol]:radio:checked").val()+".png";
			}else{
				symbolImage = sgisContextPath+$("input[name=symbol]:radio:checked").data("symbol-image");
				symbolSize = [23,28];
			}
			$communityMapPoi.ui.createMarker(symbolImage,symbolSize,center,"해당 지점 등록",function(marker){
				if($communityForm.ui.marker){
					$communityForm.ui.marker.remove();
				}
				$communityForm.ui.marker=marker;
				marker.openInfoWindow();
				if($communityMap.ui.map.infoWindow){
					$communityMap.ui.map.infoWindow.update("");
				}
				
				//마커 생성후 지도 감추기
				$("#map").height("0px");
			});
		},
		/**
		 * @name            : checkCoor
		 * @description     : 좌표로 주소 검색 하고 잘못된 자표면 알림창으로 잘못된 좌표라고 보여준다
		 * @date            : 2016. 03. 21. 
		 * @author          : 나광흠
		 * @history         :
		 * @param center    : 중심점
		 * @param callback  : callback
		 */
		checkCoor : function(center,callback){
			$communityMap.ui.map.reverseGeoCode("20",center,function(res){
				if(res.errCd=="0"){
					var full_addr = res.result[0].full_addr;
					$communityMap.ui.map.reverseGeoCode("10",center,function(res){
						if(res.errCd=="0"){
							full_addr = res.result[0].full_addr;
							if( full_addr ){
								full_addr = full_addr.replace(/\s+$/,"");
							}
						}
						if(typeof callback === "function"){
							callback(full_addr);
						}
					});
				}else{
					messageAlert.open("알림","잘못된 좌표가 입니다");
				}
			});
		}
	};
	$communityForm.event = {
		/**
		 * @name          : initMarker
		 * @description   : 마커 초기화
		 * @date          : 2016. 03. 30. 
		 * @author	      : 나광흠
		 * @history       :
		 * @param element : jquery selector
		 */
		initMarker : function(element){
			$("current-poi-button,#direct-poi-button,#popup-poi-button").removeClass("M_on");
			$(element).addClass("M_on");
			if($communityForm.ui.marker){
				$communityForm.ui.marker.remove();
			}
			$("#file_input_textLocation").val("");
		},
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2016. 03. 30. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		setUIEvent: function() {
			$("#current-poi-button").click(function(){
				$communityForm.event.initMarker();
				$communityMap.ui.map.getCurrentLocation(function(center,success,errCd,errMsg){
					if(success){
						$("#current-poi-button,#direct-poi-button,#popup-poi-button").removeClass("M_on");
						$communityForm.ui.checkCoor(center,function(full_addr){
							$communityForm.ui.createMarker(center,full_addr);
						});
					}else{
						messageAlert.open("알림",errMsg);
					}
				});
			});
			$("#direct-poi-button").click(function(){
				
				//지도를 fool size로 본다
				//$(".map_size_control").trigger("click");
				$("#map").height("500px"); 
			//	$("#map").html(""); 
			//	$communityMap.ui.createMap("map");
				$(".InsertForm").css("display", "none");
				
				
				
				$communityForm.event.initMarker();
				$(this).toggleClass("M_on");
			});
			$("#popup-poi-button").click(function(){
				$communityForm.event.initMarker();
				window.open(contextPath+"/popup/juso.sgis");
			});
			$("body").on("change","#community-file input:file",function(){
				if($("#file-list li").length>=5){
					$(this).val(null);
					messageAlert.open("알림","이미지는 최대 5개까지 등록하실 수 있습니다.");
				}else{
					$("#community-file").prepend($("<input/>",{"id":"community-insert-file-"+uuid(),"name":"file","type":"file","accept":"image/*","style":"display:none;"}));
					$("#file-list").show();
					$("#file-list ul").append($("<li/>",{"data-id":$(this).attr("id")}).append($("<div/>",{"text":$(this)[0].files[0].name}),$("<button/>",{"text":"삭제","data-id":$(this).attr("id")}).click(function(){
						$("#file-list ul li[data-id="+$(this).data("id")+"],#"+$(this).data("id")).remove();
					})));
				}
			});
			$("input[name=symbol]").change(function(){
				$("#symbol-list>li").removeClass("Check");
				$(this).parents("li").addClass("Check");
				if($communityForm.ui.marker){
					var img = new Image();
					var symbolImage = $("input[name=symbol]:radio:checked").data("symbol-image");
					img.onload = function() {
						var iconSize = [this.width,this.height]; 
						$communityForm.ui.marker.setIcon(sop.icon({
							iconUrl: contextPath+symbolImage,
							iconSize: iconSize
						}));
					}
					img.src = contextPath+symbolImage;
				}
			});
			$communityMap.ui.map.gMap.on("click",function(e){
				if($("#direct-poi-button").hasClass("M_on")){
					if($communityForm.ui.marker){
						$communityForm.ui.marker.remove();
					}
					$("#file_input_textLocation").val("");
					$("#current-poi-button,#direct-poi-button,#popup-poi-button").removeClass("M_on");
					$communityForm.ui.checkCoor([e.utmk.x,e.utmk.y],function(full_addr){
						$communityForm.ui.createMarker([e.utmk.x,e.utmk.y],full_addr);
					});
				}
			});
			$("#insert-form").heumValidation({autoValidation:false},function(errors){
				
				srvLogWrite('M0','08', '03', '03', '', '');		//의견등록
				
				if(errors.length>0){
					var labelName = "";
					if($(errors[0].element).data("error-message")){
						labelName = $(errors[0].element).data("error-message");
					}
					messageAlert.open("알림", labelName+errors[0].message,function done(){
						$(errors[0].element).focus();
					});
				}else{
					var formData = new FormData($("#insert-form")[0]);
					formData.encType = "multipart/form-data";
					formData.append("cmmnty_map_id",getParameter("id"));
					formData.append("loc_x",$communityForm.ui.marker._utmk.x);
					formData.append("loc_y",$communityForm.ui.marker._utmk.y);
					

					$("#cmmnty_map_id").val(getParameter("id"));
					$("#loc_x").val($communityForm.ui.marker._utmk.x);
					$("#loc_y").val($communityForm.ui.marker._utmk.y);
					
					$("#insert-form")[0].action = contextPath+"/community/registPoi.json?_csrf=" + csrf_token;
					$("#insert-form")[0].on("submit",function(event){
		//				alert("aaaaa");
					});
					
					return false;
					
					/*
					$.ajax({
						type: "POST",
						url: contextPath+"/community/registPoi.json",
						data:formData,
						processData: false,
						contentType: false,
						dataType: "json",
						async : false,
						success: function(res) {
							if(res.errCd=="0"){
								
								var title = $(".gnb h2").text();
								var parameter = "";
									parameter += "opinion_state=" + res.result.opinion_state;
									parameter += "symbol=" + res.result.symbol;
									parameter += "loc_x=" + res.result.loc_x;
									parameter += "loc_y=" + res.result.loc_y;
								apiLogWrite2("K4", res.result.cmmnty_map_id, res.result.title, parameter, "00", res.result.reg_lc);
								
								messageAlert.open("알림","등록되었습니다",function(){
									location.href=contextPath+"/map/community.sgis?id="+getParameter("id")+"&poi="+res.result.cmmnty_poi_id;
								});
							}else{
								if(res.errMsg){
									messageAlert.open("알림",res.errMsg);
								}else if(res.result&&res.result.length>0&&res.result[0].message){
									messageAlert.open("알림",res.result[0].message);
								}else{
									messageAlert.open("알림",errorMessage);
								}
							}
						},
						error: function(xhr, status, errorThrown) {
							messageAlert.open("알림",errorMessage);
						}
					});
					*/
					
				}
				return false;
			});
			$("#cmmnty_opinion_state").on("keyup keydown keypress",function(){
				if($(this).val().length>150){
					$("label[for=cmmnty_opinion_state] span").css({"color":"#c00","font-weight":"bold"});
				}else{
					$("label[for=cmmnty_opinion_state] span").css({"color":"","font-weight":""});
				}
				var count = ($(this).val().match(/\n/gi) || []).length;
				$("label[for=cmmnty_opinion_state] span").text($(this).val().length+count);
			});
		}
	};
}(window, document));


function jusoCallBack(
		roadFullAddr,roadAddrPart1,addrDetail,roadAddrPart2,engAddr, jibunAddr, zipNo, admCd, rnMgtSn, 
		bdMgtSn,detBdNmList,bdNm,bdKdcd,siNm,sggNm,emdNm,liNm,rn,udrtYn,buldMnnm,buldSlno,mtYn,lnbrMnnm,lnbrSlno,emdNo){
	
	//팝업 콜백함수 호출
	popupCallback( jibunAddr, roadFullAddr );
}