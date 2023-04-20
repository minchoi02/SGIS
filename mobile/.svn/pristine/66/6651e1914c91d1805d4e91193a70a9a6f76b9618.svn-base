(function(W, D) {
	W.$interactive = W.$interactive || {};
	$interactive.api = {
		classStep : [],
		activeClassCode : null,//검색할 class_code
		activeClassName : null,//class_nm
		/**
		 * @name             : setIndustryList
		 * @description      : 산업분류 리스트
		 * @date             : 2015. 12. 03.
		 * @author	         : 나광흠
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
								var step = $interactive.api.classStep[$interactive.api.classStep.length-2];
								$interactive.api.classStep = $interactive.api.classStep.slice(0,$interactive.api.classStep.length-2);
								if(hasText(step)){
									$interactive.api.setIndustryList(step.code,step.name);
								}else{
									$interactive.api.setIndustryList();
								}
							});
						}
						
						var searchPath = $("#company-list").parent().find(".SearchPath");
						searchPath.empty();
						if(hasText($interactive.api.activeClassCode)){
							$interactive.api.classStep.push({
								code : $interactive.api.activeClassCode,
								name : $interactive.api.activeClassName
							});
							$.each($interactive.api.classStep,function(cnt,node){
								searchPath.append($("<a/>",{text:(cnt+1)+"단계"+(hasText(node.name)?"("+node.name+")":"")}),(cnt!=$interactive.api.classStep.length-1?"&gt;":""));
								if(cnt==$interactive.api.classStep.length-1){
									searchPath.append("&gt;",$("<a/>",{text:(cnt+2)+"단계"}),backButton);
								}
							});
						}else{
							searchPath.append($("<a/>",{text:"1단계"}));
						}
						$.each(res.result, function(cnt,node) {
							var nextButton;
							if(node.class_code.length<5){
								nextButton = $("<button/>",{"class":"Btn_Next","type":"button","title":"다음","text":"▶"}).click(function(){
									$(this).parent().find("input:radio").prop("checked",true);
									$interactive.api.setIndustryList($(this).parent().find("input[name=company_list]:radio:checked").val(),$(this).parent().find("input[name=company_list]:radio").parent().text());
								});
							}
							$("#company-list").append(
								$("<li/>",{"data-text":node.class_nm}).append(
									$("<label/>").append($("<input/>",{"name":"company_list","type":"radio","value":node.class_code}),node.class_nm),
									nextButton
								)
							);
						});
					}
				}else if(res.errCd == "-401") {
					accessTokenInfo(function(){
						$interactive.api.setIndustryList();
					});
				}
			},
			onFail: function(status) {
				messageAlert.open("알림", errorMessage);
			}
		});
	}());
	/*********** 산업분류 리스트 종료 **********/
}(window, document));