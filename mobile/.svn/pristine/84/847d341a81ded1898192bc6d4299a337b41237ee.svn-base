package egovframework.sgis.map.service.mapper.kairos;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import egovframework.sgis.map.command.CommonCommand;

@Mapper("communityPoiReplyMapper")
public interface CommunityPoiReplyMapper {
	EgovMap selectPoiReply(@Param("poi_reply_id")String poi_reply_id);
	String selectPoiReplyPassword(@Param("poi_reply_id")String poi_reply_id);
	List<EgovMap> selectPoiReplyList(CommonCommand command);
	int insertPoiReply(
			@Param("cmmnty_poi_id")String cmmnty_poi_id,
			@Param("cmmnty_usr_data_pt_id")String cmmnty_usr_data_pt_id,
			@Param("reply_content")String reply_content,
			@Param("member_id")String member_id,
			@Param("member_pw")String member_pw
			);
	int updatePoiReply(
			@Param("poi_reply_id")String poi_reply_id,
			@Param("reply_content")String reply_content,
			@Param("member_id")String member_id);
	int deletePoiReply(
			@Param("poi_reply_id")String poi_reply_id,
			@Param("member_id")String member_id);
}
