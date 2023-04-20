package kostat.sop.OpenAPI3.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.neighborsystem.durian.exception.AbsHttpException;

@SuppressWarnings( "serial" )
@ResponseStatus(value=HttpStatus.UNPROCESSABLE_ENTITY, reason="행정동코드 파라미터 값이 잘못됨")
public class InvalidAdmCodeException extends AbsHttpException
{
	public InvalidAdmCodeException()
	{
		super("허용되지 않은 행정동 코드 길이 입니다.");
	}
	
	public InvalidAdmCodeException( String message )
	{
		super( message );
	}
}
