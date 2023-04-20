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
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;

/**
 * @Class Name : PrjMngMapper.java
 * @Description : PrjMngMapper Class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2019.7.17           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2019.7.17
 * @version 1.0
 * @see
 *
 */


@Repository("prjMngMapper")
public class PrjMngMapper extends EgovAbstractMapper {
	
	@Resource(name = "sqlSessionSystem")
	public void setSqlSessionFactory(SqlSessionFactory sqlSession) {
		super.setSqlSessionFactory(sqlSession);
	}
	
	/**
	 * 단위업무 목록을 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getWorkSetList(Map mapParameter) throws SQLException {
		return selectList("prjmng.getWorkSetList", mapParameter);
	}
	
	/**
	 * 데이터 목록을 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getDataList(Map mapParameter) throws SQLException {
		return selectList("prjmng.getDataList", mapParameter);
	}

	/**
	 * 단위업무 정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map workSetDetail(Map mapParameter) throws SQLException {
		return selectOne("prjmng.workSetDetail", mapParameter);
	}

	/**
	 * 프로젝트 실행 단위업무 정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map prjUnitModify(Map mapParameter) throws SQLException {
		return selectOne("prjmng.prjUnitModify", mapParameter);
	}
	
	/**
	 * 단위업무를 등록한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int workSetNew(Map mapParameter) throws SQLException {
		return insert("prjmng.workSetNew", mapParameter);
	}

	/**
	 * 단위업무를 수정한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateWorkSet(Map mapParameter) throws SQLException {
		return update("prjmng.updateWorkSet", mapParameter);
	}

	/**
	 * 단위업무를 삭제한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int deleteWorkSet(Map mapParameter) throws SQLException {
		return delete("prjmng.deleteWorkSet", mapParameter);
	}
	
	/**
	 * 프로젝트 목록을 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getPrjSetList(Map mapParameter) throws SQLException {
		return selectList("prjmng.getPrjSetList", mapParameter);
	}
	
	/**
	 * 프로젝트 정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map prjSetDetail(Map mapParameter) throws SQLException {
		return selectOne("prjmng.prjSetDetail", mapParameter);
	}
	/**
	 * 프로젝트 목록을 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List prjUnitSet(Map mapParameter) throws SQLException {
		return selectList("prjmng.prjUnitSet", mapParameter);
	}
	
	/**
	 * 프로젝트 아이디를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public String prjGetId() throws SQLException {
		return selectOne("prjmng.prjGetId");
	}

	/**
	 * 프로젝트 실행 아이디를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public String prjExecGetId() throws SQLException {
		return selectOne("prjmng.prjExecGetId");
	}
	
	/**
	 * 프로젝트를 등록한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int prjSetNew(Map mapParameter) throws SQLException {
		return insert("prjmng.prjSetNew", mapParameter);
	}
	
	/**
	 * 프로젝트실행을 등록한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int prjExecReg(Map mapParameter) throws SQLException {
		return insert("prjmng.prjExecReg", mapParameter);
	}

	/**
	 * 프로젝트실행 단위업무를 등록한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int prjUnitExecReg(Map mapParameter) throws SQLException {
		return insert("prjmng.prjUnitExecReg", mapParameter);
	}

	/**
	 * 프로젝트실행 상태를 수정한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updatePrjExec(Map mapParameter) throws SQLException {
		return update("prjmng.updatePrjExec", mapParameter);
	}
	
	/**
	 * 프로젝트실행 삭제한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int delPrjExec(Map mapParameter) throws SQLException {
		return delete("prjmng.delPrjExec", mapParameter);
	}
	
	/**
	 * 프로젝트실행 단위업무 삭제한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int delPrjUnitExec(Map mapParameter) throws SQLException {
		return delete("prjmng.delPrjUnitExec", mapParameter);
	}
	
	/**
	 * 프로젝트 단위업무를 등록한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int prjSetUnitNew(Map mapParameter) throws SQLException {
		return insert("prjmng.prjSetUnitNew", mapParameter);
	}
	
	/**
	 * 프로젝트를 수정한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updatePrjSet(Map mapParameter) throws SQLException {
		//update("prjmng.updatePrjUnitSet", mapParameter);
		return update("prjmng.updatePrjSet", mapParameter);
	}

	/**
	 * 프로젝트 단위업무를 수정한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updatePrjUnitSet(Map mapParameter) throws SQLException {
		return update("prjmng.updatePrjUnitSet", mapParameter);
	}


	/**
	 * 프로젝트 단위업무를 삭제한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int deleteUnitPrjSet(Map mapParameter) throws SQLException {
		return delete("prjmng.deleteUnitPrjSet", mapParameter);
	}
	
	/**
	 * 프로젝트를 삭제한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int deletePrjSet(Map mapParameter) throws SQLException {
		return delete("prjmng.deletePrjSet", mapParameter);
	}
	
	/**
	 * 프로젝트 실행 목록을 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getPrjHstList(Map mapParameter) throws SQLException {
		return selectList("prjmng.getPrjHstList", mapParameter);
	}
	
	/**
	 * 프로젝트 실행 단위 목록을 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getPrjHstUnitList(Map mapParameter) throws SQLException {
		return selectList("prjmng.getPrjHstUnitList", mapParameter);
	} 
	
	
	/**
	 * 선택형 격자자료제공 목록을 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getGridInfoList(Map mapParameter) throws SQLException {
		return selectList("prjmng.getGridInfoList", mapParameter);
	}	
	
	/**
	 * 선택형 격자자료제공 상세정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getGridInfoDetail(Map mapParameter) throws SQLException {
		return selectOne("prjmng.getGridInfoDetail", mapParameter);
	}
}