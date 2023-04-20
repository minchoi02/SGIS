(function(W, D) {
	
	W.$pyramid = W.$pyramid || {};
	
	var date = new Date();
	
	$(document).ready(function() {
		$(".normalBox").mCustomScrollbar({axis:"xy",advanced: { autoExpandHorizontalScroll: true }});
		var html = '';
		
		for( var i=101; i>0; i-- ){
			html += '<tr id="tr'+ (i-1) +'">';
			html += '<td>' + ( i == 101 ? "100세 이상" : (i-1)+"세" ) + '</td>';
			html += '<td></td><td></td><td></td><td></td><td class="db3"></td><td class="db3"></td>';
			html += '</tr>';
		}
		
		$("#boardType3>tbody").html( html );
		
		$pyramid.init();
		
		srvLogWrite( "K0", "02", "01", "00", "연도별인구추계피라미드", "" ); // jrj 로그 >> 인구피라미드 메인 뷰
		
		
		$("#disp3").on("click",function(){
			$pyramid.ui.tableDisplay();
			
			if( !$("#disp3").prop("checked") ){
				$("#area3").css("display","none");
				$("#box1,#box2").closest("li").css("width","48%");
				
				var c1 = $('#box1').highcharts();
				c1.setSize(500,320);
				
				var c2 = $('#box2').highcharts();
				c2.setSize(500,320);
				
				$("#area1,#area2").find(".item-text2").css("margin-left","80px");
				$(".db3").css("display","none");
			} else {
				$("#area3").css("display","");
				$("#box1,#box2").closest("li").css("width","32.3%");
				
				var c1 = $('#box1').highcharts();
				c1.setSize(340,320);
				
				var c2 = $('#box2').highcharts();
				c2.setSize(340,320);
				
				$("#area1,#area2").find(".item-text2").css("margin-left","0px");
				$(".db3").css("display","");
			}
		});
	});
	
	$pyramid = {
		type : 3,
		
		selYear : null,
		
		selYear1 : null,
		selYear2 : null,
		selYear3 : null,
		
		birYear : 1960,
		
		firstYear : 1960,
		lastYear : 2070,
		
		strType : 'M',
		strNm : '중위',
		
		color1 : '#0080FF',
		color2 : '#FF7f27',
		
		lenList : new Array(3),
		chartList : new Array(3),
		
		init : function(){
			var curYear = date.getFullYear();
			this.selYear = curYear;
			
			this.selYear1 = ( curYear - 5 );
			this.selYear2 = ( curYear - 3 );
			this.selYear3 = curYear;
			
			this.reloadPyramid( '0' );
			
			$pyramid.request.pageCountPlus();
		},
		
		reloadPyramid : function( id ){
			if( id == '0'){
				$pyramid.request.getPyramidData( this.selYear1, '1' );
				$pyramid.request.getPyramidData( this.selYear2, '2' );
				$pyramid.request.getPyramidData( this.selYear3, '3' );
			} else {
				$pyramid.request.getPyramidData( $pyramid["selYear"+id]+"", id );
				$(".yearnm"+id).html( $pyramid["selYear"+id] + '년' );
			}
		},
		
		setYears : function(){
			$(".yearnm1").html( $pyramid.selYear1 + '년' );
			$(".yearnm2").html( $pyramid.selYear2 + '년' );
			$(".yearnm3").html( $pyramid.selYear3 + '년' );
			
			$("#yearSel1 option[value='"+ $pyramid.selYear1 +"']").prop("selected", "selected");
			$("#yearSel2 option[value='"+ $pyramid.selYear2 +"']").prop("selected", "selected");
			$("#yearSel3 option[value='"+ $pyramid.selYear3 +"']").prop("selected", "selected");
		},
		
		drawPyramid : function( result, id ){
			var categories = new Array();
			var maleData = new Array();
			var maleData2 = new Array();
			var femaleData = new Array();
			    
			var pyramid = result.pyramid;
			var addData = result.addData;
			
			$pyramid.lenList[ id-1 ] = pyramid.length;
			
			var html = '';
			
			var tdNum = 1;
			if( id == '2' ){
				tdNum = 3;
			} else if( id == '3' ){
				tdNum = 5;
			}
			
			$pyramid.ui.tableDisplay();
			
			if( pyramid.length < 101 ){
				for( var i=pyramid.length; i<101; i++ ){
					$("#tr"+i).find("td").eq(tdNum).text("-");
					$("#tr"+i).find("td").eq(tdNum+1).text("-");
				}
			}
			for( var i=0; i<pyramid.length; i++ ){
				categories[i] = pyramid[i].age;
				maleData[i] = parseInt( "-" + pyramid[i].male );
				femaleData[i] = parseInt( pyramid[i].female );
				
				var ageNum = categories[i].replace(/[^0-9]/g,'');
				
				$("#tr"+ageNum).find("td").eq(tdNum).text( appendCommaToNumber( pyramid[i].male ) );
				$("#tr"+ageNum).find("td").eq(tdNum+1).text( appendCommaToNumber( pyramid[i].female ) );
			}
			
			var selEleNm = $pyramid.selEleNm;
			var strNm = "인구 추계 ("+ $pyramid.strNm +")";
			
			$("#barTitle").html( strNm + "<span>" + $("#hiddenTip").val() + "</span>");
			$("#selYear").html( $pyramid.selYear + "<span>년</span>" );
			$(".selYear").html( $pyramid.selYear );
			$("#baseYear").val( $pyramid.selYear );
			$("#selEleNm").html( selEleNm + "<span>" + $("#hiddenTip").val() + "</span>" );
			$("#dataBoardTitle").text( $pyramid.selYear + "연도 " + strNm );
			
    		$pyramid.makeChart( categories, maleData, femaleData, id );
    		
    		if( addData && addData[0] ){
    			$("#area"+id).find(".totAll").text( setComma( addData[0].total) );
    			$("#area"+id).find(".totMan").text( setComma( addData[0].male) );
    			$("#area"+id).find(".totWoman").text( setComma( addData[0].female) );
    			$("#area"+id).find(".sexRatio").text( addData[0].sexratio );
    			$("#area"+id).find(".avgAge").text( addData[0].avrage );
    		} else {
    			$("#area"+id).find(".totAll").text("");
    			$("#area"+id).find(".totMan").text("");
    			$("#area"+id).find(".totWoman").text("");
    			$("#area"+id).find(".sexRatio").text("");
    			$("#area"+id).find(".avgAge").text("");
    		}
 			
		}
	};
	
	$pyramid.ui = {
			tableDisplay : function(){
				var maxLen = 0;
				
				if( $pyramid.lenList ){
					for( var i=0; i<$pyramid.lenList.length - ( $("#disp3").prop("checked") ? 0 : 1 ); i++ ){
						maxLen = ( maxLen < $pyramid.lenList[i] ? $pyramid.lenList[i] : maxLen );
					}
				}
				
				var trLen = $("#boardType3>tbody>tr:visible").length;
				
				if( maxLen > 0 && maxLen < trLen ){
					for( var i=maxLen; i<trLen; i++ ){
						$("#tr"+i).css("display","none");
					}
				} else {
					for( var i=trLen; i<maxLen; i++ ){
						$("#tr"+i).css("display","");
					}
				}
			},
			reportLoad : function(){
				var popup = $pyramid.ui.reportPopup.$reportForm.ui;
				popup.delegate = $pyramid.ui;
				
				var yearNms = "연도:"+$("#yearSel1 option:selected").text()+"/"+$("#yearSel2 option:selected").text()+"/"+$("#yearSel3 option:selected").text();
				srvLogWrite( "K0", "02", "04", "00", "연도별인구추계피라미드", yearNms+",연도:"+$pyramid.selYear ); //jrj 로그 > 보고서 보기
				
				var width = 250;
				var height = 230;
				if( !$("#disp3").prop("checked") ){
					width = 375;
					height = 288;
				}
				
				function getChartSvgData( id ){
					var tmpChart = $(id).highcharts();
					if(tmpChart){
						var svgHtml = tmpChart.getSVG({
							chart : {
								width : width,
								height : height
							}
						});
						var svg = $( svgHtml )[0];
						
//						$(svg).find(".highcharts-series").eq(0).find('rect').attr("stroke", "#7dacd2").attr("width", 18);
//						$(svg).find(".highcharts-series").eq(1).find('rect').attr("stroke", "#f07664").attr("width", 18);
						
						$(svg).find('.highcharts-title').css("display","none").hide();
						var xml  = new XMLSerializer().serializeToString(svg);
						$(svg).find('.highcharts-title').css("display","").show();
						
						var canvas = document.createElement("canvas");
						canvg(canvas, xml);
						return canvas.toDataURL();
					}
				}
			
				var item = "";
				for( var i=1; i<=3-($("#disp3").prop("checked") ? 0 : 1); i++ ){
					var yearnm = $(".yearnm"+i).eq(0).text();
					item += ( (i==1) ? yearnm : ", " + yearnm );
					popup.setChart( getChartSvgData( "#box"+i ), "#pyramid3ChartDiv"+i, yearnm );
				}
				popup.setTitle( "연도별 인구 추계 피라미드", $pyramid.selYear, item );
				popup.setTable( "#reportTableDiv3", $("#boardType3>thead").html(), $("#boardType3>tbody").html() );
			}
	};
	
	$pyramid.request = {
		getPyramidData : function( years, id ){
        	jQuery.ajax({
    	 		type:"POST",
    	 		url: "/ServiceAPI/pyramid/pyramid.json",
    	 		data:{
    	 			years : years,
    	 			strType :$pyramid.strType,
    	 			birYear : $pyramid.birYear
    	 		},
    	 		success:function(data){
    				$pyramid.drawPyramid( data.result, id );
    				setTimeout(function(){
					},800);
    	 		},
    	 		error:function(data) {
    	 			setTimeout(function(){
					},800);
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
	
	$pyramid.makeChart = function( categories, maleData, femaleData, id ){
		var maxAxis = Math.max.apply(null,maleData);
		var maxAxis2 = Math.max.apply(null,femaleData);
		var minAxis = Math.min.apply(null,maleData);
		var minAxis2 = Math.min.apply(null,femaleData);
		
		var height = 320;
		
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
				width : ( $("#disp3").prop("checked") ? 340 : 500 ),
				height : height,
				spacing : [20,0,0,0]
			},
			exporting : {
				buttons : { 
					contextButton :{ enabled : false }
				}
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
		
		$('#box'+id).highcharts( chart );
	}
	
}(window, document));


function setComma( data ){
	if( data ){
		return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	} else {
		return '';
	}
}

