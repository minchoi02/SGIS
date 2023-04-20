(function(W,D){
	W.$sysSts = W.$sysSts || {};
	$(document).ready(function(){
		$sysSts.ui.getDataLst();
		$sysSts.event.setUIEvent();	
		
		var url_string = window.location.href;
		var url = new URL(url_string);
		$sysSts.ui.tp = url.searchParams.get("tp");

		$log.srvLogWrite("Z1", "01", "05", "01", "", "");
	});
	
	$sysSts.ui = {
			tp : '',
			getDataLst : function(){
				var options = {
						params : {
						}
				};
				
				$sysSts.request.getDataLst(options);
			}
	};
	$sysSts.request = {
			getDataLst : function(data){
				$ajax.requestApi(contextPath + "/api/sysmgt/getSystemMonitor.do", data, function(res) {
					//debugger;
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							var titleTxt = "";
							//log generate by cis
							var log_param = "searchButton";
							log_param += ", Category - " + $("#prjSetSearchSelectBox option:selected").text();
							log_param += ", word - " + $.trim($("#prjSetSearchText").val());
							//$log.srvLogWrite("Z0", "06", "04", "02", "", log_param);

							$(".tabs-txt > li").removeClass("is-active");
							if ($sysSts.ui.tp=='cpu'){
								$("#sys_cpu").addClass("is-active");
								titleTxt = "CPU 점유율";
							} else if ($sysSts.ui.tp=='disk'){
								$("#sys_disk").addClass("is-active");
								titleTxt = "디스크 점유율";
							} else {
								$("#sys_ram").addClass("is-active");
								titleTxt = "메모리 점유율";
							}
							
							var labels = [];
							var datas = [];
							if (result.length > 0) {
								for(var i=0; i < result.length;i++){
									labels.push(result[i].system_id);
										
									if ($sysSts.ui.tp=='ram'){
										datas.push(result[i].ram_ratio);
									} else if ($sysSts.ui.tp=='cpu'){
										datas.push(result[i].cpu_ratio);
									} else if ($sysSts.ui.tp=='disk'){
										datas.push(result[i].disk_ratio);
									} else {
										datas.push(result[i].ram_ratio);
									}									
								}
							}
							
							$(".cycle-lists > ul > li > div").removeClass("onsts").addClass("ele");
							var agentLst = res.agentLst;
							if (agentLst.length > 0) {
								for(var i=0; i < agentLst.length;i++){
									if (agentLst[i].system_sts == "ON"){
										$("#"+agentLst[i].system_id).addClass("onsts");
									} else {
										$("#"+agentLst[i].system_id).removeClass("onsts").addClass("ele");
									}							
								}
							}
							
						    var ctx = document.getElementById('chart').getContext('2d');
						    var myChart = new Chart(ctx, {
						      type: 'bar',
						      data: {
						        labels: labels,
						        datasets: [{
						          label: '',
						          data: datas,
						          backgroundColor: 'rgba(0, 43, 255, 0.5)'
						        }]
						      },
						      options: {
						        title: {
						          display: false,
						          text: '',
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
	$sysSts.event = {
			setUIEvent : function(){
				$("#btnSearch").off().on("click",function(){
					$sysSts.ui.getDataLst();
				});
			}
	};
}(window,document));