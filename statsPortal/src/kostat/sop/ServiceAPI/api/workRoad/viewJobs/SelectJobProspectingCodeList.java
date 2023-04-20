package kostat.sop.ServiceAPI.api.workRoad.viewJobs;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
 * 1. 기능 : 일자리 맵 서비스 > 일자리 보기 > 워크넷 직업전망 목록 조회 <p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : ywKim 1.0, 2018.10.17	초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : ywKim
 * @version 1.0
 * @see
 * <p/>
 */
public class SelectJobProspectingCodeList extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(SelectJobProspectingCodeList.class);

	@Override
	public String getApiId() {
		return "112003";
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
	}

	enum OptionParam{
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
			
			logger.info(">> Parameters =============================== ");
			logger.info("모집직종 코드 : " + code);
			logger.info(">> ========================================== ");

			mapParameter.put("rcrjss", code);
			
			// 워크넷 직업전망 목록 코드 조회
			List<Map> codeList = session.selectList("wrViewJobs.selectJobpProspectingCodeList", mapParameter);			
			resultData.put("codeList", codeList);	// 2019.01.04	ywKIm	추가
	
			// 주석: 청사내부망에서 openApi사용금지 - 2019.01.04	ywKIm	변경	
//			List dataList = new ArrayList<Object>();			
//			for (int i = 0; i < codeList.size(); i++) {
//				String cd = codeList.get(i).get("cd").toString();
//				List data = callApi(cd);
//				dataList.addAll(data);
//			}
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
	
	/*
	 * 워크넷 직업전망 목록 조회
	 */
	List callApi(String pCode) throws IOException {
		BufferedReader in = null;
		List resultData = new ArrayList<Object>();
		
		try { 
			URL obj = new URL("http://openapi.work.go.kr/opi/opi/opia/korJobProspectApi.do?authKey=WNJCQWWNSBJ0Y7F16CGHU2VR1HK&returnType=XML&target=fJobCD&srchType=O&occupation=" + pCode); // 호출할 url 
			HttpURLConnection con = (HttpURLConnection)obj.openConnection();
			con.setRequestMethod("GET");
			
			in = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-8"));
			String line;
			
			while((line = in.readLine()) != null) { 
				// response를 차례대로 출력
				// 실제로 워크넷 API 결과 XML 은 1 Line이라 이 프로세스는 1회만 실행된다.
				
				logger.info("워크넷 직업전망 목록: " + line);
				List data = parseXML(line);
				resultData.addAll(data);
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
		}
		
		return resultData;		
	}
	
	/*
	 * 워크넷 API 결과 (xml) 파싱
	 * 
	 * @params	xml : 워크넷 API 결과 예(xml)
	 * 			<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
	 * 			<fJobsList>
	 * 				<total>18</total>
	 * 				<fJobList>
	 * 					<fJobClCd>KR01</fJobClCd>
	 * 					<fJobCd>KR010001</fJobCd>
	 * 					<fJobNm>기업고위임원(CEO)</fJobNm>
	 * 				</fJobList>
	 * 				<fJobList>
	 * 					<fJobClCd>KR01</fJobClCd>
	 * 					<fJobCd>KR010002</fJobCd>
	 * 					<fJobNm>노무사</fJobNm>
	 * 				</fJobList>
	 * 			</fJobsList>
	 */
	List parseXML(String xml) throws IOException {
		InputStream is = new ByteArrayInputStream(xml.getBytes());
		wrXmlParser parser = new wrXmlParser();
	    Document doc = parser.parseXML(is);
	    NodeList nl = doc.getElementsByTagName("fJobList");
	    
	    List resultData = new ArrayList<Object>();
	    Map<String, Object> map = null;
	    
	  //보안취약점 처리로 인한 try catch 및 is.close() 추가
	    try{
		    for (int i = 0; i < nl.getLength(); i++) {
		    	
		    	NodeList cnl = nl.item(i).getChildNodes();
		    	map = new HashMap<String, Object>();
	
		    	for (int j = 0; j < cnl.getLength(); j++) {
		    		Node node = cnl.item(j);
		    		map.put(node.getNodeName(), node.getFirstChild().getNodeValue());
		    	}
		    	
		    	resultData.add(map);
		    }
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
	    
	    return resultData;
	}
}
