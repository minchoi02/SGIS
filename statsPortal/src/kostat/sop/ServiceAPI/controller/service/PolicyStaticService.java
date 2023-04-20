//========== 2017.08.11 [개발팀] 정책통계지도 PolicyStaticService추가  START ==========//
package kostat.sop.ServiceAPI.controller.service;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface PolicyStaticService {
	public List<Map> policyStaticCategoryList() throws SQLException;
	
	public List<Map> selectSocFacTypeCodeList() throws SQLException;
	
	public List<Map> selectSocFacClCodeList( HashMap<String, Object> param ) throws SQLException;
	
	public List<Map> selectSocDstncCtgryList() throws SQLException;
	
	public List<Map> selectSocSvcPpltnCnt( HashMap<String, Object> param ) throws SQLException;
	
	public List<Map> selectSocSvcFacCnt( HashMap<String, Object> param ) throws SQLException;
	
	public List<Map> selectSocWghvrList( HashMap<String, Object> param ) throws SQLException;
	
	public List<Map> selectSocDstncCtgryPpltnList( HashMap<String, Object> param ) throws SQLException;

	public List<Map> selectSocFacPoiList(HashMap<String, Object> param) throws SQLException;
	
}
//========== 2017.08.11 [개발팀] 정책통계지도 PolicyStaticService추가  END ==========//