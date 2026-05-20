from kivy.app import App
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.uix.button import Button
from kivy.uix.textinput import TextInput
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label
from kivy.uix.widget import Widget
from kivy.uix.image import Image
from kivy.uix.dropdown import DropDown
from kivy.uix.popup import Popup
from kivy.uix.floatlayout import FloatLayout
from kivy.graphics import Color, RoundedRectangle, Rectangle, Line
from kivy.core.window import Window
import socket

# ====== HYDROCORE COLOR PALETTE ======
# Verde esmeralda (primary)
EMERALD = (26/255, 107/255, 60/255, 1)
# Verde bosque (secondary)
FOREST = (45/255, 90/255, 39/255, 1)
# Verde menta
MINT = (168/255, 213/255, 186/255, 1)
# Petróleo (accent)
PETROL = (27/255, 77/255, 92/255, 1)
# Verde lima / Neón brillante
LIME_NEON = (57/255, 211/255, 83/255, 1)
# Blanco niebla
FOG_WHITE = (247/255, 250/255, 248/255, 1)
# Pizarra azulada
SLATE_BLUE = (46/255, 64/255, 87/255, 1)
# Azul medianoche
MIDNIGHT = (15/255, 31/255, 46/255, 1)
# Background suave
BG_COLOR1 = (240/255, 244/255, 242/255, 1)
BG_COLOR2 = (215/255, 235/255, 225/255, 1)

# ====== THEME COLORS ======
HEADER_BG_COLOR = EMERALD
BG_CHAT = (240/255, 248/255, 244/255, 1)
WHITE = (1, 1, 1, 1)
GOLD = LIME_NEON  # Accent color for highlights
TEXT_COLOR = SLATE_BLUE
CAPTION_COLOR = (70/255, 90/255, 80/255, 1)
BUTTON_BORDER_COLOR = EMERALD
BUTTON_BG_COLOR = (0, 0, 0, 0)
BUTTON_TEXT_COLOR = EMERALD
LABEL_HINT_COLOR = (74/255, 107/255, 88/255, 1)
BTN_CHAT_TEXT_COLOR = (1, 1, 1, 1)

Window.clearcolor = BG_COLOR1

# ------ SensorCardWidget ------
class SensorCardWidget(BoxLayout):
    def __init__(self, sensor_name="Sensor", sensor_value="--", **kwargs):
        super().__init__(orientation='vertical', size_hint=(None, None), size=(370, 150), **kwargs)
        with self.canvas.before:
            Color(1, 1, 1, 1)
            self.bg = RoundedRectangle(pos=self.pos, size=self.size, radius=[16])
        self.bind(pos=self.update_bg, size=self.update_bg)

        # Header con verde esmeralda
        header = BoxLayout(size_hint=(1, None), height=40, padding=0)
        with header.canvas.before:
            Color(*EMERALD)
            header.bg = RoundedRectangle(pos=header.pos, size=header.size, radius=[16, 16, 0, 0])
        header.bind(pos=lambda inst, v: setattr(header.bg, 'pos', header.pos), size=lambda inst, v: setattr(header.bg, 'size', header.size))
        header.add_widget(Label(text=sensor_name, color=(1,1,1,1), font_size=22, bold=True, halign="center", valign="middle"))
        self.add_widget(header)

        # Valor del sensor
        self.value_label = Label(
            text=f"Valor: {sensor_value}",
            color=TEXT_COLOR, font_size=30, halign='center', valign='middle', size_hint=(1, 1)
        )
        self.add_widget(self.value_label)

    def update_bg(self, *args):
        self.bg.pos = self.pos
        self.bg.size = self.size

    def update_sensor(self, sensor_name, sensor_value):
        self.children[1].children[0].text = sensor_name  # Header label
        self.value_label.text = f"Valor: {sensor_value}"

# ------ ChatbotWidget ------
class ChatbotWidget(BoxLayout):
    def __init__(self, **kwargs):
        super().__init__(orientation='vertical', size_hint=(None, None), size=(370, 330), **kwargs)
        with self.canvas.before:
            Color(1, 1, 1, 1)
            self.bg = RoundedRectangle(pos=self.pos, size=self.size, radius=[16])
        self.bind(pos=self.update_bg, size=self.update_bg)

        # Header con verde esmeralda
        header = BoxLayout(size_hint=(1, None), height=40, padding=0)
        with header.canvas.before:
            Color(*EMERALD)
            header.bg = RoundedRectangle(pos=header.pos, size=header.size, radius=[16, 16, 0, 0])
        header.bind(pos=lambda inst, v: setattr(header.bg, 'pos', header.pos), size=lambda inst, v: setattr(header.bg, 'size', header.size))
        header.add_widget(Label(text="Chatbot", color=BTN_CHAT_TEXT_COLOR, font_size=22, bold=True, halign="center", valign="middle"))
        self.add_widget(header)

        # Mensajes (área de chat)
        self.messages = Label(
            text="¡Hola! ¿En qué puedo ayudarte hoy?",
            color=TEXT_COLOR, font_size=18, halign='left', valign='top',
            size_hint=(1, 1), text_size=(330, None), markup=True
        )
        msg_box = BoxLayout(size_hint=(1, 1), padding=[16, 10, 16, 10])
        with msg_box.canvas.before:
            Color(*BG_CHAT)
            msg_box.bg = Rectangle(pos=msg_box.pos, size=msg_box.size)
        msg_box.bind(pos=lambda inst, v: setattr(msg_box.bg, 'pos', msg_box.pos), size=lambda inst, v: setattr(msg_box.bg, 'size', msg_box.size))
        msg_box.add_widget(self.messages)
        self.add_widget(msg_box)

        # Input y botón enviar
        input_row = BoxLayout(orientation='horizontal', size_hint=(1, None), height=54, padding=[13, 8, 13, 8], spacing=8)
        self.text_input = TextInput(
            hint_text="Escribe un mensaje...",
            background_color=(1,1,1,1), foreground_color=TEXT_COLOR,
            multiline=False, font_size=17, size_hint=(0.7, 1),
            padding_x=10, padding_y=(8,8), cursor_color=TEXT_COLOR
        )
        send_btn = Button(
            text="Enviar", size_hint=(0.3, 1), font_size=17, bold=True,
            background_normal='', background_color=EMERALD, color=BTN_CHAT_TEXT_COLOR
        )
        send_btn.bind(on_release=self.send_message)
        input_row.add_widget(self.text_input)
        input_row.add_widget(send_btn)
        self.add_widget(input_row)

    def update_bg(self, *args):
        self.bg.pos = self.pos
        self.bg.size = self.size

    def send_message(self, instance):
        msg = self.text_input.text.strip()
        if msg:
            if self.messages.text:
                self.messages.text += f"\n[b]Tú:[/b] {msg}"
            else:
                self.messages.text = f"[b]Tú:[/b] {msg}"
            self.text_input.text = ""

class StyledButton(Button):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.background_normal = ''
        self.background_color = BUTTON_BG_COLOR
        self.color = BUTTON_TEXT_COLOR
        self.font_size = 21
        self.bold = True
        self.size_hint = (0.6, None)
        self.height = 56
        self.pos_hint = {'center_x': 0.5}
        with self.canvas.before:
            Color(0,0,0,0)
            self.bg = RoundedRectangle(pos=self.pos, size=self.size, radius=[30])
            Color(*EMERALD)
            self.outline = Line(rounded_rectangle=[self.x, self.y, self.width, self.height, 30], width=1.7)
        self.bind(pos=self.update_rect, size=self.update_rect)

    def update_rect(self, *args):
        self.bg.pos = self.pos
        self.bg.size = self.size
        self.outline.rounded_rectangle = [self.x, self.y, self.width, self.height, 30]

class StyledLabel(Label):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.color = TEXT_COLOR
        self.font_size = 22
        self.halign = 'center'
        self.valign = 'middle'
        self.size_hint_y = None
        self.height = 60
        self.bold = False

class StyledInput(TextInput):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.background_color = (1,1,1,1)
        self.foreground_color = TEXT_COLOR
        self.font_size = 18
        self.size_hint_y = None
        self.height = 48
        self.halign = 'center'
        self.padding_y = [15, 15]
        self.multiline = False

class CustomPopup(Popup):
    def __init__(self, title, message, **kwargs):
        super().__init__(**kwargs)
        self.title = ""
        self.separator_height = 0
        self.background = ""
        self.auto_dismiss = False
        self.size_hint = (None, None)
        self.size = (400, 220)
        with self.canvas.before:
            Color(*BG_COLOR1)
            self.bg = RoundedRectangle(radius=[18], pos=self.pos, size=self.size)
        self.bind(pos=self.update_bg, size=self.update_bg)
        layout = BoxLayout(orientation='vertical', padding=24, spacing=14)
        layout.add_widget(Label(
            text=title,
            color=EMERALD,
            font_size=24,
            bold=True,
            size_hint=(1, None),
            height=42,
            halign='center',
            valign='middle'
        ))
        layout.add_widget(Label(
            text=message,
            color=TEXT_COLOR,
            font_size=17,
            size_hint=(1, 1),
            halign='center',
            valign='middle'
        ))
        btn = Button(
            text='Aceptar',
            size_hint=(None, None), size=(120, 44),
            background_normal='', background_color=EMERALD,
            color=WHITE, font_size=18, bold=True, pos_hint={'center_x': 0.5}
        )
        btn.bind(on_release=self.dismiss)
        layout.add_widget(btn)
        self.content = layout
    def update_bg(self, *args):
        self.bg.pos = self.pos
        self.bg.size = self.size

class QuotationForm(Popup):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.title = ""
        self.separator_height = 0
        self.background = ""
        self.size_hint = (None, None)
        self.size = (500, 520)
        self.auto_dismiss = True
        with self.canvas.before:
            Color(*BG_COLOR1)
            self.bg = RoundedRectangle(radius=[18], pos=self.pos, size=self.size)
        self.bind(pos=self.update_bg, size=self.update_bg)
        layout = BoxLayout(orientation='vertical', spacing=18, padding=[24, 36, 24, 36])
        layout.add_widget(Label(
            text='Cotizar Sistema',
            color=EMERALD,
            font_size=28,
            bold=True,
            halign='center',
            valign='middle',
            size_hint=(1, None),
            height=50
        ))
        self.cultivo_btn = StyledButton(text='Selecciona Tipo de Cultivo', size_hint=(1, None), height=56)
        self.cultivo_dropdown = DropDown()
        for option in ['Lechuga', 'Tomate', 'Fresa', 'Hierbas']:
            btn = Button(text=option, size_hint_y=None, height=44, background_normal='', background_color=MINT, color=TEXT_COLOR)
            btn.bind(on_release=lambda btn: self.select_cultivo(btn.text))
            self.cultivo_dropdown.add_widget(btn)
        self.cultivo_btn.bind(on_release=self.cultivo_dropdown.open)
        layout.add_widget(self.cultivo_btn)
        self.tamano_btn = StyledButton(text='Selecciona Tamaño', size_hint=(1, None), height=56)
        self.tamano_dropdown = DropDown()
        for option in ['Chico', 'Mediano', 'Grande']:
            btn = Button(text=option, size_hint_y=None, height=44, background_normal='', background_color=MINT, color=TEXT_COLOR)
            btn.bind(on_release=lambda btn: self.select_tamano(btn.text))
            self.tamano_dropdown.add_widget(btn)
        self.tamano_btn.bind(on_release=self.tamano_dropdown.open)
        layout.add_widget(self.tamano_btn)
        self.delegacion_btn = StyledButton(text='Delegación', size_hint=(1, None), height=56)
        layout.add_widget(self.delegacion_btn)
        self.cotizar_btn = StyledButton(text='Cotizar', size_hint=(1, None), height=56)
        self.cotizar_btn.bind(on_press=self.cotizar)
        layout.add_widget(self.cotizar_btn)
        self.content = layout

    def update_bg(self, *args):
        self.bg.pos = self.pos
        self.bg.size = self.size

    def select_cultivo(self, value):
        self.cultivo_btn.text = value
        self.cultivo_dropdown.dismiss()

    def select_tamano(self, value):
        self.tamano_btn.text = value
        self.tamano_dropdown.dismiss()

    def cotizar(self, instance):
        CustomPopup("Cotización", "¡Cotización enviada!").open()
        self.dismiss()

class SensorWindow(Screen):
    def __init__(self, sensor_name, **kwargs): 
        super().__init__(**kwargs)
        root = BoxLayout(orientation='vertical', padding=40, spacing=20)
        root.add_widget(Label(
            text=f"Ventana de {sensor_name}",
            font_size=28,
            color=EMERALD,
            halign='center',
            valign='middle',
            size_hint=(1, None),
            height=60
        ))
        root.add_widget(Widget())
        btn_regresar = StyledButton(
            text="Regresar", size_hint=(None, None), size=(320, 56), pos_hint={'center_x': 0.5}
        )
        btn_regresar.bind(on_press=self.volver)
        root.add_widget(btn_regresar)
        root.add_widget(Widget())
        self.add_widget(root)

    def volver(self, instance):
        self.manager.current = "selection_window"

        # Conexión Wi-Fi con el ESP32
        self.host = '192.168.1.100'  # Cambiar a la dirección IP del ESP32
        self.port = 10  # Puerto utilizado en el ESP32
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.connect((self.host, self.port))
        # Clock.schedule_interval(self.update_sensor_data, 1)

    def update_sensor_data(self, dt):
        try:
            data = self.socket.recv(1024).decode()
            self.sensor_data_text.text = data
        except socket.error as e:
            print("Error de socket:")

class SelectionHeader(FloatLayout):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.size_hint_y = None
        self.height = 200
        with self.canvas.before:
            Color(*EMERALD)
            self.bg_rect = Rectangle(pos=self.pos, size=(self.width, self.height))
        self.bind(pos=self.update_bg, size=self.update_bg)
        
        # Logo HydroCore
        logo_box = BoxLayout(orientation='horizontal', size_hint=(None, None), size=(280, 60), pos_hint={'center_x': 0.5, 'top': 0.97}, spacing=0)
        logo_box.add_widget(Label(
            text='HYDRO', color=WHITE, font_size=38, bold=True, halign='right', valign='middle', size_hint=(None, 1), width=140
        ))
        logo_box.add_widget(Label(
            text='CORE', color=LIME_NEON, font_size=38, bold=True, halign='left', valign='middle', size_hint=(None, 1), width=140
        ))
        self.add_widget(logo_box)
        
        card_width = 650
        card_height = 74
        card = FloatLayout(size_hint=(None, None), size=(card_width, card_height), pos_hint={'center_x': 0.5, 'center_y': 0.39})
        with card.canvas.before:
            Color(*WHITE)
            card.bg = RoundedRectangle(pos=card.pos, size=card.size, radius=[18])
        card.bind(pos=lambda inst, v: setattr(card.bg, 'pos', card.pos), size=lambda inst, v: setattr(card.bg, 'size', card.size))
        card.add_widget(Label(
            text='[b]¡Bienvenido al Sistema Hidropónico![/b]\n'
                 'Transforma tu hogar en un oasis de frescura y salud, cultivando tus propias frutas y verduras '
                 'con nuestro sistema de hidroponía automatizada, todo con solo presionar un botón.',
            color=CAPTION_COLOR, font_size=16, halign='center', valign='middle', markup=True,
            text_size=(card_width-40, None), size_hint=(1, 1), pos_hint={'center_x': 0.5, 'center_y': 0.5}
        ))
        self.add_widget(card)
    def update_bg(self, *args):
        self.bg_rect.pos = self.pos
        self.bg_rect.size = (self.width, self.height)

class SelectionWindow(Screen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        main_layout = BoxLayout(orientation='vertical', spacing=12, padding=[0, 0, 0, 0])
        main_layout.add_widget(SelectionHeader())
        # Layout horizontal para botones, tarjeta de sensor y chatbot
        content_layout = BoxLayout(orientation='horizontal', size_hint=(1, 1), padding=[70, 0, 70, 0], spacing=40)
        # --- BOTONES ---
        btns_box = BoxLayout(orientation='vertical', size_hint=(None, None), size=(500, 600), spacing=20)
        sensor_names = [
            ("Luz", "1000 lx"),
            ("Ph", "6.5"),
            ("Temperatura del Ambiente", "22°C"),
            ("Temperatura del Agua", "20°C"),
            ("Nivel de Agua", "80%"),
            ("Pureza", "95%")
        ]
        self.sensor_card = SensorCardWidget(sensor_name="Selecciona un sensor", sensor_value="--")
        def on_sensor_btn(instance, name, value):
            self.sensor_card.update_sensor(name, value)
        for sensor_name, sensor_value in sensor_names:
            btn = StyledButton(text=sensor_name, size_hint=(None, None), size=(500, 70))
            btn.bind(on_press=lambda inst, name=sensor_name, value=sensor_value: on_sensor_btn(inst, name, value))
            btns_box.add_widget(btn)
        cotizar_button = StyledButton(text="Cotizar Sistema", size_hint=(None, None), size=(500, 70))
        cotizar_button.bind(on_press=self.open_cotizar)
        btns_box.add_widget(cotizar_button)
        content_layout.add_widget(btns_box)
        # --- TARJETA DE SENSOR ---
        sensor_card_box = BoxLayout(orientation='vertical', size_hint=(None, 1), width=370)
        sensor_card_box.add_widget(self.sensor_card)
        content_layout.add_widget(sensor_card_box)
        # --- CHATBOT ---
        chatbot_box = BoxLayout(orientation='vertical', size_hint=(None, None), size=(390, 350), padding=[0, 90, 0, 0])
        chatbot = ChatbotWidget()
        chatbot_box.add_widget(Widget(size_hint_y=None, height=10))
        chatbot_box.add_widget(chatbot)
        content_layout.add_widget(chatbot_box)
        main_layout.add_widget(content_layout)
        self.add_widget(main_layout)
    def open_sensor_window(self, sensor_name):
        pass
    def open_cotizar(self, instance):
        QuotationForm().open()

class MainWindow(Screen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        layout = BoxLayout(orientation='vertical', spacing=0, padding=[0, 40, 0, 0])
        layout.add_widget(Widget(size_hint_y=None, height=30))
        
        # Titulo con estilo HydroCore
        title_box = BoxLayout(orientation='horizontal', size_hint=(1, None), height=48, spacing=0)
        title_box.add_widget(Widget())
        title_box.add_widget(Label(
            text='HYDRO', font_size=33, bold=True, color=TEXT_COLOR,
            size_hint=(None, None), width=120, height=48, halign='right', valign='middle'
        ))
        title_box.add_widget(Label(
            text='CORE', font_size=33, bold=True, color=EMERALD,
            size_hint=(None, None), width=100, height=48, halign='left', valign='middle'
        ))
        title_box.add_widget(Widget())
        layout.add_widget(title_box)
        
        layout.add_widget(Label(
            text='"Donde el agua es la raíz de todo"', font_size=18, italic=True,
            color=LABEL_HINT_COLOR, size_hint=(1, None), height=30, halign='center', valign='middle'
        ))
        layout.add_widget(Label(
            text='Control total sobre tu cultivo', font_size=16,
            color=LABEL_HINT_COLOR, size_hint=(1, None), height=28, halign='center', valign='middle'
        ))
        layout.add_widget(Widget(size_hint_y=None, height=20))
        layout.add_widget(StyledLabel(text="Usuario"))
        self.entry_username = StyledInput(hint_text="Ingresa tu usuario")
        layout.add_widget(self.entry_username)
        layout.add_widget(StyledLabel(text="Contraseña"))
        self.entry_password = StyledInput(password=True, hint_text="Ingresa tu contraseña")
        layout.add_widget(self.entry_password)
        layout.add_widget(Widget(size_hint_y=None, height=10))
        self.login_button = StyledButton(text="Iniciar Sesión")
        self.register_button = StyledButton(text="Crear Cuenta")
        self.login_button.bind(on_press=self.login)
        self.register_button.bind(on_press=self.register)
        layout.add_widget(self.login_button)
        layout.add_widget(self.register_button)
        layout.add_widget(Widget(size_hint_y=None, height=10))
        self.add_widget(layout)
        self.registered_users = []
    def login(self, instance):
        username = self.entry_username.text.strip()
        password = self.entry_password.text.strip()
        if (username, password) in self.registered_users:
            self.manager.current = 'selection_window'
        else:
            CustomPopup("Error", "Usuario o contraseña incorrectos").open()
    def register(self, instance):
        username = self.entry_username.text.strip()
        password = self.entry_password.text.strip()
        if (username, password) in self.registered_users:
            CustomPopup("Error", "Usuario ya registrado").open()
        else:
            self.registered_users.append((username, password))
            CustomPopup("Registro exitoso", f"Usuario {username} registrado correctamente").open()

class HydroCoreApp(App):
    def build(self):
        sm = ScreenManager()
        sm.add_widget(MainWindow(name='main_window'))
        sm.add_widget(SelectionWindow(name='selection_window'))
        return sm

if __name__ == '__main__':
    HydroCoreApp().run()
