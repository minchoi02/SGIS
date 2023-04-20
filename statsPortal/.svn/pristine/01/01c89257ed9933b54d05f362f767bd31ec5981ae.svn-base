//  2020년 SGIS고도화 3차(테마코드) - 테마코드 공통기능 파일 생성 (pse)
//  작성자: 박상언
(function(W, D) {
	
	if(W.$themeCdCommon) {
		console.error('$themeCdCommon (테마코드 공통 기능 객체)가 이미 선언 및 할당되었습니다.');
		return;
	}
	
	W.$themeCdCommon = {
		// 대분류에 대한 정보를 담고 있는 변수 ( 대분류 코드, 대분류 명, 대분류에 속하는 소분류 갯수, 대분류 표출 순서 )
		bigThemeCdList: null,
		
		// 소분류에 대한 정보를 담고 있는 변수 ( 소분류 코드, 소분류 명, 소분류가 속하는 대분류 코드, 소분류가 속하는 대분류 명)
		smallThemeCdList: null,
		
		// $themeCdCommon.bigThemeCdList 에 들어갈 각각의 대분류에 대한 특정 색깔을 지정하는 변수 (주로 파이차트를 그릴 때 사용)
		// 주의: 이 변수는 $themeCdCommon 초기화 이후에  "delete $themeCdCommon.colorList"에 의해서 삭제됩니다.
		//      $themeCdCommon.bigThemeCdList에 있는 값을 $themeCdCommon.colorList에서도 사용하게 되면 변수의 통일성이 없어지므로 이렇게 했습니다.
		colorList: {
			"color_1" :	"#FFC621",
			"color_2" :	"#E8771A",
			"color_3" :	"#1778cc",
			"color_4" :	"#017967",
			"color_5" : "#B2CC19",					
			"color_6" : "#0000FF",	
			"color_7" : "#9900FF",
			"color_8" : "#FF0099"
		},
		
		// 소분류를 위한 색깔 모음 , 최대 17개이다.
		smallColorList : ['#ffc622', '#e8771a', '#1778cc', '#017967', '#2cd35b', '#40694e', '#f11d77', '#60391b', '#ae097c', '#98f714', '#6878d3','#abacab','#DEB887','#800000','#ff8b60','#b0b0b0','#0099a4'],
		
		// 대분류 코드를 의미하는 코드값(ex: H, I, F... 등) 인지 확인하는 메서드
		isBigThemeCd: function(bigThemeCd) {
			return this.bigThemeCdList.some(function(item,index){ return item.b_theme_cd == bigThemeCd})
		},
		
		// 존재하는 소분류 코드값(ex: 1001,1002... 등)인지 확인하는 메서드
		isSmallThemeCd: function(smallThemeCd) {
			return this.smallThemeCdList.some(function(item,index){ return item.theme_cd == smallThemeCd });
		},
		
		
		// 대분류 테마코드를 주입하여 대분류 테마코드와 매핑된 이름을 찾는 메서드
		findBigThemeName: function(bigThemeCd) {
			var result = this.bigThemeCdList.filter(function(item){
							return item.b_theme_cd === bigThemeCd
						 });
			if(result.length === 1) {
				return result[0].b_theme_cd_nm;
			} 
			console.error('존재하지 않는 대분류 코드입니다. 입력하는 대분류 코드를 제대로 기입해주시기 바랍니다.');
			console.log('사용 가능한 대분류 코드값: ',this.bigThemeCdList.map(function(item){return item.b_theme_cd}));
		},
		
		// 대분류 명을 통해서 대분류 코드를 찾는 메서드. findBigThemeName 의 반대
		findBigThemeCd: function(bigThemeCdNm) {
			var result = null;
			this.bigThemeCdList.some(function(item){
			    if(item.b_theme_cd_nm === bigThemeCdNm) {
			        result = item.b_theme_cd;
			        return true;
			    }
			});
			if(result !== null) return result;
			else { 
				console.error('존재하지 않는 대분류 명입니다. 입력하는 대분류 명을 제대로 기입해주시기 바랍니다.');
				console.log('사용 가능한 대분류 명: ',this.bigThemeCdList.map(function(item){return item.b_theme_cd_nm}));
				return result
			}
		},
		
		// 대분류 테마코드 값을 주입하여 해당 대분류의 상세한 데이터를 얻어옵니다.
		findBigThemeDetail: function(bigThemeCd){
			var result = null;
			this.bigThemeCdList.some(function(item,index){
			    if(item.b_theme_cd === bigThemeCd) {
			        result = item
			        return true;
			    }
			})
			return result;
		}
		,
		// 소분류 테마코드 값을 주입하여 해당 소분류에 대한 상세한 데이터값을 얻어오는 메서드
		findSmallThemeDetail: function(themeCd) {	
			var result = null;
			this.smallThemeCdList.some(function(item,index){
			    if( item.theme_cd == themeCd ) {
			        result = item;
			        return true;
			    }
			    return false;
			});
			if(result == null) {
				console.error(themeCd+'은 존재하지 않는 소분류 테마코드입니다.');
			}
			return result;
		},
		
		// 소분류 테마명을 주입하여 해당 소분류에 대한 상세한 데이터값을 얻어오는 메서드
		findSmallThemeDetailByName: function(themeName) {
			var result = null;
			this.smallThemeCdList.some(function(item,index){
			    if( item.s_theme_cd_nm === themeName ) {
			        result = item;
			        return true;
			    }
			    return false;
			});
			if(result == null) {
				console.error(themeName+'은 존재하지 않는 소분류 테마명입니다.');
			}
			return result;
		},
		
		// 대분류 테마코드를 통해서, 대분류의 표출 순서 값 (= order_num) 를 반환하는 메서드
		// 자주 쓰이는 메서드는 아닙니다.
		findBigThemeOrderNumber: function(bigThemeCd) {
			var result = null;
			this.bigThemeCdList.some(function(item,index){
			    if(item.b_theme_cd == bigThemeCd) {
			        result = item.order_no;
			        return true;
			    } 
			});
			return result;
		},
		
		// this.colorList는 현재 객체의 배열에서 값만을 모아서 배열로 반환하는 메서드
		getColorListToArray: function() {
			return this.bigThemeCdList.map(function(item,index){ return item.color; });
		},
		
		// 생활업종현황의 도움말 상자에 쓰이며, 대분류 테마코드를 인자로 넣고 호출하면
		// 해당 대분류에 속하는 소분류 테마의 이름과 코드값 그리고 해당 코드값에 해당하는 10차 산업분류 이름과 번호를 가져온다.
		getCensusAndthemeMappedInfo: function(bigThemeCd,successCallback,beforeCallback,afterCallback) {
			$.ajax({
			    type: "GET",
			    url : contextPath + "/ServiceAPI/bizStats/themeCdHelper.json",
			    data : {service : "selectCensusInfoGroupedByBigThemeCd" , b_theme_cd : bigThemeCd },
			    beforeSend : function() {
			    	if(typeof beforeCallback == 'function') {
			    		beforeCallback.call(null);
			    	}
			    },			    
			    success : function(res) {
			    	if(typeof successCallback == 'function') {
			    		successCallback.call(null,res);
			    	}
			    },
			    complete : function() {
			    	if(typeof afterCallback == 'function') {
			    		afterCallback.call(null);
			    	}
			    },
			    error : function(xhr, status, error) {
			    	console.error(error);
			    },
			    dataType : "json"
			});
		}
		
	};
	
	// end of $themeCdCommon object configuration
	
	
	var link = document.location.href;
	var bigCensusThemeInfo = "selectBigThemeInfo";
	var smallCensusThemeDetail = "selectSmallThemeDetail";
	
	// 만약 생활업종뿐만 아니라 다른 것들(ex: 농림어업, 기업 등등)의 대분류 테마도 필요하다면, 해당 url을 복사해서 아래와 같이 넣어주면 된다.
	if(link.indexOf('/view/indoor/indoorMap?sufid') != -1) {
		bigCensusThemeInfo = "selectBigCensusThemeInfo";
		smallCensusThemeDetail = "selectSmallCensusThemeDetail";
	}
	
	$.ajax({
	    url: contextPath + '/ServiceAPI/bizStats/themeCdHelper.json',
	    type:'get',
	    data:{service: bigCensusThemeInfo},
	    async: false,		// 안전하게 사용하기 위한 async, 없어도 동작은 함
	    success:function(data){
	    	$themeCdCommon.bigThemeCdList = data.result;
	    	$themeCdCommon.bigThemeCdList.forEach(function(item,index){
	    		item['color'] = $themeCdCommon.colorList['color_'+(index+1)]; 
	    	});
	    	delete $themeCdCommon.colorList;
	    },
	    error:function(request, status, error) {
	    	console.error('themeCdCommon.js 에서 bigThemeCdList 변수 초기화에 문제가 생겼습니다.');
	    }
	});
	
	$.ajax({
	    url: contextPath + '/ServiceAPI/bizStats/themeCdHelper.json',
	    type:'get',
	    data:{service: smallCensusThemeDetail},
	    async: false,		// 안전하게 사용하기 위한 async, 없어도 동작은 함
	    success:function(data){
	    	$themeCdCommon.smallThemeCdList = data.result;
	    },
	    error:function(request, status, error) {
	    	console.error('themeCdCommon.js 에서 smallThemeCdList 초기화에 문제가 생겼습니다.');
	    }
	});
	
	
}(window, document));
