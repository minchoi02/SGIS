package egovframework.sgis.map.service.mapper.kairos;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import egovframework.sgis.map.command.CommonCommand;
import egovframework.sgis.map.model.CommunityVO;

@Mapper("communityMapper")
public interface CommunityMapper {
	int selectCmmntyCount(CommonCommand command);
	CommunityVO selectCmmnty(
			@Param("cmmnty_map_id")String cmmnty_map_id,
			@Param("member_id")String member_id
			);
	List<CommunityVO> selectCmmntyList(CommonCommand command);
	List<CommunityVO> selectCmmntyRemainderHotList(
			@Param("type")String type,
			@Param("member_id")String member_id,
			@Param("communityList")List<CommunityVO> communityList
			);
	List<EgovMap> selectMapList(String cmmnty_map_id);
	int selectCmmntyApprovalFromMemberCount(
			@Param("cmmnty_map_id")String cmmnty_map_id,
			@Param("member_id")String member_id
			);
	List<EgovMap> selectCommunityCustomSymbolList(String CUSTOM_SYMBOL_GROUP_ID);
	String selectCommunityPassword(String cmmnty_map_id);
	/** 2020.09.16[한광희] 지역현안 소통지도 수정 START */
	// 지역현안 소통지도 목록 조회
	List<CommunityVO> selectCommunityList(CommonCommand command);
	
	// 메인 지역현안 소통지도 목록 조회
	List<CommunityVO> selectMainCommunityList(CommonCommand command);
	/** 2020.09.16[한광희] 지역현안 소통지도 수정 START */

	String selectCmmntyMapPassword( String value );
}
