(function(W,D){
	W.$faqLst = W.$faqLst || {};
	$(document).ready(function(){
		$faqLst.ui.getFaqLst();
		$faqLst.event.setUIEvent();	

		$log.srvLogWrite("Z1", "03", "03", "01", "", "");

		$(function() {
		    $(".dialog").dialog({
		      autoOpen: false,
		      width: 'auto',
		      height: 'auto',
		      modal: true,
		      resizable: false,
		      minimizable: false,
		      minimizeIcon: 'ui-icon-minus'
		    });
		});
	});
	
	$faqLst.ui = {
			postNo : 0,
			lastNo : 0,
			
			getFaqLst : function(){
//				var obj = {
//						params : {
//							
//							}
//				};
				$faqLst.request.getFaqLst();
			},
			moveFaq : function(numbers,checkUD){
				
				var obj = {
						params: {
							post_no : numbers.split("-")[0],
							order_no : numbers.split("-")[1],
							last_no : $faqLst.ui.lastNo,
							updown_check : checkUD
						}
				};

				$log.srvLogWrite("Z1", "03", "03", "05", "", "");
				$faqLst.request.moveFaq(obj);
			}
			
	};
	$faqLst.request = {
			getFaqLst : function(data){
				$ajax.requestApi(contextPath + "/api/sysmgt/getFaqLst.do",data, function(res) {
					//debugger;
					console.log("pass");
					switch(parseInt(res.errCd)) {
						case 0:
							if(res.faqLst.length == 0){
								break;
							}
							$(".aco-lists ul li").remove();

							var tag = '';
							for(var i=0; i < res.faqLst.length;i++){
								tag = tag + '<li><div class="aco-tit" name="'+res.faqLst[i].post_no+'"><a href="javascript:void(0)">'+res.faqLst[i].title+'</a></div>';
								tag = tag + '<div class="aco-inner" value="'+res.faqLst[i].post_no+'-'+res.faqLst[i].order_no+'" name="'+res.faqLst[i].post_no+'" style="display:none"><p class="aco-txts">'+res.faqLst[i].content+'</p>';
								tag = tag + '<div class="aco-util"><div class="btn-group line">';
								tag = tag + '<button class="btnDelete" post_no="' + res.faqLst[i].post_no + '" type="button">삭제</button>';
								tag = tag + '<button class="btnModify" post_no="' + res.faqLst[i].post_no + '" type="button">수정</button>';
								tag = tag + '<button id="button-up" type="button">▲</button><button id="button-down" type="button">▼</button>';
								tag = tag + '</div></div></div></li>';
								$faqLst.ui.lastNo = res.faqLst[i].order_no;
							}
							$(".aco-lists ul").append(tag);
							break;
						default:
							$messageNew.open("알림", res.errMsg);
//							break;
					}
				})
		},
		moveFaq : function(data){
			$ajax.requestApi(contextPath + "/api/sysmgt/updateOrderFaq.do", data, function(res) {
				switch(parseInt(res.errCd)) {
				case 0:
					$faqLst.ui.getFaqLst();
					break;
				default:
					$messageNew.open("알림", res.errMsg);
					break;
				}
			})
		}
	};
	$faqLst.event = {
			setUIEvent : function(){
				$(document).on("click","#button-up,#button-down",function(){
					//debugger;
					var index = $(this).parent().parent().parent().parent().index();
					var udCheck = this.id.split("-")[1];
					if((udCheck != "up" || index != 0) || (udCheck != "down" || index != 0)){
						var numbers = this.parentElement.parentElement.parentElement.getAttribute("value")
						
						$faqLst.ui.moveFaq(numbers,udCheck);
					}
				});
				$(document).on("click",".btnModify",function(){
					var post_no = $(this).attr('post_no');
					location.href=contextPath + '/view/sysmgt/faqForm?post_no='+post_no;
				});
				$(document).on("click",".btnDelete",function(){
					$faqLst.ui.postNo = $(this).attr('post_no');
					$confirmNew.open("확인","정말로 삭제하시겠습니까?");
				});
				$(document).on("click","#msgOkBtn",function(){
					$.ajax({
						type : "POST",
						url : contextPath +"/api/sysmgt/deletePost.do",
						dataType : "json",
						sync : true,
						data : {"ids":$faqLst.ui.postNo,"table":"faq"}
					});

					$log.srvLogWrite("Z1", "03", "03", "02", $faqLst.ui.postNo, "");
					
					$confirmNew.close();
					$faqLst.ui.getFaqLst();
				});
				$(".aco-lists").on("click",".aco-tit",function(){
					//debugger;
					var name = this.getAttribute("name");
					if($(".aco-inner[name="+name+"]").css("display") == "none"){
						$(".aco-inner[name="+name+"]").css("display","block");
					}else{
						$(".aco-inner[name="+name+"]").css("display","none");
					}
					
				});
			}
	};
}(window,document));