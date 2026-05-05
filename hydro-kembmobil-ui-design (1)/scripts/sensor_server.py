"""
HYDROCORE Sensor Server
Este servidor Python actua como intermediario entre tus sensores fisicos por IP
y la aplicacion web Next.js
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import time
from typing import Dict, Any

app = Flask(__name__)
CORS(app)  # Permite conexiones desde tu app Next.js

# Configuracion de sensores - REEMPLAZA con tus IPs reales
SENSOR_IPS = {
    "water-level": "http://192.168.1.100:8080",
    "ambient-temp": "http://192.168.1.101:8080",
    "water-temp": "http://192.168.1.102:8080",
    "ph": "http://192.168.1.103:8080",
    "light": "http://192.168.1.104:8080",
    "purity": "http://192.168.1.105:8080",
}

# Cache de datos de sensores
sensor_cache: Dict[str, Dict[str, Any]] = {}


def read_sensor_from_device(sensor_id: str) -> float:
    """
    Lee el valor de un sensor desde su IP
    Modifica esta funcion segun el protocolo de tus sensores
    """
    
    try:
        sensor_url = SENSOR_IPS.get(sensor_id)
        if not sensor_url:
            raise ValueError(f"Sensor {sensor_id} no configurado")
        
        # Realiza la peticion HTTP al sensor
        response = requests.get(
            f"{sensor_url}/read",
            timeout=5  # Timeout de 5 segundos
        )
        
        if response.status_code == 200:
            data = response.json()
            return float(data.get("value", 0))
        else:
            print(f"Error al leer sensor {sensor_id}: Status {response.status_code}")
            return 0.0
            
    except requests.exceptions.Timeout:
        print(f"Timeout al conectar con sensor {sensor_id}")
        return 0.0
    except requests.exceptions.ConnectionError:
        print(f"Error de conexion con sensor {sensor_id}")
        return 0.0
    except Exception as e:
        print(f"Error inesperado al leer sensor {sensor_id}: {e}")
        return 0.0


@app.route("/api/sensor/<sensor_id>", methods=["GET"])
def get_sensor_value(sensor_id: str):
    """
    Endpoint para obtener el valor de un sensor
    """
    try:
        # Lee el valor del sensor fisico
        value = read_sensor_from_device(sensor_id)
        
        # Actualiza el cache
        sensor_cache[sensor_id] = {
            "value": value,
            "timestamp": time.time()
        }
        
        return jsonify({
            "sensor_id": sensor_id,
            "value": value,
            "timestamp": time.time()
        })
    
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


@app.route("/api/sensors/all", methods=["GET"])
def get_all_sensors():
    """
    Obtiene los valores de todos los sensores
    """
    try:
        all_data = {}
        
        for sensor_id in SENSOR_IPS.keys():
            value = read_sensor_from_device(sensor_id)
            all_data[sensor_id] = {
                "value": value,
                "timestamp": time.time()
            }
        
        return jsonify(all_data)
    
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


@app.route("/api/config", methods=["GET"])
def get_config():
    """
    Retorna la configuracion actual de sensores
    """
    return jsonify({
        "sensors": SENSOR_IPS
    })


@app.route("/api/config/update", methods=["POST"])
def update_config():
    """
    Actualiza la configuracion de un sensor
    """
    try:
        data = request.json
        sensor_id = data.get("sensor_id")
        new_ip = data.get("ip")
        
        if sensor_id in SENSOR_IPS and new_ip:
            SENSOR_IPS[sensor_id] = new_ip
            return jsonify({
                "success": True,
                "message": f"Sensor {sensor_id} actualizado a {new_ip}"
            })
        else:
            return jsonify({
                "success": False,
                "error": "Datos invalidos"
            }), 400
            
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


@app.route("/health", methods=["GET"])
def health_check():
    """
    Verifica que el servidor este funcionando
    """
    return jsonify({
        "status": "healthy",
        "timestamp": time.time()
    })


if __name__ == "__main__":
    print("=" * 50)
    print("HYDROCORE Sensor Server")
    print("Donde el agua es la raiz de todo")
    print("=" * 50)
    print("\nServidor iniciado en http://localhost:5000")
    print("\nSensores configurados:")
    for sensor_id, ip in SENSOR_IPS.items():
        print(f"  - {sensor_id}: {ip}")
    print("\n" + "=" * 50)
    
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
