(function(W, D) {
	
	W.$pyramid = W.$pyramid || {};
	
	var date = new Date();
	
	$(document).ready(function() {
		$pyramid.init();
		
		srvLogWrite( "K0", "02", "01", "00", "시도인구추계피라미드", "" ); // jrj 로그 >> 인구피라미드 메인 뷰
	});
	
	$pyramid = {
		type : 2,
		selYear : null,
		
		code1 : '0',
		code2 : '11',
		code3 : '25',
		
		firstYear : 1970,
		lastYear : 2047,
		
		sliderPlay : false,
		
		init : function(){
			this.selYear = date.getFullYear();
			
			$pyramid.ui.sliderSetting();
			$pyramid.request.getSidoData(function(data){
				var html = '<option value="0">전국</option>';
				for(var i=0; i<data.result.length; i++){
					html += '<option value="'+ data.result[i].region_code+'">'+ data.result[i].region +'</option>';
				}
				$(".area_select").html( html );
				
				for( var i=1;i<=3;i++ ){
					$("#areaSel"+i+" option[value='"+$pyramid['code'+i]+"']").attr("selected", "selected");
					$(".areanm"+i).text( $("#areaSel"+i+" option:selected").text() );
				}
				
				$pyramid.changeData( $pyramid.selYear );
			});
			$pyramid.request.pageCountPlus();
		},
		
		drawPyramid : function( result ){
			if( result ){
				var html = '';
				
				var categories = new Array();
				
				var maleData1 = new Array();
				var femaleData1 = new Array();
				
				var maleData2 = new Array();
				var femaleData2 = new Array();
				
				var maleData3 = new Array();
				var femaleData3 = new Array();
				
				$("#barTitle").html( $pyramid.selYear + "연도 시도 인구 추계 피라미드");
				$("#selYear").html( $pyramid.selYear + "<span>년</span>" );
				$("#comparisonYear").val( $pyramid.selYear );
				$("#dataBoardTitle").text( $pyramid.selYear +"연도 시도 인구 추계 피라미드-인구분포" )
				
				for( var i=0; i<result[0].length; i++ ){
					var item1 = result[0];
					var item2 = result[1];
					var item3 = result[2];
					
					categories[i] = item1[i].ages;
					
					maleData1[i] = parseInt( "-" + item1[i].male );
					femaleData1[i] = parseInt( item1[i].female );
					maleData2[i] = parseInt( "-" + item2[i].male );
					femaleData2[i] = parseInt( item2[i].female );
					maleData3[i] = parseInt( "-" + item3[i].male );
					femaleData3[i] = parseInt( item3[i].female );
					
					html += '<tr>';
					
					html += '<td>' + item1[i].ages + '</td>';
					html += '<td>' + appendCommaToNumber( item1[i].male ) + '</td>';
					html += '<td>' + appendCommaToNumber( item1[i].female ) + '</td>';
					html += '<td>' + appendCommaToNumber( item2[i].male ) + '</td>';
					html += '<td>' + appendCommaToNumber( item2[i].female ) + '</td>';
					html += '<td>' + appendCommaToNumber( item3[i].male ) + '</td>';
					html += '<td>' + appendCommaToNumber( item3[i].female ) + '</td>';
					
					html += '</tr>';
				}
				
				$pyramid.makeChart( categories, maleData1, femaleData1, 'box1', 15 );
				$pyramid.makeChart( categories, maleData2, femaleData2, 'box2', 15 );
				$pyramid.makeChart( categories, maleData3, femaleData3, 'box3', 15 );
			}
			
			$("#boardType2>tbody").html( html );
			
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
					srvLogWrite( "K0", "02", "03", "03", "시도인구추계피라미드", "검색:"+( gubun == '1' ? "이전연도" : "다음연도" )+
							",지역:"+$("#areaSel1 option:selected").text()+"/"+$("#areaSel2 option:selected").text()+"/"+$("#areaSel3 option:selected").text()+",연도:"+$pyramid.selYear ); // jrj 로그 > 이전·다음연도 보기
				}
				
				$("#flat-slider").trigger("sliderCustomChange", {
					year : year
				});
				
				$("#comparisonYear").val( year );
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
			var txt = $("#areaSel1 option:selected").text() + "," + $("#areaSel2 option:selected").text() + "," + $("#areaSel3 option:selected").text();
			apiLogWrite2("D4", 'D42',"시도인구추계피라미드-"+ txt, selYear, "00", "없음");
			
			$pyramid.request.getPyramidData( selYear );
		}
	};
	
	$pyramid.ui = {
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
			
			$("span [data-value='2045']").css("display", "none").hide();
			
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
							srvLogWrite( "K0", "02", "03", "05", "시도인구추계피라미드", "검색:자동 역재생"+
									",지역:"+$("#areaSel1 option:selected").text()+"/"+$("#areaSel2 option:selected").text()+"/"+$("#areaSel3 option:selected").text()+",연도:"+$pyramid.selYear ); //jrj 로그 > 자동 역재생 보기
						} else if( playGubun == '2' ){
							srvLogWrite( "K0", "02", "03", "04", "시도인구추계피라미드", "검색:자동 재생"+
									",지역:"+$("#areaSel1 option:selected").text()+"/"+$("#areaSel2 option:selected").text()+"/"+$("#areaSel3 option:selected").text()+",연도:"+$pyramid.selYear ); //jrj 로그 > 자동 재생 보기
						}
						
						$(".changebtn").prop("title", "자동재생을 정지한 후 클릭하시기 바랍니다.");
						$(".changebtn").prop("disabled", "disabled");
						
						$pyramid.playTimer = setInterval(function(){
							$pyramid.changeYear( playGubun );
						},3000);
						
						$pyramid.sliderPlay = true;
					}
					
				}
			}
		},
		
       reportLoad : function(){
    	   var popup = $pyramid.ui.reportPopup.$reportForm.ui;
			popup.delegate = $pyramid.ui;
			
			var areaNms = "지역:"+$("#areaSel1 option:selected").text()+"/"+$("#areaSel2 option:selected").text()+"/"+$("#areaSel3 option:selected").text();
			srvLogWrite( "K0", "02", "04", "00", "시도인구추계피라미드", areaNms+",연도:"+$pyramid.selYear ); //jrj 로그 > 보고서 보기
			
			function getChartSvgData( id ){
				var tmpChart = $(id).highcharts();
				if(tmpChart){
					var svgHtml = tmpChart.getSVG({
	    				chart : {
	    					width : 500,
	    					height : 350
	    				}
	    			});
					var svg = $( svgHtml )[0];
					
					$(svg).find(".highcharts-series").eq(0).find('rect').attr("stroke", "#7dacd2").attr("width", 18);
					$(svg).find(".highcharts-series").eq(1).find('rect').attr("stroke", "#f07664").attr("width", 18);
					
					$(svg).find('.highcharts-title').css("display","none").hide();
					var xml  = new XMLSerializer().serializeToString(svg);
					$(svg).find('.highcharts-title').css("display","").show();
					
		            var canvas = document.createElement("canvas");
		            canvg(canvas, xml);
		            return canvas.toDataURL();
				}
			}
			
			var item = "";
			for( var i=1; i<=3; i++ ){
				var areanm = $(".areanm"+i).eq(0).text();
				item += ( (i==1) ? areanm : ", " + areanm );
				popup.setChart( getChartSvgData( "#box"+i ), "#reportChartDiv"+i, areanm );
			}
			popup.setTitle( "시도 인구 추계 피라미드", $pyramid.selYear, item );
			popup.setTable( "#reportTableDiv2", $("#boardType2>thead").html(), $("#boardType2>tbody").html() );
       }
	};
	
	$pyramid.request = {
		getPyramidData : function( years ){
			jQuery.ajax({
        		type:"POST",
        		url: "/ServiceAPI/pyramid/pyramid2.json",
    	 		data:{ 
    	 			"years" : years+'',
	  	 			"strType":"M",
	  	 			"code1" : $("#areaSel1").val(),
	  	 			"code2" : $("#areaSel2").val(),
	  	 			"code3" : $("#areaSel3").val(),
		 			"gubun" : "pyramid",
    	 		},
        		success:function(data){
        			$("#flat-slider").slider("value", $pyramid.selYear);
        			$pyramid.drawPyramid( data.result );
//        			$pyramid.LodingPopup.close();
        		},
        		error:function(data) {
//        			$pyramid.LodingPopup.close();
        		}
        	});
		},
		
		getSidoData : function( callBack ){
			jQuery.ajax({
        		type:"POST",
        		url: "/ServiceAPI/pyramid/pyramidSidoData.json",
        		success:function(data){
        			callBack( data );
        		},
        		error:function(data) {
        		}
        	});
		},
		
		pageCountPlus : function(){
        	jQuery.ajax({
        		type:"POST",
        		url: "/ServiceAPI/common/pageCallReg.json",
        		data:{
        			hpage : "/jsp/pyramid/pyramid2.jsp"
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
	
	$pyramid.makeChart = function( categories, maleData, femaleData, id, strokeWidth ){
		var chart = 
		{
			chart: {
				type: 'bar',
				width : 335,
				spacing : [0,0,0,0]
			},
			title: { text: '' },
			subtitle: { text: '' },
			exporting : {
				enabled : false
			},
			drilldown : {
				animation : false
			},
			xAxis: [{
				opposite : false,
				categories: categories,
				minTickInterval : 1,
				reversed: true,
				labels: {
					step: 1
				}
			}, {
				opposite: true,
				reversed: true,
				categories: categories,
				minTickInterval : 1,
				linkedTo: 1,
				labels: {
					step: 1
				}
			}],
			yAxis: {
				title: { text: null	},
				labels: {
					formatter: function() {
						return (Math.abs(this.value) / 10000);//+ '만명';
					},
					rotation : 0
				}
			},
			plotOptions: {
				series: {
					stacking: 'normal',
					animation : false,
					pointWidth : 10,
					borderWidth : 0,
					states : {
						hover : {
							brightness : 0.3
						}
					}
				},
				bar : {
					animation : false
				}
			},
			tooltip: {
				formatter: function( a,b,c ) {
					return '<b>' + this.series.name + ', ' + this.point.category +'</b><br/>' +
					'인구수: ' + appendCommaToNumber(Math.abs(this.point.y));
				}
			},
			series: [{
				name: '남자',
				color:'#0080FF',
				data: maleData,
				shadow : {
					color : '#0080FF',
					width : 4,
					opacity : 0.4
				}
			}, {
				name: '여자',
				color:'#FF7f27',
				data: femaleData,
				shadow : {
					color : '#FF7f27',
					width : 4,
					opacity : 0.4
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

