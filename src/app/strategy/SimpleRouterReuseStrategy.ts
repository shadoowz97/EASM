/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-07-17 11:25:53
 * @LastEditors: Shadoowz
 * @LastEditTime: 2020-12-15 15:04:08
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
  static handlers: Map<String, DetachedRouteHandle> = new Map();
  static onCancel:boolean=false
  static deleteCache(route: String): void {
    console.log('----------------------------');
    console.log('delete key : ' + route);
    console.log(SimpleRouterReuseStrategy.handlers.delete(route));
    console.log(SimpleRouterReuseStrategy.handlers.keys());
    console.log('----------------------------');
  }
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.data.keep&&!(SimpleRouterReuseStrategy.onCancel);
  }
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    if (route.data['keep']) {
      console.log('route data :');
      console.log(this.getUrl(route));
      SimpleRouterReuseStrategy.handlers.set(this.getUrl(route), handle);
    }
  }
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!SimpleRouterReuseStrategy.handlers.has(this.getUrl(route));
  }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!!route.firstChild) {
      return null;
    }
    if (SimpleRouterReuseStrategy.handlers.has(this.getUrl(route)))
      return SimpleRouterReuseStrategy.handlers.get(this.getUrl(route));
    else return null;
  }
  private getUrl(route: ActivatedRouteSnapshot): String {
    return route['_routerState'].url;
  }
  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}
