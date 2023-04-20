//Following https://github.com/Leaflet/Leaflet/blob/master/PLUGIN-GUIDE.md
(function (factory, window) {

	// define an AMD module that relies on 'leaflet'
	if (typeof define === 'function' && define.amd) {
		//define(['leaflet'], factory);
		define(['sop'], factory);

	// define a Common JS module that relies on 'leaflet'
	} else if (typeof exports === 'object') {
		module.exports = factory(require('sop'));
	}

	// attach your plugin to the global 'L' variable
	if (typeof window !== 'undefined' && window.sop) {
		window.sop.Control.MiniMap = factory(sop);
		window.sop.control.minimap = function (layer, options) {
			return new window.sop.Control.MiniMap(layer, options);
		};
	}
}(function (sop) {

	var MiniMap = sop.Control.extend({

		includes: sop.Evented ? sop.Evented.prototype : sop.Mixin.Events,

		options: {
			position: 'bottomright',
			toggleDisplay: false,
			zoomLevelOffset: -4,
			zoomLevelFixed: false,
			centerFixed: false,
			zoomAnimation: false,
			autoToggleDisplay: false,
			minimized: false,
			width: 160,
			height: 140,
			collapsedWidth: 19,
			collapsedHeight: 19,
			aimingRectOptions: {color: '#ff7800', weight: 1, interactive: false},
			shadowRectOptions: {color: '#000000', weight: 1, interactive: false, opacity: 0, fillOpacity: 0},
			//strings: {hideText: 'Hide MiniMap', showText: 'Show MiniMap'},
			strings: {hideText: '미니맵 숨기기', showText: '미니맵 나타내기'},
			mapOptions: {}  // Allows definition / override of Leaflet map options.
		},

		// layer is the map layer to be shown in the minimap
		initialize: function (layer, options) {
			sop.Util.setOptions(this, options);
			// Make sure the aiming rects are non-clickable even if the user tries to set them clickable (most likely by forgetting to specify them false)
			this.options.aimingRectOptions.interactive = false;
			this.options.shadowRectOptions.interactive = false;
			this._layer = layer;
		},

		onAdd: function (map) {

			this._mainMap = map;

			// Creating the container and stopping events from spilling through to the main map.
			this._container = sop.DomUtil.create('div', 'leaflet-control-minimap');
			this._container.style.width = this.options.width + 'px';
			this._container.style.height = this.options.height + 'px';
			sop.DomEvent.disableClickPropagation(this._container);
			sop.DomEvent.on(this._container, 'mousewheel', sop.DomEvent.stopPropagation);

			
			var mapOptions = {
				attributionControl: false,
				dragging: !this.options.centerFixed,
				zoomControl: false,
				zoomAnimation: this.options.zoomAnimation,
				autoToggleDisplay: this.options.autoToggleDisplay,
				touchZoom: this.options.centerFixed ? 'center' : !this._isZoomLevelFixed(),
				scrollWheelZoom: this.options.centerFixed ? 'center' : !this._isZoomLevelFixed(),
				doubleClickZoom: this.options.centerFixed ? 'center' : !this._isZoomLevelFixed(),
				boxZoom: !this._isZoomLevelFixed(),
				crs: map.options.crs
			};
			
			
			mapOptions = sop.Util.extend(this.options.mapOptions, mapOptions);  // merge with priority of the local mapOptions object.

			this._miniMap = new sop.Map(this._container, mapOptions);

			this._miniMap.addLayer(this._layer);

			// These bools are used to prevent infinite loops of the two maps notifying each other that they've moved.
			this._mainMapMoving = false;
			this._miniMapMoving = false;

			// Keep a record of this to prevent auto toggling when the user explicitly doesn't want it.
			this._userToggledDisplay = false;
			this._minimized = false;

			if (this.options.toggleDisplay) {
				this._addToggleButton();
			}

			this._miniMap.whenReady(sop.Util.bind(function () {
				this._aimingRect = sop.rectangle(this._mainMap.getBounds(), this.options.aimingRectOptions).addTo(this._miniMap);
				this._shadowRect = sop.rectangle(this._mainMap.getBounds(), this.options.shadowRectOptions).addTo(this._miniMap);
				this._mainMap.on('moveend', this._onMainMapMoved, this);
				this._mainMap.on('move', this._onMainMapMoving, this);
				this._miniMap.on('movestart', this._onMiniMapMoveStarted, this);
				this._miniMap.on('move', this._onMiniMapMoving, this);
				this._miniMap.on('moveend', this._onMiniMapMoved, this);
			}, this));

			return this._container;
		},

		addTo: function (map) {
			sop.Control.prototype.addTo.call(this, map);

			var center = this.options.centerFixed || this._mainMap.getCenter();
			this._miniMap.setView(center, this._decideZoom(true));
			this._setDisplay(this.options.minimized);
			return this;
		},

		onRemove: function (map) {
			this._mainMap.off('moveend', this._onMainMapMoved, this);
			this._mainMap.off('move', this._onMainMapMoving, this);
			this._miniMap.off('moveend', this._onMiniMapMoved, this);

			this._miniMap.removeLayer(this._layer);
		},

		changeLayer: function (layer) {
			this._miniMap.removeLayer(this._layer);
			this._layer = layer;
			this._miniMap.addLayer(this._layer);
		},

		_addToggleButton: function () {
			this._toggleDisplayButton = this.options.toggleDisplay ? this._createButton(
				'', this._toggleButtonInitialTitleText(), ('leaflet-control-minimap-toggle-display leaflet-control-minimap-toggle-display-' +
				this.options.position), this._container, this._toggleDisplayButtonClicked, this) : undefined;

			this._toggleDisplayButton.style.width = this.options.collapsedWidth + 'px';
			this._toggleDisplayButton.style.height = this.options.collapsedHeight + 'px';
		},

		_toggleButtonInitialTitleText: function () {
			if (this.options.minimized) {
				return this.options.strings.showText;
			} else {
				return this.options.strings.hideText;
			}
		},

		_createButton: function (html, title, className, container, fn, context) {
			var link = sop.DomUtil.create('a', className, container);
			link.innerHTML = html;
			link.href = '#';
			link.title = title;
			link.id ="btn_toggle";
		

			var stop = sop.DomEvent.stopPropagation;

			sop.DomEvent
				.on(link, 'click', stop)
				.on(link, 'mousedown', stop)
				.on(link, 'dblclick', stop)
				.on(link, 'click', sop.DomEvent.preventDefault)
				.on(link, 'click', fn, context);

			return link;
		},

		_toggleDisplayButtonClicked: function () {
			this._userToggledDisplay = true;
			if (!this._minimized) {
				this._minimize();
			} else {
				this._restore();
			}
		},

		_setDisplay: function (minimize) {
			if (minimize !== this._minimized) {
				if (!this._minimized) {
					this._minimize();
				} else {
					this._restore();
				}
			}
		},

		_minimize: function () {
			// hide the minimap
			if (this.options.toggleDisplay) {
				this._container.style.width = this.options.collapsedWidth + 'px';
				this._container.style.height = this.options.collapsedHeight + 'px';
				this._toggleDisplayButton.className += (' minimized-' + this.options.position);
				this._toggleDisplayButton.title = this.options.strings.showText;
			} else {
				this._container.style.display = 'none';
			}
			this._minimized = true;
			this._onToggle();
		},

		_restore: function () {
			if (this.options.toggleDisplay) {
				this._container.style.width = this.options.width + 'px';
				this._container.style.height = this.options.height + 'px';
				this._toggleDisplayButton.className = this._toggleDisplayButton.className
					.replace('minimized-'	+ this.options.position, '');
				this._toggleDisplayButton.title = this.options.strings.hideText;
			} else {
				this._container.style.display = 'block';
			}
			this._minimized = false;
			this._onToggle();
		},

		_onMainMapMoved: function (e) {
			if (!this._miniMapMoving) {
				var center = this.options.centerFixed || this._mainMap.getCenter();

				this._mainMapMoving = true;
				this._miniMap.setView(center, this._decideZoom(true));
				this._setDisplay(this._decideMinimized());
			} else {
				this._miniMapMoving = false;
			}
			this._aimingRect.setBounds(this._mainMap.getBounds());
		},

		_onMainMapMoving: function (e) {
			this._aimingRect.setBounds(this._mainMap.getBounds());
		},

		_onMiniMapMoveStarted: function (e) {
			if (!this.options.centerFixed) {
				var lastAimingRect = this._aimingRect.getBounds();
				//var sw = this._miniMap.latLngToContainerPoint(lastAimingRect.getSouthWest());
				//var ne = this._miniMap.latLngToContainerPoint(lastAimingRect.getNorthEast());
				
				//var sw = this._miniMap.layerPointToContainerPoint(lastAimingRect.getSouthWest());
				//var ne = this._miniMap.layerPointToContainerPoint(lastAimingRect.getNorthEast());
				
				var sw = this._miniMap.utmkToContainerPoint(lastAimingRect.getSouthWest());
				var ne = this._miniMap.utmkToContainerPoint(lastAimingRect.getNorthEast());
				
				
				
				console.log(lastAimingRect.getSouthWest());
				console.log(lastAimingRect.getSouthWest().x);
				console.log(lastAimingRect.getSouthWest().y);
				console.log("sw [" + sw);
				console.log("ne [" + ne);
				
				
				this._lastAimingRectPosition = {sw: sw, ne: ne};
			}
		},

		_onMiniMapMoving: function (e) {
			if (!this.options.centerFixed) {
				if (!this._mainMapMoving && this._lastAimingRectPosition) {
					//this._shadowRect.setBounds(new sop.LatLngBounds(this._miniMap.containerPointToLatLng(this._lastAimingRectPosition.sw), this._miniMap.containerPointToLatLng(this._lastAimingRectPosition.ne)));
					
					//this._shadowRect.setBounds(new sop.UTMKBounds.prototype.overlaps(this._miniMap.containerPointToLayerPoint(this._lastAimingRectPosition.sw), this._miniMap.containerPointToLayerPoint(this._lastAimingRectPosition.ne)));
					this._shadowRect.setBounds(new sop.UTMKBounds(this._miniMap.containerPointToUTMK(this._lastAimingRectPosition.sw), this._miniMap.containerPointToUTMK(this._lastAimingRectPosition.ne)));
					
					//this._shadowRect.setBounds(this._miniMap.containerPointToLayerPoint(this._lastAimingRectPosition.sw), this._miniMap.containerPointToLayerPoint(this._lastAimingRectPosition.ne));
					this._shadowRect.setStyle({opacity: 1, fillOpacity: 0.3});
				}
			}
		},

		_onMiniMapMoved: function (e) {
			if (!this._mainMapMoving) {
				this._miniMapMoving = true;
				this._mainMap.setView(this._miniMap.getCenter(), this._decideZoom(false));
				this._shadowRect.setStyle({opacity: 0, fillOpacity: 0});
			} else {
				this._mainMapMoving = false;
			}
		},

		_isZoomLevelFixed: function () {
			var zoomLevelFixed = this.options.zoomLevelFixed;
			return this._isDefined(zoomLevelFixed) && this._isInteger(zoomLevelFixed);
		},

		_decideZoom: function (fromMaintoMini) {
			if (!this._isZoomLevelFixed()) {
				if (fromMaintoMini) {
					
					//mng_s 20200414 이진호
					//지도의 type이 위성 지도 일 경우와 일반 지도 일 경우  zoomLevel 이 다르기 때문에 분기처리 
					//console.log("this._mainMap.getZoom()=====>"+this._mainMap.getZoom());
					if($('#settlite').hasClass("on")){
						this.options.zoomLevelOffset = -10;
					}else if($('#normal').hasClass("on")){
						this.options.zoomLevelOffset = -4;
					}else{
						this.options.zoomLevelOffset = -4;
					}
					//mng_e 20200414 이진호
					
					return this._mainMap.getZoom() + this.options.zoomLevelOffset;
				} else {
					var currentDiff = this._miniMap.getZoom() - this._mainMap.getZoom();
					var proposedZoom = this._miniMap.getZoom() - this.options.zoomLevelOffset;
					var toRet;

					if (currentDiff > this.options.zoomLevelOffset && this._mainMap.getZoom() < this._miniMap.getMinZoom() - this.options.zoomLevelOffset) {
						// This means the miniMap is zoomed out to the minimum zoom level and can't zoom any more.
						if (this._miniMap.getZoom() > this._lastMiniMapZoom) {
							// This means the user is trying to zoom in by using the minimap, zoom the main map.
							toRet = this._mainMap.getZoom() + 1;
							// Also we cheat and zoom the minimap out again to keep it visually consistent.
							this._miniMap.setZoom(this._miniMap.getZoom() - 1);
						} else {
							// Either the user is trying to zoom out past the mini map's min zoom or has just panned using it, we can't tell the difference.
							// Therefore, we ignore it!
							toRet = this._mainMap.getZoom();
						}
					} else {
						// This is what happens in the majority of cases, and always if you configure the min levels + offset in a sane fashion.
						toRet = proposedZoom;
					}
					this._lastMiniMapZoom = this._miniMap.getZoom();
					return toRet;
				}
			} else {
				if (fromMaintoMini) {
					return this.options.zoomLevelFixed;
				} else {
					return this._mainMap.getZoom();
				}
			}
		},

		_decideMinimized: function () {
			if (this._userToggledDisplay) {
				return this._minimized;
			}

			if (this.options.autoToggleDisplay) {
				if (this._mainMap.getBounds().contains(this._miniMap.getBounds())) {
					return true;
				}
				return false;
			}

			return this._minimized;
		},

		_isInteger: function (value) {
			return typeof value === 'number';
		},

		_isDefined: function (value) {
			return typeof value !== 'undefined';
		},

		_onToggle: function () {
			sop.Util.requestAnimFrame(function () {
				sop.DomEvent.on(this._container, 'transitionend', this._fireToggleEvents, this);
				if (!sop.Browser.any3d) {
					sop.Util.requestAnimFrame(this._fireToggleEvents, this);
				}
			}, this);
		},

		_fireToggleEvents: function () {
			sop.DomEvent.off(this._container, 'transitionend', this._fireToggleEvents, this);
			var data = { minimized: this._minimized };
			this.fire(this._minimized ? 'minimize' : 'restore', data);
			this.fire('toggle', data);
		}
	});

	sop.Map.mergeOptions({
		miniMapControl: false
	});

	sop.Map.addInitHook(function () {
		if (this.options.miniMapControl) {
			this.miniMapControl = (new MiniMap()).addTo(this);
		}
	});

	return MiniMap;

}, window));

