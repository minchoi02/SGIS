/*! jQuery-ui-Slider-Pips - v1.11.1 - 2015-11-30
* Copyright (c) 2015 Simon Goellner <simey.me@gmail.com>; Licensed MIT */



(function($) {
	"use strict";
	var extensionMethods = {
        pips: function( settings ) {
            var slider = this,
                i, j, p,
                collection = "",
                mousedownHandlers,
                min = slider._valueMin(),
                max = slider._valueMax(),
                pips = ( max - min ) / slider.options.step,
                $handles = slider.element.find(".ui-slider-handle"),
                $pips;
            
            var options = {
                first: "label",		/* "label", "pip", false */
                last: "label",		/* "label", "pip", false */
                rest: "pip",		/* "label", "pip", false */
                labels: false,		/* [array], { first: "string", rest: [array], last: "string" }, false */
                prefix: "",
                suffix: "",
                step: ( pips > 100 ) ? Math.floor( pips * 0.05 ) : 1,
                formatLabel: function(value) {
                    return this.prefix + value + this.suffix;
                }
            };

            if ( $.type( settings ) === "object" || $.type( settings ) === "undefined" ) {
                $.extend( options, settings );
                slider.element.data("pips-options", options );
            } else {
                if ( settings === "destroy" ) {
                    destroy();
                } else if ( settings === "refresh" ) {
                    slider.element.slider( "pips", slider.element.data("pips-options") );
                }
                return;
            }

            slider.options.pipStep = Math.round( options.step );
            slider.element
                .off( ".selectPip" )
                .addClass("ui-slider-pips")
                .find(".ui-slider-pip")
                .remove();

            var selectPip = {
                single: function(value) {
                    this.resetClasses();
                    $pips
                        .filter(".ui-slider-pip-" + this.classLabel(value) )
                        .addClass("ui-slider-pip-selected");

                    if ( slider.options.range ) {
                        $pips.each(function(k, v) {
                            var pipVal = $(v).children(".ui-slider-label").data("value");

                            if (( slider.options.range === "min" && pipVal < value ) ||
                                ( slider.options.range === "max" && pipVal > value )) {

                                $(v).addClass("ui-slider-pip-inrange");
                            }

                        });

                    }

                },

                range: function(values) {
                    this.resetClasses();

                    for ( i = 0; i < values.length; i++ ) {
                        $pips
                            .filter(".ui-slider-pip-" + this.classLabel(values[i]) )
                            .addClass("ui-slider-pip-selected-" + ( i + 1 ) );
                    }

                    if ( slider.options.range ) {
                        $pips.each(function(k, v) {
                            var pipVal = $(v).children(".ui-slider-label").data("value");
                            
                            if ( pipVal > values[0] && pipVal < values[1] ) {
                                $(v).addClass("ui-slider-pip-inrange");
                            }
                        });
                    }
                },

                classLabel: function(value) {
                    return value.toString().replace(".", "-");
                },

                resetClasses: function() {
                    var regex = /(^|\s*)(ui-slider-pip-selected|ui-slider-pip-inrange)(-{1,2}\d+|\s|$)/gi;

                    $pips.removeClass( function(index, css) {
                        return ( css.match(regex) || [] ).join(" ");
                    });
                }

            };

            function getClosestHandle( val ) {
                var h, k,
                    sliderVals,
                    comparedVals,
                    closestVal,
                    tempHandles = [],
                    closestHandle = 0;

                if ( slider.values() && slider.values().length ) {
                    sliderVals = slider.values();

                    comparedVals = $.map( sliderVals, function(v) {
                        return Math.abs( v - val );
                    });

                    closestVal = Math.min.apply( Math, comparedVals );

                    for ( h = 0; h < comparedVals.length; h++ ) {
                        if ( comparedVals[h] === closestVal ) {
                            tempHandles.push(h);
                        }
                    }

                    closestHandle = tempHandles[0];

                    for ( k = 0; k < tempHandles.length; k++ ) {
                        if ( slider._lastChangedValue === tempHandles[k] ) {
                            closestHandle = tempHandles[k];
                        }
                    }

                    if ( slider.options.range && tempHandles.length === 2 ) {
                        if ( val > sliderVals[1] ) {
                            closestHandle = tempHandles[1];
                        } else if ( val < sliderVals[0] ) {
                            closestHandle = tempHandles[0];
                        }
                    }
                }

                return closestHandle;

            }

            function destroy() {
                slider.element
                    .off(".selectPip")
                    .on("mousedown.slider", slider.element.data("mousedown-original") )
                    .removeClass("ui-slider-pips")
                    .find(".ui-slider-pip")
                    .remove();

            }

            function labelClick( label, e ) {
                if (slider.option("disabled")) {
                    return;
                }

                var val = $(label).data("value"),
                    indexToChange = getClosestHandle( val );

                if ( slider.values() && slider.values().length ) {
                    slider.options.values[ indexToChange ] = slider._trimAlignValue( val );
                } else {
                    slider.options.value = slider._trimAlignValue( val );
                }

                slider._refreshValue();
                slider._change( e, indexToChange );
                
                //월간통계에서 사용되는 이벤트
                slider.element.trigger("sliderCustomChange", { year : val });
            }

            function createPip( which ) {

                var label,
                    percent,
                    number = which,
                    classes = "ui-slider-pip",
                    css = "",
                    value = slider.value(),
                    values = slider.values();

                if ( which === "first" ) {
                    number = 0;
                } else if ( which === "last" ) {
                    number = pips;
                }

                var labelValue = min + ( slider.options.step * number );
                var classLabel = labelValue.toString().replace(".","-");

                if ( $.type(options.labels) === "array" ) {
                    label = options.labels[number] || "";
                } else if ( $.type( options.labels ) === "object" ) {
                    if ( which === "first" ) {
                        label = options.labels.first || "";
                    } else if ( which === "last" ) {
                        label = options.labels.last || "";
                    } else if ( $.type( options.labels.rest ) === "array" ) {
                        label = options.labels.rest[ number - 1 ] || "";
                    } else {
                        label = labelValue;
                    }
                } else {
                    label = labelValue;
                }

                if ( which === "first" ) {
                    percent = "0%";

                    classes += " ui-slider-pip-first";
                    classes += ( options.first === "label" ) ? " ui-slider-pip-label" : "";
                    classes += ( options.first === false ) ? " ui-slider-pip-hide" : "";
                } else if ( which === "last" ) {
                    percent = "100%";

                    classes += " ui-slider-pip-last";
                    classes += ( options.last === "label" ) ? " ui-slider-pip-label" : "";
                    classes += ( options.last === false ) ? " ui-slider-pip-hide" : "";
                } else {
                    percent = (( 100 / pips ) * which ).toFixed(4) + "%";

                    classes += ( options.rest === "label" ) ? " ui-slider-pip-label" : "";
                    classes += ( options.rest === false ) ? " ui-slider-pip-hide" : "";
                }

                classes += " ui-slider-pip-" + classLabel;
                
//                if ( values && values.length ) {
//                    for ( i = 0; i < values.length; i++ ) {
//                        if ( labelValue === values[i] ) {
//                            classes += " ui-slider-pip-initial-" + ( i + 1 );
//                            classes += " ui-slider-pip-selected-" + ( i + 1 );
//                        }
//                    }
//
//                    if ( slider.options.range ) {
//                        if ( labelValue > values[0] && labelValue < values[1] ) {
//                            classes += " ui-slider-pip-inrange";
//                        }
//                    }
//                } else {
//                    if ( labelValue === value ) {
//                        classes += " ui-slider-pip-initial";
//                        classes += " ui-slider-pip-selected";
//                    }
//
//                    if ( slider.options.range ) {
//                        if (( slider.options.range === "min" && labelValue < value ) ||
//                            ( slider.options.range === "max" && labelValue > value )) {
//
//                            classes += " ui-slider-pip-inrange";
//                        }
//                    }
//                }

                css = ( slider.options.orientation === "horizontal" ) ?
                    "left: " + percent :
                    "bottom: " + percent;

                return "<span class=\"" + classes + "\" style=\"" + css + "\">" +
                            "<span class=\"ui-slider-line\"></span>" +
                            "<span class=\"ui-slider-label\" data-value=\"" +
                                labelValue + "\">" + options.formatLabel(label) + "</span>" +
                        "</span>";

            }
            
            collection += createPip("first");

            for ( p = 1; p < pips; p++ ) {
                if ( p % slider.options.pipStep === 0 ) {
                    collection += createPip( p );
                }
            }
            collection += createPip("last");
            slider.element.append( collection );

            $pips = slider.element.find(".ui-slider-pip");

            if ( $._data( slider.element.get(0), "events").mousedown &&
                $._data( slider.element.get(0), "events").mousedown.length ) {
            	
                mousedownHandlers = $._data( slider.element.get(0), "events").mousedown;
            } else {
                mousedownHandlers = slider.element.data("mousedown-handlers");
            }

            slider.element.data("mousedown-handlers", mousedownHandlers.slice() );
            
            for ( j = 0; j < mousedownHandlers.length; j++ ) {
                if ( mousedownHandlers[j].namespace === "slider" ) {
                    slider.element.data("mousedown-original", mousedownHandlers[j].handler );
                }
            }

            slider.element
                .off("mousedown.slider")
                .on("mousedown.selectPip", function(e) {
                    var $target = $(e.target),
                        closest = getClosestHandle( $target.data("value") ),
                        $handle = $handles.eq( closest );
                    
                    $handle.addClass("ui-state-active");

                    if ( $target.is(".ui-slider-label") ) {
                    	if( !$target.hasClass("disable-label") ){
                    		labelClick( $target, e );
                    		slider.element
                    		.one("mouseup.selectPip", function() {
                    			$handle
                    			.removeClass("ui-state-active")
                    			.focus();
                    		});
                    	}
                    } else {
                        var originalMousedown = slider.element.data("mousedown-original");
                        originalMousedown(e);
                    }
            });

            slider.element.on( "slide.selectPip slidechange.selectPip", function(e, ui) {
                var $slider = $(this),
                    value = $slider.slider("value"),
                    values = $slider.slider("values");

                if ( ui ) {
                    value = ui.value;
                    values = ui.values;
                }

                if ( slider.values() && slider.values().length ) {
                    selectPip.range( values );
                } else {
                    selectPip.single( value );
                }
            });
            
        },

        float: function( settings ) {
            var i,
                slider = this,
                min = slider._valueMin(),
                max = slider._valueMax(),
                value = slider._value(),
                values = slider._values(),
                tipValues = [],
                $handles = slider.element.find(".ui-slider-handle");

            var options = {
                handle: true,
                pips: false,
                labels: false,
                prefix: "",
                suffix: "",
                event: "slidechange slide",
                formatLabel: function(value) {
                    return this.prefix + value + this.suffix;
                }
            };

            if ( $.type( settings ) === "object" || $.type( settings ) === "undefined" ) {
                $.extend( options, settings );
                slider.element.data("float-options", options );
            } else {
                if ( settings === "destroy" ) {
                    destroy();
                } else if ( settings === "refresh" ) {
                    slider.element.slider( "float", slider.element.data("float-options") );
                }
                return;
            }

            if ( value < min ) {
                value = min;
            }

            if ( value > max ) {
                value = max;
            }

            if ( values && values.length ) {
                for ( i = 0; i < values.length; i++ ) {
                    if ( values[i] < min ) {
                        values[i] = min;
                    }

                    if ( values[i] > max ) {
                        values[i] = max;
                    }
                }
            }

            slider.element
                .addClass("ui-slider-float")
                .find(".ui-slider-tip, .ui-slider-tip-label")
                .remove();

            function destroy() {
                slider.element
                    .off(".sliderFloat")
                    .removeClass("ui-slider-float")
                    .find(".ui-slider-tip, .ui-slider-tip-label")
                    .remove();
            }

            function getPipLabels( values ) {
                var vals = [],
                    steppedVals = $.map( values, function(v) {
                        return Math.ceil(( v - min ) / slider.options.step);
                    });

                if ( $.type( options.labels ) === "array" ) {
                    for ( i = 0; i < values.length; i++ ) {
                        vals[i] = options.labels[ steppedVals[i] ] || values[i];
                    }
                } else if ( $.type( options.labels ) === "object" ) {
                    for ( i = 0; i < values.length; i++ ) {
                        if ( values[i] === min ) {
                            vals[i] = options.labels.first || min;
                        } else if ( values[i] === max ) {
                            vals[i] = options.labels.last || max;
                        } else if ( $.type( options.labels.rest ) === "array" ) {
                            vals[i] = options.labels.rest[ steppedVals[i] - 1 ] || values[i];
                        } else {
                            vals[i] = values[i];
                        }
                    }
                } else {
                    for ( i = 0; i < values.length; i++ ) {
                        vals[i] = values[i];
                    }
                }
                
                return vals;
            }

            if ( options.handle ) {
                tipValues = ( slider.values() && slider.values().length ) ?
                    getPipLabels( values ) :
                    getPipLabels( [ value ] );

                for ( i = 0; i < tipValues.length; i++ ) {
                    $handles
                        .eq( i )
                        .append( $("<span class=\"ui-slider-tip\">"+ options.formatLabel(tipValues[i]) +"</span>") );
                }
            }

            if ( options.pips ) {
                slider.element.find(".ui-slider-label").each(function(k, v) {

                    var $this = $(v),
                        val = [ $this.data("value") ],
                        label,
                        $tip;

                    label = options.formatLabel( getPipLabels( val )[0] );
                    
                    $tip =
                        $("<span class=\"ui-slider-tip-label\">" + label + "</span>")
                            .insertAfter( $this );

                });
            }

            if ( options.event !== "slide" &&
                options.event !== "slidechange" &&
                options.event !== "slide slidechange" &&
                options.event !== "slidechange slide" ) {

                options.event = "slidechange slide";
            }

            slider.element
                .off(".sliderFloat")
                .on( options.event + ".sliderFloat", function( e, ui ) {

                    var uiValue = ( $.type( ui.value ) === "array" ) ? ui.value : [ ui.value ],
                        val = options.formatLabel( getPipLabels( uiValue )[0] );

                    $(ui.handle)
                        .find(".ui-slider-tip")
                        .html( val );

                });
        },
        
        /** 해당 주석 밑 함수들은 인구피라미드 slider 에 맞게 정의,재정의된 함수 */
        
        _mouseStop : function( event ){
        	this.handles.removeClass( "ui-state-active" );
    		this._mouseSliding = false;

    		this._stop( event, this._handleIndex );
    		this._change( event, this._handleIndex );

    		this._handleIndex = null;
    		this._clickOffset = null;
    		this._animateOff = false;

    		//월간통계에서 사용되는 이벤트
    		this.element.trigger("sliderCustomChange", { year : this.options.value } );
    		return false;
        },
        
        _mouseDrag : function( event ){
        	var position = { x: event.pageX, y: event.pageY },
				normValue = this._normValueFromMouse( position );
	
    		this._slide( event, this._handleIndex, normValue );
        },
        
    	_mouseCapture : function( event ){
    		var position, normValue, distance, closestHandle, index, allowed, offset, mouseOverHandle,
			that = this,
			o = this.options;

			if ( o.disabled ) {
				return false;
			}
	
			this.elementSize = {
				width: this.element.outerWidth(),
				height: this.element.outerHeight()
			};
			this.elementOffset = this.element.offset();
	
			position = { x: event.pageX, y: event.pageY };
			normValue = this._normValueFromMouse( position );
			
			if( typeof this.maxValue != "undefined" && ( normValue > this.maxValue || normValue < this.minValue ) ){
	    		return false;
	    	} else {
	    		distance = this._valueMax() - this._valueMin() + 1;
	    		this.handles.each(function( i ) {
	    			var thisDistance = Math.abs( normValue - that.values(i) );
	    			if (( distance > thisDistance ) ||
	    					( distance === thisDistance &&
	    							(i === that._lastChangedValue || that.values(i) === o.min ))) {
	    				distance = thisDistance;
	    				closestHandle = $( this );
	    				index = i;
	    			}
	    		});
	    		
	    		allowed = this._start( event, index );
	    		if ( allowed === false ) {
	    			return false;
	    		}
	    		this._mouseSliding = true;
	    		
	    		this._handleIndex = index;
	    		
	    		closestHandle
	    		.addClass( "ui-state-active" )
	    		.focus();
	    		
	    		offset = closestHandle.offset();
	    		mouseOverHandle = !$( event.target ).parents().addBack().is( ".ui-slider-handle" );
	    		this._clickOffset = mouseOverHandle ? { left: 0, top: 0 } : {
	    			left: event.pageX - offset.left - ( closestHandle.width() / 2 ),
	    			top: event.pageY - offset.top -
	    			( closestHandle.height() / 2 ) -
	    			( parseInt( closestHandle.css("borderTopWidth"), 10 ) || 0 ) -
	    			( parseInt( closestHandle.css("borderBottomWidth"), 10 ) || 0) +
	    			( parseInt( closestHandle.css("marginTop"), 10 ) || 0)
	    		};
	    		
	    		if ( !this.handles.hasClass( "ui-state-hover" ) ) {
	    			this._slide( event, index, normValue );
	    		}
	    		this._animateOff = true;
	    	}
			
			return true;
    	}
    	
    };
	
    $.extend(true, $.ui.slider.prototype, extensionMethods);

})(jQuery);
