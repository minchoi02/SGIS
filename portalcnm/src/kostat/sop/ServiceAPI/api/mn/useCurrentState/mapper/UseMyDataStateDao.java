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
public class UseMyDataStateDao extends SqlSessionDaoSupport {
	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}

	public Map getMyData2(Map paramMap){
		Map resultMap = new HashMap();

		List getMyData2 =getSqlSession().selectList("UseMyDataState.getMyData2",paramMap);
		resultMap.put("getMyData2", getMyData2);
	//	resultMap.put("bbb", "aaaaa");
		
		return resultMap;
	}
	

}
