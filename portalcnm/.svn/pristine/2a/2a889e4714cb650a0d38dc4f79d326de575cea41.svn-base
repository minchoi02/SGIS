var ststistics = {
	//2020년 SGIS고도화 3차 시작
	isTab1Init : false,
	isTab2Init : false,
	isTab3Init : false,
	isTab4Init : false,
	//2020년 SGIS고도화 3차 끝
	
	option 			: {
		// 초기값
		selector 	: "input , select , textarea , checkbox",
		process 	: false  // 중복 저장 방지를 위한 ... save 저장/수정 ,  select 조회
	},	
	popup : function(_parameter){
		this.type = _parameter.type;
		if(_parameter.type == 'detail') {
			$("#popup , .popupWrapper").show();
			this.set_value({target : "popup" , mode : 'read'});
		} else {
			var temp ={from : this.type};
			$.extend(temp,this.grid.getSelectRowData());
			
			//2020년 SGIS고도화 3차 시작
			if(_parameter.trend == 'Trend'){
				this.trendKwrd = _parameter.trendKwrd;
				if(this.trendKwrd != undefined && this.trendKwrd != null && this.trendKwrd != ''){
					$.extend(temp, {'trendKwrd' : this.trendKwrd});
				}
			}
			//2020년 SGIS고도화 3차 끝
			
			$s.asynchronous({url : "/api/ststistics/getStstisticsUSMappingDataMng.do" , data : temp ,callback : function(resBody){
				$s.popup_controller.clear();
				if( resBody.data && resBody.data.length > 0){
					$(resBody.data).each(function(index , elem){
						$s.popup_controller.id 	= elem[$s.popup_controller[$s.type].column];
						$s.popup_controller.name 	= elem[$s.popup_controller[$s.type].value];
						if($s.popup_controller[$s.type].column1!=undefined && $s.popup_controller[$s.type].column1!=null){
							$s.popup_controller.id1 	= elem[$s.popup_controller[$s.type].column1];
							$s.popup_controller.name1 	= elem[$s.popup_controller[$s.type].value1];
						}	
						$s.popup_controller.grid();
					});
				}else{
					$s.popup_controller.dataEmpty();
				}
				$("#popup" +(_parameter.type).replace("MainKeyWord" , "KeyWord") +" , .popupWrapper"+(_parameter.type).replace("MainKeyWord" , "KeyWord")).show();
			}})
		}
	},
	set_value		: function(_parameter){
		// 상세페이지의 값을 셋팅한다.
		var target 	= _parameter.target;
		var rt 		= $("#"+target) || $("."+target);
		var data 	= _parameter.data || $s.grid.getSelectRowData();
		rt.find(this.option.selector).each(function(index , elem){
			if(this.type.toLowerCase() === 'checkbox' && data[this.id] == 'Y')$(this).prop("checked", true);
			else if(this.type.toLowerCase() === 'checkbox' && data[this.id] == 'N')$(this).prop("checked", false);
			else $(this).val((_parameter.clear) ? '' : data[this.id]);
			if(_parameter.mode === 'read'){
				$("#popTitle").text($(".location .fontS").text() + " 상세/수정");
			}else{
				$("#popTitle").text($(".location .fontS").text() + " 등록");
				$("input:checkbox[id="+elem.id+"]").prop("checked", false);
			}
		});
	},
	setFile : function(obj){
		var ext = $(obj).val().split('.').pop().toLowerCase();
      	if($.inArray(ext, ['gif','png','jpg','jpeg']) == -1) {
		 	alert('gif,png,jpg,jpeg 파일만 업로드 할수 있습니다.');
		 	return;
	    }

		var fileName = obj.value.split("\\");
		$("#tempUrl").val(fileName[fileName.length - 1]);
	},
	synchronization : function(_options){
		$.extend(this.option,_options);
	},
	initialize 		: function(param){
		// 초기화 메소드
		this.synchronization(param);
		
		//2020년 SGIS고도화 3차 시작
		if(param.search_box == "resetForm1" && $s.isTab1Init == true){
			return false;
		}else if(param.search_box == "resetForm2" && $s.isTab2Init == true){
			return false;
		}else if(param.search_box == "resetForm3" && $s.isTab3Init == true){
			return false;
		}else if(param.search_box == "resetForm4" && $s.isTab4Init == true){
			return false;
		}
		//2020년 SGIS고도화 3차 끝
		
		if(param.search_box){
			var target =  ($("." + $s.option.search_box)[0])? "." + $s.option.search_box : "#" + $s.option.search_box;
			//$(target).append($("<input>").attr("type" , "hidden").attr("id","pageNo").attr("name","pageNo").val("1"));//2020년 SGIS 3차 주석
			$(target).append($("<input>").attr("type" , "hidden").attr("class","pageNo").attr("name","pageNo").val("1"));//2020년 SGIS 3차 수정
		}
		if(param.search_button){
			$("#"+param.search_button).on("click",function(){
				//$('#pageNo').val('1');//2020년 SGIS고도화 3차 주석
				$('.pageNo').val('1');//2020년 SGIS고도화 3차 수정
				if(!$s.process)
					$s.grid.create($s.grid.parameter);
			});
			$("#word").keydown(function(key){
				if(key.keyCode==13){
					//$('#pageNo').val('1');//2020년 SGIS고도화 3차 주석
					$('.pageNo').val('1');//2020년 SGIS고도화 3차 수정
					$s.grid.create($s.grid.parameter);
					return false;
				}
			});
			
			//2020년 SGIS고도화 3차 시작
			if(param.search_button == "recmdServiceSearch"){
				$('#serviceKwrdWord').keydown(function(key){
					if(key.keyCode==13){
						$('.pageNo').val('1');
						$s.grid.create($s.grid.parameter);
						return false;
					}
				});				
			}else if(param.search_button == "mapTypeSearch"){
				$('#maptypeKwrdWord').keydown(function(key){
					if(key.keyCode==13){
						$('.pageNo').val('1');
						$s.grid.create($s.grid.parameter);
						return false;
					}
				});			
			}else if(param.search_button == "lifeCycleSearch"){
				$('#lifecycleKwrdWord').keydown(function(key){
					if(key.keyCode==13){
						$('.pageNo').val('1');
						$s.grid.create($s.grid.parameter);
						return false;
					}
				});		
			}else if(param.search_button == "interestsSearch"){
				$('#interestsKwrdWord').keydown(function(key){
					if(key.keyCode==13){
						$('.pageNo').val('1');
						$s.grid.create($s.grid.parameter);
						return false;
					}
				});	
			}
			//2020년 SGIS고도화 3차 끝
		}
		//2020년 SGIS고도화 3차 시작
		if(param.search_box == "resetForm1"){
			$s.isTab1Init = true;
		}else if(param.search_box == "resetForm2"){
			$s.isTab2Init = true;
		}else if(param.search_box == "resetForm3"){
			$s.isTab3Init = true;
		}else if(param.search_box == "resetForm4"){
			$s.isTab4Init = true;
		}
		//2020년 SGIS고도화 3차 끝
	},
	store : function(param){
		if(param.store_url){
			var tt =  ($("." + param.store_box)[0])? "." + param.store_box : "#" + param.store_box;
			if(param.validation){
				if(param.validationFn && param.validationFn instanceof Function){
					if(param.validationFn()){
						if(confirm("저장 하시겠습니까?")){
							$s.asynchronous({url : param.store_url , data : (param.store_box) ? this.serialize(tt) : {} , param  : param ,callback : function(resBody){
								if(resBody.code == 0){
									$s.grid.create($s.grid.parameter);
									$("#popup , .popupWrapper").hide();
								}else{
									alert("저장에 실패 하였습니다.");
								}
							}})
						}
					}
				}
			}else{
				$s.asynchronous({url : param.store_url , data : (param.store_box) ? $(target).serialize() : {} ,callback : function(resBody){
					if(resBody.code == 0){
						alert("등록에 성공하셨습니다.");
						$s.grid.create($s.grid.parameter);
						$("#popup , .popupWrapper").hide();
					}
				}})
			}
		}else{
			console.log("등록하는 url없습니다.");
		}
	},
	asynchronous : function(_parameter){
		if(this.process) return $s.message({message :"이전 작업을 처리중입니다." , returnValue : false})
		this.process = true;
		// 비동기 통신 
		
		if(_parameter.param && _parameter.param.isFile == true ){
			
			
			var tt =  ($("." + _parameter.param.store_box)[0])? "." + _parameter.param.store_box : "#" + _parameter.param.store_box;
//			$(tt).attr("action" , pageContext + _parameter.param.store_url);
//			$(tt).attr("method" , "post");
//			$(tt).submit();
			
			var form = $(tt)[0];
	        var formData = new FormData(form);
            $.ajax({
                url: pageContext + _parameter.param.store_url,
                processData: false,
                contentType: false,
                data: formData,
                type: 'POST',
                success: function(result){
                	alert("등록에 성공하셨습니다.");
                	if($s.insertck)$s.insertck = false; 
					$s.process = false;
					if(_parameter.callback && _parameter.callback instanceof Function)_parameter.callback(result);
                } ,
                error : function(){
                	alert("저장에 실패하였습니다.");
				}
            });
		}else{
			$.ajax({
				  url: pageContext + _parameter.url,
				  data: (_parameter.data) ? _parameter.data : {},
				  method : (_parameter.method) ? _parameter.method :'post',
				  success : function(resBody){
					  if($s.insertck)$s.insertck = false; 
					  $s.process = false;
					  if(_parameter.callback && _parameter.callback instanceof Function)_parameter.callback(resBody);
				  },
				  error : function(){
					  if($s.insertck)$s.insertck = false; 
					  $s.process = false;
					  alert("서버와의 통신이 원할하지 않습니다.");
					  if(_parameter.error && _parameter.error instanceof Function)_parameter.error(resBody);// Uncaught ReferenceError: resBody is not defined
				  },
				  /* 2020년 SGIS고도화 3차 시작 */
				  complete : function(){
					  if(_parameter.complete && _parameter.complete instanceof Function)_parameter.complete();
				  },
				  beforeSend : function(xhr, opts){
					  if(_parameter.beforeSend && _parameter.beforeSend instanceof Function)_parameter.beforeSend();
				  }
				  /* 2020년 SGIS고도화 3차 끝 */
			});
		}
	},
	grid : {
		parameter	: {},
		data		: {},
		row			: -1 ,
		width 		: '745px',
		getSelectRow		: function(){return this.row;},
		getSelectRowData	: function(){return this.data[this.row];},
		getData	: function(row){return this.data[row];},
		getAllData	: function(){return this.data;},
		create 		: function(_parameter){
			$(".datagrid-mask , .datagrid-mask-msg").show();
			this.process = true;
			this.parameter = _parameter;
			this.header(_parameter);
			if($s.option.search_url){
				var target =  ($("." + $s.option.search_box)[0])? "." + $s.option.search_box : "#" + $s.option.search_box;
				$s.asynchronous({url : $s.option.search_url , data : ($s.option.search_box) ? $(target).serialize() : {} ,callback : function(res){
					_parameter.data = res.data;
					_parameter.data.paging = res.paging;
					$s.grid.body(_parameter);
					$s.grid.paging(_parameter);
				}})
			}else{
				if(_parameter.data) this.body(_parameter);
			}
		},
		header 		: function(_parameter){
			//var datagrid_header 		= $("<div>").addClass("datagrid-header").css({"width" : this.width , "height" : '27px'});//2020년 SGIS 3차 주석
			var datagrid_header 		= $("<div>").addClass("datagrid-header").css({"width" : parseInt(this.width) , "height" : '33px'});//2020년 SGIS 3차 수정
			var datagrid_header_inner 	= $("<div>").addClass("datagrid-header-inner");
			//var datagrid_htable 		= $("<table>").attr("border","0").attr("cellspacing","0").attr("cellpadding","0").css({"height" : '30px'});//2020년 SGIS 3차 주석
			var datagrid_htable 		= $("<table>").attr("border","0").attr("cellspacing","0").attr("cellpadding","0").css({"height" : '34px'});//2020년 SGIS 3차 수정
			var datagrid_caption		= $("<caption>").html("총조사시각화 통계표 관리 검색 결과(필드)");
			datagrid_htable.append(datagrid_caption);
			var tbody 					= $("<tbody>");
			var datagrid_header_row		= $("<tr>").addClass("datagrid-header-row");
			$.each(_parameter.header, function(index , elem){
				if(elem.type === 'text' || elem.type === 'image'){
					datagrid_header_row.append($("<th>").attr("field",elem.column).html(elem.name).css(elem.style));/*20201127 2020년 SGIS고도화 3차 수정(text->html) */
				}else if(elem.type === 'checkbox'){
					datagrid_header_row.append($("<th>").attr("field","checkbox").css(elem.style).append( $("<input type='checkbox'>")));
				}else if(elem.type === 'button'){
					datagrid_header_row.append($("<th>").attr("field",elem.column).text(elem.name).css(elem.style));
				}
			});
			$("#"+_parameter.target).html(datagrid_header.append(datagrid_header_inner.append(datagrid_htable.append(tbody.append(datagrid_header_row)))));
		},
		body 		: function(_parameter){
			ststistics.resultList = _parameter.data;
			this.data = _parameter.data;
			var datagrid_body		 	= $("<div>").addClass("datagrid-body").css({"width" : parseInt(this.width) , "margin-top" : '0px' , "overflow-x" : 'hidden' });
			var datagrid_btable 		= $("<table>").addClass("datagrid-btable").attr("border","0").attr("cellspacing","0").attr("cellpadding","0").css({"table-layout" : 'auto'});
			var datagrid_caption		= $("<caption>").html("총조사시각화 통계표 관리 검색 결과");
			datagrid_btable.append(datagrid_caption);
			var tbody 					= $("<tbody>");
			$.each(_parameter.data , function(index , elem){
				var tr = $("<tr>");
				var datagrid_body_row = tr.attr("id" , "datagrid-row-"+index).attr("index" , index).addClass("datagrid-row").css({"cursor" : "pointer"}).attr("data-itminfo", JSON.stringify(elem));
				
				$.each(_parameter.header , function(index , elem2){
					if(!elem2.style) elem2.style = {};
					if(!elem2.style["text-align"]) elem2.style["text-align"] = "center";
					if(elem2.type === 'text'){
						datagrid_body_row.append($("<td>").attr("field",elem2.column).html(elem[elem2.column]).css(elem2.style));
					}else if(elem2.type === 'checkbox'){
						datagrid_body_row.append($("<td>").attr("field","checkbox").css(elem2.style).append( $("<input type='checkbox'>")));
					}else if(elem2.type === 'image'){
						var img = $("<img>").attr("src" ,pageContext +  "" +"/api/ststistics/imageView.do?imageName="+escape(elem[elem2.column])).attr("field",elem2.column).css(elem2.style);
						if(!elem[elem2.column])img = "";
						datagrid_body_row.append($("<td>").attr("field","img").css(elem2.style).append(img));
					}else if(elem2.type === 'button'){
						var button = $("<input type='button' value='"+(elem2.name)+"' style='border: 1px solid #d3d6da;background: #fff;padding: 3px;color: #777676;font-size: 11px;'/>");
						datagrid_body_row.append($("<td>").attr("field","button").css(elem2.style).append(button));
						$(button).on("click", function(){
							elem2.callback($s.grid.data[$(this).parents("tr").index()]);
						});
					}
				});
				datagrid_body_row.on("click",function(e){
					if(e.target.nodeName.toLowerCase() == 'td'){
						$s.grid.itminfo = $(this).data("itminfo");
						//if(_parameter.row_callback && _parameter.row_callback instanceof Function)_parameter.row_callback({cellIndex : e.target.cellIndex , rowIndex : $s.grid.row});
						if(_parameter.row_callback && _parameter.row_callback instanceof Function)_parameter
							.row_callback({cellIndex : e.target.cellIndex , itmInfo : $s.grid.itminfo});
					}
				});
				tbody.append(datagrid_body_row);
			})
			if(_parameter.data.length == 0){
				var datagrid_body_row		= $("<tr>").addClass("datagrid-row");
				datagrid_body_row.append($("<td>").attr("colspan" , _parameter.header.length ).text("데이터가 존재하지 않습니다.").css({"width" : parseInt(this.width) , "text-align" : 'center'}));
				tbody.append(datagrid_body_row);
			}
			$("#"+_parameter.target).append(datagrid_body.append(datagrid_btable.append(tbody)));
		},
		
		// 목록의 페이징 처리
		paging 		: function(_parameter){
			var table 	= $("<table>").attr("cellspacing" , 0).attr("cellpadding",0).attr("border" , 0);
			var tbody	= $("<tbody>");
			var tr		= $("<tr>");
			var page	= _parameter.data.paging;
			
			var td 		= $("<td>").addClass("pagination-links");
			var classV	= "pagination-link l-btn l-btn-small l-btn-plain";
			//var a		= $("<a>").addClass(classV).attr("href" , "javascript:$('#pageNo').val('"+page.prevPageBlockNo+"');$s.grid.create($s.grid.parameter);");//2020년 SGIS 3차 주석
			var a		= $("<a>").addClass(classV).attr("href" , "javascript:$('.pageNo').val('"+page.prevPageBlockNo+"');$s.grid.create($s.grid.parameter);");//2020년 SGIS 3차 수정
			var span	= $("<span>").addClass("l-btn-left l-btn-icon-left")
			var icon1	= $("<span>").addClass("l-btn-text l-btn-empty").append($('<p>&nbsp;</p>'));
			var icon2	= $("<span>").addClass("l-btn-icon pagination-first").append($('<p>&nbsp;</p>'));
			td.append(a.append(span.append(icon1).append(icon2)));
			tr.append(td);
			
			td 		= $("<td>").addClass("pagination-links");
			//a		= $("<a>").addClass("pagination-link l-btn l-btn-small l-btn-plain").attr("href" , "javascript:$('#pageNo').val('"+page.prevPageNo+"');$s.grid.create($s.grid.parameter);");//2020년 SGIS 3차 수정
			a		= $("<a>").addClass("pagination-link l-btn l-btn-small l-btn-plain").attr("href" , "javascript:$('.pageNo').val('"+page.prevPageNo+"');$s.grid.create($s.grid.parameter);");//2020년 SGIS 3차 수정
			span	= $("<span>").addClass("l-btn-left l-btn-icon-left")
			icon1	= $("<span>").addClass("l-btn-text l-btn-empty").append($('<p>&nbsp;</p>'));
			icon2	= $("<span>").addClass("l-btn-icon pagination-prev").append($('<p>&nbsp;</p>'));
			td.append(a.append(span.append(icon1).append(icon2)));
			tr.append(td);
			
			for(var i = page.startPageNo ; i <=  page.endPageNo; i++){
				var td 			= $("<td>").addClass("pagination-links");
				var class_attr 	= "pagination-link l-btn l-btn-small l-btn-plain";
				if(i == page.pageNo) class_attr += " l-btn-selected l-btn-plain-selected";
				//var a			= $("<a>").addClass(class_attr).attr("href" , "javascript:$('#pageNo').val('"+i+"');$s.grid.create($s.grid.parameter);");//2020년 SGIS 3차 주석
				var a			= $("<a>").addClass(class_attr).attr("href" , "javascript:$('.pageNo').val('"+i+"');$s.grid.create($s.grid.parameter);");//2020년 SGIS 3차 수정
				var span		= $("<span>").addClass("l-btn-left")
				var label		= $("<span>").addClass("l-btn-text").text(i);
				td.append(a.append(span.append(label.append())));
				tr.append(td);
			}
			
			td 		= $("<td>").addClass("pagination-links");
			//a		= $("<a>").addClass("pagination-link l-btn l-btn-small l-btn-plain").attr("href" , "javascript:$('#pageNo').val('"+page.nextPageNo+"');$s.grid.create($s.grid.parameter);");//2020년 SGIS 3차 주석
			a		= $("<a>").addClass("pagination-link l-btn l-btn-small l-btn-plain").attr("href" , "javascript:$('.pageNo').val('"+page.nextPageNo+"');$s.grid.create($s.grid.parameter);");//2020년 SGIS 3차 수정
			span	= $("<span>").addClass("l-btn-left l-btn-icon-left")
			icon1	= $("<span>").addClass("l-btn-text l-btn-empty").append($('<p>&nbsp;</p>'));
			icon2	= $("<span>").addClass("l-btn-icon pagination-next").append($('<p>&nbsp;</p>'));
			td.append(a.append(span.append(icon1).append(icon2)));
			tr.append(td);
			
			td 		= $("<td>").addClass("pagination-links");
			//a		= $("<a>").addClass("l-btn l-btn-small l-btn-plain ").attr("href" , "javascript:$('#pageNo').val('"+page.nextPageBlockNo+"');$s.grid.create($s.grid.parameter);");//2020년 SGIS 3차 주석
			a		= $("<a>").addClass("l-btn l-btn-small l-btn-plain ").attr("href" , "javascript:$('.pageNo').val('"+page.nextPageBlockNo+"');$s.grid.create($s.grid.parameter);");//2020년 SGIS 3차 수정
			span	= $("<span>").addClass("l-btn-left l-btn-icon-left")
			icon1	= $("<span>").addClass("l-btn-text l-btn-empty").append($('<p>&nbsp;</p>'));
			icon2	= $("<span>").addClass("l-btn-icon pagination-last").append($('<p>&nbsp;</p>'));
			td.append(a.append(span.append(icon1).append(icon2)));
			tr.append(td);
			if(page.totalCount > 0) $(".datagrid-pager").html(table.append(tbody.append(tr))).append('<div class="pagination-info"></div>').append('<div style="clear: both;"></div>');
			else $(".datagrid-pager").html('');
			$(".datagrid-mask , .datagrid-mask-msg").hide();
		}
	}, isRequired : function(_value){
		if($.trim(_value) != null && $.trim(_value) != '' && $.trim(_value)!= undefined) return false;
		else return true;
	}, message : function(_params){
		alert(_params.message);
		return _params.returnValue;
	}, serialize : function(_target){
		var result = {};
		$(_target).find($s.option.selector).each(function(index , elem){
			if(elem.type === 'text'||elem.type === 'textarea'||elem.type ==='select-one'){//2019-02-19 수정
				result[elem.id] = $.trim($(elem).val());
			}else if(elem.type === 'checkbox'){
				if($(this).is(":checked"))result[elem.id] = 'Y';
				else if(!$(this).is(":checked"))result[elem.id] = 'N';
			}else{
				result[elem.id] = encodeURIComponent($.trim($(elem).val()));
			}
		});
		return result;
	}, 
	popup_controller : {
		id 				: '' ,
		name 			: '' ,
		table			: { SubKeyWord : 'SubKeyWordpopupTable' ,LifeCycle : 'lifeCyclepopupTable' , Interests : 'interestspopupTable' , Service : 'servicepopupTable' ,Datainterests:'datainterestspopupTable', KeyWord : 'keyWordpopupTable' , MainKeyWord : 'keyWordpopupTable'} , 
		LifeCycle 		: { elemId : "lifeCycleMapping" 	, column : "lfeCycleId"  			, value : "lfeCycleNm"					,  url : "/api/ststistics/interestsMappingStstisticsUSMng.do"	} , 
		Interests 		: { elemId : "interestsMapping" 	, column : "statDistanceId" 		, value : "statDistanceNm"				,  url : "/api/ststistics/interestsMappingStstisticsUSMng.do"	} , 
		Service 		: { elemId : "serviceMapping" 		, column : "statDataId"  			, value : "statDataNm"					,  url : "/api/ststistics/interestsMappingStstisticsUSMng.do"	} , 
		Datainterests 		: { elemId : "datainterestsMapping" 	, column : "statDistanceId" , value : "statDistanceNm"				, column1 : 'lfeCycleId' , 			value1 : 'lfeCycleNm',	url : "/api/ststistics/interestsMappingStstisticsUSMng.do"	} ,
		SubKeyWord 		: { elemId : "subKeyWordMapping" 	, column : "ctlgSimilrKwrdSerial"  	, value : "ctlgSimilrKwrdSerialNm"		,  url : "/api/ststistics/interestsMappingStstisticsUSMng.do"	} , 
		KeyWord 		: { elemId : "keywordMapping" 		, column : "ctlgMainKwrdSerial"  	, value : "ctlgMainKwrdSerialNm"		,  url : "/api/ststistics/interestsMappingStstisticsUSMng.do"	} , 
		MainKeyWord 	: { elemId : "keywordMapping" 		, column : "ctlgMainKwrdSerial"  	, value : "ctlgMainKwrdSerialNm"		,  url : "/api/ststistics/interestsMappingStstisticsUSMng.do"	} , 
		add : function(){
			this.loop   = true;
			this.id 	= $("#"+this[$s.type].elemId).select2("val");
			var temp = $("#"+this[$s.type].elemId).select2("data");
			this.name 	= temp[0].text
			var dataId = this.id;
			if(dataId.split(",")[1]!=undefined){
				this.id = dataId.split(",")[1];
				this.id1 = dataId.split(",")[0];
			}
			if(!this.name || this.name == '선택'){
				 this.loop = $s.message({message :"추가할 항목을 선택하세요." , returnValue : false});
			}
			
			$("#" + this.table[$s.type]).find("tbody tr").each(function(index, elem){
				if($(this).attr("value") == $s.popup_controller.id&&dataId.split(",")[1]==undefined){
					$s.popup_controller.loop = false;
					return $s.message({message :"이미 선택하신 항목 입니다." , returnValue : false});
				}else if($(this).attr("value") == $s.popup_controller.id&&$(this).attr("value1")== $s.popup_controller.id1){
					$s.popup_controller.loop = false;
					return $s.message({message :"이미 선택하신 항목 입니다." , returnValue : false});
				}
			});
			
			if(this.loop)this.grid();
		}, 
		save : function(){
			if(!confirm("저장 하시겠습니까?"))return false;
			$s.asynchronous({url : this[$s.type].url , data :  "parameter="+ encodeURIComponent(JSON.stringify(this.params(this.table[$s.type]))), callback : function(resBody){
				alert("저장 하였습니다.");
				$s.grid.create($s.grid.parameter);
			}});
		}, 
		params : function(table){
			var result = [];
		    $("#"+table).find("tbody tr").each(function(index , elem){
	    		var temp = {from : $s.type};
	    		temp[$(this).attr("column")] = $(this).attr("value");
	    		if($(this).attr("value1")){
	    			temp[$(this).attr("column1")] = $(this).attr("value1");
	    		}
	    		$.extend(temp , $s.grid.getSelectRowData());
	    		//2020년 SGIS고도화 3차 시작
	    		if($s.trendKwrd != undefined && $s.trendKwrd != null && $s.trendKwrd != ''){
	    			$.extend(temp , {'trendKwrd' : $s.trendKwrd});
	    		}
	    		//2020년 SGIS고도화 3차 끝
	    		result.push(temp);
		    });
		    return result;
		} , 
		grid : function(){
			$("#" + this.table[$s.type] ).find("tbody tr#dataEmpty").remove();
			var tr = $("<tr>").css({"height" : '36px'}).attr("value" ,this.id).attr("column" , this[$s.type].column);
			if(this[$s.type].column1){
				tr.attr("value1",this.id1).attr("column1" ,this[$s.type].column1);
			}
			var td = $("<td>").attr("id", $s.type).css({"text-align" : 'left',  "border-left" : '1px solid #cacaca', "width" : '777px'});
			tr.append(td.append($("<label>").text(this.name)));
			td = $("<td>").css({"text-align" : 'center', "padding" : '5px', "border-left" : '1px solid #cacaca', "width" : '51px'});
			var a = $("<a>").css({"cursor" : 'pointer', "color":'#000',"padding":'7px',"width":'51px',"line-height":'25px'}).addClass("remove_row")
			tr.append(td.append(a.append($("<label>").text("삭제"))));
			$("#" + this.table[$s.type] ).find("tbody").append(tr.append(td));
		},
		clear : function(){
			$("#" + this.table[$s.type]).find("tbody").empty();
		} ,
		dataEmpty : function(){
			var tr = $("<tr>").css({"height" : '36px'}).attr("id" , "dataEmpty");
			var td = $("<td>").attr("colspan" , "3").css({"text-align" : 'center', "padding" : '5px', "border-left" : '1px solid #cacaca', "width" : '602px'});
			tr.append(td.append($("<label>").text("데이터가 존재하지 않습니다.")));
			$("#" + this.table[$s.type] ).find("tbody").append(tr.append(td));
		}
	}
};

$s = ststistics;
window.isRequired = $s.isRequired;
window.serialize = $s.serialize;

$('#popupForm').ajaxForm({ 
	//보내기전 validation check가 필요할경우
	beforeSubmit: function (data, frm, opt) { return true; }, 
	//submit이후의 처리 
	success: function(responseText, statusText){
		$s.process = false; 
		$s.grid.create($s.grid.parameter);
		$("#popup , .popupWrapper").hide();
	}, 
	//ajax error 
	error: function(){ 
		alert("저장에 실패 하였습니다.");
		$s.process = false;
	} 
});

$(document).on("click" , ".remove_row" ,  function(){
	$(this).closest("tr").remove();
});
$(document).on("click","#excel_download", function(){
	var myForm = document.excelDownForm;
	$("#excelDownForm").html("");
	$(".datagrid-view").find("table").find("tr:not(.th)").each(function(){
		var contentData = [];
		$(this).find("td").each(function(i){
			var tmpContentData = $(this).html();
			tmpContentData = tmpContentData.replace(/,/gi, "");
			contentData.push(tmpContentData);
		});
		var excelDataElement = document.createElement("input");
		excelDataElement.type = "hidden";
		excelDataElement.name = "excelData";
		excelDataElement.value = contentData;
		myForm.appendChild(excelDataElement);
	});
	var url = pageContext +  "" +"/api/ststistics/excelDown.do";
	window.open("" , "_self", "enabled"); 
	myForm.action = url; 
	myForm.method="post";
	myForm.target="_self";
	myForm.submit();
	
});

//2020년 SGIS고도화 3차 시작 -달력이벤트
function setDatepickerDefaultRangeNew(startElementId,endElementId) {
	var datepickerObj = new Object();
	datepickerObj['showOn'] = 'both';    // 버튼,텍스트 필드 또는 모두 캘린더에 표시할지 여부를 선택
	datepickerObj['buttonImageOnly'] = true; //  버튼에 있는 이미지만 표시한다
	datepickerObj['buttonImage'] = './../html/include/img/ico/ico_calendar.png'; // 버튼이미지 경로
	datepickerObj['buttonText'] = '달력';   //버튼의 툴팁
	datepickerObj['changeYear'] = true;   //월을 바꿀수 있는 select 박스를 표시
	datepickerObj['changeMonth'] = true;  //년을 바꿀수 있는 select 박스를 표시
	datepickerObj['closeText'] = '선택';
	datepickerObj['showMonthAfterYear'] = true;
	datepickerObj['dayNamesMin'] = [ '일', '월', '화', '수', '목', '금', '토' ];
	datepickerObj['monthNamesShort'] = [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ];
	datepickerObj['onSelect'] = function (value, element){
		if(element.id==startElementId){
			var predate = jQuery("#"+endElementId).val();
			$("#"+endElementId).datepicker("option", "minDate", value);
			$("#"+endElementId).val(predate);
		}else if (element.id==endElementId){
			var predate = jQuery("#"+startElementId).val();
			$("#"+startElementId).datepicker("option", "maxDate", value);
			$("#"+startElementId).val(predate);
		}
	}
	datepickerObj['dateFormat'] = 'yy-mm-dd';
	$("#"+startElementId+",#"+endElementId).datepicker(datepickerObj);
};
//2020년 SGIS고도화 3차 끝 -달력이벤트