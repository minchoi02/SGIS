package kostat.sop.ServiceAPI.api.mn.useCurrentState.mapper;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import kostat.sop.ServiceAPI.common.util.RequestUtil;
//import oracle.net.aso.o;

import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Component;

/**   
 *
 * @ClassName: UseCurrentStateDao
 * @Description： 
 *
 * @author Leekh   
 * @date：2016.04.05    
 * @version V1.0      
 *    
 */
@Component
public class UseCurrentStateDao extends SqlSessionDaoSupport {
	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}

	public Map totUseStat(Map paramMap){
		Map resultMap = new HashMap();

		List getTotStatView =getSqlSession().selectList("UseCurrentState.getTotStatView",paramMap);
		resultMap.put("getTotStatView", getTotStatView);
	//	resultMap.put("bbb", "aaaaa");
		
		return resultMap;
	}
	public Map getTotStatView_new(Map paramMap){
		Map resultMap = new HashMap();
		
		List getTotStatView =getSqlSession().selectList("UseCurrentState.getTotStatView_new",paramMap);
		resultMap.put("getTotStatView", getTotStatView);
		//	resultMap.put("bbb", "aaaaa");
		
		return resultMap;
	}
	
	public Map getTotPageViewGraph(Map paramMap){
		Map resultMap = new HashMap();
		
		List getTotPageViewGraph =getSqlSession().selectList("UseCurrentState.getTotPageViewGraph",paramMap);
		List getTotPageViewGraph2 = new ArrayList<>();
		
		
		for(int i=1; i<=12; i++){
			
			boolean dataYn = false;
			
			Map imsiMap2 = new HashMap();
			
			for(int j = 0; j< getTotPageViewGraph.size(); j++){
				Map imsiMap = (Map) getTotPageViewGraph.get(j);
				String imsiRegdateStr = imsiMap.get("REGDATE").toString();
				imsiRegdateStr = imsiRegdateStr.substring(imsiRegdateStr.length()-2, imsiRegdateStr.length());
				if(i<10){
					if(imsiRegdateStr.equals("0"+i)){
						dataYn = true;
					}
				}else{
					if(imsiRegdateStr.equals(""+i)){
						dataYn = true;
					}
				}
				if(dataYn){
					getTotPageViewGraph2.add(i-1, imsiMap);
					break;
				}
			}
			
			if(!dataYn){
				if(i<10){
					imsiMap2.put("REGDATE", paramMap.get("year").toString() + "0" + i);
				}else{
					imsiMap2.put("REGDATE", paramMap.get("year").toString() + i);
				}
				imsiMap2.put("PAGEVNT", "0");
				getTotPageViewGraph2.add(i-1,imsiMap2);
			}
		}
		
		
		
		/*for(int i = 0; i< getTotPageViewGraph.size(); i++){
			Map imsiMap = (Map) getTotPageViewGraph.get(i);
			System.out.println("get i pagevnt" + imsiMap.get("REGDATE"));
			String imsiRegdateStr = imsiMap.get("REGDATE").toString();
			boolean dataYn = false;
			for(int j=1; j<=12; j++){
				imsiRegdateStr = imsiRegdateStr.substring(imsiRegdateStr.length()-2, imsiRegdateStr.length());
				
				if(j<10){
					if(imsiRegdateStr.equals("0"+j)){
						dataYn = true;
						getTotPageViewGraph2.add(imsiMap);
					}
				}else{
					if(imsiRegdateStr.equals("" + j)){
						dataYn = true;
						getTotPageViewGraph2.add(imsiMap);
					}
				}
			}
			for(int j=1; j<=12; j++){
				if(dataYn){
					System.out.println("데이터 있는경우" + j + "월#############");
					getTotPageViewGraph2.add(imsiMap);
					break;
				}else{
					System.out.println("데이터 없는 경우" + j + "월@@@@@@@@@@@@");
					Map imsiMap2 = null;
					if(j<10){
						imsiMap2.put("regdate", paramMap.get("year").toString() + "0" + j);
					}else{
						imsiMap2.put("regdate", paramMap.get("year").toString() + j);
					}
					imsiMap2.put("pagevnt", "0");
					
					getTotPageViewGraph2.add(imsiMap2);
					break;
					
				}
			}
			
		}*/
		
		
		resultMap.put("getTotPageViewGraph", getTotPageViewGraph2);
		//	resultMap.put("bbb", "aaaaa");
		
		return resultMap;
	}
	public Map getTotStatPopupView(Map paramMap){
		Map resultMap = new HashMap();
		
		List getTotStatPopupView =getSqlSession().selectList("UseCurrentState.getTotStatPopupView",paramMap);
		resultMap.put("getTotStatPopupView", getTotStatPopupView);
		//	resultMap.put("bbb", "aaaaa");
		
		return resultMap;
	}
	public Map getServiceUseView(Map paramMap){
		Map resultMap = new HashMap();
		
		List getServiceUseView =getSqlSession().selectList("UseCurrentState.getServiceUseView",paramMap);
		
		//List getDirectCallStat =getSqlSession().selectList("UseCurrentState.getDirectCallStat",paramMap);
		
		
		resultMap.put("getServiceUseView", getServiceUseView);
		//resultMap.put("getDirectCallStat", getDirectCallStat);
		
		
		//	resultMap.put("bbb", "aaaaa");
		
		return resultMap;
	}
	
	public Map getServiceUseView2(Map paramMap){
		Map resultMap = new HashMap();
		
		List getServiceUseView =getSqlSession().selectList("UseCurrentState.getServiceUseView",paramMap);
		
		List getDirectCallStat2 =getSqlSession().selectList("UseCurrentState.getDirectCallStat2",paramMap);
		
		
		resultMap.put("getServiceUseView", getServiceUseView);
		resultMap.put("getDirectCallStat2", getDirectCallStat2);
		
		
		//	resultMap.put("bbb", "aaaaa");
		
		return resultMap;
	}
	public Map getPopSearchCondiView(Map paramMap){
		Map resultMap = new HashMap();
		
		List getPopSearchCondiView =getSqlSession().selectList("UseCurrentState.getPopSearchCondiView",paramMap);
		resultMap.put("getPopSearchCondiView", getPopSearchCondiView);
		//	resultMap.put("bbb", "aaaaa");
		
		return resultMap;
	}
	public Map getMenuView(Map paramMap){
		Map resultMap = new HashMap();
		
		List getMenuView =getSqlSession().selectList("UseCurrentState.getMenuView",paramMap);
		resultMap.put("getMenuView", getMenuView);
		
		//mng_s 20200323 이진호
		//일자리맵은 다른 모바일 메뉴와 달리 srv_log를 사용하여 따로 추가하였음.
		List getJobMobileMenuView =getSqlSession().selectList("UseCurrentState.getJobMobileMenuView",paramMap);
		resultMap.put("getJobMobileMenuView", getJobMobileMenuView);
		//mng_s 20200323 이진호

		if("K1".equals(paramMap.get("type2"))){
			
			List getCommuniteMobileMenuView =getSqlSession().selectList("UseCurrentState.getCommuniteMobileMenuView",paramMap);
			resultMap.put("getCommuniteMobileMenuView", getCommuniteMobileMenuView);
		}
		
		
		//	resultMap.put("bbb", "aaaaa");
		
		return resultMap;
	}
	public Map getThemaCondi(Map paramMap){
		Map resultMap = new HashMap();
		
		List getThemaCondi =getSqlSession().selectList("UseCurrentState.getThemaCondi",paramMap);
		resultMap.put("getThemaCondi", getThemaCondi);
		//	resultMap.put("bbb", "aaaaa");
		
		return resultMap;
	}

	public Map getPopCondi(Map paramMap){
		Map resultMap = new HashMap();
		
		List getPopCondi =getSqlSession().selectList("UseCurrentState.getPopCondi",paramMap);
		resultMap.put("getPopCondi", getPopCondi);
		//	resultMap.put("bbb", "aaaaa");
		
		return resultMap;
	}
	
	
	public Map getPopCondiMix(Map paramMap){
		Map resultMap = new HashMap();
		
		List getPopCondiMix =getSqlSession().selectList("UseCurrentState.getPopCondiMix",paramMap);
		resultMap.put("getPopCondiMix", getPopCondiMix);
		//	resultMap.put("bbb", "aaaaa");
		
		return resultMap;
	}
	
	
	public Map getInterestArea(Map paramMap){
		Map resultMap = new HashMap();
		
		List getInterestArea =getSqlSession().selectList("UseCurrentState.getInterestArea",paramMap);
		resultMap.put("getInterestArea", getInterestArea);
		//	resultMap.put("bbb", "aaaaa");
		
		return resultMap;
	}
	
	
	public Map getPopSearchTheme(Map paramMap){
		Map resultMap = new HashMap();
		
		List getPopSearchTheme =getSqlSession().selectList("UseCurrentState.getPopSearchTheme",paramMap);
		resultMap.put("getPopSearchTheme", getPopSearchTheme);
		//	resultMap.put("bbb", "aaaaa");
		
		return resultMap;
	}
	
	public Map getNewStatCommUseStat(Map paramMap){
		Map resultMap = new HashMap();
		
		List getNewStatCommUseStat =getSqlSession().selectList("UseCurrentState.getNewStatCommUseStat",paramMap);
		resultMap.put("getNewStatCommUseStat", getNewStatCommUseStat);
		//	resultMap.put("bbb", "aaaaa");
		
		return resultMap;
	}
	
	
	public Map getIntHighFunUseStat(Map paramMap){
		Map resultMap = new HashMap();
		
		List getIntHighFunUseStat =getSqlSession().selectList("UseCurrentState.getIntHighFunUseStat",paramMap);
		resultMap.put("getIntHighFunUseStat", getIntHighFunUseStat);
		//	resultMap.put("bbb", "aaaaa");
		
		return resultMap;
	}
	
	public Map getBizStatintPoi(Map paramMap){
		Map resultMap = new HashMap();
		
		List getBizStatintPoi =getSqlSession().selectList("UseCurrentState.getBizStatintPoi",paramMap);
		resultMap.put("getBizStatintPoi", getBizStatintPoi);
		//	resultMap.put("bbb", "aaaaa");
		
		return resultMap;
	}
	
	public Map getBizStatIntSear(Map paramMap){
		Map resultMap = new HashMap();
		
		List getBizStatIntSear =getSqlSession().selectList("UseCurrentState.getBizStatIntSear",paramMap);
		resultMap.put("getBizStatIntSear", getBizStatIntSear);
		//	resultMap.put("bbb", "aaaaa");
		
		return resultMap;
	}
	
	
	public Map getIntCommMap(Map paramMap){
		Map resultMap = new HashMap();
		
		List getIntCommMap =getSqlSession().selectList("UseCurrentState.getIntCommMap",paramMap);
		resultMap.put("getIntCommMap", getIntCommMap);
		//	resultMap.put("bbb", "aaaaa");
		
		return resultMap;
	}
	
	
	public Map getStatCommMobilUse(Map paramMap){
		Map resultMap = new HashMap();
		
		List getStatCommMobilUse =getSqlSession().selectList("UseCurrentState.getStatCommMobilUse",paramMap);
		resultMap.put("getStatCommMobilUse", getStatCommMobilUse);
		//	resultMap.put("bbb", "aaaaa");
		
		return resultMap;
	}
	
	
	public Map gethousePoiSear(Map paramMap){
		Map resultMap = new HashMap();
		
		List gethousePoiSear =getSqlSession().selectList("UseCurrentState.gethousePoiSear",paramMap);
		resultMap.put("gethousePoiSear", gethousePoiSear);
		//	resultMap.put("bbb", "aaaaa");
		
		return resultMap;
	}
	
	
	public Map getTotStatPopupView2(Map paramMap){
		Map resultMap = new HashMap();
		
		List getTotStatPopupView2 =getSqlSession().selectList("UseCurrentState.getTotStatPopupView2",paramMap);
		resultMap.put("getTotStatPopupView2", getTotStatPopupView2);
		//	resultMap.put("bbb", "aaaaa");
		
		return resultMap;
	}
	
	public Map getGalleryUseStat(Map paramMap){
		Map resultMap = new HashMap();
		
		List getGalleryUseStat =getSqlSession().selectList("UseCurrentState.getGalleryUseStat",paramMap);
		resultMap.put("getGalleryUseStat", getGalleryUseStat);
		//	resultMap.put("bbb", "aaaaa");
		
		return resultMap;
	}
	
	
	public Map getPolicyStaticMapMenu(Map paramMap){
		Map resultMap = new HashMap();
		
		
		List getPolicyStaticMapMenu =getSqlSession().selectList("UseCurrentState.getPolicyStaticMapMenu",paramMap);
		

		resultMap.put("getPolicyStaticMapMenu", getPolicyStaticMapMenu);
		
		return resultMap;
	}
	
	public Map getPopPol(Map paramMap){
		Map resultMap = new HashMap();
		
		List getPopPol =getSqlSession().selectList("UseCurrentState.getPopPol",paramMap);
		resultMap.put("getPopPol", getPopPol);
		
		return resultMap;
	}
	
	public Map getDirectCall(Map paramMap){
		Map resultMap = new HashMap();
		
		List getDirectCall =getSqlSession().selectList("UseCurrentState.getDirectCall",paramMap);
		resultMap.put("getDirectCall", getDirectCall);
		
		return resultMap;
	}
	
	//mng_s 201710109 lifestyle 추가 leekh
	public Map getLifeStyle(Map paramMap){
		Map resultMap = new HashMap();
		
		List getLifeStyle =getSqlSession().selectList("UseCurrentState.getLifeStyle",paramMap);
		resultMap.put("getLifeStyle", getLifeStyle);
		
		return resultMap;
	}
	//mng_e 201710109 lifestyle 추가 leekh
	
	

}
