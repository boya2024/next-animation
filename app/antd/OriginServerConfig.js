import React, { useMemo, useCallback } from 'react';
import { Table, Tag, Descriptions, Space, Button, Popconfirm} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import CodeDiffView from 'components/CodeDiffView/index';
import JsonView from 'components/JsonView/index';
import './index.css';

// 将静态数据移到组件外部
const DEFAULT_DATA = [{
  httpPort: 80,
  httpsPort: 443,
  ip: "1.1.1.1",
  type: "源站IP",
  mode: '主源站',
  host: '',
  weight: 1,
  Priority: 20
}];

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

// 源站配置
const OriginServerConfig = (props)=>{
  const { configDataMap = {}, section, mode, updateConfig } = props;
  const key = section.key;
  const tableData = configDataMap[key] || [...DEFAULT_DATA];

  // 1. 将所有 Hooks 移到组件顶部
  const jsonData = useMemo(() => JSON.stringify(ORIGIN_DATA, null, 2), []);

  const onChange = useCallback((e)=>{
    updateConfig({
      key: section.key,
      value: e.target.value
    });
  }, [section.key, updateConfig]);

  const showEditDrawer = useCallback((record)=>{
    // 实现编辑逻辑
  }, []);

  const handleDelete = useCallback((record)=>{
    // 实现删除逻辑
  }, []);

  const columns = useMemo(() => [
    {
      title: '源站地址',
      dataIndex: 'ip',
      width:100,
    },
    {
      title: '源站模式',
      dataIndex: 'mode',
      width:100,
    },
    {
      title: '源站类型',
      dataIndex: 'type',
      width:100,
    },
    {
      title: '权重',
      dataIndex: 'weight',
      width:90,
    },
    {
      title: '回源 Host',
      dataIndex: 'host',
      width:100,
    },
    {
      title: 'HTTP 端口',
      dataIndex: 'httpPort',
      width:90,
    },
    {
      title: 'HTTPS 端口',
      dataIndex: 'httpsPort',
      width:90,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width:90,
      render: (text, record) => {
        const disabled = tableData.length < 2;
        return (
          <Space size="middle">
            <a className='table-edit-btn' onClick={() => showEditDrawer(record)}>编辑</a>
            <Popconfirm title="确认删除吗?" onConfirm={() => handleDelete(record)}>
              <Button type='link' danger disabled={disabled}>删除</Button>
            </Popconfirm>
          </Space>
        )
      },
    },
  ], [tableData.length, showEditDrawer, handleDelete]);

  const baseTable = useMemo(() => (
    <Table 
      className="origin-server-config-table" 
      title={null} 
      bordered 
      size='small'
      rowKey={record => record.ip}
      dataSource={tableData} 
      columns={mode === 'EDIT' ? columns : columns.slice(0, -1)}  
      pagination={false} 
    />
  ), [tableData, columns, mode]);

  const items = useMemo(() => {
    if(mode === 'EDIT') {
      return [{
        key: '1',
        label: '源站配置',
        children: (
          <div className='origin-server-config-table-container'>
            <Button type='link' icon={<PlusCircleOutlined />} style={{'paddingLeft':'4px'}}>
              添加源站
            </Button>
            {baseTable}
          </div>
        ),
      }];
    }

    return [{
      key: '1',
      label: '源站配置',
      children: baseTable
    }];
  }, [baseTable, mode]);

  // 2. 使用渲染逻辑替代提前返回
  const renderContent = () => {
    if(mode === 'JSON'){
      return <JsonView code={jsonData} />;
    }

    if(mode === 'DIFF'){
      return <CodeDiffView oldCode={jsonData} newCode={jsonData}/>;
    }

    return (
      <Descriptions 
        className='origin-config-descriptions'
        column={1} 
        title={null} 
        items={items} 
        style={{'margin':'20px 0'}} 
        size="large"
      />
    );
  };

  return renderContent();
};

// 使用 React.memo 包装组件
export default React.memo(OriginServerConfig);