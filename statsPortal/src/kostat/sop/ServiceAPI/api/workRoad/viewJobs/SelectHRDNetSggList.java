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
 * 1. 기능 : 일자리 맵 서비스 > 일자리 보기 > 직업훈련포털(HRD-Net) 시군구 목록 조회 <p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : ywKim 1.0, 2018.10.18	초기 작성
 *     2019.01.08	ywKim	주석 : js버전으로 변경에 따라 본API는 사용정지 (Bean도 사용정지)
 *  </pre>
 *  
 * @author 최종 수정자 : ywKim
 * @version 1.0
 * @see
 * <p/>
 */
public class SelectHRDNetSggList extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(SelectHRDNetSggList.class);

	@Override
	public String getApiId() {
		return "112006";
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
		sido_cd,			// 직업훈련포털(HRD-Net) 시도 코드		
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
			
			String code = req.getParameter("sido_cd");
			
			logger.info(">> Parameters =============================== ");
			logger.info("직업훈련포털(HRD-Net) 시도 코드 : " + code);
			logger.info(">> ========================================== ");

			List<Map<String, Object>> dataList = callApi(code);
			resultData.put("dataList", dataList);
			
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
	 * 직업훈련포탈(HRD-Net) 시군구 조회
	 * 
	 * @param pCode : 직업훈련포탈(HRD-Net) 시도 코드
	 */
	List<Map<String, Object>> callApi(String pCode) throws IOException{
		BufferedReader in = null;
		List<Map<String, Object>> resultData = new ArrayList<Map<String, Object>>();
		
		try { 
			URL obj = new URL("http://www.hrd.go.kr/jsp/HRDP/HRDPO00/HRDPOA90/HRDPOA90_1.jsp?authKey=NBkgOltkVpP6gfHjz5zhNgY2iisuuFMt&returnType=XML&outType=1&srchType=01&srchOption1=" + pCode); // 호출할 url 
			HttpURLConnection con = (HttpURLConnection)obj.openConnection();
			con.setRequestMethod("GET");
			in = new BufferedReader(new InputStreamReader(con.getInputStream(), "EUC-KR"));
			String line;
			
			while((line = in.readLine()) != null) { 
				// response를 차례대로 출력
				// 실제로 워크넷 API 결과 XML 은 1 Line이라 이 프로세스는 1회만 실행된다.
				List<Map<String, Object>> data = parseXML(line);
					
				if (data != null) {
					resultData.addAll(data);
				}
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
	 * 직업훈련포탈(HRD-Net) API 결과 (xml) 파싱
	 */
	List<Map<String, Object>> parseXML(String xml) throws IOException {
		InputStream is = new ByteArrayInputStream(xml.getBytes());
		wrXmlParser parser = new wrXmlParser();
	    Document doc = parser.parseXML(is);
	    
	    if (doc == null) return null;
	    
	    NodeList nl = doc.getElementsByTagName("scn_list");
	    
	    List<Map<String, Object>> resultData = new ArrayList<Map<String, Object>>();
	    Map<String, Object> map = null;
	    String code = "";
	    String name = "";
	    
	    //보안취약점 처리로 인한 try catch 및 is.close() 추가
	    try{
		    for (int i = 0; i < nl.getLength(); i++) {
		    	
		    	NodeList cnl = nl.item(i).getChildNodes();
		    	map = new HashMap<String, Object>();	    	
		    	code = name = "";
	
		    	for (int j = 0; j < cnl.getLength(); j++) {
		    		Node node = cnl.item(j);
		    		
		    		if (node.getNodeName().equals("rsltCode")) {
		    			code = node.getFirstChild().getNodeValue();
		    			map.put("cd", code);
		    		} else if (node.getNodeName().equals("rsltName")) {
		    			name = node.getFirstChild().getNodeValue();
		    			map.put("nm", name);
		    		}	
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
