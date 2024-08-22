import type { ColProps } from 'antd/es/col';
import type { FC } from 'react';

import { Badge, Card, Col, List, Radio, Row } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { useLocale } from '@/locales';

type DataType = 'all' | 'online' | 'offline';

interface Values {
  name: {
    vi_VN: string;
    en_US: string;
  };
  value: number;
}

interface Data {
  all: Values[];
  online: Values[];
  offline: Values[];
}

const data: Data = {
  all: [
    { name: { vi_VN: '家用电器', en_US: 'appliances' }, value: 4544 },
    { name: { vi_VN: '食用酒水', en_US: 'drinks' }, value: 3321 },
    { name: { vi_VN: '个护健康', en_US: 'health' }, value: 3113 },
    { name: { vi_VN: '服饰箱包', en_US: 'clothing' }, value: 2341 },
    { name: { vi_VN: '母婴产品', en_US: 'baby' }, value: 1231 },
    { name: { vi_VN: '其他', en_US: 'others' }, value: 132 },
  ],
  online: [
    { name: { vi_VN: '家用电器', en_US: 'appliances' }, value: 244 },
    { name: { vi_VN: '食用酒水', en_US: 'drinks' }, value: 231 },
    { name: { vi_VN: '个护健康', en_US: 'health' }, value: 311 },
    { name: { vi_VN: '服饰箱包', en_US: 'clothing' }, value: 41 },
    { name: { vi_VN: '母婴产品', en_US: 'baby' }, value: 121 },
    { name: { vi_VN: '其他', en_US: 'others' }, value: 111 },
  ],
  offline: [
    { name: { vi_VN: '家用电器', en_US: 'appliances' }, value: 99 },
    { name: { vi_VN: '食用酒水', en_US: 'drinks' }, value: 188 },
    { name: { vi_VN: '个护健康', en_US: 'health' }, value: 344 },
    { name: { vi_VN: '服饰箱包', en_US: 'clothing' }, value: 255 },
    { name: { vi_VN: '其他', en_US: 'others' }, value: 65 },
  ],
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#E36E7E', '#8F66DE'];

const wrapperCol: ColProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 12,
};

const SalePercent: FC<{ loading: boolean }> = ({ loading }) => {
  const [dataType, setDataType] = useState<DataType>('all');
  const { locale } = useSelector(state => state.user);
  const { formatMessage } = useLocale();

  return (
    <Card
      className="salePercent"
      title={formatMessage({ id: 'app.dashboard.salePercent.proportionOfSales' })}
      loading={loading}
      extra={
        <Radio.Group value={dataType} onChange={e => setDataType(e.target.value)} buttonStyle="solid">
          <Radio.Button value="all">{formatMessage({ id: 'app.dashboard.salePercent.all' })}</Radio.Button>
          <Radio.Button value="online">{formatMessage({ id: 'app.dashboard.salePercent.online' })}</Radio.Button>
          <Radio.Button value="offline">{formatMessage({ id: 'app.dashboard.salePercent.offline' })}</Radio.Button>
        </Radio.Group>
      }
    >
      <Row gutter={20}>
        <Col {...wrapperCol}>
          <ResponsiveContainer height={250}>
            <PieChart>
              <Tooltip
                content={({ active, payload }: any) => {
                  if (active) {
                    const { name, value } = payload[0];
                    const total = data[dataType].map(d => d.value).reduce((a, b) => a + b);
                    const percent = ((value / total) * 100).toFixed(2) + '%';

                    return (
                      <span className="customTooltip">
                        {name[locale]} : {percent}
                      </span>
                    );
                  }

                  return null;
                }}
              />
              <Pie
                strokeOpacity={0}
                data={data[dataType]}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data[dataType].map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Col>
        <Col {...wrapperCol}>
          <List<Values>
            bordered
            dataSource={data[dataType]}
            renderItem={(item, index) => {
              const total = data[dataType].map(d => d.value).reduce((a, b) => a + b);
              const percent = ((item.value / total) * 100).toFixed(2) + '%';

              return (
                <List.Item>
                  <Badge color={COLORS[index]} />
                  <span>{item.name[locale]}</span> | <span>{item.value}</span> <span>¥ {percent}</span>
                </List.Item>
              );
            }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default SalePercent;
