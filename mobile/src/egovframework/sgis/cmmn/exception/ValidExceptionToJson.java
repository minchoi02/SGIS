package egovframework.sgis.cmmn.exception;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.sgis.cmmn.util.JsonData;
import egovframework.sgis.cmmn.util.StringUtils;

@SuppressWarnings("serial")
public class ValidExceptionToJson extends Exception {
	private static final Log logger = LogFactory.getLog(ValidExceptionToJson.class);
	private final HttpServletRequest request;
	private final HttpServletResponse response;
	private final BindingResult bindingResult;
	public ValidExceptionToJson(
			HttpServletRequest request,
			HttpServletResponse response,
			BindingResult bindingResult) {
		this.request = request;
		this.response = response;
		this.bindingResult = bindingResult;
	}

	public BindingResult getBindingResult() {
		return this.bindingResult;
	}

	@Override
	public String getMessage() {
		ObjectMapper mapper = new ObjectMapper();
		List<HashMap<String,Object>> errorList = new ArrayList<HashMap<String,Object>>(); 
		for(ObjectError error : this.bindingResult.getAllErrors()){
			HashMap<String,Object> errorField = new HashMap<String,Object>();
			FieldError field = (FieldError) error;
			errorField.put("name", field.getField());
			errorField.put("message", error.getDefaultMessage());
			errorList.add(errorField);
		}
		try {
			return mapper.writeValueAsString(new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, errorList));
		} catch (JsonProcessingException e) {
			logger.error(e);
			return null;
		}
	}

}