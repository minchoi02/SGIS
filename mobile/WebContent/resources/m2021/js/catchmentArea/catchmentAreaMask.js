/**
 * 생활권역 통계지도 마스크에 대한 클래스
 * 
 * history : 2020/11/25 초기 작성 version : 1.0 see : 원형(/js/common/sop.portal.absAPI.js)
 * 
 */
(function (W, D) {
	//W.$catchmentAreaMask = W.$catchmentAreaMask || {};

	$(document).ready(function() {
		
		$catchmentAreaMask.createMask(false);
		
	});
	
	$catchmentAreaMask = {
			
		blockUI : null,
		popupUI : null,
		processMap : {},

		clearProcessMap : function(pKey) {			
			if(this.processMap.hasOwnProperty(pKey)){
				delete this.processMap[pKey];
				delete this.processMap[pKey + '_tot'];
			}
		},
		
		startProcess : function(pKey, pMemCnt) {	
			this.processMap[pKey] = pMemCnt;
			this.processMap[pKey + '_tot'] = pMemCnt;
			
			$('#catchmentAreaMaskLdg #progressMsg').html("잠시만 기다려주세요...");
			this.openMask();
		},
		
		endUnitWork : function(pKey, pNumOfProcessing) {
			//pNumOfProcessing 값이 0 이하이면 창 닫는걸로
			if(this.processMap.hasOwnProperty(pKey)){
				var remainCnt = Number(this.processMap[pKey]);
				var totCnt = Number(this.processMap[pKey + '_tot']);
				var processingCnt = 1;
				if(pNumOfProcessing !== undefined){
					processingCnt = pNumOfProcessing; 
				}
				
				if((remainCnt - processingCnt) > 0 && processingCnt > 0){
					this.processMap[pKey] = remainCnt - processingCnt;
					var progressVal = ((totCnt - (remainCnt - processingCnt)) / totCnt * 100).toFixed(0);					
					$('#catchmentAreaMaskLdg #progressMsg').html(progressVal + "% 진행 중...");					
				}else{
					//$('#catchmentAreaMaskLdg #progressMsg').html("100%");
					this.closeMask();					
					
					this.clearProcessMap(pKey);
				}
			}else{
				this.closeMask();					
				
				this.clearProcessMap(pKey);				
			}
		},

        createMask : function(pIsShow){

        	if (this.blockUI == null) {        		
        		if($('#catchmentAreaMaskBg').length == 0){
					this.blockUI = document.createElement("DIV");
					this.blockUI.id = "catchmentAreaMaskBg";
					this.blockUI.style.backgroundColor = "#D3D3D3";
					this.blockUI.style.border = "0px solid black";
					this.blockUI.style.position = "absolute";
					this.blockUI.style.left = '0px';
					this.blockUI.style.top = '0px';
					if(window.innerHeight == undefined){
						this.blockUI.style.height = document.body.scrollHeight + 'px';
						this.blockUI.style.width = document.documentElement.clientWidth + 'px';
					}else{
						this.blockUI.style.height = document.body.scrollHeight + 'px';
						this.blockUI.style.width = document.documentElement.clientWidth + 'px';
					}
					this.blockUI.style.zIndex = "10000";
					this.blockUI.style.filter = "alpha(opacity=60);";
					this.blockUI.style.MozOpacity = 0.6;
					this.blockUI.style.opacity = 0.6;
					this.blockUI.style.KhtmlOpacity = 0.6;
					
					if(!pIsShow){
						this.blockUI.style.display = "none";
					}				
					document.body.appendChild(this.blockUI);
        		}
        		
        		this.blockUI = $('#catchmentAreaMaskBg');
        	}
        	
        	if (this.popupUI == null) {
        		if($('#catchmentAreaMaskLdg').length == 0){
					this.popupUI = document.createElement("DIV");
					this.popupUI.id = "catchmentAreaMaskLdg";
					this.popupUI.style.backgroundColor = "rgb(255, 255, 255)";
					this.popupUI.style.border = "5px solid rgb(74, 123, 238)";
					this.popupUI.style.borderRadius = "10px";
					this.popupUI.style.position = "absolute";
					this.popupUI.style.height = '200px';
					this.popupUI.style.lineHeight = '50px';
					this.popupUI.style.paddingTop='20px';
					this.popupUI.style.width ='350px';
					this.popupUI.style.top ='50%';
					this.popupUI.style.left = '50%';
					this.popupUI.style.zIndex = "11000";
					this.popupUI.style.cursor = 'wait';
	
					var divHeight = this.popupUI.style.height.replace('px','');
					var divWidth = this.popupUI.style.width.replace('px','');
					this.popupUI.style.margin = '-'+divHeight/2+'px 0 0 -'+divWidth/2+'px';
					this.popupUI.style.textAlign ='center';                 
	 
					var loadingMsg = "<p style='font-size:20px;font-weight:500;'>사용자 요청을 처리 중 입니다.</p><p id='progressMsg' style='font-size:18px;font-weight:400;padding-bottom:20px;'>잠시만 기다려주세요...</p>";
					var loadingImg = "<img src='/img/common/loding_type01.gif'/>";
					this.popupUI.innerHTML = loadingMsg + loadingImg;
					
					if(!pIsShow){
						this.popupUI.style.display = "none";
					}				
					document.body.appendChild(this.popupUI);
        		}
        		
        		this.popupUI = $('#catchmentAreaMaskLdg');
        	}
        },	
        
        openMask : function(){

        	if (this.blockUI == null || this.popupUI == null) {
        		this.createMask(false);
        	}
        	
        	if (this.blockUI != null) {
        		$(this.blockUI).show();
        	}
        	
        	if (this.popupUI != null) {
        		$(this.popupUI).show();
        	}
        },		
		
        closeMask : function() {

        	if (this.popupUI != undefined && this.popupUI != null) {
        		$(this.popupUI).hide();
        	}
        	
        	if (this.blockUI != undefined && this.blockUI != null) {
        		$(this.blockUI).hide();
        	}
		}		
		
	};
	
	
	
}(window, document));	