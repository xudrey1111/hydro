# HYDROCORE - Backend Python

Este directorio contiene los scripts de Python para conectar los sensores físicos con la aplicación web.

## Instalación

1. Instala las dependencias:
```bash
pip install -r requirements.txt
```

## Uso

### Opción 1: Con Sensores Reales

1. Edita `sensor_server.py` y configura las IPs de tus sensores reales en `SENSOR_IPS`
2. Ejecuta el servidor:
```bash
python sensor_server.py
```
3. El servidor estará disponible en `http://localhost:5000`

### Opción 2: Con Sensores Simulados (para pruebas)

1. Inicia simuladores de sensores (en diferentes terminales):
```bash
# Sensor de nivel de agua
python sensor_simulator.py 8080

# Sensor de temperatura ambiente
python sensor_simulator.py 8081

# Sensor de temperatura del agua
python sensor_simulator.py 8082

# Sensor de pH
python sensor_simulator.py 8083

# Sensor de luz
python sensor_simulator.py 8084

# Sensor de pureza
python sensor_simulator.py 8085
```

2. Inicia el servidor principal:
```bash
python sensor_server.py
```

## Integración con Next.js

Para conectar tu app web con el backend Python:

1. Actualiza `lib/sensor-connection.ts` en tu proyecto Next.js
2. Cambia las URLs para apuntar a `http://localhost:5000`
3. O despliega el servidor Python en un servidor remoto

## Configuración de Sensores Reales

Si tus sensores usan un protocolo diferente a HTTP:

1. Modifica la función `read_sensor_from_device()` en `sensor_server.py`
2. Agrega las librerías necesarias (MQTT, Serial, etc.) a `requirements.txt`
3. Implementa la lógica de conexión específica de tu hardware

## Endpoints Disponibles

- `GET /api/sensor/<sensor_id>` - Obtiene el valor de un sensor específico
- `GET /api/sensors/all` - Obtiene los valores de todos los sensores
- `GET /api/config` - Obtiene la configuración actual
- `POST /api/config/update` - Actualiza la configuración de un sensor
- `GET /health` - Verifica que el servidor esté funcionando
