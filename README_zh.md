## Location MCP Server

中文 / [English](README.md)

这是一个基于 MCP (Model Context Protocol) 的位置服务器，提供 IP 地址定位和经纬度查询功能。

### 功能特点

- 支持通过 IP 地址查询位置信息
- 支持通过经纬度坐标查询详细地址信息
- 基于美团开放 API 实现
- 使用 TypeScript 开发，提供类型安全
- 支持 MCP 协议标准

### 安装

```bash
npm install @v8tech/mcp-server-location -g
```

### 使用方法

该服务器提供两个主要工具：

1. IP 地址定位 (`ip_location`)
   - 输入：IP 地址
   - 输出：包含国家、省份、城市、区县等详细位置信息

2. 经纬度定位 (`latlng_location`)
   - 输入：纬度(lat)和经度(lng)
   - 输出：包含详细地址信息，如国家、省份、城市、区县等

### 开发

1. 克隆仓库：
```bash
git clone https://github.com/v5tech/mcp-server-location.git
cd mcp-server-location
```

2. 安装依赖：
```bash
npm install
```

3. 构建项目：
```bash
npm run build
```

4. 开发模式（监听文件变化）：
```bash
npm run watch
```

### API 响应示例

1. IP 地址定位响应：
```json
{
  "location": {
    "ip": "8.8.8.8",
    "coordinates": {
      "latitude": 37.751,
      "longitude": -97.822
    },
    "address": {
      "country": "美国",
      "province": "堪萨斯州",
      "city": "维奇托",
      "district": "",
      "adcode": "US"
    }
  }
}
```

2. 经纬度定位响应：
```json
{
  "location": {
    "coordinates": {
      "latitude": 39.9042,
      "longitude": 116.4074
    },
    "address": {
      "country": "中国",
      "province": "北京市",
      "city": "北京市",
      "district": "东城区",
      "detail": "天安门广场",
      "areaName": "东城区"
    }
  }
}
```

### 许可证

本项目采用 MIT 许可证，详见 [LICENSE](LICENSE) 文件。

### 问题反馈

如果您在使用过程中遇到任何问题，欢迎在 [GitHub Issues](https://github.com/v5tech/mcp-server-location/issues) 页面提出。

