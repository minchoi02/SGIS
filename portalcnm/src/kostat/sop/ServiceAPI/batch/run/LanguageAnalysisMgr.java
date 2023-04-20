package kostat.sop.ServiceAPI.batch.run;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.google.gson.Gson;

import kostat.sop.ServiceAPI.common.util.StringUtil;

public class LanguageAnalysisMgr {
	
	private static final String _accessKey = "a983164f-9c88-4a3e-b679-5a786cc0d2a7";    // 발급받은 API Key 

	/**
	 * @comment	트렌드키워드 형태소분석(언어분석기술 API)
	 * @param 	pKwrd(키워드)
	 * @return
	 */
	public static List<HashMap<String, String>> analyzeLanguage(String pKwrd) {
	     System.out.println(">>> analyzeLanguage start");
	     //System.out.println(">>> pKwrd " + pKwrd);		
		
		 List<HashMap<String, String>> resultMapList = new ArrayList<HashMap<String, String>>();
		
		 String openApiURL = "http://aiopen.etri.re.kr:8000/WiseNLU";
	     String accessKey = _accessKey;
	     
	     String analysisCode = "ner"; // 언어 분석 코드 : 형태소 분석 결과, 어휘의미 분석 결과 (동음이의어 분석), 개체명 인식 결과
	     String analysisText = StringUtil.isNullToString(pKwrd); //분석할 텍스트 데이터
	     
	     Map<String, String> argument = new HashMap<>();    	 
    	 argument.put("analysis_code", analysisCode);
         argument.put("text", analysisText);

         Map<String, Object> request = new HashMap<>();
         request.put("access_key", accessKey);
         request.put("argument", argument);
	  
	  
         URL url;
         Integer responseCode = null;
         String responBody = null;
         Gson gson = new Gson();
         try {
             url = new URL(openApiURL);
             HttpURLConnection con = (HttpURLConnection)url.openConnection();
             con.setRequestMethod("POST");
             con.setDoOutput(true);
  
             DataOutputStream wr = new DataOutputStream(con.getOutputStream());
             wr.write(gson.toJson(request).getBytes("UTF-8"));
             wr.flush();
             wr.close();
  
             responseCode = con.getResponseCode();
             InputStream is = con.getInputStream();
             byte[] buffer = new byte[is.available()];
             int byteRead = is.read(buffer);
             responBody = new String(buffer);
             
             System.out.println("[responseCode] " + responseCode);
             System.out.println("[responBody]");
             System.out.println(responBody);

 			JSONParser parser = new JSONParser();
 			Object obj = parser.parse(responBody);
 			JSONObject jsonObj = (JSONObject) obj;
 			
 			JSONObject return_object = (JSONObject) jsonObj.get("return_object");
 			JSONArray sentence = (JSONArray) return_object.get("sentence");

 			for(int i=0 ; i<sentence.size() ; i++){
                 JSONObject tempObj = (JSONObject) sentence.get(i);
                 JSONArray wsd = (JSONArray) tempObj.get("WSD");
                 JSONArray ne = (JSONArray) tempObj.get("NE");
                 int wsdCnt = wsd.size();
                 
                 for(int j=0; j<wsdCnt; j++) {
                	 JSONObject wsdObj = (JSONObject) wsd.get(j);
//	                	 double wsdWeight = 0.0;
//	                	 String strWsdWeight = StringUtil.isNullToString(wsdObj.get("weight"));
//	                	 if(StringUtil.DecimalChk(strWsdWeight)) {
//	                		 wsdWeight = Double.parseDouble(strWsdWeight); 
//	                	 }
                	 String wsdText = StringUtil.isNullToString(wsdObj.get("text"));
                	 String wsdType = StringUtil.isNullToString(wsdObj.get("type"));
                	 
                	 //if("NNG".equalsIgnoreCase(wsdType) && (wsdWeight >= 0.7)) {
                	 // 1.일반명사이고 사람이름이 아니면  2.고유명사이고 사람이름이 아니면
                	 if(("NNG".equalsIgnoreCase(wsdType) && !isName(analysisText, wsdText, ne))
                			 || ("NNP".equalsIgnoreCase(wsdType) && !isName(analysisText, wsdText, ne))) {
						HashMap<String, String> resultMap = new HashMap<String, String>();
						resultMap.put("text", wsdText);
						resultMap.put("scode", String.valueOf(wsdObj.get("scode")));
						resultMap.put("weight", String.valueOf(wsdObj.get("weight")));
						resultMapList.add(resultMap);
                	 }
                 } 
             }

         } catch (MalformedURLException e) {
             e.printStackTrace();
         } catch (IOException e) {
             e.printStackTrace();
         } catch (ParseException e) {
 			e.printStackTrace();
         } catch (Exception e) {
 			e.printStackTrace(); 			
         } finally {
        	 
//        	 if(resultMapList.size() == 0) {
//				HashMap<String, String> resultMap = new HashMap<String, String>();
//				resultMap.put("text", analysisText);
//				resultMap.put("scode", "");
//				resultMap.put("weight", "");
//				resultMapList.add(resultMap);        		 
//        	 }
        	 
         }

	     System.out.println(">>> analyzeLanguage end !!!");
	     
	     return resultMapList;
	}

	public static boolean isName(String fullName, String name, JSONArray jArr) {
		boolean rst = false;
		
		if(jArr != null) {
			fullName = StringUtil.isNullToString(fullName);
			name = StringUtil.isNullToString(name);
			int loopCnt = jArr.size();
			
			for(int z = 0; z < loopCnt; z++) {
				JSONObject jObj = (JSONObject) jArr.get(z);
				String text = StringUtil.isNullToString(jObj.get("text"));
				
				if(name.equals(text) || fullName.equals(text)) {
					String type = StringUtil.isNullToString(jObj.get("type"));
					if("PS_NAME".equals(type)) {
						rst = true;
					}
					
					break;
				}
			} 			
		}		
		
		return rst;
	}

	/**
	 * @comment	트렌드키워드 유의어 수집(어휘관계분석기술 > 어휘정보 API)
	 * @param 	paramMapList
	 * @return
	 */
	public static List<HashMap<String, String>> collectSynonym(String pKwrd, String pScd) {

		System.out.println(">>> collectSynonym start");
		
		List<HashMap<String, String>> resultMapList = new ArrayList<HashMap<String, String>>();
		
		String openApiURL = "http://aiopen.etri.re.kr:8000/WiseWWN/Word";
		String accessKey = _accessKey;    // 발급받은 API Key
		String wordNng = StringUtil.isNullToString(pKwrd); // 정보를 조회할 어휘 데이터
		boolean isAddMyself = true;	// 유의어 테이블에 인기키워드와 동일한 일반명사 저장 여부 
		
		
		Map<String, String> argument = new HashMap<>();
		argument.put("word", wordNng);
		
		Map<String, Object> request = new HashMap<>();
		request.put("access_key", accessKey);
		request.put("argument", argument);
			
		URL url;
		Integer responseCode = null;
		String responBody = null;
		Gson gson = new Gson();
		try {
			double scode = -1.0;
			String strScode = StringUtil.isNullToString(pScd);
			if(StringUtil.DecimalChk(strScode)) {
				scode = Double.parseDouble(strScode); 
			}
			
			url = new URL(openApiURL);
			HttpURLConnection con = (HttpURLConnection)url.openConnection();
			con.setRequestMethod("POST");
			con.setDoOutput(true);
		
			DataOutputStream wr = new DataOutputStream(con.getOutputStream());
			wr.write(gson.toJson(request).getBytes("UTF-8"));
			wr.flush();
			wr.close();
		
			responseCode = con.getResponseCode();
			InputStream is = con.getInputStream();
			byte[] buffer = new byte[is.available()];
			int byteRead = is.read(buffer);
			responBody = new String(buffer);
		
			System.out.println("[responseCode] " + responseCode);
			System.out.println("[responBody]");
			System.out.println(responBody);
			
			JSONParser parser = new JSONParser();
			Object obj = parser.parse(responBody);
			JSONObject jsonObj = (JSONObject) obj;
			
			JSONObject return_object = (JSONObject) jsonObj.get("return_object");
			JSONArray wwn_wordInfo = (JSONArray) return_object.get("WWN WordInfo");
			
			for(int i=0; i<wwn_wordInfo.size() ; i++) {
				JSONObject tempObj = (JSONObject) wwn_wordInfo.get(i);
				double tempCode = -9.0;
				String strHomonymCode = StringUtil.isNullToString(tempObj.get("HomonymCode"));
				if(StringUtil.DecimalChk(strHomonymCode)) {
					tempCode = Double.parseDouble(strHomonymCode); 
				}						
				
				//System.out.println(tempCode + " == " + scode);
				
				if(tempCode == scode){
					//System.out.println("HomonymCode: " + strHomonymCode);

					JSONArray Synonym = (JSONArray) tempObj.get("Synonym");
					for(int j=0; j<Synonym.size(); j++) {

						String syn = StringUtil.isNullToString(Synonym.get(j));
						String[] arrSyn = syn.split("_");
						if(arrSyn.length > 0) {
							HashMap<String, String> resultMap = new HashMap<>();
							resultMap.put("syn", arrSyn[0]);
							if(arrSyn.length > 1) {
								resultMap.put("shldrNo", arrSyn[arrSyn.length - 1]);
							}									
							
							resultMapList.add(resultMap);
						}
					}
					
					break;
				}
			}
		
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (Exception e) {
 			e.printStackTrace(); 			
         }

		
		System.out.println(">>> collectSynonym end !!!");
		
		return resultMapList;
	}
	
//	public static void main ( String[] args ) {
//		
//		List<HashMap<String, String>> aaa = analyzeLanguage("바꿔바꿔바꿔");
//		
//		for(int i =0; i < aaa.size(); i++) {
//			
//			HashMap<String, String> ccc = aaa.get(i);
//			
//			List<HashMap<String, String>> bbb = collectSynonym(ccc.get("text"), ccc.get("scode"));
//			
//			System.out.println(">>> end !!!");
//			
//		}
//	}
}
