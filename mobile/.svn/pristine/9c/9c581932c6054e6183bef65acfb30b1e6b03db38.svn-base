/**
 * Created by shkim on 2014-07-16.
 */

/**
 * Durin onm override */
(function() {
    $class("gis.service.absAPI").extend($d.api.ajaxAPI).define({

        onBlockUIPopup : function(){
        	var elements = document.getElementById("durianMask");
        	var id = null;
        	if (elements != null) {
        		id = elements.getAttribute('id');
        	}
        	
        	if (id != "durianMask") {
        		 this.blockUI = document.createElement("DIV");
                 this.blockUI.id = "durianMask";
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
                 document.body.appendChild(this.blockUI);
        	
                 this.popupUI=document.createElement("DIV");

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

                 var divHeight=this.popupUI.style.height.replace('px','');
                 var divWidth=this.popupUI.style.width.replace('px','');
                 this.popupUI.style.margin='-'+divHeight/2+'px 0 0 -'+divWidth/2+'px';
                 this.popupUI.style.textAlign='center';                 
                 
                 var loadingMsg = "<p style='font-size:20px;font-weight:500;'>사용자 요청을 처리 중 입니다.</p><p style='font-size:17px;font-weight:300;padding-bottom:20px;'>잠시만 기다려주세요...</p>";
                 var loadingImg = "<img src='/img/common/loding_type01.gif'/>";
                 this.popupUI.innerHTML = loadingMsg + loadingImg;
                 document.body.appendChild(this.popupUI);
                 
                 
                 this.popupUI.style.position = "absolute";
        	}
        }
    });
}());