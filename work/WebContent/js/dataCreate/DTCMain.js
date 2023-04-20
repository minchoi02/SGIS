/**
Date : 2018.04.27
 * Author : 최재영
 * Etc : ext js 제거로 인해 기존에 있던 함수를 새로 작성   
 * 		DTC 데이터 생성에서 사용
 */
(function(W,D){
	W.$DTCMain = W.$DTCMain || {};
	
	$(document).ready(function(){
		$DTCMain.ui.onRender();
	});
	
	$DTCMain.model = null;
	
	$DTCMain.ui = {
			
		file_nm : "",
		onRender : function(){
			$DTCMain.event.setUIEvent();
		},
		
		fileChange: function (obj) {
			var self = obj;
			var file_path = $(self).val();
			var file_accept = '';
			var file_nm = '';
			var data_type = $DTCMain.ui.getDataType();
			
			if(file_path){
				file_nm = file_path.substring(file_path.lastIndexOf('\\') + 1, file_path.length);
				if(data_type != 'SHP'){
					console.log(obj);
					console.log(file_nm);
					$DTCMain.ui.file_nm = file_nm;
					$DTCMain.ui.fileRead(obj);
					
				}else{
					//shp 파일
				}
			}
		},
		
		
		
		returnFiles : function(data_type){
			var files = (( data_type == 'SHP' ) ?
                    $('input[name="multiFile"]') : $('input[name="oneFile"]'));

                return files;
		},
		encodingclick: function (obj) {
			
		},
		
		
		getDataType : function(){
			var name = $('input:radio[name="data_type"]').filter('[checked="checked"]').val();
			return name;
		},
		
		setDataType : function(type){
			$('input:radio[name="data_type"]').attr('checked', false);
			$('input:radio[name="data_type"]').filter('[value="'+type+'"]').attr('checked', "checked");
			$('input:radio[name="data_type"]').filter('[value="'+type+'"]').prop('checked', "checked");
			
			switch(type){
				case "TEXT" : 
					$("#oneFileUpload").show();
					$("#multiFileUpload").hide();
					$('#inputFile').attr('accept', '.txt, .csv');
					break;
				case "EXCEL" :
					$("#oneFileUpload").show();
					$("#multiFileUpload").hide();
					$('#inputFile').attr('accept', '.xlsx');
					break;
				case "SHP" : 
					$("#oneFileUpload").hide();
					$("#multiFileUpload").show();
					break;
			}
		},
		
		fileRead : function(obj){
			var self = obj;
			var data_type = $DTCMain.ui.getDataType();
			var postObj = {};
			postObj.url = '';
			console.log("data_type = " + data_type);
			if(data_type =="TEXT"){
				postObj.url = contextPath + '/view/service/dc/readText';
			}else if(data_type == "EXCEL"){
				postObj.url =contextPath + '/view/service/dc/readExcel';
			}else{
				return;
			}
			console.log("data_type = " + data_type);
			postObj.name = "fileForm";
			postObj.data = {};
			
			postObj.after = function(res){
				
				
					var data_type = $DTCMain.ui.getDataType();
					
					var textArea = res.result;
					
					$("#file_path").val($DTCMain.ui.file_nm);
					
					
					if(data_type == "TEXT"){
						
						$("#textPreview").html(textArea);
					}/*else if(data_type == "EXCEL"){
						
						var  values = jsonText.message.values;
	                    var html ='';
	                       	html += '<table class="backgrid">';
	                        html += '	<tbody>';
	                        
	                    	$.each(values,function(index){
	                    		var items = values[index];
	                    		html += '<tr>'
	                    		$.each(items,function(i){
	                    			html += '	<td class="string-cell renderable">' + items[i] + '</td>';
	                    		});
	                    		html += '<td></td>'
	                    		html += '</tr>'
	                    	});
	                    	
	                    	html += '	</tbody>';
                            html += '</table>';
                            
                            $("#preview-wrap-excel").html(html);
	                    
					}*/
					
					/*$("#li-choice").removeClass("todo");
					$("#li-choice").addClass("done");*/
					
				
				
			}
			formSend(postObj);
		},
		
		
		
	};
	
	
	$DTCMain.event = {
			
			/**
			 * 
			 * @name : setUIEvent
			 * @description : 페이지가 최초 생성될때 event 설정
			 * @date : 
			 * @author : 
			 * @history :
			 * @param
			 */
			setUIEvent : function(){
				
				$('input:radio[name="data_type"]').off().on("click",function(){
					$DTCMain.ui.setDataType(this.value);
				});
				$("input[type=file]").off().on("change",function(){
					$DTCMain.ui.fileChange(this);
				});
				
			},
			
			
			
			
	};
	
	$DTCMain.data = {
			inputCoord : [
		        { value : '5180', label : 'TM 서부 (5180)' },
		        { value : '5181', label : 'TM 중부 (5181)' },
		        { value : '5183', label : 'TM 동부 (5183)' },
		        { value : '5184', label : 'TM 동해 (5184)' },

		        { value : '5185', label : 'TM 서부 (5185)' },
		        { value : '5186', label : 'TM 중부 (5186)' },
		        { value : '5187', label : 'TM 동부 (5187)' },
		        { value : '5188', label : 'TM 동해 (5188)' },

		        { value : '4326', label : '경위도 WGS84 (4326)' },
		        { value : '4166', label : '경위도 WGS84 (4166)' },

		        { value : '5178', label : 'KATEC (5178)' }
		    ],
			
	}
	
}(window,document));