import Mock from './WxMock';
// 导入包含path和data的对象
import homeMock from './home/index';
import searchMock from './search/index';
import dataCenter from './dataCenter/index';
import my from './my/index';
import code from './code/index';

export default () => {
  // 在这里添加新的mock数据
  const mockData = [...homeMock, ...searchMock, ...dataCenter, ...my, ...code];
  mockData.forEach((item) => {
    Mock.mock(item.path, item.response || { code: 200, success: true, data: item.data });
  });
};
