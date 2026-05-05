"""
HYDROCORE Sensor Simulator
Simula sensores fisicos para probar la aplicacion sin hardware real
"""

from flask import Flask, jsonify
import random
import time

app = Flask(__name__)


def generate_water_level():
    """Simula nivel de agua (0-100%)"""
    return random.uniform(50, 100)


def generate_ambient_temp():
    """Simula temperatura ambiente (15-35°C)"""
    return random.uniform(15, 35)


def generate_water_temp():
    """Simula temperatura del agua (18-30°C)"""
    return random.uniform(18, 30)


def generate_ph():
    """Simula pH (5.5-8.5)"""
    return random.uniform(5.5, 8.5)


def generate_light():
    """Simula intensidad de luz (0-1000 lux)"""
    return random.uniform(0, 1000)


def generate_purity():
    """Simula pureza del agua (70-100%)"""
    return random.uniform(70, 100)


@app.route("/read", methods=["GET"])
def read_sensor():
    """
    Endpoint que simula la lectura de un sensor
    """
    # Determina el tipo de sensor basado en el puerto
    port = app.config.get('PORT', 8080)
    
    sensor_generators = {
        8080: generate_water_level,
        8081: generate_ambient_temp,
        8082: generate_water_temp,
        8083: generate_ph,
        8084: generate_light,
        8085: generate_purity,
    }
    
    generator = sensor_generators.get(port, generate_water_level)
    value = generator()
    
    return jsonify({
        "value": value,
        "timestamp": time.time(),
        "status": "ok"
    })


@app.route("/status", methods=["GET"])
def status():
    """
    Verifica el estado del sensor
    """
    return jsonify({
        "status": "online",
        "timestamp": time.time()
    })


def start_sensor_simulator(port: int):
    """
    Inicia un simulador de sensor en un puerto especifico
    """
    app.config['PORT'] = port
    print(f"Sensor simulado iniciado en puerto {port}")
    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )


if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
    else:
        port = 8080
    
    print("=" * 50)
    print("HYDROCORE Sensor Simulator")
    print("=" * 50)
    print(f"\nSimulador iniciado en http://localhost:{port}")
    print("Usa Ctrl+C para detener")
    print("=" * 50)
    
    start_sensor_simulator(port)
