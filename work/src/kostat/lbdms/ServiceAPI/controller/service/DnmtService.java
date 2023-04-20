package kostat.lbdms.ServiceAPI.controller.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public interface DnmtService {

	/**
	 * 명명 프로그램 목록 정보를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectDnmtInfoList(Map mapParameter) throws SQLException;

	/**
	 * 신규 명명 작업을 등록한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public void createDnmtInfo(Map mapParameter) throws SQLException;


	public Map selectDnmtDetail(Map mapParameter)throws SQLException;

    public void deleteDnmt(Map mapParameter) throws SQLException;

    public Map countNaming(Map mapParameter)throws SQLException;

    public List selectNamingList(Map mapParameter)throws SQLException;


}
