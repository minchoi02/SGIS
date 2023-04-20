(function(W, D) {
	W.$currentMap = W.$currentMap || {};
	$currentMap.api = {
		classStep : [],
		activeClassCode : null,//검색할 class_code
		activeClassName : null,//class_nm
		/**
		 * @name             : setIndustryList
		 * @description      : 산업분류 리스트
		 * @date             : 2020. 07. 06.
		 * @author	         : 곽제욱
		 * @history 	     :
		 * @param class_code : class_code
		 * @param class_nm   : class_nm
		 */
		setIndustryList : function(class_code,class_nm){
			this.activeClassCode = class_code;
			this.activeClassName = class_nm;
			var obj = new sop.openApi.industry.api();
			obj.addParam("class_deg", 9);
			if(class_code){
				obj.addParam("class_code", class_code);
			}
			obj.addParam("accessToken", accessToken);
			obj.request({
				method: "GET",
				async: false,
				url: openApiPath + "/OpenAPI3/stats/industrycode.json"
			});
		}
	};
	/*********** 산업분류 리스트 시작 **********/
	(function() {
		$class("sop.openApi.industry.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res) {
				if(res.errCd == "0") {
					$("#company-list").empty();
					if(res.result.length>0){
						var backButton = "";
						if(res.result[0].class_code.length>1){
							backButton = $("<button/>",{type:"button",text:"뒤로"}).click(function(){
								var step = $currentMap.api.classStep[$currentMap.api.classStep.length-2];
								$currentMap.api.classStep = $currentMap.api.classStep.slice(0,$currentMap.api.classStep.length-2);
								if(hasText(step)){
									$currentMap.api.setIndustryList(step.code,step.name);
								}else{
									$currentMap.api.setIndustryList();
								}
							});
						}
						
						var searchPath = $("#company-list").parent().find(".SearchPath");
						searchPath.empty();
						if(hasText($currentMap.api.activeClassCode)){
							$currentMap.api.classStep.push({
								code : $currentMap.api.activeClassCode,
								name : $currentMap.api.activeClassName
							});
							$(".itemSearchList").empty();
							$.each($currentMap.api.classStep,function(cnt,node){
								 $(".itemSearchList > li").removeClass("on")
								 $(".itemSearchList > li > span").removeClass("on")
								 
							     var selectSapn = $("<span/>",{text:""+(cnt+1)+"", class:"on"})
							     var selectP = $("<p/>",{text:""+(hasText(node.name)?node.name:'')+""})
							     var selectButton = $("<button/>", {"class":"btn_popClose"}).click(function(){
							    	 if($(this).parent().children("p").text() != null && $(this).parent().children("p").text() != ""){
										  $(".itemSearchList > li").removeClass("on")
										  $(".itemSearchList > span").removeClass("on")

										  var step = $currentMap.api.classStep[(Number($(this).parent().children("span").text())-2)];
										  	if((Number($(this).parent().children("span").text())-2)>=0) {
										  		$currentMap.api.classStep = $currentMap.api.classStep.slice(0,(Number($(this).parent().children("span").text())-2));
										  	}else{
										  		$currentMap.api.classStep = [];
										  	}
											
											if(hasText(step)){
												$currentMap.api.setIndustryList(step.code ,step.name);
											}else{
												$currentMap.api.setIndustryList();
											}
									  } 
							     });
							     var selectli = $("<li/>",{id:"depth"+(cnt+1)+"", class:"on"}).append(selectSapn, selectP, selectButton)
								 $(".itemSearchList").append(selectli)
								 $("depth"+($currentMap.api.classStep,length)+"").addClass("on")
								 $currentMap.api.activelast == false;
							});
						}else{
							$(".itemSearchList").empty();
						}
						$.each(res.result, function(cnt,node) {
							var nextButton;
							if(node.class_code.length<5){
								nextButton = $("<button/>",{"class":"Btn_Next","type":"button","title":"다음","text":"▶"}).click(function(){
									$(this).parent().find("input:radio").prop("checked",true);
									$currentMap.api.setIndustryList($(this).parent().find("input[name=company_list]:radio:checked").val(),$(this).parent().find("input[name=company_list]:radio").parent().text());
								});
							}
							$("#company-list").append(
								$("<div/>",{"data-text":node.class_nm, "class":"List-ConCard"}).append(
									$("<span/>").append($("<input/>",{"name":"company_list","type":"radio","value":node.class_code, "style":"display:none"}),node.class_nm)
								).click(function(){
									//20200818 박은식 4depth 까지 event 처리 start
									if($(".itemSearchList>li").length>3){
										var dataName = $(this).attr("data-text");
										
										$("#depth4>p").html(dataName);
										
 										$(this).parent().find(".List-ConCard").removeClass("on");
										$(this).addClass("on");
										$(this).children().find("input:radio").prop("checked",true);
										
										$currentMap.api.activeClassCode = $(this).children().find("input:radio").val();
										$currentMap.api.activeClassName = $(this).attr("data-text");
										
										return;
									} else if($(".itemSearchList>li").length==3) {
										$(".itemSearchList > li > span").removeClass("on")
										$(".itemSearchList > li").removeClass("on")
										$(".itemSearchList").remove("#depth4");
										
										var html = "";
										html += "<li id='depth4' class='on' style='height:35px;'><span class='on'>4</span><p>"+node.class_nm+"</p></li>"
										
										$(".itemSearchList").append(html);
										$(this).addClass("on");
										$(this).children().find("input:radio").prop("checked",true);
										
										$currentMap.api.activeClassCode = $(this).children().find("input:radio").val();
										$currentMap.api.activeClassName = $(this).attr("data-text");
										
										return;
									} else {
										$(".itemSearchList > li").removeClass("on")
										$(this).children().find("input:radio").prop("checked",true);
										$currentMap.api.setIndustryList($(this).children().find("input[name=company_list]:radio:checked").val(),$(this).attr("data-text"));
									}
									//20200818 박은식 4depth 까지 event 처리 end
								})
							);
						});
					}
				}else if(res.errCd == "-401") {
					accessTokenInfo(function(){
						$currentMap.api.setIndustryList();
					});
				}
			},
			onFail: function(status) {
//				common_alert(errorMessage, "");
			}
		});
	}());
	/*********** 산업분류 리스트 종료 **********/
}(window, document));