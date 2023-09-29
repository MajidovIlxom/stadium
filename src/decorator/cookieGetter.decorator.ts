// import { ExecutionContext, UnauthorizedException, createParamDecorator } from "@nestjs/common";


// export const CookieGetter = createParamDecorator(
//     async (data: string, context: ExecutionContext): Promise<string> => {
//         console.log('data: ', data);
//         const request = context.switchToHttp().getRequest();
//         console.log('request: ', request);
//         const refreshtoken = request.cookies['refresh_token'];
//         console.log('refreshtoken: ', refreshtoken);
//         if (!refreshtoken) {
//             throw new UnauthorizedException('token is not found');
//         } 
//         return refreshtoken
//     }
// )


import { ExecutionContext, UnauthorizedException, createParamDecorator } from "@nestjs/common";

export const CookieGetter = createParamDecorator(
  async (data: string, context: ExecutionContext): Promise<string> => {
    const request = context.switchToHttp().getRequest();
    if (!request) {
      throw new UnauthorizedException('Request object is undefined');
    }
    const refreshtoken = request.cookies['refresh_token'];
    if (!refreshtoken) {
      throw new UnauthorizedException('Token is not found');
    } 
    return refreshtoken;
  }
);
