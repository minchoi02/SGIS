/**
 * 생활권역서비스 화면에 대한 클래스
 * 
 * history : 2020/09/22 초기 작성 version : 1.0 see : 원형(/js/interactive/interactiveMapBtn.js)
 * 
 */
(function(W, D) {
	W.$catchmentAreaBtn = W.$catchmentAreaBtn || {};
	
	$(document).ready(function() {
		
	});
	
	catchmentAreaBtnInfo = {
		btnInfo	: function(map, delegate) {
			var that = this;
			this.map = map;
			this.id = null;
			this.delegate = (delegate != undefined) ? delegate : null;
			this.center = null;
			this.mapBounds = null;			
//			this.poiObj = null;
//			this.setObj = null;
//			this.mapObj = null;
//			this.year = companyDataYear;//dataYear; 2016.09.02 9월 서비스
//			this.bndYear = bndYear;
//			this.pageNum = "";
//			this.themeCd = "";
//			this.class_cd = "";
//			this.resultcount = "500";
//			this.isOpenPOI = false;
//			this.selectedPoiTitle = "";
//			this.companyTree = null;
//			this.curSelectedCompanyNode = null;
//			this.baseTileLayer = null;
//			this.targetTileLayer = null;			
//			this.isShow = false; //9월 서비스
//			this.markerGroup = [];

			/**
			 * 
			 * @name         : createUI
			 * @description  : 초기화한다.
			 * @history 	 :
			 */
			this.createUI = function(options) {
				var currentdate = new Date();
				this.id = makeStamp(currentdate);
				
				this.eventHandler();
			},
			
			/**
			 * 
			 * @name         : changeZoomLevelTitle
			 * @description  : 줌 종료시, 해당레벨의 단계를 표시한다.
			 * @history 	 :
			 */
			this.changeZoomLevelTitle = function(title) {
		
				$("#mapZm p").text(title);
			};
			
			/**
			 * 
			 * @name         : eventHandler
			 * @description  : 이벤트 핸들러
			 * @date         : 2015. 10. 06. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			this.eventHandler = function() {				
				//zoom-in
				var $zmPl = $("#mapZm").find(".btn__zoom.btn__zoom--in");
				if($zmPl){
					$zmPl.off("click");
					$zmPl.click(function() {
						if (!that.map.isFixedBound) {
							$catchmentAreaMap.ui.map.gMap.zoomIn(1);
						} 
						if (that.delegate != undefined && 
							that.delegate.callbackFunc != undefined &&
							that.delegate.callbackFunc.didMapZoomIn != undefined) {
							that.delegate.callbackFunc.didMapZoomIn(that.map);
						}
						//srvLogWrite('Q0','01','03','00','줌 레벨 값 - '+that.map.zoom,'');
					});
				}
				
				//zoom-out
				var $zmMi = $("#mapZm").find(".btn__zoom.btn__zoom--out");
				if($zmMi ){
					$zmMi.off("click");
					$zmMi.click(function() {
						if (!that.map.isFixedBound) {
							$catchmentAreaMap.ui.map.gMap.zoomOut(1);
						}
						if (that.delegate != undefined && 
								that.delegate.callbackFunc != undefined &&
								that.delegate.callbackFunc.didMapZoomOut != undefined) {
								that.delegate.callbackFunc.didMapZoomOut(that.map);
							}
						//srvLogWrite('Q0','01','03','00','줌 레벨 값 - '+that.map.zoom,'');
					});
				}
			}	
		}
	};
	
	/** ********* API 조회 START ********* */

	/** ********* API 조회 End ********* */
	
	
	
}(window, document));