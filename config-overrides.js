const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@primary-color": "#9146FF",
      "@info-color": "#9146FF",
      "@processing-color": "#9146FF",
      "@body-background": "#F0F0FF",
      "@layout-body-background": "#F0F0FF"
    }
  })
);
