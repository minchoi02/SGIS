package kostat.sop.OpenAPI3.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.neighborsystem.durian.exception.AbsHttpException;

@SuppressWarnings( "serial" )
@ResponseStatus(value=HttpStatus.UNPROCESSABLE_ENTITY, reason="테마코드 파라미터 값이 잘못됨")
public class InvalidThemeCodeException extends AbsHttpException
{
	public InvalidThemeCodeException()
	{
		super("허용되지 않은 테마코드 입니다.");
	}
	public InvalidThemeCodeException( String message )
	{
		super( message );
	}
}
