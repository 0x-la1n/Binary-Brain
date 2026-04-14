<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.2-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
</p>

# 🧠 Binary-Brain

> **Mini Cerebro Computacional** — Herramienta web educativa para explorar los fundamentos de la arquitectura del computador de manera visual e interactiva.

Proyecto universitario de la materia **Arquitectura del Computador** que permite comprender cómo un computador procesa, convierte y representa datos internamente: desde conversiones numéricas entre bases hasta la representación de colores a nivel de píxeles.

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Stack Tecnológico](#-stack-tecnológico)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Módulos](#-módulos)
- [Scripts Disponibles](#-scripts-disponibles)
- [Docker](#-docker)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

---

## ✨ Características

- 🌙 **Modo oscuro** con diseño minimalista y moderno
- 📐 **Layout de panel de control** — Sidebar fijo + área de contenido principal
- 🧩 **Arquitectura modular** — Cada módulo es un componente independiente y reemplazable
- 🎨 **Animaciones fluidas** — Transiciones fadeIn, shimmer skeleton y glow effects
- 🐳 **Dockerizado** — Build multi-stage listo para producción con Nginx
- 🔤 **Fuente Inter** — Tipografía moderna cargada desde Google Fonts

---

## 🛠 Stack Tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| [React](https://react.dev) | 19.2 | Librería de UI con componentes funcionales y hooks |
| [Vite](https://vite.dev) | 8.0 | Bundler ultrarrápido con HMR instantáneo |
| [Tailwind CSS](https://tailwindcss.com) | 4.2 | Framework CSS utility-first con tokens personalizados |
| [Lucide React](https://lucide.dev) | 1.8 | Iconos SVG ligeros y consistentes |
| [Docker](https://www.docker.com) | — | Contenerización y despliegue |
| [Nginx](https://nginx.org) | Alpine | Servidor web para producción |

---

## 📌 Requisitos Previos

Asegúrate de tener instalado:

- **Node.js** ≥ 18.x — [Descargar](https://nodejs.org)
- **npm** ≥ 9.x (incluido con Node.js)
- **Docker** y **Docker Compose** (opcional, para contenedores) — [Descargar](https://www.docker.com/products/docker-desktop)
- **Git** — [Descargar](https://git-scm.com)

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/Binary-Brain.git
cd Binary-Brain
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en **http://localhost:5173** (o el siguiente puerto disponible).

---

## 📁 Estructura del Proyecto

```
Binary-Brain/
│
├── public/                      # Archivos estáticos públicos
│   └── vite.svg                 # Favicon
│
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx          # Menú lateral con navegación y estado
│   │   ├── PlaceholderModule.jsx # Componente skeleton reutilizable
│   │   └── modules/
│   │       ├── ModuloConversiones.jsx   # Conversión de bases numéricas
│   │       ├── ModuloOperaciones.jsx    # Operaciones binarias
│   │       ├── ModuloIEEE754.jsx        # Normalización IEEE 754
│   │       ├── ModuloTexto.jsx          # Representación de texto
│   │       └── ModuloPixeles.jsx        # Píxeles y colores
│   │
│   ├── App.jsx              # Componente raíz con estado de navegación
│   ├── main.jsx             # Punto de entrada de React
│   └── index.css            # Tokens de diseño, animaciones globales
│
├── index.html               # HTML principal con SEO y Google Fonts
├── vite.config.js           # Configuración de Vite + Tailwind plugin
├── package.json             # Dependencias y scripts
├── eslint.config.js         # Configuración de ESLint
│
├── Dockerfile               # Build multi-stage (Node → Nginx)
├── docker-compose.yml       # Orquestación del contenedor
├── nginx.conf               # Config Nginx para SPA
├── .dockerignore             # Exclusiones del contexto Docker
│
├── LICENSE                  # Licencia MIT
└── README.md                # ← Estás aquí
```

---

## 📦 Módulos

La navegación se controla mediante `useState` en `App.jsx`. Cada módulo es un componente independiente.

| # | Módulo | Componente | Icono | Descripción |
|---|---|---|---|---|
| 1 | **Conversiones** | `ModuloConversiones` | `ArrowRightLeft` | Conversión entre bases: binario, octal, decimal, hexadecimal |
| 2 | **Operaciones Binarias** | `ModuloOperaciones` | `Calculator` | Suma, resta, multiplicación y operaciones lógicas en binario |
| 3 | **IEEE 754** | `ModuloIEEE754` | `Cpu` | Normalización de decimales a IEEE 754 (32 bits) |
| 4 | **Representación Texto** | `ModuloTexto` | `Type` | Conversión de texto a ASCII/Unicode, binario y hexadecimal |
| 5 | **Píxeles y Colores** | `ModuloPixeles` | `Palette` | Representación de colores en RGB y hexadecimal |

### ¿Cómo implementar un módulo?

Reemplaza el contenido de placeholder en el archivo correspondiente. Por ejemplo, para **Conversiones**:

```jsx
// src/components/modules/ModuloConversiones.jsx

export default function ModuloConversiones() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-text-primary mb-4">
        Conversor de Bases
      </h2>
      {/* Tu lógica de conversión aquí */}
    </div>
  );
}
```

---

## 📜 Scripts Disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo con HMR |
| `npm run build` | Genera el bundle de producción en `dist/` |
| `npm run preview` | Previsualiza el build de producción localmente |
| `npm run lint` | Ejecuta ESLint para análisis de código |

---

## 🐳 Docker

### Build y ejecución con Docker Compose

```bash
# Construir y levantar el contenedor
docker compose up --build

# Ejecutar en segundo plano
docker compose up --build -d

# Detener el contenedor
docker compose down
```

La app estará disponible en **http://localhost:3000**.

### Build manual con Docker

```bash
# Construir la imagen
docker build -t binary-brain .

# Ejecutar el contenedor
docker run -p 3000:80 binary-brain
```

### Detalles del Dockerfile

El Dockerfile usa un **build multi-stage** para optimizar el tamaño de la imagen:

1. **Stage 1 (Builder)**: `node:20-alpine` — Instala dependencias y ejecuta `npm run build`
2. **Stage 2 (Production)**: `nginx:alpine` — Copia los archivos estáticos y sirve con Nginx

La configuración de Nginx incluye:
- Fallback SPA (todas las rutas redirigen a `index.html`)
- Cache de 1 año para assets estáticos
- Headers de seguridad (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)

---

## 🎨 Sistema de Diseño

La aplicación usa **tokens CSS personalizados** definidos en `src/index.css`:

| Token | Valor | Uso |
|---|---|---|
| `--color-dark-900` | `#0a0a0f` | Fondo principal |
| `--color-dark-800` | `#111118` | Fondo del sidebar |
| `--color-dark-700` | `#1a1a24` | Fondo de tarjetas |
| `--color-accent-primary` | `#6c5ce7` | Acentos y elementos activos |
| `--color-accent-secondary` | `#a29bfe` | Texto de elementos activos |
| `--color-success` | `#00e676` | Indicador de estado |
| `--color-text-primary` | `#e8e8f0` | Texto principal |
| `--color-text-secondary` | `#9494a8` | Texto secundario |

---

## 🤝 Contribuir

1. Haz un **fork** del repositorio
2. Crea una rama para tu feature: `git checkout -b feature/mi-feature`
3. Haz commit de tus cambios: `git commit -m "feat: agregar mi feature"`
4. Haz push a la rama: `git push origin feature/mi-feature`
5. Abre un **Pull Request**

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Consulta el archivo [LICENSE](./LICENSE) para más detalles.

---

<p align="center">
  <sub>Hecho con 💜 para la materia de Arquitectura del Computador</sub>
</p>
