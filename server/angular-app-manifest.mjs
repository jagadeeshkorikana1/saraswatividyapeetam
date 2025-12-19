
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/saraswatividyapeetam/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/saraswatividyapeetam"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 449, hash: '180d42df08cc54aac6c9a879021673b99d2e6d2a41086b4aed42498650400a39', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 962, hash: 'b47eb1939c7ad8aacfa55171188508caaf0f31efae69f7b04cc513a10b48c985', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 21556, hash: '93e58e0ec14e9557a7198f4ac064c8555e4648ed2b4908f6be94d70add870ed8', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
