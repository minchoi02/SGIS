package kostat.sop.ServiceAPI.api.common.mapper;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import kostat.sop.ServiceAPI.common.util.Prompt;
import kostat.sop.ServiceAPI.common.util.Success;

import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Component;

/**   
 *
 * @ClassName: CommonDao
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月15日 下午9:10:19    
 * @version V1.0      
 *     
 */
@Component
public class CommonDao extends SqlSessionDaoSupport {
	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}
	public Map getBCommonCode(Map paramMap) {
		Map resultMap=new HashMap();
		Set set = paramMap.entrySet();         
		Iterator i = set.iterator();         
		while(i.hasNext()){      
		     Map.Entry<String, String> entry=(Map.Entry<String, String>)i.next();
		     String key=entry.getKey();
		     String B_CLASS_CD=entry.getValue();
		     resultMap.put(key, getSqlSession().selectList("Common.getBCommonCode",B_CLASS_CD));
		}   
		return resultMap;
	}
	public Map getBCommonCode(String B_CLASS_CD) {
		Map resultMap=new HashMap();
	    resultMap.put("BCodeList", getSqlSession().selectList("Common.getBCommonCode",B_CLASS_CD));
		return resultMap;
	}
	public List getAPIBClassList(Map paramMap) {
		return getSqlSession().selectList("Common.getAPIBClassList",paramMap);
	}

	public List getAPIMClassList(Map paramMap) {
		return getSqlSession().selectList("Common.getAPIMClassList",paramMap);
	}
	
	public List getLogBCdList(Map paramMap) {
		return getSqlSession().selectList("Common.getLogBCdList",paramMap);
	}
	
	public List getLogSCdList(Map paramMap) {
		return getSqlSession().selectList("Common.getLogSCdList",paramMap);
	}
	public List getLogTCdList(Map paramMap) {
		return getSqlSession().selectList("Common.getLogTCdList",paramMap);
	}
	public Map getFileCount(Map paramMap){
		Map resultMap = new HashMap();
		int totalCount= (int) getSqlSession().selectOne("Common.getFileCNT",paramMap);
		resultMap.put("count", totalCount);
		return resultMap;
	}
	public List getFileList(Map paramMap){
		Map resultMap = new HashMap();
		//return getSqlSession().selectList("Common.getFileList",paramMap);
		return getSqlSession().selectList("Common.getFileList2",paramMap);
	}
	public Success addDynamicZipFile(Map paramMap) {
		Success success = new Success(false,Prompt.ADDFAIL);
		if((int) getSqlSession().insert("Common.addDynamicZipFile",paramMap) > 0){
			success.setSuccess(true);
			success.setMsg(Prompt.ADDSUCCESS);
		}
		return success;
	}
	
	/**
	 * 신규 파일 생성
	 * @param mapParameter
	 * @return
	 * @throws SQLException
	 */
	public List eduFile(Map mapParameter) throws SQLException {
		return getSqlSession().selectList("Common.edu_file", mapParameter);
	}

	public List cpFile(Map mapParameter) throws SQLException {
		return getSqlSession().selectList("Common.cp_file", mapParameter);
	}

	public List toFile(Map mapParameter) throws SQLException {
		return getSqlSession().selectList("Common.to_file", mapParameter);
	}

	public List gabuJumFile(Map mapParameter) throws SQLException {
		return getSqlSession().selectList("Common.gabu_jum_file", mapParameter);
	}

	public List gabuSedaFile(Map mapParameter) throws SQLException {
		return getSqlSession().selectList("Common.gabu_seda_file", mapParameter);
	}

	public List gunYyyyFile(Map mapParameter) throws SQLException {
		return getSqlSession().selectList("Common.gun_yyyy_file", mapParameter);
	}

	public List inguFile(Map mapParameter) throws SQLException {
		return getSqlSession().selectList("Common.ingu_file", mapParameter);
	}

	public List toFaFile(Map mapParameter) throws SQLException {
		return getSqlSession().selectList("Common.to_fa_file", mapParameter);
	}

	public List juYuFile(Map mapParameter) throws SQLException {
		return getSqlSession().selectList("Common.ju_yu_file", mapParameter);
	}

	public List sizeFile(Map mapParameter) throws SQLException {
		return getSqlSession().selectList("Common.size_file", mapParameter);
	}

	public List marryFile(Map mapParameter) throws SQLException {
		return getSqlSession().selectList("Common.marry_file", mapParameter);
	}

	public List sigungu(Map mapParameter) throws SQLException {
		return getSqlSession().selectList("Common.sigungu", mapParameter);
	}
	//2019년반영 시작
	public List sidosigungucode(Map mapParameter) throws SQLException {
		return getSqlSession().selectList("Common.sidosigungucode", mapParameter);
	}
	public List sidosigunguyear(Map mapParameter) throws SQLException {
		return getSqlSession().selectList("Common.sidosigunguyear", mapParameter);
	}
	public List detaildataid(Map mapParameter) throws SQLException {
		return getSqlSession().selectList("Common.detaildataid", mapParameter);
	}
	//2019년반영 끝

	//20220627 격자단위통계 파일 리스트
	public List getFileListArea(Map paramMap) {
		return getSqlSession().selectList("Common.getFileListArea",paramMap);
	}
	
}