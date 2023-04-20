(function(W,D){
	W.$analysisSts = W.$analysisSts || {};
	$(document).ready(function(){

		$analysisSts.ui.getDataLst();
		$analysisSts.event.setUIEvent();	

		$log.srvLogWrite("Z1", "01", "09", "01", "", "");
	});
	
	$analysisSts.ui = {
			csv : '',
			myChart : null,
			getDataLst : function(){
				var startDate = $("#startDate").val();
				var endDate = $("#endDate").val();
				if (endDate == "") {
					endDate = $analysisSts.ui.nowDate();
					$("#endDate").val(endDate);
				}
				if (startDate == "") {
					var today = new Date();
					today.setYear(today.getFullYear() - 1);

					startDate = $analysisSts.ui.dateFormat(today);	
					$("#startDate").val(startDate);
				}
				
				var options = {
						params : {
							startDate:startDate,
							endDate:endDate,
							instSeq:$("#instSeq").val()
						}
				};
				$analysisSts.request.getDataLst(options);
			},
			
			nowDate : function() {
				var today = new Date();
				return $analysisSts.ui.dateFormat(today);	
			},
			
			dateFormat : function(today) {
				var dd = today.getDate();
				var mm = today.getMonth()+1; 
				var yyyy = today.getFullYear();

				if(dd<10) {
				    dd="0"+dd
				} 

				if(mm<10) {
				    mm="0"+mm
				} 

				return yyyy + "-" + mm+"-"+dd;
			},
			
			downloadCsv : function(evt) {
				if (evt) {
                    evt.preventDefault();
                }
                
                var term = $("#term").val();
                var instSeq = $("#instSeq").val();
                var instText = $("#instSeq option:selected").text();
				var startDate = $("#startDate").val();
				var endDate = $("#endDate").val();
				
                try {
                    var fileName = "분석현황" + startDate + "_" + endDate + "_" + instText + ".csv";

                    var $form = $('<form method="post" action="' + contextPath + '/view/sysmgt/convert/csv' + '">');
                    var $input = $('<input type="hidden" name="csv" >');
                    $input.val(encodeURIComponent($analysisSts.ui.csv));

                    $form.append($input);
                    $form.append($('<input type="hidden" name="filename" value="' + encodeURIComponent(fileName) + '" >'));

                    $form.appendTo('body');

                    $form.submit();

                } catch (err) {
                    console.log(err);
                    COMMON.msg.alert('다운로드 오류', '예기치못한 상황으로 다운로드에 실패했습니다');
                }

                return false;
			}
	};
	$analysisSts.request = {
			getDataLst : function(data){
				$ajax.requestApi(contextPath + "/api/sysmgt/getCountByDataUsed.do", data, function(res) {
					//debugger;
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							
							//log generate by cis
							var log_param = "searchButton";
							log_param += ", Category - " + $("#prjSetSearchSelectBox option:selected").text();
							log_param += ", word - " + $.trim($("#prjSetSearchText").val());
							//$log.srvLogWrite("Z0", "06", "04", "02", "", log_param);
							
							var labels = [];
							var datas = [];
							var total = 0;
							var csv_header = [];
							var csv_body = [];
							$analysisSts.ui.csv = '';
							
							if (result.length >= 0) {
								var html = "";
								var cols = "<colgroup><col style='width:70px;'>";
								var header = "<thead><tr><th class='sm'>&nbsp;</th>";
								var rows = "<tbody><tr><td>분석건수</td>";
								
								csv_header.push('"" ');
								csv_body.push('"분석건수"');
								
								for(var i=0; i < result.length;i++){
									cols += "<col>";
									header +=  "<th class='sm'>" + result[i].summary + "</th>";
									rows +=  "<td>" + result[i].count + "</td>";
									
									csv_header.push('"' + result[i].summary + '" ');
									csv_body.push('"' + result[i].count + '"');
									
									labels.push(result[i].summary);
									datas.push(result[i].count);
									total += parseInt(result[i].count);
								}
								cols += "</colgroup>";
								header += "</tr></thead>";
								rows += "</tr></tbody>";
								html = cols + header + rows;
								$("#dataTbl").empty().append(html);
								$("#txtDatasum").html(total);
								$analysisSts.ui.csv += csv_header.join(',') + '\n';
								$analysisSts.ui.csv += csv_body.join(',') + '\n';
							}
							
//							var instLst = res.instLst;
//							option = $("<option value=''>전체</option>");
//							$('#instSeq').append(option);
//							for (var arri=0;arri<instLst.length;arri++) {
//								var obj = instLst[arri];
//								option = $("<option value='"+obj.inst_seq+"'>" + obj.inst_nm + "</option>");
//								$('#instSeq').append(option);
//							}
							
							$analysisSts.ui.startDate = res.startDate;
							$analysisSts.ui.endDate = res.endDate;
							
						    var ctx = document.getElementById('chart').getContext('2d');
						    
							//차트 초기화
						    try {
						    	$analysisSts.ui.myChart.update();
						    	$analysisSts.ui.myChart.destroy();
						    } catch(e){}
						    
						    $analysisSts.ui.myChart = new Chart(ctx, {
						      type: 'bar',
						      data: {
						        labels: labels,
						        datasets: [{
						          label: '분석건수',
						          data: datas,
						          backgroundColor: [
						        	  'rgba(0, 43, 255, 0.5)',
						        	  'rgba(255,153,153, 0.5)',
						        	  'rgba(255,187, 51, 0.5)',
						        	  'rgba(128, 255, 0, 0.5)',
						        	  'rgba(191, 0, 230, 0.5)',
						        	  'rgba(255, 25, 102, 0.5)',
						        	  ]
						        }]
						      },
						      options: {
						        title: {
						          display: true,
						          text: $analysisSts.ui.startDate + " ~ " + $analysisSts.ui.endDate,
						          fontSize: 18,
						          fontStyle: 'normal'
						        },
						        legend: {
						          display: false,
						          position: 'bottom',
						          labels: {
						            fontSize: 15,
						            padding: 30
						          },
						        },
						        scales: {
						          yAxes: [{
						            ticks: {
						              beginAtZero: true
						            }
						          }]
						        }
						      }
						    });
							
							break;
						default:
							$message.open("알림", res.errMsg);
							break;
					}
					
				})
		}
	};
	$analysisSts.event = {
			setUIEvent : function(){
				$("#btnSearch").off().on("click",function(){
					$analysisSts.ui.getDataLst();
				});
				
				$("#btn_download").off().on("click",function(){
					$analysisSts.ui.downloadCsv();
				});
			}
	};
}(window,document));