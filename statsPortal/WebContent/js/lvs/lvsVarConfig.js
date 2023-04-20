 //지역변화분석지도 주요변수리스트
 //페이지 전체변수

//개발테스트
////////////////////////////////
//1.오픈api패스
 //const openApiPath   = "//sgisapi.kostat.go.kr/OpenAPI3" ;
//2. sgis api 패스 
 //const sgis4thApiPath = "//sgis.kostat.go.kr/ServiceAPI"; 
//3. kosis api 패스 
 //const kosisApiPath = "//analysis.kostat.go.kr"; 


 
 // 지역변화 맵정보    
//경계기준년도는 반드시 수정할것
 const mapInfo ={
            base_year: '2021',   // 경계기준년도   // 모든 경계는 최신경계는 개발쪽 데이터가 7자리로 되어 있어, 이전경계를 사용함.		 
		    map: null,
		    secure_mode: false,
		    x:990196.5800601951,
		    y:1817512.448125631,
		    x2:997978,
		    y2:1809645,
            level: 4,		    
		    options : {
                ollehTileLayer: false,
                scale: false, // 축척 컨트롤
                panControl: false, // 지도 이동 컨트롤
                zoom: false,
                zoomSliderControl: false, //줌 컨트롤
                measureControl: false, // 측정 컨트롤 (면적, 길이)
                zoomAnimation: true,
                statisticTileLayer: true,
                attributionControl: false // 지도속성 컨트롤
            }, 
            
            data:  { 
            	population: null,  // 총조사 주요지표
            },

            dataKind:'tot_ppltn',   //선택된 지표  data_kind  지표의 종류랑 혼동말자...
            boardType:'board1',
            board2Kind: 'ppltn_fmly',  //dokadoka
            boardState: '', // 토글상태 별도 확인             
            mode: 'hide',  // 데이터표시여부
            boardSize: 'large', //보드크기
            consumer_key: '590a2718c58d41d9ae3b',
            consumer_secret: 'ab7fe94f9fb64336abd3',
            failCnt: 0,
            accessToken: "none",
            
            this_year: '2020',    // 조회년도
            last_year:'2019',     //비교년도
            year_list: ['2000','2005','2010','2015','2016','2017','2018','2019','2020'],    //조회년도
            sido_cd: '25',
            sgg_cd:'030',
            emdong_cd: '',
            cur_item_no: 0, // 현재 선택된 아이템            
            sido_nm: '대전광역시',
            sgg_nm: '서구',
            emdong_nm: '',
            
            region_cd: '25030',            
            view_cd: 'sgg',  //
            
            //legendColor: ["#f51d05"],
            //borderColor: ["#000000"],
            
            legendColor: ['#FFD75D','#F6B64E','#EE953F','#E67430','#DD5321','#D53512','#CD1103'],
            borderColor: ["#1E4FA4","#666666"],
            //legendEmptyColor: ['#AEAEAE'],
            legendEmptyColor: ['#C7C7C7'],            

            oriArea: null,   //현재 경계:의 오리지널 레이어
            sopArea: null,
            addrObj: null,  //현재주소정보
            sidoObj: {},  //시도정보
            sggObj: {}, //시군구정보
            emdongObj: {}, //읍면동정보
            
            board2_sggObj:{}, //타지역비교하기 시군구정보
            board2_emdongObj:{}, //타지역비교하기 읍면동정보
            
            intervalId: null, // 지도로딩 여부체크
		    colorPl :  ['#05A8F5','#FF5F5F','#3ECF9A','#E0E0E0','#FC821C'], //차트 칼라
            sido_stat_cnt:28,
            sgg_stat_cnt:28,
            emdong_stat_cnt:8,
            sliderTimerCount:0,  // 자동재생 슬라이더 초기값
            sliderTimerSts:false,
            sliderTimerPlay: null,
            siiderTimer: null,
            lastRcmdItem: null,
            lastRcmdTab: null,
            
            /*
            chartType: {
            	'tot_ppltn':'donut','tot_family':'line','tot_house':'pie','tot_one_family':'map','corp_cnt':'pie',
            	'employee_cnt':'pie','newbaby_cnt':'line','dead_cnt':'donut','newlyweds_cnt':'column',
            	'population_in_cnt':'column','old_age_cnt':'pie','marrige_cnt':'line','divorce_cnt':'line',
            	'old_oneman_cnt':'pie','old_oneman_rt':'donut','apart_cnt':'line','house_own_rt':'line',
            	'employ_rt':'donut','unemploy_rt':'donut','employ_cnt':'pie','walker_accdt_cnt':'line',
            	'traffic_accdt_cnt':'line','fire_accdt_cnt':'line','car_own_rt':'line',
            	'green_area_rt':'line','water_supply_rt':'line','life_waste_cnt':'line' 
            },
            */
            
            chartType: {
            	'tot_ppltn':'donut','tot_family':'column','tot_house':'line','tot_one_family':'column','corp_cnt':'line',
            	'employee_cnt':'line'
            	,newbaby_cnt:'donut'
            	,'dead_cnt':'donut','newlyweds_cnt':'column',
            	'population_in_cnt':'line','population_out_cnt':'line','old_age_cnt':'line','marrige_cnt':'line','divorce_cnt':'line',
            	'mlti_marrige_cnt':'column',
            	'old_oneman_cnt':'column','old_oneman_rt':'donut','apart_cnt':'line','house_own_rt':'line',
            	'employ_rt':'donut','unemploy_rt':'donut','employ_cnt':'pie','walker_accdt_cnt':'line',
            	'traffic_accdt_cnt':'line','traffic_dead_cnt':'line','fire_accdt_cnt':'line','car_own_rt':'line',
            	'green_area_rt':'line','water_supply_rt':'line','life_waste_cnt':'line',
            	 'house_own_rt'   : 'line'
            	 ,'car_own_rt'     : 'line'
            	 ,'green_area_rt'  : 'line'
            	 ,'water_supply_rt': 'line'
            	 ,'employ_rt'      : 'line'
            	 ,'unemploy_rt'    : 'line'
            	 ,'employ_cnt'     : 'column'
            	 ,'unemploy_cnt'   : 'column'
            	 ,'yb_employ_rt'   : 'line'
            	 , life_waste_cnt : 'line'	 
            		 
            },
            
            
            // tot_ppltn: pie
            
            /*
            data_kind:{
            	sido:["tot_ppltn","tot_family","tot_house","tot_one_family","corp_cnt","employee_cnt","newbaby_cnt","dead_cnt","newlyweds_cnt","population_in_cnt","population_out_cnt","old_age_cnt","marrige_cnt","divorce_cnt","old_oneman_cnt","old_oneman_rt","apart_cnt","house_own_rt",'employ_rt','unemploy_rt','employ_cnt','walker_accdt_cnt','traffic_accdt_cnt','fire_accdt_cnt ','car_own_rt','green_area_rt','water_supply_rt','life_waste_cnt'],
            	sgg:["tot_ppltn","tot_family","tot_house","tot_one_family","corp_cnt","employee_cnt","newbaby_cnt","dead_cnt","newlyweds_cnt","population_in_cnt","population_out_cnt", "old_age_cnt","marrige_cnt","divorce_cnt","old_oneman_cnt","old_oneman_rt","apart_cnt","house_own_rt",'employ_rt','unemploy_rt','employ_cnt','walker_accdt_cnt','traffic_accdt_cnt','fire_accdt_cnt ','car_own_rt','green_area_rt','water_supply_rt','life_waste_cnt'],
            	emdong:["tot_ppltn","tot_family","tot_house","tot_one_family","corp_cnt","employee_cnt","old_age_cnt","divorce_cnt","old_oneman_cnt","old_oneman_rt","apart_cnt","house_own_rt",'walker_accdt_cnt']
            },
            */
            
            //  총인구 tot_ppltn , 총 tot_family가구수  , 총주택수  tot_house
            //우리동네상황판 코멘트
            data_comments1:{

				"tot_ppltn":{name:"총인구", desc:"위치파악이 어려운 특별조사구 등을 제외한<br> 내국인 대상으로 계산한 총인구 수<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", unit:"명"},
				"tot_family":{name:"가구", desc:"인구주택총조사(등록센서스) 자료를 활용하여,<br> 일반가구를 대상으로 계산한 총 가구수<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", unit:"가구"},
				"tot_house":{name:"주택", desc:"인구주택총조사(등록센서스) 자료를 활용하여,<br>위치파악이 어려운 빈집을 제외한 총 주택수<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스)</font>", unit:"호"},
				"tot_one_family":{name:"1인 가구", desc:"1인이 독립적으로 취사, 취침 등의 생계를 유지하는 가구<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", unit:"가구"},
				"business_cnt":{name:"사업체수", desc:" 위치파악이 어려운 개인운수업 등을 제외한<br>사업체를 대상으로 계산한 총 사업체 수<br><font color=red>* 출처 : 통계청, 전국사업체조사, SGIS 자체생산</font>", unit:"개"},
				"employ_cnt":{name:"종사자수", desc:"위치파악이 어려운 개인운수업 등을 제외한<br>사업체를 대상으로 계산한 총 종사자 수<br><font color=red>* 출처 : 통계청, 전국사업체조사, SGIS 자체생산</font>", unit:"명"},
				"newbaby_cnt":{name:"출생아수", desc:"대한민국 국민에 의해 발생된 출생인구의 수 (국내거주대상)<br><font color=red>* 출처 : 통계청, 인구동향조사</font>", unit:"명"},
				"dead_cnt":{name:"사망자수", desc:"사망인구의 수 (국내거주대상)<br><font color=red>* 출처 : 통계청, 인구동향조사</font>", unit:"명"},
				"newlyweds_cnt":{name:"신혼부부수", desc:"혼인신고 한 지 5년이 경과되지 않고,<br>혼인관계를 유지 중이며, 1명 이상<br>국내에 거주하고 있는 부부<br><font color=red> * 출처 : 통계청, 신혼부부통계</font>", unit:"명"},
				"population_in_cnt":{name:"전입인구수", desc:"행정구역(읍면동) 경계를 넘어 다른 지역에서<br>특정 지역으로 이동해 온 인구<br><font color=red>* 출처 : 통계청, 국내인구이동통계</font>", unit:"명"},
				"population_out_cnt":{name:"전출인구수", desc:"행정구역(읍면동) 경계를 넘어 다른 지역에서<br>특정 지역으로 이동해 간 인구<br><font color=red>* 출처 : 통계청, 국내인구이동통계</font>", unit:"명"},
				"old_age_cnt":{name:"노령인구수(65세이상)", desc:"위치파악이 어려운 특별조사구 등을 제외한<br>내국인 대상으로 계산한 65세이상 인구 수<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", unit:"명"},
				"marrige_cnt":{name:"혼인 건수", desc:"지난 1년간 신고된 총 혼인건수<br><font color=red>* 출처 : 통계청, 인구동향조사</font>", unit:"건"},
				"divorce_cnt":{name:"이혼 건수", desc:"지난 1년간 신고된 총 이혼건수<br><font color=red>* 출처 : 통계청, 인구동향조사</font>", unit:"건"},
				"old_oneman_cnt":{name:"독거노인 가구수", desc:"위치파악이 어려운 특별조사구 등을 제외한<br>내국인 대상으로 계산한 65세이상 1인가구 수<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", unit:"가구"},
				"old_oneman_rt":{name:"독거노인 가구 비율", desc:"위치파악이 어려운 특별조사구 등을 제외한<br>내국인 대상으로 일반가구 대비 65세이상 1인가구 비율<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", unit:"%"},				
				"apart_cnt":{name:"아파트수", desc:"인구주택총조사(등록센서스) 자료를 활용하여,<br>위치파악이 어려운 빈집을 제외한 아파트수 - 아파트 : 한 건물내에 여러 가구가 거주할 수 있도록 건축되어진 5층이상의 영구건물로서 구조적으로 한 가구씩 독립하여 살 수 있도록 건축된 주택<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", unit:"호"},
				"house_own_rt":{name:"일반가구의 주택소유율", desc:"인구주택총조사(등록센서스)를 통해 조사된<br>일반가구 중 거주여부와 관계없이 주택을<br>소유한 가구의 비율<br><font color=red>* 출처: 통계청, 주택소유통계</font>", unit:"%"},
				"employ_rt1":{name:"고용률", desc:"만 15세 이상 인구 중 취업자가<br>차지하는 비율(시도단위 공표)<br><font color=red>* 출처: 통계청, 경제활동인구조사</font>", unit:"%"},
				"employ_rt2":{name:"고용률", desc:"만 15세 이상 인구 중 취업자가<br>차지하는 비율(시군구단위 공표)<br><font color=red>* 출처: 통계청, 지역별고용조사</font>", unit:"%"},
				"unemploy_rt1":{name:"실업률", desc:"경제활동인구(취업자+실업자) 중에서 실업자가<br>차지하는 비율(시도단위 공표)<br><font color=red>* 출처 : 통계청, 경제활동인구조사</font>", unit:"%"},
				"unemploy_rt2":{name:"실업률", desc:"경제활동인구(취업자+실업자) 중에서 실업자가<br>차지하는 비율(시군구단위 공표)<br><font color=red>* 출처: 통계청, 지역별고용조사</font>", unit:"%"},
				"employ_cnt1":{name:"취업자수", desc:"경제활동가능인구 중 취업자의 수(시도단위 공표)<br><font color=red>* 출처: 통계청, 경제활동인구조사</font>", unit:"건"},
				"employ_cnt2":{name:"취업자수", desc:"경제활동가능인구 중 취업자의 수(시군구 단위 공표)<br><font color=red>* 출처: 통계청, 지역별고용조사</font>", unit:"건"},
				"walker_accdt_cnt":{name:"보행자 교통사고 발생 현황", desc:"보행사상자가 발생한 교통사고의 위치<br>좌표를 공공데이터로 입수하여,<br>SGIS에서 제공하는 경계에 맞추어 집계한 자료<br><font color=red>* 출처 : 도로교통공단, 보행자 교통사고(차대사람) 자료</font>", unit:"건"},
				"traffic_accdt_cnt":{name:"교통사고 건수", desc:"경찰청에서 제공하는 지자체별 교통사고 통계 현황<br><font color=red>* 출처 : 경찰청, 교통사고통계</font>", unit:"건"},
				"fire_accdt_cnt":{name:"화재발생 건수", desc:"1년간 발생한 화재사고의 건수<br><font color=red>* 출처 : 소방청, 화재현황통계</font>", unit:"건"},
				"car_own_cnt":{name:"1인당 자동차 등록대수", desc:"주민등록인구현황 기준의 총 인구수 대비<br>통계시점에 자동차등록원부에 등록하고 운행할 수 있는<br>자동차의 대수(이륜자동차 신고대수는 제외)<br><font color=red>* 출처 : 국토교통부, 자동차등록현황보고 / 행정안전부, 주민등록인구현황</font>", unit:"대"},
				//"green_area_rt":{name:"녹지율", desc:"각 지역별 도시지역에서 녹지지역이<br>차지하는 비율<br><font color=red>* 출처 : 한국토지주택공사, 도시계획현황</font>", unit:"%"},
				"water_supply_rt":{name:"상수도보급률", desc:"주민등록인구현황 기준의 총 인구수 대비<br>지방 및 광역상수도에 의해 수돗물을<br>공급받고 있는 인구의 비율<br><font color=red>* 출처 : 환경부, 상수도통계</font>", unit:"%"},
				"life_waste_cnt":{name:"주민 1인당 생활폐기물 배출량", desc:"주민등록인구현황 기준의 총 인구수 대비<br>주민 1인당 배출하는 생활계폐기물의 양<br><font color=red>* 출처 : 환경부, 전국폐기물발생 및 처리현황 / 행정안전부, 주민등로인구현황</font>", unit:"kg/인,일"},
            } ,            
            //우리동네상황판 지표
            //우리동네상황판 지표
            data_kind:{
            	sido:  ["tot_ppltn" , "tot_family" ,"tot_house"  ,"corp_cnt" ,"employee_cnt","tot_one_family" 
		   				 , "apart_cnt" , "old_age_cnt" ,"dead_cnt","marrige_cnt","divorce_cnt","old_oneman_cnt"  
						 , "employ_rt" , "unemploy_rt" ,"employ_cnt" ,"traffic_accdt_cnt", "traffic_dead_cnt" ,"newbaby_cnt" 
						 , "newlyweds_cnt" , "population_in_cnt" ,"population_out_cnt" , "house_own_rt" ,"car_own_rt", "water_supply_rt"  
						 , "employ_rt1" ,"unemploy_rt1" ,"employ_cnt1", "life_waste_cnt"						
						],
						
            	sgg:   [ "tot_ppltn" , "tot_family" ,"tot_house"  ,"corp_cnt" ,"employee_cnt","tot_one_family" 
            				 , "apart_cnt" , "old_age_cnt" ,"dead_cnt","marrige_cnt","divorce_cnt","old_oneman_cnt"  
            				 , "employ_rt" , "unemploy_rt" ,"employ_cnt" ,"traffic_accdt_cnt", "traffic_dead_cnt" ,"newbaby_cnt" 
            				 , "newlyweds_cnt" , "population_in_cnt" ,"population_out_cnt" , "house_own_rt" ,"car_own_rt", "water_supply_rt"  
            				 , "employ_rt2" ,"unemploy_rt2" ,"employ_cnt2", "life_waste_cnt" 
						],
						
            	emdong:[
            			"tot_ppltn","tot_family","tot_house","tot_one_family","business_cnt","employ_cnt"
						,"old_age_cnt"
						,"divorce_cnt","old_oneman_cnt","old_oneman_rt","apart_cnt","house_own_rt"
						,"walker_accdt_cnt"
					],
            },

            
            //추천지표
            data_comments2:{
                //추천지표
				tot_ppltn:{name:"총인구", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 총인구 수<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", unit:"명"},
				tot_family:{name:"총가구", desc:"인구주택총조사(등록센서스) 자료를 활용하여,<br>일반가구를 대상으로 계산한 총 가구수<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스)</font>", levelName:"읍면동", yearList:"2000~2020", unit:"가구"},				
				tot_man:{name:"남자인구", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 남자 인구 수<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2021", unit:"명"},
				tot_woman:{name:"여자인구", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 여자 인구 수<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2021", unit:"명"},
				tot_house:{name:"총주택", desc:"인구주택총조사(등록센서스) 자료를 활용하여, 위치파악이 어려운 빈집을 제외한 총 주택수<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스)</font>", levelName:"읍면동", yearList:"2000~2021", unit:"호"},
				indpdt_house_cnt:{name:"단독주택", desc:"인구주택총조사(등록센서스) 자료를 활용하여, 위치파악이 어려운 빈집을 제외한 단독주택수<br>- 단독주택 : 한 가구가 생활할 수 있도록 건축된 일반 단독주택과 여러 가구가 살 수 있도록 설계된 다가구 단독주택<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2021", unit:"호"},
				apart_cnt:{name:"아파트", desc:"인구주택총조사(등록센서스) 자료를 활용하여, 위치파악이 어려운 빈집을 제외한 아파트수<br> - 아파트 : 한 건물내에 여러 가구가 거주할 수 있도록 건축되어진 5층이상의 영구건물로서 구조적으로 한 가구씩 독립하여 살 수 있도록 건축된 주택<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2021", unit:"호"},
				cat_own_cnt:{name:"1인당 자동차 등록대수", desc:"인구주택총조사(등록센서스) 자료를 활용하여, 위치파악이 어려운 빈집을 제외한 아파트수<br> - 아파트 : 한 건물내에 여러 가구가 거주할 수 있도록 건축되어진 5층이상의 영구건물로서 구조적으로 한 가구씩 독립하여 살 수 있도록 건축된 주택<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2021", unit:"대"},				
				tot_one_family:{name:"1인 가구", desc:"1인가구 : 1인이 독립적으로 취사, 취침 등의 생계를 유지하는 가구<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2021", unit:"가구"},
				old_fmly_cnt:{name:"65세 이상 1인가구", desc:"인구주택총조사(등록센서스) 자료를 활용하여, 65세 이상 1인가구를 집계한 가구수<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2021", unit:"호"},
				old_15_under_cnt:{name:"15세 미만 유소년 인구", desc:"인구주택총조사(등록센서스) 자료를 활용하여, 15세 미만 유소년을 집계한 인구 수<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2021", unit:"명"},
				old_man_cnt:{name:"65세 이상 고령자 인구", desc:"인구주택총조사(등록센서스) 자료를 활용하여, 65세 이상 고령자를 집계한 인구 수<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2021", unit:"명"},
				newbaby_cnt:{name:"신생아수", desc:"인구주택총조사(등록센서스) 자료를 활용하여, 65세 이상 고령자를 집계한 인구 수<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2021", unit:"명"},
				dead_cnt:{name:"사망자수", desc:"인구주택총조사(등록센서스) 자료를 활용하여, 65세 이상 고령자를 집계한 인구 수<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2021", unit:"명"},
				oldman_per_medical:{name:"보건시설 1개당 65세이상 노인인구", desc:"인구주택총조사(등록센서스) 자료를 활용하여, 65세 이상 고령자를 집계한 인구 수<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2021", unit:"명"},
				student_per_teacher:{name:"교원1인당 학생 수", desc:"인구주택총조사(등록센서스) 자료를 활용하여, 65세 이상 고령자를 집계한 인구 수<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2021", unit:"명"},
				
				
				
            } ,
            
            

            
            //"tot_one_family","old_fmly_cnt","old_15_under_cnt","old_man_cnt"
            
            /*
		            남녀 구분 값이 있는 지표 총 인구, 1인 가구, 종사자 수 			출생아 수, 노령인구 수 			독거노인 가구 수 			취업자 수 		
             */
		   //data_kind2_list: " tot_ppltn, tot_one_family,  employee_cnt,  newbaby_cnt, old_age_cnt, old_oneman_cnt, employ_cnt  ",   //차트유형이 복잡한놈들
            data_kind2_list: " tot_ppltn,     newbaby_cnt  dead_cnt  employ_rt2 employ_cnt2  ",   //차트유형이 복잡한놈들
			
            //todo
            //추천지표 카테고리
            board2_data_kind_rec:['ppltn_fmly','house_trffy','wlfr_cltr','lbr_ecnmc','sfty_envmnt'],
            
            //추천지표
            data_kind_rec:{
            	  ppltn_fmly:["tot_ppltn","tot_man","tot_woman","tot_family","tot_one_family","old_fmly_cnt","old_15_under_cnt","old_man_cnt"],
            	  house_trffy:["tot_house","apart_cnt","cat_own_cnt"],
            	  wlfr_cltr:["oldman_per_medical","student_per_teacher"],
            	  lbr_ecnmc:["corp_cnt","employee_cnt"],
            	  sfty_envmnt:["tot_ppltn"],          	  
              } ,
              
              //,"tot_one_family","old_fmly_cnt","old_15_under_cnt","old_man_cnt"

             /*
                              모든지표 보기
                         	    aggri_ppltn:{name:"귀농/귀촌/귀어 인구 현황", level:"sido", type:"A", yearList:"2005~2020", reference:{"A","C"} } ,
                        	    onehouse_varis:{name:"1인 가구 변화", level:"emdong", type:"A", yearList:"2005~2020", reference:{"A","B"} } ,
                                data_kind_all:  {
                            	    mlti_house:{name:"다문화가구 현황", level:"sgg", levelName:"시군구", type:"A", yearList:"2005~2020", reference:["A","C"]}  ,
                             	    aggri_ppltn:{name:"귀농/귀촌/귀어 인구 현황", level:"sido",  levelName:"시도", type:"A", yearList:"2005~2020", reference:["A","C"]} ,
                            	    onehouse_varis:{name:"1인 가구 변화", level:"emdong",  levelName:"읍면동", type:"A", yearList:"2005~2020", reference:["A","B"]}             	    
                              },            
                              dummy: null
                        	    
                                               
             */
             /*
             data_kind_all:  {
            	    mlti_cltr:{name:"다문화가구 현황", use_yes:'yes', level:"sgg", levelName:"시군구", type:"A", yearList:"2015~2021", reference:["A","C"], baseYear:"2020", site:"통계청 「인구주택총조사」", unit:"수(가구)"},
            	    aggri_ppltn:{name:"귀농/귀촌/귀어 인구 현황", use_yes:'yes',level:"sido", levelName:"시군구", type:"A", yearList:"2005~2020", reference:["A","C"], baseYear:"2020", site:"통계청, 인구주택총조사 (2020년)", unit:"가구"},
            	    onehouse_varis:{name:"1인 가구 변화", use_yes:'yes',level:"sido", levelName:"시군구", type:"A", yearList:"2005~2020", reference:["A","C"], baseYear:"2020", site:"통계청, 인구주택총조사 (2020년)", unit:"가구"},
            	    tot_ppltn:{name:"총인구", use_yes:'yes',level:"reg", levelName:"집계구", type:"B", yearList:"2005~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 인구주택총조사 (2020년)", unit:"명"},
            	    mlti_house:{name:"다세대주택", use_yes:'yes',level:"reg", levelName:"집계구", type:"C", yearList:"2005~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 인구주택총조사 (2020년)", unit:"개"},            	    
            	    trffc_cltr:{name:"교통문화지수", use_yes:'yes',level:"sgg", levelName:"시군구", type:"D", yearList:"2005~2020", reference:["A","B","C"], baseYear:"2020", site:"대화형통계지도>e지방지표", unit:"건"},            	    
              },
              */    
             //모든지표
             data_kind_all:  {
           	    mlti_house:{kind:"ppltn_fmly", name:"다문화가구 현황", use_yes:'yes',level:"sido", levelName:"집계구", type:"A", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 총인구 수<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2005~2020", reference:["A","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명)"},            	 
        	    tot_ppltn:{kind:"ppltn_fmly", name:"총 인구", use_yes:'yes',level:"sido", levelName:"집계구", type:"B", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 총인구 수<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2005~2020", reference:["A","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명)"},
           	    tot_man:{kind:"ppltn_fmly", name:"남자인구", use_yes:'yes',level:"emdong", levelName:"읍면동", type:"C", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 남자 인구 수<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2005~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명)"},
           	    tot_woman:{kind:"ppltn_fmly", name:"여자인구", use_yes:'yes',level:"emdong", levelName:"읍면동", type:"C", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 여자 인구 수<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2005~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명)"},
           	    avg_age:{kind:"ppltn_fmly", name:"평균나이", use_yes:'yes',level:"reg", levelName:"집계구", type:"B", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로, (연령별 나이*연령별 인구수) 값을 총인구수로 나눈 값<br><font color=red><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"세"},            	    
           	    ppltn_reg:{kind:"ppltn_fmly", name:"주민등록 인구 현황", use_yes:'yes',level:"emdong", levelName:"읍면동", type:"A", desc:"주민등록 인구현황을 연도별(2013년~2020년), 행정구역별로 비교하는 주제도", levelName:"읍면동", yearList:"2021", reference:["A"], baseYear:"2021", site:"통계청, 「인구주택총조사」", unit:"명"},
           	    oneman_house:{kind:"ppltn_fmly", name:"1인 가구", use_yes:'yes', level:"emdong", levelName:"읍면동", type:"A", desc:"1인가구 : 1인이 독립적으로 취사, 취침 등의 생계를 유지하는 가구<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2021", reference:["A","C"], baseYear:"2021", site:"통계청 「인구주택총조사」", unit:"(가구)"},
           	    old_oneman:{kind:"ppltn_fmly", name:"65세 이상 1인가구 변화", use_yes:'yes',level:"emdong", levelName:"읍면동", type:"A", desc:"2000년 대비 2020년 혼자 사는 65세 이상 노인(독거노인) 가구 증감률을 행정구역별로 비교하는 주제도", levelName:"읍면동", yearList:"2021", reference:["A"], baseYear:"2021", site:"통계청, 「인구주택총조사」", unit:"(가구)"},
           	    old_age_cnt:{kind:"ppltn_fmly", name:"65세 이상 고령자 인구 변화", use_yes:'yes',level:"emdong", levelName:"읍면동", type:"A", desc:"2000년 대비 2020년 65세 이상 고령자 인구의 증감률을 행정구역별로 비교하여 고령화 속도를 파악할 수 있는 주제도", levelName:"읍면동", yearList:"2021", reference:["A"], baseYear:"2021", site:"통계청, 「인구주택총조사」", unit:"(명)"},
           	    pptln_youngman:{kind:"ppltn_fmly", name:"15세 미만 유소년 인구 변화", use_yes:'yes',level:"emdong", levelName:"읍면동", type:"A", desc:"2000년 대비 2020년 15세 미만 유소년 인구의 증감률을 행정구역별로 비교하여 저출산으로 인한 유소년 인구 감소 현황을 파악할 수 있는 주제도", levelName:"읍면동", yearList:"2021", reference:["A"], baseYear:"2021", site:"통계청, 「인구주택총조사」", unit:"(명)"},
           	    ppltn_density:{kind:"ppltn_fmly", name:"인구밀도", use_yes:'yes',level:"reg", levelName:"집계구", type:"B", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    
           	    ppltn_movement:{kind:"ppltn_fmly", name:"인구이동", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},           	    
           	    ppltn_increase:{kind:"ppltn_fmly", name:"인구 자연증가 현황", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},           	    
           	    man_per_woman_rt:{kind:"ppltn_fmly", name:"여자인구 대비 남자인구 비율", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},           	    
           	    ppltn_foreigner:{kind:"ppltn_fmly", name:"외국인 주민 현황", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    newbaby_cnt:{kind:"ppltn_fmly", name:"출생 현황", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},           	    
           	    dead_cnt:{kind:"ppltn_fmly", name:"사망 현황", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    marrige_cnt:{kind:"ppltn_fmly", name:"혼인 현황", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},           	    
           	    divorce_cnt:{kind:"ppltn_fmly", name:"이혼 현황", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    
           	    back_farm:{kind:"ppltn_fmly", name:"귀농 인구 현황", use_yes:'yes',level:"reg", levelName:"집계구", type:"A", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    back_country:{kind:"ppltn_fmly", name:"귀촌 인구 현황", use_yes:'yes',level:"reg", levelName:"집계구", type:"A", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    back_fishing:{kind:"ppltn_fmly", name:"귀어 인구 현황", use_yes:'yes',level:"reg", levelName:"집계구", type:"A", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    country_house_midage:{kind:"ppltn_fmly", name:"지역별 농림어가의 청장년인구 변화", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    
           	 
           	    bicycle_cnt:{kind:"house_trffy", name:"공영자전거 운영 현황", use_yes:'yes',level:"reg", levelName:"시도", type:"A", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    ev_charge:{kind:"house_trffy", name:"전기차 충전소(급속) 현황", use_yes:'yes',level:"reg", levelName:"시도", type:"A", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},           	    
           	    house_per_thousand_ppltn:{kind:"house_trffy", name:"인구 천명당 주택 수 증감 현황", use_yes:'yes',level:"reg", levelName:"집계구", type:"A", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    ppltn_per_house_rt:{kind:"house_trffy", name:"주택당 평균 가구원 현황", use_yes:'yes',level:"reg", levelName:"집계구", type:"A", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    com_ppltn_insgg:{kind:"house_trffy", name:"통근통학 인구변화(시군구내)", use_yes:'yes',level:"reg", levelName:"집계구", type:"A", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    com_ppltn_exsgg:{kind:"house_trffy", name:"통근통학 인구변화(타시군구)", use_yes:'yes',level:"reg", levelName:"집계구", type:"A", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    com_ppltn_transport:{kind:"house_trffy", name:"통근통학 인구변화(타시군구)", use_yes:'yes',level:"reg", levelName:"집계구", type:"A", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    parking_own_rt:{kind:"house_trffy", name:"자가주차장 확보율", use_yes:'yes',level:"reg", levelName:"집계구", type:"A", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    oldhouse_cnt:{kind:"house_trffy", name:"30년이상 노후주택 분포현황", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    
           	    childcare_weak_ppltn:{kind:"wlfr_cltr", name:"보육업체 취약인구", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},           	    
           	    //oldman_per_medical:{kind:"wlfr_cltr", name:"보건시설 1개당 65세이상 노인인구", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    //oldman_medical_ppltn:{kind:"wlfr_cltr", name:"65세 이상 장기요양 급여자 현황", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    child_per_childcare:{kind:"wlfr_cltr", name:"보육시설 1개당 어린이 인구", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    disabled_cnt:{kind:"wlfr_cltr", name:"등록 장애인 수 현황", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},           	    
           	    student_per_teacher:{kind:"wlfr_cltr", name:"교원1인당 학생 수", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    academy_per_thousand_ppltn:{kind:"wlfr_cltr", name:"인구천명당 사설학원수", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    
           	    cultural_fac_per_ppltn:{kind:"wlfr_cltr", name:"문화시설 1개당 인구 현황", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},           	    
           	    sports_fac_per_ppltn:{kind:"wlfr_cltr", name:"인구 10만명당 체육시설 수", use_yes:'yes',level:"reg", levelName:"집계구", type:"A", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    heritage_cnt:{kind:"wlfr_cltr", name:"문화재 현황", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    

           	    business_cnt:{kind:"lbr_ecnmc", name:"사업체수 분포 현황", use_yes:'yes',level:"reg", levelName:"집계구", type:"A", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    employ_cnt:{kind:"lbr_ecnmc", name:"종사자수 분포 현황", use_yes:'yes',level:"reg", levelName:"집계구", type:"A", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},           	    
           	    industry_per_thousand_ppltn:{kind:"lbr_ecnmc", name:"인구 천명당 전체산업 현황", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    retail_cnt:{kind:"lbr_ecnmc", name:"도소매업 현황", use_yes:'yes',level:"reg", levelName:"집계구", type:"A", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    service_cnt:{kind:"lbr_ecnmc", name:"서비스업 현황", use_yes:'yes',level:"reg", levelName:"집계구", type:"A", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},           	    
           	    farm_cnt:{kind:"lbr_ecnmc", name:"농림어업 현황", use_yes:'yes',level:"reg", levelName:"집계구", type:"A", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    country_house_cnt:{kind:"lbr_ecnmc", name:"농림어가수 변화", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    
           	    financial_indpt_cnt:{kind:"lbr_ecnmc", name:"재정자립도 현황", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},           	    
           	    ppltn_per_chicken:{kind:"lbr_ecnmc", name:"치킨점 1개당 인구수", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    pc_cnt:{kind:"lbr_ecnmc", name:"PC방 변화", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    supermarket_cnt:{kind:"lbr_ecnmc", name:"슈퍼마켓 변화", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},           	    
           	    bakery_cnt:{kind:"lbr_ecnmc", name:"제과점 변화", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    chicken_cnt:{kind:"lbr_ecnmc", name:"치킨전문점", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    cafe_cnt:{kind:"lbr_ecnmc", name:"커피전문점", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    
           	    drunken_rt:{kind:"sfty_envmnt", name:"음주율 현황", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    smoken_rt:{kind:"sfty_envmnt", name:"음주율 현황", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},           	    
           	    traffic_accdt_cnt:{kind:"sfty_envmnt", name:"교통사고 건수", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    traffic_accdt_dead_cnt:{kind:"sfty_envmnt", name:"교통사고 사망자수", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},           	    
           	    cctv_per_lady:{kind:"sfty_envmnt", name:"2,30대 1인가구 여성인구와 치안시설 분포현황", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    carbon_monoxide_amnt:{kind:"sfty_envmnt", name:"일산화탄소 대기오염도 현황", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    waste_recycle_rt:{kind:"sfty_envmnt", name:"일반폐기물 재활용률", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},
           	    life_waste_cnt:{kind:"sfty_envmnt", name:"주민 1인당 생활폐기물 배출량", use_yes:'yes',level:"reg", levelName:"집계구", type:"D", desc:"위치파악이 어려운 특별조사구 등을 제외한 내국인 대상으로 계산한 인구 수를 행정구역 면적(㎢)단위로 나눈 값<br><font color=red>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산</font>", levelName:"읍면동", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명/㎢)"},           	
           	    
           	    //apart_cnt:{name:"아파트", use_yes:'yes',level:"emdong", levelName:"읍면동", type:"C", desc:"인구주택총조사(등록센서스) 자료를 활용하여, 위치파악이 어려운 빈집을 제외한 아파트수<br> - 아파트 : 한 건물내에 여러 가구가 거주할 수 있도록 건축되어진 5층이상의 영구건물로서 구조적으로 한 가구씩 독립하여 살 수 있도록 건축된 주택<br>* 출처 : 통계청, 인구주택총조사(등록센서스), SGIS 자체생산", levelName:"읍면동", yearList:"2005~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(호)"},
           	    
           	    
           	    //nongga_ppltn:{name:"농가인구", use_yes:'yes',level:"emdong", levelName:"읍면동", type:"D", yearList:"2005~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명)"},
           	    //imga_ppltn:{name:"임가인구", use_yes:'yes',level:"emdong", levelName:"읍면동", type:"D", yearList:"2005~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"(명)"},
           	    
           	    
           	 
           	    
              },
              
              dummy: null
	} ;
     
     
    const mapInfoArea = {
    		'25': null,
    		'25030': null 
    }
    
    /*    
    let data = [{ "gubun": "주거교통", "title": "주택(호)", "totalCount": 469426, "baseYear": "2022-06", "unit": "명", "category": ["대전", "서구","둔산동"], "chartData": [456789, 451263,1211] },
        { "gubun": "주거교통", "title": "단독주택", "totalCount": 469426, "baseYear": "2022-06", "unit": "명", "category": ["대전", "서구"], "chartData": [456789, 521463] },
        { "gubun": "주거교통", "title": "아파트현황", "totalCount": 469426, "baseYear": "2022-06", "unit": "명", "category": ["대전", "서구"], "chartData": [456789, 632541] },
        { "gubun": "주거교통", "title": "1인당 자동차 등록대수", "totalCount": 469426, "baseYear": "2022-06", "unit": "명", "category": ["대전", "서구"], "chartData": [456789, 325416] }
        ]
      */

      
      
      
   //   주거·교통	복지·문화	노동·경제	안전·환경
      
    //추천지표
    const mapInfoRecData = {} ;
    
    const mapInfoRecDataSample = {
    		"25030": {
    			  "ppltn_fmly" : {
    				  "tot_ppltn" : {
    					  name:"총인구",
    					  unit:"명",
    					  base_year: "2020-06",
    					  this_val:432422,
    					  category:["대전", "서구", "둔산동"],
    					  title:"총인구",
    					  chartData: [456789,321263,333223],
 			              yearData:{
 			            	   title:"총인구",
 			            	   category:["2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021"],
			            	   data : [300, 300,300,200,300,200,200,200,400,300,300,230],
			               },
 			              yearDataUp:{
 			            	   title:"총인구",
 			            	   category:["2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021"],
			            	   data : [300, 300,300,200,300,200,200,200,400,300,300,230],
			               },
			               
    				   },
			               
     				  "tot_man" : {
     					  name:"남자수",
     					  unit:"명",
     					  base_year: "2020-06",
     					  this_val:432422,
     					  title:["대전", "서구","둔산동"],
     					  chartData: [456789, 451263,1211],
  			              yearData:{
			            	   title:"남자수",
 			            	   category:["2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021"],
 			            	   data: [100, 300,300,200,300,200,200,200,400,300,300,300],
 			               }
    				  },
    			  }
    		}
    } ;
      
    
    
    /*
     *             	
                 oneman_house:{name:"1인 가구 변화", use_yes:'yes', level:"emdong", levelName:"읍면동", type:"A", yearList:"2000~2021", reference:["A","C"], baseYear:"2021", site:"통계청 「인구주택총조사」", unit:"수(가구)"},
           	    old_oneman:{name:"65세 이상 1인가구 변화", use_yes:'yes',level:"emdong", levelName:"읍면동", type:"A", yearList:"2021", reference:["A"], baseYear:"2021", site:"통계청, 「인구주택총조사」", unit:"가구"},
           	    tot_ppltn:{name:"총 인구", use_yes:'yes',level:"sido", levelName:"집계구", type:"B", yearList:"2005~2020", reference:["A","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"수(명)"},
           	    ppltn_density:{name:"인구밀도", use_yes:'yes',level:"reg", levelName:"집계구", type:"B", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"수(명/㎢)"},
           	    avg_age:{name:"평균나이", use_yes:'yes',level:"reg", levelName:"집계구", type:"B", yearList:"2000~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"개"},            	    
           	    tot_man:{name:"남자인구", use_yes:'yes',level:"emdong", levelName:"읍면동", type:"C", yearList:"2005~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"수(명)"},
           	    tot_woman:{name:"여자인구", use_yes:'yes',level:"emdong", levelName:"읍면동", type:"C", yearList:"2005~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"수(명)"},
           	    apart_cnt:{name:"아파트", use_yes:'yes',level:"emdong", levelName:"읍면동", type:"C", yearList:"2005~2020", reference:["A","B","C"], baseYear:"2020", site:"통계청, 「인구주택총조사」", unit:"수(명)"},            	    

     */
    
    //우리동네상환판
    const mapInfoData = {} ;
    
    const mapInfoDataSample = {
    		'25': {
		   		     "tot_ppltn" :{  
		   		    	 name:"총 인구",
			             thisYear:'2022년',
			             thisYearVal:365123,
			             thisYearKey1:'남', 
			             thisYearVal1:230978,
			             thisYearKey2:'여', 
			             thisYearVal2:205875,
			             lastYear:'2021년', 
			             lastYearVal:112548, 
			             yearData:{
			            	   year:["2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021"],
			            	   title1_data: [100,100,100,100,100,100,100,100,100,100,100,100],
			            	   title2_data: [200,200,200,200,200,200,200,200,200,300,300,300],
			            	   tot_data: [300, 300,300,200,300,200,200,200,400,300,300,300],
			            	   title1: '남자',			            	   
			            	   title2: '여자',
			            	 },
			              "unit": "명",	
			              "larger": "<대전광역시 유성구 (3,100명)>,<대전광역시 서구 (2,100명)>",
			              "larger2": "<대전광역시 유성구 (3,100명)>,<대전광역시 서구 (2,100명)>",    		    	              
			              "smaller": "<대전광역시 동구 (-3,433명), 대전광역시 중구 (-2,674명)>",
			              "smaller2": "<대전광역시 동구 (-3,433명), 대전광역시 중구 (-2,674명)>",    		    	              
			              'area' : null
		                },
		                
			    		"tot_family" :{  name:"총 가구",
				             thisYear:'2022년',
				             thisYearVal:365123,
				             thisYearKey1:'남', 
				             thisYearVal1:230978,
				             thisYearKey2:'여', 
				             thisYearVal2:205875,
				             lastYear:'2021년', 
				             lastYearVal:112548, 
				             yearData:{
				            	   year:["2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021"],
				            	   title1: '남자',
				            	   title1_data: [100, 100,100,100,100,100,100,100,100,100,100,100],
				            	   title2: '여자',
				            	   title2_data: [200, 200,200,200,200,200,200,200,200,300,300,300],
				            	   tot_data: [300, 300,300,200,300,200,200,200,400,300,300,300], 
				            	 },
				              "unit": "명",	
				              "larger": "<대전광역시 유성구 (3,100명)>,<대전광역시 서구 (2,100명)>",
				              "larger2": "<대전광역시 유성구 (3,100명)>,<대전광역시 서구 (2,100명)>",    		    	              
				              "smaller": "<대전광역시 동구 (-3,433명), 대전광역시 중구 (-2,674명)> aaaaa",
				              "smaller2": "<대전광역시 동구 (-3,433명), 대전광역시 중구 (-2,674명)> aaaaa",    		    	              
			                },
			                
			 
							 "gagu" :{},    		     
							 "house" :{},
							 "1gagu" :{},
							 "corp" :{},
							 "employee" :{},    		     
    		},
    		
    		'25030': 
    		   {
    		     "tot_ppltn" :{  name:"총 인구",
    		    	             thisYear:'2022년',
    		    	             thisYearVal:365123,
    		    	             thisYearKey1:'남', 
    		    	             thisYearVal1:230978,
    		    	             thisYearKey2:'여', 
    		    	             thisYearVal2:205875,
    		    	             lastYear:'2021년', 
    		    	             lastYearVal:112548, 
    		    	             yearData:{
    		    	            	   year:["2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021"],
    		    	            	   title1: '남자',
    		    	            	   title1_data: [100, 100,100,100,100,100,100,100,100,100,100,100],
    		    	            	   title2: '여자',
    		    	            	   title2_data: [200, 200,200,200,200,200,200,200,200,300,300,300],
    		    	            	   tot_data: [300, 300,300,200,300,200,200,200,400,300,300,300], 
    		    	            	 },
    		    	              "unit": "명",	
    		    	              "larger": "<대전광역시 유성구 (3,100명)>,<대전광역시 서구 (2,100명)>",
    		    	              "larger2": "<대전광역시 유성구 (3.23%)>,<대전광역시 서구 (2,12%)>",    		    	              
    		    	              "smaller": "<대전광역시 동구 (-3,433명), 대전광역시 중구 (-2,674명)> ",
    		    	              "smaller2": "<대전광역시 동구 (-3,433명), 대전광역시 중구 (-2,674명)> ",    		    	              
    		    	              'area' : null
    		                    },
    		                    
       		     "tot_family" :{  name:"총 가구수",
    		    	             thisYear:'2022년',
    		    	             thisYearVal:365123,
    		    	             thisYearKey1:'남', 
    		    	             thisYearVal1:230978,
    		    	             thisYearKey2:'여', 
    		    	             thisYearVal2:205875,
    		    	             lastYear:'2021년', 
    		    	             lastYearVal:112548, 
    		    	             yearData:{
    		    	            	   year:["2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021"],
    		    	            	   title1: '남자',
    		    	            	   title1_data: [100, 100,100,100,100,100,100,100,100,100,100,100],
    		    	            	   title2: '여자',
    		    	            	   title2_data: [200, 200,200,200,200,200,200,200,200,300,300,300],
    		    	            	   tot_data: [300, 300,300,200,300,200,200,200,400,300,300,300], 
    		    	            	 },
    		    	              "unit": "명",	
    		    	              "larger": "<대전광역시 유성구 (3,100명)>,<대전광역시 서구 (2,100명)>",
    		    	              "larger2": "<대전광역시 유성구 (3,100명)>,<대전광역시 서구 (2,100명)>",    		    	              
    		    	              "smaller": "<대전광역시 동구 (-3,433명), 대전광역시 중구 (-2,674명)> aaaaa",
    		    	              "smaller2": "<대전광역시 동구 (-3,433명), 대전광역시 중구 (-2,674명)> aaaaa",    		    	              
    		                    },
    		                    
    		     
    		       "tot_house" :{  name:"총 주택수",
        		    	             thisYear:'2022년',
        		    	             thisYearVal:365123,
        		    	             thisYearKey1:'남', 
        		    	             thisYearVal1:230978,
        		    	             thisYearKey2:'여', 
        		    	             thisYearVal2:205875,
        		    	             lastYear:'2021년', 
        		    	             lastYearVal:112548, 
        		    	             yearData:{
        		    	            	   year:["2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021"],
        		    	            	   title1: '남자',
        		    	            	   title1_data: [100, 100,100,100,100,100,100,100,100,100,100,100],
        		    	            	   title2: '여자',
        		    	            	   title2_data: [200, 200,200,200,200,200,200,200,200,300,300,300],
        		    	            	   tot_data: [300, 300,300,200,300,200,200,200,400,300,300,300], 
        		    	            	 },
        		    	              "unit": "명",	
        		    	              "larger": "<대전광역시 유성구 (3,100명)>,<대전광역시 서구 (2,100명)>",
        		    	              "larger2": "<대전광역시 유성구 (3,100명)>,<대전광역시 서구 (2,100명)>",    		    	              
        		    	              "smaller": "<대전광역시 동구 (-3,433명), 대전광역시 중구 (-2,674명)> aaaaa",
        		    	              "smaller2": "<대전광역시 동구 (-3,433명), 대전광역시 중구 (-2,674명)> aaaaa",    		    	              
        		                    },
    		     "house" :{},
    		     "1gagu" :{},
    		     "corp" :{},
    		     "employee" :{},    		     
    		   },
    } ;
    


     const mapInfoAllData = {
        	            '25030': {
               		   		     "oneman_house" :{"category":[2000,2005,2010,2015,2016,2017,2018,2019,2020],"title":"다문화가구", "data":[1234,2314,2214,3142,1124,3254,4512,2152,1254]},
               		   		     "old_oneman" :{"category":[2000,2005,2010,2015,2016,2017,2018,2019,2020],"title":"다문화가구", "data":[1234,2314,2214,3142,1124,3254,4512,2152,1254]},               		   		     
               		   		     "tot_ppltn":{"category":[2000,2005,2010,2015,2016,2017,2018,2019,2020],
               		   		                       "title":"귀농/귀촌/귀어 인구 현황", 
               		   		                       "data":[1234,2314,2214,3142,1124,3254,4512,2152,1254],
               		   		                       "table_data":[{"spaceName":"둔산동","spaceId":"2501068020201","spaceRank":"1","value":289,"rate":"6.1"},
               													 {"spaceName":"내동","spaceId":"2501068010003","spaceRank":"2","value":244,"rate":"5.1"},
               													 {"spaceName":"도안동","spaceId":"2501068020102","spaceRank":"3","value":238,"rate":"5.0"},
               													 {"spaceName":"홍도동_4","spaceId":"2501068020101","spaceRank":"4","value":231,"rate":"4.9"},
               													 {"spaceName":"홍도동_5","spaceId":"2501068020401","spaceRank":"5","value":225,"rate":"4.7"},
               													 {"spaceName":"홍도동_6","spaceId":"2501068020010","spaceRank":"6","value":222,"rate":"4.7"},
               													 {"spaceName":"홍도동_7","spaceId":"2501068020012","spaceRank":"7","value":220,"rate":"4.6"},
               													 {"spaceName":"홍도동_8","spaceId":"2501068010201","spaceRank":"8","value":209,"rate":"4.4"},
               													 {"spaceName":"홍도동_9","spaceId":"2501068020004","spaceRank":"9","value":209,"rate":"4.4"},
               													 {"spaceName":"홍도동_10","spaceId":"2501068020801","spaceRank":"10","value":187,"rate":"3.9"}
             										            ],
            	        							"table_data2":[{ "title": "전국", "data": 70.5 },{ "title": "대전광역시", "data": 60.5 },{ "title": "대전광역시 서구", "data": 45.5 },{ "title": "대전광역시 서구 둔산동", "data": 30.5 }]             										            
               		   		                     },
             		   		     "ppltn_density":{"category":["둔산동","내동",2010,2015,2016,2017,2018,2019,2020],
                 		   		                       "title":"귀농/귀촌/귀어 인구 현황", 
                 		   		                       "data":[1234,2314,2214,3142,1124,3254,4512,2152,1254],
                 		   		                       "table_data":[{"spaceName":"둔산동","spaceId":"2501068020201","spaceRank":"1","value":289,"rate":"6.1"},
                 													 {"spaceName":"내동","spaceId":"2501068010003","spaceRank":"2","value":244,"rate":"5.1"},
                 													 {"spaceName":"도안동","spaceId":"2501068020102","spaceRank":"3","value":238,"rate":"5.0"},
                 													 {"spaceName":"홍도동_4","spaceId":"2501068020101","spaceRank":"4","value":231,"rate":"4.9"},
                 													 {"spaceName":"홍도동_5","spaceId":"2501068020401","spaceRank":"5","value":225,"rate":"4.7"},
                 													 {"spaceName":"홍도동_6","spaceId":"2501068020010","spaceRank":"6","value":222,"rate":"4.7"},
                 													 {"spaceName":"홍도동_7","spaceId":"2501068020012","spaceRank":"7","value":220,"rate":"4.6"},
                 													 {"spaceName":"홍도동_8","spaceId":"2501068010201","spaceRank":"8","value":209,"rate":"4.4"},
                 													 {"spaceName":"홍도동_9","spaceId":"2501068020004","spaceRank":"9","value":209,"rate":"4.4"},
                 													 {"spaceName":"홍도동_10","spaceId":"2501068020801","spaceRank":"10","value":187,"rate":"3.9"}
               										            ],
              	        							"table_data2":[{ "title": "전국", "data": 70.5 },{ "title": "대전광역시", "data": 60.5 },{ "title": "대전광역시 서구", "data": 45.5 },{ "title": "대전광역시 서구 둔산동", "data": 30.5 }]             										            
                 		   		                     },
                 		   		                     
             		   		     "tot_man":{"category":[2000,2005,2010,2015,2016,2017,2018,2019,2020],
                   		   		                       "title":"귀농/귀촌/귀어 인구 현황", 
                   		   		                       "data":[1234,2314,2214,3142,1124,3254,4512,2152,1254],
                   		   		                       "table_data":[{"spaceName":"둔산동","spaceId":"2501068020201","spaceRank":"1","value":289,"rate":"6.1"},
                   													 {"spaceName":"내동","spaceId":"2501068010003","spaceRank":"2","value":244,"rate":"5.1"},
                   													 {"spaceName":"도안동","spaceId":"2501068020102","spaceRank":"3","value":238,"rate":"5.0"},
                   													 {"spaceName":"홍도동_4","spaceId":"2501068020101","spaceRank":"4","value":231,"rate":"4.9"},
                   													 {"spaceName":"홍도동_5","spaceId":"2501068020401","spaceRank":"5","value":225,"rate":"4.7"},
                   													 {"spaceName":"홍도동_6","spaceId":"2501068020010","spaceRank":"6","value":222,"rate":"4.7"},
                   													 {"spaceName":"홍도동_7","spaceId":"2501068020012","spaceRank":"7","value":220,"rate":"4.6"},
                   													 {"spaceName":"홍도동_8","spaceId":"2501068010201","spaceRank":"8","value":209,"rate":"4.4"},
                   													 {"spaceName":"홍도동_9","spaceId":"2501068020004","spaceRank":"9","value":209,"rate":"4.4"},
                   													 {"spaceName":"홍도동_10","spaceId":"2501068020801","spaceRank":"10","value":187,"rate":"3.9"}
                 										            ],
                	        							"table_data2":[{ "title": "전국", "data": 70.5 },{ "title": "대전광역시", "data": 60.5 },{ "title": "대전광역시 서구", "data": 45.5 },{ "title": "대전광역시 서구 둔산동", "data": 30.5 }]             										            
                   		   		                     },
                   		   		                     
                   		   		                     
             		   		     "tot_woman":{"category":[2000,2005,2010,2015,2016,2017,2018,2019,2020],
                     		   		                       "title":"귀농/귀촌/귀어 인구 현황", 
                     		   		                       "data":[1234,2314,2214,3142,1124,3254,4512,2152,1254],
                     		   		                       "table_data":[{"spaceName":"둔산동","spaceId":"2501068020201","spaceRank":"1","value":289,"rate":"6.1"},
                     													 {"spaceName":"내동","spaceId":"2501068010003","spaceRank":"2","value":244,"rate":"5.1"},
                     													 {"spaceName":"도안동","spaceId":"2501068020102","spaceRank":"3","value":238,"rate":"5.0"},
                     													 {"spaceName":"홍도동_4","spaceId":"2501068020101","spaceRank":"4","value":231,"rate":"4.9"},
                     													 {"spaceName":"홍도동_5","spaceId":"2501068020401","spaceRank":"5","value":225,"rate":"4.7"},
                     													 {"spaceName":"홍도동_6","spaceId":"2501068020010","spaceRank":"6","value":222,"rate":"4.7"},
                     													 {"spaceName":"홍도동_7","spaceId":"2501068020012","spaceRank":"7","value":220,"rate":"4.6"},
                     													 {"spaceName":"홍도동_8","spaceId":"2501068010201","spaceRank":"8","value":209,"rate":"4.4"},
                     													 {"spaceName":"홍도동_9","spaceId":"2501068020004","spaceRank":"9","value":209,"rate":"4.4"},
                     													 {"spaceName":"홍도동_10","spaceId":"2501068020801","spaceRank":"10","value":187,"rate":"3.9"}
                   										            ],
                  	        							"table_data2":[{ "title": "전국", "data": 70.5 },{ "title": "대전광역시", "data": 60.5 },{ "title": "대전광역시 서구", "data": 45.5 },{ "title": "대전광역시 서구 둔산동", "data": 30.5 }]             										            
                     		   		                     },
                   		   		                     
                     	             		   		     "tot_woman":{"category":[2000,2005,2010,2015,2016,2017,2018,2019,2020],
                       		   		                       "title":"귀농/귀촌/귀어 인구 현황", 
                       		   		                       "data":[1234,2314,2214,3142,1124,3254,4512,2152,1254],
                       		   		                       "table_data":[{"spaceName":"둔산동","spaceId":"2501068020201","spaceRank":"1","value":289,"rate":"6.1"},
                       													 {"spaceName":"내동","spaceId":"2501068010003","spaceRank":"2","value":244,"rate":"5.1"},
                       													 {"spaceName":"도안동","spaceId":"2501068020102","spaceRank":"3","value":238,"rate":"5.0"},
                       													 {"spaceName":"홍도동_4","spaceId":"2501068020101","spaceRank":"4","value":231,"rate":"4.9"},
                       													 {"spaceName":"홍도동_5","spaceId":"2501068020401","spaceRank":"5","value":225,"rate":"4.7"},
                       													 {"spaceName":"홍도동_6","spaceId":"2501068020010","spaceRank":"6","value":222,"rate":"4.7"},
                       													 {"spaceName":"홍도동_7","spaceId":"2501068020012","spaceRank":"7","value":220,"rate":"4.6"},
                       													 {"spaceName":"홍도동_8","spaceId":"2501068010201","spaceRank":"8","value":209,"rate":"4.4"},
                       													 {"spaceName":"홍도동_9","spaceId":"2501068020004","spaceRank":"9","value":209,"rate":"4.4"},
                       													 {"spaceName":"홍도동_10","spaceId":"2501068020801","spaceRank":"10","value":187,"rate":"3.9"}
                     										            ],
                    	        							"table_data2":[{ "title": "전국", "data": 70.5 },{ "title": "대전광역시", "data": 60.5 },{ "title": "대전광역시 서구", "data": 45.5 },{ "title": "대전광역시 서구 둔산동", "data": 30.5 }]             										            
                       		   		                     },
                 		   		                     
               		   		                     
                   		   		                     
                   	               "apart_cnt":{"category":["둔산동","내동","도안동","홍도동"],
                     		   		                       "title":"아파트", 
                     		   		                       "data":[1234,2314,2214,1233],
                     		   		                       "table_data":[{"spaceName":"둔산동","spaceId":"2501068020201","spaceRank":"1","value":289,"rate":"6.1"},
                     													 {"spaceName":"내동","spaceId":"2501068010003","spaceRank":"2","value":244,"rate":"5.1"},
                     													 {"spaceName":"도안동","spaceId":"2501068020102","spaceRank":"3","value":238,"rate":"5.0"},
                     													 {"spaceName":"홍도동_4","spaceId":"2501068020101","spaceRank":"4","value":231,"rate":"4.9"},
                     													 {"spaceName":"홍도동_5","spaceId":"2501068020401","spaceRank":"5","value":225,"rate":"4.7"},
                     													 {"spaceName":"홍도동_6","spaceId":"2501068020010","spaceRank":"6","value":222,"rate":"4.7"},
                     													 {"spaceName":"홍도동_7","spaceId":"2501068020012","spaceRank":"7","value":220,"rate":"4.6"},
                     													 {"spaceName":"홍도동_8","spaceId":"2501068010201","spaceRank":"8","value":209,"rate":"4.4"},
                     													 {"spaceName":"홍도동_9","spaceId":"2501068020004","spaceRank":"9","value":209,"rate":"4.4"},
                     													 {"spaceName":"홍도동_10","spaceId":"2501068020801","spaceRank":"10","value":187,"rate":"3.9"}
                   										            ],
                  	        							"table_data2":[{ "title": "전국", "data": 70.5 },{ "title": "대전광역시", "data": 60.5 },{ "title": "대전광역시 서구", "data": 45.5 },{ "title": "대전광역시 서구 둔산동", "data": 30.5 }]             										            
                     		   		                     },
               		   		                     
                            },                
               		   		     
    } ;
    
    
    
/*
 * https://sgis.kostat.go.kr/ServiceAPI/thematicMap/GetThemaMapData.json?
 */    
    
    
    
