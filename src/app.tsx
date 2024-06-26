// 运行时配置

import { SettingDrawer } from '@ant-design/pro-components';
import { message } from 'antd';
import defaultSettings from '../config/defaultSettings';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<any> {
  return { settings: defaultSettings };
}

export const layout = ({ initialState, setInitialState }) => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            settings={initialState?.settings}
            onSettingChange={(settings) => {
              setInitialState((preInitialState) => ({
                ...preInitialState,
                settings: { ...settings },
              }));
            }}
          />
        </>
      );
    },
    ...initialState?.settings,
  };
};

export const request = {
  requestInterceptors: [],
  responseInterceptors: [],
  errorConfig: {
    errorHandler(e) {
      console.log(e);
      message.error('我是全局错误提示' + e.message);
      // if (e.message) {
      //   message.error(e.message);
      // }
    },
  },
};
