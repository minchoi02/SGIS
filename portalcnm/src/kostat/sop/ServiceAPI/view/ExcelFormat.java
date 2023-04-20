package kostat.sop.ServiceAPI.view;

import com.neighborsystem.durian.restapi.api.CommonTag;

import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.web.servlet.view.AbstractView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.Map;

import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * Created by htkim on 2014-10-30.
 * AbsAPI를 상속한 엑셀 다운로드 API 뷰 처리를 담당 한다.
 * 엑셀 다운로드 API 에서는 executeAPI 결과 값으로 Map 타입을 반환 해야 하고,
 * 반환 Map 구성은 아래와 같아야 한다.
 * {
 * 		filename: '다운로드 받을 파일 명',
 * 		workbook: org.apache.poi.ss.usermodel.Workbook
 *
 * }
 */
@SuppressWarnings("unchecked")
public class ExcelFormat extends AbstractView {

	@Override
	protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest req, HttpServletResponse res) throws Exception {
		Map data = model;
		Workbook wb;
		res.setContentType(getContentType());
		try {
			setContentType("text/html;charset=UTF-8");
			Map<String, Object> mapResult = (Map<String, Object>) data.get(CommonTag.result.name());
			String fileName = (String) mapResult.get("filename");
			setContentDisposition(res, fileName);
			wb = (Workbook) mapResult.get("workbook");
			if (wb != null) {
				wb.write(res.getOutputStream());
			}
			res.getOutputStream().flush();
		} 
		//2017.12.04 [개발팀] 시큐어코딩
		catch (IllegalArgumentException e) {
			System.out.println("서버처리 중 오류가 발생하였습니다.");
		}
		catch (Exception e) {
			System.out.println("서버처리 중 오류가 발생하였습니다.");
		}
		finally {
			data.clear();
			data = null;
			wb = null;
		}
	}

	private void setContentDisposition(HttpServletResponse res, String filename) {
		res.setHeader("Content-disposition", "attachment; filename=" + filename);
	}
}
