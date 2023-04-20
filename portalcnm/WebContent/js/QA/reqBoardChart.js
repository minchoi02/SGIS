/**
 * 
 * @JSName: reqBoardChart.js
 * @Description: 
 * 
 * @author: jrj
 * @date: 2018.02.09
 * @version V1.0
 * 
 */
var lineChart;
var pieChart;

(function(W, D) {
	W.$reqBoardChart = W.$reqBoardChart || {};
	$reqBoardChart.searchParameter = '';
	
	$(document).ready(function() {
		getSearchParameter();
		
		var d = new Date();
		var yyyy = d.getFullYear();
		
		var options = '';
		for( var i=yyyy; i >= (yyyy-4); i-- ){
			options += '<option value="'+i+'">'+i+'</option>';
			$("#searchYear").html( options );
		}
		
		$reqBoardChart.requestChart();
		
		//검색 버튼 클릭
		$("#searchButton").click(function(){
			$reqBoardChart.requestChart();
		});
		
		//목록 버튼 클릭
		$('#listBtn').click(function() {
			location.href = "./../QA/reqBoardList.html?" + $reqBoardChart.searchParameter;
		});
		
	});

	$reqBoardChart = {
		requestChart : function() {
			var obj = new sop.openApi.requestChart.api();
			var searchYear = $("#searchYear").val();
			obj.addParam('searchYear', ( searchYear ? searchYear : '' ));
			
			obj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/QA/ReqBoard/getReqBoardChart.json"
			});
		},
		
		newLineChart : function( data ){
			var chart = new Highcharts.Chart({
				chart : {
					renderTo : 'lineChart',
					type : 'line'
				},
				title : {
					text : '요청 대비 완료 건수'
				},
				xAxis : {
					categories : ['01월','02월','03월','04월','05월','06월','07월','08월','09월','10월','11월','12월']
				},
				yAxis : {
					title : {
						text : '건수'
					},
					min : 0
				},
				plotOptions : {
					line : {
						dataLabels : {
							enabled : true
						},
						enableWouseTracking : false
					}
				},
				series : data
			});
		},
		
		newPieChart : function( data ){
			var chart = new Highcharts.Chart({
				chart : {
					renderTo : 'pieChart',
					type : 'pie'
				},
				title : {
					text : '작업 요청 현황'
				},
				tooltip : {
					pointFormat : '{series.name}: <b>{point.percentage:.1f}%</b>'
				},
				plotOptions : {
					pie : {
						allowPointSelect : true,
						cursor : 'pointer',
						dataLabels : {
							enabled : false
						},
						showInLegend : true
					}
				},
				series : [{
					name : '작업구분',
					colorByPoint : true,
					data : data
				}]
			});
		}
	};
	
	// request board detail
	(function() {
		$class("sop.openApi.requestChart.api").extend(sop.cnm.absAPI).define({
			onSuccess : function(status, res) {
				var result = res.result;
				
				if (res.errCd == "0") {
					if (result != null) {
						var data1 = {};
						var data2 = {};
						
						for( var i=0; i<result.line.length; i++ ){
							var obj = {};
							
							data1[ result.line[i].MM ] = result.line[i].CNT;
							data2[ result.line[i].MM ] = result.line[i].CNT2;
						}
						
						var lineData = [{
							name : '요청',
							data : []
						},{
							name : '완료',
							data : []
						}];
						
						for( var i=0; i<12; i++ ){
							var mm = (i < 10 ? '0'+(i+1) : (i+1));
							lineData[0].data[i] = ( data1[mm] ? data1[mm] : 0 );
							lineData[1].data[i] = ( data2[mm] ? data2[mm] : 0 );
						}
						
						$reqBoardChart.newLineChart( lineData );
						
						var pieData = [];
						for( var i=0; i<result.pie.length; i++ ){
							var obj = {};
							obj.name = result.pie[i].S_CLASS_CD_NM;
							obj.y = result.pie[i].CNT;
							pieData.push( obj );
						}
						
						$reqBoardChart.newPieChart( pieData );
					}

				} else {
					getConfirmPopup('알림', res.errMsg, 'alert');
					
					$('#ok_alertPopup, #close_confirmPopup').click(function() {
						confirmPopupRemove();
					});
					
					$('.maskbg').fadeOut(800);
					$('.maskcontent').fadeOut(800);
				}
			},
			onFail : function(status) {
				getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				
				$('#ok_alertPopup, #close_confirmPopup').click(function() {
					confirmPopupRemove();
				});
				$('.maskbg').fadeOut(800);
				$('.maskcontent').fadeOut(800);
			}
		});
	}());
}(window, document));

function getSearchParameter(){
	var search = location.search;
	var parameter = '';
	
	search = search.split("?");
	var data = search[1].split("&");
	
	for (i = 0; i <= data.length - 1; i++) {
		parameter += "&" + data[i];
	}
	
	$reqBoardChart.searchParameter = parameter.substr(1);
}
