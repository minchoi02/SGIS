package kostat.sop.OpenAPI3.api.addr;

import java.net.InetAddress;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.lucene.document.Document;
import org.apache.lucene.search.Sort;
import org.apache.lucene.search.SortField;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.NotSupportFormatException;
import com.neighborsystem.durian.restapi.api.HttpMethod;
import com.neighborsystem.lucene.searcher.AbsQueryInfo;

import kostat.sop.OpenAPI3.common.controller.AbsQuery;
import kostat.sop.OpenAPI3.exception.ApiException;
import kostat.sop.OpenAPI3.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.OpenAPI3.exception.NoResultException;
import kostat.sop.OpenAPI3.search.GeocodeSearching;
import kostat.sop.OpenAPI3.search.address.AddressDivision;
import kostat.sop.OpenAPI3.search.handler.SearchingHandler;
import kostat.sop.OpenAPI3.search.index.GeocodeIndexFieldDefineEnum;
import kostat.sop.OpenAPI3.search.query.BdMgtSnQueryInfo;
import kostat.sop.OpenAPI3.search.query.JibunQueryInfo;
import kostat.sop.OpenAPI3.search.query.PnuQueryInfo;
import kostat.sop.OpenAPI3.search.query.RoadQueryInfo;

/**
 * 지오코딩 API 입력된 주소에 대한 위치를 제공하는 API
 * 
 * <pre>
* input : geocode.json/xml
* output : json/xml
* Table : None
 * </pre>
 *
 * <pre>
* <b>History:</b> 
* 권영구, 1.0, 2014/09/24 초기 작성
 * </pre>
 * 
 * @author 권영구
 * @version 1.0, 2014/09/24 메서드 추가
 * @see None
 */

public class Geocode extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(Geocode.class);
	// private Searching searching = null;

	private GeocodeSearching searcher;
	private SearchingHandler handler;

	//
	private String resultcount = "5";

	private String pagenum = "0";

	public GeocodeSearching getSearcher() {
		return searcher;
	}

	public void setSearcher(GeocodeSearching searcher) {
		this.searcher = searcher;
	}

	public SearchingHandler getHandler() {
		return handler;
	}

	public void setHandler(SearchingHandler handler) {
		this.handler = handler;
	}

//	public AbsSearchingInMultipleIndexSearcher getSearcher() {
//		return searcher;
//	}
//
//	public void setSearcher(AbsSearchingInMultipleIndexSearcher searcher) {
//		this.searcher = searcher;
//	}

	@SuppressWarnings({ "static-access", "unchecked", "unused" })
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		int intAddrType = 1;
		int intResultCount = 5;
		int intPageNum = 1;
		boolean bReturnPNUnMGT = false; // 20170720 pnu, mgt 정보 리턴 추가 @hkkim
		GeocodeIndexFieldDefineEnum geocodeindex = null;

		Map result = new HashMap();
		String strAddress = "";

		// AbsSearchingInMultipleIndexSearcher searcher = new GeocodeSearching();
		try {
			//logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			String strFormat = _getViewType(req, res);

			if (!(strFormat.equals("json") || strFormat.equals("xml"))) {
				throw new NotSupportFormatException("Not Support Format[" + strFormat + "]");
			}

			Map mapParameter = getParameterMap(req);
			// 파라메터 값이 널인지 체크한다.
			_checkNullParameterValue(mapParameter);

			optimizeParameterMap(mapParameter);

			AbsQueryInfo qInfo = null;
			String strType = "";
			String precision = "";
			// 2016.12.20 pnu, bd_mgt_sn (지번, 건물관리번호) 검색 쿼리 생성
			if (mapParameter.containsKey(OptionParam.type.name())) {
				strType = (String) mapParameter.get(OptionParam.type.name());
				if (strType.equals("1")) {
					qInfo = new PnuQueryInfo(GeocodeSearching.KEY.KOREA.name(),
							(String) mapParameter.get(MustParam.address.name()));
				} else if (strType.equals("2")) {
					qInfo = new BdMgtSnQueryInfo(GeocodeSearching.KEY.KOREA.name(),
							(String) mapParameter.get(MustParam.address.name()));
				} else if (strType.equals("3")) {
					bReturnPNUnMGT = true; // 20170720 type 3일때 pnu, mgt 정보 리턴 @hkkim
				}
			}
			if (mapParameter.containsKey("precision")) {
				precision = (String) mapParameter.get(OptionParam.precision.name());
			} else {
				
				String hostName = InetAddress.getLocalHost().getHostName();
				System.out.println("[GeoCode.java] lbdms comment precision ==> hostName [" + hostName);
				if(hostName.startsWith("nn02")) {
					//hostName이 nn02로 시작할 경우 lbdms이다. 컴파일을 할때마다 변경하기 어려워서 이렇게 처리함.
				} else {
					precision = "low"; //lbdms는 주석처리
				}
				
			}
			
			Map mapAddress = null;
			boolean roadAddr = true;
			// 주소검색 쿼리 생성.
			String sido = "";
			String sigungu = "";
			String road_nm = "";
			String emdong_syn = "";
			String road_nm_main_no_s = "";
			String road_nm_sub_no_s = "";
			String pcl = "";
			String bd_main_nm_syn = "";
			String[] bd_names = {};
			String spBuildMainNm = "";
			String ri_syn = "";
			
			if (qInfo == null) {
				// 입력받은 주소값을 파싱해서 리턴
				// String strTmpAddress = URLDecoder.decode( (String)
				// mapParameter.get("address"), "UTF-8");//(String)mapParameter.get("address");
				String strTmpAddress = (String) mapParameter.get("address");
				//strTmpAddress = "서울특별시 강북구";
				
				mapAddress = new AddressDivision(strTmpAddress).getResult();
				if (!mapAddress.containsKey("emdong_syn")) mapAddress.put("emdong_syn", "");
				if (!mapAddress.containsKey("spEmdong")) mapAddress.put("spEmdong", "");
				if (!mapAddress.containsKey("bd_main_nm_syn")) mapAddress.put("bd_main_nm_syn", "");
				if (!mapAddress.containsKey("road_nm_sub_no")) mapAddress.put("road_nm_sub_no", "");
				if (!mapAddress.containsKey("road_nm_main_no")) mapAddress.put("road_nm_main_no", "");
				if (!mapAddress.containsKey("pcl")) mapAddress.put("pcl", "");
					
				checkAddress(mapAddress);
				//if (mapAddress.put("bd_main_nm_syn", "");
				// 2017.05-19 리펙토리
				if (mapAddress.containsKey("spRoad") && !mapAddress.get("spRoad").equals("")) {
					// 도로명 주소 검색
					qInfo = new RoadQueryInfo(mapAddress);

					// 메인건물 필드 소트 형태로 인덱스가 생성 되면 정렬 조건을 추가 한다.
					Sort sort = new Sort(new SortField[] { SortField.FIELD_SCORE,
							new SortField("road_nm_main_no", SortField.Type.STRING), 
							new SortField("road_nm_sub_no", SortField.Type.STRING),
							new SortField("bd_main_nm", SortField.Type.STRING),
							new SortField("bul_dpn_se", SortField.Type.STRING) 
					}); 

					qInfo.setSort(sort);
//					Field.Index.NOT_ANALYZED
				} else {
					if (mapAddress.containsKey("spMainNo") && !mapAddress.get("spMainNo").equals("")) {
						// 지번 주소 검색 
						qInfo = new JibunQueryInfo(mapAddress);
						roadAddr = false;
					} else { 
						// 기타 주소 검색 
 						/*qInfo = new AdmLegQueryInfo(mapAddress);
 						Map<String,String> queryMap = qInfo.getQueryMap();
						queryMap.put("origin_xy", "J_RI");
						qInfo.setQueryMap(queryMap);
						roadAddr = false;*/
						
						if (precision.equalsIgnoreCase("low") && mapAddress.containsKey("spX") && !mapAddress.get("spX").equals("")) {
							Map<String, String> mapResult = new LinkedHashMap<String, String>();
							List mapResultTmp = new ArrayList();
							mapResult.put("addr_type", "1");
							mapResult.put("origin_xy", "J_RI");
							mapResult.put("sido_nm", mapAddress.get("spSido").toString());
							mapResult.put("sido_cd", mapAddress.get("spAdmCd").toString().substring(0, 2));
							mapResult.put("adm_nm", "null");
							mapResult.put("adm_cd", "null");
							mapResult.put("leg_nm","null");
							mapResult.put("leg_cd", "null");
							mapResult.put("ri_nm", "null");
							mapResult.put("ri_cd", "null");
							mapResult.put("road_nm", "null");
							mapResult.put("road_cd", "null");
							mapResult.put("road_nm_main_no", "null");
							mapResult.put("road_nm_sub_no", "null");
							mapResult.put("bd_main_nm", "null");
							mapResult.put("bd_sub_nm", "null");
							mapResult.put("jibun_main_no", "null");
							mapResult.put("jibun_sub_no", "null");
							mapResult.put("pnu", "null");
							mapResult.put("bd_mgt_sn", "null");
							if ( !mapAddress.get("spGubun").toString().equals("sido")) {
								mapResult.put("addr_type", "2");
								mapResult.put("sgg_nm", mapAddress.get("spSgg").toString());
								mapResult.put("sgg_cd", mapAddress.get("spAdmCd").toString().substring(0, 5));
							}
							if ( mapAddress.get("spGubun").toString().equals("adm")
								||	mapAddress.get("spGubun").toString().equals("adm")
							) {
								mapResult.put("addr_type", "4");
								mapResult.put("adm_nm", mapAddress.get("spEmdong").toString());
								mapResult.put("adm_cd", mapAddress.get("spAdmCd").toString());
							}
							if ( mapAddress.get("spGubun").toString().equals("leg")) {
								mapResult.put("addr_type", "3");
								mapResult.put("adm_nm", mapAddress.get("spAdmNm").toString());
								mapResult.put("adm_cd", mapAddress.get("spAdmCd").toString());
								mapResult.put("leg_nm",mapAddress.get("spEmdong").toString());
								mapResult.put("leg_cd", mapAddress.get("spLegCd").toString());
							}
							if ( mapAddress.get("spEmdong").toString().endsWith("리")) {
								mapResult.put("addr_type", "5");
								mapResult.put("ri_nm", mapAddress.get("spEmdong").toString());
								mapResult.put("ri_cd", mapAddress.get("spLegCd").toString());
							}
							mapResult.put("x", mapAddress.get("spX").toString());
							mapResult.put("y", mapAddress.get("spY").toString());
							mapResultTmp.add(mapResult);
							result.put("totalcount", "1");
							result.put("pagenum", "1");
							result.put("returncount", "1");
							result.put("resultdata", mapResultTmp);
							return result;
						}
						//System.out.println("dfdfdfdf");
					}
				}

				// ISearchHandler handler = new SearchingHandler();
//				qInfo = new GeocodeQueryInfo( mapAddress );
			}


			if (mapAddress.get("sido_syn") != null)
				sido = (String) mapAddress.get("sido_syn");
			if (mapAddress.get("sgg_syn") != null)
				sigungu = (String) mapAddress.get("sgg_syn") + " ";
			if (mapAddress.get("emdong_syn") != null && !mapAddress.get("emdong_syn").equals(""))
				emdong_syn = " " + (String) mapAddress.get("emdong_syn") + " ";
			if (mapAddress.get("road_nm") != null)
				road_nm = (String) mapAddress.get("road_nm");
			if (mapAddress.get("road_nm_main_no") != null)
				road_nm_main_no_s = (String) mapAddress.get("road_nm_main_no");
			if (mapAddress.get("road_nm_sub_no") != null)
				road_nm_sub_no_s = (String) mapAddress.get("road_nm_sub_no");
			
			if (mapAddress.get("pcl") != null)
				pcl = (String) mapAddress.get("pcl");

			/*if (precision.equals("low")) {
				road_nm_sub_no_s = "";		
				String pcl_1 = pcl.replaceAll(" ", "");
				if (pcl.indexOf("-")>-1) pcl = pcl.split("-")[0];
				mapAddress.put("pcl", pcl);
				mapAddress.put("road_nm_sub_no", road_nm_sub_no_s);
			}*/
					
			if (mapAddress.get("ri_syn") != null)
				ri_syn = (String) mapAddress.get("ri_syn");
			if (mapAddress.get("bd_main_nm_syn") != null) {
				bd_main_nm_syn = (String) mapAddress.get("bd_main_nm_syn");
				bd_names = bd_main_nm_syn.split(" ");
			}
			if (mapAddress.get("spBuildMainNm") != null)
				spBuildMainNm = (String) mapAddress.get("spBuildMainNm");
			if (road_nm_sub_no_s == null)
				road_nm_sub_no_s = "";
			if (road_nm_sub_no_s.equals("0"))
				road_nm_sub_no_s = "";
			
			for(int addrchk = 0; addrchk < 2; addrchk++) {
				if (addrchk > 0 && !roadAddr) {
					if (mapAddress.containsKey("spRoad") && !mapAddress.get("spRoad").equals("")) {
						// 도로명 주소 검색
						qInfo = new RoadQueryInfo(mapAddress);

						// 메인건물 필드 소트 형태로 인덱스가 생성 되면 정렬 조건을 추가 한다.
						Sort sort = new Sort(new SortField[] { SortField.FIELD_SCORE,
								new SortField("road_nm_main_no", SortField.Type.STRING), 
								new SortField("road_nm_sub_no", SortField.Type.STRING),
								new SortField("bd_main_nm", SortField.Type.STRING),
								new SortField("bul_dpn_se", SortField.Type.STRING) 
						}); 

						qInfo.setSort(sort);
//						Field.Index.NOT_ANALYZED
					} else {
						if (mapAddress.containsKey("spMainNo") && !mapAddress.get("spMainNo").equals("")) {
							// 지번 주소 검색 
							qInfo = new JibunQueryInfo(mapAddress);
							roadAddr = false;
						} else { 
							if (mapAddress.containsKey("spX") && !mapAddress.get("spX").equals("")) {
								Map<String, String> mapResult = new LinkedHashMap<String, String>();
								mapResult.put("addr_type", "1");
								mapResult.put("origin_xy", "J_RI");
								mapResult.put("sido_nm", mapAddress.get("spSido").toString());
								mapResult.put("sido_cd", mapAddress.get("spAdmCd").toString().substring(0, 2));
								mapResult.put("adm_nm", "null");
								mapResult.put("adm_cd", "null");
								mapResult.put("leg_nm","null");
								mapResult.put("leg_cd", "null");
								mapResult.put("ri_nm", "null");
								mapResult.put("ri_cd", "null");
								mapResult.put("road_nm", "null");
								mapResult.put("road_cd", "null");
								mapResult.put("road_nm_main_no", "null");
								mapResult.put("road_nm_sub_no", "null");
								mapResult.put("bd_main_nm", "null");
								mapResult.put("bd_sub_nm", "null");
								mapResult.put("jibun_main_no", "null");
								mapResult.put("jibun_sub_no", "null");
								mapResult.put("pnu", "null");
								mapResult.put("bd_mgt_sn", "null");
								if ( !mapAddress.get("spGubun").toString().equals("sido")) {
									mapResult.put("sgg_nm", mapAddress.get("spSgg").toString());
									mapResult.put("sgg_cd", mapAddress.get("spAdmCd").toString().substring(0, 5));
								}
								if ( mapAddress.get("spGubun").toString().equals("adm")
									||	mapAddress.get("spGubun").toString().equals("adm")
								) {
									mapResult.put("adm_nm", mapAddress.get("spEmdong").toString());
									mapResult.put("adm_cd", mapAddress.get("spAdmCd").toString());
								}
								if ( mapAddress.get("spGubun").toString().equals("leg")) {
									mapResult.put("adm_nm", mapAddress.get("spAdmNm").toString());
									mapResult.put("adm_cd", mapAddress.get("spAdmCd").toString());
									mapResult.put("leg_nm",mapAddress.get("spEmdong").toString());
									mapResult.put("leg_cd", mapAddress.get("spLegCd").toString());
								}
								if ( mapAddress.get("spEmdong").toString().endsWith("리")) {
									mapResult.put("ri_nm", mapAddress.get("spEmdong").toString());
									mapResult.put("ri_cd", mapAddress.get("spLegCd").toString());
								}
								mapResult.put("x", mapAddress.get("spX").toString());
								mapResult.put("y", mapAddress.get("spY").toString());
								result.put("totalcount", "1");
								result.put("pagenum", "1");
								result.put("returncount", "1");
								result.put("resultdata", mapResult);
								return result;
							}
						}
					}
//					Field.Index.NOT_ANALYZED

				}
				
				qInfo.setPage(Integer.parseInt((String) mapParameter.get("pagenum")) + 1);
				// qInfo.setCount( Integer.parseInt( (String) mapParameter.get( "resultcount" )
				// ) );
				
				int getCount = 500;
				List<Document> docResult = null;
				List mapResultTmp = new ArrayList();
				List mapResultTmp2 = new ArrayList();
				for(int rty = 0; rty<2; rty++) {
					qInfo.setCount(getCount);
		
					// 검색관련 인덱스를 설정하고 검색시작
					// searcher.initIndexSearcherMap();
					// List<Map<String, String>> docResult= searcher.search( qInfo, handler );
 					Object obj = searcher.search(qInfo, handler);
					Map<String, Object> searchResult = (Map<String, Object>) obj;
					// Map<String, Object> resultInfo = new HashMap();
					Map<String, String> mapResultInfoTmp = new HashMap();
					
					// Map<String, Object> mapResultData = new HashMap();
		
					// 검색결과 정보를 담는다.
					docResult = (List<Document>) searchResult.get("Document");
					
					if (docResult.size() == 0) {
						if (roadAddr) {
							throw new NoResultException(); //mapAddress.toString()+">" + docResult.size();
						} else {
							if (addrchk == 0) {
								break;
							} else {
								throw new NoResultException(); //mapAddress.toString()+">" + docResult.size();
							}
						}
					}
					
					if (docResult.size() == 0 && mapParameter.get(OptionParam.absmatch.name()).equals("0")) {
						// 주소 나눈결과에 지번이 있을 경우 지번을 제외하고 다시 한번 검색 시도.
						// 지번을 제외하고 검색한 결과가 있을 경우에는 부분매칭을 표시하는 필드를 추가
						//
						String strPcl = qInfo.getQueryMap().get("pcl");
						if (strPcl != null && !strPcl.equals("")) {
							qInfo.getQueryMap().put("pcl", "");
		//					qInfo.getQueryMap().remove( "pcl" );
							obj = searcher.search(qInfo, handler);
							searchResult = (Map<String, Object>) obj;
							docResult = (List<Document>) searchResult.get("Document");
		//					if( docResult.size() == 0 ) {
		//						throw new NoResultException();
		//					} else {
							// 2016.12.21 매칭 구분 필드 추가
							// 0: 완전매칭 1: 부분매칭
							result.put("matching", "1");
		//					}
						} else {
							throw new NoResultException(); //mapAddress.toString()+">" + docResult.size();
						}
					} else {
						// 2016.12.21 매칭 구분 필드 추가
						// 0: 완전매칭 1: 부분매칭
						result.put("matching", "0");
					}
		
 					if (docResult.size() == 0) {
						if (roadAddr) {
							throw new NoResultException(); //mapAddress.toString()+">" + docResult.size();
						} else {
							if (addrchk == 0) {
								break;
							} else {
								throw new NoResultException(); //mapAddress.toString()+">" + docResult.size();
							}
						}
					}
		
					// 취득한 도큐먼트대로 결과값을 생성한다.
					/*
					 * road_nm_main_no road_nm_sub_no pcl mapAddress
					 */

					
					// 본번이 있거나 지번이 있거나
					if (!road_nm_main_no_s.equals("") || !pcl.equals("")) {
						int maxMatch = 0;
						for (int ix = 0; ix < docResult.size(); ix++) {
							int bd_matches = 0;
							String leg_nm = docResult.get(ix).get(geocodeindex.leg_nm.name());
							String adm_nm = docResult.get(ix).get(geocodeindex.adm_nm.name());
							String road_nm_s = docResult.get(ix).get(geocodeindex.road_nm.name());
							String road_nm_main_no = docResult.get(ix).get(geocodeindex.road_nm_main_no.name());
							String road_nm_sub_no = docResult.get(ix).get(geocodeindex.road_nm_sub_no.name());
							String strTmppcl = docResult.get(ix).get(geocodeindex.pcl.name());
							String bd_main_nm = docResult.get(ix).get(geocodeindex.bd_main_nm.name());
							String bd_sub_nm = docResult.get(ix).get(geocodeindex.bd_sub_nm.name());
							String ri_nm = docResult.get(ix).get(geocodeindex.ri_nm.name());
							
							road_nm = road_nm.replaceAll("\\.", "·");
							road_nm_s = road_nm_s.replaceAll("\\.", "·");
							if (roadAddr && road_nm!=null && !road_nm.equals("") && (road_nm_s==null || !road_nm.equals(road_nm_s)))
								continue;
							
							
							if (road_nm_main_no.equals("null"))
								road_nm_main_no = "";
							if (road_nm_sub_no.equals("null") || road_nm_sub_no.equals("0"))
								road_nm_sub_no = "";
							if (strTmppcl.equals("null"))
								strTmppcl = "";
							if (bd_main_nm.equals("null"))
								bd_main_nm = "";
							if (bd_sub_nm.equals("null"))
								bd_sub_nm = "";
							if (ri_nm.equals("null"))
								ri_nm = "";
							
							String t_sgg_nm = docResult.get(ix).get(geocodeindex.sgg_nm.name());
							String t_sido_nm = docResult.get(ix).get(geocodeindex.sido_nm.name());
							if (t_sgg_nm.equals("null")) 
								t_sgg_nm = "";
							if (t_sido_nm.equals("null")) 
								t_sido_nm = "";
		
							bd_matches = 0;
							String bd_main_nm_t = " " + bd_main_nm + " ";
							String bd_sub_nm_t = " " + bd_sub_nm + " ";
							if  (bd_main_nm_syn.length() > 0 && bd_main_nm_syn.length() <= 3) {
								for (int matchi = 0; matchi < bd_names.length; matchi++) {
									if (bd_main_nm_t.equalsIgnoreCase(" " + bd_names[matchi] + " ")) bd_matches++;
									if (bd_sub_nm_t.equalsIgnoreCase(" " + bd_names[matchi] + " ")) bd_matches++;
								}
							} 
							
							if  (bd_main_nm_syn.length() >= 3) {
								for (int matchi = 0; matchi < bd_names.length; matchi++) {
									if (bd_main_nm_t.indexOf(" " + bd_names[matchi] + " ")>-1) bd_matches++;
									if (bd_sub_nm_t.indexOf(" " + bd_names[matchi] + " ")>-1) bd_matches++;
								}
							} 
							
							Map<String, String> mapResult = new LinkedHashMap<String, String>();
		
							mapResult.put("addr_type", docResult.get(ix).get(geocodeindex.addr_type.name()));
							mapResult.put("sido_nm", t_sido_nm);
							mapResult.put("sido_cd", docResult.get(ix).get(geocodeindex.sido_cd.name()));
							mapResult.put("sgg_nm", t_sgg_nm);
							mapResult.put("sgg_cd", docResult.get(ix).get(geocodeindex.sgg_cd.name()));
							mapResult.put("adm_nm", docResult.get(ix).get(geocodeindex.adm_nm.name()));
							mapResult.put("adm_cd", docResult.get(ix).get(geocodeindex.adm_cd.name()));
							mapResult.put("leg_nm", docResult.get(ix).get(geocodeindex.leg_nm.name()));
							mapResult.put("leg_cd", docResult.get(ix).get(geocodeindex.leg_cd.name()));
							mapResult.put("ri_nm", docResult.get(ix).get(geocodeindex.ri_nm.name()));
							mapResult.put("ri_cd", docResult.get(ix).get(geocodeindex.ri_cd.name()));
							mapResult.put("road_nm", docResult.get(ix).get(geocodeindex.road_nm.name()));
							mapResult.put("road_cd", docResult.get(ix).get(geocodeindex.road_cd.name()));
							mapResult.put("road_nm_main_no", docResult.get(ix).get(geocodeindex.road_nm_main_no.name()));
							mapResult.put("road_nm_sub_no", docResult.get(ix).get(geocodeindex.road_nm_sub_no.name()));
							mapResult.put("bd_main_nm", docResult.get(ix).get(geocodeindex.bd_main_nm.name()));
							mapResult.put("bd_sub_nm", docResult.get(ix).get(geocodeindex.bd_sub_nm.name()));
							mapResult.put("origin_xy", docResult.get(ix).get(geocodeindex.origin_xy.name()));
							mapResult.put("bd_matches", "" + bd_matches);
		
							String strBonbun = "null";
							String strBubun = "null";
		
							if (strTmppcl.split("-").length > 1) {
								strBonbun = docResult.get(ix).get(geocodeindex.pcl.name()).split("-")[0];
								strBubun = docResult.get(ix).get(geocodeindex.pcl.name()).split("-")[1];
							} else {
								strBonbun = docResult.get(ix).get(geocodeindex.pcl.name());
							}
		
							mapResult.put("jibun_main_no", strBonbun);
							mapResult.put("jibun_sub_no", strBubun);
							mapResult.put("x", docResult.get(ix).get(geocodeindex.x.name()));
							mapResult.put("y", docResult.get(ix).get(geocodeindex.y.name()));
							// 20170720 type 3일때 pnu, mgt 정보 리턴 @hkkim
		
							if (bReturnPNUnMGT) {
								mapResult.put("pnu", docResult.get(ix).get(geocodeindex.pnu.name()));
								mapResult.put("bd_mgt_sn", docResult.get(ix).get(geocodeindex.bd_mgt_sn.name()));
							}
		
							
							/*
							
							if (
									docResult.get(ix).get(geocodeindex.sido_nm.name()).indexOf(sido.substring(0, sido.length()-1))>-1  &&
									docResult.get(ix).get(geocodeindex.sgg_nm.name()).indexOf(sigungu.substring(0, sigungu.length()-1))>-1 &&
									road_nm_main_no_s.length() >0 && road_nm_main_no_s.equals(road_nm_main_no) && road_nm_sub_no_s.equals(road_nm_sub_no)) 
							{
								mapResultTmp.add(mapResult);
								continue;
							}
							*/
							// 시도/시군구이 같고 건물번호가 일치하면
							
							//System.out.println(t_sgg_nm.indexOf(sigungu.trim()));
							if (
									t_sido_nm.equals(sido) &&
									(t_sgg_nm.indexOf(sigungu.trim()) > -1 || sigungu.trim().indexOf(t_sgg_nm) > -1) &&
									road_nm_main_no_s.length() >0 && road_nm_main_no_s.equals(road_nm_main_no) && 
									road_nm_sub_no_s.equals(road_nm_sub_no))
							{
								mapResult.put("bd_matches", "4");
								mapResultTmp.add(mapResult);
								continue;
							} else if (
									t_sido_nm.equals(sido) &&
									(t_sgg_nm.indexOf(sigungu.trim()) > -1 || sigungu.trim().indexOf(t_sgg_nm) > -1) &&
									road_nm_main_no_s.length() >0 && road_nm_main_no_s.equals(road_nm_main_no) && 
									((docResult.size() == 1 && road_nm_sub_no_s.equals("") && road_nm_sub_no.equals("1"))))
							{
								mapResult.put("bd_matches", "4");
								mapResultTmp.add(mapResult);
								continue;
							} else if (
									t_sido_nm.equals(sido) &&
									(t_sgg_nm.indexOf(sigungu.trim()) > -1 || sigungu.trim().indexOf(t_sgg_nm) > -1) &&
									road_nm_main_no_s.length() >0 && road_nm_main_no_s.equals(road_nm_main_no) && 
									((docResult.size() <= 2 && road_nm_sub_no.equals("") && road_nm_sub_no_s.equals("1"))))
							{
								mapResult.put("bd_matches", "3");
								mapResultTmp.add(mapResult);
								continue;
							} else {
								int sgg_diff = 0;
								if ((sido.trim().equals("") || sido == null) || (sigungu.trim().equals("") || sigungu == null) ) {
									String t_sggnm = "";
									for (int ix2 = 0; ix2 < docResult.size(); ix2++) {
										if (!t_sggnm.equals(docResult.get(ix2).get(geocodeindex.sgg_nm.name()))) {
											t_sggnm = docResult.get(ix2).get(geocodeindex.sgg_nm.name());
											sgg_diff++;
										}
									}
								}
								if (sgg_diff == 1 && road_nm_main_no_s.length() > 0 && road_nm_main_no_s.equals(road_nm_main_no) && road_nm_sub_no_s.equals(road_nm_sub_no)) {
									mapResult.put("bd_matches", "4");
									mapResultTmp.add(mapResult);
								}
							}
							
							// 시도/시군구/읍면동/리가 같고 지번이 일치하면
							if (!ri_syn.equals("") && ri_syn.equals(ri_nm) && 
									t_sido_nm.equals(sido) &&
									t_sgg_nm.indexOf(sigungu.trim()) > -1 &&
									!leg_nm.equals("") && ((emdong_syn + " ").indexOf(leg_nm + " ") > -1 || (emdong_syn + " ").indexOf(adm_nm + " ") > -1) &&
									pcl.replaceAll(" ", "").equals(strTmppcl.replaceAll(" ", "")) && pcl.length() > 0) 
							{
								mapResult.put("bd_matches", "4");
								mapResultTmp.add(mapResult);
								continue;
							}
							if (ri_syn.equals("") && ri_nm.equals("") && 
									docResult.get(ix).get(geocodeindex.sido_nm.name()).equals(sido) &&
									sigungu.indexOf(t_sgg_nm + " ") > -1 &&
									!leg_nm.equals("") && ((emdong_syn + " ").indexOf(leg_nm + " ") > -1 && (emdong_syn + " ").indexOf(adm_nm + " ") > -1) &&
									pcl.replaceAll(" ", "").equals(strTmppcl.replaceAll(" ", "")) && pcl.length() > 0) 
							{
								mapResult.put("bd_matches", "3");
								mapResultTmp.add(mapResult);
								continue;
							}
							if (ri_syn.equals("") && ri_nm.equals("") && 
									docResult.get(ix).get(geocodeindex.sido_nm.name()).equals(sido) &&
									sigungu.indexOf(t_sgg_nm + " ") > -1 &&
									!leg_nm.equals("") && ((emdong_syn + " ").indexOf(leg_nm + " ") > -1 || (emdong_syn + " ").indexOf(adm_nm + " ") == -1) &&
									pcl.replaceAll(" ", "").equals(strTmppcl.replaceAll(" ", "")) && pcl.length() > 0) 
							{
								mapResult.put("bd_matches", "2");
								mapResultTmp.add(mapResult);
								continue;
							}
							if (ri_syn.equals("") && ri_nm.equals("") && 
									docResult.get(ix).get(geocodeindex.sido_nm.name()).equals(sido) &&
									sigungu.indexOf(t_sgg_nm + " ") > -1 &&
									!leg_nm.equals("") && ((emdong_syn + " ").indexOf(leg_nm + " ") == -1 || (emdong_syn + " ").indexOf(adm_nm + " ") > -1) &&
									pcl.replaceAll(" ", "").equals(strTmppcl.replaceAll(" ", "")) && pcl.length() > 0) 
							{
								mapResult.put("bd_matches", "1");
								mapResultTmp.add(mapResult);
								continue;
							}
							
							//지번만 존재하고 앞에서 매칭정보가 없을 경우 지번이 매칭되고 유일한 것만
							if (pcl.length() > 0 && pcl.replaceAll(" ", "").equals(strTmppcl.replaceAll(" ", "")) && pcl.length() > 0 && mapResultTmp.isEmpty() ) {
								if (!leg_nm.equals("") && !ri_nm.equals("") && (leg_nm.endsWith("면") || leg_nm.endsWith("읍")) && ri_syn.equals("") && docResult.size() > 1) {
									continue;
								} 
								if (docResult.size() == 1) {
									mapResultTmp.add(mapResult);
									continue;											
								}
							}
							String pcl_1 = pcl.replaceAll(" ", "");
							if (pcl.indexOf("-")>-1) pcl_1 = pcl.split("-")[0];
							String pcl_2 = strTmppcl.replaceAll(" ", "");
							if (strTmppcl.indexOf("-")>-1) pcl_2 = strTmppcl.split("-")[0];
						
							
						}
						
						if  (rty == 0 && mapResultTmp.size()==0 && docResult.size() > 0 && mapAddress.get("address2")!=null && !mapAddress.get("address2").toString().equals("")) {
							if (mapAddress.containsKey("spRoad") && !mapAddress.get("spRoad").equals("")) {
								mapAddress = new AddressDivision(mapAddress.get("address2").toString()).getResult();
								checkAddress(mapAddress);

								// 2017.05-19 리펙토리
								if (mapAddress.containsKey("spRoad") && !mapAddress.get("spRoad").equals("")) {
									// 도로명 주소 검색
									qInfo = new RoadQueryInfo(mapAddress);

									// 메인건물 필드 소트 형태로 인덱스가 생성 되면 정렬 조건을 추가 한다.
									Sort sort = new Sort(new SortField[] { SortField.FIELD_SCORE,
											new SortField("road_nm_main_no", SortField.Type.STRING), 
											new SortField("road_nm_sub_no", SortField.Type.STRING),
											new SortField("bd_main_nm", SortField.Type.STRING),
											new SortField("bul_dpn_se", SortField.Type.STRING) 
									}); 

									qInfo.setSort(sort);
								} else {
									// 지번 주소 검색
									qInfo = new JibunQueryInfo(mapAddress);
									roadAddr = false;
								}
							}

							if (mapAddress.get("sido_syn") != null)
								sido = (String) mapAddress.get("sido_syn");
							if (mapAddress.get("sgg_syn") != null)
								sigungu = (String) mapAddress.get("sgg_syn") + " ";
							if (mapAddress.get("emdong_syn") != null && !mapAddress.get("emdong_syn").equals(""))
								emdong_syn = " " + (String) mapAddress.get("emdong_syn") + " ";
							if (mapAddress.get("road_nm") != null)
								road_nm = (String) mapAddress.get("road_nm");
							if (mapAddress.get("road_nm_main_no") != null)
								road_nm_main_no_s = (String) mapAddress.get("road_nm_main_no");
							if (mapAddress.get("road_nm_sub_no") != null)
								road_nm_sub_no_s = (String) mapAddress.get("road_nm_sub_no");
							
							if (mapAddress.get("pcl") != null)
								pcl = (String) mapAddress.get("pcl");

							/*if (precision.equals("low")) {
								road_nm_sub_no_s = "";		
								String pcl_1 = pcl.replaceAll(" ", "");
								if (pcl.indexOf("-")>-1) pcl = pcl.split("-")[0];
								mapAddress.put("pcl", pcl);
								mapAddress.put("road_nm_sub_no", road_nm_sub_no_s);
							}*/
									
							if (mapAddress.get("ri_syn") != null)
								ri_syn = (String) mapAddress.get("ri_syn");
							if (mapAddress.get("bd_main_nm_syn") != null) {
								bd_main_nm_syn = (String) mapAddress.get("bd_main_nm_syn");
								bd_names = bd_main_nm_syn.split(" ");
							}
							if (mapAddress.get("spBuildMainNm") != null)
								spBuildMainNm = (String) mapAddress.get("spBuildMainNm");
							if (road_nm_sub_no_s == null)
								road_nm_sub_no_s = "";
							if (road_nm_sub_no_s.equals("0"))
								road_nm_sub_no_s = "";
							
							getCount = 600;
							continue;
						} 
						else if  (rty == 0 && mapResultTmp.size()==0 && docResult.size() > 9 && (
								(mapAddress.get("address2")!=null && mapAddress.get("address2").toString().equals(""))
								||
								mapAddress.get("address2")==null
								)) {
							getCount = 600;
							continue;
						} 

						
						//
						if (mapResultTmp.size()==0) {
							throw new NoResultException(); //mapAddress.toString()+">" + docResult.size();
						}
						
						if (mapResultTmp.size()==1) {
							result.put("totalcount", "1");
							result.put("pagenum", "1");
							result.put("returncount", "1");
							result.put("resultdata", mapResultTmp);
							return result;
						} else {
							int chkTop = 0;
							
							if (!sido.equals("") || !sigungu.equals("")) {
								//시도/시군명이 있는 경우 
								//건물명이 있을 경우 최대 매칭된 것을 찾는다.
								if  (bd_main_nm_syn.length() >= 1) {
									for (int ix = 0; ix < mapResultTmp.size(); ix++) {
										Map<String, String> mapResult =  (Map<String, String>)mapResultTmp.get(ix);
										if (maxMatch < Integer.parseInt(mapResult.get("bd_matches"))) {
											maxMatch = Integer.parseInt(mapResult.get("bd_matches"));
											chkTop = ix;
										}
									}
								}
								mapResultTmp2.add(mapResultTmp.get(chkTop));
								
								result.put("totalcount", "1");
								result.put("pagenum", "1");
								result.put("returncount", "1");
								result.put("resultdata", mapResultTmp2);
								return result;
							} else {
								//시도/시군구명이 없는 경우인데 리턴값이 여러개인 경우 미매칭으로 처리 : 엉뚱한 곳에 찍힐 수 있다.
								throw new NoResultException(); //mapAddress.toString()+">" + docResult.size();
							}
						}
					} else {
						//본부번이 없는 주소
						if (precision.equals("low")) {
							int maxMatch = 0;
							for (int ix = 0; ix < docResult.size(); ix++) {
								int bd_matches = 0;
								String leg_nm = docResult.get(ix).get(geocodeindex.leg_nm.name());
								String adm_nm = docResult.get(ix).get(geocodeindex.adm_nm.name());
								String road_nm_s = docResult.get(ix).get(geocodeindex.road_nm.name());
								String road_nm_main_no = docResult.get(ix).get(geocodeindex.road_nm_main_no.name());
								String road_nm_sub_no = docResult.get(ix).get(geocodeindex.road_nm_sub_no.name());
								String strTmppcl = docResult.get(ix).get(geocodeindex.pcl.name());
								String bd_main_nm = docResult.get(ix).get(geocodeindex.bd_main_nm.name());
								String bd_sub_nm = docResult.get(ix).get(geocodeindex.bd_sub_nm.name());
								String ri_nm = docResult.get(ix).get(geocodeindex.ri_nm.name());
								
								if (roadAddr && road_nm!=null && !road_nm.equals("") && (road_nm_s==null || !road_nm.equals(road_nm_s)))
									continue;
								
								
								if (!roadAddr && emdong_syn!=null && !emdong_syn.equals("") && 
									(leg_nm==null || emdong_syn.indexOf(" " + leg_nm + " ")==-1) &&
									(adm_nm==null || emdong_syn.indexOf(" " + adm_nm + " ")==-1)
								)
									continue;
								
								bd_matches = 0;
								if (!roadAddr && emdong_syn!=null && !emdong_syn.equals("") && 
										(leg_nm==null || emdong_syn.indexOf(" " + leg_nm + " ")>-1)
									) 
								{
									bd_matches = 2;
								} else if (!roadAddr && emdong_syn!=null && !emdong_syn.equals("") && 
										((leg_nm==null || leg_nm.equals("null") || leg_nm.equals("")) && emdong_syn.indexOf(" " + adm_nm + " ")>-1)
									) 
								{
									bd_matches = 2;
								}else {
									bd_matches = 1;
								}
								System.out.println(emdong_syn + ">" + leg_nm + ">" + adm_nm + ">" + docResult.get(ix).get(geocodeindex.origin_xy.name()));
								if (road_nm_main_no.equals("null"))
									road_nm_main_no = "";
								if (road_nm_sub_no.equals("null") || road_nm_sub_no.equals("0"))
									road_nm_sub_no = "";
								if (strTmppcl.equals("null"))
									strTmppcl = "";
								if (bd_main_nm.equals("null"))
									bd_main_nm = "";
								if (bd_sub_nm.equals("null"))
									bd_sub_nm = "";
								if (ri_nm.equals("null"))
									ri_nm = "";
								
								String t_sgg_nm = docResult.get(ix).get(geocodeindex.sgg_nm.name());
								String t_sido_nm = docResult.get(ix).get(geocodeindex.sido_nm.name());
								if (t_sgg_nm.equals("null")) 
									t_sgg_nm = "";
								if (t_sido_nm.equals("null")) 
									t_sido_nm = "";;
									
								
								String bd_main_nm_t = " " + bd_main_nm + " ";
								String bd_sub_nm_t = " " + bd_sub_nm + " ";
								if  (bd_main_nm_syn.length() > 0 && bd_main_nm_syn.length() <= 3) {
									for (int matchi = 0; matchi < bd_names.length; matchi++) {
										if (bd_main_nm_t.equalsIgnoreCase(" " + bd_names[matchi] + " ")) bd_matches++;
										if (bd_sub_nm_t.equalsIgnoreCase(" " + bd_names[matchi] + " ")) bd_matches++;
									}
								} 
								
								if  (bd_main_nm_syn.length() > 3) {
									for (int matchi = 0; matchi < bd_names.length; matchi++) {
										if (bd_main_nm_t.indexOf(" " + bd_names[matchi] + " ")>-1) bd_matches++;
										if (bd_sub_nm_t.indexOf(" " + bd_names[matchi] + " ")>-1) bd_matches++;
									}
								} 
								
								Map<String, String> mapResult = new LinkedHashMap<String, String>();
			
								mapResult.put("addr_type", docResult.get(ix).get(geocodeindex.addr_type.name()));
								mapResult.put("sido_nm", t_sido_nm);
								mapResult.put("sido_cd", docResult.get(ix).get(geocodeindex.sido_cd.name()));
								mapResult.put("sgg_nm", t_sgg_nm);
								mapResult.put("sgg_cd", docResult.get(ix).get(geocodeindex.sgg_cd.name()));
								mapResult.put("adm_nm", docResult.get(ix).get(geocodeindex.adm_nm.name()));
								mapResult.put("adm_cd", docResult.get(ix).get(geocodeindex.adm_cd.name()));
								mapResult.put("leg_nm", docResult.get(ix).get(geocodeindex.leg_nm.name()));
								mapResult.put("leg_cd", docResult.get(ix).get(geocodeindex.leg_cd.name()));
								mapResult.put("ri_nm", docResult.get(ix).get(geocodeindex.ri_nm.name()));
								mapResult.put("ri_cd", docResult.get(ix).get(geocodeindex.ri_cd.name()));
								mapResult.put("road_nm", docResult.get(ix).get(geocodeindex.road_nm.name()));
								mapResult.put("road_cd", docResult.get(ix).get(geocodeindex.road_cd.name()));
								mapResult.put("road_nm_main_no", docResult.get(ix).get(geocodeindex.road_nm_main_no.name()));
								mapResult.put("road_nm_sub_no", docResult.get(ix).get(geocodeindex.road_nm_sub_no.name()));
								mapResult.put("bd_main_nm", docResult.get(ix).get(geocodeindex.bd_main_nm.name()));
								mapResult.put("bd_sub_nm", docResult.get(ix).get(geocodeindex.bd_sub_nm.name()));
								mapResult.put("bd_matches", "" + bd_matches);
			
								String strBonbun = "null";
								String strBubun = "null";
			
								if (strTmppcl.split("-").length > 1) {
									strBonbun = docResult.get(ix).get(geocodeindex.pcl.name()).split("-")[0];
									strBubun = docResult.get(ix).get(geocodeindex.pcl.name()).split("-")[1];
								} else {
									strBonbun = docResult.get(ix).get(geocodeindex.pcl.name());
								}
			
								mapResult.put("jibun_main_no", strBonbun);
								mapResult.put("jibun_sub_no", strBubun);
								mapResult.put("x", docResult.get(ix).get(geocodeindex.x.name()));
								mapResult.put("y", docResult.get(ix).get(geocodeindex.y.name()));
								// 20170720 type 3일때 pnu, mgt 정보 리턴 @hkkim
			
								if (bReturnPNUnMGT) {
									mapResult.put("pnu", docResult.get(ix).get(geocodeindex.pnu.name()));
									mapResult.put("bd_mgt_sn", docResult.get(ix).get(geocodeindex.bd_mgt_sn.name()));
								}
			
								mapResultTmp.add(mapResult);
								/*result.put("totalcount", "1");
								result.put("pagenum", "1");
								result.put("returncount", "1");
								result.put("resultdata", mapResultTmp);
								return result;*/
								continue;
							}
							
							
							//
							if (mapResultTmp.size()==0) {
								throw new NoResultException(); //mapAddress.toString()+">" + docResult.size();
							}
							
							if (mapResultTmp.size()==1) {
								result.put("totalcount", "1");
								result.put("pagenum", "1");
								result.put("returncount", "1");
								result.put("resultdata", mapResultTmp);
								return result;
							} else {
								int chkTop = 0;
								
								if (!sido.equals("") && !sigungu.equals("") && !emdong_syn.equals("")) {
									//시도/시군명이 있는 경우 
									if  (bd_main_nm_syn.length() >= 1) {
										for (int ix = 0; ix < mapResultTmp.size(); ix++) {
											Map<String, String> mapResult =  (Map<String, String>)mapResultTmp.get(ix);
											if (maxMatch < Integer.parseInt(mapResult.get("bd_matches"))) {
												maxMatch = Integer.parseInt(mapResult.get("bd_matches"));
												chkTop = ix;
											}
										}
									} 
									
									Map<String, String> mapResult =  (Map<String, String>)mapResultTmp.get(chkTop);
									String t_sgg_nm = mapResult.get("sgg_nm");
									
									if ((!sido.equals("") && sido.equals(mapResult.get("sido_nm")))
											&&
										(!sigungu.equals("") && sigungu.indexOf(t_sgg_nm + " ") > -1)
									) {
										mapResultTmp2.add(mapResult);
										
										result.put("totalcount", "1");
										result.put("pagenum", "1");
										result.put("returncount", "1");
										result.put("resultdata", mapResultTmp2);
										return result;
									} 
								} else {
									//시도/시군구명이 없는 경우인데 리턴값이 여러개인 경우 미매칭으로 처리 : 엉뚱한 곳에 찍힐 수 있다.
									throw new NoResultException(); //mapAddress.toString()+">" + docResult.size();
								}
							}
						}
					}
				}
				
				if (mapResultTmp.size() == 0 && mapResultTmp2.size() == 0) {
					if (!roadAddr && addrchk == 0) {
						mapAddress.put(geocodeindex.road_nm.name(), (String) mapAddress.get(geocodeindex.emdong_syn.name()));
						continue;
					}
					throw new NoResultException(); //mapAddress.toString()+">" + docResult.size();
				} else {
				
					int startix = mapResultTmp2.size();
					int tc  = 0;
					for (int ix = startix; ix < mapResultTmp.size(); ix++) {
						if (ix>10) break;
						Map<String, String> mapResult =  (Map<String, String>)mapResultTmp.get(ix);
						mapResultTmp2.add(mapResult);
						tc = ix;
					}
		
					result.put("totalcount", "" + tc);
					result.put("pagenum", "" + mapParameter.get("pagenum"));
					result.put("returncount", "" + docResult.size());
					result.put("resultdata", mapResultTmp2);
				}
				break;
			}
		} catch (ApiException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.");
		} finally {
//			searcher.closeIndexReaderAll();
//			searcher = null;
		}

		return result;
	}

	private void checkAddress(Map mapAddress) throws AbsException {
		Map<String, String> tmp = mapAddress;
		String objSido = tmp.get("sido_syn");
		String objSgg = tmp.get("sgg_syn");
		String objEmdong = tmp.get("emdong_syn");

		if (objSido.equals("") && objSgg.equals("") && objEmdong.equals("")) {
			throw new ApiException("검색할 주소를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
		}
	}

	private String nullChk(String Str) {
		if (Str == null)
			return "";
		return Str;
	}

	@Override
	public String getApiId() {
		return "API_0702";
		// return "12345566";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.GET;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return "addr.geocode";
	}

	enum MustParam {
		address
	}

	enum OptionParam {
		accessToken, resultcount, pagenum, min, max, type, precision // 검색타입 지정 1: pnu 2: bd_mgt_sn other:주소검색
		, absmatch
	}

	protected void optimizeParameterMap(Map mapParameter) throws Exception {
		// 2016.12.28 절대매칭 옵션 추가.
		if (mapParameter.containsKey(OptionParam.absmatch.name())) {
			try {
				int intMType = Integer.valueOf((String) mapParameter.get(OptionParam.absmatch.name()));
				if (intMType != 0 && intMType != 1) {
					throw new ApiException("매칭 타입 값을 확인해주세요.", COMM_ERR_CODE.ERR_PARAM);
				}
			} catch (NumberFormatException e) {
				throw new ApiException("매칭 타입 값을 확인해주세요.", COMM_ERR_CODE.ERR_PARAM);
			}
		} else {
			mapParameter.put(OptionParam.absmatch.name(), "1");
		}
		// 2016.12.20 검색 타입 추가. pnu, bd_mgt_sn
		if (mapParameter.containsKey(OptionParam.type.name())) {
			try {
				Integer.valueOf((String) mapParameter.get(OptionParam.type.name()));
			} catch (NumberFormatException e) {
				throw new ApiException("검색 타입 값을 확인해주세요.", COMM_ERR_CODE.ERR_PARAM);
			}
		}
		// int resultcount = (int) mapParameter.get("resultcount");
		//
		if (mapParameter.get("address") == null) {
			throw new ApiException("검색할 주소를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
		}

		mapParameter.put("address", URLDecoder.decode((String) mapParameter.get("address"), "UTF-8"));

		// 페이지 번호 입력
		if (mapParameter.get("pagenum") == null) {
			mapParameter.put("pagenum", pagenum);
		} else if (Integer.parseInt((String) mapParameter.get("pagenum")) < 0) {
			throw new ApiException("페이지 번호를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
		}

		mapParameter.put("pagenum", URLDecoder.decode((String) mapParameter.get("pagenum"), "UTF-8"));

		// 최소 1에서 50까지 설정 가능 Default는 5
		if (mapParameter.get("resultcount") == null) {
			mapParameter.put("resultcount", this.resultcount);
		} else if (Integer.parseInt((String) mapParameter.get("resultcount")) < 1
				|| Integer.parseInt((String) mapParameter.get("resultcount")) > 50) {
			throw new ApiException("페이지 번호를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
		}
		mapParameter.put("resultcount", URLDecoder.decode((String) mapParameter.get("resultcount"), "UTF-8"));
	}

	@Override
	public String checkAuth(Map mapParameter) {
		// TODO Auto-generated method stub
		return null;
	}

}
