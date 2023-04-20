package kostat.lbdms.ServiceAPI.center.service.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;

import kostat.lbdms.ServiceAPI.center.api.exception.HttpStatusException;
import kostat.lbdms.ServiceAPI.center.api.exception.UnauthorizedException;
import kostat.lbdms.ServiceAPI.center.api.interceptor.AbsAuthorized;

@Component("CheckAuthorization")
public class Authorization extends AbsAuthorized {

	@Override
	public void authorized(HttpServletRequest req, HttpServletResponse res)	throws HttpStatusException {
		throw new UnauthorizedException("not login");
	}

}
