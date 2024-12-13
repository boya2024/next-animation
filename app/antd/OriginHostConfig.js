import React, { useState, useMemo, useCallback } from 'react';
import { Radio, Tag, Descriptions, Input } from 'antd';
import CodeDiffView from 'components/CodeDiffView/index';
import JsonView from 'components/JsonView/index';
import { useDebouncedCallback } from 'use-debounce';

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

const DEFAULT_CONFIG = { host: '加速域名', domain: '' };

// 域名验证正则
const DOMAIN_REGEX = /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/;

// 回源HOST
const OriginHostConfig = (props) => {
  const [error, setError] = useState(null);
  const { configDataMap = {}, section, mode, updateConfig } = props;
  const key = section.key;
  const configData = configDataMap[key] || DEFAULT_CONFIG;

  // 缓存 JSON 字符串
  const jsonData = useMemo(() => JSON.stringify(ORIGIN_DATA, null, 2), []);

  // 域名验证函数
  const checkDomain = useDebouncedCallback((domain) => {
    if (!domain) {
      setError(null);
      return;
    }
    setError(!DOMAIN_REGEX.test(domain) ? '请输入正确的域名' : '');
  }, 50);

  // 缓存回调函数
  const onChange = useCallback((e) => {
    updateConfig({
      key: section.key,
      value: {
        host: e.target.value,
        domain: configData.domain,
      }
    });
  }, [section.key, configData.domain, updateConfig]);

  const onInputChange = useCallback((e) => {
    const domain = e.target.value;
    checkDomain(domain);
    updateConfig({
      key: section.key,
      value: {
        host: configData.host,
        domain,
      }
    });
  }, [section.key, configData.host, checkDomain, updateConfig]);

  // 缓存自定义域名输入框
  const CustomDomainInput = useMemo(() => {
    if (configData.host !== '自定义域名') return null;
    
    return {
      key: '2',
      label: <div style={{ 'paddingBottom': '18px' }}>自定义域名</div>,
      children: (
        <div style={{ 'position': 'relative', 'paddingBottom': '18px', 'width': '600px' }}>
          <Input
            type="text"
            placeholder="请输入自定义域名"
            status={error ? 'error' : ''}
            onChange={onInputChange}
            value={configData.domain}
          />
          {error && <div className='error-text'>{error}</div>}
        </div>
      ),
    };
  }, [configData.host, configData.domain, error, onInputChange]);

  // 缓存 items 配置
  const items = useMemo(() => {
    if (mode === 'EDIT') {
      const baseItems = [{
        key: '1',
        label: '回源HOST',
        children: (
          <Radio.Group onChange={onChange} value={configData.host}>
            <Radio value={'加速域名'}>加速域名</Radio>
            <Radio value={'源站地址'}>源站地址</Radio>
            <Radio value={'自定义域名'}>自定义域名</Radio>
          </Radio.Group>
        ),
      }];

      return CustomDomainInput ? [...baseItems, CustomDomainInput] : baseItems;
    }

    return [{
      key: '1',
      label: '回源HOST',
      children: (
        <Tag color="processing">{configData.host}</Tag>
      ),
    }];
  }, [mode, configData.host, onChange, CustomDomainInput]);

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
    prevProps.configDataMap?.[prevProps.section.key]?.host === 
    nextProps.configDataMap?.[nextProps.section.key]?.host &&
    prevProps.configDataMap?.[prevProps.section.key]?.domain === 
    nextProps.configDataMap?.[nextProps.section.key]?.domain
  );
};

// 使用 React.memo 包装组件，并添加自定义的比较函数
export default React.memo(OriginHostConfig, propsAreEqual);