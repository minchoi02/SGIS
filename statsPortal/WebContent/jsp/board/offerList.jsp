<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<style scoped="scoped">
	/* td {font-weight: bold;} */
	#offerTB td{padding: 5px;}
	td:nth-child(2){text-align: left; padding: 5px;}
	#tbHeader th{font-size: 17px; background-color: #A9D0F5;} <!-- 2017.12.27 [개발팀] 접근성조치  -->
	#offerHead {font-weight: bold; font-size: 18px;}
</style>
<p id="offerHead" style="font-family: 'HY강B'; text-align: right;">'19.5. 현재</p>
<table id="offerTb" style="text-align: center; width: 100%" summary="SGIS 서비스 자료제공시점현황"> <!-- 2017.12.27 [개발팀] 접근성조치  -->
	<caption>SGIS 서비스 자료제공시점현황</caption> <!-- 2017.12.27 [개발팀] 접근성조치  -->
	<tr id="tbHeader">
		<th style="width: 5%;" scope="col">번호</th>	<!-- 2017.12.27 [개발팀] 접근성조치  -->
		<th style="width: 20%;" scope="col">자료명</th> <!-- 2017.12.27 [개발팀] 접근성조치  -->
		<th style="width: 15%;" scope="col">산출자료 시점</th> <!-- 2017.12.27 [개발팀] 접근성조치  -->
		<th style="width: 17%;" scope="col">업데이트 주기</th> <!-- 2017.12.27 [개발팀] 접근성조치  -->
		<th style="width: 15%;" scope="col">원데이터 출처</th> <!-- 2017.12.27 [개발팀] 접근성조치  -->
		<th style="width: 28%;" scope="col">비 고<br/>(활용 서비스)</th> <!-- 2017.12.27 [개발팀] 접근성조치  -->
	</tr>
	<tr>
		<td>1</td>
		<td>행정구역경계(시도)
		</td>
		<td rowspan="4">2018.6.</td>
		<td rowspan="4">연간</td>
		<td rowspan="4">통계청</td>
		<td rowspan="4">공통 활용</td>
	</tr>
	<tr>
		<td>2</td>
		<td>행정구역경계(시군구)
		</td>
	</tr>
	<tr>
		<td>3</td>
		<td>행정구역경계(읍면동)
		</td>
	</tr>
	<tr>
		<td>4</td>
		<td>행정구역경계(집계구)</td>
	</tr>
	<tr>
		<td>5</td>
		<td>인구주택총조사결과(등록센서스)
		</td>
		<td>2017.11.1.</td>
		<td>연간</td>
		<td rowspan="4">통계청</td>
		<td rowspan="4">공통 활용</td>
	</tr>
	<tr>
		<td>6</td>
		<td>인구주택총조사결과(표본항목)
		</td>
		<td>2015.11.1.</td>
		<td>연간</td>
	</tr>
	<tr>
		<td>7</td>
		<td>전국사업체조사결과</td>
		<td>2017.12.31.</td>
		<td>연간</td>
	</tr>
	<tr>
		<td>8</td>
		<td>농림어업총조사결과</td>
		<td>2015.12.1.</td>
		<td>연간</td>
	</tr>
	<tr>
		<td>9</td>
		<td>주택실거래가</td>
		<td>2017.1.1.～<br/>2018.6.30.</td>
		<td>연간</td>
		<td>국토교통부</td>
		<td>살고싶은 우리동네,<br/>우리동네 생활업종</td>
	</tr>
	<tr>
		<td>10</td>
		<td>공시지가</td>
		<td>2018.1.1.</td>
		<td>연간</td>
		<td>국토교통부</td>
		<td>살고싶은 우리동네,<br/>우리동네 생활업종</td>
	</tr>
	<tr>
		<td>11</td>
		<td>버스정류장 위치 정보</td>
		<td>2018.6.30.</td>
		<td>연간</td>
		<td>교통안전공단</td>
		<td rowspan="2">대화형 통계지도,<br/>우리동네 생활업종</td>
	</tr>
	<tr>
		<td>12</td>
		<td>지하철 승하차 현황</td>
		<td>2017.7.1.～<br/>2018.6.30.</td>
		<td>연간</td>
		<td>철도 노선별<br/>관리 기관</td>
	</tr>
	<tr>
		<td>13</td>
		<td>상권정보</td>
		<td>2015년</td>
		<td>미정</td>
		<td>중소기업청</td>
		<td>우리동네 생활업종</td>
	</tr>
	<tr>
		<td>14</td>
		<td>대기오염도</td>
		<td>2017.1.～<br/>2017.12.</td>
		<td>연간</td>
		<td>국립환경과학원</td>
		<td>살고싶은 우리 동네,<br/>통계주제도</td>
	</tr>
	<tr>
		<td>15</td>
		<td>화재안전지수(등급)</td>
		<td rowspan="2">2017년</td>
		<td rowspan="2">연간</td>
		<td rowspan="2">행정안전부</td>
		<td rowspan="6">살고싶은 우리동네</td>
	</tr>
	<tr>
		<td>16</td>
		<td>교통안전지수(등급)</td>	
	</tr>
	<tr>
		<td>17</td>
		<td>녹지비율</td>
		<td>2014.12.</td>
		<td>미정<br/>(2019년 공표예정)</td>
		<td>환경부</td>
	</tr>
	<tr>
		<td>18</td>
		<td>학 구 도</td>
		<td>2018.9.</td>
		<td>반기</td>
		<td>교육시설환경<br/>연구센터</td>
	</tr>
	<tr>
		<td>19</td>
		<td>체감온도</td>
		<td>2017.11.1.～<br/>2018.3.31.</td>
		<td rowspan="2">연간</td>
		<td rowspan="2">기상청</td>
	</tr>
	<tr>
		<td>20</td>
		<td>불쾌지수</td>
		<td>2018.6.1.～<br/>2018.9.30.</td>
	</tr>
	<tr>
		<td>21</td>
		<td>교통사고</td>
		<td>2017년</td>
		<td rowspan="3">연간</td>
		<td>도로교통공단</td>
		<td rowspan="3">통계주제도</td>
		
	</tr>
	<tr>
		<td>22</td>
		<td>기초생활수급자</td>
		<td>2017.12.</td>
		<td>보건복지부</td>
	</tr>
	<tr>
		<td>23</td>
		<td>문화재분포현황</td>
		<td>2017.12.</td>
		<td>문화재청</td>
	</tr>
	<tr>
		<td>24</td>
		<td>주민등록인구</td>
		<td>2018.12.</td>
		<td>연간</td>
		<td>행정안전부</td>
		<td>살고싶은 우리동네,<br/>통계주제도</td>
	</tr>
	<tr>
		<td>25</td>
		<td>인구이동통계</td>
		<td>2018.12.</td>
		<td rowspan="2">연간</td>
		<td>통계청</td>
		<td rowspan="33">통계주제도</td>
	</tr>
	<tr>
		<td>26</td>
		<td>시군구별 외국인<br/>주민 현황</td>
		<td>2017.11.</td>
		<td>행정안전부</td>
	</tr>
	<tr>
		<td>27</td>
		<td>결혼기간 10년 이하<br/>가구의 주택 점유형태
		</td>
		<td>2010년</td>
		<td>미정<br/>(특별보도)</td>
		<td>통계청</td>
	</tr>
	<tr>
		<td>28</td>
		<td>자동차 등록대수</td>
		<td>2018.12.</td>
		<td rowspan="30">연간</td>
		<td rowspan="2">국토교통부</td>
	</tr>
	<tr>
		<td>29</td>
		<td>노외주차장 현황</td>
		<td>2016.12.</td>
	</tr>
	<tr>
		<td>30</td>
		<td>주택의 매매가격 상승률</td>
		<td>2018.12.</td>
		<td>한국감정원</td>
		
	</tr>
	<tr>
		<td>31</td>
		<td>의료기관 병상수, 의사수</td>
		<td>2017.12.</td>
		<td>행정안전부</td>
	</tr>
	<tr>
		<td>32</td>
		<td>65세 이상 장기요양<br/>급여자 현황</td>
		<td>2017.12.</td>
		<td>국민건강관리공단</td>		
	</tr>
	<tr>
		<td>33</td>
		<td>장애인수</td>
		<td>2018.12.</td>
		<td>보건복지부</td>
	</tr>
	<tr>
		<td>34</td>
		<td>장애인 고용률</td>
		<td>2017.12.</td>
		<td>한국장애인고용공단</td>
	</tr>
	<tr>
		<td>35</td>
		<td>평생교육기관</td>
		<td>2018.12.</td>
		<td>한국교육개발원</td>
	</tr>
	<tr>
		<td>36</td>
		<td>도서관 분포현황</td>
		<td>2017.12.</td>
		<td>문화체육관광부</td>
	</tr>
	<tr>
		<td>37</td>
		<td>교원 1인당 학생수</td>
		<td>2018.12.</td>
		<td>한국교육개발원</td>
	</tr>
	<tr>
		<td>38</td>
		<td>EQ-5D 지표</td>
		<td rowspan="4">2017.12.</td>
		<td rowspan="2">보건복지부</td>
	</tr>
	<tr>
		<td>39</td>
		<td>어린이집/직장어린이집<br/>현황</td>
	</tr>
	<tr>
		<td>40</td>
		<td>요양기관수 현황</td>
		<td>국민건강보험<br/>공단</td>
	</tr>
	<tr>
		<td>41</td>
		<td>인구천명당 사설학원 수</td>
		<td>행정안전부</td>
	</tr>
	<tr>
		<td>42</td>
		<td>취업자 수</td>
		<td rowspan="4">2018.12.</td>
		<td rowspan="3">통계청</td>
	</tr>
	<tr>
		<td>43</td>
		<td>고용률</td>
	</tr>
	<tr>
		<td>44</td>
		<td>실업률</td>
	</tr>
	<tr>
		<td>45</td>
		<td>재정자립도 현황</td>
		<td>행정안전부</td>
	</tr>
	<tr>
		<td>46</td>
		<td>일반폐기물 재활용률</td>
		<td rowspan="2">2016.12.</td>
		<td rowspan="2">환경부</td>
	</tr>
	<tr>
		<td>47</td>
		<td>폐기물 배출량</td>
	</tr>
	<tr>
		<td>48</td>
		<td>화재사고 발생건수</td>
		<td rowspan="3">2017.12.</td>
		<td>행정안전부</td>
	</tr>
	<tr>
		<td>49</td>
		<td>범죄 발생건수</td>
		<td>경찰청</td>
	</tr>
	<tr>
		<td>50</td>
		<td>음주율, 흡연율</td>
		<td>보건복지부</td>
	</tr>
	<tr>
		<td>51</td>
		<td>화학물질 배출량</td>
		<td>2015.12.</td>
		<td>환경부</td>
		
	</tr>
	<tr>
		<td>52</td>
		<td>소년범죄 발생건수</td>
		<td rowspan="2">2016.12.</td>
		<td rowspan="2">행정안전부</td>
	</tr>
	<tr>
		<td>53</td>
		<td>119안전센터 1개당<br/>담당주민 수</td>
	</tr>
	<tr>
		<td>54</td>
		<td>재배면적 변화</td>
		<td>2018.</td>
		<td>통계청</td>
		
	</tr>
	<tr>
		<td>55</td>
		<td>지진발생 분포지역</td>
		<td rowspan="3">2017.12.</td>
		<td>기상청</td>
	</tr>
	<tr>
		<td>56</td>
		<td>미세먼지대기오염도</td>
		<td rowspan="2">국립환경과학원</td>
	</tr>
	<tr>
		<td>57</td>
		<td>일산화탄소대기오염도</td>
	</tr>
	<tr>
		<td>58</td>
		<td>귀농어귀촌인통계</td>
		<td>2017.11.</td>
		<td>연간</td>
		<td>통계청</td>
		<td>통계주제도</td>
	</tr>
	<tr>
		<td>59</td>
		<td>고용동향</td>
		<td rowspan="3">매월</td>
		<td rowspan="3">매월</td>
		<td rowspan="3">통계청</td>
		<td rowspan="3">분석지도</td>
	</tr>
	<tr>
		<td>60</td>
		<td>산업활동동향</td>
	</tr>
	<tr>
		<td>61</td>
		<td>소비자물가동향</td>
	</tr>
	<tr>
		<td rowspan="2">62</td>
		<td rowspan="2">인구동향</td>
		<td>매월</td>
		<td>매월</td>
		<td rowspan="2">통계청</td>
		<td>분석지도</td>
	</tr>
	<tr>
		<td>2017.12.</td>
		<td style="display:none"></td>
		<td>연간</td>
		<td>통계주제도</td>
	</tr>
	<tr>
		<td>63</td>
		<td>어린이보호구역 분포 현황</td>
		<td>2018.4.</td>
		<td rowspan="12">비정기</td>
		<td>경찰청<br/></td>
		<td rowspan="3">정책통계지도<br/>(‘18년 8월 업데이트)</td>
	</tr>
	<tr>
		<td>64</td>
		<td>민방위대피시설 분포 현황</td>
		<td>2017.4.</td>
		<td rowspan="2">행정안전부,<br/>재난안전 데이터포털</td>
	</tr>
	<tr>
		<td>65</td>
		<td>재해위험지구 분포현황</td>
		<td>2017.9.</td>
	</tr>
	<tr>
		<td>66</td>
		<td>어린이집 분포 현황</td>
		<td>2018.7.</td>
		<td>보건복지부</td>
		<td>정책통계지도<br/>(‘18년 7월 업데이트)</td>
	</tr>
	<tr>
		<td>67</td>
		<td>도서관 운영 현황</td>
		<td  rowspan="8">2017 ~ 2018</td>
		<td  rowspan="8">지자체,<br/>공공데이터포털</td>
		<td  rowspan="8">정책통계지도<br/>(‘18년 5월 업데이트)</td>
	</tr>
	<tr>
		<td>68</td>
		<td>도서관별 도서보유 현황</td>
	</tr>
	<tr>
		<td>69</td>
		<td>자전거보관소 분포현황</td>
	</tr>
	<tr>
		<td>70</td>
		<td>공공자전거 분포 현황</td>

	</tr>
	<tr>
		<td>71</td>
		<td>박물관미술관 분포현황</td>
	</tr>
	<tr>
		<td>72</td>
		<td>도시공원 분포 현황</td>
	</tr>
	<tr>
		<td>73</td>
		<td>무인민원발급기 설치 현황</td>
	</tr>
	<tr>
		<td>74</td>
		<td>CCTV 분포현황</td>
	</tr>
	<tr>
		<td>75</td>
		<td>장래인구추계</td>
		<td>2016.6.15.</td>
		<td>1년</td>
		<td>통계청</td>
		<td>인구피라미드</td>
	</tr>
	<tr>
		<td>76</td>
		<td>지역간 고령화현황</td>
		<td>2017.12.</td>
		<td rowspan="9">1년</td>
		<td rowspan="7">통계청</td>
		<td rowspan="9">고령화 현황보기</td>
	</tr>
	<tr>
		<td>77</td>
		<td>거처의 종류별 가구</td>
		<td>2017.12.</td>
	</tr>
	<tr>
		<td>78</td>
		<td>국민기초 일반 수급자수</td>
		<td>2016.12.</td>
	</tr>
	<tr>
		<td>79</td>
		<td>생활비 마련방법</td>
		<td>2016.12.</td>
	</tr>
	<tr>
		<td>80</td>
		<td>산업별 종사현황</td>
		<td>2016.12.</td>
	</tr>
	<tr>
		<td>81</td>
		<td>장래인구추계</td>
		<td>2016.6.15</td>
	</tr>
	<tr>
		<td>82</td>
		<td>복지시설 위치</td>
		<td>2016.12.</td>
	</tr>
	<tr>
		<td>83</td>
		<td>노인 주거 복지시설<br/>노인 의료 복지시설<br/>노인 여가 복지시설<br/>재가 노인 복지시설</td>
		<td>2017.12.</td>
		<td>보건복지부</td>
	</tr>
	<tr>
		<td>84</td>
		<td>향후 자녀와 동거의향</td>
		<td>2016.12.</td>
		<td>통계청</td>
	</tr>
	<tr>
		<td>85</td>
		<td>인구/가구/사회/주택/종교/사업체 비율</td>
		<td>2016.12.</td>
		<td>1년, 5년, 15년</td>
		<td>통계청</td>
		<td>지방의 변화보기</td>
	</tr>
	<tr>
		<td>86</td>
		<td>성씨 및 본관 인구</td>
		<td>2015.12.</td>
		<td>15년</td>
		<td>통계청</td>
		<td>성씨분포</td>
	</tr>
	<tr>
		<td>87</td>
		<td>지자체인허가통계</td>
		<td>2018.1분기 ~ 2019.1분기</td>
		<td>분기</td>
		<td>한국지역정보개발원</td>
		<td>우리동네생활업종</td>
	</tr>
</table>