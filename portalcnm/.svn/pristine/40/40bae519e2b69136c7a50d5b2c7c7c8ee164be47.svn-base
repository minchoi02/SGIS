/**   
 *
 * @JSName: interactiveMapStatUse.js
 * @Description: 
 *
 * @author: LeeKH   
 * @date: 2016/04/26/ 10:30:00    
 * @version V1.0      
 *    
 */


$(function () {
	//init();
	
	
	srvLogWrite("L0", "01", "03", "08", "", "");
	
	 $("#searchBtn").on('click',(function(e){
		 srvLogWrite("L0", "01", "03", "08", "", "");
		 getStatGalleryUse();
		
  	  }));
	 $("#GalleryUseStatExcel").on('click',(function(e){
		 $("#htmlStr").val($("#charts2").html()); 
		 $("#excelDownForm").submit();
  	  })); 
});

function init(){
	nowYearMonth();
	getStatGalleryUse();
}

function getStatGalleryUse(){
	var year = $("#yearSel").val();
	var month = $("#monthSel").val();
	
	//메뉴 조회
	jQuery.ajax({
		type:"POST",
		url: "/s-portalcnm/ServiceAPI/MN/UseCurrentState/useCurrentState.json",
		dataType:'json', 
		data:{
			"gubun" 				: "getGalleryUseStat",
			"year"					:	year	,
			"month"					:	month	,
		},
		success:function(data){
			var swt = true;
 			$("#chart2Body tr").each(function(){
 				if(swt){
 					swt = false;
 				}else{
 					$(this).remove();
 				}
 			});
 			
 			// 차트 관련 
 			var Gallery_total = 0;
 			var EXCLNC_total = 0;
 			var Graph_total = new Array();
 			var Gallery_nm = new Array();
 			var Gallery_cnt = new Array();
 			var tempChartDate = [];
			var str = "";
			str += "<tr>";
			
			str += "<th colspan='2'>분류</th>";
			str += "<th>갤러리 수</th>";
			str += "<th>우수사례 수</th>";
			str += "</tr>";
			
			for(var i=0; i<data.result.getGalleryUseStat.length; i++){
				var rnum = data.result.getGalleryUseStat[i].RNUM;
				var SUPPORT_TYPE = data.result.getGalleryUseStat[i].SUPPORT_TYPE;
				var CNT = data.result.getGalleryUseStat[i].CNT;
				var CNT2 = data.result.getGalleryUseStat[i].CNT2;
				
				Graph_total[i] = CNT;
				Gallery_nm[i] = SUPPORT_TYPE;
				Gallery_cnt[i] = CNT;
				
				Gallery_total += CNT;
				EXCLNC_total += CNT2;
				
				if(rnum == "1") {
					str += "<tr class='printCSS'>";
 				} else {
 					str += "<tr>";
 				}
				
 				str += "<td style=\"text-align:center;\">" + appendCommaToNumber(rnum)+ "</td>";
 				str += "<td style=\"text-align:left;\">" +(SUPPORT_TYPE)+ "</td>";
 				str += "<td style=\"text-align:right;\">" + appendCommaToNumber(CNT)+ "</td>";
 				str += "<td style=\"text-align:right;\">" + appendCommaToNumber(CNT2)+ "</td>";
			    str += "</tr>";
			    
			    tempChartDate.push([Gallery_nm[i], Graph_total[i]]);
			}
			
			if(data.result.getGalleryUseStat.length > 0) {
				str += "</tr>";
				str += "<td colspan='2' style=\"text-align:center;\">합계</td>";
				str += "<td style=\"text-align:right;\">" + Gallery_total + "</td>";
				str += "<td style=\"text-align:right;\">" + EXCLNC_total + "</td>";
				str += "</tr>";
			} else {
				str += "</tr>";
				str += "<td colspan='4' style=\"text-align:center;\">검색 결과가 없습니다</td>";
				str += "</tr>";
			}
			
			jQuery("#chart2Body").html(str);
			
			    // Create the chart
			    $('#openAPIPie').highcharts({
			        chart: {
			            type: 'pie'
			        },
			        title: {
			            text: ''
			        },
			        legend: {
			            align: 'right',
			            verticalAlign: 'top',
			            layout: 'vertical',
			            x: 0,
			            y: 300
			        },
			        
			        plotOptions: {
			            series: {
			            	dataLabels: {
			                    enabled: true,
			                    formatter: function() {
			                        return Math.round(this.y)+'건';
			                    },
			                    distance: -30,
			                    color:'white'
			                },
			            showInLegend: true ,
			            point: {
			                events: {
			                    legendItemClick: function () {
			                        return false; // <== returning false will cancel the default action
			                    }
			                }
			            }
			         
			            }
			        },

			        tooltip: {
			            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
			            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.percentage:.1f}%</b><br/>'
			        },
			        series: [{
			            name: '분류별 이용현황',
			            colorByPoint: true,
			            data: tempChartDate
			        }],
			    });
		},beforeSend:function(){
  	        $('.wrap-loading').removeClass('display-none');
  	    },complete:function(){
  	        $('.wrap-loading').addClass('display-none');
  	    },error:function(data) {
 			/*alert("ajaxFail");
 			alert(data);*/
 		}
	});
}

