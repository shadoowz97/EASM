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
  static deleteCache(route: String):void {
    console.log("----------------------------")
    console.log("delete key : "+route)
    console.log(SimpleRouterReuseStrategy.handlers.delete(route));
    console.log(SimpleRouterReuseStrategy.handlers.keys())
    console.log("----------------------------")
  }
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return !route.firstChild;
  }
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    console.log('store----- :' + route.toString());
    if (route.data['keep']) {
      console.log('route data :' );
      console.log(this.getUrl(route))
      SimpleRouterReuseStrategy.handlers.set(this.getUrl(route), handle);
    }
  }
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    console.log('should attach');
    return !!SimpleRouterReuseStrategy.handlers.has(this.getUrl(route));
  }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    console.log('-----retrieve ' + '  ' + route);
    if (!!route.firstChild) {
      return null;
    }
    return SimpleRouterReuseStrategy.handlers.get(this.getUrl(route));
  }
  private getUrl(route :ActivatedRouteSnapshot):String{
      return route['_routerState'].url;
  }
  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    console.log('should reuse --------  ' + future['_routerState'].url + ' ' + curr.toString());
    return future.routeConfig === curr.routeConfig;
  }
}
