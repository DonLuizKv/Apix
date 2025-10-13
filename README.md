# 🚀 Apix (Beta)

**Apix** es un **cliente HTTP rápido, ligero y menos feo que Postman**.  
Haz peticiones, prueba APIs y maneja tus endpoints sin complicaciones ni distracciones visuales.  
Ideal para desarrolladores que buscan **velocidad, simplicidad y eficiencia**, sin sacrificar funcionalidad.

---

## 🧩 Características principales

- ⚡ **Rápido y liviano** — Construido con **Tauri + Vite** para ofrecer rendimiento nativo.
- 🧠 **Diseño minimalista** — Interfaz clara, sin el exceso visual de herramientas pesadas.
- 🧰 **Soporte para métodos HTTP comunes** — `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `OPTIONS`, etc.
- 💾 **Gestión de endpoints** — Guarda y organiza tus peticiones favoritas.
- 📦 **JSON y Headers** — Edición intuitiva y validación integrada.
- 🌗 **Modo oscuro/claro** — Perfecto para trabajar cómodamente a cualquier hora.
- 🔐 **Sin telemetría** — Tus datos, tus reglas.

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Propósito |
|-------------|-----------|
| [**Tauri**](https://tauri.app/) | Empaquetado nativo y comunicación con el sistema operativo |
| [**Vite**](https://vitejs.dev/) | Entorno de desarrollo ultrarrápido |
| [**React**](https://react.dev/) | UI modular y reactiva |
| [**TypeScript**](https://www.typescriptlang.org/) | Tipado fuerte y mantenibilidad |
| [**TailwindCSS**](https://tailwindcss.com/) | Estilos modernos y personalizables |

---

## 🧪 Instalación y ejecución

### 🔧 Requisitos previos
Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v18 o superior)
- [Rust](https://www.rust-lang.org/tools/install) (para compilar Tauri)
- npm o pnpm

---

### ▶️ Ejecución en modo desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar el proyecto
npm run tauri dev
```

La aplicación se abrirá en una ventana nativa gracias a Tauri 🦀.

### 📦 Compilar para producción
```bash
npm run tauri build
```
Esto generará un ejecutable nativo (ligero y rápido) listo para distribución.

## 🧭 Estructura del proyecto
```bash
Apix/
├── src/
│   ├── components/      # Componentes de interfaz
│   ├── utils/           # Funciones utiles
│   ├── types/           # Tipado de datos
│   ├── hooks/           # Lógica reutilizable
│   ├── context/         # Manejo de estado global
│   ├── index.css        # Estilos
│   ├── main.tsx         
│   └── app.tsx          # Aplicacion
├── src-tauri/           # Código del backend de Tauri (Rust)
├── public/              # Recursos estáticos
└── package.json         # Configuración del proyecto
```

## 📜 Licencia

Este proyecto está bajo la licencia MIT.
Consulta el archivo LICENSE
 para más información.

---

Si te gusta el proyecto, ¡no olvides dejar una ⭐!
