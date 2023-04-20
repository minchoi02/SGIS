(function(W,D){
	W.$logSts = W.$logSts || {};
	$(document).ready(function(){
		$logSts.ui.getDataLst();
		$logSts.event.setUIEvent();	
		
		$log.srvLogWrite("Z1", "01", "03", "01", "", "");
	});
	
	$logSts.ui = {
			csv : '',
			myChart : null,
			getDataLst : function(){
				var term = $("#term").val();
				var startDate = $("#startDate").val();
				var endDate = $("#endDate").val();
				if (term == "") {
					term ="";
					$("#term").val(term);
				}
				if (endDate == "") {
					endDate = $logSts.ui.nowDate();
					$("#endDate").val(endDate);
				}
				if (startDate == "") {
					var today = new Date();
					if (today.getMonth() > 1) {
						today.setMonth(today.getMonth() - 1);
					} else {
						today.setYear(today.getFullYear() - 1);
						today.setMonth(12);
					}
					if (today.getDate() > 1) {
						today.setDate(today.getDate() - 1);
					} else {
						if (today.getMonth() == 1 || today.getMonth() == 3 || today.getMonth() == 5
							|| today.getMonth() == 7 || today.getMonth() == 8 || today.getMonth() == 10 || today.getMonth() == 12
						) {
							today.setDate(31);
						} else	if (today.getMonth() == 2) 
						{
							today.setDate(31);
						} else {
							today.setDate(30);
						}
					}
					startDate = $logSts.ui.dateFormat(today);	
					$("#startDate").val(startDate);
				}
				if (Number(startDate.split("-").join("")) > Number(endDate.split("-").join(""))) {
					$messageNew.open("오류", '종료일이 시작일보다 빠를 수 없습니다');
					return false;
				}
				var options = {
						params : {
							startDate:startDate,
							endDate:endDate,
							term:term,
							instSeq:$("#instSeq").val()
						}
				};
				$logSts.request.getDataLst(options);
			},
			
			nowDate : function() {
				var today = new Date();
				return $logSts.ui.dateFormat(today);	
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

                    var prefix = '';
                    if (term == 'months') {
                        prefix = '월간접속현황';
                    } else if (term == 'days') {
                        prefix = '일간접속현황';
                    } else if (term == 'weeks') {
                        prefix = '주간접속현황';
                    }

                    var fileName = prefix + startDate + "_" + endDate + "_" + instText + ".csv";

                    var $form = $('<form method="post" action="' + contextPath + '/view/sysmgt/convert/csv' + '">');
                    var $input = $('<input type="hidden" name="csv" >');
                    $input.val(encodeURIComponent($logSts.ui.csv));

                    $form.append($input);
                    $form.append($('<input type="hidden" name="filename" value="' + encodeURIComponent(fileName) + '" >'));

                    $form.appendTo('body');

                    $form.submit();

                } catch (err) {
                    console.log(err);
                    $messageNew.open("다운로드 오류", '예기치못한 상황으로 다운로드에 실패했습니다');
                }

                return false;
			}
	};
	$logSts.request = {
			getDataLst : function(data){
				$ajax.requestApi(contextPath + "/api/sysmgt/selectCountByUserInstGrp.do", data, function(res) {
					//debugger;
					switch(parseInt(res.errCd)) {
						case 0:
							result = res.result;
							
							//log generate by cis
							var log_param = "searchButton";
							log_param += ", Category - " + $("#prjSetSearchSelectBox option:selected").text();
							log_param += ", word - " + $.trim($("#prjSetSearchText").val());
							//$log.srvLogWrite("Z0", "06", "04", "02", "", log_param);
							
							var labels = [];
							var datas = [];
							var csv_header = [];
							var csv_body = [];
							$logSts.ui.csv = '';
							
							if (result.length > 0) {
								var html = "";
								var cols = "<colgroup><col style='width:70px;'>";
								var header = "<thead><tr><th class='sm'>&nbsp;</th>";
								var rows = "<tbody><tr><td>방문건수</td>";
								var term = $("#term").val();
								
			                    if (term == 'months') {
			                        prefix = '월간';
			                    } else if (term == 'days') {
			                        prefix = '일간';
			                    } else if (term == 'weeks') {
			                        prefix = '주간';
			                    }
			                    
								csv_header.push('"' + prefix + '" ');
								csv_body.push('"방문건수"');
								
								for(var i=0; i < result.length;i++){
									cols += "<col>";
									header +=  "<th class='sm'>" + parseInt(result[i].days.substr(-2)) + "</th>";
									rows +=  "<td>" + result[i].count + "</td>";
									csv_header.push('"' + parseInt(result[i].days.substr(-2)) + '" ');
									csv_body.push('"' + result[i].count + '"');
									
									labels.push(result[i].days);
									datas.push(result[i].count);
								}
								cols += "</colgroup>";
								header += "</tr></thead>";
								rows += "</tr></tbody>";
								html = cols + header + rows;
								$("#dataTbl").empty().append(html);
								
								$logSts.ui.csv += csv_header.join(',') + '\n';
								$logSts.ui.csv += csv_body.join(',') + '\n';
							}

							var dataSum = res.dataSum;
							if (dataSum != null) {
								$("#txtAvg").html(dataSum.avg.toFixed(0));
								$("#txtDatasum").html(dataSum.datasum);
							} else {
								$("#txtAvg").empty();
								$("#txtDatasum").empty();
							}
							
//							var instLst = res.instLst;
//							option = $("<option value=''>전체</option>");
//							$('#instSeq').append(option);
//							for (var arri=0;arri<instLst.length;arri++) {
//								var obj = instLst[arri];
//								option = $("<option value='"+obj.inst_seq+"'>" + obj.inst_nm + "</option>");
//								$('#instSeq').append(option);
//							}
							
							$logSts.ui.startDate = res.startDate;
							$logSts.ui.endDate = res.endDate;
							
							var ctx = document.getElementById('chart').getContext('2d');
						    
							//차트 초기화
						    try {
						    	$logSts.ui.myChart.update();
							    $logSts.ui.myChart.destroy();
						    } catch(e){}
						    
						    
						    $logSts.ui.myChart = new Chart(ctx, {
						      type: 'bar',
						      data: {
						        labels: labels,
						        datasets: [{
						          label: '방문건수',
						          data: datas,
						          backgroundColor: 'rgba(0, 43, 255, 0.5)'
						        }]
						      },
						      options: {
						        title: {
						          display: true,
						          text: $logSts.ui.startDate + " ~ " + $logSts.ui.endDate,
						          fontSize: 18,
						          fontStyle: 'normal'
						        },
						        legend: {
						          display: true,
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
							$messageNew.open("알림", res.errMsg);
							break;
					}
					
				})
		}
	};
	$logSts.event = {
			setUIEvent : function(){
				$("#btnSearch").off().on("click",function(){
					$logSts.ui.getDataLst();
				});
				
				$("#btn_download").off().on("click",function(){
					$logSts.ui.downloadCsv();
				});
			}
	};
}(window,document));