/**
 * 즐겨찾기 & 공유에 관한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2015/09/10  초기 작성
 * author : 김성현
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$bookmarkAndShareInfo = W.$bookmarkAndShareInfo || {};
	
	share = {
		shareInfo : function(map, delegate) {
			var that = this;
			this.map = map;
			this.shareUrlInfo = [];
			this.share_type = "BMARK",
			this.delegate = delegate;
			
			/**
			 * 
			 * @name         : setShareInfo
			 * @description  : 공유 및 북마크정보를 세팅한다.
			 * @date         : 2015. 10. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param options : 공유 및 북마크정보
			 * @param type : 공유정보 타입(normal, share)
			 */
			this.setShareInfo = function(options, type, id) {
				if (options != null) {
					var url = null;
					var params = {};
					var noneParams = {};
					var showData = null;
					var unit = null;
					var title = null;
					var zoomlevel = null;
					var center = null;
					var apiId = null;
					var isKosis = false;
					var dist_level = null;
					var btntype = null;		
					
					if (type == "normal") {
						// 파라미터세팅		
						for (var i = 0; i < options.params.param.length; i++) {
							var key = options.params.param[i].key;
							var value = options.params.param[i].value;
							params[key] = value;
						}
						params["adm_cd"] = options.params.adm_cd;

						//조회조건이 아닌 파라미터 세팅
						noneParams = options.params.noneParams;
						url = options.url;
						zoomlevel = options.zoomlevel;
						center = options.center;
						showData = options.params.filter;
						unit = options.params.unit;
						title = options.params.title;
						apiId = options.params.api_id;
						btntype = options.btntype;
							
						if (options.params.isKosis !== undefined && options.params.isKosis == true) {
							isKosis = true; 
							dist_level = options.dist_level;
						}
		
					}else {
						url = options.api_call_url;
						zoomlevel = options.param_info.mapInfo.zoomlevel;
						center = options.param_info.mapInfo.center;
						showData = options.param_info.showData;
						unit = options.param_info.unit;
						title = options.param_info.title;
						params = options.param_info.paramInfo;
						apiId = options.param_info.api_id;
						btntype = options.param_info.btntype;
						
						if (options.param_info.isKosis !== undefined || options.param_info.isKosis == true) {
							isKosis = true; 
						}
					}

					// 공유정보 설정
					var shareInfo = {
							url : url,
							params : {
								mapInfo : {
									zoomlevel : zoomlevel,
									center : center
								},
								paramInfo : params,
								showData : showData,
								unit : unit,
								api_id : apiId,
								isKosis : isKosis,
								btntype : btntype,
								legend : {}
							},
							title : $.trim(title),
							
					};

					if(isKosis){	
						//관리자 통계주제도를 위한 표출레벨 설정
						if(dist_level=='1')
						{	//시도
							dist_level='01';
						}else if(dist_level=='2'){
							//시군구
							dist_level='02';
						}else if(dist_level=='3'){
							//읍면동
							dist_level='03';
						}else{
							dist_level='01';
						}
						shareInfo.params.dist_level=dist_level;
					}
					this.shareUrlInfo.push(shareInfo);
				
				}

				// 줌레벨, 센터좌표 재설정
				if (this.shareUrlInfo.length > 1) {
					var length = this.shareUrlInfo.length;
					var zoomlevel = this.shareUrlInfo[length - 1].params.mapInfo.zoomlevel;
					var center = this.shareUrlInfo[length - 1].params.mapInfo.center;
					for (var i = 0; i < this.shareUrlInfo.length; i++) {
						this.shareUrlInfo[i].params.mapInfo.zoomlevel = zoomlevel;
						this.shareUrlInfo[i].params.mapInfo.center = center;
					}
				}	
			},
	
			
			/**
			 * 
			 * @name         : doShare
			 * @description  : 공유를 수행한다.
			 * @date         : 2015. 10. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.doShare = function(title) {
				if (this.checkShare("SHARE")) {
					messageAlert.open(
							"알림", 
							"해당 통계정보를 공유하시겠습니까?",  
							function done() {
								if (that.shareUrlInfo != null && that.shareUrlInfo.length > 0) {
									that.share_type = "SHARE"; 
									for (var i=0; i<that.shareUrlInfo.length; i++) {
										var shareInfo = that.shareUrlInfo[i];
										shareInfo.params.legend["type"] = that.map.legend.selectType;
										shareInfo.params.legend["level"] = that.map.legend.lv;
										shareInfo.params.legend["color"] = that.map.legend.legendColor;
									}
									that.openApiRegBookmark(that.shareUrlInfo, that.share_type, title);
								}
							},
							function cancel() {}
					);
				}
			};
			
			
			/**
			 * 
			 * @name         : doBookMark
			 * @description  : 북마크 정보를 수행한다.
			 * @date         : 2015. 10. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.doBookMark = function(title) {
				if (this.checkShare("BMARK")) {
					messageAlert.open(
							"알림", 
							"해당 통계정보를 북마크를 하시겠습니까?",  
							function done() {
								if (that.shareUrlInfo != null && that.shareUrlInfo.length > 0) {
									that.share_type = "BMARK"; 
									for (var i=0; i<that.shareUrlInfo.length; i++) {
										var shareInfo = that.shareUrlInfo[i];
										shareInfo.params.legend["type"] = that.map.legend.selectType;
										shareInfo.params.legend["level"] = that.map.legend.lv;
										shareInfo.params.legend["color"] = that.map.legend.legendColor;
									}
									that.openApiRegBookmark(that.shareUrlInfo, that.share_type, title);
								}
							},
							function cancel() {}
					);
				}	
			};
			
			
			/**
			 * 
			 * @name         : doShareToKakaoStory
			 * @description  : 카카오스토리에 공유한다.
			 * @date         : 2015. 10. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.doShareToKakaoStory = function(linkUrl) {
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
			};
			
			
			/**
			 * 
			 * @name         : checkShare
			 * @description  : 공유 또는 북마크가 가능한지 체크한다.
			 * @date         : 2015. 10. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.checkShare = function(type) {
				var isShare = true;
				var shareMessage = "";
				var noneDataMessage = "";
				
				if (type == "SHARE") {
					shareMessage = "공유 기능은 로그인 후 이용하실 수 있습니다.<br>로그인 하시겠습니까?";
					noneDataMessage = "공유할 통계정보가 없습니다. 먼저 통계조회를 해주세요.";
				}else {
					shareMessage = "북마크 기능은 로그인 후 이용하실 수 있습니다.<br>로그인 하시겠습니까?";
					noneDataMessage = "북마크할 통계정보가 없습니다. 먼저 통계조회를 해주세요.";
				}
				
				if(!AuthInfo.authStatus) {
					messageConfirm.open(
			    			 "알림", 
			    			 shareMessage,
			    			 btns = [
								{
								    title : "로그인",
								    fAgm : null,
								    disable : false,
								    func : function(opt) {
								    	var curUrl = statsPotalDomain + "/view/map/interactiveMap";
								    	goSelectLogin(curUrl); 
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
					
					isShare = false;
				}else {
					if (that.shareUrlInfo == null || that.shareUrlInfo.length == 0) {
						messageAlert.open("알림", noneDataMessage);
						isShare = false;
					}
				}
				
				return isShare;
			},
			
			
			/**
			 * 
			 * @name         : clearShareData
			 * @description  : 공유 또는 북마크 정보를 초기화한다.
			 * @date         : 2015. 10. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.clearShareData = function() {
				this.shareUrlInfo = [];
			},
			
			
			/**
			 * 
			 * @name         : openApiRegBookmark
			 * @description  : 북마크 및 공유정보를 등록한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param params : 북마크 및 공유정보
			 * @param hist_type : 북마크 및 공유타입
			 */
			this.openApiRegBookmark = function(params, hist_type, title) {
				var tmpParams = JSON.stringify(params);
				var sopOpenApiRegBookmarkObj = new sop.openApi.regBookmark.api();
				sopOpenApiRegBookmarkObj.addParam("hist_id", makeRandomThirtySevenDigitString());
				sopOpenApiRegBookmarkObj.addParam("hist_type", hist_type);
				sopOpenApiRegBookmarkObj.addParam("map_type", "IMAP");
				sopOpenApiRegBookmarkObj.addParam("params", tmpParams);
				sopOpenApiRegBookmarkObj.addParam("hist_nm", title);
				sopOpenApiRegBookmarkObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/member/RegStatisticsHistory.json",
					options : {}
				});
			};
		}
			
	};
	
	
	/** ********* 북마크 등록시작 ********* */
	(function() {
		$class("sop.openApi.regBookmark.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var result = res.result;
						if (res.errCd == "0") {
							if (result.hist_type == "SHARE") {
								var linkUrl = "";
								var domain = window.location.protocol+"//"+window.location.host;
								if (result.map_type == "IMAP") {
									linkUrl =  domain + "/view/map/interactiveMap/sharedata/"
								}else {
									linkUrl = domain + "/view/map/bizStatsMap/sharedata/"
								}
								
								var linkData = linkUrl+"key=" + result.hist_id;
								var urlbox = $("#sharedlg").find($("input"));
								urlbox.val(linkData);
								
								var elemDiv = document.getElementById("facebookDiv");
							    var markup = '<div class="fb-share-button" data-href="'+urlbox.val()+'" data-layout="button"></div>';
							    elemDiv.innerHTML = markup;
								FB.XFBML.parse(elemDiv);
								
								setTimeout(function() {
									$(".deem").show();
									$("#sharedlg").show();
								}, 700);
							}

						} else {
							messageAlert.open("알림", res.errMsg);
						}
					},
					onFail : function(status) {
					}
				});
	}());
	/** ********* 북마크 등록종료 ********* */
	
}(window, document));