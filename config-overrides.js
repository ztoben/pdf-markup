module.exports = config => {
  config.module.rules.push(
    {
      test: /fabric(\.min)?\.js$/,
      use: 'exports-loader?fabric',
    }
  );
  return config
};
