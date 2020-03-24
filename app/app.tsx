import m from 'mithril';
import Layout from './components/Layout';
import routes from './common/routes';
import stateManager from './common/stateman';

declare global {
  interface Window {
    preloadedState: () => void
  }
}

interface State {
  data: {
    title: string
  }
}

let sharedState = window.preloadedState || {};
const stateman = Object.create(stateManager);
stateman.init(sharedState);

const clientRoutes:m.RouteDefs = {};

let attrs = { stateman };
Object.keys(routes).forEach((route:string) => {
  clientRoutes[route] = {

    onmatch: () => {
      return routes[route].module().then((resp: m.Component) => {
        console.log(resp)
        return resp;
      });
    },

    render: (vnode) => {
      Object.assign(vnode.attrs, attrs);
      document.title = (vnode.tag as m.Comp<object, State>).data.title;
      console.log('vnode.tag', vnode.tag)
      return m(Layout, { module: { tag: vnode.tag, stateman: vnode.attrs.stateman } });
    }
  };
});

m.route(document.getElementById('mainContent') as HTMLElement, '/', clientRoutes);
