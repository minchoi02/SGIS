package egovframework.sgis.cmmn.util;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class GeoJsonData {
	private final static Log logger = LogFactory.getLog(GeoJsonData.class);
	
	public GeoJsonData(HttpServletRequest request,HttpServletResponse response,StringUtils.COMM_ERR_CODE errCd,String errMsg,List<HashMap<String,Object>> result){
		this.errCd = errCd.getErrCode();
		JsonData json = new JsonData(request, response, errCd, null, result);
		if(errCd==StringUtils.COMM_ERR_CODE.SUCCESS){
			ObjectMapper mapper = new ObjectMapper();
			try {
				this.features = mapper.readValue(GeojsonRenderer.renderGeojson(mapper.convertValue(json, Map.class)), List.class);
			} catch (JsonParseException e) {
				logger.error(e);
			} catch (JsonMappingException e) {
				logger.error(e);
			} catch (IOException e) {
				logger.error(e);
			}
		}
		this.errMsg = json.getErrMsg();
		this.trId = json.getTrId();
		this.ts = json.getTs();
	}
	private String type="FeatureCollection";
	private int errCd;
	private String errMsg;
	private Object features;
	private UUID trId;
	private String ts;
	public int getErrCd() {
		return errCd;
	}
	public String getErrMsg() {
		return errMsg;
	}
	public Object getFeatures() {
		return features;
	}
	public UUID getTrId() {
		return trId;
	}
	public String getTs() {
		return ts;
	}
	public String getType() {
		return type;
	}
}
