/*
 * TODO :
 *
 *
 */


(function (W, D) {
	//W.$urbanObj = W.$urbanObj || {};

	$urbanObj = {

		// 1. 기준 정보
		geoMap : {},					// 도시지역 도형 정보
		urbarsMap : {},					// 도시지역 목록 정보
		statsMap : {},					// 통계정보
		latestStatsParamInfo : null,	// 통계정보 검색 정보(데이터보드 내 행정구역 선택박스 변경 시에만 사용, 통계요청 시 반드시 저장 필요, 가장 최근것만 저장)
		idxStatsMap : {},

		urbanCls_UN : "cls_un",			// UN도시 분류
		urbanCls_SGIS : "cls_sgis",     // 통계청 분류

		initSetMap : {},				// 초기설정 정보
		curIdentifier : "",

		/**
		 *
		 * @name         : clearObj
		 * @description  : 객체를 정리한다.
		 *
		 */
		clearObj : function(pForce) {

			// pForce 가 true이면 무조건 초기화

			var that = this;

			$.each(this.geoMap, function(idx, item){
				that.geoMap[idx] = null;
			});
			this.geoMap = {};

			$.each(this.urbarsMap, function(idx1, item1){
				$.each(item1, function(idx2, item2){
					if(typeof item2 == "object"){
						$.each(item2, function(idx3, item3){
							item3 = null;
						});
						item2 = null;
					}else{
						item2 = null;
					}
				});
				item1 = null;
			});
			this.urbarsMap = {};

			$.each(this.statsMap, function(idx1, item1){
				$.each(item1, function(idx2, item2){
					$.each(item2, function(idx3, item3){
						$.each(item3, function(idx4, item4){
							$.each(item4, function(idx5, item5){
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
			this.statsMap = {};

		    this.latestStatsParamInfo = null;
		},

		/**
		 *
		 * @name         : getUrbanAreasKey
		 * @description  : 넘겨받은 정보를 이용하여, 도시지역 목록 정보 관리맵에서 사용할 키를 반환한다.
		 * @history 	 :
		 */
		getUrbanAreasKey : function(pOpt) {
			// 파라미터로는 $urbanMain.ui.reqSetParams()에서 정의한 키워드를 사용한 최대 2depth 이내의 맵이어야 함
			// 키워드: 선택년도(base_year), 분류(urban_cls_gb), 도시타입(urban_type)
			var rtnVal = "";
			var params;
			if(pOpt["params"] !== undefined && pOpt["params"] !== null){
				params = pOpt["params"];
			}else{
				params = pOpt;
			}

			var baseYear;
			var urbanCls;
			var urbanType;
			//params는 최대 2depth 맵
			for(var key in params){
				if(typeof params[key] == "object"){
					var subParams = params[key];
					for(var subKey in subParams){
						if(subKey == "base_year"){
							baseYear = subParams[subKey];
						}else if(subKey == "urban_cls_gb"){
							urbanCls = subParams[subKey];
						}else if(subKey == "urban_type"){
							urbanType = subParams[subKey];
						}
					}
				}else{
					if(key == "base_year"){
						baseYear = params[key];
					}else if(key == "urban_cls_gb"){
						urbanCls = params[key];
					}else if(key == "urban_type"){
						urbanType = params[key];
					}
				}
			}

			if(baseYear !== undefined && baseYear !== null && baseYear.length > 0){
				if(urbanCls == $urbanObj.urbanCls_UN){
					if(urbanType !== undefined && urbanType !== null && urbanType.length > 0){
						rtnVal = baseYear + "_" + urbanType;
					}else{
						rtnVal = "";
					}
				}else if(urbanCls == $urbanObj.urbanCls_SGIS){
					rtnVal = baseYear + "_sgis";
				}else{
					rtnVal = "";
				}
			}

			return rtnVal;
		},

		/**
		 *
		 * @name         : getGeometryKey
		 * @description  : 넘겨받은 정보를 이용하여, 레이어에서 사용할 키를 반환한다.
		 * @history 	 :
		 */
		getGeometryKey : function(pOpt) {
			var rtnVal = "gg_" + new Date().getTime();

			if(pOpt !== undefined && pOpt !== null){
				var params = pOpt;

				var baseYear = $urbanObj.getValueMappedToKey(["base_year"], params);
				var urbanCls = $urbanObj.getValueMappedToKey(["urban_cls_gb"], params);
				var urbanId = $urbanObj.getValueMappedToKey(["urban_id"], params);

				if(urbanCls == $urbanObj.urbanCls_UN){
					var urbanType = $urbanObj.getValueMappedToKey(["urban_type", "type"], params);

					if(baseYear !== "" && urbanId !== "" && urbanType !== ""){
						rtnVal = baseYear + "_" + urbanId + "_" + urbanType;
					}
				}else if(urbanCls == $urbanObj.urbanCls_SGIS){
					var sidoCd = $urbanObj.getValueMappedToKey(["urban_sido_cd", "sido_cd"], params);
					var sggCd = $urbanObj.getValueMappedToKey(["urban_sgg_cd", "sgg_cd"], params);

					if(baseYear !== "" && urbanId !== "" && sidoCd !== "" && sggCd !== ""){
						rtnVal = baseYear + "_" + urbanId + "_" + sidoCd + "_" + sggCd;
					}
				}
			}

			return rtnVal;
		},

		/**
		 *
		 * @name         : getValueMappedToKey
		 * @description  : 키에 매핑된 값을 반환한다.
		 * @history 	 :
		 */
		getValueMappedToKey : function(pKeys, pOpt) {
			// 파라미터로는 $urbanMain.ui.reqSetParams()에서 정의한 키워드를 사용한 최대 2depth 이내의 맵이어야 함
			var rtnVal = "";

			var keyList = pKeys;
			if(keyList !== undefined && keyList !== null && keyList.length > 0){
				var params;
				if(pOpt["params"] !== undefined && pOpt["params"] !== null){
					params = pOpt["params"];
				}else{
					params = pOpt;
				}

				outerLoop:
				for(var key in params){
					if(typeof params[key] == "object"){
						var subParams = params[key];
						for(var subKey in subParams){
							for(var i=0; i<keyList.length; i++){
								if(subKey === keyList[i]){
									rtnVal = subParams[subKey];
									break outerLoop;
								}
							}
						}
					}else{
						for(var i=0; i<keyList.length; i++){
							if(key === keyList[i]){
								rtnVal = params[key];
								break outerLoop;
							}
						}
					}
				}
			}

			if(rtnVal === undefined || rtnVal === null){
				rtnVal = "";
			}

			return rtnVal;
		},

		/**
		 *
		 * @name         : setUrbanAreasInfo
		 * @description  : 도시지역 목록 정보를 저장하고, 해당 맵을 반환한다.
		 * @history 	 :
		 */
		setUrbanAreasInfo : function(pRst, pOpt, pForce) {
			// pForce 가 true이면 기존값이 존재해도 현재값으로 재구성
			// pOpt의 params는 $urbanMain.ui.reqSetParams()의 반환객체의 구조를 따른다.

			var mapKey = $urbanObj.getUrbanAreasKey(pOpt);
			if(mapKey !== ""){
				var dataMap = $urbanObj.urbarsMap;

				var isExist = true;
				if(!dataMap.hasOwnProperty(mapKey)){
					dataMap[mapKey] = {};
					isExist = false;
				}
				var tgtMap = dataMap[mapKey];

				// pForce 가 true이면 기존값 삭제
				if(isExist && pForce){
					$urbanObj.deleteProperty(tgtMap);
				}

				// 정보 저장 : 기존값 존재 시 pass, 미존재 또는 총합이 다르면 캐시
				var result;
				if(pRst["result"] !== undefined && pRst["result"] !== null){
					result = pRst.result["list"];
				}

				if(result !== undefined && result !== null && result.length > 0){
					var totCnt_orgl = result.length;
					var totCnt_calc = 0;	// 권역정보가 유효한것만 카운트할 때(현재 미사용)

					//기존값 존재 여부 : total_cnt 속성의 값 비교
					if(!tgtMap.hasOwnProperty("total_cnt") || (totCnt_orgl !== tgtMap["total_cnt"])){
						$urbanObj.deleteProperty(tgtMap);

						$.each(result, function(index, item){
							var dstrctLclasCd = item["dstrct_lclas_cd"];
							if(!tgtMap.hasOwnProperty(dstrctLclasCd)){
								tgtMap[dstrctLclasCd] = [];
							}
							tgtMap[dstrctLclasCd].push(item);
						});

						tgtMap["total_cnt"] = totCnt_orgl;
					}
				}else{
					$urbanObj.deleteProperty(tgtMap);
					tgtMap["total_cnt"] = 0;
				}

				return $urbanObj.urbarsMap[mapKey];
			}else{
				return null;
			}

			/*
			var params = pOpt["params"];
			if(params !== undefined && params !== null){
				// 분류(UN도시, 통계청) 확인
				var clsGb;
				if(params["urbarInfo"] !== undefined && params["urbarInfo"] !== null){
					clsGb = params.urbarInfo["urban_cls_gb"];
				}

				// 사용할 저장소 확인
				var map_dp1;
				if(clsGb == $urbanObj.urbanCls_UN){
					map_dp1 = $urbanObj.un_urbarsMap;
				}else if(clsGb == $urbanObj.urbanCls_SGIS){
					map_dp1 = $urbanObj.sgis_urbarsMap;
				}

				if(map_dp1 === undefined || map_dp1 === null){
					return;
				}

				// 정보 저장 시작
				var baseYear = params["base_year"];
				if(baseYear !== undefined && baseYear !== null && baseYear.length === 4){
					// 1 depth 처리: 년도
					var mapKey_dp1 = "Y_" + baseYear;
					if(!map_dp1.hasOwnProperty(mapKey_dp1)){
						map_dp1[mapKey_dp1] = {};
					}

					// 2 depth 처리: UN도시분류=>도시 type, 통계청분류=>년도
					var map_dp2 = map_dp1[mapKey_dp1];
					var map_last;
					if(clsGb == $urbanObj.urbanCls_UN){	//UN도시 분류
						var mapKey_dp2 = params.urbarInfo["urban_type"];
						if(!map_dp2.hasOwnProperty(mapKey_dp2)){
							map_dp2[mapKey_dp2] = {};
						}

						map_last = map_dp2[mapKey_dp2];	// 도시 type
					}else if(clsGb == $urbanObj.urbanCls_SGIS){	//통계청 분류
						map_last = map_dp2;
					}

					// 3 depth 처리: 권역
					// 3-1 : pForce 가 true이면 기존값 삭제
					if(pForce){
						$urbanObj.deleteProperty(map_last);
					}

					// 3-2 : 기존값 존재 시 pass, 미존재 시 캐시
					var result;
					if(pRst["result"] !== undefined && pRst["result"] !== null){
						result = pRst.result["list"];
					}

					if(result !== undefined && result !== null && result.length > 0){
						var totCnt_orgl = result.length;
						var totCnt_calc = 0;	// 권역정보가 유효한것만 카운트할 때(현재 미사용)

						//기존값 존재 여부 : total_cnt 속성의 값 비교
						if(!map_last.hasOwnProperty("total_cnt") || (totCnt_orgl !== map_last["total_cnt"])){
							$urbanObj.deleteProperty(map_last);

							$.each(result, function(index, item){
								var dstrctLclasCd = item["dstrct_lclas_cd"];
								if(!map_last.hasOwnProperty(dstrctLclasCd)){
									map_last[dstrctLclasCd] = [];
								}
								map_last[dstrctLclasCd].push(item);
							});

							map_last["total_cnt"] = totCnt_orgl;
						}
					}else{
						$urbanObj.deleteProperty(map_last);
						map_last["total_cnt"] = 0;
					}
				}
				// 정보 저장 끝
			}
			*/
		},

		/**
		 *
		 * @name         : getUrbanAreasInfo
		 * @description  : 도시지역 목록 정보를 반환한다.
		 * @history 	 :
		 */
		getUrbanAreasInfo : function(pOpt) {
			var mapKey = $urbanObj.getUrbanAreasKey(pOpt);
			if(mapKey !== ""){
				return $urbanObj.urbarsMap[mapKey];
			}else{
				return null;
			}
		},

		/**
		 *
		 * @name         : setStatsParamInfo
		 * @description  : 통계(데이터보드) 요청에 사용된 요청변수 정보를 저정한다.
		 * @history 	 :
		 */
		setStatsParamInfo : function(pObj) {
			this.latestStatsParamInfo = deepCopy(pObj);
		},

		/**
		 *
		 * @name         : getStatsParamInfo
		 * @description  : 통계(데이터보드) 요청에 사용된 요청변수 정보를 반환한다.
		 * @history 	 :
		 */
		getStatsParamInfo : function() {
			if(this.latestStatsParamInfo === undefined || this.latestStatsParamInfo === null){
				return null;
			}else{
				return deepCopy(this.latestStatsParamInfo);
			}
		},

		setIdxStatsMap : function(pKey, pList) {
			this.idxStatsMap[pKey] = pList;
		},

		getIdxStatsMap : function(pKey) {
			var rtnVal = this.idxStatsMap[pKey];

			if(rtnVal === undefined || rtnVal === null){
				rtnVal = [];
			}

			return rtnVal;
		},

		/**
		 *
		 * @name         : addAttrToGeoInfo
		 * @description  : 통계정보를 도형정보에 추가한다.
		 * @history 	 :
		 */
		addAttrToGeoInfo : function(pOpt, pMode) {

		},

		/**
		 *
		 * @name         : setStatisticsInfo
		 * @description  : 통계정보를 저장한다.
		 * @history 	 :
		 */
		setStatisticsInfo : function(pGb, pRst, pOpt) {

		},

		/**
		 *
		 * @name         : getStatisticsInfo
		 * @description  : 동일 조건의 통계정보가 존재하면, 저장된 통계정보를 반환한다.
		 * @history 	 :
		 */
		getStatisticsInfo : function(pGb, pOpt, pKeyId) {
			var rtnObj = {};

			return rtnObj;
		},

		/**
		 *
		 * @name         : getShapeArea
		 * @description  : 도형 정보를 반환한다.
		 * @history 	 :
		 */
		getShapeInfo : function(pGb, pRange, pMode) {
			var rtnObj = {};

			return rtnObj;
		},

		/**
		 *
		 * @name         : getShapeArea
		 * @description  : 도형의 면적정보를 반환한다.
		 * @history 	 :
		 */
		getShapeArea : function(pGb, pRange, pMode) {
			var shpArea = 0;

			return shpArea;
		},

		/**
		 *
		 * @name         : makeSelectedUrbarsInfo
		 * @description  : 선택한 도시지역에 대한 정보 객체를 반환한다.
		 * @history 	 :
		 */
		makeSelectedUrbarsInfo : function(pTgt) {
			var $selRow = pTgt;

        	var urbanId = $selRow.attr("data-urban-id");
        	var urbanYear = $selRow.attr("data-urban-year");
        	var urbanCls = $selRow.attr("data-urban-cls");
        	var urbanType = $selRow.attr("data-urban-type");
        	var sidoCd = $selRow.attr("data-urban-sido");
        	var sggCd = $selRow.attr("data-urban-sgg");
        	var mainUrbanId = $selRow.attr("data-urban-main-id");

			var param = {};
			param.base_year = urbanYear;
			param.urban_cls_gb = urbanCls;
			param.urban_id = urbanId;
			param.urban_type = urbanType;
			param.urban_sido_cd = sidoCd;
			param.urban_sgg_cd = sggCd;
			param.urban_nm = $selRow.html();
			param.main_urban_id = mainUrbanId;

			return param;
		},

		setInitMap : function(pObj) {
			//한개만 담는다.
			$urbanObj.deleteProperty(this.initSetMap);

			var identifier = new Date().getTime() + "";
			this.initSetMap[identifier] = deepCopy(pObj);

			return identifier;
		},

		getInitMap : function(pKey) {
			var rtnObj;
			if(!isNaN(pKey)){
				var tmpObj = deepCopy(this.initSetMap[pKey]);
				if(tmpObj !== undefined && tmpObj !== null){
					var curTime = new Date().getTime();
					var elapsedTime = curTime - Number(pKey);
					if(elapsedTime < (1000 * 60)){
						var countdown = tmpObj["countdown"];
						if(isNaN(countdown)){
							tmpObj["countdown"] = 0;
							this.initSetMap[pKey] = null;
							delete this.initSetMap[pKey];
							$urbanObj.setCurIdentifier("");
						}else{
							countdown = countdown - 1;
							tmpObj["countdown"] = countdown;
							if(countdown <= 0){
								this.initSetMap[pKey] = null;
								delete this.initSetMap[pKey];
								$urbanObj.setCurIdentifier("");
							}else{
								this.initSetMap[pKey]["countdown"] = countdown;
							}
						}

						rtnObj = tmpObj;
					}else{	//1분이 지나면 버림
						this.initSetMap[pKey] = null;
						delete this.initSetMap[pKey];
						$urbanObj.setCurIdentifier("");
					}
				}
			}

			return rtnObj;
		},

		setCurIdentifier : function(pVal) {
			if(pVal !== undefined && pVal !== null){
				this.curIdentifier = pVal.trim();
			}else{
				this.curIdentifier = "";
			}
		},

		getCurIdentifier : function() {
			if(this.curIdentifier !== undefined && this.curIdentifier !== null){
				return this.curIdentifier.trim();
			}else{
				return "";
			}
		},

		/**
		 *
		 * @name         : chkExistData
		 * @description  : 도형 및 통계정보가 존재하는지 확인한다.
		 * @history 	 :
		 */
		chkExistData : function() {
			// rst : 0-도형 및 통계정보가 존재하지 않음, 1-도형 정보만 존재, 2-도형 및 통계정보가 존재
			var rst = "0";

			return rst;
		},

		isEmptyObject : function(pObj) {
			return Object.keys(pObj).length === 0 && pObj.constructor === Object;
		},

		deleteProperty : function(pObj) {
			for(var key in pObj){
				delete pObj[key];

				//console.log("key : " + key);
			}
		},

		isInteger : function(pVal) {

			var rst = false;
			if($.isNumeric(pVal) && Math.floor(pVal) == pVal){
				rst = true;
			}
			return rst;
		}
	};

}(window, document));