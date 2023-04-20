var colorsAr = [
    'rgb(79, 121, 166,0.4)',
    'rgb(160, 202, 231,0.4)',
    'rgb(241, 144, 56,0.4)',
    'rgba(255,99,132,0.2)',
    'rgb(254, 191, 129,0.4)',
    'rgba(241, 206, 105,0.4)',
    ];

var colorsArBorder = [        
	'rgb(79, 121, 166,1.0)',
    'rgb(160, 202, 231,1.0)',
    'rgb(241, 144, 56,1.0)',
    'rgba(255,99,132,1)',
    'rgb(254, 191, 129,1.0)',
    'rgba(241, 206, 105,1.0)'
    ];

var colorRed = ['rgba(255,99,132,1)','rgba(255,99,132,0.2)'];
var colorOrange = ['rgb(241, 144, 56,1.0)','rgb(241, 144, 56,0.4)'];
var colorBlue = ['rgba(54,162,235,1)','rgba(54,162,235,0.2)'];
var colorGray = ['rgba(195, 201, 205,1)','rgba(195, 201, 205,0.5)'];
var colorYellow = ['rgba(241, 206, 105,1.0)','rgba(241, 206, 105,0.4)'];
let color1 = 'rgba(255,99,132,0.2)'
let color2 = 'rgba(54,162,235,0.2)'
let cTrans1 = 'rgba(255,99,132,1)'
let cTrans2 = 'rgba(54,162,235,1)'

let ltrsList  = [];
let mident    = [];
let smlpz     = [];
let smltrdids = [];

let chartMap = null;
let chartMap2 = null;
let chartXCoor = "";
let chartYCoor = "";
let chartMarker = null;
let crrentItem = 1; 
let charMapTitle = "";
let charMapHedofc = "";

let selectX ="";
let selectY ="";
let polygon;
let falg1 = false;

let reportTitle = "";

let allMinaList = [];
let allSubList = [];
let maxDataInfo   = "";
let mainDataInfo   = [];
let subDataInfo = { "lnd_area":0
		           ,"ppltn_tot":0
		           ,"grid_1k_ppltn_co":0
		           ,"ymage_co":0
		           ,"psn_1_family_co":0
		           ,"ent_tot":0
		           ,"sls_amt":0
		           ,"enfsn_co":0
		           ,"lnd_avg_olnlp":0
		           ,"lnd_avg_rl_dlpc":0
		           ,"lnd_deal_co":0
		           ,"bd_30yy_mt_rt":0
		          };

let subtitleValue = "";
let selectSidoCode = "";
let comPanyCharData = null;
let comPanyCharDataPeople = null;
let comPanyCharDataArea = null;


let charChaek1 = false;
let charChaek2 = false;
let charChaek3 = false;
let charChaek4 = false;
let charChaek5 = false;
let charChaek6 = false;
let charChaek7 = false;

let selectAdmCd = "";
let selectTitle = "";
let toChartData = "";

let resultChartData1 = null;
let resultChartData2 = null;
let resultChartData3 = null;
let resultChartData4 = null;
let resultChartData5 = null;

let leftLodFlag1 = false;
let leftLodFlag2 = false;

let lastSelectYear = "";

$(function () {
	
});

//

let yearList = ["2015","2016","2017","2018","2019","2020"];
let data1 = [
				{name:"활동",   data:[439, 486, 665, 221, 234, 532],color:colorBlue[1], borderColor:colorBlue[0]},
				{name:"비활동", data:[334, 256, 551, 332, 111, 456],color:colorOrange[1], borderColor:colorOrange[0]},
				{name:"폐업",   data:[134, 656, 455, 345 , 345, 221],color:colorGray[1], borderColor:colorGray[0]}
			];


function getAreaMax(){
	
	
	$('#searchAdmCd').val(selectAdmCd);
	var formData = $('#searchFrom').serialize();
	
	$.ajax({
		type:"POST",
		url: "/view/sbrStats/sbrAreaMax",
		data: formData,
		dataType:"json",
		async: false,
		success:function(res){
			
			
			maxDataInfo = res;
			//getAreaDataList(res,1);
			getAreaDataList($('#searchAdmCd').val(),1,"");
			
			charChaek7 = true;
		}
	});
}



function getAreaInfo(code){
	
	var rankData = sMap.map.rankData;
	
	var flag = false;
	$('.popup.rankResult').show();
	$('#popContent1').show();
	$('#popContent2').hide();
	
	
	rankData.forEach(function(item,index){
		if(item.bord_cd == code || item.search_id == code ){
			jsonData = item;
			
			$('#miniPopuipTitle').html(item.addr);
			
			$('#overPopupTitle').html("기업");
			if($('#searchTheme').val() == "2") $('#overPopupTitle').html("개업");
			else if($('#searchTheme').val() == "3") $('#overPopupTitle').html("폐업");
			else if($('#searchTheme').val() == "4") $('#overPopupTitle').html("활동");
			else if($('#searchTheme').val() == "5") $('#overPopupTitle').html("비활동");
			
			if(item.ent_co >3){
				$('#miniComCount').html(getCash(item.ent_co));
				$('#miniComUpCount').html(item.growth);
				$('#miniComDownCount').html(item.distribution);
			}else{
				$('#miniComCount').html("N/A");
				$('#miniComUpCount').html("N/A");
				$('#miniComDownCount').html("N/A");
			}
			$('#miniComRank').html(item.ranknum);
			$('#growth').removeClass('up');
			$('#growth').removeClass('down');
			if(item.growth < 0){
				$('#growth').addClass('down');
			}else if(item.growth > 0){
				$('#growth').addClass('up');
			}
			
			flag = true;
		}
	});
	
	
	if(flag == false){
		
		
		sMap.map.mapDataInfo.features.forEach(function(item,index){
			
			if(item.properties.adm_cd == code || item.properties.search_id == code){
				
				$('#miniPopuipTitle').html(item.properties.adm_nm);
				//$('#reportTitle').html(selectTitle);
				reportTitle =item.properties.adm_nm;
				
				$('#miniComCount').html("N/A");
				$('#miniComUpCount').html("N/A");
				$('#miniComDownCount').html("N/A");
				$('#miniComRank').html("N/A");
				
				$('#growth').removeClass('up');
				$('#growth').removeClass('down');
				
				
				
				
			}
		});
	}
	
	
	sMap.map.mapDataInfo.features.forEach(function(item,index){
		if(item.properties.adm_cd == code){
				selectSidoCode = code;	
		}else if(item.properties.search_id == code){
			   selectSidoCode = item.properties.sido_cd;
		}
	});
	
	
}

function getAreaInfo2(data){
	
	var rankData = sMap.map.rankData;
	
	var flag = false;
	
	$('#miniPopuipTitle').html(data.adm_nm);

	
	var halfGubun = $('#togetherSearchFrom').find("input[name=halfGubun]").val();
	//
	if(halfGubun == "people"){
		$('#toPopupTitle1').html("인구");
		$('#toPopupTitle2').html(getCash(data.value*1));
		$('#toPopupTitle3').html("명");	
	}else if(halfGubun == "house"){
		$('#toPopupTitle1').html("주택");
		$('#toPopupTitle2').html(getCash(data.value*1));
		$('#toPopupTitle3').html("호");
	}else if(halfGubun == "home"){
		$('#toPopupTitle1').html("가구");
		$('#toPopupTitle2').html(getCash(data.value*1));
		$('#toPopupTitle3').html("가구");
	}else if(halfGubun == "other"){
		$('#toPopupTitle1').html("농림/어업");
		$('#toPopupTitle2').html(getCash(data.value*1));
		$('#toPopupTitle3').html("가구");
	}
	
	
	$('.popup.rankResult').show();
	$('#popContent1').hide();
	$('#popContent2').show();
	
	
}


function setChart(flag){
	//var seriesData = [1, 2, 3, 4, 5, 6];
	
	
	
//  setPieChart();
	$('#loadDiv').show();
	$('#searchAdmCd').val(sMap.map.selectAdmCd);
	//$('#reportTitle').html(reportTitle);
	
	//업종가져오기
	setTimeout(function() {
		getSbrInfoBizCode();
	}, 50);
	
	setTimeout(function() {
		getLinCartData(flag);
	}, 50);
	
	setTimeout(function() {
		getActiveCompanyCountBy();
	}, 50);
	
	
	setTimeout(function() {
		getGrowthChart();
	}, 50);
	
	setTimeout(function() {
		getAvgData();
	}, 50);
	
	setTimeout(function() {
		getCompanyAnalysis();
	}, 50);
	
	
	setTimeout(function() {
		getCompanyMain();
	}, 50);
	
	setTimeout(function() {
		getAreaMax();
	}, 50);
    //
    //getOpenCloseCountByCondition();
	
	var playAlert = setInterval(function() {
		//if(charChaek1 && charChaek2 &&charChaek3 &&charChaek4 &&charChaek5 && charChaek6 ){
			$('#loadDiv').hide();
			clearInterval(playAlert);
		//}
		
		///console.log("aaaaa");
 	}, 1000);

}

function getSbrInfoBizCode(){
	
	$('#searchAdmCd').val(selectAdmCd);
	var formData = $('#searchFrom').serialize();
	$.ajax({
		type:"POST",
		url: "/view/sbrStats/getSbrInfoBizeCodeList",
		data: formData,
		dataType:"json",
		async: false,
		success:function(res){
			
			//console.log(res);
			
			
			$('#sbrInfoBizDiv').html("");
			var sub1 = "";
			var html = "";
			var selectBizcode1 = $('#searchksic_1_cd').val();
			var selectBizcode2 = $('#searchksic_2_cd').val();
			
			res.forEach(function(item,index){
				
				
				if(sub1 != item.ksic_1_cd){
					sub1 = item.ksic_1_cd;
					
					var active = "";
					var display = "block";
					if(selectBizcode1 != item.ksic_1_cd){
						active = "active";
						display = "none";
					}
					
					
					html += "<div class=\"item\">";
					html += "  <div class=\"parent accTarget bizCodeTitle bizCocdeList\">";
					html += "    <i class=\"accTarget "+active+"\"></i>";
					html += "    <span class=\"accTarget\">"+item.ksic_1_nm+"</span>";
					html += "  </div>";
					html += "  <ul class=\"child\" style=\"display: "+display+";\">";
					
				}
				   var checkedStr = "";
				   if(selectBizcode2 == item.ksic_2_cd)  checkedStr = "active";
					   
				   html += "  <li class=\"bizCodeSelect2\">";
				   html += "    <i class=\"radio "+checkedStr+"\"></i>";
				   html += "    <span>["+item.ksic_2_cd+"]</span><span class=\"title\">"+item.ksic_2_nm+"</span>";
				   html += "    <input type=\"hidden\" class=\"valueBiz1\"value=\""+item.ksic_1_cd+"\"/>";
				   html += "    <input type=\"hidden\" class=\"valueBiz2\"value=\""+item.ksic_2_cd+"\"/>";
				   html += "    <input type=\"hidden\" class=\"nameBiz1\"value=\""+item.ksic_1_nm+"\"/>";
				   html += "    <input type=\"hidden\" class=\"nameBiz2\"value=\""+item.ksic_2_nm+"\"/>";
				   html += "  </li>";
				   
				
			   var nextArray = res[index+1];
			   if(isSbrEmpty(nextArray) || nextArray.ksic_1_cd != item.ksic_1_cd){
				   html += "  </ul>";
				   html += "</div>";
			   }
			});
			$('#sbrInfoBizDiv').append(html);
			setBizCodeAction();
		}
	});
	
}



function getCompanyMain(){
	
	//$('#searchAdmCd').val(selectSidoCode);
	//var formData = $('#searchFrom').serialize();
	$.ajax({
		type:"POST",
		url: "/view/sbrStats/sbrCompanyMain",
		data: {"year":$('#searchYear').val(),"adm_cd":selectAdmCd},
		dataType:"json",
		async: false,
		success:function(res){
			
			ltrsList  = [];
			mident    = [];
			smlpz     = [];
			smltrdids = [];
			
			res.forEach(function(item,index){
				
				if(item.ent_sz == 1 || item.ent_sz == 2  ){
					ltrsList.push(item);	
				}else if(item.ent_sz == 3){
					mident.push(item);
				}else if(item.ent_sz == 4 || item.ent_sz == 5){
					smlpz.push(item);
				}else if(item.ent_sz == 6 || item.ent_sz == 0){
					smltrdids.push(item);
				}
				
			});
			
			$('#tableDummy').html(createTable(ltrsList));
			
			charChaek6 = true;
		}
	});
}



function mostCompanyTab(data,item){
	
	if(crrentItem == data) return ;
	
	var str = "";
	
	if(data == 1) $('#tableDummy').html(createTable(ltrsList));
	else if(data == 2) $('#tableDummy').html(createTable(mident));
	else if(data == 3) $('#tableDummy').html(createTable(smlpz));
	else if(data == 4) $('#tableDummy').html(createTable(smltrdids));
	else               $('#tableDummy').html(createTable(ltrsList));
	
	$('#mostCompanyUl').find('.active').removeClass('active');
	$(item).addClass('active');
	
	crrentItem = data;
}

function createTable(data){
	var list = "";
	
	data.forEach(function(item,index){
		
		var point = item.center_point.split(" ");
		x_coor = point[0].replace("POINT(","");
		y_coor = point[1].replace(")","");
		
		html = "";
	    html += '<li data-content="" onclick="setMap(\''+x_coor+'\',\''+y_coor+'\',\''+item.biz_nm+'\',\''+item.hedofc_yn+'\' )">';
	    html += '<span class="number">'+(index+1)+'</span>';
	    html += '<span class="title">'+item.biz_nm+'</span>';
	    html += '<span class="count">'+(item.biz_cnt+1)+'개</span>';
	    html += '</li>';
	    list += html;
	    
	    if(index ==0){
	    	chartXCoor = x_coor;
	    	chartYCoor = y_coor;
	    	charMapTitle= item.biz_nm;
	    	charMapHedofc = item.hedofc_yn;
	    }
	});
	
	
	return list;
}

function getCompanyAnalysis(){
	
	$('#searchAdmCd').val(selectAdmCd);
	var formData = $('#searchFrom').serialize();
	$.ajax({
		type:"POST",
		url: "/view/sbrStats/sbrCompanyAnalysis",
		data: formData,
		dataType:"json",
		async: false,
		success:function(res){
			
			
			$('#comBYear').html(res.b_base_year);
			$('#comBCount').html(getCash(res.b_enfsn_co));
			$('#comBCo').html(getCash(res.b_ent_co));
			$('#comBSls').html(getCash(res.b_sls_amt));
			
			
			$('#comCYear').html(res.base_year);
			$('#comCCount').html(getCash(res.enfsn_co));
			$('#comCCo').html(getCash(res.ent_co));
			$('#comCSls').html(getCash(res.sls_amt));
			
			
			var comDCount = res.enfsn_co - res.b_enfsn_co;
			var comDCo    = res.ent_co - res.b_ent_co;
			var comDSls   = res.sls_amt - res.b_sls_amt;
			
			var comPCount = Math.ceil(((comDCount)/res.enfsn_co)*1000)/10;
			var comPCo    = Math.ceil(((comDCo)/res.ent_co)*1000)/10;
			var comPSls   = Math.ceil(((comDSls)/res.sls_amt)*1000)/10;
			
			
			
			
			$('#comPCount').html(getCash(comPCount)+"%");
			$('#comPCo').html(getCash(comPCo)+"%");
			$('#comPSls').html(getCash(comPSls)+"%");
			
			
			$("#comPCount").siblings('i').removeClass('up');
			$("#comPCount").siblings('i').removeClass('down');
			
			$("#comPCo").siblings('i').removeClass('up');
			$("#comPCo").siblings('i').removeClass('down');
			
			$("#comPSls").siblings('i').removeClass('up');
			$("#comPSls").siblings('i').removeClass('down');
			
			
			$('#comDCount').html(setUpDown($('#comPCount'),comDCount,0));
			$('#comDCo').html(setUpDown($('#comPCo'),comDCo,1));
			$('#comDSls').html(setUpDown($('#comPSls'),comDSls,2));
			
			
			setbarChart(res);
			
			charChaek5 = true;
		}
	});
}

function setUpDown(obj,number,i){
	
	var array = ["개","명","만원"];
	
	if(number>0){
		number = "(+"+getCash(number)+" "+array[i]+")";
		obj.siblings('i').addClass('up');
	}else if(number<0){
		number = "(-"+getCash(number)+" "+array[i]+")";
		obj.siblings('i').addClass('down');
	}else{
		number = "(-)";
	}
	return number;
}

function getAvgData(){
	
	$('#searchAdmCd').val(selectAdmCd);
	var formData = $('#searchFrom').serialize();
	
	$.ajax({
		type:"POST",
		url: "/view/sbrStats/sbrAvgData",
		data: formData,
		dataType:"json",
		async: false,
		success:function(res){
			
			var val1 = Math.ceil((res.avg_sls_amt/res.max_sls_amt) * 100 *10)/10;
			$('#avrCostLowData').html(getCash(res.min_sls_amt)+"만원");
			$('#avrCostHighData').html(getCash(res.max_sls_amt)+"만원");
			$('#avrCostTargetData').html(getCash(res.avg_sls_amt)+"만원");
			$('#avrCostGaugeLen').css("width",val1+"%");
			$('#avrCostPointer').css("left",val1+"%");
			$('#avrCostBadge').css("left",val1+"%");
			
			
			
			var val2 = Math.ceil((res.avg_bsn_prid/res.max_avg_bsn_prid) * 100 *10)/10;
			$('#avrTimeLowData').html(getCash(res.min_avg_bsn_prid)+"년");
			$('#avrTimeHighData').html(getCash(res.max_avg_bsn_prid)+"년");
			$('#avrTimeTargetData').html(getCash(res.avg_bsn_prid)+"년");
			$('#avrTimeGaugeLen').css("width",val1+"%");
			$('#avrTimePointer').css("left",val1+"%");
			$('#avrTimeBadge').css("left",val1+"%");
			
			charChaek4 = true;
			
		}
	});
}

function getLinCartData(flag){
	
	$('#searchAdmCd').val(selectAdmCd);

	var formData = $('#searchFrom').serialize()+"&chartMode="+$('#searchCustom').val();
	$.ajax({
		type:"POST",
		url: "/view/sbrStats/sbrCompanyInfoList",
		data: formData,
		dataType:"json",
		async: false,
		success:function(res){
			
			var val = res[res.length-1].ent_co;
			
			if(flag == "year" && val <3){
				alert("기업 수가 3미만인 연도는 종합분석을 제공하지 않습니다.");
				$('#resultTitle1').html(lastSelectYear);
				return ;
			}
			
			resultChartData1 = res; 
			setLinChart(res);
			
			
			$('#lineChartTitle').html($('#searchYear').val()+"년 전체 기업");
			
			$('#lineChartCount').html(getCash(val)+"개");
			var val2 = val-res[res.length-2].ent_co;
			
			
			
			
			$('#lineChartUpDown').removeClass("up");
			$('#lineChartUpDown').removeClass("down");
			
			if(val2 < 0){
				$('#lineChartUpDown').addClass("up");
			}else if(val2 > 0){
				$('#lineChartUpDown').addClass("down");
			}
			if(val2 == 0 ) $('#lineChartUpDown').html("-");
			else           $('#lineChartUpDown').html(getCash(val2));
			
			
			var val3 = Math.ceil(((val-res[res.length-2].ent_co)/res[res.length-2].ent_co) * 100 *10)/10; 
			$('#lineChartBadge').html(val3+"%");
			charChaek1 = true;
		}
	});
	
}

function getGrowthChart(){
	
	$('#searchAdmCd').val(selectAdmCd);
	var formData = $('#searchFrom').serialize();
	$.ajax({
		type:"POST",
		url: "/view/sbrStats/sbrGrowthList",
		data: formData,
		dataType:"json",
		async: false,
		success:function(res){
			
			var data = [];
			var sumCom = 0;
			var totalCom = 0;
			res.forEach(function(item,index){
				if(item.cnd_cd == "GR_ETC") data[0] = item.act_co;
				else if(item.cnd_cd == "GR_10PLT") data[1] = item.act_co;
				else if(item.cnd_cd == "GR_10P_20PLT") data[2] = item.act_co;
				else if(item.cnd_cd == "GR_20P_MT1") data[3] = item.act_co;
				else if(item.cnd_cd == "GR_HIGH") data[4] = item.act_co;
				
				sumCom += item.act_co;
				totalCom += item.ent_co;
			});
			
			
			for(var i=0; i<5;i++){
				if(data[i] == null)data[i]=0;
			}
			
			var result = [ {'name':'그외','y':data[0],borderColor:colorsArBorder[0]}
            ,{'name':'10% 미만','y':data[1],borderColor:colorsArBorder[1]}
            ,{'name':'10% ~ 20%','y':data[2],borderColor:colorsArBorder[2]}
            ,{'name':'20% 이상','y':data[3],borderColor:colorsArBorder[3]}
            ,{'name':'급성장','y':data[4],borderColor:colorsArBorder[4]}];
			
			
			
			
			resultChartData3 = result;
			setTriangleChart(result);
			
			var avg =  Math.ceil((sumCom/totalCom)*100*10)/10;
			
			
			$('#totalGrowCom').html(getCash(sumCom)+"개");
			$('#rateI').html(avg);
			
			$('#grEtc').html(getCash(data[4])+"개");
			$('#gr20').html(getCash(data[3])+"개");
			$('#gr1020').html(getCash(data[2])+"개");
			$('#gr10').html(getCash(data[1])+"개");
			$('#grHigh').html(getCash(data[0])+"개");
			
			charChaek3 = true;
		
		}
	});
}



function setLinChart(data){
	
	var totlaData = [];
	
	var titleData = [];
	
	var LtrsCoData = [];
	var MidentCoData = [];
	var SmlpzCoData = [];
	var SmltrdidsCoData = [];
	
	var opbizCoData = [];
	var clsbizCoData = [];
	
	var mainMCoData = [];
	var mainFmCoData = [];
	var mainUknwnCoData = [];
	
	var crpCoData = [];
	var psnCoData = [];
	
	var crpCoData = [];
	var psnCoData = [];
	
	data.forEach(function(item,index) {
		totlaData[index] = item.ent_co;
		titleData[index] = item.base_year;
		
		LtrsCoData[index] = item.ltrs_co;
		MidentCoData[index] = item.mident_co;
		SmlpzCoData[index] = item.smlpz_co;
		SmltrdidsCoData[index] = item.smltrdids_co;
		
		opbizCoData[index] = item.opbiz_co;
		clsbizCoData[index] = item.clsbiz_co;
		
		mainMCoData[index] = item.main_m_co;
		mainFmCoData[index] = item.main_fm_co;
		mainUknwnCoData[index] = item.main_uknwn_co;
		
		crpCoData[index] = item.crp_co;
		psnCoData[index] = item.psn_co;
		
	});
	
	var seriesData = [{name:"전체기업수",	data:totlaData}];
	
	if($('#searchCustom').val() == "2"){
		seriesData = [ {name:"대기업",	data:LtrsCoData}
		              ,{name:"중견기업",	data:MidentCoData}
		              ,{name:"중소기업",	data:SmlpzCoData}
		              ,{name:"소상공인",	data:SmltrdidsCoData}
		             ];		
	} 
	
	if($('#searchCustom').val() == "3"){
		seriesData = [ {name:"법인",	data:crpCoData}
		              ,{name:"개인",	data:psnCoData}
		             ];		
	}
	
	if($('#searchCustom').val() == "4"){
		seriesData = [ {name:"개업",	data:opbizCoData}
		              ,{name:"폐업",	data:clsbizCoData}
		             ];		
	}
	
	if($('#searchCustom').val() == "5"){
		seriesData = [ {name:"남성",	data:mainMCoData}
		              ,{name:"여성",	data:mainFmCoData}
		              ,{name:"미상",	data:mainUknwnCoData}
		             ];		
	}
	
	$('#layerLgChart1').highcharts(
			{
				chart : {
		            type : 'line',
		            style: {			 
		                fontFamily: 'Pretendard', 
		            }
		        },
		        credits: {
		            enabled: false
		        },
		        exporting : {
		            enabled : false
		        },
		        title: {
		            text: '',
		        },
		        subtitle: {
		            text: '',
		        },
		        yAxis: {
		            title: {
		            text: '',
		            },
		            labels: {
		                enabled : false
		            },
		        },
		        xAxis: {
		            labels: {
		                style: {
		                    color: '#666',
		                    fontSize:'12px',
		                    fontWeight: '500',
		                    letterSpacing: '0px',
		                }
		            },
		            categories: titleData
		        },
		        legend: {
		            enabled: false
		        },
		        plotOptions: {
		            series: {
		                marker: {
		                    enabled: true, //마커 보이기 / 안보이기 [true : 보이기, false : 안보이기]
		                    lineWidth: 2, //라인 굵기
		                    lineColor:'#0475F4', //라인 색
		                    fillColor:'#ffffff'
		                },
		                dataLabels: {
		                    enabled: true, //데이터레이블 보이기/안보이기 [true : 보이기, false : 안보이기]
		                    allowOverlap: true //데이터레이블 겹치기/안겹치기 (안겹치기시 겹치는 데이터레이블 안보임) [true : 겹치다, false : 안겹치다]
		                },
		                events: {
		                    mouseOver: function (event) { //마우스 오버 이벤트[마우스올리면 : show(데이터레이블 보이기)]
		                        $.each(this.data, function(i, point){
		                            point.dataLabel.show();
		                        });
		                    },
		                    mouseOut: function (e) { //마우스 오버 이벤트[마우스내리면 : hide(데이터레이블 안보이기)]
		                        $.each(this.data, function(i, point){
		                            point.dataLabel.hide();
		                        });
		                    }
		                }
		            }
		        },
		        series: seriesData
			});
}


function setOpenCloseBoardData(res){
	// 전체 업종 , Order by biz_cd DESC 하여 0번째가 전체업종임
	
	$('#allOpenCompanyCount').text(res[0].opbiz_co);
	$('#allCloseCompanyCount').text(res[0].clsbiz_co);

	$('#openCompanyCount').text(res[1].opbiz_co);
	$('#closeCompanyCount').text(res[1].clsbiz_co);

	$('#openCompanyRatio').text((res[1].opbiz_co / res[0].opbiz_co * 100).toFixed(2) + '%');
	$('#closeCompanyRatio').text((res[1].clsbiz_co / res[0].clsbiz_co * 100).toFixed(2) + '%');
	
	
}


//활동현환, 개폐업 현황
function getActiveCompanyCountBy(){

	$('#searchAdmCd').val(selectAdmCd);
	var formData = $('#searchFrom').serialize();
	$.ajax({
		type: "POST",
		url: "/view/sbrStats/sbrActiveCompanyCount",
		data: formData,
		dataType:"json",
		async:false,
		success:function(res){
			
			//환동현황
			resultChartData2 = res; 
			setPieChart(res);
			$('#acCmCntOn').html(getCash(res.act_co)+" 개");
			$('#acCmCntOff').html(getCash(res.nact_co)+" 개");
			
			//개폐업현황
			
			var ageValue1 = Math.ceil((res.opbiz_co/res.tol_opbiz_co)*100*10)/10;
			$('#openCompanyCount').html(getCash(res.opbiz_co)+" 개");
			$('#allOpenCompanyCount').html(getCash(res.tol_opbiz_co)+" 개");
			$('#openCompanyRatio').html(ageValue1+" %");
			
			var ageValue2 = Math.ceil((res.clsbiz_co/res.tol_clsbiz_co)*100*10)/10;
			$('#closeCompanyCount').html(getCash(res.clsbiz_co)+" 개");
			$('#allCloseCompanyCount').html(getCash(res.tol_clsbiz_co)+" 개");
			$('#closeCompanyRatio').html(ageValue2+" %");
			charChaek2 = true;
			
			
			$('#openBadge').hide();
			$('#closeBadge').hide();
			
			var opCo = Number(res.opbiz_co);
			var clCo = Number(res.clsbiz_co);
			if(opCo > clCo){
				$('#openBadge').show();
			}else if(opCo < clCo){
				$('#closeBadge').show();
			}
			
			
		},
		error:function(){
		}
	})
}

 




function setPieChart(res) {
	
	$('#layerLgChart2').highcharts(
		{

	        chart : {
	            renderTo: 'dounutChart',
	            type: 'pie',
	            style: {			 
	                fontFamily: 'Pretendard', 
	            }
	        },
			
			colors:[color1, color2],
			credits: {enabled: false}, // highchart watermark hide
			exporting: {enabled: false},
			title: {
				text: '',
			},
			
			legend: {
				enabled: true,
				padding: 1,
				itemMarginTop: 5,
				itemMarginBottom: 0,
			},
			
	        plotOptions: {
	            pie: {//도넛(파이)차트 전체 옵션 지정.
	                size: '140%', 
	                showInLegend: true, //범례 show/hide 설정. (series 내에서 개별 지정도 가능.)
	                
	            }
	        },
	        
	        tooltip: {
	            useHTML: false,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
	            borderRadius: 10,
	            backgroundColor :'#000000', 
	            borderWidth:0,
	            shadow: false,
	            padding:10,
	            style: {			 
	                fontSize :'14px',  
	                color: '#fff',
	                fontWeight: '600',
	                textAlign:'center',
	            },
	            shared: true,
	            formatter: function() {
	                return '<span style="color:#fff">'  + this.point.name + '</span> : ' + this.y + '개';
	            },
	        },
	        
	        series: [
	            {name: '활동현황',
	            borderWidth: 1,        
	            // innerSize:30%,
	            dataLabels: {
	                enabled: false
	            },
	            data: [
	            	{name:'활동기업'	,y:res.act_co,sliced:true,borderColor:cTrans1},      
	            	{name:'비활동기업'	,y:res.nact_co,borderColor:cTrans2},
	                ]
	            }
	        ]
	});
}


function setTriangleChart(data) {
    
	$('#growCompanyDistChart').highcharts(
		 {	
			 
			 chart: {
		            type: 'pyramid'
		        },
		        colors:colorsAr,
		        credits: {enabled: false}, //highchart 워터마크 숨김처리
		        exporting : { enabled : false },
		        title: {
		            text: '',
		        },
		        plotOptions: {
		            series: {
		                dataLabels: {
		                    enabled: true,
		                    format: "({point.x:,.0f})",
		                    allowOverlap: false,
		                    connectorPadding: 0,
		                    distance: 10,
		                    softConnector: true,
		                    x: 0,
		                    connectorShape: "fixedOffset",
		                    crookDistance: "70%"
		                },
		                showInLegend: false,
		                cursor: "pointer",
		 
		            }
		        },
		        series: [{
		            name: '전체성장기업',
		            keys: ['name', 'y'], 
		            width:'80%',
		            dataLabels: {
		                enabled: true,
		                format: '<b>{point.name}</b> ({point.y:,.0f})',
		                softConnector: true
		            },
		            data: data,
		            colors:colorsAr
		        }],
		    
		        responsive: {
		            rules: [{
		                condition: {
		                    maxWidth: 300,
		                    maxHeight: 200
		                }
		                
		            }]
		        }
		        
		 });
}

function setbarChart(data){
	
	var data1 = [data.ltrs_co, data.ltrs_enfsn_co, data.ltrs_sls_amt];
	var data2 = [data.mident_co, data.mident_enfsn_co, data.mident_sls_amt];
	var data3 = [data.smlpz_enfsn_co, data.smlpz_enfsn_co, data.smlpz_sls_amt];
	var data4 = [data.smltrdids_co, data.smltrdids_enfsn_co, data.smltrdids_sls_amt];
	
	
	$('#barChartDiv').highcharts({
        chart: {
            type: 'bar' 
            ,width: 539
         },
        colors:colorsAr,
	    credits: {enabled: false}, //highchart 워터마크 숨김처리
	    exporting : { enabled : false },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['기업수', '종사자', '매출액']
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        plotOptions: {
            bar: {
                stacking: 'percent',
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    color: 'white',
                    formatter: function () {
                        //return Highcharts.numberFormat(this.percentage, 0) + "%";
                        return "";
                    }
                }
            }
        },
        series: [{
            name: '대기업',
            data: data1,
            borderColor:cTrans1
        }, {
            name: '중견기업',
            data: data2,
            borderColor:cTrans2
        },{
            name: '중소기업',
            data: data3
        },  {
            name: '소상공인',
            data: data4
        }]
    });
    
    
    $('#resize').click(function () {
        $('#container').highcharts().setSize(316, null, false);
    });
	
	
}


///차트 맵관련
function setMapChart(){
	 setMap(chartXCoor,chartYCoor,charMapTitle,charMapHedofc);	
}

function setMap(x,y,title,isYn){
	if(chartMap != null)chartMarker.remove();
	if(chartMap == null)chartMap = sop.map('chartMap');
	
	chartMap.setView(sop.utmk(x, y), 9);
	
	var ishedofc = "지사"; 
	if(isYn == 1) ishedofc ="본사"; 
	
	var markerHtml = "";
    
	    markerHtml += "  <span class='marker pointer'>";
	    markerHtml += "    <div>";
	    markerHtml += "      <i class=\"icon_marker\">";
	    markerHtml += "      </i>";
	    markerHtml += "      <span class=\"count\">"+ishedofc+"</span>";
	    markerHtml += "    </div>";
	    markerHtml += "  </span>";
	    
	    
	var markerIcon = new sop.DivIcon({  
		                           html:markerHtml
		                         , className: "mapMarker"
		                         , iconAnchor: new sop.Point(12.5,40)
		                         , iconSize: new sop.Point(50, 50)
	                             , infoWindowAnchor: new sop.Point(1,-10)
	                          });
	
	
	chartMarker = sop.marker([x, y],{
		icon: markerIcon
		,visible : false
	});
	
    chartMarker.addTo(chartMap);
    
    chartXCoor = x;
    chartYCoor = y;
    
    $('#charMapTitle').html(title);
    $('#charMapYear').html($('#searchYear').val()+"년 기업위치 현황");
    $('.companyMap .sop-bottom.sop-right').hide();
    $('.companyMap .sop-top.sop-right').hide();
    
}

function setAreaMpa(){
	
	var thisZoom = $sbrActiveMap.ui.mapList[0].zoom;
	var thisX = $sbrActiveMap.ui.mapList[0].center[0];
	var thisY = $sbrActiveMap.ui.mapList[0].center[1];
	var thisCenter = [thisX,thisY];
	

	if($('#searchCategory').val() == 2){
		thisZoom = 4;
		thisX = selectX;
		thisY = selectY;
	}
	
	
	if(chartMap2 == null){
		chartMap2 = sop.map('arearMapDiv',{
											ollehTileLayer: false,
									        scale: false, // 축척 컨트롤
									        panControl: false, // 지도 이동 컨트롤
									        zoomSliderControl: false, //줌 컨트롤
									        measureControl: false, // 측정 컨트롤 (면적, 길이)
									        attributionControl: false, // 지도속성 컨트롤
									        });
		
		chartMap2.setView(sop.utmk(thisX, thisY), thisZoom);
		startGeoCode(thisCenter,thisZoom,chartMap2);
		chartMap2.setMaxZoom(thisZoom);
		chartMap2.setMinZoom(thisZoom);
		
		
		chartMap2.on("moveend",function(e) {
			var center = e.target.getCenter();
			    center = [ center.x, center.y ];
			var zoom = e.target.getZoom();
			    startGeoCode(center,zoom,chartMap2);
	    });
		
		chartMap2.on("zoomend",function(e) {
        });
	}else{
		
		chartMap2.setView(sop.utmk(thisX, thisY), thisZoom);
		startGeoCode(thisCenter,thisZoom,chartMap2);
		chartMap2.setMaxZoom(thisZoom);
		chartMap2.setMinZoom(thisZoom);
		
	}
	
	
}

function setXY(x,y){
	selectX = x;
	selectY = y;
}

function startGeoCode(center,zoom,map){
	
	var x_coor = center[0];
	var y_coor = center[1];
	if(zoom < 3){
		
		$.ajax({
			  type: "POST",
			  url: "/js/data/geo_sido_" + $('#searchYear').val() + ".js",
			  dataType: "json",
			  success: function(res) {
				  setPolygon(map,"00",res);
			  } ,
		});
		
	}else{
		
		$.ajax({
			  type: "GET",
			  url: openApiPath + "/OpenAPI3/addr/rgeocode.json",
			  data : {"accessToken" : accessToken,"addr_type" :  "20","x_coor" :  x_coor,"y_coor" : y_coor,"bnd_year" :  $('#searchYear').val()},
			  dataType: "json",
			  success: function(res) {
				  var admCd = "";
				  if(res.result == null) return null;
				  if(zoom < 6) {
					  admCd = res.result[0].sido_cd;
				  }else{
					  //admCd = res.result[0].sido_cd;
					  admCd = res.result[0].sido_cd+""+res.result[0].sgg_cd;
				  }
				  getGeoCodeList(map,admCd);
			  }   
		});
	
	}
}

function getGeoCodeList(map,admCd){
	
	var dataSet  = {"accessToken" : accessToken,"adm_cd" : admCd ,"year" :  $('#searchYear').val(),"low_search": "1"};
	
	if($('#searchArea').val() != 1){
		dataSet  = {"accessToken" : accessToken,"adm_cd" : admCd ,"year" :  $('#searchYear').val(),"low_search": "1", areaInfo: sMap.map.selectMapType};
	}
	
	$.ajax({
		  type: "GET",
		  url: openApiPath + "/OpenAPI3/boundary/hadmarea.geojson",
		  data : dataSet,
		  dataType: "json",
		  success: function(res) {
			  setPolygon(map,admCd,res);
		  }   
	});
	
}


function setPolygon(map,admCd,data){
	if(falg1){
		polygon.remove();
	}
	
	polygon = sop.geoJson(data,{
		onEachFeature : function(feature, layer){
			adm_cd = feature.properties.adm_cd;
			layer.on({
				mouseover : function (e) {
					//마우스오버
				},
				mouseout : function (e) {
					//마우스아웃
				},
				click : function (e) {
					//마우스 클릭
					
					var code = feature.properties.adm_cd;
					var addr = feature.properties.adm_nm;

					if(sMap.map.selectMapType == 2 || sMap.map.selectMapType == 3 || sMap.map.selectMapType == 4 || sMap.map.selectMapType == 5){
						code = feature.properties.search_id;
					}
					
					//getAreaDataList($('#searchAdmCd').val(),code,addr);
					getAreaDataList(code,2,addr);
					closeDifferAreaMap();
				}
			});
			
			/*layer.setStyle({
				weight : 2, //테두리 굵기
				color : '#ABF200', // 테투리 색상
				fillColor : '#1DDB16', //면색상
				fillOpacity : 0.2, //면 투명도
			});*/
		}
	});
	polygon.addTo(chartMap2);
	
	
	falg1 = true;
	var adm_cd = "";
}

function getAreaDataList(adm_cd,mode,title){
	
	
	
	$.ajax({
		  type: "POST",
		  url:  "/view/sbrStats/sbrAreaDataList",
		  data : {"year" : $('#searchYear').val(),"adm_cd" : adm_cd ,"bord_type":$('#searchArea').val(),"zoom":$('#searchZoom').val()},
		  dataType: "json",
		  success: function(res) {
			  var dataList = "";
			  
			  if(mode == 1)allMinaList = [];
			  else if(mode == 2) allSubList = [];
			  
			  res.forEach(function(item,index){
				  if(item.bord_cd == adm_cd ){
					  
					  if(mode == 1) allMinaList.push(item);
					  else if(mode == 2)allSubList.push(item);
					  
					  if(item.base_year == $('#searchYear').val())dataList = item;
				  }
			  });
			  
			  resetAreaData();
			  
			  if(mode == 1){
				  resetAreaData();
				  setAreaChart(dataList,subDataInfo,"비교지역 선택");
				  mainDataInfo = dataList;
			  }else if(mode == 2){
				  setAreaChart(mainDataInfo,dataList,res[0].addr);
			  }
			 
		  }   
	});
	
	
}


function setAreaChart(minaList,subList,title){
	
	var areaDAta = [
		 {"title":"토지면적",   		"leftData": getCash(minaList.lnd_area)+" ㎢",			"rightData": getCash(subList.lnd_area)+" ㎢",       	"gap": getCash((minaList.lnd_area-subList.lnd_area))+" ㎢", 				"leftArea":getratio(maxDataInfo.lnd_area,minaList.lnd_area,1), 				 	"rightArea":getratio(maxDataInfo.lnd_area,subList.lnd_area,2), 					"gapClass":checkNumber(minaList.lnd_area,subList.lnd_area),					"adm_cd1":minaList.bord_cd,"adm_cd2":subList.bord_cd}
		 ,{"title":"전체인구",  			"leftData": getCash(minaList.ppltn_tot)+" 명",   		"rightData": getCash(subList.ppltn_tot)+" 명",       	"gap": getCash((minaList.ppltn_tot-subList.ppltn_tot))+" 명", 				"leftArea":getratio(maxDataInfo.ppltn_tot,minaList.ppltn_tot,1), 				"rightArea":getratio(maxDataInfo.ppltn_tot,subList.ppltn_tot,2), 				"gapClass":checkNumber(minaList.ppltn_tot,subList.ppltn_tot),				"adm_cd1":minaList.bord_cd,"adm_cd2":subList.bord_cd}
		 ,{"title":"㎢당 인구",  		"leftData": getCash(minaList.grid_1k_ppltn_co)+" 명",   "rightData": getCash(subList.grid_1k_ppltn_co)+" 명",   "gap": getCash((minaList.grid_1k_ppltn_co-subList.grid_1k_ppltn_co))+" 명", "leftArea":getratio(maxDataInfo.grid_1k_ppltn_co,minaList.grid_1k_ppltn_co,1), 	"rightArea":getratio(maxDataInfo.grid_1k_ppltn_co,subList.grid_1k_ppltn_co,2), 	"gapClass":checkNumber(minaList.grid_1k_ppltn_co,subList.grid_1k_ppltn_co),	"adm_cd1":minaList.bord_cd,"adm_cd2":subList.bord_cd}
		 ,{"title":"청장년 인구",  		"leftData": getCash(minaList.ymage_co)+" 명",   		"rightData": getCash(subList.ymage_co)+" 명",       	"gap": getCash((minaList.ymage_co-subList.ymage_co))+" 명", 				"leftArea":getratio(maxDataInfo.ymage_co,minaList.ymage_co,1), 					"rightArea":getratio(maxDataInfo.ymage_co,subList.ymage_co,2), 					"gapClass":checkNumber(minaList.ymage_co,subList.ymage_co),					"adm_cd1":minaList.bord_cd,"adm_cd2":subList.bord_cd}
		 ,{"title":"1인가구",  			"leftData": getCash(minaList.psn_1_family_co)+" 명",   	"rightData": getCash(subList.psn_1_family_co)+" 명",    "gap": getCash((minaList.psn_1_family_co-subList.psn_1_family_co))+" 명", 	"leftArea":getratio(maxDataInfo.psn_1_family_co,minaList.psn_1_family_co,1), 	"rightArea":getratio(maxDataInfo.psn_1_family_co,subList.psn_1_family_co,2), 	"gapClass":checkNumber(minaList.psn_1_family_co,subList.psn_1_family_co),	"adm_cd1":minaList.bord_cd,"adm_cd2":subList.bord_cd}
		 ,{"title":"전체 기업",  		"leftData": getCash(minaList.ent_tot)+" 개",   			"rightData": getCash(subList.ent_tot)+" 개",       		"gap": getCash((minaList.ent_tot-subList.ent_tot))+" 개", 					"leftArea":getratio(maxDataInfo.ent_tot,minaList.ent_tot,1), 					"rightArea":getratio(maxDataInfo.ent_tot,subList.ent_tot,2), 					"gapClass":checkNumber(minaList.ent_tot,subList.ent_tot),					"adm_cd1":minaList.bord_cd,"adm_cd2":subList.bord_cd}
		 ,{"title":"전체 기업 매출",  	"leftData": getCash(minaList.sls_amt)+" 만원",   		"rightData": getCash(subList.sls_amt)+" 만원",       	"gap": getCash((minaList.sls_amt-subList.sls_amt))+" 만원", 				"leftArea":getratio(maxDataInfo.sls_amt,minaList.sls_amt,1), 					"rightArea":getratio(maxDataInfo.sls_amt,subList.sls_amt,2), 					"gapClass":checkNumber(minaList.sls_amt,subList.sls_amt),					"adm_cd1":minaList.bord_cd,"adm_cd2":subList.bord_cd}
		 ,{"title":"전체 기업 종사자",  	"leftData": getCash(minaList.enfsn_co)+" 명",   		"rightData": getCash(subList.enfsn_co)+" 명",       	"gap": getCash((minaList.enfsn_co-subList.enfsn_co))+" 명", 				"leftArea":getratio(maxDataInfo.enfsn_co,minaList.enfsn_co,1), 					"rightArea":getratio(maxDataInfo.enfsn_co,subList.enfsn_co,2), 					"gapClass":checkNumber(minaList.enfsn_co,subList.enfsn_co),					"adm_cd1":minaList.bord_cd,"adm_cd2":subList.bord_cd}
		 ,{"title":"토지 평균 공시지가", "leftData": getCash(minaList.lnd_avg_olnlp)+" 만원",   	"rightData": getCash(subList.lnd_avg_olnlp)+" 만원",    "gap": getCash((minaList.lnd_avg_olnlp-subList.lnd_avg_olnlp))+" 만원", 	"leftArea":getratio(maxDataInfo.lnd_avg_olnlp,minaList.lnd_avg_olnlp,1), 		"rightArea":getratio(maxDataInfo.lnd_avg_olnlp,subList.lnd_avg_olnlp,2), 		"gapClass":checkNumber(minaList.lnd_avg_olnlp,subList.lnd_avg_olnlp),		"adm_cd1":minaList.bord_cd,"adm_cd2":subList.bord_cd}
		 ,{"title":"토지 평균 실거래가", "leftData": getCash(minaList.lnd_avg_rl_dlpc)+" 만원",  "rightData": getCash(subList.lnd_avg_rl_dlpc)+" 만원",  "gap": getCash((minaList.lnd_avg_rl_dlpc-subList.lnd_avg_rl_dlpc))+" 만원", "leftArea":getratio(maxDataInfo.lnd_avg_rl_dlpc,minaList.lnd_avg_rl_dlpc,1), 	"rightArea":getratio(maxDataInfo.lnd_avg_rl_dlpc,subList.lnd_avg_rl_dlpc,2), 	"gapClass":checkNumber(minaList.lnd_avg_rl_dlpc,subList.lnd_avg_rl_dlpc),	"adm_cd1":minaList.bord_cd,"adm_cd2":subList.bord_cd}
		 ,{"title":"토지 거래 건수",  	"leftData": getCash(minaList.lnd_deal_co)+" 건",   		"rightData": getCash(subList.lnd_deal_co)+" 건",       	"gap": getCash((minaList.lnd_deal_co-subList.lnd_deal_co))+" 건", 			"leftArea":getratio(maxDataInfo.lnd_deal_co,minaList.lnd_deal_co,1), 			"rightArea":getratio(maxDataInfo.lnd_deal_co,subList.lnd_deal_co,2), 			"gapClass":checkNumber(minaList.lnd_deal_co,subList.lnd_deal_co),			"adm_cd1":minaList.bord_cd,"adm_cd2":subList.bord_cd}
		 ,{"title":"30년 이상 노후건물", "leftData": getCash(minaList.bd_30yy_mt_rt)+" %",   	"rightData": getCash(subList.bd_30yy_mt_rt)+" %",       "gap": getCash((minaList.bd_30yy_mt_rt-subList.bd_30yy_mt_rt))+" %", 		"leftArea":getratio(maxDataInfo.bd_30yy_mt_rt,minaList.bd_30yy_mt_rt,1), 		"rightArea":getratio(maxDataInfo.bd_30yy_mt_rt,subList.bd_30yy_mt_rt,2), 		"gapClass":checkNumber(minaList.bd_30yy_mt_rt,subList.bd_30yy_mt_rt),		"adm_cd1":minaList.bord_cd,"adm_cd2":subList.bord_cd}
	  ];
	  
	
	  $('#areaMainTitle').html(selectTitle);
	  if(title !=""){
		$('#areaSubTitle').html(title);  
	  }
	  
	  $(".dataListWrap").html("");
	  
	  subtitleValue = title;
	  
	  areaDAta.forEach((areaSampleData,index) => {
		  
		  
        let html = "";
        
        html += '<li>';
        html += '<div class="title"><p>'+areaSampleData.title+'</p></div>';
        html += '<div class="leftData">'
        html += '<div class="bg" style="width:'+areaSampleData.leftArea+'%"></div>'
        html += '<p>'+areaSampleData.leftData+'</p>'
        html += '</div>'
        html += '<div class="rightData">'
        html += '<div class="bg" style="width:'+areaSampleData.rightArea+'%"></div>'
        html += '<p>'+areaSampleData.rightData+'</p>'
        html += '</div>'
        html += '<div class="differ">'
        html += '<div>'
        html += '<span class="equal">=</span>'
        html += '<span class="count '+areaSampleData.gapClass+'">'+areaSampleData.gap+'</span>'
        html += '<i class="icon_chart" onclick="openDifferAreaChart('+index+','+areaSampleData.adm_cd1+','+areaSampleData.adm_cd2+')"></i>'
        html += '</div>'
        html += '</.div>'
        html += '</li>'

        $(".dataListWrap").append(html);
    })
	
}

function openDifferAreaChart(select,adm_cd1,adm_cd2){
    $(".differArea .chartArea").show();
    
    var title = ["토지면적","전체인구","㎢당 인구","청장년 인구","1인가구","전체기업","전체 기업매출","전체 기업 종사자","토지 평균 실거래가","토지 거래 건수","30년 이상 노후 건물"];
    var idList = ["lnd_area","ppltn_tot","lnd_area","ymage_co","psn_1_family_co","ent_tot","sls_amt","enfsn_co","lnd_avg_olnlp","lnd_avg_rl_dlpc","lnd_deal_co","bd_30yy_mt_rt"];
    
    console.log(select);
    console.log(adm_cd1);
    console.log(adm_cd2);

    
    var mainTitle = selectTitle;
    var subTitle = subtitleValue;
    
    var seriesData1 = [];
    var seriesData2 = [];
    
	var titleData = [];
	
	var mainName = "";
	allMinaList.forEach(function(item,index){
		mainName = item.addr;
		seriesData1.push(item[idList[select]]);
		titleData.push(item.base_year);
	});
	
	var subName = "";
	if(adm_cd2 != null){
		allSubList.forEach(function(item,index){
			subName = item.addr;
			seriesData2.push(item[idList[select]]);
		});
	}
	
	var seriesData= [];
	
	var seriesData1 = 	{name:mainName, data:seriesData1, color:colorRed[1], borderColor:colorRed[0]};
	seriesData.push(seriesData1);
	
	if(adm_cd2 != null){
		seriesData2 = {name:subName, data:seriesData2,color:colorBlue[1], borderColor:colorBlue[0]};
		seriesData.push(seriesData2);
	}
	
	
	$('#layerLgChart5').highcharts(
			{
				chart : {
		            type : 'line',
		            style: {			 
		                fontFamily: 'Pretendard', 
		            }
		        },
		        credits: {
		            enabled: true
		        },
		        exporting : {
		            enabled : false
		        },
		        navigation: {
		            buttonOptions: {
		                verticalAlign: 'top',
		                x: -20
		            }
		        },
		        title: {
		            text: title[select],
		        },
		        subtitle: {
		            text: '',
		        },
		        yAxis: {
		            title: {
		            text: '',
		            },
		            labels: {
		                enabled : false
		            },
		        },
		        xAxis: {
		            labels: {
		                style: {
		                    color: '#666',
		                    fontSize:'12px',
		                    fontWeight: '500',
		                    letterSpacing: '0px',
		                }
		            },
		            categories: titleData
		        },
		        legend: {
				    layout: "horizontal",
				    verticalAlign: "bottom",
				    align: "center",
				    symbolWidth: 8,
				    symbolHight: 8,
				    floating: false,
				    borderWidth: 0,
				    backgroundColor: "#FFFFFF",
				    shadow: false,
				    itemStyle: {
				        font: "11px Pretendard",
				        color: "#333",
				        align: "center"
				    }
				},
		        plotOptions: {
		            series: {
		                marker: {
		                    enabled: true, //마커 보이기 / 안보이기 [true : 보이기, false : 안보이기]
		                    lineWidth: 2, //라인 굵기
		                    lineColor:'#0475F4', //라인 색
		                    fillColor:'#ffffff'
		                },
		                dataLabels: {
		                    enabled: true, //데이터레이블 보이기/안보이기 [true : 보이기, false : 안보이기]
		                    allowOverlap: true //데이터레이블 겹치기/안겹치기 (안겹치기시 겹치는 데이터레이블 안보임) [true : 겹치다, false : 안겹치다]
		                },
		                events: {
		                    mouseOver: function (event) { //마우스 오버 이벤트[마우스올리면 : show(데이터레이블 보이기)]
		                        $.each(this.data, function(i, point){
		                            point.dataLabel.show();
		                        });
		                    },
		                    mouseOut: function (e) { //마우스 오버 이벤트[마우스내리면 : hide(데이터레이블 안보이기)]
		                        $.each(this.data, function(i, point){
		                            point.dataLabel.hide();
		                        });
		                    }
		                }
		            }
		        },
		        series: seriesData
			});
    
    
}
function closeDifferAreaChart(){
	$(".differArea .chartArea").hide();
}

function getratio(data1,data2,pos){
	var sum = data1+data2;
	
	var calc = 0;
	/*
	if(pos == 1 ){
		calc = Math.ceil((data1/sum)*1000)/10;
	}else{
		calc = Math.ceil((data2/sum)*1000)/10;
	}*/
	
	calc = Math.ceil((data2/data1)*1000)/10;
	
	return calc
}

function checkNumber(data1,data2){
	var value = data1-data2;
	if(value<0)      return "minus";
	else if(value>0) return "plus";
	else             return "";
	
}


function getToChartData(){
	
	
	var selectType = $('#togetherSearchFrom').find('input[name=halfGubun]').val();
	
	var admCd = $('#searchAdmCd').val();
	var url = "/view/sbrStats/innersearchpopulationForBorough";
	
	
	if(selectType == "people"){
		 url = "/view/sbrStats/innersearchpopulationForBorough";
		 formData = getFormCharData(1,admCd,'Y');
	 }
	 else if(selectType == "house"){
		 url = "/view/sbrStats/house";
		 formData = getFormCharData(2,admCd,'Y');
	 }
	 else if(selectType == "home"){
		 url = "/view/sbrStats/household";
		 formData = getFormCharData(3,admCd,'Y');
	 }
	 else if(selectType == "other"){
		 formData = getFormCharData(4,admCd,'Y');
		 url = "/view/sbrStats/house";
		  if($('#togetherSearchFrom').find('input[name=halfGubun]').val() == 1)      url = "/view/sbrStats/farmhousehold";
		  else if($('#togetherSearchFrom').find('input[name=halfGubun]').val() == 2) url = "/view/sbrStats/farmhousehold";
		  else if($('#togetherSearchFrom').find('input[name=halfGubun]').val() == 3) url = "/view/sbrStats/farmhousehold";
		  else if($('#togetherSearchFrom').find('input[name=halfGubun]').val() == 4) url = "/view/sbrStats/farmhousehold";
		  else                                                                       url = "/view/sbrStats/farmhousehold";
		 
	 }
	
	
	$.ajax({
		type:"POST",
		url: url,
		data: formData,
		dataType:"json",
		async: false,
		success:function(res){
			setTogetherChart(res);
		}
	});	
	
	
}



function setTogetherChart(res){
	
	var mainData = sMap.map.rankData;
	var togetherData = res;
	toChartData  =  togetherData;
	
	var selectType = $('#togetherSearchFrom').find('input[name=halfGubun]').val();
	
	var seriesData = [];
	var totalValue = 0;
	
	mainData.forEach(function(item,index) {
		seriesData[index] ={'name': item.addr,'colorValue': item.ent_co, value: item.ent_co, 'admCd' :item.bord_cd };
		totalValue = totalValue+ item.ent_co;
	});
	
	
	$('#togetherChart').highcharts(
			{
				colorAxis: {
			        minColor: '#F6F6F6',
			        maxColor: colorRed[0]
			    },
			    series: [{
			        type: 'treemap',
			        layoutAlgorithm: 'squarified',
			        data: seriesData,
			        events:{
				    	click: function(e){
				    		selectToChart(e.point.options.admCd,e.point.options.name);
				        }
			        },
			        cursor: 'pointer',
			    }],
			    title: {
			        text: ''
			    }
	});
	
	$('#tPopTotalTitle').html(getCash(totalValue));
	
	var html = "";
	
	
	$('#tableDummy').html("");
	
	 var selectYear = $('#togetherSearchFrom').find('input[name=year]').val();
	 
	var oneData = "";
	 
	for(var i=0;i < mainData.length; i++){
		for(var j=0;j < togetherData.length; j++){
			
			if(mainData[i].bord_cd == togetherData[j].adm_cd && selectYear == togetherData[j].t_year){
				
				
				var iclass = "";
				if(mainData[i].growth >0 ) iclass = "up";
				else if(mainData[i].growth <0 ) iclass = "down";
				
				var befoPopulation = 0;
				
				
				var befoGrowth = 0;
				
				
				var iclass2 = "";
				
				var testData = ""
				var title1 = "인구";
				var title2 = "명";
				
				 if(selectType == "people"){
					 
					 if(j != 0)                 befoPopulation =   togetherData[j].population - togetherData[j-1].population;
					 if(befoPopulation != 0 ){	befoGrowth = Math.ceil((befoPopulation/togetherData[j-1].population)*1000)/10;	 }
					 
					 testData = '<p><span class="count">'+getCash(Number(togetherData[j].population))+'</span>명</p>';
				 }
				 else if(selectType == "house"){
					 title1 = "주택";
					 title2 = "개";
					 
					 if(j != 0)                 befoPopulation =   togetherData[j].house_cnt - togetherData[j-1].house_cnt;
					 if(befoPopulation != 0 ){	befoGrowth = Math.ceil((befoPopulation/togetherData[j-1].house_cnt)*1000)/10;	 }
					 
					 testData = '<p><span class="count">'+getCash(Number(togetherData[j].house_cnt))+'</span>개</p>';
					
				 }
				 else if(selectType == "home"){
					 title2 = "개";
					 title1 = "가구";
					 
					 if(j != 0)                 befoPopulation =   togetherData[j].household_cnt - togetherData[j-1].household_cnt;
					 if(befoPopulation != 0 ){	befoGrowth = Math.ceil((befoPopulation/togetherData[j-1].household_cnt)*1000)/10;	 }
					 
					 testData = '<p><span class="count">'+getCash(Number(togetherData[j].household_cnt))+'</span>개</p>';
					 
					 
					
				 }
				 else if(selectType == "other"){
					 title2 = "개";
					 title1 = "농림어업";
					 if(j != 0)                 befoPopulation =   togetherData[j].farm_cnt - togetherData[j-1].farm_cnt;
					 if(befoPopulation != 0 ){	befoGrowth = Math.ceil((befoPopulation/togetherData[j-1].farm_cnt)*1000)/10;	 }
					 
					 testData = '<p><span class="count">'+getCash(Number(togetherData[j].farm_cnt))+'</span>개</p>';
				 }
				
				
				$('#tTile1').html(title1);
				$('#tTitle2').html(title1);
				
				if(befoGrowth >0 ) iclass = "up";
				else if(befoGrowth <0 ) iclass = "down";
				
				html += '<tr class="mousePointer" onclick="selectToChart(\''+mainData[i].bord_cd+'\',\''+mainData[i].addr+'\')">';
                html += '<td class="location">';
                html += '<p><span class="num">'+(i+1)+'</span>'+mainData[i].addr+'</p>';
                html += '</td>';
                html += '<td class="company">';
                html += '<div class="num">';
                html += '<p><span class="count">'+getCash(mainData[i].ent_co)+'</span>개</p>';
                html += '</div>';
                html += '<div class="desc">';
                html += '<p class="">‘'+(mainData[i].base_year-1)+'년 대비 '+(mainData[i].ent_co-mainData[i].b_ent_co)+'개('+mainData[i].growth+'%)</p>';
                html += '<i class="'+iclass+'"></i>';
                html += '</div>';
                html += '</td>';
                html += '<td class="people">';
                html += '<div class="num">';
                html += testData
                html += '</div>';
                html += '<div class="desc">';
                html += '<p class="">‘'+(mainData[i].base_year-1)+'년 대비 '+getCash(befoPopulation)+title2+'('+befoGrowth+'%)</p>';
                html += '<i class="'+iclass2+'"></i>';
                html += '</div>';
                html += '</td>';
                html += '</tr>';
				break;
			}
			
		}
	}
	
	
	$('#togetherTable').html(html);
	selectToChart(mainData[0].bord_cd,mainData[0].addr);
	//$('#searchAdmCd').val($('#togetherSearchFrom').find('input[name=adm_cd]').val());
	
	//console.log(togetherData);
	
	selectToChart2(mainData[0].bord_cd,togetherData)
	
	$('#loadDiv').hide();
}

function selectToChart2(code){
	
	var years = [];
	var selectData = [];
	
	var selectType = $('#togetherSearchFrom').find('input[name=halfGubun]').val();
	
	var title = "";
	
	toChartData.forEach(function(item,index) {
		
		if(code == item.adm_cd){
			
			if(selectType == "people"){
					years[item.t_year] = item.t_year;
					selectData[item.t_year] = item.population;
					title ="인구";
			 }
			 else if(selectType == "house"){
				 years[item.t_year] = item.t_year;
				 selectData[item.t_year] = item.house_cnt;
				 title ="주택";
			 }
			 else if(selectType == "home"){
				 years[item.t_year] = item.t_year;
				 selectData[item.t_year] = item.household_cnt;
				 title ="가구";
			 }
			 else if(selectType == "other"){
				 years[item.t_year] = item.t_year;
				 selectData[item.t_year] = item.farm_cnt;
				 title ="농림어업";
			 }
		
		}
		
	});
	
	var seriesData2 = [];
	var titleData2 = [];
	var i = 0;
	
	
	selectData.forEach(function(item,index) {
		seriesData2[i] = Number(item);
		i++;
	});
	
	i = 0;
	years.forEach(function(item,index) {
		titleData2[i] = item;
		i++;
	});
	
	
	//console.log(seriesData2);
	
	
	$('#tChart2').highcharts(
			{
				chart : {
		            type : 'line',
		            style: {			 
		                fontFamily: 'Pretendard', 
		            }
		        },
		        credits: {
		            enabled: false
		        },
		        exporting : {
		            enabled : false
		        },
		        title: {
		            text: '',
		        },
		        subtitle: {
		            text: '',
		        },
		        yAxis: {
		            title: {
		            text: '',
		            },
		            labels: {
		                enabled : false
		            },
		        },
		        xAxis: {
		            labels: {
		                style: {
		                    color: '#666',
		                    fontSize:'12px',
		                    fontWeight: '500',
		                    letterSpacing: '0px',
		                }
		            },
		            categories: titleData2
		        },
		        legend: {
		            enabled: false
		        },
		        plotOptions: {
		            series: {
		                marker: {
		                    enabled: true, //마커 보이기 / 안보이기 [true : 보이기, false : 안보이기]
		                    lineWidth: 2, //라인 굵기
		                    lineColor:'#0475F4', //라인 색
		                    fillColor:'#ffffff'
		                },
		                dataLabels: {
		                    enabled: true, //데이터레이블 보이기/안보이기 [true : 보이기, false : 안보이기]
		                    allowOverlap: true //데이터레이블 겹치기/안겹치기 (안겹치기시 겹치는 데이터레이블 안보임) [true : 겹치다, false : 안겹치다]
		                },
		                events: {
		                    mouseOver: function (event) { //마우스 오버 이벤트[마우스올리면 : show(데이터레이블 보이기)]
		                        $.each(this.data, function(i, point){
		                            point.dataLabel.show();
		                        });
		                    },
		                    mouseOut: function (e) { //마우스 오버 이벤트[마우스내리면 : hide(데이터레이블 안보이기)]
		                        $.each(this.data, function(i, point){
		                            point.dataLabel.hide();
		                        });
		                    }
		                }
		            }
		        },
		        series: [
                    { name:title,
                      data:seriesData2,
                	}
                ]
	 });
	
}



function selectToChart(code,title){
	
	
	$('#searchAdmCd').val(code);
	var formData = $('#searchFrom').serialize();
	$('#toPopupChrtTitle1').html(title);
	
	
	$.ajax({
		type:"POST",
		url: "/view/sbrStats/sbrCompanyInfoListAll",
		data: formData,
		dataType:"json",
		async: false,
		success:function(res){			
			
			var seriesData = [];
			var titleData = [];
			
			res.forEach(function(item,index) {
				seriesData[index] = item.ent_co;
				titleData[index] = item.base_year;
			});
			
			
			$('#tChart1').highcharts(
					{
						chart : {
				            type : 'line',
				            style: {			 
				                fontFamily: 'Pretendard', 
				            }
				        },
				        credits: {
				            enabled: false
				        },
				        exporting : {
				            enabled : false
				        },
				        title: {
				            text: '',
				        },
				        subtitle: {
				            text: '',
				        },
				        yAxis: {
				            title: {
				            text: '',
				            },
				            labels: {
				                enabled : false
				            },
				        },
				        xAxis: {
				            labels: {
				                style: {
				                    color: '#666',
				                    fontSize:'12px',
				                    fontWeight: '500',
				                    letterSpacing: '0px',
				                }
				            },
				            categories: titleData
				        },
				        legend: {
				            enabled: false
				        },
				        plotOptions: {
				            series: {
				                marker: {
				                    enabled: true, //마커 보이기 / 안보이기 [true : 보이기, false : 안보이기]
				                    lineWidth: 2, //라인 굵기
				                    lineColor:'#0475F4', //라인 색
				                    fillColor:'#ffffff'
				                },
				                dataLabels: {
				                    enabled: true, //데이터레이블 보이기/안보이기 [true : 보이기, false : 안보이기]
				                    allowOverlap: true //데이터레이블 겹치기/안겹치기 (안겹치기시 겹치는 데이터레이블 안보임) [true : 겹치다, false : 안겹치다]
				                },
				                events: {
				                    mouseOver: function (event) { //마우스 오버 이벤트[마우스올리면 : show(데이터레이블 보이기)]
				                        $.each(this.data, function(i, point){
				                            point.dataLabel.show();
				                        });
				                    },
				                    mouseOut: function (e) { //마우스 오버 이벤트[마우스내리면 : hide(데이터레이블 안보이기)]
				                        $.each(this.data, function(i, point){
				                            point.dataLabel.hide();
				                        });
				                    }
				                }
				            }
				        },
				        series: [
		                    { name:"전체기업수",
		                      data:seriesData,
		                	}
		                ]
					});
			
		}
	});
	
	
	selectToChart2(code);
}




function getLeftCartData(code){

	$('#searchAdmCd').val(code);
	
	if($('#searchCategory').val() == "2"){
		$('#searchZoom').val("4");
	}
	
	var formData = $('#searchFrom').serialize();

	
	$.ajax({
		type:"POST",
		url: "/view/sbrStats/sbrRegionSignalDataChartData",
		data: formData,
		dataType:"json",
		async: false,
		success:function(res){
			leftChart(res);
			
			setTimeout(function() {
				getLeftCartDataCompany(code);
			}, 50);
			
		}
	});
	
}

function getLeftCartDataCompany(code){
	$('#searchAdmCd').val(code);
	var formData = $('#searchFrom').serialize();
	
	$.ajax({
		type:"POST",
		url: "/view/sbrStats/sbrRegionSignalDataChartDataCompany",
		data: formData,
		dataType:"json",
		async: false,
		success:function(res){
			//leftChart(res);
			comPanyCharData = res;
			leftCompanyChart(1);
			
			setTimeout(function() {
				getLeftCartDataCompanyPeople(code);
			}, 50);
			
		}
	});
}

function getLeftCartDataCompanyPeople(code){
	$('#searchAdmCd').val(code);
	var formData = $('#searchFrom').serialize();
	
	$.ajax({
		type:"POST",
		url: "/view/sbrStats/sbrRegionSignalDataChartDataCompanyPeople",
		data: formData,
		dataType:"json",
		async: false,
		success:function(res){
			comPanyCharDataPeople = res;			
			leftCartDataCompanyPeople(1);
			
			setTimeout(function() {
				getLeftCartDataCompanyArea(code);
			}, 50);
		}
	});
}

function getLeftCartDataCompanyArea(code){
	$('#searchAdmCd').val(code);
	var formData = $('#searchFrom').serialize();
	
	$.ajax({
		type:"POST",
		url: "/view/sbrStats/sbrRegionSignalDataChartDataArea",
		data: formData,
		dataType:"json",
		async: false,
		success:function(res){
			leftCartDataCompanyArea(res);
			
			setTimeout(function() {
				getLeftCartDataCompanyRankList(code);
			}, 50)
		}
	});
}

function getLeftCartDataCompanyRankList(code){
	$('#searchAdmCd').val(code);
	var formData = $('#searchFrom').serialize();
	
	$.ajax({
		type:"POST",
		url: "/view/sbrStats/sbrCompayRankList",
		data: formData,
		dataType:"json",
		async: false,
		success:function(res){
			setCompayRankList(res,code);
		}
	});
}


function setCompayRankList(data){
	
	
	var rank = 0;
	var comAvg = 0; 
	
	var rankList = [];
	var slsectCode1 = $('#searchksic_1_cd').val();
	var slsectCode2 = $('#searchksic_2_cd').val();
	var slsectNm1 = $('#searchksic_1_nm').val();
	var slsectNm2 = $('#searchksic_2_nm').val();
	
	data.forEach(function(item, index){
		
		if(index <3){
			rankList.push(item);
		}
		
		if(item.kisc_cd_1 == slsectCode1){
			if(item.kisc_cd_2 == slsectCode2){
				rank = item.ranknum;
				comAvg =  item.ent_sls_prid_per;
			}
		}
	});
	
	//leftComTxt2
	if(slsectCode1 == "" || slsectCode1 == "0"){
		$('#leftComTxt3').html("전체업종");
		$('#leftComTxt4').html(data[0].total_ent_sls_prid_per+"년");
		$('#leftComTxt5').hide();
		$('#leftComTxt99').show();
		
	}else{
		$('#leftComTxt3').html(slsectNm2);
		$('#leftComTxt4').html(comAvg+"년");
		$('#leftComTxt5').show();
		$('#leftComTxt6').html(rank+"번째");
		$('#leftComTxt99').hide();
	}
	
	$('#leftComList1').html("");
	$('#leftComList2').html("");
	
	
	var litHtml1 = "";
	var litHtml2 = "";
	
	var rankclass = ["one", "two", "three"];
	
	rankList.forEach(function(item,index){
		
		//기업평균
		litHtml1 = "<li class=\"content\">";
		litHtml1 += "<span class=\"rank "+rankclass[index]+"\">"+(index+1)+"</span>";
		litHtml1 += "<span class=\"title\">"+item.ksic_2_nm+"</span>";
		litHtml1 += "<span class=\"per\">"+item.distribution+"%</span>";
		litHtml1 += "</li>";
		$('#leftComList1').append(litHtml1);
		
		//주요 업종
		if(index == 0 ){
			$('#leftComTxt7').html(item.ksic_2_nm);
			var title = "";
			title = getCash(item.ent_co)+"개("+item.distribution+"%)";
			$('#leftComTxt8').html(title);
		}
		
		litHtml2 = "<li class=\"content\">";
		litHtml2 += "<span class=\"rank "+rankclass[index]+"\">"+(index+1)+"</span>";
		litHtml2 += "<span class=\"title\">";
		litHtml2 += "<p>"+item.ksic_2_nm+"</p>";
		
		var upDwon = "";
		if(item.rateincrease>0)upDwon = "icon_up";
		else if(item.rateincrease<0)upDwon = "icon_down";
		
		litHtml2 += "<p class=\"desc\">기업 수 "+getCash(item.ent_co)+"개(전년대비 "+item.rateincrease+"% <i class=\""+upDwon+"\"></i>)</p>";
		litHtml2 += "</span>";
		litHtml2 += "<span class=\"per\">"+item.distribution+"%</span>";
		litHtml2 += "</li>";
		$('#leftComList2').append(litHtml2);
		
		
	});
	
	setLodFlag1(true);
	
}

//하이차트 기본 옵션 설정
Highcharts.setOptions({
	lang: {
  	thousandsSep: ','
  }
})

function leftChart(data){
	
	$('.chartLoadBar1').hide();
	$('.rankChar1').show();
	
	/*var testdata = { "ent_co" : {"2015": 439,"2016": 486,"2017": 665,"2018": 221,"2019": 234,"2020": 532}
	                ,"act_co" : {"2015": 334,"2016": 256,"2017": 551,"2018": 332,"2019": 111,"2020": 456}
	                ,"nact_co" : {"2015": 134,"2016": 656,"2017": 455,"2018": 345,"2019": 345,"2020": 221}};*/
	
	if(data == null){
		alert("정보가 없습니다.");
		return ;
	}
	
	var year = $('#searchYear').val();
	
	
	var toYearData =  data.ent_co[year];
	var beYearData =  data.ent_co[(year-1)];
	
	//기업 갯수
	
	$('#leftTotalCoSpan1').html(getCash(toYearData));
	var calCo = (toYearData-beYearData);
	var calPer = Math.ceil(calCo/toYearData *1000)/10;
	
	var updown = ""; 
	
	if(beYearData == 0 || beYearData == null){
		updown = getCash(calCo)+"개 입니다.";
	}else if(calCo<0){
		updown = "<span class=\"bold\">"+getCash(calCo)+"개"+"("+calPer+"%)</span> 감소했어요";
	}else if(calCo>0){
		updown = "<span class=\"bold\">"+getCash(calCo)+"개"+"("+calPer+"%)</span> 증가했어요";
	}else if(calCo == 0){
		updown = "변함이 없어요.";
	}
		
	//<span class="bold" id="leftTotalCoSpan2">10,000개(1.0%)</span>증가했어요.
	$('#leftTotalCoSpan2').html(updown);
	
	//평균
	var avgYearData =  data.ent_srvl_per_avg[year];
	
	$('#leftTotalCoSpan4').html(Math.ceil(avgYearData*100)/100+"%");
	
	var ksicCd =  $('#searchksic_1_cd').val();
	
	
	if(ksicCd ==""){
		$('#leftComTxt1').html("전체기업 수는");
		$('.leftTitle1').html("전체기업");
	}else{
		$('#leftComTxt1').html($('#searchksic_2_nm').val()+" 전체기업 수는");
		$('.leftTitle1').html($('#searchksic_2_nm').val());
	}
	
	
		
	$('#leftChar1').highcharts(
			{
				chart : {
		            type : 'column',
		            style: {fontFamily: 'Pretendard'}
		        },
		        credits: {enabled: false},
		        exporting : {enabled : false},
		        title: {text: '',},
		        subtitle: {text: '',},
		        yAxis: {
		            title: {text: ''},
		            labels: {enabled : false},
		            gridLineColor: 'transparent' // 차트 내 그리드 선 투명
		        },
		        xAxis: {
		            labels: {
		                enabled:true,
		            },
		            categories: Object.keys(data.ent_co)
		            
		        },
		        legend: {
		            layout: "horizontal",
		            verticalAlign: "bottom",
		            align: "center",
		            itemWidth: 70,
		            symbolWidth: 8,
		            symbolHight: 8,
		            floating: false,
		            borderWidth: 0,
		            backgroundColor: "#FFFFFF",
		            shadow: false,
		            itemStyle: {
		                font: "12px Pretendard",
		                color: "#333",
		            }
		        },
		        plotOptions: {
		            series: {
		                stacking: 'normal',
		                dataLabels: {
		                    enabled: false, //데이터레이블 보이기/안보이기 [true : 보이기, false : 안보이기]
		                    allowOverlap: true//데이터레이블 겹치기/안겹치기 (안겹치기시 겹치는 데이터레이블 안보임) [true : 겹치다, false : 안겹치다]
		                },
		                point: {
				        	
				        },
				        events: {
				            mouseOver: function (event) { //마우스 오버 이벤트[마우스올리면 : show(데이터레이블 보이기)]
				                var hoverSeries = this;                                      
			                    this.chart.series.forEach(function(s){
			                        hoverSeries.update({ 
			                          dataLabels: {
			                            enabled: true
			                          }
			                        });                        
			                    }); 
				            },
				            mouseOut: function (e) { //마우스 오버 이벤트[마우스내리면 : hide(데이터레이블 안보이기)]
				            	
				            	var hoverSeries = this;                                      
			                    this.chart.series.forEach(function(s){
			                        hoverSeries.update({ 
			                          dataLabels: {
			                            enabled: false
			                          }
			                        });                        
			                    }); 
				            }
				        },
		            }
		        },
		        tooltip:{
		        	backgroundColor: "rgba(255,0,0,0)",
		            borderWidth: 0,
		            borderRadius: 0,
		            shadow: false,
		            useHTML: true,
		            outside: true,
		        	formatter: function() {

		        		(this.point.index == 0) 
		        			? lastYear = 0 
		        			: lastYear = this.point.index - 1  
		        		let year = this.key + "년";
		        		let thisData = this.y;
		        		let lastData = this.series.yData[lastYear]
		        		let unit = "개";
		        		let unit2 = "전년대비";
		        		let name = this.series.name; 
		        		let color = this.point.color;
		        		
		        		return tooltipHtml(year,thisData,lastData,unit,unit2,name, color)
		    
		        	}
		        },
		        series: [
		    		{name:"활동",   data:Object.values(data.act_co),color:colorBlue[1], borderColor:colorBlue[0]},
		    		{name:"비활동", data:Object.values(data.nact_co),color:colorOrange[1], borderColor:colorOrange[0]},
		    		{name:"폐업",   data:Object.values(data.clsbiz_co),color:colorGray[1], borderColor:colorGray[0]}
		    	]
	});
	
	
	
	
	$('#leftChar3').highcharts({
		chart : {
            type : 'column',
            style: {fontFamily: 'Pretendard'}
        },
        credits: {enabled: false},
        exporting : {enabled : false},
        title: {text: '',},
        subtitle: {text: '',},
        yAxis: {
            title: {text: ''},
            labels: {enabled : false},
            gridLineColor: 'transparent' // 차트 내 그리드 선 투명
        },
        xAxis: {
            labels: {
                enabled:true,
            },            
            categories: Object.keys(data.ent_co)
        },
        legend: {
            layout: "horizontal",
            verticalAlign: "bottom",
            align: "center",
            itemWidth: 70,
            symbolWidth: 8,
            symbolHight: 8,
            floating: false,
            borderWidth: 0,
            backgroundColor: "#FFFFFF",
            shadow: false,
            itemStyle: {
                font: "12px Pretendard",
                color: "#333",
            }
        },
        plotOptions: {
            series: {
            //     stacking: 'normal',
                grouping: false,
                borderWidth: 0,
                dataLabels: {
                    enabled: false, //데이터레이블 보이기/안보이기 [true : 보이기, false : 안보이기]
                    allowOverlap: true //데이터레이블 겹치기/안겹치기 (안겹치기시 겹치는 데이터레이블 안보임) [true : 겹치다, false : 안겹치다]
                },
                point: {
		        	
		        },
		        events: {
		            mouseOver: function (event) { //마우스 오버 이벤트[마우스올리면 : show(데이터레이블 보이기)]
		                var hoverSeries = this;                                      
	                    this.chart.series.forEach(function(s){
	                        hoverSeries.update({ 
	                          dataLabels: {
	                            enabled: true
	                          }
	                        });                        
	                    }); 
		            },
		            mouseOut: function (e) { //마우스 오버 이벤트[마우스내리면 : hide(데이터레이블 안보이기)]
		            	
		            	var hoverSeries = this;                                      
	                    this.chart.series.forEach(function(s){
	                        hoverSeries.update({ 
	                          dataLabels: {
	                            enabled: false
	                          }
	                        });                        
	                    }); 
		            }
		        },
            }
        },
        tooltip:{
        	backgroundColor: "rgba(255,0,0,0)",
            borderWidth: 0,
            borderRadius: 0,
            shadow: false,
            useHTML: true,
            outside: true,
        	formatter: function() {

        		(this.point.index == 0) 
        			? lastYear = 0 
        			: lastYear = this.point.index - 1  
        		let year = this.key + "년";
        		let thisData = this.y;
        		let lastData = this.series.yData[lastYear]
        		let unit = "개";
        		let unit2 = "전년대비";
        		let name = this.series.name; 
        		let color = this.point.color;
        		
        		return tooltipHtml(year,thisData,lastData,unit,unit2,name, color)
    
        	}
        },
        series: [
                {name:"폐업", data:Object.values(data.clsbiz_co),color:colorGray[0], pointPlacement: -0.2},
                {name:"개업",   data:Object.values(data.opbiz_co),color:colorBlue[0], borderColor:colorBlue[0]},
                    
                ]
	});
	
	

}

function leftCompanyChart(number){
	
	var data = comPanyCharData;
	
	

	var compayLevel = ["대기업","중견기업","중소기업","소상공인"];
	
	$('.rankChar2').show();
	$('.chartLoadBar2').hide();
	
	if(number == 1){
		
			var rowNum = Object.values(data.ltrs_co).length-1;
		
			var last_ltrs      = Object.values(data.ltrs_co)[rowNum];
			var last_mident    = Object.values(data.mident_co)[rowNum];
			var last_smlpz     = Object.values(data.smlpz_co)[rowNum];
			var last_smltrdids = Object.values(data.smltrdids_co)[rowNum];
			
			
			var lastArray = [last_ltrs,last_mident,last_smlpz,last_smltrdids];
			
			var maxIndex = 0;
			var maxVaue = 0;
			
			for(var i= 0;i<rowNum;i++){
				if(maxVaue < lastArray[i]){
					maxIndex = i;
					maxVaue = lastArray[i];
				}
			}
			
			console.log(maxIndex);
			$('#leftTitle9').html(compayLevel[maxIndex]);
			$('#leftTitle10').html(getCash(maxVaue)+"개");
			
			var total_co = last_ltrs+last_mident+last_smlpz+last_smltrdids;
			var total = ((maxVaue/total_co)*1000);
			    total = Math.ceil(total)/10;
			$('#leftTitle11').html(total+"%");
			
		
			
			
			//기업수
			$('#leftChar4').highcharts({
				
				chart : {
		            type : 'line',
		            style: {fontFamily: 'Pretendard',}
		        },
				credits: {enabled: false},
				exporting : {enabled : false},
				title: {text: ''},
				subtitle: {text: ''},
				yAxis: {
				    title: {text: ''},
				    labels: {enabled : false},
				},
				xAxis: {
				    labels: {
				        style: {
				            color: '#666',
				            fontSize:'12px',
				            fontWeight: '500',
				            letterSpacing: '0px',
				        }
				    },
				
				    categories: Object.keys(data.ltrs_co)
				},
				legend: {
				    layout: "horizontal",
				    verticalAlign: "bottom",
				    align: "center",
				    // itemWidth: 200,
				    symbolWidth: 8,
				    symbolHight: 8,
				    floating: false,
				    borderWidth: 0,
				    backgroundColor: "#FFFFFF",
				    shadow: false,
				    itemStyle: {
				        font: "11px Pretendard",
				        color: "#333",
				        align: "center"
				    }
				},
				plotOptions: {
				    series: {
				        marker: {
				            enabled: true, //마커 보이기 / 안보이기 [true : 보이기, false : 안보이기]
				        },
				        dataLabels: {
				            enabled: false, //데이터레이블 보이기/안보이기 [true : 보이기, false : 안보이기]
				            allowOverlap: true //데이터레이블 겹치기/안겹치기 (안겹치기시 겹치는 데이터레이블 안보임) [true : 겹치다, false : 안겹치다]
				        },		
				        point: {
				        	
				        },
				        events: {
				            mouseOver: function (event) { //마우스 오버 이벤트[마우스올리면 : show(데이터레이블 보이기)]
				                var hoverSeries = this;                                      
			                    this.chart.series.forEach(function(s){
			                        hoverSeries.update({ 
			                          dataLabels: {
			                            enabled: true
			                          }
			                        });                        
			                    }); 
				            },
				            mouseOut: function (e) { //마우스 오버 이벤트[마우스내리면 : hide(데이터레이블 안보이기)]
				            	
				            	var hoverSeries = this;                                      
			                    this.chart.series.forEach(function(s){
			                        hoverSeries.update({ 
			                          dataLabels: {
			                            enabled: false
			                          }
			                        });                        
			                    }); 
				            }
				        },
				    }
				},
				tooltip:{
		        	backgroundColor: "rgba(255,0,0,0)",
		            borderWidth: 0,
		            borderRadius: 0,
		            shadow: false,
		            useHTML: true,
		            outside: true,
		        	formatter: function() {

		        		(this.point.index == 0) 
		        			? lastYear = 0 
		        			: lastYear = this.point.index - 1  
		        		let year = this.key + "년";
		        		let thisData = this.y;
		        		let lastData = this.series.yData[lastYear]
		        		let unit = "개";
		        		let unit2 = "전년대비";
		        		let name = this.series.name; 
		        		let color = this.point.color;
		        		
		        		return tooltipHtml(year,thisData,lastData,unit,unit2,name, color)
		    
		        	}
		        },
		        
				series: [
				            {name:"대기업",
				            data: Object.values(data.ltrs_co),
				            color:colorBlue[0],
				            marker: {
				                lineWidth: 2, //라인 굵기
				                lineColor:colorBlue[0], //라인 색
				                fillColor:'#ffffff'
				                }
				            },
				            {name:"중견기업",
				            data:Object.values(data.mident_co),
				            color:colorOrange[0],
				            marker: {
				                lineWidth: 2, //라인 굵기
				                lineColor:colorOrange[0], //라인 색
				                fillColor:'#ffffff'
				                }
				            },
				            {name:"중소기업",
				            data:Object.values(data.smlpz_co),
				            color:colorGray[0],
				            marker: {
				                lineWidth: 2, //라인 굵기
				                lineColor:colorGray[0], //라인 색
				                fillColor:'#ffffff'
				                }
				            },
				            {name:"소상공인",
				            data:Object.values(data.smltrdids_co),
				            color:colorRed[0],
				            marker: {
				                lineWidth: 2, //라인 굵기
				                lineColor:colorRed[0], //라인 색
				                fillColor:'#ffffff'
				                }
				            }
				        ]
			});
			
	}else if(number == 2){
		
		    var rowNum = Object.values(data.ltrs_co).length-1;
		    
			var max_ltrs      = Object.values(data.ltrs_sls_amt)[rowNum];
			var max_mident    = Object.values(data.mident_sls_amt)[rowNum];
			var max_smlpz     = Object.values(data.smlpz_sls_amt)[rowNum];
			var max_smltrdids = Object.values(data.smltrdids_sls_amt)[rowNum];
			
			var maxArray = [max_ltrs,max_mident,max_smlpz,max_smltrdids];
			
			var maxIndex = 0;
			var maxVaue = 0;
			
			for(var i= 0;i<4;i++){
				if(maxVaue < maxArray[i]){
					maxIndex = i;
					maxVaue = maxArray[i];
				}
			}
			
			var total = Math.ceil((maxVaue/(max_ltrs+max_mident+max_smlpz+max_smltrdids)*1000)/10);
			
			$('#leftTitle12').html(compayLevel[maxIndex]+"이 "+ total+"%");
			$('#leftTitle13').html(getCash(maxVaue)+"억원");
			
		
	
			//매출액
			$('#leftChar5').highcharts({
				chart : {
		            type : 'line',
		            style: {fontFamily: 'Pretendard',}
		        },
				credits: {enabled: false},
				exporting : {enabled : false},
				title: {text: ''},
				subtitle: {text: ''},
				yAxis: {
				    title: {text: ''},
				    labels: {enabled : false},
				},
				xAxis: {
				    labels: {
				        style: {
				            color: '#666',
				            fontSize:'12px',
				            fontWeight: '500',
				            letterSpacing: '0px',
				        }
				    },
				    categories: Object.keys(data.ltrs_co)
				},
				legend: {
				    layout: "horizontal",
				    verticalAlign: "bottom",
				    align: "center",
				    // itemWidth: 200,
				    symbolWidth: 8,
				    symbolHight: 8,
				    floating: false,
				    borderWidth: 0,
				    backgroundColor: "#FFFFFF",
				    shadow: false,
				    itemStyle: {
				        font: "11px Pretendard",
				        color: "#333",
				        align: "center"
				    }
				},
				plotOptions: {
				    series: {
				        marker: {
				            enabled: true, //마커 보이기 / 안보이기 [true : 보이기, false : 안보이기]
				        },
				        dataLabels: {
				            enabled: false, //데이터레이블 보이기/안보이기 [true : 보이기, false : 안보이기]
				            allowOverlap: true //데이터레이블 겹치기/안겹치기 (안겹치기시 겹치는 데이터레이블 안보임) [true : 겹치다, false : 안겹치다]
				        },
				        point: {
				        	
				        },
				        events: {
				            mouseOver: function (event) { //마우스 오버 이벤트[마우스올리면 : show(데이터레이블 보이기)]
				                var hoverSeries = this;                                      
			                    this.chart.series.forEach(function(s){
			                        hoverSeries.update({ 
			                          dataLabels: {
			                            enabled: true
			                          }
			                        });                        
			                    }); 
				            },
				            mouseOut: function (e) { //마우스 오버 이벤트[마우스내리면 : hide(데이터레이블 안보이기)]
				            	
				            	var hoverSeries = this;                                      
			                    this.chart.series.forEach(function(s){
			                        hoverSeries.update({ 
			                          dataLabels: {
			                            enabled: false
			                          }
			                        });                        
			                    }); 
				            }
				        },
				    }
				},
				tooltip:{
		        	backgroundColor: "rgba(255,0,0,0)",
		            borderWidth: 0,
		            borderRadius: 0,
		            shadow: false,
		            useHTML: true,
		            outside: true,
		        	formatter: function() {

		        		(this.point.index == 0) 
		        			? lastYear = 0 
		        			: lastYear = this.point.index - 1  
		        		let year = this.key + "년";
		        		let thisData = this.y;
		        		let lastData = this.series.yData[lastYear]
		        		let unit = "개";
		        		let unit2 = "전년대비";
		        		let name = this.series.name; 
		        		let color = this.point.color;
		        		
		        		return tooltipHtml(year,thisData,lastData,unit,unit2,name, color)
		    
		        	}
		        },
				series: [
				            {name:"대기업",
				            data:Object.values(data.ltrs_sls_amt),
				            color:colorBlue[0],
				            marker: {
				                lineWidth: 2, //라인 굵기
				                lineColor:colorBlue[0], //라인 색
				                fillColor:'#ffffff'
				                }
				            },
				            {name:"중견기업",
				            data:Object.values(data.mident_sls_amt),
				            color:colorOrange[0],
				            marker: {
				                lineWidth: 2, //라인 굵기
				                lineColor:colorOrange[0], //라인 색
				                fillColor:'#ffffff'
				                }
				            },
				            {name:"중소기업",
				            data:Object.values(data.smlpz_sls_amt),
				            color:colorGray[0],
				            marker: {
				                lineWidth: 2, //라인 굵기
				                lineColor:colorGray[0], //라인 색
				                fillColor:'#ffffff'
				                }
				            },
				            {name:"소상공인",
				            data:Object.values(data.smltrdids_sls_amt),
				            color:colorRed[0],
				            marker: {
				                lineWidth: 2, //라인 굵기
				                lineColor:colorRed[0], //라인 색
				                fillColor:'#ffffff'
				                }
				            }
				        ]
				
			});
	}else if(number == 3){
		
		var rowNum = Object.values(data.ltrs_co).length-1;
		
		var max_ltrs      = Object.values(data.ltrs_enfsn_co)[rowNum];
		var max_mident    = Object.values(data.mident_enfsn_co)[rowNum];
		var max_smlpz     = Object.values(data.smlpz_enfsn_co)[rowNum];
		var max_smltrdids = Object.values(data.smltrdids_enfsn_co)[rowNum];
		
		var maxArray = [max_ltrs,max_mident,max_smlpz,max_smltrdids];
		
		var maxIndex = 0;
		var maxVaue = 0;
		
		for(var i= 0;i<4;i++){
			if(maxVaue < maxArray[i]){
				maxIndex = i;
				maxVaue = maxArray[i];
			}
		}
		
		var total = Math.ceil((maxVaue/(max_ltrs+max_mident+max_smlpz+max_smltrdids)*1000)/10);
		
		$('#leftTitle14').html(compayLevel[maxIndex]+"이 "+ total+"%");
		$('#leftTitle15').html(getCash(maxVaue)+"명");
		
		//종사자
		$('#leftChar6').highcharts({
			
			chart : {
	            type : 'line',
	            style: {fontFamily: 'Pretendard',}
	        },
			credits: {enabled: false},
			exporting : {enabled : false},
			title: {text: ''},
			subtitle: {text: ''},
			yAxis: {
			    title: {text: ''},
			    labels: {enabled : false},
			},
			xAxis: {
			    labels: {
			        style: {
			            color: '#666',
			            fontSize:'12px',
			            fontWeight: '500',
			            letterSpacing: '0px',
			        }
			    },
			    categories: Object.keys(data.ltrs_co)
			},
			legend: {
			    layout: "horizontal",
			    verticalAlign: "bottom",
			    align: "center",
			    // itemWidth: 200,
			    symbolWidth: 8,
			    symbolHight: 8,
			    floating: false,
			    borderWidth: 0,
			    backgroundColor: "#FFFFFF",
			    shadow: false,
			    itemStyle: {
			        font: "11px Pretendard",
			        color: "#333",
			        align: "center"
			    }
			},
			plotOptions: {
			    series: {
			        marker: {
			            enabled: true, //마커 보이기 / 안보이기 [true : 보이기, false : 안보이기]
			        },
			        dataLabels: {
			            enabled: false, //데이터레이블 보이기/안보이기 [true : 보이기, false : 안보이기]
			            allowOverlap: true //데이터레이블 겹치기/안겹치기 (안겹치기시 겹치는 데이터레이블 안보임) [true : 겹치다, false : 안겹치다]
			        },
			        point: {
			        	
			        },
			        events: {
			            mouseOver: function (event) { //마우스 오버 이벤트[마우스올리면 : show(데이터레이블 보이기)]
			                var hoverSeries = this;                                      
		                    this.chart.series.forEach(function(s){
		                        hoverSeries.update({ 
		                          dataLabels: {
		                            enabled: true
		                          }
		                        });                        
		                    }); 
			            },
			            mouseOut: function (e) { //마우스 오버 이벤트[마우스내리면 : hide(데이터레이블 안보이기)]
			            	
			            	var hoverSeries = this;                                      
		                    this.chart.series.forEach(function(s){
		                        hoverSeries.update({ 
		                          dataLabels: {
		                            enabled: false
		                          }
		                        });                        
		                    }); 
			            }
			        },
			    }
			},
			tooltip:{
	        	backgroundColor: "rgba(255,0,0,0)",
	            borderWidth: 0,
	            borderRadius: 0,
	            shadow: false,
	            useHTML: true,
	            outside: true,
	        	formatter: function() {

	        		(this.point.index == 0) 
	        			? lastYear = 0 
	        			: lastYear = this.point.index - 1  
	        		let year = this.key + "년";
	        		let thisData = this.y;
	        		let lastData = this.series.yData[lastYear]
	        		let unit = "개";
	        		let unit2 = "전년대비";
	        		let name = this.series.name; 
	        		let color = this.point.color;
	        		
	        		return tooltipHtml(year,thisData,lastData,unit,unit2,name, color)
	    
	        	}
	        },
			series: [
			            {name:"대기업",
			            data:Object.values(data.ltrs_enfsn_co),
			            color:colorBlue[0],
			            marker: {
			                lineWidth: 2, //라인 굵기
			                lineColor:colorBlue[0], //라인 색
			                fillColor:'#ffffff'
			                }
			            },
			            {name:"중견기업",
			            data:Object.values(data.mident_enfsn_co),
			            color:colorOrange[0],
			            marker: {
			                lineWidth: 2, //라인 굵기
			                lineColor:colorOrange[0], //라인 색
			                fillColor:'#ffffff'
			                }
			            },
			            {name:"중소기업",
			            data:Object.values(data.smlpz_enfsn_co),
			            color:colorGray[0],
			            marker: {
			                lineWidth: 2, //라인 굵기
			                lineColor:colorGray[0], //라인 색
			                fillColor:'#ffffff'
			                }
			            },
			            {name:"소상공인",
			            data:Object.values(data.smltrdids_enfsn_co),
			            color:colorRed[0],
			            marker: {
			                lineWidth: 2, //라인 굵기
			                lineColor:colorRed[0], //라인 색
			                fillColor:'#ffffff'
			                }
			            }
			        ]
			
		});
		
	}
	
	
	
	
	
}

function leftCartDataCompanyPeople(number){
	
	var data = comPanyCharDataPeople;
	
	$('.rankChar3').show();
	$('.chartLoadBar3').hide();
	
	if(number ==1 ){
		
			
		
			var text = "";
			
			$('#leftTitle16').html(data.main_avrg_agp+"0대");
			
			var total = data.main_m_co + data.main_fm_co;
			
			var gender = data.main_m_co;
			var cgender  = data.main_m_co - data.main_fm_co;
			var isgender = "남성이 여성보다";
			if(data.main_m_co < data.main_fm_co){
				gender = data.main_fm_co;
				cgender  = data.main_fm_co - data.main_m_co;
				isgender = "여성이 남성보다";
			}
			var calcnum = Math.ceil((gender/total)*1000)/10;
			
			
			$('#leftTitle17').html(isgender+" "+cgender+"명("+calcnum+"%) 많아요.");
			
			
			//MAIN_AVRG_AGP
			//MAIN_M_CO
			//MAIN_FM_CO

		
			
			$('#leftChar7').highcharts({
				
				chart : {
		            type : 'column',
		            style: {fontFamily: 'Pretendard',}
		        },
				credits: {enabled: false},
				exporting : {enabled : false},
				title: {text: ''},
				subtitle: {text: ''},
				yAxis: {
				    title: {text: ''},
				    labels: {enabled : false},
				},
				xAxis: {
				    labels: {
				        style: {
				            color: '#666',
				            fontSize:'11px',
				            fontWeight: '500',
				            letterSpacing: '0px',
				        }
				    },
				    categories: ["30대 미만","30대","40대","50대","60대 이상"]
				},
				legend: {
				    layout: "horizontal",
				    verticalAlign: "bottom",
				    align: "center",
				    // itemWidth: 200,
				    symbolWidth: 8,
				    symbolHight: 8,
				    floating: false,
				    borderWidth: 0,
				    backgroundColor: "#FFFFFF",
				    shadow: false,
				    itemStyle: {
				        font: "11px Pretendard",
				        color: "#333",
				        align: "center"
				    }
				},
				plotOptions: {
				    series: {
				        marker: {
				            enabled: true, //마커 보이기 / 안보이기 [true : 보이기, false : 안보이기]
				        },
				        dataLabels: {
				            enabled: false, //데이터레이블 보이기/안보이기 [true : 보이기, false : 안보이기]
				            allowOverlap: true //데이터레이블 겹치기/안겹치기 (안겹치기시 겹치는 데이터레이블 안보임) [true : 겹치다, false : 안겹치다]
				        },
				        point: {
				        	
				        },
				        events: {
				            mouseOver: function (event) { //마우스 오버 이벤트[마우스올리면 : show(데이터레이블 보이기)]
				                var hoverSeries = this;                                      
			                    this.chart.series.forEach(function(s){
			                        hoverSeries.update({ 
			                          dataLabels: {
			                            enabled: true
			                          }
			                        });                        
			                    }); 
				            },
				            mouseOut: function (e) { //마우스 오버 이벤트[마우스내리면 : hide(데이터레이블 안보이기)]
				            	
				            	var hoverSeries = this;                                      
			                    this.chart.series.forEach(function(s){
			                        hoverSeries.update({ 
			                          dataLabels: {
			                            enabled: false
			                          }
			                        });                        
			                    }); 
				            }
				        },
				    }
				},
				tooltip:{
		        	backgroundColor: "rgba(255,0,0,0)",
		            borderWidth: 0,
		            borderRadius: 0,
		            shadow: false,
		            useHTML: true,
		            outside: true,
		        	formatter: function() {

		        		let total = 0;
		        		let idx = this.point.index;
		        		this.series.chart.series.forEach(function(item){
		        			(item.yData[idx]) ? total += parseInt(item.yData[idx]) : total += 0; 
		        		})
		        		
		        		let year = this.key;
		        		let thisData = this.y;
		        		let rate = Math.round((( thisData / total ) * 100) * 10) / 10
		        		let unit = "명";
		        		let unit2 = "비중";
		        		let name = this.series.name; 
		        		let color = this.point.color;
		        		
		        		return tooltipRateHtml(year,thisData,rate,unit,unit2,name, color)
		    
		        	}
		        },
				series: [
				            {name:"남성",
				            data:[data.main_agp30_lt_m_co, data.main_agp30_m_co, data.main_agp40_m_co, data.main_agp50_m_co, data.main_agp60_mt1_m_co],
				            color:colorBlue[1],
				            borderColor:colorBlue[0]
				            },
				            {name:"여성",
				            data:[data.main_agp30_lt_fm_co, data.main_agp30_fm_co, data.main_agp40_fm_co, data.main_agp50_fm_co, data.main_agp60_mt1_fm_co],
				            color:colorOrange[1],
				            borderColor:colorOrange[0]
				            },
				            {name:"성별미상",
				            data:[data.main_agp30_lt_uknwn_co, data.main_agp30_uknwn_co, data.main_agp40_uknwn_co, data.main_agp50_uknwn_co, data.main_agp60_mt1_uknwn_co],				            
				            color:colorGray[1],
				            borderColor:colorGray[0]
				            }
//				            {
//				                type: 'pie',
//				                name: '성별',
//				                data: [{
//				                    name: '남성',
//				                    y: data.main_m_co,
//				                    color: colorBlue[0]
//				                }, {
//				                    name: '여성',
//				                    y: data.main_fm_co,
//				                    color: colorOrange[0]
//				                }, {
//				                    name: '성별미상',
//				                    y: data.main_uknwn_co,
//				                    color: colorGray[0]
//				                }],
//				                center: [5,5],
//				                size: 40,
//				                showInLegend: false,
//				                dataLabels: {
//				                    enabled: false
//				                }
//				            }
				        ]
			});
	}else if(number == 2){
		
		var totla1 = data.rglbr_m_co + data.rglbr_fm_co;
		var totla2 = data.delbr_m_co + data.delbr_fm_co;
		var totla3 = totla1 + totla2;
		
		var flag = true;
		
		if(totla1<totla2) flag = false;
		
		$('#leftTitle18').html(getCash(totla3)+"명");
		var per = 0;
		var cer = 0;
		
		if(flag){
			$('#leftTitle19').html("상용직이 일용직보다");
			per = Math.ceil((totla1-totla2)/totla2*1000)/10;
			cer = totla1-totla2;
			 
		}else{
			$('#leftTitle19').html("일용직이 상용직보다");
			per = Math.ceil((totla2-totla1)/totla1*1000)/10;
			cer = totla2-totla1;
		}
		
		
		$('#leftTitle20').html(cer+"명("+per+"%)");
		
		
			
		
		
		$('#leftChar8').highcharts({
			chart : {
	            type : 'column',
	            style: {fontFamily: 'Pretendard',}
			 },
			credits: {enabled: false},
			exporting : {enabled : false},
			title: {text: ''},
			subtitle: {text: ''},
			yAxis: {
			    title: {text: ''},
			    labels: {enabled : false},
			},
			xAxis: {
			    labels: {
			        style: {
			            color: '#666',
			            fontSize:'12px',
			            fontWeight: '500',
			            letterSpacing: '0px',
			        }
			    },
			    categories: ["상용직","일용직"]
			},
			legend: {
			    layout: "horizontal",
			    verticalAlign: "bottom",
			    align: "center",
			    // itemWidth: 200,
			    symbolWidth: 8,
			    symbolHight: 8,
			    floating: false,
			    borderWidth: 0,
			    backgroundColor: "#FFFFFF",
			    shadow: false,
			    itemStyle: {
			        font: "11px Pretendard",
			        color: "#333",
			        align: "center"
			    }
			},
			plotOptions: {
			    series: {
			        marker: {
			            enabled: true, //마커 보이기 / 안보이기 [true : 보이기, false : 안보이기]
			        },
			        dataLabels: {
			            enabled: true, //데이터레이블 보이기/안보이기 [true : 보이기, false : 안보이기]
			            allowOverlap: true //데이터레이블 겹치기/안겹치기 (안겹치기시 겹치는 데이터레이블 안보임) [true : 겹치다, false : 안겹치다]
			        },
			        point: {
			        	
			        },
			        events: {
			            mouseOver: function (event) { //마우스 오버 이벤트[마우스올리면 : show(데이터레이블 보이기)]
			                var hoverSeries = this;                                      
		                    this.chart.series.forEach(function(s){
		                        hoverSeries.update({ 
		                          dataLabels: {
		                            enabled: true
		                          }
		                        });                        
		                    }); 
			            },
			            mouseOut: function (e) { //마우스 오버 이벤트[마우스내리면 : hide(데이터레이블 안보이기)]
			            	
			            	var hoverSeries = this;                                      
		                    this.chart.series.forEach(function(s){
		                        hoverSeries.update({ 
		                          dataLabels: {
		                            enabled: false
		                          }
		                        });                        
		                    }); 
			            }
			        },
			    }
			},
			tooltip:{
	        	backgroundColor: "rgba(255,0,0,0)",
	            borderWidth: 0,
	            borderRadius: 0,
	            shadow: false,
	            useHTML: true,
	            outside: true,
	        	formatter: function() {

	        		let total = 0;
	        		let idx = this.point.index;
	        		this.series.chart.series.forEach(function(item){
	        			(item.yData[idx]) ? total += parseInt(item.yData[idx]) : total += 0; 
	        		})
	        		
	        		let year = this.key;
	        		let thisData = this.y;
	        		let rate = Math.round((( thisData / total ) * 100) * 10) / 10
	        		let unit = "명";
	        		let unit2 = "비중";
	        		let name = this.series.name; 
	        		let color = this.point.color;
	        		
	        		return tooltipRateHtml(year,thisData,rate,unit,unit2,name, color)
	    
	        	}
	        },
			series: [
			            {name:"남성",
			            data:[data.rglbr_m_co, data.delbr_m_co],
			            color:colorBlue[1],
			            borderColor:colorBlue[0]
			            },
			            {name:"여성",
			            data:[data.rglbr_fm_co, data.delbr_fm_co],
			            color:colorOrange[1],
			            borderColor:colorOrange[0]
			            }
//			            {
//			                type: 'pie',
//			                name: '성별',
//			                data: [{
//			                    name: '남성',
//			                    y: (data.rglbr_m_co+data.delbr_m_co),
//			                    color: colorBlue[0]
//			                }, {
//			                    name: '여성',
//			                    y: (data.rglbr_fm_co+data.delbr_fm_co),
//			                    color: colorOrange[0]
//			                }],
//			                center: [5,5],
//			                size: 40,
//			                showInLegend: false,
//			                dataLabels: {
//			                    enabled: false
//			                }
//			            }
			        ]
			
		});
		
	}
	
	
}

function leftCartDataCompanyArea(data){
	
	
	var year = $('#searchYear').val();
	
	//var toYearData =  data.ent_co[year];
	//var beYearData =  data.ent_co[(year-1)];
	//console.log(data);
	var ymage = 0;
	var psn = 0;
	if(data.ppltn_tot[year] != 0)ymage =  Math.ceil((data.ymage_co[year]/data.ppltn_tot[year])*1000)/10 ;
	if(data.ppltn_tot[year] != 0) psn =  Math.ceil((data.psn_1_family_co[year]/data.ppltn_tot[year])*1000)/10 ;
	
	if(isNaN(ymage))ymage = 0;
	if(isNaN(psn))psn = 0;
	
	//console.log(ymage);
	
	$('#leftTotalCoSpan7').html(getCash(data.ymage_co[year])+"명("+ymage+"%)");
	$('#leftTotalCoSpan8').html(getCash(data.psn_1_family_co[year])+"명("+psn+"%)");
	
	
	$('#leftTotalCoSpan9').html(getCash(data.lnd_area[year])+"㎢");
	$('#leftTotalCoSpan10').html(getCash(data.bd_30yy_mt_rt[year])+"%");
	$('#leftTotalCoSpan11').html(getCash(data.lnd_avg_olnlp[year])+"만원");
	$('#leftTotalCoSpan12').html(getCash(data.lnd_avg_rl_dlpc[year])+"만원");
	$('#leftTotalCoSpan13').html(getCash(data.lnd_deal_co[year])+" 건");
	
	$('.rankChar4').show();
	$('.chartLoadBar4').hide();
	
	$('#leftChar9').highcharts({
				
				chart : {
		            type : 'column',
		            style: {fontFamily: 'Pretendard'}
		        },
		        credits: {enabled: false},
		        exporting : {enabled : false},
		        title: {text: '',},
		        subtitle: {text: '',},
		        yAxis: {
		            title: {text: ''},
		            labels: {enabled : false},
		            gridLineColor: 'transparent' // 차트 내 그리드 선 투명
		        },
		        xAxis: {
		            labels: {
		                enabled:true,
		            },
		            categories: Object.keys(data.lnd_deal_co)
		        },
		        legend: {
		            layout: "horizontal",
		            verticalAlign: "bottom",
		            align: "center",
		            // itemWidth: 70,
		            symbolWidth: 8,
		            symbolHight: 8,
		            floating: false,
		            borderWidth: 0,
		            backgroundColor: "#FFFFFF",
		            shadow: false,
		            itemStyle: {
		                font: "12px Pretendard",
		                color: "#333",
		            }
		        },
		        plotOptions: {
		            series: {
		            //     stacking: 'normal',
		                grouping: false,
		                borderWidth: 0,
		                dataLabels: {
		                    enabled: true, //데이터레이블 보이기/안보이기 [true : 보이기, false : 안보이기]
		                    allowOverlap: false //데이터레이블 겹치기/안겹치기 (안겹치기시 겹치는 데이터레이블 안보임) [true : 겹치다, false : 안겹치다]
		                }
		            }
		        },
		        tooltip:{
		        	backgroundColor: "rgba(255,0,0,0)",
		            borderWidth: 0,
		            borderRadius: 0,
		            shadow: false,
		            useHTML: true,
		            outside: true,
		        	formatter: function() {
		        		
		        		let idx = this.point.index;
		        		let year = this.key + "년";
		        		let thisData = this.y;
		        		let totData = this.series.chart.series[0].yData[idx]; 
		        		let rate = Math.round((thisData / totData) * 100 * 10) / 10		        		
		        		let unit = "개";
		        		let unit2 = "비중";
		        		let name = this.series.name; 
		        		let color = this.point.color;
		        		
		        		return tooltipRateHtml(year,thisData,rate,unit,unit2,name, color)
		    
		        	}
		        },
		        series: [
		                {name:"전체인구", data:Object.values(data.ppltn_tot),color:colorBlue[0],borderColor:colorBlue[0], pointPlacement: -0.2},
		                {name:"청장년인구(15세 ~ 64세)",   data:Object.values(data.ymage_co),color:colorRed[0], borderColor:colorRed[0]},
		                ]
				
				
			});
			
			$('#leftChar10').highcharts({
				chart : {
		            type : 'line',
		            style: {fontFamily: 'Pretendard',}
		        },
					credits: {enabled: false},
					exporting : {enabled : false},
					title: {text: ''},
					subtitle: {text: ''},
					yAxis: {
					    title: {text: ''},
					    labels: {enabled : false},
					},
					xAxis: {
					    labels: {
					        style: {
					            color: '#666',
					            fontSize:'12px',
					            fontWeight: '500',
					            letterSpacing: '0px',
					        }
					    },
					    categories: Object.keys(data.lnd_deal_co)
					},
					legend: {
					    enabled:false
					},
					plotOptions: {
					    series: {
					        marker: {
					            enabled: true, //마커 보이기 / 안보이기 [true : 보이기, false : 안보이기]
					        },
					        dataLabels: {
					            enabled: true, //데이터레이블 보이기/안보이기 [true : 보이기, false : 안보이기]
					            allowOverlap: true //데이터레이블 겹치기/안겹치기 (안겹치기시 겹치는 데이터레이블 안보임) [true : 겹치다, false : 안겹치다]
					        },
					        events: {
					            mouseOver: function (event) { //마우스 오버 이벤트[마우스올리면 : show(데이터레이블 보이기)]
					                $.each(this.data, function(i, point){
					                    point.dataLabel.show();
					                });
					            },
					            mouseOut: function (e) { //마우스 오버 이벤트[마우스내리면 : hide(데이터레이블 안보이기)]
					                $.each(this.data, function(i, point){
					                    point.dataLabel.hide();
					                });
					            }
					        }
					    }
					},
					series: [
					            {name:"노후건물",
					            data:Object.values(data.bd_30yy_mt_rt),
					            color:colorBlue[0],
					            marker: {
					                lineWidth: 2, //라인 굵기
					                lineColor:colorBlue[0], //라인 색
					                fillColor:'#ffffff'
					                }
					            }
					        ]
				
				
			});
	

}


function setChartAdmCd(code){
	selectAdmCd = code;
}

function settChartTitle(title){
	selectTitle = title;
}

function resetAreaData(){
	
	subDataInfo = { "lnd_area":0
	           ,"ppltn_tot":0
	           ,"grid_1k_ppltn_co":0
	           ,"ymage_co":0
	           ,"psn_1_family_co":0
	           ,"ent_tot":0
	           ,"sls_amt":0
	           ,"enfsn_co":0
	           ,"lnd_avg_olnlp":0
	           ,"lnd_avg_rl_dlpc":0
	           ,"lnd_deal_co":0
	           ,"bd_30yy_mt_rt":0
	          };
}

function setArearChart(data){

	$('#measureResultChart1').highcharts({
		chart : {
            renderTo: 'dounutChart',
            type: 'pie',
            style: {			 
                fontFamily: 'Pretendard', 
            }
        },
        credits: {enabled: false}, //highchart 워터마크 숨김처리
        exporting : { enabled : false },
        title: {
            text: '',
        },
        legend: {
            layout: "horizontal",
            verticalAlign: "bottom",
            align: "center",
            itemWidth: 100,
            itemMarginBottom: 5,
            symbolWidth: 8,
            symbolHight: 8,
            floating: false,
            borderWidth: 0,
            backgroundColor: "#FFFFFF",
            shadow: false,
            itemStyle: {
                font: "12px Pretendard",
                color: "#333",
            }
        },
        plotOptions: {
            pie: {//도넛(파이)차트 전체 옵션 지정.
                size: '90%', 
                showInLegend: true, //범례 show/hide 설정. (series 내에서 개별 지정도 가능.)
            }
        },
        series: [
                    {name: '기업규모 현황',
                    borderWidth: 1,        
                    // innerSize:30%,
                    dataLabels: {
                        enabled: false
                    },
                    data: [
                            {name:'대기업',y:data.ltrs_co,sliced:true,color:colorBlue[1],borderColor:colorBlue[0]},
                            {name:'중견기업',y:data.mident_co,sliced:true,color:colorRed[1],borderColor:colorRed[0]},
                            {name:'중소기업',y:data.smlpz_co,sliced:true,color:colorGray[1],borderColor:colorGray[0]},
                            {name:'소상공인',y:data.smltrdids_co,sliced:true,color:colorOrange[1],borderColor:colorOrange[0]}
                        ]
                    }
                ],
		
		
	});
}

/*
 * @name			: tooltipHtml
 * @description		: 툴팀 html 
 * @param {string} year   	 기준년도
 * @param {string} thisData  해당년도 데이터
 * @param {string} lastData  전년도 데이터
 * @param {string} unit      단위
 * @param {string} unit2 	 (전년대비, 대비)
 * @param {string} name 	 지표명
 * @param {string} color 	 보더 컬러
 * @returns {String} html 	 
 * */
function tooltipHtml(year, thisData="", lastData="",unit, unit2 , name, color){
	let html = ``;
	let arrow = "";
	let rate = Math.round((((thisData - lastData) / lastData) * 100) * 10) / 10 
	
	isFinite(rate) ? rate = rate : rate = "-";  
	isNaN(rate) ? rate = "-" : rate = rate;
	
	(rate == "-" || rate == "0")	
		? arrow = ""
		: (rate > 0) 
			? arrow = "up"
			: arrow = "down";
		
	html = `<ul class="chartTipBox" style="border:1px solid ${color}">`;
	html += `<li class="title">${year}</li>`	
	html += `<li class="inline"><span class="title">${name}</span><span class="count">`+Highcharts.numberFormat(thisData, 0)+`${unit}</span></li>`;
	html += `<li class="inline"><span class="title">${unit2}</span><span class="per ${arrow}">${rate}%</span></li>`
	html += `</ul>`;
		
	return html;
	
}

function tooltipRateHtml(year, thisData="", rate="",unit, unit2 , name, color){
	let html = ``;
	let arrow = "";
	//let rate = Math.round((((thisData - lastData) / lastData) * 100) * 10) / 10
	 
	
	isFinite(rate) ? rate = rate : rate = "-";  
	isNaN(rate) ? rate = "-" : rate = rate;
		
	html = `<ul class="chartTipBox" style="border:1px solid ${color}">`;
	html += `<li class="title">${year}</li>`	
	html += `<li class="inline"><span class="title">${name}</span><span class="count rate">`+Highcharts.numberFormat(thisData, 0)+`${unit}</span></li>`;
	html += `<li class="inline"><span class="title">${unit2}</span><span class="per rate">${rate}%</span></li>`
	html += `</ul>`;
		
	return html;
	
}

function openMapData(data){
	
	if(data.length <1){
		alert("기업정보가 없습니다.");
		resetAtearinfo(false);
		return ;
	}
	
	$('#arearLeftDataDiv').show();
	$('#arearInforLnd').html(getCash(data[0].lnd_area));
	$('#arearInforEnt').html(getCash(data[0].ent_tot));
	setArearChart(data[0]);
	
	
	$('#areaInfoComList').html("");
	data.forEach(function(item, index){
		
		var html = "";
		
		    html += "<tr>";
		    html += "  <td title='"+item.ksic_2_nm+"'>"+item.ksic_2_nm+"</td>";
		    html += "  <td>"+getCash(item.ent_co)+"</td>";
		    html += "  <td>"+item.distribution+"%</td>";
		    html += "</tr>";
		    
		
		    $('#areaInfoComList').append(html);
		
	});
	
	
	
}



function setRechart(){
	setLinChart(resultChartData1);
	setPieChart(resultChartData2);
	setTriangleChart(resultChartData3);
	
}


function getMaketIndoDAta(admCd){
	
	$.ajax({
		type:"POST",
		url: "/view/sbrStats/sbrMaketInfo",
		data: {"year": $('#searchYear').val(),"adm_cd": admCd},
		dataType:"json",
		async: false,
		success:function(res){
			
			if(res.msgCd != 0){
				alert(res.msg);
				$('#maketPopupDiv').hide();
				return ;
			}
			
			$('#maketPopupDiv').show();
			
			setMaketChaart(res);
			
			$('#maketText1').html(res.open_type);
			$('#maketText2').html(res.product);
			$('#maketText3').html(res.owner);
			$('#maketText4').html(res.size_type);
			$('#maketText5').html(res.close_days);
			$('#maketText6').html(res.build_type);
			
			$('#maketIconList li').each(function(){
				$(this).removeClass("active");
			});
			
			if(res.kids_room == 1)$('#maketIcon1').addClass("active");
			if(res.info_center == 1)$('#maketIcon2').addClass("active");
			if(res.rest_room == 1)$('#maketIcon3').addClass("active");
			if(res.nursing_room == 1)$('#maketIcon4').addClass("active");
			if(res.locker == 1)$('#maketIcon5').addClass("active");
			if(res.bike_lot == 1)$('#maketIcon6').addClass("active");
			if(res.cart == 1)$('#maketIcon7').addClass("active");
			if(res.parking_lot == 1)$('#maketIcon8').addClass("active");
			
			
		}
	});
	
}

function setMaketChaart(data){
	
	
	$('#tMarketchart1').highcharts({
        chart : {
            renderTo: 'dounutChart',
            type: 'pie',
            style: {			 
                fontFamily: 'Pretendard', 
            }
        },
        credits: {enabled: false}, //highchart 워터마크 숨김처리
        exporting : { enabled : false },
        title: {
            text: '',
        },
        legend: {
            layout: "vertical",
            verticalAlign: "middle",
            align: "right",
            itemWidth: 70,
            itemMarginBottom: 5,
            symbolWidth: 8,
            symbolHight: 8,
            floating: false,
            borderWidth: 0,
            backgroundColor: "#FFFFFF",
            shadow: false,
            itemStyle: {
                font: "12px Pretendard",
                color: "#333",
            }
        },
        plotOptions: {
            pie: {
                size: '90%', 
                showInLegend: true, 
            }
        },
        series: [
                    {name: '활동현황',
                    borderWidth: 1,        
                    dataLabels: {
                        enabled: false
                    },
                    data: [
                            {name:'영업점포',y:data.store_cnt,sliced:true,color:colorBlue[1],borderColor:colorBlue[0]},
                            {name:'기타점포',y:data.etc_cnt,sliced:true,color:colorRed[1],borderColor:colorRed[0]},
                            {name:'공실점포',y:data.empty_cnt,sliced:true,color:colorGray[1],borderColor:colorGray[0]},
                            {name:'노점',   y:data.stall_cnt,sliced:true,color:colorOrange[1],borderColor:colorOrange[0]}
                        ]
                    }
                ],
    });
	
}



function setLodFlag1(flag){
	leftLodFlag1 = flag;
}

function setLodFlag2(flag){
	leftLodFlag2 = flag;
}

function getLoadFlag(){
	if(leftLodFlag1 && leftLodFlag2) return true;
	else                             return false;
}

function setLastYear(year){
	lastSelectYear = year;
}