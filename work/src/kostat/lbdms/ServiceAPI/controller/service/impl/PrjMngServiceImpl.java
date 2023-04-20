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
package kostat.lbdms.ServiceAPI.controller.service.impl;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.lbdms.ServiceAPI.controller.service.PrjMngService;
import kostat.lbdms.ServiceAPI.controller.service.mapper.PrjMngMapper;

/**
 * @Class Name : PrjMngServiceImpl.java
 * @Description : PrjMngServiceImpl Class
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

@Service("prjMngService")
public class PrjMngServiceImpl extends EgovAbstractServiceImpl implements PrjMngService {


	/** CommonDAO */
	@Resource(name="prjMngMapper")
	private PrjMngMapper prjMngMapper;
	
	/**
	 * 단위업무목록을 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getWorkSetList(Map mapParameter) throws SQLException {
		return prjMngMapper.getWorkSetList(mapParameter);
	}

	/**
	 * 데이터목록을 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getDataList(Map mapParameter) throws SQLException {
		return prjMngMapper.getDataList(mapParameter);
	}
	
	
	/**
	 * 단위업무정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map workSetDetail(Map mapParameter) throws SQLException {
		return prjMngMapper.workSetDetail(mapParameter);
	}

	/**
	 * 프로젝트 실행 단위업무정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map prjUnitModify(Map mapParameter) throws SQLException {
		return prjMngMapper.prjUnitModify(mapParameter);
	}
	
	/**
	 * 단위업무를 등록한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int workSetNew(Map mapParameter) throws SQLException {
		return prjMngMapper.workSetNew(mapParameter);
	}
	
	/**
	 * 단위업무를 수정한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateWorkSet(Map mapParameter) throws SQLException {
		return prjMngMapper.updateWorkSet(mapParameter);
	}

	/**
	 * 프로젝트 실행 단위업무를 수정한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updatePrjUnitSet(Map mapParameter) throws SQLException {
		return prjMngMapper.updatePrjUnitSet(mapParameter);
	}
	
	/**
	 * 단위업무를 삭제한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int deleteWorkSet(Map mapParameter) throws SQLException {
		return prjMngMapper.deleteWorkSet(mapParameter);
	}
	
	/**
	 * 프로젝트목록을 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getPrjSetList(Map mapParameter) throws SQLException {
		return prjMngMapper.getPrjSetList(mapParameter);
	}
	
	/**
	 * 프로젝트정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map prjSetDetail(Map mapParameter) throws SQLException {
		return prjMngMapper.prjSetDetail(mapParameter);
	}

	/**
	 * 프로젝트정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List prjUnitSet(Map mapParameter) throws SQLException {
		return prjMngMapper.prjUnitSet(mapParameter);
	}
	
	/**
	 * 프로젝트 아이디를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public String prjGetId() throws SQLException {
		return prjMngMapper.prjGetId();
	}
	
	/**
	 * 프로젝트 실행 아이디를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public String prjExecGetId() throws SQLException {
		return prjMngMapper.prjExecGetId();
	}
	
	/**
	 * 프로젝트실행을 등록한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int prjExecReg(Map mapParameter) throws SQLException {
		return prjMngMapper.prjExecReg(mapParameter);
	}

	/**
	 * 프로젝트실행 단위업무를 등록한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int prjUnitExecReg(Map mapParameter) throws SQLException {
		return prjMngMapper.prjUnitExecReg(mapParameter);
	}

	/**
	 * 프로젝트실행 삭제한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updatePrjExec(Map mapParameter) throws SQLException {
		return prjMngMapper.updatePrjExec(mapParameter);
	}

	/**
	 * 프로젝트실행 삭제 한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int delPrjExec(Map mapParameter) throws SQLException {
		return prjMngMapper.delPrjExec(mapParameter);
	}
	
	/**
	 * 프로젝트실행 단워업무 삭제 한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int delPrjUnitExec(Map mapParameter) throws SQLException {
		return prjMngMapper.delPrjUnitExec(mapParameter);
	}
	
	/**
	 * 프로젝트를 등록한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int prjSetNew(Map mapParameter) throws SQLException {
		return prjMngMapper.prjSetNew(mapParameter);
	}

	/**
	 * 프로젝트 단위업무를 등록한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int prjSetUnitNew(Map mapParameter) throws SQLException {
		return prjMngMapper.prjSetUnitNew(mapParameter);
	}
	
	/**
	 * 프로젝트를 수정한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updatePrjSet(Map mapParameter) throws SQLException {
		return prjMngMapper.updatePrjSet(mapParameter);
	}
	
	
	/**
	 * 프로젝트 단위업무를 삭제한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int deleteUnitPrjSet(Map mapParameter) throws SQLException {
		return prjMngMapper.deleteUnitPrjSet(mapParameter);
	}
	
	
	/**
	 * 프로젝트를 삭제한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int deletePrjSet(Map mapParameter) throws SQLException {
		return prjMngMapper.deletePrjSet(mapParameter);
	}
	

	/**
	 * 프로젝트 실행 목록을 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getPrjHstList(Map mapParameter) throws SQLException {
		return prjMngMapper.getPrjHstList(mapParameter);
	}

	/**
	 * 프로젝트 실행 단위업무 목록을 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getPrjHstUnitList(Map mapParameter) throws SQLException {
		return prjMngMapper.getPrjHstUnitList(mapParameter);
	}	 
	
	/**
	 * 선택형 격자자료제공 목록을 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getGridInfoList(Map mapParameter) throws SQLException {
		return prjMngMapper.getGridInfoList(mapParameter);
	}
	
	/**
	 * 선택형 격자자료제공 상세정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getGridInfoDetail(Map mapParameter) throws SQLException {
		return prjMngMapper.getGridInfoDetail(mapParameter);
	}
}