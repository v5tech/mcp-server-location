#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import fetch from "node-fetch";

// 接口响应类型定义
interface IpLocationResponse {
  data: {
    lng: number;
    fromwhere: string;
    ip: string;
    rgeo: {
      country: string;
      province: string;
      adcode: string;
      city: string;
      district: string;
    };
    lat: number;
  };
}

interface LatLngLocationResponse {
  data: {
    detail: string;
    parentArea: number;
    cityPinyin: string;
    lng: number;
    isForeign: boolean;
    dpCityId: number;
    country: string;
    isOpen: boolean;
    city: string;
    id: number;
    openCityName: string;
    originCityID: number;
    area: number;
    areaName: string;
    province: string;
    district: string;
    lat: number;
  };
}

// 工具定义
const IP_LOCATION_TOOL: Tool = {
  name: "ip_location",
  description: "根据IP地址查询位置信息",
  inputSchema: {
    type: "object",
    properties: {
      ip: {
        type: "string",
        description: "要查询的IP地址"
      }
    },
    required: ["ip"]
  }
};

const LATLNG_LOCATION_TOOL: Tool = {
  name: "latlng_location",
  description: "根据经纬度查询位置信息",
  inputSchema: {
    type: "object",
    properties: {
      lat: {
        type: "number",
        description: "纬度"
      },
      lng: {
        type: "number",
        description: "经度"
      }
    },
    required: ["lat", "lng"]
  }
};

// 格式化响应函数
function formatIpLocationResponse(data: IpLocationResponse) {
  return {
    content: [{
      type: "text",
      text: JSON.stringify({
        location: {
          ip: data.data.ip,
          coordinates: {
            latitude: data.data.lat,
            longitude: data.data.lng
          },
          address: {
            country: data.data.rgeo.country,
            province: data.data.rgeo.province,
            city: data.data.rgeo.city,
            district: data.data.rgeo.district,
            adcode: data.data.rgeo.adcode
          }
        }
      }, null, 2)
    }],
    isError: false
  };
}

function formatLatLngLocationResponse(data: LatLngLocationResponse) {
  return {
    content: [{
      type: "text",
      text: JSON.stringify({
        location: {
          coordinates: {
            latitude: data.data.lat,
            longitude: data.data.lng
          },
          address: {
            country: data.data.country,
            province: data.data.province,
            city: data.data.city,
            district: data.data.district,
            detail: data.data.detail,
            areaName: data.data.areaName
          }
        }
      }, null, 2)
    }],
    isError: false
  };
}

// API请求处理函数
async function fetchLocationApi(endpoint: string): Promise<any> {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Error fetching from ${endpoint}: ${response.statusText}`);
  }
  return await response.json();
}

// 处理函数
async function handleIpLocation(params: { ip: string }) {
  const data = await fetchLocationApi(
    `https://apimobile.meituan.com/locate/v2/ip/loc?rgeo=true&ip=${params.ip}`
  ) as IpLocationResponse;
  return formatIpLocationResponse(data);
}

async function handleLatLngLocation(params: { lat: number; lng: number }) {
  const data = await fetchLocationApi(
    `https://apimobile.meituan.com/group/v1/city/latlng/${params.lat},${params.lng}?tag=0`
  ) as LatLngLocationResponse;
  return formatLatLngLocationResponse(data);
}

// 服务器设置
const server = new Server(
  {
    name: "mcp-server-location",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

// 设置请求处理器
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [IP_LOCATION_TOOL, LATLNG_LOCATION_TOOL],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    switch (request.params.name) {
      case "ip_location": {
        const { ip } = request.params.arguments as { ip: string };
        return await handleIpLocation({ ip });
      }

      case "latlng_location": {
        const { lat, lng } = request.params.arguments as {
          lat: number;
          lng: number;
        };
        return await handleLatLngLocation({ lat, lng });
      }

      default:
        return {
          content: [{
            type: "text",
            text: `未知工具: ${request.params.name}`
          }],
          isError: true
        };
    }
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `错误: ${error instanceof Error ? error.message : String(error)}`
      }],
      isError: true
    };
  }
});

// 启动服务器
async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Location MCP Server running on stdio");
}

runServer().catch((error) => {
  console.error("服务器运行错误:", error);
  process.exit(1);
});
