/**
 * Created by shkim on 2014-07-16.
 */
/**
 * Durin onm override */
(function() {
	$class("sop.portal.absAPI").extend($d.api.ajaxAPI).define({
		onBlockUIPopup: function() {
			if(!this.noLoading&&!hasText(this.blockUI)){
				var loading = $("<div/>",{
					"class":"loading-box loading-"+documentId,
					"css":{
						"border":"0px solid black",
						"position":"fixed",
						"left":"0px",
						"top":"0px",
						"width":$(window).width()+"px",
						"height":"100vh",
						"z-index":"10000"	// 2020.09.21[�ѱ���] �ε�� z-index ���� ::: 2020.12.02 [이금은] 사용자 위치 정보 사용여부 popup창을 가리지 않기 위해 변경 100,000 -> 10,000
					}
				}).append(
					$("<div/>",{
						"css":{
							"position":"absolute",
							"line-height":"50px",
							"padding-bottom":"40px",
							"width":"100%",
							"top":"45%",
							"left":"0",
							"text-align":"center",
							"z-index":"110000"		// 2020.09.21[�ѱ���] �ε�� z-index ����
						},"html":"<img src='"+contextPath+"/resources/images/loading/loading_type02.gif' style='width:150px;max-width:80%;'/>"
					})
				);
				$("body").append(loading);
				this.blockUI = loading;
			}
		},
		onBlockUIClose : function(){
			if(this.blockUI){
				this.blockUI.remove();
				delete this.blockUI;
			}
		}
	});
}());