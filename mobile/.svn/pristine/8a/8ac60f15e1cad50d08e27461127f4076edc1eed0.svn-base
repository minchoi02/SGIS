(function(W, D) {
	W.$pplDistHeat = W.$pplDistHeat || {};
	$(document).ready(function(){
		$pplDistHeat.event.setUIEvent();
	});
	$pplDistHeat.ui = {
		map : null,//지도
		/**
		 * @name         : createMap
		 * @description  : 지도 생성
		 * @date         : 2016. 09. 13. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		createMap: function() {
			this.map = new sMap.map();
			this.map.isDrawBoundary = false;
			this.map.center = [989674, 1818313];
			this.map.zoom = 3;
			this.map.createMap($pplDistHeat, "map", {
				minZoom : 0,
				maxZoom : 9,
				isMapCaptionToggleControl :false,
				isZoomControl : false,
				isCurrentControl : true,
				isMapSizeControl : true,
				isPoiControl : false,
				isMapNavigator : true,
				navigatorOption : {
					id : "map-navigator-"
				},
				isLegendControl : false
			});
			this.map.addControlEvent("movestart");
			this.map.addControlEvent("moveend");
			this.map.addControlEvent("zoomstart");
			this.map.addControlEvent("zoomend");
			var tileLayer = new PeopleHeapMapLayer();
			tileLayer.addTo($pplDistHeat.ui.map.gMap);
		}
	};
	$pplDistHeat.event = {
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2016. 09. 13. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		setUIEvent : function(){
			$pplDistHeat.ui.createMap();
			this.setMapSize();
		},
		/**
		 * @name         : setMapSize
		 * @description  : 지도 사이즈 변경
		 * @date         : 2016. 09. 13. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		setMapSize : function(){
			if($("body").hasClass("full")){
				$("#map").height($(window).height());
			}else{
				var height = $(window).height()-$(".Wrap>.Header").outerHeight(true)-$(".Wrap>.Content>.Btn_Top").outerHeight(true)-$(".Wrap>.Content>.SelectArea").outerHeight(true);
				$("#map").height(height);
			}
			$pplDistHeat.ui.map.gMap.invalidateSize();
		}
	};
	PeopleHeapMapLayer = sop.StatisticTileLayer.extend({
		options : {
			url : 'http://sgisapi.kostat.go.kr/tiles/phmap/l{z}/{y}/{x}.png',
			maxZoom: 9,
			minZoom: 0,
			zIndex : 20
		},

		getTileUrl: function (coords) {
			var y = this.options.tms ? this._tileNumBounds.max.y - coords.y : coords.y;

			return sop.Util.template(this._url, sop.extend({
				r: this.options.detectRetina && sop.Browser.retina && this.options.maxZoom > 0 ? '@2x' : '',
				s: this._getSubdomain(coords),
				x: 'C' + this.fillZero(coords.x.toString(16), 8),
				y: 'R' + this.fillZero(y.toString(16), 8),
				z: this.fillZero(this._getZoomForUrl().toString(10), 2)
			}, this.options));
		},

		_tileOnError: function (done, tile, e) {
			if (sop.Browser.ielt9) {
				tile.style.filter = 'alpha(opacity=0)';
			} else {
				tile.style.opacity = '0';
			}
			done(e, tile);
		}
	});
}(window, document));