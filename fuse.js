const {
  FuseBox,
  EnvPlugin,
  CSSPlugin,
  QuantumPlugin,
  WebIndexPlugin,
} = require('fuse-box');

const production = process.env.NODE_ENV === 'dev' ? false : true;

const getConfig = (target, type) => {
  return {
    homeDir: 'src/',
    cache: !production,
    target,
    output: `build/$name.js`,
    tsConfig: './tsconfig.json',
    useTypescriptCompiler: true,
    plugins: [
      EnvPlugin({ NODE_ENV: production ? 'production' : 'development' }),
      production &&
        QuantumPlugin({
          bakeApiIntoBundle: type,
          treeshake: true,
          removeExportsInterop: false,
          uglify: {
            es6: true,
          },
        }),
    ],
    alias: {
      '~': '~/',
    },
  };
};

const getAppConfig = () => {
  return Object.assign({}, getConfig('browser@es6', 'app'), {
    hash: production,
    sourceMaps: !production,
  });
};

const getWebIndexPlugin = name => {
  return WebIndexPlugin({
    template: `src/resources/pages/${name}.html`,
    path: './',
    scriptAttributes: ['defer'],
  });
};

const app = () => {
  const config = getAppConfig();

  config.plugins.push(getWebIndexPlugin('index'));
  config.plugins.push(CSSPlugin());

  const fuse = FuseBox.init(config);
  const app = fuse.bundle('app').instructions('> index.ts');

  if (!production) {
    fuse.dev({ port: 8080 });

    app.hmr().watch('*/**');
  }

  fuse.run();
};

app();
