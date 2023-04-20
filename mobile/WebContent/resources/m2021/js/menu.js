const globalMenu = [
	{
		name:"통계주제도",
		use:true,
		children:[
			{
				name:"인구와 가구",
				url:contextPath+"/m2020/map/thematic/thematicMap.sgis?selParam=CTGR_001&menuIndex=0",
				srvlog:"javascript:srvLogWrite('O0', '51', '01', '03', '통계주제도-인구와 가구', '')"
			},
			{
				name:"주거와 교통",
				url:contextPath+"/m2020/map/thematic/thematicMap.sgis?selParam=CTGR_002&menuIndex=1",
				srvlog:"javascript:srvLogWrite('O0', '51', '01', '03', '통계주제도-주거와 교통', '')"
			},
			{
				name:"복지와 문화",
				url:contextPath+"/m2020/map/thematic/thematicMap.sgis?selParam=CTGR_003&menuIndex=2",
				srvlog:"javascript:srvLogWrite('O0', '51', '01', '03', '통계주제도-복지와 문화', '')"
			},
			{
				name:"노동과 경제",
				url:contextPath+"/m2020/map/thematic/thematicMap.sgis?selParam=CTGR_004&menuIndex=3",
				srvlog:"javascript:srvLogWrite('O0', '51', '01', '03', '통계주제도-노동과 경제', '')"
			},
			{
				name:"건강과 안전",
				url:contextPath+"/m2020/map/thematic/thematicMap.sgis?selParam=CTGR_005&menuIndex=4",
				srvlog:"javascript:srvLogWrite('O0', '51', '01', '03', '통계주제도-건강과 안전', '')"
			},
			{
				name:"환경과 기후",
				url:contextPath+"/m2020/map/thematic/thematicMap.sgis?selParam=CTGR_006&menuIndex=5",
				srvlog:"javascript:srvLogWrite('O0', '51', '01', '03', '통계주제도-환경과 기후', '')"
			}
		]
	},
	{
		name:"내주변통계",
		use:true,
		url:contextPath+"/m2020/map/current/currentMap.sgis",
		srvlog:"javascript:srvLogWrite('O0', '51', '01', '04', '내주변통계', '')"
	},
	{
		name:"My통계로(路)",
		use:true,
		url:contextPath+"/m2020/map/statsMe/statsMeMap.sgis",
		srvlog:"javascript:srvLogWrite('O0', '51', '01', '05', 'My통계로', '')"
	},
	{
		isNew:true,
		use:true,
		name:"생활권역 통계지도",
		url:contextPath+"/m2021/map/catchmentareaMap.sgis",
		srvlog:"javascript:srvLogWrite('O0', '51', '01', '06', '생활권역 통계지도', '')"
	},
	{
		isNew:true,
		use:true,
		name:"총조사 시각화 지도",
		children:[
			{
				name:"인구",
				url:contextPath+"/m2021/map/totSurv.sgis?theme=population",
				srvlog:"javascript:srvLogWrite('O0', '51', '01', '07', '총조사 시각화 지도-인구', '')"
			},
			{
				name:"가구",
				url:contextPath+"/m2021/map/totSurv.sgis?theme=houseHold",
				srvlog:"javascript:srvLogWrite('O0', '51', '01', '07', '총조사 시각화 지도-가구', '')"
			},
			{
				name:"주택",
				url:contextPath+"/m2021/map/totSurv.sgis?theme=house",
				srvlog:"javascript:srvLogWrite('O0', '51', '01', '07', '총조사 시각화 지도-주택', '')"
			},
			{
				name:"농업",
				url:contextPath+"/m2021/map/totSurv.sgis?theme=farm",
				srvlog:"javascript:srvLogWrite('O0', '51', '01', '07', '총조사 시각화 지도-농업', '')"
			},
			{
				name:"임업",
				url:contextPath+"/m2021/map/totSurv.sgis?theme=forestry",
				srvlog:"javascript:srvLogWrite('O0', '51', '01', '07', '총조사 시각화 지도-임업', '')"
			},
			{
				name:"어업",
				url:contextPath+"/m2021/map/totSurv.sgis?theme=fishery",
				srvlog:"javascript:srvLogWrite('O0', '51', '01', '07', '총조사 시각화 지도-어업', '')"
			},
			{
				name:"경제",
				url:contextPath+"/m2021/map/totSurv.sgis?theme=ecnmy",
				srvlog:"javascript:srvLogWrite('O0', '51', '01', '07', '총조사 시각화 지도-경제', '')"
			}
		]
	},
	{
		isNew:true,
		use:true,
		name:"행정통계 시각화 지도",
		children:[
			{
				name:"신혼부부통계",
				url:contextPath+"/m2021/map/administStats.sgis?theme=newly",
				srvlog:"javascript:srvLogWrite('O0', '51', '01', '08', '행정통계 시각화 지도-신혼부부통계', '')"
			},
			{
				name:"주택소유통계",
				url:contextPath+"/m2021/map/administStats.sgis?theme=house",
				srvlog:"javascript:srvLogWrite('O0', '51', '01', '08', '행정통계 시각화 지도-주택소유통계', '')"
			},
			{
				name:"중·장년층행정통계",
				url:contextPath+"/m2021/map/administStats.sgis?theme=middl",
				srvlog:"javascript:srvLogWrite('O0', '51', '01', '08', '행정통계 시각화 지도-중·장년층행정통계', '')"
			},
			{
				name:"귀농어·귀촌인통계",
				url:contextPath+"/m2021/map/administStats.sgis?theme=retun",
				srvlog:"javascript:srvLogWrite('O0', '51', '01', '08', '행정통계 시각화 지도-귀농어·귀촌인통계', '')"
			},
			{
				name:"일자리행정통계",
				url:contextPath+"/m2021/administStats.sgis?theme=more1",
				srvlog:"javascript:srvLogWrite('O0', '51', '01', '08', '행정통계 시각화 지도-일자리행정통계', '')"
			},
			{
				name:"퇴직연금통계",
				url:contextPath+"/m2021/administStats.sgis?theme=more2",
				srvlog:"javascript:srvLogWrite('O0', '51', '01', '08', '행정통계 시각화 지도-퇴직연금통계', '')"
			},
			{
				name:"임금근로 일자리 동향",
				url:contextPath+"/m2021/administStats.sgis?theme=more3",
				srvlog:"javascript:srvLogWrite('O0', '51', '01', '08', '행정통계 시각화 지도-임금근로 일자리 동향', '')"
			}
		]
	},
	{
		name:"일자리 맵",
		use:true,
		url:contextPath+"/m2020/map/workroad/myNeighberhoodJobMap.sgis?todaystatus_pop_yn=Y",
		srvlog:"javascript:srvLogWrite('O0', '51', '01', '09', '일자리맵', '')"
	},
	{
		name:"지역현안 소통지도",
		use:true,
		url:contextPath+"/m2020/map/community/communityMap.sgis",
		srvlog:"javascript:srvLogWrite('O0', '51', '01', '10', '지역현안 소통지도', '')"
	},
	{
		name:"SGIS에듀 함께하는 지도",
		use:true,
		url:contextPath+"/m2020/map/withmap/communityMap.sgis",
		srvlog:"javascript:srvLogWrite('O0', '51', '01', '10', '함께하는 지도', '')"
	},
	{	name:"살고싶은 우리동네",
		use:true,
		url:contextPath+"/m2020/map/house/recomendHouseMap.sgis",
		srvlog:"javascript:srvLogWrite('O0', '51', '01', '11', '살고싶은 우리동네', '')"
	},
	{
		name:"알림마당",
		use:true,
		url:contextPath+"/m2020/map/board/introduction.sgis",
		srvlog:"javascript:srvLogWrite('O0', '51', '01', '12', '알림마당', '')"
	}
];