package kostat.sop.ServiceAPI.api.workRoad.viewJobs;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.GZIPInputStream;

import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.w3c.dom.Node;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 일자리 맵 서비스 > 일자리 보기 > 직업훈련포털(HRD-Net) 직업훈련과정 조회 <p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : ywKim 1.0, 2018.10.18	초기 작성
 *     2019.01.08	ywKim	주석 : js버전으로 변경에 따라 본API는 용도 변경
 *     						용도 : HRDNet 기준 직종코드 조회
 *  </pre>
 *  
 * @author 최종 수정자 : ywKim
 * @version 1.0
 * @see
 * <p/>
 */
public class SelectHRDNetJobTrainingCourse extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(SelectHRDNetJobTrainingCourse.class);

	@Override
	public String getApiId() {
		return "112007";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Class<?> getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class<?> getOptionParameter() throws AbsException {
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}

	enum MustParam{
		rcrjss,			// 모집직종 코드 (공통코드 rcrjss 참고)
//		sido_cd,		// 훈련지역 대분류 / 직업훈련포털(HRD-Net) 시도 코드
	}

	enum OptionParam{
//		sgg_code,		// 훈련지역 중분류 / 직업훈련포털(HRD-Net) 시군구 코드
//		page_num,		// 시작페이지 / 기본값 1, 최대 1000
//		pageSize,		// 페이지당 출력건수 / 기본값 10, 최대 100
//		from_date,		// 훈련시작일 From
//		to_date,		// 훈련시작일 To
//		sort,			// 정렬방법 / ASC, DESC
//		sortCol,		// 정렬컬럼 / 모집인원: TOT_FXNUM, 훈련시작일:  TR_STT_DT, 훈련과정명: TR_NM_i
	}
	
	@Override
	public HashMap<String,Object> executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {

		httpSession = req.getSession();
		HashMap<String,Object> resultData = new HashMap<String,Object>();
		
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map<String,Object> mapParameter = getParameterMap(req);
			_checkNullParameterValue(mapParameter);
			
			String code = req.getParameter("rcrjss");
//			String sido = req.getParameter("sido_cd");
//			String sgg = req.getParameter("sgg_cd");			
//			String str_page_num = req.getParameter("page_num");
//			String str_pageSize = req.getParameter("pageSize");
//			String from_date = req.getParameter("from_date");
//			String to_date = req.getParameter("to_date");
//			String sort = req.getParameter("sort");
//			String sortCol = req.getParameter("sortCol");
			
			logger.info(">> Parameters =============================== ");
			logger.info("모집직종 코드(rcrjss) : " + code);
//			logger.info("직업훈련포털(HRD-Net) 시도 코드(sido_cd) : " + sido);
//			logger.info("직업훈련포털(HRD-Net) 시군구 코드(sgg_cd) : " + sgg);
//			logger.info("page_num : " + str_page_num);
//			logger.info("pageSize : " + str_pageSize);
//			logger.info("from_date : " + from_date);
//			logger.info("to_date : " + to_date);
//			logger.info("sort : " + sort);
//			logger.info("sortCol : " + sortCol);
			logger.info(">> ========================================== ");
			
			// NCS 직무 목록 코드 조회

			mapParameter.put("rcrjss", code);
			List<Map> codeList = session.selectList("wrViewJobs.selectJobpTrainingCodeList", mapParameter);
			Map<String, Object> codeMap = new HashMap<String, Object>();			
			for (int i = 0; i < codeList.size(); i++) {
				String cd = codeList.get(i).get("cd").toString();
				String nm = codeList.get(i).get("nm").toString();
				codeMap.put(cd, nm);
			}
			resultData.put("codeMap", codeMap);		// js버전으로 변경에 따른 조치 - 2019.01.08	ywKim	추가			
			
//			// 파라미터 정리
//			Integer pageNum = (str_page_num == null) ? 1 : Integer.parseInt(str_page_num);
//			Integer pageSize = (str_pageSize == null) ? 10 : Integer.parseInt(str_pageSize);
//			String fromDT = "20150101";
//			String toDT = "";			
//			DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
//			Date date = new Date();
////			fromDT = (from_date == null) ? dateFormat.format(date) : from_date;
//			date.setYear(date.getYear() + 10);
//			toDT = (to_date == null) ? dateFormat.format(date) : to_date;
//	
////			// v2 - 느려서 중간에 멈춤 /  메모리 overflow 발생하는 것 같다.
////			List<Map<String, Object>> totalDataList = new ArrayList<Map<String, Object>>();
////			Integer pNum = 1;
////			Integer pSize = 100;
////			while (true) {
////				Map<String, Object> pureData = callApi(sido, sgg, pNum, pSize, fromDT, toDT, sort, sortCol);
////				
////				List<Map<String, Object>> pureDataList = (List<Map<String, Object>>) pureData.get("srchList");
////				
////				if (pureDataList.size() == 0) break;
////				
////				// 필터 : 선택된 직무 코드만 추출
////				for (int i = 0; i < pureDataList.size(); i++) {
////					String ncsCd = pureDataList.get(i).get("ncsCd").toString();
////					ncsCd = ncsCd.substring(0, 2);
////					
////					if (codeMap.containsKey(ncsCd)) {
////						totalDataList.add(pureDataList.get(i));
////					}
////				}
////					
////				pNum++;
////				
////				if (pNum > 1000) break;
////			}
////			
////			// 조회하려는 페이지의 항목만 추출
////			int fromIdx = (pageNum - 1) * pageSize;	// 조회 페이지의 첫번째 항목의 인덱스 
////			int toIdx = pageNum * pageSize - 1; 	// 조회 페이지의 마지막 항목의 인덱스 (항목이 페이지수에 미달되는 것은 고려하지 않음)
////			List<Map<String, Object>> dataList = new ArrayList<Map<String, Object>>();
////			for (int j = fromIdx; j < totalDataList.size() && j <= toIdx; j++) {
////				dataList.add(totalDataList.get(j));
////			}
////			
////			int totalCount = totalDataList.size();
//			
//			// v1.
//			// NCS 직무  데이터 조회
//			Map<String, Object> pureData = 
//					callApi(sido
//							, sgg
//							, pageNum
//							, pageSize
//							, fromDT
//							, toDT
//							, sort
//							, sortCol);
//			
//			// 데이터 조회값 정리
//			pageNum = Integer.parseInt(pureData.get("pageNum").toString());
//			pageSize = req.getParameter("pageSize") == null ? 
//					5 : Integer.parseInt(pureData.get("pageSize").toString());
//			int totalCount = Integer.parseInt(pureData.get("scn_cnt").toString());			
//			List<Map<String, Object>> pureDataList = (List<Map<String, Object>>) pureData.get("srchList");
//			
//			// 필터 : 선택된 직무 코드만 추출
//			List<Map<String, Object>> dataList = new ArrayList<Map<String, Object>>();
//			for (int i = 0; i < pureDataList.size(); i++) {
//				String ncsCd = pureDataList.get(i).get("ncsCd").toString();
//				ncsCd = ncsCd.substring(0, 2);
//				
//				if (codeMap.containsKey(ncsCd)) {
//					dataList.add(pureDataList.get(i));
//				}
//			}
//
//			resultData.put("curPage", pageNum);
//			resultData.put("pageSize", pageSize);
//			resultData.put("total_count", totalCount);
//			resultData.put("dataList", dataList);
			
			logger.info("END Query - TXID[" + getApiId() + "] ");
			
		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		}
		
		return resultData;
	}
	
	@SuppressWarnings("deprecation")
	/*
	 * 직업훈련포탈(HRD-Net) 시군구 조회
	 * 
	 * @param pCode : 직업훈련포탈(HRD-Net) 시도 코드
	 */
	Map<String, Object> callApi(String pSido
			, String pSgg
			, Integer pPageNum
			, Integer pPageSize
			, String pFromDT
			, String pToDT
			, String pSort
			, String pSortCol) throws IOException{
		
		HttpURLConnection conn = null;
		BufferedReader in = null;		
		Map<String, Object> resultData = new HashMap<String, Object>();
		String authKey = "NBkgOltkVpP6gfHjz5zhNgY2iisuuFMt";
		
		if (pPageNum == null || pPageNum < 1) { pPageNum = 1; }
		else if (pPageNum > 1000) { pPageNum = 1000; }
		
		if (pPageSize == null || pPageSize < 10) { pPageSize = 10; }
		else if (pPageSize > 100) { pPageSize = 100; }
		
		if (pSort == null  || (!pSort.equals("ASC") && !pSort.equals("DESC"))) { 
			pSort = "ASC"; 
		} 
		if (pSortCol == null || 
				(!pSortCol.equals("TOT_FXNUM") && !pSortCol.equals("TR_STT_DT") && !pSortCol.equals("TR_NM_i"))) { 
			pSortCol = "TOT_FXNUM"; 
		}
		
		try {
			// 초기화
			String url = "http://www.hrd.go.kr/jsp/HRDP/HRDPO00/HRDPOA43/HRDPOA43_1.jsp";
			URL obj = new URL(url);
			conn = (HttpURLConnection) obj.openConnection();
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Accept-Encoding", "gzip");// 압축 컨텐츠 대응
			
			// 파라미터 설정
			Map<String, String> parameters = new HashMap<>();
			parameters.put("authKey", authKey);
			parameters.put("returnType", "XML");
			parameters.put("outType", "1");
			parameters.put("pageNum", pPageNum.toString());
			parameters.put("pageSize", pPageSize.toString());
			parameters.put("srchTraStDt", pFromDT);
			parameters.put("srchTraEndDt", pToDT);
			if (pSido != null && !pSido.equals("")) {
				parameters.put("srchTraArea1", pSido);
			}
			if (pSgg != null && !pSgg.equals("")) {
				parameters.put("srchTraArea2", pSgg);
			}
			parameters.put("sort", pSort);
			parameters.put("sortCol", pSortCol);
			
			conn.setDoOutput(true);
			DataOutputStream out = new DataOutputStream(conn.getOutputStream());
			out.writeBytes(wrParameterStringBuilder.getParamsString(parameters));
			out.flush();
			out.close();
			// End of 파라미터 설정			
			
			// 분석용 (삭제금지)
//		    // 요청 방식 구하기
//	        System.out.println("getRequestMethod():" + conn.getRequestMethod());
//	        // 응답 콘텐츠 유형 구하기
//	        System.out.println("getContentType():" + conn.getContentType());
//	        // 응답 코드 구하기
//	        System.out.println("getResponseCode():"    + conn.getResponseCode());
//	        // 응답 메시지 구하기
//	        System.out.println("getResponseMessage():" + conn.getResponseMessage());
//	        ;
//	        // 응답 헤더의 정보를 모두 출력
//	        for (Map.Entry<String, List<String>> header : conn.getHeaderFields().entrySet()) {
//	            for (String value : header.getValue()) {
//	                System.out.println(header.getKey() + " : " + value);
//	            }
//	        }
			
			// 리다이렉트 대응
			boolean redirect = false;
			// normally, 3xx is redirect
			int status = conn.getResponseCode();
			if (status != HttpURLConnection.HTTP_OK) {
				if (status == HttpURLConnection.HTTP_MOVED_TEMP
					|| status == HttpURLConnection.HTTP_MOVED_PERM
						|| status == HttpURLConnection.HTTP_SEE_OTHER)
				redirect = true;
			}			
			if (redirect) {
				// get redirect url from "location" header field
				String newUrl = conn.getHeaderField("Location");

				// get the cookie if need, for login
				String cookies = conn.getHeaderField("Set-Cookie");

				// open the new connnection again
				conn = (HttpURLConnection) new URL(newUrl).openConnection();
				conn.setRequestProperty("Cookie", cookies);
				conn.addRequestProperty("Accept-Language", "en-US,en;q=0.8");
				conn.addRequestProperty("User-Agent", "Mozilla");
				conn.addRequestProperty("Referer", "google.com");
										
				logger.info("Redirect to URL : " + newUrl);
			}
	        
	        // 응답 내용(BODY) 구하기        
	        try (
	        		InputStream is = conn.getInputStream();
	        ) {
	            
//				logger.info(">> KRD-Net 핵심직무 과정 ============================ ");

				Reader reader = null;
				if ("gzip".equals(conn.getContentEncoding())) {// 압축컨텐츠 대응
					reader = new InputStreamReader(new GZIPInputStream(is), "EUC-KR");
				}
				else {
				    reader = new InputStreamReader(is, "EUC-KR");
				}
				
				in = new BufferedReader(reader);
//				StringBuffer content = new StringBuffer();
				String line;
				
				while((line = in.readLine()) != null) {
					logger.info("HRD-Net 직업훈련 과정: " + line);
					Map<String, Object> map = parseXML(line);
					if (map != null) {
						resultData.putAll(map);
					}
					
//					content.append(line);
				}
				
//				logger.info("contents : " + content);
//				logger.info(">> ========================================== ");
			}
	        
		} catch(IOException e) { 
			//보안취약점 처리
			//e.printStackTrace();
			logger.error("ERROR-01:파일 열기 에러");
		} finally { 
			if(in != null) {
				try { 
					in.close(); 
				} catch(IOException e) { 
					//보안취약점 처리
					//e.printStackTrace();
					logger.error("ERROR-02:파일 닫기 에러");
				} 
			}
			
			conn.disconnect();
		}
		
		return resultData;		
	}
	
	/*
	 * 직업훈련포탈(HRD-Net) API 결과 (xml) 파싱
	 */
	Map<String, Object> parseXML(String xml) throws IOException{
		InputStream is = new ByteArrayInputStream(xml.getBytes());
		wrXmlParser parser = new wrXmlParser();
	    Document doc = parser.parseXML(is);
	    
	    if (doc == null) return null;
		
	    NodeList nl = doc.getElementsByTagName("HRDNet");	    
	    NodeList cnl = nl.item(0).getChildNodes();
	    Map<String, Object> resultMap = new HashMap<String, Object>();
	    
	    //보안취약점 처리로 인한 try catch 및 is.close() 추가
	    try{
		    // Summary 파싱
		    for (int i = 0; i < cnl.getLength(); i++) {
	    		Node node = cnl.item(i);
	    		
	    		if (node.getNodeName().equals("srchList") == false) {
	    			resultMap.put(node.getNodeName(), node.getFirstChild().getNodeValue());
	    		}
	    	}
		    
		    // Data List 파싱
		    nl = doc.getElementsByTagName("scn_list");	    
		    
		    List<Map<String, Object>> resultData = new ArrayList<Map<String, Object>>();
		    Map<String, Object> map = null;
		    
		    for (int i = 0; i < nl.getLength(); i++) {	    	
		    	cnl = nl.item(i).getChildNodes();
		    	map = new HashMap<String, Object>();	    	
		    
		    	for (int j = 0; j < cnl.getLength(); j++) {
		    		Node node = cnl.item(j);
	
		    		if (node.getFirstChild() != null && node.getFirstChild().getNodeValue() != null) {
		    			map.put(node.getNodeName(), node.getFirstChild().getNodeValue());
		    		} else {
		    			map.put(node.getNodeName(), "");
		    		}
		    	}
		    	
		    	resultData.add(map);
		    }
		    
		    resultMap.put("srchList", resultData);
	    }finally{
	    	if(is != null) {
				try { 
					is.close(); 
				} catch(IOException e) { 
					//보안취약점 처리
					//e.printStackTrace();
					logger.error("ERROR-02:파일 닫기 에러");
				} 
			}
	    }
	    
	    return resultMap;
	}
}
