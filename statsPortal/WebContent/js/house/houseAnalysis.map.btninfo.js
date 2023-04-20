/**
 * 살고싶은 우리동네 버튼에 대한 클레스
 * 
 * history : (주)유코아시스템, 1.0, 2015/12/23  초기 작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$houseAnalysisMap = W.$houseAnalysisMap || {};
	$houseAnalysisMap.btninfo = {
		shcoolDataGeojson : [], 
		poi	: function(map) {
			var that = this;
			this.map = map;
			this.id = null;
			this.mapBounds = null;
			this.selectedPoiTitle = null;
			this.isShow = false;
			/**
			 * 
			 * @name         : initialize
			 * @description  : 초기화한다.
			 * @date         : 2016. 01. 09. 
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			this.initialize = function() {
				var currentdate = new Date();
				this.id = makeStamp(currentdate);
				
				this.createPOIBtn();
				this.eventHandler();
			};
			/**
			 * 
			 * @name         : clearPOI
			 * @description  : 표출된 POI 정보를 초기화한다.
			 * @date         : 2016. 02. 12. 
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			this.clearPOI = function() {
				this.map.mapBtnInfo.clearPOI();
				this.map.mapHouseBtnInfo.closeMenu();
				this.map.markers.clearLayers();
				this.map.mapHouseBtnInfo.center = null;
				this.map.mapHouseBtnInfo.mapBounds = null;
				this.map.mapHouseBtnInfo.selectedPoiTitle = "";
				this.map.mapHouseBtnInfo.isOpenPOI = false;
				this.map.mapHouseBtnInfo.isBusOpenPOI = false;
				this.map.mapHouseBtnInfo.isShowBus = false;
				this.map.mapHouseBtnInfo.isShow = false;
//				this.clearSchool();
			},
			/**
			 * 
			 * @name         : clearSchool
			 * @description  : 표출된 학구도 정보를 초기화한다.
			 * @date         : 2016. 02. 12. 
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			this.clearSchool = function(){
				$.map($houseAnalysisMap.btninfo.shcoolDataGeojson,function(value,key){
					value.remove();
				});
				$houseAnalysisMap.btninfo.shcoolDataGeojson = [];
				this.map.mapHouseBtnInfo.isSchoolPOI = false;
				this.map.mapHouseBtnInfo.isSchoolShow = false;
				this.map.markers2.clearLayers();
			}
			/**
			 * 
			 * @name         : clearApt
			 * @description  : 표출된 아파트 정보를 초기화한다.
			 * @date         : 2018. 08. 30. 
			 * @author	     : 
			 * @history 	 :
			 */
			this.clearApt = function(){
				this.map.mapHouseBtnInfo.isAptPOI = false;
				this.map.mapHouseBtnInfo.isAptShow = false;
				this.map.markers3.clearLayers();
			}
			/**
			 * 
			 * @name         : closeMenu
			 * @description  : 지도버튼을 선택했을 때, 열려있던 메뉴를 닫는다.
			 * @date         : 2016. 02. 12. 
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			this.closeMenu = function() {
				$("ol[data-type=children]").hide();
				$(".sop-top.sop-right").find(".rqListBox>li>ul, .rqListBox>li>ol").hide();
				$(".sop-top.sop-right").find(".rqListBox>li>a").removeClass("on");
			},
			/**
			 * 
			 * @name         : createPOIBtn
			 * @description  : 인터랙티브맵의 외부POI버튼을 생성한다.
			 * @date         : 2015. 10. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.createPOIBtn = function() {
				var poiUI = sop.control({position: 'topright'});
				poiUI.onAdd = function (map) {
				    this._div = sop.DomUtil.create('div', 'info');
				    sop.DomEvent.disableClickPropagation(this._div);
				    this.update();
				    $(this._div).attr("id", 'poi_' +that.id);
				    that.poiObj = this._div;
				    return this._div;
				};
				poiUI.update = function (props) {
					var html = "";
					html += "<div class='mapBtnWrapper' data-html2canvas-ignore=true>"; // 20200417 수정(이미지 저장 버그)
					html += "	<a class='rightQuick rq01 on'><span>GPS</span></a>";
					html += "	<ul class='rqListBox rq01' style='width: 280px;right: 45px;'>";	
					html += "		<li>";	
					html += "			<a><span>아파트</span></a>";	
					html += "			<ol class='rqIcon05'></ol>";    				
					html += "		</li>";     			
					html += "		<li>";	
					html += "			<a><span>학교</span></a>";	
					html += "			<ol class='rqIcon04'></ol>";    				
//					html += "		</li>";     			
					html += "		<li>";	
					html += "			<a><span style='font-size: 10px;'>생활<br />편의 교통</span></a>";	
					html += "			<ol class='rqIcon01'></ol>";    				
					html += "		</li>";     			
					html += "		<li>";
					html += "			<a><span>교육</span></a>";      			
					html +=	"			<ol class='rqIcon02'></ol>";    				
					html += "		</li>";    				
					html += "		<li>";
					html += "			<a><span>복지<br/> 문화</span></a>";    			
					html +=	"			<ol class='rqIcon03'></ol>";
					html += "		</li>"; 
					html += "		<li id='poiInit_"+that.id+"'>";
					html += "			<a class='ico_side_Select'><span>초기화</span></a>";
					html += "		</li>";
					html += "	</ul>";
					html += "</div>";
					this._div.innerHTML = html;
				};
				poiUI.addTo(this.map.gMap);
				
				this.addLifePoiList();
				this.addEduPoiList();
				this.addWelfareCulturePoiList();
				this.addSchoolZone();
				this.addAptZone();
			};
			// 아파트 정보
			this.aptZone = function(){
				var that = this;
				that.map.markers3.clearLayers();
				if($(".apt").is(":checked") == true){
					$(".interactiveBar>.helperText>span").empty();
					that.map.mapHouseBtnInfo.isAptPOI = true;
					that.map.mapHouseBtnInfo.isAptShow = true;
					that.mapBounds2 = map.gMap.getBounds();
//					var area = 'RECTANGLE('+that.mapBounds2._southWest.x + ' ' + that.mapBounds2._southWest.y + ','+that.mapBounds2._northEast.x + ' ' + that.mapBounds2._northEast.y+')';
					var area = 'RECTANGLE('+(that.mapBounds2._southWest.x - (that.mapBounds2._northEast.x - that.mapBounds2._southWest.x)*1.5) + ' ' + (that.mapBounds2._southWest.y - (that.mapBounds2._northEast.y - that.mapBounds2._southWest.y)*1.5) + ','+(that.mapBounds2._northEast.x + (that.mapBounds2._northEast.x - that.mapBounds2._southWest.x)*1.5) + ' ' + (that.mapBounds2._northEast.y + (that.mapBounds2._northEast.y - that.mapBounds2._southWest.y)*1.5)+')';
					var apt = function(map,d,area){
						var urlPattern;
						var obj = new sop.portal.poi.houseAptInfo.api();
						obj.onBlockUIPopup();
						obj.addParam("area", area);
						obj.request({
							method: "POST",
							async: true,
							url : contextPath+"/ServiceAPI/house/areaApt"+d+".json",
							options : {
								d : d
							}
						});
					}
					apt(that.map,"Point",area);
				}
			};
			// 학구도 정보
			this.schoolZone = function(cnt){
				if(cnt == null){
					var that = this;
//					that.map.markers2.clearLayers();
					for(var i=0; i<$(".school").length; i++){
						if($("#school_"+(i+1)).is(":checked") == true){
							$(".interactiveBar>.helperText>span").empty();
							that.map.mapHouseBtnInfo.isSchoolPOI = true;
							that.map.mapHouseBtnInfo.isSchoolShow = true;
							that.mapBounds = map.gMap.getBounds();
//							var area = 'RECTANGLE('+that.mapBounds._southWest.x + ' ' + that.mapBounds._southWest.y + ','+that.mapBounds._northEast.x + ' ' + that.mapBounds._northEast.y+')';
							var area = 'RECTANGLE('+(that.mapBounds._southWest.x - (that.mapBounds._northEast.x - that.mapBounds._southWest.x)*1.5) + ' ' + (that.mapBounds._southWest.y - (that.mapBounds._northEast.y - that.mapBounds._southWest.y)*1.5) + ','+(that.mapBounds._northEast.x + (that.mapBounds._northEast.x - that.mapBounds._southWest.x)*1.5) + ' ' + (that.mapBounds._northEast.y + (that.mapBounds._northEast.y - that.mapBounds._southWest.y)*1.5)+')';
							var shcool = function(map,t,d,area){
								var urlPattern;
								var obj = new sop.portal.poi.houseScoolInfo.api();
								obj.onBlockUIPopup();
								obj.addParam("area", area);
								obj.addParam("type", t);
								obj.addParam("base_year", "2021");
								obj.request({
									method: "POST",
									async: true,
									url : contextPath+"/ServiceAPI/house/areaSchool"+d+"."+(d=="Polygon"?"geojson":"json"),
									options : {
										d : d
									}
								});
							}
								shcool(that.map,(i+2),"Point",area);						
						}
					}
				}else{
					var that = this;
						$(".interactiveBar>.helperText>span").empty();
						that.map.mapHouseBtnInfo.isOpenPOI = true;
						that.map.mapHouseBtnInfo.isShow = true;
						that.mapBounds = map.gMap.getBounds();
//						var area = 'RECTANGLE('+that.mapBounds._southWest.x + ' ' + that.mapBounds._southWest.y + ','+that.mapBounds._northEast.x + ' ' + that.mapBounds._northEast.y+')';
						var area = 'RECTANGLE('+(that.mapBounds._southWest.x - (that.mapBounds._northEast.x - that.mapBounds._southWest.x)*0.20) + ' ' + (that.mapBounds._southWest.y - (that.mapBounds._northEast.y - that.mapBounds._southWest.y)*0.20) + ','+(that.mapBounds._northEast.x + (that.mapBounds._northEast.x - that.mapBounds._southWest.x)*0.20) + ' ' + (that.mapBounds._northEast.y + (that.mapBounds._northEast.y - that.mapBounds._southWest.y)*0.20)+')';
						var shcool = function(map,t,d,area){
							var urlPattern;
							var obj = new sop.portal.poi.houseScoolInfo.api();
							obj.onBlockUIPopup();
							obj.addParam("area", area);
							obj.addParam("type", t);
							obj.addParam("base_year", "2021");
							obj.request({
								method: "POST",
								async: true,
								url : contextPath+"/ServiceAPI/house/areaSchool"+d+"."+(d=="Polygon"?"geojson":"json"),
								options : {
									d : d
								}
							});
						}
						if(that.schoolType != ""){
							shcool(that.map,that.schoolType,"Point",area);						
						}
				}
			};
			// 버스정류장 정보
			this.busStopPoi = function(){
				var that = this;
				$houseAnalysisMap.ui.doReset(function(){
					$(".interactiveBar>.helperText>span").empty();
					that.map.mapHouseBtnInfo.isBusOpenPOI = true;
					that.map.mapHouseBtnInfo.isShowBus = true;
					that.mapBounds = map.gMap.getBounds();
					var obj = new sop.portal.poi.houseBusInfo.api();
					obj.onBlockUIPopup();
					obj.addParam("minx", that.mapBounds._southWest.x);
					obj.addParam("miny", that.mapBounds._southWest.y);
					obj.addParam("maxx", that.mapBounds._northEast.x);
					obj.addParam("maxy", that.mapBounds._northEast.y);
					obj.request({
						method: "POST",
						async: true,
						url : contextPath+"/ServiceAPI/bizStats/poietcbusstop.json"
					});
				});
			};
			/**
			 * 
			 * @name         : addAptZone
			 * @description  : 아파트 poi와 polygon정보를 생성한다.
			 * @date         : 2018. 07. 10. 
			 * @author	     : 주용민
			 * @history 	 :
			 */
			this.addAptZone = function() {
				var html = "";
				html += "<li style='width:auto;float:none;'><input class='apt' type='checkbox' onclick=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'아파트\',\'\');><a class='donremoveLayer' data-type='requestAptInfo' data-code='0' style='float:right;width:90%;'><img src='/img/ico/ico_7005.png' alt='아파트'><span style='text-indent: 29px;'>아파트</span></a></li>";//우리동네수정	
				$("#poi_" + that.id).find(".rqIcon05").append(html);
			};
			/**
			 * 
			 * @name         : addSchoolZone
			 * @description  : 학구도 poi와 polygon정보를 생성한다.
			 * @date         : 2016. 01. 09. 
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			this.addSchoolZone = function() {
				var html = "";
//				html += "<li style='width:auto;float:none;'><a href='#' class='donremoveLayer' data-type='requestSchoolInfo' data-code='0'><img src='/img/ico/ico_7001.png' alt='초등학교'><span style='text-indent: 0px;'>초등학교</span></a></li>";	
//				html += "<li style='width:auto;float:none;'><a href='#' class='donremoveLayer' data-type='requestSchoolInfo' data-code='1'><img src='/img/ico/ico_7001.png' alt='중학교'><span style='text-indent: 0px;'>중학교</span></a></li>";	
//				html += "<li style='width:auto;float:none;'><a href='#' class='donremoveLayer' data-type='requestSchoolInfo' data-code='2'><img src='/img/ico/ico_7001.png' alt='고등학교'><span style='text-indent: 0px;'>고등학교</span></a></li>";
				html += "<li style='width:auto;float:none;height:35px;'><input class='school' id='school_1' type='checkbox' onclick=javascript:srvLogWrite(\'F0\',\'04\',\'02\',\'00\',\'초등학교\',\'\');><a class='donremoveLayer' data-type='requestSchoolInfo' data-code='2' style='float:right;width:90%;'><img src='/img/ico/ico_7001.png' alt='초등학교'><span style='text-indent: 29px;'>초등학교</span></a></li>";//우리동네수정	
				html += "<li style='width:auto;float:none;height:35px;'><input class='school' id='school_2' type='checkbox' onclick=javascript:srvLogWrite(\'F0\',\'04\',\'02\',\'00\',\'중학교\',\'\');><a class='donremoveLayer' data-type='requestSchoolInfo' data-code='3' style='float:right;width:90%;'><img src='/img/ico/ico_7001.png' alt='중학교'><span style='text-indent: 29px;'>중학교</span></a></li>";//우리동네수정	
				html += "<li style='width:auto;float:none;height:35px;'><input class='school' id='school_3' type='checkbox' onclick=javascript:srvLogWrite(\'F0\',\'04\',\'02\',\'00\',\'고등학교\',\'\'); ><a class='donremoveLayer' data-type='requestSchoolInfo' data-code='4' style='float:right;width:90%;'><img src='/img/ico/ico_7001.png' alt='고등학교'><span style='text-indent: 29px;'>고등학교</span></a></li>";//우리동네수정
				html += "<li style='width:auto;float:none;height:auto;'><span style='font-size:10px;'>* 학교를 선택하면 학구도 정보가 보입니다.<br>출처 : 한국교육개발원(2021년)</span></li>";	
				$("#poi_" + that.id).find(".rqIcon04").append(html);
			};
			/**
			 * 
			 * @name         : addLifePoiList
			 * @description  : 생활편의교통 POI정보를 생성한다.
			 * @date         : 2016. 01. 09. 
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			this.addLifePoiList = function() {
				var html = "";
				html += "<li style='width:auto;float:none;'>";
				html += "	<a href='#' data-type='parent'><img src='/img/ico/ico_6002.png' alt='편의 시설'><span style='text-indent: 29px;'>편의 시설</span></a>";//우리동네수정
				html += "	<ol style='display: none;' class='other' data-type='children'>";
				html += "		<li><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'행정기관\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='6002'><img src='/img/ico/ico_6002.png' alt='행정기관'>행정기관</a></li>";
				html += "		<li><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'우체국\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='6001'><img src='/img/ico/ico_6001.png' alt='우체국'>우체국</a></li>";
				html += "		<li><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'경찰\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='6003'><img src='/img/ico/ico_6003.png' alt='경찰'>경찰</a></li>";
				html += "		<li><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'소방서\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='6004'><img src='/img/ico/ico_6004.png' alt='소방서'>소방서</a></li>";
				html += "		<li><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'은행\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='9002'><img src='/img/ico/ico_9002.png' alt='은행'>은행</a></li>";
				html += "	</ol>";
				html += "</li>";	
				html += "<li style='width:auto;float:none;'>";
				html += "	<a href='#' data-type='parent'><img src='/img/ico/ico_9001.png' alt='쇼핑 시설'><span style='text-indent: 29px;'>쇼핑 시설</span></a>";//우리동네수정
				html += "	<ol style='display: none;' class='other' data-type='children'>";
				html += "		<li><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'백화점/중대형마트\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='9001'><img src='/img/ico/ico_9001.png' alt='백화점/중대형마트'>백화점/중대형마트</a></li>";
				html += "		<li><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'슈퍼마켓\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='2011'><img src='/img/ico/ico_2011.png' alt='슈퍼마켓'>슈퍼마켓</a></li>";
				html += "		<li><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'편의점\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='2003'><img src='/img/ico/ico_2003.png' alt='편의점'>편의점</a></li>";
				html += "		<li><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'식료품점\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='2004'><img src='/img/ico/ico_2004.png' alt='식료품점'>식료품점</a></li>";
				html += "	</ol>";
				html += "</li>";	
				html += "<li style='width:auto;float:none;'>";
				html += "	<a href='#' data-type='parent'><img src='/img/ico/ico_5001.png' alt='외식 시설'><span style='text-indent: 29px;'>외식 시설</span></a>";//우리동네수정
				html += "	<ol style='display: none;' class='other' data-type='children'>";
				html += "		<li><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'한식\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='5001'><img src='/img/ico/ico_5001.png' alt='한식'>한식</a></li>";
				html += "		<li><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'중식\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='5002'><img src='/img/ico/ico_5002.png' alt='중식'>중식</a></li>";
				html += "		<li><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'일식\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='5003'><img src='/img/ico/ico_5003.png' alt='일식'>일식</a></li>";
				html += "		<li><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'분식\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='5004'><img src='/img/ico/ico_5004.png' alt='분식'>분식</a></li>";
				html += "		<li><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'서양식\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='5005'><img src='/img/ico/ico_5005.png' alt='서양식'>서양식</a></li>";
				html += "		<li><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'제과점\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='5006'><img src='/img/ico/ico_5006.png' alt='제과점'>제과점</a></li>";
				html += "		<li><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'패스트푸드\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='5007'><img src='/img/ico/ico_5007.png' alt='패스트푸드'>패스트푸드</a></li>";
				html += "		<li><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'치킨\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='5008'><img src='/img/ico/ico_5008.png' alt='치킨'>치킨</a></li>";
				html += "		<li><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'호프 및 간이주점\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='5009'><img src='/img/ico/ico_5009.png' alt='호프 및 간이주점'>호프 및 간이주점</a></li>";
				html += "		<li><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'카페\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='5010'><img src='/img/ico/ico_5010.png' alt='카페'>카페</a></li>";
				html += "		<li><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'기타외국식\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='5011'><img src='/img/ico/ico_5011.png' alt='기타외국식'>기타외국식</a></li>";
				html += "	</ol>";
				html += "</li>";	
				html += "<li style='width:auto;float:none;'><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'버스정류장\',\'\'); class='donremoveLayer' data-type='requestBusStopinfo'><img src='/img/ico/ico_3002.png' alt='터미널'><span style='text-indent: 29px;'>버스정류장</span></a></li>";//우리동네수정	
				html += "<li style='width:auto;float:none;'><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'지하철\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='3001'><img src='/img/ico/ico_3001.png' alt='지하철'><span style='text-indent: 29px;'>지하철</span></a></li>";//우리동네수정	
				$("#poi_" + that.id).find(".rqIcon01").append(html);
			};
			/**
			 * 
			 * @name         : addEduPoiList
			 * @description  : 교육 POI정보를 생성한다.
			 * @date         : 2016. 01. 09. 
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			this.addEduPoiList = function() {
				var html = "";
				html += "<li style='width:auto;float:none;'><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'전문대학\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='7004'><img src='/img/ico/ico_7001.png' alt='전문대학'><span style='text-indent: 29px;'>전문대학</span></a></li>";//우리동네수정		
				html += "<li style='width:auto;float:none;'><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'대학교\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='7005'><img src='/img/ico/ico_7001.png' alt='대학교'><span style='text-indent: 29px;'>대학교</span></a></li>";//우리동네수정		
				html += "<li style='width:auto;float:none;'><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'대학원\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='7006'><img src='/img/ico/ico_7001.png' alt='대학원'><span style='text-indent: 29px;'>대학원</span></a></li>";//우리동네수정	
				html += "<li style='width:auto;float:none;'><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'교습학원\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='1003'><img src='/img/ico/ico_1003.png' alt='교습학원'><span style='text-indent: 29px;'>교습학원</span></a></li>";//우리동네수정	
				html += "<li style='width:auto;float:none;'><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'어학원\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='1004'><img src='/img/ico/ico_1004.png' alt='어학원'><span style='text-indent: 29px;'>어학원</span></a></li>";//우리동네수정		
				html += "<li style='width:auto;float:none;'><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'예체능학원\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='1005'><img src='/img/ico/ico_1005.png' alt='예체능학원'><span style='text-indent: 29px;'>예체능학원</span></a></li>";//우리동네수정		
				$("#poi_" + that.id).find(".rqIcon02").append(html);
			};
			/**
			 * 
			 * @name         : addWelfareCulturePoiList
			 * @description  : 복지 문화 POI정보를 생성한다.
			 * @date         : 2016. 01. 09. 
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			this.addWelfareCulturePoiList = function() {
				var html = "";
				html += "<li style='width:auto;float:none;'><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'유치원(어린이보육업)\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='7007'><img src='/img/ico/ico_7001.png' alt='유치원(어린이보육업)'><span style='text-indent: 29px;'>유치원(어린이보육업)</span></a></li>";//우리동네수정	
				html += "<li style='width:auto;float:none;'><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'어린이집\',\'\'); class='donremoveLayer' data-type='reqCompanyPoiInfo' data-code='Q8721'><img src='/img/ico/ico_7001.png' alt='어린이집'><span style='text-indent: 29px;'>어린이집</span></a></li>";	//우리동네수정	
				html += "<li style='width:auto;float:none;'><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'병원\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='9003'><img src='/img/ico/ico_9003.png' alt='병원'><span style='text-indent: 29px;'>병원</span></a></li>";//우리동네수정	
				html += "<li style='width:auto;float:none;'><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'노인복지시설\',\'\'); class='donremoveLayer' data-type='reqCompanyPoiInfo' data-code='Q8711'><img src='/img/ico/ico_6002.png' alt='노인복지시설'><span style='text-indent: 29px;'>노인복지시설</span></a></li>";//우리동네수정	
				html += "<li style='width:auto;float:none;'><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'사회복지시설\',\'\'); class='donremoveLayer' data-type='reqCompanyPoiInfo' data-code='Q87'><img src='/img/ico/ico_6002.png' alt='사회복지시설'><span style='text-indent: 29px;'>사회복지시설</span></a></li>";//우리동네수정		
				html += "<li style='width:auto;float:none;'><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'극장/영화관\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='9004'><img src='/img/ico/ico_9004.png' alt='극장/영화관'><span style='text-indent: 29px;'>극장/영화관</span></a></li>";//우리동네수정	
				html += "<li style='width:auto;float:none;'><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'도서관/박물관\',\'\'); class='donremoveLayer' data-type='reqThemePoiInfo' data-code='9005'><img src='/img/ico/ico_9005.png' alt='도서관/박물관'><span style='text-indent: 29px;'>도서관/박물관</span></a></li>";//우리동네수정	
				html += "<li style='width:auto;float:none;'><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'공연단체\',\'\'); class='donremoveLayer' data-type='reqCompanyPoiInfo' data-code='R9012'><img src='/img/ico/ico_8002.png' alt='공연단체'><span style='text-indent: 29px;'>공연단체</span></a></li>";//우리동네수정		
				html += "<li style='width:auto;float:none;'><a href=javascript:srvLogWrite(\'F0\',\'04\',\'01\',\'00\',\'스포츠서비스업\',\'\'); class='donremoveLayer' data-type='reqCompanyPoiInfo' data-code='R911'><img src='/img/ico/ico_8008.png' alt='스포츠서비스업'><span style='text-indent: 29px;'>스포츠서비스업</span></a></li>";//우리동네수정		
				$("#poi_" + that.id).find(".rqIcon03").append(html);
			};
			/**
			 * 
			 * @name         : eventHandler
			 * @description  : 이벤트 핸들러
			 * @date         : 2016. 01. 09. 
			 * @author	     : 나광흠
			 * @history 	 :
			 */
			this.eventHandler = function(){
				$(".sop-top.sop-right").on("click",".sop-control",function(){
					if(/^set_|^map_/.test($(this).attr("id"))){
						$("#poi_" + that.id).find(".rightQuick.rq01").next(".rqListBox").stop().animate({"right":"-1000px"},0);//200423수정 (11번.데이터보드위에 아이콘 남음 수정,px 수정) //20200424 수정 (10번. 아이콘 우측에서 날라옴, 200ms ==> 0ms) 
						$("#poi_" + that.id).find(".rightQuick.rq01").removeClass("on");
					}
				});
				$("#poi_" + that.id).find(".rightQuick.rq01").click(function() {
					var on = $(this).hasClass("on");
					$(".sop-top.sop-right").find(".rightQuick").removeClass("on");
					$(".sop-top.sop-right").find(".rqListBox>li>ul, .rqListBox>li>ol").hide();
					$(".sop-top.sop-right").find(".rqListBox>li>a").removeClass("on");
					$(".sop-top.sop-right").find(".rqListBox").stop().animate({"right":"-1000px"},0);//200423수정 (11번.데이터보드위에 아이콘 남음 수정,px 수정) //20200424 수정 (10번. 아이콘 우측에서 날라옴, 200ms ==> 0ms)
					if(!on){
						$(this).next(".rqListBox").stop().animate({"right":"45px"},0);//20200424 수정 (10번. 아이콘 우측에서 날라옴, 200ms ==> 0ms)
						$(this).addClass("on");
					}else{
						$(this).next(".rqListBox").stop().animate({"right":"-1000px"},0);//200423수정 (11번.데이터보드위에 아이콘 남음 수정,px 수정) //20200424 수정 (10번. 아이콘 우측에서 날라옴, 200ms ==> 0ms)
						$(this).removeClass("on");
					}
				});
				$("#poi_" + that.id).find(".rqListBox>li>a").click(function(){
					$("ol[data-type=children]").hide();
					var on = $(this).hasClass("on"); 
					if(!on){
						$("#poi_" + that.id).find(".rqListBox>li>a").removeClass("on");
						$("#poi_" + that.id).find(".rqListBox>li>ul, .rqListBox>li>ol").hide();
						$(this).next("ul").show();
						$(this).next("ol").show();
						$(this).addClass("on");
					}else{
						that.map.isOpenPOI = false;
						$(this).next("ul").hide();
						$(this).next("ol").hide();
						$(this).removeClass("on");
					}
				});
				$(".donremoveLayer").click(function(){
					$houseAnalysisMap.ui.doRemoveFlag = false;
					setTimeout(function(){
						$houseAnalysisMap.ui.doRemoveFlag = true;
					}, 6000);
				});
				$("#poi_" + that.id).find(".rqListBox a[data-type=reqCompanyPoiInfo],.rqListBox a[data-type=reqThemePoiInfo],.rqListBox a[data-type=requestBusStopinfo]").click(function(){
					$houseAnalysisMap.ui.doRemoveFlag = false;
					var map = that.map;
					map.mapBtnInfo.isOpenPOI = false;
					map.mapHouseBtnInfo.isOpenPOI = false;
					map.mapHouseBtnInfo.isBusOpenPOI = false;
					map.mapHouseBtnInfo.isShowBus = false;
					var element = $(this);
					
					// 2017. 07. 07 j.h.Seok 오류수정
					map.setFixedBoundLevel(false);
					map.gMap.setZoom(10);
					
					setTimeout(function(){
						$houseAnalysisMap.ui.doReset(function(){
							//map.gMap.setZoom(10);
							$("ol[data-type=children]").hide();
							$(".sop-top.sop-right").find(".rqListBox>li>ul, .rqListBox>li>ol").hide();
							$(".sop-top.sop-right").find(".rqListBox>li>a").removeClass("on");
							map.mapHouseBtnInfo.clearPOI();
							var type = element.data("type").toString();
							if(type=="requestBusStopinfo"){
								map.mapHouseBtnInfo.busStopPoi();
								apiLogWrite2("J0","J03","POI",element.find("span").text(),"00","없음");
							}else{
								map.mapBtnInfo.isOpenPOI = true;
								map.mapBtnInfo.isShow = true;
								map.mapBtnInfo.selectedPoiTitle = element.find("span").text();
								var code = element.data("code").toString();
								
								$.each(code.split(","),function(cnt,node){
									if(type=="reqThemePoiInfo"){
										map.mapBtnInfo[type](node,"0");
									}else{
										map.mapBtnInfo[type](node,"10","0");
									}
								});
								apiLogWrite2("J0","J03","POI",element.context.text,"00","없음");
							}
						});
					},500);
				});
				$("#poiInit_" + that.id).click(function(){
					$("ol[data-type=children]").hide();
					var map = that.map;
					map.mapHouseBtnInfo.clearPOI();
				});
				$("#poi_" + that.id).find(".rqListBox a[data-type=parent]").click(function(){
					var isVisible = $(this).parent("li").children("ol").is(":visible");
					$("ol[data-type=children]").hide();
					if(!isVisible){
						$(this).parent("li").children("ol").show();
					}
					return false;
				});
				
				// 학교 체크시 결과
				$("#poi_" + that.id).find(".rqListBox .school").change(function(){
					if($("#school_1").is(":checked") == false || $("#school_2").is(":checked") == false || $("#school_3").is(":checked") == false
						|| ($("#school_1").is(":checked") == true || $("#school_2").is(":checked") == true || $("#school_3").is(":checked") == true)){
						that.map.markers2.clearLayers();
						that.map.mapHouseBtnInfo.schoolType = "";
					}
					for(var i=0; i<$(".school").length; i++){
						if($("#school_"+(i+1)).is(":checked") == true){
							if(i==0){
								apiLogWrite2("J0", "J08", "살고싶은 우리동네", "초등학교", that.map.zoom, "NULL");								
							}else if(i==1){
								apiLogWrite2("J0", "J09", "살고싶은 우리동네", "중학교", that.map.zoom, "NULL");								
							}else if(i==2){
								apiLogWrite2("J0", "J10", "살고싶은 우리동네", "고등학교", that.map.zoom, "NULL");								
							}
							$("ol[data-type=children]").hide();
							$(".sop-top.sop-right").find(".rqListBox>li>ul, .rqListBox>li>ol").hide();
							$(".sop-top.sop-right").find(".rqListBox>li>a").removeClass("on");
							that.map.mapHouseBtnInfo.schoolType = $("#school_"+(i+1)).siblings("a").data("code");
							that.map.mapHouseBtnInfo.selectedPoiTitle = $("#school_"+(i+1)).siblings("a").find("span").text();
								$houseAnalysisMap.noReverseGeoCode = true;
									if(that.map.geojson){
										that.map.geojson.remove();
									}
									that.map.gMap.setZoom(10);
									if(!(that.map.zoom > 9)){
										that.clearSchool();
										return;
									}
									that.schoolZone((i+1));
						}
					}
				});

				// 아파트 체크시 결과
				$("#poi_" + that.id).find(".rqListBox .apt").change(function(){
					if($(".apt").is(":checked") == false){
						that.map.markers3.clearLayers();
					}else{
						apiLogWrite2("J0", "J07", "살고싶은 우리동네", "아파트", that.map.zoom, "NULL");
						$("ol[data-type=children]").hide();
						$(".sop-top.sop-right").find(".rqListBox>li>ul, .rqListBox>li>ol").hide();
						$(".sop-top.sop-right").find(".rqListBox>li>a").removeClass("on");
						that.map.mapHouseBtnInfo.selectedPoiTitle = $(".apt").siblings("a").find("span").text();
						$houseAnalysisMap.noReverseGeoCode = true;
						if(that.map.geojson){
							that.map.geojson.remove();
						}
						that.map.gMap.setZoom(10);
						if(!(that.map.zoom > 9)){
							that.clearApt();
							return;
						}
						that.aptZone();
					}
				});
			};
		},
		schoolInfo : function(scode,sclass){
			var result,result2;
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/house/areaSchoolInfo.json",
				data:{code:scode , sclass:sclass, base_year:"2021"},
				dataType: "json",
				async : false,
				success: function(res) {
					if(res.errCd=="0"){
						result = res.result[0];
					}
				},
				error: function() {
				}
			});
			if(sclass==3 || sclass==4){
				$.ajax({
					type: "POST",
					url : contextPath + "/ServiceAPI/house/areaSchoolChart.json",
					data:{code:scode , sclass:sclass},
					dataType: "json",
					async : false,
					success: function(res) {
						if(res.errCd=="0"){
							result2 = res.result;
						}
					},
					error: function() {
					}
				});
			}
			
			$(".infoTable").empty();
//			$(".infoTable").css({"width":"895px", "height":"750px","left":"25%","top":"15%"});
			$(".infoTable").css({"width":"825px", "height":"400px","left":"28%","top":"27%"});
			var html = "";
			html += "<button style='position:absolute;top:17px;right:15px;width:25px;height:25px;' onclick='javascript:$houseAnalysisMap.btninfo.infoClose();'><img class='infoClose' src='/img/house/icon_x.png' alt='종료' style='cursor:pointer;padding-top:3px;'/></button>";
			html += "<h1 style='color:#489893; font-size:16px;font-weight:500;line-height:1.5;margin-top:15px;margin-left:20px;'>학교 상세 정보</h1>"
			html += "<div style='border:1px solid #4D85AE; padding:10px 10px 0px 10px; margin:10px 15px 15px 15px;'>"
			html += "<h2 class='subTitle'>"+result.school_nm+"</h2><br><br>";	
			html += "<ul class='Data' style='height:150px;margin-bottom:15px;'>";
			if(result.school_road_address == undefined){
				html += "<li class='li_left'><span class='InfoTitle'>주소</span>-</li>";				
			}else{
				html += "<li class='li_left'><span class='InfoTitle'>주소</span>"+result.school_road_address+"</li>";				
			}
			html += "<li class='li_right'><span class='InfoTitle'>설립일</span>"+result.found_day+"</li>";
			html += "<li class='li_left'><span class='InfoTitle'>전화</span>"+result.phone_number+"</li>";
			html += "<li class='li_right'><span class='InfoTitle'>설립구분</span>"+result.found+"</li>";
			if(result.homepage_address == undefined){
				html += "<li class='li_left'><span class='InfoTitle'>홈페이지</span>-</li>";				
			}else{
				html += "<li class='li_left'><span class='InfoTitle'>홈페이지</span><a style='color:#489893;text-decoration:underline;' target='_blank' href="+result.homepage_address+">"+result.homepage_address+"</a></li>";				
			}
			html += "<li class='li_right'><span class='InfoTitle'>설립유형</span>"+result.found_type+"</li>";
			html += "<li style='font-size:13px;'><span class='InfoTitle'>학생현황</span>총 학생수 : "+result.male_fe_sum+"명( 남: "+result.male_student+"명 / 여: "+result.female_student+"명 )&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;( )는 특수학급 학생 수<br>";
			html += "학급당 학생 수 : 1학년("+result.one_graders+"명), 2학년("+result.two_graders+"명), 3학년("+result.three_graders+"명)";
			if(sclass == 2){
				html += ", 4학년("+result.four_graders+"명), 5학년("+result.five_graders+"명), 6학년("+result.six_graders+"명), 특수학급("+result.special_class+"명)<br>";				
			}else if(sclass == 3 || sclass == 4){
				html += ", 특수학급("+result.special_class+"명)<br>";				
			}
			html += "교사당 학생수 : "+result.teacher_oneperson_studnum+"명</li>";
			html += "</ul>";	
			
			html += "<div class='Data2'>";
			html += "<div class='boxG'>";
//			html += "<h4 class='subtitle'><span class='Type1'>진학현황</span><span class='Type2'> 최근(2년)</span></h4>";
			html += "<div class='Data3' style='padding-top:0px;'>";
//			if(result2 == undefined || result2.length < 2){
//				html += "<br><p style='font-size:14px;text-align:center;'>진학현황 데이터 결과값이 존재하지않습니다</p>";
//				$(".infoTable").css({"height":"480px","top":"27%"});
//			}else{
//				if(sclass == "3" || sclass == "4"){
//					html += "<div id='chartTd0' style='width:50%;float:left;border-right:1px solid black;'></div><div id='chartTd1' style='width:49%;float:left;'></div>";			
//				}
//			}
			// mng_s 20201020 김건민 (상세히 보기 오류가 있어서 오류 수정함.)
			html += "<button class='on' onclick='window.open(\"https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?HG_CD="+result.school_code_1+"&GS_HANGMOK_CD=06&PRE_JG_YEAR=\")'>학교알리미에서 상세히 보기</button>"
			// mng_e 20201020 김건민
			html += "</div>";
			html += "</div>";
			html += "</div>";
			html += "<p style='float:right;font-size:13px;margin-right:30px;margin-top:10px;'>출처 : 한국교육학술정보원(2021년)</p>";
			$(".infoWrapper").show();
			$(".infoTable").append(html);
			
			for(var i=0; i<result2.length; i++){
				var data = [];
				var tmpData = [];
				var title ="";

				for(key in result2[i]){
						if(!(key == "base_year")){
							data.push([key, parseFloat(result2[i][key])]);
						}
				}
				var series=[{data:data}];
				$("#chartTd"+i).highcharts({
					chart:{
						plotBackgroundColor:null,
						plotBorderWidth:null,
						plotShadow:false,
						type:'pie',
						height: 320
					},
					title:{
						text: result2[i].base_year + "년도"
					},
					tooltip:{
						pointFormat : '{point.name}: <b>{point.y} ({point.percentage:.1f}%)</b>'
						
					},
					plotOptions:{
						pie:{
							size : 170,
							allowPointSelect:true,
							cursor:'pointer',
							dataLabels:{
								enabled:true,
								format : '{point.name}<br>{point.y}({point.percentage:.1f}%)',
								style: 'black'
							}
						}
					},
					series:series
				});
			}
			
		},
		aptInfo : function(code){
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/house/areaAptInfo.json",
				data:{am_code:acode , aType:"0" },
				dataType: "json",
				async : false,
				success: function(res) {
					if(res.errCd=="0"){
						result = res.result[0];
					}
				},
				error: function() {
				}
			});
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/house/areaAptInfo.json",
				data:{am_code:acode , aType:"1" },
				dataType: "json",
				async : false,
				success: function(res) {
					if(res.errCd=="0"){
						result2 = res.result;
					}
				},
				error: function() {
				}
			});
			
			$(".infoTable").empty();
			$(".infoTable").css({"width":"750", "height":"700","left":"30%","top":"15%"});
			var html = "";
			html += "<button style='position:absolute;top:17px;right:15px;width:25px;height:25px;' onclick='javascript:$houseAnalysisMap.btninfo.infoClose();'><img class='infoClose' src='/img/house/icon_x.png' alt='종료' style='cursor:pointer;padding-top:3px;'/></button>";
			html += "<h1 style='color:#489893; font-size:16px;font-weight:500;line-height:1.5;margin-top:15px;margin-left:20px;'>아파트 상세 정보</h1>"
			html += "<div style='border:1px solid #4D85AE; padding:10px 10px 0px 10px; margin:10px 15px 15px 15px;'>"
			html += "<h2 class='subTitle'>"+result.am_name+"</h2><br><br>";	
			html += "<ul class='Data' style='height:70px;margin-bottom:15px;'>";
			// mng_s 20200825 김건민
			if(result.road_address == undefined || result.road_address == "(NULL)"){
				html += "<li class='li_left'><span class='InfoTitle'>주소</span>-</li>";
			}else{
				html += "<li class='li_left'><span class='InfoTitle'>주소</span>"+result.road_address+"</li>";
			}
			html += "<li class='li_right'><span class='InfoTitle'>준공년월</span>"+result.build_date+"</li>";
			if(result.website_address == undefined || result.website_address == "(NULL)"){
				html += "<li class='li_left'><span class='InfoTitle'>홈페이지</span>-</li>";
			}else{
				html += "<li class='li_left'><span class='InfoTitle'>홈페이지</span><a style='color:#489893;text-decoration:underline;' target='_blank' href='https://"+result.website_address+"'>"+result.website_address+"</a></li>";
			}
			// mng_e 20200825 김건민
			html += "<li class='li_right'><span class='InfoTitle'>동/세대</span>"+result.same_household_num+"</li>";
			html += "</ul>";	
			
			html += "<div class='Data2'>";
			html += "<div class='boxG'>";
			// mng_s 20200825 김건민 (년도 수정)
			html += "<h4 class='subtitle'><span class='Type1'>면적당 연평균 관리비</span><span class='Type2'> (전용면적, 2019년 기준)</span></h4>";
			// mng_e 20200825 김건민
			html += "<div class='Data3' style='overflow-x:scroll;'>";
			html += "<table id='apt_tb2' class='aptTable' border='1' style='width:100%;height:60px;'>";
			html += "<tr>"
			for(var i=0; i<result2.length;i++){
				html += "<th style='width:100px;'>"+result2[i].area+" ㎡</th>";
			}
			html += "</tr><tr>";
			for(var i=0; i<result2.length;i++){
				html += "<td>"+result2[i].cost+" 원</td>";
			}
			html += "</tr>";
			html += "</table>";
			html += "<button class='on' onclick='window.open(\"http://www.k-apt.go.kr\")'>공동주택관리정보시스템 바로가기</button>";
			html += "</div>";
			html += "</div><br><br>";
			html += "<div class='boxG'>";
			// mng_s 20200825 김건민 (년도 수정)
			html += "<h4 class='subtitle'><span class='Type1'>최근 1년 매매 실거래 평균</span><span class='Type2'> (전용면적, 2019년7월~2020년6월)</span>";
			// mng_e 20200825 김건민
			html += "<select id='areaSelectBox' style='margin-left:20px;'>";
			for(var i=0; i<result2.length;i++){
				html += "<option value='"+result2[i].area+"'>"+result2[i].area+" ㎡</option></td>";
			}
			html += "</select></h4>";
			html += "<div class='Data3' style='overflow-x:scroll;'>";
			html += "<table id='apt_tb3' class='aptTable' border='1' style='width:100%;height:60px;'>";
			html += "<tbody></tbody>";
			html += "</table>";
			html += "<button class='on' onclick='window.open(\"http://rt.molit.go.kr\")'>실거래가공개시스템 바로가기</button>";
			html += "</div>";
			html += "</div>";
			html += "</div>";
			html += "</div>";
			// mng_s 20200825 김건민 (년도 수정)
			html += "<p style='float:right;font-size:13px;margin-right:30px;margin-top:10px;'>출처 : 국토교통부 실거래가공개시스템(2020년), 한국감정원 공동주택관리정보시스템(2019년)</p>";
			// mng_e 20200825 김건민
			$(".infoWrapper").show();
			$(".infoTable").append(html);
			
			var result3;
			$("#areaSelectBox").change(function(){
				$.ajax({
					type: "POST",
					url : contextPath + "/ServiceAPI/house/areaAptInfo.json",
					data:{am_code:acode , aType:"2", area:$(this).val(), start_month:"201907", end_month:"202007" },
					dataType: "json",
					async : false,
					success: function(res) {
						if(res.errCd=="0"){
							result3 = res.result;
						}
					},
					error: function() {
					}
				});
				var html2="";
				html2 += "<tr>"; 
				for(var i=0; i<result3.length;i++){
					html2 += "<th style='width:100px;'>"+result3[i].contract_year+"</th>";
				}
				html2 += "</tr><tr>";
				for(var i=0; i<result3.length;i++){
					if(!(result3[i].avg_data == 'NULL' || result3[i].avg_data == undefined)){
						if(result3[i].avg_data.length >= 5){
							if(result3[i].avg_data.substr(-5,1) == '0'){
								if(result3[i].avg_data.substr(-3,1) == '0'){
									html2 += "<td>"+result3[i].avg_data.substr(0,result3[i].avg_data.indexOf(result3[i].avg_data.substr(-5)))+"억</td>";
								}else{
									html2 += "<td>"+result3[i].avg_data.substr(0,result3[i].avg_data.indexOf(result3[i].avg_data.substr(-5)))+"억 "+result3[i].avg_data.substr(-3)+"</td>";
								}
							}else{
								if(result3[i].avg_data.length == 5){
									html2 += "<td>"+result3[i].avg_data.substr(-5)+"</td>";
								}else{
									html2 += "<td>"+result3[i].avg_data.substr(0,result3[i].avg_data.indexOf(result3[i].avg_data.substr(-5)))+"억 "+result3[i].avg_data.substr(-5)+"</td>";
								}
							}
						}else{
							html2 += "<td>"+result3[i].avg_data+"</td>";
						}
					}else{
						html2 += "<td>-</td>";
					}
				}
				html2 += "</tr>";
				$("#apt_tb3 tbody").empty();
				$("#apt_tb3 tbody").append(html2);
				$("#areaSelectBox").css("font-size","12px");
			});
			
			$("#areaSelectBox").val($("#areaSelectBox option:eq(0)")[0].value).trigger("change");
		},
		infoClose : function(){
			$(".infoWrapper").hide();
		}
	};
	/*********** 학구도 조회 시작 **********/
	(function() {
		$class("sop.portal.poi.houseScoolInfo.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if (res.errCd == "0") {
					var map = $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId];
					if(options.d == "Polygon"){
						kwangheum = res;
						$.each(res.features,function(cnt,node){
							var defaultStyle = {
								weight : 1.25,
								opacity : 1,
								color : "black",
								dashArray: "3",
								fillColor : "#04E432",
								fillOpacity : 0,
								type:"region",
							};
							$houseAnalysisMap.btninfo.shcoolDataGeojson.push(sop.geoJson(node, {
								style: function () {
									return defaultStyle;
								},
								onEachFeature: function (feature, layer) {
									layer.setStyle({
										weight: 5,
										color: "#0086c6",
										dashArray: layer.options.dashArray,
										fillOpacity: 0.5,
										fillColor: layer.options.fillColor
									});
//									layer.on("mouseover",function(e){
//										layer.setStyle({
//											weight: 5,
//											color: "#0086c6",
//											dashArray: layer.options.dashArray,
//											fillOpacity: 0.5,
//											fillColor: layer.options.fillColor
//										});
//									});
//									layer.on("mouseout",function(e){
//										layer.setStyle(defaultStyle);
//									});
								}
							}).addTo(map.gMap));
						});
					}else{
						var iconUrl;
						$.each(res.result,function(cnt,node){
							if(node.school_class == 2){
								iconUrl = contextPath+'/img/house/marker-icon-shcool1.png';									
							}else if(node.school_class == 3){
								iconUrl = contextPath+'/img/house/marker-icon-shcool2.png';									
							}else if(node.school_class == 4){
								iconUrl = contextPath+'/img/house/marker-icon-shcool3.png';									
							}else{
								iconUrl = contextPath+'/img/house/marker-icon-shcool.png';									
							}
							var markerIcon = sop.icon({
								iconUrl : iconUrl,
								shadowUrl: contextPath+'/img/marker/theme_shadow.png',
								iconAnchor: [6, 15 ],
								iconSize: [ 27, 45 ],
								infoWindowAnchor: [1, -34]
							});
							
							var marker = sop.marker([ node.x, node.y ], {
								icon: markerIcon
							});
							
							marker.info = node;
							
							marker.addTo(map.markers2);
							var html="",encodeSchoolName = encodeURIComponent(node.sch_nm.replace(/(^\s*)|(\s*$)/gi, ""));
							html+="<div>"+node.sch_nm+"</div>"
							if(marker.info.school_class == 2 || marker.info.school_class == 3 || marker.info.school_class == 4){
								html+="<div style='text-align: center;padding-top:8px;'><a style='font-size:11px; cursor:pointer;' href='javascript:$houseAnalysisMap.btninfo.schoolInfo(scode,sclass)'>학교 상세정보보기</a></div>";
							}
							marker.bindInfoWindow(html);
							
							marker.on({
								click: function (e) {								
									$.map($houseAnalysisMap.btninfo.shcoolDataGeojson,function(value,key){
										value.remove();
									});
									$houseAnalysisMap.btninfo.shcoolDataGeojson = [];
									scode = marker.info.school_code;
									sclass = marker.info.school_class;
									if(sclass == 2 || sclass == 3){
										setTimeout(function(){
											var obj = new sop.portal.poi.houseScoolInfo.api();
											obj.onBlockUIPopup();
											obj.addParam("code", marker.info.school_code);
											obj.addParam("base_year", "2021");
											obj.request({
												method: "POST",
												async: true,
												url : contextPath+"/ServiceAPI/house/areaSchoolPolygon.geojson",
												options : {
													d : "Polygon"
												}
											});
										},500);
									}
								}
							});
						});
					}
				} else{
					messageAlert.open("알림", res.errMsg);
				}
				this.onBlockUIClose();
			},
			onFail: function(status, options) {
				this.onBlockUIClose();
			}
		});
	}());
	/*********** 학구도 조회 종료 ********* */
	/*********** 아파트 조회 시작 **********/
	(function() {
		$class("sop.portal.poi.houseAptInfo.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if (res.errCd == "0") {
					var map = $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId];
					if(options.d == "Point"){
						$.each(res.result,function(cnt,node){
							var markerIcon = sop.icon({
								iconUrl: contextPath+'/img/house/marker-icon-apt.png',
								shadowUrl: contextPath+'/img/marker/theme_shadow.png',
								iconAnchor: [6, 15 ],
								iconSize: [ 18, 20 ],
								infoWindowAnchor: [1, -34]
							});
							
							var marker = sop.marker([ node.x, node.y ], {
								icon: markerIcon
							});
							marker.info = node;
							marker.addTo(map.markers3);
							var html="";
							html+="<div>"+node.am_name+"</div>"
							html+="<div style='text-align: center;padding-top:8px;'><a style='font-size:11px; cursor:pointer;' href='javascript:$houseAnalysisMap.btninfo.aptInfo(acode)'>아파트 상세정보보기</a></div>";
							marker.bindInfoWindow(html);
							marker.on({
								click: function (e) {
									acode = marker.info.am_code;
								}
							});
						});
					}
				} else{
					messageAlert.open("알림", res.errMsg);
				}
				this.onBlockUIClose();
			},
			onFail: function(status, options) {
				this.onBlockUIClose();
			}
		});
	}());
	/*********** 아파트 조회 종료 ********* */
	/*********** 버스정류장 조회 시작 **********/
	(function() {
		$class("sop.portal.poi.houseBusInfo.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if (res.errCd == "0") {
					var map = $houseAnalysisMap.ui.mapList[$houseAnalysisMap.ui.curMapId];
					$.each(res.result,function(cnt,node){
						var markerIcon = sop.icon({
							iconUrl: contextPath+'/img/marker/marker/30_02.png',
							shadowUrl: contextPath+'/img/marker/theme_shadow.png',
							iconAnchor: [12.5, 40 ],
							iconSize: [ 25, 40 ],
							infoWindowAnchor: [1, -34]
						});
						
						var marker = sop.marker([ node.x, node.y ], {
							icon: markerIcon
						});
						
						marker.info = node;
						marker.addTo(map.markers);
						marker.bindInfoWindow("<div>"+node.busstop_nm+"</div>");
					});
				} else{
					messageAlert.open("알림", res.errMsg);
				}
				this.onBlockUIClose();
			},
			onFail: function(status, options) {
				this.onBlockUIClose();
			}
		});
	}());
	/*********** 버스정류장 조회 종료 ********* */
}(window, document));