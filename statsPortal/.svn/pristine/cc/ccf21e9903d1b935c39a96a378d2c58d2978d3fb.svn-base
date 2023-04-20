(function(W, D) {
	
	W.$pyramid = W.$pyramid || {};
	
	var date = new Date();
	
	$(document).ready(function() {
		$pyramid.init();
		
		srvLogWrite( "K0", "02", "01", "00", "전국인구추계피라미드", "" ); // jrj 로그 >> 인구피라미드 메인 뷰
		srvLogWrite( "K0", "02", "02", "01", "전국인구추계피라미드", "인구추계:"+$pyramid.strNm+",연도:"+$pyramid.selYear ); //jrj 로그 > 인구성장 가정 - 중위,고위,저위
	});
	
	$pyramid = {
		type : 1,
		selYear : null,
		birYear : 1960,
		
		firstYear : 1960,
		lastYear : 2070,
		
		strType : 'M',
		strNm : '중위',
		
		color1 : '#0080FF',
		color2 : '#FF7f27',
		
		reportData : null,
		
		init : function(){
			this.selYear = date.getFullYear();
			
			$pyramid.ui.sliderSetting();
			$pyramid.changeData( $pyramid.selYear );
			$pyramid.request.pageCountPlus();
		},
		
		drawPyramid : function( result ){
			var categories = new Array();
			var maleData = new Array();
			var maleData2 = new Array();
			var femaleData = new Array();
			    
			var pyramid = result.pyramid;
			var addData = result.addData;
			
			var html = '';
			
			for( var i=0; i<pyramid.length; i++ ){
				categories[i] = pyramid[i].age;
				maleData[i] = parseInt( "-" + pyramid[i].male );
				femaleData[i] = parseInt( pyramid[i].female );
				
				html += '<tr>';
				
				html += '<td>' + categories[i] + '</td>';
				html += '<td>' + appendCommaToNumber( pyramid[i].male ) + '</td>';
				html += '<td>' + appendCommaToNumber( pyramid[i].female ) + '</td>';
				
				html += '</tr>';
			}
			
			$("#boardType1>tbody").html( html );
			
			var selEleNm = $pyramid.selEleNm;
			
			var strNm = "인구 추계 ("+ $pyramid.strNm +")";
			
			$("#barTitle").html( strNm + "<span>" + $("#hiddenTip").val() + "</span>");
			$("#selYear").html( $pyramid.selYear + "<span>년</span>" );
			$(".selYear").html( $pyramid.selYear );
			$("#baseYear").val( $pyramid.selYear );
			$("#selEleNm").html( selEleNm + "<span>" + $("#hiddenTip").val() + "</span>" );
			$("#dataBoardTitle").text( $pyramid.selYear + "연도 " + strNm );
			
    		$pyramid.makeChart( categories, maleData, femaleData, 'pyramid-container' );
    		
    		if( addData && addData[0] ){
    			$("#totAll").text( setComma( addData[0].total) );
    			$("#totMan").text( setComma( addData[0].male) );
    			$("#totWoman").text( setComma( addData[0].female) );
    			$("#sexRatio").text( addData[0].sexratio );
    			$("#avgAge").text( addData[0].avrage );
    		} else {
    			$("#totAll").text("");
    			$("#totMan").text("");
    			$("#totWoman").text("");
    			$("#sexRatio").text("");
    			$("#avgAge").text("");
    		}
 			
		},
		
		changeYear : function( gubun, log_yn ){
			var b = true;
			
			var year = $pyramid.selYear;
			var change = false;
			
			if( gubun == '1' ){
				if( year > $pyramid.firstYear ){
					year = ( Number(year)-1 );
					change = true;
				}
			} else if( gubun == '2' ){
				if( year < $pyramid.lastYear ){
					year = ( Number(year)+1 );
					change = true;
				}
			}
			
			if( change ){
				$pyramid.selYear = year;
				
				if( log_yn ){
					srvLogWrite( "K0", "02", "02", "05", "전국인구추계피라미드", 
							"검색:"+( gubun == '1' ? "이전연도" : "다음연도" )+",인구추계:"+$pyramid.strNm+",연도:"+$pyramid.selYear ); // jrj 로그 > 이전·다음연도 보기
				}
				
				$("#flat-slider").trigger("sliderCustomChange", {
					year : year
				});
			} else {
				alert("조회할 데이터가 없습니다.");
				
				if( $pyramid.sliderPlay ){
					$pyramid.ui.playSlider( null, '0' );
				}
				
				b = false;
			}
			
			return b;
		},
		
		changeData : function( selYear ){
			apiLogWrite2("D4", 'D41',"전국인구추계피라미드",selYear,"00","없음");
			
			$pyramid.request.getPyramidData( $pyramid.strType, selYear, $pyramid.birYear );
		}
	};
	
	$pyramid.ui = {
		reportPopup : null,
		
		sliderSetting : function(){
			$("#flat-slider").slider({
				min : $pyramid.firstYear,
		        max : $pyramid.lastYear,
		        value : $pyramid.selYear,
		        range : false,
		        step : 1
			 }).slider("pips", {
				step : 15,
				handle : true,
				prefix : "",
				suffix : ""
			});
			
			$("span [data-value='2065']").css("display", "none").hide();
			
			$("#flat-slider").on("sliderCustomChange", function( e, options ){
				$pyramid.selYear = options.year;
				$pyramid.changeData( $pyramid.selYear );
			});
		},
		
		//슬라이더 자동재생, 정지
		playSlider : function( target,playGubun ){
			if( playGubun == '0' ){
				clearInterval( $pyramid.playTimer );
				$pyramid.sliderPlay = false;
				
				$(".changebtn").prop("disabled", "");
				$(".changebtn").each(function(){
					$( this ).prop("title", $( this ).data("title") );
				});
			} else {
				if( !$pyramid.sliderPlay ){
					var b = $pyramid.changeYear( playGubun );
					
					if( b ){
						if( playGubun == '1' ){
							srvLogWrite( "K0", "02", "02", "07", "전국인구추계피라미드", "검색:자동 역재생,인구추계:"+$pyramid.strNm+"연도:"+$pyramid.selYear ); //jrj 로그 > 자동 역재생 보기
						} else if( playGubun == '2' ){
							srvLogWrite( "K0", "02", "02", "06", "전국인구추계피라미드", "검색:자동 재생,인구추계:"+$pyramid.strNm+"연도:"+$pyramid.selYear ); //jrj 로그 > 자동 재생 보기
						}
						
						$(".changebtn").prop("title", "자동재생을 정지한 후 클릭하시기 바랍니다.");
						$(".changebtn").prop("disabled", "disabled");
						
						$pyramid.playTimer = setInterval(function(){
							$pyramid.changeYear( playGubun );
						},1000);
						
						$pyramid.sliderPlay = true;
					}
				}
			}
		},
		
       reportLoad : function(){
    	   var popup = $pyramid.ui.reportPopup.$reportForm.ui;
			popup.delegate = $pyramid.ui;
			
			srvLogWrite( "K0", "02", "04", "00", "전국인구추계피라미드", "인구추계:"+$pyramid.strNm+",연도:"+$pyramid.selYear ); //jrj 로그 > 보고서 보기
			
			function getChartSvgData( id ){
				var tmpChart = $(id).highcharts();
				if(tmpChart){
					var doc = document.querySelector(id);
					var svg = doc.querySelector("svg");
					
					$(svg).find('.highcharts-title').css("display","none").hide();
					var xml  = new XMLSerializer().serializeToString(svg);
					$(svg).find('.highcharts-title').css("display","").show();
					
		            var canvas = document.createElement("canvas");
		            canvg(canvas, xml);
		            return canvas.toDataURL();
				}
			}
				
			popup.setTitle( "전국 인구 추계 피라미드", $pyramid.selYear, $pyramid.strType );
			popup.setChart( getChartSvgData( "#pyramid-container" ), "#reportChartDiv1" );
			popup.setTable( "#reportTableDiv1", $("#boardType1>thead").html(), $("#boardType1>tbody").html() );
       }
       
	};
	
	$pyramid.request = {
		getPyramidData : function( strType, years, birYear ){
//			$pyramid.LodingPopup.show();
			
			//gubun > "pyramid", "ratio", "addData"
        	jQuery.ajax({
    	 		type:"POST",
    	 		url: "/ServiceAPI/pyramid/pyramid.json",
    	 		data:{
    	 			years : years,
    	 			strType :strType,
    	 			birYear : birYear
    	 		},
    	 		success:function(data){
    				$("#flat-slider").slider("value", $pyramid.selYear);
    				$pyramid.drawPyramid( data.result );
    				setTimeout(function(){
//						$pyramid.LodingPopup.close();
					},800);
    	 		},
    	 		error:function(data) {
    	 			setTimeout(function(){
//    	 				$pyramid.LodingPopup.close();
					},800);
    	 		}
    		});
		},
		
		pageCountPlus : function(){
        	jQuery.ajax({
        		type:"POST",
        		url: "/ServiceAPI/common/pageCallReg.json",
        		data:{
        			hpage : "/jsp/pyramid/pyramid1.jsp"
        		},
        		success:function(data){
        				
        		},
        		error:function(data) {

        		}
        	});
        }
	};
	
	$pyramid.LodingPopup = {
		show : function () {
			if( this.blockUI ){
				this.close();
			}
			this.blockUI = document.createElement("DIV");
			this.blockUI.style.backgroundColor = "#D3D3D3";
			this.blockUI.style.border = "0px solid black";
			this.blockUI.style.position = "absolute";
			this.blockUI.style.left = '0px';
			this.blockUI.style.top = '0px';
			if (window.innerHeight == undefined) {
				this.blockUI.style.height = document.documentElement.clientHeight + 'px';
				this.blockUI.style.width = document.documentElement.clientWidth + 'px';
			}
			else {
				this.blockUI.style.height = window.innerHeight + 'px';
				this.blockUI.style.width = window.innerWidth + 'px';
			}
			this.blockUI.style.zIndex = "10000";
			this.blockUI.style.filter = "alpha(opacity=60);";
			this.blockUI.style.MozOpacity = 0.6;
			this.blockUI.style.opacity = 0.6;
			this.blockUI.style.KhtmlOpacity = 0.6;
			document.body.appendChild(this.blockUI);
			
			this.popupUI = document.createElement("DIV");
			this.popupUI.style.position = "absolute";
            this.popupUI.style.height = '10px';
            this.popupUI.style.lineHeight = '50px';
            this.popupUI.style.paddingBottom='40px';
            this.popupUI.style.width ='400px';
            this.popupUI.style.top ='50%';
            this.popupUI.style.left = '50%';
            this.popupUI.style.zIndex = "11000";

			var errorMsg = "<img src='/img/common/loding_type01.gif'/>";
			this.popupUI.innerHTML = errorMsg;
			
			document.body.appendChild(this.popupUI);
		},
		close : function () {
			if (!(typeof this.blockUI === 'undefined')) {
				document.body.removeChild(this.blockUI);
				delete this.blockUI;
			}
			if (!(typeof this.popupUI === 'undefined')) {
				D.body.removeChild(this.popupUI);
				delete this.popupUI;
			}
		}
	};
	
	$pyramid.makeChart = function( categories, maleData, femaleData, id ){
		var maxAxis = Math.max.apply(null,maleData);
		var maxAxis2 = Math.max.apply(null,femaleData);
		var minAxis = Math.min.apply(null,maleData);
		var minAxis2 = Math.min.apply(null,femaleData);
		
		var height = 490;
		
		if ( (/Netscape/.test(navigator.appName) && /Trident/.test(navigator.userAgent)) || ( /MSIE/.test(navigator.userAgent) ) ){
			height = ( height - 5 );
		}
		
		if( categories.length <= 80 ){
			categories.unshift('79세');
			maleData.unshift(0);
			femaleData.unshift(0);
		}
		
		var chart = 
		{
			chart: {
				type: 'bar',
				width : 690,
				height : height,
				spacing : [20,0,0,0]
			},
			title: { text: '' },
			subtitle: { text: '' },
			xAxis: [{
				categories: categories,
				tickInterval : 10,
				reversed: true,
				labels: {
					step: 1
				}
			}, {
				linkedTo : 0,
				opposite: true,
				reversed: true,
				categories: categories,
				tickInterval : 10,
				linkedTo: 0,
				labels: {
					step: 1
				}
			}],
			yAxis: {
				tickPositioner : function(){
					var positions = [];
					if( ( ( maxAxis || maxAxis2 ) > 600000 ) || ( ( Math.abs(minAxis) || Math.abs(minAxis2) ) > 600000 ) ){
						positions = [ -600000, -400000, -200000, 0, 200000, 400000, 600000 ];
					} else {
						positions = [ -500000, -250000, 0, 250000, 500000 ];
					}
					return positions;
				},
				title: { text: null	},
				labels: {
					formatter: function() {
						return (Math.abs(this.value) / 10000) + '만명';
					},
					rotation : 0
				}
			},
			tooltip : {
				enabled : true,
				formatter: function( a,b,c ) {
					if( this.series.xData.length < 101 && this.point.index <= 0 ){
						return false;
					} else {
						return '<b>' + this.series.name + ', ' + this.point.category +'</b><br/>' +
						'인구수: ' + appendCommaToNumber(Math.abs(this.point.y));
					}
				}
			},
			plotOptions: {
				series: {
					stacking: 'normal',
					animation : false,
					borderWidth : 0,
//					pointWidth : 2,
					minPointLength : 0,
					states : {
						hover : {
							brightness : 0.3
						}
					}
				},
				point : {
					events :{
						mouseOver : function( e ){
//							console.log('over');
						},
						
						mouseOut : function( e ){
							console.log('out');
						}
					}
				}
			},
			series: [{
				name: '남자',
				color: $pyramid.color1,
				data: maleData,
				shadow : {
					color : $pyramid.color1,
					width : 2,
					opacity : 0.8
				}
			}, {
				name: '여자',
				color: $pyramid.color2,
				data: femaleData,
				shadow : {
					color : $pyramid.color2,
					width : 2,
					opacity : 0.8
				}
			}]
		};
		
		$('#'+id).highcharts( chart );
	}
	
}(window, document));


function setComma( data ){
	if( data ){
		return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	} else {
		return '';
	}
}

