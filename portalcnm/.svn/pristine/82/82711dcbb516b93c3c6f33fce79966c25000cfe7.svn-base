package kostat.sop.ServiceAPI.api.mn.relstat.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Component;

/**   
 *
 * @ClassName: RELSearchDao
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月19日 下午2:46:33    
 * @version V1.0      
 *    
 */
@Component
public class RELStatDao extends SqlSessionDaoSupport {
	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}
	public Map getRELWordStat(Map paramMap){
		Map resultMap = new HashMap();
		resultMap.put("total", (int)getSqlSession().selectOne("RELStat.getStatCountWord",paramMap));
		List resultList=getSqlSession().selectList("RELStat.getStatWord",paramMap);
		int totalCount= (int) getSqlSession().selectOne("RELStat.getSumWordCNT",paramMap);
		for(int i=0;i<resultList.size();i++){
			Map result = (Map) resultList.get(i);
			float CNT=Float.parseFloat(result.get("CNT").toString());
			if(CNT ==0)
				break;
			float percent=(CNT/totalCount)*100;
			result.put("PERCENT", String.format("%.2f", percent)+"%");
		}
		resultMap.put("rows", resultList);
		return resultMap;
	}
	public Map getRELAreaStat(Map paramMap){
		Map resultMap = new HashMap();
		resultMap.put("total", (int) getSqlSession().selectOne("RELStat.getStatCountArea",paramMap) );
		List resultList=getSqlSession().selectList("RELStat.getStatArea",paramMap);
		int totalCount= (int) getSqlSession().selectOne("RELStat.getSumAreaCNT",paramMap);
		for(int i=0;i<resultList.size();i++){
			Map result = (Map) resultList.get(i);
			float CNT=Float.parseFloat(result.get("CNT").toString());
			if(CNT ==0)
				break;
			float percent=(CNT/totalCount)*100;
			result.put("PERCENT", String.format("%.2f", percent)+"%");
		}
		resultMap.put("rows", resultList);
		return resultMap;
	}
}
