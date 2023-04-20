/*
 * TO-DO :
 * 반경, 격자에 대한 처리
 * 
 */


(function (W, D) {
	//W.$catchmentAreaObj = W.$catchmentAreaObj || {};

	$catchmentAreaObj = {
		
		// 1. 기준 정보(mapId = 0)
		selected_locX : 0,				// 위치지정을 통해 선택한 시설물의 x좌표
		selected_locY : 0,				// 위치지정을 통해 선택한 시설물의 y좌표
		selected_modeOfUse : "",		// 위치 지정 방식 - M1:검색으로 위치 지정, M2:지도에서 위치 지정, M3:시설 유형으로 위치 지정
		selected_sufid : "",			// 위치지정을 통해 선택한 시설물의 sufid 정보(M3 일때만 존재)
		tobeSelected_locNm : "",		// 위치지정을 통해 선택한 시설물의 명칭 또는 지번 주소(선택 확정전에 저장, 선택 확정이 아님)
		tobeSelected_locRdAdres : "",	// 위치지정을 통해 선택한 시설물의 도로명 주소(선택 확정전에 저장, 선택 확정이 아님)
		tobeSelected_marker : null,		// 위치지정을 통해 선택한 시설물의 마커(선택 확정전에 저장, 선택 확정이 아님)
		usedInStats_locX : 0,			// 통계에 사용된 시설물의 x좌표 
		usedInStats_locY : 0,			// 통계에 사용된 시설물의 y좌표
		//usedInStats_modeOfUse : "",
		geoTmap : {},					// 주행시간 도형
		geoDmap : {},					// 주행거리 도형
		geoCmap : {},					// 반경 도형
		statsALLmap : {},				// 통계정보(전체 정보 > 기본정보 보기)
										// root > 통계구분(인구/가구/주택/사업체및종사자) > 년도 > 범위 : 4단계
		statsCHRmap : {},				// 통계정보(전체 정보 > 특성별 통계 보기)
		statsGRDmap : {},				// 통계정보(격자 분포)
		
		// 2. 비교대상 정보(mapId = 1)
		selected_target_locX : 0,		// 위치지정을 통해 선택한 비교대상 시설물의 x좌표
		selected_target_locY : 0,		// 위치지정을 통해 선택한 비교대상 시설물의 y좌표
		selected_target_modeOfUse : "",	// 비교대상 시설물의 위치 지정 방식 - M1:검색으로 위치 지정, M2:지도에서 위치 지정, M3:시설 유형으로 위치 지정
		selected_target_sufid : "",		// 위치지정을 통해 선택한 비교대상 시설물의 sufid 정보(M3 일때만 존재)
		tobeSelected_target_locNm : "",		// 위치지정을 통해 선택한 비교대상 시설물의 명칭 또는 지번 주소(선택 확정전에 저장, 선택 확정이 아님)
		tobeSelected_target_locRdAdres : "",// 위치지정을 통해 선택한 비교대상 시설물의 도로명 주소(선택 확정전에 저장, 선택 확정이 아님)		
		tobeSelected_target_marker : null,	// 위치지정을 통해 선택한 비교대상 시설물의 마커(선택 확정전에 저장, 선택 확정이 아님)
		usedInStats_target_locX : 0,	// 통계에 사용된 비교대상 시설물의 x좌표 
		usedInStats_target_locY : 0,	// 통계에 사용된 비교대상 시설물의 y좌표		
		geoTargetTmap : {},				// 비교대상 주행시간 도형
		geoTargetDmap : {},				// 비교대상 주행거리 도형
		geoTargetCmap : {},				// 비교대상 반경 도형		
	
		/**
		 * 
		 * @name         : setSelectedLoc
		 * @description  : 생활권역 위치(중심점) 선택 시 호출되어 위치정보를 저장한다.
		 * 
		 */
		setSelectedLoc : function(pX, pY, pMode, pSufid) {
			this.selected_locX = pX;
			this.selected_locY = pY;
			this.selected_modeOfUse = pMode;
			if(pSufid !== undefined && pSufid !== null && pSufid !== ""){
				this.selected_sufid = pSufid;
			}else{
				this.selected_sufid = "";
			}			
		},
		
		setSelectedTargetLoc : function(pX, pY, pMode, pSufid) {
			this.selected_target_locX = pX;
			this.selected_target_locY = pY;
			this.selected_target_modeOfUse = pMode;
			if(pSufid !== undefined && pSufid !== null && pSufid !== ""){
				this.selected_target_sufid = pSufid;
			}else{
				this.selected_target_sufid = "";
			}
		},
		
		/**
		 * 
		 * @name         : setTobeSelectedLoc
		 * @description  : 생활권역 위치(중심점) 선택전에 호출되어 마커 정보 등을 저장한다.
		 * 				   '지도에서 지점 선택'에서는 해당 변수에 직접 저장한다.
		 * 
		 */
		setTobeSelectedLoc : function(pNm, pRdAdres, pMkr) {
			this.tobeSelected_locNm = pNm;
			this.tobeSelected_locRdAdres = pRdAdres;
			this.tobeSelected_marker = pMkr;
		},
		
		setTobeSelectedTargetLoc : function(pNm, pRdAdres, pMkr) {
			this.tobeSelected_target_locNm = pNm;
			this.tobeSelected_target_locRdAdres = pRdAdres;
			this.tobeSelected_target_marker = pMkr;
		},
		
		/**
		 * 
		 * @name         : clearObj
		 * @description  : 객체를 정리한다.
		 * 
		 */
		clearObj : function(pForce) {
			
			// pForce 가 true이면 무조건 초기화
			
			var that = this;

			//this.selected_locX = 0;
			//this.selected_locY = 0;
			//this.selected_modeOfUse = "";
			this.usedInStats_locX = 0;
			this.usedInStats_locY = 0;
			//this.usedInStats_modeOfUse = "";
			
			$.each(this.geoTmap, function(idx, item){
				that.geoTmap[idx] = null;
			});
			this.geoTmap = {};
			
			$.each(this.geoDmap, function(idx, item){
				that.geoDmap[idx] = null;
			});
			this.geoDmap = {};
			
			$.each(this.geoCmap, function(idx, item){
				that.geoCmap[idx] = null;
			});
			this.geoCmap = {};
			
			$.each(this.statsALLmap, function(idx1, item1){
				$.each(item1, function(idx2, item2){
					$.each(item2, function(idx3, item3){
						$.each(item2, function(idx4, item4){
							item4 = null;
						});
						item3 = null;
					});
					item2 = null;
				});
				item1 = null;
			});
			this.statsALLmap = {};

			$.each(this.statsCHRmap, function(idx1, item1){
				$.each(item1, function(idx2, item2){
					$.each(item2, function(idx3, item3){
						$.each(item2, function(idx4, item4){
							$.each(item2, function(idx5, item5){
								item5 = null;
							});
							item4 = null;
						});
						item3 = null;
					});
					item2 = null;
				});
				item1 = null;
			});
			this.statsCHRmap = {};
			
			$.each(this.statsGRDmap, function(idx1, item1){
				$.each(item1, function(idx2, item2){
					$.each(item2, function(idx3, item3){
						$.each(item2, function(idx4, item4){
							item4 = null;
						});
						item3 = null;
					});
					item2 = null;
				});
				item1 = null;
			});
			this.statsGRDmap = {};
		},

		/**
		 * 
		 * @name         : clearTargetObj
		 * @description  : 비교대상에 사용된 객체를 정리한다.
		 * 
		 */
		clearTargetObj : function(pForce) {
			
			// pForce 가 true이면 무조건 초기화
			
			var that = this;

			this.usedInStats_target_locX = 0;
			this.usedInStats_target_locY = 0;
			
			$.each(this.geoTargetTmap, function(idx, item){
				that.geoTargetTmap[idx] = null;
			});
			this.geoTargetTmap = {};
			
			$.each(this.geoTargetDmap, function(idx, item){
				that.geoTargetDmap[idx] = null;
			});
			this.geoTargetDmap = {};
			
			$.each(this.geoTargetCmap, function(idx, item){
				that.geoTargetCmap[idx] = null;
			});
			this.geoTargetCmap = {};
		},
		
		/**
		 * 
		 * @name         : setGeometryInfo
		 * @description  : 생활권역(주행시간, 주행거리) 도형 정보를 저장한다.
		 * @history 	 :
		 */
		setGeometryInfo : function(pRst, pOpt) {
			
			var geoData = JSON.parse(pRst);
			if(geoData.hasOwnProperty('error')){
				return;
			}

			var optData = pOpt.params;
			if(optData.xCord != this.usedInStats_locX || optData.yCord != this.usedInStats_locY){
				// 기준점이 달라졌으면 초기화
				this.clearObj();
				
				this.usedInStats_locX = optData.xCord;
				this.usedInStats_locY = optData.yCord;
			}

			// 조정하였던 범위값 원복
    		if(optData.rangeType === "T"){		//rangeType : T(주행시간), D(주행거리)
    			$catchmentAreaMap.ui.restoreRangeValue('T', geoData);
    		}else if(optData.rangeType === "D"){
    			$catchmentAreaMap.ui.restoreRangeValue('D', geoData);
    		}
    		
			var features = geoData.saPolygons.features;
			var geoMap;
			
			if(optData.rangeType == "T"){
				geoMap = this.geoTmap;
			}else if(optData.rangeType == "D"){
				geoMap = this.geoDmap;
			}else if(optData.rangeType == "C"){
				geoMap = this.geoCmap;
			}
			$catchmentAreaMenu.ui.geoMap_area = [];
			for(var a = 0; a < features.length; a++){
				$catchmentAreaMenu.ui.geoMap_area[a] =features[a].attributes.Shape_Area; // 면적 정보 추가
			}
			
			if(pOpt.mapId == 99){
				$catchmentAreaMenu.ui.geoMap_area_grid = features[0].attributes.Shape_Area/1000000;
			}
			$.each(features, function(idx1, feature){
				// 1. 키 생성
				//var mKey = optData.rangeType + "_" + feature.attributes.ToBreak;
				var mKey = "K_" + feature.attributes.ToBreak;
				
				if(!geoMap.hasOwnProperty(mKey)){
					// 한번 이상 호출되니까	, 해당 key로 데이터가 존재하지 않을때만
					
					// 2. 외곽 폴리곤 구하기
	        		var maxIndex = 0;
		        	var maxLength = 0;
	        		$.each(feature.geometry.rings, function(idx2, item){
	        			if(idx2 === 0){
	        				maxIndex = idx2;
	        				maxLength = item.length;
	        			}else{
	        				if(maxLength < item.length){
	        					maxIndex = idx2;
	        					maxLength = item.length;
	        				}
	        			}
	        		});
	        		feature.maxIndex = maxIndex;
	        		
	        		// 3. 속성 정보 생성
	        		feature.info = {};
	        		// 3-1. 도형명
	        		var geoNm = "";
	    			if(optData.rangeType == "T"){
	    				geoNm = "주행시간 ";
	    				var rVal = Number(feature.attributes.ToBreak) / 60;
						if(isNaN(rVal) == false && $catchmentAreaObj.isInteger(rVal) == false){    
							geoNm = geoNm + rVal.toFixed(1) + "분";
						}else{
							geoNm = geoNm + rVal.toFixed(0) + "분";
						}
	    			}else if(optData.rangeType == "D"){
	    				geoNm = "주행거리 ";
	    				var rVal = Number(feature.attributes.ToBreak) / 1000;
						if(isNaN(rVal) == false && $catchmentAreaObj.isInteger(rVal) == false){    
							geoNm = geoNm + rVal.toFixed(1) + "km";
						}else{
							geoNm = geoNm + rVal.toFixed(0) + "km";
						}    				
	    			}else if(optData.rangeType == "C"){
	    				geoNm = "반경 ";
	    				var rVal = Number(feature.attributes.ToBreak) / 1000;
						if(isNaN(rVal) == false && $catchmentAreaObj.isInteger(rVal) == false){    
							geoNm = geoNm + rVal.toFixed(1) + "km";
						}else{
							geoNm = geoNm + rVal.toFixed(0) + "km";
						} 
	    			}
	    			feature.info.geoNm = geoNm;
	    			
	    			// 3-2. 도형면적
	    			feature.info.geoArea = feature.attributes.Shape_Area;
	    			
	    			// 3-3. 도형색상
	    			var geoColor = "";
	    			if(optData.areaMins instanceof Array){
	    				var loopCnt = optData.areaMins.length;
	    				var idx = -1;
	    				for(var i=0; i<loopCnt; i++){
	    					if(optData.areaMins[i] == feature.attributes.ToBreak){
	    						idx = i;
	    						break;
	    					}
	    				}
	    				if(idx != -1 && idx < $catchmentAreaMap.ui.saShpColor.length){
	    					geoColor = $catchmentAreaMap.ui.saShpColor[idx];
	    				}    				 
	    			}
	    			feature.info.geoColor = geoColor;
	    			
					geoMap[mKey] = feature;
				}else{
					// 해당 key로 데이터가 존재하면, 도형 색상만 갱신
	    			var geoColor = "";
	    			if(optData.areaMins instanceof Array){
	    				var loopCnt = optData.areaMins.length;
	    				var idx = -1;
	    				for(var i=0; i<loopCnt; i++){
	    					if(optData.areaMins[i] == feature.attributes.ToBreak){
	    						idx = i;
	    						break;
	    					}
	    				}
	    				if(idx != -1 && idx < $catchmentAreaMap.ui.saShpColor.length){
	    					geoColor = $catchmentAreaMap.ui.saShpColor[idx];
	    				}    				 
	    			}
	    			geoMap[mKey].info.geoColor = geoColor;					
				}
			});
		},

		/**
		 * 
		 * @name         : setTargetGeometryInfo
		 * @description  : 비교대상 생활권역(주행시간, 주행거리) 도형 정보를 저장한다.
		 * @history 	 :
		 */
		setTargetGeometryInfo : function(pRst, pOpt) {
			
			var geoData = JSON.parse(pRst);
			if(geoData.hasOwnProperty('error')){
				return;
			}

			var optData = pOpt.params;
			if(optData.xCord != this.usedInStats_target_locX || optData.yCord != this.usedInStats_target_locY){
				// 기준점이 달라졌으면 초기화
				this.clearTargetObj();
				
				this.usedInStats_target_locX = optData.xCord;
				this.usedInStats_target_locY = optData.yCord;
			}

			// 조정하였던 범위값 원복
    		if(optData.rangeType === "T"){		//rangeType : T(주행시간), D(주행거리)
    			$catchmentAreaMap.ui.restoreRangeValue('T', geoData);
    		}else if(optData.rangeType === "D"){
    			$catchmentAreaMap.ui.restoreRangeValue('D', geoData);
    		}
    		
			var features = geoData.saPolygons.features;
			var geoMap;
			
			if(optData.rangeType == "T"){
				geoMap = this.geoTargetTmap;
			}else if(optData.rangeType == "D"){
				geoMap = this.geoTargetDmap;
			}else if(optData.rangeType == "C"){
				geoMap = this.geoTargetCmap;
			}

			$.each(features, function(idx1, feature){
				// 1. 키 생성
				//var mKey = optData.rangeType + "_" + feature.attributes.ToBreak;
				var mKey = "K_" + feature.attributes.ToBreak;
				
				if(!geoMap.hasOwnProperty(mKey)){
					// 한번 이상 호출되니까	, 해당 key로 데이터가 존재하지 않을때만
					
					// 2. 외곽 폴리곤 구하기
	        		var maxIndex = 0;
		        	var maxLength = 0;
	        		$.each(feature.geometry.rings, function(idx2, item){
	        			if(idx2 === 0){
	        				maxIndex = idx2;
	        				maxLength = item.length;
	        			}else{
	        				if(maxLength < item.length){
	        					maxIndex = idx2;
	        					maxLength = item.length;
	        				}
	        			}
	        		});
	        		feature.maxIndex = maxIndex;
	        		
	        		// 3. 속성 정보 생성
	        		feature.info = {};
	        		
	        		// 3-1. 도형명
	        		var geoNm = "";
	    			if(optData.rangeType == "T"){
	    				geoNm = "주행시간 ";
	    				var rVal = Number(feature.attributes.ToBreak) / 60;
						if(isNaN(rVal) == false && $catchmentAreaObj.isInteger(rVal) == false){    
							geoNm = geoNm + rVal.toFixed(1) + "분";
						}else{
							geoNm = geoNm + rVal.toFixed(0) + "분";
						}
	    			}else if(optData.rangeType == "D"){
	    				geoNm = "주행거리 ";
	    				var rVal = Number(feature.attributes.ToBreak) / 1000;
						if(isNaN(rVal) == false && $catchmentAreaObj.isInteger(rVal) == false){    
							geoNm = geoNm + rVal.toFixed(1) + "km";
						}else{
							geoNm = geoNm + rVal.toFixed(0) + "km";
						}    				
	    			}else if(optData.rangeType == "C"){
	    				geoNm = "반경 ";
	    				var rVal = Number(feature.attributes.ToBreak) / 1000;
						if(isNaN(rVal) == false && $catchmentAreaObj.isInteger(rVal) == false){    
							geoNm = geoNm + rVal.toFixed(1) + "km";
						}else{
							geoNm = geoNm + rVal.toFixed(0) + "km";
						} 
	    			}
	    			feature.info.geoNm = geoNm;
	    			
	    			// 3-2. 도형면적
	    			feature.info.geoArea = feature.attributes.Shape_Area;
	    			
	    			// 3-3. 도형색상
	    			var geoColor = "";
	    			if(optData.areaMins instanceof Array){
	    				var loopCnt = optData.areaMins.length;
	    				var idx = -1;
	    				for(var i=0; i<loopCnt; i++){
	    					if(optData.areaMins[i] == feature.attributes.ToBreak){
	    						idx = i;
	    						break;
	    					}
	    				}
	    				if(idx != -1 && idx < $catchmentAreaMap.ui.saShpColor.length){
	    					geoColor = $catchmentAreaMap.ui.saShpColor[idx];
	    				}    				 
	    			}
	    			feature.info.geoColor = geoColor;
	    			
					geoMap[mKey] = feature;
				}else{
					// 해당 key로 데이터가 존재하면, 도형 색상만 갱신
	    			var geoColor = "";
	    			if(optData.areaMins instanceof Array){
	    				var loopCnt = optData.areaMins.length;
	    				var idx = -1;
	    				for(var i=0; i<loopCnt; i++){
	    					if(optData.areaMins[i] == feature.attributes.ToBreak){
	    						idx = i;
	    						break;
	    					}
	    				}
	    				if(idx != -1 && idx < $catchmentAreaMap.ui.saShpColor.length){
	    					geoColor = $catchmentAreaMap.ui.saShpColor[idx];
	    				}    				 
	    			}
	    			geoMap[mKey].info.geoColor = geoColor;					
				}
			});
		},
		
		/**
		 * 
		 * @name         : setCircleInfo
		 * @description  : 생활권역(반경) 도형 정보를 저장한다.
		 * @history 	 :
		 */
		setCircleInfo : function(pOpt) {

			var param = pOpt;
			var mKey = "K_" + param.geoRadius;
			var info = [];
			if(!this.geoCmap.hasOwnProperty(mKey)){
				// 한번 이상 호출되니까	, 해당 key로 데이터가 존재하지 않을때만
				
				var circleInfo = {};
				circleInfo.info = {};
				circleInfo.info.geoX = param.geoX;
				circleInfo.info.geoY = param.geoY;
				circleInfo.info.geoRadius = param.geoRadius;
				
	    		// 3-1. 도형명
	    		var geoNm = "반경 ";
				var rVal = Number(param.geoRadius) / 1000;
				if(isNaN(rVal) == false && $catchmentAreaObj.isInteger(rVal) == false){    
					geoNm = geoNm + rVal.toFixed(1) + "km";
				}else{
					geoNm = geoNm + rVal.toFixed(0) + "km";
				}
				circleInfo.info.geoNm = geoNm;
	
				// 3-2. 도형면적
				circleInfo.info.geoArea = (Number(param.geoRadius) * Number(param.geoRadius) * 3.14).toFixed(2);
				$catchmentAreaMenu.ui.geoMap_area.push((Number(param.geoRadius) * Number(param.geoRadius) * 3.14).toFixed(2));
				// 3-3. 도형색상
				var geoColor = "";
				var colorIdx = param.colorIdx;
				if(colorIdx >= 0 && colorIdx < $catchmentAreaMap.ui.saShpColor.length){
					geoColor = $catchmentAreaMap.ui.saShpColor[colorIdx];				
				}
				circleInfo.info.geoColor = geoColor;
				this.geoCmap[mKey] = circleInfo;
				$catchmentAreaMenu.ui.selectPolygonPointsArr = ['circle_flag']; // selectPolygonPointsArr.length != 0 기준으로 데이터 읽어오기 때문에 추가 
			}else{
				// 해당 key로 데이터가 존재하면, 도형 색상만 갱신
				var geoColor = "";
				var colorIdx = param.colorIdx;
				$catchmentAreaMenu.ui.geoMap_area.push((Number(param.geoRadius) * Number(param.geoRadius) * 3.14).toFixed(2));
				if(colorIdx >= 0 && colorIdx < $catchmentAreaMap.ui.saShpColor.length){
					geoColor = $catchmentAreaMap.ui.saShpColor[colorIdx];				
				}
				this.geoCmap[mKey].info.geoColor = geoColor;
				$catchmentAreaMenu.ui.selectPolygonPointsArr = ['circle_flag']; // selectPolygonPointsArr.length != 0 기준으로 데이터 읽어오기 때문에 추가
			}
		},

		/**
		 * 
		 * @name         : setTargetCircleInfo
		 * @description  : 비교대상 생활권역(반경) 도형 정보를 저장한다.
		 * @history 	 :
		 */
		setTargetCircleInfo : function(pOpt) {

			var param = pOpt;
			var mKey = "K_" + param.geoRadius;
			if(!this.geoTargetCmap.hasOwnProperty(mKey)){
				// 한번 이상 호출되니까	, 해당 key로 데이터가 존재하지 않을때만
				
				var circleInfo = {};
				circleInfo.info = {};
				circleInfo.info.geoX = param.geoX;
				circleInfo.info.geoY = param.geoY;
				circleInfo.info.geoRadius = param.geoRadius;
				
	    		// 3-1. 도형명
	    		var geoNm = "반경 ";
				var rVal = Number(param.geoRadius) / 1000;
				if(isNaN(rVal) == false && $catchmentAreaObj.isInteger(rVal) == false){    
					geoNm = geoNm + rVal.toFixed(1) + "km";
				}else{
					geoNm = geoNm + rVal.toFixed(0) + "km";
				}
				circleInfo.info.geoNm = geoNm;
	
				// 3-2. 도형면적
				circleInfo.info.geoArea = (Number(param.geoRadius) * Number(param.geoRadius) * 3.14).toFixed(2);
	
				// 3-3. 도형색상
				var geoColor = "";
				var colorIdx = param.colorIdx;
				if(colorIdx >= 0 && colorIdx < $catchmentAreaMap.ui.saShpColor.length){
					geoColor = $catchmentAreaMap.ui.saShpColor[colorIdx];				
				}
				circleInfo.info.geoColor = geoColor;
				
				this.geoTargetCmap[mKey] = circleInfo;
			}else{
				// 해당 key로 데이터가 존재하면, 도형 색상만 갱신
				var geoColor = "";
				var colorIdx = param.colorIdx;
				if(colorIdx >= 0 && colorIdx < $catchmentAreaMap.ui.saShpColor.length){
					geoColor = $catchmentAreaMap.ui.saShpColor[colorIdx];				
				}
				this.geoTargetCmap[mKey].info.geoColor = geoColor;				
			}
		},
		
		/**
		 * 
		 * @name         : addAttrToGeoInfo
		 * @description  : 통계정보를 도형정보에 추가한다.
		 * @history 	 :
		 */
		addAttrToGeoInfo : function(pOpt, pMode) {
			// pMode : T-비교대상 정보, T가 아니면 기준 정보
			
			var param = pOpt;
			var geoData = $catchmentAreaObj.getShapeInfo(param.rangeType, param.rangeVal, pMode);
			
			if(!$catchmentAreaObj.isEmptyObject(geoData)){
				if(geoData.hasOwnProperty('info')){					
					geoData.info[param.workGb] = param.statsVal;					
					geoData.info["statsYear"] = param.statsYear;
				}				
			}			
		},
		
		/**
		 * 
		 * @name         : setStatisticsInfo
		 * @description  : 생활권역 도형에 대한 통계정보를 저장한다.(비교대상용 X)
		 * @history 	 :
		 */
		setStatisticsInfo : function(pGb, pRst, pOpt) {
			
			var params = pOpt.params;
			var statsMap;
			
			if(pGb == "S01"){
				// 전체 정보 (기본정보 보기)
				statsMap = this.statsALLmap;
				
				var baseYear = params["base_year"];
				var rangeType = "rgChk";
				if(params["rangeType"] == "stats_radio_t"){
					rangeType = "T_" + params["rangeVal"];
				}else if(params["rangeType"] == "stats_radio_d"){
					rangeType = "D_" + params["rangeVal"];
				}else if(params["rangeType"] == "stats_radio_r"){
					rangeType = "C_" + params["rangeVal"];
				}

				$.each(pRst, function(idx, item){
					if(idx == "copr"){
						baseYear = params["copr_base_year"];
					}
					
					if(statsMap[idx] == undefined || statsMap[idx] == null){
						statsMap[idx] = {};
					}
					if(statsMap[idx][baseYear] == undefined || statsMap[idx][baseYear] == null){
						statsMap[idx][baseYear] = {};
					}
					if(statsMap[idx][baseYear][rangeType] == undefined || statsMap[idx][baseYear][rangeType] == null){
						statsMap[idx][baseYear][rangeType] = {};
					}
					
					statsMap[idx][baseYear][rangeType]["opt"] = pOpt;
					statsMap[idx][baseYear][rangeType]["data"] = item;				
				});
				
			}else if(pGb == "S02"){
				// 전체 정보 (특성별 통계 보기)
				statsMap = this.statsCHRmap;
				
				var baseYear = params["base_year"];				
				var rangeType = "rgChk";
				if(params["rangeType"] == "stats_radio_t"){
					rangeType = "T_" + params["rangeVal"];
				}else if(params["rangeType"] == "stats_radio_d"){
					rangeType = "D_" + params["rangeVal"];
				}else if(params["rangeType"] == "stats_radio_r"){
					rangeType = "C_" + params["rangeVal"];
				}

				var searchCond = "";
				$.each(pRst, function(idx, item){
					
					if(idx == "pops"){
						searchCond = params["pops_cond"];
					}else if(idx == "family"){
						searchCond = params["family_cond"];
					}else if(idx == "house"){
						searchCond = params["house_cond"];
					}else if(idx == "copr"){
						searchCond = params["copr_cond"];
						baseYear = params["copr_base_year"];
					}else if(idx == "employee"){
						searchCond = params["employee_cond"];
						baseYear = params["copr_base_year"];
					}
					
					if(statsMap[idx] == undefined || statsMap[idx] == null){
						statsMap[idx] = {};
					}
					if(statsMap[idx][baseYear] == undefined || statsMap[idx][baseYear] == null){
						statsMap[idx][baseYear] = {};
					}
					if(statsMap[idx][baseYear][rangeType] == undefined || statsMap[idx][baseYear][rangeType] == null){
						statsMap[idx][baseYear][rangeType] = {};
					}
					if(!statsMap[idx][baseYear][rangeType].hasOwnProperty(searchCond)){
						statsMap[idx][baseYear][rangeType][searchCond] = {};
					}
					
					statsMap[idx][baseYear][rangeType][searchCond]["opt"] = pOpt;
					statsMap[idx][baseYear][rangeType][searchCond]["data"] = item;				
				});				
	
			}else if(pGb == "S03"){
				// 격자 분포
				statsMap = this.statsGRDmap;
			}			
		},

		/**
		 * 
		 * @name         : getStatisticsInfo
		 * @description  : 동일 조건의 통계정보가 존재하면, 저장된 통계정보를 반환한다.(비교대상용 X)
		 * @history 	 :
		 */
		getStatisticsInfo : function(pGb, pOpt, pKeyId) {
			// pGb : S01-통계정보(전체 정보 > 기본정보 보기), S02-통계정보(전체 정보 > 특성별 통계 보기), S03-통계정보(격자 분포)
			// pKeyId : pOpt에서 검색조건 정보를 담고있는 요소명 (S02에서 사용)

			var rtnObj = {};
			rtnObj.opt = {};
			rtnObj.data = {};
			rtnObj.data.result = {};
			rtnObj.addCnt = 0;
			var addCnt = 0;
			
			if(pOpt == undefined || pOpt == null){
				return rtnObj;
			}			

			var params = pOpt;
			var statsMap;
			if(pGb == "S01"){
				statsMap = this.statsALLmap;				
				
				var workGbs = []; 
				var workGb = params["workGb"];
				if(workGb == "all"){
					workGbs.push("pops");
					workGbs.push("family");
					workGbs.push("house");
					workGbs.push("copr");
				}else if(workGb == "s3"){
					workGbs.push("pops");
					workGbs.push("family");
					workGbs.push("house");						
				}else{
					workGbs.push(workGb);
				}
				
				var loopCnt = workGbs.length;
				var categoryNm;
				var baseYear;
				var rangeType;
				
				for(var i = 0; i < loopCnt; i++){
					
					categoryNm = workGbs[i];
					if(categoryNm == "copr"){
						baseYear = params["copr_base_year"];
					}else{
						baseYear = params["base_year"];
					}						
	
					if(params["rangeType"] == "stats_radio_t"){
						rangeType = "T_" + params["rangeVal"];
					}else if(params["rangeType"] == "stats_radio_d"){
						rangeType = "D_" + params["rangeVal"];
					}else if(params["rangeType"] == "stats_radio_r"){ 
						rangeType = "C_" + params["rangeVal"];
					}
					
					var statsData;
					var statsOption;
					if(statsMap.hasOwnProperty(categoryNm)){
						if(statsMap[categoryNm].hasOwnProperty(baseYear)){
							if(statsMap[categoryNm][baseYear].hasOwnProperty(rangeType)){
								if(statsMap[categoryNm][baseYear][rangeType].hasOwnProperty("data")){
									// 입력할 때 쌍으로 하니까, 하나 있음 다 있는걸로 치고
									statsData = statsMap[categoryNm][baseYear][rangeType]["data"];
									statsOption = statsMap[categoryNm][baseYear][rangeType]["opt"];
								}								
							}
						}						
					}
					
					if(statsData != undefined && statsData != null){
						addCnt = addCnt + 1;
						
						rtnObj.data.result[categoryNm] = {};
						rtnObj.data.result[categoryNm] = statsData;
						
						rtnObj.opt = statsOption;
					}
				}
					
				rtnObj.addCnt = addCnt;				
	
			}else if(pGb == "S02"){
				statsMap = this.statsCHRmap;
				
				var condKey = pKeyId;
				var baseYear = params["base_year"];
				var categoryNm = "";
				if(condKey == "pops_cond"){
					categoryNm = "pops";
				}else if(condKey == "family_cond"){
					categoryNm = "family";
				}else if(condKey == "house_cond"){
					categoryNm = "house";
				}else if(condKey == "copr_cond"){
					categoryNm = "copr";
					baseYear = params["copr_base_year"];
				}else if(condKey == "employee_cond"){
					categoryNm = "employee";
					baseYear = params["copr_base_year"];
				}				
					
				var rangeType = "";
				if(params["rangeType"] == "stats_radio_t"){
					rangeType = "T_" + params["rangeVal"];
				}else if(params["rangeType"] == "stats_radio_d"){
					rangeType = "D_" + params["rangeVal"];
				}else if(params["rangeType"] == "stats_radio_r"){
					rangeType = "C_" + params["rangeVal"];
				}
				
				var searchCond = params[condKey];
				
				var statsData;
				var statsOption;
				if(statsMap.hasOwnProperty(categoryNm)){
					if(statsMap[categoryNm].hasOwnProperty(baseYear)){
						if(statsMap[categoryNm][baseYear].hasOwnProperty(rangeType)){
							if(statsMap[categoryNm][baseYear][rangeType].hasOwnProperty(searchCond)){
								if(statsMap[categoryNm][baseYear][rangeType][searchCond].hasOwnProperty("data")){
									// 입력할 때 쌍으로 하니까, 하나 있음 다 있는걸로 치고
									statsData = statsMap[categoryNm][baseYear][rangeType][searchCond]["data"];
									statsOption = statsMap[categoryNm][baseYear][rangeType][searchCond]["opt"];
								}
							}
						}
					}						
				}
				
				if(statsData != undefined && statsData != null){
					addCnt = addCnt + 1;
					
					rtnObj.data.result[categoryNm] = {};
					rtnObj.data.result[categoryNm] = statsData;
					
					rtnObj.opt = statsOption;
				}				
				
				rtnObj.addCnt = addCnt;
	
			}else if(pGb == "S03"){
				statsMap = this.statsGRDmap;
			}
			
			return rtnObj;
		},

		/**
		 * 
		 * @name         : getShapeArea
		 * @description  : 생활권역 도형 정보를 반환한다.
		 * @history 	 :
		 */
		getShapeInfo : function(pGb, pRange, pMode) {
			// pMode : T-비교대상 정보, T가 아니면 기준 정보
			
			var rtnObj = {};
			var geoMap;			
			if(pGb == "stats_radio_t" || pGb == "T" || pGb == "stats_radio_t_grid" ){
				if(pMode == "T"){
					geoMap = this.geoTargetTmap;
				}else{
					geoMap = this.geoTmap;
				}				
			}else if(pGb == "stats_radio_d" || pGb == "D" || pGb == "stats_radio_d_grid" ){
				if(pMode == "T"){
					geoMap = this.geoTargetDmap;
				}else{
					geoMap = this.geoDmap;
				}
			}else if(pGb == "stats_radio_r" || pGb == "C" || pGb == "stats_radio_r_grid" ){
				if(pMode == "T"){
					geoMap = this.geoTargetCmap;
				}else{
					geoMap = this.geoCmap;
				}
			}
			
			if(geoMap !== undefined && geoMap !== null && geoMap.hasOwnProperty("K_" + pRange)){
				rtnObj = geoMap["K_" + pRange];
			}
			
			return rtnObj;
		},
		
		/**
		 * 
		 * @name         : getShapeArea
		 * @description  : 생활권역 도형의 면적정보를 반환한다.
		 * @history 	 :
		 */
		getShapeArea : function(pGb, pRange, pMode) {
			// pMode : T-비교대상 정보, T가 아니면 기준 정보
			
			var shpArea = 0;
			var geoMap;			
			if(pGb == "stats_radio_t" || pGb == "T"){
				if(pMode == "T"){
					geoMap = this.geoTargetTmap;
				}else{
					geoMap = this.geoTmap;
				}				
			}else if(pGb == "stats_radio_d" || pGb == "D"){
				if(pMode == "T"){
					geoMap = this.geoTargetDmap;
				}else{
					geoMap = this.geoDmap;
				}
			}else if(pGb == "stats_radio_r" || pGb == "C"){
				if(pMode == "T"){
					geoMap = this.geoTargetCmap;
				}else{
					geoMap = this.geoCmap;
				}
			}
			
			if(geoMap != undefined && geoMap != null){
				var mKey = "K_" + pRange;
				var feature = geoMap[mKey];
				if(feature != undefined && feature != null){					
					if(pGb == "stats_radio_r" || pGb == "C"){
						shpArea = feature.info.geoArea;
					}else{
						shpArea = feature.attributes.Shape_Area;
					}	
				}
			}
			
			return shpArea;
		},
		
		/**
		 * 
		 * @name         : chkExistData
		 * @description  : 도형 및 통계정보가 존재하는지 확인한다.(비교대상용 X)
		 * @history 	 :
		 */
		chkExistData : function() {
			// rst : 0-도형 및 통계정보가 존재하지 않음, 1-도형 정보만 존재, 2-도형 및 통계정보가 존재
			var rst = "0";
			
			if(!$catchmentAreaObj.isEmptyObject(this.geoTmap) || !$catchmentAreaObj.isEmptyObject(this.geoDmap) || !$catchmentAreaObj.isEmptyObject(this.geoCmap)){
				rst = "1";
				
				if(!$catchmentAreaObj.isEmptyObject(this.statsALLmap) || !$catchmentAreaObj.isEmptyObject(this.statsCHRmap) || !$catchmentAreaObj.isEmptyObject(this.statsGRDmap)){
					// 현재는 무조건 전체정보(statsALLmap)를 가져오고 다른 작업이 시작되므로, setStatisticsInfo에 S03 구현여부와 상관없이 작동됨.
					rst = "2";
				}				
			}else{
				// 도형정보 없는 통계정보는 무시
			}

			return rst;			
		},
		
		isEmptyObject : function(pObj) {
			return Object.keys(pObj).length === 0 && pObj.constructor === Object;
		},
		
		isInteger : function(pVal) {
			
			var rst = false;
			if($.isNumeric(pVal) && Math.floor(pVal) == pVal){
				rst = true;
			}
			return rst;
		},
		
		addMouseOverOnMarker : function(mapId) {
			
			var marker = null;
			var locNm = "";
			var rdAdres = "";
			if(mapId === 0){
				marker = this.tobeSelected_marker;
				locNm = this.tobeSelected_locNm;
				rdAdres = this.tobeSelected_locRdAdres;
			}else if(mapId === 1){
				marker = this.tobeSelected_target_marker;
				locNm = this.tobeSelected_target_locNm;
				rdAdres = this.tobeSelected_target_locRdAdres;
			}
			
			if(marker !== null && marker !== undefined){
				var map = $catchmentAreaMap.ui.getMap(mapId)
				marker.on({
					mouseover : function (e) {
						var html = "<table style='margin:10px;' id='geoToolTip'>";
						html += "<tr><td class='gToolTipTitle'>선택 위치</td></tr>";
						html += "<tr style='height:5px'></tr>";
						html += "<tr><td class='gStatsData'>";
						html += locNm;
						html += "</td></tr>";						
//						html += "<tr><td class='gStatsData'>";
//						html += rdAdres;
//						html += "</td></tr>";	
						html += "</table>";

						e.target.bindToolTip(html, {
							direction: 'right',
							noHide:true,
							opacity: 1

						}).addTo(map.gMap).showToolTip();
						
						var winW = 150;
						if(locNm !== null && locNm !== undefined){
							var len = locNm.length;
							if(len > 18){
								winW = 150 + ((len - 10) * 12);
							}else if(len > 10){
								winW = 150 + ((len - 10) * 9);
							}
						}						
						
						$(".sop-tooltip").parent().css({"width" : winW+"px"} );
						$(".sop-tooltip").css({"border" : "2px solid #457bf5"} );
						
						$("#geoToolTip .gToolTipTitle")
							.css("font-size", "14px")
							.css("font-weight", "bold")
							.css("color", "#3792de");
						$("#geoToolTip .gStatsData")
							.css("font-size", "12px")
							.css("padding-left", "5px");
					},
					mouseout : function (e) {
						e.target.hideToolTip();
					}
				});
			}			
		}
		

	};
	
	
	
	
}(window, document));	