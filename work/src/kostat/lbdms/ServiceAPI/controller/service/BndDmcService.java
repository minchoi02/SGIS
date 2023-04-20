package kostat.lbdms.ServiceAPI.controller.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import kostat.lbdms.ServiceAPI.controller.model.urbar.BndDmcVO;

public interface BndDmcService {


	/**
	 * 획정 프로그램 목록 정보를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectBndInfoList(Map mapParameter) throws SQLException;

	/**
	 * 신규 획정 작업을 등록한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public void createBndInfo(Map mapParameter) throws SQLException;

	public Map selectBndInfoDetail(Map mapParameter)throws SQLException;

	public void deleteBnd(Map mapParameter) throws SQLException;







}
