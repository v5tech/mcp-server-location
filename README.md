## Location MCP Server

[中文](README_zh.md) / English

A location server based on MCP (Model Context Protocol) that provides IP address location and latitude/longitude query functionality.

### Features

- Support location query by IP address
- Support detailed address query by latitude and longitude coordinates
- Based on Meituan Open API
- Developed with TypeScript for type safety
- Compliant with MCP protocol standard

### Installation

```bash
npm install @v8tech/mcp-server-location -g
```

### Usage

The server provides two main tools:

1. IP Location (`ip_location`)
   - Input: IP address
   - Output: Detailed location information including country, province, city, district, etc.

2. Latitude/Longitude Location (`latlng_location`)
   - Input: Latitude (lat) and longitude (lng)
   - Output: Detailed address information including country, province, city, district, etc.

### Development

1. Clone the repository:
```bash
git clone https://github.com/v5tech/mcp-server-location.git
cd mcp-server-location
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Development mode (watch for changes):
```bash
npm run watch
```

### API Response Examples

1. IP Location Response:
```json
{
  "location": {
    "ip": "8.8.8.8",
    "coordinates": {
      "latitude": 37.751,
      "longitude": -97.822
    },
    "address": {
      "country": "United States",
      "province": "Kansas",
      "city": "Wichita",
      "district": "",
      "adcode": "US"
    }
  }
}
```

2. Latitude/Longitude Location Response:
```json
{
  "location": {
    "coordinates": {
      "latitude": 39.9042,
      "longitude": 116.4074
    },
    "address": {
      "country": "China",
      "province": "Beijing",
      "city": "Beijing",
      "district": "Dongcheng",
      "detail": "Tiananmen Square",
      "areaName": "Dongcheng District"
    }
  }
}
```

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Issues

If you encounter any problems while using this project, please feel free to submit them on the [GitHub Issues](https://github.com/v5tech/mcp-server-location/issues) page.

