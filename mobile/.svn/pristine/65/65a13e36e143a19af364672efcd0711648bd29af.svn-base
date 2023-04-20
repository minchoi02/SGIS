/**
 * 생활권역서비스 공통 알럿 DIV에 대한 클래스
 * caMessageAlert.open(제목, 내용, 확인버튼콜백(options), 취소버튼콜백(options))
 * 
 * history : 2020/11/23 초기 작성 version : 1.0 see : 원형(/js/common/common.js)
 * 
 */
var caMessageAlert = {
		open : function (title, message, okFnc, cancelFnc, options) {
			//2017.10.18 [개발팀] 중복 마스킹 삭제
			if ($(".mAlert").is(":visible")) {
				$(".mAlert").remove();
			}
			var alertId = makeRandomThirtySevenDigitString();
			var html = "";
			html +=	'<div class="popupWrapper mAlert" id="wrapper_'+alertId+'">';
			html += 	'<div class="alertPopupWrapper" id="popup_'+alertId+'">';
			html +=			'<div class="topbar">';
			html +=				'<span>'+title+'</span>';
			html +=				'<a href="#" id="myXbtn_'+alertId+'">닫기</a>'; //2017.12.21 [개발팀] 접근성 시정조치
			html +=			'</div>';
			html +=			'<div class="popContents">';
			html +=				'<div class="messageBox">' + message + '</div>';
			html +=				'<div class="btnBox">';
			html +=					'<a href="#" id="okBtn_'+alertId+'" class="btnStyle01">확인</a>'; //2017.12.21 [개발팀] 접근성 시정조치
			
			if(cancelFnc != undefined) {
				html +=				'<a href="#" id="cancelBtn_'+alertId+'" class="btnStyle01">닫기</a>';	 //2017.12.21 [개발팀] 접근성 시정조치
			}
			
			html +=				'</div>';
			html +=			'</div>';
			html +=		'</div>';
			html +=	'</div>';
			$("body").append(html);
			
			var d = document;
			var h = d.body.clientHeight;
			var y = (window.pageYOffset) ?
		            	window.pageYOffset : (d.documentElement && d.documentElement.scrollTop) ?
		                d.documentElement.scrollTop : (d.body) ? d.body.scrollTop : 0;
			/*$("#popup_"+alertId).css("margin-top", ((h/2)+y) - 70);*/
			$("#popup_"+alertId).css("margin-top", (h/2) - 70);
			$(".popupWrapper").css("height", d.body.scrollHeight);
			
			$("#okBtn_"+alertId).click(function() {
				caMessageAlert.defaultClose(alertId);
				if (okFnc != undefined) {
					okFnc.call(this, options);
				}
			});
			
			$("#cancelBtn_"+alertId).click(function() {
				caMessageAlert.defaultClose(alertId);
				if (cancelFnc != undefined) {
					cancelFnc.call(this, options);
				}
			});
			
			$("#myXbtn_"+alertId).click(function() {
				caMessageAlert.defaultClose(alertId);
				if (cancelFnc != undefined) {
					cancelFnc.call(this, options);
				}
			});
			
			$(window).resize(function() {
				//$(window).off("resize");
				
				if($('.popupWrapper.mAlert').length > 0){
					var d = document;
					var h = d.body.clientHeight;
					var y = (window.pageYOffset) ?
				            	window.pageYOffset : (d.documentElement && d.documentElement.scrollTop) ?
				                d.documentElement.scrollTop : (d.body) ? d.body.scrollTop : 0;
					$("#popup_"+alertId).css("margin-top", ((h/2)+y) - 70);
					$(".popupWrapper").css("height", d.body.scrollHeight);
				}
			});
			
		},
		
		defaultClose : function (alertId) {
			$("#wrapper_"+alertId).remove(); 
		}
};

var caMessageConfirm = {
		open : function (title, message, btnOptions, cancelCallback) {
			//2017.10.18 [개발팀] 중복 마스킹 삭제
			if ($(".mConfrim").is(":visible")) {
				$(".mConfrim").remove();
			}
			var alertId = makeRandomThirtySevenDigitString();
			var html = "";
			html +=	'<div class="popupWrapper mConfrim" id="wrapper_'+alertId+'">';
			html += 	'<div class="alertPopupWrapper" id="popup_'+alertId+'">';
			html +=			'<div class="topbar">';
			html +=				'<span>'+title+'</span>';
			html +=				'<a id="myXbtn_'+alertId+'">닫기</a>';
			html +=			'</div>';
			html +=			'<div class="popContents">';
			html +=				'<div class="messageBox">' + message + '</div>';
			html +=				'<div class="btnBox">';
			
			for (var i=0; i<btnOptions.length; i++) {
				html +=				'<a id="btn_'+ i +'_'+ alertId +'" class="btnStyle01">'+btnOptions[i].title+'</a>';
			}
			
			html +=				'</div>';
			html +=			'</div>';
			html +=		'</div>';
			html +=	'</div>';
			$("body").append(html);
			
			for (var i=0; i<btnOptions.length; i++) {
				$("#btn_"+ i +"_"+ alertId).click(function(index) {
					caMessageConfirm.defaultClose(alertId);
					var id = this.id.split("_");
					var idx = id[1];
					if (btnOptions[idx].func != undefined) {
						btnOptions[idx].func.call(this, btnOptions[idx].fAgm);
					}
				});
				
				if (btnOptions[i].disable != undefined && btnOptions[i].disable) {
					$("#btn_"+ i +"_"+ alertId).attr("disabled", "disabled");
					$("#btn_"+ i +"_"+ alertId).css({"background" : "#cecece"});
				}
				
				if (btnOptions[i].style != undefined && btnOptions[i].style) {
					$("#btn_"+ i +"_"+ alertId).css(btnOptions[i].style);
				}
 
			}
			
			//화면 중앙에 맞추기
			var d = document;
			var h = d.body.clientHeight;
			var y = (window.pageYOffset) ?
		            	window.pageYOffset : (d.documentElement && d.documentElement.scrollTop) ?
		                d.documentElement.scrollTop : (d.body) ? d.body.scrollTop : 0;
			/*$("#popup_"+alertId).css("margin-top", ((h/2)+y) - 70);*/
			$("#popup_"+alertId).css("margin-top", (h/2) - 70);
			
			$(".popupWrapper").css("height", d.body.scrollHeight);
			
			$("#okBtn_"+alertId).click(function() {
				caMessageConfirm.defaultClose(alertId);
				if (okFnc != undefined) {
					okFnc.call(this, options);
				}
			});
			
			$("#cancelBtn_"+alertId).click(function() {
				caMessageConfirm.defaultClose(alertId);
				if (cancelFnc != undefined) {
					cancelFnc.call(this, options);
				}
			});
			
			$("#myXbtn_"+alertId).click(function() {
				caMessageConfirm.defaultClose(alertId);
				if (cancelCallback != undefined) {
					cancelCallback.call(this);
				}
			});
			
			$(window).resize(function() {
				//$(window).off("resize");
				
				if($('.popupWrapper.mConfrim').length > 0){
					var d = document;
					var h = d.body.clientHeight;
					var y = (window.pageYOffset) ?
				            	window.pageYOffset : (d.documentElement && d.documentElement.scrollTop) ?
				                d.documentElement.scrollTop : (d.body) ? d.body.scrollTop : 0;
					$("#popup_"+alertId).css("margin-top", ((h/2)+y) - 70);
					$(".popupWrapper").css("height", d.body.scrollHeight);
				}
			});
			
		},
		
		defaultClose : function (alertId) {
			$("#wrapper_"+alertId).remove(); 
		}
};
