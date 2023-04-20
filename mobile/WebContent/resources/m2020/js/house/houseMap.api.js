(function(W, D) {
	W.$houseMap = W.$houseMap || {};
	$houseMap.api = {
		/**
		 * @name                 : houseAnalysisOrderLists
		 * @description          : 주거지분석맵 지표순위 가져오기
		 * @date                 : 2020.07.21
		 * @author	             : 한광희
		 * @history 	         :
		 * @param level          : 찾을 레벨(1 : 시도, 2 : 시군구, 3 : 읍면동)
		 * @param b_class_idx_id : 대분류
		 * @param m_class_idx_id : 중분류
		 * @param year           : 년도
		 * @param sido_cd        : 시도 코드
		 * @param sgg_cd         : 시군구 코드
		 * @param callback       : callback
		 */
		houseAnalysisOrderLists : function(level,b_class_idx_id,m_class_idx_id,year,sido_cd,sgg_cd,callback){
			if(!level||!b_class_idx_id||!m_class_idx_id||!year){
				common_alert("파라미터값이 잘못 되었습니다");
				console.error("파라미터값이 잘못 되었습니다");
				return;
			}
			var obj = new sop.portal.houseAnalysisOrderLists.api();
			if(
				(b_class_idx_id=="HML0003"&&m_class_idx_id=="HMM0012")||//순유입인구
				(b_class_idx_id=="HML0006"&&m_class_idx_id=="HMM0020")//교원 1인당 학생수	
			){
				obj.addParam("borough", "1");
			}
			obj.addParam("b_class_idx_id", b_class_idx_id);
			obj.addParam("m_class_idx_id", m_class_idx_id);
			obj.addParam("level", level);
			obj.addParam("year", year);
			
			if(sido_cd&&sido_cd!="00"){
				obj.addParam("sido_cd", sido_cd);
				if(sgg_cd&&sgg_cd!="999"){
					obj.addParam("sgg_cd", sgg_cd);
				}
			}
			obj.request({
				method : "POST",
				async : true,
				url : sgisContextPath+"/ServiceAPI/house/houseAnalysisOrderLists.json",
				options : {
					callback : callback
				}
			});
		},
		/**
		 * @name            : areaIndexChartLists
		 * @description     : 지역 종합현황 가져오기
		 * @date            : 2020.07.21
		 * @author	        : 한광희
		 * @history 	    :
		 * @param bnd_year   : 지도연도
		 * @param sido_cd   : 시도 코드
		 * @param sgg_cd    : 시군구 코드
		 * @param emdong_cd : 읍면동 코드
		 * @param callback  : callback
		 */
		areaIndexChartLists : function(bnd_year,sido_cd,sgg_cd,emdong_cd,type,callback){
			if(!hasText(sido_cd)){
				sido_cd="00";
			}
			if(!hasText(sgg_cd)){
				sgg_cd="999";
			}
			var obj = new sop.portal.areaIndexChartLists.api();
			obj.addParam("bnd_year", bnd_year);
			obj.addParam("sido_cd", sido_cd);
			obj.addParam("sgg_cd", sgg_cd);
			if(emdong_cd){
				obj.addParam("emdong_cd", emdong_cd);
			}
			if(type){
				obj.addParam("type", type);
			}
			obj.request({
				method : "POST",
				async : true,
				url : sgisContextPath+"/ServiceAPI/house/areaIndexChartLists.json",
				options : {
					callback : callback
				}
			});
			
		}
	};
	/*********** 주거지분석 순위 정보 조회 시작 **********/
	(function() {
		$class("sop.portal.houseAnalysisOrderLists.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if(typeof options.callback==="function"){
					options.callback(res);
				}
			},
			onFail: function(status, options) {
			}
		});
	}());
	/*********** 주거지분석 순위 정보 조회 종료 **********/
	/*********** 지역종합 리스트 정보 조회 시작 **********/
	(function() {
		$class("sop.portal.areaIndexChartLists.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if(typeof options.callback==="function"){
					options.callback(res);
				}
			},
			onFail: function(status, options) {
			}
		});
	}());
	/*********** 지역종합 리스트 정보 조회 종료 **********/
}(window, document));