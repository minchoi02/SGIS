/**
 * 도시화 분석 지도 맵버튼에 대한 클래스
 *
 * history : 2021/11/02 초기 작성 version : 1.0 see : 원형(/js/interactive/interactiveMapBtn.js)
 *
 */
(function(W, D) {
  W.$urbanMapBtn = W.$urbanMapBtn || {};

  $(document).ready(function() {

  });

  urbanMapBtnInfo = {
    btnInfo	: function(map, delegate) {
      var that = this;
      this.map  = map;
      this.id = null;
      this.delegate = (delegate != undefined) ? delegate : null;
      this.center = null;
      this.mapBounds = null;
      this.baseTileLayer = null;
      this.targetTileLayer = null;
      this.mapsList =map;              //추가 2022 SGIS5차 


      /**
       *
       * @name         : createUI
       * @description  : 초기화한다.
       * @history 	 :
       */
      this.createUI = function(options) {
        var currentdate = new Date();
        var $mapType;                         //추가 2022 SGIS5차 
        this.id = makeStamp(currentdate);
        this.eventHandler();
          //추가 2022 SGIS5차 
        if(this.mapsList.id == 0) {
        	$mapType=$(".mapType");
        } else {
        	$mapType=$(".mapType" + this.mapsList.id);
        }
            this.eventTypeHandler ($mapType,this.mapsList);
            this.eventHandler (this.mapsList.id,this.mapsList);


      },
          //  //추가 2022 SGIS5차  끝 
      /**
       *
       * @name         : changeZoomLevelTitle
       * @description  : 줌 종료시, 해당레벨의 단계를 표시한다.
       * @history 	 :
       */
      this.changeZoomLevelTitle = function(title) {

        //$(".control-foot").eq(that.map.id).find("span").text(title);
      };

      /**
       *
       * @name         : eventHandler
       * @description  : 이벤트 핸들러
       * @date         : 2022. 08. 07.
       * @author	     : 이준혁
       * @history 	   : 화면분할으로 인한 이벤트 변경  
       */


      this.eventHandler = function(type,maps) {
        //zoom-in
               //추가 2022 SGIS5차 
    	 if(type){
    		 var $zmPl = $(".control-foot"+type).find(".pl"+type);
    		 var $zmMi = $(".control-foot"+type).find(".mi"+type);
    	 }else{
    		 var $zmPl = $(".control-foot").find(".pl");
    		  var $zmMi = $(".control-foot").find(".mi");
    	 }
             //추가 2022 SGIS5차  끝 
        if($zmPl){
          $zmPl.off("click");
          $zmPl.click(function() {
            if (!maps.isFixedBound) {
              maps.gMap.zoomIn(1);
            }
            if (that.delegate != undefined &&
              that.delegate.callbackFunc != undefined &&
              that.delegate.callbackFunc.didMapZoomIn != undefined) {
              that.delegate.callbackFunc.didMapZoomIn(maps);
            }
            srvLogWrite('Q0','01','03','00','줌 레벨 값 - '+maps.zoom,'');
          });
        }

        //zoom-out


        if($zmMi ){
          $zmMi.off("click");
          $zmMi.click(function() {
            if (!maps.isFixedBound) {
              maps.gMap.zoomOut(1);
            }
            if (that.delegate != undefined &&
                that.delegate.callbackFunc != undefined &&
                that.delegate.callbackFunc.didMapZoomOut != undefined) {
                that.delegate.callbackFunc.didMapZoomOut(maps);
              }
            srvLogWrite('Q0','01','03','00','줌 레벨 값 - '+that.map.zoom,'');
          });
        }
      },

        /**
       *
       * @name         : eventHandler
       * @description  : 이벤트 핸들러
       * @date         : 2015. 10. 06.
       * @author	     : 권차욱
       * @history 	 :
       */

//			this.eventHandler = function(type,maps) {
//				//zoom-in
//				var $zmPl =$(".control-foot").eq(that.map.id)find(".pl");
//				if($zmPl){
//					$zmPl.off("click");
//					$zmPl.click(function() {
//						if (!that.map.isFixedBound) {
//							that.map.gMap.zoomIn(1);
//						}
//						if (that.delegate != undefined &&
//							that.delegate.callbackFunc != undefined &&
//							that.delegate.callbackFunc.didMapZoomIn != undefined) {
//							that.delegate.callbackFunc.didMapZoomIn(that.map);
//						}
//						srvLogWrite('Q0','01','03','00','줌 레벨 값 - '+that.map.zoom,'');
//					});
//				}
//
//				//zoom-out
//				var $zmMi = $(".control-foot").eq(that.map.id)find(".mi");
//				if($zmMi ){
//					$zmMi.off("click");
//					$zmMi.click(function() {
//						if (!that.map.isFixedBound) {
//							that.map.gMap.zoomOut(1);
//						}
//						if (that.delegate != undefined &&
//								that.delegate.callbackFunc != undefined &&
//								that.delegate.callbackFunc.didMapZoomOut != undefined) {
//								that.delegate.callbackFunc.didMapZoomOut(that.map);
//							}
//						srvLogWrite('Q0','01','03','00','줌 레벨 값 - '+that.map.zoom,'');
//					});
//				}


        //지도타입 설정(백지도, 일반지도) 원본
//				var $mapType = $(".control-foot").eq(that.map.id).find(".mapType");
//				if($mapType){
//					$mapType.off("click");
//					$mapType.click(function() {
//						var type = $(this).attr('data-map-type');
//						var zoomMargin, crs;
//
//						if("normal" == type){
//							srvLogWrite('R0', '01', '05', '01', '일반지도 -> 백지도', ''); // 2022.02.15 log 생성
//
//							//일반지도 -> 백지도
//							if(!that.baseTileLayer){
//								 that.baseTileLayer = map.gMap.statisticTileLayer;
//							}
//								that.map.mapMode = sop.mapMode = "white";	 // 2019년반영 시작 djlee
//								that.targetTileLayer 	= that.baseTileLayer;
//								that.baseTileLayer 	= that.createWhiteTileLayer();
//								zoomMargin 			= that.baseTileLayer.options.minZoom - that.targetTileLayer.options.minZoom;
//								that.createTileLayer(that.map.gMap, sop.CRS.UTMK, that.baseTileLayer, that.targetTileLayer, zoomMargin);
//
//								$(this).attr('data-map-type', 'white');
//								$(this).html('일반');
//						}else{
//							srvLogWrite('R0', '01', '05', '01', '백지도 -> 일반지도', ''); // 2022.02.15 log 생성
//
//							//백지도 -> 일반지도
//							if(!that.baseTileLayer){
//								that.baseTileLayer = map.gMap.statisticTileLayer;
//							}
//							that.map.mapMode =  sop.mapMode = "normal"; // 2019년반영 시작 djlee
//							that.targetTileLayer = that.baseTileLayer;
//							that.baseTileLayer = that.createNomalTileLayer();
//							zoomMargin = that.baseTileLayer.options.minZoom - that.targetTileLayer.options.minZoom;
//							that.createTileLayer(that.map.gMap, sop.CRS.UTMK, that.baseTileLayer, that.targetTileLayer, zoomMargin);
//
//							$(this).attr('data-map-type', 'normal');
//							$(this).html('백지도');
//						}
//					});
//				}
//			},

      /**
       *
       * @name         : eventTypeHandler
       * @description  : 지도 타입 설정 함수
       * @date         : 2022. 08. 07.
       * @author	     : 이준혁
       * @history 	   :
       */
      // 추가 2022 SGIS5차
      this.eventTypeHandler = function(type,maps) {
        var $mapType = type;
        if($mapType){
          $($mapType).off("click");
          $($mapType).click(function() {
            var type = $($mapType).attr('data-map-type');
            var zoomMargin, crs;
            if("normal" == type){
              srvLogWrite('R0', '01', '05', '01', '일반지도 -> 백지도', ''); // 2022.02.15 log 생성
              //일반지도 -> 백지도
              if(!that.baseTileLayer){
                 that.baseTileLayer = maps.gMap.statisticTileLayer;
              }
                maps.mapMode = sop.mapMode = "white";	 // 2019년반영 시작 djlee
                that.targetTileLayer 	= that.baseTileLayer;
                that.baseTileLayer 	= that.createWhiteTileLayer();
                zoomMargin 			= that.baseTileLayer.options.minZoom - that.targetTileLayer.options.minZoom;
                that.createTileLayer(maps.gMap, sop.CRS.UTMK, that.baseTileLayer, that.targetTileLayer, zoomMargin);

                $(this).attr('data-map-type', 'white');
                $(this).html('일반');
            }else{
              srvLogWrite('R0', '01', '05', '01', '백지도 -> 일반지도', ''); // 2022.02.15 log 생성

              //백지도 -> 일반지도

              if(!that.baseTileLayer){
                that.baseTileLayer = maps.gMap.statisticTileLayer;
              }
              maps.mapMode =  sop.mapMode = "normal"; // 2019년반영 시작 djlee
              that.targetTileLayer = that.baseTileLayer;
              that.baseTileLayer = that.createNomalTileLayer();
              zoomMargin = that.baseTileLayer.options.minZoom - that.targetTileLayer.options.minZoom;
              that.createTileLayer(maps.gMap, sop.CRS.UTMK, that.baseTileLayer, that.targetTileLayer, zoomMargin);

              $(this).attr('data-map-type', 'normal');
              $(this).html('백지도');
            }
          });

      }
    },
    // 추가 2022 SGIS5차 끝

      /**
       *
       * @name         : createTileLayer
       * @description  : 타일레이어 토글버튼 생성
       * @date         : 2021. 12. 24.
       * @author	     : wavus
       * @history 	 :
       */
      this.createTileLayer = function(map, crs, baseLayer, targetLayer, zoomMargin) {
        if(arguments.length < 5) {
          throw new Error('Fail check arguments length. current = ' + arguments.length);
        }

        if(map.hasLayer(baseLayer)){
          return;
        }
        var center = map.getCenter();
        var zoom = that.map.zoom;
        map.removeLayer(targetLayer);
        map.options.crs = crs;
        baseLayer.addTo(map);
        that.map.setFixedBoundLevel(that.map.isFixedBound);
        that.map.mapMove([center.x, center.y], zoom);
      },

      /**
       *
       * @name         : createNomalTileLayer
       * @description  : 일반 타일레이어 생성
       * @date         : 2021. 12. 24.
       * @author	     : wavus
       * @history 	 :
       */
      this.createNomalTileLayer = function() {

        var url = "https://sgisapi.kostat.go.kr/tiles/bmap4/L{z}/{y}/{x}.png";
        var options = {
            errorTileUrl: 'https://sgisapi.kostat.go.kr/tiles/missing.png',
            maxZoom: 13,
            minZoom: 0,
            zoomReverse: false,
            continuousWorld: false,
            tms: false
        };
        var layer = new sop.TileLayer(url, options);

        layer.fillZero = function (strB, strLen) {
          return '00000000'.substr(0, strLen - (strB + '').length) + strB;
        }

        layer.getTileUrl =  function (coords) {
          var y = this.options.tms ? this._tileNumBounds.max.y - coords.y : coords.y;
          return sop.Util.template(this._url, sop.extend({
            x: 'C' + this.fillZero(coords.x.toString(16), 8),
            y: 'R' + this.fillZero(y.toString(16), 8),
            z: this.fillZero(this._getZoomForUrl().toString(10), 2)
          }, this.options));
        }
        return layer;
      },

      /**
       *
       * @name         : createWhiteTileLayer
       * @description  : 백지도 타일레이어 생성
       * @date         : 2021. 12. 24.
       * @author	     : wavus
       * @history 	 :
       */
      this.createWhiteTileLayer = function() {
        var url = "https://sgisapi.kostat.go.kr/tiles/wbmap/L{z}/{y}/{x}.png";
        var options = {
            errorTileUrl: 'https://sgisapi.kostat.go.kr/tiles/missing.png',
            maxZoom: 13,
            minZoom: 0,
            zoomReverse: false,
            continuousWorld: false,
            tms: false
        };
        var layer = new sop.TileLayer(url, options);

        layer.fillZero = function (strB, strLen) {
          return '00000000'.substr(0, strLen - (strB + '').length) + strB;
        }

        layer.getTileUrl =  function (coords) {
          var y = this.options.tms ? this._tileNumBounds.max.y - coords.y : coords.y;
          return sop.Util.template(this._url, sop.extend({
            x: 'C' + this.fillZero(coords.x.toString(16), 8),
            y: 'R' + this.fillZero(y.toString(16), 8),
            z: this.fillZero(this._getZoomForUrl().toString(10), 2)
          }, this.options));
        }
        return layer;
      }
    }
  };

  /** ********* API 조회 START ********* */

  /** ********* API 조회 End ********* */
}(window, document));
