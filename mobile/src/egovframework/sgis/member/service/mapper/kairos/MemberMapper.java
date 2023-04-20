package egovframework.sgis.member.service.mapper.kairos;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import egovframework.sgis.cmmn.util.PagedListHolder;
import egovframework.sgis.member.model.MemberVO;
import egovframework.sgis.member.model.StatsearchhistoryVO;

@Mapper("memberMapper")
public interface MemberMapper {
	MemberVO selectMemberInfo(String member_id);
	int updateMemberInfo(
			@Param("member_id")String member_id,
			@Param("pw_fail_cnt")int pw_fail_cnt,
			@Param("last_access_ip")String last_access_ip
			);
	StatsearchhistoryVO selectHistparaminfo(
			@Param("hist_id")String hist_id
			);
	int insertHistoryInfo(StatsearchhistoryVO history);
	int insertHistoryParameter(StatsearchhistoryVO history);
	int selectHistoryCount(
			@Param("holder")PagedListHolder holder,
			@Param("member_id")String member_id,
			@Param("hist_type")String hist_type,
			@Param("map_type")String map_type
			);
	List<EgovMap> selectHistoryList(
			@Param("holder")PagedListHolder holder,
			@Param("member_id")String member_id,
			@Param("hist_type")String hist_type,
			@Param("map_type")String map_type
			);
}
