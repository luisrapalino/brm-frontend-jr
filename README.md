# 🧑‍💻 BRM - Prueba Técnica Frontend Jr

Aplicación SPA desarrollada con **Vue 3**, **TypeScript** y **Vuetify** como parte de la prueba técnica para el rol de Desarrollador Frontend Jr en **BRM**.  
Permite visualizar, filtrar y analizar una lista de usuarios con una interfaz moderna, responsive y con funcionalidades interactivas.

---

## 🛠 Tecnologías utilizadas

- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vuetify 3](https://next.vuetifyjs.com/)
- [Vue Router](https://router.vuejs.org/)
- [Chart.js + vue-chartjs](https://vue-chartjs.org/)
- [jsPDF](https://github.com/parallax/jsPDF) (exportación PDF)

---

## ✨ Funcionalidades principales

- 🔍 **Búsqueda y filtros** por nombre, ciudad y compañía
- 🧮 Ordenamiento **ascendente/descendente** por nombre, ciudad y compañía
- 📊 **Dashboard** con gráficos dinámicos (ciudades y compañías)
- 📦 Exportación de datos a **CSV** y **PDF**
- 🌗 **Tema claro / oscuro** con alternancia en tiempo real
- 🖼 Modal de detalles de usuario
- 📈 Animaciones suaves en tarjetas y gráficos
- 📱 Diseño 100% responsive y accesible

---

## 💡 Decisiones técnicas

- Se usó **Composition API** con **TypeScript** para mantener el código organizado, reutilizable y con validación estática.
- **Vuetify** fue elegido por su soporte completo de temas, componentes accesibles y rápida integración con Vue 3.
- **Vue Router** se empleó para separar la lógica entre la vista principal y el dashboard.
- Los filtros y ordenamientos se implementaron sin librerías externas de estado, aprovechando `ref`, `watch` y `computed` de Vue.
- Se usó **Chart.js** mediante `vue-chartjs` por su flexibilidad visual y rendimiento.
- Las animaciones de transición se agregaron con componentes nativos de Vuetify para mejorar UX sin complejidad extra.
- Para exportaciones, se utilizó **jsPDF** para generar archivos PDF y una implementación nativa con **Blob** para exportar CSV, evitando dependencias innecesarias y manteniendo la solución ligera.

---

## 🖼 Capturas de pantalla

```md
![Vista principal](./screenshots/usuarios.png)
![Dashboard](./screenshots/dashboard.png)
```

## 🚀 ¿Cómo ejecutar el proyecto?

```bash
# Clonar el repositorio
git clone https://github.com/luisrapalino/brm-frontend-jr.git
cd brm-frontend-jr

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev


📍 La aplicación estará disponible en: http://localhost:5173
```
