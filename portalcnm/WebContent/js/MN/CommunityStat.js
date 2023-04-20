/**   
 *
 * @JSName: CommunityStat
 * @Description: 
 *
 * @author: kwangheum
 * @date: 2016/05/27/ 15:30:00	
 * @version V1.0	  
 *	
 */
(function (W, D) {
	
	srvLogWrite("L0", "01", "05", "01", "", "");
	
	$(document).ready(function(){
		$communityStat.event.setUIEvent();
	});
	W.$communityStat = W.$communityStat || {};
	$communityStat = {
		ui:{
			search : function(){
				$("#icon-table-tr,#community-stats").empty();
				var obj = new sop.openApi.highCharts.community();
				obj.addParam("CMMNTY_MAP_ID", $("#selectCommunityType").val());
				obj.addParam("TIMETYPE",$("#selectType").val());
				obj.addParam("STARTDATE",$("#startDate").val());
				obj.addParam("ENDDATE",$("#endDate").val());
				obj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/MN/CommunityStat/getCommunityStat.json",
				});
			},
			changeDateType : function(type){
				var today = new Date(),defaultStartDate,defaultEndDate;
				var month = today.getFullYear()+"-"+formatDate(today.getMonth()+1)
				var startOption = getDatepickerObjTab("start", type,"");
				var endOption = getDatepickerObjTab("end", type,"");
				$("#startDate,#endDate").datepicker("destroy").off();
				var today = new Date();
				if(type=="daily"){
					today.setDate(today.getDate()-10);
					defaultStartDate = today.getFullYear() + '-' + formatDate(today.getMonth() + 1) + '-' + formatDate(today.getDate());
					today = new Date();
					today.setDate(today.getDate()-1);
					defaultEndDate = today.getFullYear() + '-' + formatDate(today.getMonth() + 1) + '-' + formatDate(today.getDate());
				}else if(type=="monthly"){
					today.setMonth(today.getMonth()-11, 1);
					defaultStartDate = today.getFullYear() + '-' + formatDate(today.getMonth() + 1);
					today = new Date();
					defaultEndDate = today.getFullYear() + '-' + formatDate(today.getMonth() + 1);
					startOption.dateFormat = "yy-mm";
					endOption.dateFormat = "yy-mm";
					$("#startDate,#endDate").on("click focus",function () {
						$(".ui-datepicker-calendar").hide();
					});
				}else{
					return false;
				}
				$("#startDate").datepicker(startOption).val(defaultStartDate);
				$("#endDate").datepicker(endOption).val(defaultEndDate);
			}
		}
	};
	$communityStat.event = {
		setUIEvent: function() {
			$communityStat.ui.changeDateType($("#selectType").val().toLowerCase());
			$("#selectType").change(function(){
				$communityStat.ui.changeDateType($(this).val().toLowerCase());
			});
			$("#searchButton a").click(function(){
				
				srvLogWrite("L0", "01", "05", "01", "", "");
				
				$communityStat.ui.search();
			});
			$("body").on("click","#ok_alertPopup",function(){
				confirmPopupRemove();
			});
			$("body").on("click","#close_confirmPopup",function(){
				confirmPopupRemove();
			});
			$.ajax({
				url : contextPath + "/ServiceAPI/MN/CommunityStat/getAllCommunityList.json",
				type: "POST",
				async: true,
				dataType: "json",
				success: function(res){
					if(res.errCd=="0"){
						$("#selectCommunityType").empty();
						$.each(res.result,function(cnt,node){
							$("#selectCommunityType").append($("<option/>",{text:node.CMMNTY_MAP_NM,value:node.CMMNTY_MAP_ID}));
						});
						$communityStat.ui.search();
					}else{
						getConfirmPopup('알림', res.errMsg, 'alert');
					}
				},
				error: function(data){
					getConfirmPopup('알림', '일시적인 오류로 소통지도 목록을 갖고오는데 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				}
			});
		}
	};
	(function() {
		$class("sop.openApi.highCharts.community").extend(sop.cnm.absAPI).define({
			onSuccess : function(status, res) {
				if(res.errCd == "0") {
					$.each(res.result.symbol,function(cnt,node){
						var imageSrc;
						var sgisContextPath="";
						if(node.REG_SYMBOL==undefined||node.REG_SYMBOL==null||node.REG_SYMBOL.replace(/ /gi,"")==""){
							imageSrc = location.protocol+"//"+location.host+"/"+node.PATH_NM+node.SAVE_FILE_NM;
						}else{
							imageSrc = location.protocol+"//"+location.host+"/img/community/iconset_"+node.REG_SYMBOL+node.ORDER+".png";
						}
						$("#icon-table-tr").append($("<th/>",{text:node.LABEL_NM}),$("<td/>",{"class":"keyBoxText","style":"text-align: center;"}).append($("<img/>",{"src":imageSrc,"style":"width:23px;height:28px;"})));
					});
					$('#community-stats').highcharts({
						title: {
							text: ''
						},
						xAxis: {
							categories: res.result.categories,
							labels: {
								formatter : function(){
									var label = this.value.split("-");
									var type = $("#selectType").val().toLowerCase();
									var typeText = "";
									if(type=="daily"){
										typeText="일";
									}else if(type=="monthly"){	
										typeText="월";
									}
									return label[label.length-1]+typeText;
								}
							}
						},
						yAxis: {
							title: {
								text: ''
							},
							plotLines: [{
								value: 0,
								width: 1,
								color: '#808080'
							}]
						},
						tooltip: {
							valueSuffix: '개'
						},
						legend: {
							layout: 'vertical',
							align: 'right',
							verticalAlign: 'middle',
							borderWidth: 0
						},
						series: res.result.series
					});
				} else {
					getConfirmPopup('알림', res.errMsg, 'alert');
				}
			},
			onFail : function(status) {
				getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
			}
		});
	}());
}(window, document));
