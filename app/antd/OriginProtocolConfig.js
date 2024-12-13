import React, { useMemo, useCallback } from 'react';
import { Radio, Tag, Descriptions } from 'antd';
import CodeDiffView from 'components/CodeDiffView/index';
import JsonView from 'components/JsonView/index';

// 将静态数据移到组件外
const ORIGIN_DATA = {
  "Origins": [
    {
      "Priority": 20,
      "Weight": 1,
      "Type": "Ip",
      "Address": "1.1.1.1",
      "HttpPort": 80,
      "HttpsPort": 443
    }
  ]
};

const DEFAULT_CONFIG = { protocol: 'HTTP' };

// 回源协议
const OriginProtocolConfig = (props) => {
  const { configDataMap = {}, section, mode, updateConfig } = props;
  const key = section.key;
  const configData = configDataMap[key] || DEFAULT_CONFIG;

  // 缓存 JSON 字符串
  const jsonData = useMemo(() => JSON.stringify(ORIGIN_DATA, null, 2), []);

  // 缓存 onChange 处理函数
  const onChange = useCallback((e) => {
    updateConfig({
      key: section.key,
      value: {
        protocol: e.target.value
      }
    });
  }, [section.key, updateConfig]);

  // 缓存 items 配置
  const items = useMemo(() => {
    if (mode === 'EDIT') {
      return [{
        key: '1',
        label: '回源协议',
        children: (
          <Radio.Group onChange={onChange} value={configData.protocol}>
            <Radio value={'HTTP'}>HTTP</Radio>
            <Radio value={'HTTPS'}>HTTPS</Radio>
            <Radio value={'协议跟随'}>协议跟随</Radio>
          </Radio.Group>
        ),
      }];
    }

    return [{
      key: '1',
      label: '回源协议',
      children: (
        <Tag color="processing">{configData.protocol}</Tag>
      ),
    }];
  }, [mode, configData.protocol, onChange]);

  // 使用渲染函数替代条件返回
  const renderContent = () => {
    if (mode === 'JSON') {
      return <JsonView code={jsonData} />;
    }

    if (mode === 'DIFF') {
      return <CodeDiffView oldCode={jsonData} newCode={jsonData} />;
    }

    return (
      <Descriptions
        className='origin-config-descriptions'
        column={1}
        title={null}
        items={items}
        style={{ 'margin': '20px 0' }}
        size="large"
      />
    );
  };

  return renderContent();
};

// 添加属性比较函数
const propsAreEqual = (prevProps, nextProps) => {
  return (
    prevProps.mode === nextProps.mode &&
    prevProps.section.key === nextProps.section.key &&
    prevProps.configDataMap?.[prevProps.section.key]?.protocol === 
    nextProps.configDataMap?.[nextProps.section.key]?.protocol
  );
};

// 使用 React.memo 包装组件，并添加自定义的比较函数
export default React.memo(OriginProtocolConfig, propsAreEqual);