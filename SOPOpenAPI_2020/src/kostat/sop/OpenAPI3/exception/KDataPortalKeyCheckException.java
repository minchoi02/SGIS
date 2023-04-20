package kostat.sop.OpenAPI3.exception;

import javax.servlet.ServletException;

@Deprecated
public class KDataPortalKeyCheckException extends ServletException
{

	private static final long serialVersionUID = 1L;

	public KDataPortalKeyCheckException()
	{
		super( "공공데이터포털 키체크 오류." );
	}
}
