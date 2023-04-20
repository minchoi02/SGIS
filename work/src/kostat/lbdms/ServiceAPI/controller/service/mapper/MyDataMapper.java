/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package kostat.lbdms.ServiceAPI.controller.service.mapper;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;
import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

@Repository("myDataMapper")
public class MyDataMapper extends EgovAbstractMapper {

	@Resource(name = "sqlSessionSystem")
	public void setSqlSessionFactory(SqlSessionFactory sqlSession) {
		super.setSqlSessionFactory(sqlSession);
	}

	/**
	 * 나의데이터 정보를 가져온다.
	 * 
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getMyDataList(Map mapParameter) throws SQLException {
		return selectList("myData.getMyDataList", mapParameter);
	}

	/**
	 * 메인화면 대시보드 정보를 가져온다.
	 * 
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getDashBoardList(Map mapParameter) throws SQLException {
		return selectList("myData.getDashBoardList", mapParameter);
	}

	/**
	 * 메인화면 대시보드 설정을 최초 생성한다.
	 * 
	 * @param mapParameter
	 * @exception Exception
	 */
	public int insertDashBoardOpt(Map mapParameter) throws SQLException {
		return update("myData.insertDashBoardOpt", mapParameter);
	}

	/**
	 * 메시지큐에 저장한다.
	 * 
	 * @param mapParameter
	 * @exception Exception
	 */
	public int insertMsgQue(Map mapParameter) throws SQLException {
		return insert("myData.insertMsgQue", mapParameter);
	}
	
	
	/**
	 * 메인화면 대시보드 설정을 업데이트한다.
	 * 
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateDashBoardOpt(Map mapParameter) throws SQLException {
		return update("myData.updateDashBoardOpt", mapParameter);
	}

	/**
	 * 메인화면 대시보드 설정 정보를 가져온다.
	 * 
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getDashBoardOptList(Map mapParameter) throws SQLException {
		return selectList("myData.getDashBoardOptList", mapParameter);
	}

	/**
	 * 나의데이터 정보를 생성.
	 * 
	 * @param mapParameter
	 * @exception Exception
	 */
	public void insertMyData(Map mapParameter) throws SQLException {
		insert("myData.insertMyData", mapParameter);
	}

	/**
	 * 나의데이터 정보를 복사.
	 * 
	 * @param mapParameter
	 * @exception Exception
	 */
	public void copyMyData(Map mapParameter) throws SQLException {
		insert("myData.copyMyData", mapParameter);
	}

	/**
	 * 나의데이터 정보를 업데이트.
	 * 
	 * @param mapParameter
	 * @exception Exception
	 */
	public void updateMyData(Map mapParameter) throws SQLException {

	}

	public Map getMyDataInfo(String data_id) throws SQLException {
		return selectOne("myData.getMyDataInfo", data_id);
	}

	public Map searchMyDataInfo(Map paramMap) throws SQLException {
		return selectOne("myData.searchMyDataInfo", paramMap);
	}

	/**
	 * selectResourceId2 나의데이터 정보를 업데이트후 resource_id를 통해 테이블 정보를 가져온다
	 * 
	 * @param mapParameter
	 * @exception Exception
	 */
	public int selectResourceId2(HashMap<String, Object> parameterMap) throws SQLException {
		return selectOne("myData.selectResourceId2", parameterMap);
	}

	/**
	 * selectResourceKorColumnInfo 한글컬럼 정보만을 가져와서 업데이트 한다.
	 * 
	 * @param mapParameter
	 * @exception Exception
	 */
	public String selectResourceKorColumnInfo(String resourceId) throws SQLException {
		return selectOne("myData.selectResourceKorColumnInfo", resourceId);
	}

	public void updateKorColumnGridData(Map paramMap) throws SQLException {
		update("myData.updateKorColumnGridData", paramMap);
	}

	public void updateKorSubject(Map paramMap) throws SQLException {
		update("myData.updateKorSubject", paramMap);
	}

	/**
	 * 나의데이터 제목 중복 여부.
	 * 
	 * @param mapParameter
	 * @exception Exception
	 */
	public int existsSubjectData(Map paramMap) throws SQLException {
		return selectOne("myData.existsSubjectData", paramMap);
	}

	public void updateDataCnt(Map paramMap) throws SQLException {
		update("myData.updateDataCnt", paramMap);
	}

	/**
	 * 나의 데이터 제거
	 * 
	 * @param mapParameter
	 * @exception Exception
	 */

	public void deleteMyData(Map paramMap) throws SQLException {
		delete("myData.deleteMyData", paramMap);
	}

	/**
	 * 즐겨찾기
	 * 
	 * @param String
	 *            yn , String data_id
	 * @return Map
	 * @exception SQLException
	 */
	public void favorite(Map<String, String> paramMap) throws SQLException {
		update("myData.updateFavorite", paramMap);
	}
	
	/**
	 * 즐겨찾기
	 * 
	 * @param String
	 *            yn , String data_id
	 * @return void
	 * @exception SQLException
	 */
	public void share(Map<String, String> paramMap) throws SQLException {
		update("myData.updateShare", paramMap);
	}
	
	/**
	 * execute, analysis_param 삭제
	 * 
	 * @param Map
	 * @return void
	 * @exception SQLException
	 */
	public void deleteExecute(Map<String, Object> paramMap)throws SQLException {
	    delete("myData.deleteExecute",paramMap);
	    delete("myData.deleteMyDataAnalysisParam",paramMap); // analysis_param 삭제
	}

}
