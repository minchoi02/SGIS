package egovframework.sgis.map.service.mapper.kairos;

import org.apache.ibatis.annotations.Param;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("communityApprovalMapper")
public interface CommunityApprovalMapper {
	int selectCmmntyApprovalFromMemberCount(
			@Param("cmmnty_map_id")String cmmnty_map_id,
			@Param("approval_distinct")String approval_distinct,
			@Param("member_id")String member_id
			);
	int insertCmmntyApprovalAccessWait(
			@Param("cmmnty_map_id")String cmmnty_map_id,
			@Param("member_id")String member_id
			);
	int updateCmmntyApprovalDistinct(
			@Param("cmmnty_map_id")String cmmnty_map_id,
			@Param("approval_distinct")String approval_distinct,
			@Param("member_id")String member_id
			);
}
