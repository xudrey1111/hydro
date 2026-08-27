// Sensor connection utilities for IP-based sensors
// Replace these with your actual sensor IP addresses and protocols

interface SensorConfig {
  id: string
  ip: string
  port: number
  protocol: "http" | "mqtt" | "tcp"
}

// Configure your sensor IPs here
const SENSOR_CONFIGS: Record<string, SensorConfig> = {
  "water-level": {
    id: "water-level",
    ip: "192.168.1.100",
    port: 8080,
    protocol: "http",
  },
  "ambient-temp": {
    id: "ambient-temp",
    ip: "192.168.1.101",
    port: 8080,
    protocol: "http",
  },
  "water-temp": {
    id: "water-temp",
    ip: "192.168.1.102",
    port: 8080,
    protocol: "http",
  },
  ph: {
    id: "ph",
    ip: "192.168.1.103",
    port: 8080,
    protocol: "http",
  },
  light: {
    id: "light",
    ip: "192.168.1.104",
    port: 8080,
    protocol: "http",
  },
  purity: {
    id: "purity",
    ip: "192.168.1.105",
    port: 8080,
    protocol: "http",
  },
}

/**
 * Connects to a sensor via IP and retrieves its value
 * @param sensorId - The ID of the sensor to read
 * @returns The sensor value
 */
export async function readSensorViaIP(sensorId: string): Promise<number> {
  const config = SENSOR_CONFIGS[sensorId]

  if (!config) {
    throw new Error(`Sensor configuration not found for: ${sensorId}`)
  }

  try {
    switch (config.protocol) {
      case "http": {
        // HTTP request to sensor endpoint
        const response = await fetch(`http://${config.ip}:${config.port}/sensor`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          // Add timeout to prevent hanging
          signal: AbortSignal.timeout(5000),
        })

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`)
        }

        const data = await response.json()
        return data.value
      }

      case "mqtt": {
        // MQTT implementation would go here
        // You would need to add an MQTT client library
        throw new Error("MQTT protocol not implemented yet")
      }

      case "tcp": {
        // TCP socket implementation would go here
        throw new Error("TCP protocol not implemented yet")
      }

      default:
        throw new Error(`Unsupported protocol: ${config.protocol}`)
    }
  } catch (error) {
    console.error(`Error reading sensor ${sensorId}:`, error)
    // Return a fallback value or throw
    throw error
  }
}

/**
 * Updates sensor configuration
 * @param sensorId - The ID of the sensor
 * @param config - New configuration
 */
export function updateSensorConfig(sensorId: string, config: Partial<SensorConfig>) {
  if (SENSOR_CONFIGS[sensorId]) {
    SENSOR_CONFIGS[sensorId] = { ...SENSOR_CONFIGS[sensorId], ...config }
  }
}

/**
 * Gets all sensor configurations
 */
export function getAllSensorConfigs(): Record<string, SensorConfig> {
  return SENSOR_CONFIGS
}
