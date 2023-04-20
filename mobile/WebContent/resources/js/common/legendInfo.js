/**
 * 범례에 관한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2015/09/08 초기 작성 author : 김성현 version : 1.0 see :
 * 
 */
(function(W, D) {
	W.sLegendInfo = W.sLegendInfo || {};
	sLegendInfo = {
		legendInfo : function(map) {
			var that = this;
			this.map = map;
			this.legendType = "auto";//auto : 자동범례,equal : 균등범례
			this.lv = 7;//범례 구간
			this.legendValue={auto : null,equal : null,user : [[100, 200, 300, 400, 500, 600, 700]]};
			this.legendColor = ["#ffd75d", "#f7ba50", "#f09e43", "#e98236", "#e26529", "#db491c", "#d42d0f", "#cd1103", "#ffd75d"];//범례 색상
			this.chooseLegendColor = [
			 {"background":"#f16b41","start":"#ffd75d","end":"#cd1103"},
			 {"background":"#dc476f","start":"#cccccc","end":"#7a0021"},
			 {"background":"#539c3f","start":"#eaf5c0","end":"#0e4000"},
			 {"background":"#598aac","start":"#cccccc","end":"#004574"},
			 {"background":"#7d63ad","start":"#cccccc","end":"#230064"}
			];//범례 옵션창에서 선택할 수 있는 색상
			this.useNegative = false;//음수값 적용 유무
			this.legendPanel = null;//범례창
			this.legendOptionPanel = null;//범례 옵션 창
			this.negativeLegendColor = null;//범례 색상
			this.valPerSlice = null;//범례 평균 값
			this.width = $(window).width();
			$(window).resize(function(){
				if(that.width!=$(this).width()){
					that.width = $(this).width();
					that.legendPanel.css({"width":that.width});
				}
			});
			/**
			 * @name          : createLegendControl
			 * @description   : 범례 창 생성
			 * @date          : 2016. 03. 24. 
			 * @author        : 나광흠
			 * @history       :
			 */
			this.createLegendControl = function() {
				that.setLegendColor(that.chooseLegendColor[0].start,that.chooseLegendColor[0].end);
				var legendPanel = sop.control({
					position: 'bottomleft'
				});
				legendPanel.onAdd = function(map) {
					this._div = sop.DomUtil.create('div', 'legend-panel');
					sop.DomEvent.disableClickPropagation(this._div);
					$(this._div).css({"margin":"0px","width":that.width, "bottom":"0px", "position":"absolute"});
					return this._div;
				};
				legendPanel.addTo(map.gMap);
				this.legendPanel = $(legendPanel._div);
				this.legendPanel.find("li").click(function(){
					try{
						this.legendPanel.find("li").tooltip("hide");
					}catch(e){
						//tooltip이 없을때입니다
					}
				});
				this.createLegendOptionColtrol();
				this.addLegendItem();
			};
			/**
		     * @name         : createLegendOptionColtrol
		     * @description  : 범례 컨트롤러 생성
		     * @date         : 2016. 03. 25. 
		     * @author	     : 나광흠
		     */
			this.createLegendOptionColtrol = function(){
				var legendOptionPanel = sop.control({
					position: 'bottomright'
				});
				legendOptionPanel.onAdd = function(map) {
					this._div = sop.DomUtil.create('div', 'legend-option-panel');
					sop.DomEvent.disableClickPropagation(this._div);
					$(this._div).css({"display":"none"});
					var html = "";
					html+='	<div id="legend-option-'+that.map.id+'" class="remarks_option">';
					html+='		<div class="remarks_option_in">';
					html+='			<p class="roption_tit">범례설정</p>';
					html+='			<table>';
					html+='				<caption>범례설정</caption>';
					html+='				<colgroup>';
					html+='					<col style="width:60px;">';
					html+='					<col style="width: ;"> </colgroup>';
					html+='				<tbody>';
					html+='					<tr>';
					html+='						<th scope="row">컬러</th>';
					html+='						<td>';
					html+='							<ul class="colorck">';
					$.each(that.chooseLegendColor,function(cnt,node){
						html+='<li><a class="circle '+(cnt==0&&!that.useNegative?'active':'')+'" style="background-color:'+node.background+';" href="javascript:void(0)" data-start="'+node.start+'" data-end="'+node.end+'" data-original-start="'+node.start+'" data-original-end="'+node.end+'" data-negative="false"></a></li>';
					});
					if(that.useNegative){
						html+='							<li><a class="circle active" style="background-color:#cccccc;" href="javascript:void(0)" data-negative="true"></a></li>';
					}
					html+='							</ul>';
					html+='						</td>';
					html+='					</tr>';
					html+='					<tr>';
					html+='						<th scope="row">분류</th>';
					html+='						<td style="padding-top:10px;">';
					if(that.useNegative){
						html+='							<label><input type="radio" name="selectEvenLegend_'+that.map.id+'" value="negative" checked="checked" onclick="javascript:srvLogWrite(\'O0\', \'01\', \'05\', \'04\', \'분할범례\', \'\');"> 분할범례 &nbsp;&nbsp;</label>';
					}else{
						html+='							<label><input type="radio" name="selectEvenLegend_'+that.map.id+'" value="auto" checked="checked" onclick="javascript:srvLogWrite(\'O0\', \'01\', \'05\', \'04\', \'자동범례\', \'\');"> 자동범례 &nbsp;&nbsp;</label>';
					}
					html+='							<label><input type="radio" name="selectEvenLegend_'+that.map.id+'" value="equal" onclick="javascript:srvLogWrite(\'O0\', \'01\', \'05\', \'04\', \'균등범례\', \'\');"> 균등범례</label><br><br> ';
					html+='						</td>';
					html+='					</tr>';
					html+='				</tbody>';
					html+='			</table>';
					html+='			<div class="btn_roption">';
					html+='				<a class="bg_blue">적용</a>';
					html+='				<a onclick="$(this).parents(\'.legend-option-panel\').hide();">취소</a>';
					html+='			</div>';
					html+='		</div>';
					html+='		<span class="arrow_remark"><img src="'+contextPath+'/resources/images/map/common/icon_arrow_down.png" alt=""></span>';
					html+='		<a class="remark_btn_close" onclick="$(this).parents(\'.legend-option-panel\').hide();"><img src="'+contextPath+'/resources/images/common/btn_layer_close.gif" alt="close"></a>';
					html+='	</div>';
					$(this._div).append(html);
					return this._div;
				};
				legendOptionPanel.addTo(map.gMap);
				$("#legend-option-"+that.map.id+" .colorck a").click(function(){
					srvLogWrite('O0', '01', '05', '02', $("this").css('background-color'), '');
					var parent = $(this).parents(".legend-option-panel");
					parent.find(".colorck a").removeClass("active");
					$(this).addClass("active");
					return false;
				});
				$("#legend-option-"+that.map.id+" .btn_roption>.bg_blue").click(function(){

					console.log("[legendInfo.js] #legend-option-      범례설정 적용버튼 클릭됨");
					
					if(document.location.href.match("thematic")){
						srvLogWrite("M0", "04", "03", "04", "", "");		//주제도 범례 설정
					}else if(document.location.href.match("interactive")){
						srvLogWrite("M0", "05", "02", "08", "", "");		//대화형통계지도 범례 설정
					}else if(document.location.href.match("house")){
						srvLogWrite("M0", "06", "04", "05", "", "");		//살고싶은 우리동네 범례 설정
					}else if(document.location.href.match("biz")){
						srvLogWrite('M0','07', '03', '03', '', '');			//우리동네 생활업종 범례설정
					}else if(document.location.href.match("workroad")){
						if(document.location.href.match("todayStatusMap")){
							srvLogWrite('M0','10','05','00','','');         // 범례 설정(오늘의 구인현황)
						}else if(document.location.href.match("statsAnlsMap")){
							srvLogWrite('M0','11','04','00','','');         // 범례 설정(일자리 통계정보)
						}						
					}
					
					
					var parent = $(this).parents(".legend-option-panel");
					var activeElement = parent.find(".colorck a.active");
					if(activeElement.data("negative")){
						that.setLegendColor(that.negativeLegendColor[0],that.negativeLegendColor[that.negativeLegendColor.length-1]);
					}else{
						that.setLegendColor(activeElement.data("start"),activeElement.data("end"));
					}
					that.setLegendType(parent.find("input[name^=selectEvenLegend_]:checked").val());	//균등 equal 분한 auto
					that.updateLegendRangeColor();
					
					//2017.11.29 범례 적용 이경현
					if(map.data.length != 0){
						that.calculateLegend(map.data);
					}
					console.log("[legendInfo.js] #legend-option- map.dataBoundary [" + map.dataBoundary);
					that.map.updatePolygonGeoJson(map.dataBoundary?"data":"polygon",true);
					
					parent.hide();
					return false;
				});
				this.legendOptionPanel = $(legendOptionPanel._div);
			}
			/**
		     * @name         : addLegendItem
		     * @description  : 범례 아이템 추가
		     * @date         : 2016. 03. 25. 
		     * @author	     : 나광흠
		     */
			this.addLegendItem = function(){
				this.legendPanel.empty();
				var ul = $("<ul/>");
				for(var i=1;i<=this.lv;i++){
					ul.append($("<li/>",{"style":"width:"+(100/this.lv)+"%;background-color:"+this.legendColor[i]+";"}).append($("<span/>",{"text":fillText(i,2)+"Lv"})));
				}
				ul.append($("<li/>",{"style":""}).append($("<img/>",{"src":contextPath+"/resources/images/icon/icon_setting_color.png","style":"width:20px; position:absolute; top:2px; right:5px;"})).click(function(){
					that.legendOptionPanel.show();
					return false;
				}));
		//통계소통지도 범례 삭제
				if(typeof(communityMapInfo) == "undefined"){
					this.legendPanel.append(ul);
				}
			}
			/**
		     * @name         : calculateLegend
		     * @description  : 범례를 계산한다.
		     * @date         : 2015. 10. 09. 
		     * @author	     : 최재영
		     * @history      : 권차욱 수정
		     * @param arData : 통계데이터
		     */
			this.calculateLegend = function(arData) {
				if (arData == null || arData[0].length == 0) {
					return;
				}
				this.data = arData;
				this.legendValue.equal = [];
				this.legendValue.auto = [];
				
				//데이터 중복제거
				for (var i=0; i<arData.length; i++) {
					var tmpData = [];
					$.each(arData[i], function(k, el){
						if($.inArray(el, tmpData) === -1) tmpData.push(el);
					});
					arData[i] = tmpData;
				}
				
				for (var i=0; i<arData.length; i++) {
					var tmpData = arData[i];
					for (var x=0; x<tmpData.length; x++) {
						tmpData[x] = parseFloat(tmpData[x].toFixed(2));
					}
				}
				this.calNegativeLegend(arData);
				this.calEqualLegend(arData);	//균등범례
				this.calAutoLegend(arData);		//자동범례
				this.calUserLegend();			//사용자지정범례
				
				if(this.legendType =="auto"){
					that.valPerSlice = this.legendValue.auto;
				}else if(this.legendType =="equal"){
					that.valPerSlice = this.legendValue.equal;
				}else if (this.legendType == "negative") {
					that.valPerSlice = this.legendValue.negative;
				}else{
					that.valPerSlice = this.legendValue.user;
				}
				this.updateLegendRangeText();
			};
			/**
		     * @name         : updateLegendRangeText
		     * @description  : 범례 값 변경
		     * @date         : 2016. 03. 25. 
		     * @author	     : 나광흠
		     */
			this.updateLegendRangeText = function(){
				var tmpData = [];
				var valPerSlice;
				if(this.legendType =="auto"){
					valPerSlice = this.legendValue.auto;
				}else if(this.legendType =="equal"){
					valPerSlice = this.legendValue.equal;
				}else if (this.legendType == "negative") {
					valPerSlice = this.legendValue.negative;
				}else{
					valPerSlice = this.legendValue.user;
				}
				$.each(valPerSlice, function(k, el){
					if($.inArray(el, tmpData) === -1) tmpData.push(el);
				});
				if(this.legendPanel&&this.legendPanel!=null){
					for(var i=0;i<that.lv;i++){
						var text = "";
						var min = 0;
						var max = 0;
						min = that.valPerSlice[0][i];
						max = that.valPerSlice[0][i+1];
						if(i==0){
							text=appendCommaToNumber(max)+" 이하";
						}else if(i==that.lv-1){
							text=appendCommaToNumber(min)+" 초과";
						}else{
							text=appendCommaToNumber(min)+"~"+appendCommaToNumber(max);
						}
						that.legendPanel.find("li:eq("+i+")").attr({
							"title":text
						}).data("min",min).data("max",max).click(function(){
							try{
								that.legendPanel.find("li").tooltip("hide");
								$(this).tooltip("show");
							}catch(e){
								//tooltip이 없을때입니다
							}
							return false;
						});
						that.legendPanel.find("li:eq("+i+")>span").attr("title",text).text(text);
					}
				}
				that.legendPanel.find("li").removeClass("M_on");
				try{
					that.legendPanel.find("li").tooltip("destroy");
				}catch(e){
					//tooltip이 없을때입니다
				}
			}
			/**
		     * @name         : updateLegendRangeColor
		     * @description  : 범례 색상 변경
		     * @date         : 2016. 03. 25. 
		     * @author	     : 나광흠
		     */
			this.updateLegendRangeColor = function(){
				$.each(this.legendPanel.find("li:not(:last)"),function(cnt,node){
					$(node).css({"background-color":that.legendColor[cnt]});
				});
			}
			/**
			 * 
			 * @name         : jenks
			 * @description  : 자동범례를 계산한다.(외부 알고리즘)
			 * @date         : 2015. 10. 15. 
			 * @author	     : 최재영
			 * @history 	 : 권차욱
			 * @param data	 : 통계데이터
			 * @param n_classes : 현재 범례레벨 - 1	
			 */
			this.jenks = function(data,n_classes){
				n_classes = parseInt(n_classes);
				data = data.slice().sort(function (a, b) { return a - b; });
				var matrices = that.jenksMatrices(data, n_classes),
	            lower_class_limits = matrices.lower_class_limits;
	            var k = data.length - 1;
	            var kclass = [];
	            var countNum = n_classes;
	            	            
	            if (data.length < n_classes+1) {
	            	valPerSlice = data;
	            	var tmpValperSlice = [];
	            	for (var i=0; i<n_classes+1; i++) {
	            		if (data.length == 1) {
	            			var max = data[0];
	            			if (max < 0) {
	            				var gap = (0 - max)/n_classes
	            				tmpValperSlice.push(max+(gap*i));
	            			}else {
	            				tmpValperSlice.push(max+(max*i));
	            			}
	            		}else {
	            			if (i == 0) {
	            				var min = Math.min.apply(null, data);
	        					var max = Math.max.apply(null, data);
	        					var gap = (max - min)/n_classes; 
	            			}
	            			
	            			if (min < 0 ) {
	            				if (gap < 0) {
	            					tmpValperSlice.push(min-(gap*i));
	            				} else {
	            					tmpValperSlice.push(min+(gap*i));
	            				}
	            			}else {
	            				tmpValperSlice.push(min+(gap*i));
	            			}
	            			
	            			if (i == n_classes) {	
	            				tmpValperSlice.pop();
	            				tmpValperSlice.push(max);
	            			}
	            		}
	            	}
	            	
	            	valPerSlice = tmpValperSlice;
	            	for (var i=0; i<valPerSlice.length; i++) {
	            		valPerSlice[i] = parseFloat(valPerSlice[i].toFixed(2));
	            	}

	            	return valPerSlice;
	            }
	            
				kclass[n_classes] = data[data.length - 1];
				kclass[0] = data[0];

				while (countNum > 1) {
					kclass[countNum - 1] = data[lower_class_limits[k][countNum] - 1];
					k = lower_class_limits[k][countNum] - 1;
					if (k < 0) {
						k = 0;
					}
					countNum--;
				};
				
				for (var i=0; i<kclass.length; i++) {
					kclass[i] = parseFloat(kclass[i].toFixed(2));
				}
				
				return kclass;
			};
			/**
			 * 
			 * @name         : jenksMatrices
			 * @description  : 자동범례를 계산한다.(외부 알고리즘)
			 * @date         : 2015. 10. 15. 
			 * @author	     : 최재영
			 * @history 	 : 권차욱
			 * @param data	 : 통계데이터
			 * @param n_classes : 현재 범례레벨 - 1	
			 */
			this.jenksMatrices = function(data, n_classes){
				var lower_class_limits = [],
	            variance_combinations = [],
	            i, j,
	            variance = 0;

				for (i = 0; i < data.length + 1; i++) {
					var tmp1 = [], tmp2 = [];
					for (j = 0; j < n_classes + 1; j++) {
						tmp1.push(0);
						tmp2.push(0);
					}
					lower_class_limits.push(tmp1);
					variance_combinations.push(tmp2);
				}

				for (i = 1; i < n_classes + 1; i++) {
					lower_class_limits[1][i] = 1;
					variance_combinations[1][i] = 0;
				
					for (j = 2; j < data.length + 1; j++) {
						variance_combinations[j][i] = Infinity;
					}
				}

				for (var l = 2; l < data.length + 1; l++) {
					var sum = 0,
	                sum_squares = 0,
	                w = 0,
	                i4 = 0;

		            for (var m = 1; m < l + 1; m++) {
		                var lower_class_limit = l - m + 1,
		                    val = data[lower_class_limit - 1];	                
		                	w++;
		                	sum += val;
		                	sum_squares += val * val;
		                	variance = sum_squares - (sum * sum) / w;
		                	i4 = lower_class_limit - 1;
	
		                	if (i4 !== 0) {
		                		for (j = 2; j < n_classes + 1; j++) {
		                			if (variance_combinations[l][j] >=
		                				(variance + variance_combinations[i4][j - 1])) {
		                					lower_class_limits[l][j] = lower_class_limit;
		                					variance_combinations[l][j] = variance +
		                					variance_combinations[i4][j - 1];
		                			}
		                    }
		                }
		            }
		            lower_class_limits[l][1] = 1;
		            variance_combinations[l][1] = variance;
		        }

		        return {
		            lower_class_limits: lower_class_limits,
		            variance_combinations: variance_combinations
		        };
			};
			/**
		     * @name         : calNegativeLegend
		     * @description  : 음수/양수범례를 계산한다.
		     * @date         : 2015. 10. 09. 
		     * @author	     : 권차욱
		     * @history      : 권차욱 수정
		     * @param arData : 통계데이터
		     */
		    this.calNegativeLegend = function(arData) {
				var negativeData = null;
				var positiveData = null;
				var colorList = null;
				var tmpNegativeData = [], tmpPositiveData = [], tmpValPerSlice = [];
				this.isNegative = false;
				for (var i=0; i<arData.length; i++) {
					for (var k=0; k<arData[i].length; k++) {
						if (parseFloat(arData[i][k]) <= 0) {
							this.isNegative = true;
							if (negativeData == null) {negativeData = [];}
							negativeData.push(arData[i][k]);
						}else {
							if (positiveData == null) {positiveData = [];}
							positiveData.push(arData[i][k]);
						}
					}	
				}
				/*if (negativeData != null && negativeData.length == 1 && negativeData[0] == 0) {
					this.isNegative = false;
					negativeData = [];
					nagativeLv = 0;
				}*/
					
				//양수만 존재할 경우
				if (!this.isNegative) {
					$.each(positiveData, function(i, el){
						if($.inArray(el, tmpPositiveData) === -1) tmpPositiveData.push(el);
					});
					positiveData = tmpPositiveData;
					
					tmpValPerSlice[0] = [];
					var tmpResult = that.jenks(positiveData, parseInt(that.lv)); //2016.04.04 범례
					for (var i=0;i <tmpResult.length; i++) {
						tmpValPerSlice[0].push(tmpResult[i]);
					}
					
					if (colorList == null) {colorList = [];}
					var colorList2 = getCalculColor("#ffd75d", "#cd1103", that.lv);
					for (var i=0; i<colorList2.length; i++) {
						colorList.push(colorList2[i]);
					}
				}else {
					//음수/양수 데이터가 모두 존재할 경우
					if (positiveData != null) {
						//데이터 중복제거
						$.each(negativeData, function(i, el){
							if($.inArray(el, tmpNegativeData) === -1) tmpNegativeData.push(el);
						});
						$.each(positiveData, function(i, el){
							if($.inArray(el, tmpPositiveData) === -1) tmpPositiveData.push(el);
						});
						negativeData = tmpNegativeData;
						positiveData = tmpPositiveData;
							
						var lv = Math.floor((parseInt(that.lv))/2); //2016.04.04 범례
						var nagativeLv = 0;
						var positiveLv = 0;
						if (lv % 2 != 0) {
							nagativeLv = lv;
							positiveLv = lv+1;
						}else {
							nagativeLv = lv;
							positiveLv = lv;
							
							//2016.03.17 수정 - 분할범례 버그수정
							if (that.lv == 5) {
								positiveLv = lv+1;
							}
						}
						
						tmpValPerSlice.push(that.jenks(negativeData, nagativeLv)); //2016.04.04 범례
						tmpValPerSlice[0].pop();
						tmpValPerSlice[0].push(0);
						
						var tmpResult = that.jenks(positiveData, positiveLv-1); //2016.04.04 범례
						for (var i=0;i <tmpResult.length; i++) {
							tmpValPerSlice[0].push(tmpResult[i]);
						}
						
						this.nagativeLv = nagativeLv;
						this.positiveLv = positiveLv;
						colorList = getCalculColor("#0066aa", "#434471", nagativeLv);
//						var colorList2 = getCalculColor("#663240", "#cc0000", positiveLv);
						var colorList2 = getCalculColor("#ffd75d", "#cd1103", 10-nagativeLv);
						for (var i=0; i<colorList2.length; i++) {
							colorList.push(colorList2[i]);
						}
					}
					//음수만 존재할 경우
					else {
						//데이터 중복제거
						$.each(negativeData, function(i, el){
							if($.inArray(el, tmpNegativeData) === -1) tmpNegativeData.push(el);
						});
						negativeData = tmpNegativeData;
						
						tmpValPerSlice[0] = [];
						var tmpResult = that.jenks(negativeData, parseInt(that.lv)); //2016.04.04 범례
						for (var i=0;i <tmpResult.length; i++) {
							tmpValPerSlice[0].push(tmpResult[i]);
						}
						
						if (colorList == null) {colorList = [];}
//						var colorList2 = getCalculColor("#0066aa", "#434471", that.lv);
						var colorList2 = getCalculColor("#ffd75d", "#cd1103", that.lv);
						for (var i=0; i<colorList2.length; i++) {
							colorList.push(colorList2[i]);
						}
					}
				}
					
				this.negativeLegendColor = colorList;
				this.legendValue.negative = tmpValPerSlice;
			};
			/**
		     * @name         : calEqualLegend
		     * @description  : 균등범례를 계산한다.
		     * @date         : 2015. 10. 09. 
		     * @author	     : 권차욱
		     * @history      : 
		     * @param arData : 통계데이터
		     */
			this.calEqualLegend = function(arData) {
				var equalMin, equalMax; 
				var tmpValPerSlice = [];
				for ( var k = 0; k < arData.length; k++) {
					if (arData[k].length == 1) {
						var data = arData[k][0];
						var tmpResult = new Array();
						for ( var x = 0; x < that.lv+1; x++) { //2016.04.04 범례
							var value = data+(data*x);
							tmpResult.push(parseFloat((value.toFixed(2))));
						}
						tmpValPerSlice[k] = tmpResult;
					}else {
						var min = Math.min.apply(null, arData[k]);
						var max = Math.max.apply(null, arData[k]);
						equalMin = min;
						equalMax = max;
								
						var result = (max - min) / (that.lv);//2016.04.04 범례
						if (result == 0 && min != max) {
							result = 1;
						}
								
						var tmpResult = new Array();
						for ( var y=0; y <that.lv; y++) { //2016.04.04 범례
							if (result == 1 && min != max) {
								tmpResult.push(result);
							}else {
								tmpResult.push(parseFloat((min+result * y).toFixed(2))); //그래서 303 + 57* 
							}
						}
						tmpValPerSlice[k] = tmpResult;
					}
					
				}
				this.legendValue.equal = tmpValPerSlice;
			};
			/**
		     * @name         : calAutoLegend
		     * @description  : 자동범례를 계산한다.
		     * @date         : 2015. 10. 09. 
		     * @author	     : 권차욱
		     * @history      : 
		     * @param arData : 통계데이터
		     */
			this.calAutoLegend = function(arData) {
				var tmpValPerSlice = [];
				for(var i = 0; i < arData.length; i++){
					var tmpResult = that.jenks(arData[i], that.lv); //2016.04.04 수정
					tmpValPerSlice.push(tmpResult);
				}
				this.legendValue.auto = tmpValPerSlice;
			};
			/**
		     * @name         : calUserLegend
		     * @description  : 사용자범례를 계산한다.
		     * @date         : 2015. 10. 09. 
		     * @author	     : 권차욱
		     * @history      : 
		     */
			this.calUserLegend = function() {
				//사용자범례가 지정되어 있지 않을 경우,
				//자동범례로 초기화한다.
				if (this.legendType != "user") {
					var tmpValPerSlice = this.legendValue.auto;
					this.legendValue.user = tmpValPerSlice;
				}
			};
			/**
		     * @name         : getColor
		     * @description  : 범례의 레벨별 텍스트를 설정한다.
		     * @date         : 2015. 10. 09. 
		     * @author	     : 최재영
		     * @history      : 권차욱 수정
		     * @param value  : 통계데이터
		     * @param valPerSlice : 범례기준데이터
		     */
			this.getColor = function(value, valPerSlice) {
				//음수/양수 분할
				var activeElement = $("#legend-option-"+that.map.id+" .colorck a.active");
				if (this.legendType == "negative" && this.negativeLegendColor != null && this.useNegative && activeElement.data("negative")) {
					this.legendColor = this.negativeLegendColor;
				}
				if (valPerSlice.length < this.lv && that.legendType == "auto") {
					for (var i=0; i<valPerSlice.length; i++) {
						if (value == valPerSlice[i]) {
							return [ that.legendColor[i], i+1 ];
						}
					}
				}else {
					var returnLevel=0;
					for(var i = 1; i<valPerSlice.length;i++){ //2016.04.04 범례
						if(value <= valPerSlice[i]){
							return [$.trim(that.legendColor[i-1]), i-1]; //2016.04.04 범례
						}
					}
					return [$.trim(that.legendColor[that.lv-1]), that.lv]; //2016.04.04 범례
				}
			};
			/**
		     * @name         : legendColor
		     * @description  : legendColor 셋팅
		     * @date         : 2016. 03. 18. 
		     * @author	     : 나광흠
		     * @param c01    : 시작 색상
		     * @param c02    : 종료 색상
		     */
			this.setLegendColor = function(c01, c02){
				var arrColor = new Array();
				
				//legend 변수 세팅
				this.legendColor = new Array();

				for ( var i = 0; i < this.lv+1; i++) {
					var paramColor = $.xcolor.gradientlevel(c01, c02, i, this.lv);
					arrColor.push(paramColor);
				} 
				arrColor.push( $.xcolor.gradientlevel(c01, c02, 0, 1));
				for ( var i = 0; i < arrColor.length; i++) {
					this.legendColor[i] = arrColor[i].getColor();
				}
			};
			/**
		     * @name         : reverse
		     * @description  : 색상 반전
		     * @date         : 2016. 03. 25. 
		     * @author	     : 나광흠
		     */
			this.reverse = function(){
				$interactive.ui.map.legend.legendColor.reverse();
			};
			/**
		     * @name         : setLegendType
		     * @description  : 범례 타입 변경
		     * @date         : 2016. 03. 25. 
		     * @author	     : 나광흠
		     * @param type   : type
		     */
			this.setLegendType = function(type){
				that.legendType = type;
				that.valPerSlice = that.legendValue[type];
			}
		}
	}
	function getCalculColor(sColor, eColor, lv) {
		var colorList = [];
		for ( var i = 0; i < lv; i++) {
			var paramColor = $.xcolor.gradientlevel(sColor, eColor, i, lv);
			if (i==0) {
				colorList.push(sColor);
			}else {
				colorList.push(paramColor.getColor());
			}
		} 
		return colorList;
	}
}(window, document));
