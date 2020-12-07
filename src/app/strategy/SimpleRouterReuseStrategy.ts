/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-07-17 11:25:53
 * @LastEditors: Shadoowz
 * @LastEditTime: 2020-12-06 16:55:07
 */
import {
  RouteReuseStrategy,
  DefaultUrlSerializer,
  Route,
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  ActivatedRoute,
} from '@angular/router';
export class SimpleRouterReuseStrategy implements RouteReuseStrategy {
  static handlers: Map<String, any> = new Map();
  static deleteCache(route: String): void {
    console.log('----------------------------');
    console.log('delete key : ' + route);
    console.log(SimpleRouterReuseStrategy.handlers.delete(route));
    console.log(SimpleRouterReuseStrategy.handlers.keys());
    console.log('----------------------------');
  }
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return true;
  }
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    console.log('store----- :' + route.toString());
    if (route.data['keep']) {
      console.log('route data :');
      console.log(route.routeConfig.path);
      SimpleRouterReuseStrategy.handlers.set(route.routeConfig.path, {
        snapshot: route,
        handler: handle,
      });
    }
  }
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    console.log('should attach');
    return !!SimpleRouterReuseStrategy.handlers.has(route.routeConfig.path);
  }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    console.log('-----retrieve ' + '  ' + route);
    if (!!route.firstChild) {
      return null;
    }
    if (SimpleRouterReuseStrategy.handlers.has(route.routeConfig.path))
      return SimpleRouterReuseStrategy.handlers.get(route.routeConfig.path)
        .handler;
    else return null;
  }
  private getUrl(route: ActivatedRouteSnapshot): String {
    return route['_routerState'].url;
  }
  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    console.log(
      'should reuse --------  ' +
        future['_routerState'].url +
        ' ' +
        curr['_routerState'].url
    );
    return future.routeConfig === curr.routeConfig;
  }
}
