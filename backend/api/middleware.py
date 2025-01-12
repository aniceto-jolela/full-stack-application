from rest_framework_simplejwt.authentication import JWTAuthentication
from django.utils.deprecation import MiddlewareMixin
from rest_framework.exceptions import AuthenticationFailed


class CsrfAndTokenAuthMiddleware(MiddlewareMixin):
    # API requests and web requests
    def process_request(self, request):
        if request.path.startswith("/auth-api/"):
            try:
                jwt_auth = JWTAuthentication()
                auth_result = jwt_auth.authenticate(request)

                if auth_result is not None:
                    user, token = auth_result
                    request.user = user
                else:
                    request.user = None
            except AuthenticationFailed:
               request.user = None
        else:
            pass