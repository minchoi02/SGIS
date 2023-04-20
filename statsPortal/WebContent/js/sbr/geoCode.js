let flagF = true; 
let ReCode = "";
let lastCode = "";
let rankTitle = "";
let areaInfoMode = false;
let lastCd = "";

function getReversGeoCode(map){
	
	console.log(areaInfoMode);
	if(areaInfoMode) return;
	
	var x_coor = map.center[0];
	var y_coor = map.center[1];
	
	$('#searchZoom').val(map.zoom);
	$('#loadDiv').show();
	
	var searchArea = $('#searchArea').val();
	
	if(map.zoom < 4 && sMap.map.mapCategory != 2 && searchArea == 1){
		if(flagF){
			$.ajax({
				  type: "POST",
				  url: "/js/data/geo_sido_" + $('#searchYear').val() + ".js",
				  dataType: "json",
				  success: function(res) {
					  $sbrActiveMap.ui.polygonData = res;					  flagF = false;
					  rankTitle = "전국 시도 지역순위";
					  setTimeout(function() {
						  setRank(map,"00",res);
					  }, 50);
				  } ,
			});
		}else{
			$('#loadDiv').hide();
		}
		
	}else{
		$.ajax({
			  type: "GET",
			  url: openApiPath + "/OpenAPI3/addr/rgeocode.json",
			  data : {"accessToken" : accessToken,"addr_type" :  "20","x_coor" :  x_coor,"y_coor" : y_coor,"bnd_year" :  $('#searchYear').val()},
			  dataType: "json",
			  success: function(res) {
				  var admCd = "";
				  if(res.result == null || res.errCd != "0"){ 
					  $('#loadDiv').hide();
					  return null;
				  
				  }
				  var titleLevel = 0 ;
				  
				  if(map.zoom < 7) {
					  mapCd = res.result[0].sido_cd;
					  rankTitle = res.result[0].sido_nm;
					  titleLevel = 1;
				  }else{
					  mapCd = res.result[0].sido_cd+""+res.result[0].sgg_cd;
					  rankTitle = res.result[0].sido_nm + " " + res.result[0].sgg_nm;
					  titleLevel = 2;
				  }
				  
				  if(map.zoom < 4) {
					  admCd = res.result[0].sido_cd;
				  }else if(map.zoom < 7){
					  admCd = res.result[0].sido_cd+""+res.result[0].sgg_cd;
				  }else{
					  admCd = res.result[0].sido_cd+""+res.result[0].sgg_cd+""+res.result[0].emdong_cd;
				  }
				  
				  if(lastCd == ""){
					  lastCd = res.result[0].sido_cd+""+res.result[0].sgg_cd;
				  } 
				  
				  if(sMap.map.mapCategory == 2){
					  
					  if(searchArea == 1){
						  rankTitle = "전국 시군구 지역순위";
					  }else if(searchArea == 2){
						  rankTitle = "전국 산업단지 지역순위";
					  }else if(searchArea == 3){
						  rankTitle = "전국 상권 지역순위";
					  }else if(searchArea == 4){
						  rankTitle = "전국 전통시장 지역순위";
					  }else if(searchArea == 5){
						  rankTitle = "전국 도시화 지역순위";
					  }else{
						  rankTitle = "전국 시군구 지역순위";
					  }
					  
				  
				  }else{
					  
					  if(searchArea == 2){
						  rankTitle = "화면 내 산업단지 지역순위";
					  }else if(searchArea == 3){
						  rankTitle = "화면 내 상권 지역순위";
					  }else if(searchArea == 4){
						  rankTitle = "화면 내 전통시장 지역순위";
					  }else if(searchArea == 5){
						  rankTitle = "화면 내 도시화 지역순위";
					  }else{
						  if(titleLevel == 1)  rankTitle = rankTitle + " 시군구 지역 순위";
						  else if(titleLevel == 2)  rankTitle = rankTitle + " 읍면동 지역 순위" ;
					  }
					  
				  }
				  
				  
				  if(res.errCd == "-100"){
					  $('#loadDiv').hide();
					  return ;
				  }
				  
				  setTimeout(function() {
					  getHadMareaCode(map,admCd,mapCd);
				  }, 50);

				  ReCode = res;					  
				  				  				  flagF = true;
				  
				  

			  }   
		});
	
	}
}

function getHadMareaCode(map,admCd,mapCd){
		
	
	   var category =  $('#searchCategory').val();
	   if(category == ""){
		   category =1;
		   $('#searchCategory').val(1);
	   }
	

	   
	   var dataUrl = openApiPath + "/OpenAPI3/boundary/hadmarea.geojson";
	   var data = {"accessToken" : accessToken,"adm_cd" : mapCd ,"year" :  $('#searchYear').val(),"low_search": "1"};
	   if($('#searchArea').val() != 1  || $('#searchCategory').val() == 2){
		   var center_Point = "POINT("+map.center[0]+" "+map.center[1]+")";
		   dataUrl = openApiPath +"/OpenAPI3/sbr/sbrArea.geojson";
		   data = {"accessToken" : accessToken,"adm_cd" : mapCd ,"year" :  $('#searchYear').val(),"low_search": "1", "areaInfo": $('#searchArea').val() ,"category":category,"center_Point":center_Point,"zoom":map.zoom};
	   }
	   
		$.ajax({
			  type: "GET",
			  url: dataUrl,
			  data : data,
			  dataType: "json",
			  success: function(res) {
				  
				  $sbrActiveMap.ui.polygonData = res;
				  setTimeout(function() {
					  setRank(map,admCd,res);
					  //getMapdata(map,null,null);
				  }, 50);
			  }   
		});
}




function setRank(map,admCd,mapData){
	if(admCd == lastCode){
		$('#loadDiv').hide();
		return ;
	}
	lastCode = admCd;
	$('#searchAdmCd').val(admCd);
	$('#searchCategory').val(sMap.map.mapCategory);
	
	sMap.map.mapDataInfo = mapData;
	
	var admCdList = [];
	mapData.features.forEach(function(item,index){
		if($('#searchArea').val() == 1)	admCdList[index] = item.properties.adm_cd;
		else                         	admCdList[index] = item.properties.search_id;
	});

	$('#searchAdminCdList').val(admCdList);
	var formData = $('#searchFrom').serialize();	
	
	$.ajax({
		method: "POST",
		async: true,
		url: "/view/sbrStats/sbrRankListInfo",
		data: formData,
		dataType: "json",
		success: function(res) {
			
			$('#ranklistUl').scrollTop(0);
			
			sMap.map.rankData = res;
			var count = res.length;
			html = "";
			html += '<li class="header rankHeader">';
			html += '<div class="rankTitle">';
				html += '<div>';
					html += `<i class="mapIcon"></i>`;
					html += '<span class="title">'+rankTitle+'</span>'; // searchAdmCd  김흥교 과장 처리예정
				html += '</div>';
				html += "<span class='count' style=\"font-size: 13px;\">(전체 : "+count+"건)</span>";			
			html += '</div>';
		
			var theme = $('#searchTheme').val();
			
			
			if(theme == 1  || theme ==  2 || theme == 3  || theme == 4 ||  theme == 5 ||  theme == 8){
				
				html += "  <span class=\"area wd47\">지역</span>";
				html += "  <span class=\"company wd22\" onclick=\"setOrder(1)\">기업 <i class=\"default\"></i></span>";    // 0,000,000건
				html += "  <span class=\"year wd18\" onclick=\"setOrder(2)\">전년대비 <i class=\"sortDown\"></i></span>";	// 000.0%
				html += "  <span class=\"dist wd13\" onclick=\"setOrder(3)\">분포 <i class=\"sortUp\"></i></span>";		// 00.0%
				html += "</li>";
				
				html += "";
				
			}else if(theme == 6){
				
				html += "  <span class=\"area wd47\">지역</span>";
				html += "  <span class=\"company wd13\" onclick=\"setOrder(1)\">생존율 <i class=\"default\"></i></span>";	// 000.0%
				html += "  <span class=\"year wd18\" onclick=\"setOrder(2)\">전년대비 <i class=\"sortDown\"></i></span>";   // 000.0%
				html += "  <span class=\"dist wd22\" onclick=\"setOrder(3)\">기업 <i class=\"sortUp\"></i></span>";		// 0,000,000건
				html += "</li>";
				html += "";
				
			}else if(theme == 7){
				
				html += "  <span class=\"area wd42\">지역</span>";
				html += "  <span class=\"company wd18\" onclick=\"setOrder(1)\">영업기간 <i class=\"default\"></i></span>";   // 000.0년
				html += "  <span class=\"year wd18\" onclick=\"setOrder(2)\">전년대비 <i class=\"sortDown\"></i></span>";	  // 000.0%
				html += "  <span class=\"dist wd22\" onclick=\"setOrder(3)\">기업 <i class=\"sortUp\"></i></span>";		  // 0,000,000건
				html += "</li>";
				html += "";
				
			}
			
			var maxRank = 1;
			res.forEach(function(data,index) {
				
				var iclass = "";
				if(data.growth >0 ) iclass = "up";
				else if(data.growth <0 ) iclass = "down";
				
				var x_coor = data.x_coor;
				var y_coor = data.y_coor;
				if(data.center_point != null){
					var point = data.center_point.split(" ");
					
					x_coor = point[0].replace("POINT(","");
					y_coor = point[1].replace(")","");
				}
				
				 
				html += '<li onclick="showRankDetail(\''+data.bord_cd+'\',\''+x_coor+'\',\''+y_coor+'\',\''+data.addr+'\')" id="rankScroll'+data.bord_cd+'" title="'+data.addr+'">';
				
				if(theme == 1  || theme ==  2 || theme == 3  || theme == 4 ||  theme == 5 ||  theme == 8){
					html += '<span class="wd47" style="text-overflow: ellipsis; display: inline-block;white-space: nowrap;overflow: hidden;" ><i class="rank">' + (index+1) + '</i>'+data.addr+'</span>';
				}
				if(theme == 6){
					html += '<span class="wd47" style="text-overflow: ellipsis; display: inline-block;white-space: nowrap;overflow: hidden;"><i class="rank">' + (index+1) + '</i>'+data.addr+'</span>';
				}
				if(theme == 7){
					html += '<span class="wd42" style="text-overflow: ellipsis; display: inline-block;white-space: nowrap;overflow: hidden;"><i class="rank">' + (index+1) + '</i>'+data.addr+'</span>';
				}
				
				
				var data2 = isNA(data);
	            
	            if(theme == 1  || theme ==  2 || theme == 3  || theme == 4 ||  theme == 5 ||  theme == 8){
					
	            	html += '<span class="wd22">'+getCash(data2.ent_co)+'개</span>';
					
				}else if(theme == 6){
					
					html += '<span class="wd13">'+perNumberSet(getRoundNum(data2.ent_co))+'%</span>';
					
				}else if(theme == 7){
					
					html += '<span class="wd18">'+perNumberSet(getRoundNum(data2.ent_co))+'년</span>';
					
				}
	            
	            // column 3
	            if(theme == 1  || theme ==  2 || theme == 3  || theme == 4 ||  theme == 5 ||  theme == 8){
	            	html += '<span class="wd18">'+perNumberSet(data2.growth)+'% <i class="'+iclass+'"></i></span>';
	            } else if(theme == 6){
	            	html += '<span class="wd18">'+perNumberSet(data2.growth)+'% <i class="'+iclass+'"></i></span>';
	            } else if(theme == 7){
	            	html += '<span class="wd18">'+perNumberSet(data2.growth)+'% <i class="'+iclass+'"></i></span>';
	            }
	            
	            
	            //column4
	            if(theme == 1  || theme ==  2 || theme == 3  || theme == 4 ||  theme == 5 ||  theme == 8){
					
	            	html += '<span class="wd13">'+perNumberSet(data2.distribution)+'%</span>';
					
				}else if(theme == 6){
					
					html += '<span class="wd22">'+getCash(data2.ent_sls_prid_co)+'개</span>';
					
				}else if(theme == 7){
					
					html += '<span class="wd22">'+getCash(data2.ent_srvl_co)+'개</span>';
					
				}
	            
	            html += '</li>';
	            
	            maxRank++;
			});
			
			$(".rankList.table").html(html);
			
			rankExpandSet();

			if($('#searchCategory').val() ==2){
				setRankValueSide(maxRank);
			}
			
			getMapdata(map,admCd,mapData);
			
			
			if (getRankMenuFlag()) {
				
				if(count <= 11){
					$(".rankWrapper").addClass('isScroll')
			        $(".rankBtn .btnLine p").text("펼쳐보기");        
			        $('.rankWrapper').css("height","");
					
				}else{
					
					$(".rankWrapper, .naviWrapper").addClass('isScroll')
			        $(".rankWrapper").removeClass('isScroll')
			        $('.rankList.table li').show();
			        $(".rankBtn .btnLine p").text("축소보기");
				}
				
				rankResize();
			}
			
		}
	});
}

function isNA(data){
	
	
	
	if(data.ent_co < 4){
		var data2 = {"ent_co" : "N/A","growth" : "N/A","distribution" : "N/A","ent_sls_prid_co" : "N/A","ent_srvl_co" : "N/A"};
		return data2;
	}
	return data;
}

function getRoundNum(number){
	
	number = Math.ceil(number*100)/100;
	return number; 
}

let oderType = 1;
let oderValue = 0; 

function setOrder(number){
	
    if(oderType == 1 ) oderType =2;
	else if(oderType == 2 ) oderType =1;
	
	oderValue = number;
	
	
	$('#searchOrderBy').val(oderType);
	$('#searchOrderByType').val(number);
	flagF = true;
	lastCode = "";
	$sbrActiveMap.ui.mapList[0].getMapPolygon();
	
}

function getMapdata(map,admCd,data){
	
	$('#searchAdmCd').val(admCd);
	var formData = $('#searchFrom').serialize();
	
	
	if($('#searchArea').val() == 1){
	
		console.log("1");
	  data.features.forEach(function(item,index){
		  sMap.map.rankData.forEach(function(item2,index2){
			  
			  if(item.properties.adm_cd.length == 7){
				  item.properties.adm_cd = item.properties.adm_cd+"0";
			  }
			  
			  if(item.properties.adm_cd == item2.bord_cd){
				  item.properties.value = item2.ent_co;
				  item.properties.rank = item2.ranknum;
			  }
		  });
	  });
	
	}else{
		console.log("2");
		data.features.forEach(function(item,index){
			  sMap.map.rankData.forEach(function(item2,index2){
				  
				  if(item.properties.search_id == item2.bord_cd){
					  item.properties.value = item2.ent_co;
					  item.properties.rank = item2.ranknum;
				  }
			  });
		  });
		
		
	}
	
	  
	  //임시 데이터 없어서 처리
	  data.features.forEach(function(item,index){
		  if(item.properties.value == null ){
			  item.properties.value = 0;
		  }
	  });
	  map.setLegendForStatsData(data);
	  map.addPolygonGeoJson(data,"polygon");
	  
	  if($sbrActiveMap.ui.isTogether){
		  getTogetherMapData($sbrActiveMap.ui.mapList[1],admCd);
	  }
	  
	  if(!getBizSelectMode())$('#loadDiv').hide();
	  else{
		  
		  var crruntCode = admCd.substring(0,5); 
		  console.log(crruntCode);
		  console.log(lastCd);
		  
		  if(crruntCode != lastCd){
			  selectBizCode();
			  lastCd = crruntCode; 
		  }else{
			  $('#loadDiv').hide();  
		  }
		  
		  //$('#loadDiv').hide();
	  }
	  
}



function getTogetherMapData(map,admCd){
	
	$('#togetherSearchFrom').find('input[name=adm_cd]').val(admCd);
	
	var selectType = $('#togetherSearchFrom').find('input[name=halfGubun]').val();
	
	 //alert(selectType);
	 var url = "";
	 var formData = "";

	 console.log(map);
	 
	 if(selectType == "people"){
		 url = "/view/sbrStats/innersearchpopulationForBorough";
		 formData = getFormCharData(1,admCd,'N');
	 }
	 else if(selectType == "house"){
		 url = "/view/sbrStats/house";
		 formData = getFormCharData(2,admCd,'N');
	 }
	 else if(selectType == "home"){
		 url = "/view/sbrStats/household";
		 formData = getFormCharData(3,admCd,'N');
	 }
	 else if(selectType == "other"){
		 formData = getFormCharData(4,admCd,'N');
		 url = "/view/sbrStats/farmhousehold";
	 }else url = "/view/sbrStats/innersearchpopulationForBorough";
	 
	 
	
	//var formData = $('#togetherSearchFrom').serialize();
	
	
	
	$.ajax({
		  type: "POST",
		  url: url,
		  data : formData,
		  dataType: "json",
		  success: function(res) {
			  
			  	
			  	
			  	 if(selectType == "people"){
			  		setPopulationData(map,res);
				 }
				 else if(selectType == "house"){
					 setHouseData(map,res);
				 }
				 else if(selectType == "home"){
					 setHomeData(map,res);
				 }
				 else if(selectType == "other"){
					// alert(selectType);
					 setOtherData(map,res);
				 }
			  
			
			  
			  
		  }   
	});
	
}


function setPopulationData(map,res){
	
	  
	
	  $sbrActiveMap.ui.polygonData.features.forEach(function(item,index){
		  res.forEach(function(item2,index2){
			  if(item.properties.adm_cd == item2.adm_cd ){
					item.properties.value = item2.population;
			  }
		  });
	  });
	  map.setLegendForStatsData($sbrActiveMap.ui.polygonData);
	  map.addPolygonGeoJson($sbrActiveMap.ui.polygonData,"polygon");
}


function setHouseData(map,res){
	
	 $sbrActiveMap.ui.polygonData.features.forEach(function(item,index){
		  res.forEach(function(item2,index2){
			  if(item.properties.adm_cd == item2.adm_cd ){
					item.properties.value = item2.house_cnt;
			  }
		  });
	  });
	  map.setLegendForStatsData($sbrActiveMap.ui.polygonData);
	  map.addPolygonGeoJson($sbrActiveMap.ui.polygonData,"polygon");
	  
}

function setHomeData(map,res){
	
	  $sbrActiveMap.ui.polygonData.features.forEach(function(item,index){
		  res.forEach(function(item2,index2){
			  if(item.properties.adm_cd == item2.adm_cd ){
					item.properties.value = item2.household_cnt;
			  }
		  });
	  });
	  map.setLegendForStatsData($sbrActiveMap.ui.polygonData);
	  map.addPolygonGeoJson($sbrActiveMap.ui.polygonData,"polygon");
	 
}

function setOtherData(map,res){
	
	  $sbrActiveMap.ui.polygonData.features.forEach(function(item,index){
		  res.forEach(function(item2,index2){
			  
			  if(item.properties.adm_cd == item2.adm_cd ){
					item.properties.value = item2.farm_cnt;
			  }
		  });
	  });
	  map.setLegendForStatsData($sbrActiveMap.ui.polygonData);
	  map.addPolygonGeoJson($sbrActiveMap.ui.polygonData,"polygon");
}


function getFormCharData(number,admCd,isOne){
	
	if(isOne == "" || isOne == null)isOne ="N";
	
	//테스트서버 2021 변경 해야함
	var  bnd_year = "2021";
	
	
	var data =[];
	if(number ==1 ){
		data = {"accessToken":accessToken
				,"gender":$('#togetherSearchFrom').find('input[name=gender]').val()
				,"area_type":"0"
			    ,"year":$('#togetherSearchFrom').find('input[name=year]').val()
				,"low_search":1,"adm_cd":admCd,"bnd_year":bnd_year,'isOne':isOne
				,"age_from":$('#togetherSearchFrom').find('input[name=age_from]').val()
				,"age_to":$('#togetherSearchFrom').find('input[name=age_to]').val()
				};
	}else if(number == 2 ){
		data = {"accessToken":accessToken
				,"area_type":"0"
				,"year":$('#togetherSearchFrom').find('input[name=year]').val()
				,"low_search":1
			    ,"adm_cd":admCd
			    ,"bnd_year":bnd_year
			    ,"house_type":$('#togetherSearchFrom').find('input[name=house_type]').val()
			    ,"rd_const_year":$('#togetherSearchFrom').find('input[name=rd_const_year]').val()
			    ,'isOne':isOne};
	}else if(number == 3 ){
		data = {"accessToken":accessToken
				,"area_type":"0"
				,"year":$('#togetherSearchFrom').find('input[name=year]').val()
				,"other_type" : "1"
				,"low_search":1
				,"adm_cd":admCd
				,"bnd_year":bnd_year
				,"household_type":$('#togetherSearchFrom').find('input[name=household_type]').val()
				,'isOne':isOne};
		
		
	}else if(number == 4 ){
		//농가
		
		data = { "accessToken":accessToken
				 ,"gender":"0"
				 ,"area_type":"0"
				 ,"year":"2020"
				 ,"low_search":1
				 ,"adm_cd":admCd
				 ,"bnd_year":bnd_year
				 ,"other_type":$('#togetherSearchFrom').find('input[name=farmType]').val()
				 ,'isOne':isOne};
		
	}
	
	return data; 
}




function setFlagF(falg){
	flagF = falg;
}


function getReCode(){
	return ReCode;
}



function setLastCode(data){
	lastCode = data;
}

var sliderTs = null;

function setRankValueSide(maxRank){
	
	var rankValue = [];
	maxRank = maxRank -1;
	
	for(var i=0; i<maxRank; i = i+10){
		var j = i;
		if(j == 0) j=1;
		rankValue.push(j);
	}
	rankValue.push(maxRank);
	
	if(sliderTs != null) sliderTs.destroy();
	
	sliderTs = new rSlider({
		    target: '#slider',
		    values: rankValue,
		    range: true,
		    tooltip: true,
		    scale: true,
		    labels: false,
		    set: [1, maxRank],
		    onChange:(value)=> {
		        	var rank = value.split(",");
		        	$('#rankStart').val(rank[0]);
		        	$('#rankEnd').val(rank[1]);
		        	getMapdata($sbrActiveMap.ui.mapList[0],"00",sMap.map.mapDataInfo);
		    }
		});
	
	
}

function setAreaInfoMode(mode){
	areaInfoMode = mode;
}