import m from 'mithril';
import Header from './Header';
import Footer from './Footer';

export interface Attrs {
  stateman: {
    getString: () => void;
  };
}

function mainContent(vnode: m.CVnode<Attrs>): m.Children {
  // console.log('layout :', vnode.attrs.stateman?.state.contact ? ' Le state EST chargé ' : ' Le state PAS chargé ');
  return (
    <>
      <Header test={{ ste: 'hdgsd' }} />
      {vnode.children}
      <Footer />
    </>
  );
}

export default class Layout implements m.ClassComponent<Attrs> {
  view(vnode: m.CVnode<Attrs>): m.Children {
    return process.env.BROWSER_ENV ? (
      // Layout Client
      mainContent(vnode)
    ) : (
      // Layout Server
      <>
        {m('!doctype[html]')}
        <html lang="fr">
          <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta name="description" content="description ici" />
            {/* <title>{vnode.attrs.module.tag.title}</title> */}
          </head>
          <body>
            <div id="mainContent">
              {mainContent(vnode)}
            </div>
            <script>
              {`window.preloadedState = ${vnode.attrs.stateman.getString()}`}
            </script>
            <script src="/js/app.js" />
          </body>
        </html>
      </>
    );
  }
}
