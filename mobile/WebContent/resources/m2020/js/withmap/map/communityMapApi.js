(function(W, D) {
	W.$communityMapApi = W.$communityMapApi || {};
	$communityMapApi.request = {
		/**
		 * @name           : initialize
		 * @description    : 초기화
		 * @date           : 2016. 03. 16. 
		 * @author         : 나광흠
		 * @history        :
		 */
		initialize : function(){
			$communityMapApi.request.getMyData(communityMapInfo.mydata);
			var xCoor;
			var yCoor;
			/** 
			 * --예외처리 이유--
			 * 전국단위 지도일 경우 defaultAdmCd의 값이 없음
			 * defaultAdmCd의 값이 없는경우 아래의 ajax는 
			 * mostParam(필수 param) 에러 발생
			 * 이를 예외 처리 하기 위함 
			 * 박은식 20200715
			 * */
			if(defaultAdmCd == "" || defaultAdmCd == null){
				console.log("[communityMapApi.js] communityMap -> 전국 단위")
				return false
			}
			//alert(defaultCenter);
			jQuery.ajax({
				type:"POST",
				url: sgisContextPath+"/ServiceAPI/communityMap/CommunitySelectArea.json",
				data:{"adm_cd":defaultAdmCd 
				},
				success:function(data){
					xCoor = data.result.area.x_coor;
					yCoor = data.result.area.y_coor;

					W.defaultCenter = [xCoor,yCoor];
					mapMove(defaultCenter);
				},
				error:function(data) {
				}
			});
			
			
			
			
			
			
			
			
			/*
			
			W.defaultAdmCd = defaultAdmCd.substring(0,7);
			if(defaultAdmCd){
				var obj = new sop.openApi.community.initialize.api();
				obj.addParam("accessToken", accessToken);
				obj.addParam("year", $communityMap.ui.map.bnd_year);
				obj.addParam("adm_cd", defaultAdmCd);
				obj.addParam("low_search", 0);
				obj.request({
					method: "GET",
					async: false,
					url: openApiPath + "/OpenAPI3/boundary/hadmarea.geojson"
				});
			}else{
				W.defaultAdmNm = "전국";
				W.defaultCenter = [990480.875,1815839.375];
				mapMove(defaultCenter);
			}
			
			*/
			
			
			
			
			
			/*$communityMap.ui.map.getCurrentLocation(function(center,success,errCd,errMsg){
				alert("defaultAdmCd" + defaultAdmCd);
				function process(adm_cd){
					W.defaultAdmCd = adm_cd.substring(0,7);
						if(adm_cd){
							var obj = new sop.openApi.community.initialize.api();
							obj.addParam("accessToken", accessToken);
							obj.addParam("year", $communityMap.ui.map.bnd_year);
							obj.addParam("adm_cd", defaultAdmCd);
							obj.addParam("low_search", 0);
							obj.request({
								method: "GET",
								async: false,
								url: openApiPath + "/OpenAPI3/boundary/hadmarea.geojson"
							});
						}else{
							alert("bbbb");
							W.defaultAdmNm = "전국";
							W.defaultCenter = [990480.875,1815839.375];
							mapMove(defaultCenter);
						}
				}
				if(success){
					alert("success");
					$communityMap.ui.map.getCenterToAdmCd(center,function(res){
						if(res.errCd=="0"&&res.result.tot_reg_cd){
							process(res.result.tot_reg_cd);
						}else{
							process(defaultAdmCd);
						}
					});
				}else{
					alert("fail");
					process(defaultAdmCd);
				}
			});*/
		},
		/**
		 * @name           : getMyData
		 * @description    : 마이데이터 그리기
		 * @date           : 2016. 06. 29. 
		 * @author         : 나광흠
		 * @history        :
		 * @param data_id  : 마이데이터 id
		 */
		getMyData : function(data_id){
			if(data_id){
				var obj = new sop.portal.getMyData.api();
				obj.addParam("data_uid", data_id);
				obj.request({
					method : "POST",
					async : true,
					url : sgisContextPath + "/ServiceAPI/mypage/myData/getMyData.json",
				});
			}
		}
	};
	/**
	 * @name           : mapMove
	 * @description    : 지도를 이동하고 파라미터에 POI가 있으면 해당 POI infowindow 보여주고 통계값도 보여준다 
	 * @date           : 2016. 03. 16. 
	 * @author         : 나광흠
	 * @history        :
	 * @param center   : 중심점
	 */
	function mapMove(center){
		var zoom = $communityMap.ui.map.getZoomToCd(defaultAdmCd);
		$communityMap.ui.map.mapMove(center,zoom,false,function(){
			if($communityMap.ui.map.isDrawStat){
				$communityMap.ui.setStats($(".history-list input[name=history"+$communityMap.ui.map.id+"]:checked").val(),defaultAdmCd);
			}
			if(W.$communityMapPoi&&$communityMapPoi.ui.markersObject){
				if(getParameter("poi")){
					if($communityMapPoi.ui.markersObject[getParameter("poi")]){
						$communityMapPoi.ui.markersObject[getParameter("poi")].openInfoWindow();
					}
				}
			}
		});
	}
	/*********** 지도 이동 리스트 시작 **********/
	(function() {
		$class("sop.openApi.community.initialize.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res) {
				if(res.errCd == "0") {
					var center = [res.features[0].properties.x,res.features[0].properties.y];
					W.defaultAdmNm = res.features[0].properties.adm_nm;
					W.defaultCenter = center;
					mapMove(center);
				}else if(res.errCd == "-401") {
					accessTokenInfo(function(){
						$communityMapApi.request.initialize();
					});
				}else{
					common_alert(res.errMsg);
				}
			},
			onFail: function(status) {
				common_alert(errorMessage);
			}
		});
	}());
	/*********** 지도이동 리스트 종료 **********/
	/*********** 마이데이터 시작 **********/
	(function() {
		$class("sop.portal.getMyData.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				if(res.errCd == "0") {
					var dataName,dataNameColumn,data=[],dataColumn=[];
	        		$.each(res.result[0].metaData,function(cnt,node){
	        			if(node.CHECK_TYPE=="1"){
	        				dataName = node.COL_NM;
	        				dataNameColumn = node.COL_ID;
	        			}else if(node.CHECK_TYPE=="2"){
	        				data.push(node.COL_NM);
	        				dataColumn.push(node.COL_ID);
	        			}else if(node.CHECK_TYPE=="3"){
	        				dataName = node.COL_NM;
	        				dataNameColumn = node.COL_ID;
	        				data.push(node.COL_NM);
	        				dataColumn.push(node.COL_ID);
	        			}
	        		});
	        		$communityMap.ui.mydata = {
        				dataName:dataName,
        				dataNameColumn:dataNameColumn,
        				data:data,
        				dataColumn:dataColumn
	        		};
	        		var uploadData = res.result[0].uploadData;
	        		var markerIcon = sop.icon({
						iconUrl: sgisContextPath+'/img/community/mydata-marker.png',
						iconSize: [ 20, 20 ]
					});
					
	        		var markerGroup = new sop.MarkerClusterGroup();
	        		var markers = [];
	        		
	        		for(var i=0; i< uploadData.length; i++){
	        			x_coord = uploadData[i].GEO_X;
	        			y_coord = uploadData[i].GEO_Y;
	        			
	        			var marker = sop.marker([x_coord, y_coord],{
	        				icon:markerIcon
	        			});
	        			var dataList = $.parseJSON(uploadData[i].USR_DATA)
	        			var html  = "<table style='margin:10px;'>";
						html += 	"<tr>";
						html += 		"<td style='font-size:14px;font-family:NanumSquareB; color:#457bc3;'>"+$communityMap.ui.mydata.dataName +" : "+dataList[$communityMap.ui.mydata.dataNameColumn]+"</td>";
						html +=			"<td></td>";
						html +=		"</tr>";
						html +=		"<tr style='height:5px;'></tr>";
						dataList[$communityMap.ui.mydata.dataNameColumn]
						for(var x = 0; x < $communityMap.ui.mydata.dataColumn.length; x ++){
							html += 	"<tr>";
							html +=     	"<td style='font-size:12px;padding-left:5px;'>"+$communityMap.ui.mydata.data[x]+" : "+dataList[$communityMap.ui.mydata.dataColumn[x]]+"</td>";
							html +=		"</tr>";
						}
						html += "</table>"; 
	        			marker.bindInfoWindow(html,{
							minWidth:200,
							maxWidth:200,
							maxHeight:500
						});
        				markers.push(marker);
	        			markerGroup.addLayer(marker);
	        			marker.addTo($communityMap.ui.map.gMap);
	        		}
					$communityMap.ui.mydataMarkers = markers;
				}
			},
			onFail : function(status, options) {

			}
		});
	}());
	/*********** 마이데이터 종료 **********/
}(window, document));